function GameHistoryController($scope, $http, ConfigService, UserDataStorageService) {
    "use strict";

    $scope.results = [];
    $scope.totalResults = 0;
    $scope.resultsPerPage = 10;

    function getResultsPage(pageNumber) {
        $http({
            method: 'get',
            url: ConfigService.api.url + ConfigService.api.endpoints.history + '?page=' + (pageNumber - 1),
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Token': UserDataStorageService.sessionToken},
        }).success(function (response) {
            $scope.results = response.results;
            // console.log(response.results.length);
            $scope.totalResults = response.totalElements;
        });
    }

    $scope.formatDate = function (t) {
        return new Date(t).toLocaleString();    //return moment(t).fromNow();
    };


    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function (newPage) {
        getResultsPage(newPage);
    };
}
export default GameHistoryController;