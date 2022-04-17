import React from 'react';
import fetchTrailer from '../Data/fetchTrailer';
import { FaCircleNotch } from 'react-icons/fa';

const Trailer = ({ className }) => {
  const trailer = fetchTrailer();

  if (!trailer) {
    return (
      <div>
        Loading Trailer <FaCircleNotch className='animate-spin' />
      </div>
    );
  } else if (trailer && trailer.official !== false) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen='allowfullscreen'
      />
    );
  } else {
    return <></>;
  }
};

export default Trailer;
