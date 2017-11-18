function ProfileController($scope, $location, $http, UserDataStorageService, ConfigService) {
    "use strict";
    $scope.firstName = UserDataStorageService.firstName;
    $scope.lastName = UserDataStorageService.lastName;
    $scope.email = UserDataStorageService.email;
    $scope.saveProfile = function () {
        $scope.messages = [];
        $scope.errors = [];
        $http({
            method: 'post',
            url: ConfigService.api.url + ConfigService.api.endpoints.profile,
            data: $.param({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Token': UserDataStorageService.sessionToken},
        }).success(function (response) {
            if (response.status === 'success') {
                $scope.messages.push(response.message);
                UserDataStorageService.totalPoints = response.user.totalPoints;
                UserDataStorageService.firstName = response.user.firstName;
                UserDataStorageService.lastName = response.user.lastName;
                UserDataStorageService.email = response.user.email;
            } else {
                $scope.errors.push(response.message);
            }
        });
    };
}
export default ProfileController;