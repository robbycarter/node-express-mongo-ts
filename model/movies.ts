import {
  model, Schema, Model, HydratedDocument, Document, QueryWithHelpers,
  PaginateModel, PaginateOptions, PaginateResult,
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// Movie Interface
import { IMovie } from '../types/movies';

export interface IMovieBase extends IMovie { }
export interface IPageMovie extends PaginateResult<IMovieBase> { }

export type Instance = Document<IMovieBase, IMovieQueryHelper>;


// Movie Query Helper Interface
interface IMovieQueryHelper {
  byTitle(title: string): QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>;
  byYear(year: number): QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>;
  byGenre(genre: string): QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>;
  byRuntime(min: number, max: number): QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>;
  byLanguage(language: string): QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>;
}

// Movie Methods Inferface
interface IMovieMethods {

}

// User Model interfeace with static extends methods
export interface IMovieModel extends Model<IMovieBase, IMovieQueryHelper, IMovieMethods> {
  paginate(query?: Object, options?: PaginateOptions, callback?: (err: any, result: PaginateResult<IMovieBase>) => void): Promise<PaginateResult<IMovieBase>>;
}

// Define Movie Schema with methods
const schema = new Schema<IMovieBase, IMovieModel, IMovieMethods, IMovieQueryHelper, {}, {}, "type", any>({
  plot: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true,
    index: true
  },
  runtime: {
    type: Number,
    required: true
  },
  rated: {
    type: String,
    required: true
  },
  cast: {
    type: [String],
    required: true
  },
  num_mflix_comments: {
    type: Number,
    default: 0
  },
  poster: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  fullplot: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    required: true,
    index: true
  },
  released: {
    type: Date,
    required: true
  },
  directors: {
    type: [String],
    required: true
  },
  writers: {
    type: [String],
    required: true
  },
  awards: {
    wins: {
      type: Number,
      required: true
    },
    nominations: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  lastupdated: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    index: true
  },
  imdb: {
    rating: {
      type: Number,
      required: true
    },
    votes: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  countries: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    required: true,
    index: true
  },
  tomatoes: {
    viewer: {
      rating: {
        type: Number,
        required: true
      },
      numReviews: {
        type: Number,
        required: true
      },
      meter: {
        type: Number,
        required: true
      }
    },
    lastUpdated: {
      type: Date,
      required: true
    },
    fresh: {
      type: Number,
      required: true
    },
    critic: {
      rating: {
        type: Number,
        required: true
      },
      numReviews: {
        type: Number,
        required: true
      },
      meter: {
        type: Number,
        required: true
      }
    }
  }
}, {
  timestamps: {
    createdAt: 'createdat',
    updatedAt: 'lastupdated'
  }
});


// Add Query Helpers
schema.query = {
  ...schema.query,
  byTitle: function (
    this: QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>,
    title: string) {
    return this.where({ title: new RegExp(title, 'i') });
  },
  byYear: function (
    this: QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>,
    year: number) {
    return this.where({ year });
  },
  byGenre: function (
    this: QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>,
    genre: string) {
    return this.where({ genres: genre });
  },
  byRuntime: function (
    this: QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>,
    min: number,
    max: number) {
    return this.where('runtime').gte(min).lte(max);
  },
  byLanguage: function (
    this: QueryWithHelpers<HydratedDocument<IMovieBase>[], HydratedDocument<IMovieBase>, IMovieQueryHelper>,
    language: string) {
    return this.where({ languages: language });
  }
}

schema.plugin(mongoosePaginate);


const Movies = model<IMovieBase, IMovieModel, IMovieQueryHelper>('Movie', schema);


export default Movies;