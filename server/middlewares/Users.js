import ResponseHandler from '../helpers/ResponseHandler';
import auth from './Auth';

/**
 * @export
 * @class User
 */
export default class Users {
  /**
   * Function to validate Request for new users
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} validation message
   * @memberOf User
   */
  static validateOnCreate(req, res, next) {
    const roleId = req.body.roleId;
    if (roleId && auth.verifyAdmin(roleId)) {
      ResponseHandler.send403(res,
        { message: 'Cannot create Admin User' }
      );
    } else if (req.body.id) {
      ResponseHandler.send400(res,
        { message: 'Invalid User Id' }
      );
    } else {
      next();
    }
  }
}

