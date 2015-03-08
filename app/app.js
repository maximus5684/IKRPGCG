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

        $rootScope.resultShowFade = function (jObject) {
            jObject.show().delay(1500).fadeOut(1000, function() {
                $(this).hide().css('opacity', '1.0');
            });
        }
    }]
)

.config(['$stateProvider', '$urlRouteProvider', '$httpProvider',
    function ($stateProvider, $urlRouteProvider, $httpProvider) {
        $urlRouteProvider
            .otherwise('/login');

        $stateProvider
            .state('auth', {
                abstract: true,
                data: {
                    requireLogin: true;
                }
            });

        //Handles 401 responses. Redirects to login.
        $httpProvider.interceptors.push(['$rootScope', '$q', '$injector',
            function ($rootScope, $q, $injector) {
                function success (response) {
                    return response;
                }

                function error (response) {
                    if (response.status === 401) {
                        var $state = $injector.get('$state');
                        $rootScope.redirState = $state.current;
                        $rootScope.redirParams = $state.params;
                        $state.go('login');
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }]
        );
    }]
);
