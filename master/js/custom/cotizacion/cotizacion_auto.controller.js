
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('CotizacionAutoCtrl', Controller);

    Controller.$inject = ['CotizacionSrv','ProductoSrv', '$uibModal', 'toaster', 'productos'];
    function Controller(CotizacionSrv,ProductoSrv, $uibModal, toaster, productos ) {

        var self = this;

        self.productos = productos.data;       


        self.pre_edit_producto = function (p) {

            var copia_cotizacion = angular.copy(p);
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

        self.edit_producto = function (producto, original) {

            var i = self.cotizaciones.indexOf(original);

            var cambiar_password = producto.cambiar_password;
            delete producto.cambiar_password;
            if (!cambiar_password) {
                delete producto.password;
            }

            var id_cotizacion = producto.id_cotizacion;
            delete producto.id_cotizacion;
            delete producto.rol;

            for (var key in producto) {
                if (producto[key] === original[key]) {
                    delete producto[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(producto));

            if (!_.isEmpty(producto)) {

                UsuarioSrv.update_cotizacion(id_cotizacion, producto).then(function (response) {

                    self.cotizaciones[i] = response.data;
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }).finally(function (response) {

                });
            }

        };

        self.pre_del_producto = function (p) {

            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, producto) {

                    $scope.producto = producto;


                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    producto: function () {
                        return p;
                    }
                }
            });


            modalInstance.result.then(function (result) {
                self.del_producto(p);
            }, function () {
                console.log("cancel delete");
            });
        };

        self.del_producto = function (producto) {

            var i = self.productos.indexOf(producto);

            ProductoSrv.del_precio_automotriz(producto.id_modelo).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.productos.splice(i, 1);
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
