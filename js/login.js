function LoginCtrl($scope, $http) {
    $scope.Url = 'ajax/login_process.php';
    $scope.Email = '';
    $scope.Password = '';
    $scope.Result = '';
    $scope.EmailClass = '';
    $scope.PassClass = '';
    $scope.ResultClass = 'warning';
    
    $scope.LoginCheck = function() {
        if ($scope.Email === '') {
            $scope.Result = 'Email address is required.';
            $scope.EmailClass = ' error';
            $scope.PassClass = '';
            resultShowFade();
        } else if ($scope.Password === '') {
            $scope.Result = 'Password is required.';
            $scope.EmailClass = '';
            $scope.PassClass = ' error';
            resultShowFade();
        } else {
            $http.post($scope.Url, { Email: $scope.Email, Pass: $scope.Password }).success(function(data, status) {
                $scope.Status = status;
                $scope.Data = data;
                
                if ($scope.Data == 'BadUsername') {
                    $scope.Result = 'The email address you entered was not found.';
                    $scope.EmailClass = ' error';
                    $scope.PassClass = '';
                    $scope.ResultClass = 'warning';
                    resultShowFade();
                } else if ($scope.Data == 'BadPassword') {
                    $scope.Result = 'The password you entered was incorrect.';
                    $scope.EmailClass = '';
                    $scope.PassClass = ' error';
                    $scope.ResultClass = 'warning';
                    resultShowFade();
                } else if ($scope.Data == 'OKLogin') {
                    $scope.Result = 'Login successful. Redirecting...';
                    $scope.EmailClass = '';
                    $scope.PassClass = '';
                    $scope.ResultClass = 'success';
                    resultShowFade();
                    setTimeout("window.location = '/index.php'",2500);
                } else {
                    $scope.Result = $scope.Data;
                    $scope.EmailClass = '';
                    $scope.PassClass = '';
                    $scope.ResultClass = 'warning';
                }
            }).error(function(data, status) {
                $scope.Data = data || 'Request failed';
                $scope.Status = status;
                $scope.Result = $scope.Data;
                $('#resultWrap').show();
                $scope.EmailClass = '';
                $scope.PassClass = '';
            });
        }
    };
    
    function resultShowFade() {
        $('#resultWrap').show().delay(1500).fadeOut(1000, function() {
            $(this).hide().css('opacity', '1.0');
        });
        
    }
}
