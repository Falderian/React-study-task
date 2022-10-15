import { render, screen } from '@testing-library/react';
import { PageSearch } from 'components/search/search';
import '@testing-library/jest-dom';
import React, { Component } from 'react';
import { server } from './serverMocks.ts/server';
import { jackReacher } from './serverMocks.ts/serverRespond';
import { act } from 'react-dom/test-utils';

describe('Search Page tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Render page with api mock', async () => {
    const mockApi = jest
      .spyOn(PageSearch.prototype, 'baseApi')
      .mockImplementation(() => Promise.resolve(jackReacher));
    await act(async () => {
      const { container } = render(<PageSearch />);
    });
    expect(mockApi).toHaveBeenCalledTimes(1);
    const cardsButtons = screen.getAllByTestId('card');
    expect(cardsButtons.length).toEqual(3);
  });
});
