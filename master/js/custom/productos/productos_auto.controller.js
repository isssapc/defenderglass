
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ProductosAutoCtrl', Controller);

    Controller.$inject = ['ProductoSrv', '$uibModal', 'toaster', 'productos', 'editar_producto_auto_tpl'];
    function Controller(ProductoSrv, $uibModal, toaster, productos, editar_producto_auto_tpl) {

        var self = this;

        self.productos = productos.data;


        self.pre_edit_producto = function (p) {


            var modalInstance = $uibModal.open({
                templateUrl: editar_producto_auto_tpl,
                controller: function ($scope, producto) {

                    $scope.producto = producto;


                    $scope.ok = function () {
                        $scope.$close($scope.producto);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    producto: function () {
                        return angular.copy(p);
                    }
                }
            });


            modalInstance.result.then(function (copia) {
                self.edit_producto(p, copia);
            }, function () {
                console.log("cancel edit");
            });
        };

        self.edit_producto = function (original, copia) {

            var i = self.productos.indexOf(original);

            for (var key in copia) {
                if (copia[key] === original[key]) {
                    delete copia[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(copia));

            if (!_.isEmpty(copia)) {

                ProductoSrv.update_producto_automotriz(original.id_modelo, copia).then(function (response) {

                    self.productos[i] = response.data;
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');

                }).catch(function () {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }).finally(function () {

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

            ProductoSrv.del_producto_automotriz(producto.id_modelo).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.productos.splice(i, 1);
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');
                } else {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }

            }).catch(function () {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });


        };


    }
})();
