import { Injectable, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/db/db/db.service';
import { ITrack } from 'src/db/db/db.types';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack: ITrack = {
      id: v4(),
      albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
      artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
      duration: createTrackDto.duration,
      name: createTrackDto.name,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }

    track.albumId = updateTrackDto.albumId ? updateTrackDto.albumId : null;
    track.artistId = updateTrackDto.artistId ? updateTrackDto.artistId : null;
    track.duration = updateTrackDto.duration;
    track.name = updateTrackDto.name;

    return track;
  }

  remove(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not exist', 404);
    }

    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
    return;
  }
}
