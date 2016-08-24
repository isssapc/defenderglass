
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('UsuariosCtrl', Controller);

    Controller.$inject = ['$log', 'UsuarioSrv', 'usuarios'];
    function Controller($log, UsuarioSrv, usuarios) {

        var self = this;

        self.usuarios = usuarios.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();
