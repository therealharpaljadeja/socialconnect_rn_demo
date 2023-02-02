if (typeof global.self === 'undefined') {
  global.self = global;
}
global.btoa = require('Base64').btoa;
require('crypto');
