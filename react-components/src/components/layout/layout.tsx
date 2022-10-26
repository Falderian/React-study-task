import { AnyAction } from '@reduxjs/toolkit';
import { apiSearch, fetchMovies } from 'api/API';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.scss';

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const searchInput = localStorage.getItem('search_input');
    const url = apiSearch + '=' + searchInput;
    dispatch(fetchMovies(url) as unknown as AnyAction);
  }, []);

  return (
    <div className="wrapper">
      <header className="header">
        <NavLink className="header__link" to="/">
          Home
        </NavLink>
        <NavLink className="header__link" to="/forms">
          Forms
        </NavLink>
        <NavLink className="header__link" to="/search">
          Search
        </NavLink>
        <NavLink className="header__link" to="/about">
          About us
        </NavLink>
      </header>
      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <a href="https://rs.school/" target="_blank" rel="noreferrer" className="rs-link">
          <img className="footer__logo" src="https://rs.school/images/rs_school.svg"></img>
        </a>
        <a href="https://github.com/Falderian" target="_blank" rel="noreferrer">
          <img
            className="footer__github"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          ></img>
        </a>
      </footer>
    </div>
  );
};
