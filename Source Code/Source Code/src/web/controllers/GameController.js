import Game from '../../core/Game';
function GameController($scope, $location, UserDataStorageService) {
    "use strict";
    var UserData = UserDataStorageService;
    if(!UserData.sessionToken){
        $scope.toggleLogin(true);
        $location.path("login");
    }
    else{
        $scope.toggleLogin(false);
        window.game = new Game();
    }
}
export default GameController;