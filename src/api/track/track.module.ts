import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from 'src/db/db.module';
import { FavsModule } from '../favs/favs.module';
import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavsService],
  imports: [DbModule, FavsModule],
})
export class TrackModule {}
