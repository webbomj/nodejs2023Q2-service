import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DbModule } from 'src/db/db.module';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, AlbumService, ArtistService, TrackService],
  imports: [DbModule, AlbumModule, ArtistModule, TrackModule],
})
export class FavsModule {}
