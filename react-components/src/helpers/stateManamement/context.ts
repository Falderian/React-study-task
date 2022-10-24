import { IItemToRender } from 'interfaces/delivery';
import { ICardResponse } from 'interfaces/searchCard';
import { IState } from 'interfaces/stateManagement';
import React from 'react';

export const initialState: IState = {
  formData: [],
  searchData: [],
  currentPage: 1,
  sort: 'by newest',
  moviesPerPage: 1,
};

export type Taction = {
  type: string;
  payload: {
    form_item: IItemToRender;
    current_page: number;
    search_items: ICardResponse[];
    sort: string;
    movies_per_page: number;
  };
};

export const AppContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Taction>;
}>({
  state: initialState,
  dispatch: () => null,
});
