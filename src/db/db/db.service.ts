import { Injectable, Global } from '@nestjs/common';
import { IAlbum, IArtist, IFavorite, ITrack, IUser } from './db.types';

@Global()
@Injectable()
export class DbService {
  users: IUser[] = [];
  tracks: ITrack[] = [];
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  favorites: IFavorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
