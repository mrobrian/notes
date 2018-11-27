import { all, call, spawn, AllEffect, Effect } from 'redux-saga/effects';

import notesListSaga from './components/notes/sagas';

export default function* rootSaga(): IterableIterator<AllEffect> {
  const sagas = [
    notesListSaga
  ];

  yield all(sagas.map((saga: () => IterableIterator<AllEffect>) => {
    return spawn(function* (): IterableIterator<Effect> {
      while (true) {
        try {
          yield call(saga);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }));
}
