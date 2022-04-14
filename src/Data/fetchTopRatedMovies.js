import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const FetchTopRatedMovies = () => {
  const topRatedMoviesAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&region=DK`;
  const [topRatedMovies, setTopRatedMovies] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(topRatedMoviesAPI);
        setTopRatedMovies(response.data.results);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return topRatedMovies;
};

export default FetchTopRatedMovies;
