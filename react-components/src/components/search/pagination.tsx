import { setCurrentPage } from 'helpers/redux/searchSlice';
import { IStore } from 'helpers/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Pagination = ({
  totalMovies,
  moviesPerPage,
}: {
  totalMovies: number;
  moviesPerPage: number;
}) => {
  const pages = [];

  const dispatch = useDispatch();
  const state = useSelector<IStore>((state) => state) as IStore;

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  const setPage = (page: number) => {
    dispatch(
      setCurrentPage({
        searchItems: state.searchData.searchItems,
        currentPage: page,
        sort: state.searchData.sort,
        moviesPerPage: state.searchData.moviesPerPage,
      })
    );
  };

  return (
    <div className="search__pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            className={page === state.searchData.currentPage ? 'active_page' : 'nonactive_page'}
            onClick={() => setPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
