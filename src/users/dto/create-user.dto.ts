import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  @IsEmail()
  email!: string;

  @MinLength(1)
  password!: string;
}
