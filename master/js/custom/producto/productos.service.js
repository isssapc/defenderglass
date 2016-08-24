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
            get_productos: function () {
                return $http.get(url + 'productos');
            },
            add_producto: function (producto) {
                return $http.post(url + 'productos', {producto: producto});
            }
        };
    }

})();
