
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function () {
    'use strict';

    angular
            .module('app.logic')
            .controller('CotizacionAutoCtrl', Controller);

    Controller.$inject = ['CotizacionSrv', 'ProductoSrv', 'ClienteSrv', 'SesionSrv', '$uibModal', 'toaster', 'productos', 'parametros', 'cliente_nuevo_tpl'];
    function Controller(CotizacionSrv, ProductoSrv, ClienteSrv, SesionSrv, $uibModal, toaster, productos, parametros, cliente_nuevo_tpl) {

        var self = this;
        self.parametros = parametros.data;
        self.productos = productos.data;
        self.clientes = [];


        self.cot = {
            tipo: 'AUT',
            fecha: new Date(),
            dolar: _.findWhere(self.parametros, {clave: 'dolar'}).valor,
            intro: _.findWhere(self.parametros, {clave: 'intro'}).texto,
            notas: _.findWhere(self.parametros, {clave: 'notas'}).texto,
            cuenta: _.findWhere(self.parametros, {clave: 'cuenta'}).texto,
            autor: SesionSrv.get_nombre_usuario(),
            autor_cargo: SesionSrv.get_cargo_usuario()
        };

//        self.tipos = [
//            {id: "S", valor: "Sedán"},
//            {id: "V", valor: "SUV"},
//            {id: "F", valor: "Familiar/Suburban"},
//            {id: "R", valor: "Pickup Cabina Regular"},
//            {id: "D", valor: "Pickup Doble Cabina"}
//        ];

        self.tipos = [
            {id: "sedan", valor: "Sedán"},
            {id: "suv", valor: "SUV"},
            {id: "familiar", valor: "Familiar/Suburban"},
            {id: "pickup_regular", valor: "Pickup Cabina Regular"},
            {id: "pickup_doble", valor: "Pickup Doble Cabina"}
        ];

        self.open_datepicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            self.opened = true;
        };

        self.datepicker_options = {
            showWeeks: false,
            startingDay: 1
        };



        self.pre_edit_producto = function (p) {

            var copia_cotizacion = angular.copy(p);
            var modalInstance = $uibModal.open({
                templateUrl: editar_cotizacion_tpl,
                controller: function ($scope, cotizacion, roles) {

                    $scope.cotizacion = cotizacion;
                    $scope.roles = roles;

                    $scope.ok = function () {
                        $scope.$close($scope.cotizacion);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                },
                resolve: {
                    cotizacion: function () {
                        return copia_cotizacion;
                    },
                    roles: function () {
                        return self.roles;
                    }
                }
            });


            modalInstance.result.then(function (copia) {
                self.edit_cotizacion(copia, u);
            }, function () {
                console.log("cancel edit");
            });
        };

        self.edit_producto = function (producto, original) {

            var i = self.cotizaciones.indexOf(original);

            var cambiar_password = producto.cambiar_password;
            delete producto.cambiar_password;
            if (!cambiar_password) {
                delete producto.password;
            }

            var id_cotizacion = producto.id_cotizacion;
            delete producto.id_cotizacion;
            delete producto.rol;

            for (var key in producto) {
                if (producto[key] === original[key]) {
                    delete producto[key];
                }
            }

            console.log("propiedades para actualizar", JSON.stringify(producto));

            if (!_.isEmpty(producto)) {

                UsuarioSrv.update_cotizacion(id_cotizacion, producto).then(function (response) {

                    self.cotizaciones[i] = response.data;
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');

                }).catch(function (response) {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }).finally(function (response) {

                });
            }

        };

        self.pre_del_producto = function (p) {

            var modalInstance = $uibModal.open({
                templateUrl: 'confirmar.html',
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
                self.del_producto(p);
            }, function () {
                console.log("cancel delete");
            });
        };

        self.del_producto = function (producto) {

            var i = self.productos.indexOf(producto);

            ProductoSrv.del_producto_automotriz(producto.id_modelo).then(function (response) {
                console.log("response delete", response);

                if (response.data === 1) {
                    self.productos.splice(i, 1);
                    toaster.pop('success', '', 'Los datos se han actualizado correctamente');
                } else {
                    toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
                }

            }).catch(function (response) {
                toaster.pop('error', '', 'Los datos no has sido actualizados. Inténtelo más tarde');
            }).finally(function () {

            });


        };

        self.buscar_clientes = function (search) {
            return ClienteSrv.search_clientes(search).then(function (response) {
                return response.data;
            }).catch(function () {

            });

        };

        self.pre_nuevo_cliente = function () {

            var modalInstance = $uibModal.open({
                templateUrl: cliente_nuevo_tpl,
                controller: function ($scope) {
                    $scope.cliente = {persona: 'F'};
                    $scope.show = true;
                    $scope.ok = function () {
                        $scope.$close($scope.cliente);
                    };

                    $scope.cancel = function () {
                        $scope.$dismiss(false);
                    };
                }

            });


            modalInstance.result.then(function (cliente) {
                self.nuevo_cliente(cliente);
            }, function (response) {
                //console.log("response", response);
            });
        };

        self.nuevo_cliente = function (cliente) {
            ClienteSrv.add_cliente(cliente).then(function (response) {
                self.cliente_selected = response.data;
                self.cot.id_cliente = response.data.id_cliente;
                self.cot.dirigido = response.data.nombre;
            }).catch(function () {

            });
        };

        self.on_select_cliente = function ($item, $model, $label, $event) {
            //console.log("onSelect", $item, $model, $label, $event);
            self.cliente_selected = $model;
            self.cot.id_cliente = $model.id_cliente;
            self.cot.dirigido = $model.nombre;
        };

        self.eliminar_asignacion_cliente = function () {
            self.cliente_selected = {};
            self.cot.id_cliente = undefined;
        };


    }
})();
