
// Movie Type
export interface IMovie {
  plot: string;
  genres: string[];
  runtime: number;
  rated: string;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  awards: IAwards;
  lastupdated: string;
  year: number;
  imdb: IImdb;
  countries: string[];
  type: string;
  tomatoes: ITomatoes;
}

export interface IAwards {
  wins: number;
  nominations: number;
  text: string;
}

export interface IImdb {
  rating: number;
  votes: number;
  id: number;
}

export interface ITomatoes {
  viewer: IViewer;
  lastUpdated: Date;
  fresh: number;
  critic: ICritic;
}

export interface IViewer {
  rating: number;
  numReviews: number;
  meter: number;
}

export interface ICritic {
  rating: number;
  numReviews: number;
  meter: number;
}