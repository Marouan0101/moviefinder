import React from 'react';
import styles from './styles/Jumbotron.module.css';
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

    const filteredData = data.results.filter((movie) => {
      return movie.poster_path && movie.backdrop_path;
    });

    const finalData = filteredData.sort((a, b) =>
      a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
    );

    this.setState({
      movie: finalData[Math.floor(Math.random() * 5)],
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

    const truncate = (source, size) => {
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    };

    return (
      <div>
        <div className={styles.movie}>
          <div
            className={styles.header}
            style={{
              backgroundImage: `url(
                https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}
              )`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className={styles.content}>
              <h1 className={styles.title}>{this.state.movie.title}</h1>

              <p className={styles.overview}>
                {truncate(this.state.movie.overview, 300)}
              </p>

              <a
                className={styles.button}
                href={`/Movie?id=${this.state.movie.id}`}
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
