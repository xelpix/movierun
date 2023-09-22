import { MovieType } from '../context/AuthContext';

const Movie = ({ item }: { item: MovieType }) => {
  return (
    <div className="w-[160px] h-[230px] sm:w-[200px] sm:h-[280px] md:w-[240px] md:h-[340px] lg:w-[280px] lg:h-[400px] inline-block cursor-pointer relative p-2 my-2">
      <img className="w-full h-full object-cover block" src={item?.poster?.url} alt={item?.name} />
    </div>
  );
};

export default Movie;
