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
  return dispatch => axios.post('/api/documents/', document).then((response) => {
    dispatch(createDocument(response.data));
  });
}
/**
 * Function to dispatch action type of LOAD_DOCUMENT
 * @export
 * @param {Array} documents
 * @returns {Object} action
 */
export function loadDocuments(documents) {
  return { type: types.LOAD_DOCUMENT, documents };
}
/**
 * Async Function to handle loading all user documents
 * @export
 * @returns {Object} dispatch
 */
export function loadAllDocument() {
  return dispatch => axios.get('/api/documents').then((res) => {
    dispatch(loadDocuments(res.data.documents));
  });
}
