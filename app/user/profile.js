angular.module('ikrpgApp.profile', ['ui.router', 'ikrpgApp.user.service'])

.config(['$stateProvider', '$urlRouteProvider',
    function ($stateProvider, $urlRouteProvider) {
        $stateProvder.state('auth.profile', {
            url: '/profile',
            templateUrl: '/app/user/profile.html',
            controller: 'profileController'
        });
    }]
)

.controller('profileController', function ($rootScope, $scope, profileDetails) {
    $scope.Email = '';
    $scope.First = '';
    $scope.Last = '';
    $scope.NewPass = '';
    $scope.NewPassCopy = '';
    $scope.Result = '';
    $scope.ResultClass = '';

    $scope.getProfile = function () {
        profileDetails.getProfile()
            .success(function (data, status) {
                $scope.Status = status;
                $scope.Data = data;
                $scope.Email = data.Email;
                $scope.First = data.First;
                $scope.Last = data.Last;
            })
            .error(function (data, status) {
                $scope.Data = data || 'Request failed';
                $scope.Status = status;
                $scope.Result = $scope.Data;
                $scope.ResultClass = 'important';
                $rootScope.resultShowFade($('#resultWrap'));
            });
    }

    $scope.editProfile = function () {
        if (typeof $scope.Email !== 'undefined' && typeof $scope.First !== 'undefined' && typeof $scope.Last !== 'undefined') {
            if ($scope.Email === $scope.Data.Email && $scope.First === $scope.Data.First && $scope.Last === $scope.Data.Last && $scope.NewPass === '') {
                $scope.Result = 'Nothing to save!';
                $scope.ResultClass = 'warning';
                $rootScope.resultShowFade('#resultWrap');
            } else {
                if (!$scope.invalidEmail()) {
                    if ($scope.NewPass !== '' && $scope.NewPass !== $scope.NewPassCopy) {
                        $scope.Result = 'Passwords do not match!';
                        $scope.ResultClass = 'warning';
                        $rootScope.resultShowFade($('#resultWrap'));
                    } else {
                        profileDetails.setProfile($scope.Email, $scope.First, $scope.Last, ($scope.NewPass !== ''), $scope.NewPass)
                            .success(function (data, status) {
                                $scope.Status = status;
                                $scope.Data = data;
                                if ($scope.Data === 'OK') {
                                    $scope.Result = 'Successfully saved!';
                                    $scope.ResultClass = 'success';
                                    $rootScope.resultShowFade($('#resultWrap'));
                                } else {
                                    $scope.Result = $scope.Data;
                                    $scope.ResultClass = 'important';
                                    $rootScope.resultShowFade($('#resultWrap'));
                                }
                            })
                            .error(function (data, status) {
                                $scope.Status = status;
                                $scope.Data = data || 'Request failed.';
                                $scope.Result = $scope.Data;
                                $scope.ResultClass = 'important';
                                $rootScope.resultShowFade($('#resultWrap'));
                            });
                    }
                } else {
                    $scope.Result = 'Email address is invalid.';
                    $scope.ResultClass = 'warning';
                    $rootScope.resultShowFade($('#resultWrap'));
                }
            } else {
                $scope.Result = 'Email address, first name, and last name are required fields.';
                $scope.ResultClass = 'warning';
                $rootScope.resultShowFade($('#resultWrap'));
            }
        }
    }

    $scope.invalidEmail = function () {
        var validEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if (validEmail.test($scope.Email)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.emailClass = function() {
        if ($scope.invalidEmail() || typeof $scope.Email === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    }

    $scope.firstClass = function() {
        if (typeof $scope.First === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    }

    $scope.lastClass = function() {
        if (typeof $scope.Last === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    }

    $scope.newPassClass = function() {
        if ($scope.NewPass !== '') {
            if ($scope.NewPass.length < 6) {
                return ' error';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    $scope.newPassCopyClass = function() {
        if ($scope.NewPass !== '') {
            if ($scope.NewPass !== $scope.NewPassCopy) {
                return ' error';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
});
