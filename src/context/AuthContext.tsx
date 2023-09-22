import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, User, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, onSnapshot, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

export type MovieType = {
  id: number;
  name: string;
  poster: {
    url: string;
  };
};

type AuthContextType = {
  user: User | null;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  movies: MovieType[];
  deleteShow: (id: number) => void;
  saveShow: (movie: MovieType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);

  // GOOGLE SIGN IN!
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // TO CREATE USER IN FIREBASE
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);

      if (result && result.user) {
        const { email } = result.user;

        const userDocRef = doc(db, 'users', `${email}`);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            savedShows: [],
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRedirectResult();
  }, []);

  // LOG OUT
  const logout = async (): Promise<void> => {
    await signOut(auth);
    localStorage.removeItem('lastPage');
  };

  // SAVE SHOW
  const collectionID = doc(db, 'users', `${user?.email}`);

  const saveShow = async (movie: MovieType) => {
    if (user?.email) {
      await updateDoc(collectionID, {
        savedShows: arrayUnion({
          id: movie.id,
          name: movie.name,
          poster: movie?.poster.url,
        }),
      });
    } else {
      alert('Чтобы добавить фильм в коллекцию, войдите в профиль!');
    }
  };

  // DELETE SHOW
  const deleteShow = async (id: number) => {
    const result = movies.filter((movie) => movie.id !== id);
    await updateDoc(collectionID, {
      savedShows: result,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        movies,
        deleteShow,
        saveShow,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext) as AuthContextType;
}
