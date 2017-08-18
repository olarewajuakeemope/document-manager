const productionConfig = require('./configureStore.prod');
const developmentConfig = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = productionConfig;
} else {
  module.exports = developmentConfig;
}
