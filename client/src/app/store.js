import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// Add here new reducers.
const rootReducer = combineReducers({
  counter: counterReducer,
});

export default configureStore({
  reducer: rootReducer
});
