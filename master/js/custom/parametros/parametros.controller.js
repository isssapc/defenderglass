
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

//        self.param_introduccion = _.findWhere(self.parametros, {clave: 'intro'});
//        self.param_notas = _.findWhere(self.parametros, {clave: 'notas'});
//        self.param_cuenta = _.findWhere(self.parametros, {clave: 'cuenta'});

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

        self.edit_parametro = function (param, original) {

            var i = self.parametros.indexOf(original);
            delete param.id_parametro;
            delete param.nombre;
            delete param.tipo;
            delete param.clave;
            delete param.id_empresa;

            ParametroSrv.update_parametro(original.id_parametro, param).then(function (response) {

                self.parametros[i] = response.data;
                toaster.pop('success', '', 'Los datos se han actualizado correctamente');

            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });
        };


        self.update_parametro = function (param, form) {

            //var id_parametro = param.id_parametro;
            var i = self.parametros.indexOf(param);

            var copia = angular.copy(param);

            delete copia.id_parametro;
            delete copia.nombre;
            delete copia.tipo;
            delete copia.clave;
            delete copia.id_empresa;

            ParametroSrv.update_parametro(param.id_parametro, copia).then(function (response) {

                self.parametros[i] = response.data;
                toaster.pop('success', '', 'Los datos se han actualizado correctamente');
                form.$setPristine();
                form.$setUntouched();

            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });
        };








    }
})();
