import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { PageAbout } from './about/about';
import { PageMain } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <Link className="header__link" to="/">
          Home
        </Link>
        <Link className="header__link" to="/about">
          About us
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
