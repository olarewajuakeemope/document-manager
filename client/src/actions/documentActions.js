import axios from 'axios';
import types from './actionTypes';
/**
 * Function to dispatch action type of CREATE_DOCUMENT
 * @export
 * @param {Object} document
 * @returns {Object} action
 */
export function createDocument(document) {
  return {
    type: types.CREATE_DOCUMENT,
    document
  };
}
/**
 * Async Function to handle saving of documents
 * @export
 * @param {Object} document
 * @returns {Object} dispatch
 */
export function saveDocument(document) {
  window.userDocument = document;
  return dispatch => axios.post('/api/documents/', document).then((response) => {
    dispatch(createDocument(response.data));
  });
}
