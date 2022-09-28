import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <NavLink className="header__link" to="/">
          Home
        </NavLink>
        <NavLink className="header__link" to="/about">
          About us
        </NavLink>
      </header>
      <main className="main">
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
};
