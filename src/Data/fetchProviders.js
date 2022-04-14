import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import params from './params';

const FetchProviders = () => {
  const providersAPI = `https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=${apiKey}`;
  const [providers, setProviders] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(providersAPI);
        setProviders(response.data.results['DK']);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return providers;
};

export default FetchProviders;
