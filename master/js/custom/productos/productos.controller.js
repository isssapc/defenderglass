
(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ProductosCtrl', Controller);

    Controller.$inject = ['URL_API', 'toaster', 'FileUploader', 'ProductoSrv', 'productos', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos', '$uibModal', 'editar_producto_modal_tpl', 'upload_ficha_tpl'];
    function Controller(URL_API, toaster, FileUploader, ProductoSrv, productos, niveles_seguridad, segmentos, categorias, anchos, $uibModal, editar_producto_modal_tpl, upload_ficha_tpl) {

        var self = this;
        //inicialmente seleccionado el segmento 1= Arquitectonico, 0= Automotriz
        self.segmento = 1;
        //inicialmente seleccionado la categoria 0= Solar, 1= Seguridad, 2= Decorativa
        self.categoria = 0;
        self.productos = productos.data;
        self.niveles_seguridad = niveles_seguridad.data;
        self.anchos = anchos.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.producto_selected = {};


        self.uploader = new FileUploader({
            url: URL_API + 'productos/upload_ficha_tecnica',
            queueLimit: 2

        });

        self.pre_edit_producto = function (p) {
            var modalInstance = $uibModal.open({
                templateUrl: editar_producto_modal_tpl,
                controller: function ($scope, producto, niveles_seguridad, segmentos, anchos, categorias) {
                    $scope.producto = producto;
                    $scope.niveles_seguridad = niveles_seguridad;
                    $scope.segmentos = segmentos;
                    $scope.anchos = anchos;
                    $scope.categorias = categorias;

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
                    },
                    niveles_seguridad: function () {
                        return self.niveles_seguridad;
                    },
                    segmentos: function () {
                        return self.segmentos;
                    },
                    anchos: function () {
                        return self.anchos;
                    },
                    categorias: function () {
                        return self.categorias;
                    }
                }
            });


            modalInstance.result.then(function (producto_editado) {
                //console.log("response", producto_editado);

                delete producto_editado.id_producto;
                delete producto_editado.ancho;
                delete producto_editado.seguridad;
                delete producto_editado.segmento;
                delete producto_editado.categoria;
                delete producto_editado.ficha_tecnica;

                console.log("producto editado", producto_editado);
                ProductoSrv.update_producto(p.id_producto, producto_editado).then(function (response) {
                    var i = self.productos.indexOf(p);
                    self.productos[i] = response.data;

                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');
                }).catch(function () {
                    toaster.pop('error', '', 'Los datos no se han actualizado. Inténtelo más tarde');
                });
            }, function (response) {
                //console.log("response", response);
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
                //console.log("response", result);

                ProductoSrv.del_producto(p.id_producto).then(function (response) {

                    var i = self.productos.indexOf(p);
                    self.productos.splice(i, 1);
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {
                    toaster.pop('error', '', 'Los datos no se han actualizado. Inténtelo más tarde');
                }).finally(function (response) {

                });
            }, function (response) {
                //console.log("response", response);
            });
        };

        self.pre_upload_ficha = function (p) {
            self.producto_selected = p;
            var modalInstance = $uibModal.open({
                templateUrl: upload_ficha_tpl,
                controller: function ($scope, producto, uploader) {
                    $scope.producto = producto;
                    $scope.uploader = uploader;

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
                    },
                    uploader: function () {
                        return self.uploader;
                    }
                }
            });


            modalInstance.result.then(function (response) {
                //console.log("response", response);

                var files = self.uploader.queue;
                var file = files[0];
                file.formData = [{id_producto: p.id_producto}];
                file.upload();
            }, function (response) {
                //console.log("response", response);

                if (self.uploader.queue.length > 0) {
                    console.log("remove items si existen");
//                    var files = self.uploader.queue;
//                    var file = files[0];
//                    file.remove();
                    self.uploader.clearQueue();
                }

            });
        };

        self.uploader.onAfterAddingFile = function (fileItem) {
            //console.info('onAfterAddingFile', fileItem);
            if (self.uploader.queue.length === 2) {
                self.uploader.queue[0].remove();
            }
        };

        self.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
            //$('#archivo').filestyle("clear");
        };

        self.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);

            self.producto_selected.ficha_tecnica = response;
            toaster.pop('success', '', 'Los datos se han cargado correctamente');
        };

        self.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            //console.info('onCompleteItem status', status);
            //console.info('onCompleteItem response', response);                 

        };

        self.uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
            $('#archivo').filestyle("clear");
        };

        self.uploader.onErrorItem = function (fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);            
            toaster.pop('error', '', response.error[0]);
        };


    }
})();
