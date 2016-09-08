(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const emojis = require('../routes/emojis');

    // *** register routes *** //
    app.use('/emojis', emojis);

  };

})(module.exports);
