import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';
// import filter from '../helpers/queryFilter';

const docDb = model.Document;

/**
 * @class DocumentController
 */
class DocumentController {
  /**
   * Function used to format output data from this class
   * @static
   * @param {Object} document
   * @returns {Object} document
   * @memberOf DocumentController
   */
  static formatDocument(document) {
    return {
      id: document.id,
      title: document.title,
      content: document.content,
      ownerId: document.ownerId,
      ownerRoleId: document.ownerRoleId,
      access: document.access,
      createdAt: document.createdAt
    };
  }

  /**
   * Request handler that handles request for new documents
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf DocumentController
   */
  static createDocument(request, response) {
    const document = {
      title: request.body.title,
      content: request.body.content,
      ownerId: request.decoded.id,
      ownerRoleId: request.decoded.roleId,
      access: request.body.access || 'public'
    };
    docDb.create(document)
      .then((createdDocument) => {
        ResponseHandler.sendResponse(
          response,
          201,
          DocumentController.formatDocument(createdDocument));
      })
      .catch((error) => {
        ErrorHandler.handleRequestError(response, error);
      });
  }
}
export default DocumentController;
