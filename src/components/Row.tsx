import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import Skeleton from './Skeleton';
import Movie from './Movie';
import { options, Options } from '../queryOptions';
import { MovieType, useUserAuth } from '../context/AuthContext';

type RowProps = {
  title: string;
  queryOption: keyof Options['query'];
};

const Row = ({ title, queryOption }: RowProps) => {
  const { movies: contextMovies, deleteShow, saveShow } = useUserAuth();

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.kinopoisk.dev/v1.3/movie', {
        params: options.query[queryOption],
        headers: options.headers,
      })
      .then((response) => {
        console.log(response.data.docs);
        setMovies(response.data.docs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [queryOption]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl mt-4 ml-2">{title}</h2>
      <div className="relative flex items-center group">
        <SimpleBar
          forceVisible="x"
          autoHide={false}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar cursor-pointer"
        >
          {isLoading ? [...new Array(10)].map((_, index) => <Skeleton key={index} />) : ''}
          {movies.map((item, idx) => {
            const isMovieInCollection = contextMovies?.some((mov) => mov.id === item.id);
            return (
              <div key={idx} className="z-30 relative inline-block hover:bg-black/60 mb-5">
                <Link to={`/movies/${item.id}`}>
                  <Movie item={item} />
                </Link>

                {isMovieInCollection ? (
                  <FaHeart
                    onClick={() => deleteShow(item.id)}
                    className="absolute top-5 left-4 text-red-600"
                  />
                ) : (
                  <FaRegHeart
                    onClick={() => saveShow(item)}
                    className="absolute top-5 left-4 text-red-600"
                  />
                )}
              </div>
            );
          })}
        </SimpleBar>
      </div>
    </>
  );
};

export default Row;
