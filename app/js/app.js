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


(function() {
    'use strict';

    angular
        .module('app.bootstrapui', []);
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
        .module('app.forms', []);
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
        .module('app.logic',['satellizer','underscore','cfp.loadingBar']);
})();
(function () {
    'use strict';

    angular.module('underscore', []);
    angular.module('underscore').factory('_', ['$window', function ($window) {
            return $window._;
        }]);
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
        .module('app.panels', []);
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
        .module('app.bootstrapui')
        .config(bootstrapuiConfig);

    bootstrapuiConfig.$inject = ['$uibTooltipProvider'];
    function bootstrapuiConfig($uibTooltipProvider){
      $uibTooltipProvider.options({appendToBody: true});
    }
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
                    //{name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']},
                    {name: 'toastr', files: ['vendor/angular-toastr/dist/angular-toastr.tpls.js', 'vendor/angular-toastr/dist/angular-toastr.css']},
                    {name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js']}
                ]
            })
            ;

})();

(function () {
    'use strict';

    angular
            .module('app.loadingbar')
            .config(loadingbarConfig)
            ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = false;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
        //cfpLoadingBarProvider.parentSelector = '.wrapper > section';
        cfpLoadingBarProvider.spinnerTemplate = '<div style="position:fixed; top:0px; right:0px; left:0px; bottom:0px; z-index:90002;"><div style="position:absolute; top:50%; left:50%;" class="whirl traditional"></div></div>';
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

                        $state.go('app.cotizar_arquitectonico');
                    }).catch(function (response) {
                        if (response.data.error) {
                            vm.authMsg = response.data.error.message;
                        } else {
                            vm.authMsg="Error de conexión";
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

/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelCollapse', panelCollapse);

    function panelCollapse () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;
    }

    Controller.$inject = ['$scope', '$element', '$timeout', '$localStorage'];
    function Controller ($scope, $element, $timeout, $localStorage) {
      var storageKeyName = 'panelState';

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function(e) {
        e.preventDefault();
        savePanelState( panelId, !$scope[panelId] );

      });
  
      // Controller helpers
      function savePanelState(id, state) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(!data) { data = {}; }
        data[id] = state;
        $localStorage[storageKeyName] = angular.toJson(data);
      }
      function loadPanelState(id) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(data) {
          return data[id];
        }
      }
    }

})();

/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelDismiss', panelDismiss);

    function panelDismiss () {

        var directive = {
            controller: Controller,
            restrict: 'A'
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element', '$q', 'Utils'];
    function Controller ($scope, $element, $q, Utils) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function (e) {
        e.preventDefault();

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware);
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }

      });
    }
})();



/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelRefresh', panelRefresh);

    function panelRefresh () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller ($scope, $element) {
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';

      // catch clicks to toggle panel refresh
      $element.on('click', function (e) {
        e.preventDefault();

        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) === '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }
})();



/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a href="#" panel-collapse="" uib-tooltip="Colapsar" ng-click="{{panelId}} = !{{panelId}}">\
                       <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em>\
                       <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em>\
                      </a>',
            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Cerrar">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Actualizar">\
                       <em class="fa fa-refresh"></em>\
                     </a>'
          };

          var tools = scope.panelTools || attrs;

          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);

            element.addClass('pull-right');
          });

          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
          }
        }// link
    }

})();

(function() {
    'use strict';

    angular
        .module('app.panels')
        .controller('DraggablePanelController', DraggablePanelController);

    DraggablePanelController.$inject = ['$timeout', '$localStorage'];
    function DraggablePanelController($timeout, $localStorage) {
        var vm = this;
        var storageKeyName = 'portletState';

        activate();

        ////////////////

        function activate() {

            // https://github.com/angular-ui/ui-sortable
            vm.sortablePortletOptions = {
                connectWith:          '.portlet-connect',
                handler:              '.panel-heading',
                opacity:              0.7,
                placeholder:          'portlet box-placeholder',
                cancel:               '.portlet-cancel',
                forcePlaceholderSize: true,
                iframeFix:            false,
                tolerance:            'pointer',
                helper:               'original',
                revert:               200,
                forceHelperSize:      true,
                update:               savePortletOrder,
                create:               loadPortletOrder
            };

            function savePortletOrder(event) {
                var self = event.target;
                var data = angular.fromJson($localStorage[storageKeyName]);

                if (!data) {
                    data = {};
                }

                data[self.id] = $(self).sortable('toArray');

                if (data) {
                    $timeout(function() {
                        $localStorage[storageKeyName] = angular.toJson(data);
                    });
                }
            }

            function loadPortletOrder(event) {
                var self = event.target;
                var data = angular.fromJson($localStorage[storageKeyName]);

                if (data) {

                    var porletId = self.id,
                        panels = data[porletId];

                    if (panels) {
                        var portlet = $('#' + porletId);

                        $.each(panels, function(index, value) {
                            $('#' + value).appendTo(portlet);
                        });
                    }
                }
            }

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
        $urlRouterProvider.otherwise('/page/login');
        // 
        // Application Routes
        // --------------------------------   
        $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: helper.basepath('app.html'),
                    resolve: helper.resolveFor('modernizr', 'icons', 'toastr')
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
                .state('app.logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl'
                })
                .state('app.usuarios', {
                    url: '/usuarios',
                    title: 'Usuarios',
                    controller: 'UsuariosCtrl as ctrl',
                    templateUrl: helper.basepath('usuarios.html'),
                    resolve: {
                        usuarios: ['UsuarioSrv', function (UsuarioSrv) {
                                return UsuarioSrv.get_usuarios();
                            }],
                        roles: ['RolUsuarioSrv', function (RolUsuarioSrv) {
                                return RolUsuarioSrv.get_roles();
                            }],
                        editar_usuario_tpl: function () {
                            return  helper.basepath('usuario_editar_modal.html');
                        }
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
                        nuevo_tpl: function () {
                            return  helper.basepath('gasto_nuevo_modal.html');
                        },
                        editar_tpl: function () {
                            return  helper.basepath('gasto_editar_modal.html');
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
                            }],
                        editar_tpl: function () {
                            return  helper.basepath('parametro_editar_modal.html');
                        }
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
                            }],
                        nuevoproducto_tpl: function () {
                            return  helper.basepath('producto_nuevo_modal.html');
                        }
                    }
                })
                .state('app.importar_productos', {
                    url: '/importar_productos',
                    title: 'Productos',
                    controller: 'ImportarProductosCtrl as ctrl',
                    templateUrl: helper.basepath('productos_importar.html'),
                    resolve: angular.extend( helper.resolveFor('angularFileUpload','filestyle'), {
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
                    })

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
                    templateUrl: helper.basepath('cotizacion_arquitectonico.html'),
                    resolve: {
                        productos: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_productos();
                            }],
                        garantias: ['ProductoSrv', function (ProductoSrv) {
                                return ProductoSrv.get_garantias();
                            }],
                        parametros: ['ParametroSrv', function (ParametroSrv) {
                                return ParametroSrv.get_parametros();
                            }],
                        gastos: ['GastoSrv', function (GastoSrv) {
                                return GastoSrv.get_gastos();
                            }]
                    }
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
          theme: 'app/css/theme-e.css', //null,
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




// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ClientesCtrl', Controller);

    Controller.$inject = ['$log', 'ClienteSrv', 'clientes'];
    function Controller($log, ClienteSrv, clientes) {

        var self = this;

        self.clientes = clientes.data;

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
            .service('ClienteSrv', Cliente);

    Cliente.$inject = ['$http', 'URL_API'];
    function Cliente($http, URL_API) {
        var url = URL_API;
        return {
            get_clientes: function () {
                return $http.get(url + 'clientes');
            },
            add_cliente: function (cliente) {
                return $http.post(url + 'clientes', {cliente: cliente});
            }
        };
    }

})();

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('CotizacionSrv', Cotizacion);

    Cotizacion.$inject = ['$http', 'URL_API'];
    function Cotizacion($http, URL_API) {
        var url = URL_API;
        return {
            get_cotizaciones: function () {
                return $http.get(url + 'cotizaciones');
            },
            get_cotizacion: function (id_cotizacion) {
                return $http.get(url + 'cotizaciones/' + id_cotizacion);
            },
            del_cotizacion: function (id_cotizacion) {
                return $http.delete(url + 'cotizaciones/' + id_cotizacion);
            },
            add_cotizacion: function (cotizacion) {
                return $http.post(url + 'cotizaciones', {cotizacion: cotizacion});
            },
            update_cotizacion: function (id_cotizacion, cotizacion) {
                return $http.put(url + 'cotizaciones/' + id_cotizacion, {cotizacion: cotizacion});
            },
            get_reporte: function (id_cotizacion, cotizacion) {
                return $http.post(url + 'cotizaciones/reporte/' + id_cotizacion, {cotizacion: cotizacion});
            }
        };
    }

})();


(function () {
    'use strict';
    angular
            .module('app.logic')
            .controller('CotizacionArqCtrl', Controller);
    Controller.$inject = ['CotizacionSrv', '$window', 'productos', 'garantias', 'parametros', 'gastos'];
    function Controller(CotizacionSrv, $window, productos, garantias, parametros, gastos) {

        var self = this;
        //self.pieza_selected={};
        self.show_resto = false;
        self.procesadas = [];
        self.productos = productos.data;
        self.garantias = garantias.data;
        self.parametros = parametros.data;
        self.gastos = gastos.data;
        self.rollo = null;
        self.toggleFormulaPrecio182 = false;
        self.toggleFormulaPrecio152 = false;
        self.toggleFormulaCosto182 = false;
        self.toggleFormulaCosto152 = false;
        self.cot = {
            flete: _.findWhere(self.parametros, {clave: 'flete'}).valor,
            instalacion_m2: _.findWhere(self.parametros, {clave: 'instalacion'}).valor,
            dolar: _.findWhere(self.parametros, {clave: 'dolar'}).valor,
            intro: _.findWhere(self.parametros, {clave: 'intro'}).texto,
            notas: _.findWhere(self.parametros, {clave: 'notas'}).texto,
            cuenta: _.findWhere(self.parametros, {clave: 'cuenta'}).texto
        };
        self.get_pdf = function () {
            console.log("crear documento PDF");
            CotizacionSrv.get_reporte(1, self.cot).then(function (response) {

                console.log("response", response);
                //$window.open("data:application/pdf;base64," + response.data.pdfbase64, "_blank");

                $window.open("/defenderglass_api/public/" + response.data.filename, "_blank");

//                

//                var win = $window.open("", "win");
//                win.document.open("application/pdf");
//                win.document.write(response.data);
//                win.document.close();



//                var blob = self.b64toBlob(response.data.pdfbase64, 'application/pdf');
//                var blobUrl = URL.createObjectURL(blob);
//
//
//                $window.open(blobUrl);


            }).catch(function (response) {
                console.log("error");
            });
        };
        self.b64toBlob = function (b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

        self.cotizar = function () {
            self.cot.flete_m2 = Math.ceil(self.cot.flete / (46.45 * 10)) * 10;
            self.cot.costo_152 = Math.ceil((self.cot.rollo_152.precio * self.cot.dolar) / (46.45 * 10)) * 10;
            self.cot.precio_efectivo_152 = Math.ceil((parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + parseFloat(self.cot.garantia.comision_venta) + parseFloat(self.cot.instalacion_m2)) / (((100 - self.cot.garantia.utilidad) / 100) * 10)) * 10;
            self.cot.precio_merma_152 = Math.ceil((parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + 50) / 10) * 10;
            self.cot.total_efectivo_152 = Math.ceil((self.cot.precio_efectivo_152 * self.cot.efectivo_m2) / 10) * 10;
            self.cot.total_merma_152 = Math.ceil((self.cot.precio_merma_152 * self.cot.merma_m2) / 10) * 10;
        };
        self.costo_152 = function () {
            if (self.cot.rollo_152 && self.cot.rollo_152.precio && self.cot.dolar) {

                //self.cot.costo_152 = Math.ceil((self.cot.rollo_152.precio * self.cot.dolar) / (46.45 * 10)) * 10;
                return Math.round(((self.cot.rollo_152.precio * self.cot.dolar) / 46.45) * 100) / 100;
            }
        };
        self.precio_efectivo_152 = function () {
            if (self.cot.garantia && self.cot.costo_152 && self.cot.flete_m2 && self.cot.garantia.comision_venta && self.cot.instalacion_m2 && self.cot.garantia.utilidad) {

                var precio = parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + parseFloat(self.cot.garantia.comision_venta) + parseFloat(self.cot.instalacion_m2);
                //console.log("precio", precio);
                var utilidad = (100 - self.cot.garantia.utilidad) / 100;
                //console.log("utilidad", utilidad);
                //elf.cot.precio_efectivo_152 = Math.ceil(precio / (utilidad * 10)) * 10;
                return Math.round((precio / utilidad) * 100) / 100;
            }
        };
        self.precio_merma_152 = function () {
            if (self.cot.costo_152 && self.cot.flete_m2) {

                var precio = parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + 50;
                //self.cot.precio_merma_152 = Math.ceil(precio / 10) * 10;

                return Math.round(precio * 100) / 100;
            }
        };
        self.total_efectivo_152 = function () {
            //self.cot.total_efectivo_152 = Math.ceil((self.cot.precio_efectivo_152 * self.cot.efectivo_m2) / 10) * 10;
            return Math.round(self.cot.precio_efectivo_152 * self.cot.efectivo_m2 * 100) / 100;
        };
        self.total_merma_152 = function () {
            //self.cot.total_merma_152 = Math.ceil((self.cot.precio_merma_152 * self.cot.merma_m2) / 10) * 10;
            return Math.round(self.cot.precio_merma_152 * self.cot.merma_m2 * 100) / 100;
        };
        self.costo_80 = function () {
            if (self.cot.rollo_80 && self.cot.rollo_80.precio && self.cot.dolar) {

                return Math.round(((self.cot.rollo_80.precio * self.cot.dolar) / 61.93) * 100) / 100;
            }
        };
        self.flete_m2 = function () {
            if (self.cot.flete) {

                //self.cot.flete_m2 = Math.ceil(self.cot.flete / (46.45 * 10)) * 10;

                return Math.round((self.cot.flete / 46.45) * 100) / 100;
            }
        };
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

            analizar(self.procesadas, 1.52);
            analizar(self.procesadas, 1.82);
            calcular_optimo(self.procesadas);
//            for (var k = 0; k < self.procesadas.length; k++) {
//
//                var l = self.procesadas[k].largo;
//                var a = self.procesadas[k].ancho;
//                var n = self.procesadas[k].cantidad;
//
//                var mc = 0, mr = 0;
//
//                // 1. Cuantos caben a lo ancho
//                var na = Math.floor(A / a);
//                console.log("cuantos caben a lo ancho", na);
//
//                if (na > 0) {
//                    // 2 cociente
//                    var c = Math.floor(n / na);
//                    console.log("cociente", c);
//                    //3 resto
//                    var r = n - (na * c);
//                    console.log("resto", r);
//
//                    //4 calcular merma cociente
//                    var Hc = {h1: 0, h2: 0, h3: l, h4: A};
//                    //console.log("Hc", JSON.stringify(Hc));
//                    var Bc = [];
//                    var aux = 0;
//                    // ancho en mm
//                    var am = a * 1000;
//
//                    if (c > 0) {
//
//                        for (var i = 0; i < na; i++) {
//                            // (i+1)*a
//                            aux = Math.floor((i * am) + am) / 1000;
//                            Bc.push({b1: 0, b2: Math.floor(i * am) / 1000, b3: l, b4: aux});
//                            Hc.h2 = aux;
//                        }
//                        mc = Math.round(Hc.h3 * (Hc.h4 - Hc.h2) * c * 10000) / 10000;
//                    }
//
//
//                    //5 calcular merma resto
//                    var Hr = {h1: 0, h2: 0, h3: l, h4: A};
//                    var Br = [];
//                    for (var i = 0; i < r; i++) {
//                        aux = Math.floor((i * am) + am) / 1000;
//                        Br.push({b1: 0, b2: Math.floor(i * am) / 1000, b3: l, b4: aux});
//                        Hr.h2 = aux;
//                    }
//                    if (r === 0) {
//                        mr = 0;
//                    } else {
//                        mr = Math.round(Hr.h3 * (Hr.h4 - Hr.h2) * 10000) / 10000;
//                    }
//
//                    console.log("------------------");
//
//                    self.procesadas[k].c = c;
//                    self.procesadas[k].mc = mc;
//                    self.procesadas[k].mr = mr;
//                    self.procesadas[k].merma = Math.round(mc * 10000 + mr * 10000) / 10000;
//                    self.procesadas[k].efectivo = Math.round(n * l * a * 10000) / 10000;
//                    self.procesadas[k].bc = Bc;
//                    self.procesadas[k].br = Br;
//                    self.procesadas[k].hc = Hc;
//                    self.procesadas[k].hr = Hr;
//
//                }
//
//            }


        };
        function calcular_optimo(piezas) {
            for (var k = 0; k < piezas.length; k++) {
                if (piezas[k]._152.merma <= piezas[k]._182.merma) {
                    piezas[k].optimo = 152;
                } else {
                    piezas[k].optimo = 182;
                }

            }
        }

        function analizar(piezas, A) {
            console.log("ini----------------");
            console.log("analizando " + piezas.length + " piezas");
            console.log("rollo de ancho " + A + " m");
            console.log("----------------");
            for (var k = 0; k < piezas.length; k++) {

                var l = piezas[k].largo;
                var a = piezas[k].ancho;
                var n = piezas[k].cantidad;
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

                    console.log("fin------------------");
                    piezas[k].efectivo = Math.round(n * l * a * 10000) / 10000;
                    if (A == 1.52) {
                        piezas[k]._152 = {};
                        piezas[k]._152.c = c;
                        piezas[k]._152.mc = mc;
                        piezas[k]._152.mr = mr;
                        piezas[k]._152.merma = Math.round(mc * 10000 + mr * 10000) / 10000;
                        //piezas[k]._152.efectivo = Math.round(n * l * a * 10000) / 10000;
                        piezas[k]._152.bc = Bc;
                        piezas[k]._152.br = Br;
                        piezas[k]._152.hc = Hc;
                        piezas[k]._152.hr = Hr;
                    } else {
                        piezas[k]._182 = {};
                        piezas[k]._182.c = c;
                        piezas[k]._182.mc = mc;
                        piezas[k]._182.mr = mr;
                        piezas[k]._182.merma = Math.round(mc * 10000 + mr * 10000) / 10000;
                        //piezas[k]._182.efectivo = Math.round(n * l * a * 10000) / 10000;
                        piezas[k]._182.bc = Bc;
                        piezas[k]._182.br = Br;
                        piezas[k]._182.hc = Hc;
                        piezas[k]._182.hr = Hr;
                    }

                }

            }
        }

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
        self.draw = function (p, A) {
            //self.pieza_selected=pieza;
            self.show_resto = false;
            var cociente = $("#cociente");
            var resto = $("#resto");
            cociente.empty();
            resto.empty();
            var B = null;
            var H = null;
            var es_resto = false;
            //elegimos el ancho del rollo
            var pieza = null;
            if (A === 152) {
                pieza = p._152;
            } else {
                pieza = p._182;
            }

            console.log("pieza", JSON.stringify(pieza));
            //tiene piezas en el cociente?
            if (pieza.bc.length > 0) {

                B = pieza.bc;
                H = pieza.hc;
            } else {
                //solo tiene piezas en el resto
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
                self.show_resto = true;
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
        self.set_merma_152 = function () {
            self.cot.merma_m2 = self.cot.merma_152;
            self.cot.rollo = 1;
        };
        self.set_merma_182 = function () {
            self.cot.merma_m2 = self.cot.merma_182;
            self.cot.rollo = 2;
        };
        self.set_merma_optimo = function () {
            self.cot.merma_m2 = self.cot.merma_optimo;
            self.cot.rollo = 3;
        };
        self.sum_efectivo = function (procesadas) {

            var sum = 0;
            for (var i = 0; i < procesadas.length; i++) {
                sum += procesadas[i].efectivo;
            }
            self.cot.efectivo_m2 = Math.floor(sum * 10000) / 10000;
            return self.cot.efectivo_m2;
        };
        self.sum_merma = function (procesadas, op) {
            var sum = 0;
            for (var i = 0; i < procesadas.length; i++) {
                if (op === 1) {
                    sum += procesadas[i]._152.merma;
                } else if (op === 2) {
                    sum += procesadas[i]._182.merma;
                } else if (op === 3) {
                    //sumar el minimo
                    if (procesadas[i].optimo == 152) {
                        sum += procesadas[i]._152.merma;
                    } else if (procesadas[i].optimo == 182) {
                        sum += procesadas[i]._182.merma;
                    } else {
                        console.log("no se ha calculado el optimo");
                    }
                }

            }

            if (op === 1) {
                self.cot.merma_152 = Math.floor(sum * 10000) / 10000;
                return self.cot.merma_152;
            } else if (op === 2) {
                self.cot.merma_182 = Math.floor(sum * 10000) / 10000;
                return self.cot.merma_182;
            } else if (op === 3) {
                self.cot.merma_optimo = Math.floor(sum * 10000) / 10000;
                return self.cot.merma_optimo;
            }
            //return Math.floor(sum * 10000) / 10000;
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
            .controller('GastosCtrl', Controller);

    Controller.$inject = ['toastr', 'GastoSrv', 'gastos', '$scope', '$uibModal', 'nuevo_tpl', 'editar_tpl', 'cfpLoadingBar'];
    function Controller(toastr, GastoSrv, gastos, $scope, $uibModal, nuevo_tpl, editar_tpl, cfpLoadingBar) {

        var self = this;

        self.nuevo_gasto = {};
        self.gastos = gastos.data;

        self.loading_show = function () {
            cfpLoadingBar.start();
        };

        self.loading_hide = function () {
            cfpLoadingBar.complete();
        };


        self.pre_add_gasto = function () {
            var modalInstance = $uibModal.open({
                templateUrl: nuevo_tpl,
                //controller: 'ModalNuevoGastoCtrl',
                //controllerAs: 'ctrl'
                controller: function ($scope) {
                    $scope.gasto = {};
                    $scope.ok = function () {
                        $scope.$close($scope.gasto);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                }

            });


            modalInstance.result.then(function (gasto) {
                self.add_gasto(gasto);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.pre_edit_gasto = function (original) {

            var copia = angular.copy(original);
            var modalInstance = $uibModal.open({
                templateUrl: editar_tpl,
                controller: function ($scope, gasto) {
                    $scope.gasto = gasto;
                    $scope.ok = function () {
                        $scope.$close($scope.gasto);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    gasto: function () {
                        return copia;
                    }
                }

            });


            modalInstance.result.then(function (gasto) {
                self.edit_gasto(gasto, original);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.pre_del_gasto = function (gasto_selected) {

            console.log("delete");
            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, gasto) {
                    $scope.gasto = gasto;

                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    gasto: function () {
                        return gasto_selected;
                    }
                }

            });


            modalInstance.result.then(function (response) {
                console.log("response", response);

//                var i = self.gastos.indexOf(gasto_selected);
//                self.gastos.splice(i, 1);

                GastoSrv.del_gasto(gasto_selected.id_gasto).then(function (response) {
                    var i = self.gastos.indexOf(gasto_selected);
                    self.gastos.splice(i, 1);

                }).catch(function (response) {
                    console.log("error");
                }).finally(function (response) {
                });
            }, function (response) {
                console.log("response", response);
            });
        };





//        ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
//        function ModalInstanceCtrl($scope, $uibModalInstance) {
//
//            $scope.ok = function () {
//                $uibModalInstance.close('closed');
//            };
//
//            $scope.cancel = function () {
//                $uibModalInstance.dismiss('cancel');
//            };
//        }



        self.add_gasto = function (gasto) {
            GastoSrv.add_gasto(gasto).then(function (response) {
                self.gastos.push(response.data);
            }).catch(function (response) {
                console.log("error");
            }).finally(function (response) {

                //$scope.formNuevoGasto.$setPristine();
                //$scope.formNuevoGasto.$setUntouched();
                //self.nuevo_gasto = {};
            });
        };

        self.edit_gasto = function (gasto,original) {

            var i = self.gastos.indexOf(original);
            delete gasto.id_gasto;

            GastoSrv.update_gasto(original.id_gasto, gasto).then(function (response) {

                self.gastos[i] = response.data;
                toastr.success('info', '', 'Los datos se han actualizado correctamente');

            }).catch(function (response) {

            }).finally(function (response) {

            });
        };





    }
})();



(function () {
    'use strict';

    angular.module('app.logic')
            .filter('tipoGastoExtra', function () {
                return function (input) {
                    var tipo = 'm<sup>2</sup>';
                    if (input === 'D') {
                        tipo = 'Día';
                    }

                    return tipo;
                };
            });

})();

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('GastoSrv', Gasto);

    Gasto.$inject = ['$http', 'URL_API'];
    function Gasto($http, URL_API) {
        var url = URL_API;
        return {
            get_gastos: function () {
                return $http.get(url + 'gastosextras');
            },
            add_gasto: function (gasto) {
                return $http.post(url + 'gastosextras', {gasto: gasto});
            },
            del_gasto: function (id_gasto) {
                return $http.delete(url + 'gastosextras/' + id_gasto);
            },
            update_gasto: function (id_gasto, gasto) {
                return $http.put(url + 'gastosextras/' + id_gasto, {gasto: gasto});
            }

        };
    }

})();

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ModalNuevoGastoCtrl', Controller);

    Controller.$inject = ['GastoSrv', '$scope', '$uibModalInstance'];
    function Controller(GastoSrv, $scope, $uibModalInstance) {

        var self = this;
        self.gasto = {};

        self.cancelar = function () {
            $uibModalInstance.dismiss('close');
        };
   

//        $scope.$on('modal-refresh', function (event, element) {
//
//            GastoSrv.add_gasto(self.gasto).then(function (response) {
//                self.gasto = {};
//                //$scope.formNuevoGasto.$setPristine();
//                //$scope.formNuevoGasto.$setUntouched();
//                $scope.$broadcast('removeModalSpinner', element);
//                $uibModalInstance.close(response.data);
//
//
//            }).catch(function (response) {
//                console.log("error");
//            }).finally(function (response) {
//
//            });
//        });

        self.add_gasto = function () {
         
            GastoSrv.add_gasto(self.gasto).then(function (response) {
                self.gasto = {};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                $uibModalInstance.close(response.data);
            }).catch(function (response) {
                $uibModalInstance.dismiss('error');
            }).finally(function (response) {
              
            });
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
            .controller('LogoutCtrl', Controller);

    Controller.$inject = ['$state', '$auth'];
    function Controller($state, $auth) {

        var self = this;

        $auth.removeToken();
        console.log("logout");
        $state.go('page.login');



    }
})();

/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function () {
    'use strict';

    angular
            .module('app.logic')
            .directive('textParam', textParam);

    textParam.$inject = ['$compile', '$timeout', 'ParametroSrv', 'toastr'];
    function textParam($compile, $timeout, ParametroSrv, toastr) {



        var directive = {
            //link: link,
            template: '<form id="form" name="form" class="form-horizontal">\
                        <div class="form-group" ng-class="{\'has-success\':(form.texto.$dirty || form.texto.$touched) }">\
                        <label class="control-label col-lg-2">{{p.nombre}}</label>\
                            <div class="col-lg-10">\
                                <textarea rows="7" class="form-control" name="texto" ng-model="copia.texto" ng-disabled="!edit" ></textarea>\
                            </div>\
                        </div>\
                        <div class="form-group">\
                            <div class="col-lg-10 col-lg-offset-2">\
                                <button class="btn btn-default" ng-hide="edit" ng-click="editar()">Editar</button>\
                                <button class="btn btn-default" ng-show="edit" ng-click="cancel()">Cancelar</button>\
                                <button class="btn btn-primary" ng-show="edit" ng-click="update_parametro()">Guardar</button>\
                            </div>\
                        </div>\
                    </form>',
            restrict: 'E',
            scope: {
                p: '=param',
                edit: '=disabled'

            },
            controller: ['$scope', function ($scope) {
                    $scope.edit = false;
                    $scope.copia = {};
                    $scope.copia.texto = $scope.p.texto; //angular.copy($scope.p);
                    $scope.editar=function(){
                      $scope.edit=true;  
                    };
                    
                    $scope.cancel = function () {
                        //console.log("hola desde el controlador de la directiva");
                        $scope.edit = !$scope.edit;
                        $scope.form.$setPristine();
                        $scope.form.$setUntouched();
                        $scope.copia.texto = $scope.p.texto;
                    };

                    $scope.update_parametro = function () {

                        ParametroSrv.update_parametro($scope.p.id_parametro, $scope.copia).then(function (response) {

                            $scope.p = response.data;
                            $scope.edit = false;
                            toastr.success('info', '', 'Los datos se han actualizado correctamente');
                            $scope.form.$setPristine();
                            $scope.form.$setUntouched();

                        }).catch(function (response) {

                        }).finally(function (response) {

                        });
                    };
                }]
        };
        return directive;



        function link(scope, element, attrs) {

//            scope.cancel=function(){
//                console.log("cancelar desde la directiva");
//            };

//            var templates = {
            /* jshint multistr: true */
//                textarea: '<form id="textparam_{{index}}" name="textparam_{{index}}" class="form-horizontal">\
//                        <div class="form-group">\
//                        <label class="control-label col-lg-2">{{p.nombre}}</label>\
//                            <div class="col-lg-10">\
//                            <textarea rows="7" class="form-control" ng-model="p.texto" ng-disabled="textparam_{{index}}" ></textarea>\
//                            </div>\
//                        </div>\
//                        <div class="form-group">\
//                            <div class="col-lg-10 col-lg-offset-2">\
//                                <button class="btn btn-default" ng-click="textparam_{{index}} = !textparam_{{index}}"><span ng-show="textparam_{{index}}">Editar</span><span ng-show="!textparam_{{index}}">Cancelar</span></button>\
//                                <button class="btn btn-primary" ng-show="!textparam_{{index}}" ng-click="ctrl.update_parametro(p, update_form)">Guardar</button>\
//                            </div>\
//                        </div>\
//                    </form>'
//            collapse:'<a href="#" panel-collapse="" uib-tooltip="Colapsar" ng-click="{{panelId}} = !{{panelId}}">\
//                       <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em>\
//                       <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em>\
//                      </a>',
//            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Cerrar">\
//                       <em class="fa fa-times"></em>\
//                     </a>',
//            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Actualizar">\
//                       <em class="fa fa-refresh"></em>\
//                     </a>'
//            };



            //$timeout(function () {
            //element.html(getTemplate(element, attrs)).show();
            //$compile(element.contents())(scope);                
            //});

//            function getTemplate(elem, attrs) {
//                var temp = '';
//                attrs = attrs || {};
//                if (attrs.index) {
//                    temp += templates.textarea.replace(/{{index}}/g, attrs.index);
//                }
//                return temp;
//            }
        }// link
    }

})();


// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ParametrosCtrl', Controller);

    Controller.$inject = ['toastr', '$uibModal', 'ParametroSrv', 'parametros', 'editar_tpl'];
    function Controller(toastr, $uibModal, ParametroSrv, parametros, editar_tpl) {

        var self = this;

        self.parametros = parametros.data;

//        self.param_introduccion = _.findWhere(self.parametros, {clave: 'intro'});
//        self.param_notas = _.findWhere(self.parametros, {clave: 'notas'});
//        self.param_cuenta = _.findWhere(self.parametros, {clave: 'cuenta'});

        self.pre_edit_parametro = function (original) {

            var copia = angular.copy(original);
            var modalInstance = $uibModal.open({
                templateUrl: editar_tpl,
                controller: function ($scope, param) {
                    $scope.param = param;
                    $scope.ok = function () {
                        $scope.$close($scope.param);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    param: function () {
                        return copia;
                    }
                }

            });


            modalInstance.result.then(function (param) {
                self.edit_parametro(param, original);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.edit_parametro = function (param, original) {

            var i = self.parametros.indexOf(original);
            delete param.id_parametro;
            delete param.nombre;
            delete param.tipo;
            delete param.clave;
            delete param.id_empresa;

            ParametroSrv.update_parametro(original.id_parametro, param).then(function (response) {

                self.parametros[i] = response.data;
                toastr.success('info', '', 'Los datos se han actualizado correctamente');

            }).catch(function (response) {

            }).finally(function (response) {

            });
        };


        self.update_parametro = function (param, form) {

            //var id_parametro = param.id_parametro;
            var i = self.parametros.indexOf(param);

            var copia = angular.copy(param);

            delete copia.id_parametro;
            delete copia.nombre;
            delete copia.tipo;
            delete copia.clave;
            delete copia.id_empresa;

            ParametroSrv.update_parametro(param.id_parametro, copia).then(function (response) {

                self.parametros[i] = response.data;
                toastr.success('info', '', 'Los datos se han actualizado correctamente');
                form.$setPristine();
                form.$setUntouched();

            }).catch(function (response) {

            }).finally(function (response) {

            });
        };








    }
})();

(function () {
    'use strict';

    angular
            .module('app.logic')
            .service('ParametroSrv', Parametro);

    Parametro.$inject = ['$http', 'URL_API'];
    function Parametro($http, URL_API) {
        var url = URL_API;
        return {
            get_parametros: function () {
                return $http.get(url + 'parametros');
            },
            add_parametro: function (parametro) {
                return $http.post(url + 'parametros', {parametro: parametro});
            },
            update_parametro: function (id_parametro, parametro) {
                return $http.put(url + 'parametros/' + id_parametro, {parametro: parametro});
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
            .controller('ImportarProductosCtrl', Controller);

    Controller.$inject = ['$scope', 'toaster', 'ProductoSrv', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos', 'FileUploader', 'URL_API'];
    function Controller($scope, toaster, ProductoSrv, niveles_seguridad, segmentos, categorias, anchos, FileUploader, URL_API) {

        var self = this;

        self.niveles_seguridad = niveles_seguridad.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.anchos = anchos.data;

        self.uploader = new FileUploader({
            url: URL_API + 'productos/upload'
        });

        self.uploader.filters.push({
            name: 'queueFilter',
            fn: function (/*item, options*/) {
                return this.queue.length < 1;
            }
        });

        self.uploader.filters.push({
            name: 'excelFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                //var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //console.log("type", type);
                //console.log("file", item.name.split('.').pop());
                var extension = item.name.split('.').pop();
                return '|xls|xlsx|'.indexOf(extension) !== -1;
            }
        });

        self.remove_file = function (item) {
            item.remove();
            //$('#archivo').val("");
            $('#archivo').filestyle("clear");
        };



        self.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            if (filter.name === 'excelFilter') {
                toaster.pop('error', '', 'Sólo se adminten archivos de Excel en formato XLS ó XLSX');
            } else if (filter.name === 'queueFilter') {
                toaster.pop('error', '', 'Sólo puede subir un archivo a la vez');
            }
            $('#archivo').filestyle("clear");
        };
        self.uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        self.uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        self.uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        self.uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        self.uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        self.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        self.uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        self.uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        self.uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            //toastr.success('success', 'Los datos se han actualizado correctamente',{'positionClass':'toast-bottom-full-width','progressBar':true});
            toaster.pop('success', '', 'Los datos se han cargado correctamente');
        };
        self.uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };




    }
})();

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('ModalNuevoProductoCtrl', Controller);

    Controller.$inject = ['GastoSrv', '$scope', '$uibModalInstance', 'producto'];
    function Controller(GastoSrv, $scope, $uibModalInstance, producto) {

        var self = this;
        self.producto = producto;

        self.cancelar = function () {
            $uibModalInstance.dismiss('close');
        };        

        self.add_producto = function () {
            
            GastoSrv.add_gasto(self.gasto).then(function (response) {
                self.gasto = {};
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
                $uibModalInstance.close(response.data);
            }).catch(function (response) {
                $uibModalInstance.dismiss('error');
            }).finally(function (response) {
               
            });
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
            .controller('NuevoProductoCtrl', Controller);

    Controller.$inject = ['$scope', 'ProductoSrv', 'niveles_seguridad', 'segmentos', 'categorias', 'anchos'];
    function Controller($scope, ProductoSrv, niveles_seguridad, segmentos, categorias, anchos) {

        var self = this;

        self.niveles_seguridad = niveles_seguridad.data;
        self.segmentos = segmentos.data;
        self.categorias = categorias.data;
        self.anchos = anchos.data;

        self.default_options =
                {
                    marca: "DefenderGlass",
                    proteccion_uv: 99
                };

        self.producto = angular.copy(self.default_options);

        self.add_producto = function () {
            ProductoSrv.add_producto(self.producto).then(function (response) {
                console.log("nuevo producto :)", JSON.stringify(response.data));
                self.producto = angular.copy(self.default_options);
                $scope.formNuevoProducto.$setPristine();
                $scope.formNuevoProducto.$setUntouched();


            }).catch(function (response) {

            }).finally(function (response) {

            });


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

    Controller.$inject = ['$log', 'ProductoSrv', 'productos', '$uibModal', 'nuevoproducto_tpl'];
    function Controller($log, ProductoSrv, productos, $uibModal, nuevoproducto_tpl) {

        var self = this;
        self.segmento=0;
        self.productos = productos.data;
       

        self.pre_edit_producto = function (p) {
            var modalInstance = $uibModal.open({
                templateUrl: nuevoproducto_tpl,
                controller: 'ModalNuevoProductoCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    producto: function () {
                        return p;
                    }
                }
            });


            modalInstance.result.then(function (nuevo_gasto) {
                console.log("response", nuevo_gasto);
                self.gastos.push(nuevo_gasto);
            }, function (response) {
                console.log("response", response);
            });
        };

        self.pre_del_producto = function (p) {
            var modalInstance = $uibModal.open({
                templateUrl: "confirmar.html",
                controller: function ($scope, producto) {
                    $scope.producto = producto;

                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    producto: function () {
                        return p;
                    }
                }
            });


            modalInstance.result.then(function (result) {
                console.log("response", result);
         
                ProductoSrv.del_producto(p.id_producto).then(function (response) {

                    var i = self.productos.indexOf(p);
                    self.productos.splice(i, 1);

                }).catch(function (response) {
                    console.log("error");
                }).finally(function (response) {
                   
                });
            }, function (response) {
                console.log("response", response);
            });
        };



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
            get_garantias: function () {
                return $http.get(url + 'productos/garantias');
            },
            get_categorias: function () {
                return $http.get(url + 'productos/categorias');
            },
            get_anchos: function () {
                return $http.get(url + 'productos/anchos');
            },
            get_segmentos: function () {
                return $http.get(url + 'productos/segmentos');
            },
            get_niveles_seguridad: function () {
                return $http.get(url + 'productos/niveles_seguridad');
            },
            get_productos: function () {
                return $http.get(url + 'productos');
            },
            add_producto: function (producto) {
                return $http.post(url + 'productos', {producto: producto});
            },
            del_producto: function (id_producto) {
                return $http.delete(url + 'productos/' + id_producto);
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

    Controller.$inject = ['UsuarioSrv', '$uibModal', 'toastr', 'usuarios', 'roles', 'editar_usuario_tpl'];
    function Controller(UsuarioSrv, $uibModal, toastr, usuarios, roles, editar_usuario_tpl) {

        var self = this;

        self.usuarios = usuarios.data;
        self.roles = roles.data;


        self.pre_edit_usuario = function (u) {

            var copia_usuario = angular.copy(u);
            var modalInstance = $uibModal.open({
                templateUrl: editar_usuario_tpl,
                controller: function ($scope, usuario, roles) {

                    $scope.usuario = usuario;
                    $scope.roles = roles;

                    $scope.ok = function () {
                        $scope.$close($scope.usuario);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    usuario: function () {
                        return copia_usuario;
                    },
                    roles: function () {
                        return self.roles;
                    }
                }
            });


            modalInstance.result.then(function (copia) {
                self.edit_usuario(copia, u);
            }, function () {
                console.log("cancel edit");
            });
        };

        self.edit_usuario = function (usuario, original) {

            var i = self.usuarios.indexOf(original);

            var cambiar_password = usuario.cambiar_password;
            delete usuario.cambiar_password;
            if (!cambiar_password) {
                delete usuario.password;
            }

            var id_usuario = usuario.id_usuario;
            delete usuario.id_usuario;
            delete usuario.rol;

            for (var key in usuario) {
                if (usuario[key] === original[key]) {
                    delete usuario[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(usuario));

            if (!_.isEmpty(usuario)) {

                UsuarioSrv.update_usuario(id_usuario, usuario).then(function (response) {

                    self.usuarios[i] = response.data;
                    toastr.success('info', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {

                }).finally(function (response) {

                });
            }

        };

        self.pre_del_usuario = function (u) {

            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
                controller: function ($scope, usuario) {

                    $scope.usuario = usuario;


                    $scope.ok = function () {
                        $scope.$close(true);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    usuario: function () {
                        return u;
                    }
                }
            });


            modalInstance.result.then(function (result) {
                self.del_usuario(u);
            }, function () {
                console.log("cancel delete");
            });
        };

        self.del_usuario = function (usuario) {

            var i = self.usuarios.indexOf(usuario);

            UsuarioSrv.del_usuario(usuario.id_usuario).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.usuarios.splice(i, 1);
                    toastr.success('info', '', 'Los datos se han actualizado correctamente');
                } else {
                    toastr.success('danger', '', 'Los datos no se han actualizado correctamente');
                }

            }).catch(function (response) {
                toastr.success('danger', '', 'Los datos no se han actualizado correctamente');
            }).finally(function (response) {

            });


        };


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
            },
            update_usuario: function (id_usuario, usuario) {
                return $http.put(url + 'usuarios/' + id_usuario, {usuario: usuario});
            },
            del_usuario: function (id_usuario) {
                return $http.delete(url + 'usuarios/' + id_usuario);
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
