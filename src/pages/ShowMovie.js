import React from 'react';
import Navbar from '../components/Navbar';
import styles from './ShowMovie.module.css';

export default class ShowMovie extends React.Component {
  state = {
    loading: true,
    movie: null,
  };

  async componentDidMount() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const movieId = params.id;

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ movie: data, loading: false });
    console.log(this.state.movie);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.movie) {
      return <div>didn't get a movie</div>;
    }

    return (
      <>
        <Navbar />
        <div className={styles.movie}>
          <h1>{this.state.movie.title}</h1>
          <img
            className={styles.title}
            src={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`}
          />
          <p>{this.state.movie.overview}</p>
          <ul className={styles.genres}>
            {this.state.movie.genres.map((genre) => {
              return <li className={styles.genre}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </>
    );
  }
}