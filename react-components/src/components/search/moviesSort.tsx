import { AppContext } from 'helpers/stateManamement/context';
import { ICardResponse } from 'interfaces/searchCard';
import { IState } from 'interfaces/stateManagement';
import React, { useContext } from 'react';

export const SearchSort = () => {
  const { state, dispatch } = useContext(AppContext);
  const selectInput = React.createRef<HTMLSelectElement>();

  const handleSortChange = () => {
    dispatch({
      type: 'set_sort',
      payload: {
        form_item: { name: '', date: '', select: '', courier: false, imgSrc: '' },
        search_items: state.searchData,
        current_page: state.currentPage,
        sort: selectInput.current!.value,
        movies_per_page: state.moviesPerPage,
      },
    });
    sortMovies(state, selectInput.current!.value);
  };

  return (
    <div className="search__sort-div    ">
      <span className="search__select-text">Type of sort:</span>
      <select className="sort__select" ref={selectInput} onChange={handleSortChange}>
        <option id="sort__option-newest">by newest</option>
        <option id="sort__option-oldest">by oldest</option>
        <option id="sort__option-votes">by votes average(desc)</option>
      </select>
    </div>
  );
};

export const sortMovies = (state: IState, selectInput: string) => {
  switch (selectInput) {
    case 'by oldest':
      sortByOldest(state.searchData);
      break;
    case 'by votes average(desc)':
      sortByVotesAverage(state.searchData);
      break;
    default:
      sortByNewest(state.searchData);
      break;
  }
};

const sortByOldest = (movies: ICardResponse[]): ICardResponse[] => {
  movies.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateA.getTime() - dateB.getTime();
  });
  return movies;
};

const sortByNewest = (movies: ICardResponse[]): ICardResponse[] => {
  movies.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime();
  });
  return movies;
};

const sortByVotesAverage = (movies: ICardResponse[]): ICardResponse[] => {
  movies.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
  return movies;
};
