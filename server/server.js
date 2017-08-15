import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

import routes from './routes/index';

const app = express();

const router = express.Router();
const port = process.env.PORT || 5600;

if (process.env.NODE_ENV == 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

// parse incoming request bodies as json with body-parser
app.use(bodyParser.json());
// parse incoming request as querystrings also
app.use(bodyParser.urlencoded({ extended: false }));


routes(router);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
app.use(router);


export default app;
