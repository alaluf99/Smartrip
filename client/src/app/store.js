import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Add here new reducers.
const rootReducer = combineReducers({
});

export default configureStore({
  reducer: rootReducer
});
