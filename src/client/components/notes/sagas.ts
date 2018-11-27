import { all, call, put, takeEvery, AllEffect, Effect } from 'redux-saga/effects';

import {
  NOTES_LIST_GET,
  NOTE_DELETE,
  NOTE_CREATE,
  noteCreateSuccess,
  notesListGetSuccess,
  NOTE_UPDATE,
  noteUpdateSuccess
} from './actions';
import * as NotesAPI from '../../services/notesApi';
import { Action, ActionMeta } from 'redux-actions';
import { push } from 'connected-react-router';
import Note from '../../../common/types/note';

function* getNotesList(): IterableIterator<Effect> {
  const result = yield call(NotesAPI.getAll);
  yield put(notesListGetSuccess(result));
}

function* deleteNote(action: Action<number>): IterableIterator<Effect> {
  yield call(NotesAPI.remove, action.payload);
  yield put(push('/notes'));
}

function* createNote(): IterableIterator<Effect> {
  const newNote: Note = yield call(NotesAPI.create);
  yield put(noteCreateSuccess(newNote));
  yield put(push(`/notes/${newNote.id}`))
}

function* updateNote(action: ActionMeta<number, string>): IterableIterator<Effect> {
  const result = yield call(NotesAPI.update, action.payload, action.meta);
  yield put(noteUpdateSuccess(result));
}

export default function* sagas(): IterableIterator<AllEffect> {
  yield all([
    takeEvery(NOTES_LIST_GET, getNotesList),
    takeEvery(NOTE_DELETE, deleteNote),
    takeEvery(NOTE_CREATE, createNote),
    takeEvery(NOTE_UPDATE, updateNote)
  ]);
}
