import path from 'path';
import express from 'express';
import routes from './routes/index';

const router = express.Router();
routes(router);
module.exports = {
  app: () => {
    const app = express();
    const indexPath = path.join(__dirname, '../client/public/index.html');
    const publicPath = express.static(path.join(__dirname, '../client/dist/'));
    app.use('/', publicPath);
    app.use(router);
    app.get('/', (_, res) => { res.sendFile(indexPath); });

    return app;
  }
};
