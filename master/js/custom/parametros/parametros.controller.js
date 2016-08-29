
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ParametrosCtrl', Controller);

    Controller.$inject = ['$log', 'ParametroSrv', 'parametros'];
    function Controller($log, ParametroSrv, parametros) {

        var self = this;

        self.parametros = parametros.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();
