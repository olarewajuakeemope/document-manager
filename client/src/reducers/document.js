import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';

let newState;

/**
 * Reducer function for documents to handle document actions
 * @export
 * @param {Object} [state=initialState.manageDocuments]
 * @param {Object} action
 * @returns {Object} state - updated
 */
export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.CREATE_DOCUMENT:
    newState = { ...state };
    newState.documents.push(action.document);
    return newState;

  default:
    return state;
  }
}
