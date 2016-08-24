
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('GastosCtrl', Controller);

    Controller.$inject = ['$log', 'GastoSrv', 'gastos'];
    function Controller($log, GastoSrv, gastos) {

        var self = this;

        self.gastos = gastos.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();
