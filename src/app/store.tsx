import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';

// Define the type for the entire store state
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    app: appReducer
  },
});

export default store;

