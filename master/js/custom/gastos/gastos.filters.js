

(function () {
    'use strict';

    angular.module('app.logic')
            .filter('tipoGastoExtra', function () {
                return function (input) {
                    var tipo = 'm<sup>2</sup>';
                    if (input === 'D') {
                        tipo = 'Día';
                    }

                    return tipo;
                };
            });

})();