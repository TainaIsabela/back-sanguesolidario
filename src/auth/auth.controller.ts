import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const IS_PUBLIC_KEY = 'isPublic';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Logando um usuário' })
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.validateUser(email, password);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Deslogando um usuário' })
  async logout(@Headers('Authorization') token: string) {
    return this.authService.logout(token);
  }
}
