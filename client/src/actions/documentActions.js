import axios from 'axios';
import toastr from 'toastr';
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
/**
 * Function to dispatch action type of DELETE_DOCUMENT
 * @export
 * @param {Number} id
 * @returns {Object} action
 */
export function deleteDocument(id) {
  return {
    type: types.DELETE_DOCUMENT,
    id
  };
}
/**
 * Async Function to handle deletion of user documents by id
 * @export
 * @param {Object} id
 * @returns {Object} dispatch
 */
export function deleteDocumentById(id) {
  return dispatch => axios.delete(`/api/documents/${id}`).then(() => {
    dispatch(deleteDocument(id));
    return toastr.success('Document deleted successfully!');
  });
}
/**
 * Function to dispatch action type of EDIT_DOCUMENT
 * @export
 * @param {Object} document
 * @returns {Object} action
 */
export function editDocument(document) {
  return {
    type: types.EDIT_DOCUMENT,
    document
  };
}
/**
 * Function to dispatch action type of EDIT_DOCUMENT
 * @export
 * @param {Object} document
 * @returns {Object} action
 */
export function editDocumentCompleted() {
  return {
    type: types.EDIT_DOCUMENT_COMPLETED
  };
}
/**
 * Async Function to handle updates on documents
 * @export
 * @param {Object} document
 * @returns {Object} dispatch
 */
export function updateDocument(document) {
  return dispatch => axios.put(`/api/documents/${document.id}`, document)
    .then(() => {
      dispatch(loadAllDocument());
    });
}
