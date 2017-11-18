
function LoginController ($scope, $http, $location, UserDataStorageService,ConfigService) {
    "use strict";
    if ($location.search()['register'] === 'success') {
        $scope.registerMessage = 'Registration Successful, You can login now.'
    } else if ($location.search()['logout'] === 'success') {
        $scope.registerMessage = 'Logged out successfully!';
    } else if ($location.search()['logout'] === 'nosession') {
        $scope.registerMessage = "You've been logged out, please login again.";
    }

    $scope.doLogin = function () {
        $scope.errors = [];
        $scope.registerMessage = undefined;
        $http({
            method: 'post',
            url: ConfigService.api.url + ConfigService.api.endpoints.login,
            data: $.param({
                username: $scope.username,
                password: $scope.password
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (xhr) {
            var response = xhr.data;
            if (response.status === 'success') {
                UserDataStorageService.sessionToken = response.token;
                UserDataStorageService.totalPoints = response.user.totalPoints;
                UserDataStorageService.firstName = response.user.firstName;
                UserDataStorageService.lastName = response.user.lastName;
                UserDataStorageService.email = response.user.email;
                $location.path('game').search('');
            } else {
                $scope.errors.push(response.message);
            }
        });
    };
}
export default LoginController;