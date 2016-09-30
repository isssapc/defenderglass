
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ClientesCtrl', Controller);

    Controller.$inject = ['$log', 'ClienteSrv', 'clientes'];
    function Controller($log, ClienteSrv, clientes) {

        var self = this;

        self.clientes = clientes.data;

    }
})();
