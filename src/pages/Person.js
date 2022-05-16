import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import MovieCategories from '../components/MovieCategories';
import fetchPerson from '../Data/fetchPerson';
import fetchCredits from '../Data/fetchCredits';
import styles from './styles/Person.module.css';

const Person = () => {
  const person = fetchPerson();
  const credits = fetchCredits();

  if (person && credits) {
    document.title = `${person.name} | MovieFinder`;

    credits.cast.sort((a, b) =>
      a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
    );

    return (
      <>
        <Navbar />

        <div className='p-2 sm:p-8 lg:p-12 xl:p-14 2xl:p-20 '>
          <div className='flex space-x-10 h-80'>
            <img
              src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
              className=' rounded-xl'
            />
            <div className='flex-1'>
              <h1 className='text-5xl'>{person.name}</h1>

              <hr />

              <div className='text-xl'>
                <div className={styles.info}>
                  <span>Department: </span>
                  {person.known_for_department === 'Acting'
                    ? person.gender === 1
                      ? 'Actress'
                      : 'Actor'
                    : 'Director'}
                </div>
                <div className={styles.info}>
                  <span>Place of birth: </span>
                  {person.place_of_birth}
                </div>
                <div className={styles.info}>
                  <span>Birthday: </span>
                  {person.birthday}
                </div>
                <div className={styles.info}>
                  <span>Popularity: </span>
                  {person.popularity}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <h2 className='text-4xl text-center mb-8'>Biography</h2>
            <div className={styles.biography}>{person.biography}</div>
          </div>

          <MovieCategories
            movies={credits.cast}
            header='Featured Movies'
            id='featuredMovies'
          />
        </div>

        <Footer />
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Person;
