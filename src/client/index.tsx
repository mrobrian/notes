import * as React from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import Notes from './components/notes';

const composeEnhancers: (...enhanders: any[]) => any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store = Redux.createStore(
  rootReducer(history),
  composeEnhancers(
    Redux.applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/notes' />} />
        <Route path='/notes/:id' render={() => <Notes />} />
        <Route path='/notes' render={() => <Notes />} />
        <Route render={() => <div>Not found</div>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-root')
);