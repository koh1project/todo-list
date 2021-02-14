import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  // TODO: put some reducers from /user/user.reducer, /todo/todo.reducer
});

export default persistReducer(persistConfig, rootReducer);
