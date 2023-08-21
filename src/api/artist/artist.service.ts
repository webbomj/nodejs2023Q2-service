import { Injectable, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { DbService } from 'src/db/db/db.service';
import { IArtist } from 'src/db/db/db.types';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { PrismaService } from 'src/db/db/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private db: DbService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private prisma: PrismaService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    // const newArtist = {
    //   id: v4(),
    //   grammy: createArtistDto.grammy,
    //   name: createArtistDto.name,
    // };

    // this.db.artists.push(newArtist);

    // return newArtist;

    const artist = await this.prisma.artist.create({
      data: {
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });

    return artist;
  }

  async findAll() {
    // return this.db.artists;
    return await this.prisma.artist.findMany({});
  }

  async findOne(id: string) {
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   throw new HttpException('Artist not exist', 404);
    // }
    // return artist;

    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new HttpException('Artist not exist', 404);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: CreateArtistDto) {
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   throw new HttpException('Artist not exist', 404);
    // }

    await this.findOne(id);

    const newArtist = await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        grammy: updateArtistDto.grammy,
        name: updateArtistDto.name,
      },
    });

    return newArtist;
  }

  async remove(id: string) {
    // const artist = this.db.artists.find((artist) => artist.id === id);
    // if (!artist) {
    //   throw new HttpException('Artist not exist', 404);
    // }

    await this.findOne(id);

    await this.albumService.removeArtistId(id);

    await this.trackService.removeArtistId(id);

    // try {
    //   this.favService.removeArtist(id);
    // } catch (e) {}

    // this.db.artists = this.db.artists.filter((artist) => artist.id !== id);

    await this.prisma.artist.delete({
      where: { id },
    });
    return;
  }
}
