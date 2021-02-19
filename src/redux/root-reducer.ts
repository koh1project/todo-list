import { todoReducer } from './todo/todo.reducer';
import { userReducer } from './user/user.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer
});

export default persistReducer(persistConfig, rootReducer);
