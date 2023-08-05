import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';

import { TrackModule } from '../track/track.module';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  imports: [DbModule, TrackModule],
})
export class AlbumModule {}
