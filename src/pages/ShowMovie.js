import React from 'react';
import { FaStar } from 'react-icons/fa';
import SimilarMovies from '../components/MovieCategories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './styles/ShowMovie.module.css';

let urlSimilarMovies;

export default class ShowMovie extends React.Component {
  state = {
    loading: true,
    movie: null,
    providers: null,
    trailer: null,
    similarMovies: null,
  };

  async componentDidMount() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const movieId = params.id;

    const urlMovie = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US`;
    const urlProvider = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=5d1ca884d832cc35c28f4c48849ebd48`;
    const urlTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US`;
    urlSimilarMovies = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&page=1`;

    const responseMovie = await fetch(urlMovie);
    const responseProvider = await fetch(urlProvider);
    const responseTrailer = await fetch(urlTrailer);
    const responseSimilarMovies = await fetch(urlSimilarMovies);

    const movieData = await responseMovie.json();
    const providerData = await responseProvider.json();
    const trailerData = await responseTrailer.json();
    const similarMoviesData = await responseSimilarMovies.json();

    this.setState({
      movie: movieData,
      providers: providerData.results['DK'],
      trailer: trailerData.results,
      similarMovies: similarMoviesData.results,
      loading: false,
    });

    this.state.trailer.map((trailer) => {
      if (trailer.type === 'Trailer') {
        this.setState({ trailer: trailer });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    const showGenres = () => {
      if (this.state.movie.genres) {
        return (
          <ul className={styles.genres}>
            {this.state.movie.genres.map((genre) => {
              return <li className={styles.genre}>{genre.name}</li>;
            })}
          </ul>
        );
      }
    };

    const showProviders = () => {
      if (this.state.providers && this.state.providers.flatrate) {
        return (
          <ul className={styles.providers}>
            {this.state.providers.flatrate.map((provider) => {
              return (
                <li className={styles.provider}>
                  <a href={this.state.providers.link} target='_blank'>
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
      if (this.state.trailer && this.state.trailer.official !== false) {
        return (
          <iframe
            className={styles.trailer}
            src={`https://www.youtube.com/embed/${this.state.trailer.key}`}
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen='allowfullscreen'
          />
        );
      }
    };

    const showMovie = () => {
      if (this.state.movie) {
        return (
          <div className={styles.movie}>
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(
                https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}
              )`,
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className={styles.content}>
              <div className={styles.wrapper_title}>
                <h1 className={styles.title}>{this.state.movie.title}</h1>
                {showGenres()}
              </div>

              <div className={`${styles.wrapper} `}>
                <div className={`${styles.overview_container}`}>
                  <div className='flex mb-2'>
                    {this.state.movie.release_date && (
                      <p className={styles.release_date}>
                        {this.state.movie.release_date}
                      </p>
                    )}

                    {this.state.movie.production_companies && (
                      <ul className={styles.production_companies}>
                        {this.state.movie.production_companies.map(
                          (company) => {
                            if (company.logo_path) {
                              return (
                                <li key={company.id} className={styles.company}>
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                  />
                                </li>
                              );
                            }
                          }
                        )}
                      </ul>
                    )}
                  </div>

                  <p className={styles.overview}>{this.state.movie.overview}</p>
                  {showTrailer()}
                </div>

                <div className={`${styles.wrapper_right} `}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`}
                    className={styles.overview_poster}
                  />

                  <div className={styles.poster_info}>
                    {this.state.movie.runtime !== 0 && (
                      <div className={styles.runtime}>
                        {this.state.movie.runtime} min
                      </div>
                    )}

                    {this.state.movie.vote_average !== 0 && (
                      <div className={styles.wrapper_rating}>
                        <FaStar className={styles.icon_star} />
                        {this.state.movie.vote_average}
                      </div>
                    )}
                  </div>
                  {showProviders()}
                </div>
              </div>

              <SimilarMovies
                header='You May Also Like'
                id='similarMovies'
                api={urlSimilarMovies}
              />
            </div>
          </div>
        );
      }
    };

    return (
      <>
        <Navbar />
        {showMovie()}
        <Footer />
      </>
    );
  }
}
