/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$http', '$state', '$auth'];
    function LoginCtrl($http, $state, $auth) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';

            vm.login = function () {
                vm.authMsg = '';

                if (vm.loginForm.$valid) {


                    $auth.login(vm.account).then(function (response) {
                        console.log("response", JSON.stringify(response.data));
                        $state.go('app.cotizar');
                    });

//              $http
//                .post('api/account/login', {email: vm.account.email, password: vm.account.password})
//                .then(function(response) {
//                  // assumes if ok, response is an object with some data, if not, a string with error
//                  // customize according to your api
//                  if ( !response.account ) {
//                    vm.authMsg = 'Incorrect credentials.';
//                  }else{
//                    $state.go('app.dashboard');
//                  }
//                }, function() {
//                  vm.authMsg = 'Server Request Error';
//                });
                }
                else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();