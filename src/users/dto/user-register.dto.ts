import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'Please enter a correct email' })
  email: string;

  @IsString({ message: 'Please enter a correct password' })
  password: string;

  @IsString({ message: 'Please set a name' })
  name: string;
}
