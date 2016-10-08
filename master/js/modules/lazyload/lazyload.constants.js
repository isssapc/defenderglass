(function () {
    'use strict';

    angular
            .module('app.lazyload')
            .constant('APP_REQUIRES', {
                // jQuery based and standalone scripts
                scripts: {
                    'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                    'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                        'vendor/simple-line-icons/css/simple-line-icons.css'],
                    'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js']
                },
                // Angular based script (use the right module name)
                modules: [
                    {name: 'ui.select', files: ['vendor/angular-ui-select/dist/select.js',
                            'vendor/angular-ui-select/dist/select.css']},
                    //{name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']},
                    {name: 'toastr', files: ['vendor/angular-toastr/dist/angular-toastr.tpls.js', 'vendor/angular-toastr/dist/angular-toastr.css']},
                    {name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js']}
                ]
            })
            ;

})();
