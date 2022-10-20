import { AppContext } from 'helpers/stateManamement/context';
import React, { Dispatch, SetStateAction, useContext } from 'react';

export const Pagination = ({
  totalMovies,
  moviesPerPage,
}: {
  totalMovies: number;
  moviesPerPage: number;
}) => {
  const { state, dispatch } = useContext(AppContext);
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  const setCurrentPage = (page: number) => {
    dispatch({
      type: 'set_current_page',
      payload: {
        form_item: { name: '', date: '', select: '', courier: false, imgSrc: '' },
        search_items: [...state.searchData],
        current_page: page,
        sort: state.sort,
      },
    });
  };

  return (
    <div className="search__pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            className={page === state.currentPage ? 'active_page' : 'nonactive_page'}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
