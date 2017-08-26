import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

/**
 * @export
 * @class Auth
 */
export default class Auth {
  /**
   * Function to generate Tokens for users
   * @static
   * @param {Object} user
   * @returns {Object} tokenBody
   * @memberOf Auth
   */
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        roleId: user.roleId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }, secret, { expiresIn: 57600 });
  }
  /**
   * Function to activate Tokens for users
   * @static
   * @param {Object} user
   * @param {String} currentToken
   * @returns {none} none
   * @memberOf Auth
   */
  static activateToken(user, currentToken) {
    return user.update({ currentToken });
  }
  /**
    * Function to verify admin user
   * @static
   * @param {Number} roleId
   * @returns {Boolean} value
   * @memberOf Auth
   */
  static verifyAdmin(roleId) {
    return Number(roleId) === 1;
  }
  /**
    * Function to verify admin user
   * @static
   * @param {String} loginUserPassword
   * @param {String} dbUserPassword
   * @returns {Boolean} value
   * @memberOf Auth
   */
  static verifyPassword(loginUserPassword, dbUserPassword) {
    return bcrypt.compareSync(loginUserPassword, dbUserPassword);
  }
}
