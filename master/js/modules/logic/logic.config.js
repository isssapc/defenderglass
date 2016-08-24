(function () {
    'use strict';

    angular
            .module('app.logic')
            .config(logicConfig);

    logicConfig.$inject = ['$authProvider', 'URL_API', 'TOKEN_PREFIX'];
    function logicConfig($authProvider, URL_API, TOKEN_PREFIX) {

        //satellizer
        $authProvider.baseUrl = URL_API;
        $authProvider.tokenPrefix = TOKEN_PREFIX;

    }
})();