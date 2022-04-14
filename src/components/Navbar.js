import React from 'react';
import styles from './styles/Navbar.module.css';
import NavigationLinks from '../Data/fetchNavigationLinks';
import SearchBar from './Searchbar';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className='flex'>
        <h1 className={styles.title}>MovieFinder</h1>

        {NavigationLinks().map((link) => {
          if (!link.hasChildren) {
            return link.url ? (
              <a
                key={link.id}
                href={link.url}
                className={
                  window.location.pathname === link.url && `${styles.active}`
                }
              >
                {link.title}
              </a>
            ) : (
              <a key={link.id}>{link.title}</a>
            );
          } else {
            return (
              <div className={styles.subnav}>
                <div className={styles.subnav_title}>{link.title}</div>

                <div className={styles.subnav_content}>
                  {link.children.length <= 0 ? (
                    <a>Loading...</a>
                  ) : (
                    link.children.genres.map((genre) => {
                      return <a key={genre.id}>{genre.name}</a>;
                    })
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>

      <SearchBar />
    </div>
  );
};

export default Navbar;
