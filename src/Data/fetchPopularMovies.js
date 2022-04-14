import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const FetchPopularMovies = () => {
  const popularMoviesAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const [popularMovies, setPopularMovies] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(popularMoviesAPI);
        setPopularMovies(response.data.results);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return popularMovies;
};

export default FetchPopularMovies;
