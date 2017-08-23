import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';

/**
 * @class UserController
 */
class UserController {
  /**
   * Function used to format output data for user details
   * @static
   * @param {Object} user
   * @param {String} token
   * @returns {Object} user
   * @memberOf UserController
   */
  static formatUserDetails(user, token) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      token
    };
  }


  /**
   * Request handler that handles request for new users
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static createUser(request, response) {
    const user = request.body;
    user.roleId = user.roleId || 2;
    model.User.findOne({ where: { email: user.email } })
     .then((existingUser) => {  //eslint-disable-line
        if (existingUser) {
          return ResponseHandler.send409(response);
        }
        model.User.create(request.body)
          .then((newUser) => {
            const token = Auth.generateToken(newUser);
            Auth.activateToken(newUser, token)
              .then(() => {
                ResponseHandler.sendResponse(
                  response,
                  201,
                  Object.assign(
                    {},
                    UserController.formatUserDetails(newUser, token),
                    { roleId: newUser.roleId }
                  )
                );
              });
          })
          .catch((error) => {
            ErrorHandler.handleRequestError(response, error);
          });
      });
  }
}

export default UserController;
