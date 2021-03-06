'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Pacientes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'eli', 'gio'],
    allows: [{
      resources: '/api/pacientes',
      permissions: '*'
    }, {
      resources: '/api/pacientes/:pacienteId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/pacientes',
      permissions: '*'
    }, {
      resources: '/api/pacientes/:pacienteId',
      permissions: '*'
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/pacientes',
      permissions: ['get']
    }, {
      resources: '/api/pacientes/:pacienteId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Pacientes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Paciente is being processed and the current user created it then allow any manipulation
  if (req.paciente && req.user && req.paciente.user && req.paciente.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
