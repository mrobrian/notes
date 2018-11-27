import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history';

import notesListReducer from './components/notes/reducer';

export default (history: History) => combineReducers({
  notes: notesListReducer,
  router: connectRouter(history)
});
