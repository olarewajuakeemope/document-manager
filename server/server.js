import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const router = express.Router();
routes(router);
module.exports = {
  app: () => {
    const app = express();
    const indexPath = path.join(__dirname, '../client/public/index.html');
    const publicPath = express.static(path.join(__dirname, '../client/dist/'));
    app.use('/', publicPath);


    // parse incoming request bodies as json with body-parser
    app.use(bodyParser.json());

    // parse incoming request as querystrings also
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(router);

    app.get('/', (_, res) => { res.sendFile(indexPath); });

    return app;
  }
};
