const rewireMobX = require('react-app-rewire-mobx');

/* config-overrides.js */
module.exports = function override(config, env) {
    console.log('OVERRIDES')
    config = rewireMobX(config, env);
    return config;
}