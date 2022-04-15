import React from 'react';
import { FaStar, FaCircleNotch, FaChartLine } from 'react-icons/fa';
import MovieCategory from '../components/MovieCategories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './styles/Movie.module.css';
import fetchMovie from '../Data/fetchMovie';
import fetchTrailer from '../Data/fetchTrailer';
import fetchProviders from '../Data/fetchProviders';
import fetchRecommendedMovies from '../Data/fetchRecommendedMovies';
import fetchPeople from '../Data/fetchPeople';

const ShowMovie = () => {
  const movie = fetchMovie();
  const providers = fetchProviders();
  const trailer = fetchTrailer();
  const recommendations = fetchRecommendedMovies();
  const people = fetchPeople();

  if (!movie) {
    return (
      <div>
        Loading Movie <FaCircleNotch className='animate-spin' />
      </div>
    );
  }
  //console.log(fetchPerson()[0]);
  const showMovie = () => {
    return (
      <div className={styles.movie}>
        <div
          className={styles.header}
          style={{
            backgroundImage: `url(
                https://image.tmdb.org/t/p/original${movie.backdrop_path}
              )`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className={styles.content}>
          <div className={styles.wrapper_title}>
            <h1 className={styles.title}>{movie.title}</h1>
            {showGenres()}
          </div>

          <div className='grid grid-cols-6 gap-10'>
            <div className='col-span-full md:col-span-4'>
              <div className='flex mb-2 justify-between items-center'>
                {movie.release_date && (
                  <p className={styles.release_date}>{movie.release_date}</p>
                )}

                {movie.production_companies && (
                  <ul className={styles.production_companies}>
                    {movie.production_companies.slice(0, 4).map((company) => {
                      if (company.logo_path) {
                        return (
                          <li key={company.id} className={styles.company}>
                            <img
                              src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                            />
                          </li>
                        );
                      }
                    })}
                  </ul>
                )}
              </div>

              <p className={styles.overview}>{movie.overview}</p>
              {showTrailer()}

              {people && (
                <div className='text-xl mt-20'>
                  {people.crew.map((person) => {
                    return (
                      person.job === 'Director' && (
                        <div className=''>
                          <hr className='border-primary border-[0.5px] mb-5' />
                          <span className='font-bold mr-10'>Director</span>
                          {person.name}
                        </div>
                      )
                    );
                  })}
                  <div className='mt-5'>
                    <hr className='border-primary border-[0.5px] mb-5' />

                    <div className='flex'>
                      <span className='font-bold mr-10'>Writers</span>

                      <div className='flex'>
                        {people.crew.map((person) => {
                          return (
                            person.job === 'Writer' && (
                              <div className='ml-10 first:ml-0'>
                                {person.name}
                              </div>
                            )
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className=' mt-5'>
                    <hr className='border-primary border-[0.5px] mb-5' />
                    <div className='flex'>
                      <span className='font-bold mr-10'>Stars</span>
                      <div className='flex'>
                        {people.cast.slice(0, 3).map((actor) => {
                          return (
                            <div className='ml-10 first:ml-0'>{actor.name}</div>
                          );
                        })}
                      </div>
                    </div>
                    <hr className='border-primary border-[0.5px] mt-5' />
                  </div>
                </div>
              )}
            </div>

            <div className='col-span-2'>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className={styles.poster}
              />

              <div className={styles.poster_info}>
                {movie.runtime !== 0 && (
                  <div className={styles.runtime}>{movie.runtime} min</div>
                )}

                {movie.vote_average !== 0 && (
                  <div className='lg:text-3xl text-2xl'>
                    <FaStar className={styles.icon_star} />
                    {movie.vote_average}
                  </div>
                )}
              </div>
              {showProviders()}
            </div>
          </div>

          {showCast()}

          <MovieCategory
            header='Others Also Liked'
            id='recommendedMovies'
            movies={recommendations}
          />
        </div>
      </div>
    );
  };

  const showCast = () => {
    if (people) {
      const cast = people.cast;
      const crew = people.crew;

      /* cast.sort((a, b) =>
        a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
      ); */

      return (
        <div>
          <div className={styles.cast}>
            {cast.map((person) => {
              if (person.profile_path && person.name) {
                return (
                  <div className={styles.actor}>
                    {person.profile_path && (
                      <img
                        className={styles.actor_img}
                        src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                      />
                    )}

                    <div className={styles.actor_info}>
                      <div className={styles.actor_name}>{person.name}</div>

                      {person.character && (
                        <div className={styles.actor_character}>
                          As {person.character}
                        </div>
                      )}

                      <div className={styles.actor_popularity}>
                        <FaChartLine className={styles.icon_chartline} />{' '}
                        {person.popularity}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }
  };

  const showGenres = () => {
    if (movie.genres) {
      return (
        <ul className={styles.genres}>
          {movie.genres.map((genre) => {
            return <li className={styles.genre}>{genre.name}</li>;
          })}
        </ul>
      );
    }
  };

  const showProviders = () => {
    if (providers && providers.flatrate) {
      return (
        <ul className={styles.providers}>
          {providers.flatrate.map((provider) => {
            return (
              <li className={styles.provider}>
                <a href={providers.link} target='_blank'>
                  <img
                    src={
                      'https://image.tmdb.org/t/p/original/' +
                      provider.logo_path
                    }
                    alt={provider.provider_name}
                    className={styles.provider_logo}
                  ></img>
                </a>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  const showTrailer = () => {
    if (trailer && trailer.official !== false) {
      return (
        <iframe
          className={styles.trailer}
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen='allowfullscreen'
        />
      );
    }
  };

  return (
    <div>
      <Navbar />
      {showMovie()}
      <Footer />
    </div>
  );
};

export default ShowMovie;
