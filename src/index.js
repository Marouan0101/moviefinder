import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TV from './pages/TV';
import ShowMovie from './pages/ShowMovie';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Movies' element={<Movies />} />
        <Route path='TV' element={<TV />} />
        <Route path='ShowMovie' element={<ShowMovie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
