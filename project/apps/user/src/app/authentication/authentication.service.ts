import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_ERRORS } from './authentification.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload, User } from '@project/shared/shared-types';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto) {
    const { avatar, email, firstname, lastname, password } = dto;

    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(AUTH_ERRORS.USER_EXISTS);
    }

    const newUser = {
      avatar,
      createdAt: new Date(),
      email,
      firstname,
      lastname,
      passwordHash: '',
      publications: [],
      subscribers: [],
    };

    const userEntity = await new BlogUserEntity(newUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }

  public async verify(dto: LoginUserDto) {
    const { email, password } = dto;
    const existingUser = await this.blogUserRepository.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(AUTH_ERRORS.USER_NOT_FOUND);
    }

    const passwordMatch = await existingUser.comparePassword(password);

    if (!passwordMatch) {
      throw new UnauthorizedException(AUTH_ERRORS.USER_PASSWORD_WRONG);
    }

    return existingUser;
  }

  public async getUser(id: string) {
    const user = this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  public async changePassword(currentPassword: string, newPassword: string) {}

  public async subscribe(id: string) {}

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      sub: user.id,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
