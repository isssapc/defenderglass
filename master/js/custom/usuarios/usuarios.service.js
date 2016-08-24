/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('UsuarioSrv', Usuarios);

    Usuarios.$inject = ['$http', 'URL_API'];
    function Usuarios($http, URL_API) {
        var url = URL_API;
        return {
            get_usuarios: function () {
                return $http.get(url + 'usuarios');
            }
        };
    }

})();
