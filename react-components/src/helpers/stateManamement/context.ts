// import { apiUrl, requestWithUrl } from 'api/API';
import { IItemToRender } from 'interfaces/delivery';
import { ICardResponse } from 'interfaces/searchCard';
import { IState } from 'interfaces/stateManagement';
import React from 'react';

export const initialState: IState = {
  formData: [],
  searchData: [],
  currentPage: 1,
  sort: 'asc,',
};

export type Taction = {
  type: string;
  payload: {
    current_page: number;
    form_item: IItemToRender;
    search_items: ICardResponse[];
    sort: string;
  };
};

export const AppContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Taction>;
}>({
  state: initialState,
  dispatch: () => null,
});
