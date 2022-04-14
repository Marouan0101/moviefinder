import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const FetchNowPlayingMovies = () => {
  const nowPlayingMoviesAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  const [nowPlayingMovies, setNowPlayingMovies] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(nowPlayingMoviesAPI);
        setNowPlayingMovies(response.data.results);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return nowPlayingMovies;
};

export default FetchNowPlayingMovies;
