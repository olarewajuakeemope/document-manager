import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

/**
 * Function to create store for the development environment
 * @export
 * @param {Object} initialState
 * @returns {Function} createStore
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

