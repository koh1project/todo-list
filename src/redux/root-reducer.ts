import { userReducer } from './user/user.reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
});


// @FIX: <any, any>を設定するとstore.tsのエラーは消える
//export default persistReducer<any, any>(persistConfig, rootReducer);
export default persistReducer(persistConfig, rootReducer);
