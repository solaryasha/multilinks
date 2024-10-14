import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/get-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/api/external')
  ping (@User() user) {
    const userSub = user.sub;
    const email = user.email
    return { response: 'success!! woohoooo', userSub, email, };
  }
}
