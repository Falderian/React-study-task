import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.scss';

export const Layout = () => {
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
        <NavLink className="header__link" to="/mainOnHooks">
          MainOnHooks{' '}
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
