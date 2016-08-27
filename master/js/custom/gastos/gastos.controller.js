
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('GastosCtrl', Controller);

    Controller.$inject = ['$log', 'GastoSrv', 'gastos', '$scope', '$uibModal', 'nuevogasto_tpl'];
    function Controller($log, GastoSrv, gastos, $scope, $uibModal, nuevogasto_tpl) {

        var self = this;

        self.nuevo_gasto = {};
        self.gastos = gastos.data;

        self.pre_add_gasto = function () {
            var modalInstance = $uibModal.open({
                templateUrl: nuevogasto_tpl,
                controller: 'ModalNuevoGastoCtrl',
                controllerAs: 'ctrl'
//                controller: function($scope){
//                  $scope.ok=function(){
//                      $scope.$close("hola");
//                  };
//                  
//                  $scope.cancel=function(){
//                      $scope.$dismiss("adios");
//                  };
//                }

            });


            modalInstance.result.then(function (nuevo_gasto) {
                console.log("response", nuevo_gasto);
                self.gastos.push(nuevo_gasto);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.pre_del_gasto = function (gasto_selected) {

            console.log("delete");
            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, gasto) {
                    $scope.gasto = gasto;

                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    gasto: function () {
                        return gasto_selected;
                    }
                }

            });


            modalInstance.result.then(function (response) {
                console.log("response", response);

                var i = self.gastos.indexOf(gasto_selected);
                self.gastos.splice(i, 1);

//                GastoSrv.del_gasto(gasto_selected.id_gasto).then(function (response) {
//
//                    var i = self.gastos.indexOf(gasto_selected);
//                    self.gastos.splice(i, 1);
//
//                }).catch(function (response) {
//                    console.log("error");
//                }).finally(function (response) {
//                    $("#modalNuevoGasto").modal("hide");
//                    $scope.formNuevoGasto.$setPristine();
//                    $scope.formNuevoGasto.$setUntouched();
//                    self.nuevo_gasto = {};
//                });
            }, function (response) {
                console.log("response", response);
            });
        };






        self.pre_add_gasto2 = function () {
            $("#modalNuevoGasto").modal("show");
        };


//        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
//        function ModalInstanceCtrl($scope, $uibModalInstance) {
//
//            $scope.ok = function () {
//                $uibModalInstance.close('closed');
//            };
//
//            $scope.cancel = function () {
//                $uibModalInstance.dismiss('cancel');
//            };
//        }



        self.add_gasto = function () {
            GastoSrv.add_gasto(self.nuevo_gasto).then(function (response) {

                self.gastos.push(response.data);

            }).catch(function (response) {
                console.log("error");
            }).finally(function (response) {
                $("#modalNuevoGasto").modal("hide");
                $scope.formNuevoGasto.$setPristine();
                $scope.formNuevoGasto.$setUntouched();
                self.nuevo_gasto = {};
            });
        };





    }
})();
