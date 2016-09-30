
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ClienteCtrl', Controller);

    Controller.$inject = ['$log', 'ClienteSrv', 'toaster', '$scope'];
    function Controller($log, ClienteSrv, toaster, $scope) {
        console.log("ClienteController");
        var self = this;

        self.cliente = {persona: 'F'};

        self.add_cliente = function () {
            ClienteSrv.add_cliente(self.cliente).then(function (response) {
                self.cliente = {persona: 'F'};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
            }).catch(function () {
                console.log("error");
            });

        };

    }
})();
