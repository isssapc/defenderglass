(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ModalNuevoProductoCtrl', Controller);

    Controller.$inject = ['GastoSrv', '$scope', '$uibModalInstance', 'producto'];
    function Controller(GastoSrv, $scope, $uibModalInstance, producto) {

        var self = this;
        self.producto = producto;

        self.cancelar = function () {
            $uibModalInstance.dismiss('close');
        };        

        self.add_producto = function () {
            
            GastoSrv.add_gasto(self.gasto).then(function (response) {
                self.gasto = {};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                $uibModalInstance.close(response.data);
            }).catch(function (response) {
                $uibModalInstance.dismiss('error');
            }).finally(function (response) {
               
            });
        };

    }
})();
