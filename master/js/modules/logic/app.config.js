(function () {
    'use strict';

    angular
            .module('angle')
            .config(loadingbarConfig);
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = false;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
        //cfpLoadingBarProvider.parentSelector = '.wrapper > section';
        //detras del preloader que esta a z-index=9999
        cfpLoadingBarProvider.spinnerTemplate = '<div style="position:fixed; top:0px; right:0px; left:0px; bottom:0px; z-index:9000;"><div style="position:absolute; top:50%; left:50%;" class="whirl traditional"></div></div>';
    }
})();