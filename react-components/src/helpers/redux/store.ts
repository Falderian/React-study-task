import { configureStore } from '@reduxjs/toolkit';
import { IItemToRender } from 'interfaces/delivery';
import { ICardResponse } from 'interfaces/searchCard';
import formReducer from './formSlice';
import searchReducer from './searchSlice';

export default configureStore({
  reducer: {
    formsData: formReducer,
    searchData: searchReducer,
  },
});

export interface IStore {
  formsData: {
    formItems: IItemToRender[];
  };
  searchData: {
    searchItems: ICardResponse[];
    currentPage: number;
    sort: string;
    moviesPerPage: number;
  };
}
