import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAbout } from './about/about';
import { PageFormsOnHooks } from './forms/pageForms';
import { Layout } from './layout/layout';
import { PageMainOnHooks } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';
import { MoviePage } from './search/moviePage';
import { PageSearchOnHooks } from './search/search';

import { Provider } from 'react-redux';
import store from '../helpers/redux/store';

const App = () => {
  return (
    <div>
      <Provider store={store}>
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
      </Provider>
    </div>
  );
};

export default App;
