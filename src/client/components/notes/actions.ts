import { createAction } from 'redux-actions';

import Note from '../../../common/types/note';

export const NOTES_LIST_GET = 'NOTES_LIST_GET';
export const notesListGet = createAction(NOTES_LIST_GET);

export const NOTES_LIST_GET_SUCCESS = 'NOTES_LIST_GET_SUCCESS';
export const notesListGetSuccess = createAction<Note[]>(NOTES_LIST_GET_SUCCESS);

export const NOTE_DELETE = 'NOTE_DELETE';
export const noteDelete = createAction<number>(NOTE_DELETE);

export const NOTE_CREATE = 'NOTE_CREATE';
export const noteCreate = createAction(NOTE_CREATE);

export const NOTE_CREATE_SUCCESS = 'NOTE_CREATE_SUCCESS';
export const noteCreateSuccess = createAction<Note>(NOTE_CREATE_SUCCESS);

export const NOTE_UPDATE = 'NOTE_UPDATE';
export const noteUpdate = createAction<number, string>(NOTE_UPDATE, (id: number) => id, (_: number, text: string) => text);

export const NOTE_UPDATE_SUCCESS = 'NOTE_UPDATE_SUCCESS';
export const noteUpdateSuccess = createAction<Note>(NOTE_UPDATE_SUCCESS);
