import { useEffect, useState } from 'react';
import { useUserAuth } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

type CollectedMovieType = {
  id: number;
  name: string;
  poster: string;
};

const SavedShows = () => {
  const [movies, setMovies] = useState<CollectedMovieType[]>([]);
  const { user, deleteShow } = useUserAuth();

  const collectionID = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    onSnapshot(collectionID, (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <>
      {movies.length ? (
        <h2 className="text-white font-bold md:text-xl p-4">Фильмы в вашей коллекции: </h2>
      ) : (
        <h2 className="text-white font-bold md:text-xl p-4">Вы пока не добавили фильмов </h2>
      )}
      <div className="relative flex items-center group">
        <SimpleBar
          forceVisible="x"
          autoHide={false}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar cursor-pointer"
        >
          {movies?.map((item, idx) => {
            return (
              <div key={idx} className="z-30 relative inline-block hover:bg-black/60 mb-5">
                <Link to={`/movies/${item.id}`}>
                  <div className="w-[160px] h-[230px] sm:w-[200px] sm:h-[280px] md:w-[240px] md:h-[340px] lg:w-[280px] lg:h-[400px] inline-block cursor-pointer relative p-2 my-2">
                    <img
                      className="w-full h-full object-cover block"
                      src={item?.poster}
                      alt={item?.name}
                    />
                  </div>
                </Link>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-6 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            );
          })}
        </SimpleBar>
      </div>
    </>
  );
};

export default SavedShows;
