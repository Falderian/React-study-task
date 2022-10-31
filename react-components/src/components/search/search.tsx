import { requestWithUrl } from 'api/API';
import { ICardResponse } from 'interfaces/searchCard';
import React, { RefObject, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'helpers/stateManamement/context';
import { SearchSelect } from './selectMoviesPerPage';
import { Pagination } from './pagination';
import { SearchSort } from './moviesSort';

export const PageSearchOnHooks = () => {
  const apiKey = `0e655211503a99e2b6a8909e76f606a6`;
  const apiImg = `https://image.tmdb.org/t/p/w500`;
  const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query`;
  const searchInput: RefObject<HTMLInputElement> = React.createRef();

  const router = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [loaded, setLoaded] = useState(true);

  const lastMovieIndex = state.currentPage * state.moviesPerPage;
  const firstMovieIndex = lastMovieIndex - state.moviesPerPage;
  const currentMovies = state.searchData.slice(firstMovieIndex, lastMovieIndex);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoaded(false);
    localStorage.setItem('search_input', searchInput.current!.value);

    const movies: ICardResponse[] = await requestWithUrl(
      apiSearch + '=' + searchInput.current!.value
    );
    dispatch({
      type: 'add_items_search',
      payload: {
        form_item: { name: '', date: '', select: '', courier: false, imgSrc: '' },
        search_items: movies,
        current_page: state.currentPage,
        sort: state.sort,
        movies_per_page: state.moviesPerPage,
      },
    });
    setLoaded(true);
  }

  return (
    <div className="search__wrapper">
      <div className="search">
        <form
          data-testid="form-id"
          className="search-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="search__input-div">
            <label htmlFor="search-form-input" className="search-form__label">
              Enter data request:
              <input
                required
                className="search-form__input"
                type="text"
                id="search-form-input"
                ref={searchInput}
                defaultValue={localStorage.getItem('search_input')!}
                placeholder="Type here"
              ></input>
            </label>
            <button
              data-destid="submit-btn"
              className="search-form_submit-btn"
              type="submit"
              id="submit-btn"
            >
              Send
            </button>
          </div>
          <SearchSelect />
          <SearchSort />
        </form>
      </div>
      {!loaded ? (
        <div className="spinner-block">
          <div className="spinner spinner-1"></div>
        </div>
      ) : (
        <div className="search__cards">
          {Boolean(!currentMovies.length) ? (
            <div className="search__not-found">Sorry, nothing was found.</div>
          ) : (
            currentMovies.map((el) => {
              return (
                <div key={el.id} className="card" data-testid="card">
                  <div className="card__img-cont">
                    <img src={apiImg + '/' + el.poster_path}></img>
                  </div>
                  <button
                    id={el.id.toString()}
                    className="card__btn"
                    onClick={(evt) => {
                      const movie = currentMovies.find((el) => {
                        el.id === Number((evt.target as HTMLButtonElement).id);
                        return el;
                      });
                      router(`${(evt.target as HTMLButtonElement).id}`);
                    }}
                  >
                    View more
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
      <Pagination totalMovies={state.searchData.length} moviesPerPage={state.moviesPerPage} />
    </div>
  );
};
