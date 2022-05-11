import React from 'react';
import styles from './styles/Navbar.module.css';
import NavigationLinks from '../Data/createNavigationLinks';
import SearchBar from './Searchbar';
import { MenuIcon, HomeIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const navbar = document.querySelector(`.${styles.navbar}`);

  const toggleMenu = () => {
    if (navbar) {
      navbar.classList.toggle(`${styles.open}`);
    }
  };

  return (
    <div className={`${styles.navbar}`}>
      <div className='lg:flex'>
        <MenuIcon className={styles.menu_icon} onClick={() => toggleMenu()} />

        <h1 className={styles.title}>MovieFinder</h1>

        <div className={styles.items}>
          {NavigationLinks().map((link) => {
            if (!link.hasChildren) {
              return link.url ? (
                <div className={`${styles.item}`}>
                  <a
                    key={link.id}
                    href={link.url}
                    className={`${styles.link} ${
                      window.location.pathname === link.url &&
                      `${styles.active}`
                    }`}
                  >
                    <div className={styles.icon}>{link.icon}</div>
                    <div className={styles.text}>{link.title}</div>
                  </a>
                </div>
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
      </div>
      <SearchBar className={styles.searchbar} />
    </div>
  );
};

export default Navbar;
