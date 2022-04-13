import { useState, useEffect } from 'react';
import styles from './styles/Home.module.css';
import MovieCategories from '../components/MovieCategories';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
import axios from 'axios';

function App() {
  return (
    <>
      <Navbar />
      <Jumbotron api='https://api.themoviedb.org/3/movie/popular?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1' />
      <div className={styles.content}>
        <div className={styles.categories}>
          <MovieCategories
            header='Popular'
            id='popularMovies'
            api='https://api.themoviedb.org/3/trending/all/week?api_key=5d1ca884d832cc35c28f4c48849ebd48'
          />

          <MovieCategories
            header='Latest'
            id='recentMovies'
            api='https://api.themoviedb.org/3/discover/movie?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
          />

          <MovieCategories
            header='Top Rated'
            id='topRatedMovies'
            api='https://api.themoviedb.org/3/movie/top_rated?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1&region=DK'
          />

          <MovieCategories
            header='Now Playing'
            id='nowPlayingMovies'
            api='https://api.themoviedb.org/3/movie/now_playing?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1'
          />

          <MovieCategories
            header='Upcoming'
            id='upcomingMovies'
            api='https://api.themoviedb.org/3/movie/upcoming?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1'
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
