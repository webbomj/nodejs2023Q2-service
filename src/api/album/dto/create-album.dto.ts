import { IsInt, IsNotEmpty, IsString, Validate } from 'class-validator';
import { isUUIDorNull } from '../validator/isUUIDorNull';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  // @ValidateIf((_, val) => !isUUID(val) || val !== null)
  @Validate(isUUIDorNull)
  artistId: string | null;
}
