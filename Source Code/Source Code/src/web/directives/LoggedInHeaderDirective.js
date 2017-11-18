function LoggedInHeaderDirective(UserDataStorageService) {
    "use strict";
    return {
        template: function () {
            if (UserDataStorageService.sessionToken) {
                return '<nav class="header">' +
                    '<div class="pull-right">' +
                    '<a href="javascript:void(0)" class="btn btn-sm text-white"><img height="18" class="total_points" src="/assets/total_points.png" alt="Balance"/> <strong>Balance</strong> : <span>{{userData.totalPoints}} {{nn.a}} </span></a>' +
                    '<a href="#history" class="btn btn-sm" title="Game History"><i class="glyphicon glyphicon-list-alt"></i></a>' +
                    '<a href="#profile" class="btn btn-sm" title="Profile"><i class="glyphicon glyphicon-user"></i></a>' +
                    '<a href="javascript:void(0)" class="btn btn-sm" title="Logout" ng-click="doLogout()"><i class="glyphicon glyphicon-off"></i></a>' +
                    '</div>' +
                    '</nav>';
            } else {
                return '<nav class="header text-center"></nav>' +
                    '<div class="logo"><img src="/assets/final_logo.png" id="logo"/></div>' +
                    '';
            }
        }
    };
}
export default LoggedInHeaderDirective