import model from '../models';
import Auth from '../middlewares/Auth';
import ErrorHandler from '../helpers/ErrorHandler';
import filter from '../helpers/queryFilter';
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

  /** Function to handle login action for users
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static logIn(request, response) {
    if (request.body.email && request.body.password) {
      const newUser = request.body;
      model.User.findOne({ where: { email: newUser.email } })
        .then((user) => {
          if (user) {
            const verifyPassword = Auth.verifyPassword(
              newUser.password,
              user.password
            );
            if (verifyPassword) {
              const token = Auth.generateToken(user);
              user.update({ currentToken: token })
                .then(() => {
                  response.status(200).json({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roleId: user.roleId,
                    id: user.id,
                    createdAt: user.createdAt,
                    token
                  });
                });
            } else {
              ResponseHandler.send401(
                response,
                { message: 'Bad Login Details!' }
              );
            }
          } else {
            ResponseHandler.send404(response);
          }
        })
        .catch((error) => {
          response.send(error);
        });
    } else {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Operation! Please Enter valid login details' }
      );
    }
  }
  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} response
   * @memberOf UserController
   */
  static searchUsers(request, response) {
    const userRoleId = request.decoded.roleId;
    if (Auth.verifyAdmin(userRoleId)) {
      const search = request.query.search;
      const limit = request.query.limit;
      const paged = request.query.page;
      let terms = {};
      if (search) {
        const searchList = search.split(/\s+/);
        terms = {
          $or: [{ firstName: { $iLike: { $any: searchList } } },
            { lastName: { $iLike: { $any: searchList } } },
            { email: { $iLike: { $any: searchList } } }]
        };
      }
      const queryBuilder = filter(request, undefined, terms);
      model.User.findAndCountAll(queryBuilder)
        .then((users) => {
          if (users.rows.length > 0) {
            const pageSize = limit || users.count;
            const pageCount = Math.ceil(users.count / limit) || 1;
            ResponseHandler.sendResponse(
              response,
              200,
              {
                users: users.rows
                  .map(user => UserController.formatUserDetails(user)),
                total: users.count,
                page_size: pageSize,
                page_count: pageCount,
                page: paged
              }
            );
          } else {
            ResponseHandler.send404(response);
          }
        });
    } else {
      ResponseHandler.send403(response);
    }
  }
}

export default UserController;
