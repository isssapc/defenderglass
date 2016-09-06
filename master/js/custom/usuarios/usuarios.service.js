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
            },
            add_usuario: function (usuario) {
                return $http.post(url + 'usuarios', {usuario: usuario});
            },
            update_usuario: function (id_usuario, usuario) {
                return $http.put(url + 'usuarios/' + id_usuario, {usuario: usuario});
            },
            del_usuario: function (id_usuario) {
                return $http.delete(url + 'usuarios/' + id_usuario);
            }
        };
    }

})();
