import documentRoutes from './documentRoutes';
import userRoutes from './userRoutes';

const Routes = (router) => {
  documentRoutes(router);
  userRoutes(router);
};

export default Routes;
