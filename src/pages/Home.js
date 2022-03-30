import styles from './Home.module.css';
import MovieCategories from '../components/MovieCategories';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';

function App() {
  return (
    <>
      <Navbar />
      <Jumbotron api='https://api.themoviedb.org/3/movie/popular?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1' />
      <div className={styles.content}>
        <div className={styles.categories}>
          <MovieCategories
            header='Popular'
            id='popularMoviesList'
            api='https://api.themoviedb.org/3/trending/all/week?api_key=5d1ca884d832cc35c28f4c48849ebd48'
          />

          <MovieCategories
            header='Latest'
            id='recentMoviesList'
            api='https://api.themoviedb.org/3/discover/movie?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
          />

          <MovieCategories
            header='Top Rated'
            id='topRatedMoviesList'
            api='https://api.themoviedb.org/3/discover/movie?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
          />
        </div>
      </div>
    </>
  );
}

export default App;
