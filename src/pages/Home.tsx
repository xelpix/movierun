import Main from '../components/Main';
import Row from '../components/Row';

const Home = () => {
  return (
    <div className="pb-10">
      <Main />
      <Row title="Фильмы" queryOption="topMovies" />
      <Row title="Мультфильмы" queryOption="topCartoons" />
      <Row title="Сериалы" queryOption="topShows" />
      <Row title="Аниме" queryOption="topAnime" />
    </div>
  );
};
export default Home;
