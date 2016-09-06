
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
                        $scope.$close($scope.usuario);
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


            modalInstance.result.then(function (copia) {
                self.edit_usuario(copia, u);
            }, function () {
                console.log("cancel edit");
            });
        };

        self.edit_usuario = function (usuario, original) {

            var i = self.usuarios.indexOf(original);

            var cambiar_password = usuario.cambiar_password;
            delete usuario.cambiar_password;
            if (!cambiar_password) {
                delete usuario.password;
            }

            var id_usuario = usuario.id_usuario;
            delete usuario.id_usuario;
            delete usuario.rol;

            for (var key in usuario) {
                if (usuario[key] === original[key]) {
                    delete usuario[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(usuario));

            if (!_.isEmpty(usuario)) {

                UsuarioSrv.update_usuario(id_usuario, usuario).then(function (response) {

                    self.usuarios[i] = response.data;
                    toaster.pop('info', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {

                }).finally(function (response) {

                });
            }

        };

        self.pre_del_usuario = function (u) {

            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, usuario) {

                    $scope.usuario = usuario;


                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    usuario: function () {
                        return u;
                    }
                }
            });


            modalInstance.result.then(function (result) {
                self.del_usuario(u);
            }, function () {
                console.log("cancel delete");
            });
        };

        self.del_usuario = function (usuario) {

            var i = self.usuarios.indexOf(usuario);

            UsuarioSrv.del_usuario(usuario.id_usuario).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.usuarios.splice(i, 1);
                    toaster.pop('info', '', 'Los datos se han actualizado correctamente');
                } else {
                    toaster.pop('danger', '', 'Los datos no se han actualizado correctamente');
                }

            }).catch(function (response) {
                toaster.pop('danger', '', 'Los datos no se han actualizado correctamente');
            }).finally(function (response) {

            });


        };


    }
})();
