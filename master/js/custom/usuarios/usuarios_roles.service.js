
(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('RolUsuarioSrv', RolUsuario);

    RolUsuario.$inject = ['$http', 'URL_API'];
    function RolUsuario($http, URL_API) {
        var url = URL_API;
        return {
            get_roles: function () {
                return $http.get(url + 'rolesusuarios');
            }
        };
    }

})();
