import { Injectable, HttpException } from '@nestjs/common';
import { DbService } from 'src/db/db/db.service';
import { IAlbum, IArtist, ITrack } from 'src/db/db/db.types';
import { PrismaService } from 'src/db/db/prisma.service';
import { createFavorite } from './helpers/createFavorite';
import { FAVORITES_ID } from './constant/constants';

@Injectable()
export class FavsService {
  constructor(
    private db: DbService,
    private prisma: PrismaService,
  ) {}

  async findAll() {
    const favorites = await this.prisma.favorite.findFirst({});

    const artists: IArtist[] = await this.prisma.artist.findMany({
      where: {
        id: {
          in: favorites.artists,
        },
      },
    });
    const albums: IAlbum[] = await this.prisma.album.findMany({
      where: {
        id: {
          in: favorites.albums,
        },
      },
    });
    const tracks: ITrack[] = await this.prisma.track.findMany({
      where: {
        id: {
          in: favorites.tracks,
        },
      },
    });
    const favorite = await createFavorite(artists, albums, tracks);
    return favorite;
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException('Track with id doesn`t exist', 422);
    }

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        tracks: {
          push: id,
        },
      },
    });

    return;
  }

  async removeTrack(id: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { id: FAVORITES_ID },
    });

    const favoriteWithotTrack = favorite.tracks.filter(
      (trackId) => trackId !== id,
    );

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        tracks: {
          set: [...favoriteWithotTrack],
        },
      },
    });

    return;
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new HttpException('Album with id doesn`t exist', 422);
    }

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        albums: {
          push: id,
        },
      },
    });

    return;
  }

  async removeAlbum(id: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { id: FAVORITES_ID },
    });

    const favoriteWithotAlbum = favorite.albums.filter(
      (albumId) => albumId !== id,
    );

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        albums: {
          set: [...favoriteWithotAlbum],
        },
      },
    });

    return;
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException('Artist with id doesn`t exist', 422);
    }

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        artists: {
          push: id,
        },
      },
    });

    return;
  }

  async removeArtist(id: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { id: FAVORITES_ID },
    });

    const favoriteWithotArtist = favorite.artists.filter(
      (artistId) => artistId !== id,
    );

    await this.prisma.favorite.update({
      where: { id: FAVORITES_ID },
      data: {
        artists: {
          set: [...favoriteWithotArtist],
        },
      },
    });

    return;
  }
}
