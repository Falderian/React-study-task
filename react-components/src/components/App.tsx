import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAbout } from './about/about';
import { Layout } from './layout/layout';
import { PageMain } from './main/main';
import { PageNotFound } from './pageNotFound/pageNotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageMain />} />
          <Route path="about" element={<PageAbout />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
