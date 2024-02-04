import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoIdValidationPipe } from '@project/shared/core';
import { NotifyService } from '../notify/notify.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithTokenPayload } from '@project/shared/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface WithUser {
  user?: BlogUserEntity;
}

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been created',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    const { email, firstname, lastname } = newUser;
    await this.notifyService.registerSubscriber({ email, firstname, lastname });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('reset-password')
  public async resetPassword(
    @Body()
    dto: ChangePasswordDto
  ) {
    const user = await this.authService.changePassword(dto);

    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user info.',
  })
  @Patch('update')
  public async update(
    @Body()
    dto: UpdateUserDto
  ) {
    const updatedUser = await this.authService.update(dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: WithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @HttpCode(HttpStatus.OK)
  @Get('info')
  public async info(
    @Query('ids')
    ids: string[]
  ) {
    const users = await this.authService.getManyUsers(ids);

    return fillDto(
      UserRdo,
      users.map((user) => user.toPOJO())
    );
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existedUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh tokens',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(
    @Req()
    { user }: WithUser
  ) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check jwt token',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(
    @Req()
    { user }: RequestWithTokenPayload
  ) {
    return user;
  }
}
