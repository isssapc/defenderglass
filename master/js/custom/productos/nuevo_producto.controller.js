
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('NuevoProductoCtrl', Controller);

    Controller.$inject = ['$scope', 'ProductoSrv', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos'];
    function Controller($scope, ProductoSrv, niveles_seguridad, segmentos, categorias, anchos) {

        var self = this;

        self.niveles_seguridad = niveles_seguridad.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.anchos = anchos.data;

        self.default_options =
                {
                    marca: "SolarGard",
                    proteccion_uv: 99
                };

        self.producto = angular.copy(self.default_options);

        self.add_producto = function () {
            ProductoSrv.add_producto(self.producto).then(function (response) {
                console.log("nuevo producto :)", JSON.stringify(response.data));
                self.producto = angular.copy(self.default_options);
                $scope.formNuevoProducto.$setPristine();
                $scope.formNuevoProducto.$setUntouched();


            }).catch(function (response) {

            }).finally(function (response) {

            });


        };





    }
})();
