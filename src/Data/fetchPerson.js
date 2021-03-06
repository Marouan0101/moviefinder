import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import params from './params';

const FetchPerson = (id) => {
  const personAPI = `https://api.themoviedb.org/3/person/${
    id ? id : params.id
  }?api_key=${apiKey}&language=en-US`;

  const [person, setPerson] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(personAPI);
        setPerson(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);
  return person;
};

export default FetchPerson;
