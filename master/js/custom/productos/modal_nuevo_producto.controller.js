(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ModalNuevoProductoCtrl', Controller);

    Controller.$inject = ['ProductoSrv', '$scope', '$uibModalInstance', 'producto', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos'];
    function Controller(ProductoSrv, $scope, $uibModalInstance, producto, niveles_seguridad, segmentos, categorias, anchos) {

        var self = this;
        self.producto = producto;
        self.niveles_seguridad = niveles_seguridad;
        self.anchos = anchos;
        self.segmentos = segmentos;
        self.categorias = categorias;

        self.cancelar = function () {
            $uibModalInstance.dismiss(false);
        };

        self.add_producto = function () {
            var copia = angular.copy(self.producto);
            delete copia.id_producto;
            ProductoSrv.update_producto(self.producto.id_producto, copia).then(function (response) {
                self.producto = {};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                $uibModalInstance.close(response.data);
            }).catch(function (response) {
                $uibModalInstance.dismiss(false);
            }).finally(function () {

            });
        };

    }
})();
