import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto { 
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
