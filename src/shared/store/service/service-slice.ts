import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Service } from '@/shared/types';
import { SERVICE_FEE_ADJUSTMENTS } from '@/shared/constants';

const initialState: Service[] = SERVICE_FEE_ADJUSTMENTS.map(({ name, type }, index) => ({
  id: String(index),
  name: name,
  type: type,
  value: 0,
}));

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    updateServices: (state, action: PayloadAction<Service>) => {
      const index = state.findIndex((service) => service.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { updateServices } = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;