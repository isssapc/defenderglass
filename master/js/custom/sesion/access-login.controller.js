/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$http', '$state', '$auth', 'SesionSrv'];
    function LoginCtrl($http, $state, $auth, SesionSrv) {
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
                        //guardamos el usuario en localstorage
                        SesionSrv.put_usuario(response.data.usuario);
                        //dependiendo del rol de usuario lo dirigimos al estado default
                        $state.go('app.cotizar_arquitectonico');
                    }).catch(function (response) {
                        if (response.data.error) {
                            vm.authMsg = response.data.error.message;
                        } else {
                            vm.authMsg = "Error de conexión";
                        }
                    });

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
