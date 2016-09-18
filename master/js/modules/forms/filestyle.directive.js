/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.forms')
            .directive('filestyle', filestyle);

    function filestyle() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            var options = element.data();

            // old usage support
            //options.classInput = element.data('classinput') || options.classInput;
            options.buttonText = element.data('buttontext');
            options.buttonName = element.data('buttonname');

            delete options.buttontext;
            delete options.buttonname;

            //console.log("options", JSON.stringify(options));

            element.filestyle(options);
            
        }
    }

})();
