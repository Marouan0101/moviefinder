import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import fetchMovie from './fetchMovie';

const FetchRecommendedMovies = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const recommendedMoviesAPI = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
  const [recommendedMovies, setRecommendedMovies] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(recommendedMoviesAPI);
        setRecommendedMovies(response.data.results);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return recommendedMovies;
};

export default FetchRecommendedMovies;
