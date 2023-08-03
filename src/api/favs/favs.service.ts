import { Injectable, HttpException } from '@nestjs/common';
import { DbService } from 'src/db/db/db.service';
import { PrismaService } from 'src/db/db/prisma.service';

@Injectable()
export class FavsService {
  constructor(
    private db: DbService,
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.db.favorites;
  }

  async addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track with id doesn`t exist', 422);
    }

    this.db.favorites.tracks.push(track);

    return;
  }

  async removeTrack(id: string) {
    const track = this.db.favorites.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (track) => track.id !== id,
    );
    return;
  }

  async addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album with id doesn`t exist', 422);
    }

    this.db.favorites.albums.push(album);

    return;
  }

  async removeAlbum(id: string) {
    const album = this.db.favorites.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not exist', 404);
    }

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album) => album.id !== id,
    );
    return;
  }

  async addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist with id doesn`t exist', 422);
    }

    this.db.favorites.artists.push(artist);

    return;
  }

  async removeArtist(id: string) {
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
