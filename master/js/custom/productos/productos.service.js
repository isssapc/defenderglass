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
            get_productos_automotriz: function () {
                return $http.get(url + 'productos/productos_automotriz');
            },
            add_producto: function (producto) {
                return $http.post(url + 'productos', {producto: producto});
            },
            update_producto: function (id_producto, producto) {
                return $http.put(url + 'productos/' + id_producto, {producto: producto});
            },
            add_productos: function (productos) {
                return $http.post(url + 'productos/add', {productos: productos});
            },
            add_productos_automotriz: function (productos) {
                return $http.post(url + 'productos/add_productos_automotriz', {productos: productos});
            },
            update_producto_automotriz:function(id_modelo, producto){
                return $http.put(url + 'productos/update_automotriz/' + id_modelo, {producto: producto});
            },
            del_producto: function (id_producto) {
                return $http.delete(url + 'productos/' + id_producto);
            },
            del_producto_automotriz: function (id_modelo) {
                return $http.delete(url + 'productos/del_producto_automotriz/' + id_modelo);
            }
        };
    }

})();
