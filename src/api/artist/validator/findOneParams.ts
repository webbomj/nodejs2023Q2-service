import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
