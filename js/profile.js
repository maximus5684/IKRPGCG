function ProfileCtrl($scope, $http) {
    $scope.Url = 'ajax/profile.php';
    $scope.Email = '';
    $scope.First = '';
    $scope.Last = '';
    $scope.NewPass = '';
    $scope.NewPassCopy = '';
    $scope.Result = '';
    $scope.ResultClass = '';
    
    $scope.editProfile = function() {
        if (typeof $scope.Email !== 'undefined' && typeof $scope.First !== 'undefined' && typeof $scope.Last !== 'undefined') {
            if ($scope.Email == $scope.Data.Email && $scope.First == $scope.Data.First && $scope.Last == $scope.Data.Last && $scope.NewPass === '') {
                $scope.Result = 'Nothing to save!';
                $scope.ResultClass = 'warning';
                resultShowFade();
            } else {
                if (!$scope.invalidEmail()) {
                    if ($scope.NewPass !== '') {
                        if ($scope.NewPass !== $scope.NewPassCopy) {
                            $scope.Result = 'Passwords do not match!';
                            $scope.ResultClass = 'warning';
                            resultShowFade();
                        } else {
                            //Submit changes with new password.
                            $http.post($scope.Url, { ReqType: 'EditProfile',
                                                        Email: $scope.Email,
                                                        First: $scope.First,
                                                        Last: $scope.Last,
                                                        NewPass: true,
                                                        NewPassVal: $scope.NewPass
                            }).success(function(data, status) {
                                $scope.Status = status;
                                $scope.Data = data;
                                if ($scope.Data == 'OK') {
                                    $scope.Result = 'Successfully saved!';
                                    $scope.ResultClass = 'success';
                                    resultShowFade();
                                } else {
                                    $scope.Status = status;
                                    $scope.Data = data;
                                    $scope.Result = $scope.Data;
                                    $scope.ResultClass = 'important';
                                    resultShowFade();
                                }
                            }).error(function(data, status) {
                                $scope.Status = status;
                                $scope.Data = data || 'Request failed';
                                $scope.Result = $scope.Data;
                                $scope.ResultClass = 'important';
                                resultShowFade();
                            });
                        }
                    } else {
                        //Submit changes without new password.
                        $http.post($scope.Url, { ReqType: 'EditProfile',
                                                    Email: $scope.Email,
                                                    First: $scope.First,
                                                    Last: $scope.Last,
                                                    NewPass: false
                        }).success(function(data, status) {
                            $scope.Status = status;
                            $scope.Data = data;
                            if ($scope.Data == 'OK') {
                                $scope.Result = 'Successfully saved!';
                                $scope.ResultClass = 'success';
                                resultShowFade();
                            } else {
                                $scope.Status = status;
                                $scope.Data = data;
                                $scope.Result = $scope.Data;
                                $scope.ResultClass = 'important';
                                resultShowFade();
                            }
                        }).error(function(data, status) {
                            $scope.Status = status;
                            $scope.Data = data || 'Request failed';
                            $scope.Result = $scope.Data;
                            $scope.ResultClass = 'important';
                            resultShowFade();
                        });
                    }
                } else {
                    $scope.Result = 'Email address is invalid.';
                    $scope.ResultClass = 'warning';
                    resultShowFade();
                }
            }
        } else {
            $scope.Result = 'Email address, first name, and last name are required fields.';
            $scope.ResultClass = 'warning';
            resultShowFade();
        }
    };
    
    $scope.getProfile = function() {
        $http.post($scope.Url, { ReqType: 'GetProfile'
        }).success(function(data, status) {
            $scope.Status = status;
            $scope.Data = data;
            $scope.Email = data.Email;
            $scope.First = data.First;
            $scope.Last = data.Last;
        }).error(function(data, status) {
            $scope.Data = data || 'Request failed';
            $scope.Status = status;
            $scope.Result = $scope.Data;
            $scope.ResultClass = 'important';
            resultShowFade();
        });
    };
    
    $scope.invalidEmail = function() {
        var validEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        
        if (validEmail.test($scope.Email)) {
            return false;
        } else {
            return true;
        }
    };

    $scope.cancelClick = function() {
        window.location.href = '/index.php';
        return false;
    }
    
    $scope.emailClass = function() {
        if ($scope.invalidEmail() || typeof $scope.Email === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    };
    
    $scope.firstClass = function() {
        if (typeof $scope.First === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    };
    
    $scope.lastClass = function() {
        if (typeof $scope.Last === 'undefined') {
            return ' error';
        } else {
            return '';
        }
    };
    
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
    };
    
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
    };
    
    function resultShowFade() {
        $('#resultWrap').show().delay(1500).fadeOut(1000, function() {
            $(this).hide().css('opacity', '1.0');
        });
        
    }
}
