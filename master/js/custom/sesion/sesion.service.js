/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('SesionSrv', Sesion);

    Sesion.$inject = ['CacheFactory'];
    function Sesion(CacheFactory) {
        var self = this;

        // obtenemos el usuario de la cache o creamos la cache
        if (!CacheFactory.get('loggedin')) {
            // or CacheFactory('loggedin', { ... });
            //el tiempo de sesion lo especifica el servidor en el token
            CacheFactory.createCache('loggedin', {
                storageMode: 'localStorage'
            });
        }

        //obtenemos de la cache
        self.usuarioCache = CacheFactory.get("loggedin");

        function put_usuario(usuario) {
            self.usuarioCache.put('usuario', usuario);
        }

        function get_usuario() {
            var usuario = null;
            if (self.usuarioCache) {
                usuario = self.usuarioCache.get('usuario');
            }
            return usuario;
        }

        function get_id_usuario() {

            var usuario = null;
            var id = null;

            if (self.usuarioCache) {
                usuario = self.usuarioCache.get('usuario');

                if (usuario) {
                    id = usuario.id_usuario;
                }
            }
            return id;

        }

        function get_nombre_usuario() {

            var usuario = null;
            var nombre = null;

            if (self.usuarioCache) {
                usuario = self.usuarioCache.get('usuario');

                if (usuario) {
                    nombre = usuario.nombre;
                }
            }
            return nombre;
        }

        function get_cargo_usuario() {

            var usuario = null;
            var cargo = null;

            if (self.usuarioCache) {
                usuario = self.usuarioCache.get('usuario');

                if (usuario) {
                    cargo = usuario.cargo;
                }
            }
            return cargo;
        }

        function get_rol_usuario() {
            var usuario = null;
            var rol = null;

            if (self.usuarioCache) {
                usuario = self.usuarioCache.get('usuario');

                if (usuario) {
                    rol = usuario.id_rol;
                }
            }
            return rol;
        }


        return {
            get_usuario: get_usuario,
            put_usuario: put_usuario,
            get_id_usuario: get_id_usuario,
            get_nombre_usuario: get_nombre_usuario,
            get_rol_usuario: get_rol_usuario,
            get_cargo_usuario: get_cargo_usuario
        };


    }

})();
