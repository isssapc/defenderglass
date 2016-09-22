
(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('NuevoUsuarioCtrl', Controller);

    Controller.$inject = ['$log', 'UsuarioSrv', 'roles', '$scope', 'toaster'];
    function Controller($log, UsuarioSrv, roles, $scope, toaster) {

        var self = this;

        self.roles = roles.data;

        self.usuario = {};
        self.confirmar = "";



        self.add_usuario = function () {
            UsuarioSrv.add_usuario(self.usuario).then(function (response) {
                //console.log("nuevo usuario", JSON.stringify(response.data));
                self.usuario = {};
                self.confirmar = "";
                $scope.formNuevoUsuario.$setPristine();
                $scope.formNuevoUsuario.$setUntouched();

                toaster.pop('success', '', 'Los datos no has sido actualizados correctamente');
            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });
        };




    }
})();
