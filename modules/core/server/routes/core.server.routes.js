'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  app.route('/api/reports/meetday').get(core.getMeedDay);

  app.route('/api/reports/barras').get(core.reportBarras);

  app.route('/api/reports/barras/:cie10id/:yearcie10').get(core.listbarrasbyId);

  app.route('/api/reports/line').get(core.listPastel);
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  //app.param('cie10id', core.getcie10byid);


};
