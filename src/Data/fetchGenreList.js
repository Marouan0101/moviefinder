import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const FetchGenreList = () => {
  const genresAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(genresAPI);
        setGenres(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);
  return genres;
};

export default FetchGenreList;
