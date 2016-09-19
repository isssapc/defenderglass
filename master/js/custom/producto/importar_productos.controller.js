
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

        self.niveles_seguridad = niveles_seguridad.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.anchos = anchos.data;

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
            //$('#archivo').val("");
            $('#archivo').filestyle("clear");
        };



        self.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            if (filter.name === 'excelFilter') {
                toaster.pop('error', '', 'Sólo se adminten archivos de Excel en formato XLS ó XLSX');
            } else if (filter.name === 'queueFilter') {
                toaster.pop('error', '', 'Sólo puede subir un archivo a la vez');
            }
            $('#archivo').filestyle("clear");
        };
        self.uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        self.uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        self.uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        self.uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        self.uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        self.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        self.uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        self.uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        self.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            //toastr.success('success', 'Los datos se han actualizado correctamente',{'positionClass':'toast-bottom-full-width','progressBar':true});
            toaster.pop('success', '', 'Los datos se han cargado correctamente');
        };
        self.uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };




    }
})();
