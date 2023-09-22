import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';

const Main = () => {
  const staticPics = [
    'https://images-s.kinorium.com/longread/1660/4961.jpg?20230310132140',
    'https://strek-time.ru/wp-content/uploads/4/6/1/4618f6e6489a1f20156652e899a2d34b.png',
    'https://images-na.ssl-images-amazon.com/images/I/81yvl0-nfBL._SL1500_.jpg',
    'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/5f16169e-d2e1-4a7b-a070-1f616be446c3/1920x',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const { user } = useUserAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === staticPics.length - 1 ? 0 : prevSlide + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full text-white mt-[60px]">
      <div className="w-full h-full flex">
        {staticPics.map((pic, index) => (
          <div
            key={index}
            className={`w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black opacity-75"></div>
            <img
              src={pic}
              alt={`Slide ${index + 1}`}
              className="w-full  xsm:h-[450px] sm:h-[550px] md:h-[650px] h-[350px] object-cover"
            />
          </div>
        ))}
        {user && (
          <Link to="/account">
            <button className="border-[2px] border-white bottom-[10%] left-[30px] font-bold absolute py-2 px-8 hover:bg-white hover:text-black transition duration-500">
              В коллекцию
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Main;
