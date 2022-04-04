import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Searchbar from './Searchbar';

export default class Navbar extends React.Component {
  state = {
    loading: true,
    genres: null,
    searchResults: null,
    searchQuery: null,
  };

  async componentDidMount() {
    const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&query=${this.state.searchQuery}&page=1&include_adult=true`;
    const responseSearch = await fetch(urlSearch);
    const searchData = await responseSearch.json();

    const urlGenres =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US';

    const responseGenres = await fetch(urlGenres);

    const genreData = await responseGenres.json();

    this.setState({
      genres: genreData.genres,
      searchResults: searchData.results,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.genres) {
      return <div>didn't find any genres</div>;
    }

    const showSearchResults = () => {
      if (this.state.searchResults == null) {
        return <h1>no results</h1>;
      } else {
        return (
          <ul>
            {console.log('Search query:  ', this.state.searchQuery)}
            {this.state.searchResults.map((results) => {
              console.log(results.title);

              <li>{results.title}</li>;
            })}
          </ul>
        );
      }
    };

    const searchbar = () => {
      return (
        <div>
          <input
            style={{ color: '#000', padding: '8px' }}
            type='text'
            placeholder='Search movies, actors...'
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
          />

          {showSearchResults()}
        </div>
      );
    };

    return (
      <div className={styles.navbar}>
        <h1>
          <Link className={styles.title} to='/'>
            MovieFinder
          </Link>
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

          <li className={styles.nav_item}>{searchbar()}</li>

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
