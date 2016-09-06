
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('LogoutCtrl', Controller);

    Controller.$inject = ['$state', '$auth'];
    function Controller($state, $auth) {

        var self = this;

        $auth.removeToken();
        console.log("logout");
        $state.go('page.login');



    }
})();
