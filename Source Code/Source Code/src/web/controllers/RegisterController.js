function RegisterController($scope, $http, $location, ConfigService) {
    "use strict";
    $scope.doRegister = function () {
        $scope.errors = [];
        if ($scope.password != $scope.cpassword) {
            $scope.errors.push("Passwords do not match");
            return;
        }
        $http({
            method: 'post',
            url: ConfigService.api.url + ConfigService.api.endpoints.register,
            data: $.param({
                email: $scope.email,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                password: $scope.password,
                cpassword: $scope.cpassword
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (xhr) {
            var response = xhr.data;
            if (response.status === 'success') {
                $location.path('login').search('register', 'success');
            } else {
                if ($.isArray(response.message)) {
                    response.message.forEach(function (o) {
                        $scope.errors.push(o.field + ' ' + o.defaultMessage);
                    });
                } else {
                    $scope.errors.push(response.message);
                }
            }
        });
    };
}
export default RegisterController;