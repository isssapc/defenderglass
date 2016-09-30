
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('CotizacionesCtrl', Controller);

    Controller.$inject = ['CotizacionSrv', '$uibModal', 'toaster', 'cotizaciones'];
    function Controller(CotizacionSrv, $uibModal, toaster, cotizaciones ) {

        var self = this;

        self.cotizaciones = cotizaciones.data;       


        self.pre_edit_cotizacion = function (u) {

            var copia_cotizacion = angular.copy(u);
            var modalInstance = $uibModal.open({
                templateUrl: editar_cotizacion_tpl,
                controller: function ($scope, cotizacion, roles) {

                    $scope.cotizacion = cotizacion;
                    $scope.roles = roles;

                    $scope.ok = function () {
                        $scope.$close($scope.cotizacion);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    cotizacion: function () {
                        return copia_cotizacion;
                    },
                    roles: function () {
                        return self.roles;
                    }
                }
            });


            modalInstance.result.then(function (copia) {
                self.edit_cotizacion(copia, u);
            }, function () {
                console.log("cancel edit");
            });
        };

        self.edit_cotizacion = function (cotizacion, original) {

            var i = self.cotizaciones.indexOf(original);

            var cambiar_password = cotizacion.cambiar_password;
            delete cotizacion.cambiar_password;
            if (!cambiar_password) {
                delete cotizacion.password;
            }

            var id_cotizacion = cotizacion.id_cotizacion;
            delete cotizacion.id_cotizacion;
            delete cotizacion.rol;

            for (var key in cotizacion) {
                if (cotizacion[key] === original[key]) {
                    delete cotizacion[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(cotizacion));

            if (!_.isEmpty(cotizacion)) {

                UsuarioSrv.update_cotizacion(id_cotizacion, cotizacion).then(function (response) {

                    self.cotizaciones[i] = response.data;
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }).finally(function (response) {

                });
            }

        };

        self.pre_del_cotizacion = function (u) {

            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, cotizacion) {

                    $scope.cotizacion = cotizacion;


                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    cotizacion: function () {
                        return u;
                    }
                }
            });


            modalInstance.result.then(function (result) {
                self.del_cotizacion(u);
            }, function () {
                console.log("cancel delete");
            });
        };

        self.del_cotizacion = function (cotizacion) {

            var i = self.cotizacions.indexOf(cotizacion);

            UsuarioSrv.del_cotizacion(cotizacion.id_cotizacion).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.cotizaciones.splice(i, 1);
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');
                } else {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }

            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });


        };


    }
})();
