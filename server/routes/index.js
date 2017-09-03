import documentRoutes from './documentRoutes';
import roleRoutes from './roleRoutes';
import userRoutes from './userRoutes';

const Routes = (router) => {
  documentRoutes(router);
  roleRoutes(router);
  userRoutes(router);
};

export default Routes;
