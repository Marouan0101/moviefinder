import React, { Component } from 'react';
import axios from 'axios';
import apiKey from '../Data/apiKey';
import styles from './styles/Searchbar.module.css';
import { FaStar, FaCircleNotch } from 'react-icons/fa';

class SearchBar extends Component {
  state = {
    movies: null,
    loading: false,
    value: '',
  };

  search = async (val) => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${val}&page=1&include_adult=false`
    );
    const movies = await res.data.results.slice(0, 10);

    this.setState({ movies, loading: false });
  };

  onChangeHandler = async (e) => {
    this.search(e.target.value);
    this.setState({ value: e.target.value, loading: true });
  };

  get renderMovies() {
    let movies;
    if (this.state.value === '') {
      return;
    } else if (this.state.loading) {
      return (
        <div className={styles.searchresults}>
          <FaCircleNotch className='animate-spin text-center text-5xl items-center' />
        </div>
      );
    } else if (!this.state.movies && this.state.value) {
      movies = (
        <div className={styles.searchresults}>
          <h1 className='text-center'>No Results</h1>
        </div>
      );
    } else if (this.state.movies && this.state.value) {
      return (
        <div className={styles.searchresults}>
          {
            (movies = this.state.movies.map((movie) => {
              if (
                (movie.poster_path &&
                  movie.backdrop_path &&
                  movie.media_type === 'movie') ||
                (movie.profile_path && movie.media_type === 'person')
              ) {
                return (
                  <a
                    href={
                      movie.media_type === 'movie'
                        ? `/showMovie?id=${movie.id}`
                        : `/showPerson?id=${movie.id}`
                    }
                    className='block'
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        movie.media_type === 'movie'
                          ? movie.poster_path
                          : movie.profile_path
                      }`}
                    />

                    <div>
                      <p className={styles.movie_title}>
                        {movie.media_type === 'movie'
                          ? movie.title
                          : movie.original_title
                          ? movie.original_title
                          : movie.name}
                      </p>

                      <p className={styles.type}>
                        {movie.media_type === 'movie'
                          ? 'Movie'
                          : movie.media_type === 'person' &&
                            movie.known_for_department === 'Acting'
                          ? 'Actor'
                          : movie.known_for_department === 'Directing' &&
                            'Director'}
                      </p>

                      {movie.media_type === 'movie' && movie.vote_average > 0 && (
                        <p className={styles.rating}>
                          <FaStar /> {movie.vote_average}
                        </p>
                      )}
                    </div>
                  </a>
                );
              }
            }))
          }
        </div>
      );
    }

    return movies;
  }

  render() {
    return (
      <div className={styles.searchbar}>
        <input
          value={this.state.value}
          onChange={(e) => this.onChangeHandler(e)}
          placeholder='Search For Movies or People'
        />

        {this.renderMovies}
      </div>
    );
  }
}

export default SearchBar;
