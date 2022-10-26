import { configureStore } from '@reduxjs/toolkit';
import { IItemToRender } from 'interfaces/delivery';
import formReducer from './formSlice';

export default configureStore({
  reducer: {
    formsData: formReducer,
  },
});

export interface IStore {
  formsData: {
    formItems: IItemToRender[];
  };
}
