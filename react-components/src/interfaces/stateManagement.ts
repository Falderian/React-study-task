import { IItemToRender } from './delivery';
import { ICardResponse } from './searchCard';

export interface IState {
  formData: IItemToRender[];
  searchData: ICardResponse[];
  currentPage: number;
  sort: string;
  moviesPerPage: number;
}

export type FormAction = {
  type: string;
  payload: {
    formItem: IItemToRender;
  };
};

export type SearchAction = {
  type: string;
  payload: {
    searchItems: ICardResponse[];
    currentPage: number;
    sort: string;
    moviesPerPage: number;
  };
};

export type ISearchState = {
  searchItems: ICardResponse[];
  currentPage: number;
  sort: string;
  moviesPerPage: number;
};

export type AsyncThunkType = {
  type: 'string';
  payload: ICardResponse[];
};
