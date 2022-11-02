import { setMoviesPerPage } from 'helpers/redux/searchSlice';
import { IStore } from 'helpers/redux/store';
import React, { ChangeEventHandler, LegacyRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SearchSelect = () => {
  const dispatch = useDispatch();
  const state = useSelector<IStore>((state) => state) as IStore;
  const selectInput: LegacyRef<HTMLSelectElement> = React.createRef();

  const handleChange = () => {
    dispatch(
      setMoviesPerPage({
        searchItems: state.searchData.searchItems,
        currentPage: state.searchData.currentPage,
        sort: state.searchData.sort,
        moviesPerPage: Number(selectInput.current!.value),
      })
    );
  };

  return (
    <div className="search__select-wrapper">
      Movies per page:
      <select
        className="search__select"
        ref={selectInput}
        onChange={handleChange}
        defaultValue={state.searchData.moviesPerPage}
      >
        {state.searchData.searchItems.map((el) => {
          return (
            <option key={state.searchData.searchItems.indexOf(el)}>
              {state.searchData.searchItems.indexOf(el) + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};
