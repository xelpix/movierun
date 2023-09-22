import { useState, useEffect } from 'react';
import { useUserAuth } from '../context/AuthContext';
import axios from 'axios';
import { options } from '../queryOptions';
import { useParams } from 'react-router-dom';

const SingleMoviePageRequest = () => {
  const [movie, setMovie] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(false);
  const { movies, deleteShow, saveShow } = useUserAuth();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.kinopoisk.dev/v1.3/movie/${id}`, {
        params: options.query['singleMovie'],
        headers: options.headers,
      })
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
        setIsLoading(false);
      });
  }, []);

  const isMovieInCollection = movies?.some((mov) => mov.id === movie.id);

  useEffect(() => {
    if (isMovieInCollection) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [isMovieInCollection]);

  const displayedGenres = movie?.genres?.slice(0, 3);
  const displayedCountries = movie?.countries?.slice(0, 3);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center md:flex-row justify-center  mt-[100px] text-white">
      <div className="w-[350px]">
        <h1 className="text-3xl font-bold">{movie?.name}</h1>
        <img
          src={movie?.poster?.url}
          className="h-[500px] object-cover mt-[2rem]"
          alt={`${movie?.name} poster`}
        />
      </div>
      <div className="flex flex-col md:justify-between  h-[400px] p-6 mb-[160px]">
        {/* Fix? */}
        <div>
          <p>
            <span className="font-bold text-orange-600">Оценка КП:</span> {movie?.rating?.kp}
          </p>
          <p>
            <span className="font-bold text-orange-600">Страна: </span>
            {displayedCountries?.slice(0, 3)?.map((country: { name: string }, index: number) => {
              return (
                <span key={index}>
                  {country.name}
                  {index !== displayedCountries.length - 1 && ', '}
                </span>
              );
            })}
          </p>
          <p>
            <span className="font-bold text-orange-600">Год:</span> {movie?.year}
          </p>
          <p>
            <span className="font-bold text-orange-600">Жанр: </span>
            {displayedGenres?.slice(0, 3)?.map((genre: { name: string }, index: number) => {
              return (
                <span key={index}>
                  {genre.name}
                  {index !== displayedGenres.length - 1 && ', '}
                </span>
              );
            })}
          </p>

          <p>
            <span className="font-bold text-orange-600">Продолжительность: </span>
            {movie?.movieLength} минут
          </p>
          <p className="max-w-[400px]">
            <span className="font-bold text-orange-600">Описание:</span> {movie?.description}
          </p>
        </div>

        {like ? (
          <button
            onClick={() => deleteShow(movie.id)}
            className="bg-white font-bold text-zinc-900 px-6 py-2 rounded cursor-pointer hover:bg-red-300 hover:text-white transition duration-500 mt-4"
          >
            Удалить из коллекции
          </button>
        ) : (
          <button
            onClick={() => saveShow(movie)}
            className="bg-white font-bold text-zinc-900 px-6 py-2 rounded cursor-pointer hover:bg-red-300 hover:text-white transition duration-500 mt-4 "
          >
            Добавить в коллекцию
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleMoviePageRequest;
