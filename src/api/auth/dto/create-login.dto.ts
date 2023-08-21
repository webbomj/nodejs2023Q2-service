import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
