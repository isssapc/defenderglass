/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('ParametroSrv', Parametro);

    Parametro.$inject = ['$http', 'URL_API'];
    function Parametro($http, URL_API) {
        var url = URL_API;
        return {
            get_parametros: function () {
                return $http.get(url + 'parametros');
            },
            add_parametro: function (parametro) {
                return $http.post(url + 'parametros', {parametro: parametro});
            }
        };
    }

})();