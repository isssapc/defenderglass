
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ProductosCtrl', Controller);

    Controller.$inject = ['$log', 'ProductoSrv', 'productos'];
    function Controller($log, ProductoSrv, productos) {

        var self = this;

        self.productos = productos.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();
