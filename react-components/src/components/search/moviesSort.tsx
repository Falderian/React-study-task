import { setSort } from 'helpers/redux/searchSlice';
import { IStore } from 'helpers/redux/store';
import { ICardResponse } from 'interfaces/searchCard';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SearchSort = () => {
  const selectInput = React.createRef<HTMLSelectElement>();

  const dispatch = useDispatch();
  const state = useSelector<IStore>((state) => state) as IStore;

  const handleSortChange = (str: string) => {
    const movies = sortMovies(state, str);
    dispatch(
      setSort({
        searchItems: movies,
        currentPage: state.searchData.currentPage,
        sort: str,
        moviesPerPage: state.searchData.moviesPerPage,
      })
    );
  };

  return (
    <div className="search__sort-div    ">
      <span className="search__select-text">Type of sort:</span>
      <select
        className="sort__select"
        ref={selectInput}
        onChange={(evt) => handleSortChange(evt.target.value)}
        defaultValue={state.searchData.sort}
      >
        <option id="sort__option-newest">by newest</option>
        <option id="sort__option-oldest">by oldest</option>
        <option id="sort__option-votes">by votes average(desc)</option>
      </select>
    </div>
  );
};

const sortMovies = (state: IStore, selectInput: string) => {
  let arr: ICardResponse[] = [];
  switch (selectInput) {
    case 'by oldest':
      arr = sortByOldest(state.searchData.searchItems);
      break;
    case 'by votes average(desc)':
      arr = sortByVotesAverage(state.searchData.searchItems);
      break;
    default:
      arr = sortByNewest(state.searchData.searchItems);
      break;
  }
  return arr;
};

const sortByOldest = (movies: ICardResponse[]): ICardResponse[] => {
  const temp = movies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateA.getTime() - dateB.getTime();
  });
  return temp;
};

const sortByNewest = (movies: ICardResponse[]): ICardResponse[] => {
  const temp = movies.slice().sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB.getTime() - dateA.getTime();
  });
  return temp;
};

const sortByVotesAverage = (movies: ICardResponse[]): ICardResponse[] => {
  const temp = movies.slice().sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
  return temp;
};
