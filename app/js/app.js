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

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.pages',
            'app.logic'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.logic',['satellizer']);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.pages', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

      // Improve performance disabling debugging features
      // $compileProvider.debugInfoEnabled(false);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
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
(function () {
    'use strict';

    angular
            .module('app.logic')
            .constant('URL_API', "/defenderglass_api/index.php/")
            .constant("TOKEN_PREFIX", "defendertool");


})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');

          var isOpen = navbarForm.hasClass('open');

          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            // .val('') // Empty input
            ;
        }
    }
})();

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

/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$http', '$state'];
    function RegisterFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';
            
          vm.register = function() {
            vm.authMsg = '';

            if(vm.registerForm.$valid) {

              $http
                .post('api/account/register', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.account ) {
                    vm.authMsg = response;
                  }else{
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.registerForm.account_email.$dirty = true;
              vm.registerForm.account_password.$dirty = true;
              vm.registerForm.account_agreed.$dirty = true;
              
            }
          };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


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
        $urlRouterProvider.otherwise('/app/cotizar');

        // 
        // Application Routes
        // -----------------------------------   
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
                })
                .state('app.cotizar', {
                    url: '/cotizar',
                    title: 'Cotizar',
                    controller: 'CotizarCtrl as ctrl',
                    templateUrl: helper.basepath('cotizar.html')
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


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){


      // User Settings
      // -----------------------------------
      $rootScope.user = {
        name:     'John',
        job:      'ng-developer',
        picture:  'app/img/user/02.jpg'
      };

      // Hides/show user avatar on sidebar from any element
      $rootScope.toggleUserBlock = function(){
        $rootScope.$broadcast('toggleUserBlock');
      };

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Defender Glass',
        description: 'Cotizador',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false,
          isCollapsedText: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // -----------------------------------

          SidebarLoader.getMenu(sidebarReady);

          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------

          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

          };

          // Controller helpers
          // -----------------------------------

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function() {
                watchOff1();
            });

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar
              sidebarAddBackdrop();

            }

          });

          var eventOff1 = scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize.sidebar', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          var eventOff2 = $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';

            var watchOff1 = $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }

          scope.$on('$destroy', function() {
            // detach scope events
            eventOff1();
            eventOff2();
            watchOff1();
            // detach dom events
            $sidebar.off(eventName);
            $win.off('resize.sidebar');
            wrapper.off(sbclickEvent);
          });

        }

        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // -----------------------------------
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');

          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );

          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        activate();

        ////////////////

        function activate() {

          $scope.userBlockVisible = true;

          var detach = $scope.$on('toggleUserBlock', function(/*event, args*/) {

            $scope.userBlockVisible = ! $scope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('es');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_MX':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },

          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed') || $body.hasClass('aside-collapsed-text');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();


(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('CotizarCtrl', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {

        var self = this;
        //self.pieza_selected={};
        self.show_resto=false;
        self.piezas = [
            {
                cantidad: 2,
                largo: .99,
                ancho: .50
            },
            {
                cantidad: 1,
                largo: .93,
                ancho: 1.13
            },
            {
                cantidad: 2,
                largo: 2.66,
                ancho: .50
            },
            {
                cantidad: 4,
                largo: 2.52,
                ancho: 1.09
            },
            {
                cantidad: 4,
                largo: .97,
                ancho: .80
            },
            {
                cantidad: 2,
                largo: 1.71,
                ancho: .95
            }
        ];
        self.procesadas = [];
        self.rollo = null;

        self.addPieza = function () {
            self.piezas.push({cantidad: 1});
        };

        self.delPieza = function (pieza) {
            var i = self.piezas.indexOf(pieza);
            self.piezas.splice(i, 1);
        };

        self.print = function () {
            console.log(JSON.stringify(self.piezas));
        };

        self.analisis = function () {
            self.procesadas = angular.copy(self.piezas);
            var A = 1.52;
            if (self.rollo != null) {
                A = parseFloat(self.rollo);
                console.log("rollo", A);
            }

            for (var k = 0; k < self.procesadas.length; k++) {

                var l = self.procesadas[k].largo;
                var a = self.procesadas[k].ancho;
                var n = self.procesadas[k].cantidad;

                var mc = 0, mr = 0;

                // 1. Cuantos caben a lo ancho
                var na = Math.floor(A / a);
                console.log("cuantos caben a lo ancho", na);

                if (na > 0) {
                    // 2 cociente
                    var c = Math.floor(n / na);
                    console.log("cociente", c);
                    //3 resto
                    var r = n - (na * c);
                    console.log("resto", r);

                    //4 calcular merma cociente
                    var Hc = {h1: 0, h2: 0, h3: l, h4: A};
                    //console.log("Hc", JSON.stringify(Hc));
                    var Bc = [];
                    var aux = 0;
                    // ancho en mm
                    var am = a * 1000;

                    if (c > 0) {

                        for (var i = 0; i < na; i++) {
                            // (i+1)*a
                            aux = Math.floor((i * am) + am) / 1000;
                            Bc.push({b1: 0, b2: Math.floor(i * am) / 1000, b3: l, b4: aux});
                            Hc.h2 = aux;
                        }
                        mc = Math.round(Hc.h3 * (Hc.h4 - Hc.h2) * c * 10000) / 10000;
                    }


                    //5 calcular merma resto
                    var Hr = {h1: 0, h2: 0, h3: l, h4: A};
                    var Br = [];
                    for (var i = 0; i < r; i++) {
                        aux = Math.floor((i * am) + am) / 1000;
                        Br.push({b1: 0, b2: Math.floor(i * am) / 1000, b3: l, b4: aux});
                        Hr.h2 = aux;
                    }
                    if (r === 0) {
                        mr = 0;
                    } else {
                        mr = Math.round(Hr.h3 * (Hr.h4 - Hr.h2) * 10000) / 10000;
                    }

                    console.log("------------------");

                    self.procesadas[k].c = c;
                    self.procesadas[k].mc = mc;
                    self.procesadas[k].mr = mr;
                    self.procesadas[k].merma = Math.round(mc * 10000 + mr * 10000) / 10000;
                    self.procesadas[k].efectivo = Math.round(n * l * a * 10000) / 10000;
                    self.procesadas[k].bc = Bc;
                    self.procesadas[k].br = Br;
                    self.procesadas[k].hc = Hc;
                    self.procesadas[k].hr = Hr;
//                    console.log("merma cociente", mc);
//                    console.log("merma resto", mr);
//                    console.log("piezas cociente", JSON.stringify(Bc));
//                    console.log("piezas resto", JSON.stringify(Br));
//                    console.log("piezas merma cociente", JSON.stringify(Hc));
//                    console.log("piezas merma residuo", JSON.stringify(Hr));
                }

            }


        };

        self.analisis2 = function () {
            self.procesadas = angular.copy(self.piezas);

            var A = 1.52;
            for (var i = 0; i < self.procesadas.length; i++) {

                var l = self.procesadas[i].largo;
                var a = self.procesadas[i].ancho;

                var mo, mr = 0;
                if (l <= A && a <= A) {
                    //posicion original
                    mo = Math.round(l * (A - a) * 10000) / 10000;
                    //rotar
                    mr = Math.round(a * (A - l) * 10000) / 10000;

                    if (mo < mr) {
                        self.procesadas[i].rotar = 0;
                        self.procesadas[i].merma = mo;
                        self.procesadas[i].m1 = 0;
                        self.procesadas[i].m2 = a;
                        self.procesadas[i].m3 = l;
                        self.procesadas[i].m4 = A;

                    } else {
                        self.procesadas[i].largo = self.procesadas[i].ancho;
                        self.procesadas[i].ancho = l;
                        self.procesadas[i].rotar = 1;
                        self.procesadas[i].merma = mr;
                        self.procesadas[i].m1 = 0;
                        self.procesadas[i].m2 = l;
                        self.procesadas[i].m3 = a;
                        self.procesadas[i].m4 = A;

                    }

                }


            }


        };

        self.draw2 = function (pieza) {
            var dibujo = $("#dibujo");
            dibujo.empty();

            if (pieza.bc.length > 0) {

                for (var i = 0; i < pieza.bc.length; i++) {
                    var w = Math.floor((pieza.bc[i].b3) * 1000);
                    var h = Math.floor((pieza.bc[i].b4 - pieza.bc[i].b2) * 1000);
                    var pos = "top:" + Math.floor((pieza.bc[i].b2 * 1000) / 5) + "px;";
                    pos += "left:" + Math.floor((pieza.bc[i].b1 * 1000) / 5) + "px;";
                    pos += "width:" + Math.floor(w / 5) + "px;";
                    pos += "height:" + Math.floor(h / 5) + "px;";

                    dibujo.append('<div class="waste" style="' + pos + '">' + w + " x " + h + '</div>');
                }

                h = Math.floor((pieza.hc.h4 - pieza.hc.h2) * 1000);
                w = Math.floor((pieza.hc.h3) * 1000);

                pos = "top:" + Math.floor((pieza.hc.h2 * 1000) / 5) + "px;";
                pos += "left:" + Math.floor((pieza.hc.h1 * 1000) / 5) + "px;";
                pos += "width:" + Math.floor(w / 5) + "px;";
                pos += "height:" + Math.floor(h / 5) + "px;";
                dibujo.append('<div class="pieza" style="' + pos + '">' + w + " x " + h + '</div>');

            }

        };

        self.draw = function (pieza) {
            //self.pieza_selected=pieza;
            self.show_resto=false;
            var cociente = $("#cociente");
            var resto = $("#resto");
            cociente.empty();
            resto.empty();

            var B = null;
            var H = null;
            var es_resto = false;
            if (pieza.bc.length > 0) {
                B = pieza.bc;
                H = pieza.hc;
            } else {
                B = pieza.br;
                H = pieza.hr;
                es_resto = true;
                
            }
            // dibujar cociente
            for (var i = 0; i < B.length; i++) {
                var l = Math.floor(B[i].b3 * 1000);
                var a = Math.floor(B[i].b4 * 1000 - B[i].b2 * 1000);

                var pos = "top:" + Math.floor((B[i].b2 * 1000) / 5) + "px;";
                pos += "left:" + Math.floor((B[i].b1 * 1000) / 5) + "px;";
                pos += "width:" + Math.floor(l / 5) + "px;";
                pos += "height:" + Math.floor(a / 5) + "px;";

                cociente.append('<div class="waste" style="' + pos + '">' + l / 1000 + " x " + a / 1000 + '</div>');
            }

            a = Math.floor(H.h4 * 1000 - H.h2 * 1000);
            l = Math.floor(H.h3 * 1000);

            pos = "top:" + Math.floor((H.h2 * 1000) / 5) + "px;";
            pos += "left:" + Math.floor((H.h1 * 1000) / 5) + "px;";
            pos += "width:" + Math.floor(l / 5) + "px;";
            pos += "height:" + Math.floor(a / 5) + "px;";
            cociente.append('<div class="pieza" style="' + pos + '">' + l / 1000 + " x " + a / 1000 + '</div>');

            var num = pieza.c;
            if (es_resto) {
                num = 1;
            }
            cociente.append('<div class="pull-right"><h1>x ' + num + '</h1></div>');

            //dibujar resto
            if (pieza.br.length > 0 && !es_resto) {
                 self.show_resto=true;
                B = pieza.br;
                H = pieza.hr;

                for (var i = 0; i < B.length; i++) {
                    var l = Math.floor(B[i].b3 * 1000);
                    var a = Math.floor(B[i].b4 * 1000 - B[i].b2 * 1000);

                    var pos = "top:" + Math.floor((B[i].b2 * 1000) / 5) + "px;";
                    pos += "left:" + Math.floor((B[i].b1 * 1000) / 5) + "px;";
                    pos += "width:" + Math.floor(l / 5) + "px;";
                    pos += "height:" + Math.floor(a / 5) + "px;";

                    resto.append('<div class="waste" style="' + pos + '">' + l / 1000 + " x " + a / 1000 + '</div>');
                }

                a = Math.floor(H.h4 * 1000 - H.h2 * 1000);
                l = Math.floor(H.h3 * 1000);

                pos = "top:" + Math.floor((H.h2 * 1000) / 5) + "px;";
                pos += "left:" + Math.floor((H.h1 * 1000) / 5) + "px;";
                pos += "width:" + Math.floor(l / 5) + "px;";
                pos += "height:" + Math.floor(a / 5) + "px;";
                resto.append('<div class="pieza" style="' + pos + '">' + l / 1000 + " x " + a / 1000 + '</div>');

                resto.append('<div class="pull-right"><h1>x 1</h1></div>');



            }

        };

        self.sum_efectivo = function (procesadas) {

            var sum = 0;
            for (var i = 0; i < procesadas.length; i++) {
                sum += procesadas[i].efectivo;
            }
            return Math.floor(sum * 10000) / 10000;
        };

        self.sum_merma = function (procesadas) {
            var sum = 0;
            for (var i = 0; i < procesadas.length; i++) {
                sum += procesadas[i].merma;
            }
            return Math.floor(sum * 10000) / 10000;
        };

    }
})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ProductosCtrl', Controller);

    Controller.$inject = ['$log', 'ProductoSrv', 'productos'];
    function Controller($log, ProductoSrv, productos) {

        var self = this;

        self.productos = productos.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('ProductoSrv', Productos);

    Productos.$inject = ['$http', 'URL_API'];
    function Productos($http, URL_API) {
        var url = URL_API;
        return {
            get_productos: function () {
                return $http.get(url + 'productos');
            },
            add_producto: function (producto) {
                return $http.post(url + 'productos', {producto: producto});
            }
        };
    }

})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('UsuariosCtrl', Controller);

    Controller.$inject = ['$log', 'UsuarioSrv', 'usuarios'];
    function Controller($log, UsuarioSrv, usuarios) {

        var self = this;

        self.usuarios = usuarios.data;

//        UsuarioSrv.get_usuarios().then(function (response) {
//            console.log("usuarios", JSON.stringify(response.data));
//            self.usuarios = response.data;
//        });




    }
})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('UsuarioSrv', Usuarios);

    Usuarios.$inject = ['$http', 'URL_API'];
    function Usuarios($http, URL_API) {
        var url = URL_API;
        return {
            get_usuarios: function () {
                return $http.get(url + 'usuarios');
            },
            add_usuario: function (usuario) {
                return $http.post(url + 'usuarios', {usuario: usuario});
            }
        };
    }

})();


(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('RolUsuarioSrv', RolUsuario);

    RolUsuario.$inject = ['$http', 'URL_API'];
    function RolUsuario($http, URL_API) {
        var url = URL_API;
        return {
            get_roles: function () {
                return $http.get(url + 'rolesusuarios');
            }
        };
    }

})();


(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('NuevoUsuarioCtrl', Controller);

    Controller.$inject = ['$log', 'UsuarioSrv', 'roles', '$scope'];
    function Controller($log, UsuarioSrv, roles, $scope) {

        var self = this;

        self.roles = roles.data;

        self.usuario = {};



        self.add_usuario = function () {
            UsuarioSrv.add_usuario(self.usuario).then(function (response) {
                console.log("nuevo usuario", JSON.stringify(response.data));
                self.usuario = {};
                $scope.formNuevoUsuario.$setPristine();
                $scope.formNuevoUsuario.$setUntouched();


            }).catch(function (response) {
                console.log("error");
            }).finally(function (response) {

            });
        };




    }
})();
