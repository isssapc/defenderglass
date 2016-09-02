
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('UsuariosCtrl', Controller);

    Controller.$inject = ['UsuarioSrv', '$uibModal', 'toaster', 'usuarios', 'roles', 'editar_usuario_tpl'];
    function Controller(UsuarioSrv, $uibModal, toaster, usuarios, roles, editar_usuario_tpl) {

        var self = this;

        self.usuarios = usuarios.data;
        self.roles = roles.data;


        self.pre_edit_usuario = function (u) {

            var copia_usuario = angular.copy(u);
            var modalInstance = $uibModal.open({
                templateUrl: editar_usuario_tpl,
                controller: function ($scope, usuario, roles) {

                    $scope.usuario = usuario;
                    $scope.roles = roles;

                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    usuario: function () {
                        return copia_usuario;
                    },
                    roles: function () {
                        return self.roles;
                    }
                }
            });


            modalInstance.result.then(function (resultado) {
                console.log("response", resultado);
                self.edit_usuario(copia_usuario);
            }, function (response) {
                console.log("response", response);
            });
        };



        self.edit_usuario = function (usuario) {

            var i = self.usuarios.indexOf(usuario);
            var id_usuario = usuario.id_usuario;
            delete usuario.id_usuario;
            delete usuario.rol;


            UsuarioSrv.update_usuario(id_usuario, usuario).then(function (response) {
                self.usuarios[i] = response.data;
                toaster.pop('info', '', 'Los datos se han actualizado correctamente');
                console.log("toaster done");
            }).catch(function (response) {

            }).finally(function (response) {

            });

        };


    }
})();
