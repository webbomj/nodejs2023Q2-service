import { Injectable, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbService } from 'src/db/db/db.service';
import { v4 } from 'uuid';
import { IArtist } from 'src/db/db/db.types';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private db: DbService,
    private favService: FavsService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto): IArtist {
    const newArtist = {
      id: v4(),
      grammy: createArtistDto.grammy,
      name: createArtistDto.name,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not exist', 404);
    }
    return artist;
  }

  update(id: string, updateArtistDto: CreateArtistDto) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not exist', 404);
    }
    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;

    return artist;
  }

  remove(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not exist', 404);
    }

    this.albumService.removeArtistId(id);

    this.trackService.removeArtistId(id);

    try {
      this.favService.removeArtist(id);
    } catch (e) {}

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    return;
  }
}
