// import { apiUrl, requestWithUrl } from 'api/API';
import { IItemToRender } from 'interfaces/delivery';
import { ICardResponse } from 'interfaces/searchCard';
import { IState } from 'interfaces/stateManagement';
import React from 'react';

export const initialState: IState = {
  formData: [],
  searchData: [],
};

export type Taction = {
  type: string;
  payload: { form_item: IItemToRender; search_items: ICardResponse[] };
};

export const AppContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Taction>;
}>({
  state: initialState,
  dispatch: () => null,
});
