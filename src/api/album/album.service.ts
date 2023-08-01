import { Injectable, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DbService } from 'src/db/db/db.service';
import { IAlbum } from 'src/db/db/db.types';
import { v4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: DbService,
    private favService: FavsService,
    private trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: IAlbum = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    };

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not exist', 404);
    }
    return album;
  }

  update(id: string, updateAlbumDto: CreateAlbumDto) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not exist', 404);
    }

    album.artistId = updateAlbumDto.artistId ? updateAlbumDto.artistId : null;
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;

    return album;
  }

  remove(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not exist', 404);
    }

    this.trackService.removeAlbumId(id);

    try {
      this.favService.removeAlbum(id);
    } catch (e) {}

    this.db.albums = this.db.albums.filter((track) => track.id !== id);
    return;
  }

  removeArtistId(id: string) {
    this.db.albums = this.db.albums.map((album) => {
      if (album.artistId === id) {
        return {
          ...album,
          artistId: null,
        };
      }
      return album;
    });
  }
}
