'use strict';

angular.module('ikrpgApp', [
    'ikrpgApp.home',
    'ikrpgApp.builder1',
    'ikrpgApp.builder2',
    'ikrpgApp.builder3',
    'ikrpgApp.sheet',
    'ikrpgApp.xp',
    'ikrpgApp.login',
    'ikrpgApp.login.service',
    'ikrpgApp.profile',
    'ui-router'
])

.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                $rootScope.redirState = toState;
                $rootScope.redirParams = toParams;
                $state.go('login');
            }
        });
    }]
)

.config(['$stateProvider', '$urlRouteProvider',
    function ($stateProvider, $urlRouteProvider) {
        $urlRouteProvider
            .otherwise('/login');

        $stateProvider
            .state('auth', {
                abstract: true,
                data: {
                    requireLogin: true;
                }
            });
    }]
);
