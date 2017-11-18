function AppConfig($provide, $httpProvider, $routeProvider, ConfigServiceProvider, UserDataStorageServiceProvider) {
    var ConfigService = ConfigServiceProvider.$get();
    var UserDataStorageService = UserDataStorageServiceProvider.$get()
    $routeProvider
        .when('/game', {
            templateUrl: 'views/game.html',
            controller: 'GameController',
            resolve: {
                session: ['$http', '$q', function ($http, $q) {
                    var q = $q.defer();
                    $http({
                        method: 'get',
                        url: ConfigService.api.url + ConfigService.api.endpoints.userInfo,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Token': UserDataStorageService.sessionToken},
                    }).success(function () {
                        q.resolve();
                    }).error(function () {
                        q.reject();
                    });
                    return q.promise;
                }]
            }
        })
        .when('/login', {
            templateUrl: 'views/login-register-all.html',
            controller: 'AllController'
        })
        .when('/register', {
            templateUrl: 'views/login-register-all.html',
            controller: "AllController"
        })
        .when('/forgot-password', {
            templateUrl: 'views/login-register-all.html',
            controller: "AllController"
        })
        .when('/profile', {
            templateUrl: 'views/profile-change-password.html',
            controller: "AllController"
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'AllController'
        })
        .otherwise('/login');
    $provide.factory('my403interceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 403) {
                    $location.path('login').search('logout', 'nosession');
                }
            }
        };
    }]);
    $httpProvider.interceptors.push('my403interceptor');
}

export default AppConfig;