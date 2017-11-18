function MainController ($scope, $location, $http, UserDataStorageService, ConfigService) {
    "use strict";
    $scope.login = false;
    $scope.userData = UserDataStorageService;
    $scope.toggleLogin = function (l) {
        $scope.login = l;
    };
    $scope.destroyGame = function () {
        window.game && window.game.destroy();
        window.game = undefined;
    };

    $scope.doLogout = function () {
        $http({
            method: 'get',
            url: ConfigService.api.url + ConfigService.api.endpoints.logout,
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Token': UserDataStorageService.sessionToken},
        }).then(function () {
            UserDataStorageService.sessionToken = undefined;
            $location.path('login').search('logout', 'success');
        });
    };
}
export default MainController;