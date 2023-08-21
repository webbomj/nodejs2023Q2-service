import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { isUUIDorNull } from 'src/api/album/validator/isUUIDorNull';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Validate(isUUIDorNull)
  artistId?: string | null;

  @Validate(isUUIDorNull)
  albumId?: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
