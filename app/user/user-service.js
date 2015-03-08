angular.module('ikrpgApp.user.service', [])

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
)

.factory('profileDetails', ['$http',
    function ($http) {
        var path = '/ajax/profile.php';

        var factory = {};
        factory.getProfile = $http.post(path, {
            ReqType: 'GetProfile'
        });
        factory.setProfile = function (email, first, last, newPass, newPassVal) {
            return $http.post(path, {
                ReqType: 'EditProfile',
                Email: email,
                First: first,
                Last: last,
                NewPass: newPass,
                NewPassVal: newPassVal
            });
        }

        return factory;
    }]
);
