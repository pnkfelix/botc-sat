! function(e, r) {
    "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((e = "undefined" != typeof globalThis ? globalThis : e || self).minisolvers = {})
}(this, (function(e) {
    "use strict";

    function r(e, r, f) {
        return r = i(r),
            function(e, r) {
                if (r && ("object" == typeof r || "function" == typeof r)) return r;
                if (void 0 !== r) throw new TypeError("Derived constructors may only return object or undefined");
                return function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e)
            }(e, n() ? Reflect.construct(r, f || [], i(e).constructor) : r.apply(e, f))
    }

    function f(e, r) {
        if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
    }

    function A(e, r, f) {
        return r && function(e, r) {
            for (var f = 0; f < r.length; f++) {
                var A = r[f];
                A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(e, t(A.key), A)
            }
        }(e.prototype, r), Object.defineProperty(e, "prototype", {
            writable: !1
        }), e
    }

    function i(e) {
        return i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, i(e)
    }

    function a(e, r) {
        if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(r && r.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(e, "prototype", {
            writable: !1
        }), r && b(e, r)
    }

    function n() {
        try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
        } catch (e) {}
        return (n = function() {
            return !!e
        })()
    }

    function b(e, r) {
        return b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, r) {
            return e.__proto__ = r, e
        }, b(e, r)
    }

    function t(e) {
        var r = function(e, r) {
            if ("object" != typeof e || !e) return e;
            var f = e[Symbol.toPrimitive];
            if (void 0 !== f) {
                var A = f.call(e, r);
                if ("object" != typeof A) return A;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(e)
        }(e, "string");
        return "symbol" == typeof r ? r : r + ""
    }

    function o(e) {
        return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, o(e)
    }

    function k(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    var u = {
        exports: {}
    };
    ! function(e) {
        var r, f = (r = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0, "undefined" != typeof __filename && (r = r || __filename), function() {
            var e, f, A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                i = A;
            i.ready = new Promise((function(r, A) {
                e = r, f = A
            }));
            var a, n, b = Object.assign({}, i),
                t = function(e, r) {
                    throw r
                },
                k = "object" == ("undefined" == typeof window ? "undefined" : o(window)),
                u = "function" == typeof importScripts,
                c = "object" == ("undefined" == typeof process ? "undefined" : o(process)) && "object" == o(process.versions) && "string" == typeof process.versions.node,
                s = "";
            if (c) {
                var l = require("fs"),
                    v = require("path");
                s = u ? v.dirname(s) + "/" : __dirname + "/", a = function(e, r) {
                    return e = F(e) ? new URL(e) : v.normalize(e), l.readFileSync(e, r ? void 0 : "utf8")
                }, n = function(e) {
                    return (e = a(e, !0)).buffer || (e = new Uint8Array(e)), e
                }, process.argv.slice(2), t = function(e, r) {
                    throw process.exitCode = e, r
                }, i.inspect = function() {
                    return "[Emscripten Module object]"
                }
            } else(k || u) && (u ? s = self.location.href : "undefined" != typeof document && document.currentScript && (s = document.currentScript.src), r && (s = r), s = 0 !== s.indexOf("blob:") ? s.substr(0, s.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", a = function(e) {
                var r = new XMLHttpRequest;
                return r.open("GET", e, !1), r.send(null), r.responseText
            }, u && (n = function(e) {
                var r = new XMLHttpRequest;
                return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response)
            }));
            var g, P = i.print || console.log.bind(console),
                w = i.printErr || console.error.bind(console);

            function d() {}

            function C(e) {
                this.exports = function(e) {
                    for (var r, f = new Uint8Array(123), A = 25; A >= 0; --A) f[48 + A] = 52 + A, f[65 + A] = A, f[97 + A] = 26 + A;

                    function i(e, r, A) {
                        for (var i, a, n = 0, b = r, t = A.length, o = r + (3 * t >> 2) - ("=" == A[t - 2]) - ("=" == A[t - 1]); n < t; n += 4) i = f[A.charCodeAt(n + 1)], a = f[A.charCodeAt(n + 2)], e[b++] = f[A.charCodeAt(n)] << 2 | i >> 4, b < o && (e[b++] = i << 4 | a >> 2), b < o && (e[b++] = a << 6 | f[A.charCodeAt(n + 3)])
                    }
                    f[43] = 62, f[47] = 63;
                    var a = new ArrayBuffer(16),
                        n = new Int32Array(a),
                        b = new Float32Array(a),
                        t = new Float64Array(a);

                    function o(e) {
                        return n[e]
                    }

                    function k(e, r) {
                        n[e] = r
                    }

                    function u() {
                        return t[0]
                    }

                    function c(e) {
                        t[0] = e
                    }

                    function s() {
                        throw new Error("abort")
                    }

                    function l(e) {
                        b[2] = e
                    }
                    return function(e) {
                        var f = e.a,
                            A = f.a,
                            a = A.buffer;
                        A.grow = function(e) {
                            e |= 0;
                            var f = 0 | or(),
                                i = f + e | 0;
                            if (f < i && i < 65536) {
                                var o = new ArrayBuffer(C(i, 65536));
                                new Int8Array(o).set(n), n = new Int8Array(o), b = new Int16Array(o), t = new Int32Array(o), v = new Uint8Array(o), g = new Uint16Array(o), P = new Uint32Array(o), w = new Float32Array(o), d = new Float64Array(o), a = o, A.buffer = a, r = v
                            }
                            return f
                        };
                        var n = new Int8Array(a),
                            b = new Int16Array(a),
                            t = new Int32Array(a),
                            v = new Uint8Array(a),
                            g = new Uint16Array(a),
                            P = new Uint32Array(a),
                            w = new Float32Array(a),
                            d = new Float64Array(a),
                            C = Math.imul,
                            y = Math.fround,
                            h = Math.abs,
                            m = Math.clz32,
                            B = f.b,
                            p = f.c,
                            D = f.d,
                            T = f.e,
                            I = f.f,
                            z = f.g,
                            j = f.h,
                            W = f.i,
                            G = 78176,
                            E = 0;

                        function S(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                C = 0,
                                m = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                E = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = y(0),
                                F = 0,
                                N = 0,
                                Q = 0;
                            t[e + 4 >> 2] && (t[e + 8 >> 2] = 0);
                            e: {
                                r: {
                                    if (t[e + 36 >> 2] > 0) {
                                        for (; n[t[e + 16 >> 2] + t[t[e + 32 >> 2] + (r << 2) >> 2] | 0] = 0, (0 | (r = r + 1 | 0)) < t[e + 36 >> 2];);
                                        if (t[e + 32 >> 2]) break r;
                                        break e
                                    }
                                    if (!t[e + 32 >> 2]) break e
                                }
                                t[e + 36 >> 2] = 0
                            }
                            if (!v[e + 492 | 0]) return v[10369];
                            r = t[e + 156 >> 2], r = (f = t[e + 152 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 152 >> 2] = f, t[e + 156 >> 2] = r, k = d[e + 120 >> 3] * +t[e + 208 >> 2], d[e + 640 >> 3] = k, (D = k) < (k = +t[e + 104 >> 2]) && (d[e + 640 >> 3] = k), r = t[e + 136 >> 2], t[e + 656 >> 2] = r, d[e + 648 >> 3] = 0 | r, r = A = v[10370], t[e + 44 >> 2] > 0 && (xe(1884), xe(1068), xe(1148), xe(1964), r = v[10370]);
                            e: if ((254 & ~r) >>> 1 & (255 & A) == (255 & r) | r & A & 2)
                                for (;;) {
                                    if (k = d[e + 112 >> 3], r = Z, v[e + 80 | 0]) {
                                        if (f = 1, A = 0, r = 0, Z)
                                            for (; r = r + 1 | 0, (0 | Z) >= (0 | (f = 1 | (A = f << 1))););
                                        if ((0 | A) != (0 | (f = Z)))
                                            for (; r = r - 1 | 0, (0 | (A = (i = A >> 1) - 1 | 0)) != (0 | (f = (0 | f) % (0 | i) | 0)););
                                    }
                                    f = t[e + 108 >> 2], k = H(k, +(0 | r)) * +(0 | f), z = h(k) < 2147483648 ? ~~k : -2147483648, F = 0, G = u = G + -64 | 0, t[u + 56 >> 2] = 0, t[u + 48 >> 2] = 0, t[u + 52 >> 2] = 0, f = t[e + 164 >> 2], f = (r = t[e + 160 >> 2] + 1 | 0) ? f : f + 1 | 0, t[e + 160 >> 2] = r, t[e + 164 >> 2] = f, Q = e + 544 | 0, E = e + 284 | 0;
                                    r: {
                                        f: {
                                            A: {
                                                for (;;) {
                                                    i: {
                                                        a: if (-1 == (0 | (r = x(e)))) {
                                                            n: {
                                                                b: if (!(v[e + 680 | 0] | !((0 | z) < 0 | (0 | z) > (0 | F))))
                                                                    for (;;) {
                                                                        if (r = t[e + 664 >> 2], i = f = t[e + 668 >> 2], (0 | f) > 0 | (0 | f) >= 0 && (0 | i) == (0 | (f = t[e + 196 >> 2])) & r >>> 0 <= P[e + 192 >> 2] | f >>> 0 > i >>> 0) break b;
                                                                        if (r = t[e + 672 >> 2], i = f = t[e + 676 >> 2], (0 | f) > 0 | (0 | f) >= 0 && (0 | i) == (0 | (f = t[e + 188 >> 2])) & r >>> 0 <= P[e + 184 >> 2] | f >>> 0 > i >>> 0) break b;
                                                                        if (!t[e + 296 >> 2] && !R(e)) break i;
                                                                        if (r = t[e + 272 >> 2], d[e + 640 >> 3] <= +(r - t[e + 284 >> 2] | 0)) {
                                                                            if (f = 0, A = 0, k = d[e + 496 >> 3], K(t[e + 268 >> 2], r, e + 544 | 0), !((0 | (a = t[e + 272 >> 2])) <= 0)) {
                                                                                for (k /= +(0 | r), b = t[e + 544 >> 2]; g = t[e + 268 >> 2], C = t[g + (f << 2) >> 2], (o = t[(m = (c = C << 2) + b | 0) >> 2]) >>> 0 < 96 || (i = t[m + 4 >> 2], (0 | (l = (p = v[(r = i >> 1) + t[e + 332 >> 2] | 0]) ^ 1 & i)) == (0 | (i = v[10368])) & (254 & ~i) >>> 1 | i & p & 2 && -1 != (0 | (r = t[t[e + 396 >> 2] + (r << 3) >> 2])) && (0 | r) == (0 | C) || ((0 | a) / 2 | 0) <= (0 | f) && !(k > +w[4 + (m + (o >>> 5 << 2) | 0) >> 2])) ? (t[g + (A << 2) >> 2] = C, A = A + 1 | 0) : (ie(e, C), i = t[m + 4 >> 2], (0 | (a = (o = v[(r = i >> 1) + t[e + 332 >> 2] | 0]) ^ 1 & i)) == (0 | (i = v[10368])) & (254 & ~i) >>> 1 | i & o & 2 && (i = t[e + 396 >> 2] + (r << 3) | 0, -1 == (0 | (r = t[i >> 2])) | (0 | m) != (t[e + 544 >> 2] + (r << 2) | 0) || (t[i >> 2] = -1)), t[m >> 2] = -4 & t[m >> 2] | 1, b = t[e + 544 >> 2], r = t[c + b >> 2], t[e + 556 >> 2] = 1 + ((t[e + 556 >> 2] + (r >>> 5 | 0) | 0) + (r >>> 3 & 1) | 0)), (0 | (f = f + 1 | 0)) < (0 | (a = t[e + 272 >> 2])););
                                                                                (0 | (r = f - A | 0)) <= 0 || (t[e + 272 >> 2] = a - r)
                                                                            } + P[e + 556 >> 2] > d[e + 96 >> 3] * +P[e + 548 >> 2] && tr[t[t[e >> 2] + 8 >> 2]](e)
                                                                        }
                                                                        t: {
                                                                            o: if (!((0 | (r = t[e + 296 >> 2])) >= t[e + 308 >> 2]))
                                                                                for (A = v[10368];;) {
                                                                                    f = t[t[e + 304 >> 2] + (r << 2) >> 2];
                                                                                    k: {
                                                                                        if ((254 & ~A) >>> 1 & (0 | (o = (i = v[t[e + 332 >> 2] + (f >> 1) | 0]) ^ 1 & f)) == (255 & A) | (i &= 2) & A) {
                                                                                            if (i = t[e + 284 >> 2], t[e + 300 >> 2] != (0 | r)) {
                                                                                                f = t[e + 292 >> 2];
                                                                                                break k
                                                                                            }
                                                                                            if (!((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) && (r = r + f | 0, t[e + 300 >> 2] = r, f = Y(t[e + 292 >> 2], r << 2), t[e + 292 >> 2] = f, f)) {
                                                                                                r = t[e + 296 >> 2], A = v[10368];
                                                                                                break k
                                                                                            }
                                                                                            break f
                                                                                        }
                                                                                        if ((0 | (A = v[10369])) == (0 | o) & (254 & ~A) >>> 1 | A & i) {
                                                                                            f ^= 1, r = 0;
                                                                                            u: {
                                                                                                c: {
                                                                                                    if (t[20 + (a = e + 16 | 0) >> 2] > 0) {
                                                                                                        for (; n[t[a >> 2] + t[t[a + 16 >> 2] + (r << 2) >> 2] | 0] = 0, (0 | (r = r + 1 | 0)) < t[a + 20 >> 2];);
                                                                                                        if (t[a + 16 >> 2]) break c;
                                                                                                        break u
                                                                                                    }
                                                                                                    if (!t[a + 16 >> 2]) break u
                                                                                                }
                                                                                                t[a + 20 >> 2] = 0
                                                                                            }
                                                                                            if (De(a, f), t[e + 296 >> 2]) {
                                                                                                if (n[(z = f >> 1) + t[e + 588 >> 2] | 0] = 1, (0 | (r = t[t[e + 292 >> 2] >> 2])) < (0 | (f = t[e + 284 >> 2])))
                                                                                                    for (;;) {
                                                                                                        if (f = f - 1 | 0, i = t[t[e + 280 >> 2] + (f << 2) >> 2], v[(o = i >> 1) + t[e + 588 >> 2] | 0]) {
                                                                                                            if (-1 != (0 | (A = t[t[e + 396 >> 2] + (o << 3) >> 2]))) {
                                                                                                                if (r = 1, i = t[e + 544 >> 2] + (A << 2) | 0, !((j = t[i >> 2]) >>> 0 < 64))
                                                                                                                    for (; A = t[4 + (i + (r << 2) | 0) >> 2] >> 1, t[4 + (t[e + 396 >> 2] + (A << 3) | 0) >> 2] > 0 && (n[A + t[e + 588 >> 2] | 0] = 1, j = t[i >> 2]), (r = r + 1 | 0) >>> 0 < j >>> 5 >>> 0;);
                                                                                                            } else De(a, 1 ^ i);
                                                                                                            n[o + t[e + 588 >> 2] | 0] = 0, r = t[t[e + 292 >> 2] >> 2]
                                                                                                        }
                                                                                                        if (!((0 | r) < (0 | f))) break
                                                                                                    }
                                                                                                n[z + t[e + 588 >> 2] | 0] = 0
                                                                                            }
                                                                                            break i
                                                                                        }
                                                                                        if (-2 != (0 | f)) break t;
                                                                                        break o
                                                                                    }
                                                                                    if (t[e + 296 >> 2] = r + 1, t[(r << 2) + f >> 2] = i, !((0 | (r = t[e + 296 >> 2])) < t[e + 308 >> 2])) break
                                                                                }
                                                                            c = t[e + 172 >> 2],
                                                                            c = (r = t[e + 168 >> 2] + 1 | 0) ? c : c + 1 | 0,
                                                                            t[e + 168 >> 2] = r,
                                                                            t[e + 172 >> 2] = c,
                                                                            T = (D = 1389796 * d[e + 72 >> 3]) - 2147483647 * +(0 | (r = h(k = D / 2147483647) < 2147483648 ? ~~k : -2147483648)),
                                                                            d[e + 72 >> 3] = T,
                                                                            d[e + 64 >> 3] > T / 2147483647 ? (l = v[10370], (A = t[e + 464 >> 2]) ? (T = (D = 1389796 * T) - 2147483647 * +(0 | (r = h(k = D / 2147483647) < 2147483648 ? ~~k : -2147483648)), d[e + 72 >> 3] = T, f = (254 & ~l) >>> 1 | 0, i = t[e + 460 >> 2], r = h(k = T / 2147483647 * +(0 | A)) < 2147483648 ? ~~k : -2147483648, b = t[i + (r << 2) >> 2], !(f & (0 | (r = v[b + t[e + 332 >> 2] | 0])) == (0 | l) | r & l & 2) | !v[t[e + 380 >> 2] + b | 0] || (r = t[e + 180 >> 2], r = (f = t[e + 176 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 176 >> 2] = f, t[e + 180 >> 2] = r)) : b = -1) : (l = v[10370], b = -1),
                                                                            g = (I = t[e + 460 >> 2]) - 4 | 0,
                                                                            S = ~l >>> 1 & 1,
                                                                            m = t[e + 472 >> 2],
                                                                            c = t[e + 380 >> 2],
                                                                            o = t[e + 332 >> 2];o: {
                                                                                for (; !(-1 != (0 | b) && S & (0 | (r = v[b + o | 0])) == (0 | l) | r & l & 2 && v[b + c | 0]);) {
                                                                                    if (f = -2, !(r = t[e + 464 >> 2])) break o;
                                                                                    if (b = t[I >> 2], r = t[g + (r << 2) >> 2], t[I >> 2] = r, t[m + (r << 2) >> 2] = 0, t[m + (b << 2) >> 2] = -1, A = (r = t[e + 464 >> 2]) - 1 | 0, t[e + 464 >> 2] = A, !((0 | r) < 3)) {
                                                                                        for (W = t[t[e + 488 >> 2] >> 2], C = t[I >> 2], U = d[W + (C << 3) >> 3], p = t[e + 472 >> 2], j = 0, a = 1, f = 0;;) {
                                                                                            k: {
                                                                                                if ((0 | A) <= (0 | (r = j + 2 | 0))) A = t[I + (a << 2) >> 2],
                                                                                                k = d[W + (A << 3) >> 3];
                                                                                                else {
                                                                                                    if (A = t[I + (r << 2) >> 2], D = d[W + (A << 3) >> 3], i = t[I + (a << 2) >> 2], D > (k = d[W + (i << 3) >> 3])) break k;
                                                                                                    A = i
                                                                                                }
                                                                                                D = k,
                                                                                                r = a
                                                                                            }
                                                                                            if (D > U) {
                                                                                                if (t[I + (f << 2) >> 2] = A, t[p + (A << 2) >> 2] = f, f = r, (0 | (A = t[e + 464 >> 2])) > (0 | (a = 1 | (j = r << 1)))) continue
                                                                                            } else r = f;
                                                                                            break
                                                                                        }
                                                                                        t[I + (r << 2) >> 2] = C, t[p + (C << 2) >> 2] = r
                                                                                    }
                                                                                }
                                                                                S & (0 | (r = v[t[e + 364 >> 2] + b | 0])) == (0 | l) | (f = 2 & r) & l ? v[e + 92 | 0] ? (k = (D = 1389796 * T) - 2147483647 * +(0 | (r = h(k = D / 2147483647) < 2147483648 ? ~~k : -2147483648)), d[e + 72 >> 3] = k, f = b << 1 | k / 2147483647 < .5) : f = b << 1 | 0 != v[t[e + 348 >> 2] + b | 0] : f = b << 1 | !!((0 | (i = r)) == (0 | (r = v[10368])) & (254 & ~r) >>> 1 | r & f)
                                                                            }
                                                                            if (r = 10368, -2 == (0 | f)) break A;r = t[e + 296 >> 2]
                                                                        }
                                                                        if (i = t[e + 284 >> 2], t[e + 300 >> 2] == (0 | r)) {
                                                                            if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break n;
                                                                            if (r = r + A | 0, t[e + 300 >> 2] = r, A = Y(t[e + 292 >> 2], r << 2), t[e + 292 >> 2] = A, !A) break n;
                                                                            r = t[e + 296 >> 2]
                                                                        } else A = t[e + 292 >> 2];
                                                                        if (t[e + 296 >> 2] = r + 1, t[(r << 2) + A >> 2] = i, n[(A = f >> 1) + t[e + 332 >> 2] | 0] = 1 & f, r = t[e + 296 >> 2], A = t[e + 396 >> 2] + (A << 3) | 0, t[A >> 2] = -1, t[A + 4 >> 2] = r, r = t[e + 284 >> 2], t[e + 284 >> 2] = r + 1, t[t[e + 280 >> 2] + (r << 2) >> 2] = f, -1 != (0 | (r = x(e)))) break a;
                                                                        if (v[e + 680 | 0]) break
                                                                    }
                                                                if (D = +t[e + 540 >> 2], (0 | (C = t[e + 296 >> 2])) < 0) T = 0;
                                                                else if (p = t[e + 292 >> 2], T = +t[(C ? p : E) >> 2], C) {
                                                                    if (U = 1 / D, g = p - 4 | 0, r = 1, 1 != (0 | C))
                                                                        for (a = 2147483646 & C, f = 0; A = (i = r << 2) + p | 0, o = t[((0 | r) == (0 | C) ? E : A) >> 2], z = t[i + g >> 2], k = H(U, +(0 | r)), i = t[((0 | (c = r + 1 | 0)) == (0 | C) ? E : p + (c << 2)) >> 2], A = t[A >> 2], T = H(U, +(0 | c)) * +(i - A | 0) + (k * +(o - z | 0) + T), r = r + 2 | 0, (0 | a) != (0 | (f = f + 2 | 0)););
                                                                    1 & C && (f = r << 2, A = t[((0 | r) == (0 | C) ? E : f + p) >> 2], f = t[f + g >> 2], T = H(U, +(0 | r)) * +(A - f | 0) + T)
                                                                }
                                                                d[e + 528 >> 3] = T / D,
                                                                ce(e, 0),
                                                                r = 10370;
                                                                break A
                                                            }
                                                            break f
                                                        }if (A = t[e + 196 >> 2], A = (f = t[e + 192 >> 2] + 1 | 0) ? A : A + 1 | 0, t[e + 192 >> 2] = f, t[e + 196 >> 2] = A, t[e + 296 >> 2]) {
                                                            if (t[u + 48 >> 2] && (t[u + 52 >> 2] = 0), l = 0, (0 | (f = t[u + 52 >> 2])) == t[u + 56 >> 2]) {
                                                                if ((A = ((0 | (A = f >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break f;
                                                                if (f = f + A | 0, t[u + 56 >> 2] = f, b = Y(t[u + 48 >> 2], f << 2), t[u + 48 >> 2] = b, !b) break f;
                                                                f = t[u + 52 >> 2]
                                                            } else b = t[u + 48 >> 2];
                                                            for (t[(f << 2) + b >> 2] = 0, t[u + 52 >> 2] = t[u + 52 >> 2] + 1, b = t[e + 284 >> 2] - 1 | 0, f = -2;;) {
                                                                if (p = t[e + 544 >> 2], 4 & (r = t[(I = p + (r << 2) | 0) >> 2]) && (k = d[e + 496 >> 3], M = y(k + +w[4 + (A = I + (r >>> 3 & 536870908) | 0) >> 2]), w[A + 4 >> 2] = M, +M > 1e20)) {
                                                                    if (!((0 | (g = t[e + 272 >> 2])) <= 0)) {
                                                                        if (c = t[e + 268 >> 2], r = 0, 1 != (0 | g))
                                                                            for (a = 2147483646 & g, o = 0; A = p + (t[(i = r << 2) + c >> 2] << 2) | 0, A = (t[A >> 2] >>> 3 & 536870908) + A | 0, w[A + 4 >> 2] = 1e-20 * +w[A + 4 >> 2], A = p + (t[c + (4 | i) >> 2] << 2) | 0, A = (t[A >> 2] >>> 3 & 536870908) + A | 0, w[A + 4 >> 2] = 1e-20 * +w[A + 4 >> 2], r = r + 2 | 0, (0 | a) != (0 | (o = o + 2 | 0)););
                                                                        1 & g && (r = p + (t[c + (r << 2) >> 2] << 2) | 0, r = (t[r >> 2] >>> 3 & 536870908) + r | 0, w[r + 4 >> 2] = 1e-20 * +w[r + 4 >> 2])
                                                                    }
                                                                    d[e + 496 >> 3] = 1e-20 * k, r = t[I >> 2]
                                                                }
                                                                a: if (!((j = -2 != (0 | f)) >>> 0 >= r >>> 5 >>> 0)) {
                                                                    for (;;) {
                                                                        n: {
                                                                            if (p = (g = (C = t[4 + (I + (j << 2) | 0) >> 2]) >> 1) + t[e + 588 >> 2] | 0, !(v[0 | p] || t[4 + ((S = g << 3) + t[e + 396 >> 2] | 0) >> 2] <= 0)) {
                                                                                if (r = (m = t[e + 316 >> 2]) + S | 0, k = d[e + 504 >> 3] + d[r >> 3], d[r >> 3] = k, k > 1e100) {
                                                                                    if (!((0 | (c = t[e + 540 >> 2])) <= 0)) {
                                                                                        if (o = 0, f = 0, c >>> 0 >= 4)
                                                                                            for (i = 2147483644 & c, A = 0; d[(r = (a = f << 3) + m | 0) >> 3] = 1e-100 * d[r >> 3], d[(r = m + (8 | a) | 0) >> 3] = 1e-100 * d[r >> 3], d[(r = m + (16 | a) | 0) >> 3] = 1e-100 * d[r >> 3], d[(r = m + (24 | a) | 0) >> 3] = 1e-100 * d[r >> 3], f = f + 4 | 0, (0 | i) != (0 | (A = A + 4 | 0)););
                                                                                        if (A = 3 & c)
                                                                                            for (; d[(r = m + (f << 3) | 0) >> 3] = 1e-100 * d[r >> 3], f = f + 1 | 0, (0 | A) != (0 | (o = o + 1 | 0)););
                                                                                    }
                                                                                    d[e + 504 >> 3] = 1e-100 * d[e + 504 >> 3]
                                                                                }
                                                                                if (!((0 | g) >= t[e + 476 >> 2] || (m = t[e + 472 >> 2], (0 | (f = t[m + (g << 2) >> 2])) < 0))) {
                                                                                    r = t[e + 460 >> 2], W = t[r + (f << 2) >> 2];
                                                                                    b: if (f)
                                                                                        for (g = t[t[e + 488 >> 2] >> 2], k = d[g + (W << 3) >> 3];;) {
                                                                                            if (i = (f << 2) + r | 0, o = t[(a = ((A = (c = f - 1 | 0) >> 1) << 2) + r | 0) >> 2], !(k > d[g + (o << 3) >> 3])) {
                                                                                                r = i;
                                                                                                break b
                                                                                            }
                                                                                            if (t[i >> 2] = o, t[m + (t[a >> 2] << 2) >> 2] = f, f = A, !(c >>> 0 > 1)) break
                                                                                        } else f = 0;
                                                                                    t[r >> 2] = W, t[m + (W << 2) >> 2] = f
                                                                                }
                                                                                if (n[0 | p] = 1, t[4 + (S + t[e + 396 >> 2] | 0) >> 2] >= t[e + 296 >> 2]) l = l + 1 | 0;
                                                                                else {
                                                                                    if ((0 | (f = t[u + 52 >> 2])) == t[u + 56 >> 2]) {
                                                                                        if ((r = ((0 | (r = f >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break n;
                                                                                        if (r = r + f | 0, t[u + 56 >> 2] = r, r = Y(t[u + 48 >> 2], r << 2), t[u + 48 >> 2] = r, !r) break n;
                                                                                        f = t[u + 52 >> 2]
                                                                                    } else r = t[u + 48 >> 2];
                                                                                    t[u + 52 >> 2] = f + 1, t[(f << 2) + r >> 2] = C
                                                                                }
                                                                            }
                                                                            if ((j = j + 1 | 0) >>> 0 < t[I >> 2] >>> 5 >>> 0) continue;
                                                                            break a
                                                                        }
                                                                        break
                                                                    }
                                                                    break f
                                                                }
                                                                for (o = t[e + 588 >> 2], i = t[e + 280 >> 2]; r = b << 2, b = b - 1 | 0, f = t[r + i >> 2], !v[0 | (A = (r = f >> 1) + o | 0)];);
                                                                if (r = t[t[e + 396 >> 2] + (r << 3) >> 2], n[0 | A] = 0, A = (0 | l) > 1, l = l - 1 | 0, !A) break
                                                            }
                                                            if (t[t[u + 48 >> 2] >> 2] = 1 ^ f, t[e + 616 >> 2] && (t[e + 620 >> 2] = 0), ue(e + 616 | 0, t[u + 52 >> 2]), (0 | (r = t[u + 52 >> 2])) > 0)
                                                                for (i = t[e + 616 >> 2], A = t[u + 48 >> 2], f = 0; t[(r = f << 2) + i >> 2] = t[r + A >> 2], (0 | (r = t[u + 52 >> 2])) > (0 | (f = f + 1 | 0)););
                                                            A = r, o = r;
                                                            a: {
                                                                n: switch (t[e + 84 >> 2] - 1 | 0) {
                                                                    case 0:
                                                                        if (A = 1, o = 1, (0 | r) < 2) break a;
                                                                        for (p = t[e + 588 >> 2], g = t[e + 544 >> 2], m = t[e + 396 >> 2], C = t[u + 48 >> 2];;) {
                                                                            b: {
                                                                                t: if (c = t[C + (o << 2) >> 2], -1 != (0 | (r = t[m + (c << 2 & -8) >> 2]))) {
                                                                                    if ((r = t[(a = g + (r << 2) | 0) >> 2]) >>> 0 < 64) break b;
                                                                                    for (i = r >>> 5 | 0, f = 1;;) {
                                                                                        if (r = t[4 + (a + (f << 2) | 0) >> 2] >> 1, !v[r + p | 0] & t[4 + (m + (r << 3) | 0) >> 2] > 0) break t;
                                                                                        if ((0 | i) == (0 | (f = f + 1 | 0))) break
                                                                                    }
                                                                                    break b
                                                                                }t[C + (A << 2) >> 2] = c,
                                                                                A = A + 1 | 0
                                                                            }
                                                                            if (!((0 | (r = t[u + 52 >> 2])) > (0 | (o = o + 1 | 0)))) break
                                                                        }
                                                                        break a;
                                                                    case 1:
                                                                        break n;
                                                                    default:
                                                                        break a
                                                                }
                                                                if (o = 1, (0 | r) < 2) A = 1;
                                                                else
                                                                    for (A = 1;;) {
                                                                        l = t[e + 396 >> 2], r = t[u + 48 >> 2], f = t[r + (C = o << 2) >> 2];
                                                                        n: {
                                                                            if (-1 != t[l + (f << 2 & -8) >> 2]) {
                                                                                i = t[((r = f) << 2 & -8) + l >> 2] << 2, f = t[e + 544 >> 2], t[e + 604 >> 2] && (t[e + 608 >> 2] = 0), a = f + i | 0, b = 1;
                                                                                b: {
                                                                                    for (;;) {
                                                                                        t: {
                                                                                            o: {
                                                                                                if (!(f = t[a >> 2] >>> 5 >>> 0 <= b >>> 0)) {
                                                                                                    if (i = t[4 + ((b << 2) + a | 0) >> 2], !t[4 + (g = (p = (c = i >> 1) << 3) + l | 0) >> 2]) break o;
                                                                                                    if (((c = v[c + t[e + 588 >> 2] | 0]) - 1 & 255) >>> 0 < 2) break o;
                                                                                                    if (m = t[e + 612 >> 2], a = t[e + 608 >> 2], !(3 != (0 | c) & -1 != t[g >> 2])) {
                                                                                                        if ((0 | a) == (0 | m)) {
                                                                                                            if ((i = ((0 | (i = a >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break t;
                                                                                                            if (i = i + a | 0, t[e + 612 >> 2] = i, b = Y(t[e + 604 >> 2], i << 3), t[e + 604 >> 2] = b, !b) break t;
                                                                                                            a = t[e + 608 >> 2]
                                                                                                        } else b = t[e + 604 >> 2];
                                                                                                        if (t[e + 608 >> 2] = a + 1, t[(i = (a << 3) + b | 0) >> 2] = 0, t[i + 4 >> 2] = r, (0 | (a = t[e + 608 >> 2])) <= 0) break b;
                                                                                                        for (b = 0;;) {
                                                                                                            if (c = b << 3, r = t[e + 588 >> 2] + (t[4 + (c + t[e + 604 >> 2] | 0) >> 2] >> 1) | 0, !v[0 | r]) {
                                                                                                                if (n[0 | r] = 3, i = t[e + 604 >> 2], (0 | (a = t[e + 620 >> 2])) == t[e + 624 >> 2]) {
                                                                                                                    if ((r = ((0 | (r = a >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                                                                                    if (r = r + a | 0, t[e + 624 >> 2] = r, r = Y(t[e + 616 >> 2], r << 2), t[e + 616 >> 2] = r, !r) break f;
                                                                                                                    a = t[e + 620 >> 2]
                                                                                                                } else r = t[e + 616 >> 2];
                                                                                                                t[e + 620 >> 2] = a + 1, t[(a << 2) + r >> 2] = t[4 + (i + c | 0) >> 2], a = t[e + 608 >> 2]
                                                                                                            }
                                                                                                            if (!((0 | (b = b + 1 | 0)) < (0 | a))) break
                                                                                                        }
                                                                                                        break b
                                                                                                    }
                                                                                                    if ((0 | a) == (0 | m)) {
                                                                                                        if ((f = ((0 | (f = a >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                                                                        if (f = f + a | 0, t[e + 612 >> 2] = f, l = Y(t[e + 604 >> 2], f << 3), t[e + 604 >> 2] = l, !l) break f;
                                                                                                        a = t[e + 608 >> 2]
                                                                                                    } else l = t[e + 604 >> 2];
                                                                                                    t[e + 608 >> 2] = a + 1, t[(a = (a << 3) + l | 0) >> 2] = b, t[a + 4 >> 2] = r, l = t[e + 396 >> 2], a = t[e + 544 >> 2] + (t[p + l >> 2] << 2) | 0, r = i, b = 1;
                                                                                                    continue
                                                                                                }
                                                                                                if (i = t[e + 588 >> 2] + (r >> 1) | 0, !v[0 | i]) {
                                                                                                    if (n[0 | i] = 2, (0 | (b = t[e + 620 >> 2])) == t[e + 624 >> 2]) {
                                                                                                        if ((i = ((0 | (i = b >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ b) >>> 0) break f;
                                                                                                        if (i = i + b | 0, t[e + 624 >> 2] = i, a = Y(t[e + 616 >> 2], i << 2), t[e + 616 >> 2] = a, !a) break f;
                                                                                                        b = t[e + 620 >> 2]
                                                                                                    } else a = t[e + 616 >> 2];
                                                                                                    t[e + 620 >> 2] = b + 1, t[(b << 2) + a >> 2] = r
                                                                                                }
                                                                                                if (!(i = t[e + 608 >> 2])) break b;r = (t[e + 604 >> 2] + (i << 3) | 0) - 8 | 0,
                                                                                                b = t[r >> 2],
                                                                                                l = t[e + 396 >> 2],
                                                                                                r = t[r + 4 >> 2],
                                                                                                f = t[l + (r << 2 & -8) >> 2],
                                                                                                t[e + 608 >> 2] = i - 1,
                                                                                                a = t[e + 544 >> 2] + (f << 2) | 0
                                                                                            }
                                                                                            b = b + 1 | 0;
                                                                                            continue
                                                                                        }
                                                                                        break
                                                                                    }
                                                                                    break f
                                                                                }
                                                                                if (r = f) break n;
                                                                                r = t[u + 48 >> 2], f = t[C + r >> 2]
                                                                            }
                                                                            t[(A << 2) + r >> 2] = f,
                                                                            A = A + 1 | 0
                                                                        }
                                                                        if (!((0 | (r = t[u + 52 >> 2])) > (0 | (o = o + 1 | 0)))) break
                                                                    }
                                                            }
                                                            if (c = (i = r >> 31) + t[e + 244 >> 2] | 0, a = (f = t[e + 240 >> 2]) + r | 0, t[e + 240 >> 2] = a, t[e + 244 >> 2] = f >>> 0 > a >>> 0 ? c + 1 | 0 : c, (0 | (f = o - A | 0)) > 0 && (r = r - f | 0, t[u + 52 >> 2] = r, i = r >> 31), o = (A = t[e + 248 >> 2]) + r | 0, f = t[e + 252 >> 2] + i | 0, t[e + 248 >> 2] = o, t[e + 252 >> 2] = A >>> 0 > o >>> 0 ? f + 1 | 0 : f, f = 0, 1 != (0 | r)) {
                                                                if (a = t[u + 48 >> 2], A = 1, (0 | r) >= 3)
                                                                    for (o = t[e + 396 >> 2], b = 2; A = t[4 + (o + (t[a + (b << 2) >> 2] << 2 & -8) | 0) >> 2] > t[4 + (o + (t[a + (A << 2) >> 2] << 2 & -8) | 0) >> 2] ? b : A, (0 | (b = b + 1 | 0)) != (0 | r););
                                                                A = t[(r = a + (A << 2) | 0) >> 2], t[r >> 2] = t[a + 4 >> 2], t[a + 4 >> 2] = A, r = t[4 + (t[e + 396 >> 2] + (A << 2 & -8) | 0) >> 2]
                                                            } else r = 0;
                                                            if (t[u + 60 >> 2] = r, t[e + 620 >> 2] > 0)
                                                                for (; n[t[e + 588 >> 2] + (t[t[e + 616 >> 2] + (f << 2) >> 2] >> 1) | 0] = 0, (0 | (f = f + 1 | 0)) < t[e + 620 >> 2];);
                                                            if (ce(e, t[u + 60 >> 2]), 1 != t[u + 52 >> 2]) {
                                                                if (g = ne(Q, u + 48 | 0, 1), (0 | (r = t[e + 272 >> 2])) == t[e + 276 >> 2]) {
                                                                    if ((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break f;
                                                                    if (r = r + f | 0, t[e + 276 >> 2] = r, A = Y(t[e + 268 >> 2], r << 2), t[e + 268 >> 2] = A, !A) break f;
                                                                    r = t[e + 272 >> 2]
                                                                } else A = t[e + 268 >> 2];
                                                                if (t[e + 272 >> 2] = r + 1, t[(r << 2) + A >> 2] = g, Ae(e, g), k = d[e + 496 >> 3], c = t[e + 544 >> 2], r = (t[(r = c + (g << 2) | 0) >> 2] >>> 3 & 536870908) + r | 0, M = y(k + +w[r + 4 >> 2]), w[r + 4 >> 2] = M, +M > 1e20) {
                                                                    if (!((0 | (a = t[e + 272 >> 2])) <= 0)) {
                                                                        if (o = t[e + 268 >> 2], r = 0, 1 != (0 | a))
                                                                            for (i = 2147483646 & a, b = 0; f = c + (t[(A = r << 2) + o >> 2] << 2) | 0, f = (t[f >> 2] >>> 3 & 536870908) + f | 0, w[f + 4 >> 2] = 1e-20 * +w[f + 4 >> 2], f = c + (t[o + (4 | A) >> 2] << 2) | 0, f = (t[f >> 2] >>> 3 & 536870908) + f | 0, w[f + 4 >> 2] = 1e-20 * +w[f + 4 >> 2], r = r + 2 | 0, (0 | i) != (0 | (b = b + 2 | 0)););
                                                                        1 & a && (r = c + (t[o + (r << 2) >> 2] << 2) | 0, r = (t[r >> 2] >>> 3 & 536870908) + r | 0, w[r + 4 >> 2] = 1e-20 * +w[r + 4 >> 2])
                                                                    }
                                                                    d[e + 496 >> 3] = 1e-20 * k
                                                                }
                                                                r = t[t[u + 48 >> 2] >> 2], n[(A = r >> 1) + t[e + 332 >> 2] | 0] = 1 & r, f = t[e + 296 >> 2], A = t[e + 396 >> 2] + (A << 3) | 0, t[A >> 2] = g, t[A + 4 >> 2] = f
                                                            } else r = t[t[u + 48 >> 2] >> 2], n[(A = r >> 1) + t[e + 332 >> 2] | 0] = 1 & r, f = t[e + 296 >> 2], A = t[e + 396 >> 2] + (A << 3) | 0, t[A >> 2] = -1, t[A + 4 >> 2] = f;
                                                            if (f = t[e + 284 >> 2], t[e + 284 >> 2] = f + 1, t[t[e + 280 >> 2] + (f << 2) >> 2] = r, F = F + 1 | 0, r = t[e + 656 >> 2] - 1 | 0, t[e + 656 >> 2] = r, d[e + 504 >> 3] = d[e + 504 >> 3] * (1 / d[e + 48 >> 3]), d[e + 496 >> 3] = d[e + 496 >> 3] * (1 / d[e + 56 >> 3]), r) continue;
                                                            if (k = d[e + 144 >> 3] * d[e + 648 >> 3], d[e + 648 >> 3] = k, D = d[e + 128 >> 3] * d[e + 640 >> 3], d[e + 640 >> 3] = D, r = h(k) < 2147483648 ? ~~k : -2147483648, t[e + 656 >> 2] = r, t[e + 44 >> 2] <= 0) continue;
                                                            if (l = t[e + 292 >> 2], b = t[e + 296 >> 2], c = t[(b ? l : E) >> 2], a = t[e + 200 >> 2], o = t[e + 540 >> 2], k = +(0 | (W = t[e + 216 >> 2])), r = t[e + 232 >> 2], i = t[e + 236 >> 2], f = (0 | b) < 0, A = h(D) < 2147483648 ? ~~D : -2147483648, U = +(0 | o), S = a - c | 0, D = (+(r >>> 0) + 4294967296 * +(i >>> 0)) / k, m = t[e + 224 >> 2], C = t[e + 208 >> 2], p = t[e + 192 >> 2], f) T = 0;
                                                            else if (T = +(0 | c), b) {
                                                                if (N = 1 / U, j = l - 4 | 0, r = 1, 1 != (0 | b))
                                                                    for (g = 2147483646 & b, f = 0; i = (o = r << 2) + l | 0, c = t[((0 | r) == (0 | b) ? E : i) >> 2], a = t[o + j >> 2], k = H(N, +(0 | r)), o = t[((0 | b) == (0 | (I = r + 1 | 0)) ? E : l + (I << 2)) >> 2], i = t[i >> 2], T = H(N, +(0 | I)) * +(o - i | 0) + (k * +(c - a | 0) + T), r = r + 2 | 0, (0 | g) != (0 | (f = f + 2 | 0)););
                                                                1 & b && (f = r << 2, i = t[((0 | r) == (0 | b) ? E : f + l) >> 2], f = t[f + j >> 2], T = H(N, +(0 | r)) * +(i - f | 0) + T)
                                                            }
                                                            d[u + 24 >> 3] = D, t[u + 20 >> 2] = W, t[u + 16 >> 2] = A, d[u + 32 >> 3] = T / U * 100, t[u + 12 >> 2] = m, t[u + 8 >> 2] = C, t[u + 4 >> 2] = S, t[u >> 2] = p, G = r = G - 16 | 0, t[r + 12 >> 2] = u, ge(10208, 2215, u, 22), G = r + 16 | 0;
                                                            continue
                                                        }
                                                    }
                                                    break
                                                }
                                                r = 10369
                                            }
                                            A = v[0 | r],
                                            (r = t[u + 48 >> 2]) && (t[u + 52 >> 2] = 0, V(r)),
                                            G = u - -64 | 0;
                                            break r
                                        }
                                        B(0 | Ar(), 1060, 0),
                                        s()
                                    }
                                    if (v[e + 680 | 0]) break e;
                                    if (r = t[e + 664 >> 2], z = f = t[e + 668 >> 2], (0 | f) > 0 | (0 | f) >= 0 && (0 | z) == (0 | (f = t[e + 196 >> 2])) & r >>> 0 <= P[e + 192 >> 2] | f >>> 0 > z >>> 0) break e;
                                    if (r = t[e + 672 >> 2], z = f = t[e + 676 >> 2], (0 | f) > 0 | (0 | f) >= 0 && (0 | z) == (0 | (f = t[e + 188 >> 2])) & r >>> 0 <= P[e + 184 >> 2] | f >>> 0 > z >>> 0) break e;
                                    if (Z = Z + 1 | 0, !((0 | (r = v[10370])) == (255 & A) & (254 & ~r) >>> 1 | r & A & 2)) break
                                }
                            t[e + 44 >> 2] > 0 && xe(1964);
                            e: if ((z = (0 | (f = 255 & A)) == (0 | (r = v[10368])) & (254 & ~r) >>> 1) | (i = r) & (r = 2 & A)) {
                                if (ze(e + 4 | 0, t[e + 540 >> 2]), t[e + 540 >> 2] <= 0) break e;
                                for (r = 0; n[t[e + 4 >> 2] + r | 0] = v[t[e + 332 >> 2] + r | 0], (0 | (r = r + 1 | 0)) < t[e + 540 >> 2];);
                            } else i = f, f = v[10369], t[e + 36 >> 2] | !((0 | i) == (0 | f) & (254 & ~f) >>> 1 | r & f) || (n[e + 492 | 0] = 0);
                            return ce(e, 0), A
                        }

                        function U(e) {
                            var r, f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = 0;
                            G = r = G - 16 | 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: {
                                                a: {
                                                    n: {
                                                        b: {
                                                            t: {
                                                                if ((e |= 0) >>> 0 <= 244) {
                                                                    if (3 & (f = (b = t[3034]) >>> (A = (o = e >>> 0 < 11 ? 16 : e + 11 & 504) >>> 3 | 0) | 0)) {
                                                                        f = 12176 + (e = (A = A + (1 & ~f) | 0) << 3) | 0, i = t[e + 12184 >> 2], (0 | f) != (0 | (e = t[i + 8 >> 2])) ? (t[e + 12 >> 2] = f, t[f + 8 >> 2] = e) : (s = 12136, l = er(A) & b, t[s >> 2] = l), e = i + 8 | 0, f = A << 3, t[i + 4 >> 2] = 3 | f, t[4 + (f = f + i | 0) >> 2] = 1 | t[f + 4 >> 2];
                                                                        break e
                                                                    }
                                                                    if ((c = t[3036]) >>> 0 >= o >>> 0) break t;
                                                                    if (f) {
                                                                        f = 12176 + (e = (i = rr((0 - (e = 2 << A) | e) & f << A)) << 3) | 0, a = t[e + 12184 >> 2], (0 | f) != (0 | (e = t[a + 8 >> 2])) ? (t[e + 12 >> 2] = f, t[f + 8 >> 2] = e) : (b = er(i) & b, t[3034] = b), t[a + 4 >> 2] = 3 | o, i = (e = i << 3) - o | 0, t[4 + (A = a + o | 0) >> 2] = 1 | i, t[e + a >> 2] = i, c && (f = 12176 + (-8 & c) | 0, n = t[3039], (e = 1 << (c >>> 3)) & b ? e = t[f + 8 >> 2] : (t[3034] = e | b, e = f), t[f + 8 >> 2] = n, t[e + 12 >> 2] = n, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e), e = a + 8 | 0, t[3039] = A, t[3036] = i;
                                                                        break e
                                                                    }
                                                                    if (!(u = t[3035])) break t;
                                                                    for (A = t[12440 + (rr(u) << 2) >> 2], a = (-8 & t[A + 4 >> 2]) - o | 0, f = A;
                                                                        (e = t[f + 16 >> 2]) || (e = t[f + 20 >> 2]);) a = (i = (f = (-8 & t[e + 4 >> 2]) - o | 0) >>> 0 < a >>> 0) ? f : a, A = i ? e : A, f = e;
                                                                    if (k = t[A + 24 >> 2], (0 | (i = t[A + 12 >> 2])) != (0 | A)) {
                                                                        e = t[A + 8 >> 2], t[e + 12 >> 2] = i, t[i + 8 >> 2] = e;
                                                                        break r
                                                                    }
                                                                    if (!(e = t[(f = A + 20 | 0) >> 2])) {
                                                                        if (!(e = t[A + 16 >> 2])) break b;
                                                                        f = A + 16 | 0
                                                                    }
                                                                    for (; n = f, i = e, (e = t[(f = e + 20 | 0) >> 2]) || (f = i + 16 | 0, e = t[i + 16 >> 2]););
                                                                    t[n >> 2] = 0;
                                                                    break r
                                                                }
                                                                if (o = -1, !(e >>> 0 > 4294967231) && (o = -8 & (e = e + 11 | 0), u = t[3035])) {
                                                                    a = 0 - o | 0, b = 0, o >>> 0 < 256 || (b = 31, o >>> 0 > 16777215 || (b = 62 + ((o >>> 38 - (e = m(e >>> 8 | 0)) & 1) - (e << 1) | 0) | 0));
                                                                    o: {
                                                                        k: {
                                                                            if (f = t[12440 + (b << 2) >> 2])
                                                                                for (e = 0, A = o << (31 != (0 | b) ? 25 - (b >>> 1 | 0) : 0);;) {
                                                                                    if (!((n = (-8 & t[f + 4 >> 2]) - o | 0) >>> 0 >= a >>> 0 || (i = f, a = n))) {
                                                                                        a = 0, e = f;
                                                                                        break k
                                                                                    }
                                                                                    if (n = t[f + 20 >> 2], f = t[16 + ((A >>> 29 & 4) + f | 0) >> 2], e = n ? (0 | n) == (0 | f) ? e : n : e, A <<= 1, !f) break
                                                                                } else e = 0;
                                                                            if (!(e | i)) {
                                                                                if (i = 0, !(e = (0 - (e = 2 << b) | e) & u)) break t;
                                                                                e = t[12440 + (rr(e) << 2) >> 2]
                                                                            }
                                                                            if (!e) break o
                                                                        }
                                                                        for (; a = (A = (f = (-8 & t[e + 4 >> 2]) - o | 0) >>> 0 < a >>> 0) ? f : a, i = A ? e : i, e = (f = t[e + 16 >> 2]) || t[e + 20 >> 2];);
                                                                    }
                                                                    if (!(!i | t[3036] - o >>> 0 <= a >>> 0)) {
                                                                        if (b = t[i + 24 >> 2], (0 | i) != (0 | (A = t[i + 12 >> 2]))) {
                                                                            e = t[i + 8 >> 2], t[e + 12 >> 2] = A, t[A + 8 >> 2] = e;
                                                                            break f
                                                                        }
                                                                        if (!(e = t[(f = i + 20 | 0) >> 2])) {
                                                                            if (!(e = t[i + 16 >> 2])) break n;
                                                                            f = i + 16 | 0
                                                                        }
                                                                        for (; n = f, A = e, (e = t[(f = e + 20 | 0) >> 2]) || (f = A + 16 | 0, e = t[A + 16 >> 2]););
                                                                        t[n >> 2] = 0;
                                                                        break f
                                                                    }
                                                                }
                                                            }
                                                            if ((e = t[3036]) >>> 0 >= o >>> 0) {
                                                                i = t[3039], (f = e - o | 0) >>> 0 >= 16 ? (t[4 + (A = i + o | 0) >> 2] = 1 | f, t[e + i >> 2] = f, t[i + 4 >> 2] = 3 | o) : (t[i + 4 >> 2] = 3 | e, t[4 + (e = e + i | 0) >> 2] = 1 | t[e + 4 >> 2], A = 0, f = 0), t[3036] = f, t[3039] = A, e = i + 8 | 0;
                                                                break e
                                                            }
                                                            if ((k = t[3037]) >>> 0 > o >>> 0) {
                                                                f = k - o | 0, t[3037] = f, e = (A = t[3040]) + o | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[A + 4 >> 2] = 3 | o, e = A + 8 | 0;
                                                                break e
                                                            }
                                                            if (e = 0, a = o + 47 | 0, t[3152] ? A = t[3154] : (t[3155] = -1, t[3156] = -1, t[3153] = 4096, t[3154] = 4096, t[3152] = r + 12 & -16 ^ 1431655768, t[3157] = 0, t[3145] = 0, A = 4096), (f = (b = a + A | 0) & (n = 0 - A | 0)) >>> 0 <= o >>> 0) break e;
                                                            if ((i = t[3144]) && i >>> 0 < (u = (A = t[3142]) + f | 0) >>> 0 | A >>> 0 >= u >>> 0) break e;t: {
                                                                if (!(4 & v[12580])) {
                                                                    o: {
                                                                        k: {
                                                                            u: {
                                                                                c: {
                                                                                    if (i = t[3040])
                                                                                        for (e = 12584;;) {
                                                                                            if ((A = t[e >> 2]) >>> 0 <= i >>> 0 & i >>> 0 < A + t[e + 4 >> 2] >>> 0) break c;
                                                                                            if (!(e = t[e + 8 >> 2])) break
                                                                                        }
                                                                                    if (-1 == (0 | (A = Je(0)))) break o;
                                                                                    if (b = f, (e = (i = t[3153]) - 1 | 0) & A && (b = (f - A | 0) + (e + A & 0 - i) | 0), b >>> 0 <= o >>> 0) break o;
                                                                                    if ((i = t[3144]) && i >>> 0 < (n = (e = t[3142]) + b | 0) >>> 0 | e >>> 0 >= n >>> 0) break o;
                                                                                    if ((0 | A) != (0 | (e = Je(b)))) break u;
                                                                                    break t
                                                                                }
                                                                                if ((0 | (A = Je(b = n & b - k))) == (t[e >> 2] + t[e + 4 >> 2] | 0)) break k;e = A
                                                                            }
                                                                            if (-1 == (0 | e)) break o;
                                                                            if (o + 48 >>> 0 <= b >>> 0) {
                                                                                A = e;
                                                                                break t
                                                                            }
                                                                            if (-1 == (0 | Je(A = (A = t[3154]) + (a - b | 0) & 0 - A))) break o;b = A + b | 0,
                                                                            A = e;
                                                                            break t
                                                                        }
                                                                        if (-1 != (0 | A)) break t
                                                                    }
                                                                    t[3145] = 4 | t[3145]
                                                                }
                                                                if (-1 == (0 | (A = Je(f))) | -1 == (0 | (e = Je(0))) | e >>> 0 <= A >>> 0) break A;
                                                                if ((b = e - A | 0) >>> 0 <= o + 40 >>> 0) break A
                                                            }
                                                            e = t[3142] + b | 0,
                                                            t[3142] = e,
                                                            e >>> 0 > P[3143] && (t[3143] = e);t: {
                                                                if (a = t[3040]) {
                                                                    for (e = 12584;;) {
                                                                        if (((i = t[e >> 2]) + (f = t[e + 4 >> 2]) | 0) == (0 | A)) break t;
                                                                        if (!(e = t[e + 8 >> 2])) break
                                                                    }
                                                                    break a
                                                                }
                                                                for ((e = t[3038]) >>> 0 <= A >>> 0 && e || (t[3038] = A), e = 0, t[3147] = b, t[3146] = A, t[3042] = -1, t[3043] = t[3152], t[3149] = 0; f = 12176 + (i = e << 3) | 0, t[i + 12184 >> 2] = f, t[i + 12188 >> 2] = f, 32 != (0 | (e = e + 1 | 0)););f = (i = b - 40 | 0) - (e = -8 - A & 7) | 0,
                                                                t[3037] = f,
                                                                e = e + A | 0,
                                                                t[3040] = e,
                                                                t[e + 4 >> 2] = 1 | f,
                                                                t[4 + (A + i | 0) >> 2] = 40,
                                                                t[3041] = t[3156];
                                                                break i
                                                            }
                                                            if (8 & t[e + 12 >> 2] | A >>> 0 <= a >>> 0 | i >>> 0 > a >>> 0) break a;t[e + 4 >> 2] = f + b,
                                                            A = (e = -8 - a & 7) + a | 0,
                                                            t[3040] = A,
                                                            e = (f = t[3037] + b | 0) - e | 0,
                                                            t[3037] = e,
                                                            t[A + 4 >> 2] = 1 | e,
                                                            t[4 + (f + a | 0) >> 2] = 40,
                                                            t[3041] = t[3156];
                                                            break i
                                                        }
                                                        i = 0;
                                                        break r
                                                    }
                                                    A = 0;
                                                    break f
                                                }
                                                P[3038] > A >>> 0 && (t[3038] = A),
                                                f = A + b | 0,
                                                e = 12584;a: {
                                                    n: {
                                                        b: {
                                                            for (;;) {
                                                                if ((0 | f) != t[e >> 2]) {
                                                                    if (e = t[e + 8 >> 2]) continue;
                                                                    break b
                                                                }
                                                                break
                                                            }
                                                            if (!(8 & v[e + 12 | 0])) break n
                                                        }
                                                        for (e = 12584; !((f = t[e >> 2]) >>> 0 <= a >>> 0 && (n = f + t[e + 4 >> 2] | 0) >>> 0 > a >>> 0);) e = t[e + 8 >> 2];
                                                        for (f = (i = b - 40 | 0) - (e = -8 - A & 7) | 0, t[3037] = f, e = e + A | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[4 + (A + i | 0) >> 2] = 40, t[3041] = t[3156], t[(i = (e = (n + (39 - n & 7) | 0) - 47 | 0) >>> 0 < a + 16 >>> 0 ? a : e) + 4 >> 2] = 27, e = t[3149], t[i + 16 >> 2] = t[3148], t[i + 20 >> 2] = e, e = t[3147], t[i + 8 >> 2] = t[3146], t[i + 12 >> 2] = e, t[3148] = i + 8, t[3147] = b, t[3146] = A, t[3149] = 0, e = i + 24 | 0; t[e + 4 >> 2] = 7, f = e + 8 | 0, e = e + 4 | 0, f >>> 0 < n >>> 0;);
                                                        if ((0 | i) == (0 | a)) break i;
                                                        if (t[i + 4 >> 2] = -2 & t[i + 4 >> 2], n = i - a | 0, t[a + 4 >> 2] = 1 | n, t[i >> 2] = n, n >>> 0 <= 255) {
                                                            f = 12176 + (-8 & n) | 0, (A = t[3034]) & (e = 1 << (n >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f), t[f + 8 >> 2] = a, t[e + 12 >> 2] = a, t[a + 12 >> 2] = f, t[a + 8 >> 2] = e;
                                                            break i
                                                        }
                                                        if (e = 31, n >>> 0 <= 16777215 && (e = 62 + ((n >>> 38 - (e = m(n >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[a + 28 >> 2] = e, t[a + 16 >> 2] = 0, t[a + 20 >> 2] = 0, f = 12440 + (e << 2) | 0, (i = t[3035]) & (A = 1 << e)) {
                                                            for (e = n << (31 != (0 | e) ? 25 - (e >>> 1 | 0) : 0), i = t[f >> 2];;) {
                                                                if ((0 | n) == (-8 & t[(f = i) + 4 >> 2])) break a;
                                                                if (A = e >>> 29 | 0, e <<= 1, !(i = t[16 + (A = (4 & A) + f | 0) >> 2])) break
                                                            }
                                                            t[A + 16 >> 2] = a
                                                        } else t[3035] = A | i,
                                                        t[f >> 2] = a;t[a + 24 >> 2] = f,
                                                        t[a + 12 >> 2] = a,
                                                        t[a + 8 >> 2] = a;
                                                        break i
                                                    }
                                                    t[e >> 2] = A,
                                                    t[e + 4 >> 2] = t[e + 4 >> 2] + b,
                                                    t[4 + (u = (-8 - A & 7) + A | 0) >> 2] = 3 | o,
                                                    b = (a = f + (-8 - f & 7) | 0) - (k = o + u | 0) | 0;n: if (t[3040] != (0 | a))
                                                        if (t[3039] != (0 | a)) {
                                                            if (1 == (3 & (A = t[a + 4 >> 2]))) {
                                                                n = -8 & A;
                                                                b: if (A >>> 0 <= 255) {
                                                                    if ((0 | (f = t[a + 12 >> 2])) == (0 | (e = t[a + 8 >> 2]))) {
                                                                        s = 12136, l = t[3034] & er(A >>> 3 | 0), t[s >> 2] = l;
                                                                        break b
                                                                    }
                                                                    t[e + 12 >> 2] = f, t[f + 8 >> 2] = e
                                                                } else {
                                                                    o = t[a + 24 >> 2];
                                                                    t: if ((0 | a) == (0 | (e = t[a + 12 >> 2]))) {
                                                                        o: {
                                                                            if (!(A = t[(f = a + 20 | 0) >> 2])) {
                                                                                if (!(A = t[a + 16 >> 2])) break o;
                                                                                f = a + 16 | 0
                                                                            }
                                                                            for (; i = f, (A = t[(f = (e = A) + 20 | 0) >> 2]) || (f = e + 16 | 0, A = t[e + 16 >> 2]););t[i >> 2] = 0;
                                                                            break t
                                                                        }
                                                                        e = 0
                                                                    }
                                                                    else f = t[a + 8 >> 2], t[f + 12 >> 2] = e, t[e + 8 >> 2] = f;
                                                                    if (o) {
                                                                        A = t[a + 28 >> 2];
                                                                        t: {
                                                                            if (t[(f = 12440 + (A << 2) | 0) >> 2] == (0 | a)) {
                                                                                if (t[f >> 2] = e, e) break t;
                                                                                s = 12140, l = t[3035] & er(A), t[s >> 2] = l;
                                                                                break b
                                                                            }
                                                                            if (t[o + (t[o + 16 >> 2] == (0 | a) ? 16 : 20) >> 2] = e, !e) break b
                                                                        }
                                                                        t[e + 24 >> 2] = o, (f = t[a + 16 >> 2]) && (t[e + 16 >> 2] = f, t[f + 24 >> 2] = e), (f = t[a + 20 >> 2]) && (t[e + 20 >> 2] = f, t[f + 24 >> 2] = e)
                                                                    }
                                                                } b = n + b | 0, A = t[4 + (a = a + n | 0) >> 2]
                                                            }
                                                            if (t[a + 4 >> 2] = -2 & A, t[k + 4 >> 2] = 1 | b, t[b + k >> 2] = b, b >>> 0 <= 255) f = 12176 + (-8 & b) | 0, (A = t[3034]) & (e = 1 << (b >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f), t[f + 8 >> 2] = k, t[e + 12 >> 2] = k, t[k + 12 >> 2] = f, t[k + 8 >> 2] = e;
                                                            else {
                                                                A = 31, b >>> 0 <= 16777215 && (A = 62 + ((b >>> 38 - (e = m(b >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[k + 28 >> 2] = A, t[k + 16 >> 2] = 0, t[k + 20 >> 2] = 0, f = 12440 + (A << 2) | 0;
                                                                b: {
                                                                    if ((i = t[3035]) & (e = 1 << A)) {
                                                                        for (A = b << (31 != (0 | A) ? 25 - (A >>> 1 | 0) : 0), e = t[f >> 2];;) {
                                                                            if (f = e, (-8 & t[e + 4 >> 2]) == (0 | b)) break b;
                                                                            if (i = A >>> 29 | 0, A <<= 1, !(e = t[16 + (i = (4 & i) + e | 0) >> 2])) break
                                                                        }
                                                                        t[i + 16 >> 2] = k
                                                                    } else t[3035] = e | i,
                                                                    t[f >> 2] = k;t[k + 24 >> 2] = f,
                                                                    t[k + 12 >> 2] = k,
                                                                    t[k + 8 >> 2] = k;
                                                                    break n
                                                                }
                                                                e = t[f + 8 >> 2], t[e + 12 >> 2] = k, t[f + 8 >> 2] = k, t[k + 24 >> 2] = 0, t[k + 12 >> 2] = f, t[k + 8 >> 2] = e
                                                            }
                                                        } else t[3039] = k, e = t[3036] + b | 0, t[3036] = e, t[k + 4 >> 2] = 1 | e, t[e + k >> 2] = e;
                                                    else t[3040] = k,
                                                    e = t[3037] + b | 0,
                                                    t[3037] = e,
                                                    t[k + 4 >> 2] = 1 | e;e = u + 8 | 0;
                                                    break e
                                                }
                                                e = t[f + 8 >> 2],
                                                t[e + 12 >> 2] = a,
                                                t[f + 8 >> 2] = a,
                                                t[a + 24 >> 2] = 0,
                                                t[a + 12 >> 2] = f,
                                                t[a + 8 >> 2] = e
                                            }
                                            if (!((e = t[3037]) >>> 0 <= o >>> 0)) {
                                                f = e - o | 0, t[3037] = f, e = (A = t[3040]) + o | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[A + 4 >> 2] = 3 | o, e = A + 8 | 0;
                                                break e
                                            }
                                        }
                                        t[2726] = 48,
                                        e = 0;
                                        break e
                                    }
                                    f: if (b) {
                                        f = t[i + 28 >> 2];
                                        A: {
                                            if (t[(e = 12440 + (f << 2) | 0) >> 2] == (0 | i)) {
                                                if (t[e >> 2] = A, A) break A;
                                                u = er(f) & u, t[3035] = u;
                                                break f
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | i) ? 16 : 20) >> 2] = A, !A) break f
                                        }
                                        t[A + 24 >> 2] = b, (e = t[i + 16 >> 2]) && (t[A + 16 >> 2] = e, t[e + 24 >> 2] = A), (e = t[i + 20 >> 2]) && (t[A + 20 >> 2] = e, t[e + 24 >> 2] = A)
                                    }f: if (a >>> 0 <= 15) e = a + o | 0, t[i + 4 >> 2] = 3 | e, t[4 + (e = e + i | 0) >> 2] = 1 | t[e + 4 >> 2];
                                        else if (t[i + 4 >> 2] = 3 | o, t[4 + (n = i + o | 0) >> 2] = 1 | a, t[a + n >> 2] = a, a >>> 0 <= 255) f = 12176 + (-8 & a) | 0,
                                    (A = t[3034]) & (e = 1 << (a >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f),
                                    t[f + 8 >> 2] = n,
                                    t[e + 12 >> 2] = n,
                                    t[n + 12 >> 2] = f,
                                    t[n + 8 >> 2] = e;
                                    else {
                                        e = 31, a >>> 0 <= 16777215 && (e = 62 + ((a >>> 38 - (e = m(a >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[n + 28 >> 2] = e, t[n + 16 >> 2] = 0, t[n + 20 >> 2] = 0, f = 12440 + (e << 2) | 0;
                                        A: {
                                            if ((A = 1 << e) & u) {
                                                for (e = a << (31 != (0 | e) ? 25 - (e >>> 1 | 0) : 0), o = t[f >> 2];;) {
                                                    if ((-8 & t[(f = o) + 4 >> 2]) == (0 | a)) break A;
                                                    if (A = e >>> 29 | 0, e <<= 1, !(o = t[16 + (A = (4 & A) + f | 0) >> 2])) break
                                                }
                                                t[A + 16 >> 2] = n
                                            } else t[3035] = A | u,
                                            t[f >> 2] = n;t[n + 24 >> 2] = f,
                                            t[n + 12 >> 2] = n,
                                            t[n + 8 >> 2] = n;
                                            break f
                                        }
                                        e = t[f + 8 >> 2], t[e + 12 >> 2] = n, t[f + 8 >> 2] = n, t[n + 24 >> 2] = 0, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e
                                    }
                                    e = i + 8 | 0;
                                    break e
                                }
                                r: if (k) {
                                    f = t[A + 28 >> 2];
                                    f: {
                                        if (t[(e = 12440 + (f << 2) | 0) >> 2] == (0 | A)) {
                                            if (t[e >> 2] = i, i) break f;
                                            s = 12140, l = er(f) & u, t[s >> 2] = l;
                                            break r
                                        }
                                        if (t[k + (t[k + 16 >> 2] == (0 | A) ? 16 : 20) >> 2] = i, !i) break r
                                    }
                                    t[i + 24 >> 2] = k, (e = t[A + 16 >> 2]) && (t[i + 16 >> 2] = e, t[e + 24 >> 2] = i), (e = t[A + 20 >> 2]) && (t[i + 20 >> 2] = e, t[e + 24 >> 2] = i)
                                }a >>> 0 <= 15 ? (e = a + o | 0, t[A + 4 >> 2] = 3 | e, t[4 + (e = e + A | 0) >> 2] = 1 | t[e + 4 >> 2]) : (t[A + 4 >> 2] = 3 | o, t[4 + (i = A + o | 0) >> 2] = 1 | a, t[i + a >> 2] = a, c && (f = 12176 + (-8 & c) | 0, n = t[3039], (e = 1 << (c >>> 3)) & b ? e = t[f + 8 >> 2] : (t[3034] = e | b, e = f), t[f + 8 >> 2] = n, t[e + 12 >> 2] = n, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e), t[3039] = i, t[3036] = a),
                                e = A + 8 | 0
                            }
                            return G = r + 16 | 0, 0 | e
                        }

                        function Z(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                w = 0,
                                d = 0,
                                C = 0,
                                y = 0,
                                h = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = 0,
                                F = 0,
                                R = 0,
                                H = 0,
                                N = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                O = 0,
                                X = 0;
                            G = k = G - 336 | 0, s = b, l = 65535 & o, v = A, g = 65535 & i, C = -2147483648 & (i ^ o);
                            e: {
                                if (!((D = o >>> 16 & 32767) - 32767 >>> 0 > 4294934529 & (h = i >>> 16 & 32767) - 32767 >>> 0 >= 4294934530)) {
                                    if (!(!A & 2147418112 == (0 | (u = 2147483647 & i)) ? !(r | f) : u >>> 0 < 2147418112)) {
                                        d = A, C = 32768 | i;
                                        break e
                                    }
                                    if (!(!b & 2147418112 == (0 | (i = 2147483647 & o)) ? !(a | n) : i >>> 0 < 2147418112)) {
                                        d = b, C = 32768 | o, r = a, f = n;
                                        break e
                                    }
                                    if (!(r | A | 2147418112 ^ u | f)) {
                                        if (!(a | b | 2147418112 ^ i | n)) {
                                            r = 0, f = 0, C = 2147450880;
                                            break e
                                        }
                                        C |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(a | b | 2147418112 ^ i | n)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    if (!(r | A | f | u)) {
                                        d = (r = !(a | b | i | n)) ? 0 : d, C = r ? 2147450880 : C, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(a | b | i | n)) {
                                        C |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    65535 == (0 | u) | u >>> 0 < 65535 && (o = A = !(v | g), u = A ? r : v, de(k + 320 | 0, r, f, v, g, (A = (A <<= 6) + (32 == (0 | (o = m(o ? f : g))) ? m(u) + 32 | 0 : o) | 0) - 15 | 0), w = 16 - A | 0, v = t[k + 328 >> 2], g = t[k + 332 >> 2], f = t[k + 324 >> 2], r = t[k + 320 >> 2]), i >>> 0 > 65535 || (b = A = !(l | s), o = A ? a : s, de(k + 304 | 0, a, n, s, l, (A = (A <<= 6) + (32 == (0 | (b = m(b ? n : l))) ? m(o) + 32 | 0 : b) | 0) - 15 | 0), w = (A + w | 0) - 16 | 0, s = t[k + 312 >> 2], l = t[k + 316 >> 2], a = t[k + 304 >> 2], n = t[k + 308 >> 2])
                                }
                                if (T = i = 65536 | l, I = s, u = i << 15 | (A = s) >>> 17, me(k + 288 | 0, A = i = A << 15 | n >>> 17, b = u, 0, 0, o = 0 - A | 0, u = 1963258675 - (u + !!(0 | A) | 0) | 0, 0, 0), me(k + 272 | 0, 0 - (A = t[k + 296 >> 2]) | 0, 0 - (t[k + 300 >> 2] + !!(0 | A) | 0) | 0, 0, 0, o, u, 0, 0), me(k + 256 | 0, o = (A = t[k + 280 >> 2]) << 1 | t[k + 276 >> 2] >>> 31, A = t[k + 284 >> 2] << 1 | A >>> 31, 0, 0, i, b, 0, 0), me(k + 240 | 0, o, A, 0, 0, 0 - (u = t[k + 264 >> 2]) | 0, 0 - (t[k + 268 >> 2] + !!(0 | u) | 0) | 0, 0, 0), me(k + 224 | 0, u = (o = t[k + 248 >> 2]) << 1 | t[k + 244 >> 2] >>> 31, A = t[k + 252 >> 2] << 1 | o >>> 31, 0, 0, i, b, 0, 0), me(k + 208 | 0, u, A, 0, 0, 0 - (o = t[k + 232 >> 2]) | 0, 0 - (t[k + 236 >> 2] + !!(0 | o) | 0) | 0, 0, 0), me(k + 192 | 0, o = (A = t[k + 216 >> 2]) << 1 | t[k + 212 >> 2] >>> 31, A = t[k + 220 >> 2] << 1 | A >>> 31, 0, 0, i, b, 0, 0), me(k + 176 | 0, o, A, 0, 0, 0 - (u = t[k + 200 >> 2]) | 0, 0 - (t[k + 204 >> 2] + !!(0 | u) | 0) | 0, 0, 0), me(k + 160 | 0, o = i, A = b, 0, 0, b = (s = (i = t[k + 184 >> 2]) << 1 | t[k + 180 >> 2] >>> 31) - 1 | 0, i = (t[k + 188 >> 2] << 1 | i >>> 31) - !s | 0, 0, 0), me(k + 144 | 0, a << 15, n << 15 | a >>> 17, 0, 0, A = b, i, 0, 0), B = k + 112 | 0, z = t[k + 168 >> 2], b = t[k + 172 >> 2], c = (s = t[k + 160 >> 2]) + (o = t[k + 152 >> 2]) | 0, u = (l = t[k + 164 >> 2]) + t[k + 156 >> 2] | 0, o = u = o >>> 0 > c >>> 0 ? u + 1 | 0 : u, u = (u = (0 | l) == (0 | u) & c >>> 0 < s >>> 0 | u >>> 0 < l >>> 0) >>> 0 > (l = u + z | 0) >>> 0 ? b + 1 | 0 : b, me(B, A, i, 0, 0, 0 - (b = l + (s = !o & c >>> 0 > 1 | !!(0 | o)) | 0) | 0, 0 - (!!(0 | b) + (u = s >>> 0 > b >>> 0 ? u + 1 | 0 : u) | 0) | 0, 0, 0), me(k + 128 | 0, 1 - c | 0, 0 - ((c >>> 0 > 1) + o | 0) | 0, 0, 0, A, i, 0, 0), H = (h - D | 0) + w | 0, h = i = t[k + 116 >> 2], o = (A = t[k + 112 >> 2]) << 1, l = u = i << 1 | A >>> 31, A = u, p = b = t[k + 140 >> 2], A = A + (u = b << 1 | (i = t[k + 136 >> 2]) >>> 31) | 0, i = A = (b = (c = i << 1 | t[k + 132 >> 2] >>> 31) + o | 0) >>> 0 < c >>> 0 ? A + 1 | 0 : A, y = A = A - (b >>> 0 < 13927) | 0, B = A, N = u = 65536 | g, V = v, x = (A = v) << 1, O = u = u << 1 | A >>> 31, U = u, j = A = Ne(y, c = 0, u, 0), W = u = E, M = r << 1, D = A = f << 1 | r >>> 31, z = A, w = u = 0, y = (0 | i) == (0 | y) & (s = b - 13927 | 0) >>> 0 < b >>> 0 | i >>> 0 > y >>> 0, i = (0 | i) == (0 | l) & b >>> 0 < o >>> 0 | i >>> 0 < l >>> 0, A = t[k + 120 >> 2], u = b = t[k + 124 >> 2] << 1 | A >>> 31, u = (A = (c = p >>> 31 | 0) + (A = A << 1 | h >>> 31) | 0) >>> 0 < c >>> 0 ? u + 1 | 0 : u, u = (b = A) >>> 0 > (A = A + i | 0) >>> 0 ? u + 1 | 0 : u, c = (i = A) >>> 0 > (A = A + y | 0) >>> 0 ? u + 1 | 0 : u, i = A - 1 | 0, o = Ne(z, w, S = c - !A | 0, p = 0), b = E + W | 0, l = (0 | W) == (0 | (b = (A = o + j | 0) >>> 0 < o >>> 0 ? b + 1 | 0 : b)) & A >>> 0 < j >>> 0 | b >>> 0 < W >>> 0, j = i, i = Ne(i, 0, Z = (Q = f >>> 31 | 0) | v << 1, y = 0), u = E + b | 0, c = 0, g = u = i >>> 0 > (v = i + A | 0) >>> 0 ? u + 1 | 0 : u, c = (i = A = (0 | u) == (0 | b) & A >>> 0 > v >>> 0 | b >>> 0 > u >>> 0) >>> 0 > (A = A + l | 0) >>> 0 ? 1 : c, i = Ne(U, w, S, p), u = E + c | 0, l = A = i + A | 0, A = A >>> 0 < i >>> 0 ? u + 1 | 0 : u, i = Ne(U, w, j, y), c = E, b = i, i = Ne(Z, y, S, p), u = E + c | 0, i = u = i >>> 0 > (o = b + i | 0) >>> 0 ? u + 1 | 0 : u, A = A + (u = (0 | c) == (0 | u) & b >>> 0 > o >>> 0 | u >>> 0 < c >>> 0) | 0, l = c = l + i | 0, c = A = c >>> 0 < i >>> 0 ? A + 1 | 0 : A, u = o + g | 0, i = u = (A = (i = 0) + v | 0) >>> 0 < i >>> 0 ? u + 1 | 0 : u, b = (0 | u) == (0 | g) & A >>> 0 < v >>> 0 | u >>> 0 < g >>> 0, u = c, o = b, h = b = b + l | 0, c = u = o >>> 0 > b >>> 0 ? u + 1 | 0 : u, v = A, W = s, A = Ne(s, 0, Z, y), o = E, b = A, s = Ne(B, d, z, d), u = E + o | 0, s = (0 | o) == (0 | (u = (A = A + s | 0) >>> 0 < s >>> 0 ? u + 1 | 0 : u)) & A >>> 0 < b >>> 0 | o >>> 0 > u >>> 0, b = u, o = Ne(j, y, F = -2 & M, 0), u = E + u | 0, o = u = o >>> 0 > (g = o + A | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | u) == (0 | b) & A >>> 0 > g >>> 0 | b >>> 0 > u >>> 0, b = 0, A = ((u = A + s | 0) >>> 0 < A >>> 0 ? 1 : b) + i | 0, A = (l = u + v | 0) >>> 0 < u >>> 0 ? A + 1 | 0 : A, u = c, s = A, i = A = (0 | A) == (0 | i) & l >>> 0 < v >>> 0 | A >>> 0 < i >>> 0, X = A = A + h | 0, h = u = i >>> 0 > A >>> 0 ? u + 1 | 0 : u, A = Ne(U, w, W, d), R = E, U = A, i = Ne(S, p, F, d), u = E + R | 0, u = (A = A + i | 0) >>> 0 < i >>> 0 ? u + 1 | 0 : u, v = A, i = A + (c = Ne(B, d, Z, y)) | 0, b = u, A = u + E | 0, A = i >>> 0 < c >>> 0 ? A + 1 | 0 : A, w = i, u = Ne(z, d, j, y), c = E + A | 0, S = (0 | A) == (0 | (c = (i = i + u | 0) >>> 0 < u >>> 0 ? c + 1 | 0 : c)) & i >>> 0 < w >>> 0 | A >>> 0 > c >>> 0, u = ((A = (A = (A = (0 | A) == (0 | b) & v >>> 0 > w >>> 0 | A >>> 0 < b >>> 0) + (u = (0 | b) == (0 | R) & v >>> 0 < U >>> 0 | b >>> 0 < R >>> 0) | 0) + S | 0) | p) + s | 0, v = u = (b = c) >>> 0 > (w = b + l | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | s) == (0 | u) & l >>> 0 > w >>> 0 | u >>> 0 < s >>> 0, u = h, b = A, p = A = A + X | 0, s = u = b >>> 0 > A >>> 0 ? u + 1 | 0 : u, A = Ne(B, d, F, d), B = E, l = A, b = Ne(z, d, W, d), u = E + B | 0, b = (0 | (u = (A = A + b | 0) >>> 0 < b >>> 0 ? u + 1 | 0 : u)) == (0 | B) & A >>> 0 < l >>> 0 | u >>> 0 < B >>> 0, l = u, A = u + g | 0, u = (b | (h = 0)) + o | 0, o = (0 | o) == (0 | (u = A >>> 0 < l >>> 0 ? u + 1 | 0 : u)) & A >>> 0 < g >>> 0 | o >>> 0 > u >>> 0, c = (b = u) + (u = i) | 0, u = 0, u = ((i = A = (0 | b) == (0 | (c = (i = (g = 0) + A | 0) >>> 0 < g >>> 0 ? c + 1 | 0 : c)) & A >>> 0 > i >>> 0 | b >>> 0 > c >>> 0) >>> 0 > (A = A + o | 0) >>> 0 ? 1 : u) + v | 0, c = s, i = u = (i = A) >>> 0 > (A = A + w | 0) >>> 0 ? u + 1 | 0 : u, o = c = (o = b = (0 | v) == (0 | u) & A >>> 0 < w >>> 0 | u >>> 0 < v >>> 0) >>> 0 > (b = b + p | 0) >>> 0 ? c + 1 | 0 : c, 131071 == (0 | c) | c >>> 0 < 131071 ? (V = x | Q, N = y | O, me(k + 80 | 0, A, u, b, c, a, n, I, T), w = c = t[k + 84 >> 2], u = r << 17, s = (f = (v = 0) - (g = t[k + 88 >> 2]) | 0) - (c = !!(c | (r = t[k + 80 >> 2]))) | 0, l = (u - (t[k + 92 >> 2] + (v >>> 0 < g >>> 0) | 0) | 0) - (f >>> 0 < c >>> 0) | 0, g = 0 - (!!(0 | r) + w | 0) | 0, w = H + 16382 | 0, v = 0 - r | 0) : (me(k + 96 | 0, A = (1 & i) << 31 | A >>> 1, i = b << 31 | i >>> 1, b = (1 & o) << 31 | b >>> 1, o = o >>> 1 | 0, a, n, I, T), D = s = t[k + 100 >> 2], s = (v = (l = 0) - (w = t[k + 104 >> 2]) | 0) - (g = !!(s | (c = t[k + 96 >> 2]))) | 0, l = ((r << 16) - (t[k + 108 >> 2] + (l >>> 0 < w >>> 0) | 0) | 0) - (v >>> 0 < g >>> 0) | 0, g = 0 - (!!(0 | c) + D | 0) | 0, M = r, D = f, w = H + 16383 | 0, v = 0 - c | 0), (0 | w) >= 32767) C |= 2147418112,
                                r = 0,
                                f = 0;
                                else {
                                    if ((0 | w) > 0) r = s << 1 | g >>> 31, f = l << 1 | s >>> 31, s = b, l = 65535 & o | w << 16, c = g << 1 | v >>> 31, b = v << 1;
                                    else {
                                        if ((0 | w) <= -113) {
                                            r = 0, f = 0;
                                            break e
                                        }
                                        we(k - -64 | 0, A, i, b, o, 1 - w | 0), de(k + 48 | 0, M, D, V, N, w + 112 | 0), me(k + 32 | 0, a, n, I, T, A = t[k + 64 >> 2], i = t[k + 68 >> 2], s = t[k + 72 >> 2], l = t[k + 76 >> 2]), r = t[k + 40 >> 2], c = (f = t[k + 56 >> 2]) - (g = r << 1 | (o = t[k + 36 >> 2]) >>> 31) | 0, g = t[k + 60 >> 2] - ((t[k + 44 >> 2] << 1 | r >>> 31) + (f >>> 0 < g >>> 0) | 0) | 0, w = f = t[k + 52 >> 2], r = c - (f = (0 | f) == (0 | (b = o << 1 | (r = t[k + 32 >> 2]) >>> 31)) & (r = v = r << 1) >>> 0 > (u = t[k + 48 >> 2]) >>> 0 | f >>> 0 < b >>> 0) | 0, f = g - (f >>> 0 > c >>> 0) | 0, c = w - ((u >>> 0 < v >>> 0) + b | 0) | 0, b = u - v | 0
                                    }
                                    me(k + 16 | 0, a, n, I, T, 3, 0, 0, 0), me(k, a, n, I, T, 5, 0, 0, 0), v = A, A = b + (o = g = 1 & A) | 0, b = (u = 0) + c | 0, b = A >>> 0 < o >>> 0 ? b + 1 | 0 : b, o = A, n = (0 | n) == (0 | b) & A >>> 0 > a >>> 0 | n >>> 0 < b >>> 0, c = f, A = (0 | b) == (0 | u) & A >>> 0 < g >>> 0 | b >>> 0 < u >>> 0, u = i, f = u = (f = r = (r = (0 | (c = A >>> 0 > (a = r + A | 0) >>> 0 ? c + 1 | 0 : c)) == (0 | T)) & (0 | a) == (0 | I) ? n : r & a >>> 0 > I >>> 0 | c >>> 0 > T >>> 0) >>> 0 > (r = r + v | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | i) == (0 | u) & r >>> 0 < v >>> 0 | i >>> 0 > u >>> 0, u = l, u = (i = A) >>> 0 > (A = A + s | 0) >>> 0 ? u + 1 | 0 : u, n = A, s = (0 | (i = t[k + 20 >> 2])) == (0 | b) & P[k + 16 >> 2] < o >>> 0 | i >>> 0 < b >>> 0, i = t[k + 28 >> 2], i = u >>> 0 < 2147418112 & ((0 | (A = t[k + 24 >> 2])) == (0 | a) & (0 | i) == (0 | c) ? s : (0 | i) == (0 | c) & A >>> 0 < a >>> 0 | i >>> 0 < c >>> 0), A = f, u = (f = r = (0 | f) == (0 | (A = (s = i) >>> 0 > (i = r + i | 0) >>> 0 ? A + 1 | 0 : A)) & r >>> 0 > i >>> 0 | f >>> 0 > A >>> 0) >>> 0 > (r = r + n | 0) >>> 0 ? u + 1 | 0 : u, n = r, b = (0 | (f = t[k + 4 >> 2])) == (0 | b) & P[k >> 2] < o >>> 0 | f >>> 0 < b >>> 0, f = t[k + 12 >> 2], f = c = (f = r = u >>> 0 < 2147418112 & ((0 | (r = t[k + 8 >> 2])) == (0 | a) & (0 | f) == (0 | c) ? b : (0 | f) == (0 | c) & r >>> 0 < a >>> 0 | f >>> 0 < c >>> 0)) >>> 0 > (r = r + i | 0) >>> 0 ? A + 1 | 0 : A, i = (0 | A) == (0 | c) & r >>> 0 < i >>> 0 | A >>> 0 > c >>> 0, A = u, a = i, d |= i = i + n | 0, C |= A = a >>> 0 > i >>> 0 ? A + 1 | 0 : A
                                }
                            }
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = d, t[e + 12 >> 2] = C, G = k + 336 | 0
                        }

                        function M(e, r, f, A, i, a) {
                            var o, k, u, c, s, l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                y = 0,
                                h = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                E = 0;
                            G = o = G - 80 | 0, t[o + 76 >> 2] = r, u = i - 192 | 0, c = A - 384 | 0, s = o + 55 | 0, k = o + 56 | 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: for (;;) {
                                                l = 0;
                                                a: for (;;) {
                                                    if (P = r, (2147483647 ^ B) < (0 | l)) break A;
                                                    B = l + B | 0;
                                                    n: {
                                                        b: {
                                                            t: {
                                                                if (g = v[0 | (l = r)])
                                                                    for (;;) {
                                                                        o: {
                                                                            k: if (r = 255 & g) {
                                                                                if (37 != (0 | r)) break o;
                                                                                for (g = l;;) {
                                                                                    if (37 != v[g + 1 | 0]) {
                                                                                        r = g;
                                                                                        break k
                                                                                    }
                                                                                    if (l = l + 1 | 0, y = v[g + 2 | 0], g = r = g + 2 | 0, 37 != (0 | y)) break
                                                                                }
                                                                            } else r = l;
                                                                            if ((0 | (l = l - P | 0)) > (0 | (W = 2147483647 ^ B))) break A;
                                                                            if (e && fr(e, P, l), l) continue a;t[o + 76 >> 2] = r,
                                                                            l = r + 1 | 0,
                                                                            p = -1,
                                                                            g = n[r + 1 | 0] - 48 | 0,
                                                                            36 != v[r + 2 | 0] | g >>> 0 >= 10 || (p = g, T = 1, l = r + 3 | 0),
                                                                            t[o + 76 >> 2] = l,
                                                                            h = 0;k: if ((r = (g = n[0 | l]) - 32 | 0) >>> 0 > 31) y = l;
                                                                                else if (y = l, 75913 & (r = 1 << r))
                                                                                for (;;) {
                                                                                    if (y = l + 1 | 0, t[o + 76 >> 2] = y, h |= r, (r = (g = n[l + 1 | 0]) - 32 | 0) >>> 0 >= 32) break k;
                                                                                    if (l = y, !(75913 & (r = 1 << r))) break
                                                                                }
                                                                            k: if (42 != (0 | g)) {
                                                                                if ((0 | (D = He(o + 76 | 0))) < 0) break A;
                                                                                g = t[o + 76 >> 2]
                                                                            } else {
                                                                                if (g = y + 1 | 0, 36 != v[y + 2 | 0] | n[y + 1 | 0] - 48 >>> 0 >= 10) {
                                                                                    if (T) break t;
                                                                                    if (!e) {
                                                                                        t[o + 76 >> 2] = g, T = 0, D = 0;
                                                                                        break k
                                                                                    }
                                                                                    r = t[f >> 2], t[f >> 2] = r + 4, T = 0, r = t[r >> 2]
                                                                                } else r = n[0 | g], g = y + 3 | 0, T = 1, e ? r = t[(r << 3) + c >> 2] : (t[(r << 2) + u >> 2] = 10, r = 0);
                                                                                if (t[o + 76 >> 2] = g, D = r, (0 | r) >= 0) break k;
                                                                                D = 0 - r | 0, h |= 8192
                                                                            }if (l = 0, w = -1, 46 == v[0 | g])
                                                                                if (42 != v[g + 1 | 0]) t[o + 76 >> 2] = g + 1, w = He(o + 76 | 0), r = t[o + 76 >> 2], z = 1;
                                                                                else {
                                                                                    if (r = g + 2 | 0, 36 != v[g + 3 | 0] | n[g + 2 | 0] - 48 >>> 0 >= 10) {
                                                                                        if (T) break t;
                                                                                        e ? (g = t[f >> 2], t[f >> 2] = g + 4, w = t[g >> 2]) : w = 0
                                                                                    } else r = n[0 | r], e ? w = t[(r << 3) + c >> 2] : (t[(r << 2) + u >> 2] = 10, w = 0), r = g + 4 | 0;
                                                                                    t[o + 76 >> 2] = r, z = (0 | w) >= 0
                                                                                }
                                                                            else r = g,
                                                                            z = 0;
                                                                            for (;;) {
                                                                                if (j = l, y = 28, m = r, (g = n[0 | r]) - 123 >>> 0 < 4294967238) break f;
                                                                                if (r = r + 1 | 0, !((l = v[9167 + (g + C(l, 58) | 0) | 0]) - 1 >>> 0 < 8)) break
                                                                            }
                                                                            t[o + 76 >> 2] = r;k: if (27 == (0 | l)) {
                                                                                if ((0 | p) >= 0) break f;
                                                                                if (l = 0, !e) continue a
                                                                            } else {
                                                                                if (!l) break f;
                                                                                if ((0 | p) >= 0) {
                                                                                    if (!e) {
                                                                                        t[(p << 2) + i >> 2] = l;
                                                                                        continue i
                                                                                    }
                                                                                    l = t[4 + (g = (p << 3) + A | 0) >> 2], t[o + 64 >> 2] = t[g >> 2], t[o + 68 >> 2] = l;
                                                                                    break k
                                                                                }
                                                                                if (!e) break n;
                                                                                te(o - -64 | 0, l, f)
                                                                            }if (32 & v[0 | e]) break r;g = -65537 & h,
                                                                            h = 8192 & h ? g : h,
                                                                            p = 0,
                                                                            I = 1298,
                                                                            y = k;k: {
                                                                                u: {
                                                                                    c: {
                                                                                        s: {
                                                                                            l: {
                                                                                                v: {
                                                                                                    g: {
                                                                                                        P: {
                                                                                                            w: {
                                                                                                                d: {
                                                                                                                    C: {
                                                                                                                        y: {
                                                                                                                            h: {
                                                                                                                                m: {
                                                                                                                                    B: {
                                                                                                                                        p: switch (l = n[0 | m], (l = j && 3 == (15 & l) ? -45 & l : l) - 88 | 0) {
                                                                                                                                            case 11:
                                                                                                                                                break k;
                                                                                                                                            case 9:
                                                                                                                                            case 13:
                                                                                                                                            case 14:
                                                                                                                                            case 15:
                                                                                                                                                break u;
                                                                                                                                            case 27:
                                                                                                                                                break g;
                                                                                                                                            case 12:
                                                                                                                                            case 17:
                                                                                                                                                break d;
                                                                                                                                            case 23:
                                                                                                                                                break C;
                                                                                                                                            case 0:
                                                                                                                                            case 32:
                                                                                                                                                break y;
                                                                                                                                            case 24:
                                                                                                                                                break h;
                                                                                                                                            case 22:
                                                                                                                                                break m;
                                                                                                                                            case 29:
                                                                                                                                                break B;
                                                                                                                                            case 1:
                                                                                                                                            case 2:
                                                                                                                                            case 3:
                                                                                                                                            case 4:
                                                                                                                                            case 5:
                                                                                                                                            case 6:
                                                                                                                                            case 7:
                                                                                                                                            case 8:
                                                                                                                                            case 10:
                                                                                                                                            case 16:
                                                                                                                                            case 18:
                                                                                                                                            case 19:
                                                                                                                                            case 20:
                                                                                                                                            case 21:
                                                                                                                                            case 25:
                                                                                                                                            case 26:
                                                                                                                                            case 28:
                                                                                                                                            case 30:
                                                                                                                                            case 31:
                                                                                                                                                break b
                                                                                                                                        }
                                                                                                                                        p: switch (l - 65 | 0) {
                                                                                                                                            case 0:
                                                                                                                                            case 4:
                                                                                                                                            case 5:
                                                                                                                                            case 6:
                                                                                                                                                break u;
                                                                                                                                            case 2:
                                                                                                                                                break l;
                                                                                                                                            case 1:
                                                                                                                                            case 3:
                                                                                                                                                break b
                                                                                                                                        }
                                                                                                                                        if (83 == (0 | l)) break v;
                                                                                                                                        break b
                                                                                                                                    }
                                                                                                                                    P = t[o + 64 >> 2],
                                                                                                                                    g = t[o + 68 >> 2],
                                                                                                                                    I = 1298;
                                                                                                                                    break w
                                                                                                                                }
                                                                                                                                l = 0;m: switch (255 & j) {
                                                                                                                                    case 0:
                                                                                                                                    case 1:
                                                                                                                                    case 6:
                                                                                                                                        t[t[o + 64 >> 2] >> 2] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 2:
                                                                                                                                        P = t[o + 64 >> 2], t[P >> 2] = B, t[P + 4 >> 2] = B >> 31;
                                                                                                                                        continue a;
                                                                                                                                    case 3:
                                                                                                                                        b[t[o + 64 >> 2] >> 1] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 4:
                                                                                                                                        n[t[o + 64 >> 2]] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 7:
                                                                                                                                        break m;
                                                                                                                                    default:
                                                                                                                                        continue a
                                                                                                                                }
                                                                                                                                P = t[o + 64 >> 2],
                                                                                                                                t[P >> 2] = B,
                                                                                                                                t[P + 4 >> 2] = B >> 31;
                                                                                                                                continue a
                                                                                                                            }
                                                                                                                            w = w >>> 0 <= 8 ? 8 : w,
                                                                                                                            h |= 8,
                                                                                                                            l = 120
                                                                                                                        }
                                                                                                                        if (r = k, (P = t[o + 64 >> 2]) | (g = t[o + 68 >> 2]))
                                                                                                                            for (E = 32 & l; n[0 | (r = r - 1 | 0)] = E | v[9696 + (15 & P) | 0], j = !g & P >>> 0 > 15 | !!(0 | g), m = g, g = g >>> 4 | 0, P = (15 & m) << 28 | P >>> 4, j;);
                                                                                                                        if (P = r, !(t[o + 64 >> 2] | t[o + 68 >> 2]) | !(8 & h)) break P;I = 1298 + (l >>> 4 | 0) | 0,
                                                                                                                        p = 2;
                                                                                                                        break P
                                                                                                                    }
                                                                                                                    if (r = k, g = l = t[o + 68 >> 2], l | (P = t[o + 64 >> 2]))
                                                                                                                        for (; n[0 | (r = r - 1 | 0)] = 7 & P | 48, m = !g & P >>> 0 > 7 | !!(0 | g), g = (l = g) >>> 3 | 0, P = (7 & l) << 29 | P >>> 3, m;);
                                                                                                                    if (P = r, !(8 & h)) break P;w = (0 | (r = k - r | 0)) < (0 | w) ? w : r + 1 | 0;
                                                                                                                    break P
                                                                                                                }
                                                                                                                P = t[o + 64 >> 2],
                                                                                                                g = r = t[o + 68 >> 2],
                                                                                                                (0 | r) < 0 ? (g = l = 0 - (r + !!(0 | P) | 0) | 0, P = 0 - P | 0, t[o + 64 >> 2] = P, t[o + 68 >> 2] = l, p = 1, I = 1298) : 2048 & h ? (p = 1, I = 1299) : I = (p = 1 & h) ? 1300 : 1298
                                                                                                            }
                                                                                                            P = Me(P, g, k)
                                                                                                        }
                                                                                                        if ((0 | w) < 0 & z) break A;
                                                                                                        if (h = z ? -65537 & h : h, !(w | !!((r = t[o + 64 >> 2]) | (l = t[o + 68 >> 2])))) {
                                                                                                            P = k, w = 0;
                                                                                                            break b
                                                                                                        }
                                                                                                        w = (0 | (r = !(r | l) + (k - P | 0) | 0)) < (0 | w) ? w : r;
                                                                                                        break b
                                                                                                    }
                                                                                                    m = y = w >>> 0 >= 2147483647 ? 2147483647 : w,
                                                                                                    h = !!(0 | y);g: {
                                                                                                        P: {
                                                                                                            w: {
                                                                                                                d: if (!(!(3 & (r = P = (r = t[o + 64 >> 2]) || 2110)) | !y))
                                                                                                                    for (;;) {
                                                                                                                        if (!v[0 | r]) break w;
                                                                                                                        if (h = !!(0 | (m = m - 1 | 0)), !(3 & (r = r + 1 | 0))) break d;
                                                                                                                        if (!m) break
                                                                                                                    }
                                                                                                                if (!h) break P;
                                                                                                                if (!(!v[0 | r] | m >>> 0 < 4))
                                                                                                                    for (;;) {
                                                                                                                        if (~(l = t[r >> 2]) & l - 16843009 & -2139062144) break w;
                                                                                                                        if (r = r + 4 | 0, !((m = m - 4 | 0) >>> 0 > 3)) break
                                                                                                                    }
                                                                                                                if (!m) break P
                                                                                                            }
                                                                                                            for (;;) {
                                                                                                                if (!v[0 | r]) break g;
                                                                                                                if (r = r + 1 | 0, !(m = m - 1 | 0)) break
                                                                                                            }
                                                                                                        }
                                                                                                        r = 0
                                                                                                    }
                                                                                                    if (y = (r = r ? r - P | 0 : y) + P | 0, (0 | w) >= 0) {
                                                                                                        h = g, w = r;
                                                                                                        break b
                                                                                                    }
                                                                                                    if (h = g, w = r, v[0 | y]) break A;
                                                                                                    break b
                                                                                                }
                                                                                                if (w) {
                                                                                                    g = t[o + 64 >> 2];
                                                                                                    break s
                                                                                                }
                                                                                                l = 0,
                                                                                                Qe(e, 32, D, 0, h);
                                                                                                break c
                                                                                            }
                                                                                            t[o + 12 >> 2] = 0,
                                                                                            t[o + 8 >> 2] = t[o + 64 >> 2],
                                                                                            g = o + 8 | 0,
                                                                                            t[o + 64 >> 2] = g,
                                                                                            w = -1
                                                                                        }
                                                                                        for (l = 0;;) {
                                                                                            if (P = t[g >> 2]) {
                                                                                                if ((0 | (P = Ce(o + 4 | 0, P))) < 0) break r;
                                                                                                if (!(P >>> 0 > w - l >>> 0) && (g = g + 4 | 0, w >>> 0 > (l = l + P | 0) >>> 0)) continue
                                                                                            }
                                                                                            break
                                                                                        }
                                                                                        if (y = 61, (0 | l) < 0) break f;
                                                                                        if (Qe(e, 32, D, l, h), l)
                                                                                            for (y = 0, g = t[o + 64 >> 2];;) {
                                                                                                if (!(P = t[g >> 2])) break c;
                                                                                                if ((y = (P = Ce(w = o + 4 | 0, P)) + y | 0) >>> 0 > l >>> 0) break c;
                                                                                                if (fr(e, w, P), g = g + 4 | 0, !(l >>> 0 > y >>> 0)) break
                                                                                            } else l = 0
                                                                                    }
                                                                                    Qe(e, 32, D, l, 8192 ^ h),
                                                                                    l = (0 | l) < (0 | D) ? D : l;
                                                                                    continue a
                                                                                }
                                                                                if ((0 | w) < 0 & z) break A;
                                                                                if (y = 61, (0 | (l = 0 | tr[0 | a](e, d[o + 64 >> 3], D, w, h, l))) >= 0) continue a;
                                                                                break f
                                                                            }
                                                                            n[o + 55 | 0] = t[o + 64 >> 2],
                                                                            w = 1,
                                                                            P = s,
                                                                            h = g;
                                                                            break b
                                                                        }
                                                                        g = v[l + 1 | 0],
                                                                        l = l + 1 | 0
                                                                    }
                                                                if (e) break e;
                                                                if (!T) break n;
                                                                for (l = 1;;) {
                                                                    if (e = t[(l << 2) + i >> 2]) {
                                                                        if (te((l << 3) + A | 0, e, f), B = 1, 10 != (0 | (l = l + 1 | 0))) continue;
                                                                        break e
                                                                    }
                                                                    break
                                                                }
                                                                if (B = 1, l >>> 0 >= 10) break e;
                                                                for (;;) {
                                                                    if (t[(l << 2) + i >> 2]) break t;
                                                                    if (10 == (0 | (l = l + 1 | 0))) break
                                                                }
                                                                break e
                                                            }
                                                            y = 28;
                                                            break f
                                                        }
                                                        if ((0 | (r = (0 | (g = y - P | 0)) < (0 | w) ? w : g)) > (2147483647 ^ p)) break A;
                                                        if (y = 61, (0 | W) < (0 | (l = (0 | (w = r + p | 0)) < (0 | D) ? D : w))) break f;Qe(e, 32, l, w, h),
                                                        fr(e, I, p),
                                                        Qe(e, 48, l, w, 65536 ^ h),
                                                        Qe(e, 48, r, g, 0),
                                                        fr(e, P, g),
                                                        Qe(e, 32, l, w, 8192 ^ h),
                                                        r = t[o + 76 >> 2];
                                                        continue
                                                    }
                                                    break
                                                }
                                                break
                                            }
                                            B = 0;
                                            break e
                                        }
                                        y = 61
                                    }
                                    t[2726] = y
                                }
                                B = -1
                            }
                            return G = o + 80 | 0, B
                        }

                        function F(e, r, f, A, i, a, n, b, o) {
                            var k, u, c, s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0,
                                y = 0,
                                h = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = 0,
                                F = 0,
                                R = 0,
                                H = 0,
                                N = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                O = 0,
                                X = 0;
                            G = k = G - 96 | 0, B = 65535 & o, P = -2147483648 & (i ^ o), I = C = 65535 & i;
                            e: {
                                if (!((u = o >>> 16 & 32767) - 32767 >>> 0 > 4294934529 & (c = i >>> 16 & 32767) - 32767 >>> 0 >= 4294934530)) {
                                    if (s = A, !(!A & 2147418112 == (0 | (d = y = 2147483647 & i)) ? !(r | f) : d >>> 0 < 2147418112)) {
                                        v = A, P = 32768 | i;
                                        break e
                                    }
                                    if (!(!(i = b) & 2147418112 == (0 | (w = y = 2147483647 & o)) ? !(a | n) : w >>> 0 < 2147418112)) {
                                        v = i, P = 32768 | o, r = a, f = n;
                                        break e
                                    }
                                    if (!(r | s | 2147418112 ^ d | f)) {
                                        if (!(i | a | n | w)) {
                                            P = 2147450880, r = 0, f = 0;
                                            break e
                                        }
                                        P |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(i | a | 2147418112 ^ w | n)) {
                                        if (i = r | s, A = f | d, r = 0, f = 0, !(A | i)) {
                                            P = 2147450880;
                                            break e
                                        }
                                        P |= 2147418112;
                                        break e
                                    }
                                    if (!(r | s | f | d)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    if (!(i | a | n | w)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    65535 == (0 | d) | d >>> 0 < 65535 && (y = (s = !(A | C)) << 6, i = m(o = s ? r : A) + 32 | 0, de(k + 80 | 0, r, f, A, C, (o = y + (32 == (0 | (o = m(s ? f : C))) ? i : o) | 0) - 15 | 0), h = 16 - o | 0, A = t[k + 88 >> 2], I = t[k + 92 >> 2], f = t[k + 84 >> 2], r = t[k + 80 >> 2]), w >>> 0 > 65535 || (C = (o = !(b | B)) << 6, s = m(i = o ? a : b) + 32 | 0, de(k - -64 | 0, a, n, b, B, (i = C + (32 == (0 | (i = m(o ? n : B))) ? s : i) | 0) - 15 | 0), h = 16 + (h - i | 0) | 0, b = t[k + 72 >> 2], B = t[k + 76 >> 2], a = t[k + 64 >> 2], n = t[k + 68 >> 2])
                                }
                                if (i = a, a = n << 15 | a >>> 17, N = f, y = Ne(p = -32768 & (o = i << 15), i = 0, f, 0), z = i = E, V = a, d = r, f = Ne(a, 0, r, 0), a = E + i | 0, o = r = f + y | 0, f = r >>> 0 < f >>> 0 ? a + 1 | 0 : a, a = r, s = 0, r = Ne(d, l, p, l), i = E + a | 0, C = i = r >>> 0 > (w = s + r | 0) >>> 0 ? i + 1 | 0 : i, Q = (0 | a) == (0 | i) & s >>> 0 > w >>> 0 | i >>> 0 < a >>> 0, x = A, D = Ne(p, l, A, 0), O = E, r = Ne(N, l, V, l), s = E + O | 0, s = r >>> 0 > (T = r + D | 0) >>> 0 ? s + 1 | 0 : s, r = B << 15 | b >>> 17, A = Ne(j = b << 15 | n >>> 17, 0, d, l), a = E + s | 0, S = a = A >>> 0 > (W = A + T | 0) >>> 0 ? a + 1 | 0 : a, a = (A = (0 | f) == (0 | z) & o >>> 0 < y >>> 0 | f >>> 0 < z >>> 0) + a | 0, B = a = f >>> 0 > (U = f + W | 0) >>> 0 ? a + 1 | 0 : a, n = U, f = a, I = Ne(p, l, Z = 65536 | I, g), X = E, A = Ne(x, v, V, l), i = E + X | 0, o = i = A >>> 0 > (M = A + I | 0) >>> 0 ? i + 1 | 0 : i, r = Ne(F = -2147483648 | r, 0, d, l), a = E + i | 0, a = r >>> 0 > (R = r + M | 0) >>> 0 ? a + 1 | 0 : a, A = Ne(j, v, N, l), H = a, a = a + E | 0, z = r = A + R | 0, y = r >>> 0 < A >>> 0 ? a + 1 | 0 : a, i = f + (a = r) | 0, p = i = (r = 0) >>> 0 > (d = r + n | 0) >>> 0 ? i + 1 | 0 : i, a = i, f = (r = d + Q | 0) >>> 0 < d >>> 0 ? a + 1 | 0 : a, h = ((c + u | 0) + h | 0) - 16383 | 0, A = Ne(F, v, N, l), b = E, i = Ne(Z, v, V, l), a = E + b | 0, g = (0 | b) == (0 | (a = i >>> 0 > (n = i + A | 0) >>> 0 ? a + 1 | 0 : a)) & A >>> 0 > n >>> 0 | a >>> 0 < b >>> 0, b = a, i = Ne(j, v, x, v), a = E + a | 0, i = a = (A = i + n | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, n = (0 | a) == (0 | b) & A >>> 0 < n >>> 0 | a >>> 0 < b >>> 0, a = 0, a = (b = n) >>> 0 > (n = n + g | 0) >>> 0 ? 1 : a, b = n, n = Ne(F, v, Z, v), a = E + a | 0, Q = b = b + n | 0, n = n >>> 0 > b >>> 0 ? a + 1 | 0 : a, b = A, l = i, i = (0 | s) == (0 | O) & D >>> 0 > T >>> 0 | s >>> 0 < O >>> 0, a = 0, i = ((g = s = (0 | s) == (0 | S) & T >>> 0 > W >>> 0 | s >>> 0 > S >>> 0) >>> 0 > (s = i + s | 0) >>> 0 ? 1 : a) + l | 0, a = n, g = i = (A = A + s | 0) >>> 0 < s >>> 0 ? i + 1 | 0 : i, D = A, i = A = (0 | i) == (0 | l) & A >>> 0 < b >>> 0 | i >>> 0 < l >>> 0, s = A = A + Q | 0, b = a = i >>> 0 > A >>> 0 ? a + 1 | 0 : a, i = Ne(j, v, Z, v), l = E, n = Ne(F, v, x, v), a = E + l | 0, n = a = (A = n + i | 0) >>> 0 < n >>> 0 ? a + 1 | 0 : a, i = (a = (0 | l) == (0 | a) & A >>> 0 < i >>> 0 | a >>> 0 < l >>> 0) + b | 0, b = i = n >>> 0 > (T = n + s | 0) >>> 0 ? i + 1 | 0 : i, a = (s = A) + g | 0, i = a = (A = (i = 0) + D | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, n = (0 | g) == (0 | a) & A >>> 0 < D >>> 0 | a >>> 0 < g >>> 0, a = b, a = (b = n) >>> 0 > (n = n + (l = T) | 0) >>> 0 ? a + 1 | 0 : a, D = n, b = A, s = i, i = (A = (A = (A = (0 | o) == (0 | X) & I >>> 0 > M >>> 0 | o >>> 0 < X >>> 0) + (o = (0 | o) == (0 | H) & M >>> 0 > R >>> 0 | o >>> 0 > H >>> 0) | 0) + (i = (0 | y) == (0 | H) & z >>> 0 < R >>> 0 | y >>> 0 < H >>> 0) | 0) + s | 0, a = n = a, s = n = (b = (0 | (i = (A = o = (g = y) + b | 0) >>> 0 < g >>> 0 ? i + 1 | 0 : i)) == (0 | s) & b >>> 0 > A >>> 0 | i >>> 0 < s >>> 0) + D | 0, n = a = b >>> 0 > n >>> 0 ? a + 1 | 0 : a, b = A, a = 0, o = i, i = i + ((l = g = (0 | B) == (0 | p) & d >>> 0 < U >>> 0 | B >>> 0 > p >>> 0) >>> 0 > (g = g + ((0 | B) == (0 | S) & W >>> 0 > U >>> 0 | B >>> 0 < S >>> 0) | 0) >>> 0 ? 1 : a) | 0, a = n, o = a = (n = b = (0 | (i = (A = A + g | 0) >>> 0 < g >>> 0 ? i + 1 | 0 : i)) == (0 | o) & A >>> 0 < b >>> 0 | i >>> 0 < o >>> 0) >>> 0 > (b = b + s | 0) >>> 0 ? a + 1 | 0 : a, 65536 & a ? h = h + 1 | 0 : (s = C >>> 31 | 0, a = o << 1 | b >>> 31, b = b << 1 | i >>> 31, o = a, a = i << 1 | A >>> 31, A = A << 1 | f >>> 31, i = a, a = C << 1 | w >>> 31, w <<= 1, C = a, a = f << 1 | r >>> 31, r = r << 1 | s, f = a | (n = 0)), (0 | h) >= 32767) P |= 2147418112,
                                r = 0,
                                f = 0;
                                else {
                                    r: {
                                        if ((0 | h) <= 0) {
                                            if ((n = 1 - h | 0) >>> 0 <= 127) {
                                                de(k + 48 | 0, w, C, r, f, a = h + 127 | 0), de(k + 32 | 0, A, i, b, o, a), we(k + 16 | 0, w, C, r, f, n), we(k, A, i, b, o, n), w = t[k + 32 >> 2] | t[k + 16 >> 2] | !!(t[k + 48 >> 2] | t[k + 56 >> 2] | t[k + 52 >> 2] | t[k + 60 >> 2]), C = t[k + 36 >> 2] | t[k + 20 >> 2], r = t[k + 40 >> 2] | t[k + 24 >> 2], f = t[k + 44 >> 2] | t[k + 28 >> 2], A = t[k >> 2], i = t[k + 4 >> 2], n = t[k + 8 >> 2], a = t[k + 12 >> 2];
                                                break r
                                            }
                                            r = 0, f = 0;
                                            break e
                                        }
                                        n = b,
                                        a = 65535 & o | h << 16
                                    }
                                    v |= n,
                                    P |= a,
                                    (!r & -2147483648 == (0 | f) ? !(w | C) : (0 | f) > 0 | (0 | f) >= 0) ? r | w | -2147483648 ^ f | C ? (r = A, f = i) : (A = (0 | (a = i)) == (0 | (f = (f = r = 1 & A) >>> 0 > (r = r + A | 0) >>> 0 ? a + 1 | 0 : a)) & r >>> 0 < A >>> 0 | f >>> 0 < a >>> 0, a = P, P = (v = A + v | 0) >>> 0 < A >>> 0 ? a + 1 | 0 : a) : (s = (r = A + 1 | 0) ? i : i + 1 | 0, i = P, f = s, P = (A = !(s | r)) >>> 0 > (v = A + v | 0) >>> 0 ? i + 1 | 0 : i)
                                }
                            }
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = v, t[e + 12 >> 2] = P, G = k + 96 | 0
                        }

                        function R(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                w = 0,
                                C = 0,
                                y = 0,
                                h = 0;
                            if (!v[e + 492 | 0] || -1 != (0 | x(e))) return n[e + 492 | 0] = 0, 0;
                            e: {
                                if (t[e + 284 >> 2] != t[e + 516 >> 2] && (f = t[e + 520 >> 2], !(f = (0 | (i = t[e + 524 >> 2])) > 0 ? 1 : !!f & (0 | i) >= 0))) {
                                    L(e, e + 268 | 0);
                                    r: if (v[e + 536 | 0]) {
                                        if (L(e, e + 256 | 0), t[e + 568 >> 2] > 0)
                                            for (; n[t[e + 588 >> 2] + t[t[e + 564 >> 2] + (r << 2) >> 2] | 0] = 1, (0 | (r = r + 1 | 0)) < t[e + 568 >> 2];);
                                        if (!((0 | (f = t[e + 284 >> 2])) <= 0)) {
                                            for (o = t[e + 588 >> 2], i = t[e + 280 >> 2], r = 0; u = t[i + (r << 2) >> 2], v[o + (u >> 1) | 0] || (t[i + (A << 2) >> 2] = u, f = t[e + 284 >> 2], A = A + 1 | 0), (0 | f) > (0 | (r = r + 1 | 0)););
                                            (0 | (r = r - A | 0)) <= 0 || (f = f - r | 0, t[e + 284 >> 2] = f)
                                        }
                                        t[e + 512 >> 2] = f;
                                        f: {
                                            if (!(t[e + 568 >> 2] <= 0)) {
                                                for (r = 0; n[t[e + 588 >> 2] + t[t[e + 564 >> 2] + (r << 2) >> 2] | 0] = 0, (0 | (r = r + 1 | 0)) < (0 | (A = t[e + 568 >> 2])););
                                                if (!((0 | A) <= 0)) {
                                                    for (A = 0;;) {
                                                        if ((0 | (r = t[e + 580 >> 2])) == t[e + 584 >> 2]) {
                                                            if ((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break e;
                                                            if (r = r + f | 0, t[e + 584 >> 2] = r, f = Y(t[e + 576 >> 2], r << 2), t[e + 576 >> 2] = f, !f) break e;
                                                            r = t[e + 580 >> 2]
                                                        } else f = t[e + 576 >> 2];
                                                        if (t[(r << 2) + f >> 2] = 0, r = t[e + 580 >> 2] + 1 | 0, t[e + 580 >> 2] = r, t[((r << 2) + f | 0) - 4 >> 2] = t[t[e + 564 >> 2] + (A << 2) >> 2], !((0 | (A = A + 1 | 0)) < t[e + 568 >> 2])) break
                                                    }
                                                    break f
                                                }
                                            }
                                            if (!t[e + 564 >> 2]) break r
                                        }
                                        t[e + 568 >> 2] = 0
                                    }
                                    if (+P[e + 556 >> 2] > d[e + 96 >> 3] * +P[e + 548 >> 2] && tr[t[t[e >> 2] + 8 >> 2]](e), r = 0, f = 0, G = a = G - 16 | 0, t[a + 12 >> 2] = 0, t[a + 4 >> 2] = 0, t[a + 8 >> 2] = 0, A = e, (0 | (e = t[e + 540 >> 2])) > 0)
                                        for (;;) {
                                            if (v[t[A + 380 >> 2] + r | 0] && (0 | (o = v[t[A + 332 >> 2] + r | 0])) == (0 | (i = v[10370])) & (254 & ~i) >>> 1 | i & o & 2) {
                                                if ((0 | (e = t[a + 8 >> 2])) == t[a + 12 >> 2] && !((i = ((0 | (i = e >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 <= (2147483647 ^ e) >>> 0 && (i = e + i | 0, t[a + 12 >> 2] = i, f = Y(f, i << 2), t[a + 4 >> 2] = f, f))) break e;
                                                t[a + 8 >> 2] = e + 1, t[(e << 2) + f >> 2] = r, e = t[A + 540 >> 2]
                                            }
                                            if (!((0 | (r = r + 1 | 0)) < (0 | e))) break
                                        }
                                    e = 0, b = t[A + 460 >> 2];
                                    r: {
                                        if (t[A + 464 >> 2] > 0)
                                            for (r = t[A + 472 >> 2]; t[r + (t[(e << 2) + b >> 2] << 2) >> 2] = -1, (0 | (e = e + 1 | 0)) < t[A + 464 >> 2];);
                                        else if (!b) break r;t[A + 464 >> 2] = 0
                                    }
                                    r: if (!(t[a + 8 >> 2] <= 0)) {
                                        r = 0;
                                        f: {
                                            for (;;) {
                                                if (f = t[a + 4 >> 2] + (r << 2) | 0, t[t[A + 472 >> 2] + (t[f >> 2] << 2) >> 2] = r, (0 | (e = t[A + 464 >> 2])) == t[A + 468 >> 2]) {
                                                    if ((i = ((0 | (i = e >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ e) >>> 0) break f;
                                                    if (e = e + i | 0, t[A + 468 >> 2] = e, b = Y(b, e << 2), t[A + 460 >> 2] = b, !b) break f;
                                                    e = t[A + 464 >> 2]
                                                }
                                                if (t[A + 464 >> 2] = e + 1, t[(e << 2) + b >> 2] = t[f >> 2], !((0 | (r = r + 1 | 0)) < t[a + 8 >> 2])) break
                                            }
                                            if ((0 | (e = t[A + 464 >> 2])) < 2) break r;
                                            for (f = e >>> 1 | 0, C = t[A + 472 >> 2];;) {
                                                y = f, l = t[((f = f - 1 | 0) << 2) + b >> 2], u = C;
                                                A: if (!((0 | (o = 1 | (i = (r = f) << 1))) >= (0 | (k = t[A + 464 >> 2]))))
                                                    for (c = t[t[A + 488 >> 2] >> 2], h = d[c + (l << 3) >> 3], u = t[A + 472 >> 2];;) {
                                                        i: {
                                                            if ((0 | k) <= (0 | (e = i + 2 | 0))) i = t[(o << 2) + b >> 2],
                                                            g = d[(i << 3) + c >> 3];
                                                            else {
                                                                if (i = t[(e << 2) + b >> 2], w = d[(i << 3) + c >> 3], k = t[(o << 2) + b >> 2], w > (g = d[(k << 3) + c >> 3])) break i;
                                                                i = k
                                                            }
                                                            w = g,
                                                            e = o
                                                        }
                                                        if (!(w > h)) break A;
                                                        if (t[(r << 2) + b >> 2] = i, t[(i << 2) + u >> 2] = r, r = e, !((0 | (o = 1 | (i = e << 1))) < (0 | (k = t[A + 464 >> 2])))) break
                                                    }
                                                if (t[(r << 2) + b >> 2] = l, t[(l << 2) + u >> 2] = r, !((0 | y) > 1)) break
                                            }
                                            break r
                                        }
                                        break e
                                    }(e = t[a + 4 >> 2]) && (t[a + 8 >> 2] = 0, V(e)), G = a + 16 | 0, t[A + 516 >> 2] = t[A + 284 >> 2], e = t[A + 236 >> 2] + t[A + 228 >> 2] | 0, e = (f = (r = t[A + 224 >> 2]) + t[A + 232 >> 2] | 0) >>> 0 < r >>> 0 ? e + 1 | 0 : e, t[A + 520 >> 2] = f, t[A + 524 >> 2] = e
                                }
                                return 1
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function H(e, r) {
                            var f, A, i, a, n = 0,
                                b = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                C = 0,
                                y = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0;
                            G = f = G - 16 | 0, c(+r), v = 0 | o(1), y = 0 | o(0), c(+e), s = 0 | o(1), n = 0 | o(0);
                            e: {
                                if (!((a = (i = 2047 & (A = v >>> 20 | 0)) - 1086 | 0) >>> 0 > 4294967167 & (w = s >>> 20 | 0) - 2047 >>> 0 >= 4294965250)) {
                                    if (!(D = y << 1) & 2097152 == (0 | (g = 2097152 + (l = v << 1 | y >>> 31) | 0)) | g >>> 0 < 2097152) {
                                        if (b = 1, !(l | D) | !n & 1072693248 == (0 | s)) break e;
                                        if (g = s << 1, s = n, !((!D & -2097152 == (0 | l) | l >>> 0 < 4292870144) & (!(s <<= 1) & -2097152 == (0 | (n = g | n >>> 31)) | n >>> 0 < 4292870144))) {
                                            b = e + r;
                                            break e
                                        }
                                        if (!s & 2145386496 == (0 | n)) break e;
                                        b = (0 | v) < 0 ^ n >>> 0 < 2145386496 ? 0 : r * r;
                                        break e
                                    }
                                    if (!(n << 1) & 2097152 == (0 | (l = 2097152 + (s << 1 | n >>> 31) | 0)) | l >>> 0 < 2097152) {
                                        if (b = e * e, (0 | s) < 0 && (b = 1 == (0 | Re(y, v)) ? -b : b), (0 | v) > 0 | (0 | v) >= 0) break e;
                                        d[8 + (n = G - 16 | 0) >> 3] = 1 / b, b = d[n + 8 >> 3];
                                        break e
                                    }
                                    if ((0 | s) < 0) {
                                        if (!(n = Re(y, v))) {
                                            b = (e -= e) / e;
                                            break e
                                        }
                                        w &= 2047, p = (1 == (0 | n)) << 18, c(+e), s = 0 | o(1), n = 0 | o(0), s &= 2147483647
                                    }
                                    if (a >>> 0 <= 4294967167) {
                                        if (b = 1, (l = 1072693248 == (0 | s)) & !n) break e;
                                        if (i >>> 0 <= 957) {
                                            b = (!!(0 | n) & l | s >>> 0 > 1072693248 ? r : -r) + 1;
                                            break e
                                        }
                                        if ((1072693248 == (0 | s) & !!(0 | n) | s >>> 0 > 1072693248) != (A >>> 0 > 2047 | 0)) {
                                            d[8 + (n = G - 16 | 0) >> 3] = 3105036184601418e216, b = 3105036184601418e216 * d[n + 8 >> 3];
                                            break e
                                        }
                                        d[8 + (n = G - 16 | 0) >> 3] = 12882297539194267e-247, b = 12882297539194267e-247 * d[n + 8 >> 3];
                                        break e
                                    }
                                    w || (c(4503599627370496 * e), s = 0 | o(1), n = 0 | o(0), s = (2147483647 & s) - 54525952 | 0)
                                }
                                k(0, -134217728 & y),
                                k(1, 0 | v),
                                T = +u(),
                                g = ((l = v = s - 1072076117 | 0) >>> 13 & 127) << 5,
                                j = (C = +(l >> 20)) * d[622] + d[g + 5064 >> 3],
                                v = n - (y = 0) | 0,
                                n = l = s - ((-1048576 & l) + (n >>> 0 < y >>> 0) | 0) | 0,
                                k(0, 0),
                                k(1, 0 | (v - -2147483648 >>> 0 < 2147483648 ? n + 1 : n)),
                                b = (e = +u()) * (P = d[g + 5040 >> 3]) - 1,
                                k(0, 0 | v),
                                k(1, 0 | n),
                                P = (e = b + (I = (+u() - e) * P)) * (m = d[623]),
                                B = b,
                                b = (m = (C = e + (z = C * d[621] + d[g + 5056 >> 3])) + (B *= b *= m)) + (e = (B = j + (e + (z - C)) + I * (P + b) + (B + (C - m))) + e * (b = e * P) * (b * (b * (e * d[629] + d[628]) + (e * d[627] + d[626])) + (e * d[625] + d[624]))),
                                d[f + 8 >> 3] = e + (m - b),
                                c(+b),
                                n = 0 | o(1),
                                k(0, -134217728 & o(0)),
                                k(1, 0 | n),
                                e = T * (P = +u()),
                                r = (r - T) * P + (d[f + 8 >> 3] + (b - P)) * r,
                                c(+e),
                                n = 0 | o(1),
                                o(0);r: {
                                    if (!((w = n >>> 20 & 2047) - 969 >>> 0 < 63)) {
                                        if (w >>> 0 < 969) {
                                            e += 1, b = p ? -e : e;
                                            break r
                                        }
                                        if (n = w >>> 0 < 1033, w = 0, !n) {
                                            if (c(+e), n = 0 | o(1), o(0), (0 | n) < 0) {
                                                d[8 + (n = G - 16 | 0) >> 3] = p ? -12882297539194267e-247 : 12882297539194267e-247, b = 12882297539194267e-247 * d[n + 8 >> 3];
                                                break r
                                            }
                                            d[8 + (n = G - 16 | 0) >> 3] = p ? -3105036184601418e216 : 3105036184601418e216, b = 3105036184601418e216 * d[n + 8 >> 3];
                                            break r
                                        }
                                    }
                                    b = d[352],
                                    b = (r = (e = (b = (P = d[351] * e + b) - b) * d[354] + (b * d[353] + e) + r) * e) * r * (e * d[358] + d[357]),
                                    r *= e * d[356] + d[355],
                                    c(+P),
                                    o(1),
                                    v = 0 | o(0),
                                    e = b + (r + (d[2920 + (s = v << 4 & 2032) >> 3] + e)),
                                    l = t[(s = s + 2928 | 0) >> 2],
                                    g = t[s + 4 >> 2],
                                    n = l,
                                    g = (l = (s = v + p | 0) << 13) + g | 0,
                                    g = (n = n + (s = 0) | 0) >>> 0 < s >>> 0 ? g + 1 | 0 : g,
                                    w ? (k(0, 0 | n), k(1, 0 | g), b = (r = +u()) * e + r) : -2147483648 & v ? (k(0, 0 | n), k(1, 0 | (l = g + 1071644672 | 0)), r = +u(), h(e = (P = r * e) + r) < 1 && (d[8 + (n = G - 16 | 0) >> 3] = 22250738585072014e-324, d[n + 8 >> 3] = 22250738585072014e-324 * d[n + 8 >> 3], k(0, 0), k(1, -2147483648 & l), e = (C = e + (b = e < 0 ? -1 : 1)) + (P + (r - e) + (e + (b - C))) - b, W = +u(), e = 0 == e ? W : e), b = 22250738585072014e-324 * e) : (k(0, 0 | n), k(1, g - 1058013184 | 0), b = 5486124068793689e288 * ((r = +u()) * e + r))
                                }
                            }
                            return G = f + 16 | 0, b
                        }

                        function N(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0;
                            G = k = G - 112 | 0, u = 2147483647 & o;
                            e: {
                                if (c = 2147418112, l = !(r | f), (A | (s = 2147483647 & i) ? s - c >>> 0 < 2147549184 : l) || !(!b & -2147418112 == (0 | (P = u - c | 0)) ? a | n : -2147418112 == (0 | P) & !!(0 | b) | P >>> 0 > 2147549184)) {
                                    if (!(!A & 2147418112 == (0 | s) ? l : s >>> 0 < 2147418112)) {
                                        b = A, o = 32768 | i, a = r, n = f;
                                        break e
                                    }
                                    if (!(!b & 2147418112 == (0 | u) ? !(a | n) : u >>> 0 < 2147418112)) {
                                        o |= 32768;
                                        break e
                                    }
                                    if (!(r | A | 2147418112 ^ s | f)) {
                                        u = A, b = (A = !(r ^ a | A ^ b | f ^ n | i ^ o ^ -2147483648)) ? 0 : u, o = A ? 2147450880 : i, a = A ? 0 : r, n = A ? 0 : f;
                                        break e
                                    }
                                    if (!((c = a | b) | 2147418112 ^ u | n)) break e;
                                    if (!(r | A | f | s)) {
                                        if (n | u | c) break e;
                                        a &= r, n &= f, b &= A, o &= i;
                                        break e
                                    }
                                    if (!(a | b | n | u)) {
                                        a = r, n = f, b = A, o = i;
                                        break e
                                    }
                                }
                                s = (l = g = (c = (0 | u) == (0 | s)) & (0 | A) == (0 | b) ? (0 | f) == (0 | n) & r >>> 0 < a >>> 0 | f >>> 0 < n >>> 0 : c & A >>> 0 < b >>> 0 | u >>> 0 > s >>> 0) ? a : r,
                                P = l ? n : f,
                                d = c = l ? o : i,
                                l = l ? b : A,
                                w = 65535 & c,
                                u = g ? A : b,
                                c = (A = c = g ? i : o) >>> 16 & 32767,
                                (v = d >>> 16 & 32767) || (v = (b = v = !(l | w)) << 6, C = m(b ? s : l) + 32 | 0, de(k + 96 | 0, s, P, l, w, (v = v + (32 == (0 | (b = m(b ? P : w))) ? C : b) | 0) - 15 | 0), l = t[k + 104 >> 2], w = t[k + 108 >> 2], P = t[k + 100 >> 2], v = 16 - v | 0, s = t[k + 96 >> 2]),
                                a = g ? r : a,
                                n = g ? f : n,
                                r = u,
                                f = 65535 & A,
                                c || (g = u = !(r | f), A = u ? a : r, de(k + 80 | 0, a, n, r, f, (u = (u <<= 6) + (32 == (0 | (g = m(g ? n : f))) ? m(A) + 32 | 0 : g) | 0) - 15 | 0), c = 16 - u | 0, a = t[k + 80 >> 2], n = t[k + 84 >> 2], r = t[k + 88 >> 2], f = t[k + 92 >> 2]),
                                A = f << 3,
                                u = (f = r) << 3,
                                f = r = A | r >>> 29,
                                r = n >>> 29 | u,
                                f |= 524288,
                                u = w << 3 | l >>> 29,
                                w = l << 3 | P >>> 29,
                                g = u,
                                b = i ^ o,
                                u = n << 3 | a >>> 29,
                                A = a << 3,
                                (0 | c) != (0 | v) && ((i = v - c | 0) >>> 0 > 127 ? (r = 0, f = 0, u = 0, A = 1) : (de(k - -64 | 0, A, u, r, f, 128 - i | 0), we(k + 48 | 0, A, u, r, f, i), r = t[k + 56 >> 2], f = t[k + 60 >> 2], u = t[k + 52 >> 2], A = t[k + 48 >> 2] | !!(t[k + 64 >> 2] | t[k + 72 >> 2] | t[k + 68 >> 2] | t[k + 76 >> 2]))),
                                l = A,
                                c = u,
                                g |= 524288,
                                u = P << 3 | s >>> 29,
                                s <<= 3;r: if ((0 | b) < 0) {
                                    if (a = 0, n = 0, b = 0, o = 0, !(s ^ l | r ^ w | u ^ c | f ^ g)) break e;
                                    if (A = s - l | 0, i = u - ((s >>> 0 < l >>> 0) + c | 0) | 0, b = (a = w - r | 0) - (n = (0 | u) == (0 | c) & s >>> 0 < l >>> 0 | u >>> 0 < c >>> 0) | 0, o = r = (g - ((r >>> 0 > w >>> 0) + f | 0) | 0) - (a >>> 0 < n >>> 0) | 0, r >>> 0 > 524287) break r;
                                    n = f = !(r | b), o = f ? A : b, de(k + 32 | 0, A, i, b, a = r, r = (f = (f <<= 6) + (32 == (0 | (n = m(n ? i : r))) ? m(o) + 32 | 0 : n) | 0) - 12 | 0), v = v - r | 0, b = t[k + 40 >> 2], o = t[k + 44 >> 2], A = t[k + 32 >> 2], i = t[k + 36 >> 2]
                                } else u = u + c | 0, i = (A = s + l | 0) >>> 0 < s >>> 0 ? u + 1 | 0 : u, u = f + g | 0, u = (r = r + w | 0) >>> 0 < w >>> 0 ? u + 1 | 0 : u, 1048576 & (o = (b = r + (a = (0 | c) == (0 | i) & A >>> 0 < l >>> 0 | i >>> 0 < c >>> 0) | 0) >>> 0 < r >>> 0 ? u + 1 | 0 : u) && (A = 1 & l | (1 & i) << 31 | A >>> 1, i = b << 31 | i >>> 1, v = v + 1 | 0, b = (1 & o) << 31 | b >>> 1, o = o >>> 1 | 0);
                                if (f = 0, P = r = -2147483648 & d, (0 | v) >= 32767) b = f,
                                o = 2147418112 | r,
                                a = 0,
                                n = 0;
                                else if (c = 0, (0 | v) > 0 ? c = v : (de(k + 16 | 0, A, i, b, o, v + 127 | 0), we(k, A, i, b, o, 1 - v | 0), A = t[k >> 2] | !!(t[k + 16 >> 2] | t[k + 24 >> 2] | t[k + 20 >> 2] | t[k + 28 >> 2]), i = t[k + 4 >> 2], b = t[k + 8 >> 2], o = t[k + 12 >> 2]), s = 7 & A, A = (0 | (r = b << 29 | i >>> 3)) == (0 | (n = (A = (7 & i) << 29 | A >>> 3) >>> 0 > (a = (s >>> 0 > 4) + A | 0) >>> 0 ? r + 1 | 0 : r)) & A >>> 0 > a >>> 0 | r >>> 0 > n >>> 0, r = f | (7 & o) << 29 | b >>> 3, o = P | o >>> 3 & 65535 | c << 16, o = r >>> 0 > (b = A + r | 0) >>> 0 ? o + 1 | 0 : o, 4 != (0 | s)) {
                                    if (!s) break e
                                } else u = n + (r = 0) | 0,
                                o = (r = (0 | r) == (0 | (n = (A = a) >>> 0 > (a = a + (f = 1 & a) | 0) >>> 0 ? u + 1 | 0 : u)) & f >>> 0 > a >>> 0 | r >>> 0 > n >>> 0) >>> 0 > (b = r + b | 0) >>> 0 ? o + 1 | 0 : o
                            }
                            t[e >> 2] = a, t[e + 4 >> 2] = n, t[e + 8 >> 2] = b, t[e + 12 >> 2] = o, G = k + 112 | 0
                        }

                        function V(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            e: if (e |= 0) {
                                a = (A = e - 8 | 0) + (e = -8 & (r = t[e - 4 >> 2])) | 0;
                                r: if (!(1 & r)) {
                                    if (!(2 & r)) break e;
                                    if ((A = A - (r = t[A >> 2]) | 0) >>> 0 < P[3038]) break e;
                                    e = e + r | 0;
                                    f: {
                                        A: {
                                            if (t[3039] != (0 | A)) {
                                                if (r >>> 0 <= 255) {
                                                    if (i = r >>> 3 | 0, (0 | (r = t[A + 12 >> 2])) == (0 | (f = t[A + 8 >> 2]))) {
                                                        o = 12136, k = t[3034] & er(i), t[o >> 2] = k;
                                                        break r
                                                    }
                                                    t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                    break r
                                                }
                                                if (b = t[A + 24 >> 2], (0 | A) != (0 | (r = t[A + 12 >> 2]))) {
                                                    f = t[A + 8 >> 2], t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                    break f
                                                }
                                                if (!(f = t[(i = A + 20 | 0) >> 2])) {
                                                    if (!(f = t[A + 16 >> 2])) break A;
                                                    i = A + 16 | 0
                                                }
                                                for (; n = i, (f = t[(i = (r = f) + 20 | 0) >> 2]) || (i = r + 16 | 0, f = t[r + 16 >> 2]););
                                                t[n >> 2] = 0;
                                                break f
                                            }
                                            if (3 & ~(r = t[a + 4 >> 2])) break r;
                                            return t[3036] = e,
                                            t[a + 4 >> 2] = -2 & r,
                                            t[A + 4 >> 2] = 1 | e,
                                            void(t[a >> 2] = e)
                                        }
                                        r = 0
                                    }
                                    if (b) {
                                        f = t[A + 28 >> 2];
                                        f: {
                                            if (t[(i = 12440 + (f << 2) | 0) >> 2] == (0 | A)) {
                                                if (t[i >> 2] = r, r) break f;
                                                o = 12140, k = t[3035] & er(f), t[o >> 2] = k;
                                                break r
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | A) ? 16 : 20) >> 2] = r, !r) break r
                                        }
                                        t[r + 24 >> 2] = b, (f = t[A + 16 >> 2]) && (t[r + 16 >> 2] = f, t[f + 24 >> 2] = r), (f = t[A + 20 >> 2]) && (t[r + 20 >> 2] = f, t[f + 24 >> 2] = r)
                                    }
                                }
                                if (!(A >>> 0 >= a >>> 0) && 1 & (r = t[a + 4 >> 2])) {
                                    r: {
                                        f: {
                                            A: {
                                                i: {
                                                    if (!(2 & r)) {
                                                        if (t[3040] == (0 | a)) {
                                                            if (t[3040] = A, e = t[3037] + e | 0, t[3037] = e, t[A + 4 >> 2] = 1 | e, t[3039] != (0 | A)) break e;
                                                            return t[3036] = 0, void(t[3039] = 0)
                                                        }
                                                        if (t[3039] == (0 | a)) return t[3039] = A, e = t[3036] + e | 0, t[3036] = e, t[A + 4 >> 2] = 1 | e, void(t[e + A >> 2] = e);
                                                        if (e = (-8 & r) + e | 0, r >>> 0 <= 255) {
                                                            if (i = r >>> 3 | 0, (0 | (r = t[a + 12 >> 2])) == (0 | (f = t[a + 8 >> 2]))) {
                                                                o = 12136, k = t[3034] & er(i), t[o >> 2] = k;
                                                                break f
                                                            }
                                                            t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                            break f
                                                        }
                                                        if (b = t[a + 24 >> 2], (0 | a) != (0 | (r = t[a + 12 >> 2]))) {
                                                            f = t[a + 8 >> 2], t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                            break A
                                                        }
                                                        if (!(f = t[(i = a + 20 | 0) >> 2])) {
                                                            if (!(f = t[a + 16 >> 2])) break i;
                                                            i = a + 16 | 0
                                                        }
                                                        for (; n = i, (f = t[(i = (r = f) + 20 | 0) >> 2]) || (i = r + 16 | 0, f = t[r + 16 >> 2]););
                                                        t[n >> 2] = 0;
                                                        break A
                                                    }
                                                    t[a + 4 >> 2] = -2 & r,
                                                    t[A + 4 >> 2] = 1 | e,
                                                    t[e + A >> 2] = e;
                                                    break r
                                                }
                                                r = 0
                                            }
                                            if (b) {
                                                f = t[a + 28 >> 2];
                                                A: {
                                                    if (t[(i = 12440 + (f << 2) | 0) >> 2] == (0 | a)) {
                                                        if (t[i >> 2] = r, r) break A;
                                                        o = 12140, k = t[3035] & er(f), t[o >> 2] = k;
                                                        break f
                                                    }
                                                    if (t[b + (t[b + 16 >> 2] == (0 | a) ? 16 : 20) >> 2] = r, !r) break f
                                                }
                                                t[r + 24 >> 2] = b, (f = t[a + 16 >> 2]) && (t[r + 16 >> 2] = f, t[f + 24 >> 2] = r), (f = t[a + 20 >> 2]) && (t[r + 20 >> 2] = f, t[f + 24 >> 2] = r)
                                            }
                                        }
                                        if (t[A + 4 >> 2] = 1 | e, t[e + A >> 2] = e, t[3039] == (0 | A)) return void(t[3036] = e)
                                    }
                                    if (e >>> 0 <= 255) return r = 12176 + (-8 & e) | 0,
                                    (f = t[3034]) & (e = 1 << (e >>> 3)) ? e = t[r + 8 >> 2] : (t[3034] = e | f, e = r),
                                    t[r + 8 >> 2] = A,
                                    t[e + 12 >> 2] = A,
                                    t[A + 12 >> 2] = r,
                                    void(t[A + 8 >> 2] = e);f = 31,
                                    e >>> 0 <= 16777215 && (f = 62 + ((e >>> 38 - (r = m(e >>> 8 | 0)) & 1) - (r << 1) | 0) | 0),
                                    t[A + 28 >> 2] = f,
                                    t[A + 16 >> 2] = 0,
                                    t[A + 20 >> 2] = 0,
                                    r = 12440 + (f << 2) | 0;r: {
                                        f: {
                                            if ((i = t[3035]) & (n = 1 << f)) {
                                                for (f = e << (31 != (0 | f) ? 25 - (f >>> 1 | 0) : 0), r = t[r >> 2];;) {
                                                    if (i = r, (-8 & t[r + 4 >> 2]) == (0 | e)) break f;
                                                    if (n = f >>> 29 | 0, f <<= 1, !(r = t[16 + (n = r + (4 & n) | 0) >> 2])) break
                                                }
                                                t[n + 16 >> 2] = A, t[A + 24 >> 2] = i
                                            } else t[3035] = i | n,
                                            t[r >> 2] = A,
                                            t[A + 24 >> 2] = r;t[A + 12 >> 2] = A,
                                            t[A + 8 >> 2] = A;
                                            break r
                                        }
                                        e = t[i + 8 >> 2],
                                        t[e + 12 >> 2] = A,
                                        t[i + 8 >> 2] = A,
                                        t[A + 24 >> 2] = 0,
                                        t[A + 12 >> 2] = i,
                                        t[A + 8 >> 2] = e
                                    }
                                    e = t[3042] - 1 | 0,
                                    t[3042] = e || -1
                                }
                            }
                        }

                        function Q(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            f = e + r | 0;
                            e: {
                                r: if (!(1 & (A = t[e + 4 >> 2]))) {
                                    if (!(2 & A)) break e;
                                    r = (A = t[e >> 2]) + r | 0;
                                    f: {
                                        A: {
                                            i: {
                                                if ((0 | (e = e - A | 0)) != t[3039]) {
                                                    if (A >>> 0 <= 255) {
                                                        if ((0 | (i = t[e + 8 >> 2])) != (0 | (a = t[e + 12 >> 2]))) break i;
                                                        o = 12136, k = t[3034] & er(A >>> 3 | 0), t[o >> 2] = k;
                                                        break r
                                                    }
                                                    if (b = t[e + 24 >> 2], (0 | (A = t[e + 12 >> 2])) != (0 | e)) {
                                                        i = t[e + 8 >> 2], t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break f
                                                    }
                                                    if (!(i = t[(a = e + 20 | 0) >> 2])) {
                                                        if (!(i = t[e + 16 >> 2])) break A;
                                                        a = e + 16 | 0
                                                    }
                                                    for (; n = a, (i = t[(a = (A = i) + 20 | 0) >> 2]) || (a = A + 16 | 0, i = t[A + 16 >> 2]););
                                                    t[n >> 2] = 0;
                                                    break f
                                                }
                                                if (3 & ~(A = t[f + 4 >> 2])) break r;
                                                return t[3036] = r,
                                                t[f + 4 >> 2] = -2 & A,
                                                t[e + 4 >> 2] = 1 | r,
                                                void(t[f >> 2] = r)
                                            }
                                            t[i + 12 >> 2] = a,
                                            t[a + 8 >> 2] = i;
                                            break r
                                        }
                                        A = 0
                                    }
                                    if (b) {
                                        i = t[e + 28 >> 2];
                                        f: {
                                            if (t[(a = 12440 + (i << 2) | 0) >> 2] == (0 | e)) {
                                                if (t[a >> 2] = A, A) break f;
                                                o = 12140, k = t[3035] & er(i), t[o >> 2] = k;
                                                break r
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | e) ? 16 : 20) >> 2] = A, !A) break r
                                        }
                                        t[A + 24 >> 2] = b, (i = t[e + 16 >> 2]) && (t[A + 16 >> 2] = i, t[i + 24 >> 2] = A), (i = t[e + 20 >> 2]) && (t[A + 20 >> 2] = i, t[i + 24 >> 2] = A)
                                    }
                                }r: {
                                    f: {
                                        A: {
                                            i: {
                                                if (!(2 & (A = t[f + 4 >> 2]))) {
                                                    if (t[3040] == (0 | f)) {
                                                        if (t[3040] = e, r = t[3037] + r | 0, t[3037] = r, t[e + 4 >> 2] = 1 | r, t[3039] != (0 | e)) break e;
                                                        return t[3036] = 0, void(t[3039] = 0)
                                                    }
                                                    if (t[3039] == (0 | f)) return t[3039] = e, r = t[3036] + r | 0, t[3036] = r, t[e + 4 >> 2] = 1 | r, void(t[e + r >> 2] = r);
                                                    if (r = (-8 & A) + r | 0, A >>> 0 <= 255) {
                                                        if (a = A >>> 3 | 0, (0 | (A = t[f + 12 >> 2])) == (0 | (i = t[f + 8 >> 2]))) {
                                                            o = 12136, k = t[3034] & er(a), t[o >> 2] = k;
                                                            break f
                                                        }
                                                        t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break f
                                                    }
                                                    if (b = t[f + 24 >> 2], (0 | f) != (0 | (A = t[f + 12 >> 2]))) {
                                                        i = t[f + 8 >> 2], t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break A
                                                    }
                                                    if (!(i = t[(a = f + 20 | 0) >> 2])) {
                                                        if (!(i = t[f + 16 >> 2])) break i;
                                                        a = f + 16 | 0
                                                    }
                                                    for (; n = a, (i = t[(a = (A = i) + 20 | 0) >> 2]) || (a = A + 16 | 0, i = t[A + 16 >> 2]););
                                                    t[n >> 2] = 0;
                                                    break A
                                                }
                                                t[f + 4 >> 2] = -2 & A,
                                                t[e + 4 >> 2] = 1 | r,
                                                t[e + r >> 2] = r;
                                                break r
                                            }
                                            A = 0
                                        }
                                        if (b) {
                                            i = t[f + 28 >> 2];
                                            A: {
                                                if (t[(a = 12440 + (i << 2) | 0) >> 2] == (0 | f)) {
                                                    if (t[a >> 2] = A, A) break A;
                                                    o = 12140, k = t[3035] & er(i), t[o >> 2] = k;
                                                    break f
                                                }
                                                if (t[b + (t[b + 16 >> 2] == (0 | f) ? 16 : 20) >> 2] = A, !A) break f
                                            }
                                            t[A + 24 >> 2] = b, (i = t[f + 16 >> 2]) && (t[A + 16 >> 2] = i, t[i + 24 >> 2] = A), (i = t[f + 20 >> 2]) && (t[A + 20 >> 2] = i, t[i + 24 >> 2] = A)
                                        }
                                    }
                                    if (t[e + 4 >> 2] = 1 | r, t[e + r >> 2] = r, t[3039] == (0 | e)) return void(t[3036] = r)
                                }
                                if (r >>> 0 <= 255) return A = 12176 + (-8 & r) | 0,
                                (i = t[3034]) & (r = 1 << (r >>> 3)) ? r = t[A + 8 >> 2] : (t[3034] = r | i, r = A),
                                t[A + 8 >> 2] = e,
                                t[r + 12 >> 2] = e,
                                t[e + 12 >> 2] = A,
                                void(t[e + 8 >> 2] = r);i = 31,
                                r >>> 0 <= 16777215 && (i = 62 + ((r >>> 38 - (A = m(r >>> 8 | 0)) & 1) - (A << 1) | 0) | 0),
                                t[e + 28 >> 2] = i,
                                t[e + 16 >> 2] = 0,
                                t[e + 20 >> 2] = 0,
                                A = 12440 + (i << 2) | 0;r: {
                                    if ((a = t[3035]) & (n = 1 << i)) {
                                        for (i = r << (31 != (0 | i) ? 25 - (i >>> 1 | 0) : 0), A = t[A >> 2];;) {
                                            if (a = A, (-8 & t[A + 4 >> 2]) == (0 | r)) break r;
                                            if (n = i >>> 29 | 0, i <<= 1, !(A = t[16 + (n = A + (4 & n) | 0) >> 2])) break
                                        }
                                        t[n + 16 >> 2] = e, t[e + 24 >> 2] = a
                                    } else t[3035] = a | n,
                                    t[A >> 2] = e,
                                    t[e + 24 >> 2] = A;
                                    return t[e + 12 >> 2] = e,
                                    void(t[e + 8 >> 2] = e)
                                }
                                r = t[a + 8 >> 2],
                                t[r + 12 >> 2] = e,
                                t[a + 8 >> 2] = e,
                                t[e + 24 >> 2] = 0,
                                t[e + 12 >> 2] = a,
                                t[e + 8 >> 2] = r
                            }
                        }

                        function x(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                y = 0,
                                h = 0,
                                m = 0;
                            e: {
                                if ((0 | (f = t[e + 512 >> 2])) >= t[e + 284 >> 2]) w = -1,
                                A = 0;
                                else {
                                    for (w = -1;;) {
                                        if (t[e + 512 >> 2] = f + 1, A = t[e + 412 >> 2], b = t[t[e + 280 >> 2] + (f << 2) >> 2], v[b + t[e + 428 >> 2] | 0]) {
                                            if (i = C(b, 12) + A | 0, !((0 | (f = t[i + 4 >> 2])) <= 0)) {
                                                for (A = 0, u = 0; a = (r = t[i >> 2]) + (A << 3) | 0, 1 != (3 & t[t[t[e + 456 >> 2] >> 2] + (t[a >> 2] << 2) >> 2]) && (f = r + (u << 3) | 0, r = t[a + 4 >> 2], t[f >> 2] = t[a >> 2], t[f + 4 >> 2] = r, u = u + 1 | 0, f = t[i + 4 >> 2]), (0 | f) > (0 | (A = A + 1 | 0)););
                                                (0 | (r = A - u | 0)) <= 0 || (t[i + 4 >> 2] = f - r)
                                            }
                                            n[b + t[e + 428 >> 2] | 0] = 0, A = t[e + 412 >> 2]
                                        }
                                        if (d = A + C(b, 12) | 0, A = t[d >> 2], r = t[d + 4 >> 2]) {
                                            for (P = (r << 3) + A | 0, y = 1 ^ b, f = A;;) {
                                                o = t[A + 4 >> 2], r = v[t[e + 332 >> 2] + (o >> 1) | 0];
                                                r: if ((i = (254 & ~(k = v[10368])) >>> 1 | 0) & (0 | k) == (r ^ 1 & o) | (b = 2 & k) & r) r = t[A + 4 >> 2], t[f >> 2] = t[A >> 2], t[f + 4 >> 2] = r, f = f + 8 | 0, A = A + 8 | 0;
                                                    else if (a = t[A >> 2], c = t[e + 544 >> 2] + (a << 2) | 0, (0 | y) == (0 | (r = t[c + 4 >> 2])) && (r = t[c + 8 >> 2], t[c + 8 >> 2] = y, t[c + 4 >> 2] = r), A = A + 8 | 0, (0 | r) != (0 | o) && (o = 1 & i) & ((i = v[t[e + 332 >> 2] + (r >> 1) | 0]) ^ 1 & r) == (0 | k) | i & b) t[f >> 2] = a, t[f + 4 >> 2] = r, f = f + 8 | 0;
                                                else {
                                                    if (l = v[10369], (i = t[c >> 2]) >>> 0 <= 95) h = ~l >>> 1 & 1;
                                                    else
                                                        for (k = i >>> 5 | 0, h = ~l >>> 1 & 1, o = t[e + 332 >> 2], u = 2;;) {
                                                            if (g = t[4 + (b = c + (u << 2) | 0) >> 2], !((0 | l) == ((i = v[(g >> 1) + o | 0]) ^ 1 & g) & h | i & l & 2)) {
                                                                if (t[c + 8 >> 2] = g, t[b + 4 >> 2] = y, o = t[e + 412 >> 2] + C(1 ^ t[c + 8 >> 2], 12) | 0, (0 | (k = t[o + 4 >> 2])) == t[o + 8 >> 2]) {
                                                                    if ((i = ((0 | (i = k >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ k) >>> 0) break e;
                                                                    if (b = t[o >> 2], i = i + k | 0, t[o + 8 >> 2] = i, u = Y(b, i << 3), t[o >> 2] = u, !u) break e;
                                                                    k = t[o + 4 >> 2]
                                                                } else u = t[o >> 2];
                                                                t[o + 4 >> 2] = k + 1, t[(i = (k << 3) + u | 0) >> 2] = a, t[i + 4 >> 2] = r;
                                                                break r
                                                            }
                                                            if ((0 | k) == (0 | (u = u + 1 | 0))) break
                                                        }
                                                    if (i = a, t[f >> 2] = i, t[f + 4 >> 2] = r, f = f + 8 | 0, k = (g = r >> 1) + t[e + 332 >> 2] | 0, (0 | l) == ((o = v[0 | k]) ^ (b = 1 & r)) & h | o & l & 2) {
                                                        if (t[e + 512 >> 2] = t[e + 284 >> 2], A >>> 0 >= P >>> 0) {
                                                            w = i;
                                                            break r
                                                        }
                                                        for (; r = t[A + 4 >> 2], t[f >> 2] = t[A >> 2], t[f + 4 >> 2] = r, f = f + 8 | 0, P >>> 0 > (A = A + 8 | 0) >>> 0;);
                                                        w = a
                                                    } else n[0 | k] = b, a = t[e + 296 >> 2], b = t[e + 396 >> 2] + (g << 3) | 0, t[b >> 2] = i, t[b + 4 >> 2] = a, a = t[e + 284 >> 2], t[e + 284 >> 2] = a + 1, t[t[e + 280 >> 2] + (a << 2) >> 2] = r
                                                }
                                                if ((0 | A) == (0 | P)) break
                                            }
                                            A = f
                                        } else P = A;
                                        if ((0 | (r = P - A >> 3)) > 0 && (t[d + 4 >> 2] = t[d + 4 >> 2] - r), m = m + 1 | 0, !((0 | (f = t[e + 512 >> 2])) < t[e + 284 >> 2])) break
                                    }
                                    A = m
                                }
                                return a = (r = A) + (f = t[e + 184 >> 2]) | 0,
                                A = t[e + 188 >> 2],
                                t[e + 184 >> 2] = a,
                                t[e + 188 >> 2] = f >>> 0 > a >>> 0 ? A + 1 | 0 : A,
                                a = t[e + 520 >> 2],
                                f = t[e + 524 >> 2] - (r >>> 0 > a >>> 0) | 0,
                                r = a - r | 0,
                                t[e + 520 >> 2] = r,
                                t[e + 524 >> 2] = f,
                                w
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function O(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0;
                            G = k = G - 128 | 0;
                            e: {
                                r: {
                                    if (le(a, n, b, o, 0, 0, 0, 0)) {
                                        u = 65535 & o;
                                        f: A: {
                                            if (32767 != (0 | (l = o >>> 16 & 32767))) {
                                                if (c = 4, l) break A;
                                                c = a | b | n | u ? 3 : 2;
                                                break f
                                            }
                                            c = !(a | b | n | u)
                                        }
                                        if (32767 != (0 | (v = 32767 & (d = i >>> 16 | 0))) && c) break r
                                    }
                                    F(k + 16 | 0, r, f, A, i, a, n, b, o),
                                    Z(k, r = t[k + 16 >> 2], A = t[k + 20 >> 2], i = t[k + 24 >> 2], f = t[k + 28 >> 2], r, A, i, f),
                                    A = t[k + 8 >> 2],
                                    i = t[k + 12 >> 2],
                                    b = t[k >> 2],
                                    o = t[k + 4 >> 2];
                                    break e
                                }
                                if (l = b, (0 | le(r, f, c = A, u = g = 2147483647 & i, a, n, b, s = 2147483647 & o)) <= 0) {
                                    if (le(r, f, c, u, a, n, b, s)) {
                                        b = r, o = f;
                                        break e
                                    }
                                    F(k + 112 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 120 >> 2], i = t[k + 124 >> 2], b = t[k + 112 >> 2], o = t[k + 116 >> 2]
                                } else {
                                    if (P = o >>> 16 & 32767, v ? (o = f, b = r) : (F(k + 96 | 0, r, f, c, g, 0, 0, 0, 1081540608), c = t[k + 104 >> 2], g = b = t[k + 108 >> 2], v = (b >>> 16 | 0) - 120 | 0, o = t[k + 100 >> 2], b = t[k + 96 >> 2]), P || (F(k + 80 | 0, a, n, l, s, 0, 0, 0, 1081540608), l = t[k + 88 >> 2], s = a = t[k + 92 >> 2], P = (a >>> 16 | 0) - 120 | 0, n = t[k + 84 >> 2], a = t[k + 80 >> 2]), w = l, C = 65535 & s | 65536, g = 65535 & g | 65536, (0 | v) > (0 | P)) {
                                        for (;;) {
                                            if (l = (s = c - w | 0) - (u = (0 | n) == (0 | o) & a >>> 0 > b >>> 0 | n >>> 0 > o >>> 0) | 0, (0 | (u = (g - ((c >>> 0 < w >>> 0) + C | 0) | 0) - (u >>> 0 > s >>> 0) | 0)) >= 0 | (0 | u) > 0) {
                                                if (c = b, !((b = b - a | 0) | l | (o = o - ((a >>> 0 > c >>> 0) + n | 0) | 0) | u)) {
                                                    F(k + 32 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 40 >> 2], i = t[k + 44 >> 2], b = t[k + 32 >> 2], o = t[k + 36 >> 2];
                                                    break e
                                                }
                                                u = u << 1 | l >>> 31, c = l << 1 | o >>> 31
                                            } else u = g << 1 | c >>> 31, c = c << 1 | o >>> 31;
                                            if (g = u, u = o << 1 | b >>> 31, b <<= 1, o = u, !((0 | (v = v - 1 | 0)) > (0 | P))) break
                                        }
                                        v = P
                                    }
                                    if (l = (s = c - w | 0) - (u = (0 | n) == (0 | o) & a >>> 0 > b >>> 0 | n >>> 0 > o >>> 0) | 0, s = u = (g - ((c >>> 0 < w >>> 0) + C | 0) | 0) - (u >>> 0 > s >>> 0) | 0, (0 | u) < 0) l = c, s = g;
                                    else if (c = b, !((b = b - a | 0) | l | (o = o - ((a >>> 0 > c >>> 0) + n | 0) | 0) | s)) {
                                        F(k + 48 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 56 >> 2], i = t[k + 60 >> 2], b = t[k + 48 >> 2], o = t[k + 52 >> 2];
                                        break e
                                    }
                                    if (65535 == (0 | s) | s >>> 0 < 65535)
                                        for (; r = o >>> 31 | 0, v = v - 1 | 0, g = o << 1 | b >>> 31, b <<= 1, o = g, f = r, r = s << 1 | l >>> 31, l = f | l << 1, s = r, r >>> 0 < 65536;);
                                    r = 32768 & d, (0 | v) <= 0 ? (F(k - -64 | 0, b, o, l, 65535 & s | (r | v + 120) << 16, 0, 0, 0, 1065811968), A = t[k + 72 >> 2], i = t[k + 76 >> 2], b = t[k + 64 >> 2], o = t[k + 68 >> 2]) : (A = l, i = 65535 & s | (r | v) << 16)
                                }
                            }
                            t[e >> 2] = b, t[e + 4 >> 2] = o, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i, G = k + 128 | 0
                        }

                        function X(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0;
                            if (t[(e |= 0) >> 2] = 2532, (r = t[e + 628 >> 2]) && (t[e + 632 >> 2] = 0, V(r), t[e + 636 >> 2] = 0, t[e + 628 >> 2] = 0), (r = t[e + 616 >> 2]) && (t[e + 620 >> 2] = 0, V(r), t[e + 624 >> 2] = 0, t[e + 616 >> 2] = 0), (r = t[e + 604 >> 2]) && (t[e + 608 >> 2] = 0, V(r), t[e + 612 >> 2] = 0, t[e + 604 >> 2] = 0), (r = t[e + 588 >> 2]) && (t[e + 592 >> 2] = 0, V(r), t[e + 596 >> 2] = 0, t[e + 588 >> 2] = 0), (r = t[e + 576 >> 2]) && (t[e + 580 >> 2] = 0, V(r), t[e + 584 >> 2] = 0, t[e + 576 >> 2] = 0), (r = t[e + 564 >> 2]) && (t[e + 568 >> 2] = 0, V(r), t[e + 572 >> 2] = 0, t[e + 564 >> 2] = 0), (r = t[e + 544 >> 2]) && V(r), (r = t[e + 472 >> 2]) && (t[e + 476 >> 2] = 0, V(r), t[e + 480 >> 2] = 0, t[e + 472 >> 2] = 0), (r = t[e + 460 >> 2]) && (t[e + 464 >> 2] = 0, V(r), t[e + 468 >> 2] = 0, t[e + 460 >> 2] = 0), (r = t[e + 444 >> 2]) && (t[e + 448 >> 2] = 0, V(r), t[e + 452 >> 2] = 0, t[e + 444 >> 2] = 0), (r = t[e + 428 >> 2]) && (t[e + 432 >> 2] = 0, V(r), t[e + 436 >> 2] = 0, t[e + 428 >> 2] = 0), f = t[e + 412 >> 2]) {
                                if (r = 0, (0 | (A = t[e + 416 >> 2])) > 0) {
                                    for (; f = t[e + 412 >> 2] + C(r, 12) | 0, (i = t[f >> 2]) && (t[f + 4 >> 2] = 0, V(i), t[f >> 2] = 0, t[f + 8 >> 2] = 0, A = t[e + 416 >> 2]), (0 | A) > (0 | (r = r + 1 | 0)););
                                    f = t[e + 412 >> 2]
                                }
                                t[e + 416 >> 2] = 0, V(f), t[e + 420 >> 2] = 0, t[e + 412 >> 2] = 0
                            }
                            return (r = t[e + 396 >> 2]) && (t[e + 400 >> 2] = 0, V(r), t[e + 404 >> 2] = 0, t[e + 396 >> 2] = 0), (r = t[e + 380 >> 2]) && (t[e + 384 >> 2] = 0, V(r), t[e + 388 >> 2] = 0, t[e + 380 >> 2] = 0), (r = t[e + 364 >> 2]) && (t[e + 368 >> 2] = 0, V(r), t[e + 372 >> 2] = 0, t[e + 364 >> 2] = 0), (r = t[e + 348 >> 2]) && (t[e + 352 >> 2] = 0, V(r), t[e + 356 >> 2] = 0, t[e + 348 >> 2] = 0), (r = t[e + 332 >> 2]) && (t[e + 336 >> 2] = 0, V(r), t[e + 340 >> 2] = 0, t[e + 332 >> 2] = 0), (r = t[e + 316 >> 2]) && (t[e + 320 >> 2] = 0, V(r), t[e + 324 >> 2] = 0, t[e + 316 >> 2] = 0), (r = t[e + 304 >> 2]) && (t[e + 308 >> 2] = 0, V(r), t[e + 312 >> 2] = 0, t[e + 304 >> 2] = 0), (r = t[e + 292 >> 2]) && (t[e + 296 >> 2] = 0, V(r), t[e + 300 >> 2] = 0, t[e + 292 >> 2] = 0), (r = t[e + 280 >> 2]) && (t[e + 284 >> 2] = 0, V(r), t[e + 288 >> 2] = 0, t[e + 280 >> 2] = 0), (r = t[e + 268 >> 2]) && (t[e + 272 >> 2] = 0, V(r), t[e + 276 >> 2] = 0, t[e + 268 >> 2] = 0), (r = t[e + 256 >> 2]) && (t[e + 260 >> 2] = 0, V(r), t[e + 264 >> 2] = 0, t[e + 256 >> 2] = 0), (r = t[e + 32 >> 2]) && (t[e + 36 >> 2] = 0, V(r), t[e + 40 >> 2] = 0, t[e + 32 >> 2] = 0), (r = t[e + 16 >> 2]) && (t[e + 20 >> 2] = 0, V(r), t[e + 24 >> 2] = 0, t[e + 16 >> 2] = 0), (r = t[e + 4 >> 2]) && (t[e + 8 >> 2] = 0, V(r), t[e + 12 >> 2] = 0, t[e + 4 >> 2] = 0), 0 | e
                        }

                        function Y(e, r) {
                            var f, A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0;
                            if (!e) return U(r);
                            if (r >>> 0 >= 4294967232) return t[2726] = 48, 0;
                            f = r >>> 0 < 11 ? 16 : r + 11 & -8, a = -8 & (A = t[4 + (n = e - 8 | 0) >> 2]);
                            e: if (3 & A) {
                                b = a + n | 0;
                                r: if (a >>> 0 >= f >>> 0) {
                                    if ((i = a - f | 0) >>> 0 < 16) break r;
                                    t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (a = n + f | 0) >> 2] = 3 | i, t[b + 4 >> 2] = 1 | t[b + 4 >> 2], Q(a, i)
                                } else if (t[3040] != (0 | b))
                                    if (t[3039] != (0 | b)) {
                                        if (2 & (o = t[b + 4 >> 2])) break e;
                                        if ((k = a + (-8 & o) | 0) >>> 0 < f >>> 0) break e;
                                        c = k - f | 0;
                                        f: if (o >>> 0 <= 255) {
                                            if ((0 | (i = t[b + 12 >> 2])) == (0 | (a = t[b + 8 >> 2]))) {
                                                l = 12136, v = t[3034] & er(o >>> 3 | 0), t[l >> 2] = v;
                                                break f
                                            }
                                            t[a + 12 >> 2] = i, t[i + 8 >> 2] = a
                                        } else {
                                            u = t[b + 24 >> 2];
                                            A: if ((0 | b) == (0 | (a = t[b + 12 >> 2]))) {
                                                i: {
                                                    if (!(o = t[(i = b + 20 | 0) >> 2])) {
                                                        if (!(o = t[b + 16 >> 2])) break i;
                                                        i = b + 16 | 0
                                                    }
                                                    for (; s = i, (o = t[(i = (a = o) + 20 | 0) >> 2]) || (i = a + 16 | 0, o = t[a + 16 >> 2]););t[s >> 2] = 0;
                                                    break A
                                                }
                                                a = 0
                                            }
                                            else i = t[b + 8 >> 2], t[i + 12 >> 2] = a, t[a + 8 >> 2] = i;
                                            if (u) {
                                                i = t[b + 28 >> 2];
                                                A: {
                                                    if (t[(o = 12440 + (i << 2) | 0) >> 2] == (0 | b)) {
                                                        if (t[o >> 2] = a, a) break A;
                                                        l = 12140, v = t[3035] & er(i), t[l >> 2] = v;
                                                        break f
                                                    }
                                                    if (t[(t[u + 16 >> 2] == (0 | b) ? 16 : 20) + u >> 2] = a, !a) break f
                                                }
                                                t[a + 24 >> 2] = u, (i = t[b + 16 >> 2]) && (t[a + 16 >> 2] = i, t[i + 24 >> 2] = a), (i = t[b + 20 >> 2]) && (t[a + 20 >> 2] = i, t[i + 24 >> 2] = a)
                                            }
                                        } c >>> 0 <= 15 ? (t[n + 4 >> 2] = 1 & A | k | 2, t[4 + (i = n + k | 0) >> 2] = 1 | t[i + 4 >> 2]) : (t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (i = n + f | 0) >> 2] = 3 | c, t[4 + (a = n + k | 0) >> 2] = 1 | t[a + 4 >> 2], Q(i, c))
                                    } else {
                                        if ((a = a + t[3036] | 0) >>> 0 < f >>> 0) break e;
                                        (i = a - f | 0) >>> 0 >= 16 ? (t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (o = n + f | 0) >> 2] = 1 | i, t[(a = a + n | 0) >> 2] = i, t[a + 4 >> 2] = -2 & t[a + 4 >> 2]) : (t[n + 4 >> 2] = a | 1 & A | 2, t[4 + (i = a + n | 0) >> 2] = 1 | t[i + 4 >> 2], i = 0), t[3039] = o, t[3036] = i
                                    }
                                else {
                                    if ((a = a + t[3037] | 0) >>> 0 <= f >>> 0) break e;
                                    t[n + 4 >> 2] = 1 & A | f | 2, a = a - f | 0, t[4 + (i = n + f | 0) >> 2] = 1 | a, t[3037] = a, t[3040] = i
                                }
                                i = n
                            } else {
                                if (f >>> 0 < 256) break e;
                                if (a >>> 0 >= f + 4 >>> 0 && (i = n, a - f >>> 0 <= t[3154] << 1 >>> 0)) break e;
                                i = 0
                            }
                            return i ? i + 8 | 0 : (i = U(r)) ? (ee(i, e, r >>> 0 > (n = (3 & (n = t[e - 4 >> 2]) ? -4 : -8) + (-8 & n) | 0) >>> 0 ? n : r), V(e), i) : 0
                        }

                        function J(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0;
                            G = f = G - 16 | 0, t[f + 12 >> 2] = -1;
                            e: {
                                r: {
                                    if ((0 | (b = r + 1 | 0)) > t[e + 16 >> 2]) {
                                        if (!((0 | (A = t[e + 20 >> 2])) >= (0 | b))) {
                                            if ((0 | (i = (0 | (i = 1 + (b - A | 0) & -2)) > (0 | (a = 2 + (A >> 1 & -2) | 0)) ? i : a)) > (2147483647 ^ A)) break r;
                                            if (A = A + i | 0, t[e + 20 >> 2] = A, A = Y(t[e + 12 >> 2], A << 2), t[e + 12 >> 2] = A, !A && 48 == t[2726]) break r
                                        }
                                        if (!((0 | (i = t[e + 16 >> 2])) >= (0 | b))) {
                                            if (a = t[f + 12 >> 2], n = t[e + 12 >> 2], o = b - (A = i) & 7)
                                                for (; t[n + (A << 2) >> 2] = a, A = A + 1 | 0, (0 | o) != (0 | (k = k + 1 | 0)););
                                            if (!(i - b >>> 0 > 4294967288))
                                                for (o = n + 28 | 0, k = n + 24 | 0, u = n + 20 | 0, c = n + 16 | 0, l = n + 12 | 0, v = n + 8 | 0, g = n + 4 | 0; t[(i = A << 2) + n >> 2] = a, t[i + g >> 2] = a, t[i + v >> 2] = a, t[i + l >> 2] = a, t[i + c >> 2] = a, t[i + u >> 2] = a, t[i + k >> 2] = a, t[i + o >> 2] = a, (0 | b) != (0 | (A = A + 8 | 0)););
                                        }
                                        t[e + 16 >> 2] = b
                                    }
                                    break e
                                }
                                B(0 | Ar(), 1060, 0),
                                s()
                            }
                            A = t[e + 4 >> 2], t[t[e + 12 >> 2] + (r << 2) >> 2] = A;
                            e: {
                                if (t[e + 8 >> 2] == (0 | A)) {
                                    if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (A = A + i | 0, t[e + 8 >> 2] = A, i = Y(t[e >> 2], A << 2), t[e >> 2] = i, !i) break e;
                                    A = t[e + 4 >> 2]
                                } else i = t[e >> 2];t[e + 4 >> 2] = A + 1,
                                t[(A << 2) + i >> 2] = r,
                                n = t[e + 12 >> 2],
                                A = t[n + (r << 2) >> 2],
                                a = t[(A << 2) + i >> 2];r: if (A)
                                    for (b = t[t[e + 28 >> 2] >> 2], P = d[b + (a << 3) >> 3];;) {
                                        if (e = (A << 2) + i | 0, u = t[(k = ((r = (o = A - 1 | 0) >> 1) << 2) + i | 0) >> 2], !(d[b + (u << 3) >> 3] < P)) {
                                            i = e;
                                            break r
                                        }
                                        if (t[e >> 2] = u, t[n + (t[k >> 2] << 2) >> 2] = A, A = r, !(o >>> 0 > 1)) break
                                    } else A = 0;
                                return t[i >> 2] = a,
                                t[n + (a << 2) >> 2] = A,
                                void(G = f + 16 | 0)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function K(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = y(0),
                                v = 0;
                            if ((0 | r) <= 15) n = e;
                            else
                                for (;;) {
                                    for (c = (u = t[f >> 2]) + (t[(r << 1 & -4) + e >> 2] << 2) | 0, i = r, A = -1;;) {
                                        o = t[c >> 2], k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2];
                                        e: if (!((a = t[(b = u + (k << 2) | 0) >> 2]) >>> 0 < 96)) {
                                            if (2 == (0 | (s = o >>> 5 | 0)))
                                                for (;;)
                                                    if (k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2], !(P[u + (k << 2) >> 2] > 95)) break e;
                                            if ((l = w[4 + (c + (s << 2) | 0) >> 2]) > w[4 + (b + (a >>> 5 << 2) | 0) >> 2])
                                                for (;;) {
                                                    if (k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2], (a = t[(b = u + (k << 2) | 0) >> 2]) >>> 0 <= 95) break e;
                                                    if (!(w[4 + (b + (a >>> 3 & 536870908) | 0) >> 2] < l)) break
                                                }
                                        } b = t[(a = ((i = i - 1 | 0) << 2) + e | 0) >> 2];
                                        e: if (!(o >>> 0 < 96))
                                            for (o = c + (o >>> 3 & 536870908) | 0;;) {
                                                if (2 != (0 | (v = t[(s = u + (b << 2) | 0) >> 2] >>> 5 | 0)) & !(w[o + 4 >> 2] < w[4 + (s + (v << 2) | 0) >> 2])) break e;
                                                b = t[(a = ((i = i - 1 | 0) << 2) + e | 0) >> 2]
                                            }
                                        if (!((0 | A) < (0 | i))) break;
                                        t[n >> 2] = b, t[a >> 2] = k
                                    }
                                    if (K(e, A, f), e = n, !((0 | (r = r - A | 0)) >= 16)) break
                                }
                            if ((0 | r) >= 2)
                                for (c = r - 2 | 0, u = t[f >> 2], A = 0;;) {
                                    for (i = f = (e = A) + 1 | 0; o = u + (t[(i << 2) + n >> 2] << 2) | 0, (k = t[o >> 2]) >>> 0 < 96 || (b = u + (t[(e << 2) + n >> 2] << 2) | 0, (2 == (0 | (a = t[b >> 2] >>> 5 | 0)) || w[4 + (o + (k >>> 5 << 2) | 0) >> 2] < w[4 + (b + (a << 2) | 0) >> 2]) && (e = i)), (0 | (i = i + 1 | 0)) != (0 | r););
                                    if (o = t[(i = (A << 2) + n | 0) >> 2], e = (e << 2) + n | 0, t[i >> 2] = t[e >> 2], t[e >> 2] = o, e = (0 | A) == (0 | c), A = f, e) break
                                }
                        }

                        function L(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0;
                            if (!(t[r + 4 >> 2] <= 0)) {
                                for (;;) {
                                    e: {
                                        r: {
                                            if (k = t[r >> 2], A = (u = (n = t[k + (P = s << 2) >> 2]) << 2) + t[e + 544 >> 2] | 0, !((f = t[A >> 2]) >>> 0 <= 31)) {
                                                if (i = 0, w = t[e + 332 >> 2], c = t[A + 4 >> 2], a = v[w + (c >> 1) | 0], (l = (b = (254 & ~(o = v[10368])) >>> 1 | 0) & (0 | o) == (a ^ 1 & c)) | a & (c = 2 & o)) break r;
                                                for (a = f >>> 5 | 0, d = 1 & b; !((0 | (i = i + 1 | 0)) == (0 | a) || (l = t[4 + (A + (i << 2) | 0) >> 2], d & (0 | o) == ((b = v[w + (l >> 1) | 0]) ^ 1 & l) | b & c)););
                                                if (i >>> 0 < a >>> 0) break r;
                                                if (!(f >>> 0 < 96)) {
                                                    for (k = ~(n = v[10369]) >>> 1 & 1, i = 2; u = t[4 + (b = A + (i << 2) | 0) >> 2], k & (0 | n) == ((o = v[t[e + 332 >> 2] + (u >> 1) | 0]) ^ 1 & u) | n & o & 2 && (t[b + 4 >> 2] = t[A + (a << 2) >> 2], 8 & (f = t[A >> 2]) && (t[(f = A + (f >>> 3 & 536870908) | 0) >> 2] = t[f + 4 >> 2], f = t[A >> 2]), f = f - 32 | 0, t[A >> 2] = f, i = i - 1 | 0), (0 | (a = f >>> 5 | 0)) > (0 | (i = i + 1 | 0)););
                                                    k = t[r >> 2], n = t[P + k >> 2]
                                                }
                                            }
                                            t[(g << 2) + k >> 2] = n,
                                            g = g + 1 | 0;
                                            break e
                                        }
                                        ie(e, n),
                                        f = t[A + 4 >> 2],
                                        (0 | (n = (i = v[(a = f >> 1) + t[e + 332 >> 2] | 0]) ^ 1 & f)) == (0 | (f = v[10368])) & (254 & ~f) >>> 1 | f & i & 2 && (i = t[e + 396 >> 2] + (a << 3) | 0, -1 == (0 | (f = t[i >> 2])) | (0 | A) != (t[e + 544 >> 2] + (f << 2) | 0) || (t[i >> 2] = -1)),
                                        t[A >> 2] = -4 & t[A >> 2] | 1,
                                        A = t[u + t[e + 544 >> 2] >> 2],
                                        t[e + 556 >> 2] = 1 + ((t[e + 556 >> 2] + (A >>> 5 | 0) | 0) + (A >>> 3 & 1) | 0)
                                    }
                                    if (!((0 | (s = s + 1 | 0)) < (0 | (A = t[r + 4 >> 2])))) break
                                }(0 | (e = s - g | 0)) <= 0 || (t[r + 4 >> 2] = A - e)
                            }
                        }

                        function q(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: switch ((0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = $(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), r - 43 | 0) {
                                                case 0:
                                                case 2:
                                                    break i;
                                                default:
                                                    break A
                                            }
                                            if (n = 45 == (0 | r), (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = $(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), (A = r - 58 | 0) >>> 0 > 4294967285) break f;
                                            if (t[e + 116 >> 2] < 0) break r;t[e + 4 >> 2] = t[e + 4 >> 2] - 1;
                                            break r
                                        }
                                        A = r - 58 | 0
                                    }
                                    if (!(A >>> 0 < 4294967286)) {
                                        if (!(r - 48 >>> 0 >= 10)) {
                                            for (A = 0; f = (0 | (A = (C(A, 10) + r | 0) - 48 | 0)) < 214748364, (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = $(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), f & (i = r - 48 | 0) >>> 0 <= 9;);
                                            if (a = (f = A) >> 31, !(i >>> 0 >= 10)) {
                                                for (; i = (f = Ne(f, a, 10, 0)) + r | 0, r = E, r = f >>> 0 > i >>> 0 ? r + 1 | 0 : r, (0 | (f = t[e + 4 >> 2])) == t[e + 104 >> 2] ? A = $(e) : (t[e + 4 >> 2] = f + 1, A = v[0 | f]), f = i - 48 | 0, a = i = r - (i >>> 0 < 48) | 0, (f >>> 0 < 2061584302 & (0 | i) <= 21474836 | (0 | i) < 21474836) & (A = (r = A) - 48 | 0) >>> 0 <= 9;);
                                                if (!(A >>> 0 >= 10))
                                                    for (;
                                                        (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = $(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), r - 48 >>> 0 < 10;);
                                            }
                                        }(r = (0 | (r = t[e + 116 >> 2])) > 0 ? 1 : (0 | r) >= 0) && (t[e + 4 >> 2] = t[e + 4 >> 2] - 1), e = f, f = n ? 0 - e | 0 : e, a = n ? 0 - (!!(0 | e) + a | 0) | 0 : a;
                                        break e
                                    }
                                }
                                if (a = -2147483648, !(t[e + 116 >> 2] < 0)) return t[e + 4 >> 2] = t[e + 4 >> 2] - 1,
                                E = -2147483648,
                                0
                            }
                            return E = a, f
                        }

                        function _(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0;
                            b = t[e + 284 >> 2];
                            e: {
                                if ((0 | (i = t[e + 296 >> 2])) == t[e + 300 >> 2]) {
                                    if ((A = ((0 | (A = i >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ i) >>> 0) break e;
                                    if (A = A + i | 0, t[e + 300 >> 2] = A, a = Y(t[e + 292 >> 2], A << 2), t[e + 292 >> 2] = a, !a) break e;
                                    i = t[e + 296 >> 2]
                                } else a = t[e + 292 >> 2];t[e + 296 >> 2] = i + 1,
                                t[(i << 2) + a >> 2] = b;r: {
                                    if ((0 | (o = t[r + 4 >> 2])) > 0)
                                        for (i = v[10369], a = 0;;) {
                                            if (c = (u = (k = t[t[r >> 2] + (a << 2) >> 2]) >> 1) + t[e + 332 >> 2] | 0, (254 & ~i) >>> 1 & (0 | (b = (A = v[0 | c]) ^ (l = 1 & k))) == (255 & i) | (A &= 2) & i) break r;
                                            if ((0 | b) == (0 | (b = v[10370])) & (254 & ~b) >>> 1 | A & b && (n[0 | c] = l, A = t[e + 296 >> 2], b = t[e + 396 >> 2] + (u << 3) | 0, t[b >> 2] = -1, t[b + 4 >> 2] = A, A = t[e + 284 >> 2], t[e + 284 >> 2] = A + 1, t[t[e + 280 >> 2] + (A << 2) >> 2] = k, i = v[10369], o = t[r + 4 >> 2]), !((0 | o) > (0 | (a = a + 1 | 0)))) break
                                        }
                                    if (-1 == (0 | x(e)) && (a = 0, (r = t[f >> 2]) && (t[f + 4 >> 2] = 0), !(t[e + 284 >> 2] <= 0)))
                                        for (;;) {
                                            if (b = t[e + 280 >> 2], (0 | (i = t[f + 4 >> 2])) == t[f + 8 >> 2]) {
                                                if ((A = ((0 | (A = i >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ i) >>> 0) break e;
                                                if (A = A + i | 0, t[f + 8 >> 2] = A, r = Y(r, A << 2), t[f >> 2] = r, !r) break e;
                                                i = t[f + 4 >> 2]
                                            }
                                            if (t[f + 4 >> 2] = i + 1, t[(i << 2) + r >> 2] = t[b + (a << 2) >> 2], !((0 | (a = a + 1 | 0)) < t[e + 284 >> 2])) break
                                        }
                                }
                                return void ce(e, 0)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function $(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            k = !!((r = t[e + 112 >> 2]) | (A = t[e + 116 >> 2])), i = r, o = r = (f = t[e + 4 >> 2]) - (a = t[e + 44 >> 2]) | 0, b = r + t[e + 120 >> 2] | 0, r = t[e + 124 >> 2] + (r >> 31) | 0;
                            e: {
                                if (!((i >>> 0 <= b >>> 0 & (0 | (r = b >>> 0 < o >>> 0 ? r + 1 | 0 : r)) >= (0 | A) | (0 | r) > (0 | A)) & k)) {
                                    if (G = A = G - 16 | 0, f = -1, i = t[e + 72 >> 2], t[e + 72 >> 2] = i - 1 | i, t[e + 20 >> 2] != t[e + 28 >> 2] && tr[t[e + 36 >> 2]](e, 0, 0), t[e + 28 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0, 4 & (i = t[e >> 2]) ? (t[e >> 2] = 32 | i, o = -1) : (a = t[e + 44 >> 2] + t[e + 48 >> 2] | 0, t[e + 8 >> 2] = a, t[e + 4 >> 2] = a, o = i << 27 >> 31), o || 1 == (0 | tr[t[e + 32 >> 2]](e, A + 15 | 0, 1)) && (f = v[A + 15 | 0]), G = A + 16 | 0, A = f, (0 | f) >= 0) break e;
                                    a = t[e + 44 >> 2], f = t[e + 4 >> 2]
                                }
                                return t[e + 112 >> 2] = -1,
                                t[e + 116 >> 2] = -1,
                                t[e + 104 >> 2] = f,
                                f = (A = a - f | 0) + b | 0,
                                r = (A >> 31) + r | 0,
                                t[e + 120 >> 2] = f,
                                t[e + 124 >> 2] = f >>> 0 < A >>> 0 ? r + 1 | 0 : r,
                                -1
                            }
                            return r = (f = b + 1 | 0) ? r : r + 1 | 0, i = t[e + 4 >> 2], a = t[e + 8 >> 2], o = b = t[e + 116 >> 2], b | (k = t[e + 112 >> 2]) && (b = k - f | 0, (0 | (k = o - (r + (f >>> 0 > k >>> 0) | 0) | 0)) >= (0 | (o = (u = a - i | 0) >> 31)) & b >>> 0 >= u >>> 0 | (0 | k) > (0 | o) || (a = i + b | 0)), t[e + 104 >> 2] = a, f = (a = (b = t[e + 44 >> 2]) - i | 0) + f | 0, r = (a >> 31) + r | 0, t[e + 120 >> 2] = f, t[e + 124 >> 2] = f >>> 0 < a >>> 0 ? r + 1 | 0 : r, i >>> 0 <= b >>> 0 && (n[i - 1 | 0] = A), A
                        }

                        function ee(e, r, f) {
                            var A, i = 0;
                            if (f >>> 0 >= 512) W(0 | e, 0 | r, 0 | f);
                            else {
                                A = e + f | 0;
                                e: if (3 & (e ^ r))
                                    if (A >>> 0 < 4) f = e;
                                    else if ((i = A - 4 | 0) >>> 0 < e >>> 0) f = e;
                                else
                                    for (f = e; n[0 | f] = v[0 | r], n[f + 1 | 0] = v[r + 1 | 0], n[f + 2 | 0] = v[r + 2 | 0], n[f + 3 | 0] = v[r + 3 | 0], r = r + 4 | 0, i >>> 0 >= (f = f + 4 | 0) >>> 0;);
                                else {
                                    r: if (3 & e)
                                        if (f)
                                            for (f = e;;) {
                                                if (n[0 | f] = v[0 | r], r = r + 1 | 0, !(3 & (f = f + 1 | 0))) break r;
                                                if (!(f >>> 0 < A >>> 0)) break
                                            } else f = e;
                                        else f = e;
                                    if (!((e = -4 & A) >>> 0 < 64 || (i = e + -64 | 0) >>> 0 < f >>> 0))
                                        for (; t[f >> 2] = t[r >> 2], t[f + 4 >> 2] = t[r + 4 >> 2], t[f + 8 >> 2] = t[r + 8 >> 2], t[f + 12 >> 2] = t[r + 12 >> 2], t[f + 16 >> 2] = t[r + 16 >> 2], t[f + 20 >> 2] = t[r + 20 >> 2], t[f + 24 >> 2] = t[r + 24 >> 2], t[f + 28 >> 2] = t[r + 28 >> 2], t[f + 32 >> 2] = t[r + 32 >> 2], t[f + 36 >> 2] = t[r + 36 >> 2], t[f + 40 >> 2] = t[r + 40 >> 2], t[f + 44 >> 2] = t[r + 44 >> 2], t[f + 48 >> 2] = t[r + 48 >> 2], t[f + 52 >> 2] = t[r + 52 >> 2], t[f + 56 >> 2] = t[r + 56 >> 2], t[f + 60 >> 2] = t[r + 60 >> 2], r = r - -64 | 0, i >>> 0 >= (f = f - -64 | 0) >>> 0;);
                                    if (e >>> 0 <= f >>> 0) break e;
                                    for (; t[f >> 2] = t[r >> 2], r = r + 4 | 0, e >>> 0 > (f = f + 4 | 0) >>> 0;);
                                }
                                if (f >>> 0 < A >>> 0)
                                    for (; n[0 | f] = v[0 | r], r = r + 1 | 0, (0 | A) != (0 | (f = f + 1 | 0)););
                            }
                        }

                        function re(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                P = 0;
                            if (!v[e + 492 | 0]) return 0;
                            ae(t[r >> 2], t[r + 4 >> 2]);
                            e: {
                                r: {
                                    if (!((0 | (a = t[r + 4 >> 2])) <= 0)) {
                                        for (g = ~(o = v[10369]) >>> 1 & 1, P = ~(k = v[10368]) >>> 1 & 1, i = -2;;) {
                                            if (c = t[r >> 2], f = t[c + (b << 2) >> 2], (0 | k) == (0 | (l = (A = v[t[e + 332 >> 2] + (f >> 1) | 0]) ^ 1 & f)) & P | (A &= 2) & k | 1 == (f ^ i)) break r;
                                            if ((0 | o) == (0 | l) & g | A & o | (0 | f) == (0 | i) || (t[(u << 2) + c >> 2] = f, u = u + 1 | 0, a = t[r + 4 >> 2], i = f), !((0 | (b = b + 1 | 0)) < (0 | a))) break
                                        }(0 | (f = b - u | 0)) <= 0 || (a = a - f | 0, t[r + 4 >> 2] = a)
                                    }
                                    f: switch (0 | a) {
                                        case 0:
                                            return n[e + 492 | 0] = 0, 0;
                                        case 1:
                                            return i = t[t[r >> 2] >> 2], n[(f = i >> 1) + t[e + 332 >> 2] | 0] = 1 & i, r = t[e + 296 >> 2], f = t[e + 396 >> 2] + (f << 3) | 0, t[f >> 2] = -1, t[f + 4 >> 2] = r, r = t[e + 284 >> 2], t[e + 284 >> 2] = r + 1, t[t[e + 280 >> 2] + (r << 2) >> 2] = i, r = e, e = -1 == (0 | x(e)), n[r + 492 | 0] = e, e
                                    }
                                    if (f = ne(e + 544 | 0, r, 0), (0 | (A = t[e + 260 >> 2])) == t[e + 264 >> 2]) {
                                        if ((r = ((0 | (r = A >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                        if (r = r + A | 0, t[e + 264 >> 2] = r, i = Y(t[e + 256 >> 2], r << 2), t[e + 256 >> 2] = i, !i) break e;
                                        A = t[e + 260 >> 2]
                                    } else i = t[e + 256 >> 2];t[e + 260 >> 2] = A + 1,
                                    t[(A << 2) + i >> 2] = f,
                                    Ae(e, f)
                                }
                                return 1
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function fe(e, r) {
                            var f, A, i, a = 0;
                            G = f = G - 112 | 0, a = t[e >> 2], A = t[a - 4 >> 2], i = t[a - 8 >> 2], t[f + 80 >> 2] = 0, t[f + 84 >> 2] = 0, t[f + 88 >> 2] = 0, t[f + 92 >> 2] = 0, t[f + 96 >> 2] = 0, t[f + 100 >> 2] = 0, n[f + 103 | 0] = 0, n[f + 104 | 0] = 0, n[f + 105 | 0] = 0, n[f + 106 | 0] = 0, n[f + 107 | 0] = 0, n[f + 108 | 0] = 0, n[f + 109 | 0] = 0, n[f + 110 | 0] = 0, t[f + 72 >> 2] = 0, t[f + 76 >> 2] = 0, t[f + 68 >> 2] = 0, t[f + 64 >> 2] = 9748, t[f + 60 >> 2] = e, t[f + 56 >> 2] = r, a = e + i | 0;
                            e: if (_e(A, r, 0)) e = i ? 0 : a;
                                else if (!((0 | e) >= (0 | a) && (n[f + 47 | 0] = 0, n[f + 48 | 0] = 0, n[f + 49 | 0] = 0, n[f + 50 | 0] = 0, n[f + 51 | 0] = 0, n[f + 52 | 0] = 0, n[f + 53 | 0] = 0, n[f + 54 | 0] = 0, t[f + 24 >> 2] = 0, t[f + 28 >> 2] = 0, t[f + 32 >> 2] = 0, t[f + 36 >> 2] = 0, t[f + 40 >> 2] = 0, t[f + 44 >> 2] = 0, t[f + 16 >> 2] = 0, t[f + 20 >> 2] = 0, t[f + 12 >> 2] = 0, t[f + 8 >> 2] = r, t[f + 4 >> 2] = e, t[f >> 2] = A, t[f + 48 >> 2] = 1, tr[t[t[A >> 2] + 20 >> 2]](A, f, a, a, 1, 0), t[f + 24 >> 2]))) {
                                e = 0, tr[t[t[A >> 2] + 24 >> 2]](A, f + 56 | 0, a, 1, 0);
                                r: switch (t[f + 92 >> 2]) {
                                    case 0:
                                        e = 1 == t[f + 96 >> 2] && 1 == t[f + 84 >> 2] && 1 == t[f + 88 >> 2] ? t[f + 76 >> 2] : 0;
                                        break e;
                                    case 1:
                                        break r;
                                    default:
                                        break e
                                }
                                1 != t[f + 80 >> 2] && t[f + 96 >> 2] | 1 != t[f + 84 >> 2] | 1 != t[f + 88 >> 2] || (e = t[f + 72 >> 2])
                            }
                            return G = f + 112 | 0, e
                        }

                        function Ae(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0;
                            f = t[e + 544 >> 2] + (r << 2) | 0, n = t[e + 412 >> 2] + C(1 ^ t[f + 4 >> 2], 12) | 0, a = t[f + 8 >> 2];
                            e: {
                                if ((0 | (A = t[n + 4 >> 2])) == t[n + 8 >> 2]) {
                                    if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (b = t[n >> 2], A = A + i | 0, t[n + 8 >> 2] = A, i = Y(b, A << 3), t[n >> 2] = i, !i) break e;
                                    A = t[n + 4 >> 2]
                                } else i = t[n >> 2];
                                if (t[n + 4 >> 2] = A + 1, n = r, t[(A = (A << 3) + i | 0) >> 2] = r, t[A + 4 >> 2] = a, a = t[f + 4 >> 2], i = t[e + 412 >> 2] + C(1 ^ t[f + 8 >> 2], 12) | 0, (0 | (A = t[i + 4 >> 2])) == t[i + 8 >> 2]) {
                                    if ((r = ((0 | (r = A >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (b = t[i >> 2], r = r + A | 0, t[i + 8 >> 2] = r, r = Y(b, r << 3), t[i >> 2] = r, !r) break e;
                                    A = t[i + 4 >> 2]
                                } else r = t[i >> 2];
                                return t[i + 4 >> 2] = A + 1,
                                t[(r = (A << 3) + r | 0) >> 2] = n,
                                t[r + 4 >> 2] = a,
                                4 & v[0 | f] ? (r = t[e + 220 >> 2], r = (a = t[e + 216 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 216 >> 2] = a, t[e + 220 >> 2] = r, e = e + 232 | 0) : (r = t[e + 212 >> 2], r = (a = t[e + 208 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 208 >> 2] = a, t[e + 212 >> 2] = r, e = e + 224 | 0),
                                a = t[e + 4 >> 2],
                                a = (n = r = t[f >> 2] >>> 5 | 0) >>> 0 > (r = r + t[e >> 2] | 0) >>> 0 ? a + 1 | 0 : a,
                                t[e >> 2] = r,
                                void(t[e + 4 >> 2] = a)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function ie(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            e: {
                                if (f = t[e + 428 >> 2], A = t[e + 544 >> 2] + (r << 2) | 0, i = 1 ^ t[A + 4 >> 2], !v[0 | (r = f + i | 0)]) {
                                    if (n[0 | r] = 1, (0 | (f = t[e + 448 >> 2])) == t[e + 452 >> 2]) {
                                        if ((r = ((0 | (r = f >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break e;
                                        if (r = r + f | 0, t[e + 452 >> 2] = r, r = Y(t[e + 444 >> 2], r << 2), t[e + 444 >> 2] = r, !r) break e;
                                        f = t[e + 448 >> 2]
                                    } else r = t[e + 444 >> 2];
                                    t[e + 448 >> 2] = f + 1, t[(f << 2) + r >> 2] = i, f = t[e + 428 >> 2]
                                }
                                if (i = 1 ^ t[A + 8 >> 2], !v[0 | (r = f + i | 0)]) {
                                    if (n[0 | r] = 1, (0 | (f = t[e + 448 >> 2])) == t[e + 452 >> 2]) {
                                        if ((r = ((0 | (r = f >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break e;
                                        if (r = r + f | 0, t[e + 452 >> 2] = r, r = Y(t[e + 444 >> 2], r << 2), t[e + 444 >> 2] = r, !r) break e;
                                        f = t[e + 448 >> 2]
                                    } else r = t[e + 444 >> 2];
                                    t[e + 448 >> 2] = f + 1, t[(f << 2) + r >> 2] = i
                                }
                                return 4 & v[0 | A] ? (r = t[e + 216 >> 2], f = t[e + 220 >> 2] - !r | 0, r = r - 1 | 0, t[e + 216 >> 2] = r, t[e + 220 >> 2] = f, e = e + 232 | 0) : (r = t[e + 208 >> 2], f = t[e + 212 >> 2] - !r | 0, r = r - 1 | 0, t[e + 208 >> 2] = r, t[e + 212 >> 2] = f, e = e + 224 | 0),
                                r = t[e >> 2],
                                f = t[A >> 2] >>> 5 | 0,
                                A = t[e + 4 >> 2] - (r >>> 0 < f >>> 0) | 0,
                                r = r - f | 0,
                                t[e >> 2] = r,
                                void(t[e + 4 >> 2] = A)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function ae(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            if ((0 | r) <= 15) i = e;
                            else
                                for (;;) {
                                    for (a = t[(r << 1 & -4) + e >> 2], f = r, A = -1;;)
                                        if (!((0 | (b = t[(i = ((A = A + 1 | 0) << 2) + e | 0) >> 2])) < (0 | a))) {
                                            for (;
                                                (0 | (n = t[(o = ((f = f - 1 | 0) << 2) + e | 0) >> 2])) > (0 | a););
                                            if (!((0 | A) < (0 | f))) break;
                                            t[i >> 2] = n, t[o >> 2] = b
                                        } if (ae(e, A), e = i, !((0 | (r = r - A | 0)) >= 16)) break
                                }
                            if ((0 | r) >= 2)
                                for (o = r - 2 | 0, a = 0;;) {
                                    if (A = b = a + 1 | 0, e = 0, n = ~(f = a) + r & 3)
                                        for (; f = t[(A << 2) + i >> 2] < t[(f << 2) + i >> 2] ? A : f, A = A + 1 | 0, (0 | n) != (0 | (e = e + 1 | 0)););
                                    if (o - a >>> 0 >= 3)
                                        for (; e = A + 3 | 0, n = A + 2 | 0, k = A + 1 | 0, f = t[(A << 2) + i >> 2] < t[(f << 2) + i >> 2] ? A : f, f = t[(k << 2) + i >> 2] < t[(f << 2) + i >> 2] ? k : f, f = t[(n << 2) + i >> 2] < t[(f << 2) + i >> 2] ? n : f, f = t[(e << 2) + i >> 2] < t[(f << 2) + i >> 2] ? e : f, (0 | (A = A + 4 | 0)) != (0 | r););
                                    if (A = t[(e = (a << 2) + i | 0) >> 2], k = e, e = (f << 2) + i | 0, t[k >> 2] = t[e >> 2], t[e >> 2] = A, e = (0 | a) == (0 | o), a = b, e) break
                                }
                        }

                        function ne(e, r, f) {
                            var A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            if (Se(e, (i = 1 + ((a = 255 & (o = v[e + 16 | 0] | f)) + t[r + 4 >> 2] | 0) & 1073741823) + t[e + 4 >> 2] | 0), i = i + (A = t[e + 4 >> 2]) | 0, t[e + 4 >> 2] = i, i >>> 0 >= A >>> 0) {
                                if (i = 0, b = t[e >> 2] + (A << 2) | 0, n = !!(0 | a) << 3, e = f ? 4 : 0, t[b >> 2] = n | e | -32 & t[b >> 2], n = n | (a = t[r + 4 >> 2]) << 5 | e, t[b >> 2] = n, t[r + 4 >> 2] > 0)
                                    for (e = t[r >> 2]; t[4 + ((k = i << 2) + b | 0) >> 2] = t[e + k >> 2], (0 | (i = i + 1 | 0)) < t[r + 4 >> 2];);
                                if (255 & o) {
                                    if (r = 134217727 & a, f) return t[4 + ((r << 2) + b | 0) >> 2] = 0, A;
                                    if (e = 0, !(n >>> 0 < 32)) {
                                        if (a &= 3, f = 0, i = 0, r - 1 >>> 0 >= 3)
                                            for (u = r - a | 0, k = 0; e = 1 << (t[(n = b + 4 | 0) + (12 | (o = i << 2)) >> 2] >>> 1) | 1 << (t[n + o >> 2] >>> 1) | e | 1 << (t[n + (4 | o) >> 2] >>> 1) | 1 << (t[n + (8 | o) >> 2] >>> 1), i = i + 4 | 0, (0 | u) != (0 | (k = k + 4 | 0)););
                                        if (a)
                                            for (; e = 1 << (t[4 + ((i << 2) + b | 0) >> 2] >>> 1) | e, i = i + 1 | 0, (0 | a) != (0 | (f = f + 1 | 0)););
                                    }
                                    t[4 + ((r << 2) + b | 0) >> 2] = e
                                }
                                return A
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function be(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                t = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: {
                                                a: {
                                                    n: {
                                                        b: {
                                                            t: {
                                                                o: {
                                                                    if (r) {
                                                                        if (!f) break o;
                                                                        break t
                                                                    }
                                                                    E = 0,
                                                                    e = (e >>> 0) / (f >>> 0) | 0;
                                                                    break e
                                                                }
                                                                if (!e) break b;
                                                                break n
                                                            }
                                                            if (!(f - 1 & f)) break a;n = 0 - (a = (m(f) + 33 | 0) - m(r) | 0) | 0;
                                                            break A
                                                        }
                                                        E = 0,
                                                        e = (r >>> 0) / 0 | 0;
                                                        break e
                                                    }
                                                    if ((A = 32 - m(r) | 0) >>> 0 < 31) break i;
                                                    break f
                                                }
                                                if (1 == (0 | f)) break r;f = 31 & (a = rr(f)),
                                                (63 & a) >>> 0 >= 32 ? e = r >>> f | 0 : (A = r >>> f | 0, e = ((1 << f) - 1 & r) << 32 - f | e >>> f),
                                                E = A;
                                                break e
                                            }
                                            a = A + 1 | 0,
                                            n = 63 - A | 0
                                        }
                                        if (i = 31 & (A = 63 & a), A >>> 0 >= 32 ? (A = 0, b = r >>> i | 0) : (A = r >>> i | 0, b = ((1 << i) - 1 & r) << 32 - i | e >>> i), i = 31 & (n &= 63), n >>> 0 >= 32 ? (r = e << i, e = 0) : (r = (1 << i) - 1 & e >>> 32 - i | r << i, e <<= i), a)
                                            for (u = -1 == (0 | (n = f - 1 | 0)) ? -1 : 0; t = A << 1 | b >>> 31, b = (A = b << 1 | r >>> 31) - (o = f & (i = u - (t + (A >>> 0 > n >>> 0) | 0) >> 31)) | 0, A = t - (A >>> 0 < o >>> 0) | 0, r = r << 1 | e >>> 31, e = k | e << 1, k = 1 & i, a = a - 1 | 0;);E = r << 1 | e >>> 31,
                                        e = k | e << 1;
                                        break e
                                    }
                                    e = 0,
                                    r = 0
                                }
                                E = r
                            }
                            return e
                        }

                        function te(e, r, f) {
                            e: switch (r - 9 | 0) {
                                case 0:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, void(t[e >> 2] = t[r >> 2]);
                                case 6:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = b[r >> 1], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 7:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = g[r >> 1], void(t[e + 4 >> 2] = 0);
                                case 8:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = n[0 | r], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 9:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = v[0 | r], void(t[e + 4 >> 2] = 0);
                                case 16:
                                    return r = t[f >> 2] + 7 & -8, t[f >> 2] = r + 8, void(d[e >> 3] = d[r >> 3]);
                                case 17:
                                    s();
                                default:
                                    return;
                                case 1:
                                case 4:
                                case 14:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = t[r >> 2], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 2:
                                case 5:
                                case 11:
                                case 15:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = t[r >> 2], void(t[e + 4 >> 2] = 0);
                                case 3:
                                case 10:
                                case 12:
                                case 13:
                            }
                            r = t[f >> 2] + 7 & -8,
                            t[f >> 2] = r + 8,
                            f = t[r + 4 >> 2],
                            t[e >> 2] = t[r >> 2],
                            t[e + 4 >> 2] = f
                        }

                        function oe(e, r, f, A, i, a) {
                            var n;
                            G = n = G - 80 | 0;
                            e: if ((0 | a) >= 16384) {
                                if (F(n + 32 | 0, r, f, A, i, 0, 0, 0, 2147352576), A = t[n + 40 >> 2], i = t[n + 44 >> 2], r = t[n + 32 >> 2], f = t[n + 36 >> 2], a >>> 0 < 32767) {
                                    a = a - 16383 | 0;
                                    break e
                                }
                                F(n + 16 | 0, r, f, A, i, 0, 0, 0, 2147352576), a = ((0 | a) >= 49149 ? 49149 : a) - 32766 | 0, A = t[n + 24 >> 2], i = t[n + 28 >> 2], r = t[n + 16 >> 2], f = t[n + 20 >> 2]
                            } else(0 | a) > -16383 || (F(n - -64 | 0, r, f, A, i, 0, 0, 0, 7471104), A = t[n + 72 >> 2], i = t[n + 76 >> 2], r = t[n + 64 >> 2], f = t[n + 68 >> 2], a >>> 0 > 4294934644 ? a = a + 16269 | 0 : (F(n + 48 | 0, r, f, A, i, 0, 0, 0, 7471104), a = ((0 | a) <= -48920 ? -48920 : a) + 32538 | 0, A = t[n + 56 >> 2], i = t[n + 60 >> 2], r = t[n + 48 >> 2], f = t[n + 52 >> 2]));
                            F(n, r, f, A, i, 0, 0, 0, a + 16383 << 16), r = t[n + 12 >> 2], t[e + 8 >> 2] = t[n + 8 >> 2], t[e + 12 >> 2] = r, r = t[n + 4 >> 2], t[e >> 2] = t[n >> 2], t[e + 4 >> 2] = r, G = n + 80 | 0
                        }

                        function ke(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            if (f && (n[0 | e] = r, n[(A = e + f | 0) - 1 | 0] = r, !(f >>> 0 < 3 || (n[e + 2 | 0] = r, n[e + 1 | 0] = r, n[A - 3 | 0] = r, n[A - 2 | 0] = r, f >>> 0 < 7 || (n[e + 3 | 0] = r, n[A - 4 | 0] = r, f >>> 0 < 9 || (i = (A = 0 - e & 3) + e | 0, r = C(255 & r, 16843009), t[i >> 2] = r, t[(f = (A = f - A & -4) + i | 0) - 4 >> 2] = r, A >>> 0 < 9 || (t[i + 8 >> 2] = r, t[i + 4 >> 2] = r, t[f - 8 >> 2] = r, t[f - 12 >> 2] = r, A >>> 0 < 25 || (t[i + 24 >> 2] = r, t[i + 20 >> 2] = r, t[i + 16 >> 2] = r, t[i + 12 >> 2] = r, t[f - 16 >> 2] = r, t[f - 20 >> 2] = r, t[f - 24 >> 2] = r, t[f - 28 >> 2] = r, (f = A - (b = 4 & i | 24) | 0) >>> 0 < 32))))))))
                                for (A = Ne(r, 0, 1, 1), a = E, r = i + b | 0; t[r + 24 >> 2] = A, t[r + 28 >> 2] = a, t[r + 16 >> 2] = A, t[r + 20 >> 2] = a, t[r + 8 >> 2] = A, t[r + 12 >> 2] = a, t[r >> 2] = A, t[r + 4 >> 2] = a, r = r + 32 | 0, (f = f - 32 | 0) >>> 0 > 31;);
                            return e
                        }

                        function ue(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (i = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (f = (0 | (f = 2 + (i >> 1 & -2) | 0)) < (0 | (A = 1 + (r - i | 0) & -2)) ? A : f)) > (2147483647 ^ i)) break e;
                                        if (f = f + i | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], f << 2), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }
                                    if (!((0 | (f = t[e + 4 >> 2])) >= (0 | r))) {
                                        if (A = f, i = r - f & 3)
                                            for (; t[t[e >> 2] + (A << 2) >> 2] = 0, A = A + 1 | 0, (0 | i) != (0 | (a = a + 1 | 0)););
                                        if (!(f - r >>> 0 >= 4294967293))
                                            for (; t[(f = A << 2) + t[e >> 2] >> 2] = 0, t[4 + (f + t[e >> 2] | 0) >> 2] = 0, t[8 + (f + t[e >> 2] | 0) >> 2] = 0, t[12 + (f + t[e >> 2] | 0) >> 2] = 0, (0 | (A = A + 4 | 0)) != (0 | r););
                                    }
                                    t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function ce(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0;
                            if (!(t[e + 296 >> 2] <= (0 | r))) {
                                if (f = t[e + 284 >> 2], A = (b = r << 2) + t[e + 292 >> 2] | 0, (0 | f) > (0 | (i = t[A >> 2]))) {
                                    for (a = e + 460 | 0; A = t[(i = (f = f - 1 | 0) << 2) + t[e + 280 >> 2] >> 2] >> 1, n[A + t[e + 332 >> 2] | 0] = v[10370], (0 | (o = t[e + 88 >> 2])) <= 1 && 1 != (0 | o) | t[(t[e + 292 >> 2] + (t[e + 296 >> 2] << 2) | 0) - 4 >> 2] >= (0 | f) || (n[A + t[e + 348 >> 2] | 0] = 1 & n[i + t[e + 280 >> 2] | 0]), !v[A + t[e + 380 >> 2] | 0] | (0 | A) < t[e + 476 >> 2] & t[t[e + 472 >> 2] + (A << 2) >> 2] >= 0 || J(a, A), A = t[e + 292 >> 2] + b | 0, (0 | (i = t[A >> 2])) < (0 | f););
                                    f = t[e + 284 >> 2]
                                }
                                t[e + 512 >> 2] = i, (0 | (a = f)) > (0 | (f = t[A >> 2])) && (t[e + 284 >> 2] = f), t[e + 296 >> 2] <= (0 | r) || (t[e + 296 >> 2] = r)
                            }
                        }

                        function se(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (A = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (i = (0 | (i = 1 + (r - A | 0) & -2)) > (0 | (a = 2 + (A >> 1 & -2) | 0)) ? i : a)) > (2147483647 ^ A)) break e;
                                        if (A = A + i | 0, t[e + 8 >> 2] = A, A = Y(t[e >> 2], A), t[e >> 2] = A, !A && 48 == t[2726]) break e
                                    }
                                    if (!((0 | (A = t[e + 4 >> 2])) >= (0 | r))) {
                                        if (i = v[0 | f], f = A, b = r - A & 3)
                                            for (a = 0; n[t[e >> 2] + f | 0] = i, f = f + 1 | 0, (0 | b) != (0 | (a = a + 1 | 0)););
                                        if (!(A - r >>> 0 >= 4294967293))
                                            for (; n[t[e >> 2] + f | 0] = i, n[1 + (t[e >> 2] + f | 0) | 0] = i, n[2 + (t[e >> 2] + f | 0) | 0] = i, n[3 + (t[e >> 2] + f | 0) | 0] = i, (0 | (f = f + 4 | 0)) != (0 | r););
                                    }
                                    t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function le(e, r, f, A, i, a, n, b) {
                            var t, o = 0,
                                k = 0,
                                u = 0;
                            k = 1, u = o = 2147483647 & A;
                            e: if (!((t = 2147418112 == (0 | o)) & !f ? e | r : t & !!(0 | f) | o >>> 0 > 2147418112) && !(!n & 2147418112 == (0 | (o = 2147483647 & b)) ? i | a : 2147418112 == (0 | o) & !!(0 | n) | o >>> 0 > 2147418112)) {
                                if (!(e | i | f | n | r | a | o | u)) return 0;
                                if (u = (0 | (k = A & b)) > 0 ? 1 : (0 | k) >= 0) {
                                    if (k = -1, (0 | f) == (0 | n) & (0 | A) == (0 | b) ? (0 | r) == (0 | a) & e >>> 0 < i >>> 0 | r >>> 0 < a >>> 0 : f >>> 0 < n >>> 0 & (0 | A) <= (0 | b) | (0 | A) < (0 | b)) break e;
                                    return !!(e ^ i | f ^ n | r ^ a | A ^ b)
                                }
                                k = -1, ((0 | f) == (0 | n) & (0 | A) == (0 | b) ? (0 | r) == (0 | a) & e >>> 0 > i >>> 0 | r >>> 0 > a >>> 0 : f >>> 0 > n >>> 0 & (0 | A) >= (0 | b) | (0 | A) > (0 | b)) || (k = !!(e ^ i | f ^ n | r ^ a | A ^ b))
                            }
                            return k
                        }

                        function ve(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (i = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (f = (0 | (A = 1 + (r - i | 0) & -2)) > (0 | (f = 2 + (i >> 1 & -2) | 0)) ? A : f)) > (2147483647 ^ i)) break e;
                                        if (f = f + i | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], f), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }
                                    if (!((0 | (f = t[e + 4 >> 2])) >= (0 | r))) {
                                        if (A = f, i = r - f & 3)
                                            for (; n[t[e >> 2] + A | 0] = 0, A = A + 1 | 0, (0 | i) != (0 | (a = a + 1 | 0)););
                                        if (!(f - r >>> 0 >= 4294967293))
                                            for (; n[t[e >> 2] + A | 0] = 0, n[1 + (t[e >> 2] + A | 0) | 0] = 0, n[2 + (t[e >> 2] + A | 0) | 0] = 0, n[3 + (t[e >> 2] + A | 0) | 0] = 0, (0 | (A = A + 4 | 0)) != (0 | r););
                                    }
                                    t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function ge(e, r, f, A) {
                            var i, a = 0,
                                n = 0;
                            if (G = i = G - 208 | 0, t[i + 204 >> 2] = f, ke(f = i + 160 | 0, 0, 40), t[i + 200 >> 2] = t[i + 204 >> 2], !((0 | M(0, r, i + 200 | 0, i + 80 | 0, f, A)) < 0)) {
                                f = t[e + 76 >> 2] < 0, a = t[e >> 2], t[e >> 2] = -33 & a;
                                e: {
                                    r: {
                                        if (t[e + 48 >> 2]) {
                                            if (t[e + 16 >> 2]) break r
                                        } else t[e + 48 >> 2] = 80,
                                        t[e + 28 >> 2] = 0,
                                        t[e + 16 >> 2] = 0,
                                        t[e + 20 >> 2] = 0,
                                        n = t[e + 44 >> 2],
                                        t[e + 44 >> 2] = i;
                                        if (Oe(e)) break e
                                    }
                                    M(e, r, i + 200 | 0, i + 80 | 0, i + 160 | 0, A)
                                }
                                n && (tr[t[e + 36 >> 2]](e, 0, 0), t[e + 48 >> 2] = 0, t[e + 44 >> 2] = n, t[e + 28 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0), t[e >> 2] = t[e >> 2] | 32 & a
                            }
                            G = i + 208 | 0
                        }

                        function Pe(e, r) {
                            var f, A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                k = 0;
                            G = f = G - 16 | 0, c(+r), A = 0 | o(1), i = 0 | o(0), 2145386495 == (0 | (n = (a = 2147483647 & A) - 1048576 | 0)) | n >>> 0 < 2145386495 ? (b = i << 28, i = (15 & a) << 28 | i >>> 4, a = 1006632960 + (a >>> 4 | 0) | 0) : 2146435072 == (0 | a) | a >>> 0 > 2146435072 ? (b = i << 28, i = (15 & A) << 28 | i >>> 4, a = A >>> 4 | 2147418112) : i | a ? (de(f, n = i, a, 0, 0, (i = a ? m(a) : m(i) + 32 | 0) + 49 | 0), k = t[f >> 2], b = t[f + 4 >> 2], n = 15372 - i << 16, i = t[f + 8 >> 2], a = n | 65536 ^ t[f + 12 >> 2]) : (i = 0, a = 0), t[e >> 2] = k, t[e + 4 >> 2] = b, t[e + 8 >> 2] = i, t[e + 12 >> 2] = -2147483648 & A | a, G = f + 16 | 0
                        }

                        function we(e, r, f, A, i, a) {
                            var n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            64 & a ? (r = 31 & (f = a + -64 | 0), (63 & f) >>> 0 >= 32 ? (f = 0, r = i >>> r | 0) : (f = i >>> r | 0, r = ((1 << r) - 1 & i) << 32 - r | A >>> r), A = 0, i = 0) : a && (o = A, n = 31 & (b = 64 - a | 0), (63 & b) >>> 0 >= 32 ? (b = A << n, k = 0) : (b = (1 << n) - 1 & o >>> 32 - n | i << n, k = o << n), o = r, r = 31 & a, (63 & a) >>> 0 >= 32 ? (n = 0, r = f >>> r | 0) : (n = f >>> r | 0, r = ((1 << r) - 1 & f) << 32 - r | o >>> r), r |= k, f = n | b, n = A, A = 31 & a, (63 & a) >>> 0 >= 32 ? (b = 0, A = i >>> A | 0) : (b = i >>> A | 0, A = ((1 << A) - 1 & i) << 32 - A | n >>> A), i = b), t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i
                        }

                        function de(e, r, f, A, i, a) {
                            var n = 0,
                                b = 0,
                                o = 0;
                            64 & a ? (i = a + -64 | 0, a = r, A = 31 & i, (63 & i) >>> 0 >= 32 ? (i = a << A, A = 0) : (i = (1 << A) - 1 & a >>> 32 - A | f << A, A = a << A), r = 0, f = 0) : a && (b = A, n = 31 & a, (63 & a) >>> 0 >= 32 ? (o = A << n, b = 0) : (o = (1 << n) - 1 & b >>> 32 - n | i << n, b <<= n), n = r, A = 31 & (i = 64 - a | 0), (63 & i) >>> 0 >= 32 ? (i = 0, A = f >>> A | 0) : (i = f >>> A | 0, A = ((1 << A) - 1 & f) << 32 - A | n >>> A), A |= b, i |= o, b = r, n = 31 & a, (63 & a) >>> 0 >= 32 ? (o = r << n, r = 0) : (o = (1 << n) - 1 & b >>> 32 - n | f << n, r = b << n), f = o), t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i
                        }

                        function Ce(e, r) {
                            if (!e) return 0;
                            e: {
                                r: {
                                    if (e) {
                                        if (r >>> 0 <= 127) break r;
                                        if (t[t[2765] >> 2]) {
                                            if (r >>> 0 <= 2047) {
                                                n[e + 1 | 0] = 63 & r | 128, n[0 | e] = r >>> 6 | 192, e = 2;
                                                break e
                                            }
                                            if (!(57344 != (-8192 & r) & r >>> 0 >= 55296)) {
                                                n[e + 2 | 0] = 63 & r | 128, n[0 | e] = r >>> 12 | 224, n[e + 1 | 0] = r >>> 6 & 63 | 128, e = 3;
                                                break e
                                            }
                                            if (r - 65536 >>> 0 <= 1048575) {
                                                n[e + 3 | 0] = 63 & r | 128, n[0 | e] = r >>> 18 | 240, n[e + 2 | 0] = r >>> 6 & 63 | 128, n[e + 1 | 0] = r >>> 12 & 63 | 128, e = 4;
                                                break e
                                            }
                                        } else if (57216 == (-128 & r)) break r;
                                        t[2726] = 25, e = -1
                                    } else e = 1;
                                    break e
                                }
                                n[0 | e] = r,
                                e = 1
                            }
                            return e
                        }

                        function ye(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0;
                            if (i = t[r >> 2], Se(e, (A = 1 + ((f = v[e + 16 | 0] | i >>> 2 & 1) + (i >>> 5 | 0) | 0) | 0) + t[e + 4 >> 2] | 0), a = (i = t[e + 4 >> 2]) + A | 0, t[e + 4 >> 2] = a, A >>> 0 <= a >>> 0) {
                                if (A = 0, e = t[e >> 2] + (i << 2) | 0, a = t[r >> 2], t[e >> 2] = -9 & a | !!(0 | f) << 3, P[r >> 2] > 31)
                                    for (; t[4 + (e + (n = A << 2) | 0) >> 2] = t[4 + (r + n | 0) >> 2], (A = A + 1 | 0) >>> 0 < t[r >> 2] >>> 5 >>> 0;);
                                if (f) {
                                    if (e = (A = a >>> 3 & 536870908) + e | 0, r = r + A | 0, 4 & a) return w[e + 4 >> 2] = w[r + 4 >> 2], i;
                                    t[e + 4 >> 2] = t[r + 4 >> 2]
                                }
                                return i
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function he(e, r, f, A, i) {
                            var a, n = 0,
                                b = 0;
                            b = -1;
                            e: if (!(((n = 2147418112 == (0 | (a = 2147483647 & A))) & !f ? e | r : n & !!(0 | f) | a >>> 0 > 2147418112) || (n = 2147483647 & i) >>> 0 > 2147418112 & 2147418112 != (0 | n))) {
                                if (!(e | f | n | a | r)) return 0;
                                if (n = (0 | (n = A & i)) > 0 ? 1 : (0 | n) >= 0) {
                                    if ((!!(0 | f) | (0 | A) != (0 | i)) & (0 | A) < (0 | i)) break e;
                                    return !!(e | f | A ^ i | r)
                                }(!f & (0 | A) == (0 | i) ? e | r : !!(0 | f) & (0 | A) >= (0 | i) | (0 | A) > (0 | i)) || (b = !!(e | f | A ^ i | r))
                            }
                            return b
                        }

                        function me(e, r, f, A, i, a, n, b, o) {
                            var k, u, c;
                            o = Ne(r, f, b, o), b = E, i = Ne(A, i, a, n), A = E + b | 0, b = i >>> 0 > (o = i + o | 0) >>> 0 ? A + 1 | 0 : A, k = n, u = f, n = (f = Ne(n, i = 0, f, A = 0)) + o | 0, o = E + b | 0, c = n, f = f >>> 0 > n >>> 0 ? o + 1 | 0 : o, n = Ne(a, 0, r, 0), b = E, A = Ne(a, o = 0, u, A), a = E + o | 0, a = A >>> 0 > (b = b + A | 0) >>> 0 ? a + 1 | 0 : a, A = f, a = a >>> 0 > (o = a + c | 0) >>> 0 ? A + 1 | 0 : A, r = Ne(r, 0, k, i) + b | 0, i = E, b = (i = r >>> 0 < b >>> 0 ? i + 1 | 0 : i) + o | 0, o = a, t[e + 8 >> 2] = b, t[e + 12 >> 2] = i >>> 0 > b >>> 0 ? o + 1 | 0 : o, t[e >> 2] = n, t[e + 4 >> 2] = r
                        }

                        function Be(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            if (!((0 | (f = t[r + 76 >> 2])) >= 0 & (!f | t[2747] != (1073741823 & f)))) return (0 | (A = 255 & e)) != t[r + 80 >> 2] && (0 | (f = t[r + 20 >> 2])) != t[r + 16 >> 2] ? (t[r + 20 >> 2] = f + 1, void(n[0 | f] = e)) : void Ze(r, A);
                            A = t[(f = r + 76 | 0) >> 2], t[f >> 2] = A || 1073741823, (0 | (i = 255 & e)) == t[r + 80 >> 2] || (0 | (A = t[r + 20 >> 2])) == t[r + 16 >> 2] ? Ze(r, i) : (t[r + 20 >> 2] = A + 1, n[0 | A] = e), t[f >> 2] = 0
                        }

                        function pe(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0;
                            e: {
                                if (!(A = t[f + 16 >> 2])) {
                                    if (Oe(f)) break e;
                                    A = t[f + 16 >> 2]
                                }
                                if (A - (i = t[f + 20 >> 2]) >>> 0 < r >>> 0) return 0 | tr[t[f + 36 >> 2]](f, e, r);r: {
                                    f: if (!(!r | t[f + 80 >> 2] < 0)) {
                                        for (A = r;;) {
                                            if (10 != v[(a = e + A | 0) - 1 | 0]) {
                                                if (A = A - 1 | 0) continue;
                                                break f
                                            }
                                            break
                                        }
                                        if ((i = 0 | tr[t[f + 36 >> 2]](f, e, A)) >>> 0 < A >>> 0) break e;
                                        r = r - A | 0, i = t[f + 20 >> 2];
                                        break r
                                    }a = e,
                                    A = 0
                                }
                                ee(i, a, r),
                                t[f + 20 >> 2] = t[f + 20 >> 2] + r,
                                i = r + A | 0
                            }
                            return i
                        }

                        function De(e, r) {
                            var f, A = 0,
                                i = 0;
                            G = f = G - 16 | 0, n[f + 15 | 0] = 0, se(e, r + 1 | 0, f + 15 | 0);
                            e: {
                                if (A = t[e >> 2] + r | 0, !v[0 | A]) {
                                    if (n[0 | A] = 1, (0 | (A = t[e + 20 >> 2])) == t[e + 24 >> 2]) {
                                        if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                        if (A = A + i | 0, t[e + 24 >> 2] = A, i = Y(t[e + 16 >> 2], A << 2), t[e + 16 >> 2] = i, !i) break e;
                                        A = t[e + 20 >> 2]
                                    } else i = t[e + 16 >> 2];
                                    t[e + 20 >> 2] = A + 1, t[(A << 2) + i >> 2] = r
                                }
                                return void(G = f + 16 | 0)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function Te(e, r, f, A) {
                            t[e + 16 >> 2] = A, t[e + 12 >> 2] = 1855, t[e + 8 >> 2] = f, t[e + 4 >> 2] = r, t[e >> 2] = 2668, 1 & n[10900] || (t[2724] = 0, t[2722] = 0, t[2723] = 0, n[10900] = 1);
                            e: {
                                if ((0 | (A = t[2723])) == t[2724]) {
                                    if ((r = ((0 | (r = A >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (r = r + A | 0, t[2724] = r, r = Y(t[2722], r << 2), t[2722] = r, !r) break e;
                                    A = t[2723]
                                } else r = t[2722];
                                return t[2723] = A + 1,
                                void(t[(A << 2) + r >> 2] = e)
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function Ie(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (f = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (A = (0 | (A = 1 + (r - f | 0) & -2)) > (0 | (i = 2 + (f >> 1 & -2) | 0)) ? A : i)) > (2147483647 ^ f)) break e;
                                        if (f = f + A | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], C(f, 12)), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }(0 | (f = t[e + 4 >> 2])) < (0 | r) && ke(t[e >> 2] + C(f, 12) | 0, 0, C(r - f | 0, 12)), t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function ze(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (f = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (A = (0 | (A = 1 + (r - f | 0) & -2)) > (0 | (i = 2 + (f >> 1 & -2) | 0)) ? A : i)) > (2147483647 ^ f)) break e;
                                        if (f = f + A | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], f), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }(0 | (f = t[e + 4 >> 2])) < (0 | r) && ke(f + t[e >> 2] | 0, 0, r - f | 0), t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function je(e, r, f, A) {
                            n[e + 53 | 0] = 1;
                            e: if (t[e + 4 >> 2] == (0 | f)) {
                                n[e + 52 | 0] = 1;
                                r: {
                                    if (!(f = t[e + 16 >> 2])) {
                                        if (t[e + 36 >> 2] = 1, t[e + 24 >> 2] = A, t[e + 16 >> 2] = r, 1 != (0 | A)) break e;
                                        if (1 == t[e + 48 >> 2]) break r;
                                        break e
                                    }
                                    if ((0 | r) == (0 | f)) {
                                        if (2 == (0 | (f = t[e + 24 >> 2])) && (t[e + 24 >> 2] = A, f = A), 1 != t[e + 48 >> 2]) break e;
                                        if (1 == (0 | f)) break r;
                                        break e
                                    }
                                    t[e + 36 >> 2] = t[e + 36 >> 2] + 1
                                }
                                n[e + 54 | 0] = 1
                            }
                        }

                        function We(e) {
                            var r = 0;
                            r = 1;
                            e: if ((0 | e) >= 1024) {
                                if (r = 898846567431158e293, e >>> 0 < 2047) {
                                    e = e - 1023 | 0;
                                    break e
                                }
                                r = 1 / 0, e = ((0 | e) >= 3069 ? 3069 : e) - 2046 | 0
                            } else(0 | e) > -1023 || (r = 2004168360008973e-307, e >>> 0 > 4294965304 ? e = e + 969 | 0 : (r = 0, e = ((0 | e) <= -2960 ? -2960 : e) + 1938 | 0));
                            return k(0, 0), k(1, e + 1023 << 20), r * +u()
                        }

                        function Ge(e) {
                            var r = 0,
                                f = 0,
                                A = 0;
                            e: {
                                r: if (3 & (r = e)) {
                                    if (!v[0 | r]) return 0;
                                    for (;;) {
                                        if (!(3 & (r = r + 1 | 0))) break r;
                                        if (!v[0 | r]) break
                                    }
                                    break e
                                }for (; f = r, r = r + 4 | 0, !(~(A = t[f >> 2]) & A - 16843009 & -2139062144););
                                for (; f = (r = f) + 1 | 0, v[0 | r];);
                            }
                            return r - e | 0
                        }

                        function Ee(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0;
                            G = f = G - 16 | 0, r ? (de(f, i = ((A = r >> 31) ^ r) - A | 0, 0, 0, 0, (A = m(i)) + 81 | 0), i = 0 + t[f + 8 >> 2] | 0, A = (65536 ^ t[f + 12 >> 2]) + (16414 - A << 16) | 0, a = -2147483648 & r | (A = i >>> 0 < a >>> 0 ? A + 1 | 0 : A), A = t[f + 4 >> 2], r = t[f >> 2]) : r = 0, t[e >> 2] = r, t[e + 4 >> 2] = A, t[e + 8 >> 2] = i, t[e + 12 >> 2] = a, G = f + 16 | 0
                        }

                        function Se(e, r) {
                            var f = 0,
                                A = 0;
                            e: {
                                if ((A = t[e + 8 >> 2]) >>> 0 < r >>> 0) {
                                    f = A;
                                    r: {
                                        for (;;) {
                                            if (r >>> 0 <= f >>> 0) break r;
                                            if (f = 2 + (((f >>> 1) + (f >>> 3) & -2) + f | 0) | 0, t[e + 8 >> 2] = f, !(f >>> 0 > A >>> 0)) break
                                        }
                                        break e
                                    }
                                    if (!(r = Y(t[e >> 2], f << 2)) & 48 == t[2726]) break e;
                                    t[e >> 2] = r
                                }
                                return
                            }
                            B(0 | Ar(), 1060, 0), s()
                        }

                        function Ue(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0;
                            G = f = G - 16 | 0, r ? (de(f, A = r, 0, 0, 0, 112 - (31 ^ (r = m(r))) | 0), A = 0 + t[f + 8 >> 2] | 0, r = (65536 ^ t[f + 12 >> 2]) + (16414 - r << 16) | 0, a = i >>> 0 > A >>> 0 ? r + 1 | 0 : r, i = t[f + 4 >> 2], r = t[f >> 2]) : r = 0, t[e >> 2] = r, t[e + 4 >> 2] = i, t[e + 8 >> 2] = A, t[e + 12 >> 2] = a, G = f + 16 | 0
                        }

                        function Ze(e, r) {
                            var f, A = 0;
                            G = f = G - 16 | 0, n[f + 15 | 0] = r;
                            e: {
                                if (!(A = t[e + 16 >> 2])) {
                                    if (Oe(e)) break e;
                                    A = t[e + 16 >> 2]
                                }(0 | A) == (0 | (A = t[e + 20 >> 2])) | t[e + 80 >> 2] == (255 & r) ? tr[t[e + 36 >> 2]](e, f + 15 | 0, 1) : (t[e + 20 >> 2] = A + 1, n[0 | A] = r)
                            }
                            G = f + 16 | 0
                        }

                        function Me(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            if (r)
                                for (; a = f = f - 1 | 0, b = (i = e) - Ne(e = be(e, r, 10), A = E, 10, 0) | 48, n[0 | a] = b, i = r >>> 0 > 9, r = A, i;);
                            if (e)
                                for (; r = (e >>> 0) / 10 | 0, n[0 | (f = f - 1 | 0)] = e - C(r, 10) | 48, A = e >>> 0 > 9, e = r, A;);
                            return f
                        }

                        function Fe(e, r) {
                            var f, A, i = 0;
                            if (c(+e), f = 0 | o(1), A = 0 | o(0), 2047 != (0 | (i = f >>> 20 & 2047))) {
                                if (!i) return 0 == e ? i = 0 : (e = Fe(0x10000000000000000 * e, r), i = t[r >> 2] + -64 | 0), t[r >> 2] = i, e;
                                t[r >> 2] = i - 1022, k(0, 0 | A), k(1, -2146435073 & f | 1071644672), e = +u()
                            }
                            return e
                        }

                        function Re(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0;
                            return i = 0, (f = r >>> 20 & 2047) >>> 0 < 1023 || (i = 2, f >>> 0 > 1075 || (A = 31 & (f = 1075 - f | 0), (63 & f) >>> 0 >= 32 ? (f = 1 << A, A = 0) : (f = (a = 1 << A) - 1 & 1 >>> 32 - A, A = a), i = 0, e & (a = A - 1 | 0) | r & f - !A || (i = e & A | r & f ? 1 : 2))), i
                        }

                        function He(e) {
                            var r = 0,
                                f = 0,
                                A = 0;
                            if (n[t[e >> 2]] - 48 >>> 0 >= 10) return 0;
                            for (; A = t[e >> 2], f = -1, r >>> 0 <= 214748364 && (f = (0 | (f = n[0 | A] - 48 | 0)) > (2147483647 ^ (r = C(r, 10))) ? -1 : f + r | 0), t[e >> 2] = A + 1, r = f, n[A + 1 | 0] - 48 >>> 0 < 10;);
                            return r
                        }

                        function Ne(e, r, f, A) {
                            var i, a, n, b, t = 0,
                                o = 0;
                            return b = C(t = f >>> 16 | 0, o = e >>> 16 | 0), t = (65535 & (o = ((n = C(i = 65535 & f, a = 65535 & e)) >>> 16 | 0) + C(o, i) | 0)) + C(t, a) | 0, E = (C(r, f) + b | 0) + C(e, A) + (o >>> 16) + (t >>> 16) | 0, 65535 & n | t << 16
                        }

                        function Ve(e, r, f) {
                            var A;
                            if (!(A = t[e + 16 >> 2])) return t[e + 36 >> 2] = 1, t[e + 24 >> 2] = f, void(t[e + 16 >> 2] = r);
                            e: {
                                if ((0 | r) == (0 | A)) {
                                    if (2 != t[e + 24 >> 2]) break e;
                                    return void(t[e + 24 >> 2] = f)
                                }
                                n[e + 54 | 0] = 1,
                                t[e + 24 >> 2] = 2,
                                t[e + 36 >> 2] = t[e + 36 >> 2] + 1
                            }
                        }

                        function Qe(e, r, f, A, i) {
                            var a;
                            if (G = a = G - 256 | 0, !(73728 & i | (0 | f) <= (0 | A))) {
                                if (ke(a, 255 & r, (f = (A = f - A | 0) >>> 0 < 256) ? A : 256), !f)
                                    for (; fr(e, a, 256), (A = A - 256 | 0) >>> 0 > 255;);
                                fr(e, a, A)
                            }
                            G = a + 256 | 0
                        }

                        function xe(e) {
                            (0 | ((0 | Ke(e, 1, e = Ge(e), 10208)) != (0 | e) ? -1 : 0)) < 0 || (10 == t[2572] || (0 | (e = t[2557])) == t[2556] ? Ze(10208, 10) : (t[2557] = e + 1, n[0 | e] = 10))
                        }

                        function Oe(e) {
                            var r = 0;
                            return r = t[e + 72 >> 2], t[e + 72 >> 2] = r - 1 | r, 8 & (r = t[e >> 2]) ? (t[e >> 2] = 32 | r, -1) : (t[e + 4 >> 2] = 0, t[e + 8 >> 2] = 0, r = t[e + 44 >> 2], t[e + 28 >> 2] = r, t[e + 20 >> 2] = r, t[e + 16 >> 2] = r + t[e + 48 >> 2], 0)
                        }

                        function Xe(e, r, f, A, i, a, n, b, o) {
                            var k;
                            G = k = G - 16 | 0, N(k, r, f, A, i, a, n, b, -2147483648 ^ o), A = t[k >> 2], f = t[k + 4 >> 2], r = t[k + 12 >> 2], t[e + 8 >> 2] = t[k + 8 >> 2], t[e + 12 >> 2] = r, t[e >> 2] = A, t[e + 4 >> 2] = f, G = k + 16 | 0
                        }

                        function Ye(e, r) {
                            var f = 0,
                                A = 0;
                            e: if (!(!(f = v[0 | e]) | (0 | f) != (0 | (A = v[0 | r]))))
                                for (;;) {
                                    if (A = v[r + 1 | 0], !(f = v[e + 1 | 0])) break e;
                                    if (r = r + 1 | 0, e = e + 1 | 0, (0 | f) != (0 | A)) break
                                }
                            return f - A | 0
                        }

                        function Je(e) {
                            var r, f;
                            e: {
                                if (!((e = (r = t[2588]) + (f = e + 7 & -8) | 0) >>> 0 <= r >>> 0 && f)) {
                                    if (e >>> 0 <= or() << 16 >>> 0) break e;
                                    if (0 | z(0 | e)) break e
                                }
                                return t[2726] = 48,
                                -1
                            }
                            return t[2588] = e, r
                        }

                        function Ke(e, r, f, A) {
                            var i;
                            return (0 | (i = C(r, f))) == (0 | (t[A + 76 >> 2], e = pe(e, i, A))) ? r ? f : 0 : (e >>> 0) / (r >>> 0) | 0
                        }

                        function Le(e) {
                            var r = 0;
                            e = e >>> 0 <= 1 ? 1 : e;
                            e: {
                                for (;;) {
                                    if (r = U(e)) break e;
                                    if (!(r = t[3158])) break;
                                    tr[0 | r]()
                                }
                                D(),
                                s()
                            }
                            return r
                        }

                        function qe(e, r, f, A, i, a, n, b, o) {
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = 65535 & i | (o >>> 16 & 32768 | (2147418112 & i) >>> 16) << 16
                        }

                        function _e(e, r, f) {
                            return f ? (0 | e) == (0 | r) ? 1 : !Ye(t[e + 4 >> 2], t[r + 4 >> 2]) : t[e + 4 >> 2] == t[r + 4 >> 2]
                        }

                        function $e(e, r, f) {
                            var A;
                            G = A = G - 16 | 0, t[A + 12 >> 2] = f, ge(e, r, f, 0), G = A + 16 | 0
                        }

                        function er(e) {
                            var r;
                            return (-1 >>> (r = 31 & e) & -2) << r | (-1 << (e = 0 - e & 31) & -2) >>> e
                        }

                        function rr(e) {
                            return e ? 31 - m(e - 1 ^ e) | 0 : 32
                        }

                        function fr(e, r, f) {
                            32 & v[0 | e] || pe(r, f, e)
                        }

                        function Ar() {
                            return U(81) + 80 | 0
                        }

                        function ir(e) {
                            return 0 | (e |= 0)
                        }

                        function ar(e) {
                            V(e |= 0)
                        }

                        function nr(e) {}
                        i(r = v, 1024, "TjdNaW5pc2F0MjBPdXRPZk1lbW9yeUV4Y2VwdGlvbkUAAAAAuCYAAAAEAAB8IENvbmZsaWN0cyB8ICAgICAgICAgIE9SSUdJTkFMICAgICAgICAgfCAgICAgICAgICBMRUFSTlQgICAgICAgICAgfCBQcm9ncmVzcyB8AHwgICAgICAgICAgIHwgICAgVmFycyAgQ2xhdXNlcyBMaXRlcmFscyB8ICAgIExpbWl0ICBDbGF1c2VzIExpdC9DbCB8ICAgICAgICAgIHwAUmFuZG9taXplIHRoZSBpbml0aWFsIGFjdGl2aXR5AGluZmluaXR5AGx1YnkAdmFyLWRlY2F5AGNsYS1kZWNheQBpbWF4AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAcmZpcnN0AHJuZC1pbml0AE1pbmltdW0gbGVhcm50IGNsYXVzZSBsaW1pdABtaW4tbGVhcm50cwAgIC0lcywgLW5vLSVzAFRoZSBjbGF1c2UgYWN0aXZpdHkgZGVjYXkgZmFjdG9yAFRoZSB2YXJpYWJsZSBhY3Rpdml0eSBkZWNheSBmYWN0b3IAUmVzdGFydCBpbnRlcnZhbCBpbmNyZWFzZSBmYWN0b3IAcm5kLWZyZXEAVXNlZCBieSB0aGUgcmFuZG9tIHZhcmlhYmxlIHNlbGVjdGlvbgBpbWluAG5hbgBUaGUgYmFzZSByZXN0YXJ0IGludGVydmFsAHBoYXNlLXNhdmluZwBpbmYAb2ZmAFRoZSBmcmVxdWVuY3kgd2l0aCB3aGljaCB0aGUgZGVjaXNpb24gaGV1cmlzdGljIHRyaWVzIHRvIGNob29zZSBhIHJhbmRvbSB2YXJpYWJsZQBjY21pbi1tb2RlAFVzZSB0aGUgTHVieSByZXN0YXJ0IHNlcXVlbmNlAFRoZSBmcmFjdGlvbiBvZiB3YXN0ZWQgbWVtb3J5IGFsbG93ZWQgYmVmb3JlIGEgZ2FyYmFnZSBjb2xsZWN0aW9uIGlzIHRyaWdnZXJlZABybmQtc2VlZAAlNGQAcmluYwBnYy1mcmFjACAgLSUtMTJzID0gJS04cyBbAE5BTgBJTkYAQ09SRQA8Ym9vbD4APGRvdWJsZT4APGludDMyPgA9PT09PT09PT09PT09PT09PT09PT09PT09PT09WyBTZWFyY2ggU3RhdGlzdGljcyBdPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09AD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0ALgBDb250cm9scyBjb25mbGljdCBjbGF1c2UgbWluaW1pemF0aW9uICgwPW5vbmUsIDE9YmFzaWMsIDI9ZGVlcCkAKG51bGwpAENvbnRyb2xzIHRoZSBsZXZlbCBvZiBwaGFzZSBzYXZpbmcgKDA9bm9uZSwgMT1saW1pdGVkLCAyPWZ1bGwpAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQhACAuLiAAfCAlOWQgfCAlN2QgJThkICU4ZCB8ICU4ZCAlOGQgJTYuMGYgfCAlNi4zZiAlJSB8CgB8ICBHYXJiYWdlIGNvbGxlY3Rpb246ICAgJTEyZCBieXRlcyA9PiAlMTJkIGJ5dGVzICAgICAgICAgICAgIHwKAAogICAgICAgICVzCgBFUlJPUiEgdmFsdWUgPCVzPiBpcyB0b28gc21hbGwgZm9yIG9wdGlvbiAiJXMiLgoARVJST1IhIHZhbHVlIDwlcz4gaXMgdG9vIGxhcmdlIGZvciBvcHRpb24gIiVzIi4KAChkZWZhdWx0OiAlcykKACAgLSUtMTJzID0gJS04cyAlYyU0LjJnIC4uICU0LjJnJWMgKGRlZmF1bHQ6ICVnKQoAXSAoZGVmYXVsdDogJWQpCgAAAAAAAAQKAAACAAAAAwAAAAQAAABON01pbmlzYXQ2U29sdmVyRQAAALgmAADwCQAAAAAAAFgKAAAFAAAABgAAAAcAAAAIAAAATjdNaW5pc2F0MTJEb3VibGVPcHRpb25FAE43TWluaXNhdDZPcHRpb25FAAC4JgAAPQoAAOAmAAAkCgAAUAoAAAAAAABQCgAABQAAAAkAAAAKAAAACgAAAAAAAACsCgAABQAAAAsAAAAMAAAADQAAAE43TWluaXNhdDlJbnRPcHRpb25FAAAAAOAmAACUCgAAUAoAAAAAAADoCgAABQAAAA4AAAAPAAAAEAAAAE43TWluaXNhdDEwQm9vbE9wdGlvbkUAAOAmAADQCgAAUAoAAAAAAAD+gitlRxVnQAAAAAAAADhDAAD6/kIudr86O568mvcMvb39/////98/PFRVVVVVxT+RKxfPVVWlPxfQpGcREYE/AAAAAAAAyELvOfr+Qi7mPyTEgv+9v84/tfQM1whrrD/MUEbSq7KDP4Q6Tpvg11U/"), i(r, 2934, "8D9uv4gaTzubPDUz+6k99u8/XdzYnBNgcbxhgHc+muzvP9FmhxB6XpC8hX9u6BXj7z8T9mc1UtKMPHSFFdOw2e8/+o75I4DOi7ze9t0pa9DvP2HI5mFO92A8yJt1GEXH7z+Z0zNb5KOQPIPzxso+vu8/bXuDXaaalzwPiflsWLXvP/zv/ZIatY4890dyK5Ks7z/RnC9wPb4+PKLR0zLso+8/C26QiTQDarwb0/6vZpvvPw69LypSVpW8UVsS0AGT7z9V6k6M74BQvMwxbMC9iu8/FvTVuSPJkbzgLamumoLvP69VXOnj04A8UY6lyJh67z9Ik6XqFRuAvHtRfTy4cu8/PTLeVfAfj7zqjYw4+WrvP79TEz+MiYs8dctv61tj7z8m6xF2nNmWvNRcBITgW+8/YC86PvfsmjyquWgxh1TvP504hsuC54+8Hdn8IlBN7z+Nw6ZEQW+KPNaMYog7Ru8/fQTksAV6gDyW3H2RST/vP5SoqOP9jpY8OGJ1bno47z99SHTyGF6HPD+msk/OMe8/8ucfmCtHgDzdfOJlRSvvP14IcT97uJa8gWP14d8k7z8xqwlt4feCPOHeH/WdHu8/+r9vGpshPbyQ2drQfxjvP7QKDHKCN4s8CwPkpoUS7z+Py86JkhRuPFYvPqmvDO8/tquwTXVNgzwVtzEK/gbvP0x0rOIBQoY8MdhM/HAB7z9K+NNdOd2PPP8WZLII/O4/BFuOO4Cjhrzxn5JfxfbuP2hQS8ztSpK8y6k6N6fx7j+OLVEb+AeZvGbYBW2u7O4/0jaUPujRcbz3n+U02+fuPxUbzrMZGZm85agTwy3j7j9tTCqnSJ+FPCI0Ekym3u4/imkoemASk7wcgKwERdruP1uJF0iPp1i8Ki73IQrW7j8bmklnmyx8vJeoUNn10e4/EazCYO1jQzwtiWFgCM7uP+9kBjsJZpY8VwAd7UHK7j95A6Ha4cxuPNA8wbWixu4/MBIPP47/kzze09fwKsPuP7CvervOkHY8Jyo21dq/7j934FTrvR2TPA3d/ZmyvO4/jqNxADSUj7ynLJ12srnuP0mjk9zM3oe8QmbPotq27j9fOA+9xt54vIJPnVYrtO4/9lx77EYShrwPkl3KpLHuP47X/RgFNZM82ie1Nkev7j8Fm4ovt5h7PP3Hl9QSre4/CVQc4uFjkDwpVEjdB6vuP+rGGVCFxzQ8t0ZZiiap7j81wGQr5jKUPEghrRVvp+4/n3aZYUrkjLwJ3Ha54aXuP6hN7zvFM4y8hVU6sH6k7j+u6SuJeFOEvCDDzDRGo+4/WFhWeN3Ok7wlIlWCOKLuP2QZfoCqEFc8c6lM1FWh7j8oIl6/77OTvM07f2aeoO4/grk0h60Sary/2gt1EqDuP+6pbbjvZ2O8LxplPLKf7j9RiOBUPdyAvISUUfl9n+4/zz5afmQfeLx0X+zodZ/uP7B9i8BK7oa8dIGlSJqf7j+K5lUeMhmGvMlnQlbrn+4/09QJXsuckDw/Xd5PaaDuPx2lTbncMnu8hwHrcxSh7j9rwGdU/eyUPDLBMAHtoe4/VWzWq+HrZTxiTs8286LuP0LPsy/FoYi8Eho+VCek7j80NzvxtmmTvBPOTJmJpe4/Hv8ZOoRegLytxyNGGqfuP25XcthQ1JS87ZJEm9mo7j8Aig5bZ62QPJlmitnHqu4/tOrwwS+3jTzboCpC5azuP//nxZxgtmW8jES1FjKv7j9EX/NZg/Z7PDZ3FZmuse4/gz0epx8Jk7zG/5ELW7TuPykebIu4qV285cXNsDe37j9ZuZB8+SNsvA9SyMtEuu4/qvn0IkNDkrxQTt6fgr3uP0uOZtdsyoW8ugfKcPHA7j8nzpEr/K9xPJDwo4KRxO4/u3MK4TXSbTwjI+MZY8juP2MiYiIExYe8ZeVde2bM7j/VMeLjhhyLPDMtSuyb0O4/Fbu809G7kbxdJT6yA9XuP9Ix7pwxzJA8WLMwE57Z7j+zWnNuhGmEPL/9eVVr3u4/tJ2Ol83fgrx689O/a+PuP4czy5J3Gow8rdNamZ/o7j/62dFKj3uQvGa2jSkH7u4/uq7cVtnDVbz7FU+4ovPuP0D2pj0OpJC8OlnljXL57j80k6049NZovEde+/J2/+4/NYpYa+LukbxKBqEwsAXvP83dXwrX/3Q80sFLkB4M7z+smJL6+72RvAke11vCEu8/swyvMK5uczycUoXdmxnvP5T9n1wy4448etD/X6sg7z+sWQnRj+CEPEvRVy7xJ+8/ZxpOOK/NYzy15waUbS/vP2gZkmwsa2c8aZDv3CA37z/StcyDGIqAvPrDXVULP+8/b/r/P12tj7x8iQdKLUfvP0mpdTiuDZC88okNCIdP7z+nBz2mhaN0PIek+9wYWO8/DyJAIJ6RgryYg8kW42DvP6ySwdVQWo48hTLbA+Zp7z9LawGsWTqEPGC0AfMhc+8/Hz60ByHVgrxfm3szl3zvP8kNRzu5Kom8KaH1FEaG7z/TiDpgBLZ0PPY/i+cukO8/cXKdUezFgzyDTMf7UZrvP/CR048S94+82pCkoq+k7z99dCPimK6NvPFnji1Ir+8/CCCqQbzDjjwnWmHuG7rvPzLrqcOUK4Q8l7prNyvF7z/uhdExqWSKPEBFblt20O8/7eM75Lo3jrwUvpyt/dvvP53NkU07iXc82JCegcHn7z+JzGBBwQVTPPFxjyvC8+8/ADj6/kIu5j8wZ8eTV/MuPQAAAAAAAOC/YFVVVVVV5b8GAAAAAADgP05VWZmZmek/eqQpVVVV5b/pRUibW0nyv8M/JosrAPA/AAAAAACg9j8="), i(r, 5057, "yLnygizWv4BWNygktPo8AAAAAACA9j8="), i(r, 5089, "CFi/vdHVvyD34NgIpRy9AAAAAABg9j8="), i(r, 5121, "WEUXd3bVv21QttWkYiO9AAAAAABA9j8="), i(r, 5153, "+C2HrRrVv9VnsJ7khOa8AAAAAAAg9j8="), i(r, 5185, "eHeVX77Uv+A+KZNpGwS9AAAAAAAA9j8="), i(r, 5217, "YBzCi2HUv8yETEgv2BM9AAAAAADg9T8="), i(r, 5249, "qIaGMATUvzoLgu3zQtw8AAAAAADA9T8="), i(r, 5281, "SGlVTKbTv2CUUYbGsSA9AAAAAACg9T8="), i(r, 5313, "gJia3UfTv5KAxdRNWSU9AAAAAACA9T8="), i(r, 5345, "IOG64ujSv9grt5keeyY9AAAAAABg9T8="), i(r, 5377, "iN4TWonSvz+wz7YUyhU9AAAAAABg9T8="), i(r, 5409, "iN4TWonSvz+wz7YUyhU9AAAAAABA9T8="), i(r, 5441, "eM/7QSnSv3baUygkWha9AAAAAAAg9T8="), i(r, 5473, "mGnBmMjRvwRU52i8rx+9AAAAAAAA9T8="), i(r, 5505, "qKurXGfRv/CogjPGHx89AAAAAADg9D8="), i(r, 5537, "SK75iwXRv2ZaBf3EqCa9AAAAAADA9D8="), i(r, 5569, "kHPiJKPQvw4D9H7uawy9AAAAAACg9D8="), i(r, 5601, "0LSUJUDQv38t9J64NvC8AAAAAACg9D8="), i(r, 5633, "0LSUJUDQv38t9J64NvC8AAAAAACA9D8="), i(r, 5665, "QF5tGLnPv4c8masqVw09AAAAAABg9D8="), i(r, 5697, "YNzLrfDOvySvhpy3Jis9AAAAAABA9D8="), i(r, 5729, "8CpuByfOvxD/P1RPLxe9AAAAAAAg9D8="), i(r, 5761, "wE9rIVzNvxtoyruRuiE9AAAAAAAA9D8="), i(r, 5793, "oJrH94/MvzSEn2hPeSc9AAAAAAAA9D8="), i(r, 5825, "oJrH94/MvzSEn2hPeSc9AAAAAADg8z8="), i(r, 5857, "kC10hsLLv4+3izGwThk9AAAAAADA8z8="), i(r, 5889, "wIBOyfPKv2aQzT9jTro8AAAAAACg8z8="), i(r, 5921, "sOIfvCPKv+rBRtxkjCW9AAAAAACg8z8="), i(r, 5953, "sOIfvCPKv+rBRtxkjCW9AAAAAACA8z8="), i(r, 5985, "UPScWlLJv+PUwQTZ0Sq9AAAAAABg8z8="), i(r, 6017, "0CBloH/Ivwn623+/vSs9AAAAAABA8z8="), i(r, 6049, "4BACiavHv1hKU3KQ2ys9AAAAAABA8z8="), i(r, 6081, "4BACiavHv1hKU3KQ2ys9AAAAAAAg8z8="), i(r, 6113, "0BnnD9bGv2bisqNq5BC9AAAAAAAA8z8="), i(r, 6145, "kKdwMP/FvzlQEJ9Dnh69AAAAAAAA8z8="), i(r, 6177, "kKdwMP/FvzlQEJ9Dnh69AAAAAADg8j8="), i(r, 6209, "sKHj5SbFv49bB5CL3iC9AAAAAADA8j8="), i(r, 6241, "gMtsK03Evzx4NWHBDBc9AAAAAADA8j8="), i(r, 6273, "gMtsK03Evzx4NWHBDBc9AAAAAACg8j8="), i(r, 6305, "kB4g/HHDvzpUJ02GePE8AAAAAACA8j8="), i(r, 6337, "8B/4UpXCvwjEcRcwjSS9AAAAAABg8j8="), i(r, 6369, "YC/VKrfBv5ajERikgC69AAAAAABg8j8="), i(r, 6401, "YC/VKrfBv5ajERikgC69AAAAAABA8j8="), i(r, 6433, "kNB8ftfAv/Rb6IiWaQo9AAAAAABA8j8="), i(r, 6465, "kNB8ftfAv/Rb6IiWaQo9AAAAAAAg8j8="), i(r, 6497, "4Nsxkey/v/Izo1xUdSW9AAAAAAAA8j8="), i(r, 6530, "K24HJ76/PADwKiw0Kj0AAAAAAADyPw=="), i(r, 6562, "K24HJ76/PADwKiw0Kj0AAAAAAODxPw=="), i(r, 6593, "wFuPVF68vwa+X1hXDB29AAAAAADA8T8="), i(r, 6625, "4Eo6bZK6v8iqW+g1OSU9AAAAAADA8T8="), i(r, 6657, "4Eo6bZK6v8iqW+g1OSU9AAAAAACg8T8="), i(r, 6689, "oDHWRcO4v2hWL00pfBM9AAAAAACg8T8="), i(r, 6721, "oDHWRcO4v2hWL00pfBM9AAAAAACA8T8="), i(r, 6753, "YOWK0vC2v9pzM8k3lya9AAAAAABg8T8="), i(r, 6785, "IAY/Bxu1v1dexmFbAh89AAAAAABg8T8="), i(r, 6817, "IAY/Bxu1v1dexmFbAh89AAAAAABA8T8="), i(r, 6849, "4BuW10Gzv98T+czaXiw9AAAAAABA8T8="), i(r, 6881, "4BuW10Gzv98T+czaXiw9AAAAAAAg8T8="), i(r, 6913, "gKPuNmWxvwmjj3ZefBQ9AAAAAAAA8T8="), i(r, 6945, "gBHAMAqvv5GONoOeWS09AAAAAAAA8T8="), i(r, 6977, "gBHAMAqvv5GONoOeWS09AAAAAADg8D8="), i(r, 7009, "gBlx3UKrv0xw1uV6ghw9AAAAAADg8D8="), i(r, 7041, "gBlx3UKrv0xw1uV6ghw9AAAAAADA8D8="), i(r, 7073, "wDL2WHSnv+6h8jRG/Cy9AAAAAADA8D8="), i(r, 7105, "wDL2WHSnv+6h8jRG/Cy9AAAAAACg8D8="), i(r, 7137, "wP65h56jv6r+JvW3AvU8AAAAAACg8D8="), i(r, 7169, "wP65h56jv6r+JvW3AvU8AAAAAACA8D8="), i(r, 7202, "eA6bgp+/5Al+fCaAKb0AAAAAAIDwPw=="), i(r, 7234, "eA6bgp+/5Al+fCaAKb0AAAAAAGDwPw=="), i(r, 7265, "gNUHG7mXvzmm+pNUjSi9AAAAAABA8D8="), i(r, 7298, "/LCowI+/nKbT9nwe37wAAAAAAEDwPw=="), i(r, 7330, "/LCowI+/nKbT9nwe37wAAAAAACDwPw=="), i(r, 7362, "EGsq4H+/5EDaDT/iGb0AAAAAACDwPw=="), i(r, 7394, "EGsq4H+/5EDaDT/iGb0AAAAAAADwPw=="), i(r, 7446, "8D8="), i(r, 7477, "wO8/"), i(r, 7490, "iXUVEIA/6CudmWvHEL0AAAAAAIDvPw=="), i(r, 7521, "gJNYViCQP9L34gZb3CO9AAAAAABA7z8="), i(r, 7554, "ySglSZg/NAxaMrqgKr0AAAAAAADvPw=="), i(r, 7585, "QOeJXUGgP1PX8VzAEQE9AAAAAADA7j8="), i(r, 7618, "LtSuZqQ/KP29dXMWLL0AAAAAAIDuPw=="), i(r, 7649, "wJ8UqpSoP30mWtCVeRm9AAAAAABA7j8="), i(r, 7681, "wN3Nc8usPwco2EfyaBq9AAAAAAAg7j8="), i(r, 7713, "wAbAMequP3s7yU8+EQ69AAAAAADg7T8="), i(r, 7745, "YEbRO5exP5ueDVZdMiW9AAAAAACg7T8="), i(r, 7777, "4NGn9b2zP9dO26VeyCw9AAAAAABg7T8="), i(r, 7809, "oJdNWum1Px4dXTwGaSy9AAAAAABA7T8="), i(r, 7841, "wOoK0wC3PzLtnamNHuw8AAAAAAAA7T8="), i(r, 7873, "QFldXjO5P9pHvTpcESM9AAAAAADA7D8="), i(r, 7905, "YK2NyGq7P+Vo9yuAkBO9AAAAAACg7D8="), i(r, 7937, "QLwBWIi8P9OsWsbRRiY9AAAAAABg7D8="), i(r, 7969, "IAqDOce+P+BF5q9owC29AAAAAABA7D8="), i(r, 8001, "4Ns5kei/P/0KoU/WNCW9AAAAAAAA7D8="), i(r, 8033, "4CeCjhfBP/IHLc547yE9AAAAAADg6z8="), i(r, 8065, "8CN+K6rBPzSZOESOpyw9AAAAAACg6z8="), i(r, 8097, "gIYMYdHCP6G0gctsnQM9AAAAAACA6z8="), i(r, 8129, "kBWw/GXDP4lySyOoL8Y8AAAAAABA6z8="), i(r, 8161, "sDODPZHEP3i2/VR5gyU9AAAAAAAg6z8="), i(r, 8193, "sKHk5SfFP8d9aeXoMyY9AAAAAADg6j8="), i(r, 8225, "EIy+TlfGP3guPCyLzxk9AAAAAADA6j8="), i(r, 8257, "cHWLEvDGP+EhnOWNESW9AAAAAACg6j8="), i(r, 8289, "UESFjYnHPwVDkXAQZhy9AAAAAABg6j8="), i(r, 8322, "Oeuvvsg/0SzpqlQ9B70AAAAAAEDqPw=="), i(r, 8354, "99xaWsk/b/+gWCjyBz0AAAAAAADqPw=="), i(r, 8385, "4Io87ZPKP2khVlBDcii9AAAAAADg6T8="), i(r, 8417, "0FtX2DHLP6rhrE6NNQy9AAAAAADA6T8="), i(r, 8449, "4Ds4h9DLP7YSVFnESy29AAAAAACg6T8="), i(r, 8481, "EPDG+2/MP9IrlsVy7PG8AAAAAABg6T8="), i(r, 8513, "kNSwPbHNPzWwFfcq/yq9AAAAAABA6T8="), i(r, 8545, "EOf/DlPOPzD0QWAnEsI8AAAAAAAg6T8="), i(r, 8578, "3eSt9c4/EY67ZRUhyrwAAAAAAADpPw=="), i(r, 8609, "sLNsHJnPPzDfDMrsyxs9AAAAAADA6D8="), i(r, 8641, "WE1gOHHQP5FO7RbbnPg8AAAAAACg6D8="), i(r, 8673, "YGFnLcTQP+nqPBaLGCc9AAAAAACA6D8="), i(r, 8705, "6CeCjhfRPxzwpWMOISy9AAAAAABg6D8="), i(r, 8737, "+KzLXGvRP4EWpffNmis9AAAAAABA6D8="), i(r, 8769, "aFpjmb/RP7e9R1Htpiw9AAAAAAAg6D8="), i(r, 8801, "uA5tRRTSP+q6Rrrehwo9AAAAAADg5z8="), i(r, 8833, "kNx88L7SP/QEUEr6nCo9AAAAAADA5z8="), i(r, 8865, "YNPh8RTTP7g8IdN64ii9AAAAAACg5z8="), i(r, 8897, "EL52Z2vTP8h38bDNbhE9AAAAAACA5z8="), i(r, 8929, "MDN3UsLTP1y9BrZUOxg9AAAAAABg5z8="), i(r, 8961, "6NUjtBnUP53gkOw25Ag9AAAAAABA5z8="), i(r, 8993, "yHHCjXHUP3XWZwnOJy+9AAAAAAAg5z8="), i(r, 9025, "MBee4MnUP6TYChuJIC69AAAAAAAA5z8="), i(r, 9057, "oDgHriLVP1nHZIFwvi49AAAAAADg5j8="), i(r, 9089, "0MhT93vVP+9AXe7trR89AAAAAADA5j8="), i(r, 9121, "YFnfvdXVP9xlpAgqCwq9UCc="), i(r, 9152, "0XSeAFedvSqAcFIP//8+JwoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///AAAAAAAAAAAZAAoAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkAEQoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQ=="), i(r, 9313, "DgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAO"), i(r, 9371, "DA=="), i(r, 9383, "EwAAAAATAAAAAAkMAAAAAAAMAAAM"), i(r, 9429, "EA=="), i(r, 9441, "DwAAAAQPAAAAAAkQAAAAAAAQAAAQ"), i(r, 9487, "Eg=="), i(r, 9499, "EQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoa"), i(r, 9554, "GgAAABoaGgAAAAAAAAk="), i(r, 9603, "FA=="), i(r, 9615, "FwAAAAAXAAAAAAkUAAAAAAAUAAAU"), i(r, 9661, "Fg=="), i(r, 9673, "FQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGTjEwX19jeHhhYml2MTE2X19zaGltX3R5cGVfaW5mb0UAAAAA4CYAAPAlAABEJwAATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAAAA4CYAACAmAAAUJgAATjEwX19jeHhhYml2MTE3X19wYmFzZV90eXBlX2luZm9FAAAA4CYAAFAmAAAUJgAATjEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mb0UA4CYAAIAmAAB0JgAAAAAAAEQmAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAAAAAAAoJwAAFwAAAB8AAAAZAAAAGgAAABsAAAAgAAAAIQAAACIAAABOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UAAAAA4CYAAAAnAABEJgAAU3Q5dHlwZV9pbmZvAAAAALgmAAA0Jw=="), i(r, 10064, "BQ=="), i(r, 10076, "EQ=="), i(r, 10100, "EgAAABMAAABgKw=="), i(r, 10124, "Ag=="), i(r, 10140, "//////////8="), i(r, 10208, "BQ=="), i(r, 10220, "FA=="), i(r, 10244, "EgAAABUAAABoKwAAAAQ="), i(r, 10268, "AQ=="), i(r, 10284, "/////wo="), i(r, 10352, "YDEB");
                        var br, tr = (br = [null, function(e) {
                            e |= 0, (e = t[2722]) && (t[2723] = 0, V(e), t[2724] = 0, t[2722] = 0)
                        }, X, function(e) {
                            X(e |= 0), V(e)
                        }, function(e) {
                            var r, f, A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                d = 0;
                            if (G = f = G - 32 | 0, A = t[556 + (e |= 0) >> 2], a = t[e + 548 >> 2], t[f + 16 >> 2] = 0, t[f + 20 >> 2] = 0, t[f + 8 >> 2] = 0, t[f + 12 >> 2] = 0, Se(r = f + 8 | 0, a - A | 0), n[f + 24 | 0] = 0, (0 | (A = t[e + 448 >> 2])) > 0)
                                for (;;) {
                                    if (c = t[e + 444 >> 2] + (o << 2) | 0, a = t[c >> 2], v[a + t[e + 428 >> 2] | 0]) {
                                        if (b = t[e + 412 >> 2] + C(a, 12) | 0, !((0 | (a = t[b + 4 >> 2])) <= 0)) {
                                            for (A = 0, i = 0; k = (u = t[b >> 2]) + (A << 3) | 0, 1 != (3 & t[t[t[e + 456 >> 2] >> 2] + (t[k >> 2] << 2) >> 2]) && (a = u + (i << 3) | 0, u = t[k + 4 >> 2], t[a >> 2] = t[k >> 2], t[a + 4 >> 2] = u, i = i + 1 | 0, a = t[b + 4 >> 2]), (0 | a) > (0 | (A = A + 1 | 0)););
                                            (0 | (A = A - i | 0)) <= 0 || (t[b + 4 >> 2] = a - A)
                                        }
                                        n[t[e + 428 >> 2] + t[c >> 2] | 0] = 0, A = t[e + 448 >> 2]
                                    }
                                    if (!((0 | (o = o + 1 | 0)) < (0 | A))) break
                                }
                            t[e + 444 >> 2] && (t[e + 448 >> 2] = 0);
                            e: {
                                r: {
                                    f: if (!(t[e + 540 >> 2] <= 0)) {
                                        k = 0;
                                        A: {
                                            for (;;) {
                                                i: {
                                                    if (c = (A = t[e + 412 >> 2]) + C(k, 24) | 0, t[c + 4 >> 2] > 0) {
                                                        for (o = 0;;) {
                                                            if (u = t[c >> 2] + (o << 3) | 0, b = t[e + 544 >> 2] + (t[u >> 2] << 2) | 0, 16 & (i = t[b >> 2])) t[u >> 2] = t[b + 4 >> 2];
                                                            else {
                                                                if ((A = l = t[r + 8 >> 2]) >>> 0 < (i = (a = t[r + 4 >> 2]) + (g = 1 + ((d = v[r + 16 | 0] | i >>> 2 & 1) + (i >>> 5 | 0) | 0) | 0) | 0) >>> 0) {
                                                                    for (;;) {
                                                                        if (A >>> 0 < i >>> 0) {
                                                                            if (A = 2 + (((A >>> 1) + (A >>> 3) & -2) + A | 0) | 0, t[r + 8 >> 2] = A, A >>> 0 > l >>> 0) continue;
                                                                            break A
                                                                        }
                                                                        break
                                                                    }
                                                                    if (!(A = Y(t[r >> 2], A << 2)) & 48 == t[2726]) break r;
                                                                    t[r >> 2] = A, i = g + (a = t[r + 4 >> 2]) | 0
                                                                }
                                                                if (t[r + 4 >> 2] = i, i >>> 0 < a >>> 0) break i;
                                                                if (A = 0, i = t[r >> 2] + (a << 2) | 0, l = t[b >> 2], t[i >> 2] = -9 & l | !!(0 | d) << 3, P[b >> 2] > 31)
                                                                    for (; t[4 + ((g = A << 2) + i | 0) >> 2] = t[4 + (b + g | 0) >> 2], (A = A + 1 | 0) >>> 0 < t[b >> 2] >>> 5 >>> 0;);
                                                                d && (A = (A = i) + (i = l >>> 3 & 536870908) | 0, i = i + b | 0, 4 & l ? w[A + 4 >> 2] = w[i + 4 >> 2] : t[A + 4 >> 2] = t[i + 4 >> 2]), t[u >> 2] = a, t[b + 4 >> 2] = a, t[b >> 2] = 16 | t[b >> 2]
                                                            }
                                                            if (!((0 | (o = o + 1 | 0)) < t[c + 4 >> 2])) break
                                                        }
                                                        A = t[e + 412 >> 2]
                                                    }
                                                    if (c = C(k << 1 | 1, 12) + A | 0, t[c + 4 >> 2] > 0)
                                                        for (o = 0;;) {
                                                            if (u = t[c >> 2] + (o << 3) | 0, b = t[e + 544 >> 2] + (t[u >> 2] << 2) | 0, 16 & (i = t[b >> 2])) t[u >> 2] = t[b + 4 >> 2];
                                                            else {
                                                                a: if (!((A = l = t[r + 8 >> 2]) >>> 0 >= (i = (a = t[r + 4 >> 2]) + (g = 1 + ((d = v[r + 16 | 0] | i >>> 2 & 1) + (i >>> 5 | 0) | 0) | 0) | 0) >>> 0)) {
                                                                    for (;;) {
                                                                        if (A >>> 0 >= i >>> 0) {
                                                                            if (!(A = Y(t[r >> 2], A << 2)) & 48 == t[2726]) break r;
                                                                            t[r >> 2] = A, i = g + (a = t[r + 4 >> 2]) | 0;
                                                                            break a
                                                                        }
                                                                        if (A = 2 + (((A >>> 1) + (A >>> 3) & -2) + A | 0) | 0, t[r + 8 >> 2] = A, !(A >>> 0 > l >>> 0)) break
                                                                    }
                                                                    break A
                                                                }if (t[r + 4 >> 2] = i, i >>> 0 < a >>> 0) break i;
                                                                if (A = 0, i = t[r >> 2] + (a << 2) | 0, l = t[b >> 2], t[i >> 2] = -9 & l | !!(0 | d) << 3, P[b >> 2] >= 32)
                                                                    for (; t[4 + ((g = A << 2) + i | 0) >> 2] = t[4 + (b + g | 0) >> 2], (A = A + 1 | 0) >>> 0 < t[b >> 2] >>> 5 >>> 0;);d && (A = (A = i) + (i = l >>> 3 & 536870908) | 0, i = i + b | 0, 4 & l ? w[A + 4 >> 2] = w[i + 4 >> 2] : t[A + 4 >> 2] = t[i + 4 >> 2]),
                                                                t[u >> 2] = a,
                                                                t[b + 4 >> 2] = a,
                                                                t[b >> 2] = 16 | t[b >> 2]
                                                            }
                                                            if (!((0 | (o = o + 1 | 0)) < t[c + 4 >> 2])) break
                                                        }
                                                    if ((0 | (k = k + 1 | 0)) < t[e + 540 >> 2]) continue;
                                                    break f
                                                }
                                                break
                                            }
                                            break r
                                        }
                                        break r
                                    }if (t[e + 284 >> 2] > 0)
                                        for (A = 0;;) {
                                            i = (c = t[e + 396 >> 2]) + (t[t[e + 280 >> 2] + (A << 2) >> 2] << 2 & -8) | 0;
                                            f: if (-1 != (0 | (o = t[i >> 2])))
                                                if (a = t[e + 544 >> 2] + (o << 2) | 0, 16 & v[0 | a]) t[i >> 2] = t[a + 4 >> 2];
                                                else {
                                                    if (k = t[a + 4 >> 2], !((0 | (l = (b = v[(u = k >> 1) + t[e + 332 >> 2] | 0]) ^ 1 & k)) == (0 | (k = v[10368])) & (254 & ~k) >>> 1 | b & k & 2)) break f;
                                                    if (-1 == (0 | (b = t[c + (u << 3) >> 2])) | (0 | b) != (0 | o)) break f;
                                                    l = i, i = ye(r, a), t[l >> 2] = i, t[a + 4 >> 2] = i, t[a >> 2] = 16 | t[a >> 2]
                                                }
                                            if (!((0 | (A = A + 1 | 0)) < t[e + 284 >> 2])) break
                                        }
                                    if (!((0 | (i = t[e + 272 >> 2])) <= 0)) {
                                        for (a = t[e + 268 >> 2], o = 0, A = 0; k = (c = A << 2) + a | 0, b = t[e + 544 >> 2] + (t[k >> 2] << 2) | 0, 1 != (3 & (u = t[b >> 2])) && (16 & u ? t[k >> 2] = t[b + 4 >> 2] : (a = ye(r, b), t[k >> 2] = a, t[b + 4 >> 2] = a, t[b >> 2] = 16 | t[b >> 2], a = t[e + 268 >> 2]), t[(o << 2) + a >> 2] = t[a + c >> 2], o = o + 1 | 0, i = t[e + 272 >> 2]), (0 | i) > (0 | (A = A + 1 | 0)););
                                        (0 | (A = A - o | 0)) <= 0 || (t[e + 272 >> 2] = i - A)
                                    }
                                    if (!((0 | (i = t[e + 260 >> 2])) <= 0)) {
                                        for (a = t[e + 256 >> 2], o = 0, A = 0; k = (c = A << 2) + a | 0, b = t[e + 544 >> 2] + (t[k >> 2] << 2) | 0, 1 != (3 & (u = t[b >> 2])) && (16 & u ? t[k >> 2] = t[b + 4 >> 2] : (a = ye(r, b), t[k >> 2] = a, t[b + 4 >> 2] = a, t[b >> 2] = 16 | t[b >> 2], a = t[e + 256 >> 2]), t[(o << 2) + a >> 2] = t[a + c >> 2], o = o + 1 | 0, i = t[e + 260 >> 2]), (0 | i) > (0 | (A = A + 1 | 0)););
                                        (0 | (A = A - o | 0)) <= 0 || (t[e + 260 >> 2] = i - A)
                                    }
                                    break e
                                }
                                B(0 | Ar(), 1060, 0),
                                s()
                            }
                            t[e + 44 >> 2] >= 2 && (A = t[e + 548 >> 2], t[f + 4 >> 2] = t[f + 12 >> 2] << 2, t[f >> 2] = A << 2, G = A = G - 16 | 0, t[A + 12 >> 2] = f, ge(10208, 2265, f, 0), G = A + 16 | 0), n[e + 560 | 0] = v[f + 24 | 0], (A = t[e + 544 >> 2]) && V(A), t[e + 544 >> 2] = t[f + 8 >> 2], t[e + 548 >> 2] = t[f + 12 >> 2], t[e + 552 >> 2] = t[f + 16 >> 2], t[e + 556 >> 2] = t[f + 20 >> 2], G = f + 32 | 0
                        }, ir, ar, function(e, r) {
                            e |= 0;
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                c = 0,
                                g = 0,
                                w = 0,
                                h = 0,
                                B = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                M = 0,
                                R = 0,
                                H = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                X = 0,
                                Y = 0,
                                J = 0,
                                K = 0,
                                L = 0,
                                _ = 0,
                                ee = 0,
                                re = 0,
                                fe = 0;
                            G = f = G - 32 | 0;
                            e: {
                                r: {
                                    f: if (45 == v[0 | (r |= 0)]) {
                                        if (w = r + 1 | 0, r = 0, h = t[e + 4 >> 2], i = v[0 | h])
                                            for (;;) {
                                                if (v[r + w | 0] != (0 | i)) break f;
                                                if (!(i = v[h + (r = r + 1 | 0) | 0])) break
                                            }
                                        if (61 == v[0 | (r = r + w | 0)]) {
                                            for (G = R = (G = fe = G - 16 | 0) - 160 | 0, L = r + 1 | 0, t[R + 60 >> 2] = L, t[R + 20 >> 2] = L, t[R + 24 >> 2] = -1, t[112 + (r = R + 16 | 0) >> 2] = 0, t[r + 116 >> 2] = 0, a = t[r + 44 >> 2] - t[r + 4 >> 2] | 0, t[r + 120 >> 2] = a, t[r + 124 >> 2] = a >> 31, t[r + 104 >> 2] = t[r + 8 >> 2], i = 0, G = S = G - 48 | 0, X = t[2304], Y = t[2301];
                                                (0 | (a = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = $(r) : (t[r + 4 >> 2] = a + 1, w = v[0 | a]), 32 == (0 | w) | w - 9 >>> 0 < 5;);
                                            a = 1;
                                            A: {
                                                i: switch (w - 43 | 0) {
                                                    case 0:
                                                    case 2:
                                                        break i;
                                                    default:
                                                        break A
                                                }
                                                a = 45 == (0 | w) ? -1 : 1,
                                                (0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = $(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])
                                            }
                                            A: {
                                                i: {
                                                    a: {
                                                        for (;;) {
                                                            if (n[i + 1259 | 0] == (32 | w)) {
                                                                if (i >>> 0 > 6 || ((0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = $(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])), 8 != (0 | (i = i + 1 | 0))) continue;
                                                                break a
                                                            }
                                                            break
                                                        }
                                                        if (3 != (0 | i)) {
                                                            if (h = 8 == (0 | i)) break a;
                                                            if (i >>> 0 < 4) break i;
                                                            if (h) break a
                                                        }
                                                        if ((0 | (b = t[r + 116 >> 2])) >= 0 | (0 | b) > 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), !(i >>> 0 < 4))
                                                            for (b = (0 | b) < 0; b || (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), (i = i - 1 | 0) >>> 0 > 3;);
                                                    }
                                                    b = 0,
                                                    G = T = G - 16 | 0,
                                                    l(y(y(0 | a) * y(1 / 0))),
                                                    (r = 2147483647 & (B = o(2))) - 8388608 >>> 0 <= 2130706431 ? (c = r, c <<= 25, a = 1065353216 + (r = r >>> 7 | 0) | 0) : (c = B << 25, a = B >>> 7 | 2147418112, r >>> 0 >= 2139095040 || (c = 0, a = 0, r && (de(T, a = r, 0, 0, 0, (r = m(r)) + 81 | 0), b = t[T >> 2], g = t[T + 4 >> 2], c = t[T + 8 >> 2], a = 65536 ^ t[T + 12 >> 2] | 16265 - r << 16))),
                                                    t[S >> 2] = b,
                                                    t[S + 4 >> 2] = g,
                                                    t[S + 8 >> 2] = c,
                                                    t[S + 12 >> 2] = -2147483648 & B | a,
                                                    G = T + 16 | 0,
                                                    b = t[S + 8 >> 2],
                                                    g = t[S + 12 >> 2],
                                                    c = t[S >> 2],
                                                    D = t[S + 4 >> 2];
                                                    break A
                                                }
                                                i: {
                                                    a: {
                                                        n: if (!i) {
                                                            for (i = 0;;) {
                                                                if (n[i + 1550 | 0] != (32 | w)) break n;
                                                                if (i >>> 0 > 1 || ((0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = $(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])), 3 == (0 | (i = i + 1 | 0))) break
                                                            }
                                                            break a
                                                        }switch (0 | i) {
                                                            case 0:
                                                                if (48 == (0 | w)) {
                                                                    if ((0 | (i = t[r + 4 >> 2])) == t[r + 104 >> 2] ? h = $(r) : (t[r + 4 >> 2] = i + 1, h = v[0 | i]), 88 == (-33 & h)) {
                                                                        w = a, G = i = G - 432 | 0, (0 | (c = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = $(r) : (t[r + 4 >> 2] = c + 1, a = v[0 | c]);
                                                                        n: {
                                                                            b: {
                                                                                for (;;) {
                                                                                    if (48 != (0 | a)) {
                                                                                        if (46 != (0 | a)) break n;
                                                                                        if ((0 | (c = t[r + 4 >> 2])) != t[r + 104 >> 2]) {
                                                                                            t[r + 4 >> 2] = c + 1, a = v[0 | c];
                                                                                            break b
                                                                                        }
                                                                                        break
                                                                                    }(0 | (c = t[r + 4 >> 2])) != t[r + 104 >> 2] ? (A = 1, t[r + 4 >> 2] = c + 1, a = v[0 | c]) : (A = 1, a = $(r))
                                                                                }
                                                                                a = $(r)
                                                                            }
                                                                            if (H = 1, 48 == (0 | a)) {
                                                                                for (; T = (c = T) - 1 | 0, M = M - !c | 0, (0 | (c = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = $(r) : (t[r + 4 >> 2] = c + 1, a = v[0 | c]), 48 == (0 | a););
                                                                                A = 1
                                                                            }
                                                                        }
                                                                        for (c = 0, D = 1073676288;;) {
                                                                            n: {
                                                                                h = a;b: {
                                                                                    if (!((_ = a - 48 | 0) >>> 0 < 10)) {
                                                                                        if ((ee = 46 != (0 | a)) & (h = 32 | a) - 97 >>> 0 > 5) break n;
                                                                                        if (!ee) {
                                                                                            if (H) break n;
                                                                                            H = 1, T = b, M = g;
                                                                                            break b
                                                                                        }
                                                                                    }
                                                                                    a = (0 | a) > 57 ? h - 87 | 0 : _,
                                                                                    (0 | g) <= 0 & b >>> 0 <= 7 | (0 | g) < 0 ? j = a + (j << 4) | 0 : !g & b >>> 0 <= 28 ? (Ee(i + 48 | 0, a), F(i + 32 | 0, W, U, c, D, 0, 0, 0, 1073414144), W = t[i + 32 >> 2], U = t[i + 36 >> 2], c = t[i + 40 >> 2], D = t[i + 44 >> 2], F(i + 16 | 0, t[i + 48 >> 2], t[i + 52 >> 2], t[i + 56 >> 2], t[i + 60 >> 2], W, U, c, D), N(i, t[i + 16 >> 2], t[i + 20 >> 2], t[i + 24 >> 2], t[i + 28 >> 2], B, z, Q, x), Q = t[i + 8 >> 2], x = t[i + 12 >> 2], B = t[i >> 2], z = t[i + 4 >> 2]) : K | !a || (F(i + 80 | 0, W, U, c, D, 0, 0, 0, 1073610752), N(i - -64 | 0, t[i + 80 >> 2], t[i + 84 >> 2], t[i + 88 >> 2], t[i + 92 >> 2], B, z, Q, x), Q = t[i + 72 >> 2], x = t[i + 76 >> 2], K = 1, B = t[i + 64 >> 2], z = t[i + 68 >> 2]),
                                                                                    g = (b = b + 1 | 0) ? g : g + 1 | 0,
                                                                                    A = 1
                                                                                }(0 | (a = t[r + 4 >> 2])) != t[r + 104 >> 2] ? (t[r + 4 >> 2] = a + 1, a = v[0 | a]) : a = $(r);
                                                                                continue
                                                                            }
                                                                            break
                                                                        }
                                                                        if (A) {
                                                                            if ((0 | g) <= 0 & b >>> 0 <= 7 | (0 | g) < 0)
                                                                                for (c = b, D = g; j <<= 4, 8 != (0 | (c = c + 1 | 0)) | (D = c ? D : D + 1 | 0););
                                                                            n: {
                                                                                b: {
                                                                                    t: {
                                                                                        if (80 == (-33 & a)) {
                                                                                            if (c = q(r), D = a = E, c | -2147483648 != (0 | a)) break n;
                                                                                            if (a = (0 | (c = t[r + 116 >> 2])) > 0 ? 1 : (0 | c) >= 0) break t;
                                                                                            break b
                                                                                        }
                                                                                        if (c = 0, D = 0, t[r + 116 >> 2] < 0) break n
                                                                                    }
                                                                                    t[r + 4 >> 2] = t[r + 4 >> 2] - 1
                                                                                }
                                                                                c = 0,
                                                                                D = 0
                                                                            }
                                                                            if (j)
                                                                                if (a = c + ((r = H ? T : b) << 2) | 0, r = (g = (H ? M : g) << 2 | r >>> 30) + D | 0, r = c >>> 0 > a >>> 0 ? r + 1 | 0 : r, b = a - 32 | 0, c = 0 - X | 0, r = (0 | (r = g = r - (a >>> 0 < 32) | 0)) > 0 ? 1 : b >>> 0 > c >>> 0 & (0 | r) >= 0) t[2726] = 68, Ee(i + 160 | 0, w), F(i + 144 | 0, t[i + 160 >> 2], t[i + 164 >> 2], t[i + 168 >> 2], t[i + 172 >> 2], -1, -1, -1, 2147418111), F(i + 128 | 0, t[i + 144 >> 2], t[i + 148 >> 2], t[i + 152 >> 2], t[i + 156 >> 2], -1, -1, -1, 2147418111), B = t[i + 128 >> 2], z = t[i + 132 >> 2], b = t[i + 140 >> 2], r = t[i + 136 >> 2];
                                                                                else if ((0 | g) >= (0 | (c = (r = X - 226 | 0) >> 31)) & r >>> 0 <= b >>> 0 | (0 | c) < (0 | g)) {
                                                                                if ((0 | j) >= 0)
                                                                                    for (; N(i + 416 | 0, B, z, Q, x, 0, 0, 0, -1073807360), N(i + 400 | 0, B, z, Q, x, (r = c = (0 | (r = he(B, z, Q, x, 1073610752))) >= 0) ? t[i + 416 >> 2] : B, r ? t[i + 420 >> 2] : z, r ? t[i + 424 >> 2] : Q, r ? t[i + 428 >> 2] : x), b = (r = b) - 1 | 0, g = g - !r | 0, Q = t[i + 408 >> 2], x = t[i + 412 >> 2], B = t[i + 400 >> 2], z = t[i + 404 >> 2], (0 | (j = c | j << 1)) >= 0;);
                                                                                r = g - ((X >> 31) + (b >>> 0 < X >>> 0) | 0) | 0, (0 | (c = (c = 32 + (b - X | 0) | 0) >>> 0 < Y >>> 0 & (0 | (r = c >>> 0 < 32 ? r + 1 | 0 : r)) <= 0 | (0 | r) < 0 ? (0 | c) > 0 ? c : 0 : Y)) >= 113 ? (Ee(i + 384 | 0, w), T = t[i + 392 >> 2], M = t[i + 396 >> 2], W = t[i + 384 >> 2], U = t[i + 388 >> 2], g = 0, r = 0) : (Pe(i + 352 | 0, We(144 - c | 0)), Ee(i + 336 | 0, w), W = t[i + 336 >> 2], U = t[i + 340 >> 2], T = t[i + 344 >> 2], M = t[i + 348 >> 2], qe(i + 368 | 0, t[i + 352 >> 2], t[i + 356 >> 2], t[i + 360 >> 2], t[i + 364 >> 2], 0, 0, 0, M), I = t[i + 376 >> 2], V = t[i + 380 >> 2], g = t[i + 372 >> 2], r = t[i + 368 >> 2]), Ue(i + 320 | 0, (a = !(1 & j) & !!(0 | le(B, z, Q, x, 0, 0, 0, 0)) & (0 | c) < 32) | j), F(i + 304 | 0, W, U, T, M, t[i + 320 >> 2], t[i + 324 >> 2], t[i + 328 >> 2], t[i + 332 >> 2]), c = r, N(i + 272 | 0, t[i + 304 >> 2], t[i + 308 >> 2], t[i + 312 >> 2], t[i + 316 >> 2], r, g, I, V), F(i + 288 | 0, W, U, T, M, (r = a) ? 0 : B, r ? 0 : z, r ? 0 : Q, r ? 0 : x), N(i + 256 | 0, t[i + 288 >> 2], t[i + 292 >> 2], t[i + 296 >> 2], t[i + 300 >> 2], t[i + 272 >> 2], t[i + 276 >> 2], t[i + 280 >> 2], t[i + 284 >> 2]), Xe(i + 240 | 0, t[i + 256 >> 2], t[i + 260 >> 2], t[i + 264 >> 2], t[i + 268 >> 2], c, g, I, V), le(r = t[i + 240 >> 2], a = t[i + 244 >> 2], c = t[i + 248 >> 2], B = t[i + 252 >> 2], 0, 0, 0, 0) || (t[2726] = 68), oe(i + 224 | 0, r, a, c, B, b), B = t[i + 224 >> 2], z = t[i + 228 >> 2], b = t[i + 236 >> 2], r = t[i + 232 >> 2]
                                                                            } else t[2726] = 68, Ee(i + 208 | 0, w), F(i + 192 | 0, t[i + 208 >> 2], t[i + 212 >> 2], t[i + 216 >> 2], t[i + 220 >> 2], 0, 0, 0, 65536), F(i + 176 | 0, t[i + 192 >> 2], t[i + 196 >> 2], t[i + 200 >> 2], t[i + 204 >> 2], 0, 0, 0, 65536), B = t[i + 176 >> 2], z = t[i + 180 >> 2], b = t[i + 188 >> 2], r = t[i + 184 >> 2];
                                                                            else Pe(i + 112 | 0, 0 * +(0 | w)), B = t[i + 112 >> 2], z = t[i + 116 >> 2], b = t[i + 124 >> 2], r = t[i + 120 >> 2]
                                                                        } else(a = (0 | (b = t[r + 116 >> 2])) > 0 ? 1 : (0 | b) >= 0) && (b = t[r + 4 >> 2], t[r + 4 >> 2] = b - 1, t[r + 4 >> 2] = b - 2, H && (t[r + 4 >> 2] = b - 3)), Pe(i + 96 | 0, 0 * +(0 | w)), B = t[i + 96 >> 2], z = t[i + 100 >> 2], b = t[i + 108 >> 2], r = t[i + 104 >> 2];
                                                                        t[S + 16 >> 2] = B, t[S + 20 >> 2] = z, t[S + 24 >> 2] = r, t[S + 28 >> 2] = b, G = i + 432 | 0, b = t[S + 24 >> 2], g = t[S + 28 >> 2], c = t[S + 16 >> 2], D = t[S + 20 >> 2];
                                                                        break A
                                                                    }
                                                                    t[r + 116 >> 2] < 0 || (t[r + 4 >> 2] = t[r + 4 >> 2] - 1)
                                                                }
                                                                h = r, H = a, i = 0, G = A = G - 8976 | 0, _ = (ee = 0 - X | 0) - Y | 0;
                                                                n: {
                                                                    b: {
                                                                        for (;;) {
                                                                            if (48 != (0 | w)) {
                                                                                if (46 != (0 | w)) break n;
                                                                                if ((0 | (r = t[h + 4 >> 2])) != t[h + 104 >> 2]) {
                                                                                    t[h + 4 >> 2] = r + 1, w = v[0 | r];
                                                                                    break b
                                                                                }
                                                                                break
                                                                            }(0 | (r = t[h + 4 >> 2])) != t[h + 104 >> 2] ? (t[h + 4 >> 2] = r + 1, w = v[0 | r]) : w = $(h), i = 1
                                                                        }
                                                                        w = $(h)
                                                                    }
                                                                    if (K = 1, 48 == (0 | w)) {
                                                                        for (; b = (r = b) - 1 | 0, g = g - !r | 0, (0 | (r = t[h + 4 >> 2])) == t[h + 104 >> 2] ? w = $(h) : (t[h + 4 >> 2] = r + 1, w = v[0 | r]), 48 == (0 | w););
                                                                        i = 1
                                                                    }
                                                                }
                                                                t[A + 784 >> 2] = 0;
                                                                n: {
                                                                    b: {
                                                                        t: {
                                                                            o: {
                                                                                if ((r = 46 == (0 | w)) | (a = w - 48 | 0) >>> 0 <= 9)
                                                                                    for (;;) {
                                                                                        k: {
                                                                                            if (1 & r) {
                                                                                                if (!K) {
                                                                                                    b = c, g = D, K = 1;
                                                                                                    break k
                                                                                                }
                                                                                                r = !i;
                                                                                                break o
                                                                                            }
                                                                                            D = (c = c + 1 | 0) ? D : D + 1 | 0,
                                                                                            (0 | j) <= 2044 ? (V = 48 == (0 | w) ? V : c, r = (A + 784 | 0) + (j << 2) | 0, I && (a = (C(t[r >> 2], 10) + w | 0) - 48 | 0), t[r >> 2] = a, i = 1, I = (r = 9 == (0 | (a = I + 1 | 0))) ? 0 : a, j = r + j | 0) : 48 != (0 | w) && (t[A + 8960 >> 2] = 1 | t[A + 8960 >> 2], V = 18396)
                                                                                        }
                                                                                        if ((0 | (r = t[h + 4 >> 2])) == t[h + 104 >> 2] ? w = $(h) : (t[h + 4 >> 2] = r + 1, w = v[0 | r]), !((r = 46 == (0 | w)) | (a = w - 48 | 0) >>> 0 < 10)) break
                                                                                    }
                                                                                if (b = K ? b : c, g = K ? g : D, !(!i | 69 != (-33 & w))) {
                                                                                    B = q(h), z = r = E, B | -2147483648 != (0 | r) || (B = 0, z = 0, t[h + 116 >> 2] < 0 || (t[h + 4 >> 2] = t[h + 4 >> 2] - 1)), g = g + z | 0, g = (b = b + B | 0) >>> 0 < B >>> 0 ? g + 1 | 0 : g;
                                                                                    break b
                                                                                }
                                                                                if (r = !i, (0 | w) < 0) break t
                                                                            }
                                                                            t[h + 116 >> 2] < 0 || (t[h + 4 >> 2] = t[h + 4 >> 2] - 1)
                                                                        }
                                                                        if (r) {
                                                                            t[2726] = 28, t[h + 112 >> 2] = 0, t[h + 116 >> 2] = 0, r = t[h + 44 >> 2] - t[h + 4 >> 2] | 0, t[h + 120 >> 2] = r, t[h + 124 >> 2] = r >> 31, t[h + 104 >> 2] = t[h + 8 >> 2], b = 0, g = 0, c = 0, r = 0;
                                                                            break n
                                                                        }
                                                                    }
                                                                    if (r = t[A + 784 >> 2])
                                                                        if (c >>> 0 > 9 & (0 | D) >= 0 | (0 | D) > 0 | (0 | b) != (0 | c) | (0 | g) != (0 | D) | (r >>> Y | 0 ? (0 | Y) <= 30 : 0))
                                                                            if ((r = ee >>> 1 | 0) >>> 0 < b >>> 0 & (0 | g) >= 0 | (0 | g) > 0) t[2726] = 68, Ee(A + 96 | 0, H), F(A + 80 | 0, t[A + 96 >> 2], t[A + 100 >> 2], t[A + 104 >> 2], t[A + 108 >> 2], -1, -1, -1, 2147418111), F(A - -64 | 0, t[A + 80 >> 2], t[A + 84 >> 2], t[A + 88 >> 2], t[A + 92 >> 2], -1, -1, -1, 2147418111), b = t[A + 72 >> 2], g = t[A + 76 >> 2], c = t[A + 68 >> 2], r = t[A + 64 >> 2];
                                                                            else if ((a = b >>> 0 < (r = X - 226 | 0) >>> 0) & (0 | g) <= (0 | (r >>= 31)) | (0 | r) > (0 | g)) t[2726] = 68,
                                                                    Ee(A + 144 | 0, H),
                                                                    F(A + 128 | 0, t[A + 144 >> 2], t[A + 148 >> 2], t[A + 152 >> 2], t[A + 156 >> 2], 0, 0, 0, 65536),
                                                                    F(A + 112 | 0, t[A + 128 >> 2], t[A + 132 >> 2], t[A + 136 >> 2], t[A + 140 >> 2], 0, 0, 0, 65536),
                                                                    b = t[A + 120 >> 2],
                                                                    g = t[A + 124 >> 2],
                                                                    c = t[A + 116 >> 2],
                                                                    r = t[A + 112 >> 2];
                                                                    else {
                                                                        if (I) {
                                                                            if ((0 | I) <= 8) {
                                                                                for (h = t[(r = (A + 784 | 0) + (j << 2) | 0) >> 2]; h = C(h, 10), 9 != (0 | (I = I + 1 | 0)););
                                                                                t[r >> 2] = h
                                                                            }
                                                                            j = j + 1 | 0
                                                                        }
                                                                        if (I = b, !((0 | b) < (0 | V) | (0 | V) >= 9 | (0 | b) > 17)) {
                                                                            if (9 == (0 | b)) {
                                                                                Ee(A + 192 | 0, H), Ue(A + 176 | 0, t[A + 784 >> 2]), F(A + 160 | 0, t[A + 192 >> 2], t[A + 196 >> 2], t[A + 200 >> 2], t[A + 204 >> 2], t[A + 176 >> 2], t[A + 180 >> 2], t[A + 184 >> 2], t[A + 188 >> 2]), b = t[A + 168 >> 2], g = t[A + 172 >> 2], c = t[A + 164 >> 2], r = t[A + 160 >> 2];
                                                                                break n
                                                                            }
                                                                            if ((0 | I) <= 8) {
                                                                                Ee(A + 272 | 0, H), Ue(A + 256 | 0, t[A + 784 >> 2]), F(A + 240 | 0, t[A + 272 >> 2], t[A + 276 >> 2], t[A + 280 >> 2], t[A + 284 >> 2], t[A + 256 >> 2], t[A + 260 >> 2], t[A + 264 >> 2], t[A + 268 >> 2]), Ee(A + 224 | 0, t[9200 + (0 - I << 2) >> 2]), Z(A + 208 | 0, t[A + 240 >> 2], t[A + 244 >> 2], t[A + 248 >> 2], t[A + 252 >> 2], t[A + 224 >> 2], t[A + 228 >> 2], t[A + 232 >> 2], t[A + 236 >> 2]), b = t[A + 216 >> 2], g = t[A + 220 >> 2], c = t[A + 212 >> 2], r = t[A + 208 >> 2];
                                                                                break n
                                                                            }
                                                                            if (r = 27 + (C(I, -3) + Y | 0) | 0, !((b = t[A + 784 >> 2]) >>> r | 0 && (0 | r) <= 30)) {
                                                                                Ee(A + 352 | 0, H), Ue(A + 336 | 0, b), F(A + 320 | 0, t[A + 352 >> 2], t[A + 356 >> 2], t[A + 360 >> 2], t[A + 364 >> 2], t[A + 336 >> 2], t[A + 340 >> 2], t[A + 344 >> 2], t[A + 348 >> 2]), Ee(A + 304 | 0, t[9128 + (I << 2) >> 2]), F(A + 288 | 0, t[A + 320 >> 2], t[A + 324 >> 2], t[A + 328 >> 2], t[A + 332 >> 2], t[A + 304 >> 2], t[A + 308 >> 2], t[A + 312 >> 2], t[A + 316 >> 2]), b = t[A + 296 >> 2], g = t[A + 300 >> 2], c = t[A + 292 >> 2], r = t[A + 288 >> 2];
                                                                                break n
                                                                            }
                                                                        }
                                                                        for (; !t[(A + 784 | 0) + ((j = (r = j) - 1 | 0) << 2) >> 2];);
                                                                        if (V = 0, b = (0 | I) % 9 | 0) {
                                                                            if (a = 0, b = (0 | I) < 0 ? b + 9 | 0 : b, r) {
                                                                                for (g = 1e9 / (0 | (c = t[9200 + (0 - b << 2) >> 2])) | 0, w = 0, h = 0; B = (z = w) + (j = ((i = t[(w = (D = A + 784 | 0) + (h << 2) | 0) >> 2]) >>> 0) / (c >>> 0) | 0) | 0, t[w >> 2] = B, a = (B = !B & (0 | a) == (0 | h)) ? a + 1 & 2047 : a, I = B ? I - 9 | 0 : I, w = C(g, i - C(c, j) | 0), (0 | (h = h + 1 | 0)) != (0 | r););
                                                                                w && (t[D + (r << 2) >> 2] = w, r = r + 1 | 0)
                                                                            } else r = 0;
                                                                            I = 9 + (I - b | 0) | 0
                                                                        } else a = 0;
                                                                        for (;;) {
                                                                            w = (A + 784 | 0) + (a << 2) | 0, h = (0 | I) < 36;
                                                                            b: {
                                                                                for (;;) {
                                                                                    if (!h & (36 != (0 | I) | P[w >> 2] >= 10384593)) break b;
                                                                                    for (j = r + 2047 | 0, i = 0; c = r, g = (r = t[(j = (A + 784 | 0) + ((B = 2047 & j) << 2) | 0) >> 2]) << 29, r = D = r >>> 3 | 0, !(g = (b = g + i | 0) >>> 0 < g >>> 0 ? r + 1 | 0 : r) & b >>> 0 < 1000000001 ? i = 0 : b = (r = b) - Ne(i = be(r, g, 1e9), E, 1e9, 0) | 0, t[j >> 2] = b, r = (0 | a) == (0 | B) || b ? c : B, r = (0 | (b = c - 1 & 2047)) != (0 | B) ? c : r, j = B - 1 | 0, (0 | a) != (0 | B););
                                                                                    if (V = V - 29 | 0, r = c, i) break
                                                                                }(0 | (a = a - 1 & 2047)) == (0 | r) && (t[(c = (c = (r + 2046 & 2047) << 2) + (r = A + 784 | 0) | 0) >> 2] = t[c >> 2] | t[r + (b << 2) >> 2], r = b),
                                                                                I = I + 9 | 0,
                                                                                t[(A + 784 | 0) + (a << 2) >> 2] = i;
                                                                                continue
                                                                            }
                                                                            break
                                                                        }
                                                                        b: {
                                                                            t: for (;;) {
                                                                                for (b = r + 1 & 2047, B = (A + 784 | 0) + ((r - 1 & 2047) << 2) | 0;;) {
                                                                                    c = (0 | I) > 45 ? 9 : 1;
                                                                                    o: {
                                                                                        for (;;) {
                                                                                            i = a, h = 0;
                                                                                            k: {
                                                                                                for (;;) {
                                                                                                    if ((0 | (a = i + h & 2047)) != (0 | r) && !((a = t[(A + 784 | 0) + (a << 2) >> 2]) >>> 0 < (g = t[9152 + (h << 2) >> 2]) >>> 0)) {
                                                                                                        if (a >>> 0 > g >>> 0) break k;
                                                                                                        if (4 != (0 | (h = h + 1 | 0))) continue
                                                                                                    }
                                                                                                    break
                                                                                                }
                                                                                                if (36 == (0 | I)) {
                                                                                                    for (b = 0, g = 0, h = 0, c = 0, D = 0;
                                                                                                        (0 | (a = i + h & 2047)) == (0 | r) && (t[780 + (((r = r + 1 & 2047) << 2) + A | 0) >> 2] = 0), Ue(A + 768 | 0, t[(A + 784 | 0) + (a << 2) >> 2]), F(A + 752 | 0, b, g, c, D, 0, 0, 1342177280, 1075633366), N(A + 736 | 0, t[A + 752 >> 2], t[A + 756 >> 2], t[A + 760 >> 2], t[A + 764 >> 2], t[A + 768 >> 2], t[A + 772 >> 2], t[A + 776 >> 2], t[A + 780 >> 2]), c = t[A + 744 >> 2], D = t[A + 748 >> 2], b = t[A + 736 >> 2], g = t[A + 740 >> 2], 4 != (0 | (h = h + 1 | 0)););
                                                                                                    if (Ee(A + 720 | 0, H), F(A + 704 | 0, b, g, c, D, t[A + 720 >> 2], t[A + 724 >> 2], t[A + 728 >> 2], t[A + 732 >> 2]), c = t[A + 712 >> 2], D = t[A + 716 >> 2], b = 0, g = 0, B = t[A + 704 >> 2], z = t[A + 708 >> 2], (0 | (a = (h = (0 | (w = (j = V + 113 | 0) - X | 0)) < (0 | Y)) ? (0 | w) > 0 ? w : 0 : Y)) <= 112) break o;
                                                                                                    break b
                                                                                                }
                                                                                            }
                                                                                            if (V = c + V | 0, a = r, (0 | i) != (0 | r)) break
                                                                                        }
                                                                                        for (D = 1e9 >>> c | 0, w = ~(-1 << c), h = 0, a = i; g = (g = h) + ((z = t[(h = (j = A + 784 | 0) + (i << 2) | 0) >> 2]) >>> c | 0) | 0, t[h >> 2] = g, a = (g = !g & (0 | i) == (0 | a)) ? a + 1 & 2047 : a, I = g ? I - 9 | 0 : I, h = C(D, w & z), (0 | (i = i + 1 & 2047)) != (0 | r););
                                                                                        if (!h) continue;
                                                                                        if ((0 | b) != (0 | a)) {
                                                                                            t[j + (r << 2) >> 2] = h, r = b;
                                                                                            continue t
                                                                                        }
                                                                                        t[B >> 2] = 1 | t[B >> 2];
                                                                                        continue
                                                                                    }
                                                                                    break
                                                                                }
                                                                                break
                                                                            }
                                                                            Pe(A + 656 | 0, We(225 - a | 0)),
                                                                            qe(A + 688 | 0, t[A + 656 >> 2], t[A + 660 >> 2], t[A + 664 >> 2], t[A + 668 >> 2], 0, 0, 0, D),
                                                                            Q = t[A + 696 >> 2],
                                                                            x = t[A + 700 >> 2],
                                                                            W = t[A + 688 >> 2],
                                                                            U = t[A + 692 >> 2],
                                                                            Pe(A + 640 | 0, We(113 - a | 0)),
                                                                            O(A + 672 | 0, B, z, c, D, t[A + 640 >> 2], t[A + 644 >> 2], t[A + 648 >> 2], t[A + 652 >> 2]),
                                                                            Xe(A + 624 | 0, B, z, c, D, b = t[A + 672 >> 2], g = t[A + 676 >> 2], T = t[A + 680 >> 2], M = t[A + 684 >> 2]),
                                                                            N(A + 608 | 0, W, U, Q, x, t[A + 624 >> 2], t[A + 628 >> 2], t[A + 632 >> 2], t[A + 636 >> 2]),
                                                                            c = t[A + 616 >> 2],
                                                                            D = t[A + 620 >> 2],
                                                                            B = t[A + 608 >> 2],
                                                                            z = t[A + 612 >> 2]
                                                                        }
                                                                        if ((0 | (I = i + 4 & 2047)) != (0 | r)) {
                                                                            b: if ((I = t[(A + 784 | 0) + (I << 2) >> 2]) >>> 0 <= 499999999) {
                                                                                if (!I & (i + 5 & 2047) == (0 | r)) break b;
                                                                                Pe(A + 496 | 0, .25 * +(0 | H)), N(A + 480 | 0, b, g, T, M, t[A + 496 >> 2], t[A + 500 >> 2], t[A + 504 >> 2], t[A + 508 >> 2]), T = t[A + 488 >> 2], M = t[A + 492 >> 2], b = t[A + 480 >> 2], g = t[A + 484 >> 2]
                                                                            } else 5e8 == (0 | I) ? (J = +(0 | H), (i + 5 & 2047) != (0 | r) ? (Pe(A + 560 | 0, .75 * J), N(A + 544 | 0, b, g, T, M, t[A + 560 >> 2], t[A + 564 >> 2], t[A + 568 >> 2], t[A + 572 >> 2]), T = t[A + 552 >> 2], M = t[A + 556 >> 2], b = t[A + 544 >> 2], g = t[A + 548 >> 2]) : (Pe(A + 528 | 0, .5 * J), N(A + 512 | 0, b, g, T, M, t[A + 528 >> 2], t[A + 532 >> 2], t[A + 536 >> 2], t[A + 540 >> 2]), T = t[A + 520 >> 2], M = t[A + 524 >> 2], b = t[A + 512 >> 2], g = t[A + 516 >> 2])) : (Pe(A + 592 | 0, .75 * +(0 | H)), N(A + 576 | 0, b, g, T, M, t[A + 592 >> 2], t[A + 596 >> 2], t[A + 600 >> 2], t[A + 604 >> 2]), T = t[A + 584 >> 2], M = t[A + 588 >> 2], b = t[A + 576 >> 2], g = t[A + 580 >> 2]);
                                                                            (0 | a) > 111 || (O(A + 464 | 0, b, g, T, M, 0, 0, 0, 1073676288), le(t[A + 464 >> 2], t[A + 468 >> 2], t[A + 472 >> 2], t[A + 476 >> 2], 0, 0, 0, 0) || (N(A + 448 | 0, b, g, T, M, 0, 0, 0, 1073676288), T = t[A + 456 >> 2], M = t[A + 460 >> 2], b = t[A + 448 >> 2], g = t[A + 452 >> 2]))
                                                                        }
                                                                        N(A + 432 | 0, B, z, c, D, b, g, T, M), Xe(A + 416 | 0, t[A + 432 >> 2], t[A + 436 >> 2], t[A + 440 >> 2], t[A + 444 >> 2], W, U, Q, x), c = t[A + 424 >> 2], D = t[A + 428 >> 2], B = t[A + 416 >> 2], z = t[A + 420 >> 2], (_ - 2 | 0) >= (2147483647 & j) || (t[A + 408 >> 2] = c, t[A + 412 >> 2] = 2147483647 & D, t[A + 400 >> 2] = B, t[A + 404 >> 2] = z, F(A + 384 | 0, B, z, c, D, 0, 0, 0, 1073610752), c = (r = (0 | (W = he(t[A + 400 >> 2], t[A + 404 >> 2], t[A + 408 >> 2], t[A + 412 >> 2], 1081081856))) >= 0) ? t[A + 392 >> 2] : c, D = r ? t[A + 396 >> 2] : D, B = r ? t[A + 384 >> 2] : B, z = r ? t[A + 388 >> 2] : z, b = le(b, g, T, M, 0, 0, 0, 0), (110 + (V = r + V | 0) | 0) <= (0 | _) && !(h & ((0 | a) != (0 | w) | (0 | W) < 0) & !!(0 | b)) || (t[2726] = 68)), oe(A + 368 | 0, B, z, c, D, V), b = t[A + 376 >> 2], g = t[A + 380 >> 2], c = t[A + 372 >> 2], r = t[A + 368 >> 2]
                                                                    } else Ee(A + 48 | 0, H),
                                                                    Ue(A + 32 | 0, r),
                                                                    F(A + 16 | 0, t[A + 48 >> 2], t[A + 52 >> 2], t[A + 56 >> 2], t[A + 60 >> 2], t[A + 32 >> 2], t[A + 36 >> 2], t[A + 40 >> 2], t[A + 44 >> 2]),
                                                                    b = t[A + 24 >> 2],
                                                                    g = t[A + 28 >> 2],
                                                                    c = t[A + 20 >> 2],
                                                                    r = t[A + 16 >> 2];
                                                                    else Pe(A, 0 * +(0 | H)),
                                                                    b = t[A + 8 >> 2],
                                                                    g = t[A + 12 >> 2],
                                                                    c = t[A + 4 >> 2],
                                                                    r = t[A >> 2]
                                                                }
                                                                t[S + 40 >> 2] = b, t[S + 44 >> 2] = g, t[S + 32 >> 2] = r, t[S + 36 >> 2] = c, G = A + 8976 | 0, b = t[S + 40 >> 2], g = t[S + 44 >> 2], c = t[S + 32 >> 2], D = t[S + 36 >> 2];
                                                                break A;
                                                            case 3:
                                                                break a
                                                        }(a = (0 | (a = t[r + 116 >> 2])) > 0 ? 1 : (0 | a) >= 0) && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1),
                                                        t[2726] = 28;
                                                        break i
                                                    }
                                                    if ((0 | (b = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = $(r) : (t[r + 4 >> 2] = b + 1, a = v[0 | b]), 40 != (0 | a)) {
                                                        if (b = 0, g = 2147450880, t[r + 116 >> 2] < 0) break A;
                                                        t[r + 4 >> 2] = t[r + 4 >> 2] - 1;
                                                        break A
                                                    }
                                                    for (i = 1;
                                                        (0 | (b = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = $(r) : (t[r + 4 >> 2] = b + 1, a = v[0 | b]), a - 48 >>> 0 < 10 | a - 65 >>> 0 < 26 | 95 == (0 | a) || !(a - 97 >>> 0 >= 26);) i = i + 1 | 0;
                                                    if (b = 0, g = 2147450880, 41 == (0 | a)) break A;
                                                    if ((0 | (a = t[r + 116 >> 2])) >= 0 | (0 | a) > 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), !i) break A;
                                                    for (;
                                                        (0 | a) > 0 | (0 | a) >= 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), i = i - 1 | 0;);
                                                    break A
                                                }
                                                t[r + 112 >> 2] = 0,
                                                t[r + 116 >> 2] = 0,
                                                a = t[r + 44 >> 2] - t[r + 4 >> 2] | 0,
                                                t[r + 120 >> 2] = a,
                                                t[r + 124 >> 2] = a >> 31,
                                                t[r + 104 >> 2] = t[r + 8 >> 2]
                                            }
                                            t[R >> 2] = c, t[R + 4 >> 2] = D, t[R + 8 >> 2] = b, t[R + 12 >> 2] = g, G = S + 48 | 0, b = t[R + 8 >> 2], a = t[R + 12 >> 2], c = t[R >> 2], B = t[R + 4 >> 2], f + 28 | 0 && (t[f + 28 >> 2] = t[R + 136 >> 2] + ((t[R + 20 >> 2] - t[R + 60 >> 2] | 0) + L | 0)), t[(r = fe) + 8 >> 2] = b, t[r + 12 >> 2] = a, t[r >> 2] = c, t[r + 4 >> 2] = B, G = R + 160 | 0, c = t[r >> 2], b = t[r + 4 >> 2], T = t[r + 8 >> 2], a = r = t[r + 12 >> 2], G = w = G - 32 | 0, B = 2147483647 & r, r = T;
                                            A: if (0 | (g = B - 1140785152 | 0) >>> 0 > (T = B - 1006698496 | 0) >>> 0) {
                                                if (W = r << 4 | b >>> 28, r = a << 4 | r >>> 28, 134217728 == (0 | (b &= 268435455)) & !!(0 | c) | b >>> 0 > 134217728) {
                                                    r = r + 1073741824 | 0, U = (W = W + 1 | 0) ? r : r + 1 | 0;
                                                    break A
                                                }
                                                if (U = r + 1073741824 | 0, c | 134217728 != (0 | b)) break A;
                                                g = U, U = (r = 1 & W) >>> 0 > (W = r + W | 0) >>> 0 ? g + 1 | 0 : g
                                            } else(!r & 2147418112 == (0 | B) ? !(b | c) : B >>> 0 < 2147418112) ? (W = 0, U = 2146435072, B >>> 0 > 1140785151 || (U = 0, (B = B >>> 16 | 0) >>> 0 < 15249 || (de(w + 16 | 0, c, b, r, T = 65535 & a | 65536, B - 15233 | 0), we(w, c, b, r, T, 15361 - B | 0), W = (r = t[w + 8 >> 2]) << 4 | (B = t[w + 4 >> 2]) >>> 28, U = t[w + 12 >> 2] << 4 | r >>> 28, 134217728 == (0 | (r = 268435455 & B)) & !!(0 | (b = t[w >> 2] | !!(t[w + 16 >> 2] | t[w + 24 >> 2] | t[w + 20 >> 2] | t[w + 28 >> 2]))) | r >>> 0 > 134217728 ? (D = U, U = (W = W + 1 | 0) ? D : D + 1 | 0) : b | 134217728 != (0 | r) || (g = U, U = (r = W) >>> 0 > (W = W + (1 & W) | 0) >>> 0 ? g + 1 | 0 : g)))) : (W = r << 4 | b >>> 28, U = 524287 & (D = a << 4 | r >>> 28) | 2146959360);
                                            if (G = w + 32 | 0, G = fe + 16 | 0, r = t[f + 28 >> 2]) {
                                                if (k(0, 0 | W), k(1, -2147483648 & a | U), (J = +u()) >= (re = d[e + 32 >> 3]) & (!v[e + 41 | 0] | J != re)) break r;
                                                if ((re = d[e + 24 >> 3]) >= J & (!v[e + 40 | 0] | J != re)) break e;
                                                d[e + 48 >> 3] = J
                                            }
                                            a = !!(0 | r)
                                        }
                                    }return G = f + 32 | 0,
                                    0 | a
                                }
                                t[f + 20 >> 2] = t[e + 4 >> 2],
                                t[f + 16 >> 2] = L,
                                $e(t[2284], 2392, f + 16 | 0),
                                p(1),
                                s()
                            }
                            t[f + 4 >> 2] = t[e + 4 >> 2], t[f >> 2] = L, $e(t[2284], 2343, f), p(1), s()
                        }, function(e, r) {
                            r |= 0;
                            var f, A, i, a, n = 0,
                                b = 0,
                                o = 0;
                            G = f = G + -64 | 0, n = v[40 + (e |= 0) | 0], b = v[e + 41 | 0], A = d[e + 32 >> 3], o = t[e + 4 >> 2], i = t[e + 16 >> 2], a = d[e + 24 >> 3], d[f + 56 >> 3] = d[e + 48 >> 3], d[f + 40 >> 3] = A, d[f + 32 >> 3] = a, t[f + 48 >> 2] = b ? 93 : 41, t[f + 20 >> 2] = i, t[f + 16 >> 2] = o, t[f + 24 >> 2] = n ? 91 : 40, n = t[2284], G = b = G - 16 | 0, o = f + 16 | 0, t[b + 12 >> 2] = o, ge(n, 2456, o, 22), G = b + 16 | 0, r && (t[f >> 2] = t[e + 8 >> 2], $e(n, 2330, f), Be(10, n)), G = f - -64 | 0
                        }, function(e) {
                            s()
                        }, function() {
                            D(), s()
                        }, ar, function(e, r) {
                            e |= 0;
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0;
                            G = f = G - 32 | 0;
                            e: {
                                r: {
                                    f: if (45 == v[0 | (r |= 0)]) {
                                        if (a = r + 1 | 0, r = 0, n = t[e + 4 >> 2], A = v[0 | n])
                                            for (;;) {
                                                if (v[r + a | 0] != (0 | A)) break f;
                                                if (!(A = v[n + (r = r + 1 | 0) | 0])) break
                                            }
                                        if (61 == v[0 | (r = r + a | 0)]) {
                                            l = f + 28 | 0, o = -2147483648, G = k = G - 16 | 0;
                                            A: if (i = v[0 | (n = r + 1 | 0)]) {
                                                A = n;
                                                i: {
                                                    for (;;) {
                                                        if (!(32 == (0 | (r = i << 24 >> 24)) | r - 9 >>> 0 < 5)) break i;
                                                        if (i = v[A + 1 | 0], A = A + 1 | 0, !i) break
                                                    }
                                                    break A
                                                }
                                                i: switch ((r = v[0 | A]) - 43 | 0) {
                                                    case 0:
                                                    case 2:
                                                        break i;
                                                    default:
                                                        break A
                                                }
                                                c = 45 == (0 | r) ? -1 : 0, A = A + 1 | 0
                                            } else A = n;
                                            for (r = 0;;) {
                                                A: {
                                                    if (!((255 & (i = (a = v[0 | A]) - 48 | 0)) >>> 0 < 10))
                                                        if ((a - 97 & 255) >>> 0 <= 25) i = a - 87 | 0;
                                                        else {
                                                            if ((a - 65 & 255) >>> 0 > 25) break A;
                                                            i = a - 55 | 0
                                                        } if (!((i &= 255) >>> 0 >= 10)) {
                                                        me(k, 10, 0, 0, 0, b, u, 0, 0), a = 1, t[k + 8 >> 2] | t[k + 12 >> 2] || (g = Ne(b, u, 10, 0), -1 == (0 | (P = E)) & ~i >>> 0 < g >>> 0 || (a = P, u = (b = i + g | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, w = 1, a = r)), A = A + 1 | 0, r = a;
                                                        continue
                                                    }
                                                }
                                                break
                                            }
                                            l && (t[l >> 2] = w ? A : n);
                                            A: {
                                                i: {
                                                    if (r) t[2726] = 68,
                                                    b = -2147483648,
                                                    u = 0;
                                                    else if (!u & b >>> 0 < 2147483648) break i;
                                                    if (!c) {
                                                        t[2726] = 68, o = 2147483647;
                                                        break A
                                                    }
                                                    if (!(!u & b >>> 0 <= 2147483648)) {
                                                        t[2726] = 68;
                                                        break A
                                                    }
                                                }
                                                o = (b ^ c) - c | 0
                                            }
                                            if (G = k + 16 | 0, r = t[f + 28 >> 2]) {
                                                if ((0 | o) > t[e + 24 >> 2]) break r;
                                                if ((0 | o) < t[e + 20 >> 2]) break e;
                                                t[e + 28 >> 2] = o
                                            }
                                            i = !!(0 | r)
                                        }
                                    }return G = f + 32 | 0,
                                    0 | i
                                }
                                t[f + 4 >> 2] = t[e + 4 >> 2],
                                t[f >> 2] = n,
                                $e(t[2284], 2392, f),
                                p(1),
                                s()
                            }
                            t[f + 20 >> 2] = t[e + 4 >> 2], t[f + 16 >> 2] = n, $e(t[2284], 2343, f + 16 | 0), p(1), s()
                        }, function(e, r) {
                            r |= 0;
                            var f, A = 0,
                                i = 0;
                            G = f = G - 80 | 0, A = t[4 + (e |= 0) >> 2], t[f + 68 >> 2] = t[e + 16 >> 2], t[f + 64 >> 2] = A, $e(A = t[2284], 1829, f - -64 | 0), -2147483648 != (0 | (i = t[e + 20 >> 2])) ? (t[f + 48 >> 2] = i, $e(A, 1812, f + 48 | 0)) : Ke(1545, 4, 1, A), Ke(2210, 4, 1, A), 2147483647 != (0 | (i = t[e + 24 >> 2])) ? (t[f + 32 >> 2] = i, $e(A, 1812, f + 32 | 0)) : Ke(1293, 4, 1, A), t[f + 16 >> 2] = t[e + 28 >> 2], $e(A, 2506, f + 16 | 0), r && (t[f >> 2] = t[e + 8 >> 2], $e(A, 2330, f), Be(10, A)), G = f + 80 | 0
                        }, ar, function(e, r) {
                            e |= 0;
                            var f = 0,
                                A = 0,
                                i = 0;
                            return 45 == v[0 | (r |= 0)] && (f = 1, A = r + 1 | 0, 110 != v[r + 1 | 0] | 111 != v[r + 2 | 0] || (A = (f = 45 != v[r + 3 | 0]) ? A : r + 4 | 0), Ye(A, t[e + 4 >> 2]) || (n[e + 20 | 0] = f, i = 1)), 0 | i
                        }, function(e, r) {
                            r |= 0;
                            var f, A = 0,
                                i = 0;
                            if (G = f = G - 48 | 0, A = t[4 + (e |= 0) >> 2], t[f + 36 >> 2] = A, t[f + 32 >> 2] = A, $e(A = t[2284], 1383, f + 32 | 0), 16 != (2147483647 & Ge(t[e + 4 >> 2])))
                                for (; Be(32, A), (i = i + 1 | 0) >>> 0 < 32 - (Ge(t[e + 4 >> 2]) << 1) >>> 0;);
                            Be(32, A), t[f + 16 >> 2] = v[e + 20 | 0] ? 1542 : 1597, $e(A, 2441, f + 16 | 0), r && (t[f >> 2] = t[e + 8 >> 2], $e(A, 2330, f), Be(10, A)), G = f + 48 | 0
                        }, function(e) {
                            return 0 | j(t[60 + (e |= 0) >> 2])
                        }, function(e, r, f) {
                            r |= 0, f |= 0;
                            var A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            G = A = G - 32 | 0, i = t[28 + (e |= 0) >> 2], t[A + 16 >> 2] = i, n = t[e + 20 >> 2], t[A + 28 >> 2] = f, t[A + 24 >> 2] = r, r = n - i | 0, t[A + 20 >> 2] = r, n = r + f | 0, o = 2;
                            e: {
                                r: {
                                    r = A + 16 | 0,
                                    (i = 0 | T(t[e + 60 >> 2], 0 | r, 2, A + 12 | 0)) ? (t[2726] = i, i = -1) : i = 0;f: {
                                        if (i) i = r;
                                        else
                                            for (;;) {
                                                if ((0 | (a = t[A + 12 >> 2])) == (0 | n)) break f;
                                                if ((0 | a) < 0) {
                                                    i = r;
                                                    break r
                                                }
                                                if (b = a - ((k = (b = t[r + 4 >> 2]) >>> 0 < a >>> 0) ? b : 0) | 0, t[(i = (k << 3) + r | 0) >> 2] = b + t[i >> 2], t[(r = (k ? 12 : 4) + r | 0) >> 2] = t[r >> 2] - b, n = n - a | 0, r = i, o = o - k | 0, (a = 0 | T(t[e + 60 >> 2], 0 | r, 0 | o, A + 12 | 0)) ? (t[2726] = a, a = -1) : a = 0, a) break
                                            }
                                        if (-1 != (0 | n)) break r
                                    }
                                    r = t[e + 44 >> 2],
                                    t[e + 28 >> 2] = r,
                                    t[e + 20 >> 2] = r,
                                    t[e + 16 >> 2] = r + t[e + 48 >> 2],
                                    e = f;
                                    break e
                                }
                                t[e + 28 >> 2] = 0,
                                t[e + 16 >> 2] = 0,
                                t[e + 20 >> 2] = 0,
                                t[e >> 2] = 32 | t[e >> 2],
                                e = 0,
                                2 != (0 | o) && (e = f - t[i + 4 >> 2] | 0)
                            }
                            return G = A + 32 | 0, 0 | e
                        }, function(e, r, f, A) {
                            var i;
                            return r |= 0, f |= 0, A |= 0, G = i = G - 16 | 0, (e = 0 | I(t[60 + (e |= 0) >> 2], 0 | r, 0 | f, 255 & A, i + 8 | 0)) ? (t[2726] = e, e = -1) : e = 0, G = i + 16 | 0, E = e ? -1 : t[i + 12 >> 2], 0 | (e ? -1 : t[i + 8 >> 2])
                        }, function(e) {
                            return 0
                        }, function(e, r, f, A) {
                            return E = 0, 0
                        }, function(e, r, f, A, i, a) {
                            e |= 0, r = +r, f |= 0, A |= 0, i |= 0, a |= 0;
                            var b, k = 0,
                                u = 0,
                                s = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                y = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0;
                            G = b = G - 560 | 0, t[b + 44 >> 2] = 0, c(+r), k = 0 | o(1), o(0), (0 | k) < 0 ? (D = 1, z = 1308, c(+(r = -r)), k = 0 | o(1), o(0)) : 2048 & i ? (D = 1, z = 1311) : (z = (D = 1 & i) ? 1314 : 1309, W = !D);
                            e: if (2146435072 & ~k) {
                                T = b + 16 | 0;
                                r: {
                                    f: {
                                        A: {
                                            if (r = Fe(r, b + 44 | 0), 0 != (r += r)) {
                                                if (k = t[b + 44 >> 2], t[b + 44 >> 2] = k - 1, 97 != (0 | (I = 32 | a))) break A;
                                                break r
                                            }
                                            if (97 == (0 | (I = 32 | a))) break r;g = t[b + 44 >> 2],
                                            P = (0 | A) < 0 ? 6 : A;
                                            break f
                                        }
                                        g = k - 29 | 0,
                                        t[b + 44 >> 2] = g,
                                        r *= 268435456,
                                        P = (0 | A) < 0 ? 6 : A
                                    }
                                    for (u = y = (b + 48 | 0) + ((0 | g) >= 0 ? 288 : 0) | 0; A = r < 4294967296 & r >= 0 ? ~~r >>> 0 : 0, t[u >> 2] = A, u = u + 4 | 0, 0 != (r = 1e9 * (r - +(A >>> 0))););
                                    if ((0 | g) <= 0) A = g,
                                    k = u,
                                    s = y;
                                    else
                                        for (s = y, A = g;;) {
                                            if (l = (0 | A) >= 29 ? 29 : A, !(s >>> 0 > (k = u - 4 | 0) >>> 0)) {
                                                for (d = 0; A = t[k >> 2], w = 31 & l, j = d, (63 & l) >>> 0 >= 32 ? (d = A << w, A = 0) : (d = (1 << w) - 1 & A >>> 32 - w, A <<= w), d = d + m | 0, S = k, U = (w = j + A | 0) - Ne(d = be(w, A >>> 0 > w >>> 0 ? d + 1 | 0 : d, 1e9), E, 1e9, 0) | 0, t[S >> 2] = U, s >>> 0 <= (k = k - 4 | 0) >>> 0;);
                                                d && (t[(s = s - 4 | 0) >> 2] = d)
                                            }
                                            for (; s >>> 0 < (k = u) >>> 0 && !t[(u = k - 4 | 0) >> 2];);
                                            if (A = t[b + 44 >> 2] - l | 0, t[b + 44 >> 2] = A, u = k, !((0 | A) > 0)) break
                                        }
                                    if ((0 | A) < 0)
                                        for (p = 1 + ((P + 25 >>> 0) / 9 | 0) | 0, m = 102 == (0 | I);;) {
                                            if (w = (0 | (A = 0 - A | 0)) >= 9 ? 9 : A, k >>> 0 <= s >>> 0) u = t[s >> 2];
                                            else {
                                                for (d = 1e9 >>> w | 0, l = ~(-1 << w), A = 0, u = s; j = A, A = t[u >> 2], t[u >> 2] = j + (A >>> w | 0), A = C(d, A & l), (u = u + 4 | 0) >>> 0 < k >>> 0;);
                                                u = t[s >> 2], A && (t[k >> 2] = A, k = k + 4 | 0)
                                            }
                                            if (A = w + t[b + 44 >> 2] | 0, t[b + 44 >> 2] = A, s = (!u << 2) + s | 0, k = k - (u = m ? y : s) >> 2 > (0 | p) ? u + (p << 2) | 0 : k, !((0 | A) < 0)) break
                                        }
                                    if (A = 0, !(k >>> 0 <= s >>> 0 || (A = C(y - s >> 2, 9), u = 10, (l = t[s >> 2]) >>> 0 < 10)))
                                        for (; A = A + 1 | 0, l >>> 0 >= (u = C(u, 10)) >>> 0;);
                                    if ((0 | (u = (P - (102 != (0 | I) ? A : 0) | 0) - (103 == (0 | I) & !!(0 | P)) | 0)) < (C(k - y >> 2, 9) - 9 | 0)) {
                                        if (g = (p = ((b + 48 | 0) + ((0 | g) < 0 ? 4 : 292) | 0) + ((l = (0 | (d = u + 9216 | 0)) / 9 | 0) << 2) | 0) - 4096 | 0, u = 10, (0 | (w = d - C(l, 9) | 0)) <= 7)
                                            for (; u = C(u, 10), 8 != (0 | (w = w + 1 | 0)););
                                        if (!(!(w = (m = t[g >> 2]) - C(u, d = (m >>> 0) / (u >>> 0) | 0) | 0) & (0 | (l = p - 4092 | 0)) == (0 | k)) && (!(1 & d) && (r = 9007199254740992, !(1 & n[p - 4100 | 0]) | 1e9 != (0 | u) | s >>> 0 >= g >>> 0) || (r = 9007199254740994), B = (0 | k) == (0 | l) ? 1 : 1.5, B = (l = u >>> 1 | 0) >>> 0 > w >>> 0 ? .5 : (0 | l) == (0 | w) ? B : 1.5, 45 != v[0 | z] | W || (B = -B, r = -r), l = m - w | 0, t[g >> 2] = l, r + B != r)) {
                                            if (A = u + l | 0, t[g >> 2] = A, A >>> 0 >= 1e9)
                                                for (; t[g >> 2] = 0, (g = g - 4 | 0) >>> 0 < s >>> 0 && (t[(s = s - 4 | 0) >> 2] = 0), A = t[g >> 2] + 1 | 0, t[g >> 2] = A, A >>> 0 > 999999999;);
                                            if (A = C(y - s >> 2, 9), u = 10, !((l = t[s >> 2]) >>> 0 < 10))
                                                for (; A = A + 1 | 0, l >>> 0 >= (u = C(u, 10)) >>> 0;);
                                        }
                                        k = k >>> 0 > (u = g + 4 | 0) >>> 0 ? u : k
                                    }
                                    for (; l = k, !(d = k >>> 0 <= s >>> 0) && !t[(k = k - 4 | 0) >> 2];);
                                    if (103 == (0 | I)) {
                                        if (P = ((k = (0 | (u = P || 1)) > (0 | A) & (0 | A) > -5) ? ~A : -1) + u | 0, a = (k ? -1 : -2) + a | 0, !(g = 8 & i)) {
                                            if (k = -9, !d && (g = t[l - 4 >> 2]) && (w = 10, k = 0, !((g >>> 0) % 10 | 0))) {
                                                for (; u = k, k = k + 1 | 0, !((g >>> 0) % ((w = C(w, 10)) >>> 0) | 0););
                                                k = ~u
                                            }
                                            u = C(l - y >> 2, 9), 70 != (-33 & a) ? (g = 0, P = (0 | (k = (0 | (k = ((A + u | 0) + k | 0) - 9 | 0)) > 0 ? k : 0)) > (0 | P) ? P : k) : (g = 0, P = (0 | (k = (0 | (k = (k + u | 0) - 9 | 0)) > 0 ? k : 0)) > (0 | P) ? P : k)
                                        }
                                    } else g = 8 & i;
                                    if (w = -1, (0 | ((d = g | P) ? 2147483645 : 2147483646)) < (0 | P)) break e;
                                    if (m = 1 + (!!(0 | d) + P | 0) | 0, 70 != (0 | (u = -33 & a))) {
                                        if ((T - (k = Me(((k = A >> 31) ^ A) - k | 0, 0, T)) | 0) <= 1)
                                            for (; n[0 | (k = k - 1 | 0)] = 48, (T - k | 0) < 2;);
                                        if (n[0 | (p = k - 2 | 0)] = a, n[k - 1 | 0] = (0 | A) < 0 ? 45 : 43, (0 | (k = T - p | 0)) > (2147483647 ^ m)) break e
                                    } else {
                                        if ((2147483647 ^ m) < (0 | A)) break e;
                                        k = (0 | A) > 0 ? A : 0
                                    }
                                    if ((0 | (A = k + m | 0)) > (2147483647 ^ D)) break e;Qe(e, 32, f, m = A + D | 0, i),
                                    fr(e, z, D),
                                    Qe(e, 48, f, m, 65536 ^ i);f: {
                                        A: {
                                            i: {
                                                if (70 == (0 | u)) {
                                                    for (A = 8 | (a = b + 16 | 0), g = 9 | a, s = u = s >>> 0 > y >>> 0 ? y : s;;) {
                                                        k = Me(t[s >> 2], 0, g);
                                                        a: if ((0 | u) == (0 | s))(0 | k) == (0 | g) && (n[b + 24 | 0] = 48, k = A);
                                                            else {
                                                                if (b + 16 >>> 0 >= k >>> 0) break a;
                                                                for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                            }
                                                        if (fr(e, k, g - k | 0), !(y >>> 0 >= (s = s + 4 | 0) >>> 0)) break
                                                    }
                                                    if (d && fr(e, 2044, 1), (0 | P) <= 0 | s >>> 0 >= l >>> 0) break i;
                                                    for (;;) {
                                                        if ((k = Me(t[s >> 2], 0, g)) >>> 0 > b + 16 >>> 0)
                                                            for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                        if (fr(e, k, (0 | P) >= 9 ? 9 : P), k = P - 9 | 0, l >>> 0 <= (s = s + 4 | 0) >>> 0) break A;
                                                        if (A = (0 | P) > 9, P = k, !A) break
                                                    }
                                                    break A
                                                }
                                                a: if (!((0 | P) < 0))
                                                    for (y = s >>> 0 < l >>> 0 ? l : s + 4 | 0, A = 8 | (a = b + 16 | 0), l = 9 | a, u = s;;) {
                                                        (0 | l) == (0 | (k = Me(t[u >> 2], 0, l))) && (n[b + 24 | 0] = 48, k = A);
                                                        n: if ((0 | u) == (0 | s)) fr(e, k, 1), k = k + 1 | 0, g | P && fr(e, 2044, 1);
                                                            else {
                                                                if (b + 16 >>> 0 >= k >>> 0) break n;
                                                                for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                            }
                                                        if (fr(e, k, (0 | (a = l - k | 0)) < (0 | P) ? a : P), P = P - a | 0, y >>> 0 <= (u = u + 4 | 0) >>> 0) break a;
                                                        if (!((0 | P) >= 0)) break
                                                    }
                                                Qe(e, 48, P + 18 | 0, 18, 0),
                                                fr(e, p, T - p | 0);
                                                break f
                                            }
                                            k = P
                                        }
                                        Qe(e, 48, k + 9 | 0, 9, 0)
                                    }
                                    Qe(e, 32, f, m, 8192 ^ i),
                                    w = (0 | f) < (0 | m) ? m : f;
                                    break e
                                }
                                if (g = (a << 26 >> 31 & 9) + z | 0, !(A >>> 0 > 11)) {
                                    for (k = 12 - A | 0, B = 16; B *= 16, k = k - 1 | 0;);
                                    r = 45 != v[0 | g] ? r + B - B : -(B + (-r - B))
                                }
                                for ((0 | T) == (0 | (k = Me(((k = t[b + 44 >> 2]) ^ (u = k >> 31)) - u | 0, 0, T))) && (n[b + 15 | 0] = 48, k = b + 15 | 0), y = 2 | D, s = 32 & a, u = t[b + 44 >> 2], n[0 | (P = k - 2 | 0)] = a + 15, n[k - 1 | 0] = (0 | u) < 0 ? 45 : 43, k = 8 & i, u = b + 16 | 0; a = u, l = h(r) < 2147483648 ? ~~r : -2147483648, n[0 | u] = s | v[l + 9696 | 0], !((0 | A) > 0 | k) & 0 == (r = 16 * (r - +(0 | l))) | 1 != ((u = a + 1 | 0) - (b + 16 | 0) | 0) || (n[a + 1 | 0] = 46, u = a + 2 | 0), 0 != r;);
                                w = -1, (2147483645 - (a = (k = T - P | 0) + y | 0) | 0) < (0 | A) || (l = a, s = u - (a = b + 16 | 0) | 0, Qe(e, 32, f, u = l + (A = A && (s - 2 | 0) < (0 | A) ? A + 2 | 0 : s) | 0, i), fr(e, g, y), Qe(e, 48, f, u, 65536 ^ i), fr(e, a, s), Qe(e, 48, A - s | 0, 0, 0), fr(e, P, k), Qe(e, 32, f, u, 8192 ^ i), w = (0 | f) < (0 | u) ? u : f)
                            } else Qe(e, 32, f, k = D + 3 | 0, -65537 & i), fr(e, z, D), A = 32 & a, fr(e, r != r ? A ? 1550 : 1847 : A ? 1593 : 1851, 3), Qe(e, 32, f, k, 8192 ^ i), w = (0 | f) < (0 | k) ? k : f;
                            return G = b + 560 | 0, 0 | w
                        }, ir, ar, nr, nr, function(e, r, f) {
                            f |= 0;
                            var A, i = 0;
                            return G = A = G + -64 | 0, i = 1, _e(e |= 0, r |= 0, 0) || (i = 0, r && (i = 0, (r = fe(r, 9796)) && (ke(A + 12 | 0, 0, 52), t[A + 56 >> 2] = 1, t[A + 20 >> 2] = -1, t[A + 16 >> 2] = e, t[A + 8 >> 2] = r, tr[t[t[r >> 2] + 28 >> 2]](r, A + 8 | 0, t[f >> 2], 1), 1 == (0 | (e = t[A + 32 >> 2])) && (t[f >> 2] = t[A + 24 >> 2]), i = 1 == (0 | e)))), G = A - -64 | 0, 0 | (e = i)
                        }, function(e, r, f, A, i, a) {
                            f |= 0, A |= 0, i |= 0, a |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], a) && je(r, f, A, i)
                        }, function(e, r, f, A, i) {
                            if (f |= 0, A |= 0, i |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], i)) 1 == t[r + 28 >> 2] | t[r + 4 >> 2] != (0 | f) || (t[r + 28 >> 2] = A);
                            else e: if (_e(e, t[r >> 2], i)) {
                                if (!(t[r + 16 >> 2] != (0 | f) & t[r + 20 >> 2] != (0 | f))) {
                                    if (1 != (0 | A)) break e;
                                    return void(t[r + 32 >> 2] = 1)
                                }
                                t[r + 20 >> 2] = f, t[r + 32 >> 2] = A, t[r + 40 >> 2] = t[r + 40 >> 2] + 1, 1 != t[r + 36 >> 2] | 2 != t[r + 24 >> 2] || (n[r + 54 | 0] = 1), t[r + 44 >> 2] = 4
                            }
                        }, function(e, r, f, A) {
                            f |= 0, A |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], 0) && Ve(r, f, A)
                        }, ar, function(e, r, f, A, i, a) {
                            f |= 0, A |= 0, i |= 0, a |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], a) ? je(r, f, A, i) : (e = t[e + 8 >> 2], tr[t[t[e >> 2] + 20 >> 2]](e, r, f, A, i, a))
                        }, function(e, r, f, A, i) {
                            if (f |= 0, A |= 0, i |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], i)) 1 == t[r + 28 >> 2] | t[r + 4 >> 2] != (0 | f) || (t[r + 28 >> 2] = A);
                            else e: {
                                if (_e(e, t[r >> 2], i)) {
                                    if (!(t[r + 16 >> 2] != (0 | f) & t[r + 20 >> 2] != (0 | f))) {
                                        if (1 != (0 | A)) break e;
                                        return void(t[r + 32 >> 2] = 1)
                                    }
                                    t[r + 32 >> 2] = A;
                                    r: if (4 != t[r + 44 >> 2]) {
                                        if (b[r + 52 >> 1] = 0, e = t[e + 8 >> 2], tr[t[t[e >> 2] + 20 >> 2]](e, r, f, f, 1, i), v[r + 53 | 0]) {
                                            if (t[r + 44 >> 2] = 3, !v[r + 52 | 0]) break r;
                                            break e
                                        }
                                        t[r + 44 >> 2] = 4
                                    }
                                    if (t[r + 20 >> 2] = f, t[r + 40 >> 2] = t[r + 40 >> 2] + 1, 1 != t[r + 36 >> 2] | 2 != t[r + 24 >> 2]) break e;
                                    return void(n[r + 54 | 0] = 1)
                                }
                                e = t[e + 8 >> 2],
                                tr[t[t[e >> 2] + 24 >> 2]](e, r, f, A, i)
                            }
                        }, function(e, r, f, A) {
                            f |= 0, A |= 0, _e(e |= 0, t[8 + (r |= 0) >> 2], 0) ? Ve(r, f, A) : (e = t[e + 8 >> 2], tr[t[t[e >> 2] + 28 >> 2]](e, r, f, A))
                        }], br.set = function(e, r) {
                            this[e] = r
                        }, br.get = function(e) {
                            return this[e]
                        }, br);

                        function or() {
                            return a.byteLength / 65536 | 0
                        }
                        return {
                            j: function() {
                                n[10369] = 1, n[10370] = 2, n[10368] = 0, Te(10376, 1273, 1430, 1867), t[2606] = 1717986918, t[2607] = 1072588390, t[2602] = 0, t[2603] = 1072693248, t[2600] = 0, t[2601] = 0, t[2594] = 2580, b[5208] = 0, Te(10432, 1283, 1397, 1867), t[2620] = -652835029, t[2621] = 1072691150, t[2616] = 0, t[2617] = 1072693248, t[2614] = 0, t[2615] = 0, t[2608] = 2580, b[5236] = 0, Te(10488, 1498, 1601, 1867), t[2634] = 0, t[2635] = 0, b[5264] = 257, t[2630] = 0, t[2631] = 1072693248, t[2628] = 0, t[2629] = 0, t[2622] = 2580, Te(10544, 1803, 1507, 1867), t[2648] = -201326592, t[2649] = 1100339651, t[2644] = 0, t[2645] = 2146435072, t[2642] = 0, t[2643] = 0, t[2636] = 2580, b[5292] = 0, Te(10600, 1683, 2046, 1876), t[2657] = 2, t[2655] = 0, t[2656] = 2, t[2650] = 2692, Te(10632, 1580, 2117, 1876), t[2665] = 2, t[2663] = 0, t[2664] = 2, t[2658] = 2692, Te(10664, 1334, 1228, 1860), t[2666] = 2752, n[10684] = 0, Te(10688, 1268, 1694, 1860), n[10708] = 1, t[2672] = 2752, Te(10712, 1327, 1554, 1876), t[2685] = 100, t[2683] = 1, t[2684] = 2147483647, t[2678] = 2692, Te(10744, 1816, 1465, 1867), t[2698] = 0, t[2699] = 1073741824, t[2694] = 0, t[2695] = 2146435072, t[2692] = 0, t[2693] = 1072693248, t[2686] = 2580, b[5392] = 0, Te(10800, 1821, 1724, 1867), t[2712] = -1717986918, t[2713] = 1070176665, t[2708] = 0, t[2709] = 2146435072, t[2706] = 0, t[2707] = 0, t[2700] = 2580, b[5420] = 0, Te(10856, 1371, 1343, 1876), t[2719] = 0, t[2720] = 2147483647, t[2714] = 2692, t[2721] = 0, t[2765] = 10940, t[2747] = 42
                            },
                            k: function() {
                                var e, r, f = 0;
                                return e = Le(688), t[e + 4 >> 2] = 0, t[e + 8 >> 2] = 0, t[e >> 2] = 2532, t[e + 12 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0, t[e + 24 >> 2] = 0, t[e + 32 >> 2] = 0, t[e + 36 >> 2] = 0, t[e + 40 >> 2] = 0, t[e + 44 >> 2] = 0, d[e + 48 >> 3] = d[1303], d[e + 56 >> 3] = d[1310], d[e + 64 >> 3] = d[1317], d[e + 72 >> 3] = d[1324], n[e + 80 | 0] = v[10708], t[e + 84 >> 2] = t[2657], f = t[2665], n[e + 92 | 0] = 0, t[e + 88 >> 2] = f, n[e + 93 | 0] = v[10684], d[e + 96 >> 3] = d[1356], t[e + 104 >> 2] = t[2721], t[e + 108 >> 2] = t[2685], r = d[1349], t[e + 452 >> 2] = 0, t[e + 444 >> 2] = 0, t[e + 448 >> 2] = 0, t[e + 436 >> 2] = 0, t[e + 428 >> 2] = 0, t[e + 432 >> 2] = 0, t[e + 420 >> 2] = 0, t[e + 412 >> 2] = 0, t[e + 416 >> 2] = 0, t[e + 404 >> 2] = 0, t[e + 396 >> 2] = 0, t[e + 400 >> 2] = 0, t[e + 388 >> 2] = 0, t[e + 380 >> 2] = 0, t[e + 384 >> 2] = 0, t[e + 372 >> 2] = 0, t[e + 364 >> 2] = 0, t[e + 368 >> 2] = 0, t[e + 356 >> 2] = 0, t[e + 348 >> 2] = 0, t[e + 352 >> 2] = 0, t[e + 340 >> 2] = 0, t[e + 332 >> 2] = 0, t[e + 336 >> 2] = 0, t[e + 144 >> 2] = 0, t[e + 148 >> 2] = 1073217536, t[e + 136 >> 2] = 100, t[e + 128 >> 2] = -1717986918, t[e + 132 >> 2] = 1072798105, t[e + 120 >> 2] = 1431655765, t[e + 124 >> 2] = 1070945621, d[e + 112 >> 3] = r, ke(e + 152 | 0, 0, 176), t[e + 460 >> 2] = 0, t[e + 464 >> 2] = 0, f = e + 544 | 0, t[e + 456 >> 2] = f, t[e + 468 >> 2] = 0, t[e + 472 >> 2] = 0, t[e + 476 >> 2] = 0, t[e + 480 >> 2] = 0, t[e + 520 >> 2] = 0, t[e + 524 >> 2] = 0, t[e + 512 >> 2] = 0, t[e + 516 >> 2] = -1, t[e + 504 >> 2] = 0, t[e + 508 >> 2] = 1072693248, t[e + 496 >> 2] = 0, t[e + 500 >> 2] = 1072693248, n[e + 492 | 0] = 1, t[e + 488 >> 2] = e + 316, t[e + 528 >> 2] = 0, t[e + 532 >> 2] = 0, t[e + 540 >> 2] = 0, t[e + 544 >> 2] = 0, n[e + 536 | 0] = 1, t[e + 548 >> 2] = 0, t[e + 552 >> 2] = 0, t[e + 556 >> 2] = 0, Se(f, 1048576), t[e + 564 >> 2] = 0, t[e + 568 >> 2] = 0, n[e + 560 | 0] = 0, t[e + 572 >> 2] = 0, t[e + 576 >> 2] = 0, t[e + 580 >> 2] = 0, t[e + 584 >> 2] = 0, t[e + 588 >> 2] = 0, t[e + 592 >> 2] = 0, t[e + 596 >> 2] = 0, t[e + 604 >> 2] = 0, t[e + 608 >> 2] = 0, t[e + 612 >> 2] = 0, t[e + 616 >> 2] = 0, t[e + 620 >> 2] = 0, t[e + 624 >> 2] = 0, t[e + 628 >> 2] = 0, t[e + 632 >> 2] = 0, t[e + 636 >> 2] = 0, t[e + 664 >> 2] = -1, t[e + 668 >> 2] = -1, t[e + 672 >> 2] = -1, t[e + 676 >> 2] = -1, n[e + 680 | 0] = 0, 0 | e
                            },
                            l: function(e) {
                                (e |= 0) && tr[t[t[e >> 2] + 4 >> 2]](e)
                            },
                            m: function(e) {
                                return t[540 + (e |= 0) >> 2]
                            },
                            n: function(e) {
                                return t[208 + (e |= 0) >> 2]
                            },
                            o: function(e, r) {
                                r |= 0, t[88 + (e |= 0) >> 2] = r
                            },
                            p: function(e, r) {
                                r |= 0, n[92 + (e |= 0) | 0] = r
                            },
                            q: function(e, r) {
                                r |= 0, n[93 + (e |= 0) | 0] = r
                            },
                            r: function(e, r) {
                                r = +r, d[72 + (e |= 0) >> 3] = r
                            },
                            s: function(e, r, f) {
                                r |= 0, f |= 0;
                                var A, i = 0,
                                    a = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0,
                                    c = 0,
                                    l = 0,
                                    g = 0;
                                G = A = G - 16 | 0, (0 | (i = t[580 + (e |= 0) >> 2])) > 0 ? (k = t[(t[e + 576 >> 2] + (i << 2) | 0) - 4 >> 2], t[e + 580 >> 2] = i - 1) : (k = t[e + 540 >> 2], t[e + 540 >> 2] = k + 1), Ie(b = e + 412 | 0, a = 1 | (i = k << 1)), o = t[e + 412 >> 2], t[o + C(k, 24) >> 2] && (t[4 + (o + C(i, 12) | 0) >> 2] = 0), n[A + 14 | 0] = 0, se(o = e + 428 | 0, a, A + 14 | 0), Ie(b, i = i + 2 | 0), a = t[e + 412 >> 2] + C(a, 12) | 0, t[a >> 2] && (t[a + 4 >> 2] = 0), n[A + 15 | 0] = 0, se(o, i, A + 15 | 0), i = v[10370], ze(e + 332 | 0, b = k + 1 | 0), n[t[e + 332 >> 2] + k | 0] = i, o = 0;
                                e: {
                                    if ((0 | b) > t[e + 400 >> 2]) {
                                        if (!((0 | (i = t[e + 404 >> 2])) >= (0 | b))) {
                                            if ((0 | (a = (0 | (a = 1 + (b - i | 0) & -2)) > (0 | (u = 2 + (i >> 1 & -2) | 0)) ? a : u)) > (2147483647 ^ i)) break e;
                                            if (i = i + a | 0, t[e + 404 >> 2] = i, i = Y(t[e + 396 >> 2], i << 3), t[e + 396 >> 2] = i, !i && 48 == t[2726]) break e
                                        }
                                        if (!((0 | (a = t[e + 400 >> 2])) >= (0 | b))) {
                                            if (u = b - (i = a) & 3)
                                                for (; l = t[e + 396 >> 2] + (i << 3) | 0, t[l >> 2] = 0, t[l + 4 >> 2] = 0, i = i + 1 | 0, (0 | u) != (0 | (o = o + 1 | 0)););
                                            if (!(a - b >>> 0 >= 4294967293))
                                                for (; o = (a = i << 3) + t[e + 396 >> 2] | 0, t[o >> 2] = 0, t[o + 4 >> 2] = 0, o = a + t[e + 396 >> 2] | 0, t[o + 8 >> 2] = 0, t[o + 12 >> 2] = 0, o = a + t[e + 396 >> 2] | 0, t[o + 16 >> 2] = 0, t[o + 20 >> 2] = 0, a = a + t[e + 396 >> 2] | 0, t[a + 24 >> 2] = 0, t[a + 28 >> 2] = 0, (0 | b) != (0 | (i = i + 4 | 0)););
                                        }
                                        t[e + 400 >> 2] = b
                                    }
                                    if (i = (a = k << 3) + t[e + 396 >> 2] | 0, t[i >> 2] = -1, t[i + 4 >> 2] = 0, v[e + 93 | 0] ? (c = 1389796 * d[e + 72 >> 3], c -= 2147483647 * +(0 | (i = h(g = c / 2147483647) < 2147483648 ? ~~g : -2147483648)), d[e + 72 >> 3] = c, c = c / 2147483647 * 1e-5) : c = 0, (0 | b) > t[e + 320 >> 2]) {
                                        if (!((0 | (i = t[e + 324 >> 2])) >= (0 | b))) {
                                            if ((0 | (o = (0 | (o = 1 + (b - i | 0) & -2)) > (0 | (u = 2 + (i >> 1 & -2) | 0)) ? o : u)) > (2147483647 ^ i)) break e;
                                            if (i = i + o | 0, t[e + 324 >> 2] = i, i = Y(t[e + 316 >> 2], i << 3), t[e + 316 >> 2] = i, !i && 48 == t[2726]) break e
                                        }(0 | (i = t[e + 320 >> 2])) < (0 | b) && ke(t[e + 316 >> 2] + (i << 3) | 0, 0, b - i << 3), t[e + 320 >> 2] = b
                                    }
                                    if (d[a + t[e + 316 >> 2] >> 3] = c, ve(e + 588 | 0, b), n[t[e + 588 >> 2] + k | 0] = 0, ve(e + 348 | 0, b), n[t[e + 348 >> 2] + k | 0] = 1, ze(e + 364 | 0, b), n[t[e + 364 >> 2] + k | 0] = r, ve(e + 380 | 0, b), !((0 | (r = t[e + 288 >> 2])) > (0 | k))) {
                                        if ((0 | (i = (0 | (i = 2 + (k - r | 0) & -2)) > (0 | (a = 2 + (r >> 1 & -2) | 0)) ? i : a)) > (2147483647 ^ r)) break e;
                                        if (r = r + i | 0, t[e + 288 >> 2] = r, r = Y(t[e + 280 >> 2], r << 2), t[e + 280 >> 2] = r, !r && 48 == t[2726]) break e
                                    }
                                    b = t[e + 380 >> 2] + k | 0,
                                    i = v[0 | b];r: {
                                        if (f) {
                                            if (i) break r;
                                            r = 1, a = 0
                                        } else if (r = -1, a = -1, !i) break r;i = a + t[e + 204 >> 2] | 0,
                                        i = (a = r) >>> 0 > (r = t[e + 200 >> 2] + r | 0) >>> 0 ? i + 1 | 0 : i,
                                        t[e + 200 >> 2] = r,
                                        t[e + 204 >> 2] = i
                                    }
                                    return n[0 | b] = f,
                                    !v[t[e + 380 >> 2] + k | 0] | t[e + 476 >> 2] > (0 | k) & t[t[e + 472 >> 2] + (k << 2) >> 2] >= 0 || J(e + 460 | 0, k),
                                    G = A + 16 | 0,
                                    0 | k
                                }
                                B(0 | Ar(), 1060, 0), s()
                            },
                            t: function(e, r, f) {
                                e |= 0, f |= 0;
                                var A, i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0;
                                e: if (!((0 | (r |= 0)) <= 0)) {
                                    r: {
                                        for (;;) {
                                            if (b = t[(a = i << 2) + f >> 2], (0 | i) == (0 | o)) {
                                                if ((o = 2 + (i >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ i) >>> 0) break r;
                                                if (!(n = Y(n, (o = i + o | 0) << 2))) break r
                                            }
                                            if (t[n + a >> 2] = (0 | b) < 0 ? ~b << 1 | 1 : (b << 1) - 2 | 0, (0 | (i = i + 1 | 0)) == (0 | r)) break
                                        }
                                        i = r;
                                        break e
                                    }
                                    B(0 | Ar(), 1060, 0),
                                    s()
                                } t[e + 628 >> 2] && (t[e + 632 >> 2] = 0), ue(A = e + 628 | 0, i);
                                e: {
                                    if (i) {
                                        if (b = t[A >> 2], o = 0, f = 0, i >>> 0 >= 4)
                                            for (u = 2147483644 & i, r = 0; t[(a = f << 2) + b >> 2] = t[n + a >> 2], t[(k = 4 | a) + b >> 2] = t[n + k >> 2], t[(k = 8 | a) + b >> 2] = t[n + k >> 2], t[(a |= 12) + b >> 2] = t[n + a >> 2], f = f + 4 | 0, (0 | u) != (0 | (r = r + 4 | 0)););
                                        if (r = 3 & i)
                                            for (; t[(i = f << 2) + b >> 2] = t[i + n >> 2], f = f + 1 | 0, (0 | r) != (0 | (o = o + 1 | 0)););
                                        i = re(e, A)
                                    } else if (i = re(e, A), !n) break e;V(n)
                                }
                                return 0 | i
                            },
                            u: V,
                            v: function(e, r) {
                                r |= 0;
                                var f = 0,
                                    A = 0,
                                    i = 0;
                                e: {
                                    if ((A = t[628 + (e |= 0) >> 2]) ? (t[e + 632 >> 2] = 0, f = 0) : f = t[e + 632 >> 2], (0 | f) == t[e + 636 >> 2]) {
                                        if ((i = ((0 | (i = f >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break e;
                                        if (f = f + i | 0, t[e + 636 >> 2] = f, A = Y(A, f << 2), t[e + 628 >> 2] = A, !A) break e;
                                        f = t[e + 632 >> 2]
                                    }
                                    return t[e + 632 >> 2] = f + 1,
                                    t[(f << 2) + A >> 2] = (0 | r) < 0 ? ~r << 1 | 1 : (r << 1) - 2 | 0,
                                    0 | re(e, e + 628 | 0)
                                }
                                B(0 | Ar(), 1060, 0), s()
                            },
                            w: function(e) {
                                return t[664 + (e |= 0) >> 2] = -1, t[e + 668 >> 2] = -1, t[e + 672 >> 2] = -1, t[e + 676 >> 2] = -1, t[e + 304 >> 2] && (t[e + 308 >> 2] = 0), 0 | !(255 & S(e))
                            },
                            x: function(e, r, f) {
                                e |= 0, f |= 0;
                                var A = 0,
                                    i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                e: if (!((0 | (r |= 0)) <= 0)) {
                                    r: {
                                        for (;;) {
                                            if (n = t[(i = A << 2) + f >> 2], (0 | A) == (0 | b)) {
                                                if ((b = 2 + (A >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ A) >>> 0) break r;
                                                if (!(a = Y(a, (b = A + b | 0) << 2))) break r
                                            }
                                            if (t[a + i >> 2] = (0 | n) < 0 ? ~n << 1 | 1 : (n << 1) - 2 | 0, (0 | (A = A + 1 | 0)) == (0 | r)) break
                                        }
                                        A = r;
                                        break e
                                    }
                                    B(0 | Ar(), 1060, 0),
                                    s()
                                } t[e + 664 >> 2] = -1, t[e + 668 >> 2] = -1, t[e + 672 >> 2] = -1, t[e + 676 >> 2] = -1, t[e + 304 >> 2] && (t[e + 308 >> 2] = 0), ue(r = e + 304 | 0, A);
                                e: {
                                    if (A) {
                                        if (n = t[r >> 2], b = 0, f = 0, A >>> 0 >= 4)
                                            for (k = 2147483644 & A, r = 0; t[(i = f << 2) + n >> 2] = t[a + i >> 2], t[(o = 4 | i) + n >> 2] = t[a + o >> 2], t[(o = 8 | i) + n >> 2] = t[a + o >> 2], t[(i |= 12) + n >> 2] = t[a + i >> 2], f = f + 4 | 0, (0 | k) != (0 | (r = r + 4 | 0)););
                                        if (r = 3 & A)
                                            for (; t[(A = f << 2) + n >> 2] = t[A + a >> 2], f = f + 1 | 0, (0 | r) != (0 | (b = b + 1 | 0)););
                                        A = !(255 & S(e))
                                    } else if (A = !(255 & S(e)), !a) break e;V(a)
                                }
                                return 0 | A
                            },
                            y: function(e, r, f, A) {
                                r |= 0, f |= 0, A |= 0;
                                var i, a = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0,
                                    c = 0,
                                    l = 0,
                                    g = 0;
                                u = 1, c = ke(Le(a = (i = t[540 + (e |= 0) >> 2]) + 1 | 0), 0, a);
                                e: {
                                    r: {
                                        if (!((0 | r) <= 0)) {
                                            a = 0;
                                            f: {
                                                if (A) {
                                                    for (;;) {
                                                        if (k = t[(g = (l = a << 2) + f | 0) >> 2], (0 | a) == (0 | b)) {
                                                            if ((b = 2 + (a >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                            if (!(o = Y(o, (b = a + b | 0) << 2))) break f
                                                        }
                                                        if (t[o + l >> 2] = (0 | k) < 0 ? ~k << 1 | 1 : (k << 1) - 2 | 0, n[c + t[g >> 2] | 0] = 1, (0 | (a = a + 1 | 0)) == (0 | r)) break
                                                    }
                                                    break r
                                                }
                                                for (;;) {
                                                    if (k = t[(g = (l = a << 2) + f | 0) >> 2], (0 | a) == (0 | b)) {
                                                        if ((b = 2 + (a >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                        if (!(o = Y(o, (b = a + b | 0) << 2))) break f
                                                    }
                                                    if (t[o + l >> 2] = (0 | k) < 0 ? ~k << 1 | 1 : (k << 1) - 2 | 0, n[c - t[g >> 2] | 0] = 1, (0 | (a = a + 1 | 0)) == (0 | r)) break
                                                }
                                                break r
                                            }
                                            break e
                                        }
                                        r = 0
                                    }
                                    if ((0 | i) > 0)
                                        for (;;) {
                                            if (!v[u + c | 0]) {
                                                if ((0 | r) == (0 | b) && !((f = ((0 | (f = b >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 <= (2147483647 ^ b) >>> 0 && (o = Y(o, (b = f + b | 0) << 2)))) break e;
                                                f = A ? 0 - u | 0 : u, t[(r << 2) + o >> 2] = (0 | f) < 0 ? ~f << 1 | 1 : (f << 1) - 2 | 0, r = r + 1 | 0
                                            }
                                            if (f = (0 | u) != (0 | i), u = u + 1 | 0, !f) break
                                        }
                                    V(c),
                                    t[e + 672 >> 2] = -1,
                                    t[e + 676 >> 2] = -1,
                                    t[e + 664 >> 2] = -1,
                                    t[e + 668 >> 2] = -1,
                                    t[e + 304 >> 2] && (t[e + 308 >> 2] = 0),
                                    ue(e + 304 | 0, r);r: {
                                        if ((0 | r) > 0) {
                                            if (f = t[e + 304 >> 2], b = 0, a = 0, r >>> 0 >= 4)
                                                for (c = 2147483644 & r, u = 0; t[(A = a << 2) + f >> 2] = t[A + o >> 2], t[(k = 4 | A) + f >> 2] = t[o + k >> 2], t[(k = 8 | A) + f >> 2] = t[o + k >> 2], t[(A |= 12) + f >> 2] = t[A + o >> 2], a = a + 4 | 0, (0 | c) != (0 | (u = u + 4 | 0)););
                                            if (r &= 3)
                                                for (; t[(A = a << 2) + f >> 2] = t[A + o >> 2], a = a + 1 | 0, (0 | r) != (0 | (b = b + 1 | 0)););
                                            a = !(255 & S(e))
                                        } else if (a = !(255 & S(e)), !o) break r;V(o)
                                    }
                                    return 0 | a
                                }
                                B(0 | Ar(), 1060, 0), s()
                            },
                            z: function(e) {
                                return 0 | R(e |= 0)
                            },
                            A: function(e, r) {
                                return r |= 0, 1 != v[(t[4 + (e |= 0) >> 2] + r | 0) - 1 | 0] | 0
                            },
                            B: function(e, r, f, A) {
                                e |= 0, r |= 0;
                                var i = 0,
                                    a = 0;
                                if (!((0 | (f |= 0)) >= (0 | (A |= 0))) && (i = t[e + 4 >> 2], e = f, A - f & 1 && (t[r >> 2] = 1 != v[f + i | 0], e = f + 1 | 0), (A - 1 | 0) != (0 | f)))
                                    for (; t[(e - f << 2) + r >> 2] = 1 != v[e + i | 0], t[((a = e + 1 | 0) - f << 2) + r >> 2] = 1 != v[i + a | 0], (0 | A) != (0 | (e = e + 2 | 0)););
                            },
                            C: function(e, r, f, A, i) {
                                e |= 0, r |= 0, i |= 0;
                                var a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0;
                                if (!((0 | (f |= 0)) >= (0 | (A |= 0)))) {
                                    if (i = i - f | 0, b = 1 & (a = A - f | 0), e = t[e + 4 >> 2], (A - 1 | 0) != (0 | f))
                                        for (o = -2 & a, a = 0, A = 0; v[e + f | 0] || (t[(a << 2) + r >> 2] = f + i, a = a + 1 | 0), v[e + (n = f + 1 | 0) | 0] || (t[(a << 2) + r >> 2] = i + n, a = a + 1 | 0), f = f + 2 | 0, (0 | o) != (0 | (A = A + 2 | 0)););
                                    else a = 0;
                                    v[e + f | 0] | !b || (t[(a << 2) + r >> 2] = f + i, a = a + 1 | 0)
                                }
                                return 0 | a
                            },
                            D: function(e) {
                                return t[36 + (e |= 0) >> 2]
                            },
                            E: function(e, r, f, A) {
                                r |= 0, f |= 0, A |= 0;
                                var i = 0,
                                    a = 0;
                                if ((0 | (i = t[36 + (e |= 0) >> 2])) > 0)
                                    for (r = A - r | 0, a = t[e + 32 >> 2], A = 0; t[(i = A << 2) + f >> 2] = r + (t[i + a >> 2] >> 1), (0 | (A = A + 1 | 0)) < (0 | (i = t[e + 36 >> 2])););
                                return 0 | i
                            },
                            F: function(e, r) {
                                e |= 0, r |= 0;
                                var f, A, i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                G = f = G - 32 | 0, t[f + 28 >> 2] = 0, t[f + 20 >> 2] = 0, t[f + 24 >> 2] = 0, t[f + 16 >> 2] = 0, t[f + 8 >> 2] = 0, t[f + 12 >> 2] = 0, _(e, f + 20 | 0, f + 8 | 0), e = t[f + 8 >> 2];
                                e: {
                                    r: if ((0 | (A = t[f + 12 >> 2])) > 0) {
                                        if (1 != (0 | A))
                                            for (k = 2147483646 & A; a = (b = t[(i = n << 2) + e >> 2]) >> 1, t[r + i >> 2] = 1 & b ? ~a : a + 1 | 0, i = (b = t[(a = 4 | i) + e >> 2]) >> 1, t[r + a >> 2] = 1 & b ? ~i : i + 1 | 0, n = n + 2 | 0, (0 | k) != (0 | (o = o + 2 | 0)););
                                        if (!(1 & A)) break r;
                                        n = (a = t[(i = n << 2) + e >> 2]) >> 1, t[r + i >> 2] = 1 & a ? ~n : n + 1 | 0
                                    } else if (!e) break e;t[f + 12 >> 2] = 0,
                                    V(e)
                                }
                                return (e = t[f + 20 >> 2]) && (t[f + 24 >> 2] = 0, V(e)), G = f + 32 | 0, 0 | A
                            },
                            G: function(e, r, f, A) {
                                e |= 0, r |= 0, f |= 0, A |= 0;
                                var i, a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                G = i = G - 32 | 0, t[i + 24 >> 2] = 0, t[i + 28 >> 2] = 0;
                                e: {
                                    r: {
                                        f: {
                                            A: {
                                                if ((0 | A) > 0)
                                                    for (;;) {
                                                        if (o = t[(k << 2) + f >> 2], (0 | (a = t[i + 24 >> 2])) == t[i + 28 >> 2]) {
                                                            if ((n = ((0 | (n = a >> 1 & -2)) > 0 ? n : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break A;
                                                            if (n = a + n | 0, t[i + 28 >> 2] = n, !(b = Y(b, n << 2))) break A
                                                        }
                                                        if (t[i + 24 >> 2] = a + 1, t[(a << 2) + b >> 2] = (0 | o) < 0 ? ~o << 1 | 1 : (o << 1) - 2 | 0, (0 | (k = k + 1 | 0)) == (0 | A)) break
                                                    }
                                                if (t[i + 20 >> 2] = b, t[i + 16 >> 2] = 0, t[i + 8 >> 2] = 0, t[i + 12 >> 2] = 0, _(e, i + 20 | 0, i + 8 | 0), e = t[i + 8 >> 2], (0 | (A = t[i + 12 >> 2])) <= 0) break f;
                                                if (f = 0, 1 != (0 | A))
                                                    for (k = 2147483646 & A, b = 0; o = (n = t[(a = f << 2) + e >> 2]) >> 1, t[r + a >> 2] = 1 & n ? ~o : o + 1 | 0, a = (n = t[(o = 4 | a) + e >> 2]) >> 1, t[r + o >> 2] = 1 & n ? ~a : a + 1 | 0, f = f + 2 | 0, (0 | k) != (0 | (b = b + 2 | 0)););
                                                if (!(1 & A)) break r;f = (a = t[(b = f << 2) + e >> 2]) >> 1,
                                                t[r + b >> 2] = 1 & a ? ~f : f + 1 | 0;
                                                break r
                                            }
                                            B(0 | Ar(), 1060, 0),
                                            s()
                                        }
                                        if (!e) break e
                                    }
                                    t[i + 12 >> 2] = 0,
                                    V(e)
                                }
                                return (e = t[i + 20 >> 2]) && (t[i + 24 >> 2] = 0, V(e)), G = i + 32 | 0, 0 | A
                            },
                            H: tr,
                            I: U,
                            J: function() {
                                return 0 | G
                            },
                            K: function(e) {
                                G = e |= 0
                            },
                            L: function(e) {
                                return G = e = G - (e |= 0) & -16, 0 | e
                            },
                            M: function(e) {
                                return (e |= 0) ? 0 | !!(0 | fe(e, 9892)) : 0
                            }
                        }
                    }(e)
                }(e)
            }
            Object.assign(i, b), b = null, i.quit && (t = i.quit), i.wasmBinary && (g = i.wasmBinary);
            var y = Error;
            g = [], "object" != o({}) && U("no native wasm support detected");
            var h, m, B, p, D = !1;

            function T() {
                var e = h.buffer;
                i.HEAP8 = m = new Int8Array(e), i.HEAP16 = new Int16Array(e), i.HEAPU8 = B = new Uint8Array(e), i.HEAPU16 = new Uint16Array(e), i.HEAP32 = new Int32Array(e), i.HEAPU32 = p = new Uint32Array(e), i.HEAPF32 = new Float32Array(e), i.HEAPF64 = new Float64Array(e)
            }
            var I = i.INITIAL_MEMORY || 16777216;
            h = i.wasmMemory ? i.wasmMemory : new function() {
                this.buffer = new ArrayBuffer(I / 65536 * 65536)
            }, T(), I = h.buffer.byteLength;
            var z = [],
                j = [],
                W = [];

            function G() {
                var e = i.preRun.shift();
                z.unshift(e)
            }
            var E = 0,
                S = null;

            function U(e) {
                var r;
                throw null === (r = i.onAbort) || void 0 === r || r.call(i, e), w(e = "Aborted(" + e + ")"), D = !0, e = new y(e + ". Build with -sASSERTIONS for more info."), f(e), e
            }
            var Z, M = function(e) {
                    return e.startsWith("data:application/octet-stream;base64,")
                },
                F = function(e) {
                    return e.startsWith("file://")
                };
            if (!M(Z = "libminisat.wasm")) {
                var R = Z;
                Z = i.locateFile ? i.locateFile(R, s) : s + R
            }

            function H(e) {
                this.name = "ExitStatus", this.message = "Program terminated with exit(".concat(e, ")"), this.status = e
            }
            var N = function(e) {
                    for (; 0 < e.length;) e.shift()(i)
                },
                V = i.noExitRuntime || !0;

            function Q(e) {
                this.H = e - 24, this.P = function(e) {
                    p[this.H + 4 >> 2] = e
                }, this.O = function(e) {
                    p[this.H + 8 >> 2] = e
                }, this.M = function(e, r) {
                    this.N(), this.P(e), this.O(r)
                }, this.N = function() {
                    p[this.H + 16 >> 2] = 0
                }
            }
            var x = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
                O = function(e, r) {
                    for (var f = r + NaN, A = r; e[A] && !(A >= f);) ++A;
                    if (16 < A - r && e.buffer && x) return x.decode(e.subarray(r, A));
                    for (f = ""; r < A;) {
                        var i = e[r++];
                        if (128 & i) {
                            var a = 63 & e[r++];
                            if (192 == (224 & i)) f += String.fromCharCode((31 & i) << 6 | a);
                            else {
                                var n = 63 & e[r++];
                                65536 > (i = 224 == (240 & i) ? (15 & i) << 12 | a << 6 | n : (7 & i) << 18 | a << 12 | n << 6 | 63 & e[r++]) ? f += String.fromCharCode(i) : (i -= 65536, f += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i))
                            }
                        } else f += String.fromCharCode(i)
                    }
                    return f
                },
                X = [null, [],
                    []
                ],
                Y = {
                    b: function(e, r, f) {
                        throw new Q(e).M(r, f), e
                    },
                    d: function() {
                        U("")
                    },
                    i: function(e, r, f) {
                        return B.copyWithin(e, r, r + f)
                    },
                    g: function(e) {
                        var r = B.length;
                        if (2147483648 < (e >>>= 0)) return !1;
                        for (var f = 1; 4 >= f; f *= 2) {
                            var A = r * (1 + .2 / f);
                            A = Math.min(A, e + 100663296);
                            var i = Math;
                            A = Math.max(e, A);
                            e: {
                                i = (i.min.call(i, 2147483648, A + (65536 - A % 65536) % 65536) - h.buffer.byteLength + 65535) / 65536;
                                try {
                                    h.grow(i), T();
                                    var a = 1;
                                    break e
                                } catch (e) {}
                                a = void 0
                            }
                            if (a) return !0
                        }
                        return !1
                    },
                    c: function(e) {
                        var r;
                        V || (null !== (r = i.onExit) && void 0 !== r && r.call(i, e), D = !0), t(e, new H(e))
                    },
                    h: function() {
                        return 52
                    },
                    f: function() {
                        return 70
                    },
                    e: function(e, r, f, A) {
                        for (var i = 0, a = 0; a < f; a++) {
                            var n = p[r >> 2],
                                b = p[r + 4 >> 2];
                            r += 8;
                            for (var t = 0; t < b; t++) {
                                var o = B[n + t],
                                    k = X[e];
                                0 === o || 10 === o ? ((1 === e ? P : w)(O(k, 0)), k.length = 0) : k.push(o)
                            }
                            i += b
                        }
                        return p[A >> 2] = i, 0
                    },
                    a: h
                },
                J = function(e) {
                    function r(e) {
                        var r;
                        return J = e.exports, j.unshift(J.j), E--, null === (r = i.monitorRunDependencies) || void 0 === r || r.call(i, E), 0 == E && S && (e = S, S = null, e()), J
                    }
                    var A = {
                        a: Y
                    };
                    if (E++, null === (e = i.monitorRunDependencies) || void 0 === e || e.call(i, E), i.instantiateWasm) try {
                        return i.instantiateWasm(A, r)
                    } catch (e) {
                        w("Module.instantiateWasm callback failed with error: ".concat(e)), f(e)
                    }
                    return A = function(e) {
                        if (Z == Z && g);
                        else {
                            var r = Z;
                            if (M(r))
                                if (r = r.slice(37), void 0 !== c && c) r = Buffer.from(r, "base64"), r = new Uint8Array(r.buffer, r.byteOffset, r.length);
                                else {
                                    r = atob(r);
                                    for (var f = new Uint8Array(r.length), A = 0; A < r.length; ++A) f[A] = r.charCodeAt(A);
                                    r = f
                                }
                            else r = void 0;
                            if (!r) {
                                if (!n) throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
                                n(Z)
                            }
                        }
                        return r = new d, [new C(e), r]
                    }(A), r(A[0])
                }();
            i._Solver_new = J.k, i._Solver_delete = J.l, i._nVars = J.m, i._nClauses = J.n, i._setPhaseSaving = J.o, i._setRndPol = J.p, i._setRndInitAct = J.q, i._setRndSeed = J.r, i._newVar = J.s, i._addClause = J.t, i._free = J.u, i._addUnit = J.v, i._solve = J.w, i._solve_assumptions = J.x, i._check_complete = J.y, i._simplify = J.z, i._modelValue = J.A, i._fillModel = J.B, i._getModelTrues = J.C, i._conflictSize = J.D, i._unsatCore = J.E, i._getImplies = J.F, i._getImplies_assumptions = J.G, i._malloc = J.I;
            var K, L = J.J,
                q = J.K,
                _ = J.L;

            function $() {
                function r() {
                    if (!K && (K = !0, i.calledRun = !0, !D)) {
                        if (N(j), e(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), i.postRun)
                            for ("function" == typeof i.postRun && (i.postRun = [i.postRun]); i.postRun.length;) {
                                var r = i.postRun.shift();
                                W.unshift(r)
                            }
                        N(W)
                    }
                }
                if (!(0 < E)) {
                    if (i.preRun)
                        for ("function" == typeof i.preRun && (i.preRun = [i.preRun]); i.preRun.length;) G();
                    N(z), 0 < E || (i.setStatus ? (i.setStatus("Running..."), setTimeout((function() {
                        setTimeout((function() {
                            i.setStatus("")
                        }), 1), r()
                    }), 1)) : r())
                }
            }
            if (i.ccall = function(e, r, f, A) {
                    var a = {
                        string: function(e) {
                            var r = 0;
                            if (null != e && 0 !== e) {
                                for (var f = r = 0; f < e.length; ++f) {
                                    var A = e.charCodeAt(f);
                                    127 >= A ? r++ : 2047 >= A ? r += 2 : 55296 <= A && 57343 >= A ? (r += 4, ++f) : r += 3
                                }
                                var i = r + 1;
                                if (f = r = _(i), A = B, 0 < i) {
                                    i = f + i - 1;
                                    for (var a = 0; a < e.length; ++a) {
                                        var n = e.charCodeAt(a);
                                        if (55296 <= n && 57343 >= n && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++a)), 127 >= n) {
                                            if (f >= i) break;
                                            A[f++] = n
                                        } else {
                                            if (2047 >= n) {
                                                if (f + 1 >= i) break;
                                                A[f++] = 192 | n >> 6
                                            } else {
                                                if (65535 >= n) {
                                                    if (f + 2 >= i) break;
                                                    A[f++] = 224 | n >> 12
                                                } else {
                                                    if (f + 3 >= i) break;
                                                    A[f++] = 240 | n >> 18, A[f++] = 128 | n >> 12 & 63
                                                }
                                                A[f++] = 128 | n >> 6 & 63
                                            }
                                            A[f++] = 128 | 63 & n
                                        }
                                    }
                                    A[f] = 0
                                }
                            }
                            return r
                        },
                        array: function(e) {
                            var r = _(e.length);
                            return m.set(e, r), r
                        }
                    };
                    e = i["_" + e];
                    var n, b = [],
                        t = 0;
                    if (A)
                        for (var o = 0; o < A.length; o++) {
                            var k = a[f[o]];
                            k ? (0 === t && (t = L()), b[o] = k(A[o])) : b[o] = A[o]
                        }
                    return f = e.apply(null, b), n = f, 0 !== t && q(t), "string" === r ? n ? O(B, n) : "" : "boolean" === r ? !!n : n
                }, S = function e() {
                    K || $(), K || (S = e)
                }, i.preInit)
                for ("function" == typeof i.preInit && (i.preInit = [i.preInit]); 0 < i.preInit.length;) i.preInit.pop()();
            return $(), A
        });
        e.exports = f
    }(u);
    var c = k(u.exports),
        s = {
            exports: {}
        };
    ! function(e) {
        var r, f = (r = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0, "undefined" != typeof __filename && (r = r || __filename), function() {
            var e, f, A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                i = A;
            i.ready = new Promise((function(r, A) {
                e = r, f = A
            }));
            var a, n, b = Object.assign({}, i),
                t = function(e, r) {
                    throw r
                },
                k = "object" == ("undefined" == typeof window ? "undefined" : o(window)),
                u = "function" == typeof importScripts,
                c = "object" == ("undefined" == typeof process ? "undefined" : o(process)) && "object" == o(process.versions) && "string" == typeof process.versions.node,
                s = "";
            if (c) {
                var l = require("fs"),
                    v = require("path");
                s = u ? v.dirname(s) + "/" : __dirname + "/", a = function(e, r) {
                    return e = F(e) ? new URL(e) : v.normalize(e), l.readFileSync(e, r ? void 0 : "utf8")
                }, n = function(e) {
                    return (e = a(e, !0)).buffer || (e = new Uint8Array(e)), e
                }, process.argv.slice(2), t = function(e, r) {
                    throw process.exitCode = e, r
                }, i.inspect = function() {
                    return "[Emscripten Module object]"
                }
            } else(k || u) && (u ? s = self.location.href : "undefined" != typeof document && document.currentScript && (s = document.currentScript.src), r && (s = r), s = 0 !== s.indexOf("blob:") ? s.substr(0, s.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", a = function(e) {
                var r = new XMLHttpRequest;
                return r.open("GET", e, !1), r.send(null), r.responseText
            }, u && (n = function(e) {
                var r = new XMLHttpRequest;
                return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response)
            }));
            var g, P = i.print || console.log.bind(console),
                w = i.printErr || console.error.bind(console);

            function d() {}

            function C(e) {
                this.exports = function(e) {
                    for (var r, f = new Uint8Array(123), A = 25; A >= 0; --A) f[48 + A] = 52 + A, f[65 + A] = A, f[97 + A] = 26 + A;

                    function i(e, r, A) {
                        for (var i, a, n = 0, b = r, t = A.length, o = r + (3 * t >> 2) - ("=" == A[t - 2]) - ("=" == A[t - 1]); n < t; n += 4) i = f[A.charCodeAt(n + 1)], a = f[A.charCodeAt(n + 2)], e[b++] = f[A.charCodeAt(n)] << 2 | i >> 4, b < o && (e[b++] = i << 4 | a >> 2), b < o && (e[b++] = a << 6 | f[A.charCodeAt(n + 3)])
                    }
                    f[43] = 62, f[47] = 63;
                    var a = new ArrayBuffer(16),
                        n = new Int32Array(a),
                        b = new Float32Array(a),
                        t = new Float64Array(a);

                    function o(e) {
                        return n[e]
                    }

                    function k(e, r) {
                        n[e] = r
                    }

                    function u() {
                        return t[0]
                    }

                    function c(e) {
                        t[0] = e
                    }

                    function s() {
                        throw new Error("abort")
                    }

                    function l(e) {
                        b[2] = e
                    }
                    return function(e) {
                        var f = e.a,
                            A = f.a,
                            a = A.buffer;
                        A.grow = function(e) {
                            e |= 0;
                            var f = 0 | br(),
                                i = f + e | 0;
                            if (f < i && i < 65536) {
                                var o = new ArrayBuffer(C(i, 65536));
                                new Int8Array(o).set(n), n = new Int8Array(o), b = new Int16Array(o), t = new Int32Array(o), v = new Uint8Array(o), g = new Uint16Array(o), P = new Uint32Array(o), w = new Float32Array(o), d = new Float64Array(o), a = o, A.buffer = a, r = v
                            }
                            return f
                        };
                        var n = new Int8Array(a),
                            b = new Int16Array(a),
                            t = new Int32Array(a),
                            v = new Uint8Array(a),
                            g = new Uint16Array(a),
                            P = new Uint32Array(a),
                            w = new Float32Array(a),
                            d = new Float64Array(a),
                            C = Math.imul,
                            y = Math.fround,
                            h = Math.abs,
                            m = Math.clz32,
                            B = f.b,
                            p = f.c,
                            D = f.d,
                            T = f.e,
                            I = f.f,
                            z = f.g,
                            j = f.h,
                            W = f.i,
                            G = 78176,
                            E = 0;

                        function S(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                C = 0,
                                m = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                E = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = 0,
                                F = y(0),
                                N = 0,
                                Q = 0;
                            if (t[e + 4 >> 2] && (t[e + 8 >> 2] = 0), t[e + 16 >> 2] && (t[e + 20 >> 2] = 0), !v[e + 232 | 0]) return 1;
                            for (A = t[e + 128 >> 2], t[e + 560 >> 2] = A, r = t[e + 148 >> 2], r = (f = t[e + 144 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 144 >> 2] = f, t[e + 148 >> 2] = r, d[e + 552 >> 3] = 0 | A, d[e + 544 >> 3] = d[e + 112 >> 3] * +t[e + 240 >> 2], t[e + 28 >> 2] > 0 && (Ve(1913), Ve(1068), Ve(1148), Ve(1993));;) {
                                if (c = d[e + 96 >> 3], A = U, v[e + 64 | 0]) {
                                    if (r = 1, i = 0, A = 0, U)
                                        for (; A = A + 1 | 0, (0 | U) >= (0 | (r = 1 | (i = r << 1))););
                                    if ((0 | i) != (0 | (r = U)))
                                        for (; A = A - 1 | 0, (0 | (i = (f = i >> 1) - 1 | 0)) != (0 | (r = (0 | r) % (0 | f) | 0)););
                                }
                                r = t[e + 88 >> 2], c = H(c, +(0 | A)) * +(0 | r), I = h(c) < 2147483648 ? ~~c : -2147483648, Z = 0, G = u = G + -64 | 0, t[u + 56 >> 2] = 0, t[u + 48 >> 2] = 0, t[u + 52 >> 2] = 0, r = t[e + 156 >> 2], r = (A = t[e + 152 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 152 >> 2] = A, t[e + 156 >> 2] = r, N = e + 476 | 0, E = e + 376 | 0;
                                e: {
                                    r: {
                                        for (;;) {
                                            f: {
                                                A: if (-1 == (0 | (r = R(e)))) {
                                                    i: {
                                                        a: if (!(v[e + 584 | 0] | !((0 | I) < 0 | (0 | I) > (0 | Z))))
                                                            for (;;) {
                                                                if (r = t[e + 568 >> 2], (0 | (A = t[e + 572 >> 2])) >= 0 | (0 | A) > 0 && (0 | A) == (0 | (i = t[e + 188 >> 2])) & r >>> 0 <= P[e + 184 >> 2] | A >>> 0 < i >>> 0) break a;
                                                                if (r = t[e + 576 >> 2], (0 | (A = t[e + 580 >> 2])) >= 0 | (0 | A) > 0 && (0 | A) == (0 | (i = t[e + 180 >> 2])) & r >>> 0 <= P[e + 176 >> 2] | A >>> 0 < i >>> 0) break a;
                                                                if (!t[e + 388 >> 2] && !x(e)) {
                                                                    A = 1;
                                                                    break f
                                                                }
                                                                if (r = t[e + 252 >> 2], d[e + 544 >> 3] <= +(r - t[e + 376 >> 2] | 0)) {
                                                                    if (A = 0, c = d[e + 264 >> 3], _(t[e + 248 >> 2], r, e + 476 | 0), !((0 | (f = t[e + 252 >> 2])) <= 0)) {
                                                                        for (c /= +(0 | r), r = 0; k = t[e + 248 >> 2], i = t[k + (r << 2) >> 2], b = t[e + 476 >> 2] + (i << 2) | 0, (a = t[b >> 2]) >>> 0 < 192 || (o = t[b + 4 >> 2], v[(C = o >> 1) + t[e + 336 >> 2] | 0] == (1 & o) && -1 != (0 | (o = t[t[e + 396 >> 2] + (C << 3) >> 2])) && (0 | i) == (0 | o) || ((0 | f) / 2 | 0) <= (0 | r) && !(c > +w[4 + (b + (a >>> 6 << 2) | 0) >> 2])) ? (t[k + (A << 2) >> 2] = i, A = A + 1 | 0) : O(e, i), (0 | (r = r + 1 | 0)) < (0 | (f = t[e + 252 >> 2])););
                                                                        (0 | (r = r - A | 0)) <= 0 || (t[e + 252 >> 2] = f - r)
                                                                    } + P[e + 488 >> 2] > d[e + 80 >> 3] * +P[e + 480 >> 2] && nr[t[t[e >> 2] + 8 >> 2]](e)
                                                                }
                                                                n: {
                                                                    b: if (!((0 | (r = t[e + 388 >> 2])) >= t[e + 428 >> 2]))
                                                                        for (;;) {
                                                                            t: {
                                                                                o: {
                                                                                    if (f = t[t[e + 424 >> 2] + (r << 2) >> 2], A = v[t[e + 336 >> 2] + (f >> 1) | 0] ^ 1 & f) {
                                                                                        if (1 != (0 | A)) break o;
                                                                                        if (A = 1, i = 1 ^ f, (r = t[e + 16 >> 2]) ? (t[e + 20 >> 2] = 0, f = 0) : f = t[e + 20 >> 2], (0 | f) == t[e + 24 >> 2]) {
                                                                                            if ((b = ((0 | (b = f >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break r;
                                                                                            if (f = f + b | 0, t[e + 24 >> 2] = f, r = Y(r, f << 2), t[e + 16 >> 2] = r, !r) break r;
                                                                                            f = t[e + 20 >> 2]
                                                                                        }
                                                                                        if (t[e + 20 >> 2] = f + 1, t[(f << 2) + r >> 2] = i, t[e + 388 >> 2]) {
                                                                                            if (n[(a = i >> 1) + t[e + 496 >> 2] | 0] = 1, (0 | (b = t[e + 376 >> 2])) > (0 | (f = t[t[e + 384 >> 2] >> 2])))
                                                                                                for (;;) {
                                                                                                    if (b = b - 1 | 0, i = t[t[e + 372 >> 2] + (b << 2) >> 2], v[(k = i >> 1) + t[e + 496 >> 2] | 0]) {
                                                                                                        k: if (-1 != (0 | (r = t[t[e + 396 >> 2] + (k << 3) >> 2]))) {
                                                                                                            if (i = t[e + 476 >> 2] + (r << 2) | 0, 32 & (f = t[i >> 2])) {
                                                                                                                if (r = 0, f >>> 0 < 64) break k;
                                                                                                                for (; o = t[4 + (i + (r << 2) | 0) >> 2], v[(I = o >> 1) + t[e + 336 >> 2] | 0] != (1 & o) | t[4 + (t[e + 396 >> 2] + (I << 3) | 0) >> 2] <= 0 || (n[I + t[e + 496 >> 2] | 0] = 1, f = t[i >> 2]), (r = r + 1 | 0) >>> 0 < f >>> 6 >>> 0;);
                                                                                                            } else if (r = 1, !(f >>> 0 < 128))
                                                                                                                for (; I = t[4 + (i + (r << 2) | 0) >> 2] >> 1, t[4 + (t[e + 396 >> 2] + (I << 3) | 0) >> 2] > 0 && (n[I + t[e + 496 >> 2] | 0] = 1, f = t[i >> 2]), (r = r + 1 | 0) >>> 0 < f >>> 6 >>> 0;);
                                                                                                        } else {
                                                                                                            if ((0 | (f = t[e + 20 >> 2])) == t[e + 24 >> 2]) {
                                                                                                                if ((r = ((0 | (r = f >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break r;
                                                                                                                if (r = r + f | 0, t[e + 24 >> 2] = r, r = Y(t[e + 16 >> 2], r << 2), t[e + 16 >> 2] = r, !r) break r;
                                                                                                                f = t[e + 20 >> 2]
                                                                                                            } else r = t[e + 16 >> 2];
                                                                                                            t[e + 20 >> 2] = f + 1, t[(f << 2) + r >> 2] = 1 ^ i
                                                                                                        }n[k + t[e + 496 >> 2] | 0] = 0,
                                                                                                        f = t[t[e + 384 >> 2] >> 2]
                                                                                                    }
                                                                                                    if (!((0 | f) < (0 | b))) break
                                                                                                }
                                                                                            n[a + t[e + 496 >> 2] | 0] = 0
                                                                                        }
                                                                                        break f
                                                                                    }
                                                                                    if (A = t[e + 376 >> 2], t[e + 392 >> 2] != (0 | r)) {
                                                                                        f = t[e + 384 >> 2];
                                                                                        break t
                                                                                    }
                                                                                    if (!((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) && (r = r + f | 0, t[e + 392 >> 2] = r, f = Y(t[e + 384 >> 2], r << 2), t[e + 384 >> 2] = f, f)) {
                                                                                        r = t[e + 388 >> 2];
                                                                                        break t
                                                                                    }
                                                                                    break r
                                                                                }
                                                                                if (-2 != (0 | f)) break n;
                                                                                break b
                                                                            }
                                                                            if (t[e + 388 >> 2] = r + 1, t[(r << 2) + f >> 2] = A, !((0 | (r = t[e + 388 >> 2])) < t[e + 428 >> 2])) break
                                                                        }
                                                                    A = t[e + 164 >> 2],
                                                                    A = (r = t[e + 160 >> 2] + 1 | 0) ? A : A + 1 | 0,
                                                                    t[e + 160 >> 2] = r,
                                                                    t[e + 164 >> 2] = A,
                                                                    T = (c = 1389796 * d[e + 56 >> 3]) - 2147483647 * +(0 | (r = h(D = c / 2147483647) < 2147483648 ? ~~D : -2147483648)),
                                                                    d[e + 56 >> 3] = T,
                                                                    d[e + 48 >> 3] > T / 2147483647 && (A = t[e + 444 >> 2]) ? (T = (c = 1389796 * T) - 2147483647 * +(0 | (r = h(D = c / 2147483647) < 2147483648 ? ~~D : -2147483648)), d[e + 56 >> 3] = T, f = t[e + 440 >> 2], r = h(c = T / 2147483647 * +(0 | A)) < 2147483648 ? ~~c : -2147483648, k = t[f + (r << 2) >> 2], !(2 & v[k + t[e + 336 >> 2] | 0]) | !v[t[e + 360 >> 2] + k | 0] || (r = t[e + 172 >> 2], r = (A = t[e + 168 >> 2] + 1 | 0) ? r : r + 1 | 0, t[e + 168 >> 2] = A, t[e + 172 >> 2] = r)) : k = -1,
                                                                    p = (a = t[e + 440 >> 2]) - 4 | 0,
                                                                    C = t[e + 452 >> 2],
                                                                    W = t[e + 360 >> 2],
                                                                    z = t[e + 336 >> 2];b: {
                                                                        for (; !v[k + W | 0] || !(2 & v[k + z | 0]) | -1 == (0 | k);) {
                                                                            if (f = -2, !(r = t[e + 444 >> 2])) break b;
                                                                            if (k = t[a >> 2], r = t[p + (r << 2) >> 2], t[a >> 2] = r, t[C + (r << 2) >> 2] = 0, t[C + (k << 2) >> 2] = -1, f = (r = t[e + 444 >> 2]) - 1 | 0, t[e + 444 >> 2] = f, !((0 | r) < 3)) {
                                                                                for (o = t[t[e + 436 >> 2] >> 2], g = t[a >> 2], M = d[o + (g << 3) >> 3], l = t[e + 452 >> 2], i = 0, b = 1, A = 0;;) {
                                                                                    t: {
                                                                                        if ((0 | f) <= (0 | (r = i + 2 | 0))) f = t[a + (b << 2) >> 2],
                                                                                        c = d[o + (f << 3) >> 3];
                                                                                        else {
                                                                                            if (f = t[a + (r << 2) >> 2], c = d[o + (f << 3) >> 3], i = t[a + (b << 2) >> 2], c > (D = d[o + (i << 3) >> 3])) break t;
                                                                                            f = i, c = D
                                                                                        }
                                                                                        r = b
                                                                                    }
                                                                                    if (c > M) {
                                                                                        if (t[a + (A << 2) >> 2] = f, t[l + (f << 2) >> 2] = A, A = r, (0 | (f = t[e + 444 >> 2])) > (0 | (b = 1 | (i = r << 1)))) continue
                                                                                    } else r = A;
                                                                                    break
                                                                                }
                                                                                t[a + (r << 2) >> 2] = g, t[l + (g << 2) >> 2] = r
                                                                            }
                                                                        }
                                                                        v[e + 76 | 0] ? (c = 1389796 * T, c -= 2147483647 * +(0 | (r = h(D = c / 2147483647) < 2147483648 ? ~~D : -2147483648)), d[e + 56 >> 3] = c, r = c / 2147483647 < .5) : r = 0 != v[t[e + 348 >> 2] + k | 0],
                                                                        f = r | k << 1
                                                                    }
                                                                    if (-2 == (0 | f)) {
                                                                        A = 0;
                                                                        break f
                                                                    }
                                                                    r = t[e + 388 >> 2]
                                                                }
                                                                if (i = t[e + 376 >> 2], t[e + 392 >> 2] == (0 | r)) {
                                                                    if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break i;
                                                                    if (r = r + A | 0, t[e + 392 >> 2] = r, A = Y(t[e + 384 >> 2], r << 2), t[e + 384 >> 2] = A, !A) break i;
                                                                    r = t[e + 388 >> 2]
                                                                } else A = t[e + 384 >> 2];
                                                                if (t[e + 388 >> 2] = r + 1, t[(r << 2) + A >> 2] = i, n[(A = f >> 1) + t[e + 336 >> 2] | 0] = 1 & f, r = t[e + 388 >> 2], A = t[e + 396 >> 2] + (A << 3) | 0, t[A >> 2] = -1, t[A + 4 >> 2] = r, r = t[e + 376 >> 2], t[e + 376 >> 2] = r + 1, t[t[e + 372 >> 2] + (r << 2) >> 2] = f, -1 != (0 | (r = R(e)))) break A;
                                                                if (v[e + 584 | 0]) break
                                                            }
                                                        if (D = +t[e + 400 >> 2], (0 | (f = t[e + 388 >> 2])) < 0) T = 0;
                                                        else if (i = t[e + 384 >> 2], T = +t[(f ? i : E) >> 2], f) {
                                                            if (c = 1 / D, b = i - 4 | 0, r = 1, 1 != (0 | f))
                                                                for (I = 2147483646 & f, A = 0; a = (k = r << 2) + i | 0, o = t[((0 | r) == (0 | f) ? E : a) >> 2], C = t[b + k >> 2], M = H(c, +(0 | r)), Z = t[((0 | f) == (0 | (k = r + 1 | 0)) ? E : i + (k << 2)) >> 2], a = t[a >> 2], T = H(c, +(0 | k)) * +(Z - a | 0) + (M * +(o - C | 0) + T), r = r + 2 | 0, (0 | I) != (0 | (A = A + 2 | 0)););
                                                            1 & f && (A = r << 2, f = t[((0 | r) == (0 | f) ? E : A + i) >> 2], A = t[A + b >> 2], T = H(c, +(0 | r)) * +(f - A | 0) + T)
                                                        }
                                                        d[e + 464 >> 3] = T / D,
                                                        ve(e, 0),
                                                        A = 2;
                                                        break f
                                                    }
                                                    break r
                                                }if (A = t[e + 188 >> 2], A = (f = t[e + 184 >> 2] + 1 | 0) ? A : A + 1 | 0, t[e + 184 >> 2] = f, t[e + 188 >> 2] = A, A = 1, t[e + 388 >> 2]) {
                                                    if (t[u + 48 >> 2] && (t[u + 52 >> 2] = 0), a = 0, (0 | (o = t[u + 52 >> 2])) == t[u + 56 >> 2]) {
                                                        if ((A = ((0 | (A = o >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ o) >>> 0) break r;
                                                        if (A = A + o | 0, t[u + 56 >> 2] = A, i = Y(t[u + 48 >> 2], A << 2), t[u + 48 >> 2] = i, !i) break r;
                                                        o = t[u + 52 >> 2]
                                                    } else i = t[u + 48 >> 2];
                                                    for (t[(o << 2) + i >> 2] = 0, t[u + 52 >> 2] = t[u + 52 >> 2] + 1, o = t[e + 376 >> 2] - 1 | 0, i = -2;;) {
                                                        A = t[e + 476 >> 2];
                                                        A: if (32 & (r = t[(C = A + (r << 2) | 0) >> 2])) {
                                                            if (k = 0, r >>> 0 < 64) break A;
                                                            for (;;) {
                                                                if (p = t[4 + (C + (k << 2) | 0) >> 2], v[(i = p >> 1) + t[e + 336 >> 2] | 0] == (1 & p) && (z = i + t[e + 496 >> 2] | 0, !(v[0 | z] || t[4 + ((W = i << 3) + t[e + 396 >> 2] | 0) >> 2] <= 0))) {
                                                                    if (r = (A = t[e + 272 >> 2]) + W | 0, c = d[e + 288 >> 3] + d[r >> 3], d[r >> 3] = c, c > 1e100) {
                                                                        if (!((0 | (g = t[e + 400 >> 2])) <= 0)) {
                                                                            if (f = 0, r = 0, g >>> 0 >= 4)
                                                                                for (j = 2147483644 & g, b = 0; d[(m = (l = r << 3) + A | 0) >> 3] = 1e-100 * d[m >> 3], d[(m = A + (8 | l) | 0) >> 3] = 1e-100 * d[m >> 3], d[(m = A + (16 | l) | 0) >> 3] = 1e-100 * d[m >> 3], d[(l = A + (24 | l) | 0) >> 3] = 1e-100 * d[l >> 3], r = r + 4 | 0, (0 | j) != (0 | (b = b + 4 | 0)););
                                                                            if (b = 3 & g)
                                                                                for (; d[(g = A + (r << 3) | 0) >> 3] = 1e-100 * d[g >> 3], r = r + 1 | 0, (0 | b) != (0 | (f = f + 1 | 0)););
                                                                        }
                                                                        d[e + 288 >> 3] = 1e-100 * d[e + 288 >> 3]
                                                                    }
                                                                    if (!((0 | i) >= t[e + 456 >> 2] || (g = t[e + 452 >> 2], (0 | (r = t[g + (i << 2) >> 2])) < 0))) {
                                                                        i = t[e + 440 >> 2], b = t[i + (r << 2) >> 2];
                                                                        i: if (r)
                                                                            for (l = t[t[e + 436 >> 2] >> 2], c = d[l + (b << 3) >> 3];;) {
                                                                                if (A = (r << 2) + i | 0, S = t[(m = ((f = (j = r - 1 | 0) >> 1) << 2) + i | 0) >> 2], !(c > d[l + (S << 3) >> 3])) {
                                                                                    i = A;
                                                                                    break i
                                                                                }
                                                                                if (t[A >> 2] = S, t[g + (t[m >> 2] << 2) >> 2] = r, r = f, !(j >>> 0 > 1)) break
                                                                            } else r = 0;
                                                                        t[i >> 2] = b, t[g + (b << 2) >> 2] = r
                                                                    }
                                                                    if (n[0 | z] = 1, t[4 + (W + t[e + 396 >> 2] | 0) >> 2] >= t[e + 388 >> 2]) a = a + 1 | 0;
                                                                    else {
                                                                        if ((0 | (r = t[u + 52 >> 2])) == t[u + 56 >> 2]) {
                                                                            if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                                                            if (r = r + A | 0, t[u + 56 >> 2] = r, i = Y(t[u + 48 >> 2], r << 2), t[u + 48 >> 2] = i, !i) break r;
                                                                            r = t[u + 52 >> 2]
                                                                        } else i = t[u + 48 >> 2];
                                                                        t[u + 52 >> 2] = r + 1, t[(r << 2) + i >> 2] = 1 ^ p
                                                                    }
                                                                }
                                                                if (!((k = k + 1 | 0) >>> 0 < t[C >> 2] >>> 6 >>> 0)) break
                                                            }
                                                        } else {
                                                            if (4 & r && (c = d[e + 264 >> 3], F = y(c + +w[4 + (f = C + (r >>> 4 & 268435452) | 0) >> 2]), w[f + 4 >> 2] = F, +F > 1e20)) {
                                                                if (!((0 | (f = t[e + 252 >> 2])) <= 0)) {
                                                                    if (b = t[e + 248 >> 2], r = 0, 1 != (0 | f))
                                                                        for (g = 2147483646 & f, k = 0; p = A + (t[(l = r << 2) + b >> 2] << 2) | 0, p = (t[p >> 2] >>> 4 & 268435452) + p | 0, w[p + 4 >> 2] = 1e-20 * +w[p + 4 >> 2], l = A + (t[b + (4 | l) >> 2] << 2) | 0, l = (t[l >> 2] >>> 4 & 268435452) + l | 0, w[l + 4 >> 2] = 1e-20 * +w[l + 4 >> 2], r = r + 2 | 0, (0 | g) != (0 | (k = k + 2 | 0)););
                                                                    1 & f && (r = A + (t[b + (r << 2) >> 2] << 2) | 0, r = (t[r >> 2] >>> 4 & 268435452) + r | 0, w[r + 4 >> 2] = 1e-20 * +w[r + 4 >> 2])
                                                                }
                                                                d[e + 264 >> 3] = 1e-20 * c, r = t[C >> 2]
                                                            }
                                                            if (!((k = -2 != (0 | i)) >>> 0 >= r >>> 6 >>> 0))
                                                                for (;;) {
                                                                    if (z = (f = (W = t[4 + (C + (k << 2) | 0) >> 2]) >> 1) + t[e + 496 >> 2] | 0, !(v[0 | z] || t[4 + ((p = f << 3) + t[e + 396 >> 2] | 0) >> 2] <= 0)) {
                                                                        if (r = (A = t[e + 272 >> 2]) + p | 0, c = d[e + 288 >> 3] + d[r >> 3], d[r >> 3] = c, c > 1e100) {
                                                                            if (!((0 | (g = t[e + 400 >> 2])) <= 0)) {
                                                                                if (i = 0, r = 0, g >>> 0 >= 4)
                                                                                    for (j = 2147483644 & g, b = 0; d[(m = (l = r << 3) + A | 0) >> 3] = 1e-100 * d[m >> 3], d[(m = A + (8 | l) | 0) >> 3] = 1e-100 * d[m >> 3], d[(m = A + (16 | l) | 0) >> 3] = 1e-100 * d[m >> 3], d[(l = A + (24 | l) | 0) >> 3] = 1e-100 * d[l >> 3], r = r + 4 | 0, (0 | j) != (0 | (b = b + 4 | 0)););
                                                                                if (b = 3 & g)
                                                                                    for (; d[(g = A + (r << 3) | 0) >> 3] = 1e-100 * d[g >> 3], r = r + 1 | 0, (0 | b) != (0 | (i = i + 1 | 0)););
                                                                            }
                                                                            d[e + 288 >> 3] = 1e-100 * d[e + 288 >> 3]
                                                                        }
                                                                        if (!((0 | f) >= t[e + 456 >> 2] || (g = t[e + 452 >> 2], (0 | (r = t[g + (f << 2) >> 2])) < 0))) {
                                                                            i = t[e + 440 >> 2], b = t[i + (r << 2) >> 2];
                                                                            i: if (r)
                                                                                for (l = t[t[e + 436 >> 2] >> 2], c = d[l + (b << 3) >> 3];;) {
                                                                                    if (A = (r << 2) + i | 0, S = t[(m = ((f = (j = r - 1 | 0) >> 1) << 2) + i | 0) >> 2], !(c > d[l + (S << 3) >> 3])) {
                                                                                        i = A;
                                                                                        break i
                                                                                    }
                                                                                    if (t[A >> 2] = S, t[g + (t[m >> 2] << 2) >> 2] = r, r = f, !(j >>> 0 > 1)) break
                                                                                } else r = 0;
                                                                            t[i >> 2] = b, t[g + (b << 2) >> 2] = r
                                                                        }
                                                                        if (n[0 | z] = 1, t[4 + (p + t[e + 396 >> 2] | 0) >> 2] >= t[e + 388 >> 2]) a = a + 1 | 0;
                                                                        else {
                                                                            if ((0 | (r = t[u + 52 >> 2])) == t[u + 56 >> 2]) {
                                                                                if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                                                                if (r = r + A | 0, t[u + 56 >> 2] = r, i = Y(t[u + 48 >> 2], r << 2), t[u + 48 >> 2] = i, !i) break r;
                                                                                r = t[u + 52 >> 2]
                                                                            } else i = t[u + 48 >> 2];
                                                                            t[u + 52 >> 2] = r + 1, t[(r << 2) + i >> 2] = W
                                                                        }
                                                                    }
                                                                    if (!((k = k + 1 | 0) >>> 0 < t[C >> 2] >>> 6 >>> 0)) break
                                                                }
                                                        }
                                                        for (r = t[e + 496 >> 2], A = t[e + 372 >> 2]; f = o << 2, o = o - 1 | 0, i = t[f + A >> 2], !v[0 | (b = (f = i >> 1) + r | 0)];);
                                                        if (r = t[t[e + 396 >> 2] + (f << 3) >> 2], n[0 | b] = 0, A = (0 | a) > 1, a = a - 1 | 0, !A) break
                                                    }
                                                    if (t[t[u + 48 >> 2] >> 2] = 1 ^ i, t[e + 520 >> 2] && (t[e + 524 >> 2] = 0), se(e + 520 | 0, t[u + 52 >> 2]), (0 | (r = t[u + 52 >> 2])) > 0)
                                                        for (A = t[e + 520 >> 2], f = t[u + 48 >> 2], o = 0; t[(r = o << 2) + A >> 2] = t[r + f >> 2], (0 | (r = t[u + 52 >> 2])) > (0 | (o = o + 1 | 0)););
                                                    b = r, k = r;
                                                    A: {
                                                        i: switch (t[e + 68 >> 2] - 1 | 0) {
                                                            case 0:
                                                                if (b = 1, k = 1, (0 | r) < 2) break A;
                                                                for (i = t[e + 496 >> 2], a = t[e + 476 >> 2], A = t[e + 396 >> 2], f = t[u + 48 >> 2];;) {
                                                                    a: {
                                                                        n: if (r = t[f + (k << 2) >> 2], -1 != (0 | (o = t[A + (r << 2 & -8) >> 2]))) {
                                                                            if ((o = t[(C = a + (o << 2) | 0) >> 2]) >>> 0 < 128) break a;
                                                                            for (g = o >>> 6 | 0, o = 1;;) {
                                                                                if (l = t[4 + (C + (o << 2) | 0) >> 2] >> 1, !v[l + i | 0] & t[4 + (A + (l << 3) | 0) >> 2] > 0) break n;
                                                                                if ((0 | g) == (0 | (o = o + 1 | 0))) break
                                                                            }
                                                                            break a
                                                                        }t[f + (b << 2) >> 2] = r,
                                                                        b = b + 1 | 0
                                                                    }
                                                                    if (!((0 | (r = t[u + 52 >> 2])) > (0 | (k = k + 1 | 0)))) break
                                                                }
                                                                break A;
                                                            case 1:
                                                                break i;
                                                            default:
                                                                break A
                                                        }
                                                        if (b = 1, (0 | r) < 2) k = 1;
                                                        else {
                                                            if (o = 1, b = 1 & (i = r - 1 | 0), A = t[e + 396 >> 2], f = t[u + 48 >> 2], 2 != (0 | r))
                                                                for (a = f + 4 | 0, C = -2 & i, i = 0, k = 0; i = 1 << t[4 + (A + (t[(g = o << 2) + a >> 2] << 2 & -8) | 0) >> 2] | 1 << t[4 + (A + (t[f + g >> 2] << 2 & -8) | 0) >> 2] | i, o = o + 2 | 0, (0 | C) != (0 | (k = k + 2 | 0)););
                                                            else i = 0;
                                                            if (b && (i = 1 << t[4 + (A + (t[f + (o << 2) >> 2] << 2 & -8) | 0) >> 2] | i), k = 1, (0 | r) <= 1) b = 1;
                                                            else
                                                                for (b = 1;;) {
                                                                    r = t[u + 48 >> 2], o = t[r + (g = k << 2) >> 2];
                                                                    i: {
                                                                        if (-1 != t[t[e + 396 >> 2] + (o << 2 & -8) >> 2]) {
                                                                            if ((f = t[e + 508 >> 2]) ? (t[e + 512 >> 2] = 0, r = 0) : r = t[e + 512 >> 2], (0 | r) == t[e + 516 >> 2]) {
                                                                                if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                                                                if (r = r + A | 0, t[e + 516 >> 2] = r, f = Y(f, r << 2), t[e + 508 >> 2] = f, !f) break r;
                                                                                r = t[e + 512 >> 2]
                                                                            }
                                                                            a = 1, t[e + 512 >> 2] = r + 1, t[(r << 2) + f >> 2] = o;
                                                                            a: if (!((0 | (r = t[e + 512 >> 2])) <= 0))
                                                                                for (A = t[e + 524 >> 2];;) {
                                                                                    f = t[t[e + 396 >> 2] + (t[(t[e + 508 >> 2] + (r << 2) | 0) - 4 >> 2] << 2 & -8) >> 2], t[e + 512 >> 2] = r - 1;
                                                                                    n: {
                                                                                        o = t[e + 476 >> 2] + (f << 2) | 0;b: {
                                                                                            if (32 & (a = t[o >> 2])) {
                                                                                                if (r = 0, a >>> 0 < 64) break n;
                                                                                                for (;;) {
                                                                                                    t: {
                                                                                                        if (C = t[4 + (o + (r << 2) | 0) >> 2], v[(f = C >> 1) + t[e + 336 >> 2] | 0] == (1 & C) && (l = f + t[e + 496 >> 2] | 0, !(v[0 | l] || (f = t[e + 396 >> 2] + (f << 3) | 0, (0 | (p = t[f + 4 >> 2])) <= 0)))) {
                                                                                                            if (!(i >>> p & 1) | -1 == t[f >> 2]) break t;
                                                                                                            if (n[0 | l] = 1, (0 | (a = t[e + 512 >> 2])) == t[e + 516 >> 2]) {
                                                                                                                if ((f = ((0 | (f = a >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break r;
                                                                                                                if (f = f + a | 0, t[e + 516 >> 2] = f, f = Y(t[e + 508 >> 2], f << 2), t[e + 508 >> 2] = f, !f) break r;
                                                                                                                a = t[e + 512 >> 2]
                                                                                                            } else f = t[e + 508 >> 2];
                                                                                                            if (t[e + 512 >> 2] = a + 1, C ^= 1, t[(a << 2) + f >> 2] = C, (0 | (a = t[e + 524 >> 2])) == t[e + 528 >> 2]) {
                                                                                                                if ((f = ((0 | (f = a >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break r;
                                                                                                                if (f = f + a | 0, t[e + 528 >> 2] = f, f = Y(t[e + 520 >> 2], f << 2), t[e + 520 >> 2] = f, !f) break r;
                                                                                                                a = t[e + 524 >> 2]
                                                                                                            } else f = t[e + 520 >> 2];
                                                                                                            t[e + 524 >> 2] = a + 1, t[(a << 2) + f >> 2] = C, a = t[o >> 2]
                                                                                                        }
                                                                                                        if ((r = r + 1 | 0) >>> 0 < a >>> 6 >>> 0) continue;
                                                                                                        break n
                                                                                                    }
                                                                                                    break
                                                                                                }
                                                                                                if ((0 | A) < (0 | (f = t[e + 524 >> 2])))
                                                                                                    for (r = A; n[t[e + 496 >> 2] + (t[t[e + 520 >> 2] + (r << 2) >> 2] >> 1) | 0] = 0, (0 | (r = r + 1 | 0)) < (0 | (f = t[e + 524 >> 2])););
                                                                                                if (a = 0, (0 | f) > (0 | A)) break b;
                                                                                                break a
                                                                                            }
                                                                                            if (r = 1, a >>> 0 <= 127) break n;
                                                                                            for (;;) {
                                                                                                t: {
                                                                                                    if (l = (f = (C = t[4 + (o + (r << 2) | 0) >> 2]) >> 1) + t[e + 496 >> 2] | 0, !(v[0 | l] || (f = t[e + 396 >> 2] + (f << 3) | 0, (0 | (p = t[f + 4 >> 2])) <= 0))) {
                                                                                                        if (!(i >>> p & 1) | -1 == t[f >> 2]) break t;
                                                                                                        if (n[0 | l] = 1, (0 | (a = t[e + 512 >> 2])) == t[e + 516 >> 2]) {
                                                                                                            if ((f = ((0 | (f = a >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break r;
                                                                                                            if (f = f + a | 0, t[e + 516 >> 2] = f, f = Y(t[e + 508 >> 2], f << 2), t[e + 508 >> 2] = f, !f) break r;
                                                                                                            a = t[e + 512 >> 2]
                                                                                                        } else f = t[e + 508 >> 2];
                                                                                                        if (t[e + 512 >> 2] = a + 1, t[(a << 2) + f >> 2] = C, (0 | (a = t[e + 524 >> 2])) == t[e + 528 >> 2]) {
                                                                                                            if ((f = ((0 | (f = a >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break r;
                                                                                                            if (f = f + a | 0, t[e + 528 >> 2] = f, f = Y(t[e + 520 >> 2], f << 2), t[e + 520 >> 2] = f, !f) break r;
                                                                                                            a = t[e + 524 >> 2]
                                                                                                        } else f = t[e + 520 >> 2];
                                                                                                        t[e + 524 >> 2] = a + 1, t[(a << 2) + f >> 2] = C, a = t[o >> 2]
                                                                                                    }
                                                                                                    if ((r = r + 1 | 0) >>> 0 < a >>> 6 >>> 0) continue;
                                                                                                    break n
                                                                                                }
                                                                                                break
                                                                                            }
                                                                                            if ((0 | A) < (0 | (f = t[e + 524 >> 2])))
                                                                                                for (r = A; n[t[e + 496 >> 2] + (t[t[e + 520 >> 2] + (r << 2) >> 2] >> 1) | 0] = 0, (0 | (r = r + 1 | 0)) < (0 | (f = t[e + 524 >> 2])););
                                                                                            if (a = 0, (0 | f) <= (0 | A)) break a
                                                                                        }
                                                                                        t[e + 524 >> 2] = A;
                                                                                        break a
                                                                                    }
                                                                                    if (a = 1, !((0 | (r = t[e + 512 >> 2])) > 0)) break
                                                                                }
                                                                            if (a) break i;
                                                                            r = t[u + 48 >> 2], o = t[g + r >> 2]
                                                                        }
                                                                        t[(b << 2) + r >> 2] = o,
                                                                        b = b + 1 | 0
                                                                    }
                                                                    if (!((0 | (r = t[u + 52 >> 2])) > (0 | (k = k + 1 | 0)))) break
                                                                }
                                                        }
                                                    }
                                                    if (A = (f = r >> 31) + t[e + 220 >> 2] | 0, i = (a = t[e + 216 >> 2]) + r | 0, t[e + 216 >> 2] = i, t[e + 220 >> 2] = i >>> 0 < a >>> 0 ? A + 1 | 0 : A, (0 | (A = k - b | 0)) > 0 && (r = r - A | 0, t[u + 52 >> 2] = r, f = r >> 31), i = (b = t[e + 224 >> 2]) + r | 0, A = t[e + 228 >> 2] + f | 0, t[e + 224 >> 2] = i, t[e + 228 >> 2] = i >>> 0 < b >>> 0 ? A + 1 | 0 : A, o = 0, 1 != (0 | r)) {
                                                        if (A = t[u + 48 >> 2], k = 1, (0 | r) >= 3)
                                                            for (f = t[e + 396 >> 2], i = 2; k = t[4 + (f + (t[A + (i << 2) >> 2] << 2 & -8) | 0) >> 2] > t[4 + (f + (t[A + (k << 2) >> 2] << 2 & -8) | 0) >> 2] ? i : k, (0 | (i = i + 1 | 0)) != (0 | r););
                                                        r = t[(f = A + (k << 2) | 0) >> 2], t[f >> 2] = t[A + 4 >> 2], t[A + 4 >> 2] = r, r = t[4 + (t[e + 396 >> 2] + (r << 2 & -8) | 0) >> 2]
                                                    } else r = 0;
                                                    if (t[u + 60 >> 2] = r, t[e + 524 >> 2] > 0)
                                                        for (; n[t[e + 496 >> 2] + (t[t[e + 520 >> 2] + (o << 2) >> 2] >> 1) | 0] = 0, (0 | (o = o + 1 | 0)) < t[e + 524 >> 2];);
                                                    if (ve(e, t[u + 60 >> 2]), 1 != t[u + 52 >> 2]) {
                                                        if (i = ne(N, u + 48 | 0, 1, 0), (0 | (r = t[e + 252 >> 2])) == t[e + 256 >> 2]) {
                                                            if ((A = ((0 | (A = r >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                                            if (r = r + A | 0, t[e + 256 >> 2] = r, f = Y(t[e + 248 >> 2], r << 2), t[e + 248 >> 2] = f, !f) break r;
                                                            r = t[e + 252 >> 2]
                                                        } else f = t[e + 248 >> 2];
                                                        if (t[e + 252 >> 2] = r + 1, t[(r << 2) + f >> 2] = i, $(e, i), c = d[e + 264 >> 3], A = t[e + 476 >> 2], r = (t[(r = A + (i << 2) | 0) >> 2] >>> 4 & 268435452) + r | 0, F = y(c + +w[r + 4 >> 2]), w[r + 4 >> 2] = F, +F > 1e20) {
                                                            if (!((0 | (f = t[e + 252 >> 2])) <= 0)) {
                                                                if (b = t[e + 248 >> 2], r = 0, 1 != (0 | f))
                                                                    for (a = 2147483646 & f, k = 0; C = A + (t[(o = r << 2) + b >> 2] << 2) | 0, C = (t[C >> 2] >>> 4 & 268435452) + C | 0, w[C + 4 >> 2] = 1e-20 * +w[C + 4 >> 2], o = A + (t[b + (4 | o) >> 2] << 2) | 0, o = (t[o >> 2] >>> 4 & 268435452) + o | 0, w[o + 4 >> 2] = 1e-20 * +w[o + 4 >> 2], r = r + 2 | 0, (0 | a) != (0 | (k = k + 2 | 0)););
                                                                1 & f && (r = A + (t[b + (r << 2) >> 2] << 2) | 0, r = (t[r >> 2] >>> 4 & 268435452) + r | 0, w[r + 4 >> 2] = 1e-20 * +w[r + 4 >> 2])
                                                            }
                                                            d[e + 264 >> 3] = 1e-20 * c
                                                        }
                                                        r = t[t[u + 48 >> 2] >> 2], n[(f = r >> 1) + t[e + 336 >> 2] | 0] = 1 & r, A = t[e + 388 >> 2], f = t[e + 396 >> 2] + (f << 3) | 0, t[f >> 2] = i, t[f + 4 >> 2] = A
                                                    } else r = t[t[u + 48 >> 2] >> 2], n[(f = r >> 1) + t[e + 336 >> 2] | 0] = 1 & r, A = t[e + 388 >> 2], f = t[e + 396 >> 2] + (f << 3) | 0, t[f >> 2] = -1, t[f + 4 >> 2] = A;
                                                    if (A = t[e + 376 >> 2], t[e + 376 >> 2] = A + 1, t[t[e + 372 >> 2] + (A << 2) >> 2] = r, Z = Z + 1 | 0, r = t[e + 560 >> 2] - 1 | 0, t[e + 560 >> 2] = r, d[e + 288 >> 3] = d[e + 288 >> 3] * (1 / d[e + 32 >> 3]), d[e + 264 >> 3] = d[e + 264 >> 3] * (1 / d[e + 40 >> 3]), r) continue;
                                                    if (c = d[e + 136 >> 3] * d[e + 552 >> 3], d[e + 552 >> 3] = c, D = d[e + 120 >> 3] * d[e + 544 >> 3], d[e + 544 >> 3] = D, r = h(c) < 2147483648 ? ~~c : -2147483648, t[e + 560 >> 2] = r, t[e + 28 >> 2] <= 0) continue;
                                                    if (b = t[e + 384 >> 2], i = t[e + 388 >> 2], k = t[(i ? b : E) >> 2], a = t[e + 192 >> 2], o = t[e + 400 >> 2], c = +(0 | (C = t[e + 252 >> 2])), A = t[e + 208 >> 2], g = t[e + 212 >> 2], l = (0 | i) < 0, f = h(D) < 2147483648 ? ~~D : -2147483648, D = +(0 | o), o = a - k | 0, M = (+(A >>> 0) + 4294967296 * +(g >>> 0)) / c, g = t[e + 200 >> 2], p = t[e + 240 >> 2], W = t[e + 184 >> 2], l) T = 0;
                                                    else if (T = +(0 | k), i) {
                                                        if (c = 1 / D, k = b - 4 | 0, r = 1, 1 != (0 | i))
                                                            for (l = 2147483646 & i, A = 0; z = (a = r << 2) + b | 0, j = t[((0 | r) == (0 | i) ? E : z) >> 2], m = t[a + k >> 2], Q = H(c, +(0 | r)), S = t[((0 | i) == (0 | (a = r + 1 | 0)) ? E : b + (a << 2)) >> 2], z = t[z >> 2], T = H(c, +(0 | a)) * +(S - z | 0) + (Q * +(j - m | 0) + T), r = r + 2 | 0, (0 | l) != (0 | (A = A + 2 | 0)););
                                                        1 & i && (A = r << 2, i = t[((0 | r) == (0 | i) ? E : A + b) >> 2], A = t[A + k >> 2], T = H(c, +(0 | r)) * +(i - A | 0) + T)
                                                    }
                                                    d[u + 24 >> 3] = M, t[u + 20 >> 2] = C, t[u + 16 >> 2] = f, d[u + 32 >> 3] = T / D * 100, t[u + 12 >> 2] = g, t[u + 8 >> 2] = p, t[u + 4 >> 2] = o, t[u >> 2] = W, G = r = G - 16 | 0, t[r + 12 >> 2] = u, Pe(10224, 2244, u, 22), G = r + 16 | 0;
                                                    continue
                                                }
                                            }
                                            break
                                        }(r = t[u + 48 >> 2]) && (t[u + 52 >> 2] = 0, V(r)),
                                        G = u - -64 | 0;
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                }
                                if (r = A, v[e + 584 | 0] || (A = t[e + 568 >> 2], (0 | (f = t[e + 572 >> 2])) >= 0 | (0 | f) > 0 && (0 | f) == (0 | (b = t[e + 188 >> 2])) & A >>> 0 <= P[e + 184 >> 2] | f >>> 0 < b >>> 0 || (A = t[e + 576 >> 2], (0 | (f = t[e + 580 >> 2])) >= 0 | (0 | f) > 0 && (0 | f) == (0 | (b = t[e + 180 >> 2])) & A >>> 0 <= P[e + 176 >> 2] | f >>> 0 < b >>> 0 || (U = U + 1 | 0, !(2 & r))))) break
                            }
                            t[e + 28 >> 2] > 0 && Ve(1993);
                            e: if (A = 255 & r) t[e + 20 >> 2] | 1 != (0 | A) || (n[e + 232 | 0] = 0);
                                else {
                                    r: {
                                        f: {
                                            if ((0 | (A = t[e + 400 >> 2])) > t[e + 8 >> 2]) {
                                                if (!((0 | (f = t[e + 12 >> 2])) >= (0 | A))) {
                                                    if ((0 | (i = (0 | (i = 2 + (f >> 1 & -2) | 0)) > (0 | (b = 1 + (A - f | 0) & -2)) ? i : b)) > (2147483647 ^ f)) break f;
                                                    if (f = f + i | 0, t[e + 12 >> 2] = f, f = Y(t[e + 4 >> 2], f), t[e + 4 >> 2] = f, !f && 48 == t[2726]) break f
                                                }(0 | (f = t[e + 8 >> 2])) < (0 | A) && ue(f + t[e + 4 >> 2] | 0, 0, A - f | 0), t[e + 8 >> 2] = A
                                            }
                                            break r
                                        }
                                        B(0 | rr(), 1060, 0),
                                        s()
                                    }
                                    if (t[e + 400 >> 2] <= 0) break e;
                                    for (A = 0; n[t[e + 4 >> 2] + A | 0] = v[t[e + 336 >> 2] + A | 0], (0 | (A = A + 1 | 0)) < t[e + 400 >> 2];);
                                }
                            return ve(e, 0), r
                        }

                        function U(e) {
                            var r, f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = 0;
                            G = r = G - 16 | 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: {
                                                a: {
                                                    n: {
                                                        b: {
                                                            t: {
                                                                if ((e |= 0) >>> 0 <= 244) {
                                                                    if (3 & (f = (b = t[3034]) >>> (A = (o = e >>> 0 < 11 ? 16 : e + 11 & 504) >>> 3 | 0) | 0)) {
                                                                        f = 12176 + (e = (A = A + (1 & ~f) | 0) << 3) | 0, i = t[e + 12184 >> 2], (0 | f) != (0 | (e = t[i + 8 >> 2])) ? (t[e + 12 >> 2] = f, t[f + 8 >> 2] = e) : (s = 12136, l = _e(A) & b, t[s >> 2] = l), e = i + 8 | 0, f = A << 3, t[i + 4 >> 2] = 3 | f, t[4 + (f = f + i | 0) >> 2] = 1 | t[f + 4 >> 2];
                                                                        break e
                                                                    }
                                                                    if ((c = t[3036]) >>> 0 >= o >>> 0) break t;
                                                                    if (f) {
                                                                        f = 12176 + (e = (i = $e((0 - (e = 2 << A) | e) & f << A)) << 3) | 0, a = t[e + 12184 >> 2], (0 | f) != (0 | (e = t[a + 8 >> 2])) ? (t[e + 12 >> 2] = f, t[f + 8 >> 2] = e) : (b = _e(i) & b, t[3034] = b), t[a + 4 >> 2] = 3 | o, i = (e = i << 3) - o | 0, t[4 + (A = a + o | 0) >> 2] = 1 | i, t[e + a >> 2] = i, c && (f = 12176 + (-8 & c) | 0, n = t[3039], (e = 1 << (c >>> 3)) & b ? e = t[f + 8 >> 2] : (t[3034] = e | b, e = f), t[f + 8 >> 2] = n, t[e + 12 >> 2] = n, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e), e = a + 8 | 0, t[3039] = A, t[3036] = i;
                                                                        break e
                                                                    }
                                                                    if (!(u = t[3035])) break t;
                                                                    for (A = t[12440 + ($e(u) << 2) >> 2], a = (-8 & t[A + 4 >> 2]) - o | 0, f = A;
                                                                        (e = t[f + 16 >> 2]) || (e = t[f + 20 >> 2]);) a = (i = (f = (-8 & t[e + 4 >> 2]) - o | 0) >>> 0 < a >>> 0) ? f : a, A = i ? e : A, f = e;
                                                                    if (k = t[A + 24 >> 2], (0 | (i = t[A + 12 >> 2])) != (0 | A)) {
                                                                        e = t[A + 8 >> 2], t[e + 12 >> 2] = i, t[i + 8 >> 2] = e;
                                                                        break r
                                                                    }
                                                                    if (!(e = t[(f = A + 20 | 0) >> 2])) {
                                                                        if (!(e = t[A + 16 >> 2])) break b;
                                                                        f = A + 16 | 0
                                                                    }
                                                                    for (; n = f, i = e, (e = t[(f = e + 20 | 0) >> 2]) || (f = i + 16 | 0, e = t[i + 16 >> 2]););
                                                                    t[n >> 2] = 0;
                                                                    break r
                                                                }
                                                                if (o = -1, !(e >>> 0 > 4294967231) && (o = -8 & (e = e + 11 | 0), u = t[3035])) {
                                                                    a = 0 - o | 0, b = 0, o >>> 0 < 256 || (b = 31, o >>> 0 > 16777215 || (b = 62 + ((o >>> 38 - (e = m(e >>> 8 | 0)) & 1) - (e << 1) | 0) | 0));
                                                                    o: {
                                                                        k: {
                                                                            if (f = t[12440 + (b << 2) >> 2])
                                                                                for (e = 0, A = o << (31 != (0 | b) ? 25 - (b >>> 1 | 0) : 0);;) {
                                                                                    if (!((n = (-8 & t[f + 4 >> 2]) - o | 0) >>> 0 >= a >>> 0 || (i = f, a = n))) {
                                                                                        a = 0, e = f;
                                                                                        break k
                                                                                    }
                                                                                    if (n = t[f + 20 >> 2], f = t[16 + ((A >>> 29 & 4) + f | 0) >> 2], e = n ? (0 | n) == (0 | f) ? e : n : e, A <<= 1, !f) break
                                                                                } else e = 0;
                                                                            if (!(e | i)) {
                                                                                if (i = 0, !(e = (0 - (e = 2 << b) | e) & u)) break t;
                                                                                e = t[12440 + ($e(e) << 2) >> 2]
                                                                            }
                                                                            if (!e) break o
                                                                        }
                                                                        for (; a = (A = (f = (-8 & t[e + 4 >> 2]) - o | 0) >>> 0 < a >>> 0) ? f : a, i = A ? e : i, e = (f = t[e + 16 >> 2]) || t[e + 20 >> 2];);
                                                                    }
                                                                    if (!(!i | t[3036] - o >>> 0 <= a >>> 0)) {
                                                                        if (b = t[i + 24 >> 2], (0 | i) != (0 | (A = t[i + 12 >> 2]))) {
                                                                            e = t[i + 8 >> 2], t[e + 12 >> 2] = A, t[A + 8 >> 2] = e;
                                                                            break f
                                                                        }
                                                                        if (!(e = t[(f = i + 20 | 0) >> 2])) {
                                                                            if (!(e = t[i + 16 >> 2])) break n;
                                                                            f = i + 16 | 0
                                                                        }
                                                                        for (; n = f, A = e, (e = t[(f = e + 20 | 0) >> 2]) || (f = A + 16 | 0, e = t[A + 16 >> 2]););
                                                                        t[n >> 2] = 0;
                                                                        break f
                                                                    }
                                                                }
                                                            }
                                                            if ((e = t[3036]) >>> 0 >= o >>> 0) {
                                                                i = t[3039], (f = e - o | 0) >>> 0 >= 16 ? (t[4 + (A = i + o | 0) >> 2] = 1 | f, t[e + i >> 2] = f, t[i + 4 >> 2] = 3 | o) : (t[i + 4 >> 2] = 3 | e, t[4 + (e = e + i | 0) >> 2] = 1 | t[e + 4 >> 2], A = 0, f = 0), t[3036] = f, t[3039] = A, e = i + 8 | 0;
                                                                break e
                                                            }
                                                            if ((k = t[3037]) >>> 0 > o >>> 0) {
                                                                f = k - o | 0, t[3037] = f, e = (A = t[3040]) + o | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[A + 4 >> 2] = 3 | o, e = A + 8 | 0;
                                                                break e
                                                            }
                                                            if (e = 0, a = o + 47 | 0, t[3152] ? A = t[3154] : (t[3155] = -1, t[3156] = -1, t[3153] = 4096, t[3154] = 4096, t[3152] = r + 12 & -16 ^ 1431655768, t[3157] = 0, t[3145] = 0, A = 4096), (f = (b = a + A | 0) & (n = 0 - A | 0)) >>> 0 <= o >>> 0) break e;
                                                            if ((i = t[3144]) && i >>> 0 < (u = (A = t[3142]) + f | 0) >>> 0 | A >>> 0 >= u >>> 0) break e;t: {
                                                                if (!(4 & v[12580])) {
                                                                    o: {
                                                                        k: {
                                                                            u: {
                                                                                c: {
                                                                                    if (i = t[3040])
                                                                                        for (e = 12584;;) {
                                                                                            if ((A = t[e >> 2]) >>> 0 <= i >>> 0 & i >>> 0 < A + t[e + 4 >> 2] >>> 0) break c;
                                                                                            if (!(e = t[e + 8 >> 2])) break
                                                                                        }
                                                                                    if (-1 == (0 | (A = Xe(0)))) break o;
                                                                                    if (b = f, (e = (i = t[3153]) - 1 | 0) & A && (b = (f - A | 0) + (e + A & 0 - i) | 0), b >>> 0 <= o >>> 0) break o;
                                                                                    if ((i = t[3144]) && i >>> 0 < (n = (e = t[3142]) + b | 0) >>> 0 | e >>> 0 >= n >>> 0) break o;
                                                                                    if ((0 | A) != (0 | (e = Xe(b)))) break u;
                                                                                    break t
                                                                                }
                                                                                if ((0 | (A = Xe(b = n & b - k))) == (t[e >> 2] + t[e + 4 >> 2] | 0)) break k;e = A
                                                                            }
                                                                            if (-1 == (0 | e)) break o;
                                                                            if (o + 48 >>> 0 <= b >>> 0) {
                                                                                A = e;
                                                                                break t
                                                                            }
                                                                            if (-1 == (0 | Xe(A = (A = t[3154]) + (a - b | 0) & 0 - A))) break o;b = A + b | 0,
                                                                            A = e;
                                                                            break t
                                                                        }
                                                                        if (-1 != (0 | A)) break t
                                                                    }
                                                                    t[3145] = 4 | t[3145]
                                                                }
                                                                if (-1 == (0 | (A = Xe(f))) | -1 == (0 | (e = Xe(0))) | e >>> 0 <= A >>> 0) break A;
                                                                if ((b = e - A | 0) >>> 0 <= o + 40 >>> 0) break A
                                                            }
                                                            e = t[3142] + b | 0,
                                                            t[3142] = e,
                                                            e >>> 0 > P[3143] && (t[3143] = e);t: {
                                                                if (a = t[3040]) {
                                                                    for (e = 12584;;) {
                                                                        if (((i = t[e >> 2]) + (f = t[e + 4 >> 2]) | 0) == (0 | A)) break t;
                                                                        if (!(e = t[e + 8 >> 2])) break
                                                                    }
                                                                    break a
                                                                }
                                                                for ((e = t[3038]) >>> 0 <= A >>> 0 && e || (t[3038] = A), e = 0, t[3147] = b, t[3146] = A, t[3042] = -1, t[3043] = t[3152], t[3149] = 0; f = 12176 + (i = e << 3) | 0, t[i + 12184 >> 2] = f, t[i + 12188 >> 2] = f, 32 != (0 | (e = e + 1 | 0)););f = (i = b - 40 | 0) - (e = -8 - A & 7) | 0,
                                                                t[3037] = f,
                                                                e = e + A | 0,
                                                                t[3040] = e,
                                                                t[e + 4 >> 2] = 1 | f,
                                                                t[4 + (A + i | 0) >> 2] = 40,
                                                                t[3041] = t[3156];
                                                                break i
                                                            }
                                                            if (8 & t[e + 12 >> 2] | A >>> 0 <= a >>> 0 | i >>> 0 > a >>> 0) break a;t[e + 4 >> 2] = f + b,
                                                            A = (e = -8 - a & 7) + a | 0,
                                                            t[3040] = A,
                                                            e = (f = t[3037] + b | 0) - e | 0,
                                                            t[3037] = e,
                                                            t[A + 4 >> 2] = 1 | e,
                                                            t[4 + (f + a | 0) >> 2] = 40,
                                                            t[3041] = t[3156];
                                                            break i
                                                        }
                                                        i = 0;
                                                        break r
                                                    }
                                                    A = 0;
                                                    break f
                                                }
                                                P[3038] > A >>> 0 && (t[3038] = A),
                                                f = A + b | 0,
                                                e = 12584;a: {
                                                    n: {
                                                        b: {
                                                            for (;;) {
                                                                if ((0 | f) != t[e >> 2]) {
                                                                    if (e = t[e + 8 >> 2]) continue;
                                                                    break b
                                                                }
                                                                break
                                                            }
                                                            if (!(8 & v[e + 12 | 0])) break n
                                                        }
                                                        for (e = 12584; !((f = t[e >> 2]) >>> 0 <= a >>> 0 && (n = f + t[e + 4 >> 2] | 0) >>> 0 > a >>> 0);) e = t[e + 8 >> 2];
                                                        for (f = (i = b - 40 | 0) - (e = -8 - A & 7) | 0, t[3037] = f, e = e + A | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[4 + (A + i | 0) >> 2] = 40, t[3041] = t[3156], t[(i = (e = (n + (39 - n & 7) | 0) - 47 | 0) >>> 0 < a + 16 >>> 0 ? a : e) + 4 >> 2] = 27, e = t[3149], t[i + 16 >> 2] = t[3148], t[i + 20 >> 2] = e, e = t[3147], t[i + 8 >> 2] = t[3146], t[i + 12 >> 2] = e, t[3148] = i + 8, t[3147] = b, t[3146] = A, t[3149] = 0, e = i + 24 | 0; t[e + 4 >> 2] = 7, f = e + 8 | 0, e = e + 4 | 0, f >>> 0 < n >>> 0;);
                                                        if ((0 | i) == (0 | a)) break i;
                                                        if (t[i + 4 >> 2] = -2 & t[i + 4 >> 2], n = i - a | 0, t[a + 4 >> 2] = 1 | n, t[i >> 2] = n, n >>> 0 <= 255) {
                                                            f = 12176 + (-8 & n) | 0, (A = t[3034]) & (e = 1 << (n >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f), t[f + 8 >> 2] = a, t[e + 12 >> 2] = a, t[a + 12 >> 2] = f, t[a + 8 >> 2] = e;
                                                            break i
                                                        }
                                                        if (e = 31, n >>> 0 <= 16777215 && (e = 62 + ((n >>> 38 - (e = m(n >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[a + 28 >> 2] = e, t[a + 16 >> 2] = 0, t[a + 20 >> 2] = 0, f = 12440 + (e << 2) | 0, (i = t[3035]) & (A = 1 << e)) {
                                                            for (e = n << (31 != (0 | e) ? 25 - (e >>> 1 | 0) : 0), i = t[f >> 2];;) {
                                                                if ((0 | n) == (-8 & t[(f = i) + 4 >> 2])) break a;
                                                                if (A = e >>> 29 | 0, e <<= 1, !(i = t[16 + (A = (4 & A) + f | 0) >> 2])) break
                                                            }
                                                            t[A + 16 >> 2] = a
                                                        } else t[3035] = A | i,
                                                        t[f >> 2] = a;t[a + 24 >> 2] = f,
                                                        t[a + 12 >> 2] = a,
                                                        t[a + 8 >> 2] = a;
                                                        break i
                                                    }
                                                    t[e >> 2] = A,
                                                    t[e + 4 >> 2] = t[e + 4 >> 2] + b,
                                                    t[4 + (u = (-8 - A & 7) + A | 0) >> 2] = 3 | o,
                                                    b = (a = f + (-8 - f & 7) | 0) - (k = o + u | 0) | 0;n: if (t[3040] != (0 | a))
                                                        if (t[3039] != (0 | a)) {
                                                            if (1 == (3 & (A = t[a + 4 >> 2]))) {
                                                                n = -8 & A;
                                                                b: if (A >>> 0 <= 255) {
                                                                    if ((0 | (f = t[a + 12 >> 2])) == (0 | (e = t[a + 8 >> 2]))) {
                                                                        s = 12136, l = t[3034] & _e(A >>> 3 | 0), t[s >> 2] = l;
                                                                        break b
                                                                    }
                                                                    t[e + 12 >> 2] = f, t[f + 8 >> 2] = e
                                                                } else {
                                                                    o = t[a + 24 >> 2];
                                                                    t: if ((0 | a) == (0 | (e = t[a + 12 >> 2]))) {
                                                                        o: {
                                                                            if (!(A = t[(f = a + 20 | 0) >> 2])) {
                                                                                if (!(A = t[a + 16 >> 2])) break o;
                                                                                f = a + 16 | 0
                                                                            }
                                                                            for (; i = f, (A = t[(f = (e = A) + 20 | 0) >> 2]) || (f = e + 16 | 0, A = t[e + 16 >> 2]););t[i >> 2] = 0;
                                                                            break t
                                                                        }
                                                                        e = 0
                                                                    }
                                                                    else f = t[a + 8 >> 2], t[f + 12 >> 2] = e, t[e + 8 >> 2] = f;
                                                                    if (o) {
                                                                        A = t[a + 28 >> 2];
                                                                        t: {
                                                                            if (t[(f = 12440 + (A << 2) | 0) >> 2] == (0 | a)) {
                                                                                if (t[f >> 2] = e, e) break t;
                                                                                s = 12140, l = t[3035] & _e(A), t[s >> 2] = l;
                                                                                break b
                                                                            }
                                                                            if (t[o + (t[o + 16 >> 2] == (0 | a) ? 16 : 20) >> 2] = e, !e) break b
                                                                        }
                                                                        t[e + 24 >> 2] = o, (f = t[a + 16 >> 2]) && (t[e + 16 >> 2] = f, t[f + 24 >> 2] = e), (f = t[a + 20 >> 2]) && (t[e + 20 >> 2] = f, t[f + 24 >> 2] = e)
                                                                    }
                                                                } b = n + b | 0, A = t[4 + (a = a + n | 0) >> 2]
                                                            }
                                                            if (t[a + 4 >> 2] = -2 & A, t[k + 4 >> 2] = 1 | b, t[b + k >> 2] = b, b >>> 0 <= 255) f = 12176 + (-8 & b) | 0, (A = t[3034]) & (e = 1 << (b >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f), t[f + 8 >> 2] = k, t[e + 12 >> 2] = k, t[k + 12 >> 2] = f, t[k + 8 >> 2] = e;
                                                            else {
                                                                A = 31, b >>> 0 <= 16777215 && (A = 62 + ((b >>> 38 - (e = m(b >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[k + 28 >> 2] = A, t[k + 16 >> 2] = 0, t[k + 20 >> 2] = 0, f = 12440 + (A << 2) | 0;
                                                                b: {
                                                                    if ((i = t[3035]) & (e = 1 << A)) {
                                                                        for (A = b << (31 != (0 | A) ? 25 - (A >>> 1 | 0) : 0), e = t[f >> 2];;) {
                                                                            if (f = e, (-8 & t[e + 4 >> 2]) == (0 | b)) break b;
                                                                            if (i = A >>> 29 | 0, A <<= 1, !(e = t[16 + (i = (4 & i) + e | 0) >> 2])) break
                                                                        }
                                                                        t[i + 16 >> 2] = k
                                                                    } else t[3035] = e | i,
                                                                    t[f >> 2] = k;t[k + 24 >> 2] = f,
                                                                    t[k + 12 >> 2] = k,
                                                                    t[k + 8 >> 2] = k;
                                                                    break n
                                                                }
                                                                e = t[f + 8 >> 2], t[e + 12 >> 2] = k, t[f + 8 >> 2] = k, t[k + 24 >> 2] = 0, t[k + 12 >> 2] = f, t[k + 8 >> 2] = e
                                                            }
                                                        } else t[3039] = k, e = t[3036] + b | 0, t[3036] = e, t[k + 4 >> 2] = 1 | e, t[e + k >> 2] = e;
                                                    else t[3040] = k,
                                                    e = t[3037] + b | 0,
                                                    t[3037] = e,
                                                    t[k + 4 >> 2] = 1 | e;e = u + 8 | 0;
                                                    break e
                                                }
                                                e = t[f + 8 >> 2],
                                                t[e + 12 >> 2] = a,
                                                t[f + 8 >> 2] = a,
                                                t[a + 24 >> 2] = 0,
                                                t[a + 12 >> 2] = f,
                                                t[a + 8 >> 2] = e
                                            }
                                            if (!((e = t[3037]) >>> 0 <= o >>> 0)) {
                                                f = e - o | 0, t[3037] = f, e = (A = t[3040]) + o | 0, t[3040] = e, t[e + 4 >> 2] = 1 | f, t[A + 4 >> 2] = 3 | o, e = A + 8 | 0;
                                                break e
                                            }
                                        }
                                        t[2726] = 48,
                                        e = 0;
                                        break e
                                    }
                                    f: if (b) {
                                        f = t[i + 28 >> 2];
                                        A: {
                                            if (t[(e = 12440 + (f << 2) | 0) >> 2] == (0 | i)) {
                                                if (t[e >> 2] = A, A) break A;
                                                u = _e(f) & u, t[3035] = u;
                                                break f
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | i) ? 16 : 20) >> 2] = A, !A) break f
                                        }
                                        t[A + 24 >> 2] = b, (e = t[i + 16 >> 2]) && (t[A + 16 >> 2] = e, t[e + 24 >> 2] = A), (e = t[i + 20 >> 2]) && (t[A + 20 >> 2] = e, t[e + 24 >> 2] = A)
                                    }f: if (a >>> 0 <= 15) e = a + o | 0, t[i + 4 >> 2] = 3 | e, t[4 + (e = e + i | 0) >> 2] = 1 | t[e + 4 >> 2];
                                        else if (t[i + 4 >> 2] = 3 | o, t[4 + (n = i + o | 0) >> 2] = 1 | a, t[a + n >> 2] = a, a >>> 0 <= 255) f = 12176 + (-8 & a) | 0,
                                    (A = t[3034]) & (e = 1 << (a >>> 3)) ? e = t[f + 8 >> 2] : (t[3034] = e | A, e = f),
                                    t[f + 8 >> 2] = n,
                                    t[e + 12 >> 2] = n,
                                    t[n + 12 >> 2] = f,
                                    t[n + 8 >> 2] = e;
                                    else {
                                        e = 31, a >>> 0 <= 16777215 && (e = 62 + ((a >>> 38 - (e = m(a >>> 8 | 0)) & 1) - (e << 1) | 0) | 0), t[n + 28 >> 2] = e, t[n + 16 >> 2] = 0, t[n + 20 >> 2] = 0, f = 12440 + (e << 2) | 0;
                                        A: {
                                            if ((A = 1 << e) & u) {
                                                for (e = a << (31 != (0 | e) ? 25 - (e >>> 1 | 0) : 0), o = t[f >> 2];;) {
                                                    if ((-8 & t[(f = o) + 4 >> 2]) == (0 | a)) break A;
                                                    if (A = e >>> 29 | 0, e <<= 1, !(o = t[16 + (A = (4 & A) + f | 0) >> 2])) break
                                                }
                                                t[A + 16 >> 2] = n
                                            } else t[3035] = A | u,
                                            t[f >> 2] = n;t[n + 24 >> 2] = f,
                                            t[n + 12 >> 2] = n,
                                            t[n + 8 >> 2] = n;
                                            break f
                                        }
                                        e = t[f + 8 >> 2], t[e + 12 >> 2] = n, t[f + 8 >> 2] = n, t[n + 24 >> 2] = 0, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e
                                    }
                                    e = i + 8 | 0;
                                    break e
                                }
                                r: if (k) {
                                    f = t[A + 28 >> 2];
                                    f: {
                                        if (t[(e = 12440 + (f << 2) | 0) >> 2] == (0 | A)) {
                                            if (t[e >> 2] = i, i) break f;
                                            s = 12140, l = _e(f) & u, t[s >> 2] = l;
                                            break r
                                        }
                                        if (t[k + (t[k + 16 >> 2] == (0 | A) ? 16 : 20) >> 2] = i, !i) break r
                                    }
                                    t[i + 24 >> 2] = k, (e = t[A + 16 >> 2]) && (t[i + 16 >> 2] = e, t[e + 24 >> 2] = i), (e = t[A + 20 >> 2]) && (t[i + 20 >> 2] = e, t[e + 24 >> 2] = i)
                                }a >>> 0 <= 15 ? (e = a + o | 0, t[A + 4 >> 2] = 3 | e, t[4 + (e = e + A | 0) >> 2] = 1 | t[e + 4 >> 2]) : (t[A + 4 >> 2] = 3 | o, t[4 + (i = A + o | 0) >> 2] = 1 | a, t[i + a >> 2] = a, c && (f = 12176 + (-8 & c) | 0, n = t[3039], (e = 1 << (c >>> 3)) & b ? e = t[f + 8 >> 2] : (t[3034] = e | b, e = f), t[f + 8 >> 2] = n, t[e + 12 >> 2] = n, t[n + 12 >> 2] = f, t[n + 8 >> 2] = e), t[3039] = i, t[3036] = a),
                                e = A + 8 | 0
                            }
                            return G = r + 16 | 0, 0 | e
                        }

                        function Z(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                w = 0,
                                d = 0,
                                C = 0,
                                y = 0,
                                h = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = 0,
                                F = 0,
                                R = 0,
                                H = 0,
                                N = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                O = 0,
                                X = 0;
                            G = k = G - 336 | 0, s = b, l = 65535 & o, v = A, g = 65535 & i, C = -2147483648 & (i ^ o);
                            e: {
                                if (!((D = o >>> 16 & 32767) - 32767 >>> 0 > 4294934529 & (h = i >>> 16 & 32767) - 32767 >>> 0 >= 4294934530)) {
                                    if (!(!A & 2147418112 == (0 | (u = 2147483647 & i)) ? !(r | f) : u >>> 0 < 2147418112)) {
                                        d = A, C = 32768 | i;
                                        break e
                                    }
                                    if (!(!b & 2147418112 == (0 | (i = 2147483647 & o)) ? !(a | n) : i >>> 0 < 2147418112)) {
                                        d = b, C = 32768 | o, r = a, f = n;
                                        break e
                                    }
                                    if (!(r | A | 2147418112 ^ u | f)) {
                                        if (!(a | b | 2147418112 ^ i | n)) {
                                            r = 0, f = 0, C = 2147450880;
                                            break e
                                        }
                                        C |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(a | b | 2147418112 ^ i | n)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    if (!(r | A | f | u)) {
                                        d = (r = !(a | b | i | n)) ? 0 : d, C = r ? 2147450880 : C, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(a | b | i | n)) {
                                        C |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    65535 == (0 | u) | u >>> 0 < 65535 && (o = A = !(v | g), u = A ? r : v, Ce(k + 320 | 0, r, f, v, g, (A = (A <<= 6) + (32 == (0 | (o = m(o ? f : g))) ? m(u) + 32 | 0 : o) | 0) - 15 | 0), w = 16 - A | 0, v = t[k + 328 >> 2], g = t[k + 332 >> 2], f = t[k + 324 >> 2], r = t[k + 320 >> 2]), i >>> 0 > 65535 || (b = A = !(l | s), o = A ? a : s, Ce(k + 304 | 0, a, n, s, l, (A = (A <<= 6) + (32 == (0 | (b = m(b ? n : l))) ? m(o) + 32 | 0 : b) | 0) - 15 | 0), w = (A + w | 0) - 16 | 0, s = t[k + 312 >> 2], l = t[k + 316 >> 2], a = t[k + 304 >> 2], n = t[k + 308 >> 2])
                                }
                                if (T = i = 65536 | l, I = s, u = i << 15 | (A = s) >>> 17, me(k + 288 | 0, A = i = A << 15 | n >>> 17, b = u, 0, 0, o = 0 - A | 0, u = 1963258675 - (u + !!(0 | A) | 0) | 0, 0, 0), me(k + 272 | 0, 0 - (A = t[k + 296 >> 2]) | 0, 0 - (t[k + 300 >> 2] + !!(0 | A) | 0) | 0, 0, 0, o, u, 0, 0), me(k + 256 | 0, o = (A = t[k + 280 >> 2]) << 1 | t[k + 276 >> 2] >>> 31, A = t[k + 284 >> 2] << 1 | A >>> 31, 0, 0, i, b, 0, 0), me(k + 240 | 0, o, A, 0, 0, 0 - (u = t[k + 264 >> 2]) | 0, 0 - (t[k + 268 >> 2] + !!(0 | u) | 0) | 0, 0, 0), me(k + 224 | 0, u = (o = t[k + 248 >> 2]) << 1 | t[k + 244 >> 2] >>> 31, A = t[k + 252 >> 2] << 1 | o >>> 31, 0, 0, i, b, 0, 0), me(k + 208 | 0, u, A, 0, 0, 0 - (o = t[k + 232 >> 2]) | 0, 0 - (t[k + 236 >> 2] + !!(0 | o) | 0) | 0, 0, 0), me(k + 192 | 0, o = (A = t[k + 216 >> 2]) << 1 | t[k + 212 >> 2] >>> 31, A = t[k + 220 >> 2] << 1 | A >>> 31, 0, 0, i, b, 0, 0), me(k + 176 | 0, o, A, 0, 0, 0 - (u = t[k + 200 >> 2]) | 0, 0 - (t[k + 204 >> 2] + !!(0 | u) | 0) | 0, 0, 0), me(k + 160 | 0, o = i, A = b, 0, 0, b = (s = (i = t[k + 184 >> 2]) << 1 | t[k + 180 >> 2] >>> 31) - 1 | 0, i = (t[k + 188 >> 2] << 1 | i >>> 31) - !s | 0, 0, 0), me(k + 144 | 0, a << 15, n << 15 | a >>> 17, 0, 0, A = b, i, 0, 0), B = k + 112 | 0, z = t[k + 168 >> 2], b = t[k + 172 >> 2], c = (s = t[k + 160 >> 2]) + (o = t[k + 152 >> 2]) | 0, u = (l = t[k + 164 >> 2]) + t[k + 156 >> 2] | 0, o = u = o >>> 0 > c >>> 0 ? u + 1 | 0 : u, u = (u = (0 | l) == (0 | u) & c >>> 0 < s >>> 0 | u >>> 0 < l >>> 0) >>> 0 > (l = u + z | 0) >>> 0 ? b + 1 | 0 : b, me(B, A, i, 0, 0, 0 - (b = l + (s = !o & c >>> 0 > 1 | !!(0 | o)) | 0) | 0, 0 - (!!(0 | b) + (u = s >>> 0 > b >>> 0 ? u + 1 | 0 : u) | 0) | 0, 0, 0), me(k + 128 | 0, 1 - c | 0, 0 - ((c >>> 0 > 1) + o | 0) | 0, 0, 0, A, i, 0, 0), H = (h - D | 0) + w | 0, h = i = t[k + 116 >> 2], o = (A = t[k + 112 >> 2]) << 1, l = u = i << 1 | A >>> 31, A = u, p = b = t[k + 140 >> 2], A = A + (u = b << 1 | (i = t[k + 136 >> 2]) >>> 31) | 0, i = A = (b = (c = i << 1 | t[k + 132 >> 2] >>> 31) + o | 0) >>> 0 < c >>> 0 ? A + 1 | 0 : A, y = A = A - (b >>> 0 < 13927) | 0, B = A, N = u = 65536 | g, V = v, x = (A = v) << 1, O = u = u << 1 | A >>> 31, U = u, j = A = Re(y, c = 0, u, 0), W = u = E, M = r << 1, D = A = f << 1 | r >>> 31, z = A, w = u = 0, y = (0 | i) == (0 | y) & (s = b - 13927 | 0) >>> 0 < b >>> 0 | i >>> 0 > y >>> 0, i = (0 | i) == (0 | l) & b >>> 0 < o >>> 0 | i >>> 0 < l >>> 0, A = t[k + 120 >> 2], u = b = t[k + 124 >> 2] << 1 | A >>> 31, u = (A = (c = p >>> 31 | 0) + (A = A << 1 | h >>> 31) | 0) >>> 0 < c >>> 0 ? u + 1 | 0 : u, u = (b = A) >>> 0 > (A = A + i | 0) >>> 0 ? u + 1 | 0 : u, c = (i = A) >>> 0 > (A = A + y | 0) >>> 0 ? u + 1 | 0 : u, i = A - 1 | 0, o = Re(z, w, S = c - !A | 0, p = 0), b = E + W | 0, l = (0 | W) == (0 | (b = (A = o + j | 0) >>> 0 < o >>> 0 ? b + 1 | 0 : b)) & A >>> 0 < j >>> 0 | b >>> 0 < W >>> 0, j = i, i = Re(i, 0, Z = (Q = f >>> 31 | 0) | v << 1, y = 0), u = E + b | 0, c = 0, g = u = i >>> 0 > (v = i + A | 0) >>> 0 ? u + 1 | 0 : u, c = (i = A = (0 | u) == (0 | b) & A >>> 0 > v >>> 0 | b >>> 0 > u >>> 0) >>> 0 > (A = A + l | 0) >>> 0 ? 1 : c, i = Re(U, w, S, p), u = E + c | 0, l = A = i + A | 0, A = A >>> 0 < i >>> 0 ? u + 1 | 0 : u, i = Re(U, w, j, y), c = E, b = i, i = Re(Z, y, S, p), u = E + c | 0, i = u = i >>> 0 > (o = b + i | 0) >>> 0 ? u + 1 | 0 : u, A = A + (u = (0 | c) == (0 | u) & b >>> 0 > o >>> 0 | u >>> 0 < c >>> 0) | 0, l = c = l + i | 0, c = A = c >>> 0 < i >>> 0 ? A + 1 | 0 : A, u = o + g | 0, i = u = (A = (i = 0) + v | 0) >>> 0 < i >>> 0 ? u + 1 | 0 : u, b = (0 | u) == (0 | g) & A >>> 0 < v >>> 0 | u >>> 0 < g >>> 0, u = c, o = b, h = b = b + l | 0, c = u = o >>> 0 > b >>> 0 ? u + 1 | 0 : u, v = A, W = s, A = Re(s, 0, Z, y), o = E, b = A, s = Re(B, d, z, d), u = E + o | 0, s = (0 | o) == (0 | (u = (A = A + s | 0) >>> 0 < s >>> 0 ? u + 1 | 0 : u)) & A >>> 0 < b >>> 0 | o >>> 0 > u >>> 0, b = u, o = Re(j, y, F = -2 & M, 0), u = E + u | 0, o = u = o >>> 0 > (g = o + A | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | u) == (0 | b) & A >>> 0 > g >>> 0 | b >>> 0 > u >>> 0, b = 0, A = ((u = A + s | 0) >>> 0 < A >>> 0 ? 1 : b) + i | 0, A = (l = u + v | 0) >>> 0 < u >>> 0 ? A + 1 | 0 : A, u = c, s = A, i = A = (0 | A) == (0 | i) & l >>> 0 < v >>> 0 | A >>> 0 < i >>> 0, X = A = A + h | 0, h = u = i >>> 0 > A >>> 0 ? u + 1 | 0 : u, A = Re(U, w, W, d), R = E, U = A, i = Re(S, p, F, d), u = E + R | 0, u = (A = A + i | 0) >>> 0 < i >>> 0 ? u + 1 | 0 : u, v = A, i = A + (c = Re(B, d, Z, y)) | 0, b = u, A = u + E | 0, A = i >>> 0 < c >>> 0 ? A + 1 | 0 : A, w = i, u = Re(z, d, j, y), c = E + A | 0, S = (0 | A) == (0 | (c = (i = i + u | 0) >>> 0 < u >>> 0 ? c + 1 | 0 : c)) & i >>> 0 < w >>> 0 | A >>> 0 > c >>> 0, u = ((A = (A = (A = (0 | A) == (0 | b) & v >>> 0 > w >>> 0 | A >>> 0 < b >>> 0) + (u = (0 | b) == (0 | R) & v >>> 0 < U >>> 0 | b >>> 0 < R >>> 0) | 0) + S | 0) | p) + s | 0, v = u = (b = c) >>> 0 > (w = b + l | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | s) == (0 | u) & l >>> 0 > w >>> 0 | u >>> 0 < s >>> 0, u = h, b = A, p = A = A + X | 0, s = u = b >>> 0 > A >>> 0 ? u + 1 | 0 : u, A = Re(B, d, F, d), B = E, l = A, b = Re(z, d, W, d), u = E + B | 0, b = (0 | (u = (A = A + b | 0) >>> 0 < b >>> 0 ? u + 1 | 0 : u)) == (0 | B) & A >>> 0 < l >>> 0 | u >>> 0 < B >>> 0, l = u, A = u + g | 0, u = (b | (h = 0)) + o | 0, o = (0 | o) == (0 | (u = A >>> 0 < l >>> 0 ? u + 1 | 0 : u)) & A >>> 0 < g >>> 0 | o >>> 0 > u >>> 0, c = (b = u) + (u = i) | 0, u = 0, u = ((i = A = (0 | b) == (0 | (c = (i = (g = 0) + A | 0) >>> 0 < g >>> 0 ? c + 1 | 0 : c)) & A >>> 0 > i >>> 0 | b >>> 0 > c >>> 0) >>> 0 > (A = A + o | 0) >>> 0 ? 1 : u) + v | 0, c = s, i = u = (i = A) >>> 0 > (A = A + w | 0) >>> 0 ? u + 1 | 0 : u, o = c = (o = b = (0 | v) == (0 | u) & A >>> 0 < w >>> 0 | u >>> 0 < v >>> 0) >>> 0 > (b = b + p | 0) >>> 0 ? c + 1 | 0 : c, 131071 == (0 | c) | c >>> 0 < 131071 ? (V = x | Q, N = y | O, me(k + 80 | 0, A, u, b, c, a, n, I, T), w = c = t[k + 84 >> 2], u = r << 17, s = (f = (v = 0) - (g = t[k + 88 >> 2]) | 0) - (c = !!(c | (r = t[k + 80 >> 2]))) | 0, l = (u - (t[k + 92 >> 2] + (v >>> 0 < g >>> 0) | 0) | 0) - (f >>> 0 < c >>> 0) | 0, g = 0 - (!!(0 | r) + w | 0) | 0, w = H + 16382 | 0, v = 0 - r | 0) : (me(k + 96 | 0, A = (1 & i) << 31 | A >>> 1, i = b << 31 | i >>> 1, b = (1 & o) << 31 | b >>> 1, o = o >>> 1 | 0, a, n, I, T), D = s = t[k + 100 >> 2], s = (v = (l = 0) - (w = t[k + 104 >> 2]) | 0) - (g = !!(s | (c = t[k + 96 >> 2]))) | 0, l = ((r << 16) - (t[k + 108 >> 2] + (l >>> 0 < w >>> 0) | 0) | 0) - (v >>> 0 < g >>> 0) | 0, g = 0 - (!!(0 | c) + D | 0) | 0, M = r, D = f, w = H + 16383 | 0, v = 0 - c | 0), (0 | w) >= 32767) C |= 2147418112,
                                r = 0,
                                f = 0;
                                else {
                                    if ((0 | w) > 0) r = s << 1 | g >>> 31, f = l << 1 | s >>> 31, s = b, l = 65535 & o | w << 16, c = g << 1 | v >>> 31, b = v << 1;
                                    else {
                                        if ((0 | w) <= -113) {
                                            r = 0, f = 0;
                                            break e
                                        }
                                        de(k - -64 | 0, A, i, b, o, 1 - w | 0), Ce(k + 48 | 0, M, D, V, N, w + 112 | 0), me(k + 32 | 0, a, n, I, T, A = t[k + 64 >> 2], i = t[k + 68 >> 2], s = t[k + 72 >> 2], l = t[k + 76 >> 2]), r = t[k + 40 >> 2], c = (f = t[k + 56 >> 2]) - (g = r << 1 | (o = t[k + 36 >> 2]) >>> 31) | 0, g = t[k + 60 >> 2] - ((t[k + 44 >> 2] << 1 | r >>> 31) + (f >>> 0 < g >>> 0) | 0) | 0, w = f = t[k + 52 >> 2], r = c - (f = (0 | f) == (0 | (b = o << 1 | (r = t[k + 32 >> 2]) >>> 31)) & (r = v = r << 1) >>> 0 > (u = t[k + 48 >> 2]) >>> 0 | f >>> 0 < b >>> 0) | 0, f = g - (f >>> 0 > c >>> 0) | 0, c = w - ((u >>> 0 < v >>> 0) + b | 0) | 0, b = u - v | 0
                                    }
                                    me(k + 16 | 0, a, n, I, T, 3, 0, 0, 0), me(k, a, n, I, T, 5, 0, 0, 0), v = A, A = b + (o = g = 1 & A) | 0, b = (u = 0) + c | 0, b = A >>> 0 < o >>> 0 ? b + 1 | 0 : b, o = A, n = (0 | n) == (0 | b) & A >>> 0 > a >>> 0 | n >>> 0 < b >>> 0, c = f, A = (0 | b) == (0 | u) & A >>> 0 < g >>> 0 | b >>> 0 < u >>> 0, u = i, f = u = (f = r = (r = (0 | (c = A >>> 0 > (a = r + A | 0) >>> 0 ? c + 1 | 0 : c)) == (0 | T)) & (0 | a) == (0 | I) ? n : r & a >>> 0 > I >>> 0 | c >>> 0 > T >>> 0) >>> 0 > (r = r + v | 0) >>> 0 ? u + 1 | 0 : u, A = (0 | i) == (0 | u) & r >>> 0 < v >>> 0 | i >>> 0 > u >>> 0, u = l, u = (i = A) >>> 0 > (A = A + s | 0) >>> 0 ? u + 1 | 0 : u, n = A, s = (0 | (i = t[k + 20 >> 2])) == (0 | b) & P[k + 16 >> 2] < o >>> 0 | i >>> 0 < b >>> 0, i = t[k + 28 >> 2], i = u >>> 0 < 2147418112 & ((0 | (A = t[k + 24 >> 2])) == (0 | a) & (0 | i) == (0 | c) ? s : (0 | i) == (0 | c) & A >>> 0 < a >>> 0 | i >>> 0 < c >>> 0), A = f, u = (f = r = (0 | f) == (0 | (A = (s = i) >>> 0 > (i = r + i | 0) >>> 0 ? A + 1 | 0 : A)) & r >>> 0 > i >>> 0 | f >>> 0 > A >>> 0) >>> 0 > (r = r + n | 0) >>> 0 ? u + 1 | 0 : u, n = r, b = (0 | (f = t[k + 4 >> 2])) == (0 | b) & P[k >> 2] < o >>> 0 | f >>> 0 < b >>> 0, f = t[k + 12 >> 2], f = c = (f = r = u >>> 0 < 2147418112 & ((0 | (r = t[k + 8 >> 2])) == (0 | a) & (0 | f) == (0 | c) ? b : (0 | f) == (0 | c) & r >>> 0 < a >>> 0 | f >>> 0 < c >>> 0)) >>> 0 > (r = r + i | 0) >>> 0 ? A + 1 | 0 : A, i = (0 | A) == (0 | c) & r >>> 0 < i >>> 0 | A >>> 0 > c >>> 0, A = u, a = i, d |= i = i + n | 0, C |= A = a >>> 0 > i >>> 0 ? A + 1 | 0 : A
                                }
                            }
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = d, t[e + 12 >> 2] = C, G = k + 336 | 0
                        }

                        function M(e, r, f, A, i, a) {
                            var o, k, u, c, s, l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                y = 0,
                                h = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                E = 0;
                            G = o = G - 80 | 0, t[o + 76 >> 2] = r, u = i - 192 | 0, c = A - 384 | 0, s = o + 55 | 0, k = o + 56 | 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: for (;;) {
                                                l = 0;
                                                a: for (;;) {
                                                    if (P = r, (2147483647 ^ B) < (0 | l)) break A;
                                                    B = l + B | 0;
                                                    n: {
                                                        b: {
                                                            t: {
                                                                if (g = v[0 | (l = r)])
                                                                    for (;;) {
                                                                        o: {
                                                                            k: if (r = 255 & g) {
                                                                                if (37 != (0 | r)) break o;
                                                                                for (g = l;;) {
                                                                                    if (37 != v[g + 1 | 0]) {
                                                                                        r = g;
                                                                                        break k
                                                                                    }
                                                                                    if (l = l + 1 | 0, y = v[g + 2 | 0], g = r = g + 2 | 0, 37 != (0 | y)) break
                                                                                }
                                                                            } else r = l;
                                                                            if ((0 | (l = l - P | 0)) > (0 | (W = 2147483647 ^ B))) break A;
                                                                            if (e && er(e, P, l), l) continue a;t[o + 76 >> 2] = r,
                                                                            l = r + 1 | 0,
                                                                            p = -1,
                                                                            g = n[r + 1 | 0] - 48 | 0,
                                                                            36 != v[r + 2 | 0] | g >>> 0 >= 10 || (p = g, T = 1, l = r + 3 | 0),
                                                                            t[o + 76 >> 2] = l,
                                                                            h = 0;k: if ((r = (g = n[0 | l]) - 32 | 0) >>> 0 > 31) y = l;
                                                                                else if (y = l, 75913 & (r = 1 << r))
                                                                                for (;;) {
                                                                                    if (y = l + 1 | 0, t[o + 76 >> 2] = y, h |= r, (r = (g = n[l + 1 | 0]) - 32 | 0) >>> 0 >= 32) break k;
                                                                                    if (l = y, !(75913 & (r = 1 << r))) break
                                                                                }
                                                                            k: if (42 != (0 | g)) {
                                                                                if ((0 | (D = Fe(o + 76 | 0))) < 0) break A;
                                                                                g = t[o + 76 >> 2]
                                                                            } else {
                                                                                if (g = y + 1 | 0, 36 != v[y + 2 | 0] | n[y + 1 | 0] - 48 >>> 0 >= 10) {
                                                                                    if (T) break t;
                                                                                    if (!e) {
                                                                                        t[o + 76 >> 2] = g, T = 0, D = 0;
                                                                                        break k
                                                                                    }
                                                                                    r = t[f >> 2], t[f >> 2] = r + 4, T = 0, r = t[r >> 2]
                                                                                } else r = n[0 | g], g = y + 3 | 0, T = 1, e ? r = t[(r << 3) + c >> 2] : (t[(r << 2) + u >> 2] = 10, r = 0);
                                                                                if (t[o + 76 >> 2] = g, D = r, (0 | r) >= 0) break k;
                                                                                D = 0 - r | 0, h |= 8192
                                                                            }if (l = 0, w = -1, 46 == v[0 | g])
                                                                                if (42 != v[g + 1 | 0]) t[o + 76 >> 2] = g + 1, w = Fe(o + 76 | 0), r = t[o + 76 >> 2], z = 1;
                                                                                else {
                                                                                    if (r = g + 2 | 0, 36 != v[g + 3 | 0] | n[g + 2 | 0] - 48 >>> 0 >= 10) {
                                                                                        if (T) break t;
                                                                                        e ? (g = t[f >> 2], t[f >> 2] = g + 4, w = t[g >> 2]) : w = 0
                                                                                    } else r = n[0 | r], e ? w = t[(r << 3) + c >> 2] : (t[(r << 2) + u >> 2] = 10, w = 0), r = g + 4 | 0;
                                                                                    t[o + 76 >> 2] = r, z = (0 | w) >= 0
                                                                                }
                                                                            else r = g,
                                                                            z = 0;
                                                                            for (;;) {
                                                                                if (j = l, y = 28, m = r, (g = n[0 | r]) - 123 >>> 0 < 4294967238) break f;
                                                                                if (r = r + 1 | 0, !((l = v[9183 + (g + C(l, 58) | 0) | 0]) - 1 >>> 0 < 8)) break
                                                                            }
                                                                            t[o + 76 >> 2] = r;k: if (27 == (0 | l)) {
                                                                                if ((0 | p) >= 0) break f;
                                                                                if (l = 0, !e) continue a
                                                                            } else {
                                                                                if (!l) break f;
                                                                                if ((0 | p) >= 0) {
                                                                                    if (!e) {
                                                                                        t[(p << 2) + i >> 2] = l;
                                                                                        continue i
                                                                                    }
                                                                                    l = t[4 + (g = (p << 3) + A | 0) >> 2], t[o + 64 >> 2] = t[g >> 2], t[o + 68 >> 2] = l;
                                                                                    break k
                                                                                }
                                                                                if (!e) break n;
                                                                                oe(o - -64 | 0, l, f)
                                                                            }if (32 & v[0 | e]) break r;g = -65537 & h,
                                                                            h = 8192 & h ? g : h,
                                                                            p = 0,
                                                                            I = 1298,
                                                                            y = k;k: {
                                                                                u: {
                                                                                    c: {
                                                                                        s: {
                                                                                            l: {
                                                                                                v: {
                                                                                                    g: {
                                                                                                        P: {
                                                                                                            w: {
                                                                                                                d: {
                                                                                                                    C: {
                                                                                                                        y: {
                                                                                                                            h: {
                                                                                                                                m: {
                                                                                                                                    B: {
                                                                                                                                        p: switch (l = n[0 | m], (l = j && 3 == (15 & l) ? -45 & l : l) - 88 | 0) {
                                                                                                                                            case 11:
                                                                                                                                                break k;
                                                                                                                                            case 9:
                                                                                                                                            case 13:
                                                                                                                                            case 14:
                                                                                                                                            case 15:
                                                                                                                                                break u;
                                                                                                                                            case 27:
                                                                                                                                                break g;
                                                                                                                                            case 12:
                                                                                                                                            case 17:
                                                                                                                                                break d;
                                                                                                                                            case 23:
                                                                                                                                                break C;
                                                                                                                                            case 0:
                                                                                                                                            case 32:
                                                                                                                                                break y;
                                                                                                                                            case 24:
                                                                                                                                                break h;
                                                                                                                                            case 22:
                                                                                                                                                break m;
                                                                                                                                            case 29:
                                                                                                                                                break B;
                                                                                                                                            case 1:
                                                                                                                                            case 2:
                                                                                                                                            case 3:
                                                                                                                                            case 4:
                                                                                                                                            case 5:
                                                                                                                                            case 6:
                                                                                                                                            case 7:
                                                                                                                                            case 8:
                                                                                                                                            case 10:
                                                                                                                                            case 16:
                                                                                                                                            case 18:
                                                                                                                                            case 19:
                                                                                                                                            case 20:
                                                                                                                                            case 21:
                                                                                                                                            case 25:
                                                                                                                                            case 26:
                                                                                                                                            case 28:
                                                                                                                                            case 30:
                                                                                                                                            case 31:
                                                                                                                                                break b
                                                                                                                                        }
                                                                                                                                        p: switch (l - 65 | 0) {
                                                                                                                                            case 0:
                                                                                                                                            case 4:
                                                                                                                                            case 5:
                                                                                                                                            case 6:
                                                                                                                                                break u;
                                                                                                                                            case 2:
                                                                                                                                                break l;
                                                                                                                                            case 1:
                                                                                                                                            case 3:
                                                                                                                                                break b
                                                                                                                                        }
                                                                                                                                        if (83 == (0 | l)) break v;
                                                                                                                                        break b
                                                                                                                                    }
                                                                                                                                    P = t[o + 64 >> 2],
                                                                                                                                    g = t[o + 68 >> 2],
                                                                                                                                    I = 1298;
                                                                                                                                    break w
                                                                                                                                }
                                                                                                                                l = 0;m: switch (255 & j) {
                                                                                                                                    case 0:
                                                                                                                                    case 1:
                                                                                                                                    case 6:
                                                                                                                                        t[t[o + 64 >> 2] >> 2] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 2:
                                                                                                                                        P = t[o + 64 >> 2], t[P >> 2] = B, t[P + 4 >> 2] = B >> 31;
                                                                                                                                        continue a;
                                                                                                                                    case 3:
                                                                                                                                        b[t[o + 64 >> 2] >> 1] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 4:
                                                                                                                                        n[t[o + 64 >> 2]] = B;
                                                                                                                                        continue a;
                                                                                                                                    case 7:
                                                                                                                                        break m;
                                                                                                                                    default:
                                                                                                                                        continue a
                                                                                                                                }
                                                                                                                                P = t[o + 64 >> 2],
                                                                                                                                t[P >> 2] = B,
                                                                                                                                t[P + 4 >> 2] = B >> 31;
                                                                                                                                continue a
                                                                                                                            }
                                                                                                                            w = w >>> 0 <= 8 ? 8 : w,
                                                                                                                            h |= 8,
                                                                                                                            l = 120
                                                                                                                        }
                                                                                                                        if (r = k, (P = t[o + 64 >> 2]) | (g = t[o + 68 >> 2]))
                                                                                                                            for (E = 32 & l; n[0 | (r = r - 1 | 0)] = E | v[9712 + (15 & P) | 0], j = !g & P >>> 0 > 15 | !!(0 | g), m = g, g = g >>> 4 | 0, P = (15 & m) << 28 | P >>> 4, j;);
                                                                                                                        if (P = r, !(t[o + 64 >> 2] | t[o + 68 >> 2]) | !(8 & h)) break P;I = 1298 + (l >>> 4 | 0) | 0,
                                                                                                                        p = 2;
                                                                                                                        break P
                                                                                                                    }
                                                                                                                    if (r = k, g = l = t[o + 68 >> 2], l | (P = t[o + 64 >> 2]))
                                                                                                                        for (; n[0 | (r = r - 1 | 0)] = 7 & P | 48, m = !g & P >>> 0 > 7 | !!(0 | g), g = (l = g) >>> 3 | 0, P = (7 & l) << 29 | P >>> 3, m;);
                                                                                                                    if (P = r, !(8 & h)) break P;w = (0 | (r = k - r | 0)) < (0 | w) ? w : r + 1 | 0;
                                                                                                                    break P
                                                                                                                }
                                                                                                                P = t[o + 64 >> 2],
                                                                                                                g = r = t[o + 68 >> 2],
                                                                                                                (0 | r) < 0 ? (g = l = 0 - (r + !!(0 | P) | 0) | 0, P = 0 - P | 0, t[o + 64 >> 2] = P, t[o + 68 >> 2] = l, p = 1, I = 1298) : 2048 & h ? (p = 1, I = 1299) : I = (p = 1 & h) ? 1300 : 1298
                                                                                                            }
                                                                                                            P = Ue(P, g, k)
                                                                                                        }
                                                                                                        if ((0 | w) < 0 & z) break A;
                                                                                                        if (h = z ? -65537 & h : h, !(w | !!((r = t[o + 64 >> 2]) | (l = t[o + 68 >> 2])))) {
                                                                                                            P = k, w = 0;
                                                                                                            break b
                                                                                                        }
                                                                                                        w = (0 | (r = !(r | l) + (k - P | 0) | 0)) < (0 | w) ? w : r;
                                                                                                        break b
                                                                                                    }
                                                                                                    m = y = w >>> 0 >= 2147483647 ? 2147483647 : w,
                                                                                                    h = !!(0 | y);g: {
                                                                                                        P: {
                                                                                                            w: {
                                                                                                                d: if (!(!(3 & (r = P = (r = t[o + 64 >> 2]) || 2139)) | !y))
                                                                                                                    for (;;) {
                                                                                                                        if (!v[0 | r]) break w;
                                                                                                                        if (h = !!(0 | (m = m - 1 | 0)), !(3 & (r = r + 1 | 0))) break d;
                                                                                                                        if (!m) break
                                                                                                                    }
                                                                                                                if (!h) break P;
                                                                                                                if (!(!v[0 | r] | m >>> 0 < 4))
                                                                                                                    for (;;) {
                                                                                                                        if (~(l = t[r >> 2]) & l - 16843009 & -2139062144) break w;
                                                                                                                        if (r = r + 4 | 0, !((m = m - 4 | 0) >>> 0 > 3)) break
                                                                                                                    }
                                                                                                                if (!m) break P
                                                                                                            }
                                                                                                            for (;;) {
                                                                                                                if (!v[0 | r]) break g;
                                                                                                                if (r = r + 1 | 0, !(m = m - 1 | 0)) break
                                                                                                            }
                                                                                                        }
                                                                                                        r = 0
                                                                                                    }
                                                                                                    if (y = (r = r ? r - P | 0 : y) + P | 0, (0 | w) >= 0) {
                                                                                                        h = g, w = r;
                                                                                                        break b
                                                                                                    }
                                                                                                    if (h = g, w = r, v[0 | y]) break A;
                                                                                                    break b
                                                                                                }
                                                                                                if (w) {
                                                                                                    g = t[o + 64 >> 2];
                                                                                                    break s
                                                                                                }
                                                                                                l = 0,
                                                                                                Ne(e, 32, D, 0, h);
                                                                                                break c
                                                                                            }
                                                                                            t[o + 12 >> 2] = 0,
                                                                                            t[o + 8 >> 2] = t[o + 64 >> 2],
                                                                                            g = o + 8 | 0,
                                                                                            t[o + 64 >> 2] = g,
                                                                                            w = -1
                                                                                        }
                                                                                        for (l = 0;;) {
                                                                                            if (P = t[g >> 2]) {
                                                                                                if ((0 | (P = ye(o + 4 | 0, P))) < 0) break r;
                                                                                                if (!(P >>> 0 > w - l >>> 0) && (g = g + 4 | 0, w >>> 0 > (l = l + P | 0) >>> 0)) continue
                                                                                            }
                                                                                            break
                                                                                        }
                                                                                        if (y = 61, (0 | l) < 0) break f;
                                                                                        if (Ne(e, 32, D, l, h), l)
                                                                                            for (y = 0, g = t[o + 64 >> 2];;) {
                                                                                                if (!(P = t[g >> 2])) break c;
                                                                                                if ((y = (P = ye(w = o + 4 | 0, P)) + y | 0) >>> 0 > l >>> 0) break c;
                                                                                                if (er(e, w, P), g = g + 4 | 0, !(l >>> 0 > y >>> 0)) break
                                                                                            } else l = 0
                                                                                    }
                                                                                    Ne(e, 32, D, l, 8192 ^ h),
                                                                                    l = (0 | l) < (0 | D) ? D : l;
                                                                                    continue a
                                                                                }
                                                                                if ((0 | w) < 0 & z) break A;
                                                                                if (y = 61, (0 | (l = 0 | nr[0 | a](e, d[o + 64 >> 3], D, w, h, l))) >= 0) continue a;
                                                                                break f
                                                                            }
                                                                            n[o + 55 | 0] = t[o + 64 >> 2],
                                                                            w = 1,
                                                                            P = s,
                                                                            h = g;
                                                                            break b
                                                                        }
                                                                        g = v[l + 1 | 0],
                                                                        l = l + 1 | 0
                                                                    }
                                                                if (e) break e;
                                                                if (!T) break n;
                                                                for (l = 1;;) {
                                                                    if (e = t[(l << 2) + i >> 2]) {
                                                                        if (oe((l << 3) + A | 0, e, f), B = 1, 10 != (0 | (l = l + 1 | 0))) continue;
                                                                        break e
                                                                    }
                                                                    break
                                                                }
                                                                if (B = 1, l >>> 0 >= 10) break e;
                                                                for (;;) {
                                                                    if (t[(l << 2) + i >> 2]) break t;
                                                                    if (10 == (0 | (l = l + 1 | 0))) break
                                                                }
                                                                break e
                                                            }
                                                            y = 28;
                                                            break f
                                                        }
                                                        if ((0 | (r = (0 | (g = y - P | 0)) < (0 | w) ? w : g)) > (2147483647 ^ p)) break A;
                                                        if (y = 61, (0 | W) < (0 | (l = (0 | (w = r + p | 0)) < (0 | D) ? D : w))) break f;Ne(e, 32, l, w, h),
                                                        er(e, I, p),
                                                        Ne(e, 48, l, w, 65536 ^ h),
                                                        Ne(e, 48, r, g, 0),
                                                        er(e, P, g),
                                                        Ne(e, 32, l, w, 8192 ^ h),
                                                        r = t[o + 76 >> 2];
                                                        continue
                                                    }
                                                    break
                                                }
                                                break
                                            }
                                            B = 0;
                                            break e
                                        }
                                        y = 61
                                    }
                                    t[2726] = y
                                }
                                B = -1
                            }
                            return G = o + 80 | 0, B
                        }

                        function F(e, r, f, A, i, a, n, b, o) {
                            var k, u, c, s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0,
                                y = 0,
                                h = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                Z = 0,
                                M = 0,
                                F = 0,
                                R = 0,
                                H = 0,
                                N = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                O = 0,
                                X = 0;
                            G = k = G - 96 | 0, B = 65535 & o, P = -2147483648 & (i ^ o), I = C = 65535 & i;
                            e: {
                                if (!((u = o >>> 16 & 32767) - 32767 >>> 0 > 4294934529 & (c = i >>> 16 & 32767) - 32767 >>> 0 >= 4294934530)) {
                                    if (s = A, !(!A & 2147418112 == (0 | (d = y = 2147483647 & i)) ? !(r | f) : d >>> 0 < 2147418112)) {
                                        v = A, P = 32768 | i;
                                        break e
                                    }
                                    if (!(!(i = b) & 2147418112 == (0 | (w = y = 2147483647 & o)) ? !(a | n) : w >>> 0 < 2147418112)) {
                                        v = i, P = 32768 | o, r = a, f = n;
                                        break e
                                    }
                                    if (!(r | s | 2147418112 ^ d | f)) {
                                        if (!(i | a | n | w)) {
                                            P = 2147450880, r = 0, f = 0;
                                            break e
                                        }
                                        P |= 2147418112, r = 0, f = 0;
                                        break e
                                    }
                                    if (!(i | a | 2147418112 ^ w | n)) {
                                        if (i = r | s, A = f | d, r = 0, f = 0, !(A | i)) {
                                            P = 2147450880;
                                            break e
                                        }
                                        P |= 2147418112;
                                        break e
                                    }
                                    if (!(r | s | f | d)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    if (!(i | a | n | w)) {
                                        r = 0, f = 0;
                                        break e
                                    }
                                    65535 == (0 | d) | d >>> 0 < 65535 && (y = (s = !(A | C)) << 6, i = m(o = s ? r : A) + 32 | 0, Ce(k + 80 | 0, r, f, A, C, (o = y + (32 == (0 | (o = m(s ? f : C))) ? i : o) | 0) - 15 | 0), h = 16 - o | 0, A = t[k + 88 >> 2], I = t[k + 92 >> 2], f = t[k + 84 >> 2], r = t[k + 80 >> 2]), w >>> 0 > 65535 || (C = (o = !(b | B)) << 6, s = m(i = o ? a : b) + 32 | 0, Ce(k - -64 | 0, a, n, b, B, (i = C + (32 == (0 | (i = m(o ? n : B))) ? s : i) | 0) - 15 | 0), h = 16 + (h - i | 0) | 0, b = t[k + 72 >> 2], B = t[k + 76 >> 2], a = t[k + 64 >> 2], n = t[k + 68 >> 2])
                                }
                                if (i = a, a = n << 15 | a >>> 17, N = f, y = Re(p = -32768 & (o = i << 15), i = 0, f, 0), z = i = E, V = a, d = r, f = Re(a, 0, r, 0), a = E + i | 0, o = r = f + y | 0, f = r >>> 0 < f >>> 0 ? a + 1 | 0 : a, a = r, s = 0, r = Re(d, l, p, l), i = E + a | 0, C = i = r >>> 0 > (w = s + r | 0) >>> 0 ? i + 1 | 0 : i, Q = (0 | a) == (0 | i) & s >>> 0 > w >>> 0 | i >>> 0 < a >>> 0, x = A, D = Re(p, l, A, 0), O = E, r = Re(N, l, V, l), s = E + O | 0, s = r >>> 0 > (T = r + D | 0) >>> 0 ? s + 1 | 0 : s, r = B << 15 | b >>> 17, A = Re(j = b << 15 | n >>> 17, 0, d, l), a = E + s | 0, S = a = A >>> 0 > (W = A + T | 0) >>> 0 ? a + 1 | 0 : a, a = (A = (0 | f) == (0 | z) & o >>> 0 < y >>> 0 | f >>> 0 < z >>> 0) + a | 0, B = a = f >>> 0 > (U = f + W | 0) >>> 0 ? a + 1 | 0 : a, n = U, f = a, I = Re(p, l, Z = 65536 | I, g), X = E, A = Re(x, v, V, l), i = E + X | 0, o = i = A >>> 0 > (M = A + I | 0) >>> 0 ? i + 1 | 0 : i, r = Re(F = -2147483648 | r, 0, d, l), a = E + i | 0, a = r >>> 0 > (R = r + M | 0) >>> 0 ? a + 1 | 0 : a, A = Re(j, v, N, l), H = a, a = a + E | 0, z = r = A + R | 0, y = r >>> 0 < A >>> 0 ? a + 1 | 0 : a, i = f + (a = r) | 0, p = i = (r = 0) >>> 0 > (d = r + n | 0) >>> 0 ? i + 1 | 0 : i, a = i, f = (r = d + Q | 0) >>> 0 < d >>> 0 ? a + 1 | 0 : a, h = ((c + u | 0) + h | 0) - 16383 | 0, A = Re(F, v, N, l), b = E, i = Re(Z, v, V, l), a = E + b | 0, g = (0 | b) == (0 | (a = i >>> 0 > (n = i + A | 0) >>> 0 ? a + 1 | 0 : a)) & A >>> 0 > n >>> 0 | a >>> 0 < b >>> 0, b = a, i = Re(j, v, x, v), a = E + a | 0, i = a = (A = i + n | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, n = (0 | a) == (0 | b) & A >>> 0 < n >>> 0 | a >>> 0 < b >>> 0, a = 0, a = (b = n) >>> 0 > (n = n + g | 0) >>> 0 ? 1 : a, b = n, n = Re(F, v, Z, v), a = E + a | 0, Q = b = b + n | 0, n = n >>> 0 > b >>> 0 ? a + 1 | 0 : a, b = A, l = i, i = (0 | s) == (0 | O) & D >>> 0 > T >>> 0 | s >>> 0 < O >>> 0, a = 0, i = ((g = s = (0 | s) == (0 | S) & T >>> 0 > W >>> 0 | s >>> 0 > S >>> 0) >>> 0 > (s = i + s | 0) >>> 0 ? 1 : a) + l | 0, a = n, g = i = (A = A + s | 0) >>> 0 < s >>> 0 ? i + 1 | 0 : i, D = A, i = A = (0 | i) == (0 | l) & A >>> 0 < b >>> 0 | i >>> 0 < l >>> 0, s = A = A + Q | 0, b = a = i >>> 0 > A >>> 0 ? a + 1 | 0 : a, i = Re(j, v, Z, v), l = E, n = Re(F, v, x, v), a = E + l | 0, n = a = (A = n + i | 0) >>> 0 < n >>> 0 ? a + 1 | 0 : a, i = (a = (0 | l) == (0 | a) & A >>> 0 < i >>> 0 | a >>> 0 < l >>> 0) + b | 0, b = i = n >>> 0 > (T = n + s | 0) >>> 0 ? i + 1 | 0 : i, a = (s = A) + g | 0, i = a = (A = (i = 0) + D | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, n = (0 | g) == (0 | a) & A >>> 0 < D >>> 0 | a >>> 0 < g >>> 0, a = b, a = (b = n) >>> 0 > (n = n + (l = T) | 0) >>> 0 ? a + 1 | 0 : a, D = n, b = A, s = i, i = (A = (A = (A = (0 | o) == (0 | X) & I >>> 0 > M >>> 0 | o >>> 0 < X >>> 0) + (o = (0 | o) == (0 | H) & M >>> 0 > R >>> 0 | o >>> 0 > H >>> 0) | 0) + (i = (0 | y) == (0 | H) & z >>> 0 < R >>> 0 | y >>> 0 < H >>> 0) | 0) + s | 0, a = n = a, s = n = (b = (0 | (i = (A = o = (g = y) + b | 0) >>> 0 < g >>> 0 ? i + 1 | 0 : i)) == (0 | s) & b >>> 0 > A >>> 0 | i >>> 0 < s >>> 0) + D | 0, n = a = b >>> 0 > n >>> 0 ? a + 1 | 0 : a, b = A, a = 0, o = i, i = i + ((l = g = (0 | B) == (0 | p) & d >>> 0 < U >>> 0 | B >>> 0 > p >>> 0) >>> 0 > (g = g + ((0 | B) == (0 | S) & W >>> 0 > U >>> 0 | B >>> 0 < S >>> 0) | 0) >>> 0 ? 1 : a) | 0, a = n, o = a = (n = b = (0 | (i = (A = A + g | 0) >>> 0 < g >>> 0 ? i + 1 | 0 : i)) == (0 | o) & A >>> 0 < b >>> 0 | i >>> 0 < o >>> 0) >>> 0 > (b = b + s | 0) >>> 0 ? a + 1 | 0 : a, 65536 & a ? h = h + 1 | 0 : (s = C >>> 31 | 0, a = o << 1 | b >>> 31, b = b << 1 | i >>> 31, o = a, a = i << 1 | A >>> 31, A = A << 1 | f >>> 31, i = a, a = C << 1 | w >>> 31, w <<= 1, C = a, a = f << 1 | r >>> 31, r = r << 1 | s, f = a | (n = 0)), (0 | h) >= 32767) P |= 2147418112,
                                r = 0,
                                f = 0;
                                else {
                                    r: {
                                        if ((0 | h) <= 0) {
                                            if ((n = 1 - h | 0) >>> 0 <= 127) {
                                                Ce(k + 48 | 0, w, C, r, f, a = h + 127 | 0), Ce(k + 32 | 0, A, i, b, o, a), de(k + 16 | 0, w, C, r, f, n), de(k, A, i, b, o, n), w = t[k + 32 >> 2] | t[k + 16 >> 2] | !!(t[k + 48 >> 2] | t[k + 56 >> 2] | t[k + 52 >> 2] | t[k + 60 >> 2]), C = t[k + 36 >> 2] | t[k + 20 >> 2], r = t[k + 40 >> 2] | t[k + 24 >> 2], f = t[k + 44 >> 2] | t[k + 28 >> 2], A = t[k >> 2], i = t[k + 4 >> 2], n = t[k + 8 >> 2], a = t[k + 12 >> 2];
                                                break r
                                            }
                                            r = 0, f = 0;
                                            break e
                                        }
                                        n = b,
                                        a = 65535 & o | h << 16
                                    }
                                    v |= n,
                                    P |= a,
                                    (!r & -2147483648 == (0 | f) ? !(w | C) : (0 | f) > 0 | (0 | f) >= 0) ? r | w | -2147483648 ^ f | C ? (r = A, f = i) : (A = (0 | (a = i)) == (0 | (f = (f = r = 1 & A) >>> 0 > (r = r + A | 0) >>> 0 ? a + 1 | 0 : a)) & r >>> 0 < A >>> 0 | f >>> 0 < a >>> 0, a = P, P = (v = A + v | 0) >>> 0 < A >>> 0 ? a + 1 | 0 : a) : (s = (r = A + 1 | 0) ? i : i + 1 | 0, i = P, f = s, P = (A = !(s | r)) >>> 0 > (v = A + v | 0) >>> 0 ? i + 1 | 0 : i)
                                }
                            }
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = v, t[e + 12 >> 2] = P, G = k + 96 | 0
                        }

                        function R(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                y = 0,
                                h = 0,
                                m = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0;
                            if ((0 | (f = t[e + 324 >> 2])) > 0)
                                for (;;) {
                                    if (A = t[e + 320 >> 2] + (c << 2) | 0, r = t[A >> 2], v[r + t[e + 308 >> 2] | 0]) {
                                        if (r = t[e + 296 >> 2] + C(r, 12) | 0, !((0 | (a = t[r + 4 >> 2])) <= 0)) {
                                            for (f = 0, b = 0; o = (i = t[r >> 2]) + (f << 3) | 0, 1 != (3 & t[t[t[e + 332 >> 2] >> 2] + (t[o >> 2] << 2) >> 2]) && (g = t[o + 4 >> 2], t[(i = i + (b << 3) | 0) >> 2] = t[o >> 2], t[i + 4 >> 2] = g, a = t[r + 4 >> 2], b = b + 1 | 0), (0 | a) > (0 | (f = f + 1 | 0)););
                                            (0 | (o = f - b | 0)) <= 0 || (t[r + 4 >> 2] = a - o)
                                        }
                                        n[t[e + 308 >> 2] + t[A >> 2] | 0] = 0, f = t[e + 324 >> 2]
                                    }
                                    if (!((0 | (c = c + 1 | 0)) < (0 | f))) break
                                }
                            t[e + 320 >> 2] && (t[e + 324 >> 2] = 0);
                            e: {
                                if ((0 | (f = t[e + 408 >> 2])) >= t[e + 376 >> 2]) g = -1,
                                r = 0;
                                else {
                                    for (g = -1;;) {
                                        if (t[e + 408 >> 2] = f + 1, l = t[t[e + 372 >> 2] + (f << 2) >> 2], d = t[e + 296 >> 2] + C(l, 12) | 0, f = t[d >> 2], r = t[d + 4 >> 2]) {
                                            for (P = (r << 3) + f | 0, h = 1 ^ l, b = f;;) {
                                                r: {
                                                    f: if (-2 == (0 | (A = t[f + 4 >> 2])) | v[t[e + 336 >> 2] + (A >> 1) | 0] != (1 & A)) {
                                                        A: {
                                                            i: {
                                                                a: {
                                                                    n: {
                                                                        b: {
                                                                            if (o = t[f >> 2], u = t[e + 476 >> 2] + (o << 2) | 0, 32 & (i = t[u >> 2])) {
                                                                                if ((0 | (k = t[4 + (((y = i >>> 6 | 0) << 2) + u | 0) >> 2])) <= 0) break f;
                                                                                if (T = y - k | 0, r = -1, I = k - 1 | 0, m = t[e + 336 >> 2], w = 0, p = 1, i = 0, c = 0, a = 0, k >>> 0 >= y >>> 0) break b;
                                                                                for (;;) {
                                                                                    t: {
                                                                                        D = t[4 + (z = (c << 2) + u | 0) >> 2];o: if (!(2 & (A = v[(D >> 1) + m | 0]))) {
                                                                                            k: {
                                                                                                if (1 != (A ^ 1 & D)) {
                                                                                                    if (A = i + 1 | 0, (0 | i) > (0 | T)) {
                                                                                                        r = -1;
                                                                                                        break A
                                                                                                    }
                                                                                                    if (a = k, (0 | l) == (0 | D)) break k;
                                                                                                    i = A;
                                                                                                    break o
                                                                                                }
                                                                                                if ((0 | I) <= (0 | (w = w + 1 | 0))) break a;
                                                                                                break o
                                                                                            }
                                                                                            for (;;) {
                                                                                                if (r = t[4 + (i = (a << 2) + u | 0) >> 2], v[(r >> 1) + m | 0] != (1 & r)) break t;
                                                                                                if (!((0 | y) > (0 | (a = a + 1 | 0)))) break
                                                                                            }
                                                                                            r = -2,
                                                                                            i = A
                                                                                        }if (p = (0 | k) > (0 | (c = c + 1 | 0)), (0 | k) != (0 | c)) continue;
                                                                                        break n
                                                                                    }
                                                                                    break
                                                                                }
                                                                                t[i + 4 >> 2] = l, t[z + 4 >> 2] = r;
                                                                                break A
                                                                            }
                                                                            if ((0 | h) == (0 | (r = t[u + 4 >> 2])) && (r = t[u + 8 >> 2], t[u + 8 >> 2] = h, t[u + 4 >> 2] = r), f = f + 8 | 0, !((0 | r) == (0 | A) | v[t[e + 336 >> 2] + (r >> 1) | 0] != (1 & r))) {
                                                                                t[b >> 2] = o, t[b + 4 >> 2] = r, b = b + 8 | 0;
                                                                                break r
                                                                            }
                                                                            t: {
                                                                                o: if (!(i >>> 0 < 192)) {
                                                                                    for (i = i >>> 6 | 0, k = t[e + 336 >> 2], a = 2;;) {
                                                                                        if (A = t[4 + (c = (a << 2) + u | 0) >> 2], 1 == (v[k + (A >> 1) | 0] ^ 1 & A)) {
                                                                                            if ((0 | i) != (0 | (a = a + 1 | 0))) continue;
                                                                                            break o
                                                                                        }
                                                                                        break
                                                                                    }
                                                                                    if (t[u + 8 >> 2] = A, t[c + 4 >> 2] = h, i = t[e + 296 >> 2] + C(1 ^ t[u + 8 >> 2], 12) | 0, (0 | (a = t[i + 4 >> 2])) == t[i + 8 >> 2]) {
                                                                                        if ((A = ((0 | (A = a >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break t;
                                                                                        if (k = t[i >> 2], A = A + a | 0, t[i + 8 >> 2] = A, A = Y(k, A << 3), t[i >> 2] = A, !A) break t;
                                                                                        a = t[i + 4 >> 2]
                                                                                    } else A = t[i >> 2];
                                                                                    t[i + 4 >> 2] = a + 1, t[(A = (a << 3) + A | 0) >> 2] = o, t[A + 4 >> 2] = r;
                                                                                    break r
                                                                                }if (A = o, t[b >> 2] = A, t[b + 4 >> 2] = r, b = b + 8 | 0, k = 1 & r, a = (i = r >> 1) + t[e + 336 >> 2] | 0, 1 == (k ^ v[0 | a])) {
                                                                                    if (t[e + 408 >> 2] = t[e + 376 >> 2], f >>> 0 >= P >>> 0) {
                                                                                        g = A;
                                                                                        break r
                                                                                    }
                                                                                    for (; r = t[f + 4 >> 2], t[b >> 2] = t[f >> 2], t[b + 4 >> 2] = r, b = b + 8 | 0, P >>> 0 > (f = f + 8 | 0) >>> 0;);
                                                                                    g = o;
                                                                                    break r
                                                                                }
                                                                                n[0 | a] = k,
                                                                                o = t[e + 388 >> 2],
                                                                                i = t[e + 396 >> 2] + (i << 3) | 0,
                                                                                t[i >> 2] = A,
                                                                                t[i + 4 >> 2] = o,
                                                                                o = t[e + 376 >> 2],
                                                                                t[e + 376 >> 2] = o + 1,
                                                                                t[t[e + 372 >> 2] + (o << 2) >> 2] = r;
                                                                                break r
                                                                            }
                                                                            break e
                                                                        }
                                                                        for (;;) {
                                                                            c = t[4 + ((a << 2) + u | 0) >> 2];
                                                                            b: if (!(2 & (A = v[(c >> 1) + m | 0]))) {
                                                                                if (1 == (A ^ 1 & c)) {
                                                                                    if ((0 | I) > (0 | (w = w + 1 | 0))) break b;
                                                                                    break a
                                                                                }
                                                                                if (A = i + 1 | 0, (0 | i) > (0 | T)) {
                                                                                    r = -1;
                                                                                    break A
                                                                                }
                                                                                r = (0 | c) == (0 | l) ? -2 : r, i = A
                                                                            }
                                                                            if (p = (0 | k) > (0 | (a = a + 1 | 0)), (0 | a) == (0 | k)) break
                                                                        }
                                                                    }
                                                                    r = -1;
                                                                    break i
                                                                }
                                                                if (-2 == (0 | r)) {
                                                                    A = i, r = l;
                                                                    break A
                                                                }
                                                                r = -1 == (0 | r) ? l : r
                                                            }
                                                            A = i
                                                        }
                                                        A: {
                                                            i: {
                                                                a: switch ((r = p ? r : (0 | A) > 1 ? -1 : -2) + 2 | 0) {
                                                                    case 1:
                                                                        break i;
                                                                    case 0:
                                                                        break a;
                                                                    default:
                                                                        break A
                                                                }
                                                                if (r = t[u >> 2], t[4 + ((r >>> 4 & 268435452) + u | 0) >> 2] <= 0) break f;
                                                                for (a = 0;
                                                                    (0 | (A = t[4 + ((a << 2) + u | 0) >> 2])) != (0 | l) && (k = (i = A >> 1) + t[e + 336 >> 2] | 0, 1 != (v[0 | k] ^ 1 & A) && (A ^= 1, n[0 | k] = 1 & A, r = t[e + 388 >> 2], i = t[e + 396 >> 2] + (i << 3) | 0, t[i >> 2] = o, t[i + 4 >> 2] = r, r = t[e + 376 >> 2], t[e + 376 >> 2] = r + 1, t[t[e + 372 >> 2] + (r << 2) >> 2] = A, r = t[u >> 2])), (0 | (a = a + 1 | 0)) < t[4 + ((r >>> 4 & 268435452) + u | 0) >> 2];);
                                                                break f
                                                            }
                                                            if (t[e + 408 >> 2] = t[e + 376 >> 2], f >>> 0 >= P >>> 0) {
                                                                g = o;
                                                                break r
                                                            }
                                                            for (; r = t[f + 4 >> 2], t[b >> 2] = t[f >> 2], t[b + 4 >> 2] = r, b = b + 8 | 0, P >>> 0 > (f = f + 8 | 0) >>> 0;);g = o;
                                                            break r
                                                        }
                                                        if (A = f + 8 | 0, (0 | r) == (0 | l)) {
                                                            r = t[f + 4 >> 2], t[b >> 2] = t[f >> 2], t[b + 4 >> 2] = r, b = b + 8 | 0, f = A;
                                                            break r
                                                        }
                                                        A: {
                                                            if (f = t[e + 296 >> 2] + C(r, 12) | 0, (0 | (a = t[f + 4 >> 2])) == t[f + 8 >> 2]) {
                                                                if ((r = ((0 | (r = a >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break A;
                                                                if (i = t[f >> 2], r = r + a | 0, t[f + 8 >> 2] = r, r = Y(i, r << 3), t[f >> 2] = r, !r) break A;
                                                                a = t[f + 4 >> 2]
                                                            } else r = t[f >> 2];t[f + 4 >> 2] = a + 1,
                                                            t[(r = (a << 3) + r | 0) >> 2] = o,
                                                            t[r + 4 >> 2] = -2,
                                                            f = A;
                                                            break r
                                                        }
                                                        break e
                                                    }r = t[f + 4 >> 2],
                                                    t[b >> 2] = t[f >> 2],
                                                    t[b + 4 >> 2] = r,
                                                    b = b + 8 | 0,
                                                    f = f + 8 | 0
                                                }
                                                if ((0 | f) == (0 | P)) break
                                            }
                                            f = b
                                        } else P = f;
                                        if ((0 | (r = P - f >> 3)) > 0 && (t[d + 4 >> 2] = t[d + 4 >> 2] - r), j = j + 1 | 0, !((0 | (f = t[e + 408 >> 2])) < t[e + 376 >> 2])) break
                                    }
                                    r = j
                                }
                                return f = r + (A = t[e + 176 >> 2]) | 0,
                                o = t[e + 180 >> 2],
                                t[e + 176 >> 2] = f,
                                t[e + 180 >> 2] = f >>> 0 < A >>> 0 ? o + 1 | 0 : o,
                                o = t[e + 416 >> 2],
                                f = t[e + 420 >> 2] - (r >>> 0 > o >>> 0) | 0,
                                r = o - r | 0,
                                t[e + 416 >> 2] = r,
                                t[e + 420 >> 2] = f,
                                g
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function H(e, r) {
                            var f, A, i, a, n = 0,
                                b = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                C = 0,
                                y = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0;
                            G = f = G - 16 | 0, c(+r), v = 0 | o(1), y = 0 | o(0), c(+e), s = 0 | o(1), n = 0 | o(0);
                            e: {
                                if (!((a = (i = 2047 & (A = v >>> 20 | 0)) - 1086 | 0) >>> 0 > 4294967167 & (w = s >>> 20 | 0) - 2047 >>> 0 >= 4294965250)) {
                                    if (!(D = y << 1) & 2097152 == (0 | (g = 2097152 + (l = v << 1 | y >>> 31) | 0)) | g >>> 0 < 2097152) {
                                        if (b = 1, !(l | D) | !n & 1072693248 == (0 | s)) break e;
                                        if (g = s << 1, s = n, !((!D & -2097152 == (0 | l) | l >>> 0 < 4292870144) & (!(s <<= 1) & -2097152 == (0 | (n = g | n >>> 31)) | n >>> 0 < 4292870144))) {
                                            b = e + r;
                                            break e
                                        }
                                        if (!s & 2145386496 == (0 | n)) break e;
                                        b = (0 | v) < 0 ^ n >>> 0 < 2145386496 ? 0 : r * r;
                                        break e
                                    }
                                    if (!(n << 1) & 2097152 == (0 | (l = 2097152 + (s << 1 | n >>> 31) | 0)) | l >>> 0 < 2097152) {
                                        if (b = e * e, (0 | s) < 0 && (b = 1 == (0 | Me(y, v)) ? -b : b), (0 | v) > 0 | (0 | v) >= 0) break e;
                                        d[8 + (n = G - 16 | 0) >> 3] = 1 / b, b = d[n + 8 >> 3];
                                        break e
                                    }
                                    if ((0 | s) < 0) {
                                        if (!(n = Me(y, v))) {
                                            b = (e -= e) / e;
                                            break e
                                        }
                                        w &= 2047, p = (1 == (0 | n)) << 18, c(+e), s = 0 | o(1), n = 0 | o(0), s &= 2147483647
                                    }
                                    if (a >>> 0 <= 4294967167) {
                                        if (b = 1, (l = 1072693248 == (0 | s)) & !n) break e;
                                        if (i >>> 0 <= 957) {
                                            b = (!!(0 | n) & l | s >>> 0 > 1072693248 ? r : -r) + 1;
                                            break e
                                        }
                                        if ((1072693248 == (0 | s) & !!(0 | n) | s >>> 0 > 1072693248) != (A >>> 0 > 2047 | 0)) {
                                            d[8 + (n = G - 16 | 0) >> 3] = 3105036184601418e216, b = 3105036184601418e216 * d[n + 8 >> 3];
                                            break e
                                        }
                                        d[8 + (n = G - 16 | 0) >> 3] = 12882297539194267e-247, b = 12882297539194267e-247 * d[n + 8 >> 3];
                                        break e
                                    }
                                    w || (c(4503599627370496 * e), s = 0 | o(1), n = 0 | o(0), s = (2147483647 & s) - 54525952 | 0)
                                }
                                k(0, -134217728 & y),
                                k(1, 0 | v),
                                T = +u(),
                                g = ((l = v = s - 1072076117 | 0) >>> 13 & 127) << 5,
                                j = (C = +(l >> 20)) * d[625] + d[g + 5088 >> 3],
                                v = n - (y = 0) | 0,
                                n = l = s - ((-1048576 & l) + (n >>> 0 < y >>> 0) | 0) | 0,
                                k(0, 0),
                                k(1, 0 | (v - -2147483648 >>> 0 < 2147483648 ? n + 1 : n)),
                                b = (e = +u()) * (P = d[g + 5064 >> 3]) - 1,
                                k(0, 0 | v),
                                k(1, 0 | n),
                                P = (e = b + (I = (+u() - e) * P)) * (m = d[626]),
                                B = b,
                                b = (m = (C = e + (z = C * d[624] + d[g + 5080 >> 3])) + (B *= b *= m)) + (e = (B = j + (e + (z - C)) + I * (P + b) + (B + (C - m))) + e * (b = e * P) * (b * (b * (e * d[632] + d[631]) + (e * d[630] + d[629])) + (e * d[628] + d[627]))),
                                d[f + 8 >> 3] = e + (m - b),
                                c(+b),
                                n = 0 | o(1),
                                k(0, -134217728 & o(0)),
                                k(1, 0 | n),
                                e = T * (P = +u()),
                                r = (r - T) * P + (d[f + 8 >> 3] + (b - P)) * r,
                                c(+e),
                                n = 0 | o(1),
                                o(0);r: {
                                    if (!((w = n >>> 20 & 2047) - 969 >>> 0 < 63)) {
                                        if (w >>> 0 < 969) {
                                            e += 1, b = p ? -e : e;
                                            break r
                                        }
                                        if (n = w >>> 0 < 1033, w = 0, !n) {
                                            if (c(+e), n = 0 | o(1), o(0), (0 | n) < 0) {
                                                d[8 + (n = G - 16 | 0) >> 3] = p ? -12882297539194267e-247 : 12882297539194267e-247, b = 12882297539194267e-247 * d[n + 8 >> 3];
                                                break r
                                            }
                                            d[8 + (n = G - 16 | 0) >> 3] = p ? -3105036184601418e216 : 3105036184601418e216, b = 3105036184601418e216 * d[n + 8 >> 3];
                                            break r
                                        }
                                    }
                                    b = d[355],
                                    b = (r = (e = (b = (P = d[354] * e + b) - b) * d[357] + (b * d[356] + e) + r) * e) * r * (e * d[361] + d[360]),
                                    r *= e * d[359] + d[358],
                                    c(+P),
                                    o(1),
                                    v = 0 | o(0),
                                    e = b + (r + (d[2944 + (s = v << 4 & 2032) >> 3] + e)),
                                    l = t[(s = s + 2952 | 0) >> 2],
                                    g = t[s + 4 >> 2],
                                    n = l,
                                    g = (l = (s = v + p | 0) << 13) + g | 0,
                                    g = (n = n + (s = 0) | 0) >>> 0 < s >>> 0 ? g + 1 | 0 : g,
                                    w ? (k(0, 0 | n), k(1, 0 | g), b = (r = +u()) * e + r) : -2147483648 & v ? (k(0, 0 | n), k(1, 0 | (l = g + 1071644672 | 0)), r = +u(), h(e = (P = r * e) + r) < 1 && (d[8 + (n = G - 16 | 0) >> 3] = 22250738585072014e-324, d[n + 8 >> 3] = 22250738585072014e-324 * d[n + 8 >> 3], k(0, 0), k(1, -2147483648 & l), e = (C = e + (b = e < 0 ? -1 : 1)) + (P + (r - e) + (e + (b - C))) - b, W = +u(), e = 0 == e ? W : e), b = 22250738585072014e-324 * e) : (k(0, 0 | n), k(1, g - 1058013184 | 0), b = 5486124068793689e288 * ((r = +u()) * e + r))
                                }
                            }
                            return G = f + 16 | 0, b
                        }

                        function N(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0;
                            G = k = G - 112 | 0, u = 2147483647 & o;
                            e: {
                                if (c = 2147418112, l = !(r | f), (A | (s = 2147483647 & i) ? s - c >>> 0 < 2147549184 : l) || !(!b & -2147418112 == (0 | (P = u - c | 0)) ? a | n : -2147418112 == (0 | P) & !!(0 | b) | P >>> 0 > 2147549184)) {
                                    if (!(!A & 2147418112 == (0 | s) ? l : s >>> 0 < 2147418112)) {
                                        b = A, o = 32768 | i, a = r, n = f;
                                        break e
                                    }
                                    if (!(!b & 2147418112 == (0 | u) ? !(a | n) : u >>> 0 < 2147418112)) {
                                        o |= 32768;
                                        break e
                                    }
                                    if (!(r | A | 2147418112 ^ s | f)) {
                                        u = A, b = (A = !(r ^ a | A ^ b | f ^ n | i ^ o ^ -2147483648)) ? 0 : u, o = A ? 2147450880 : i, a = A ? 0 : r, n = A ? 0 : f;
                                        break e
                                    }
                                    if (!((c = a | b) | 2147418112 ^ u | n)) break e;
                                    if (!(r | A | f | s)) {
                                        if (n | u | c) break e;
                                        a &= r, n &= f, b &= A, o &= i;
                                        break e
                                    }
                                    if (!(a | b | n | u)) {
                                        a = r, n = f, b = A, o = i;
                                        break e
                                    }
                                }
                                s = (l = g = (c = (0 | u) == (0 | s)) & (0 | A) == (0 | b) ? (0 | f) == (0 | n) & r >>> 0 < a >>> 0 | f >>> 0 < n >>> 0 : c & A >>> 0 < b >>> 0 | u >>> 0 > s >>> 0) ? a : r,
                                P = l ? n : f,
                                d = c = l ? o : i,
                                l = l ? b : A,
                                w = 65535 & c,
                                u = g ? A : b,
                                c = (A = c = g ? i : o) >>> 16 & 32767,
                                (v = d >>> 16 & 32767) || (v = (b = v = !(l | w)) << 6, C = m(b ? s : l) + 32 | 0, Ce(k + 96 | 0, s, P, l, w, (v = v + (32 == (0 | (b = m(b ? P : w))) ? C : b) | 0) - 15 | 0), l = t[k + 104 >> 2], w = t[k + 108 >> 2], P = t[k + 100 >> 2], v = 16 - v | 0, s = t[k + 96 >> 2]),
                                a = g ? r : a,
                                n = g ? f : n,
                                r = u,
                                f = 65535 & A,
                                c || (g = u = !(r | f), A = u ? a : r, Ce(k + 80 | 0, a, n, r, f, (u = (u <<= 6) + (32 == (0 | (g = m(g ? n : f))) ? m(A) + 32 | 0 : g) | 0) - 15 | 0), c = 16 - u | 0, a = t[k + 80 >> 2], n = t[k + 84 >> 2], r = t[k + 88 >> 2], f = t[k + 92 >> 2]),
                                A = f << 3,
                                u = (f = r) << 3,
                                f = r = A | r >>> 29,
                                r = n >>> 29 | u,
                                f |= 524288,
                                u = w << 3 | l >>> 29,
                                w = l << 3 | P >>> 29,
                                g = u,
                                b = i ^ o,
                                u = n << 3 | a >>> 29,
                                A = a << 3,
                                (0 | c) != (0 | v) && ((i = v - c | 0) >>> 0 > 127 ? (r = 0, f = 0, u = 0, A = 1) : (Ce(k - -64 | 0, A, u, r, f, 128 - i | 0), de(k + 48 | 0, A, u, r, f, i), r = t[k + 56 >> 2], f = t[k + 60 >> 2], u = t[k + 52 >> 2], A = t[k + 48 >> 2] | !!(t[k + 64 >> 2] | t[k + 72 >> 2] | t[k + 68 >> 2] | t[k + 76 >> 2]))),
                                l = A,
                                c = u,
                                g |= 524288,
                                u = P << 3 | s >>> 29,
                                s <<= 3;r: if ((0 | b) < 0) {
                                    if (a = 0, n = 0, b = 0, o = 0, !(s ^ l | r ^ w | u ^ c | f ^ g)) break e;
                                    if (A = s - l | 0, i = u - ((s >>> 0 < l >>> 0) + c | 0) | 0, b = (a = w - r | 0) - (n = (0 | u) == (0 | c) & s >>> 0 < l >>> 0 | u >>> 0 < c >>> 0) | 0, o = r = (g - ((r >>> 0 > w >>> 0) + f | 0) | 0) - (a >>> 0 < n >>> 0) | 0, r >>> 0 > 524287) break r;
                                    n = f = !(r | b), o = f ? A : b, Ce(k + 32 | 0, A, i, b, a = r, r = (f = (f <<= 6) + (32 == (0 | (n = m(n ? i : r))) ? m(o) + 32 | 0 : n) | 0) - 12 | 0), v = v - r | 0, b = t[k + 40 >> 2], o = t[k + 44 >> 2], A = t[k + 32 >> 2], i = t[k + 36 >> 2]
                                } else u = u + c | 0, i = (A = s + l | 0) >>> 0 < s >>> 0 ? u + 1 | 0 : u, u = f + g | 0, u = (r = r + w | 0) >>> 0 < w >>> 0 ? u + 1 | 0 : u, 1048576 & (o = (b = r + (a = (0 | c) == (0 | i) & A >>> 0 < l >>> 0 | i >>> 0 < c >>> 0) | 0) >>> 0 < r >>> 0 ? u + 1 | 0 : u) && (A = 1 & l | (1 & i) << 31 | A >>> 1, i = b << 31 | i >>> 1, v = v + 1 | 0, b = (1 & o) << 31 | b >>> 1, o = o >>> 1 | 0);
                                if (f = 0, P = r = -2147483648 & d, (0 | v) >= 32767) b = f,
                                o = 2147418112 | r,
                                a = 0,
                                n = 0;
                                else if (c = 0, (0 | v) > 0 ? c = v : (Ce(k + 16 | 0, A, i, b, o, v + 127 | 0), de(k, A, i, b, o, 1 - v | 0), A = t[k >> 2] | !!(t[k + 16 >> 2] | t[k + 24 >> 2] | t[k + 20 >> 2] | t[k + 28 >> 2]), i = t[k + 4 >> 2], b = t[k + 8 >> 2], o = t[k + 12 >> 2]), s = 7 & A, A = (0 | (r = b << 29 | i >>> 3)) == (0 | (n = (A = (7 & i) << 29 | A >>> 3) >>> 0 > (a = (s >>> 0 > 4) + A | 0) >>> 0 ? r + 1 | 0 : r)) & A >>> 0 > a >>> 0 | r >>> 0 > n >>> 0, r = f | (7 & o) << 29 | b >>> 3, o = P | o >>> 3 & 65535 | c << 16, o = r >>> 0 > (b = A + r | 0) >>> 0 ? o + 1 | 0 : o, 4 != (0 | s)) {
                                    if (!s) break e
                                } else u = n + (r = 0) | 0,
                                o = (r = (0 | r) == (0 | (n = (A = a) >>> 0 > (a = a + (f = 1 & a) | 0) >>> 0 ? u + 1 | 0 : u)) & f >>> 0 > a >>> 0 | r >>> 0 > n >>> 0) >>> 0 > (b = r + b | 0) >>> 0 ? o + 1 | 0 : o
                            }
                            t[e >> 2] = a, t[e + 4 >> 2] = n, t[e + 8 >> 2] = b, t[e + 12 >> 2] = o, G = k + 112 | 0
                        }

                        function V(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            e: if (e |= 0) {
                                a = (A = e - 8 | 0) + (e = -8 & (r = t[e - 4 >> 2])) | 0;
                                r: if (!(1 & r)) {
                                    if (!(2 & r)) break e;
                                    if ((A = A - (r = t[A >> 2]) | 0) >>> 0 < P[3038]) break e;
                                    e = e + r | 0;
                                    f: {
                                        A: {
                                            if (t[3039] != (0 | A)) {
                                                if (r >>> 0 <= 255) {
                                                    if (i = r >>> 3 | 0, (0 | (r = t[A + 12 >> 2])) == (0 | (f = t[A + 8 >> 2]))) {
                                                        o = 12136, k = t[3034] & _e(i), t[o >> 2] = k;
                                                        break r
                                                    }
                                                    t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                    break r
                                                }
                                                if (b = t[A + 24 >> 2], (0 | A) != (0 | (r = t[A + 12 >> 2]))) {
                                                    f = t[A + 8 >> 2], t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                    break f
                                                }
                                                if (!(f = t[(i = A + 20 | 0) >> 2])) {
                                                    if (!(f = t[A + 16 >> 2])) break A;
                                                    i = A + 16 | 0
                                                }
                                                for (; n = i, (f = t[(i = (r = f) + 20 | 0) >> 2]) || (i = r + 16 | 0, f = t[r + 16 >> 2]););
                                                t[n >> 2] = 0;
                                                break f
                                            }
                                            if (3 & ~(r = t[a + 4 >> 2])) break r;
                                            return t[3036] = e,
                                            t[a + 4 >> 2] = -2 & r,
                                            t[A + 4 >> 2] = 1 | e,
                                            void(t[a >> 2] = e)
                                        }
                                        r = 0
                                    }
                                    if (b) {
                                        f = t[A + 28 >> 2];
                                        f: {
                                            if (t[(i = 12440 + (f << 2) | 0) >> 2] == (0 | A)) {
                                                if (t[i >> 2] = r, r) break f;
                                                o = 12140, k = t[3035] & _e(f), t[o >> 2] = k;
                                                break r
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | A) ? 16 : 20) >> 2] = r, !r) break r
                                        }
                                        t[r + 24 >> 2] = b, (f = t[A + 16 >> 2]) && (t[r + 16 >> 2] = f, t[f + 24 >> 2] = r), (f = t[A + 20 >> 2]) && (t[r + 20 >> 2] = f, t[f + 24 >> 2] = r)
                                    }
                                }
                                if (!(A >>> 0 >= a >>> 0) && 1 & (r = t[a + 4 >> 2])) {
                                    r: {
                                        f: {
                                            A: {
                                                i: {
                                                    if (!(2 & r)) {
                                                        if (t[3040] == (0 | a)) {
                                                            if (t[3040] = A, e = t[3037] + e | 0, t[3037] = e, t[A + 4 >> 2] = 1 | e, t[3039] != (0 | A)) break e;
                                                            return t[3036] = 0, void(t[3039] = 0)
                                                        }
                                                        if (t[3039] == (0 | a)) return t[3039] = A, e = t[3036] + e | 0, t[3036] = e, t[A + 4 >> 2] = 1 | e, void(t[e + A >> 2] = e);
                                                        if (e = (-8 & r) + e | 0, r >>> 0 <= 255) {
                                                            if (i = r >>> 3 | 0, (0 | (r = t[a + 12 >> 2])) == (0 | (f = t[a + 8 >> 2]))) {
                                                                o = 12136, k = t[3034] & _e(i), t[o >> 2] = k;
                                                                break f
                                                            }
                                                            t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                            break f
                                                        }
                                                        if (b = t[a + 24 >> 2], (0 | a) != (0 | (r = t[a + 12 >> 2]))) {
                                                            f = t[a + 8 >> 2], t[f + 12 >> 2] = r, t[r + 8 >> 2] = f;
                                                            break A
                                                        }
                                                        if (!(f = t[(i = a + 20 | 0) >> 2])) {
                                                            if (!(f = t[a + 16 >> 2])) break i;
                                                            i = a + 16 | 0
                                                        }
                                                        for (; n = i, (f = t[(i = (r = f) + 20 | 0) >> 2]) || (i = r + 16 | 0, f = t[r + 16 >> 2]););
                                                        t[n >> 2] = 0;
                                                        break A
                                                    }
                                                    t[a + 4 >> 2] = -2 & r,
                                                    t[A + 4 >> 2] = 1 | e,
                                                    t[e + A >> 2] = e;
                                                    break r
                                                }
                                                r = 0
                                            }
                                            if (b) {
                                                f = t[a + 28 >> 2];
                                                A: {
                                                    if (t[(i = 12440 + (f << 2) | 0) >> 2] == (0 | a)) {
                                                        if (t[i >> 2] = r, r) break A;
                                                        o = 12140, k = t[3035] & _e(f), t[o >> 2] = k;
                                                        break f
                                                    }
                                                    if (t[b + (t[b + 16 >> 2] == (0 | a) ? 16 : 20) >> 2] = r, !r) break f
                                                }
                                                t[r + 24 >> 2] = b, (f = t[a + 16 >> 2]) && (t[r + 16 >> 2] = f, t[f + 24 >> 2] = r), (f = t[a + 20 >> 2]) && (t[r + 20 >> 2] = f, t[f + 24 >> 2] = r)
                                            }
                                        }
                                        if (t[A + 4 >> 2] = 1 | e, t[e + A >> 2] = e, t[3039] == (0 | A)) return void(t[3036] = e)
                                    }
                                    if (e >>> 0 <= 255) return r = 12176 + (-8 & e) | 0,
                                    (f = t[3034]) & (e = 1 << (e >>> 3)) ? e = t[r + 8 >> 2] : (t[3034] = e | f, e = r),
                                    t[r + 8 >> 2] = A,
                                    t[e + 12 >> 2] = A,
                                    t[A + 12 >> 2] = r,
                                    void(t[A + 8 >> 2] = e);f = 31,
                                    e >>> 0 <= 16777215 && (f = 62 + ((e >>> 38 - (r = m(e >>> 8 | 0)) & 1) - (r << 1) | 0) | 0),
                                    t[A + 28 >> 2] = f,
                                    t[A + 16 >> 2] = 0,
                                    t[A + 20 >> 2] = 0,
                                    r = 12440 + (f << 2) | 0;r: {
                                        f: {
                                            if ((i = t[3035]) & (n = 1 << f)) {
                                                for (f = e << (31 != (0 | f) ? 25 - (f >>> 1 | 0) : 0), r = t[r >> 2];;) {
                                                    if (i = r, (-8 & t[r + 4 >> 2]) == (0 | e)) break f;
                                                    if (n = f >>> 29 | 0, f <<= 1, !(r = t[16 + (n = r + (4 & n) | 0) >> 2])) break
                                                }
                                                t[n + 16 >> 2] = A, t[A + 24 >> 2] = i
                                            } else t[3035] = i | n,
                                            t[r >> 2] = A,
                                            t[A + 24 >> 2] = r;t[A + 12 >> 2] = A,
                                            t[A + 8 >> 2] = A;
                                            break r
                                        }
                                        e = t[i + 8 >> 2],
                                        t[e + 12 >> 2] = A,
                                        t[i + 8 >> 2] = A,
                                        t[A + 24 >> 2] = 0,
                                        t[A + 12 >> 2] = i,
                                        t[A + 8 >> 2] = e
                                    }
                                    e = t[3042] - 1 | 0,
                                    t[3042] = e || -1
                                }
                            }
                        }

                        function Q(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            f = e + r | 0;
                            e: {
                                r: if (!(1 & (A = t[e + 4 >> 2]))) {
                                    if (!(2 & A)) break e;
                                    r = (A = t[e >> 2]) + r | 0;
                                    f: {
                                        A: {
                                            i: {
                                                if ((0 | (e = e - A | 0)) != t[3039]) {
                                                    if (A >>> 0 <= 255) {
                                                        if ((0 | (i = t[e + 8 >> 2])) != (0 | (a = t[e + 12 >> 2]))) break i;
                                                        o = 12136, k = t[3034] & _e(A >>> 3 | 0), t[o >> 2] = k;
                                                        break r
                                                    }
                                                    if (b = t[e + 24 >> 2], (0 | (A = t[e + 12 >> 2])) != (0 | e)) {
                                                        i = t[e + 8 >> 2], t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break f
                                                    }
                                                    if (!(i = t[(a = e + 20 | 0) >> 2])) {
                                                        if (!(i = t[e + 16 >> 2])) break A;
                                                        a = e + 16 | 0
                                                    }
                                                    for (; n = a, (i = t[(a = (A = i) + 20 | 0) >> 2]) || (a = A + 16 | 0, i = t[A + 16 >> 2]););
                                                    t[n >> 2] = 0;
                                                    break f
                                                }
                                                if (3 & ~(A = t[f + 4 >> 2])) break r;
                                                return t[3036] = r,
                                                t[f + 4 >> 2] = -2 & A,
                                                t[e + 4 >> 2] = 1 | r,
                                                void(t[f >> 2] = r)
                                            }
                                            t[i + 12 >> 2] = a,
                                            t[a + 8 >> 2] = i;
                                            break r
                                        }
                                        A = 0
                                    }
                                    if (b) {
                                        i = t[e + 28 >> 2];
                                        f: {
                                            if (t[(a = 12440 + (i << 2) | 0) >> 2] == (0 | e)) {
                                                if (t[a >> 2] = A, A) break f;
                                                o = 12140, k = t[3035] & _e(i), t[o >> 2] = k;
                                                break r
                                            }
                                            if (t[b + (t[b + 16 >> 2] == (0 | e) ? 16 : 20) >> 2] = A, !A) break r
                                        }
                                        t[A + 24 >> 2] = b, (i = t[e + 16 >> 2]) && (t[A + 16 >> 2] = i, t[i + 24 >> 2] = A), (i = t[e + 20 >> 2]) && (t[A + 20 >> 2] = i, t[i + 24 >> 2] = A)
                                    }
                                }r: {
                                    f: {
                                        A: {
                                            i: {
                                                if (!(2 & (A = t[f + 4 >> 2]))) {
                                                    if (t[3040] == (0 | f)) {
                                                        if (t[3040] = e, r = t[3037] + r | 0, t[3037] = r, t[e + 4 >> 2] = 1 | r, t[3039] != (0 | e)) break e;
                                                        return t[3036] = 0, void(t[3039] = 0)
                                                    }
                                                    if (t[3039] == (0 | f)) return t[3039] = e, r = t[3036] + r | 0, t[3036] = r, t[e + 4 >> 2] = 1 | r, void(t[e + r >> 2] = r);
                                                    if (r = (-8 & A) + r | 0, A >>> 0 <= 255) {
                                                        if (a = A >>> 3 | 0, (0 | (A = t[f + 12 >> 2])) == (0 | (i = t[f + 8 >> 2]))) {
                                                            o = 12136, k = t[3034] & _e(a), t[o >> 2] = k;
                                                            break f
                                                        }
                                                        t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break f
                                                    }
                                                    if (b = t[f + 24 >> 2], (0 | f) != (0 | (A = t[f + 12 >> 2]))) {
                                                        i = t[f + 8 >> 2], t[i + 12 >> 2] = A, t[A + 8 >> 2] = i;
                                                        break A
                                                    }
                                                    if (!(i = t[(a = f + 20 | 0) >> 2])) {
                                                        if (!(i = t[f + 16 >> 2])) break i;
                                                        a = f + 16 | 0
                                                    }
                                                    for (; n = a, (i = t[(a = (A = i) + 20 | 0) >> 2]) || (a = A + 16 | 0, i = t[A + 16 >> 2]););
                                                    t[n >> 2] = 0;
                                                    break A
                                                }
                                                t[f + 4 >> 2] = -2 & A,
                                                t[e + 4 >> 2] = 1 | r,
                                                t[e + r >> 2] = r;
                                                break r
                                            }
                                            A = 0
                                        }
                                        if (b) {
                                            i = t[f + 28 >> 2];
                                            A: {
                                                if (t[(a = 12440 + (i << 2) | 0) >> 2] == (0 | f)) {
                                                    if (t[a >> 2] = A, A) break A;
                                                    o = 12140, k = t[3035] & _e(i), t[o >> 2] = k;
                                                    break f
                                                }
                                                if (t[b + (t[b + 16 >> 2] == (0 | f) ? 16 : 20) >> 2] = A, !A) break f
                                            }
                                            t[A + 24 >> 2] = b, (i = t[f + 16 >> 2]) && (t[A + 16 >> 2] = i, t[i + 24 >> 2] = A), (i = t[f + 20 >> 2]) && (t[A + 20 >> 2] = i, t[i + 24 >> 2] = A)
                                        }
                                    }
                                    if (t[e + 4 >> 2] = 1 | r, t[e + r >> 2] = r, t[3039] == (0 | e)) return void(t[3036] = r)
                                }
                                if (r >>> 0 <= 255) return A = 12176 + (-8 & r) | 0,
                                (i = t[3034]) & (r = 1 << (r >>> 3)) ? r = t[A + 8 >> 2] : (t[3034] = r | i, r = A),
                                t[A + 8 >> 2] = e,
                                t[r + 12 >> 2] = e,
                                t[e + 12 >> 2] = A,
                                void(t[e + 8 >> 2] = r);i = 31,
                                r >>> 0 <= 16777215 && (i = 62 + ((r >>> 38 - (A = m(r >>> 8 | 0)) & 1) - (A << 1) | 0) | 0),
                                t[e + 28 >> 2] = i,
                                t[e + 16 >> 2] = 0,
                                t[e + 20 >> 2] = 0,
                                A = 12440 + (i << 2) | 0;r: {
                                    if ((a = t[3035]) & (n = 1 << i)) {
                                        for (i = r << (31 != (0 | i) ? 25 - (i >>> 1 | 0) : 0), A = t[A >> 2];;) {
                                            if (a = A, (-8 & t[A + 4 >> 2]) == (0 | r)) break r;
                                            if (n = i >>> 29 | 0, i <<= 1, !(A = t[16 + (n = A + (4 & n) | 0) >> 2])) break
                                        }
                                        t[n + 16 >> 2] = e, t[e + 24 >> 2] = a
                                    } else t[3035] = a | n,
                                    t[A >> 2] = e,
                                    t[e + 24 >> 2] = A;
                                    return t[e + 12 >> 2] = e,
                                    void(t[e + 8 >> 2] = e)
                                }
                                r = t[a + 8 >> 2],
                                t[r + 12 >> 2] = e,
                                t[a + 8 >> 2] = e,
                                t[e + 24 >> 2] = 0,
                                t[e + 12 >> 2] = a,
                                t[e + 8 >> 2] = r
                            }
                        }

                        function x(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                w = 0,
                                C = 0,
                                y = 0,
                                h = 0;
                            if (!v[e + 232 | 0] || -1 != (0 | R(e))) return n[e + 232 | 0] = 0, 0;
                            if (t[e + 376 >> 2] != t[e + 412 >> 2] && (i = t[e + 416 >> 2], !(r = (0 | (r = t[e + 420 >> 2])) > 0 ? 1 : !!i & (0 | r) >= 0))) {
                                if (ce(e, e + 248 | 0), v[e + 472 | 0] && ce(e, e + 236 | 0), +P[e + 488 >> 2] > d[e + 80 >> 3] * +P[e + 480 >> 2] && nr[t[t[e >> 2] + 8 >> 2]](e), G = a = G - 16 | 0, t[a + 12 >> 2] = 0, t[a + 4 >> 2] = 0, t[a + 8 >> 2] = 0, r = e, (0 | (e = t[e + 400 >> 2])) > 0)
                                    for (; !v[t[r + 360 >> 2] + f | 0] | !(2 & v[t[r + 336 >> 2] + f | 0]) || ((0 | (i = t[a + 8 >> 2])) == t[a + 12 >> 2] && ((e = ((0 | (e = i >> 1 & -2)) > 0 ? e : 0) + 2 | 0) >>> 0 <= (2147483647 ^ i) >>> 0 && (e = e + i | 0, t[a + 12 >> 2] = e, A = Y(A, e << 2), t[a + 4 >> 2] = A, A) || (B(0 | rr(), 1060, 0), s())), t[a + 8 >> 2] = i + 1, t[(i << 2) + A >> 2] = f, e = t[r + 400 >> 2]), (0 | (f = f + 1 | 0)) < (0 | e););
                                e = 0, b = t[r + 440 >> 2];
                                e: {
                                    if (t[r + 444 >> 2] > 0)
                                        for (A = t[r + 452 >> 2]; t[A + (t[(e << 2) + b >> 2] << 2) >> 2] = -1, (0 | (e = e + 1 | 0)) < t[r + 444 >> 2];);
                                    else if (!b) break e;t[r + 444 >> 2] = 0
                                }
                                e: if (!(t[a + 8 >> 2] <= 0)) {
                                    f = 0;
                                    r: {
                                        for (;;) {
                                            if (i = t[a + 4 >> 2] + (f << 2) | 0, t[t[r + 452 >> 2] + (t[i >> 2] << 2) >> 2] = f, (0 | (e = t[r + 444 >> 2])) == t[r + 448 >> 2]) {
                                                if ((A = ((0 | (A = e >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ e) >>> 0) break r;
                                                if (e = e + A | 0, t[r + 448 >> 2] = e, b = Y(b, e << 2), t[r + 440 >> 2] = b, !b) break r;
                                                e = t[r + 444 >> 2]
                                            }
                                            if (A = t[i >> 2], t[r + 444 >> 2] = e + 1, t[(e << 2) + b >> 2] = A, !((0 | (f = f + 1 | 0)) < t[a + 8 >> 2])) break
                                        }
                                        if ((0 | (e = t[r + 444 >> 2])) < 2) break e;
                                        for (A = e >>> 1 | 0, C = t[r + 452 >> 2];;) {
                                            y = A, c = t[((A = A - 1 | 0) << 2) + b >> 2], l = C;
                                            f: if (!((0 | (i = t[r + 444 >> 2])) <= (0 | (k = 1 | (o = (f = A) << 1)))))
                                                for (u = t[t[r + 436 >> 2] >> 2], h = d[u + (c << 3) >> 3], l = t[r + 452 >> 2];;) {
                                                    A: {
                                                        if ((0 | i) <= (0 | (e = o + 2 | 0))) o = t[(k << 2) + b >> 2],
                                                        g = d[(o << 3) + u >> 3];
                                                        else {
                                                            if (o = t[(e << 2) + b >> 2], w = d[(o << 3) + u >> 3], i = t[(k << 2) + b >> 2], w > (g = d[(i << 3) + u >> 3])) break A;
                                                            o = i
                                                        }
                                                        w = g,
                                                        e = k
                                                    }
                                                    if (!(w > h)) break f;
                                                    if (t[(f << 2) + b >> 2] = o, t[(o << 2) + l >> 2] = f, f = e, !((0 | (i = t[r + 444 >> 2])) > (0 | (k = 1 | (o = e << 1))))) break
                                                }
                                            if (t[(f << 2) + b >> 2] = c, t[(c << 2) + l >> 2] = f, !((0 | y) > 1)) break
                                        }
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0), s()
                                }(e = t[a + 4 >> 2]) && (t[a + 8 >> 2] = 0, V(e)), G = a + 16 | 0, t[r + 412 >> 2] = t[r + 376 >> 2], f = t[r + 212 >> 2] + t[r + 204 >> 2] | 0, f = (e = (A = t[r + 200 >> 2]) + t[r + 208 >> 2] | 0) >>> 0 < A >>> 0 ? f + 1 | 0 : f, t[r + 416 >> 2] = e, t[r + 420 >> 2] = f
                            }
                            return 1
                        }

                        function O(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            f = t[e + 476 >> 2] + (r << 2) | 0;
                            e: if (32 & (A = t[f >> 2])) {
                                if (t[4 + (((A = A >>> 6 | 0) << 2) + f | 0) >> 2] > 0)
                                    for (;;) {
                                        A = 0;
                                        r: {
                                            f: if (b = t[e + 296 >> 2] + C(t[4 + ((i << 2) + f | 0) >> 2], 12) | 0, !((0 | (a = t[b + 4 >> 2])) <= 0)) {
                                                for (k = t[b >> 2];;) {
                                                    if (t[k + (A << 3) >> 2] == (0 | r)) break f;
                                                    if ((0 | a) == (0 | (A = A + 1 | 0))) break
                                                }
                                                a = a - 1 | 0;
                                                break r
                                            }if (!((0 | (a = a - 1 | 0)) <= (0 | A)))
                                                for (; k = (a = t[b >> 2]) + (A << 3) | 0, o = t[4 + (a = a + ((A = A + 1 | 0) << 3) | 0) >> 2], t[k >> 2] = t[a >> 2], t[k + 4 >> 2] = o, (0 | (a = t[b + 4 >> 2] - 1 | 0)) > (0 | A););
                                        }
                                        if (t[b + 4 >> 2] = a, i = i + 1 | 0, A = t[f >> 2] >>> 6 | 0, !((0 | i) < t[4 + ((A << 2) + f | 0) >> 2])) break
                                    }
                                if (i = t[e + 200 >> 2], b = t[e + 204 >> 2] - (i >>> 0 < A >>> 0) | 0, A = i - A | 0, t[e + 200 >> 2] = A, t[e + 204 >> 2] = b, i = t[f >> 2], t[4 + ((i >>> 4 & 268435452) + f | 0) >> 2] <= 0) break e;
                                for (b = t[e + 476 >> 2], a = t[e + 396 >> 2], k = t[e + 336 >> 2], A = 0; o = t[4 + ((A << 2) + f | 0) >> 2], 1 == (v[(u = o >> 1) + k | 0] ^ 1 & o) && (-1 == (0 | (u = t[(o = a + (u << 3) | 0) >> 2])) | (b + (u << 2) | 0) != (0 | f) || (t[o >> 2] = -1, i = t[f >> 2])), (0 | (A = A + 1 | 0)) < t[4 + ((i >>> 4 & 268435452) + f | 0) >> 2];);
                            } else {
                                r: {
                                    f: {
                                        if (A = t[e + 308 >> 2], b = t[e + 476 >> 2] + (r << 2) | 0, a = 1 ^ t[b + 4 >> 2], !v[0 | (i = A + a | 0)]) {
                                            if (n[0 | i] = 1, (0 | (A = t[e + 324 >> 2])) == t[e + 328 >> 2]) {
                                                if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break f;
                                                if (A = A + i | 0, t[e + 328 >> 2] = A, i = Y(t[e + 320 >> 2], A << 2), t[e + 320 >> 2] = i, !i) break f;
                                                A = t[e + 324 >> 2]
                                            } else i = t[e + 320 >> 2];
                                            t[e + 324 >> 2] = A + 1, t[(A << 2) + i >> 2] = a, A = t[e + 308 >> 2]
                                        }
                                        if (a = 1 ^ t[b + 8 >> 2], !v[0 | (A = A + a | 0)]) {
                                            if (n[0 | A] = 1, (0 | (A = t[e + 324 >> 2])) == t[e + 328 >> 2]) {
                                                if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break f;
                                                if (A = A + i | 0, t[e + 328 >> 2] = A, i = Y(t[e + 320 >> 2], A << 2), t[e + 320 >> 2] = i, !i) break f;
                                                A = t[e + 324 >> 2]
                                            } else i = t[e + 320 >> 2];
                                            t[e + 324 >> 2] = A + 1, t[(A << 2) + i >> 2] = a
                                        }
                                        b = t[b >> 2],
                                        i = t[(A = (4 & b ? 208 : 200) + e | 0) >> 2],
                                        b = b >>> 6 | 0,
                                        a = t[A + 4 >> 2] - (i >>> 0 < b >>> 0) | 0,
                                        i = i - b | 0,
                                        t[A >> 2] = i,
                                        t[A + 4 >> 2] = a;
                                        break r
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                }
                                A = t[f + 4 >> 2],
                                v[(i = A >> 1) + t[e + 336 >> 2] | 0] == (1 & A) && (A = t[e + 396 >> 2] + (i << 3) | 0, -1 == (0 | (i = t[A >> 2])) | (t[e + 476 >> 2] + (i << 2) | 0) != (0 | f) || (t[A >> 2] = -1))
                            } t[f >> 2] = -4 & t[f >> 2] | 1, A = e, i = t[e + 488 >> 2], e = t[t[e + 476 >> 2] + (r << 2) >> 2], t[A + 488 >> 2] = 1 + ((i + (e >>> 6 | 0) | 0) + (e >>> 3 & 1) | 0)
                        }

                        function X(e, r, f, A, i, a, n, b, o) {
                            var k, u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                C = 0;
                            G = k = G - 128 | 0;
                            e: {
                                r: {
                                    if (ge(a, n, b, o, 0, 0, 0, 0)) {
                                        u = 65535 & o;
                                        f: A: {
                                            if (32767 != (0 | (l = o >>> 16 & 32767))) {
                                                if (c = 4, l) break A;
                                                c = a | b | n | u ? 3 : 2;
                                                break f
                                            }
                                            c = !(a | b | n | u)
                                        }
                                        if (32767 != (0 | (v = 32767 & (d = i >>> 16 | 0))) && c) break r
                                    }
                                    F(k + 16 | 0, r, f, A, i, a, n, b, o),
                                    Z(k, r = t[k + 16 >> 2], A = t[k + 20 >> 2], i = t[k + 24 >> 2], f = t[k + 28 >> 2], r, A, i, f),
                                    A = t[k + 8 >> 2],
                                    i = t[k + 12 >> 2],
                                    b = t[k >> 2],
                                    o = t[k + 4 >> 2];
                                    break e
                                }
                                if (l = b, (0 | ge(r, f, c = A, u = g = 2147483647 & i, a, n, b, s = 2147483647 & o)) <= 0) {
                                    if (ge(r, f, c, u, a, n, b, s)) {
                                        b = r, o = f;
                                        break e
                                    }
                                    F(k + 112 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 120 >> 2], i = t[k + 124 >> 2], b = t[k + 112 >> 2], o = t[k + 116 >> 2]
                                } else {
                                    if (P = o >>> 16 & 32767, v ? (o = f, b = r) : (F(k + 96 | 0, r, f, c, g, 0, 0, 0, 1081540608), c = t[k + 104 >> 2], g = b = t[k + 108 >> 2], v = (b >>> 16 | 0) - 120 | 0, o = t[k + 100 >> 2], b = t[k + 96 >> 2]), P || (F(k + 80 | 0, a, n, l, s, 0, 0, 0, 1081540608), l = t[k + 88 >> 2], s = a = t[k + 92 >> 2], P = (a >>> 16 | 0) - 120 | 0, n = t[k + 84 >> 2], a = t[k + 80 >> 2]), w = l, C = 65535 & s | 65536, g = 65535 & g | 65536, (0 | v) > (0 | P)) {
                                        for (;;) {
                                            if (l = (s = c - w | 0) - (u = (0 | n) == (0 | o) & a >>> 0 > b >>> 0 | n >>> 0 > o >>> 0) | 0, (0 | (u = (g - ((c >>> 0 < w >>> 0) + C | 0) | 0) - (u >>> 0 > s >>> 0) | 0)) >= 0 | (0 | u) > 0) {
                                                if (c = b, !((b = b - a | 0) | l | (o = o - ((a >>> 0 > c >>> 0) + n | 0) | 0) | u)) {
                                                    F(k + 32 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 40 >> 2], i = t[k + 44 >> 2], b = t[k + 32 >> 2], o = t[k + 36 >> 2];
                                                    break e
                                                }
                                                u = u << 1 | l >>> 31, c = l << 1 | o >>> 31
                                            } else u = g << 1 | c >>> 31, c = c << 1 | o >>> 31;
                                            if (g = u, u = o << 1 | b >>> 31, b <<= 1, o = u, !((0 | (v = v - 1 | 0)) > (0 | P))) break
                                        }
                                        v = P
                                    }
                                    if (l = (s = c - w | 0) - (u = (0 | n) == (0 | o) & a >>> 0 > b >>> 0 | n >>> 0 > o >>> 0) | 0, s = u = (g - ((c >>> 0 < w >>> 0) + C | 0) | 0) - (u >>> 0 > s >>> 0) | 0, (0 | u) < 0) l = c, s = g;
                                    else if (c = b, !((b = b - a | 0) | l | (o = o - ((a >>> 0 > c >>> 0) + n | 0) | 0) | s)) {
                                        F(k + 48 | 0, r, f, A, i, 0, 0, 0, 0), A = t[k + 56 >> 2], i = t[k + 60 >> 2], b = t[k + 48 >> 2], o = t[k + 52 >> 2];
                                        break e
                                    }
                                    if (65535 == (0 | s) | s >>> 0 < 65535)
                                        for (; r = o >>> 31 | 0, v = v - 1 | 0, g = o << 1 | b >>> 31, b <<= 1, o = g, f = r, r = s << 1 | l >>> 31, l = f | l << 1, s = r, r >>> 0 < 65536;);
                                    r = 32768 & d, (0 | v) <= 0 ? (F(k - -64 | 0, b, o, l, 65535 & s | (r | v + 120) << 16, 0, 0, 0, 1065811968), A = t[k + 72 >> 2], i = t[k + 76 >> 2], b = t[k + 64 >> 2], o = t[k + 68 >> 2]) : (A = l, i = 65535 & s | (r | v) << 16)
                                }
                            }
                            t[e >> 2] = b, t[e + 4 >> 2] = o, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i, G = k + 128 | 0
                        }

                        function Y(e, r) {
                            var f, A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = 0,
                                v = 0;
                            if (!e) return U(r);
                            if (r >>> 0 >= 4294967232) return t[2726] = 48, 0;
                            f = r >>> 0 < 11 ? 16 : r + 11 & -8, a = -8 & (A = t[4 + (n = e - 8 | 0) >> 2]);
                            e: if (3 & A) {
                                b = a + n | 0;
                                r: if (a >>> 0 >= f >>> 0) {
                                    if ((i = a - f | 0) >>> 0 < 16) break r;
                                    t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (a = n + f | 0) >> 2] = 3 | i, t[b + 4 >> 2] = 1 | t[b + 4 >> 2], Q(a, i)
                                } else if (t[3040] != (0 | b))
                                    if (t[3039] != (0 | b)) {
                                        if (2 & (o = t[b + 4 >> 2])) break e;
                                        if ((k = a + (-8 & o) | 0) >>> 0 < f >>> 0) break e;
                                        c = k - f | 0;
                                        f: if (o >>> 0 <= 255) {
                                            if ((0 | (i = t[b + 12 >> 2])) == (0 | (a = t[b + 8 >> 2]))) {
                                                l = 12136, v = t[3034] & _e(o >>> 3 | 0), t[l >> 2] = v;
                                                break f
                                            }
                                            t[a + 12 >> 2] = i, t[i + 8 >> 2] = a
                                        } else {
                                            u = t[b + 24 >> 2];
                                            A: if ((0 | b) == (0 | (a = t[b + 12 >> 2]))) {
                                                i: {
                                                    if (!(o = t[(i = b + 20 | 0) >> 2])) {
                                                        if (!(o = t[b + 16 >> 2])) break i;
                                                        i = b + 16 | 0
                                                    }
                                                    for (; s = i, (o = t[(i = (a = o) + 20 | 0) >> 2]) || (i = a + 16 | 0, o = t[a + 16 >> 2]););t[s >> 2] = 0;
                                                    break A
                                                }
                                                a = 0
                                            }
                                            else i = t[b + 8 >> 2], t[i + 12 >> 2] = a, t[a + 8 >> 2] = i;
                                            if (u) {
                                                i = t[b + 28 >> 2];
                                                A: {
                                                    if (t[(o = 12440 + (i << 2) | 0) >> 2] == (0 | b)) {
                                                        if (t[o >> 2] = a, a) break A;
                                                        l = 12140, v = t[3035] & _e(i), t[l >> 2] = v;
                                                        break f
                                                    }
                                                    if (t[(t[u + 16 >> 2] == (0 | b) ? 16 : 20) + u >> 2] = a, !a) break f
                                                }
                                                t[a + 24 >> 2] = u, (i = t[b + 16 >> 2]) && (t[a + 16 >> 2] = i, t[i + 24 >> 2] = a), (i = t[b + 20 >> 2]) && (t[a + 20 >> 2] = i, t[i + 24 >> 2] = a)
                                            }
                                        } c >>> 0 <= 15 ? (t[n + 4 >> 2] = 1 & A | k | 2, t[4 + (i = n + k | 0) >> 2] = 1 | t[i + 4 >> 2]) : (t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (i = n + f | 0) >> 2] = 3 | c, t[4 + (a = n + k | 0) >> 2] = 1 | t[a + 4 >> 2], Q(i, c))
                                    } else {
                                        if ((a = a + t[3036] | 0) >>> 0 < f >>> 0) break e;
                                        (i = a - f | 0) >>> 0 >= 16 ? (t[n + 4 >> 2] = 1 & A | f | 2, t[4 + (o = n + f | 0) >> 2] = 1 | i, t[(a = a + n | 0) >> 2] = i, t[a + 4 >> 2] = -2 & t[a + 4 >> 2]) : (t[n + 4 >> 2] = a | 1 & A | 2, t[4 + (i = a + n | 0) >> 2] = 1 | t[i + 4 >> 2], i = 0), t[3039] = o, t[3036] = i
                                    }
                                else {
                                    if ((a = a + t[3037] | 0) >>> 0 <= f >>> 0) break e;
                                    t[n + 4 >> 2] = 1 & A | f | 2, a = a - f | 0, t[4 + (i = n + f | 0) >> 2] = 1 | a, t[3037] = a, t[3040] = i
                                }
                                i = n
                            } else {
                                if (f >>> 0 < 256) break e;
                                if (a >>> 0 >= f + 4 >>> 0 && (i = n, a - f >>> 0 <= t[3154] << 1 >>> 0)) break e;
                                i = 0
                            }
                            return i ? i + 8 | 0 : (i = U(r)) ? (fe(i, e, r >>> 0 > (n = (3 & (n = t[e - 4 >> 2]) ? -4 : -8) + (-8 & n) | 0) >>> 0 ? n : r), V(e), i) : 0
                        }

                        function J(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0;
                            if (t[(e |= 0) >> 2] = 2560, (r = t[e + 532 >> 2]) && (t[e + 536 >> 2] = 0, V(r), t[e + 540 >> 2] = 0, t[e + 532 >> 2] = 0), (r = t[e + 520 >> 2]) && (t[e + 524 >> 2] = 0, V(r), t[e + 528 >> 2] = 0, t[e + 520 >> 2] = 0), (r = t[e + 508 >> 2]) && (t[e + 512 >> 2] = 0, V(r), t[e + 516 >> 2] = 0, t[e + 508 >> 2] = 0), (r = t[e + 496 >> 2]) && (t[e + 500 >> 2] = 0, V(r), t[e + 504 >> 2] = 0, t[e + 496 >> 2] = 0), (r = t[e + 476 >> 2]) && V(r), (r = t[e + 452 >> 2]) && (t[e + 456 >> 2] = 0, V(r), t[e + 460 >> 2] = 0, t[e + 452 >> 2] = 0), (r = t[e + 440 >> 2]) && (t[e + 444 >> 2] = 0, V(r), t[e + 448 >> 2] = 0, t[e + 440 >> 2] = 0), (r = t[e + 424 >> 2]) && (t[e + 428 >> 2] = 0, V(r), t[e + 432 >> 2] = 0, t[e + 424 >> 2] = 0), (r = t[e + 396 >> 2]) && (t[e + 400 >> 2] = 0, V(r), t[e + 404 >> 2] = 0, t[e + 396 >> 2] = 0), (r = t[e + 384 >> 2]) && (t[e + 388 >> 2] = 0, V(r), t[e + 392 >> 2] = 0, t[e + 384 >> 2] = 0), (r = t[e + 372 >> 2]) && (t[e + 376 >> 2] = 0, V(r), t[e + 380 >> 2] = 0, t[e + 372 >> 2] = 0), (r = t[e + 360 >> 2]) && (t[e + 364 >> 2] = 0, V(r), t[e + 368 >> 2] = 0, t[e + 360 >> 2] = 0), (r = t[e + 348 >> 2]) && (t[e + 352 >> 2] = 0, V(r), t[e + 356 >> 2] = 0, t[e + 348 >> 2] = 0), (r = t[e + 336 >> 2]) && (t[e + 340 >> 2] = 0, V(r), t[e + 344 >> 2] = 0, t[e + 336 >> 2] = 0), (r = t[e + 320 >> 2]) && (t[e + 324 >> 2] = 0, V(r), t[e + 328 >> 2] = 0, t[e + 320 >> 2] = 0), (r = t[e + 308 >> 2]) && (t[e + 312 >> 2] = 0, V(r), t[e + 316 >> 2] = 0, t[e + 308 >> 2] = 0), f = t[e + 296 >> 2]) {
                                if (r = 0, (0 | (A = t[e + 300 >> 2])) > 0) {
                                    for (; f = t[e + 296 >> 2] + C(r, 12) | 0, (i = t[f >> 2]) && (t[f + 4 >> 2] = 0, V(i), t[f >> 2] = 0, t[f + 8 >> 2] = 0, A = t[e + 300 >> 2]), (0 | A) > (0 | (r = r + 1 | 0)););
                                    f = t[e + 296 >> 2]
                                }
                                t[e + 300 >> 2] = 0, V(f), t[e + 304 >> 2] = 0, t[e + 296 >> 2] = 0
                            }
                            return (r = t[e + 272 >> 2]) && (t[e + 276 >> 2] = 0, V(r), t[e + 280 >> 2] = 0, t[e + 272 >> 2] = 0), (r = t[e + 248 >> 2]) && (t[e + 252 >> 2] = 0, V(r), t[e + 256 >> 2] = 0, t[e + 248 >> 2] = 0), (r = t[e + 236 >> 2]) && (t[e + 240 >> 2] = 0, V(r), t[e + 244 >> 2] = 0, t[e + 236 >> 2] = 0), (r = t[e + 16 >> 2]) && (t[e + 20 >> 2] = 0, V(r), t[e + 24 >> 2] = 0, t[e + 16 >> 2] = 0), (r = t[e + 4 >> 2]) && (t[e + 8 >> 2] = 0, V(r), t[e + 12 >> 2] = 0, t[e + 4 >> 2] = 0), 0 | e
                        }

                        function K(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                d = 0;
                            if (i = t[e >> 2] + (t[r >> 2] << 2) | 0, 16 & (e = t[i >> 2])) t[r >> 2] = t[i + 4 >> 2];
                            else {
                                k = (4 & e) >>> 2 | 0, b = (32 & e) >>> 5 | 0, Ge(f, (e = 1 + ((n = v[f + 16 | 0] | k | b) + (t[i >> 2] >>> 6 | 0) | 0) | 0) + t[f + 4 >> 2] | 0), A = (A = e) + (e = t[f + 4 >> 2]) | 0, t[f + 4 >> 2] = A;
                                e: if (e >>> 0 <= A >>> 0) {
                                    if (A = 0, a = t[f >> 2] + (e << 2) | 0, o = (b ? 32 : 0) | (k ? 4 : 0) | !!(0 | n) << 3, t[a >> 2] = o | -64 & t[a >> 2], o |= -64 & (u = t[i >> 2]), t[a >> 2] = o, P[i >> 2] > 63)
                                        for (; t[4 + ((c = A << 2) + a | 0) >> 2] = t[4 + (i + c | 0) >> 2], (A = A + 1 | 0) >>> 0 < t[i >> 2] >>> 6 >>> 0;);
                                    if (255 & n) {
                                        if (n = u >>> 6 | 0, k) {
                                            t[4 + (a + (n << 2) | 0) >> 2] = 0;
                                            break e
                                        }
                                        if (b) {
                                            t[4 + (a + (n << 2) | 0) >> 2] = -1;
                                            break e
                                        }
                                        if (k = 0, !(o >>> 0 < 64)) {
                                            if (u = 0, A = 0, n - 1 >>> 0 >= 3)
                                                for (d = 67108860 & n, c = 0; k = 1 << (t[(o = a + 4 | 0) + (12 | (b = A << 2)) >> 2] >>> 1) | 1 << (t[b + o >> 2] >>> 1) | k | 1 << (t[o + (4 | b) >> 2] >>> 1) | 1 << (t[o + (8 | b) >> 2] >>> 1), A = A + 4 | 0, (0 | d) != (0 | (c = c + 4 | 0)););
                                            if (b = 3 & n)
                                                for (; k = 1 << (t[4 + (a + (A << 2) | 0) >> 2] >>> 1) | k, A = A + 1 | 0, (0 | b) != (0 | (u = u + 1 | 0)););
                                        }
                                        t[4 + (a + (n << 2) | 0) >> 2] = k
                                    }
                                } else B(0 | rr(), 1060, 0), s();
                                if (t[r >> 2] = e, t[i + 4 >> 2] = e, e = t[i >> 2], t[i >> 2] = 16 | e, A = t[f >> 2] + (t[r >> 2] << 2) | 0, t[A >> 2] = -4 & t[A >> 2] | 3 & e, f = t[f >> 2] + (t[r >> 2] << 2) | 0, 4 & (e = t[f >> 2])) w[4 + (f + (e >>> 4 & 268435452) | 0) >> 2] = w[4 + (i + (t[i >> 2] >>> 4 & 268435452) | 0) >> 2];
                                else if (32 & e) t[4 + (f + (e >>> 4 & 268435452) | 0) >> 2] = t[4 + (i + (t[i >> 2] >>> 4 & 268435452) | 0) >> 2];
                                else if (8 & e) {
                                    if (i = e >>> 6 | 0, r = 0, !(e >>> 0 < 64)) {
                                        if (e = 0, i - 1 >>> 0 >= 3)
                                            for (n = 67108860 & i; r = 1 << (t[(a = f + 4 | 0) + (12 | (A = e << 2)) >> 2] >>> 1) | 1 << (t[A + a >> 2] >>> 1) | r | 1 << (t[a + (4 | A) >> 2] >>> 1) | 1 << (t[a + (8 | A) >> 2] >>> 1), e = e + 4 | 0, (0 | n) != (0 | (l = l + 4 | 0)););
                                        if (A = 3 & i)
                                            for (; r = 1 << (t[4 + (f + (e << 2) | 0) >> 2] >>> 1) | r, e = e + 1 | 0, (0 | A) != (0 | (g = g + 1 | 0)););
                                    }
                                    t[4 + (f + (i << 2) | 0) >> 2] = r
                                }
                            }
                        }

                        function L(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                v = 0,
                                g = 0,
                                P = 0;
                            G = f = G - 16 | 0, t[f + 12 >> 2] = -1;
                            e: {
                                r: {
                                    if ((0 | (b = r + 1 | 0)) > t[e + 20 >> 2]) {
                                        if (!((0 | (A = t[e + 24 >> 2])) >= (0 | b))) {
                                            if ((0 | (i = (0 | (i = 2 + (A >> 1 & -2) | 0)) > (0 | (a = 1 + (b - A | 0) & -2)) ? i : a)) > (2147483647 ^ A)) break r;
                                            if (A = A + i | 0, t[e + 24 >> 2] = A, A = Y(t[e + 16 >> 2], A << 2), t[e + 16 >> 2] = A, !A && 48 == t[2726]) break r
                                        }
                                        if (!((0 | (i = t[e + 20 >> 2])) >= (0 | b))) {
                                            if (a = t[f + 12 >> 2], n = t[e + 16 >> 2], o = b - (A = i) & 7)
                                                for (; t[n + (A << 2) >> 2] = a, A = A + 1 | 0, (0 | o) != (0 | (k = k + 1 | 0)););
                                            if (!(i - b >>> 0 > 4294967288))
                                                for (o = n + 28 | 0, k = n + 24 | 0, u = n + 20 | 0, c = n + 16 | 0, l = n + 12 | 0, v = n + 8 | 0, g = n + 4 | 0; t[(i = A << 2) + n >> 2] = a, t[i + g >> 2] = a, t[i + v >> 2] = a, t[i + l >> 2] = a, t[i + c >> 2] = a, t[i + u >> 2] = a, t[i + k >> 2] = a, t[i + o >> 2] = a, (0 | b) != (0 | (A = A + 8 | 0)););
                                        }
                                        t[e + 20 >> 2] = b
                                    }
                                    break e
                                }
                                B(0 | rr(), 1060, 0),
                                s()
                            }
                            A = t[e + 8 >> 2], t[t[e + 16 >> 2] + (r << 2) >> 2] = A;
                            e: {
                                if (t[e + 12 >> 2] == (0 | A)) {
                                    if ((i = ((0 | (i = A >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (A = A + i | 0, t[e + 12 >> 2] = A, i = Y(t[e + 4 >> 2], A << 2), t[e + 4 >> 2] = i, !i) break e;
                                    A = t[e + 8 >> 2]
                                } else i = t[e + 4 >> 2];t[e + 8 >> 2] = A + 1,
                                t[(A << 2) + i >> 2] = r,
                                n = t[e + 16 >> 2],
                                A = t[n + (r << 2) >> 2],
                                a = t[(A << 2) + i >> 2];r: if (A)
                                    for (b = t[t[e >> 2] >> 2], P = d[b + (a << 3) >> 3];;) {
                                        if (e = (A << 2) + i | 0, u = t[(k = ((r = (o = A - 1 | 0) >> 1) << 2) + i | 0) >> 2], !(d[b + (u << 3) >> 3] < P)) {
                                            i = e;
                                            break r
                                        }
                                        if (t[e >> 2] = u, t[n + (t[k >> 2] << 2) >> 2] = A, A = r, !(o >>> 0 > 1)) break
                                    } else A = 0;
                                return t[i >> 2] = a,
                                t[n + (a << 2) >> 2] = A,
                                void(G = f + 16 | 0)
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function q(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            if (!v[e + 232 | 0]) return 0;
                            if (be(t[r >> 2], t[r + 4 >> 2]), !((0 | (a = t[r + 4 >> 2])) <= 0)) {
                                for (b = -2; k = t[r >> 2], A = t[k + (o << 2) >> 2], (u = v[t[e + 336 >> 2] + (A >> 1) | 0] ^ 1 & A) ? 1 == (0 | u) | (0 | A) == (0 | b) || (1 != (A ^ b) ? (t[(i << 2) + k >> 2] = A, a = t[r + 4 >> 2], i = i + 1 | 0) : (f = f - 1 | 0, i = i - 1 | 0), b = A) : f = f - 1 | 0, (0 | (o = o + 1 | 0)) < (0 | a););
                                (0 | (A = o - i | 0)) <= 0 || (a = a - A | 0, t[r + 4 >> 2] = a)
                            }
                            e: {
                                if ((0 | f) < (0 | a)) {
                                    if ((0 | f) < 0) return n[e + 232 | 0] = 0, 0;
                                    if (!(!v[e + 104 | 0] | (a - 1 | 0) != (0 | f))) {
                                        if ((0 | a) > 0)
                                            for (f = 0; A = t[r >> 2] + (f << 2) | 0, t[A >> 2] = 1 ^ t[A >> 2], (0 | (f = f + 1 | 0)) < t[r + 4 >> 2];);
                                        return ae(e, r)
                                    }
                                    if (!f) {
                                        if ((0 | a) > 0)
                                            for (f = 0; b = 1 ^ (A = t[t[r >> 2] + (f << 2) >> 2]), n[(i = A >> 1) + t[e + 336 >> 2] | 0] = 1 & b, A = t[e + 388 >> 2], i = t[e + 396 >> 2] + (i << 3) | 0, t[i >> 2] = -1, t[i + 4 >> 2] = A, A = t[e + 376 >> 2], t[e + 376 >> 2] = A + 1, t[t[e + 372 >> 2] + (A << 2) >> 2] = b, (0 | (f = f + 1 | 0)) < t[r + 4 >> 2];);
                                        return r = e, e = -1 == (0 | R(e)), n[r + 232 | 0] = e, e
                                    }
                                    if (A = ne(e + 476 | 0, r, 0, 1), i = t[e + 476 >> 2] + (A << 2) | 0, t[4 + ((t[i >> 2] >>> 4 & 268435452) + i | 0) >> 2] = 1 + (t[r + 4 >> 2] - f | 0), (0 | (f = t[e + 240 >> 2])) == t[e + 244 >> 2]) {
                                        if ((r = ((0 | (r = f >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break e;
                                        if (r = r + f | 0, t[e + 244 >> 2] = r, r = Y(t[e + 236 >> 2], r << 2), t[e + 236 >> 2] = r, !r) break e;
                                        f = t[e + 240 >> 2]
                                    } else r = t[e + 236 >> 2];
                                    t[e + 240 >> 2] = f + 1, t[(f << 2) + r >> 2] = A, $(e, A)
                                }
                                return 1
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function _(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0,
                                l = y(0),
                                v = 0;
                            if ((0 | r) <= 15) n = e;
                            else
                                for (;;) {
                                    for (c = (u = t[f >> 2]) + (t[(r << 1 & -4) + e >> 2] << 2) | 0, i = r, A = -1;;) {
                                        o = t[c >> 2], k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2];
                                        e: if (!((a = t[(b = u + (k << 2) | 0) >> 2]) >>> 0 < 192)) {
                                            if (2 == (0 | (s = o >>> 6 | 0)))
                                                for (;;)
                                                    if (k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2], !(P[u + (k << 2) >> 2] > 191)) break e;
                                            if ((l = w[4 + (c + (s << 2) | 0) >> 2]) > w[4 + (b + (a >>> 6 << 2) | 0) >> 2])
                                                for (;;) {
                                                    if (k = t[(n = ((A = A + 1 | 0) << 2) + e | 0) >> 2], (a = t[(b = u + (k << 2) | 0) >> 2]) >>> 0 <= 191) break e;
                                                    if (!(w[4 + (b + (a >>> 4 & 268435452) | 0) >> 2] < l)) break
                                                }
                                        } b = t[(a = ((i = i - 1 | 0) << 2) + e | 0) >> 2];
                                        e: if (!(o >>> 0 < 192))
                                            for (o = c + (o >>> 4 & 268435452) | 0;;) {
                                                if (2 != (0 | (v = t[(s = u + (b << 2) | 0) >> 2] >>> 6 | 0)) & !(w[o + 4 >> 2] < w[4 + (s + (v << 2) | 0) >> 2])) break e;
                                                b = t[(a = ((i = i - 1 | 0) << 2) + e | 0) >> 2]
                                            }
                                        if (!((0 | A) < (0 | i))) break;
                                        t[n >> 2] = b, t[a >> 2] = k
                                    }
                                    if (_(e, A, f), e = n, !((0 | (r = r - A | 0)) >= 16)) break
                                }
                            if ((0 | r) >= 2)
                                for (c = r - 2 | 0, u = t[f >> 2], A = 0;;) {
                                    for (i = f = (e = A) + 1 | 0; o = u + (t[(i << 2) + n >> 2] << 2) | 0, (k = t[o >> 2]) >>> 0 < 192 || (b = u + (t[(e << 2) + n >> 2] << 2) | 0, (2 == (0 | (a = t[b >> 2] >>> 6 | 0)) || w[4 + (o + (k >>> 6 << 2) | 0) >> 2] < w[4 + (b + (a << 2) | 0) >> 2]) && (e = i)), (0 | (i = i + 1 | 0)) != (0 | r););
                                    if (o = t[(i = (A << 2) + n | 0) >> 2], e = (e << 2) + n | 0, t[i >> 2] = t[e >> 2], t[e >> 2] = o, e = (0 | A) == (0 | c), A = f, e) break
                                }
                        }

                        function $(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0;
                            e: {
                                if (n = t[e + 476 >> 2] + (r << 2) | 0, 32 & (a = t[n >> 2])) {
                                    if (t[4 + (((f = a >>> 6 | 0) << 2) + n | 0) >> 2] > 0)
                                        for (a = r;;) {
                                            if (i = t[e + 296 >> 2] + C(t[4 + ((A << 2) + n | 0) >> 2], 12) | 0, (0 | (r = t[i + 4 >> 2])) == t[i + 8 >> 2]) {
                                                if ((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break e;
                                                if (b = t[i >> 2], r = r + f | 0, t[i + 8 >> 2] = r, f = Y(b, r << 3), t[i >> 2] = f, !f) break e;
                                                r = t[i + 4 >> 2]
                                            } else f = t[i >> 2];
                                            if (t[i + 4 >> 2] = r + 1, t[(r = (r << 3) + f | 0) >> 2] = a, t[r + 4 >> 2] = -2, A = A + 1 | 0, f = t[n >> 2] >>> 6 | 0, !((0 | A) < t[4 + ((f << 2) + n | 0) >> 2])) break
                                        }
                                    r = e + 200 | 0
                                } else {
                                    if (a = t[n + 8 >> 2], i = t[e + 296 >> 2] + C(1 ^ t[n + 4 >> 2], 12) | 0, (0 | (A = t[i + 4 >> 2])) == t[i + 8 >> 2]) {
                                        if ((f = ((0 | (f = A >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                        if (b = t[i >> 2], f = f + A | 0, t[i + 8 >> 2] = f, f = Y(b, f << 3), t[i >> 2] = f, !f) break e;
                                        A = t[i + 4 >> 2]
                                    } else f = t[i >> 2];
                                    if (t[i + 4 >> 2] = A + 1, i = r, t[(f = (A << 3) + f | 0) >> 2] = r, t[f + 4 >> 2] = a, a = t[n + 4 >> 2], A = t[e + 296 >> 2] + C(1 ^ t[n + 8 >> 2], 12) | 0, (0 | (r = t[A + 4 >> 2])) == t[A + 8 >> 2]) {
                                        if ((f = ((0 | (f = r >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break e;
                                        if (b = t[A >> 2], r = r + f | 0, t[A + 8 >> 2] = r, f = Y(b, r << 3), t[A >> 2] = f, !f) break e;
                                        r = t[A + 4 >> 2]
                                    } else f = t[A >> 2];
                                    t[A + 4 >> 2] = r + 1, t[(r = (r << 3) + f | 0) >> 2] = i, t[r + 4 >> 2] = a, f = (a = t[n >> 2]) >>> 6 | 0, r = e + 208 | 0, 4 & a || (r = e + 200 | 0)
                                }
                                return e = t[r + 4 >> 2],
                                e = (a = t[r >> 2] + f | 0) >>> 0 < f >>> 0 ? e + 1 | 0 : e,
                                t[r >> 2] = a,
                                void(t[r + 4 >> 2] = e)
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function ee(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: switch ((0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = re(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), r - 43 | 0) {
                                                case 0:
                                                case 2:
                                                    break i;
                                                default:
                                                    break A
                                            }
                                            if (n = 45 == (0 | r), (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = re(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), (A = r - 58 | 0) >>> 0 > 4294967285) break f;
                                            if (t[e + 116 >> 2] < 0) break r;t[e + 4 >> 2] = t[e + 4 >> 2] - 1;
                                            break r
                                        }
                                        A = r - 58 | 0
                                    }
                                    if (!(A >>> 0 < 4294967286)) {
                                        if (!(r - 48 >>> 0 >= 10)) {
                                            for (A = 0; f = (0 | (A = (C(A, 10) + r | 0) - 48 | 0)) < 214748364, (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = re(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), f & (i = r - 48 | 0) >>> 0 <= 9;);
                                            if (a = (f = A) >> 31, !(i >>> 0 >= 10)) {
                                                for (; i = (f = Re(f, a, 10, 0)) + r | 0, r = E, r = f >>> 0 > i >>> 0 ? r + 1 | 0 : r, (0 | (f = t[e + 4 >> 2])) == t[e + 104 >> 2] ? A = re(e) : (t[e + 4 >> 2] = f + 1, A = v[0 | f]), f = i - 48 | 0, a = i = r - (i >>> 0 < 48) | 0, (f >>> 0 < 2061584302 & (0 | i) <= 21474836 | (0 | i) < 21474836) & (A = (r = A) - 48 | 0) >>> 0 <= 9;);
                                                if (!(A >>> 0 >= 10))
                                                    for (;
                                                        (0 | (r = t[e + 4 >> 2])) == t[e + 104 >> 2] ? r = re(e) : (t[e + 4 >> 2] = r + 1, r = v[0 | r]), r - 48 >>> 0 < 10;);
                                            }
                                        }(r = (0 | (r = t[e + 116 >> 2])) > 0 ? 1 : (0 | r) >= 0) && (t[e + 4 >> 2] = t[e + 4 >> 2] - 1), e = f, f = n ? 0 - e | 0 : e, a = n ? 0 - (!!(0 | e) + a | 0) | 0 : a;
                                        break e
                                    }
                                }
                                if (a = -2147483648, !(t[e + 116 >> 2] < 0)) return t[e + 4 >> 2] = t[e + 4 >> 2] - 1,
                                E = -2147483648,
                                0
                            }
                            return E = a, f
                        }

                        function re(e) {
                            var r = 0,
                                f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            k = !!((r = t[e + 112 >> 2]) | (A = t[e + 116 >> 2])), i = r, o = r = (f = t[e + 4 >> 2]) - (a = t[e + 44 >> 2]) | 0, b = r + t[e + 120 >> 2] | 0, r = t[e + 124 >> 2] + (r >> 31) | 0;
                            e: {
                                if (!((i >>> 0 <= b >>> 0 & (0 | (r = b >>> 0 < o >>> 0 ? r + 1 | 0 : r)) >= (0 | A) | (0 | r) > (0 | A)) & k)) {
                                    if (G = A = G - 16 | 0, f = -1, i = t[e + 72 >> 2], t[e + 72 >> 2] = i - 1 | i, t[e + 20 >> 2] != t[e + 28 >> 2] && nr[t[e + 36 >> 2]](e, 0, 0), t[e + 28 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0, 4 & (i = t[e >> 2]) ? (t[e >> 2] = 32 | i, o = -1) : (a = t[e + 44 >> 2] + t[e + 48 >> 2] | 0, t[e + 8 >> 2] = a, t[e + 4 >> 2] = a, o = i << 27 >> 31), o || 1 == (0 | nr[t[e + 32 >> 2]](e, A + 15 | 0, 1)) && (f = v[A + 15 | 0]), G = A + 16 | 0, A = f, (0 | f) >= 0) break e;
                                    a = t[e + 44 >> 2], f = t[e + 4 >> 2]
                                }
                                return t[e + 112 >> 2] = -1,
                                t[e + 116 >> 2] = -1,
                                t[e + 104 >> 2] = f,
                                f = (A = a - f | 0) + b | 0,
                                r = (A >> 31) + r | 0,
                                t[e + 120 >> 2] = f,
                                t[e + 124 >> 2] = f >>> 0 < A >>> 0 ? r + 1 | 0 : r,
                                -1
                            }
                            return r = (f = b + 1 | 0) ? r : r + 1 | 0, i = t[e + 4 >> 2], a = t[e + 8 >> 2], o = b = t[e + 116 >> 2], b | (k = t[e + 112 >> 2]) && (b = k - f | 0, (0 | (k = o - (r + (f >>> 0 > k >>> 0) | 0) | 0)) >= (0 | (o = (u = a - i | 0) >> 31)) & b >>> 0 >= u >>> 0 | (0 | k) > (0 | o) || (a = i + b | 0)), t[e + 104 >> 2] = a, f = (a = (b = t[e + 44 >> 2]) - i | 0) + f | 0, r = (a >> 31) + r | 0, t[e + 120 >> 2] = f, t[e + 124 >> 2] = f >>> 0 < a >>> 0 ? r + 1 | 0 : r, i >>> 0 <= b >>> 0 && (n[i - 1 | 0] = A), A
                        }

                        function fe(e, r, f) {
                            var A, i = 0;
                            if (f >>> 0 >= 512) W(0 | e, 0 | r, 0 | f);
                            else {
                                A = e + f | 0;
                                e: if (3 & (e ^ r))
                                    if (A >>> 0 < 4) f = e;
                                    else if ((i = A - 4 | 0) >>> 0 < e >>> 0) f = e;
                                else
                                    for (f = e; n[0 | f] = v[0 | r], n[f + 1 | 0] = v[r + 1 | 0], n[f + 2 | 0] = v[r + 2 | 0], n[f + 3 | 0] = v[r + 3 | 0], r = r + 4 | 0, i >>> 0 >= (f = f + 4 | 0) >>> 0;);
                                else {
                                    r: if (3 & e)
                                        if (f)
                                            for (f = e;;) {
                                                if (n[0 | f] = v[0 | r], r = r + 1 | 0, !(3 & (f = f + 1 | 0))) break r;
                                                if (!(f >>> 0 < A >>> 0)) break
                                            } else f = e;
                                        else f = e;
                                    if (!((e = -4 & A) >>> 0 < 64 || (i = e + -64 | 0) >>> 0 < f >>> 0))
                                        for (; t[f >> 2] = t[r >> 2], t[f + 4 >> 2] = t[r + 4 >> 2], t[f + 8 >> 2] = t[r + 8 >> 2], t[f + 12 >> 2] = t[r + 12 >> 2], t[f + 16 >> 2] = t[r + 16 >> 2], t[f + 20 >> 2] = t[r + 20 >> 2], t[f + 24 >> 2] = t[r + 24 >> 2], t[f + 28 >> 2] = t[r + 28 >> 2], t[f + 32 >> 2] = t[r + 32 >> 2], t[f + 36 >> 2] = t[r + 36 >> 2], t[f + 40 >> 2] = t[r + 40 >> 2], t[f + 44 >> 2] = t[r + 44 >> 2], t[f + 48 >> 2] = t[r + 48 >> 2], t[f + 52 >> 2] = t[r + 52 >> 2], t[f + 56 >> 2] = t[r + 56 >> 2], t[f + 60 >> 2] = t[r + 60 >> 2], r = r - -64 | 0, i >>> 0 >= (f = f - -64 | 0) >>> 0;);
                                    if (e >>> 0 <= f >>> 0) break e;
                                    for (; t[f >> 2] = t[r >> 2], r = r + 4 | 0, e >>> 0 > (f = f + 4 | 0) >>> 0;);
                                }
                                if (f >>> 0 < A >>> 0)
                                    for (; n[0 | f] = v[0 | r], r = r + 1 | 0, (0 | A) != (0 | (f = f + 1 | 0)););
                            }
                        }

                        function Ae(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            b = t[e + 376 >> 2];
                            e: {
                                if ((0 | (i = t[e + 388 >> 2])) == t[e + 392 >> 2]) {
                                    if ((A = ((0 | (A = i >> 1 & -2)) > 0 ? A : 0) + 2 | 0) >>> 0 > (2147483647 ^ i) >>> 0) break e;
                                    if (A = A + i | 0, t[e + 392 >> 2] = A, A = Y(t[e + 384 >> 2], A << 2), t[e + 384 >> 2] = A, !A) break e;
                                    i = t[e + 388 >> 2]
                                } else A = t[e + 384 >> 2];t[e + 388 >> 2] = i + 1,
                                t[(i << 2) + A >> 2] = b;r: {
                                    if ((0 | (A = t[r + 4 >> 2])) > 0)
                                        for (i = 0;;) {
                                            if (o = (a = (b = t[t[r >> 2] + (i << 2) >> 2]) >> 1) + t[e + 336 >> 2] | 0, 1 == ((k = v[0 | o]) ^ (u = 1 & b))) break r;
                                            if (2 & k && (n[0 | o] = u, A = t[e + 388 >> 2], a = t[e + 396 >> 2] + (a << 3) | 0, t[a >> 2] = -1, t[a + 4 >> 2] = A, A = t[e + 376 >> 2], t[e + 376 >> 2] = A + 1, t[t[e + 372 >> 2] + (A << 2) >> 2] = b, A = t[r + 4 >> 2]), !((0 | A) > (0 | (i = i + 1 | 0)))) break
                                        }
                                    if (-1 == (0 | R(e)) && (A = 0, (r = t[f >> 2]) && (t[f + 4 >> 2] = 0), !(t[e + 376 >> 2] <= 0)))
                                        for (;;) {
                                            if (b = t[e + 372 >> 2], (0 | (i = t[f + 4 >> 2])) == t[f + 8 >> 2]) {
                                                if ((a = ((0 | (a = i >> 1 & -2)) > 0 ? a : 0) + 2 | 0) >>> 0 > (2147483647 ^ i) >>> 0) break e;
                                                if (i = i + a | 0, t[f + 8 >> 2] = i, r = Y(r, i << 2), t[f >> 2] = r, !r) break e;
                                                i = t[f + 4 >> 2]
                                            }
                                            if (t[f + 4 >> 2] = i + 1, t[(i << 2) + r >> 2] = t[b + (A << 2) >> 2], !((0 | (A = A + 1 | 0)) < t[e + 376 >> 2])) break
                                        }
                                }
                                return void ve(e, 0)
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function ie(e, r) {
                            var f, A, i, a = 0;
                            G = f = G - 112 | 0, a = t[e >> 2], A = t[a - 4 >> 2], i = t[a - 8 >> 2], t[f + 80 >> 2] = 0, t[f + 84 >> 2] = 0, t[f + 88 >> 2] = 0, t[f + 92 >> 2] = 0, t[f + 96 >> 2] = 0, t[f + 100 >> 2] = 0, n[f + 103 | 0] = 0, n[f + 104 | 0] = 0, n[f + 105 | 0] = 0, n[f + 106 | 0] = 0, n[f + 107 | 0] = 0, n[f + 108 | 0] = 0, n[f + 109 | 0] = 0, n[f + 110 | 0] = 0, t[f + 72 >> 2] = 0, t[f + 76 >> 2] = 0, t[f + 68 >> 2] = 0, t[f + 64 >> 2] = 9764, t[f + 60 >> 2] = e, t[f + 56 >> 2] = r, a = e + i | 0;
                            e: if (Le(A, r, 0)) e = i ? 0 : a;
                                else if (!((0 | e) >= (0 | a) && (n[f + 47 | 0] = 0, n[f + 48 | 0] = 0, n[f + 49 | 0] = 0, n[f + 50 | 0] = 0, n[f + 51 | 0] = 0, n[f + 52 | 0] = 0, n[f + 53 | 0] = 0, n[f + 54 | 0] = 0, t[f + 24 >> 2] = 0, t[f + 28 >> 2] = 0, t[f + 32 >> 2] = 0, t[f + 36 >> 2] = 0, t[f + 40 >> 2] = 0, t[f + 44 >> 2] = 0, t[f + 16 >> 2] = 0, t[f + 20 >> 2] = 0, t[f + 12 >> 2] = 0, t[f + 8 >> 2] = r, t[f + 4 >> 2] = e, t[f >> 2] = A, t[f + 48 >> 2] = 1, nr[t[t[A >> 2] + 20 >> 2]](A, f, a, a, 1, 0), t[f + 24 >> 2]))) {
                                e = 0, nr[t[t[A >> 2] + 24 >> 2]](A, f + 56 | 0, a, 1, 0);
                                r: switch (t[f + 92 >> 2]) {
                                    case 0:
                                        e = 1 == t[f + 96 >> 2] && 1 == t[f + 84 >> 2] && 1 == t[f + 88 >> 2] ? t[f + 76 >> 2] : 0;
                                        break e;
                                    case 1:
                                        break r;
                                    default:
                                        break e
                                }
                                1 != t[f + 80 >> 2] && t[f + 96 >> 2] | 1 != t[f + 84 >> 2] | 1 != t[f + 88 >> 2] || (e = t[f + 72 >> 2])
                            }
                            return G = f + 112 | 0, e
                        }

                        function ae(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            if (!v[e + 232 | 0]) return 0;
                            be(t[r >> 2], t[r + 4 >> 2]);
                            e: {
                                r: {
                                    if (!((0 | (a = t[r + 4 >> 2])) <= 0)) {
                                        for (A = -2;;) {
                                            if (k = t[r >> 2], f = t[k + (b << 2) >> 2], !(i = v[t[e + 336 >> 2] + (f >> 1) | 0] ^ 1 & f) | 1 == (f ^ A)) break r;
                                            if (1 == (0 | i) | (0 | f) == (0 | A) || (t[(o << 2) + k >> 2] = f, o = o + 1 | 0, a = t[r + 4 >> 2], A = f), !((0 | (b = b + 1 | 0)) < (0 | a))) break
                                        }(0 | (f = b - o | 0)) <= 0 || (a = a - f | 0, t[r + 4 >> 2] = a)
                                    }
                                    f: switch (0 | a) {
                                        case 0:
                                            return n[e + 232 | 0] = 0, 0;
                                        case 1:
                                            return A = t[t[r >> 2] >> 2], n[(f = A >> 1) + t[e + 336 >> 2] | 0] = 1 & A, r = t[e + 388 >> 2], f = t[e + 396 >> 2] + (f << 3) | 0, t[f >> 2] = -1, t[f + 4 >> 2] = r, r = t[e + 376 >> 2], t[e + 376 >> 2] = r + 1, t[t[e + 372 >> 2] + (r << 2) >> 2] = A, r = e, e = -1 == (0 | R(e)), n[r + 232 | 0] = e, e
                                    }
                                    if (f = ne(e + 476 | 0, r, 0, 0), (0 | (i = t[e + 240 >> 2])) == t[e + 244 >> 2]) {
                                        if ((r = ((0 | (r = i >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ i) >>> 0) break e;
                                        if (r = r + i | 0, t[e + 244 >> 2] = r, A = Y(t[e + 236 >> 2], r << 2), t[e + 236 >> 2] = A, !A) break e;
                                        i = t[e + 240 >> 2]
                                    } else A = t[e + 236 >> 2];t[e + 240 >> 2] = i + 1,
                                    t[(i << 2) + A >> 2] = f,
                                    $(e, f)
                                }
                                return 1
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function ne(e, r, f, A) {
                            var i, a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            if (Ge(e, (a = 1 + ((n = 255 & (o = v[e + 16 | 0] | f | A)) + t[r + 4 >> 2] | 0) & 1073741823) + t[e + 4 >> 2] | 0), a = a + (i = t[e + 4 >> 2]) | 0, t[e + 4 >> 2] = a, a >>> 0 >= i >>> 0) {
                                if (a = 0, b = t[e >> 2] + (i << 2) | 0, e = (A ? 32 : 0) | (f ? 4 : 0) | !!(0 | n) << 3, t[b >> 2] = e | -64 & t[b >> 2], k = e | (n = t[r + 4 >> 2]) << 6, t[b >> 2] = k, t[r + 4 >> 2] > 0)
                                    for (e = t[r >> 2]; t[4 + ((u = a << 2) + b | 0) >> 2] = t[e + u >> 2], (0 | (a = a + 1 | 0)) < t[r + 4 >> 2];);
                                if (255 & o) {
                                    if (r = 67108863 & n, f) return t[4 + ((r << 2) + b | 0) >> 2] = 0, i;
                                    if (A) return t[4 + ((r << 2) + b | 0) >> 2] = -1, i;
                                    if (e = 0, !(k >>> 0 < 64)) {
                                        if (n &= 3, f = 0, a = 0, r - 1 >>> 0 >= 3)
                                            for (u = r - n | 0, A = 0; e = 1 << (t[(k = b + 4 | 0) + (12 | (o = a << 2)) >> 2] >>> 1) | 1 << (t[o + k >> 2] >>> 1) | e | 1 << (t[k + (4 | o) >> 2] >>> 1) | 1 << (t[k + (8 | o) >> 2] >>> 1), a = a + 4 | 0, (0 | u) != (0 | (A = A + 4 | 0)););
                                        if (n)
                                            for (; e = 1 << (t[4 + ((a << 2) + b | 0) >> 2] >>> 1) | e, a = a + 1 | 0, (0 | n) != (0 | (f = f + 1 | 0)););
                                    }
                                    t[4 + ((r << 2) + b | 0) >> 2] = e
                                }
                                return i
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function be(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            if ((0 | r) <= 15) i = e;
                            else
                                for (;;) {
                                    for (a = t[(r << 1 & -4) + e >> 2], f = r, A = -1;;)
                                        if (!((0 | (b = t[(i = ((A = A + 1 | 0) << 2) + e | 0) >> 2])) < (0 | a))) {
                                            for (;
                                                (0 | (n = t[(o = ((f = f - 1 | 0) << 2) + e | 0) >> 2])) > (0 | a););
                                            if (!((0 | A) < (0 | f))) break;
                                            t[i >> 2] = n, t[o >> 2] = b
                                        } if (be(e, A), e = i, !((0 | (r = r - A | 0)) >= 16)) break
                                }
                            if ((0 | r) >= 2)
                                for (o = r - 2 | 0, a = 0;;) {
                                    if (A = b = a + 1 | 0, e = 0, n = ~(f = a) + r & 3)
                                        for (; f = t[(A << 2) + i >> 2] < t[(f << 2) + i >> 2] ? A : f, A = A + 1 | 0, (0 | n) != (0 | (e = e + 1 | 0)););
                                    if (o - a >>> 0 >= 3)
                                        for (; e = A + 3 | 0, n = A + 2 | 0, k = A + 1 | 0, f = t[(A << 2) + i >> 2] < t[(f << 2) + i >> 2] ? A : f, f = t[(k << 2) + i >> 2] < t[(f << 2) + i >> 2] ? k : f, f = t[(n << 2) + i >> 2] < t[(f << 2) + i >> 2] ? n : f, f = t[(e << 2) + i >> 2] < t[(f << 2) + i >> 2] ? e : f, (0 | (A = A + 4 | 0)) != (0 | r););
                                    if (A = t[(e = (a << 2) + i | 0) >> 2], k = e, e = (f << 2) + i | 0, t[k >> 2] = t[e >> 2], t[e >> 2] = A, e = (0 | a) == (0 | o), a = b, e) break
                                }
                        }

                        function te(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                t = 0,
                                o = 0,
                                k = 0,
                                u = 0;
                            e: {
                                r: {
                                    f: {
                                        A: {
                                            i: {
                                                a: {
                                                    n: {
                                                        b: {
                                                            t: {
                                                                o: {
                                                                    if (r) {
                                                                        if (!f) break o;
                                                                        break t
                                                                    }
                                                                    E = 0,
                                                                    e = (e >>> 0) / (f >>> 0) | 0;
                                                                    break e
                                                                }
                                                                if (!e) break b;
                                                                break n
                                                            }
                                                            if (!(f - 1 & f)) break a;n = 0 - (a = (m(f) + 33 | 0) - m(r) | 0) | 0;
                                                            break A
                                                        }
                                                        E = 0,
                                                        e = (r >>> 0) / 0 | 0;
                                                        break e
                                                    }
                                                    if ((A = 32 - m(r) | 0) >>> 0 < 31) break i;
                                                    break f
                                                }
                                                if (1 == (0 | f)) break r;f = 31 & (a = $e(f)),
                                                (63 & a) >>> 0 >= 32 ? e = r >>> f | 0 : (A = r >>> f | 0, e = ((1 << f) - 1 & r) << 32 - f | e >>> f),
                                                E = A;
                                                break e
                                            }
                                            a = A + 1 | 0,
                                            n = 63 - A | 0
                                        }
                                        if (i = 31 & (A = 63 & a), A >>> 0 >= 32 ? (A = 0, b = r >>> i | 0) : (A = r >>> i | 0, b = ((1 << i) - 1 & r) << 32 - i | e >>> i), i = 31 & (n &= 63), n >>> 0 >= 32 ? (r = e << i, e = 0) : (r = (1 << i) - 1 & e >>> 32 - i | r << i, e <<= i), a)
                                            for (u = -1 == (0 | (n = f - 1 | 0)) ? -1 : 0; t = A << 1 | b >>> 31, b = (A = b << 1 | r >>> 31) - (o = f & (i = u - (t + (A >>> 0 > n >>> 0) | 0) >> 31)) | 0, A = t - (A >>> 0 < o >>> 0) | 0, r = r << 1 | e >>> 31, e = k | e << 1, k = 1 & i, a = a - 1 | 0;);E = r << 1 | e >>> 31,
                                        e = k | e << 1;
                                        break e
                                    }
                                    e = 0,
                                    r = 0
                                }
                                E = r
                            }
                            return e
                        }

                        function oe(e, r, f) {
                            e: switch (r - 9 | 0) {
                                case 0:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, void(t[e >> 2] = t[r >> 2]);
                                case 6:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = b[r >> 1], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 7:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = g[r >> 1], void(t[e + 4 >> 2] = 0);
                                case 8:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = n[0 | r], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 9:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = v[0 | r], void(t[e + 4 >> 2] = 0);
                                case 16:
                                    return r = t[f >> 2] + 7 & -8, t[f >> 2] = r + 8, void(d[e >> 3] = d[r >> 3]);
                                case 17:
                                    s();
                                default:
                                    return;
                                case 1:
                                case 4:
                                case 14:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, r = t[r >> 2], t[e >> 2] = r, void(t[e + 4 >> 2] = r >> 31);
                                case 2:
                                case 5:
                                case 11:
                                case 15:
                                    return r = t[f >> 2], t[f >> 2] = r + 4, t[e >> 2] = t[r >> 2], void(t[e + 4 >> 2] = 0);
                                case 3:
                                case 10:
                                case 12:
                                case 13:
                            }
                            r = t[f >> 2] + 7 & -8,
                            t[f >> 2] = r + 8,
                            f = t[r + 4 >> 2],
                            t[e >> 2] = t[r >> 2],
                            t[e + 4 >> 2] = f
                        }

                        function ke(e, r, f, A, i, a) {
                            var n;
                            G = n = G - 80 | 0;
                            e: if ((0 | a) >= 16384) {
                                if (F(n + 32 | 0, r, f, A, i, 0, 0, 0, 2147352576), A = t[n + 40 >> 2], i = t[n + 44 >> 2], r = t[n + 32 >> 2], f = t[n + 36 >> 2], a >>> 0 < 32767) {
                                    a = a - 16383 | 0;
                                    break e
                                }
                                F(n + 16 | 0, r, f, A, i, 0, 0, 0, 2147352576), a = ((0 | a) >= 49149 ? 49149 : a) - 32766 | 0, A = t[n + 24 >> 2], i = t[n + 28 >> 2], r = t[n + 16 >> 2], f = t[n + 20 >> 2]
                            } else(0 | a) > -16383 || (F(n - -64 | 0, r, f, A, i, 0, 0, 0, 7471104), A = t[n + 72 >> 2], i = t[n + 76 >> 2], r = t[n + 64 >> 2], f = t[n + 68 >> 2], a >>> 0 > 4294934644 ? a = a + 16269 | 0 : (F(n + 48 | 0, r, f, A, i, 0, 0, 0, 7471104), a = ((0 | a) <= -48920 ? -48920 : a) + 32538 | 0, A = t[n + 56 >> 2], i = t[n + 60 >> 2], r = t[n + 48 >> 2], f = t[n + 52 >> 2]));
                            F(n, r, f, A, i, 0, 0, 0, a + 16383 << 16), r = t[n + 12 >> 2], t[e + 8 >> 2] = t[n + 8 >> 2], t[e + 12 >> 2] = r, r = t[n + 4 >> 2], t[e >> 2] = t[n >> 2], t[e + 4 >> 2] = r, G = n + 80 | 0
                        }

                        function ue(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            if (f && (n[0 | e] = r, n[(A = e + f | 0) - 1 | 0] = r, !(f >>> 0 < 3 || (n[e + 2 | 0] = r, n[e + 1 | 0] = r, n[A - 3 | 0] = r, n[A - 2 | 0] = r, f >>> 0 < 7 || (n[e + 3 | 0] = r, n[A - 4 | 0] = r, f >>> 0 < 9 || (i = (A = 0 - e & 3) + e | 0, r = C(255 & r, 16843009), t[i >> 2] = r, t[(f = (A = f - A & -4) + i | 0) - 4 >> 2] = r, A >>> 0 < 9 || (t[i + 8 >> 2] = r, t[i + 4 >> 2] = r, t[f - 8 >> 2] = r, t[f - 12 >> 2] = r, A >>> 0 < 25 || (t[i + 24 >> 2] = r, t[i + 20 >> 2] = r, t[i + 16 >> 2] = r, t[i + 12 >> 2] = r, t[f - 16 >> 2] = r, t[f - 20 >> 2] = r, t[f - 24 >> 2] = r, t[f - 28 >> 2] = r, (f = A - (b = 4 & i | 24) | 0) >>> 0 < 32))))))))
                                for (A = Re(r, 0, 1, 1), a = E, r = i + b | 0; t[r + 24 >> 2] = A, t[r + 28 >> 2] = a, t[r + 16 >> 2] = A, t[r + 20 >> 2] = a, t[r + 8 >> 2] = A, t[r + 12 >> 2] = a, t[r >> 2] = A, t[r + 4 >> 2] = a, r = r + 32 | 0, (f = f - 32 | 0) >>> 0 > 31;);
                            return e
                        }

                        function ce(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                s = 0;
                            if (!(t[r + 4 >> 2] <= 0)) {
                                for (;;) {
                                    u = t[r >> 2], b = t[u + (i << 2) >> 2], a = t[e + 476 >> 2] + (b << 2) | 0, o = (f = t[a >> 2]) >>> 6 | 0;
                                    e: {
                                        r: {
                                            f: {
                                                if (32 & f) {
                                                    if (f >>> 0 < 64) break r;
                                                    for (n = (o << 2) + a | 0, s = t[e + 336 >> 2], A = 0, f = 0;;) {
                                                        if (1 == (1 & (c = t[4 + ((f << 2) + a | 0) >> 2]) ^ v[(c >> 1) + s | 0]) && (0 | (A = A + 1 | 0)) >= (t[n + 4 >> 2] - 1 | 0)) break f;
                                                        if ((0 | o) == (0 | (f = f + 1 | 0))) break
                                                    }
                                                    break r
                                                }
                                                if (f >>> 0 < 64) break r;
                                                for (A = t[e + 336 >> 2], f = 0;;) {
                                                    if (n = t[4 + ((f << 2) + a | 0) >> 2], v[A + (n >> 1) | 0] == (1 & n)) break f;
                                                    if ((0 | o) == (0 | (f = f + 1 | 0))) break
                                                }
                                                break r
                                            }
                                            O(e, b);
                                            break e
                                        }
                                        t[(k << 2) + u >> 2] = b,
                                        k = k + 1 | 0
                                    }
                                    if (!((0 | (i = i + 1 | 0)) < (0 | (f = t[r + 4 >> 2])))) break
                                }(0 | (e = i - k | 0)) <= 0 || (t[r + 4 >> 2] = f - e)
                            }
                        }

                        function se(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (i = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (f = (0 | (f = 1 + (r - i | 0) & -2)) < (0 | (A = 2 + (i >> 1 & -2) | 0)) ? A : f)) > (2147483647 ^ i)) break e;
                                        if (f = f + i | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], f << 2), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }
                                    if (!((0 | (f = t[e + 4 >> 2])) >= (0 | r))) {
                                        if (A = f, i = r - f & 3)
                                            for (; t[t[e >> 2] + (A << 2) >> 2] = 0, A = A + 1 | 0, (0 | i) != (0 | (a = a + 1 | 0)););
                                        if (!(f - r >>> 0 >= 4294967293))
                                            for (; t[(f = A << 2) + t[e >> 2] >> 2] = 0, t[4 + (f + t[e >> 2] | 0) >> 2] = 0, t[8 + (f + t[e >> 2] | 0) >> 2] = 0, t[12 + (f + t[e >> 2] | 0) >> 2] = 0, (0 | (A = A + 4 | 0)) != (0 | r););
                                    }
                                    t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function le(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (A = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (i = (0 | (i = 2 + (A >> 1 & -2) | 0)) > (0 | (a = 1 + (r - A | 0) & -2)) ? i : a)) > (2147483647 ^ A)) break e;
                                        if (A = A + i | 0, t[e + 8 >> 2] = A, A = Y(t[e >> 2], A), t[e >> 2] = A, !A && 48 == t[2726]) break e
                                    }
                                    if (!((0 | (A = t[e + 4 >> 2])) >= (0 | r))) {
                                        if (i = v[0 | f], f = A, b = r - A & 3)
                                            for (a = 0; n[t[e >> 2] + f | 0] = i, f = f + 1 | 0, (0 | b) != (0 | (a = a + 1 | 0)););
                                        if (!(A - r >>> 0 >= 4294967293))
                                            for (; n[t[e >> 2] + f | 0] = i, n[1 + (t[e >> 2] + f | 0) | 0] = i, n[2 + (t[e >> 2] + f | 0) | 0] = i, n[3 + (t[e >> 2] + f | 0) | 0] = i, (0 | (f = f + 4 | 0)) != (0 | r););
                                    }
                                    t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function ve(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0;
                            if (!(t[e + 388 >> 2] <= (0 | r))) {
                                if (f = t[e + 376 >> 2], A = (b = r << 2) + t[e + 384 >> 2] | 0, (0 | f) > (0 | (i = t[A >> 2]))) {
                                    for (a = e + 436 | 0; A = t[(i = (f = f - 1 | 0) << 2) + t[e + 372 >> 2] >> 2] >> 1, n[A + t[e + 336 >> 2] | 0] = 2, (0 | (o = t[e + 72 >> 2])) <= 1 && 1 != (0 | o) | t[(t[e + 384 >> 2] + (t[e + 388 >> 2] << 2) | 0) - 4 >> 2] >= (0 | f) || (n[A + t[e + 348 >> 2] | 0] = 1 & n[i + t[e + 372 >> 2] | 0]), !v[A + t[e + 360 >> 2] | 0] | (0 | A) < t[e + 456 >> 2] & t[t[e + 452 >> 2] + (A << 2) >> 2] >= 0 || L(a, A), A = t[e + 384 >> 2] + b | 0, (0 | (i = t[A >> 2])) < (0 | f););
                                    f = t[e + 376 >> 2]
                                }
                                t[e + 408 >> 2] = i, (0 | (a = f)) > (0 | (f = t[A >> 2])) && (t[e + 376 >> 2] = f), t[e + 388 >> 2] <= (0 | r) || (t[e + 388 >> 2] = r)
                            }
                        }

                        function ge(e, r, f, A, i, a, n, b) {
                            var t, o = 0,
                                k = 0,
                                u = 0;
                            k = 1, u = o = 2147483647 & A;
                            e: if (!((t = 2147418112 == (0 | o)) & !f ? e | r : t & !!(0 | f) | o >>> 0 > 2147418112) && !(!n & 2147418112 == (0 | (o = 2147483647 & b)) ? i | a : 2147418112 == (0 | o) & !!(0 | n) | o >>> 0 > 2147418112)) {
                                if (!(e | i | f | n | r | a | o | u)) return 0;
                                if (u = (0 | (k = A & b)) > 0 ? 1 : (0 | k) >= 0) {
                                    if (k = -1, (0 | f) == (0 | n) & (0 | A) == (0 | b) ? (0 | r) == (0 | a) & e >>> 0 < i >>> 0 | r >>> 0 < a >>> 0 : f >>> 0 < n >>> 0 & (0 | A) <= (0 | b) | (0 | A) < (0 | b)) break e;
                                    return !!(e ^ i | f ^ n | r ^ a | A ^ b)
                                }
                                k = -1, ((0 | f) == (0 | n) & (0 | A) == (0 | b) ? (0 | r) == (0 | a) & e >>> 0 > i >>> 0 | r >>> 0 > a >>> 0 : f >>> 0 > n >>> 0 & (0 | A) >= (0 | b) | (0 | A) > (0 | b)) || (k = !!(e ^ i | f ^ n | r ^ a | A ^ b))
                            }
                            return k
                        }

                        function Pe(e, r, f, A) {
                            var i, a = 0,
                                n = 0;
                            if (G = i = G - 208 | 0, t[i + 204 >> 2] = f, ue(f = i + 160 | 0, 0, 40), t[i + 200 >> 2] = t[i + 204 >> 2], !((0 | M(0, r, i + 200 | 0, i + 80 | 0, f, A)) < 0)) {
                                f = t[e + 76 >> 2] < 0, a = t[e >> 2], t[e >> 2] = -33 & a;
                                e: {
                                    r: {
                                        if (t[e + 48 >> 2]) {
                                            if (t[e + 16 >> 2]) break r
                                        } else t[e + 48 >> 2] = 80,
                                        t[e + 28 >> 2] = 0,
                                        t[e + 16 >> 2] = 0,
                                        t[e + 20 >> 2] = 0,
                                        n = t[e + 44 >> 2],
                                        t[e + 44 >> 2] = i;
                                        if (Qe(e)) break e
                                    }
                                    M(e, r, i + 200 | 0, i + 80 | 0, i + 160 | 0, A)
                                }
                                n && (nr[t[e + 36 >> 2]](e, 0, 0), t[e + 48 >> 2] = 0, t[e + 44 >> 2] = n, t[e + 28 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0), t[e >> 2] = t[e >> 2] | 32 & a
                            }
                            G = i + 208 | 0
                        }

                        function we(e, r) {
                            var f, A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                k = 0;
                            G = f = G - 16 | 0, c(+r), A = 0 | o(1), i = 0 | o(0), 2145386495 == (0 | (n = (a = 2147483647 & A) - 1048576 | 0)) | n >>> 0 < 2145386495 ? (b = i << 28, i = (15 & a) << 28 | i >>> 4, a = 1006632960 + (a >>> 4 | 0) | 0) : 2146435072 == (0 | a) | a >>> 0 > 2146435072 ? (b = i << 28, i = (15 & A) << 28 | i >>> 4, a = A >>> 4 | 2147418112) : i | a ? (Ce(f, n = i, a, 0, 0, (i = a ? m(a) : m(i) + 32 | 0) + 49 | 0), k = t[f >> 2], b = t[f + 4 >> 2], n = 15372 - i << 16, i = t[f + 8 >> 2], a = n | 65536 ^ t[f + 12 >> 2]) : (i = 0, a = 0), t[e >> 2] = k, t[e + 4 >> 2] = b, t[e + 8 >> 2] = i, t[e + 12 >> 2] = -2147483648 & A | a, G = f + 16 | 0
                        }

                        function de(e, r, f, A, i, a) {
                            var n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            64 & a ? (r = 31 & (f = a + -64 | 0), (63 & f) >>> 0 >= 32 ? (f = 0, r = i >>> r | 0) : (f = i >>> r | 0, r = ((1 << r) - 1 & i) << 32 - r | A >>> r), A = 0, i = 0) : a && (o = A, n = 31 & (b = 64 - a | 0), (63 & b) >>> 0 >= 32 ? (b = A << n, k = 0) : (b = (1 << n) - 1 & o >>> 32 - n | i << n, k = o << n), o = r, r = 31 & a, (63 & a) >>> 0 >= 32 ? (n = 0, r = f >>> r | 0) : (n = f >>> r | 0, r = ((1 << r) - 1 & f) << 32 - r | o >>> r), r |= k, f = n | b, n = A, A = 31 & a, (63 & a) >>> 0 >= 32 ? (b = 0, A = i >>> A | 0) : (b = i >>> A | 0, A = ((1 << A) - 1 & i) << 32 - A | n >>> A), i = b), t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i
                        }

                        function Ce(e, r, f, A, i, a) {
                            var n = 0,
                                b = 0,
                                o = 0;
                            64 & a ? (i = a + -64 | 0, a = r, A = 31 & i, (63 & i) >>> 0 >= 32 ? (i = a << A, A = 0) : (i = (1 << A) - 1 & a >>> 32 - A | f << A, A = a << A), r = 0, f = 0) : a && (b = A, n = 31 & a, (63 & a) >>> 0 >= 32 ? (o = A << n, b = 0) : (o = (1 << n) - 1 & b >>> 32 - n | i << n, b <<= n), n = r, A = 31 & (i = 64 - a | 0), (63 & i) >>> 0 >= 32 ? (i = 0, A = f >>> A | 0) : (i = f >>> A | 0, A = ((1 << A) - 1 & f) << 32 - A | n >>> A), A |= b, i |= o, b = r, n = 31 & a, (63 & a) >>> 0 >= 32 ? (o = r << n, r = 0) : (o = (1 << n) - 1 & b >>> 32 - n | f << n, r = b << n), f = o), t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = i
                        }

                        function ye(e, r) {
                            if (!e) return 0;
                            e: {
                                r: {
                                    if (e) {
                                        if (r >>> 0 <= 127) break r;
                                        if (t[t[2765] >> 2]) {
                                            if (r >>> 0 <= 2047) {
                                                n[e + 1 | 0] = 63 & r | 128, n[0 | e] = r >>> 6 | 192, e = 2;
                                                break e
                                            }
                                            if (!(57344 != (-8192 & r) & r >>> 0 >= 55296)) {
                                                n[e + 2 | 0] = 63 & r | 128, n[0 | e] = r >>> 12 | 224, n[e + 1 | 0] = r >>> 6 & 63 | 128, e = 3;
                                                break e
                                            }
                                            if (r - 65536 >>> 0 <= 1048575) {
                                                n[e + 3 | 0] = 63 & r | 128, n[0 | e] = r >>> 18 | 240, n[e + 2 | 0] = r >>> 6 & 63 | 128, n[e + 1 | 0] = r >>> 12 & 63 | 128, e = 4;
                                                break e
                                            }
                                        } else if (57216 == (-128 & r)) break r;
                                        t[2726] = 25, e = -1
                                    } else e = 1;
                                    break e
                                }
                                n[0 | e] = r,
                                e = 1
                            }
                            return e
                        }

                        function he(e, r, f, A, i) {
                            var a, n = 0,
                                b = 0;
                            b = -1;
                            e: if (!(((n = 2147418112 == (0 | (a = 2147483647 & A))) & !f ? e | r : n & !!(0 | f) | a >>> 0 > 2147418112) || (n = 2147483647 & i) >>> 0 > 2147418112 & 2147418112 != (0 | n))) {
                                if (!(e | f | n | a | r)) return 0;
                                if (n = (0 | (n = A & i)) > 0 ? 1 : (0 | n) >= 0) {
                                    if ((!!(0 | f) | (0 | A) != (0 | i)) & (0 | A) < (0 | i)) break e;
                                    return !!(e | f | A ^ i | r)
                                }(!f & (0 | A) == (0 | i) ? e | r : !!(0 | f) & (0 | A) >= (0 | i) | (0 | A) > (0 | i)) || (b = !!(e | f | A ^ i | r))
                            }
                            return b
                        }

                        function me(e, r, f, A, i, a, n, b, o) {
                            var k, u, c;
                            o = Re(r, f, b, o), b = E, i = Re(A, i, a, n), A = E + b | 0, b = i >>> 0 > (o = i + o | 0) >>> 0 ? A + 1 | 0 : A, k = n, u = f, n = (f = Re(n, i = 0, f, A = 0)) + o | 0, o = E + b | 0, c = n, f = f >>> 0 > n >>> 0 ? o + 1 | 0 : o, n = Re(a, 0, r, 0), b = E, A = Re(a, o = 0, u, A), a = E + o | 0, a = A >>> 0 > (b = b + A | 0) >>> 0 ? a + 1 | 0 : a, A = f, a = a >>> 0 > (o = a + c | 0) >>> 0 ? A + 1 | 0 : A, r = Re(r, 0, k, i) + b | 0, i = E, b = (i = r >>> 0 < b >>> 0 ? i + 1 | 0 : i) + o | 0, o = a, t[e + 8 >> 2] = b, t[e + 12 >> 2] = i >>> 0 > b >>> 0 ? o + 1 | 0 : o, t[e >> 2] = n, t[e + 4 >> 2] = r
                        }

                        function Be(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            if (!((0 | (f = t[r + 76 >> 2])) >= 0 & (!f | t[2747] != (1073741823 & f)))) return (0 | (A = 255 & e)) != t[r + 80 >> 2] && (0 | (f = t[r + 20 >> 2])) != t[r + 16 >> 2] ? (t[r + 20 >> 2] = f + 1, void(n[0 | f] = e)) : void Se(r, A);
                            A = t[(f = r + 76 | 0) >> 2], t[f >> 2] = A || 1073741823, (0 | (i = 255 & e)) == t[r + 80 >> 2] || (0 | (A = t[r + 20 >> 2])) == t[r + 16 >> 2] ? Se(r, i) : (t[r + 20 >> 2] = A + 1, n[0 | A] = e), t[f >> 2] = 0
                        }

                        function pe(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0;
                            e: {
                                if (!(A = t[f + 16 >> 2])) {
                                    if (Qe(f)) break e;
                                    A = t[f + 16 >> 2]
                                }
                                if (A - (i = t[f + 20 >> 2]) >>> 0 < r >>> 0) return 0 | nr[t[f + 36 >> 2]](f, e, r);r: {
                                    f: if (!(!r | t[f + 80 >> 2] < 0)) {
                                        for (A = r;;) {
                                            if (10 != v[(a = e + A | 0) - 1 | 0]) {
                                                if (A = A - 1 | 0) continue;
                                                break f
                                            }
                                            break
                                        }
                                        if ((i = 0 | nr[t[f + 36 >> 2]](f, e, A)) >>> 0 < A >>> 0) break e;
                                        r = r - A | 0, i = t[f + 20 >> 2];
                                        break r
                                    }a = e,
                                    A = 0
                                }
                                fe(i, a, r),
                                t[f + 20 >> 2] = t[f + 20 >> 2] + r,
                                i = r + A | 0
                            }
                            return i
                        }

                        function De(e, r, f, A) {
                            t[e + 16 >> 2] = A, t[e + 12 >> 2] = 1884, t[e + 8 >> 2] = f, t[e + 4 >> 2] = r, t[e >> 2] = 2696, 1 & n[10900] || (t[2724] = 0, t[2722] = 0, t[2723] = 0, n[10900] = 1);
                            e: {
                                if ((0 | (A = t[2723])) == t[2724]) {
                                    if ((r = ((0 | (r = A >> 1 & -2)) > 0 ? r : 0) + 2 | 0) >>> 0 > (2147483647 ^ A) >>> 0) break e;
                                    if (r = r + A | 0, t[2724] = r, r = Y(t[2722], r << 2), t[2722] = r, !r) break e;
                                    A = t[2723]
                                } else r = t[2722];
                                return t[2723] = A + 1,
                                void(t[(A << 2) + r >> 2] = e)
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function Te(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0;
                            e: {
                                if (t[e + 4 >> 2] < (0 | r)) {
                                    if (!((0 | (f = t[e + 8 >> 2])) >= (0 | r))) {
                                        if ((0 | (A = (0 | (A = 2 + (f >> 1 & -2) | 0)) > (0 | (i = 1 + (r - f | 0) & -2)) ? A : i)) > (2147483647 ^ f)) break e;
                                        if (f = f + A | 0, t[e + 8 >> 2] = f, f = Y(t[e >> 2], C(f, 12)), t[e >> 2] = f, !f && 48 == t[2726]) break e
                                    }(0 | (f = t[e + 4 >> 2])) < (0 | r) && ue(t[e >> 2] + C(f, 12) | 0, 0, C(r - f | 0, 12)), t[e + 4 >> 2] = r
                                }
                                return
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function Ie(e, r, f, A) {
                            n[e + 53 | 0] = 1;
                            e: if (t[e + 4 >> 2] == (0 | f)) {
                                n[e + 52 | 0] = 1;
                                r: {
                                    if (!(f = t[e + 16 >> 2])) {
                                        if (t[e + 36 >> 2] = 1, t[e + 24 >> 2] = A, t[e + 16 >> 2] = r, 1 != (0 | A)) break e;
                                        if (1 == t[e + 48 >> 2]) break r;
                                        break e
                                    }
                                    if ((0 | r) == (0 | f)) {
                                        if (2 == (0 | (f = t[e + 24 >> 2])) && (t[e + 24 >> 2] = A, f = A), 1 != t[e + 48 >> 2]) break e;
                                        if (1 == (0 | f)) break r;
                                        break e
                                    }
                                    t[e + 36 >> 2] = t[e + 36 >> 2] + 1
                                }
                                n[e + 54 | 0] = 1
                            }
                        }

                        function ze(e) {
                            var r = 0;
                            r = 1;
                            e: if ((0 | e) >= 1024) {
                                if (r = 898846567431158e293, e >>> 0 < 2047) {
                                    e = e - 1023 | 0;
                                    break e
                                }
                                r = 1 / 0, e = ((0 | e) >= 3069 ? 3069 : e) - 2046 | 0
                            } else(0 | e) > -1023 || (r = 2004168360008973e-307, e >>> 0 > 4294965304 ? e = e + 969 | 0 : (r = 0, e = ((0 | e) <= -2960 ? -2960 : e) + 1938 | 0));
                            return k(0, 0), k(1, e + 1023 << 20), r * +u()
                        }

                        function je(e) {
                            var r = 0,
                                f = 0,
                                A = 0;
                            e: {
                                r: if (3 & (r = e)) {
                                    if (!v[0 | r]) return 0;
                                    for (;;) {
                                        if (!(3 & (r = r + 1 | 0))) break r;
                                        if (!v[0 | r]) break
                                    }
                                    break e
                                }for (; f = r, r = r + 4 | 0, !(~(A = t[f >> 2]) & A - 16843009 & -2139062144););
                                for (; f = (r = f) + 1 | 0, v[0 | r];);
                            }
                            return r - e | 0
                        }

                        function We(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0;
                            G = f = G - 16 | 0, r ? (Ce(f, i = ((A = r >> 31) ^ r) - A | 0, 0, 0, 0, (A = m(i)) + 81 | 0), i = 0 + t[f + 8 >> 2] | 0, A = (65536 ^ t[f + 12 >> 2]) + (16414 - A << 16) | 0, a = -2147483648 & r | (A = i >>> 0 < a >>> 0 ? A + 1 | 0 : A), A = t[f + 4 >> 2], r = t[f >> 2]) : r = 0, t[e >> 2] = r, t[e + 4 >> 2] = A, t[e + 8 >> 2] = i, t[e + 12 >> 2] = a, G = f + 16 | 0
                        }

                        function Ge(e, r) {
                            var f = 0,
                                A = 0;
                            e: {
                                if ((A = t[e + 8 >> 2]) >>> 0 < r >>> 0) {
                                    f = A;
                                    r: {
                                        for (;;) {
                                            if (r >>> 0 <= f >>> 0) break r;
                                            if (f = 2 + (((f >>> 1) + (f >>> 3) & -2) + f | 0) | 0, t[e + 8 >> 2] = f, !(f >>> 0 > A >>> 0)) break
                                        }
                                        break e
                                    }
                                    if (!(r = Y(t[e >> 2], f << 2)) & 48 == t[2726]) break e;
                                    t[e >> 2] = r
                                }
                                return
                            }
                            B(0 | rr(), 1060, 0), s()
                        }

                        function Ee(e, r) {
                            var f, A = 0,
                                i = 0,
                                a = 0;
                            G = f = G - 16 | 0, r ? (Ce(f, A = r, 0, 0, 0, 112 - (31 ^ (r = m(r))) | 0), A = 0 + t[f + 8 >> 2] | 0, r = (65536 ^ t[f + 12 >> 2]) + (16414 - r << 16) | 0, a = i >>> 0 > A >>> 0 ? r + 1 | 0 : r, i = t[f + 4 >> 2], r = t[f >> 2]) : r = 0, t[e >> 2] = r, t[e + 4 >> 2] = i, t[e + 8 >> 2] = A, t[e + 12 >> 2] = a, G = f + 16 | 0
                        }

                        function Se(e, r) {
                            var f, A = 0;
                            G = f = G - 16 | 0, n[f + 15 | 0] = r;
                            e: {
                                if (!(A = t[e + 16 >> 2])) {
                                    if (Qe(e)) break e;
                                    A = t[e + 16 >> 2]
                                }(0 | A) == (0 | (A = t[e + 20 >> 2])) | t[e + 80 >> 2] == (255 & r) ? nr[t[e + 36 >> 2]](e, f + 15 | 0, 1) : (t[e + 20 >> 2] = A + 1, n[0 | A] = r)
                            }
                            G = f + 16 | 0
                        }

                        function Ue(e, r, f) {
                            var A = 0,
                                i = 0,
                                a = 0,
                                b = 0;
                            if (r)
                                for (; a = f = f - 1 | 0, b = (i = e) - Re(e = te(e, r, 10), A = E, 10, 0) | 48, n[0 | a] = b, i = r >>> 0 > 9, r = A, i;);
                            if (e)
                                for (; r = (e >>> 0) / 10 | 0, n[0 | (f = f - 1 | 0)] = e - C(r, 10) | 48, A = e >>> 0 > 9, e = r, A;);
                            return f
                        }

                        function Ze(e, r) {
                            var f, A, i = 0;
                            if (c(+e), f = 0 | o(1), A = 0 | o(0), 2047 != (0 | (i = f >>> 20 & 2047))) {
                                if (!i) return 0 == e ? i = 0 : (e = Ze(0x10000000000000000 * e, r), i = t[r >> 2] + -64 | 0), t[r >> 2] = i, e;
                                t[r >> 2] = i - 1022, k(0, 0 | A), k(1, -2146435073 & f | 1071644672), e = +u()
                            }
                            return e
                        }

                        function Me(e, r) {
                            var f = 0,
                                A = 0,
                                i = 0,
                                a = 0;
                            return i = 0, (f = r >>> 20 & 2047) >>> 0 < 1023 || (i = 2, f >>> 0 > 1075 || (A = 31 & (f = 1075 - f | 0), (63 & f) >>> 0 >= 32 ? (f = 1 << A, A = 0) : (f = (a = 1 << A) - 1 & 1 >>> 32 - A, A = a), i = 0, e & (a = A - 1 | 0) | r & f - !A || (i = e & A | r & f ? 1 : 2))), i
                        }

                        function Fe(e) {
                            var r = 0,
                                f = 0,
                                A = 0;
                            if (n[t[e >> 2]] - 48 >>> 0 >= 10) return 0;
                            for (; A = t[e >> 2], f = -1, r >>> 0 <= 214748364 && (f = (0 | (f = n[0 | A] - 48 | 0)) > (2147483647 ^ (r = C(r, 10))) ? -1 : f + r | 0), t[e >> 2] = A + 1, r = f, n[A + 1 | 0] - 48 >>> 0 < 10;);
                            return r
                        }

                        function Re(e, r, f, A) {
                            var i, a, n, b, t = 0,
                                o = 0;
                            return b = C(t = f >>> 16 | 0, o = e >>> 16 | 0), t = (65535 & (o = ((n = C(i = 65535 & f, a = 65535 & e)) >>> 16 | 0) + C(o, i) | 0)) + C(t, a) | 0, E = (C(r, f) + b | 0) + C(e, A) + (o >>> 16) + (t >>> 16) | 0, 65535 & n | t << 16
                        }

                        function He(e, r, f) {
                            var A;
                            if (!(A = t[e + 16 >> 2])) return t[e + 36 >> 2] = 1, t[e + 24 >> 2] = f, void(t[e + 16 >> 2] = r);
                            e: {
                                if ((0 | r) == (0 | A)) {
                                    if (2 != t[e + 24 >> 2]) break e;
                                    return void(t[e + 24 >> 2] = f)
                                }
                                n[e + 54 | 0] = 1,
                                t[e + 24 >> 2] = 2,
                                t[e + 36 >> 2] = t[e + 36 >> 2] + 1
                            }
                        }

                        function Ne(e, r, f, A, i) {
                            var a;
                            if (G = a = G - 256 | 0, !(73728 & i | (0 | f) <= (0 | A))) {
                                if (ue(a, 255 & r, (f = (A = f - A | 0) >>> 0 < 256) ? A : 256), !f)
                                    for (; er(e, a, 256), (A = A - 256 | 0) >>> 0 > 255;);
                                er(e, a, A)
                            }
                            G = a + 256 | 0
                        }

                        function Ve(e) {
                            (0 | ((0 | Ye(e, 1, e = je(e), 10224)) != (0 | e) ? -1 : 0)) < 0 || (10 == t[2576] || (0 | (e = t[2561])) == t[2560] ? Se(10224, 10) : (t[2561] = e + 1, n[0 | e] = 10))
                        }

                        function Qe(e) {
                            var r = 0;
                            return r = t[e + 72 >> 2], t[e + 72 >> 2] = r - 1 | r, 8 & (r = t[e >> 2]) ? (t[e >> 2] = 32 | r, -1) : (t[e + 4 >> 2] = 0, t[e + 8 >> 2] = 0, r = t[e + 44 >> 2], t[e + 28 >> 2] = r, t[e + 20 >> 2] = r, t[e + 16 >> 2] = r + t[e + 48 >> 2], 0)
                        }

                        function xe(e, r, f, A, i, a, n, b, o) {
                            var k;
                            G = k = G - 16 | 0, N(k, r, f, A, i, a, n, b, -2147483648 ^ o), A = t[k >> 2], f = t[k + 4 >> 2], r = t[k + 12 >> 2], t[e + 8 >> 2] = t[k + 8 >> 2], t[e + 12 >> 2] = r, t[e >> 2] = A, t[e + 4 >> 2] = f, G = k + 16 | 0
                        }

                        function Oe(e, r) {
                            var f = 0,
                                A = 0;
                            e: if (!(!(f = v[0 | e]) | (0 | f) != (0 | (A = v[0 | r]))))
                                for (;;) {
                                    if (A = v[r + 1 | 0], !(f = v[e + 1 | 0])) break e;
                                    if (r = r + 1 | 0, e = e + 1 | 0, (0 | f) != (0 | A)) break
                                }
                            return f - A | 0
                        }

                        function Xe(e) {
                            var r, f;
                            e: {
                                if (!((e = (r = t[2592]) + (f = e + 7 & -8) | 0) >>> 0 <= r >>> 0 && f)) {
                                    if (e >>> 0 <= br() << 16 >>> 0) break e;
                                    if (0 | z(0 | e)) break e
                                }
                                return t[2726] = 48,
                                -1
                            }
                            return t[2592] = e, r
                        }

                        function Ye(e, r, f, A) {
                            var i;
                            return (0 | (i = C(r, f))) == (0 | (t[A + 76 >> 2], e = pe(e, i, A))) ? r ? f : 0 : (e >>> 0) / (r >>> 0) | 0
                        }

                        function Je(e) {
                            var r = 0;
                            e = e >>> 0 <= 1 ? 1 : e;
                            e: {
                                for (;;) {
                                    if (r = U(e)) break e;
                                    if (!(r = t[3158])) break;
                                    nr[0 | r]()
                                }
                                D(),
                                s()
                            }
                            return r
                        }

                        function Ke(e, r, f, A, i, a, n, b, o) {
                            t[e >> 2] = r, t[e + 4 >> 2] = f, t[e + 8 >> 2] = A, t[e + 12 >> 2] = 65535 & i | (o >>> 16 & 32768 | (2147418112 & i) >>> 16) << 16
                        }

                        function Le(e, r, f) {
                            return f ? (0 | e) == (0 | r) ? 1 : !Oe(t[e + 4 >> 2], t[r + 4 >> 2]) : t[e + 4 >> 2] == t[r + 4 >> 2]
                        }

                        function qe(e, r, f) {
                            var A;
                            G = A = G - 16 | 0, t[A + 12 >> 2] = f, Pe(e, r, f, 0), G = A + 16 | 0
                        }

                        function _e(e) {
                            var r;
                            return (-1 >>> (r = 31 & e) & -2) << r | (-1 << (e = 0 - e & 31) & -2) >>> e
                        }

                        function $e(e) {
                            return e ? 31 - m(e - 1 ^ e) | 0 : 32
                        }

                        function er(e, r, f) {
                            32 & v[0 | e] || pe(r, f, e)
                        }

                        function rr() {
                            return U(81) + 80 | 0
                        }

                        function fr(e) {
                            return 0 | (e |= 0)
                        }

                        function Ar(e) {
                            V(e |= 0)
                        }

                        function ir(e) {}
                        i(r = v, 1024, "TjdNaW5pc2F0MjBPdXRPZk1lbW9yeUV4Y2VwdGlvbkUAAAAAyCYAAAAEAAB8IENvbmZsaWN0cyB8ICAgICAgICAgIE9SSUdJTkFMICAgICAgICAgfCAgICAgICAgICBMRUFSTlQgICAgICAgICAgfCBQcm9ncmVzcyB8AHwgICAgICAgICAgIHwgICAgVmFycyAgQ2xhdXNlcyBMaXRlcmFscyB8ICAgIExpbWl0ICBDbGF1c2VzIExpdC9DbCB8ICAgICAgICAgIHwAUmFuZG9taXplIHRoZSBpbml0aWFsIGFjdGl2aXR5AGluZmluaXR5AGx1YnkAdmFyLWRlY2F5AGNsYS1kZWNheQBpbWF4AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAcmZpcnN0AHJuZC1pbml0AFRyZWF0IEF0TGVhc3QgMSBjYXJkaW5hbGl0eSBjb25zdHJhaW50cyBhcyByZWd1bGFyIGNsYXVzZXMAICAtJXMsIC1uby0lcwBUaGUgY2xhdXNlIGFjdGl2aXR5IGRlY2F5IGZhY3RvcgBUaGUgdmFyaWFibGUgYWN0aXZpdHkgZGVjYXkgZmFjdG9yAFJlc3RhcnQgaW50ZXJ2YWwgaW5jcmVhc2UgZmFjdG9yAHJuZC1mcmVxAFVzZWQgYnkgdGhlIHJhbmRvbSB2YXJpYWJsZSBzZWxlY3Rpb24AaW1pbgBuYW4AVGhlIGJhc2UgcmVzdGFydCBpbnRlcnZhbABwaGFzZS1zYXZpbmcAaW5mAG9mZgBkdC1jbGF1c2UAVGhlIGZyZXF1ZW5jeSB3aXRoIHdoaWNoIHRoZSBkZWNpc2lvbiBoZXVyaXN0aWMgdHJpZXMgdG8gY2hvb3NlIGEgcmFuZG9tIHZhcmlhYmxlAGNjbWluLW1vZGUAVXNlIHRoZSBMdWJ5IHJlc3RhcnQgc2VxdWVuY2UAVGhlIGZyYWN0aW9uIG9mIHdhc3RlZCBtZW1vcnkgYWxsb3dlZCBiZWZvcmUgYSBnYXJiYWdlIGNvbGxlY3Rpb24gaXMgdHJpZ2dlcmVkAHJuZC1zZWVkACU0ZAByaW5jAGdjLWZyYWMAICAtJS0xMnMgPSAlLThzIFsATkFOAElORgBDT1JFADxib29sPgA8ZG91YmxlPgA8aW50MzI+AD09PT09PT09PT09PT09PT09PT09PT09PT09PT1bIFNlYXJjaCBTdGF0aXN0aWNzIF09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0APT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQAuAENvbnRyb2xzIGNvbmZsaWN0IGNsYXVzZSBtaW5pbWl6YXRpb24gKDA9bm9uZSwgMT1iYXNpYywgMj1kZWVwKQAobnVsbCkAQ29udHJvbHMgdGhlIGxldmVsIG9mIHBoYXNlIHNhdmluZyAoMD1ub25lLCAxPWxpbWl0ZWQsIDI9ZnVsbCkAUHVyZSB2aXJ0dWFsIGZ1bmN0aW9uIGNhbGxlZCEAIC4uIAB8ICU5ZCB8ICU3ZCAlOGQgJThkIHwgJThkICU4ZCAlNi4wZiB8ICU2LjNmICUlIHwKAHwgIEdhcmJhZ2UgY29sbGVjdGlvbjogICAlMTJkIGJ5dGVzID0+ICUxMmQgYnl0ZXMgICAgICAgICAgICAgfAoACiAgICAgICAgJXMKAEVSUk9SISB2YWx1ZSA8JXM+IGlzIHRvbyBzbWFsbCBmb3Igb3B0aW9uICIlcyIuCgBFUlJPUiEgdmFsdWUgPCVzPiBpcyB0b28gbGFyZ2UgZm9yIG9wdGlvbiAiJXMiLgoAKGRlZmF1bHQ6ICVzKQoAICAtJS0xMnMgPSAlLThzICVjJTQuMmcgLi4gJTQuMmclYyAoZGVmYXVsdDogJWcpCgBdIChkZWZhdWx0OiAlZCkKAAAAAAAgCgAAAgAAAAMAAAAEAAAATjdNaW5pc2F0NlNvbHZlckUAAADIJgAADAoAAAAAAAB0CgAABQAAAAYAAAAHAAAACAAAAE43TWluaXNhdDEyRG91YmxlT3B0aW9uRQBON01pbmlzYXQ2T3B0aW9uRQAAyCYAAFkKAADwJgAAQAoAAGwKAAAAAAAAbAoAAAUAAAAJAAAACgAAAAoAAAAAAAAAyAoAAAUAAAALAAAADAAAAA0AAABON01pbmlzYXQ5SW50T3B0aW9uRQAAAADwJgAAsAoAAGwKAAAAAAAABAsAAAUAAAAOAAAADwAAABAAAABON01pbmlzYXQxMEJvb2xPcHRpb25FAADwJgAA7AoAAGwKAAD+gitlRxVnQAAAAAAAADhDAAD6/kIudr86O568mvcMvb39/////98/PFRVVVVVxT+RKxfPVVWlPxfQpGcREYE/AAAAAAAAyELvOfr+Qi7mPyTEgv+9v84/tfQM1whrrD/MUEbSq7KDP4Q6Tpvg11U/"), i(r, 2958, "8D9uv4gaTzubPDUz+6k99u8/XdzYnBNgcbxhgHc+muzvP9FmhxB6XpC8hX9u6BXj7z8T9mc1UtKMPHSFFdOw2e8/+o75I4DOi7ze9t0pa9DvP2HI5mFO92A8yJt1GEXH7z+Z0zNb5KOQPIPzxso+vu8/bXuDXaaalzwPiflsWLXvP/zv/ZIatY4890dyK5Ks7z/RnC9wPb4+PKLR0zLso+8/C26QiTQDarwb0/6vZpvvPw69LypSVpW8UVsS0AGT7z9V6k6M74BQvMwxbMC9iu8/FvTVuSPJkbzgLamumoLvP69VXOnj04A8UY6lyJh67z9Ik6XqFRuAvHtRfTy4cu8/PTLeVfAfj7zqjYw4+WrvP79TEz+MiYs8dctv61tj7z8m6xF2nNmWvNRcBITgW+8/YC86PvfsmjyquWgxh1TvP504hsuC54+8Hdn8IlBN7z+Nw6ZEQW+KPNaMYog7Ru8/fQTksAV6gDyW3H2RST/vP5SoqOP9jpY8OGJ1bno47z99SHTyGF6HPD+msk/OMe8/8ucfmCtHgDzdfOJlRSvvP14IcT97uJa8gWP14d8k7z8xqwlt4feCPOHeH/WdHu8/+r9vGpshPbyQ2drQfxjvP7QKDHKCN4s8CwPkpoUS7z+Py86JkhRuPFYvPqmvDO8/tquwTXVNgzwVtzEK/gbvP0x0rOIBQoY8MdhM/HAB7z9K+NNdOd2PPP8WZLII/O4/BFuOO4Cjhrzxn5JfxfbuP2hQS8ztSpK8y6k6N6fx7j+OLVEb+AeZvGbYBW2u7O4/0jaUPujRcbz3n+U02+fuPxUbzrMZGZm85agTwy3j7j9tTCqnSJ+FPCI0Ekym3u4/imkoemASk7wcgKwERdruP1uJF0iPp1i8Ki73IQrW7j8bmklnmyx8vJeoUNn10e4/EazCYO1jQzwtiWFgCM7uP+9kBjsJZpY8VwAd7UHK7j95A6Ha4cxuPNA8wbWixu4/MBIPP47/kzze09fwKsPuP7CvervOkHY8Jyo21dq/7j934FTrvR2TPA3d/ZmyvO4/jqNxADSUj7ynLJ12srnuP0mjk9zM3oe8QmbPotq27j9fOA+9xt54vIJPnVYrtO4/9lx77EYShrwPkl3KpLHuP47X/RgFNZM82ie1Nkev7j8Fm4ovt5h7PP3Hl9QSre4/CVQc4uFjkDwpVEjdB6vuP+rGGVCFxzQ8t0ZZiiap7j81wGQr5jKUPEghrRVvp+4/n3aZYUrkjLwJ3Ha54aXuP6hN7zvFM4y8hVU6sH6k7j+u6SuJeFOEvCDDzDRGo+4/WFhWeN3Ok7wlIlWCOKLuP2QZfoCqEFc8c6lM1FWh7j8oIl6/77OTvM07f2aeoO4/grk0h60Sary/2gt1EqDuP+6pbbjvZ2O8LxplPLKf7j9RiOBUPdyAvISUUfl9n+4/zz5afmQfeLx0X+zodZ/uP7B9i8BK7oa8dIGlSJqf7j+K5lUeMhmGvMlnQlbrn+4/09QJXsuckDw/Xd5PaaDuPx2lTbncMnu8hwHrcxSh7j9rwGdU/eyUPDLBMAHtoe4/VWzWq+HrZTxiTs8286LuP0LPsy/FoYi8Eho+VCek7j80NzvxtmmTvBPOTJmJpe4/Hv8ZOoRegLytxyNGGqfuP25XcthQ1JS87ZJEm9mo7j8Aig5bZ62QPJlmitnHqu4/tOrwwS+3jTzboCpC5azuP//nxZxgtmW8jES1FjKv7j9EX/NZg/Z7PDZ3FZmuse4/gz0epx8Jk7zG/5ELW7TuPykebIu4qV285cXNsDe37j9ZuZB8+SNsvA9SyMtEuu4/qvn0IkNDkrxQTt6fgr3uP0uOZtdsyoW8ugfKcPHA7j8nzpEr/K9xPJDwo4KRxO4/u3MK4TXSbTwjI+MZY8juP2MiYiIExYe8ZeVde2bM7j/VMeLjhhyLPDMtSuyb0O4/Fbu809G7kbxdJT6yA9XuP9Ix7pwxzJA8WLMwE57Z7j+zWnNuhGmEPL/9eVVr3u4/tJ2Ol83fgrx689O/a+PuP4czy5J3Gow8rdNamZ/o7j/62dFKj3uQvGa2jSkH7u4/uq7cVtnDVbz7FU+4ovPuP0D2pj0OpJC8OlnljXL57j80k6049NZovEde+/J2/+4/NYpYa+LukbxKBqEwsAXvP83dXwrX/3Q80sFLkB4M7z+smJL6+72RvAke11vCEu8/swyvMK5uczycUoXdmxnvP5T9n1wy4448etD/X6sg7z+sWQnRj+CEPEvRVy7xJ+8/ZxpOOK/NYzy15waUbS/vP2gZkmwsa2c8aZDv3CA37z/StcyDGIqAvPrDXVULP+8/b/r/P12tj7x8iQdKLUfvP0mpdTiuDZC88okNCIdP7z+nBz2mhaN0PIek+9wYWO8/DyJAIJ6RgryYg8kW42DvP6ySwdVQWo48hTLbA+Zp7z9LawGsWTqEPGC0AfMhc+8/Hz60ByHVgrxfm3szl3zvP8kNRzu5Kom8KaH1FEaG7z/TiDpgBLZ0PPY/i+cukO8/cXKdUezFgzyDTMf7UZrvP/CR048S94+82pCkoq+k7z99dCPimK6NvPFnji1Ir+8/CCCqQbzDjjwnWmHuG7rvPzLrqcOUK4Q8l7prNyvF7z/uhdExqWSKPEBFblt20O8/7eM75Lo3jrwUvpyt/dvvP53NkU07iXc82JCegcHn7z+JzGBBwQVTPPFxjyvC8+8/ADj6/kIu5j8wZ8eTV/MuPQAAAAAAAOC/YFVVVVVV5b8GAAAAAADgP05VWZmZmek/eqQpVVVV5b/pRUibW0nyv8M/JosrAPA/AAAAAACg9j8="), i(r, 5081, "yLnygizWv4BWNygktPo8AAAAAACA9j8="), i(r, 5113, "CFi/vdHVvyD34NgIpRy9AAAAAABg9j8="), i(r, 5145, "WEUXd3bVv21QttWkYiO9AAAAAABA9j8="), i(r, 5177, "+C2HrRrVv9VnsJ7khOa8AAAAAAAg9j8="), i(r, 5209, "eHeVX77Uv+A+KZNpGwS9AAAAAAAA9j8="), i(r, 5241, "YBzCi2HUv8yETEgv2BM9AAAAAADg9T8="), i(r, 5273, "qIaGMATUvzoLgu3zQtw8AAAAAADA9T8="), i(r, 5305, "SGlVTKbTv2CUUYbGsSA9AAAAAACg9T8="), i(r, 5337, "gJia3UfTv5KAxdRNWSU9AAAAAACA9T8="), i(r, 5369, "IOG64ujSv9grt5keeyY9AAAAAABg9T8="), i(r, 5401, "iN4TWonSvz+wz7YUyhU9AAAAAABg9T8="), i(r, 5433, "iN4TWonSvz+wz7YUyhU9AAAAAABA9T8="), i(r, 5465, "eM/7QSnSv3baUygkWha9AAAAAAAg9T8="), i(r, 5497, "mGnBmMjRvwRU52i8rx+9AAAAAAAA9T8="), i(r, 5529, "qKurXGfRv/CogjPGHx89AAAAAADg9D8="), i(r, 5561, "SK75iwXRv2ZaBf3EqCa9AAAAAADA9D8="), i(r, 5593, "kHPiJKPQvw4D9H7uawy9AAAAAACg9D8="), i(r, 5625, "0LSUJUDQv38t9J64NvC8AAAAAACg9D8="), i(r, 5657, "0LSUJUDQv38t9J64NvC8AAAAAACA9D8="), i(r, 5689, "QF5tGLnPv4c8masqVw09AAAAAABg9D8="), i(r, 5721, "YNzLrfDOvySvhpy3Jis9AAAAAABA9D8="), i(r, 5753, "8CpuByfOvxD/P1RPLxe9AAAAAAAg9D8="), i(r, 5785, "wE9rIVzNvxtoyruRuiE9AAAAAAAA9D8="), i(r, 5817, "oJrH94/MvzSEn2hPeSc9AAAAAAAA9D8="), i(r, 5849, "oJrH94/MvzSEn2hPeSc9AAAAAADg8z8="), i(r, 5881, "kC10hsLLv4+3izGwThk9AAAAAADA8z8="), i(r, 5913, "wIBOyfPKv2aQzT9jTro8AAAAAACg8z8="), i(r, 5945, "sOIfvCPKv+rBRtxkjCW9AAAAAACg8z8="), i(r, 5977, "sOIfvCPKv+rBRtxkjCW9AAAAAACA8z8="), i(r, 6009, "UPScWlLJv+PUwQTZ0Sq9AAAAAABg8z8="), i(r, 6041, "0CBloH/Ivwn623+/vSs9AAAAAABA8z8="), i(r, 6073, "4BACiavHv1hKU3KQ2ys9AAAAAABA8z8="), i(r, 6105, "4BACiavHv1hKU3KQ2ys9AAAAAAAg8z8="), i(r, 6137, "0BnnD9bGv2bisqNq5BC9AAAAAAAA8z8="), i(r, 6169, "kKdwMP/FvzlQEJ9Dnh69AAAAAAAA8z8="), i(r, 6201, "kKdwMP/FvzlQEJ9Dnh69AAAAAADg8j8="), i(r, 6233, "sKHj5SbFv49bB5CL3iC9AAAAAADA8j8="), i(r, 6265, "gMtsK03Evzx4NWHBDBc9AAAAAADA8j8="), i(r, 6297, "gMtsK03Evzx4NWHBDBc9AAAAAACg8j8="), i(r, 6329, "kB4g/HHDvzpUJ02GePE8AAAAAACA8j8="), i(r, 6361, "8B/4UpXCvwjEcRcwjSS9AAAAAABg8j8="), i(r, 6393, "YC/VKrfBv5ajERikgC69AAAAAABg8j8="), i(r, 6425, "YC/VKrfBv5ajERikgC69AAAAAABA8j8="), i(r, 6457, "kNB8ftfAv/Rb6IiWaQo9AAAAAABA8j8="), i(r, 6489, "kNB8ftfAv/Rb6IiWaQo9AAAAAAAg8j8="), i(r, 6521, "4Nsxkey/v/Izo1xUdSW9AAAAAAAA8j8="), i(r, 6554, "K24HJ76/PADwKiw0Kj0AAAAAAADyPw=="), i(r, 6586, "K24HJ76/PADwKiw0Kj0AAAAAAODxPw=="), i(r, 6617, "wFuPVF68vwa+X1hXDB29AAAAAADA8T8="), i(r, 6649, "4Eo6bZK6v8iqW+g1OSU9AAAAAADA8T8="), i(r, 6681, "4Eo6bZK6v8iqW+g1OSU9AAAAAACg8T8="), i(r, 6713, "oDHWRcO4v2hWL00pfBM9AAAAAACg8T8="), i(r, 6745, "oDHWRcO4v2hWL00pfBM9AAAAAACA8T8="), i(r, 6777, "YOWK0vC2v9pzM8k3lya9AAAAAABg8T8="), i(r, 6809, "IAY/Bxu1v1dexmFbAh89AAAAAABg8T8="), i(r, 6841, "IAY/Bxu1v1dexmFbAh89AAAAAABA8T8="), i(r, 6873, "4BuW10Gzv98T+czaXiw9AAAAAABA8T8="), i(r, 6905, "4BuW10Gzv98T+czaXiw9AAAAAAAg8T8="), i(r, 6937, "gKPuNmWxvwmjj3ZefBQ9AAAAAAAA8T8="), i(r, 6969, "gBHAMAqvv5GONoOeWS09AAAAAAAA8T8="), i(r, 7001, "gBHAMAqvv5GONoOeWS09AAAAAADg8D8="), i(r, 7033, "gBlx3UKrv0xw1uV6ghw9AAAAAADg8D8="), i(r, 7065, "gBlx3UKrv0xw1uV6ghw9AAAAAADA8D8="), i(r, 7097, "wDL2WHSnv+6h8jRG/Cy9AAAAAADA8D8="), i(r, 7129, "wDL2WHSnv+6h8jRG/Cy9AAAAAACg8D8="), i(r, 7161, "wP65h56jv6r+JvW3AvU8AAAAAACg8D8="), i(r, 7193, "wP65h56jv6r+JvW3AvU8AAAAAACA8D8="), i(r, 7226, "eA6bgp+/5Al+fCaAKb0AAAAAAIDwPw=="), i(r, 7258, "eA6bgp+/5Al+fCaAKb0AAAAAAGDwPw=="), i(r, 7289, "gNUHG7mXvzmm+pNUjSi9AAAAAABA8D8="), i(r, 7322, "/LCowI+/nKbT9nwe37wAAAAAAEDwPw=="), i(r, 7354, "/LCowI+/nKbT9nwe37wAAAAAACDwPw=="), i(r, 7386, "EGsq4H+/5EDaDT/iGb0AAAAAACDwPw=="), i(r, 7418, "EGsq4H+/5EDaDT/iGb0AAAAAAADwPw=="), i(r, 7470, "8D8="), i(r, 7501, "wO8/"), i(r, 7514, "iXUVEIA/6CudmWvHEL0AAAAAAIDvPw=="), i(r, 7545, "gJNYViCQP9L34gZb3CO9AAAAAABA7z8="), i(r, 7578, "ySglSZg/NAxaMrqgKr0AAAAAAADvPw=="), i(r, 7609, "QOeJXUGgP1PX8VzAEQE9AAAAAADA7j8="), i(r, 7642, "LtSuZqQ/KP29dXMWLL0AAAAAAIDuPw=="), i(r, 7673, "wJ8UqpSoP30mWtCVeRm9AAAAAABA7j8="), i(r, 7705, "wN3Nc8usPwco2EfyaBq9AAAAAAAg7j8="), i(r, 7737, "wAbAMequP3s7yU8+EQ69AAAAAADg7T8="), i(r, 7769, "YEbRO5exP5ueDVZdMiW9AAAAAACg7T8="), i(r, 7801, "4NGn9b2zP9dO26VeyCw9AAAAAABg7T8="), i(r, 7833, "oJdNWum1Px4dXTwGaSy9AAAAAABA7T8="), i(r, 7865, "wOoK0wC3PzLtnamNHuw8AAAAAAAA7T8="), i(r, 7897, "QFldXjO5P9pHvTpcESM9AAAAAADA7D8="), i(r, 7929, "YK2NyGq7P+Vo9yuAkBO9AAAAAACg7D8="), i(r, 7961, "QLwBWIi8P9OsWsbRRiY9AAAAAABg7D8="), i(r, 7993, "IAqDOce+P+BF5q9owC29AAAAAABA7D8="), i(r, 8025, "4Ns5kei/P/0KoU/WNCW9AAAAAAAA7D8="), i(r, 8057, "4CeCjhfBP/IHLc547yE9AAAAAADg6z8="), i(r, 8089, "8CN+K6rBPzSZOESOpyw9AAAAAACg6z8="), i(r, 8121, "gIYMYdHCP6G0gctsnQM9AAAAAACA6z8="), i(r, 8153, "kBWw/GXDP4lySyOoL8Y8AAAAAABA6z8="), i(r, 8185, "sDODPZHEP3i2/VR5gyU9AAAAAAAg6z8="), i(r, 8217, "sKHk5SfFP8d9aeXoMyY9AAAAAADg6j8="), i(r, 8249, "EIy+TlfGP3guPCyLzxk9AAAAAADA6j8="), i(r, 8281, "cHWLEvDGP+EhnOWNESW9AAAAAACg6j8="), i(r, 8313, "UESFjYnHPwVDkXAQZhy9AAAAAABg6j8="), i(r, 8346, "Oeuvvsg/0SzpqlQ9B70AAAAAAEDqPw=="), i(r, 8378, "99xaWsk/b/+gWCjyBz0AAAAAAADqPw=="), i(r, 8409, "4Io87ZPKP2khVlBDcii9AAAAAADg6T8="), i(r, 8441, "0FtX2DHLP6rhrE6NNQy9AAAAAADA6T8="), i(r, 8473, "4Ds4h9DLP7YSVFnESy29AAAAAACg6T8="), i(r, 8505, "EPDG+2/MP9IrlsVy7PG8AAAAAABg6T8="), i(r, 8537, "kNSwPbHNPzWwFfcq/yq9AAAAAABA6T8="), i(r, 8569, "EOf/DlPOPzD0QWAnEsI8AAAAAAAg6T8="), i(r, 8602, "3eSt9c4/EY67ZRUhyrwAAAAAAADpPw=="), i(r, 8633, "sLNsHJnPPzDfDMrsyxs9AAAAAADA6D8="), i(r, 8665, "WE1gOHHQP5FO7RbbnPg8AAAAAACg6D8="), i(r, 8697, "YGFnLcTQP+nqPBaLGCc9AAAAAACA6D8="), i(r, 8729, "6CeCjhfRPxzwpWMOISy9AAAAAABg6D8="), i(r, 8761, "+KzLXGvRP4EWpffNmis9AAAAAABA6D8="), i(r, 8793, "aFpjmb/RP7e9R1Htpiw9AAAAAAAg6D8="), i(r, 8825, "uA5tRRTSP+q6Rrrehwo9AAAAAADg5z8="), i(r, 8857, "kNx88L7SP/QEUEr6nCo9AAAAAADA5z8="), i(r, 8889, "YNPh8RTTP7g8IdN64ii9AAAAAACg5z8="), i(r, 8921, "EL52Z2vTP8h38bDNbhE9AAAAAACA5z8="), i(r, 8953, "MDN3UsLTP1y9BrZUOxg9AAAAAABg5z8="), i(r, 8985, "6NUjtBnUP53gkOw25Ag9AAAAAABA5z8="), i(r, 9017, "yHHCjXHUP3XWZwnOJy+9AAAAAAAg5z8="), i(r, 9049, "MBee4MnUP6TYChuJIC69AAAAAAAA5z8="), i(r, 9081, "oDgHriLVP1nHZIFwvi49AAAAAADg5j8="), i(r, 9113, "0MhT93vVP+9AXe7trR89AAAAAADA5j8="), i(r, 9145, "YFnfvdXVP9xlpAgqCwq9YCcAAAAAAADRdJ4AV529KoBwUg///z4nCgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUYAAAANQAAAHEAAABr////zvv//5K///8AAAAAAAAAABkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZ"), i(r, 9329, "DgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAO"), i(r, 9387, "DA=="), i(r, 9399, "EwAAAAATAAAAAAkMAAAAAAAMAAAM"), i(r, 9445, "EA=="), i(r, 9457, "DwAAAAQPAAAAAAkQAAAAAAAQAAAQ"), i(r, 9503, "Eg=="), i(r, 9515, "EQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoa"), i(r, 9570, "GgAAABoaGgAAAAAAAAk="), i(r, 9619, "FA=="), i(r, 9631, "FwAAAAAXAAAAAAkUAAAAAAAUAAAU"), i(r, 9677, "Fg=="), i(r, 9689, "FQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGTjEwX19jeHhhYml2MTE2X19zaGltX3R5cGVfaW5mb0UAAAAA8CYAAAAmAABUJwAATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAAAA8CYAADAmAAAkJgAATjEwX19jeHhhYml2MTE3X19wYmFzZV90eXBlX2luZm9FAAAA8CYAAGAmAAAkJgAATjEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mb0UA8CYAAJAmAACEJgAAAAAAAFQmAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAAAAAAA4JwAAFwAAAB8AAAAZAAAAGgAAABsAAAAgAAAAIQAAACIAAABOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UAAAAA8CYAABAnAABUJgAAU3Q5dHlwZV9pbmZvAAAAAMgmAABEJw=="), i(r, 10080, "BQ=="), i(r, 10092, "EQ=="), i(r, 10116, "EgAAABMAAABgKw=="), i(r, 10140, "Ag=="), i(r, 10156, "//////////8="), i(r, 10224, "BQ=="), i(r, 10236, "FA=="), i(r, 10260, "EgAAABUAAABoKwAAAAQ="), i(r, 10284, "AQ=="), i(r, 10300, "/////wo="), i(r, 10368, "YDEB");
                        var ar, nr = (ar = [null, function(e) {
                            e |= 0, (e = t[2722]) && (t[2723] = 0, V(e), t[2724] = 0, t[2722] = 0)
                        }, J, function(e) {
                            J(e |= 0), V(e)
                        }, function(e) {
                            var r, f, A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                d = 0,
                                y = 0,
                                h = 0,
                                m = 0,
                                p = 0,
                                D = 0,
                                T = 0;
                            if (G = r = G - 32 | 0, b = t[488 + (e |= 0) >> 2], i = t[e + 480 >> 2], t[r + 16 >> 2] = 0, t[r + 20 >> 2] = 0, t[r + 8 >> 2] = 0, t[r + 12 >> 2] = 0, Ge(f = r + 8 | 0, i - b | 0), n[r + 24 | 0] = 0, (0 | (A = t[e + 324 >> 2])) > 0)
                                for (;;) {
                                    if (o = t[e + 320 >> 2] + (k << 2) | 0, b = t[o >> 2], v[b + t[e + 308 >> 2] | 0]) {
                                        if (b = t[e + 296 >> 2] + C(b, 12) | 0, !((0 | (a = t[b + 4 >> 2])) <= 0)) {
                                            for (A = 0, i = 0; u = (c = t[b >> 2]) + (A << 3) | 0, 1 != (3 & t[t[t[e + 332 >> 2] >> 2] + (t[u >> 2] << 2) >> 2]) && (a = c + (i << 3) | 0, c = t[u + 4 >> 2], t[a >> 2] = t[u >> 2], t[a + 4 >> 2] = c, a = t[b + 4 >> 2], i = i + 1 | 0), (0 | a) > (0 | (A = A + 1 | 0)););
                                            (0 | (i = A - i | 0)) <= 0 || (t[b + 4 >> 2] = a - i)
                                        }
                                        n[t[e + 308 >> 2] + t[o >> 2] | 0] = 0, A = t[e + 324 >> 2]
                                    }
                                    if (!((0 | (k = k + 1 | 0)) < (0 | A))) break
                                }
                            t[e + 320 >> 2] && (t[e + 324 >> 2] = 0);
                            e: {
                                r: {
                                    if (t[e + 400 >> 2] > 0)
                                        for (;;) {
                                            for (b = 1, D = h << 1, A = 0;;) {
                                                if (y = 0, m = t[e + 296 >> 2] + C(A | D, 12) | 0, t[m + 4 >> 2] > 0)
                                                    for (;;) {
                                                        if (c = t[m >> 2] + (y << 3) | 0, a = t[e + 476 >> 2] + (t[c >> 2] << 2) | 0, 16 & (l = t[a >> 2])) t[c >> 2] = t[a + 4 >> 2];
                                                        else {
                                                            if (g = 36 & l, (A = k = t[f + 8 >> 2]) >>> 0 < (i = (u = t[f + 4 >> 2]) + (d = 1 + ((o = v[f + 16 | 0] | !!(0 | g)) + (l >>> 6 | 0) | 0) | 0) | 0) >>> 0) {
                                                                f: {
                                                                    for (;;) {
                                                                        if (A >>> 0 >= i >>> 0) break f;
                                                                        if (A = 2 + (((A >>> 1) + (A >>> 3) & -2) + A | 0) | 0, t[f + 8 >> 2] = A, !(A >>> 0 > k >>> 0)) break
                                                                    }
                                                                    break r
                                                                }
                                                                if (!(i = Y(t[f >> 2], A << 2)) & 48 == t[2726]) break r;t[f >> 2] = i,
                                                                i = d + (u = t[f + 4 >> 2]) | 0
                                                            }
                                                            if (t[f + 4 >> 2] = i, i >>> 0 < u >>> 0) break r;
                                                            if (A = 0, k = t[f >> 2] + (u << 2) | 0, i = g | !!(0 | o) << 3, t[k >> 2] = i | -64 & t[k >> 2], d = i | -64 & (g = t[a >> 2]), t[k >> 2] = d, P[a >> 2] > 63)
                                                                for (; t[4 + ((i = A << 2) + k | 0) >> 2] = t[4 + (i + a | 0) >> 2], (A = A + 1 | 0) >>> 0 < t[a >> 2] >>> 6 >>> 0;);
                                                            if (o)
                                                                if (o = g >>> 6 | 0, 4 & l) t[4 + (k + (o << 2) | 0) >> 2] = 0;
                                                                else if (32 & l) t[4 + (k + (o << 2) | 0) >> 2] = -1;
                                                            else {
                                                                if (i = 0, !(d >>> 0 < 64)) {
                                                                    if (d = 0, A = 0, o - 1 >>> 0 >= 3)
                                                                        for (T = 67108860 & o, p = 0; i = 1 << (t[(g = k + 4 | 0) + (12 | (l = A << 2)) >> 2] >>> 1) | 1 << (t[l + g >> 2] >>> 1) | i | 1 << (t[g + (4 | l) >> 2] >>> 1) | 1 << (t[g + (8 | l) >> 2] >>> 1), A = A + 4 | 0, (0 | T) != (0 | (p = p + 4 | 0)););
                                                                    if (l = 3 & o)
                                                                        for (; i = 1 << (t[4 + (k + (A << 2) | 0) >> 2] >>> 1) | i, A = A + 1 | 0, (0 | l) != (0 | (d = d + 1 | 0)););
                                                                }
                                                                t[4 + (k + (o << 2) | 0) >> 2] = i
                                                            }
                                                            if (t[c >> 2] = u, t[a + 4 >> 2] = u, i = t[a >> 2], t[a >> 2] = 16 | i, A = t[f >> 2] + (t[c >> 2] << 2) | 0, t[A >> 2] = -4 & t[A >> 2] | 3 & i, o = t[f >> 2] + (t[c >> 2] << 2) | 0, 4 & (i = t[o >> 2])) w[4 + (o + (i >>> 4 & 268435452) | 0) >> 2] = w[4 + (a + (t[a >> 2] >>> 4 & 268435452) | 0) >> 2];
                                                            else if (32 & i) t[4 + (o + (i >>> 4 & 268435452) | 0) >> 2] = t[4 + (a + (t[a >> 2] >>> 4 & 268435452) | 0) >> 2];
                                                            else if (8 & i) {
                                                                if (c = i >>> 6 | 0, a = 0, !(i >>> 0 < 64)) {
                                                                    if (u = 0, A = 0, c - 1 >>> 0 >= 3)
                                                                        for (g = 67108860 & c, k = 0; a = 1 << (t[(l = o + 4 | 0) + (12 | (i = A << 2)) >> 2] >>> 1) | 1 << (t[i + l >> 2] >>> 1) | a | 1 << (t[l + (4 | i) >> 2] >>> 1) | 1 << (t[l + (8 | i) >> 2] >>> 1), A = A + 4 | 0, (0 | g) != (0 | (k = k + 4 | 0)););
                                                                    if (i = 3 & c)
                                                                        for (; a = 1 << (t[4 + (o + (A << 2) | 0) >> 2] >>> 1) | a, A = A + 1 | 0, (0 | i) != (0 | (u = u + 1 | 0)););
                                                                }
                                                                t[4 + (o + (c << 2) | 0) >> 2] = a
                                                            }
                                                        }
                                                        if (!((0 | (y = y + 1 | 0)) < t[m + 4 >> 2])) break
                                                    }
                                                if (A = 1, i = b, b = 0, !i) break
                                            }
                                            if (!((0 | (h = h + 1 | 0)) < t[e + 400 >> 2])) break
                                        }
                                    if ((0 | (i = t[e + 376 >> 2])) > 0)
                                        for (b = e + 476 | 0, A = 0;;) {
                                            k = (u = t[e + 396 >> 2]) + (t[t[e + 372 >> 2] + (A << 2) >> 2] << 2 & -8) | 0;
                                            f: if (-1 != (0 | (a = t[k >> 2]))) {
                                                if (o = t[b >> 2] + (a << 2) | 0, !(16 & v[0 | o])) {
                                                    if (o = t[o + 4 >> 2], v[(c = o >> 1) + t[e + 336 >> 2] | 0] != (1 & o)) break f;
                                                    if (-1 == (0 | (u = t[u + (c << 3) >> 2])) | (0 | a) != (0 | u)) break f
                                                }
                                                K(b, k, f), i = t[e + 376 >> 2]
                                            }
                                            if (!((0 | i) > (0 | (A = A + 1 | 0)))) break
                                        }
                                    if (t[e + 252 >> 2] > 0)
                                        for (b = e + 476 | 0, A = 0; K(b, t[e + 248 >> 2] + (A << 2) | 0, f), (0 | (A = A + 1 | 0)) < t[e + 252 >> 2];);
                                    if (t[e + 240 >> 2] > 0)
                                        for (b = e + 476 | 0, A = 0; K(b, t[e + 236 >> 2] + (A << 2) | 0, f), (0 | (A = A + 1 | 0)) < t[e + 240 >> 2];);
                                    break e
                                }
                                B(0 | rr(), 1060, 0),
                                s()
                            }
                            t[e + 28 >> 2] >= 2 && (b = t[e + 480 >> 2], t[r + 4 >> 2] = t[r + 12 >> 2] << 2, t[r >> 2] = b << 2, G = b = G - 16 | 0, t[b + 12 >> 2] = r, Pe(10224, 2294, r, 0), G = b + 16 | 0), n[e + 492 | 0] = v[r + 24 | 0], (b = t[e + 476 >> 2]) && V(b), t[e + 476 >> 2] = t[r + 8 >> 2], t[e + 480 >> 2] = t[r + 12 >> 2], t[e + 484 >> 2] = t[r + 16 >> 2], t[e + 488 >> 2] = t[r + 20 >> 2], G = r + 32 | 0
                        }, fr, Ar, function(e, r) {
                            e |= 0;
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                b = 0,
                                c = 0,
                                g = 0,
                                w = 0,
                                h = 0,
                                B = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0,
                                M = 0,
                                R = 0,
                                H = 0,
                                V = 0,
                                Q = 0,
                                x = 0,
                                O = 0,
                                Y = 0,
                                J = 0,
                                K = 0,
                                L = 0,
                                q = 0,
                                _ = 0,
                                $ = 0,
                                fe = 0;
                            G = f = G - 32 | 0;
                            e: {
                                r: {
                                    f: if (45 == v[0 | (r |= 0)]) {
                                        if (w = r + 1 | 0, r = 0, h = t[e + 4 >> 2], i = v[0 | h])
                                            for (;;) {
                                                if (v[r + w | 0] != (0 | i)) break f;
                                                if (!(i = v[h + (r = r + 1 | 0) | 0])) break
                                            }
                                        if (61 == v[0 | (r = r + w | 0)]) {
                                            for (G = R = (G = fe = G - 16 | 0) - 160 | 0, L = r + 1 | 0, t[R + 60 >> 2] = L, t[R + 20 >> 2] = L, t[R + 24 >> 2] = -1, t[112 + (r = R + 16 | 0) >> 2] = 0, t[r + 116 >> 2] = 0, a = t[r + 44 >> 2] - t[r + 4 >> 2] | 0, t[r + 120 >> 2] = a, t[r + 124 >> 2] = a >> 31, t[r + 104 >> 2] = t[r + 8 >> 2], i = 0, G = S = G - 48 | 0, O = t[2308], Y = t[2305];
                                                (0 | (a = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = re(r) : (t[r + 4 >> 2] = a + 1, w = v[0 | a]), 32 == (0 | w) | w - 9 >>> 0 < 5;);
                                            a = 1;
                                            A: {
                                                i: switch (w - 43 | 0) {
                                                    case 0:
                                                    case 2:
                                                        break i;
                                                    default:
                                                        break A
                                                }
                                                a = 45 == (0 | w) ? -1 : 1,
                                                (0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = re(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])
                                            }
                                            A: {
                                                i: {
                                                    a: {
                                                        for (;;) {
                                                            if (n[i + 1259 | 0] == (32 | w)) {
                                                                if (i >>> 0 > 6 || ((0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = re(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])), 8 != (0 | (i = i + 1 | 0))) continue;
                                                                break a
                                                            }
                                                            break
                                                        }
                                                        if (3 != (0 | i)) {
                                                            if (h = 8 == (0 | i)) break a;
                                                            if (i >>> 0 < 4) break i;
                                                            if (h) break a
                                                        }
                                                        if ((0 | (b = t[r + 116 >> 2])) >= 0 | (0 | b) > 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), !(i >>> 0 < 4))
                                                            for (b = (0 | b) < 0; b || (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), (i = i - 1 | 0) >>> 0 > 3;);
                                                    }
                                                    b = 0,
                                                    G = T = G - 16 | 0,
                                                    l(y(y(0 | a) * y(1 / 0))),
                                                    (r = 2147483647 & (B = o(2))) - 8388608 >>> 0 <= 2130706431 ? (c = r, c <<= 25, a = 1065353216 + (r = r >>> 7 | 0) | 0) : (c = B << 25, a = B >>> 7 | 2147418112, r >>> 0 >= 2139095040 || (c = 0, a = 0, r && (Ce(T, a = r, 0, 0, 0, (r = m(r)) + 81 | 0), b = t[T >> 2], g = t[T + 4 >> 2], c = t[T + 8 >> 2], a = 65536 ^ t[T + 12 >> 2] | 16265 - r << 16))),
                                                    t[S >> 2] = b,
                                                    t[S + 4 >> 2] = g,
                                                    t[S + 8 >> 2] = c,
                                                    t[S + 12 >> 2] = -2147483648 & B | a,
                                                    G = T + 16 | 0,
                                                    b = t[S + 8 >> 2],
                                                    g = t[S + 12 >> 2],
                                                    c = t[S >> 2],
                                                    D = t[S + 4 >> 2];
                                                    break A
                                                }
                                                i: {
                                                    a: {
                                                        n: if (!i) {
                                                            for (i = 0;;) {
                                                                if (n[i + 1569 | 0] != (32 | w)) break n;
                                                                if (i >>> 0 > 1 || ((0 | (w = t[r + 4 >> 2])) == t[r + 104 >> 2] ? w = re(r) : (t[r + 4 >> 2] = w + 1, w = v[0 | w])), 3 == (0 | (i = i + 1 | 0))) break
                                                            }
                                                            break a
                                                        }switch (0 | i) {
                                                            case 0:
                                                                if (48 == (0 | w)) {
                                                                    if ((0 | (i = t[r + 4 >> 2])) == t[r + 104 >> 2] ? h = re(r) : (t[r + 4 >> 2] = i + 1, h = v[0 | i]), 88 == (-33 & h)) {
                                                                        w = a, G = i = G - 432 | 0, (0 | (c = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = re(r) : (t[r + 4 >> 2] = c + 1, a = v[0 | c]);
                                                                        n: {
                                                                            b: {
                                                                                for (;;) {
                                                                                    if (48 != (0 | a)) {
                                                                                        if (46 != (0 | a)) break n;
                                                                                        if ((0 | (c = t[r + 4 >> 2])) != t[r + 104 >> 2]) {
                                                                                            t[r + 4 >> 2] = c + 1, a = v[0 | c];
                                                                                            break b
                                                                                        }
                                                                                        break
                                                                                    }(0 | (c = t[r + 4 >> 2])) != t[r + 104 >> 2] ? (A = 1, t[r + 4 >> 2] = c + 1, a = v[0 | c]) : (A = 1, a = re(r))
                                                                                }
                                                                                a = re(r)
                                                                            }
                                                                            if (H = 1, 48 == (0 | a)) {
                                                                                for (; T = (c = T) - 1 | 0, M = M - !c | 0, (0 | (c = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = re(r) : (t[r + 4 >> 2] = c + 1, a = v[0 | c]), 48 == (0 | a););
                                                                                A = 1
                                                                            }
                                                                        }
                                                                        for (c = 0, D = 1073676288;;) {
                                                                            n: {
                                                                                h = a;b: {
                                                                                    if (!((q = a - 48 | 0) >>> 0 < 10)) {
                                                                                        if ((_ = 46 != (0 | a)) & (h = 32 | a) - 97 >>> 0 > 5) break n;
                                                                                        if (!_) {
                                                                                            if (H) break n;
                                                                                            H = 1, T = b, M = g;
                                                                                            break b
                                                                                        }
                                                                                    }
                                                                                    a = (0 | a) > 57 ? h - 87 | 0 : q,
                                                                                    (0 | g) <= 0 & b >>> 0 <= 7 | (0 | g) < 0 ? j = a + (j << 4) | 0 : !g & b >>> 0 <= 28 ? (We(i + 48 | 0, a), F(i + 32 | 0, W, U, c, D, 0, 0, 0, 1073414144), W = t[i + 32 >> 2], U = t[i + 36 >> 2], c = t[i + 40 >> 2], D = t[i + 44 >> 2], F(i + 16 | 0, t[i + 48 >> 2], t[i + 52 >> 2], t[i + 56 >> 2], t[i + 60 >> 2], W, U, c, D), N(i, t[i + 16 >> 2], t[i + 20 >> 2], t[i + 24 >> 2], t[i + 28 >> 2], B, z, Q, x), Q = t[i + 8 >> 2], x = t[i + 12 >> 2], B = t[i >> 2], z = t[i + 4 >> 2]) : K | !a || (F(i + 80 | 0, W, U, c, D, 0, 0, 0, 1073610752), N(i - -64 | 0, t[i + 80 >> 2], t[i + 84 >> 2], t[i + 88 >> 2], t[i + 92 >> 2], B, z, Q, x), Q = t[i + 72 >> 2], x = t[i + 76 >> 2], K = 1, B = t[i + 64 >> 2], z = t[i + 68 >> 2]),
                                                                                    g = (b = b + 1 | 0) ? g : g + 1 | 0,
                                                                                    A = 1
                                                                                }(0 | (a = t[r + 4 >> 2])) != t[r + 104 >> 2] ? (t[r + 4 >> 2] = a + 1, a = v[0 | a]) : a = re(r);
                                                                                continue
                                                                            }
                                                                            break
                                                                        }
                                                                        if (A) {
                                                                            if ((0 | g) <= 0 & b >>> 0 <= 7 | (0 | g) < 0)
                                                                                for (c = b, D = g; j <<= 4, 8 != (0 | (c = c + 1 | 0)) | (D = c ? D : D + 1 | 0););
                                                                            n: {
                                                                                b: {
                                                                                    t: {
                                                                                        if (80 == (-33 & a)) {
                                                                                            if (c = ee(r), D = a = E, c | -2147483648 != (0 | a)) break n;
                                                                                            if (a = (0 | (c = t[r + 116 >> 2])) > 0 ? 1 : (0 | c) >= 0) break t;
                                                                                            break b
                                                                                        }
                                                                                        if (c = 0, D = 0, t[r + 116 >> 2] < 0) break n
                                                                                    }
                                                                                    t[r + 4 >> 2] = t[r + 4 >> 2] - 1
                                                                                }
                                                                                c = 0,
                                                                                D = 0
                                                                            }
                                                                            if (j)
                                                                                if (a = c + ((r = H ? T : b) << 2) | 0, r = (g = (H ? M : g) << 2 | r >>> 30) + D | 0, r = c >>> 0 > a >>> 0 ? r + 1 | 0 : r, b = a - 32 | 0, c = 0 - O | 0, r = (0 | (r = g = r - (a >>> 0 < 32) | 0)) > 0 ? 1 : b >>> 0 > c >>> 0 & (0 | r) >= 0) t[2726] = 68, We(i + 160 | 0, w), F(i + 144 | 0, t[i + 160 >> 2], t[i + 164 >> 2], t[i + 168 >> 2], t[i + 172 >> 2], -1, -1, -1, 2147418111), F(i + 128 | 0, t[i + 144 >> 2], t[i + 148 >> 2], t[i + 152 >> 2], t[i + 156 >> 2], -1, -1, -1, 2147418111), B = t[i + 128 >> 2], z = t[i + 132 >> 2], b = t[i + 140 >> 2], r = t[i + 136 >> 2];
                                                                                else if ((0 | g) >= (0 | (c = (r = O - 226 | 0) >> 31)) & r >>> 0 <= b >>> 0 | (0 | c) < (0 | g)) {
                                                                                if ((0 | j) >= 0)
                                                                                    for (; N(i + 416 | 0, B, z, Q, x, 0, 0, 0, -1073807360), N(i + 400 | 0, B, z, Q, x, (r = c = (0 | (r = he(B, z, Q, x, 1073610752))) >= 0) ? t[i + 416 >> 2] : B, r ? t[i + 420 >> 2] : z, r ? t[i + 424 >> 2] : Q, r ? t[i + 428 >> 2] : x), b = (r = b) - 1 | 0, g = g - !r | 0, Q = t[i + 408 >> 2], x = t[i + 412 >> 2], B = t[i + 400 >> 2], z = t[i + 404 >> 2], (0 | (j = c | j << 1)) >= 0;);
                                                                                r = g - ((O >> 31) + (b >>> 0 < O >>> 0) | 0) | 0, (0 | (c = (c = 32 + (b - O | 0) | 0) >>> 0 < Y >>> 0 & (0 | (r = c >>> 0 < 32 ? r + 1 | 0 : r)) <= 0 | (0 | r) < 0 ? (0 | c) > 0 ? c : 0 : Y)) >= 113 ? (We(i + 384 | 0, w), T = t[i + 392 >> 2], M = t[i + 396 >> 2], W = t[i + 384 >> 2], U = t[i + 388 >> 2], g = 0, r = 0) : (we(i + 352 | 0, ze(144 - c | 0)), We(i + 336 | 0, w), W = t[i + 336 >> 2], U = t[i + 340 >> 2], T = t[i + 344 >> 2], M = t[i + 348 >> 2], Ke(i + 368 | 0, t[i + 352 >> 2], t[i + 356 >> 2], t[i + 360 >> 2], t[i + 364 >> 2], 0, 0, 0, M), I = t[i + 376 >> 2], V = t[i + 380 >> 2], g = t[i + 372 >> 2], r = t[i + 368 >> 2]), Ee(i + 320 | 0, (a = !(1 & j) & !!(0 | ge(B, z, Q, x, 0, 0, 0, 0)) & (0 | c) < 32) | j), F(i + 304 | 0, W, U, T, M, t[i + 320 >> 2], t[i + 324 >> 2], t[i + 328 >> 2], t[i + 332 >> 2]), c = r, N(i + 272 | 0, t[i + 304 >> 2], t[i + 308 >> 2], t[i + 312 >> 2], t[i + 316 >> 2], r, g, I, V), F(i + 288 | 0, W, U, T, M, (r = a) ? 0 : B, r ? 0 : z, r ? 0 : Q, r ? 0 : x), N(i + 256 | 0, t[i + 288 >> 2], t[i + 292 >> 2], t[i + 296 >> 2], t[i + 300 >> 2], t[i + 272 >> 2], t[i + 276 >> 2], t[i + 280 >> 2], t[i + 284 >> 2]), xe(i + 240 | 0, t[i + 256 >> 2], t[i + 260 >> 2], t[i + 264 >> 2], t[i + 268 >> 2], c, g, I, V), ge(r = t[i + 240 >> 2], a = t[i + 244 >> 2], c = t[i + 248 >> 2], B = t[i + 252 >> 2], 0, 0, 0, 0) || (t[2726] = 68), ke(i + 224 | 0, r, a, c, B, b), B = t[i + 224 >> 2], z = t[i + 228 >> 2], b = t[i + 236 >> 2], r = t[i + 232 >> 2]
                                                                            } else t[2726] = 68, We(i + 208 | 0, w), F(i + 192 | 0, t[i + 208 >> 2], t[i + 212 >> 2], t[i + 216 >> 2], t[i + 220 >> 2], 0, 0, 0, 65536), F(i + 176 | 0, t[i + 192 >> 2], t[i + 196 >> 2], t[i + 200 >> 2], t[i + 204 >> 2], 0, 0, 0, 65536), B = t[i + 176 >> 2], z = t[i + 180 >> 2], b = t[i + 188 >> 2], r = t[i + 184 >> 2];
                                                                            else we(i + 112 | 0, 0 * +(0 | w)), B = t[i + 112 >> 2], z = t[i + 116 >> 2], b = t[i + 124 >> 2], r = t[i + 120 >> 2]
                                                                        } else(a = (0 | (b = t[r + 116 >> 2])) > 0 ? 1 : (0 | b) >= 0) && (b = t[r + 4 >> 2], t[r + 4 >> 2] = b - 1, t[r + 4 >> 2] = b - 2, H && (t[r + 4 >> 2] = b - 3)), we(i + 96 | 0, 0 * +(0 | w)), B = t[i + 96 >> 2], z = t[i + 100 >> 2], b = t[i + 108 >> 2], r = t[i + 104 >> 2];
                                                                        t[S + 16 >> 2] = B, t[S + 20 >> 2] = z, t[S + 24 >> 2] = r, t[S + 28 >> 2] = b, G = i + 432 | 0, b = t[S + 24 >> 2], g = t[S + 28 >> 2], c = t[S + 16 >> 2], D = t[S + 20 >> 2];
                                                                        break A
                                                                    }
                                                                    t[r + 116 >> 2] < 0 || (t[r + 4 >> 2] = t[r + 4 >> 2] - 1)
                                                                }
                                                                h = r, H = a, i = 0, G = A = G - 8976 | 0, q = (_ = 0 - O | 0) - Y | 0;
                                                                n: {
                                                                    b: {
                                                                        for (;;) {
                                                                            if (48 != (0 | w)) {
                                                                                if (46 != (0 | w)) break n;
                                                                                if ((0 | (r = t[h + 4 >> 2])) != t[h + 104 >> 2]) {
                                                                                    t[h + 4 >> 2] = r + 1, w = v[0 | r];
                                                                                    break b
                                                                                }
                                                                                break
                                                                            }(0 | (r = t[h + 4 >> 2])) != t[h + 104 >> 2] ? (t[h + 4 >> 2] = r + 1, w = v[0 | r]) : w = re(h), i = 1
                                                                        }
                                                                        w = re(h)
                                                                    }
                                                                    if (K = 1, 48 == (0 | w)) {
                                                                        for (; b = (r = b) - 1 | 0, g = g - !r | 0, (0 | (r = t[h + 4 >> 2])) == t[h + 104 >> 2] ? w = re(h) : (t[h + 4 >> 2] = r + 1, w = v[0 | r]), 48 == (0 | w););
                                                                        i = 1
                                                                    }
                                                                }
                                                                t[A + 784 >> 2] = 0;
                                                                n: {
                                                                    b: {
                                                                        t: {
                                                                            o: {
                                                                                if ((r = 46 == (0 | w)) | (a = w - 48 | 0) >>> 0 <= 9)
                                                                                    for (;;) {
                                                                                        k: {
                                                                                            if (1 & r) {
                                                                                                if (!K) {
                                                                                                    b = c, g = D, K = 1;
                                                                                                    break k
                                                                                                }
                                                                                                r = !i;
                                                                                                break o
                                                                                            }
                                                                                            D = (c = c + 1 | 0) ? D : D + 1 | 0,
                                                                                            (0 | j) <= 2044 ? (V = 48 == (0 | w) ? V : c, r = (A + 784 | 0) + (j << 2) | 0, I && (a = (C(t[r >> 2], 10) + w | 0) - 48 | 0), t[r >> 2] = a, i = 1, I = (r = 9 == (0 | (a = I + 1 | 0))) ? 0 : a, j = r + j | 0) : 48 != (0 | w) && (t[A + 8960 >> 2] = 1 | t[A + 8960 >> 2], V = 18396)
                                                                                        }
                                                                                        if ((0 | (r = t[h + 4 >> 2])) == t[h + 104 >> 2] ? w = re(h) : (t[h + 4 >> 2] = r + 1, w = v[0 | r]), !((r = 46 == (0 | w)) | (a = w - 48 | 0) >>> 0 < 10)) break
                                                                                    }
                                                                                if (b = K ? b : c, g = K ? g : D, !(!i | 69 != (-33 & w))) {
                                                                                    B = ee(h), z = r = E, B | -2147483648 != (0 | r) || (B = 0, z = 0, t[h + 116 >> 2] < 0 || (t[h + 4 >> 2] = t[h + 4 >> 2] - 1)), g = g + z | 0, g = (b = b + B | 0) >>> 0 < B >>> 0 ? g + 1 | 0 : g;
                                                                                    break b
                                                                                }
                                                                                if (r = !i, (0 | w) < 0) break t
                                                                            }
                                                                            t[h + 116 >> 2] < 0 || (t[h + 4 >> 2] = t[h + 4 >> 2] - 1)
                                                                        }
                                                                        if (r) {
                                                                            t[2726] = 28, t[h + 112 >> 2] = 0, t[h + 116 >> 2] = 0, r = t[h + 44 >> 2] - t[h + 4 >> 2] | 0, t[h + 120 >> 2] = r, t[h + 124 >> 2] = r >> 31, t[h + 104 >> 2] = t[h + 8 >> 2], b = 0, g = 0, c = 0, r = 0;
                                                                            break n
                                                                        }
                                                                    }
                                                                    if (r = t[A + 784 >> 2])
                                                                        if (c >>> 0 > 9 & (0 | D) >= 0 | (0 | D) > 0 | (0 | b) != (0 | c) | (0 | g) != (0 | D) | (r >>> Y | 0 ? (0 | Y) <= 30 : 0))
                                                                            if ((r = _ >>> 1 | 0) >>> 0 < b >>> 0 & (0 | g) >= 0 | (0 | g) > 0) t[2726] = 68, We(A + 96 | 0, H), F(A + 80 | 0, t[A + 96 >> 2], t[A + 100 >> 2], t[A + 104 >> 2], t[A + 108 >> 2], -1, -1, -1, 2147418111), F(A - -64 | 0, t[A + 80 >> 2], t[A + 84 >> 2], t[A + 88 >> 2], t[A + 92 >> 2], -1, -1, -1, 2147418111), b = t[A + 72 >> 2], g = t[A + 76 >> 2], c = t[A + 68 >> 2], r = t[A + 64 >> 2];
                                                                            else if ((a = b >>> 0 < (r = O - 226 | 0) >>> 0) & (0 | g) <= (0 | (r >>= 31)) | (0 | r) > (0 | g)) t[2726] = 68,
                                                                    We(A + 144 | 0, H),
                                                                    F(A + 128 | 0, t[A + 144 >> 2], t[A + 148 >> 2], t[A + 152 >> 2], t[A + 156 >> 2], 0, 0, 0, 65536),
                                                                    F(A + 112 | 0, t[A + 128 >> 2], t[A + 132 >> 2], t[A + 136 >> 2], t[A + 140 >> 2], 0, 0, 0, 65536),
                                                                    b = t[A + 120 >> 2],
                                                                    g = t[A + 124 >> 2],
                                                                    c = t[A + 116 >> 2],
                                                                    r = t[A + 112 >> 2];
                                                                    else {
                                                                        if (I) {
                                                                            if ((0 | I) <= 8) {
                                                                                for (h = t[(r = (A + 784 | 0) + (j << 2) | 0) >> 2]; h = C(h, 10), 9 != (0 | (I = I + 1 | 0)););
                                                                                t[r >> 2] = h
                                                                            }
                                                                            j = j + 1 | 0
                                                                        }
                                                                        if (I = b, !((0 | b) < (0 | V) | (0 | V) >= 9 | (0 | b) > 17)) {
                                                                            if (9 == (0 | b)) {
                                                                                We(A + 192 | 0, H), Ee(A + 176 | 0, t[A + 784 >> 2]), F(A + 160 | 0, t[A + 192 >> 2], t[A + 196 >> 2], t[A + 200 >> 2], t[A + 204 >> 2], t[A + 176 >> 2], t[A + 180 >> 2], t[A + 184 >> 2], t[A + 188 >> 2]), b = t[A + 168 >> 2], g = t[A + 172 >> 2], c = t[A + 164 >> 2], r = t[A + 160 >> 2];
                                                                                break n
                                                                            }
                                                                            if ((0 | I) <= 8) {
                                                                                We(A + 272 | 0, H), Ee(A + 256 | 0, t[A + 784 >> 2]), F(A + 240 | 0, t[A + 272 >> 2], t[A + 276 >> 2], t[A + 280 >> 2], t[A + 284 >> 2], t[A + 256 >> 2], t[A + 260 >> 2], t[A + 264 >> 2], t[A + 268 >> 2]), We(A + 224 | 0, t[9216 + (0 - I << 2) >> 2]), Z(A + 208 | 0, t[A + 240 >> 2], t[A + 244 >> 2], t[A + 248 >> 2], t[A + 252 >> 2], t[A + 224 >> 2], t[A + 228 >> 2], t[A + 232 >> 2], t[A + 236 >> 2]), b = t[A + 216 >> 2], g = t[A + 220 >> 2], c = t[A + 212 >> 2], r = t[A + 208 >> 2];
                                                                                break n
                                                                            }
                                                                            if (r = 27 + (C(I, -3) + Y | 0) | 0, !((b = t[A + 784 >> 2]) >>> r | 0 && (0 | r) <= 30)) {
                                                                                We(A + 352 | 0, H), Ee(A + 336 | 0, b), F(A + 320 | 0, t[A + 352 >> 2], t[A + 356 >> 2], t[A + 360 >> 2], t[A + 364 >> 2], t[A + 336 >> 2], t[A + 340 >> 2], t[A + 344 >> 2], t[A + 348 >> 2]), We(A + 304 | 0, t[9144 + (I << 2) >> 2]), F(A + 288 | 0, t[A + 320 >> 2], t[A + 324 >> 2], t[A + 328 >> 2], t[A + 332 >> 2], t[A + 304 >> 2], t[A + 308 >> 2], t[A + 312 >> 2], t[A + 316 >> 2]), b = t[A + 296 >> 2], g = t[A + 300 >> 2], c = t[A + 292 >> 2], r = t[A + 288 >> 2];
                                                                                break n
                                                                            }
                                                                        }
                                                                        for (; !t[(A + 784 | 0) + ((j = (r = j) - 1 | 0) << 2) >> 2];);
                                                                        if (V = 0, b = (0 | I) % 9 | 0) {
                                                                            if (a = 0, b = (0 | I) < 0 ? b + 9 | 0 : b, r) {
                                                                                for (g = 1e9 / (0 | (c = t[9216 + (0 - b << 2) >> 2])) | 0, w = 0, h = 0; B = (z = w) + (j = ((i = t[(w = (D = A + 784 | 0) + (h << 2) | 0) >> 2]) >>> 0) / (c >>> 0) | 0) | 0, t[w >> 2] = B, a = (B = !B & (0 | a) == (0 | h)) ? a + 1 & 2047 : a, I = B ? I - 9 | 0 : I, w = C(g, i - C(c, j) | 0), (0 | (h = h + 1 | 0)) != (0 | r););
                                                                                w && (t[D + (r << 2) >> 2] = w, r = r + 1 | 0)
                                                                            } else r = 0;
                                                                            I = 9 + (I - b | 0) | 0
                                                                        } else a = 0;
                                                                        for (;;) {
                                                                            w = (A + 784 | 0) + (a << 2) | 0, h = (0 | I) < 36;
                                                                            b: {
                                                                                for (;;) {
                                                                                    if (!h & (36 != (0 | I) | P[w >> 2] >= 10384593)) break b;
                                                                                    for (j = r + 2047 | 0, i = 0; c = r, g = (r = t[(j = (A + 784 | 0) + ((B = 2047 & j) << 2) | 0) >> 2]) << 29, r = D = r >>> 3 | 0, !(g = (b = g + i | 0) >>> 0 < g >>> 0 ? r + 1 | 0 : r) & b >>> 0 < 1000000001 ? i = 0 : b = (r = b) - Re(i = te(r, g, 1e9), E, 1e9, 0) | 0, t[j >> 2] = b, r = (0 | a) == (0 | B) || b ? c : B, r = (0 | (b = c - 1 & 2047)) != (0 | B) ? c : r, j = B - 1 | 0, (0 | a) != (0 | B););
                                                                                    if (V = V - 29 | 0, r = c, i) break
                                                                                }(0 | (a = a - 1 & 2047)) == (0 | r) && (t[(c = (c = (r + 2046 & 2047) << 2) + (r = A + 784 | 0) | 0) >> 2] = t[c >> 2] | t[r + (b << 2) >> 2], r = b),
                                                                                I = I + 9 | 0,
                                                                                t[(A + 784 | 0) + (a << 2) >> 2] = i;
                                                                                continue
                                                                            }
                                                                            break
                                                                        }
                                                                        b: {
                                                                            t: for (;;) {
                                                                                for (b = r + 1 & 2047, B = (A + 784 | 0) + ((r - 1 & 2047) << 2) | 0;;) {
                                                                                    c = (0 | I) > 45 ? 9 : 1;
                                                                                    o: {
                                                                                        for (;;) {
                                                                                            i = a, h = 0;
                                                                                            k: {
                                                                                                for (;;) {
                                                                                                    if ((0 | (a = i + h & 2047)) != (0 | r) && !((a = t[(A + 784 | 0) + (a << 2) >> 2]) >>> 0 < (g = t[9168 + (h << 2) >> 2]) >>> 0)) {
                                                                                                        if (a >>> 0 > g >>> 0) break k;
                                                                                                        if (4 != (0 | (h = h + 1 | 0))) continue
                                                                                                    }
                                                                                                    break
                                                                                                }
                                                                                                if (36 == (0 | I)) {
                                                                                                    for (b = 0, g = 0, h = 0, c = 0, D = 0;
                                                                                                        (0 | (a = i + h & 2047)) == (0 | r) && (t[780 + (((r = r + 1 & 2047) << 2) + A | 0) >> 2] = 0), Ee(A + 768 | 0, t[(A + 784 | 0) + (a << 2) >> 2]), F(A + 752 | 0, b, g, c, D, 0, 0, 1342177280, 1075633366), N(A + 736 | 0, t[A + 752 >> 2], t[A + 756 >> 2], t[A + 760 >> 2], t[A + 764 >> 2], t[A + 768 >> 2], t[A + 772 >> 2], t[A + 776 >> 2], t[A + 780 >> 2]), c = t[A + 744 >> 2], D = t[A + 748 >> 2], b = t[A + 736 >> 2], g = t[A + 740 >> 2], 4 != (0 | (h = h + 1 | 0)););
                                                                                                    if (We(A + 720 | 0, H), F(A + 704 | 0, b, g, c, D, t[A + 720 >> 2], t[A + 724 >> 2], t[A + 728 >> 2], t[A + 732 >> 2]), c = t[A + 712 >> 2], D = t[A + 716 >> 2], b = 0, g = 0, B = t[A + 704 >> 2], z = t[A + 708 >> 2], (0 | (a = (h = (0 | (w = (j = V + 113 | 0) - O | 0)) < (0 | Y)) ? (0 | w) > 0 ? w : 0 : Y)) <= 112) break o;
                                                                                                    break b
                                                                                                }
                                                                                            }
                                                                                            if (V = c + V | 0, a = r, (0 | i) != (0 | r)) break
                                                                                        }
                                                                                        for (D = 1e9 >>> c | 0, w = ~(-1 << c), h = 0, a = i; g = (g = h) + ((z = t[(h = (j = A + 784 | 0) + (i << 2) | 0) >> 2]) >>> c | 0) | 0, t[h >> 2] = g, a = (g = !g & (0 | i) == (0 | a)) ? a + 1 & 2047 : a, I = g ? I - 9 | 0 : I, h = C(D, w & z), (0 | (i = i + 1 & 2047)) != (0 | r););
                                                                                        if (!h) continue;
                                                                                        if ((0 | b) != (0 | a)) {
                                                                                            t[j + (r << 2) >> 2] = h, r = b;
                                                                                            continue t
                                                                                        }
                                                                                        t[B >> 2] = 1 | t[B >> 2];
                                                                                        continue
                                                                                    }
                                                                                    break
                                                                                }
                                                                                break
                                                                            }
                                                                            we(A + 656 | 0, ze(225 - a | 0)),
                                                                            Ke(A + 688 | 0, t[A + 656 >> 2], t[A + 660 >> 2], t[A + 664 >> 2], t[A + 668 >> 2], 0, 0, 0, D),
                                                                            Q = t[A + 696 >> 2],
                                                                            x = t[A + 700 >> 2],
                                                                            W = t[A + 688 >> 2],
                                                                            U = t[A + 692 >> 2],
                                                                            we(A + 640 | 0, ze(113 - a | 0)),
                                                                            X(A + 672 | 0, B, z, c, D, t[A + 640 >> 2], t[A + 644 >> 2], t[A + 648 >> 2], t[A + 652 >> 2]),
                                                                            xe(A + 624 | 0, B, z, c, D, b = t[A + 672 >> 2], g = t[A + 676 >> 2], T = t[A + 680 >> 2], M = t[A + 684 >> 2]),
                                                                            N(A + 608 | 0, W, U, Q, x, t[A + 624 >> 2], t[A + 628 >> 2], t[A + 632 >> 2], t[A + 636 >> 2]),
                                                                            c = t[A + 616 >> 2],
                                                                            D = t[A + 620 >> 2],
                                                                            B = t[A + 608 >> 2],
                                                                            z = t[A + 612 >> 2]
                                                                        }
                                                                        if ((0 | (I = i + 4 & 2047)) != (0 | r)) {
                                                                            b: if ((I = t[(A + 784 | 0) + (I << 2) >> 2]) >>> 0 <= 499999999) {
                                                                                if (!I & (i + 5 & 2047) == (0 | r)) break b;
                                                                                we(A + 496 | 0, .25 * +(0 | H)), N(A + 480 | 0, b, g, T, M, t[A + 496 >> 2], t[A + 500 >> 2], t[A + 504 >> 2], t[A + 508 >> 2]), T = t[A + 488 >> 2], M = t[A + 492 >> 2], b = t[A + 480 >> 2], g = t[A + 484 >> 2]
                                                                            } else 5e8 == (0 | I) ? (J = +(0 | H), (i + 5 & 2047) != (0 | r) ? (we(A + 560 | 0, .75 * J), N(A + 544 | 0, b, g, T, M, t[A + 560 >> 2], t[A + 564 >> 2], t[A + 568 >> 2], t[A + 572 >> 2]), T = t[A + 552 >> 2], M = t[A + 556 >> 2], b = t[A + 544 >> 2], g = t[A + 548 >> 2]) : (we(A + 528 | 0, .5 * J), N(A + 512 | 0, b, g, T, M, t[A + 528 >> 2], t[A + 532 >> 2], t[A + 536 >> 2], t[A + 540 >> 2]), T = t[A + 520 >> 2], M = t[A + 524 >> 2], b = t[A + 512 >> 2], g = t[A + 516 >> 2])) : (we(A + 592 | 0, .75 * +(0 | H)), N(A + 576 | 0, b, g, T, M, t[A + 592 >> 2], t[A + 596 >> 2], t[A + 600 >> 2], t[A + 604 >> 2]), T = t[A + 584 >> 2], M = t[A + 588 >> 2], b = t[A + 576 >> 2], g = t[A + 580 >> 2]);
                                                                            (0 | a) > 111 || (X(A + 464 | 0, b, g, T, M, 0, 0, 0, 1073676288), ge(t[A + 464 >> 2], t[A + 468 >> 2], t[A + 472 >> 2], t[A + 476 >> 2], 0, 0, 0, 0) || (N(A + 448 | 0, b, g, T, M, 0, 0, 0, 1073676288), T = t[A + 456 >> 2], M = t[A + 460 >> 2], b = t[A + 448 >> 2], g = t[A + 452 >> 2]))
                                                                        }
                                                                        N(A + 432 | 0, B, z, c, D, b, g, T, M), xe(A + 416 | 0, t[A + 432 >> 2], t[A + 436 >> 2], t[A + 440 >> 2], t[A + 444 >> 2], W, U, Q, x), c = t[A + 424 >> 2], D = t[A + 428 >> 2], B = t[A + 416 >> 2], z = t[A + 420 >> 2], (q - 2 | 0) >= (2147483647 & j) || (t[A + 408 >> 2] = c, t[A + 412 >> 2] = 2147483647 & D, t[A + 400 >> 2] = B, t[A + 404 >> 2] = z, F(A + 384 | 0, B, z, c, D, 0, 0, 0, 1073610752), c = (r = (0 | (W = he(t[A + 400 >> 2], t[A + 404 >> 2], t[A + 408 >> 2], t[A + 412 >> 2], 1081081856))) >= 0) ? t[A + 392 >> 2] : c, D = r ? t[A + 396 >> 2] : D, B = r ? t[A + 384 >> 2] : B, z = r ? t[A + 388 >> 2] : z, b = ge(b, g, T, M, 0, 0, 0, 0), (110 + (V = r + V | 0) | 0) <= (0 | q) && !(h & ((0 | a) != (0 | w) | (0 | W) < 0) & !!(0 | b)) || (t[2726] = 68)), ke(A + 368 | 0, B, z, c, D, V), b = t[A + 376 >> 2], g = t[A + 380 >> 2], c = t[A + 372 >> 2], r = t[A + 368 >> 2]
                                                                    } else We(A + 48 | 0, H),
                                                                    Ee(A + 32 | 0, r),
                                                                    F(A + 16 | 0, t[A + 48 >> 2], t[A + 52 >> 2], t[A + 56 >> 2], t[A + 60 >> 2], t[A + 32 >> 2], t[A + 36 >> 2], t[A + 40 >> 2], t[A + 44 >> 2]),
                                                                    b = t[A + 24 >> 2],
                                                                    g = t[A + 28 >> 2],
                                                                    c = t[A + 20 >> 2],
                                                                    r = t[A + 16 >> 2];
                                                                    else we(A, 0 * +(0 | H)),
                                                                    b = t[A + 8 >> 2],
                                                                    g = t[A + 12 >> 2],
                                                                    c = t[A + 4 >> 2],
                                                                    r = t[A >> 2]
                                                                }
                                                                t[S + 40 >> 2] = b, t[S + 44 >> 2] = g, t[S + 32 >> 2] = r, t[S + 36 >> 2] = c, G = A + 8976 | 0, b = t[S + 40 >> 2], g = t[S + 44 >> 2], c = t[S + 32 >> 2], D = t[S + 36 >> 2];
                                                                break A;
                                                            case 3:
                                                                break a
                                                        }(a = (0 | (a = t[r + 116 >> 2])) > 0 ? 1 : (0 | a) >= 0) && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1),
                                                        t[2726] = 28;
                                                        break i
                                                    }
                                                    if ((0 | (b = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = re(r) : (t[r + 4 >> 2] = b + 1, a = v[0 | b]), 40 != (0 | a)) {
                                                        if (b = 0, g = 2147450880, t[r + 116 >> 2] < 0) break A;
                                                        t[r + 4 >> 2] = t[r + 4 >> 2] - 1;
                                                        break A
                                                    }
                                                    for (i = 1;
                                                        (0 | (b = t[r + 4 >> 2])) == t[r + 104 >> 2] ? a = re(r) : (t[r + 4 >> 2] = b + 1, a = v[0 | b]), a - 48 >>> 0 < 10 | a - 65 >>> 0 < 26 | 95 == (0 | a) || !(a - 97 >>> 0 >= 26);) i = i + 1 | 0;
                                                    if (b = 0, g = 2147450880, 41 == (0 | a)) break A;
                                                    if ((0 | (a = t[r + 116 >> 2])) >= 0 | (0 | a) > 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), !i) break A;
                                                    for (;
                                                        (0 | a) > 0 | (0 | a) >= 0 && (t[r + 4 >> 2] = t[r + 4 >> 2] - 1), i = i - 1 | 0;);
                                                    break A
                                                }
                                                t[r + 112 >> 2] = 0,
                                                t[r + 116 >> 2] = 0,
                                                a = t[r + 44 >> 2] - t[r + 4 >> 2] | 0,
                                                t[r + 120 >> 2] = a,
                                                t[r + 124 >> 2] = a >> 31,
                                                t[r + 104 >> 2] = t[r + 8 >> 2]
                                            }
                                            t[R >> 2] = c, t[R + 4 >> 2] = D, t[R + 8 >> 2] = b, t[R + 12 >> 2] = g, G = S + 48 | 0, b = t[R + 8 >> 2], a = t[R + 12 >> 2], c = t[R >> 2], B = t[R + 4 >> 2], f + 28 | 0 && (t[f + 28 >> 2] = t[R + 136 >> 2] + ((t[R + 20 >> 2] - t[R + 60 >> 2] | 0) + L | 0)), t[(r = fe) + 8 >> 2] = b, t[r + 12 >> 2] = a, t[r >> 2] = c, t[r + 4 >> 2] = B, G = R + 160 | 0, c = t[r >> 2], b = t[r + 4 >> 2], T = t[r + 8 >> 2], a = r = t[r + 12 >> 2], G = w = G - 32 | 0, B = 2147483647 & r, r = T;
                                            A: if (0 | (g = B - 1140785152 | 0) >>> 0 > (T = B - 1006698496 | 0) >>> 0) {
                                                if (W = r << 4 | b >>> 28, r = a << 4 | r >>> 28, 134217728 == (0 | (b &= 268435455)) & !!(0 | c) | b >>> 0 > 134217728) {
                                                    r = r + 1073741824 | 0, U = (W = W + 1 | 0) ? r : r + 1 | 0;
                                                    break A
                                                }
                                                if (U = r + 1073741824 | 0, c | 134217728 != (0 | b)) break A;
                                                g = U, U = (r = 1 & W) >>> 0 > (W = r + W | 0) >>> 0 ? g + 1 | 0 : g
                                            } else(!r & 2147418112 == (0 | B) ? !(b | c) : B >>> 0 < 2147418112) ? (W = 0, U = 2146435072, B >>> 0 > 1140785151 || (U = 0, (B = B >>> 16 | 0) >>> 0 < 15249 || (Ce(w + 16 | 0, c, b, r, T = 65535 & a | 65536, B - 15233 | 0), de(w, c, b, r, T, 15361 - B | 0), W = (r = t[w + 8 >> 2]) << 4 | (B = t[w + 4 >> 2]) >>> 28, U = t[w + 12 >> 2] << 4 | r >>> 28, 134217728 == (0 | (r = 268435455 & B)) & !!(0 | (b = t[w >> 2] | !!(t[w + 16 >> 2] | t[w + 24 >> 2] | t[w + 20 >> 2] | t[w + 28 >> 2]))) | r >>> 0 > 134217728 ? (D = U, U = (W = W + 1 | 0) ? D : D + 1 | 0) : b | 134217728 != (0 | r) || (g = U, U = (r = W) >>> 0 > (W = W + (1 & W) | 0) >>> 0 ? g + 1 | 0 : g)))) : (W = r << 4 | b >>> 28, U = 524287 & (D = a << 4 | r >>> 28) | 2146959360);
                                            if (G = w + 32 | 0, G = fe + 16 | 0, r = t[f + 28 >> 2]) {
                                                if (k(0, 0 | W), k(1, -2147483648 & a | U), (J = +u()) >= ($ = d[e + 32 >> 3]) & (!v[e + 41 | 0] | J != $)) break r;
                                                if (($ = d[e + 24 >> 3]) >= J & (!v[e + 40 | 0] | J != $)) break e;
                                                d[e + 48 >> 3] = J
                                            }
                                            a = !!(0 | r)
                                        }
                                    }return G = f + 32 | 0,
                                    0 | a
                                }
                                t[f + 20 >> 2] = t[e + 4 >> 2],
                                t[f + 16 >> 2] = L,
                                qe(t[2290], 2421, f + 16 | 0),
                                p(1),
                                s()
                            }
                            t[f + 4 >> 2] = t[e + 4 >> 2], t[f >> 2] = L, qe(t[2290], 2372, f), p(1), s()
                        }, function(e, r) {
                            r |= 0;
                            var f, A, i, a, n = 0,
                                b = 0,
                                o = 0;
                            G = f = G + -64 | 0, n = v[40 + (e |= 0) | 0], b = v[e + 41 | 0], A = d[e + 32 >> 3], o = t[e + 4 >> 2], i = t[e + 16 >> 2], a = d[e + 24 >> 3], d[f + 56 >> 3] = d[e + 48 >> 3], d[f + 40 >> 3] = A, d[f + 32 >> 3] = a, t[f + 48 >> 2] = b ? 93 : 41, t[f + 20 >> 2] = i, t[f + 16 >> 2] = o, t[f + 24 >> 2] = n ? 91 : 40, n = t[2290], G = b = G - 16 | 0, o = f + 16 | 0, t[b + 12 >> 2] = o, Pe(n, 2485, o, 22), G = b + 16 | 0, r && (t[f >> 2] = t[e + 8 >> 2], qe(n, 2359, f), Be(10, n)), G = f - -64 | 0
                        }, function(e) {
                            s()
                        }, function() {
                            D(), s()
                        }, Ar, function(e, r) {
                            e |= 0;
                            var f, A = 0,
                                i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0,
                                u = 0,
                                c = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0;
                            G = f = G - 32 | 0;
                            e: {
                                r: {
                                    f: if (45 == v[0 | (r |= 0)]) {
                                        if (a = r + 1 | 0, r = 0, n = t[e + 4 >> 2], A = v[0 | n])
                                            for (;;) {
                                                if (v[r + a | 0] != (0 | A)) break f;
                                                if (!(A = v[n + (r = r + 1 | 0) | 0])) break
                                            }
                                        if (61 == v[0 | (r = r + a | 0)]) {
                                            l = f + 28 | 0, o = -2147483648, G = k = G - 16 | 0;
                                            A: if (i = v[0 | (n = r + 1 | 0)]) {
                                                A = n;
                                                i: {
                                                    for (;;) {
                                                        if (!(32 == (0 | (r = i << 24 >> 24)) | r - 9 >>> 0 < 5)) break i;
                                                        if (i = v[A + 1 | 0], A = A + 1 | 0, !i) break
                                                    }
                                                    break A
                                                }
                                                i: switch ((r = v[0 | A]) - 43 | 0) {
                                                    case 0:
                                                    case 2:
                                                        break i;
                                                    default:
                                                        break A
                                                }
                                                c = 45 == (0 | r) ? -1 : 0, A = A + 1 | 0
                                            } else A = n;
                                            for (r = 0;;) {
                                                A: {
                                                    if (!((255 & (i = (a = v[0 | A]) - 48 | 0)) >>> 0 < 10))
                                                        if ((a - 97 & 255) >>> 0 <= 25) i = a - 87 | 0;
                                                        else {
                                                            if ((a - 65 & 255) >>> 0 > 25) break A;
                                                            i = a - 55 | 0
                                                        } if (!((i &= 255) >>> 0 >= 10)) {
                                                        me(k, 10, 0, 0, 0, b, u, 0, 0), a = 1, t[k + 8 >> 2] | t[k + 12 >> 2] || (g = Re(b, u, 10, 0), -1 == (0 | (P = E)) & ~i >>> 0 < g >>> 0 || (a = P, u = (b = i + g | 0) >>> 0 < i >>> 0 ? a + 1 | 0 : a, w = 1, a = r)), A = A + 1 | 0, r = a;
                                                        continue
                                                    }
                                                }
                                                break
                                            }
                                            l && (t[l >> 2] = w ? A : n);
                                            A: {
                                                i: {
                                                    if (r) t[2726] = 68,
                                                    b = -2147483648,
                                                    u = 0;
                                                    else if (!u & b >>> 0 < 2147483648) break i;
                                                    if (!c) {
                                                        t[2726] = 68, o = 2147483647;
                                                        break A
                                                    }
                                                    if (!(!u & b >>> 0 <= 2147483648)) {
                                                        t[2726] = 68;
                                                        break A
                                                    }
                                                }
                                                o = (b ^ c) - c | 0
                                            }
                                            if (G = k + 16 | 0, r = t[f + 28 >> 2]) {
                                                if ((0 | o) > t[e + 24 >> 2]) break r;
                                                if ((0 | o) < t[e + 20 >> 2]) break e;
                                                t[e + 28 >> 2] = o
                                            }
                                            i = !!(0 | r)
                                        }
                                    }return G = f + 32 | 0,
                                    0 | i
                                }
                                t[f + 4 >> 2] = t[e + 4 >> 2],
                                t[f >> 2] = n,
                                qe(t[2290], 2421, f),
                                p(1),
                                s()
                            }
                            t[f + 20 >> 2] = t[e + 4 >> 2], t[f + 16 >> 2] = n, qe(t[2290], 2372, f + 16 | 0), p(1), s()
                        }, function(e, r) {
                            r |= 0;
                            var f, A = 0,
                                i = 0;
                            G = f = G - 80 | 0, A = t[4 + (e |= 0) >> 2], t[f + 68 >> 2] = t[e + 16 >> 2], t[f + 64 >> 2] = A, qe(A = t[2290], 1858, f - -64 | 0), -2147483648 != (0 | (i = t[e + 20 >> 2])) ? (t[f + 48 >> 2] = i, qe(A, 1841, f + 48 | 0)) : Ye(1564, 4, 1, A), Ye(2239, 4, 1, A), 2147483647 != (0 | (i = t[e + 24 >> 2])) ? (t[f + 32 >> 2] = i, qe(A, 1841, f + 32 | 0)) : Ye(1293, 4, 1, A), t[f + 16 >> 2] = t[e + 28 >> 2], qe(A, 2535, f + 16 | 0), r && (t[f >> 2] = t[e + 8 >> 2], qe(A, 2359, f), Be(10, A)), G = f + 80 | 0
                        }, Ar, function(e, r) {
                            e |= 0;
                            var f = 0,
                                A = 0,
                                i = 0;
                            return 45 == v[0 | (r |= 0)] && (f = 1, A = r + 1 | 0, 110 != v[r + 1 | 0] | 111 != v[r + 2 | 0] || (A = (f = 45 != v[r + 3 | 0]) ? A : r + 4 | 0), Oe(A, t[e + 4 >> 2]) || (n[e + 20 | 0] = f, i = 1)), 0 | i
                        }, function(e, r) {
                            r |= 0;
                            var f, A = 0,
                                i = 0;
                            if (G = f = G - 48 | 0, A = t[4 + (e |= 0) >> 2], t[f + 36 >> 2] = A, t[f + 32 >> 2] = A, qe(A = t[2290], 1402, f + 32 | 0), 16 != (2147483647 & je(t[e + 4 >> 2])))
                                for (; Be(32, A), (i = i + 1 | 0) >>> 0 < 32 - (je(t[e + 4 >> 2]) << 1) >>> 0;);
                            Be(32, A), t[f + 16 >> 2] = v[e + 20 | 0] ? 1561 : 1616, qe(A, 2470, f + 16 | 0), r && (t[f >> 2] = t[e + 8 >> 2], qe(A, 2359, f), Be(10, A)), G = f + 48 | 0
                        }, function(e) {
                            return 0 | j(t[60 + (e |= 0) >> 2])
                        }, function(e, r, f) {
                            r |= 0, f |= 0;
                            var A, i = 0,
                                a = 0,
                                n = 0,
                                b = 0,
                                o = 0,
                                k = 0;
                            G = A = G - 32 | 0, i = t[28 + (e |= 0) >> 2], t[A + 16 >> 2] = i, n = t[e + 20 >> 2], t[A + 28 >> 2] = f, t[A + 24 >> 2] = r, r = n - i | 0, t[A + 20 >> 2] = r, n = r + f | 0, o = 2;
                            e: {
                                r: {
                                    r = A + 16 | 0,
                                    (i = 0 | T(t[e + 60 >> 2], 0 | r, 2, A + 12 | 0)) ? (t[2726] = i, i = -1) : i = 0;f: {
                                        if (i) i = r;
                                        else
                                            for (;;) {
                                                if ((0 | (a = t[A + 12 >> 2])) == (0 | n)) break f;
                                                if ((0 | a) < 0) {
                                                    i = r;
                                                    break r
                                                }
                                                if (b = a - ((k = (b = t[r + 4 >> 2]) >>> 0 < a >>> 0) ? b : 0) | 0, t[(i = (k << 3) + r | 0) >> 2] = b + t[i >> 2], t[(r = (k ? 12 : 4) + r | 0) >> 2] = t[r >> 2] - b, n = n - a | 0, r = i, o = o - k | 0, (a = 0 | T(t[e + 60 >> 2], 0 | r, 0 | o, A + 12 | 0)) ? (t[2726] = a, a = -1) : a = 0, a) break
                                            }
                                        if (-1 != (0 | n)) break r
                                    }
                                    r = t[e + 44 >> 2],
                                    t[e + 28 >> 2] = r,
                                    t[e + 20 >> 2] = r,
                                    t[e + 16 >> 2] = r + t[e + 48 >> 2],
                                    e = f;
                                    break e
                                }
                                t[e + 28 >> 2] = 0,
                                t[e + 16 >> 2] = 0,
                                t[e + 20 >> 2] = 0,
                                t[e >> 2] = 32 | t[e >> 2],
                                e = 0,
                                2 != (0 | o) && (e = f - t[i + 4 >> 2] | 0)
                            }
                            return G = A + 32 | 0, 0 | e
                        }, function(e, r, f, A) {
                            var i;
                            return r |= 0, f |= 0, A |= 0, G = i = G - 16 | 0, (e = 0 | I(t[60 + (e |= 0) >> 2], 0 | r, 0 | f, 255 & A, i + 8 | 0)) ? (t[2726] = e, e = -1) : e = 0, G = i + 16 | 0, E = e ? -1 : t[i + 12 >> 2], 0 | (e ? -1 : t[i + 8 >> 2])
                        }, function(e) {
                            return 0
                        }, function(e, r, f, A) {
                            return E = 0, 0
                        }, function(e, r, f, A, i, a) {
                            e |= 0, r = +r, f |= 0, A |= 0, i |= 0, a |= 0;
                            var b, k = 0,
                                u = 0,
                                s = 0,
                                l = 0,
                                g = 0,
                                P = 0,
                                w = 0,
                                d = 0,
                                y = 0,
                                m = 0,
                                B = 0,
                                p = 0,
                                D = 0,
                                T = 0,
                                I = 0,
                                z = 0,
                                j = 0,
                                W = 0,
                                S = 0,
                                U = 0;
                            G = b = G - 560 | 0, t[b + 44 >> 2] = 0, c(+r), k = 0 | o(1), o(0), (0 | k) < 0 ? (D = 1, z = 1308, c(+(r = -r)), k = 0 | o(1), o(0)) : 2048 & i ? (D = 1, z = 1311) : (z = (D = 1 & i) ? 1314 : 1309, W = !D);
                            e: if (2146435072 & ~k) {
                                T = b + 16 | 0;
                                r: {
                                    f: {
                                        A: {
                                            if (r = Ze(r, b + 44 | 0), 0 != (r += r)) {
                                                if (k = t[b + 44 >> 2], t[b + 44 >> 2] = k - 1, 97 != (0 | (I = 32 | a))) break A;
                                                break r
                                            }
                                            if (97 == (0 | (I = 32 | a))) break r;g = t[b + 44 >> 2],
                                            P = (0 | A) < 0 ? 6 : A;
                                            break f
                                        }
                                        g = k - 29 | 0,
                                        t[b + 44 >> 2] = g,
                                        r *= 268435456,
                                        P = (0 | A) < 0 ? 6 : A
                                    }
                                    for (u = y = (b + 48 | 0) + ((0 | g) >= 0 ? 288 : 0) | 0; A = r < 4294967296 & r >= 0 ? ~~r >>> 0 : 0, t[u >> 2] = A, u = u + 4 | 0, 0 != (r = 1e9 * (r - +(A >>> 0))););
                                    if ((0 | g) <= 0) A = g,
                                    k = u,
                                    s = y;
                                    else
                                        for (s = y, A = g;;) {
                                            if (l = (0 | A) >= 29 ? 29 : A, !(s >>> 0 > (k = u - 4 | 0) >>> 0)) {
                                                for (d = 0; A = t[k >> 2], w = 31 & l, j = d, (63 & l) >>> 0 >= 32 ? (d = A << w, A = 0) : (d = (1 << w) - 1 & A >>> 32 - w, A <<= w), d = d + m | 0, S = k, U = (w = j + A | 0) - Re(d = te(w, A >>> 0 > w >>> 0 ? d + 1 | 0 : d, 1e9), E, 1e9, 0) | 0, t[S >> 2] = U, s >>> 0 <= (k = k - 4 | 0) >>> 0;);
                                                d && (t[(s = s - 4 | 0) >> 2] = d)
                                            }
                                            for (; s >>> 0 < (k = u) >>> 0 && !t[(u = k - 4 | 0) >> 2];);
                                            if (A = t[b + 44 >> 2] - l | 0, t[b + 44 >> 2] = A, u = k, !((0 | A) > 0)) break
                                        }
                                    if ((0 | A) < 0)
                                        for (p = 1 + ((P + 25 >>> 0) / 9 | 0) | 0, m = 102 == (0 | I);;) {
                                            if (w = (0 | (A = 0 - A | 0)) >= 9 ? 9 : A, k >>> 0 <= s >>> 0) u = t[s >> 2];
                                            else {
                                                for (d = 1e9 >>> w | 0, l = ~(-1 << w), A = 0, u = s; j = A, A = t[u >> 2], t[u >> 2] = j + (A >>> w | 0), A = C(d, A & l), (u = u + 4 | 0) >>> 0 < k >>> 0;);
                                                u = t[s >> 2], A && (t[k >> 2] = A, k = k + 4 | 0)
                                            }
                                            if (A = w + t[b + 44 >> 2] | 0, t[b + 44 >> 2] = A, s = (!u << 2) + s | 0, k = k - (u = m ? y : s) >> 2 > (0 | p) ? u + (p << 2) | 0 : k, !((0 | A) < 0)) break
                                        }
                                    if (A = 0, !(k >>> 0 <= s >>> 0 || (A = C(y - s >> 2, 9), u = 10, (l = t[s >> 2]) >>> 0 < 10)))
                                        for (; A = A + 1 | 0, l >>> 0 >= (u = C(u, 10)) >>> 0;);
                                    if ((0 | (u = (P - (102 != (0 | I) ? A : 0) | 0) - (103 == (0 | I) & !!(0 | P)) | 0)) < (C(k - y >> 2, 9) - 9 | 0)) {
                                        if (g = (p = ((b + 48 | 0) + ((0 | g) < 0 ? 4 : 292) | 0) + ((l = (0 | (d = u + 9216 | 0)) / 9 | 0) << 2) | 0) - 4096 | 0, u = 10, (0 | (w = d - C(l, 9) | 0)) <= 7)
                                            for (; u = C(u, 10), 8 != (0 | (w = w + 1 | 0)););
                                        if (!(!(w = (m = t[g >> 2]) - C(u, d = (m >>> 0) / (u >>> 0) | 0) | 0) & (0 | (l = p - 4092 | 0)) == (0 | k)) && (!(1 & d) && (r = 9007199254740992, !(1 & n[p - 4100 | 0]) | 1e9 != (0 | u) | s >>> 0 >= g >>> 0) || (r = 9007199254740994), B = (0 | k) == (0 | l) ? 1 : 1.5, B = (l = u >>> 1 | 0) >>> 0 > w >>> 0 ? .5 : (0 | l) == (0 | w) ? B : 1.5, 45 != v[0 | z] | W || (B = -B, r = -r), l = m - w | 0, t[g >> 2] = l, r + B != r)) {
                                            if (A = u + l | 0, t[g >> 2] = A, A >>> 0 >= 1e9)
                                                for (; t[g >> 2] = 0, (g = g - 4 | 0) >>> 0 < s >>> 0 && (t[(s = s - 4 | 0) >> 2] = 0), A = t[g >> 2] + 1 | 0, t[g >> 2] = A, A >>> 0 > 999999999;);
                                            if (A = C(y - s >> 2, 9), u = 10, !((l = t[s >> 2]) >>> 0 < 10))
                                                for (; A = A + 1 | 0, l >>> 0 >= (u = C(u, 10)) >>> 0;);
                                        }
                                        k = k >>> 0 > (u = g + 4 | 0) >>> 0 ? u : k
                                    }
                                    for (; l = k, !(d = k >>> 0 <= s >>> 0) && !t[(k = k - 4 | 0) >> 2];);
                                    if (103 == (0 | I)) {
                                        if (P = ((k = (0 | (u = P || 1)) > (0 | A) & (0 | A) > -5) ? ~A : -1) + u | 0, a = (k ? -1 : -2) + a | 0, !(g = 8 & i)) {
                                            if (k = -9, !d && (g = t[l - 4 >> 2]) && (w = 10, k = 0, !((g >>> 0) % 10 | 0))) {
                                                for (; u = k, k = k + 1 | 0, !((g >>> 0) % ((w = C(w, 10)) >>> 0) | 0););
                                                k = ~u
                                            }
                                            u = C(l - y >> 2, 9), 70 != (-33 & a) ? (g = 0, P = (0 | (k = (0 | (k = ((A + u | 0) + k | 0) - 9 | 0)) > 0 ? k : 0)) > (0 | P) ? P : k) : (g = 0, P = (0 | (k = (0 | (k = (k + u | 0) - 9 | 0)) > 0 ? k : 0)) > (0 | P) ? P : k)
                                        }
                                    } else g = 8 & i;
                                    if (w = -1, (0 | ((d = g | P) ? 2147483645 : 2147483646)) < (0 | P)) break e;
                                    if (m = 1 + (!!(0 | d) + P | 0) | 0, 70 != (0 | (u = -33 & a))) {
                                        if ((T - (k = Ue(((k = A >> 31) ^ A) - k | 0, 0, T)) | 0) <= 1)
                                            for (; n[0 | (k = k - 1 | 0)] = 48, (T - k | 0) < 2;);
                                        if (n[0 | (p = k - 2 | 0)] = a, n[k - 1 | 0] = (0 | A) < 0 ? 45 : 43, (0 | (k = T - p | 0)) > (2147483647 ^ m)) break e
                                    } else {
                                        if ((2147483647 ^ m) < (0 | A)) break e;
                                        k = (0 | A) > 0 ? A : 0
                                    }
                                    if ((0 | (A = k + m | 0)) > (2147483647 ^ D)) break e;Ne(e, 32, f, m = A + D | 0, i),
                                    er(e, z, D),
                                    Ne(e, 48, f, m, 65536 ^ i);f: {
                                        A: {
                                            i: {
                                                if (70 == (0 | u)) {
                                                    for (A = 8 | (a = b + 16 | 0), g = 9 | a, s = u = s >>> 0 > y >>> 0 ? y : s;;) {
                                                        k = Ue(t[s >> 2], 0, g);
                                                        a: if ((0 | u) == (0 | s))(0 | k) == (0 | g) && (n[b + 24 | 0] = 48, k = A);
                                                            else {
                                                                if (b + 16 >>> 0 >= k >>> 0) break a;
                                                                for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                            }
                                                        if (er(e, k, g - k | 0), !(y >>> 0 >= (s = s + 4 | 0) >>> 0)) break
                                                    }
                                                    if (d && er(e, 2073, 1), (0 | P) <= 0 | s >>> 0 >= l >>> 0) break i;
                                                    for (;;) {
                                                        if ((k = Ue(t[s >> 2], 0, g)) >>> 0 > b + 16 >>> 0)
                                                            for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                        if (er(e, k, (0 | P) >= 9 ? 9 : P), k = P - 9 | 0, l >>> 0 <= (s = s + 4 | 0) >>> 0) break A;
                                                        if (A = (0 | P) > 9, P = k, !A) break
                                                    }
                                                    break A
                                                }
                                                a: if (!((0 | P) < 0))
                                                    for (y = s >>> 0 < l >>> 0 ? l : s + 4 | 0, A = 8 | (a = b + 16 | 0), l = 9 | a, u = s;;) {
                                                        (0 | l) == (0 | (k = Ue(t[u >> 2], 0, l))) && (n[b + 24 | 0] = 48, k = A);
                                                        n: if ((0 | u) == (0 | s)) er(e, k, 1), k = k + 1 | 0, g | P && er(e, 2073, 1);
                                                            else {
                                                                if (b + 16 >>> 0 >= k >>> 0) break n;
                                                                for (; n[0 | (k = k - 1 | 0)] = 48, b + 16 >>> 0 < k >>> 0;);
                                                            }
                                                        if (er(e, k, (0 | (a = l - k | 0)) < (0 | P) ? a : P), P = P - a | 0, y >>> 0 <= (u = u + 4 | 0) >>> 0) break a;
                                                        if (!((0 | P) >= 0)) break
                                                    }
                                                Ne(e, 48, P + 18 | 0, 18, 0),
                                                er(e, p, T - p | 0);
                                                break f
                                            }
                                            k = P
                                        }
                                        Ne(e, 48, k + 9 | 0, 9, 0)
                                    }
                                    Ne(e, 32, f, m, 8192 ^ i),
                                    w = (0 | f) < (0 | m) ? m : f;
                                    break e
                                }
                                if (g = (a << 26 >> 31 & 9) + z | 0, !(A >>> 0 > 11)) {
                                    for (k = 12 - A | 0, B = 16; B *= 16, k = k - 1 | 0;);
                                    r = 45 != v[0 | g] ? r + B - B : -(B + (-r - B))
                                }
                                for ((0 | T) == (0 | (k = Ue(((k = t[b + 44 >> 2]) ^ (u = k >> 31)) - u | 0, 0, T))) && (n[b + 15 | 0] = 48, k = b + 15 | 0), y = 2 | D, s = 32 & a, u = t[b + 44 >> 2], n[0 | (P = k - 2 | 0)] = a + 15, n[k - 1 | 0] = (0 | u) < 0 ? 45 : 43, k = 8 & i, u = b + 16 | 0; a = u, l = h(r) < 2147483648 ? ~~r : -2147483648, n[0 | u] = s | v[l + 9712 | 0], !((0 | A) > 0 | k) & 0 == (r = 16 * (r - +(0 | l))) | 1 != ((u = a + 1 | 0) - (b + 16 | 0) | 0) || (n[a + 1 | 0] = 46, u = a + 2 | 0), 0 != r;);
                                w = -1, (2147483645 - (a = (k = T - P | 0) + y | 0) | 0) < (0 | A) || (l = a, s = u - (a = b + 16 | 0) | 0, Ne(e, 32, f, u = l + (A = A && (s - 2 | 0) < (0 | A) ? A + 2 | 0 : s) | 0, i), er(e, g, y), Ne(e, 48, f, u, 65536 ^ i), er(e, a, s), Ne(e, 48, A - s | 0, 0, 0), er(e, P, k), Ne(e, 32, f, u, 8192 ^ i), w = (0 | f) < (0 | u) ? u : f)
                            } else Ne(e, 32, f, k = D + 3 | 0, -65537 & i), er(e, z, D), A = 32 & a, er(e, r != r ? A ? 1569 : 1876 : A ? 1612 : 1880, 3), Ne(e, 32, f, k, 8192 ^ i), w = (0 | f) < (0 | k) ? k : f;
                            return G = b + 560 | 0, 0 | w
                        }, fr, Ar, ir, ir, function(e, r, f) {
                            f |= 0;
                            var A, i = 0;
                            return G = A = G + -64 | 0, i = 1, Le(e |= 0, r |= 0, 0) || (i = 0, r && (i = 0, (r = ie(r, 9812)) && (ue(A + 12 | 0, 0, 52), t[A + 56 >> 2] = 1, t[A + 20 >> 2] = -1, t[A + 16 >> 2] = e, t[A + 8 >> 2] = r, nr[t[t[r >> 2] + 28 >> 2]](r, A + 8 | 0, t[f >> 2], 1), 1 == (0 | (e = t[A + 32 >> 2])) && (t[f >> 2] = t[A + 24 >> 2]), i = 1 == (0 | e)))), G = A - -64 | 0, 0 | (e = i)
                        }, function(e, r, f, A, i, a) {
                            f |= 0, A |= 0, i |= 0, a |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], a) && Ie(r, f, A, i)
                        }, function(e, r, f, A, i) {
                            if (f |= 0, A |= 0, i |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], i)) 1 == t[r + 28 >> 2] | t[r + 4 >> 2] != (0 | f) || (t[r + 28 >> 2] = A);
                            else e: if (Le(e, t[r >> 2], i)) {
                                if (!(t[r + 16 >> 2] != (0 | f) & t[r + 20 >> 2] != (0 | f))) {
                                    if (1 != (0 | A)) break e;
                                    return void(t[r + 32 >> 2] = 1)
                                }
                                t[r + 20 >> 2] = f, t[r + 32 >> 2] = A, t[r + 40 >> 2] = t[r + 40 >> 2] + 1, 1 != t[r + 36 >> 2] | 2 != t[r + 24 >> 2] || (n[r + 54 | 0] = 1), t[r + 44 >> 2] = 4
                            }
                        }, function(e, r, f, A) {
                            f |= 0, A |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], 0) && He(r, f, A)
                        }, Ar, function(e, r, f, A, i, a) {
                            f |= 0, A |= 0, i |= 0, a |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], a) ? Ie(r, f, A, i) : (e = t[e + 8 >> 2], nr[t[t[e >> 2] + 20 >> 2]](e, r, f, A, i, a))
                        }, function(e, r, f, A, i) {
                            if (f |= 0, A |= 0, i |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], i)) 1 == t[r + 28 >> 2] | t[r + 4 >> 2] != (0 | f) || (t[r + 28 >> 2] = A);
                            else e: {
                                if (Le(e, t[r >> 2], i)) {
                                    if (!(t[r + 16 >> 2] != (0 | f) & t[r + 20 >> 2] != (0 | f))) {
                                        if (1 != (0 | A)) break e;
                                        return void(t[r + 32 >> 2] = 1)
                                    }
                                    t[r + 32 >> 2] = A;
                                    r: if (4 != t[r + 44 >> 2]) {
                                        if (b[r + 52 >> 1] = 0, e = t[e + 8 >> 2], nr[t[t[e >> 2] + 20 >> 2]](e, r, f, f, 1, i), v[r + 53 | 0]) {
                                            if (t[r + 44 >> 2] = 3, !v[r + 52 | 0]) break r;
                                            break e
                                        }
                                        t[r + 44 >> 2] = 4
                                    }
                                    if (t[r + 20 >> 2] = f, t[r + 40 >> 2] = t[r + 40 >> 2] + 1, 1 != t[r + 36 >> 2] | 2 != t[r + 24 >> 2]) break e;
                                    return void(n[r + 54 | 0] = 1)
                                }
                                e = t[e + 8 >> 2],
                                nr[t[t[e >> 2] + 24 >> 2]](e, r, f, A, i)
                            }
                        }, function(e, r, f, A) {
                            f |= 0, A |= 0, Le(e |= 0, t[8 + (r |= 0) >> 2], 0) ? He(r, f, A) : (e = t[e + 8 >> 2], nr[t[t[e >> 2] + 28 >> 2]](e, r, f, A))
                        }], ar.set = function(e, r) {
                            this[e] = r
                        }, ar.get = function(e) {
                            return this[e]
                        }, ar);

                        function br() {
                            return a.byteLength / 65536 | 0
                        }
                        return {
                            j: function() {
                                De(10384, 1273, 1449, 1896), t[2608] = 1717986918, t[2609] = 1072588390, t[2604] = 0, t[2605] = 1072693248, t[2602] = 0, t[2603] = 0, t[2596] = 2608, b[5212] = 0, De(10440, 1283, 1416, 1896), t[2622] = -652835029, t[2623] = 1072691150, t[2618] = 0, t[2619] = 1072693248, t[2616] = 0, t[2617] = 0, t[2610] = 2608, b[5240] = 0, De(10496, 1517, 1630, 1896), t[2636] = 0, t[2637] = 0, b[5268] = 257, t[2632] = 0, t[2633] = 1072693248, t[2630] = 0, t[2631] = 0, t[2624] = 2608, De(10552, 1832, 1526, 1896), t[2650] = -201326592, t[2651] = 1100339651, t[2646] = 0, t[2647] = 2146435072, t[2644] = 0, t[2645] = 0, t[2638] = 2608, b[5296] = 0, De(10608, 1712, 2075, 1905), t[2659] = 2, t[2657] = 0, t[2658] = 2, t[2652] = 2720, De(10640, 1599, 2146, 1905), t[2667] = 2, t[2665] = 0, t[2666] = 2, t[2660] = 2720, De(10672, 1334, 1228, 1889), t[2668] = 2780, n[10692] = 0, De(10696, 1268, 1723, 1889), n[10716] = 1, t[2674] = 2780, De(10720, 1327, 1573, 1905), t[2687] = 100, t[2685] = 1, t[2686] = 2147483647, t[2680] = 2720, De(10752, 1845, 1484, 1896), t[2700] = 0, t[2701] = 1073741824, t[2696] = 0, t[2697] = 2146435072, t[2694] = 0, t[2695] = 1072693248, t[2688] = 2608, b[5396] = 0, De(10808, 1850, 1753, 1896), t[2714] = -1717986918, t[2715] = 1070176665, t[2710] = 0, t[2711] = 2146435072, t[2708] = 0, t[2709] = 0, t[2702] = 2608, b[5424] = 0, De(10864, 1620, 1343, 1889), t[2716] = 2780, n[10884] = 0, t[2765] = 10940, t[2747] = 42
                            },
                            k: function() {
                                var e, r = 0;
                                return e = Je(592), t[e + 4 >> 2] = 0, t[e + 8 >> 2] = 0, t[e >> 2] = 2560, t[e + 12 >> 2] = 0, t[e + 16 >> 2] = 0, t[e + 20 >> 2] = 0, t[e + 24 >> 2] = 0, t[e + 28 >> 2] = 0, d[e + 32 >> 3] = d[1304], d[e + 40 >> 3] = d[1311], d[e + 48 >> 3] = d[1318], d[e + 56 >> 3] = d[1325], n[e + 64 | 0] = v[10716], t[e + 68 >> 2] = t[2659], r = t[2667], n[e + 76 | 0] = 0, t[e + 72 >> 2] = r, n[e + 77 | 0] = v[10692], d[e + 80 >> 3] = d[1357], t[e + 88 >> 2] = t[2687], d[e + 96 >> 3] = d[1350], r = v[10884], t[e + 136 >> 2] = 0, t[e + 140 >> 2] = 1073217536, t[e + 128 >> 2] = 100, t[e + 120 >> 2] = -1717986918, t[e + 124 >> 2] = 1072798105, t[e + 112 >> 2] = 1431655765, t[e + 116 >> 2] = 1070945621, n[e + 104 | 0] = r, ue(e + 144 | 0, 0, 88), t[e + 236 >> 2] = 0, t[e + 240 >> 2] = 0, n[e + 232 | 0] = 1, t[e + 244 >> 2] = 0, t[e + 248 >> 2] = 0, t[e + 252 >> 2] = 0, t[e + 256 >> 2] = 0, t[e + 296 >> 2] = 0, t[e + 300 >> 2] = 0, t[e + 288 >> 2] = 0, t[e + 292 >> 2] = 1072693248, t[e + 280 >> 2] = 0, t[e + 272 >> 2] = 0, t[e + 276 >> 2] = 0, t[e + 264 >> 2] = 0, t[e + 268 >> 2] = 1072693248, t[e + 304 >> 2] = 0, t[e + 308 >> 2] = 0, t[e + 312 >> 2] = 0, t[e + 316 >> 2] = 0, t[e + 320 >> 2] = 0, t[e + 324 >> 2] = 0, t[e + 328 >> 2] = 0, r = e + 476 | 0, t[e + 332 >> 2] = r, ue(e + 336 | 0, 0, 76), t[e + 416 >> 2] = 0, t[e + 420 >> 2] = 0, t[e + 412 >> 2] = -1, t[e + 424 >> 2] = 0, t[e + 428 >> 2] = 0, t[e + 432 >> 2] = 0, t[e + 440 >> 2] = 0, t[e + 444 >> 2] = 0, t[e + 436 >> 2] = e + 272, t[e + 448 >> 2] = 0, t[e + 452 >> 2] = 0, t[e + 456 >> 2] = 0, t[e + 460 >> 2] = 0, t[e + 464 >> 2] = 0, t[e + 468 >> 2] = 0, t[e + 476 >> 2] = 0, t[e + 480 >> 2] = 0, n[e + 472 | 0] = 1, t[e + 484 >> 2] = 0, t[e + 488 >> 2] = 0, Ge(r, 1048576), t[e + 496 >> 2] = 0, t[e + 500 >> 2] = 0, n[e + 492 | 0] = 0, t[e + 504 >> 2] = 0, t[e + 508 >> 2] = 0, t[e + 512 >> 2] = 0, t[e + 516 >> 2] = 0, t[e + 520 >> 2] = 0, t[e + 524 >> 2] = 0, t[e + 528 >> 2] = 0, t[e + 532 >> 2] = 0, t[e + 536 >> 2] = 0, t[e + 540 >> 2] = 0, t[e + 568 >> 2] = -1, t[e + 572 >> 2] = -1, t[e + 576 >> 2] = -1, t[e + 580 >> 2] = -1, n[e + 584 | 0] = 0, 0 | e
                            },
                            l: function(e) {
                                (e |= 0) && nr[t[t[e >> 2] + 4 >> 2]](e)
                            },
                            m: function(e) {
                                return t[400 + (e |= 0) >> 2]
                            },
                            n: function(e) {
                                return t[240 + (e |= 0) >> 2]
                            },
                            o: function(e, r) {
                                r |= 0, t[72 + (e |= 0) >> 2] = r
                            },
                            p: function(e, r) {
                                r |= 0, n[76 + (e |= 0) | 0] = r
                            },
                            q: function(e, r) {
                                r |= 0, n[77 + (e |= 0) | 0] = r
                            },
                            r: function(e, r) {
                                r = +r, d[56 + (e |= 0) >> 3] = r
                            },
                            s: function(e, r, f) {
                                f |= 0;
                                var A, i, a, b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0,
                                    c = 0;
                                k = !!(0 | (r |= 0)), G = i = G - 16 | 0, Te(r = 296 + (e |= 0) | 0, u = 1 | (b = (A = t[e + 400 >> 2]) << 1)), n[i + 14 | 0] = 0, le(a = e + 308 | 0, u, i + 14 | 0), Te(r, r = b + 2 | 0), n[i + 15 | 0] = 0, le(a, r, i + 15 | 0);
                                e: {
                                    r: {
                                        if ((0 | (r = t[e + 340 >> 2])) == t[e + 344 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 344 >> 2] = r, b = Y(t[e + 336 >> 2], r), t[e + 336 >> 2] = b, !b) break r;
                                            r = t[e + 340 >> 2]
                                        } else b = t[e + 336 >> 2];
                                        if (t[e + 340 >> 2] = r + 1, n[r + b | 0] = 2, (0 | (r = t[e + 400 >> 2])) == t[e + 404 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 404 >> 2] = r, b = Y(t[e + 396 >> 2], r << 3), t[e + 396 >> 2] = b, !b) break r;
                                            r = t[e + 400 >> 2]
                                        } else b = t[e + 396 >> 2];
                                        if (t[e + 400 >> 2] = r + 1, t[(r = (r << 3) + b | 0) >> 2] = -1, t[r + 4 >> 2] = 0, v[e + 77 | 0] ? (o = 1389796 * d[e + 56 >> 3], o -= 2147483647 * +(0 | (r = h(c = o / 2147483647) < 2147483648 ? ~~c : -2147483648)), d[e + 56 >> 3] = o, o = o / 2147483647 * 1e-5) : o = 0, (0 | (r = t[e + 276 >> 2])) == t[e + 280 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 280 >> 2] = r, b = Y(t[e + 272 >> 2], r << 3), t[e + 272 >> 2] = b, !b) break r;
                                            r = t[e + 276 >> 2]
                                        } else b = t[e + 272 >> 2];
                                        if (t[e + 276 >> 2] = r + 1, d[(r << 3) + b >> 3] = o, (0 | (r = t[e + 500 >> 2])) == t[e + 504 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 504 >> 2] = r, b = Y(t[e + 496 >> 2], r), t[e + 496 >> 2] = b, !b) break r;
                                            r = t[e + 500 >> 2]
                                        } else b = t[e + 496 >> 2];
                                        if (t[e + 500 >> 2] = r + 1, n[r + b | 0] = 0, (0 | (r = t[e + 352 >> 2])) == t[e + 356 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 356 >> 2] = r, b = Y(t[e + 348 >> 2], r), t[e + 348 >> 2] = b, !b) break r;
                                            r = t[e + 352 >> 2]
                                        } else b = t[e + 348 >> 2];
                                        if (t[e + 352 >> 2] = r + 1, n[r + b | 0] = k, (0 | (r = t[e + 364 >> 2])) == t[e + 368 >> 2]) {
                                            if ((b = ((0 | (b = r >> 1 & -2)) > 0 ? b : 0) + 2 | 0) >>> 0 > (2147483647 ^ r) >>> 0) break r;
                                            if (r = r + b | 0, t[e + 368 >> 2] = r, b = Y(t[e + 360 >> 2], r), t[e + 360 >> 2] = b, !b) break r;
                                            r = t[e + 364 >> 2]
                                        } else b = t[e + 360 >> 2];
                                        if (n[r + b | 0] = 0, t[e + 364 >> 2] = t[e + 364 >> 2] + 1, !((0 | (r = t[e + 380 >> 2])) > (0 | A))) {
                                            if ((0 | (b = (0 | (b = 2 + (r >> 1 & -2) | 0)) > (0 | (k = 2 + (A - r | 0) & -2)) ? b : k)) > (2147483647 ^ r)) break r;
                                            if (r = r + b | 0, t[e + 380 >> 2] = r, r = Y(t[e + 372 >> 2], r << 2), t[e + 372 >> 2] = r, !r && 48 == t[2726]) break r
                                        }
                                        u = t[e + 360 >> 2] + A | 0,
                                        b = v[0 | u];f: {
                                            if (f) {
                                                if (b) break f;
                                                r = 1, k = 0
                                            } else if (r = -1, k = -1, !b) break f;b = k + t[e + 196 >> 2] | 0,
                                            b = r >>> 0 > (r = t[e + 192 >> 2] + r | 0) >>> 0 ? b + 1 | 0 : b,
                                            t[e + 192 >> 2] = r,
                                            t[e + 196 >> 2] = b
                                        }
                                        n[0 | u] = f,
                                        !v[t[e + 360 >> 2] + A | 0] | t[e + 456 >> 2] > (0 | A) & t[t[e + 452 >> 2] + (A << 2) >> 2] >= 0 || L(e + 436 | 0, A),
                                        G = i + 16 | 0;
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                }
                                return 0 | A
                            },
                            t: function(e, r, f, A) {
                                e |= 0, f |= 0, A |= 0;
                                var i, a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0,
                                    c = 0;
                                e: if (!((0 | (r |= 0)) <= 0)) {
                                    r: {
                                        for (;;) {
                                            if (o = t[(n = a << 2) + f >> 2], (0 | a) == (0 | k)) {
                                                if ((k = 2 + (a >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ a) >>> 0) break r;
                                                if (!(b = Y(b, (k = a + k | 0) << 2))) break r
                                            }
                                            if (t[b + n >> 2] = (0 | o) < 0 ? ~o << 1 | 1 : (o << 1) - 2 | 0, (0 | (a = a + 1 | 0)) == (0 | r)) break
                                        }
                                        a = r;
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                } t[e + 532 >> 2] && (t[e + 536 >> 2] = 0), se(i = e + 532 | 0, a);
                                e: {
                                    if (a) {
                                        if (o = t[i >> 2], k = 0, f = 0, a >>> 0 >= 4)
                                            for (c = 2147483644 & a, r = 0; t[(n = f << 2) + o >> 2] = t[b + n >> 2], t[(u = 4 | n) + o >> 2] = t[b + u >> 2], t[(u = 8 | n) + o >> 2] = t[b + u >> 2], t[(n |= 12) + o >> 2] = t[b + n >> 2], f = f + 4 | 0, (0 | c) != (0 | (r = r + 4 | 0)););
                                        if (r = 3 & a)
                                            for (; t[(a = f << 2) + o >> 2] = t[a + b >> 2], f = f + 1 | 0, (0 | r) != (0 | (k = k + 1 | 0)););
                                        a = q(e, i, A)
                                    } else if (a = q(e, i, A), !b) break e;V(b)
                                }
                                return 0 | a
                            },
                            u: V,
                            v: function(e, r, f) {
                                e |= 0, f |= 0;
                                var A, i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0;
                                e: if (!((0 | (r |= 0)) <= 0)) {
                                    r: {
                                        for (;;) {
                                            if (b = t[(a = i << 2) + f >> 2], (0 | i) == (0 | o)) {
                                                if ((o = 2 + (i >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ i) >>> 0) break r;
                                                if (!(n = Y(n, (o = i + o | 0) << 2))) break r
                                            }
                                            if (t[n + a >> 2] = (0 | b) < 0 ? ~b << 1 | 1 : (b << 1) - 2 | 0, (0 | (i = i + 1 | 0)) == (0 | r)) break
                                        }
                                        i = r;
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                } t[e + 532 >> 2] && (t[e + 536 >> 2] = 0), se(A = e + 532 | 0, i);
                                e: {
                                    if (i) {
                                        if (b = t[A >> 2], o = 0, f = 0, i >>> 0 >= 4)
                                            for (u = 2147483644 & i, r = 0; t[(a = f << 2) + b >> 2] = t[n + a >> 2], t[(k = 4 | a) + b >> 2] = t[n + k >> 2], t[(k = 8 | a) + b >> 2] = t[n + k >> 2], t[(a |= 12) + b >> 2] = t[n + a >> 2], f = f + 4 | 0, (0 | u) != (0 | (r = r + 4 | 0)););
                                        if (r = 3 & i)
                                            for (; t[(i = f << 2) + b >> 2] = t[i + n >> 2], f = f + 1 | 0, (0 | r) != (0 | (o = o + 1 | 0)););
                                        i = ae(e, A)
                                    } else if (i = ae(e, A), !n) break e;V(n)
                                }
                                return 0 | i
                            },
                            w: function(e, r) {
                                r |= 0;
                                var f = 0,
                                    A = 0,
                                    i = 0;
                                e: {
                                    if ((A = t[532 + (e |= 0) >> 2]) ? (t[e + 536 >> 2] = 0, f = 0) : f = t[e + 536 >> 2], (0 | f) == t[e + 540 >> 2]) {
                                        if ((i = ((0 | (i = f >> 1 & -2)) > 0 ? i : 0) + 2 | 0) >>> 0 > (2147483647 ^ f) >>> 0) break e;
                                        if (f = f + i | 0, t[e + 540 >> 2] = f, A = Y(A, f << 2), t[e + 532 >> 2] = A, !A) break e;
                                        f = t[e + 536 >> 2]
                                    }
                                    return t[e + 536 >> 2] = f + 1,
                                    t[(f << 2) + A >> 2] = (0 | r) < 0 ? ~r << 1 | 1 : (r << 1) - 2 | 0,
                                    0 | ae(e, e + 532 | 0)
                                }
                                B(0 | rr(), 1060, 0), s()
                            },
                            x: function(e) {
                                return t[568 + (e |= 0) >> 2] = -1, t[e + 572 >> 2] = -1, t[e + 576 >> 2] = -1, t[e + 580 >> 2] = -1, t[e + 424 >> 2] && (t[e + 428 >> 2] = 0), 0 | !(255 & S(e))
                            },
                            y: function(e, r, f) {
                                e |= 0, f |= 0;
                                var A = 0,
                                    i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                e: if (!((0 | (r |= 0)) <= 0)) {
                                    r: {
                                        for (;;) {
                                            if (n = t[(i = A << 2) + f >> 2], (0 | A) == (0 | b)) {
                                                if ((b = 2 + (A >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ A) >>> 0) break r;
                                                if (!(a = Y(a, (b = A + b | 0) << 2))) break r
                                            }
                                            if (t[a + i >> 2] = (0 | n) < 0 ? ~n << 1 | 1 : (n << 1) - 2 | 0, (0 | (A = A + 1 | 0)) == (0 | r)) break
                                        }
                                        A = r;
                                        break e
                                    }
                                    B(0 | rr(), 1060, 0),
                                    s()
                                } t[e + 568 >> 2] = -1, t[e + 572 >> 2] = -1, t[e + 576 >> 2] = -1, t[e + 580 >> 2] = -1, t[e + 424 >> 2] && (t[e + 428 >> 2] = 0), se(r = e + 424 | 0, A);
                                e: {
                                    if (A) {
                                        if (n = t[r >> 2], b = 0, f = 0, A >>> 0 >= 4)
                                            for (k = 2147483644 & A, r = 0; t[(i = f << 2) + n >> 2] = t[a + i >> 2], t[(o = 4 | i) + n >> 2] = t[a + o >> 2], t[(o = 8 | i) + n >> 2] = t[a + o >> 2], t[(i |= 12) + n >> 2] = t[a + i >> 2], f = f + 4 | 0, (0 | k) != (0 | (r = r + 4 | 0)););
                                        if (r = 3 & A)
                                            for (; t[(A = f << 2) + n >> 2] = t[A + a >> 2], f = f + 1 | 0, (0 | r) != (0 | (b = b + 1 | 0)););
                                        A = !(255 & S(e))
                                    } else if (A = !(255 & S(e)), !a) break e;V(a)
                                }
                                return 0 | A
                            },
                            z: function(e, r, f, A) {
                                r |= 0, f |= 0, A |= 0;
                                var i, a = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0,
                                    u = 0,
                                    c = 0,
                                    l = 0,
                                    g = 0;
                                u = 1, c = ue(Je(a = (i = t[400 + (e |= 0) >> 2]) + 1 | 0), 0, a);
                                e: {
                                    r: {
                                        if (!((0 | r) <= 0)) {
                                            a = 0;
                                            f: {
                                                if (A) {
                                                    for (;;) {
                                                        if (k = t[(g = (l = a << 2) + f | 0) >> 2], (0 | a) == (0 | b)) {
                                                            if ((b = 2 + (a >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                            if (!(o = Y(o, (b = a + b | 0) << 2))) break f
                                                        }
                                                        if (t[o + l >> 2] = (0 | k) < 0 ? ~k << 1 | 1 : (k << 1) - 2 | 0, n[c + t[g >> 2] | 0] = 1, (0 | (a = a + 1 | 0)) == (0 | r)) break
                                                    }
                                                    break r
                                                }
                                                for (;;) {
                                                    if (k = t[(g = (l = a << 2) + f | 0) >> 2], (0 | a) == (0 | b)) {
                                                        if ((b = 2 + (a >>> 1 & 1073741822) | 0) >>> 0 > (2147483647 ^ a) >>> 0) break f;
                                                        if (!(o = Y(o, (b = a + b | 0) << 2))) break f
                                                    }
                                                    if (t[o + l >> 2] = (0 | k) < 0 ? ~k << 1 | 1 : (k << 1) - 2 | 0, n[c - t[g >> 2] | 0] = 1, (0 | (a = a + 1 | 0)) == (0 | r)) break
                                                }
                                                break r
                                            }
                                            break e
                                        }
                                        r = 0
                                    }
                                    if ((0 | i) > 0)
                                        for (;;) {
                                            if (!v[u + c | 0]) {
                                                if ((0 | r) == (0 | b) && !((f = ((0 | (f = b >> 1 & -2)) > 0 ? f : 0) + 2 | 0) >>> 0 <= (2147483647 ^ b) >>> 0 && (o = Y(o, (b = f + b | 0) << 2)))) break e;
                                                f = A ? 0 - u | 0 : u, t[(r << 2) + o >> 2] = (0 | f) < 0 ? ~f << 1 | 1 : (f << 1) - 2 | 0, r = r + 1 | 0
                                            }
                                            if (f = (0 | u) != (0 | i), u = u + 1 | 0, !f) break
                                        }
                                    V(c),
                                    t[e + 576 >> 2] = -1,
                                    t[e + 580 >> 2] = -1,
                                    t[e + 568 >> 2] = -1,
                                    t[e + 572 >> 2] = -1,
                                    t[e + 424 >> 2] && (t[e + 428 >> 2] = 0),
                                    se(e + 424 | 0, r);r: {
                                        if ((0 | r) > 0) {
                                            if (f = t[e + 424 >> 2], b = 0, a = 0, r >>> 0 >= 4)
                                                for (c = 2147483644 & r, u = 0; t[(A = a << 2) + f >> 2] = t[A + o >> 2], t[(k = 4 | A) + f >> 2] = t[o + k >> 2], t[(k = 8 | A) + f >> 2] = t[o + k >> 2], t[(A |= 12) + f >> 2] = t[A + o >> 2], a = a + 4 | 0, (0 | c) != (0 | (u = u + 4 | 0)););
                                            if (r &= 3)
                                                for (; t[(A = a << 2) + f >> 2] = t[A + o >> 2], a = a + 1 | 0, (0 | r) != (0 | (b = b + 1 | 0)););
                                            a = !(255 & S(e))
                                        } else if (a = !(255 & S(e)), !o) break r;V(o)
                                    }
                                    return 0 | a
                                }
                                B(0 | rr(), 1060, 0), s()
                            },
                            A: function(e) {
                                return 0 | x(e |= 0)
                            },
                            B: function(e, r) {
                                return r |= 0, 1 != v[(t[4 + (e |= 0) >> 2] + r | 0) - 1 | 0] | 0
                            },
                            C: function(e, r, f, A) {
                                e |= 0, r |= 0;
                                var i = 0,
                                    a = 0;
                                if (!((0 | (f |= 0)) >= (0 | (A |= 0))) && (i = t[e + 4 >> 2], e = f, A - f & 1 && (t[r >> 2] = 1 != v[f + i | 0], e = f + 1 | 0), (A - 1 | 0) != (0 | f)))
                                    for (; t[(e - f << 2) + r >> 2] = 1 != v[e + i | 0], t[((a = e + 1 | 0) - f << 2) + r >> 2] = 1 != v[i + a | 0], (0 | A) != (0 | (e = e + 2 | 0)););
                            },
                            D: function(e, r, f, A, i) {
                                e |= 0, r |= 0, i |= 0;
                                var a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0;
                                if (!((0 | (f |= 0)) >= (0 | (A |= 0)))) {
                                    if (i = i - f | 0, b = 1 & (a = A - f | 0), e = t[e + 4 >> 2], (A - 1 | 0) != (0 | f))
                                        for (o = -2 & a, a = 0, A = 0; v[e + f | 0] || (t[(a << 2) + r >> 2] = f + i, a = a + 1 | 0), v[e + (n = f + 1 | 0) | 0] || (t[(a << 2) + r >> 2] = i + n, a = a + 1 | 0), f = f + 2 | 0, (0 | o) != (0 | (A = A + 2 | 0)););
                                    else a = 0;
                                    v[e + f | 0] | !b || (t[(a << 2) + r >> 2] = f + i, a = a + 1 | 0)
                                }
                                return 0 | a
                            },
                            E: function(e) {
                                return t[20 + (e |= 0) >> 2]
                            },
                            F: function(e, r, f, A) {
                                r |= 0, f |= 0, A |= 0;
                                var i = 0,
                                    a = 0;
                                if ((0 | (i = t[20 + (e |= 0) >> 2])) > 0)
                                    for (r = A - r | 0, a = t[e + 16 >> 2], A = 0; t[(i = A << 2) + f >> 2] = r + (t[i + a >> 2] >> 1), (0 | (A = A + 1 | 0)) < (0 | (i = t[e + 20 >> 2])););
                                return 0 | i
                            },
                            G: function(e, r) {
                                e |= 0, r |= 0;
                                var f, A, i = 0,
                                    a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                G = f = G - 32 | 0, t[f + 28 >> 2] = 0, t[f + 20 >> 2] = 0, t[f + 24 >> 2] = 0, t[f + 16 >> 2] = 0, t[f + 8 >> 2] = 0, t[f + 12 >> 2] = 0, Ae(e, f + 20 | 0, f + 8 | 0), e = t[f + 8 >> 2];
                                e: {
                                    r: if ((0 | (A = t[f + 12 >> 2])) > 0) {
                                        if (1 != (0 | A))
                                            for (k = 2147483646 & A; a = (b = t[(i = n << 2) + e >> 2]) >> 1, t[r + i >> 2] = 1 & b ? ~a : a + 1 | 0, i = (b = t[(a = 4 | i) + e >> 2]) >> 1, t[r + a >> 2] = 1 & b ? ~i : i + 1 | 0, n = n + 2 | 0, (0 | k) != (0 | (o = o + 2 | 0)););
                                        if (!(1 & A)) break r;
                                        n = (a = t[(i = n << 2) + e >> 2]) >> 1, t[r + i >> 2] = 1 & a ? ~n : n + 1 | 0
                                    } else if (!e) break e;t[f + 12 >> 2] = 0,
                                    V(e)
                                }
                                return (e = t[f + 20 >> 2]) && (t[f + 24 >> 2] = 0, V(e)), G = f + 32 | 0, 0 | A
                            },
                            H: function(e, r, f, A) {
                                e |= 0, r |= 0, f |= 0, A |= 0;
                                var i, a = 0,
                                    n = 0,
                                    b = 0,
                                    o = 0,
                                    k = 0;
                                G = i = G - 32 | 0, t[i + 24 >> 2] = 0, t[i + 28 >> 2] = 0;
                                e: {
                                    r: {
                                        f: {
                                            A: {
                                                if ((0 | A) > 0)
                                                    for (;;) {
                                                        if (o = t[(k << 2) + f >> 2], (0 | (a = t[i + 24 >> 2])) == t[i + 28 >> 2]) {
                                                            if ((n = ((0 | (n = a >> 1 & -2)) > 0 ? n : 0) + 2 | 0) >>> 0 > (2147483647 ^ a) >>> 0) break A;
                                                            if (n = a + n | 0, t[i + 28 >> 2] = n, !(b = Y(b, n << 2))) break A
                                                        }
                                                        if (t[i + 24 >> 2] = a + 1, t[(a << 2) + b >> 2] = (0 | o) < 0 ? ~o << 1 | 1 : (o << 1) - 2 | 0, (0 | (k = k + 1 | 0)) == (0 | A)) break
                                                    }
                                                if (t[i + 20 >> 2] = b, t[i + 16 >> 2] = 0, t[i + 8 >> 2] = 0, t[i + 12 >> 2] = 0, Ae(e, i + 20 | 0, i + 8 | 0), e = t[i + 8 >> 2], (0 | (A = t[i + 12 >> 2])) <= 0) break f;
                                                if (f = 0, 1 != (0 | A))
                                                    for (k = 2147483646 & A, b = 0; o = (n = t[(a = f << 2) + e >> 2]) >> 1, t[r + a >> 2] = 1 & n ? ~o : o + 1 | 0, a = (n = t[(o = 4 | a) + e >> 2]) >> 1, t[r + o >> 2] = 1 & n ? ~a : a + 1 | 0, f = f + 2 | 0, (0 | k) != (0 | (b = b + 2 | 0)););
                                                if (!(1 & A)) break r;f = (a = t[(b = f << 2) + e >> 2]) >> 1,
                                                t[r + b >> 2] = 1 & a ? ~f : f + 1 | 0;
                                                break r
                                            }
                                            B(0 | rr(), 1060, 0),
                                            s()
                                        }
                                        if (!e) break e
                                    }
                                    t[i + 12 >> 2] = 0,
                                    V(e)
                                }
                                return (e = t[i + 20 >> 2]) && (t[i + 24 >> 2] = 0, V(e)), G = i + 32 | 0, 0 | A
                            },
                            I: nr,
                            J: U,
                            K: function() {
                                return 0 | G
                            },
                            L: function(e) {
                                G = e |= 0
                            },
                            M: function(e) {
                                return G = e = G - (e |= 0) & -16, 0 | e
                            },
                            N: function(e) {
                                return (e |= 0) ? 0 | !!(0 | ie(e, 9908)) : 0
                            }
                        }
                    }(e)
                }(e)
            }
            Object.assign(i, b), b = null, i.quit && (t = i.quit), i.wasmBinary && (g = i.wasmBinary);
            var y = Error;
            g = [], "object" != o({}) && U("no native wasm support detected");
            var h, m, B, p, D = !1;

            function T() {
                var e = h.buffer;
                i.HEAP8 = m = new Int8Array(e), i.HEAP16 = new Int16Array(e), i.HEAPU8 = B = new Uint8Array(e), i.HEAPU16 = new Uint16Array(e), i.HEAP32 = new Int32Array(e), i.HEAPU32 = p = new Uint32Array(e), i.HEAPF32 = new Float32Array(e), i.HEAPF64 = new Float64Array(e)
            }
            var I = i.INITIAL_MEMORY || 16777216;
            h = i.wasmMemory ? i.wasmMemory : new function() {
                this.buffer = new ArrayBuffer(I / 65536 * 65536)
            }, T(), I = h.buffer.byteLength;
            var z = [],
                j = [],
                W = [];

            function G() {
                var e = i.preRun.shift();
                z.unshift(e)
            }
            var E = 0,
                S = null;

            function U(e) {
                var r;
                throw null === (r = i.onAbort) || void 0 === r || r.call(i, e), w(e = "Aborted(" + e + ")"), D = !0, e = new y(e + ". Build with -sASSERTIONS for more info."), f(e), e
            }
            var Z, M = function(e) {
                    return e.startsWith("data:application/octet-stream;base64,")
                },
                F = function(e) {
                    return e.startsWith("file://")
                };
            if (!M(Z = "libminicard.wasm")) {
                var R = Z;
                Z = i.locateFile ? i.locateFile(R, s) : s + R
            }

            function H(e) {
                this.name = "ExitStatus", this.message = "Program terminated with exit(".concat(e, ")"), this.status = e
            }
            var N = function(e) {
                    for (; 0 < e.length;) e.shift()(i)
                },
                V = i.noExitRuntime || !0;

            function Q(e) {
                this.I = e - 24, this.R = function(e) {
                    p[this.I + 4 >> 2] = e
                }, this.P = function(e) {
                    p[this.I + 8 >> 2] = e
                }, this.N = function(e, r) {
                    this.O(), this.R(e), this.P(r)
                }, this.O = function() {
                    p[this.I + 16 >> 2] = 0
                }
            }
            var x = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
                O = function(e, r) {
                    for (var f = r + NaN, A = r; e[A] && !(A >= f);) ++A;
                    if (16 < A - r && e.buffer && x) return x.decode(e.subarray(r, A));
                    for (f = ""; r < A;) {
                        var i = e[r++];
                        if (128 & i) {
                            var a = 63 & e[r++];
                            if (192 == (224 & i)) f += String.fromCharCode((31 & i) << 6 | a);
                            else {
                                var n = 63 & e[r++];
                                65536 > (i = 224 == (240 & i) ? (15 & i) << 12 | a << 6 | n : (7 & i) << 18 | a << 12 | n << 6 | 63 & e[r++]) ? f += String.fromCharCode(i) : (i -= 65536, f += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i))
                            }
                        } else f += String.fromCharCode(i)
                    }
                    return f
                },
                X = [null, [],
                    []
                ],
                Y = {
                    b: function(e, r, f) {
                        throw new Q(e).N(r, f), e
                    },
                    d: function() {
                        U("")
                    },
                    i: function(e, r, f) {
                        return B.copyWithin(e, r, r + f)
                    },
                    g: function(e) {
                        var r = B.length;
                        if (2147483648 < (e >>>= 0)) return !1;
                        for (var f = 1; 4 >= f; f *= 2) {
                            var A = r * (1 + .2 / f);
                            A = Math.min(A, e + 100663296);
                            var i = Math;
                            A = Math.max(e, A);
                            e: {
                                i = (i.min.call(i, 2147483648, A + (65536 - A % 65536) % 65536) - h.buffer.byteLength + 65535) / 65536;
                                try {
                                    h.grow(i), T();
                                    var a = 1;
                                    break e
                                } catch (e) {}
                                a = void 0
                            }
                            if (a) return !0
                        }
                        return !1
                    },
                    c: function(e) {
                        var r;
                        V || (null !== (r = i.onExit) && void 0 !== r && r.call(i, e), D = !0), t(e, new H(e))
                    },
                    h: function() {
                        return 52
                    },
                    f: function() {
                        return 70
                    },
                    e: function(e, r, f, A) {
                        for (var i = 0, a = 0; a < f; a++) {
                            var n = p[r >> 2],
                                b = p[r + 4 >> 2];
                            r += 8;
                            for (var t = 0; t < b; t++) {
                                var o = B[n + t],
                                    k = X[e];
                                0 === o || 10 === o ? ((1 === e ? P : w)(O(k, 0)), k.length = 0) : k.push(o)
                            }
                            i += b
                        }
                        return p[A >> 2] = i, 0
                    },
                    a: h
                },
                J = function(e) {
                    function r(e) {
                        var r;
                        return J = e.exports, j.unshift(J.j), E--, null === (r = i.monitorRunDependencies) || void 0 === r || r.call(i, E), 0 == E && S && (e = S, S = null, e()), J
                    }
                    var A = {
                        a: Y
                    };
                    if (E++, null === (e = i.monitorRunDependencies) || void 0 === e || e.call(i, E), i.instantiateWasm) try {
                        return i.instantiateWasm(A, r)
                    } catch (e) {
                        w("Module.instantiateWasm callback failed with error: ".concat(e)), f(e)
                    }
                    return A = function(e) {
                        if (Z == Z && g);
                        else {
                            var r = Z;
                            if (M(r))
                                if (r = r.slice(37), void 0 !== c && c) r = Buffer.from(r, "base64"), r = new Uint8Array(r.buffer, r.byteOffset, r.length);
                                else {
                                    r = atob(r);
                                    for (var f = new Uint8Array(r.length), A = 0; A < r.length; ++A) f[A] = r.charCodeAt(A);
                                    r = f
                                }
                            else r = void 0;
                            if (!r) {
                                if (!n) throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
                                n(Z)
                            }
                        }
                        return r = new d, [new C(e), r]
                    }(A), r(A[0])
                }();
            i._Solver_new = J.k, i._Solver_delete = J.l, i._nVars = J.m, i._nClauses = J.n, i._setPhaseSaving = J.o, i._setRndPol = J.p, i._setRndInitAct = J.q, i._setRndSeed = J.r, i._newVar = J.s, i._addAtMost = J.t, i._free = J.u, i._addClause = J.v, i._addUnit = J.w, i._solve = J.x, i._solve_assumptions = J.y, i._check_complete = J.z, i._simplify = J.A, i._modelValue = J.B, i._fillModel = J.C, i._getModelTrues = J.D, i._conflictSize = J.E, i._unsatCore = J.F, i._getImplies = J.G, i._getImplies_assumptions = J.H, i._malloc = J.J;
            var K, L = J.K,
                q = J.L,
                _ = J.M;

            function $() {
                function r() {
                    if (!K && (K = !0, i.calledRun = !0, !D)) {
                        if (N(j), e(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), i.postRun)
                            for ("function" == typeof i.postRun && (i.postRun = [i.postRun]); i.postRun.length;) {
                                var r = i.postRun.shift();
                                W.unshift(r)
                            }
                        N(W)
                    }
                }
                if (!(0 < E)) {
                    if (i.preRun)
                        for ("function" == typeof i.preRun && (i.preRun = [i.preRun]); i.preRun.length;) G();
                    N(z), 0 < E || (i.setStatus ? (i.setStatus("Running..."), setTimeout((function() {
                        setTimeout((function() {
                            i.setStatus("")
                        }), 1), r()
                    }), 1)) : r())
                }
            }
            if (i.ccall = function(e, r, f, A) {
                    var a = {
                        string: function(e) {
                            var r = 0;
                            if (null != e && 0 !== e) {
                                for (var f = r = 0; f < e.length; ++f) {
                                    var A = e.charCodeAt(f);
                                    127 >= A ? r++ : 2047 >= A ? r += 2 : 55296 <= A && 57343 >= A ? (r += 4, ++f) : r += 3
                                }
                                var i = r + 1;
                                if (f = r = _(i), A = B, 0 < i) {
                                    i = f + i - 1;
                                    for (var a = 0; a < e.length; ++a) {
                                        var n = e.charCodeAt(a);
                                        if (55296 <= n && 57343 >= n && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++a)), 127 >= n) {
                                            if (f >= i) break;
                                            A[f++] = n
                                        } else {
                                            if (2047 >= n) {
                                                if (f + 1 >= i) break;
                                                A[f++] = 192 | n >> 6
                                            } else {
                                                if (65535 >= n) {
                                                    if (f + 2 >= i) break;
                                                    A[f++] = 224 | n >> 12
                                                } else {
                                                    if (f + 3 >= i) break;
                                                    A[f++] = 240 | n >> 18, A[f++] = 128 | n >> 12 & 63
                                                }
                                                A[f++] = 128 | n >> 6 & 63
                                            }
                                            A[f++] = 128 | 63 & n
                                        }
                                    }
                                    A[f] = 0
                                }
                            }
                            return r
                        },
                        array: function(e) {
                            var r = _(e.length);
                            return m.set(e, r), r
                        }
                    };
                    e = i["_" + e];
                    var n, b = [],
                        t = 0;
                    if (A)
                        for (var o = 0; o < A.length; o++) {
                            var k = a[f[o]];
                            k ? (0 === t && (t = L()), b[o] = k(A[o])) : b[o] = A[o]
                        }
                    return f = e.apply(null, b), n = f, 0 !== t && q(t), "string" === r ? n ? O(B, n) : "" : "boolean" === r ? !!n : n
                }, S = function e() {
                    K || $(), K || (S = e)
                }, i.preInit)
                for ("function" == typeof i.preInit && (i.preInit = [i.preInit]); 0 < i.preInit.length;) i.preInit.pop()();
            return $(), A
        });
        e.exports = f
    }(s);
    var l = k(s.exports),
        v = function() {
            return A((function e(r) {
                f(this, e), this.lib = r(), this.S = this.lib.ccall("Solver_new", "number", [])
            }), [{
                key: "delete",
                value: function() {
                    this.lib.ccall("Solver_delete", "number", ["number"], [this.S])
                }
            }, {
                key: "nvars",
                value: function() {
                    return this.lib.ccall("nVars", "number", ["number"], [this.S])
                }
            }, {
                key: "nclauses",
                value: function() {
                    return this.lib.ccall("nClauses", "number", ["number"], [this.S])
                }
            }, {
                key: "new_var",
                value: function() {
                    return this.lib.ccall("newVar", "number", ["number", "number", "number"], [this.S, 2, 1])
                }
            }, {
                key: "add_clause",
                value: function(e) {
                    return this.lib.ccall("addClause", "number", ["number", "number", "array"], [this.S, e.length, new Uint8Array(new Int32Array(e).buffer)])
                }
            }, {
                key: "solve",
                value: function() {
                    return this.lib.ccall("solve", "number", ["number"], [this.S])
                }
            }, {
                key: "get_model",
                value: function() {
                    var e = this.nvars(),
                        r = this.lib._malloc(4 * e),
                        f = this.lib.HEAP32.subarray(r >> 2, (r >> 2) + e);
                    this.lib.ccall("fillModel", null, ["number", "number", "number", "number"], [this.S, r, 0, this.nvars()]);
                    var A = new Int32Array(f);
                    return this.lib._free(r), A
                }
            }])
        }(),
        g = function(e) {
            function i() {
                return f(this, i), r(this, i, [c])
            }
            return a(i, e), A(i)
        }(v),
        P = function(e) {
            function i() {
                return f(this, i), r(this, i, [l])
            }
            return a(i, e), A(i)
        }(v);
    e.MinicardSolver = P, e.MinisatSolver = g
}));
//# sourceMappingURL=minisolvers.js.map