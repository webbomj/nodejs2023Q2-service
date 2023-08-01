import { Injectable, HttpException } from '@nestjs/common';
import { DbService } from 'src/db/db/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DbService) {}

  findAll() {
    return this.db.favorites;
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track with id doesn`t exist', 422);
    }

    this.db.favorites.tracks.push(track);

    return;
  }

  removeTrack(id: string) {
    const track = this.db.favorites.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (track) => track.id !== id,
    );
    return;
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album with id doesn`t exist', 422);
    }

    this.db.favorites.albums.push(album);

    return;
  }

  removeAlbum(id: string) {
    const album = this.db.favorites.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not exist', 404);
    }

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album) => album.id !== id,
    );
    return;
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist with id doesn`t exist', 422);
    }

    this.db.favorites.artists.push(artist);

    return;
  }

  removeArtist(id: string) {
    const artist = this.db.favorites.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not exist', 404);
    }

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
    return;
  }
}
