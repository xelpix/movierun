import { useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { FcGoogle } from 'react-icons/fc';

const Navbar = () => {
  const { user, logout, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const shouldRenderBackButton = location.pathname !== '/';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`bg-zinc-900 flex justify-between items-center p-4 z-[100] absolute w-full `}>
      <Link to="/">
        <h1 className="text-red-300 text-4xl font-bold cursor-pointer hidden sm:block">MOVIERUN</h1>
      </Link>
      {shouldRenderBackButton && (
        <Link to="/">
          <div className="text-red-300 text-4xl sm:hidden absolute left-5 top-[20px]">
            <TiArrowBack />
          </div>
        </Link>
      )}

      {user?.displayName ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4 font-bold hover:text-red-300 transition duration-500">
              {user.displayName}
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white font-bold text-zinc-900 px-6 py-2 rounded cursor-pointer hover:bg-red-300  transition duration-500"
          >
            Выйти
          </button>
        </div>
      ) : (
        <div className="justify-self-end">
          <button
            onClick={handleGoogleSignIn}
            className="flex gap-3 border-2 rounded px-6 py-2 text-white pr-4 font-bold hover:text-zinc-900 hover:bg-white transition duration-500"
          >
            Войти через <FcGoogle size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
