import React from 'react';
import fetchPeople from '../Data/fetchPeople';
import styles from './styles/Cast.module.css';
import { FaChartLine } from 'react-icons/fa';
import ScrollButtons from './ScrollButtons';
import fetchPerson from '../Data/fetchPerson';

const Cast = () => {
  const people = fetchPeople();

  if (!people) {
    return <div>Loading Cast...</div>;
  } else if (people) {
    const cast = people.cast;
    const crew = people.crew;

    /* cast.sort((a, b) =>
      a.popularity < b.popularity ? 1 : b.popularity < a.popularity ? -1 : 0
    ); */

    return (
      <div className='relative'>
        <ScrollButtons containerId='cast' />
        <div className={styles.cast} id='cast'>
          {cast.map((person) => {
            console.log();
            if (person.profile_path && person.name) {
              return (
                <a href={`/Person?id=${person.id}`} className={styles.actor}>
                  {person.profile_path && (
                    <img
                      className={styles.actor_img}
                      src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                    />
                  )}

                  <div className={styles.actor_info}>
                    <div className={styles.actor_name}>{person.name}</div>

                    {person.character && (
                      <div className={styles.actor_character}>
                        As {person.character}
                      </div>
                    )}

                    <div className={styles.actor_popularity}>
                      <FaChartLine className={styles.icon_chartline} />{' '}
                      {person.popularity}
                    </div>
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>
    );
  }
};

export default Cast;
