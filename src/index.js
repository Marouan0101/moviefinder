import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NoPageFound from './pages/NoPageFound';
import Person from './pages/Person';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Movie' element={<Movie />} />
        <Route path='Person' element={<Person />} />
        <Route path='*' element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
