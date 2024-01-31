import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_ERRORS } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@project/shared/shared-types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { jwtConfig } from '@project/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createJWTPayload } from '@project/shared/helpers';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async register(dto: CreateUserDto) {
    const { avatar, email, firstname, lastname, password } = dto;

    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(AUTH_ERRORS.USER_EXISTS);
    }

    const newUser = {
      avatar,
      email,
      firstname,
      lastname,
      passwordHash: '',
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

  public async getManyUsers(ids: string[]) {
    const existUsers = await this.blogUserRepository.findManyById(ids);

    return existUsers;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return existUser;
  }

  public async update(dto: UpdateUserDto) {
    const existUser = await this.blogUserRepository.findById(dto.userId);

    if (!existUser) {
      throw new ConflictException(AUTH_ERRORS.USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity({ ...existUser.toPOJO(), ...dto });

    return this.blogUserRepository.update(dto.userId, userEntity);
  }

  public async changePassword(dto: ChangePasswordDto) {
    const { userId, currentPassword, newPassword } = dto;

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new ConflictException(AUTH_ERRORS.USER_NOT_FOUND);
    }

    if (!(await existUser.comparePassword(currentPassword))) {
      throw new UnauthorizedException(AUTH_ERRORS.USER_PASSWORD_WRONG);
    }

    const userEntity = await existUser.setPassword(newPassword);

    return this.blogUserRepository.update(userId, userEntity);
  }

  // todo: implement
  public async subscribe(id: string) {}

  public async createUserToken(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const accessTokenPayload = createJWTPayload(user);
      const refreshTokenPayload = {
        ...accessTokenPayload,
        tokenId: crypto.randomUUID(),
      };
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
