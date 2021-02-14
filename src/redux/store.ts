import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

