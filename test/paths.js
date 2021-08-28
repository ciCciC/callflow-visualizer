'use strict';
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
  ROOT_PATH,
  OUTPUT_PATH: path.join(ROOT_PATH, 'dist'),
};
