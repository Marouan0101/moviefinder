import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCategories.module.css';

export default class MovieCategories extends React.Component {
  state = {
    loading: true,
    movies: null,
  };

  async componentDidMount() {
    const url = `${this.props.api}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ movies: data.results, loading: false });
    //console.log(this.state.movie.genres);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.movies) {
      return <div>didn't find any movies</div>;
    }

    const scroll = (direction) => {
      let container = document.getElementById(`${this.props.id}`);
      let scrollCompleted = 0;

      const slideVar = setInterval(function () {
        scrollCompleted += 10;

        if (direction == 'left') {
          container.scrollLeft -= container.clientWidth * (1 - 0.95);
        } else {
          container.scrollLeft += container.clientWidth * (1 - 0.95);
        }

        if (scrollCompleted >= 100) {
          window.clearInterval(slideVar);
        }
      }, 17);
    };

    return (
      <div className={styles.category}>
        <div className={styles.category_header}>
          <h1>{this.props.header}</h1>
          <div className={styles.buttons}>
            <button type='button' onClick={() => scroll('left')}>
              {'<'}
            </button>
            <button type='button' onClick={() => scroll('right')}>
              {'>'}
            </button>
          </div>
        </div>
        <div className={styles.movieList} id={this.props.id}>
          {this.state.movies.map((movie) => {
            return (
              <div key={movie.id} className={styles.movie}>
                <Link to={`ShowMovie?id=${movie.id}`}>
                  <img
                    className={styles.movie_img}
                    src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                  />
                </Link>
                <h3 className={styles.movie_title}>{movie.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}