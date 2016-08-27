
(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('GastoSrv', Gasto);

    Gasto.$inject = ['$http', 'URL_API'];
    function Gasto($http, URL_API) {
        var url = URL_API;
        return {
            get_gastos: function () {
                return $http.get(url + 'gastosextras');
            },
            add_gasto: function (gasto) {
                return $http.post(url + 'gastosextras', {gasto: gasto});
            }
        };
    }

})();
