function ForgotPasswordController($scope, $http, ConfigService) {
    "use strict";
    $scope.resetPassword = function () {
        $scope.errors = [];
        $scope.messages = [];
        $http({
            method: 'post',
            url: ConfigService.api.url + ConfigService.api.endpoints.forgotPassword,
            data: $.param({
                email: $scope.email
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
export default ForgotPasswordController;
