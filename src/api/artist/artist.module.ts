import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from 'src/db/db.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService],
  imports: [DbModule, TrackModule, AlbumModule],
})
export class ArtistModule {}
