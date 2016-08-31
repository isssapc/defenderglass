(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ModalNuevoGastoCtrl', Controller);

    Controller.$inject = ['GastoSrv', '$scope', '$uibModalInstance'];
    function Controller(GastoSrv, $scope, $uibModalInstance) {

        var self = this;
        self.gasto = {};

        self.cancelar = function () {
            $uibModalInstance.dismiss('close');
        };
   

//        $scope.$on('modal-refresh', function (event, element) {
//
//            GastoSrv.add_gasto(self.gasto).then(function (response) {
//                self.gasto = {};
//                //$scope.formNuevoGasto.$setPristine();
//                //$scope.formNuevoGasto.$setUntouched();
//                $scope.$broadcast('removeModalSpinner', element);
//                $uibModalInstance.close(response.data);
//
//
//            }).catch(function (response) {
//                console.log("error");
//            }).finally(function (response) {
//
//            });
//        });

        self.add_gasto = function () {
         
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
