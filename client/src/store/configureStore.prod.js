import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Function to configure redux store
 * @export
 * @param {Object} initialState
 * @returns {Function} createStore
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
