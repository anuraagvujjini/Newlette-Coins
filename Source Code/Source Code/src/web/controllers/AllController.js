function AllController($scope, $location) {
    "use strict";
    $scope.destroyGame();
    switch ($location.path().replace('/', '')) {
        case 'login':
            $scope.tab = 'login';
            $scope.toggleLogin(true);
            break;
            break;
        case 'register':
            $scope.tab = 'register';
            $scope.toggleLogin(true);
            break;
        case 'forgot-password':
            $scope.tab = 'forgot-password';
            $scope.toggleLogin(true);
            break;
        case 'profile':
            $scope.tab = 'profile';
            $scope.toggleLogin(true);
            break;
        case 'history':
            $scope.tab = 'history';
            $scope.toggleLogin(true);
            break;
        default:
            $scope.toggleLogin(false);
    }
}
export default AllController;