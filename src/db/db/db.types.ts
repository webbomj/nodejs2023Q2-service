export interface IUser {
  id: string; // uuid v4
  login: string;
  password?: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface IFavorite {
  artists: IArtist[]; // favorite artists ids;
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
