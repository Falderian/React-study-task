import { IItemToRender } from './delivery';
import { ICardResponse } from './searchCard';

export interface IState {
  formData: IItemToRender[];
  searchData: ICardResponse[];
  currentPage: number;
  sort: string;
  moviesPerPage: number;
}

export type ReduxAction = {
  type: string;
  payload: {
    formItem: IItemToRender;
  };
};
