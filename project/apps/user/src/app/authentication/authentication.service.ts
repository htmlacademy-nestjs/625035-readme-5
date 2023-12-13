import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentification.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto) {
    const { avatar, email, firstname, lastname, password } = dto;

    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const newUser = {
      avatar,
      dateOfRegistration: new Date(),
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
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const passwordMatch = await existingUser.comparePassword(password);

    if (!passwordMatch) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existingUser;
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async changePassword(currentPassword: string, newPassword: string) {}

  public async subscribe(id: string) {}
}
