angular.module('ikrpgApp.login.service', [])

.factory('processLogin', ['$http',
    function ($http) {
        var path = '/ajax/login_process.php';

        var factory = {};
        factory.tryLogin = $http.post(path, {
            Email: email,
            Password: password
        });

        return factory;
    }]
);
