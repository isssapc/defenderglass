
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ParametrosCtrl', Controller);

    Controller.$inject = ['toaster', '$uibModal', 'ParametroSrv', 'parametros', 'editar_tpl'];
    function Controller(toaster, $uibModal, ParametroSrv, parametros, editar_tpl) {

        var self = this;

        self.parametros = parametros.data;

        self.pre_edit_parametro = function (original) {

            var copia = angular.copy(original);
            var modalInstance = $uibModal.open({
                templateUrl: editar_tpl,
                controller: function ($scope, param) {
                    $scope.param = param;
                    $scope.ok = function () {
                        $scope.$close($scope.param);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    param: function () {
                        return copia;
                    }
                }

            });


            modalInstance.result.then(function (param) {
                self.edit_parametro(param, original);
            }, function (response) {
                console.log("response", response);
            });
        };
        
         self.edit_parametro = function (param,original) {

            var i = self.parametros.indexOf(original);
            delete param.id_parametro;
            delete param.id_nombre;

            ParametroSrv.update_parametro(original.id_parametro, param).then(function (response) {

                self.parametros[i] = response.data;
                toaster.pop('info', '', 'Los datos se han actualizado correctamente');

            }).catch(function (response) {

            }).finally(function (response) {

            });
        };





    }
})();
