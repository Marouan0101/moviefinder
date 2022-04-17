import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import styles from './styles/ScrollButtons.module.css';

const ScrollButtons = ({ containerId }) => {
  const scroll = (direction) => {
    const container = document.getElementById(`${containerId}`);
    let scrollCompleted = 0;

    const slideVar = setInterval(function () {
      scrollCompleted += 10;

      if (direction === 'left') {
        container.scrollLeft -= container.clientWidth * (1 - 0.95);
      } else {
        container.scrollLeft += container.clientWidth * (1 - 0.95);
      }

      if (scrollCompleted >= 100) {
        window.clearInterval(slideVar);
      }
    }, 17);
  };

  return (
    <>
      <button
        type='button'
        className={styles.button_left}
        onClick={() => scroll('left')}
      >
        <FaChevronLeft />
      </button>

      <button
        type='button'
        className={styles.button_right}
        onClick={() => scroll('right')}
      >
        <FaChevronRight />
      </button>
    </>
  );
};

export default ScrollButtons;
