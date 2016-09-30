
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ProductosCtrl', Controller);

    Controller.$inject = ['$log', 'ProductoSrv', 'productos', '$uibModal', 'nuevoproducto_tpl'];
    function Controller($log, ProductoSrv, productos, $uibModal, nuevoproducto_tpl) {

        var self = this;
        //inicialmente seleccionado el segmento 1= Arquitectonico, 0= Automotriz
        self.segmento=1;
        self.productos = productos.data;
       

        self.pre_edit_producto = function (p) {
            var modalInstance = $uibModal.open({
                templateUrl: nuevoproducto_tpl,
                controller: 'ModalNuevoProductoCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    producto: function () {
                        return p;
                    }
                }
            });


            modalInstance.result.then(function (nuevo_gasto) {
                console.log("response", nuevo_gasto);
                self.gastos.push(nuevo_gasto);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.pre_del_producto = function (p) {
            var modalInstance = $uibModal.open({
                templateUrl: "confirmar.html",
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
                console.log("response", result);
         
                ProductoSrv.del_producto(p.id_producto).then(function (response) {

                    var i = self.productos.indexOf(p);
                    self.productos.splice(i, 1);

                }).catch(function (response) {
                    console.log("error");
                }).finally(function (response) {
                   
                });
            }, function (response) {
                console.log("response", response);
            });
        };



    }
})();
