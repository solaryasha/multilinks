import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  //TODO: add rate limit decorator(?)
  login(@Body() loginOptions: LoginDto) {
    return this.authService.login(loginOptions);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerOptions: RegisterDto) {
    return this.authService.register(registerOptions);
  }
}
