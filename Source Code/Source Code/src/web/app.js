import angular from 'angular';
import ngRoute from 'angular-route';
import dirPagination from 'angular-utils-pagination';

import AppConfig from './config/AppConfig';

import AllController from './controllers/AllController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import GameController from './controllers/GameController';
import LoginController from './controllers/LoginController';
import MainController from './controllers/MainController';
import ProfileController from './controllers/ProfileController';
import GameHistoryController from './controllers/GameHistoryController';
import RegisterController from './controllers/RegisterController';
import ChangePasswordController from './controllers/ChangePasswordController';

import FormErrorsDirective from './directives/FormErrorsDirective';
import FormMessagesDirective from './directives/FormMessagesDirective';
import LoggedInHeaderDirective from './directives/LoggedInHeaderDirective';
import ShowTabDirective from './directives/ShowTabDirective';

import UserDataStorageService from './services/UserDataStorageService';
import ConfigService from './services/ConfigService';

var app = angular.module('NewletteApp', [ngRoute, dirPagination]);

// register services
app.service('ConfigService', ConfigService);
app.service('UserDataStorageService', UserDataStorageService);

// register controllers
app.controller('AllController', ['$scope', '$location', AllController])
    .controller('ForgotPasswordController', ['$scope', '$http', 'ConfigService', ForgotPasswordController])
    .controller('GameController', ['$scope', '$location', 'UserDataStorageService', GameController])
    .controller('LoginController', ['$scope', '$http', '$location', 'UserDataStorageService', 'ConfigService', LoginController])
    .controller('MainController', ['$scope', '$location', '$http', 'UserDataStorageService', 'ConfigService', MainController])
    .controller('ProfileController', ['$scope', '$location', '$http', 'UserDataStorageService', 'ConfigService', ProfileController])
    .controller('RegisterController', ['$scope', '$http', '$location', 'ConfigService', RegisterController])
    .controller('ChangePasswordController', ['$scope', '$http', 'UserDataStorageService', 'ConfigService', ChangePasswordController])
    .controller('GameHistoryController', ['$scope', '$http', 'ConfigService', 'UserDataStorageService', GameHistoryController]);

// register directives
app.directive('formErrors', FormErrorsDirective)
    .directive('formMessages', FormMessagesDirective)
    .directive('loggedInHeader', ['UserDataStorageService', LoggedInHeaderDirective])
    .directive('showTab', ShowTabDirective);

// config
app.config(['$provide', '$httpProvider', '$routeProvider', 'ConfigServiceProvider', 'UserDataStorageServiceProvider', AppConfig]);

export default app;