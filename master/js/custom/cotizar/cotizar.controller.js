
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
