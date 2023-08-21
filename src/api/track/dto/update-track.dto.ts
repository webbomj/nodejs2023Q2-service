import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { isUUIDorNull } from 'src/api/album/validator/isUUIDorNull';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Validate(isUUIDorNull)
  artistId?: string | null;

  @IsOptional()
  @Validate(isUUIDorNull)
  albumId?: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
