import app from './web/app';

window.updateGlobalUserData = function (userData) {
    "use strict";
    var appElement = document.querySelector('[ng-app]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function () {
        $scope.userData = userData;
    });
};