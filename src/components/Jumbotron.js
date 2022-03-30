import React from 'react';
import styles from './Jumbotron.module.css';
import { Link } from 'react-router-dom';

export default class ShowMovie extends React.Component {
  state = {
    loading: true,
    movie: null,
  };

  async componentDidMount() {
    const url = `${this.props.api}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      movie: data.results[Math.floor(Math.random() * 4)],
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.movie) {
      return <div>didn't get any movies</div>;
    }

    return (
      <>
        <Link
          className={styles.movie}
          to={`ShowMovie?id=${this.state.movie.id}`}
        >
          <div
            className={styles.header}
            style={{
              backgroundImage: `url(
                https://image.tmdb.org/t/p/w500${this.state.movie.backdrop_path}
              )`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className={styles.content}>
              <h1 className={styles.title}>{this.state.movie.title}</h1>
              <p className={styles.overview}>{this.state.movie.overview}</p>
            </div>
          </div>
        </Link>
      </>
    );
  }
}