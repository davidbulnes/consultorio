(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'eli', 'gio', 'user']
        }
      })
      .state('home.barras', {
        url: 'reports1',
        templateUrl: '/modules/core/client/views/home-partial.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reporte de Barras',
          roles: ['admin', 'eli', 'gio', 'user']
        }
      })
      .state('home.pastel', {
        url: 'reports2',
        templateUrl: '/modules/core/client/views/home-chart-pastel.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reporte de Pastel',
          roles: ['admin', 'eli', 'gio', 'user']
        }
      })
      .state('home.line', {
        url: 'reports3',
        templateUrl: '/modules/core/client/views/home-chart-line.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reporte Lineal',
          roles: ['admin', 'eli', 'gio', 'user']
        }
      })
      .state('homes.last', {
        url: 'ultimaAtencion',
        templateUrl: '/modules/core/client/views/home-last.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ultima Atencion',
          roles: ['admin', 'eli', 'gio', 'user']
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());
