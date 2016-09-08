(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('CotizacionSrv', Cotizacion);

    Cotizacion.$inject = ['$http', 'URL_API'];
    function Cotizacion($http, URL_API) {
        var url = URL_API;
        return {
            get_cotizaciones: function () {
                return $http.get(url + 'cotizaciones');
            },
            get_cotizacion: function (id_cotizacion) {
                return $http.get(url + 'cotizaciones/' + id_cotizacion);
            },
            del_cotizacion: function (id_cotizacion) {
                return $http.delete(url + 'cotizaciones/' + id_cotizacion);
            },
            add_cotizacion: function (cotizacion) {
                return $http.post(url + 'cotizaciones', {cotizacion: cotizacion});
            },
            update_cotizacion: function (id_cotizacion, cotizacion) {
                return $http.put(url + 'cotizaciones/' + id_cotizacion, {cotizacion: cotizacion});
            },
            get_reporte: function (id_cotizacion, cotizacion) {
                return $http.post(url + 'cotizaciones/reporte/' + id_cotizacion, {cotizacion: cotizacion});
            }
        };
    }

})();
