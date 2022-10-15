import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAbout } from './about/about';
import { PageForms } from './forms/pageForms';
import { Layout } from './layout/layout';
import { PageMain, PageMainOnHooks } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';
import { PageSearch } from './search/search';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageMain />} />
          <Route path="forms" element={<PageForms />} />
          <Route path="search" element={<PageSearch />} />
          <Route path="about" element={<PageAbout />} />
          <Route path="mainOnHooks" element={<PageMainOnHooks />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
