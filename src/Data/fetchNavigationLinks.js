import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';

const NavigationLinks = () => {
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
  return [
    { id: 1, title: 'Home', url: '/', hasChildren: false },
    { id: 2, title: 'Popular', url: '/Popular', hasChildren: false },
    {
      id: 3,
      title: 'Genres',
      hasChildren: true,
      children: genres,
    },
  ];
};

export default NavigationLinks;
