import { IAlbum, IArtist, IFavorite, ITrack } from 'src/db/db/db.types';

export const createFavorite = async (
  artists: IArtist[],
  albums: IAlbum[],
  tracks: ITrack[],
): Promise<IFavorite> => {
  return {
    albums,
    artists,
    tracks,
  };
};
