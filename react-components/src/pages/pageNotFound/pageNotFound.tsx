import React from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>
        Erorr 404. Page is not found. Go <Link to="/"> Home </Link>
      </h1>
    </div>
  );
};
