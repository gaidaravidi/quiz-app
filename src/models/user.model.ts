import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: 'string' })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: 'string' })
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: 'string' })
  firstName: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: 'string' })
  lastName: string;
}

export interface AuthPayload {
  id: string;
}