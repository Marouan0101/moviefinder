import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCircleNotch } from 'react-icons/fa';
import styles from './styles/MovieCategories.module.css';

const MovieCategories = ({ movies, header, id }) => {
  if (!movies) {
    return (
      <div>
        Loading {header} <FaCircleNotch className='animate-spin' />
      </div>
    );
  }

  const scroll = (direction) => {
    let container = document.getElementById(`${id}`);
    let scrollCompleted = 0;

    const slideVar = setInterval(function () {
      scrollCompleted += 10;

      if (direction === 'left') {
        container.scrollLeft -= container.clientWidth * (1 - 0.95);
      } else {
        container.scrollLeft += container.clientWidth * (1 - 0.95);
      }

      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 17);
  };

  return movies.length ? (
    <div className={styles.category}>
      <div className={styles.category_header}>
        <h1 className={styles.title}>{header}</h1>

        <div className={styles.buttons}>
          <button
            type='button'
            className={styles.button}
            onClick={() => scroll('left')}
          >
            <FaChevronLeft />
          </button>
          <button
            type='button'
            className={styles.button}
            onClick={() => scroll('right')}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className={styles.movieList} id={id}>
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
                    src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                    alt={movie.title}
                  />
                </a>
              </div>
            );
          }
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MovieCategories;
