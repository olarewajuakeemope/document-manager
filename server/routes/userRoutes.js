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
    .post(UserMiddleware.validateOnCreate, UserController.createUser);
};
export default userRoutes;
