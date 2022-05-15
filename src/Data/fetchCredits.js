import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import params from './params';

const FetchCredits = (id) => {
  const personAPI = `https://api.themoviedb.org/3/person/${
    id ? id : params.id
  }/movie_credits?api_key=${apiKey}&language=en-US`;

  const [credits, setCredits] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(personAPI);
        setCredits(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);
  return credits;
};

export default FetchCredits;
