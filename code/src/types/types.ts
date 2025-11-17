export type MediaType = 'movie' | 'series';

export type Genre = 
  | 'Action' 
  | 'Drama' 
  | 'Comedy' 
  | 'Horror' 
  | 'Sci-fi' 
  | 'Crime Thriller' 
  | 'Fantasy';

export type Nationality =  | 'Korean' | 'Thai' | 'British' | 'Japanese' | 'USA' |'Sweden'|'UK'|'Germany'| "Canada"|'Spain';

export interface Media {
  id: number;
  imageUrl: string;
  title: string;
  rating: string;
  episodes: string; 
  type: MediaType;
  genres: Genre[];
  nationality: Nationality;
  trailerUrl?: string;
  description: string;
};