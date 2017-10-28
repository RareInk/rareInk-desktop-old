import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  GenericStoreEnhancer,
  Store
} from 'redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as StoreModule from './store';

export default function configureStore(history: History) {
  // Build middleware. These are functions that can process the actions before they reach the store.
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;

  // If devTools is installed, connect to it
  const devToolsExtension =
    windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;

  const createStoreWithMiddleware = compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      devToolsExtension ? devToolsExtension() : (f: any) => f
  )(createStore);

  // Combine all reducers and instantiate the app-wide store instance
  const allReducers = buildRootReducer(StoreModule.reducers);
  const store = createStoreWithMiddleware(allReducers) as Store<StoreModule.ApplicationState>;

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./store', () => {
      const nextRootReducer = require<typeof StoreModule>('./store');
      store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
    });
  }

  return store;
}

function buildRootReducer(allReducers: any) {
  return combineReducers<StoreModule.ApplicationState>({
    ...allReducers,
    routing: routerReducer
  });
}
