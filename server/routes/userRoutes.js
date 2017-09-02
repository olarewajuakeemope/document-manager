import Auth from '../middlewares/Auth';
import UserMiddleware from '../middlewares/Users';
import UserController from '../controllers/UserController';

const userRoutes = (router) => {
/**
 * @swagger
 * definition:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - email
 *       - password
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/users')
    /**
     * @swagger
     * /api/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object
     */
    .post(UserMiddleware.validateOnCreate, UserController.createUser)
    /**
     * @swagger
     * /api/users:
     *   get:
     *     description: Gets a list of all users
     *     tags:
     *      - Get Users List
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .get(Auth.authenticateUser,
      UserMiddleware.validateGetRequest,
      UserController.searchUsers);

  /**
 * @swagger
 * definition:
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 */
  router.route('/api/users/login')
    /**
     * @swagger
     * /api/users/login:
     *   post:
     *     description: Signs in a user
     *     tags:
     *      - Signs in a user
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Login'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object
     */

    .post(UserController.logIn);
};
export default userRoutes;
