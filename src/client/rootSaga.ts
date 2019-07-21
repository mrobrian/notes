import { all, call, spawn, AllEffect, Effect, ForkEffect } from 'redux-saga/effects';

import notesListSaga from './components/notes/sagas';

export default function* rootSaga(): IterableIterator<AllEffect<ForkEffect>> {
  const sagas = [
    notesListSaga
  ];

  yield all(sagas.map((saga: () => IterableIterator<AllEffect<ForkEffect>>) => {
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
