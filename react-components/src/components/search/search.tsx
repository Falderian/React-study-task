import { fetchMovies } from 'api/API';
import { ICardResponse } from 'interfaces/searchCard';
import React, { RefObject, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchSelect } from './selectMoviesPerPage';
import { Pagination } from './pagination';
import { SearchSort } from './moviesSort';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from 'helpers/redux/store';
import { AnyAction } from 'redux';

export const PageSearchOnHooks = () => {
  const apiKey = `0e655211503a99e2b6a8909e76f606a6`;
  const apiImg = `https://image.tmdb.org/t/p/w500`;
  const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query`;
  const searchInput: RefObject<HTMLInputElement> = React.createRef();

  const router = useNavigate();
  const [loaded, setLoaded] = useState(true);

  const dispatch = useDispatch();
  const state = useSelector<IStore>((state) => state) as IStore;
  const searchItems = state.searchData.searchItems as ICardResponse[];
  const currentPage = state.searchData.currentPage as number;
  const moviesPerPage = state.searchData.moviesPerPage as number;

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = searchItems.slice(firstMovieIndex, lastMovieIndex);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoaded(false);
    localStorage.setItem('search_input', searchInput.current!.value);

    const url = apiSearch + '=' + searchInput.current!.value;
    dispatch(fetchMovies(url) as unknown as AnyAction);
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
          {Boolean(!currentMovies) ? (
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
      <Pagination totalMovies={searchItems.length} moviesPerPage={moviesPerPage} />
    </div>
  );
};
