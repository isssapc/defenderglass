/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .directive('textParam', textParam);

    textParam.$inject = ['$compile', '$timeout', 'ParametroSrv', 'toastr'];
    function textParam($compile, $timeout, ParametroSrv, toastr) {



        var directive = {
            //link: link,
            template: '<form id="form" name="form" class="form-horizontal">\
                        <div class="form-group" ng-class="{\'has-success\':(form.texto.$dirty || form.texto.$touched) }">\
                        <label class="control-label col-lg-2">{{p.nombre}}</label>\
                            <div class="col-lg-10">\
                                <textarea rows="7" class="form-control" name="texto" ng-model="copia.texto" ng-disabled="!edit" ></textarea>\
                            </div>\
                        </div>\
                        <div class="form-group">\
                            <div class="col-lg-10 col-lg-offset-2">\
                                <button class="btn btn-default" ng-hide="edit" ng-click="editar()">Editar</button>\
                                <button class="btn btn-default" ng-show="edit" ng-click="cancel()">Cancelar</button>\
                                <button class="btn btn-primary" ng-show="edit" ng-click="update_parametro()">Guardar</button>\
                            </div>\
                        </div>\
                    </form>',
            restrict: 'E',
            scope: {
                p: '=param',
                edit: '=disabled'

            },
            controller: ['$scope', function ($scope) {
                    $scope.edit = false;
                    $scope.copia = {};
                    $scope.copia.texto = $scope.p.texto; //angular.copy($scope.p);
                    $scope.editar=function(){
                      $scope.edit=true;  
                    };
                    
                    $scope.cancel = function () {
                        //console.log("hola desde el controlador de la directiva");
                        $scope.edit = !$scope.edit;
                        $scope.form.$setPristine();
                        $scope.form.$setUntouched();
                        $scope.copia.texto = $scope.p.texto;
                    };

                    $scope.update_parametro = function () {

                        ParametroSrv.update_parametro($scope.p.id_parametro, $scope.copia).then(function (response) {

                            $scope.p = response.data;
                            $scope.edit = false;
                            toastr.success('info', '', 'Los datos se han actualizado correctamente');
                            $scope.form.$setPristine();
                            $scope.form.$setUntouched();

                        }).catch(function (response) {

                        }).finally(function (response) {

                        });
                    };
                }]
        };
        return directive;



        function link(scope, element, attrs) {

//            scope.cancel=function(){
//                console.log("cancelar desde la directiva");
//            };

//            var templates = {
            /* jshint multistr: true */
//                textarea: '<form id="textparam_{{index}}" name="textparam_{{index}}" class="form-horizontal">\
//                        <div class="form-group">\
//                        <label class="control-label col-lg-2">{{p.nombre}}</label>\
//                            <div class="col-lg-10">\
//                            <textarea rows="7" class="form-control" ng-model="p.texto" ng-disabled="textparam_{{index}}" ></textarea>\
//                            </div>\
//                        </div>\
//                        <div class="form-group">\
//                            <div class="col-lg-10 col-lg-offset-2">\
//                                <button class="btn btn-default" ng-click="textparam_{{index}} = !textparam_{{index}}"><span ng-show="textparam_{{index}}">Editar</span><span ng-show="!textparam_{{index}}">Cancelar</span></button>\
//                                <button class="btn btn-primary" ng-show="!textparam_{{index}}" ng-click="ctrl.update_parametro(p, update_form)">Guardar</button>\
//                            </div>\
//                        </div>\
//                    </form>'
//            collapse:'<a href="#" panel-collapse="" uib-tooltip="Colapsar" ng-click="{{panelId}} = !{{panelId}}">\
//                       <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em>\
//                       <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em>\
//                      </a>',
//            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Cerrar">\
//                       <em class="fa fa-times"></em>\
//                     </a>',
//            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Actualizar">\
//                       <em class="fa fa-refresh"></em>\
//                     </a>'
//            };



            //$timeout(function () {
            //element.html(getTemplate(element, attrs)).show();
            //$compile(element.contents())(scope);                
            //});

//            function getTemplate(elem, attrs) {
//                var temp = '';
//                attrs = attrs || {};
//                if (attrs.index) {
//                    temp += templates.textarea.replace(/{{index}}/g, attrs.index);
//                }
//                return temp;
//            }
        }// link
    }

})();
