import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';
import filter from '../helpers/queryFilter';

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

  /** Function to handle searching of users
   * @static
   * @param {Object} request
   * @param {Object} response
  * @returns {Object} response
   * @memberOf DocumentController
   */
  static searchDocuments(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const paged = request.query.page;
    const userRole = request.decoded.roleId;
    const userId = request.decoded.id;

    const parameters = [
      'id',
      'ownerId',
      'access',
      'ownerRoleId',
      'title',
      'content',
      'createdAt'
    ];
    let terms = {};
    if (search) {
      const searchList = search.split(/\s+/);
      terms = {
        $or: [{ title: { $iLike: { $any: searchList } } },
          { content: { $iLike: { $any: searchList } } }]
      };
    }
    const accessFilter = Auth.verifyAdmin(userRole) ?
      [] : [
        { access: 'public' },
        { ownerId: userId },
        { $and: [
          { access: 'role' },
          { ownerRoleId: userRole }
        ] }
      ];

    const searchFilter = [
      {
        title: {
          $like: `%${search}%` }
      }, {
        content: {
          $like: `%${search}%` }
      }
    ];

    if (search) {
      terms = {
        $or: [...searchFilter, ...accessFilter]
      };
    } else if (!Auth.verifyAdmin(userRole)) {
      terms = {
        $or: [...accessFilter]
      };
    }
    const queryBuilder = filter(request, parameters, terms);
    docDb.findAndCountAll(queryBuilder)
      .then((foundDocuments) => {
        if (foundDocuments.rows.length > 0) {
          const pageSize = limit || foundDocuments.count;
          const pageCount = Math.ceil(foundDocuments.count / limit) || 1;

          ResponseHandler.sendResponse(
            response,
            200,
            {
              documents: foundDocuments.rows,
              total_count: foundDocuments.count,
              page_size: pageSize,
              page_count: pageCount,
              page: paged

            }
          );
        } else {
          ResponseHandler.send404(response);
        }
      })
      .catch((error) => {
        ErrorHandler.handleRequestError(response, error);
      });
  }
}
export default DocumentController;
