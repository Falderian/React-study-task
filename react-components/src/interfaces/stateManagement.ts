import { IItemToRender } from './delivery';
import { ICardResponse } from './searchCard';

export interface IState {
  formData: IItemToRender[];
  searchData: ICardResponse[];
}
