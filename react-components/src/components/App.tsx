import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAbout } from './about/about';
import { PageForms, PageFormsOnHooks } from './forms/pageForms';
import { Layout } from './layout/layout';
import { PageMainOnHooks } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';
import { PageSearch } from './search/search';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageMainOnHooks />} />
          <Route path="forms" element={<PageForms />} />
          <Route path="search" element={<PageSearch />} />
          <Route path="about" element={<PageAbout />} />
          <Route path="formOnHooks" element={<PageFormsOnHooks />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
