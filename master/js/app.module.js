/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.4
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function () {
    'use strict';

    angular.module('angle', [        
        'app.core',
        'app.routes',
        'app.sidebar',
        'app.navsearch',
        'app.preloader',
        'angular-loading-bar',
        'toaster',
        'smart-table',
        //'app.loadingbar',
        'app.bootstrapui',
        'app.panels',
        'app.forms',
        'app.translate',
        'app.settings',
        'app.utils',
        'app.pages',
        'app.logic'
    ]);
})();

