import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header className="header">
        <Link className="header__link" to="/">
          Home
        </Link>
        <Link className="header__link" to="/about">
          About us
        </Link>
      </header>
      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  );
};
