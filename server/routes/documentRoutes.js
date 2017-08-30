import DocumentMiddleware from '../middlewares/Document';
import DocumentController from '../controllers/DocumentController';
import Auth from '../middlewares/Auth';

const documentRoutes = (router) => {
  /**
   * @swagger
   * definition:
   *    NewDocument:
   *      type: object
   *      required:
   *        - title
   *        - content
   *      properties:
   *        title:
   *          type: string
   *        content:
   *          type: string
   *    Document:
   *      allOf:
   *        - $ref: '#definitions/NewDocument'
   *        - required:
   *        - id:
   *            type: integer
   *            format: int64
   */
  router.route('/api/documents')
    /**
     * @swagger
     * /api/documents:
     *   post:
     *     description: Creates a new document
     *     tags:
     *      - Create Document
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       201:
     *         description: documents
     *         schema:
     *          type: object
     */
    .post(Auth.authenticateUser, DocumentMiddleware.validateOnPost,
      DocumentController.createDocument);
};

export default documentRoutes;
