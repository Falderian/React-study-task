import { apiSearch, apiUrl, requestWithUrl } from 'api/API';
import { AppContext, initialState } from 'helpers/stateManamement/context';
import { reducer } from 'helpers/stateManamement/reducer';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAbout } from './about/about';
import { PageFormsOnHooks } from './forms/pageForms';
import { Layout } from './layout/layout';
import { PageMainOnHooks } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';
import { MoviePage } from './search/moviePage';
import { PageSearchOnHooks } from './search/search';

const App = () => {
  useEffect(() => {
    const searchInput = localStorage.getItem('search_input');
    requestWithUrl(apiSearch + '=' + searchInput).then((data) =>
      dispatch({
        type: 'add_items_search',
        payload: {
          form_item: { name: '', date: '', select: '', courier: false, imgSrc: '' },
          search_items: data,
          current_page: state.currentPage,
          sort: state.sort,
          movies_per_page: state.moviesPerPage,
        },
      })
    );
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageMainOnHooks />} />
            <Route path="forms" element={<PageFormsOnHooks />} />
            <Route path="search" element={<PageSearchOnHooks />} />
            <Route path="about" element={<PageAbout />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/search/:id" element={<MoviePage />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
