import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import params from './params';

const FetchMovie = () => {
  const movieAPI = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}&language=en-US`;

  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(movieAPI);
        setMovie(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return movie;
};

export default FetchMovie;
