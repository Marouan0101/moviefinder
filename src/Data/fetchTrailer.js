import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './apiKey';
import fetchMovie from './fetchMovie';
import params from './params';

const FetchTrailer = () => {
  const videosAPI = `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${apiKey}&language=en-US`;
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(videosAPI);
        response.data.results.map((video) => {
          if (video.type === 'Trailer') {
            setTrailer(video);
          }
        });
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetch();
  }, []);

  return trailer;
};

export default FetchTrailer;
