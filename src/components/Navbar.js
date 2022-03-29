import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default class Navbar extends React.Component {
  state = {
    loading: true,
    genres: null,
  };

  async componentDidMount() {
    const url =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ genres: data.genres, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.genres) {
      return <div>didn't find any genres</div>;
    }
    return (
      <div className={styles.navbar}>
        <h1>
          <Link to='/'>MovieFinder</Link>
        </h1>

        <ul className={styles.nav_items}>
          <li className={styles.nav_item}>
            <Link className={styles.nav_link} to='/Movies'>
              Movies
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link className={styles.nav_link} to='/TV'>
              TV
            </Link>
          </li>

          <li className={styles.nav_item}>
            <ul className={styles.nav_dropdown}>
              <li id='active'>Genres</li>

              {this.state.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
