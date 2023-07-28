import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';
import { FavsService } from '../favs/favs.service';
import { FavsModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FavsService, TrackService],
  imports: [DbModule, FavsModule, TrackModule],
})
export class AlbumModule {}
