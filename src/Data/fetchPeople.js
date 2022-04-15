import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import params from './params';

const FetchPeople = () => {
  const peopleAPI = `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${apiKey}&language=en-US`;

  const [people, setPeople] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(peopleAPI);
        setPeople(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);
  return people;
};

export default FetchPeople;
