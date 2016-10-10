
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

        //self.clientes = clientes.data;
        self.clientes = [];

        self.get_page = function (tableState) {
            console.log("tableState");
            console.log(JSON.stringify(tableState));

            self.isLoading = true;
            var pagination = tableState.pagination;
            var start = pagination.start || 0;
            var number = pagination.number || 10;

            ClienteSrv.get_page(start, number, tableState).then(function (response) {
                self.clientes = response.data.clientes;
                tableState.pagination.numberOfPages = response.data.numberOfPages;
                self.isLoading = false;
            }).catch(function () {
                console.log("error");
            });
        };

    }
})();
