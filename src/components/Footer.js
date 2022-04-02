import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link className={styles.title} to='/'>
        MovieFinder
      </Link>

      <hr />
      <p className={styles.copyright}>Marouan El Yattafti &copy;</p>
    </div>
  );
}
