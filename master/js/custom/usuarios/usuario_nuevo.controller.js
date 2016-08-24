
(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('NuevoUsuarioCtrl', Controller);

    Controller.$inject = ['$log', 'UsuarioSrv', 'roles', '$scope'];
    function Controller($log, UsuarioSrv, roles, $scope) {

        var self = this;

        self.roles = roles.data;

        self.usuario = {};



        self.add_usuario = function () {
            UsuarioSrv.add_usuario(self.usuario).then(function (response) {
                console.log("nuevo usuario", JSON.stringify(response.data));
                self.usuario = {};
                $scope.formNuevoUsuario.$setPristine();
                $scope.formNuevoUsuario.$setUntouched();


            }).catch(function (response) {
                console.log("error");
            }).finally(function (response) {

            });
        };




    }
})();
