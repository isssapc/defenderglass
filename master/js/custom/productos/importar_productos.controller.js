
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ImportarProductosCtrl', Controller);

    Controller.$inject = ['$scope', 'toaster', 'ProductoSrv', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos', 'FileUploader', 'URL_API'];
    function Controller($scope, toaster, ProductoSrv, niveles_seguridad, segmentos, categorias, anchos, FileUploader, URL_API) {

        var self = this;
        self.checkall = false;

        self.niveles_seguridad = niveles_seguridad.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.anchos = anchos.data;

        self.productos = [];

        self.columnas = {
            clave: {
                nombre: 'Clave',
                visible: false
            },
            segmento: {
                nombre: 'Segmento',
                visible: true
            },
            categoria: {
                nombre: 'Categoría',
                visible: true
            },
            marca: {
                nombre: 'Marca',
                visible: false
            },
            seguridad: {
                nombre: 'Seguridad',
                visible: false
            },
            precio: {
                nombre: 'Precio',
                visible: true
            },
            ancho: {
                nombre: 'Ancho',
                visible: true
            },
            rechazo: {
                nombre: 'Rechazo Solar',
                visible: false
            },
            transmision: {
                nombre: 'Transmisión Luz',
                visible: false
            },
            proteccion: {
                nombre: 'Protección UV',
                visible: false
            }
        };

        self.uploader = new FileUploader({
            url: URL_API + 'productos/upload'
        });

        self.uploader.filters.push({
            name: 'queueFilter',
            fn: function (/*item, options*/) {
                return this.queue.length < 1;
            }
        });

        self.uploader.filters.push({
            name: 'excelFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                //var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //console.log("type", type);
                //console.log("file", item.name.split('.').pop());
                var extension = item.name.split('.').pop();
                return '|xls|xlsx|'.indexOf(extension) !== -1;
            }
        });

        self.remove_file = function (item) {
            item.remove();
            $('#archivo').filestyle("clear");
        };

        self.check_all = function () {
            _.each(self.productos, function (item) {
                item.checked = self.checkall;
            });
        };

        self.delete = function () {
            self.productos = _.filter(self.productos, function (item) {
                return !item.checked;
            });
        };

        self.save = function () {

            _.each(self.productos, function (item) {
                delete item.checked;
            });

            //console.log("productos a insertar", JSON.stringify(self.productos));

            ProductoSrv.add_productos(self.productos).then(function (response) {
                //console.log("inserciones: " + response.data);
                toaster.pop('success', '', 'Se han agregado ' + response.data + ' productos a la base de datos');
                self.productos = [];
            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            });

        };


        self.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
            if (filter.name === 'excelFilter') {
                toaster.pop('error', '', 'Sólo se adminten archivos de Excel en formato XLS ó XLSX');
            } else if (filter.name === 'queueFilter') {
                toaster.pop('error', '', 'Sólo puede subir un archivo a la vez');
            }
            $('#archivo').filestyle("clear");
        };

        self.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);
        };

        self.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
            //console.log("response", JSON.stringify(response));
            self.productos = response.productos;
            toaster.pop('success', '', 'Los datos se han cargado correctamente');
        };

        self.uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
            $('#archivo').filestyle("clear");
        };





    }
})();
