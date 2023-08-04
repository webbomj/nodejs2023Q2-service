import { Injectable, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db/db.service';
import { PrismaService } from 'src/db/db/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private db: DbService,
    private prisma: PrismaService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    // const newTrack: ITrack = {
    //   id: v4(),
    //   albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
    //   artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
    //   duration: createTrackDto.duration,
    //   name: createTrackDto.name,
    // };

    // this.db.tracks.push(newTrack);

    // return newTrack;

    const track = await this.prisma.track.create({
      data: {
        albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
        artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
        duration: createTrackDto.duration,
        name: createTrackDto.name,
      },
    });

    return track;
  }

  async findAll() {
    // return this.db.tracks;
    return await this.prisma.track.findMany({});
  }

  async findOne(id: string) {
    // const track = this.db.tracks.find((track) => track.id === id);
    // if (!track) {
    //   throw new HttpException('Track not exist', 404);
    // }
    // return track;

    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // const track = this.db.tracks.find((track) => track.id === id);
    // if (!track) {
    //   throw new HttpException('Track not exist', 404);
    // }

    await this.findOne(id);

    // track.albumId = updateTrackDto.albumId ? updateTrackDto.albumId : null;
    // track.artistId = updateTrackDto.artistId ? updateTrackDto.artistId : null;
    // track.duration = updateTrackDto.duration;
    // track.name = updateTrackDto.name;

    // return track;

    const track = await this.prisma.track.update({
      where: { id },
      data: {
        albumId: updateTrackDto.albumId ? updateTrackDto.albumId : null,
        artistId: updateTrackDto.artistId ? updateTrackDto.artistId : null,
        duration: updateTrackDto.duration,
        name: updateTrackDto.name,
      },
    });

    return track;
  }

  async remove(id: string) {
    // const track = this.db.tracks.find((track) => track.id === id);
    // if (!track) {
    //   throw new HttpException('Track not exist', 404);
    // }

    await this.findOne(id);

    // try {
    //   this.favService.removeTrack(id);
    // } catch (e) {}

    await this.prisma.track.delete({ where: { id } });
    return;
  }

  async removeAlbumId(id: string) {
    // this.db.tracks = this.db.tracks.map((track) => {
    //   if (track.albumId === id) {
    //     return {
    //       ...track,
    //       albumId: null,
    //     };
    //   }
    //   return track;
    // });

    await this.prisma.track.updateMany({
      where: {
        albumId: id,
      },
      data: {
        albumId: null,
      },
    });
  }

  async removeArtistId(id: string) {
    // this.db.tracks = this.db.tracks.map((track) => {
    //   if (track.artistId === id) {
    //     return {
    //       ...track,
    //       artistId: null,
    //     };
    //   }
    //   return track;
    // });

    await this.prisma.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
  }
}
