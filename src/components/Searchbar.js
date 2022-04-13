import React, { Component } from 'react';
import axios from 'axios';

const apiKey = '5d1ca884d832cc35c28f4c48849ebd48';

class App extends Component {
  state = {
    movies: null,
    loading: false,
    value: '',
  };

  search = async (val) => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${val}&page=1&include_adult=true`
    );
    const movies = await res.data.results.slice(0, 10);

    this.setState({ movies, loading: false });
  };

  onChangeHandler = async (e) => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderMovies() {
    let movies;
    if (this.state.value) {
      movies = <h1>There's no movies</h1>;
    }
    if (this.state.movies && this.state.value) {
      return (
        <div className='absolute h-96 overflow-y-auto bg-black z-50  text-center w-60'>
          {
            (movies = this.state.movies.map((movie) => {
              if (
                (movie.poster_path && movie.backdrop_path) ||
                movie.profile_path
              ) {
                return (
                  <a
                    href={
                      movie.title
                        ? `/showMovie?id=${movie.id}`
                        : `/showPerson?id=${movie.id}`
                    }
                    className='block'
                  >
                    <img
                      className='w-full rounded-lg'
                      src={`https://image.tmdb.org/t/p/original${
                        movie.poster_path
                          ? movie.poster_path
                          : movie.profile_path
                      }`}
                    />
                    <p>
                      {movie.title
                        ? movie.title
                        : movie.original_title
                        ? movie.original_title
                        : movie.name}
                    </p>
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
      <div className=''>
        <input
          className='text-black w-60 px-3 py-2'
          value={this.state.value}
          onChange={(e) => this.onChangeHandler(e)}
          placeholder='Search For Movies or People'
        />

        {this.renderMovies}
      </div>
    );
  }
}

export default App;
