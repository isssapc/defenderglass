/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('ClienteSrv', Cliente);

    Cliente.$inject = ['$http', 'URL_API'];
    function Cliente($http, URL_API) {
        var url = URL_API;
        return {
            get_clientes: function () {
                return $http.get(url + 'clientes');
            },
            add_cliente: function (cliente) {
                return $http.post(url + 'clientes', {cliente: cliente});
            }
        };
    }

})();
