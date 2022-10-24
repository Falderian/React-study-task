import { AppContext } from 'helpers/stateManamement/context';
import React, { LegacyRef, useContext } from 'react';

export const SearchSelect = () => {
  const { state, dispatch } = useContext(AppContext);

  const selectInput: LegacyRef<HTMLSelectElement> = React.createRef();

  const setMoviesPerPage = () => {
    dispatch({
      type: 'set_movies_per_page',
      payload: {
        form_item: { name: '', date: '', select: '', courier: false, imgSrc: '' },
        search_items: [...state.searchData],
        current_page: 1,
        sort: state.sort,
        movies_per_page: Number(selectInput.current!.value),
      },
    });
  };

  return (
    <div className="search__select-wrapper">
      Movies per page:
      <select
        className="search__select"
        ref={selectInput}
        onChange={setMoviesPerPage}
        defaultValue={state.moviesPerPage}
      >
        {state.searchData.map((el) => {
          return (
            <option key={state.searchData.indexOf(el)}>{state.searchData.indexOf(el) + 1}</option>
          );
        })}
      </select>
    </div>
  );
};
