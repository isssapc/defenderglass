/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';
    angular
            .module('app.routes')
            .config(routesConfig);
    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);
        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');
        // 
        // Application Routes
        // --------------------------------   
        $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: helper.basepath('app.html'),
                    resolve: helper.resolveFor('modernizr', 'icons')
                })
                .state('app.singleview', {
                    url: '/singleview',
                    title: 'Single View',
                    templateUrl: helper.basepath('singleview.html')
                })
                .state('app.submenu', {
                    url: '/submenu',
                    title: 'Submenu',
                    templateUrl: helper.basepath('submenu.html')
                })
                .state('app.usuarios', {
                    url: '/usuarios',
                    title: 'Usuarios',
                    controller: 'UsuariosCtrl as ctrl',
                    templateUrl: helper.basepath('usuarios.html'),
                    resolve: {
                        usuarios: ['UsuarioSrv', function (UsuarioSrv) {
                                return UsuarioSrv.get_usuarios();
                            }]
                    }
                })
                .state('app.nuevo_usuario', {
                    url: '/nuevo_usuario',
                    title: 'Nuevo Usuario',
                    controller: 'NuevoUsuarioCtrl as ctrl',
                    templateUrl: helper.basepath('usuario_nuevo.html'),
                    resolve: {
                        roles: ['RolUsuarioSrv', function (RolUsuarioSrv) {
                                return RolUsuarioSrv.get_roles();
                            }]
                    }
                })
                .state('app.gastos_extras', {
                    url: '/gastos_extras',
                    title: 'Gastos Extras',
                    controller: 'GastosCtrl as ctrl',
                    templateUrl: helper.basepath('gastos.html'),
                    resolve: {
                        gastos: ['GastoSrv', function (GastoSrv) {
                                return GastoSrv.get_gastos();
                            }],
                        nuevogasto_tpl: function () {
                            return  helper.basepath('modal_nuevo_gasto.html');
                        }
                    }
                })
                .state('app.clientes', {
                    url: '/clientes',
                    title: 'Clientes',
                    controller: 'ClientesCtrl as ctrl',
                    templateUrl: helper.basepath('clientes.html'),
                    resolve: {
                        clientes: ['ClienteSrv', function (ClienteSrv) {
                                return ClienteSrv.get_clientes();
                            }]
                    }
                })
                .state('app.parametros', {
                    url: '/parametros',
                    title: 'Parámetros',
                    controller: 'ParametrosCtrl as ctrl',
                    templateUrl: helper.basepath('parametros.html'),
                    resolve: {
                        parametros: ['ParametroSrv', function (ParametroSrv) {
                                return ParametroSrv.get_parametros();
                            }]
                    }
                })
                .state('app.productos', {
                    url: '/productos',
                    title: 'Productos',
                    controller: 'ProductosCtrl as ctrl',
                    templateUrl: helper.basepath('productos.html'),
                    resolve: {
                        productos: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_productos();
                            }]
                    }
                })
                .state('app.nuevo_producto', {
                    url: '/nuevo_producto',
                    title: 'Nuevo Producto',
                    controller: 'NuevoProductoCtrl as ctrl',
                    templateUrl: helper.basepath('producto_nuevo.html'),
                    resolve: {
                        niveles_seguridad: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_niveles_seguridad();
                            }],
                        segmentos: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_segmentos();
                            }],
                        categorias: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_categorias();
                            }],
                        anchos: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_anchos();
                            }]
                    }
                })
                .state('app.cotizar_arquitectonico', {
                    url: '/cotizacion/arquitectonico',
                    title: 'Cotización',
                    controller: 'CotizacionArqCtrl as ctrl',
                    templateUrl: helper.basepath('cotizacion_arquitectonico.html')
                })
                .state('app.cotizar_automotriz', {
                    url: '/cotizacion/automotriz',
                    title: 'Cotización',
                    controller: 'CotizacionCtrl as ctrl',
                    templateUrl: helper.basepath('cotizacion_automotriz.html')
                })
                .state('page', {
                    url: '/page',
                    templateUrl: 'app/pages/page.html',
                    resolve: helper.resolveFor('modernizr', 'icons'),
                    controller: ['$rootScope', function ($rootScope) {
                            $rootScope.app.layout.isBoxed = false;
                        }]
                })
                .state('page.login', {
                    url: '/login',
                    title: 'Login',
                    templateUrl: 'app/pages/login.html'
                })
                // 
                // CUSTOM RESOLVES
                //   Add your own resolves properties
                //   following this object extend
                //   method
                // ----------------------------------- 
                // .state('app.someroute', {
                //   url: '/some_url',
                //   templateUrl: 'path_to_template.html',
                //   controller: 'someController',
                //   resolve: angular.extend(
                //     helper.resolveFor(), {
                //     // YOUR RESOLVES GO HERE
                //     }
                //   )
                // })
                ;
    } // routesConfig

})();

