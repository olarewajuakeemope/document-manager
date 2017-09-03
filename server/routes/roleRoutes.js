import RoleMiddleware from '../middlewares/Role';
import RoleController from '../controllers/RoleController';
import Auth from '../middlewares/Auth';

const roleRoutes = (router) => {
  /**
 * @swagger
 * definition:
 *   NewRole:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  router.route('/api/roles')
  /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .post(Auth.authenticateUser, RoleMiddleware.validateOnPost,
      RoleController.createRole)
  /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Return all roles
     *     tags:
     *      - Return all roles
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Role'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(Auth.authenticateUser, RoleMiddleware.validateOnGet,
      RoleController.retrieveRoles);
};
export default roleRoutes;
