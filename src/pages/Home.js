import styles from './styles/Home.module.css';
import MovieCategories from '../components/MovieCategories';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import fetchPopularMovies from '../Data/fetchPopularMovies';
import fetchTopRatedMovies from '../Data/fetchTopRatedMovies';
import fetchNowPlayingMovies from '../Data/fetchNowPlayingMovies';
import React from 'react';
import fetchUpcomingMovies from '../Data/fetchUpcomingMovies';

function App() {
  return (
    <div>
      <Navbar />
      <Jumbotron api='https://api.themoviedb.org/3/movie/popular?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1' />
      <div className={styles.content}>
        <div className={styles.categories}>
          <MovieCategories
            header='Popular'
            id='popularMovies'
            movies={fetchPopularMovies()}
          />

          <MovieCategories
            header='Top Rated'
            id='topRatedMovies'
            movies={fetchTopRatedMovies()}
          />

          <MovieCategories
            header='Now Playing'
            id='nowPlayingMovies'
            movies={fetchNowPlayingMovies()}
          />

          <MovieCategories
            header='Upcoming'
            id='upcomingMovies'
            movies={fetchUpcomingMovies()}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
