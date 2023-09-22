import { useEffect } from 'react';
import SavedShows from '../components/SavedShows';

const Account = () => {
  useEffect(() => {
    localStorage.setItem('lastPage', window.location.pathname);
  }, []);

  return (
    <div className="w-full mt-[80px]">
      <SavedShows />
    </div>
  );
};

export default Account;
