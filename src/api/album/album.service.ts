import { Injectable, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DbService } from 'src/db/db/db.service';
import { IAlbum } from 'src/db/db/db.types';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

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

    this.db.albums = this.db.albums.filter((track) => track.id !== id);
    return;
  }
}
