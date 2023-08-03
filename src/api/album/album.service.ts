import { Injectable, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { DbService } from 'src/db/db/db.service';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { PrismaService } from 'src/db/db/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: DbService,
    private favService: FavsService,
    private trackService: TrackService,
    private prisma: PrismaService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    // const newAlbum: IAlbum = {
    //   id: v4(),
    //   name: createAlbumDto.name,
    //   year: createAlbumDto.year,
    //   artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    // };

    // this.db.albums.push(newAlbum);

    // return newAlbum;

    const album = await this.prisma.album.create({
      data: {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId,
      },
    });

    return album;
  }

  async findAll() {
    // return this.db.albums;
    return await this.prisma.album.findMany({});
  }

  async findOne(id: string) {
    // const album = this.db.albums.find((album) => album.id === id);
    // if (!album) {
    //   throw new HttpException('Album not exist', 404);
    // }
    // return album;

    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException('Album not exist', 404);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: CreateAlbumDto) {
    // const album = this.db.albums.find((album) => album.id === id);
    // if (!album) {
    //   throw new HttpException('Album not exist', 404);
    // }

    // album.artistId = updateAlbumDto.artistId ? updateAlbumDto.artistId : null;
    // album.name = updateAlbumDto.name;
    // album.year = updateAlbumDto.year;

    // return album;

    await this.findOne(id);

    const newAlbum = await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId ? updateAlbumDto.artistId : null,
      },
    });

    return newAlbum;
  }

  async remove(id: string) {
    // const album = this.db.albums.find((album) => album.id === id);
    // if (!album) {
    //   throw new HttpException('Album not exist', 404);
    // }

    await this.findOne(id);

    // this.trackService.removeAlbumId(id);

    // try {
    //   this.favService.removeAlbum(id);
    // } catch (e) {}

    // this.db.albums = this.db.albums.filter((track) => track.id !== id);

    await this.prisma.album.delete({
      where: {
        id,
      },
    });
    return;
  }

  removeArtistId(id: string) {
    // this.db.albums = this.db.albums.map((album) => {
    //   if (album.artistId === id) {
    //     return {
    //       ...album,
    //       artistId: null,
    //     };
    //   }
    //   return album;
    // });

    this.prisma.album.update({
      where: { id },
      data: {
        artistId: null,
      },
    });
  }
}
