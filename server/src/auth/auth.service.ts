import { ConflictException, Injectable } from '@nestjs/common';
import { EMAIL_USER_CONFLICT } from 'src/errors/errors.constants';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  login(createAuthDto: LoginDto) {
    return 'This action adds a new auth';
  }

  async register(registerOptions: RegisterDto) {
    const { email } = registerOptions;

    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException(EMAIL_USER_CONFLICT);
    }
  }
}
