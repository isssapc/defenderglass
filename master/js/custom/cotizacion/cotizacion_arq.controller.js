
(function () {
    'use strict';
    angular
            .module('app.logic')
            .controller('CotizacionArqCtrl', Controller);
    Controller.$inject = ['CotizacionSrv', 'toaster', '$window', 'productos', 'garantias', 'parametros', 'gastos', 'SesionSrv'];
    function Controller(CotizacionSrv, toaster, $window, productos, garantias, parametros, gastos, SesionSrv) {

        var self = this;
        //self.pieza_selected={};
        self.show_resto = false;
        self.procesadas = [];
        self.productos = productos.data;
        self.garantias = garantias.data;
        self.parametros = parametros.data;
        self.gastos = gastos.data;
        self.rendimiento = _.findWhere(self.parametros, {clave: 'rendimiento'}).valor,
                self.rollo = null;
        self.toggleFormulaPrecio182 = false;
        self.toggleFormulaPrecio152 = false;
        self.toggleFormulaCosto182 = false;
        self.toggleFormulaCosto152 = false;
        self.cot = {
            tipo: 'ARQ',
            flete: _.findWhere(self.parametros, {clave: 'flete'}).valor,
            instalacion_m2: _.findWhere(self.parametros, {clave: 'instalacion'}).valor,
            dolar: _.findWhere(self.parametros, {clave: 'dolar'}).valor,
            intro: _.findWhere(self.parametros, {clave: 'intro'}).texto,
            notas: _.findWhere(self.parametros, {clave: 'notas'}).texto,
            cuenta: _.findWhere(self.parametros, {clave: 'cuenta'}).texto,
            autor: SesionSrv.get_nombre_usuario(),
            autor_cargo: SesionSrv.get_cargo_usuario()
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
        };

        self.cotizar = function () {
            self.cot.flete_m2 = Math.ceil(self.cot.flete / (46.45 * 10)) * 10;
            self.cot.costo_152 = Math.ceil((self.cot.rollo_152.precio * self.cot.dolar) / (46.45 * 10)) * 10;
            self.cot.precio_efectivo_152 = Math.ceil((parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + parseFloat(self.cot.garantia.comision_venta) + parseFloat(self.cot.instalacion_m2)) / (((100 - self.cot.garantia.utilidad) / 100) * 10)) * 10;
            self.cot.precio_merma_152 = Math.ceil((parseFloat(self.cot.costo_152) + parseFloat(self.cot.flete_m2) + 50) / 10) * 10;
            self.cot.total_efectivo_152 = Math.ceil((self.cot.precio_efectivo_152 * self.cot.efectivo_m2) / 10) * 10;
            self.cot.total_merma_152 = Math.ceil((self.cot.precio_merma_152 * self.cot.merma_m2) / 10) * 10;

            var gastos_m = _.chain(self.gastos).where({tipo: 'M', selected: true}).reduce(function (sum, item) {
                return sum + item.precio;
            }, 0).value();

            var gastos_d = _.chain(self.gastos).where({tipo: 'D', selected: true}).reduce(function (sum, item) {
                return sum + item.precio;
            }, 0).value();


            self.cot.gastos_extras_m = gastos_m;
            self.cot.gastos_extras_d = gastos_d;
            self.cot.total_gastos_extras = Math.ceil((self.cot.efectivo_m2 * self.cot.gastos_extras_m + self.cot.dias_instalacion * self.cot.gastos_extras_d) / 10) * 10;

            self.cot.total_pesos = (self.cot.total_efectivo_152 + self.cot.total_merma_152 + self.cot.total_gastos_extras);
            self.cot.total_dolares = Math.round((self.cot.total_pesos / self.cot.dolar) * 100) / 100;
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

        self.total_gastos_extras = function () {

            return Math.ceil((self.cot.efectivo_m2 * self.cot.gastos_extras_m + self.cot.dias_instalacion * self.cot.gastos_extras_d) * 100) / 100;
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
//        self.dias_instalacion=function(){
//            var count=0;
//            count= self.cot.efectivo_m2/self.rendimiento;
//            return count;
//        };
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

            //calculamos el numero de dias necesarios para instalar
            self.cot.dias_instalacion = Math.ceil(self.cot.efectivo_m2 / self.rendimiento);

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

        self.guardar_cotizacion = function () {
            CotizacionSrv.add_cotizacion(self.cot).then(function (response) {
                //console.log("response", response.data);
                toaster.pop('success', '', 'La cotización se ha guardado correctamente');
            }).catch(function () {
                toaster.pop('error', '', 'Ha ocurrido un error. Inténtelo más tarde');
            });
        };
    }
})();
