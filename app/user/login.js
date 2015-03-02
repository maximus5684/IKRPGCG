angular.module('ikrpgApp.login', ['ui.router'])

.config(['$stateProvider', '$urlRouteProvider',
    function ($stateProvider, $urlRouteProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/app/user/login.html',
            controller: 'loginController'
        });
    }]
)

.controller('loginController', function ($rootScope, $scope, $state, processLogin) {
    $scope.Result = '';
    $scope.EmailClass = '';
    $scope.PassClass = '';
    $scope.ResultClass = 'warning';

    $scope.LoginCheck = function() {
        if ($scope.Email === '') {
            $scope.Result = 'Email address is required.';
            $scope.EmailClass = ' error';
            $scope.PassClass = '';
            $scope.resultShowFade();
        } else if ($scope.Password === '') {
            $scope.Result = 'Password is required.';
            $scope.EmailClass = '';
            $scope.PassClass = ' error';
            $scope.resultShowFade();
        } else {
            processLogin.tryLogin($scope.Email, $scope.Password)
               .success(function (data, status) {
                    switch ($scope.Data) {
                        case 'BadUsername':
                            $scope.Result = 'The email address you entered was not found.';
                            $scope.EmailClass = ' error';
                            $scope.PassClass = '';
                            $scope.ResultClass = 'warning';
                            $scope.resultShowFade();
                            break;
                        case 'BadPassword':
                            $scope.Result = 'The password you entered was incorrect.';
                            $scope.EmailClass = '';
                            $scope.PassClass = ' error';
                            $scope.ResultClass = 'warning';
                            $scope.resultShowFade();
                            break;
                        case 'OKLogin':
                            $scope.Result = 'Login successful. Redirecting...';
                            $scope.EmailClass = '';
                            $scope.PassClass = '';
                            $scope.ResultClass = 'success';
                            $scope.resultShowFade();

                            if (typeof $rootScope.redirState === 'undefined') {
                                $state.go('auth.home');
                            } else {
                                var redirState = $rootScope.redirState;
                                var redirParams = $rootScope.redirParams;
                                delete $rootScope.redirState;
                                delete $rootScope.redirParams;
                                $state.go(redirState, redirParams);
                            }

                            break;
                        default:
                            $scope.Result = $scope.Data;
                            $scope.EmailClass = '';
                            $scope.PassClass = '';
                            $scope.ResultClass = 'warning';
                    }
                })
                .error(function (data, status) {
                    $scope.Data = data || 'Request failed.';
                    $scope.Result = $scope.Data;
                    $scope.Status = status;
                    $('#resultWrap').show();
                    $scope.EmailClass = '';
                    $scope.PassClass = '';
                });
        }
    };

    $scope.resultShowFade = function () {
        $('#resultWrap').show().delay(1500).fadeOut(1000, function() {
            $(this).hide().css('opacity', '1.0');
        });
    }
});
