import { handleActions, Action } from 'redux-actions';

import {
  NOTES_LIST_GET_SUCCESS,
  NOTE_DELETE,
  NOTE_CREATE_SUCCESS,
  NOTE_UPDATE_SUCCESS
} from './actions';
import Note from '../../../common/types/note';

const initialState: Note[] = [];

const notesListReducer = handleActions<number | Note[] | Note>({
  [NOTE_CREATE_SUCCESS]: (currentState: Note[], action: Action<Note>): Note[] => {
    const newState = currentState.slice(0);
    if (action.payload) {
      newState.push(action.payload);
    }
    return newState;
  },
  [NOTE_DELETE]: (currentState: Note[], action: Action<number>): Note[] => {
    const index = currentState.findIndex((note: Note) => note.id === action.payload);
    if (index === -1) {
      return currentState;
    }
    const newState = currentState.slice(0);
    newState.splice(index, 1);
    return newState;
  },
  [NOTE_UPDATE_SUCCESS]: (currentState: Note[], action: Action<Note>): Note[] => {
    if (!action.payload) {
      return currentState;
    }
    const index = currentState.findIndex((note: Note) => note.id === action.payload!.id);
    if (index === -1) {
      return currentState;
    }
    const newState = currentState.slice(0);
    newState.splice(index, 1, action.payload);
    return newState;
  },
  [NOTES_LIST_GET_SUCCESS]: (currentState: Note[], action: Action<Note[]>): Note[] => {
    if (!action.payload) {
      return currentState;
    }
    return action.payload;
  }
}, initialState);

export default notesListReducer;
