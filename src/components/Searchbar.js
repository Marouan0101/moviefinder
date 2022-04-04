import React from 'react';
import { useState } from 'react';

export default class Searchbar extends React.Component {
  state = {
    searchResults: null,
    loading: true,
  };

  async componentDidMount() {
    const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=5d1ca884d832cc35c28f4c48849ebd48&language=en-US&query=${this.state.searchResults}&page=1&include_adult=true`;
    const responseSearch = await fetch(urlSearch);
    const searchData = await responseSearch.json();

    this.setState({ searchResults: searchData.results, loading: false });
  }
  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <input
          type='text'
          onChange={(e) => this.setState({ searchResults: e.target.value })}
        />

        {this.searchResults.map((results) => {
          return <h1>{results.title}</h1>;
        })}
      </div>
    );
  }
}
