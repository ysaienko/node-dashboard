import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;

  @IsString()
  password: string;
}
