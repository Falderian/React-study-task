import { createSlice } from '@reduxjs/toolkit';
import { IItemToRender } from 'interfaces/delivery';
import { ReduxAction } from 'interfaces/stateManagement';

const initialState: { formItems: IItemToRender[] } = { formItems: [] };

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    addItemForm(state, action: ReduxAction) {
      state.formItems.push(action.payload.formItem);
    },
  },
});

export const { addItemForm } = formSlice.actions;

export default formSlice.reducer;
