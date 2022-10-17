import { render, screen } from '@testing-library/react';
import { PageSearch, PageSearchOnHooks } from 'components/search/search';
import '@testing-library/jest-dom';
import React from 'react';
import { server } from './serverMocks.ts/server';
import { jackReacher } from './serverMocks.ts/serverRespond';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search Page tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Render page with api mock', async () => {
    const mockApi = jest
      .spyOn(PageSearch.prototype, 'baseApi')
      .mockImplementation(() => Promise.resolve(jackReacher));
    await act(async () => {
      render(<PageSearch />);
    });
    expect(mockApi).toHaveBeenCalledTimes(1);
    const cardsButtons = screen.getAllByTestId('card');
    expect(cardsButtons.length).toEqual(3);
  });
});

describe('Search Page on Hooks tests', () => {
  it('Render page with api mock', async () => {
    mockedAxios.get.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.get.mockResolvedValue({ data: jackReacher });
    await act(async () => {
      render(<PageSearchOnHooks />);
    });
    const cardsButtons = screen.getAllByTestId('card');
    expect(cardsButtons.length).toEqual(3);
    screen.debug();
  });
});
