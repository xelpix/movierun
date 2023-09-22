type QueryOptions = {
  selectFields: string[];
  'poster.url': string;
  sortField: string;
  sortType: string;
  top250: string;
  type: string;
  page: number;
  limit: number;
};

type Headers = {
  [key: string]: string;
};

export type Options = {
  query: {
    topMovies: QueryOptions;
    topCartoons: QueryOptions;
    topShows: QueryOptions;
    topAnime: QueryOptions;
    singleMovie: Partial<QueryOptions>;
  };
  headers: Headers;
};

export const options: Options = {
  headers: {
    'x-api-key': import.meta.env.VITE_X_API_KEY,
  },

  query: {
    singleMovie: {
      selectFields: ['id', 'name', 'rating', 'poster', 'year'],
      'poster.url': '!null',
    },
    topMovies: {
      selectFields: ['id', 'name', 'rating', 'poster', 'year'],
      'poster.url': '!null',
      sortField: 'top250',
      sortType: '1',
      top250: '!null',
      type: 'movie',
      page: 1,
      limit: 20,
    },
    topCartoons: {
      selectFields: ['id', 'name', 'rating', 'poster', 'year'],
      'poster.url': '!null',
      sortField: 'top250',
      sortType: '1',
      top250: '!null',
      type: 'cartoon',
      page: 1,
      limit: 20,
    },
    topShows: {
      selectFields: ['id', 'name', 'rating', 'poster', 'year'],
      'poster.url': '!null',
      sortField: 'top250',
      sortType: '1',
      top250: '!null',
      type: 'tv-series',
      page: 1,
      limit: 20,
    },
    topAnime: {
      selectFields: ['id', 'name', 'rating', 'poster', 'year'],
      'poster.url': '!null',
      sortField: 'top250',
      sortType: '1',
      top250: '!null',
      type: 'anime',
      page: 1,
      limit: 20,
    },
  },
};
