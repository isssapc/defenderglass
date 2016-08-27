/**=========================================================
 * Refresh modals
 * [modal-refresh] * [data-spinner="standard"]
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .directive('modalRefresh', modalRefresh);

    function modalRefresh() {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller($scope, $element) {
        var refreshEvent = 'modal-refresh',
                whirlClass = 'whirl',
                defaultSpinner = 'standard';

        // catch clicks to toggle panel refresh
        $element.on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                    panel = $this.parents('.modal-content').eq(0),
                    spinner = $this.data('spinner') || defaultSpinner;

            // start showing the spinner
            panel.addClass(whirlClass + ' ' + spinner);

            // Emit event when refresh clicked
            //$scope.$emit(refreshEvent, panel.attr('id'));
            $scope.$emit(refreshEvent, panel);

        });

        // listen to remove spinner
        $scope.$on('removeModalSpinner', removeSpinner);

        // method to clear the spinner when done
        function removeSpinner(ev, element) {
            element.removeClass(whirlClass);
        }
    }
})();


