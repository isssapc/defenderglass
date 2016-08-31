/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('ProductoSrv', Productos);

    Productos.$inject = ['$http', 'URL_API'];
    function Productos($http, URL_API) {
        var url = URL_API;
        return {
            get_garantias: function () {
                return $http.get(url + 'productos/garantias');
            },
            get_categorias: function () {
                return $http.get(url + 'productos/categorias');
            },
            get_anchos: function () {
                return $http.get(url + 'productos/anchos');
            },
            get_segmentos: function () {
                return $http.get(url + 'productos/segmentos');
            },
            get_niveles_seguridad: function () {
                return $http.get(url + 'productos/niveles_seguridad');
            },
            get_productos: function () {
                return $http.get(url + 'productos');
            },
            add_producto: function (producto) {
                return $http.post(url + 'productos', {producto: producto});
            },
            del_producto: function (id_producto) {
                return $http.delete(url + 'productos/' + id_producto);
            }
        };
    }

})();
