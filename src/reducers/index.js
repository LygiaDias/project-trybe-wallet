import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reduceIndex = combineReducers({ user, wallet });

export default reduceIndex;
