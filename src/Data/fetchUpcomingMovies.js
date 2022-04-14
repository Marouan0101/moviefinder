import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const FetchUpcomingMovies = () => {
  const upcomingMoviesAPI = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
  const [upcomingMovies, setUpcomingMovies] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(upcomingMoviesAPI);
        setUpcomingMovies(response.data.results);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return upcomingMovies;
};

export default FetchUpcomingMovies;
