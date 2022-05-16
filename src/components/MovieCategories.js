import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCircleNotch } from 'react-icons/fa';
import styles from './styles/MovieCategories.module.css';
import ScrollButtons from './ScrollButtons';

const MovieCategories = ({ movies, header, id }) => {
  if (!movies) {
    return (
      <div>
        Loading {header} <FaCircleNotch className='animate-spin' />
      </div>
    );
  }

  return movies.length ? (
    <div className={styles.category}>
      <div className={styles.category_header}>
        <h1 className={styles.title}>{header}</h1>
      </div>

      <div className='relative'>
        <div className={styles.movieList} id={id}>
          <ScrollButtons containerId={id} />
          {movies.map((movie) => {
            if (
              movie.poster_path &&
              movie.backdrop_path &&
              (movie.title || movie.original_title) &&
              movie.overview
            ) {
              return (
                <div key={movie.id} className={styles.movie}>
                  <a href={`/Movie?id=${movie.id}`}>
                    <img
                      className={styles.movie_img}
                      src={
                        'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                      }
                      alt={movie.title}
                    />
                  </a>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieCategories;
