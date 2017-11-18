function ChangePasswordController($scope, $http, UserDataStorageService, ConfigService) {
    "use strict";
    $scope.savePassword = function () {
        $scope.errors = [];
        $scope.messages = [];
        if ($scope.password != $scope.cpassword) {
            $scope.errors.push("Passwords do not match");
            return;
        }
        $http({
            method: 'post',
            url: ConfigService.api.url + ConfigService.api.endpoints.changePassword,
            data: $.param({
                password: $scope.password,
                cpassword: $scope.cpassword
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Token': UserDataStorageService.sessionToken},
        }).then(function (xhr) {
            var response = xhr.data;
            if (response.status === 'success') {
                $scope.messages.push(response.message);
            } else {
                $scope.errors.push(response.message);
            }
        });
    };
}
export default ChangePasswordController;