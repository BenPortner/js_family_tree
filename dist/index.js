(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // js/d3-dag.js
  var require_d3_dag = __commonJS({
    "js/d3-dag.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.d3 = global.d3 || {});
      })(exports, function(exports2) {
        "use strict";
        function center() {
          function coordSpread(layers, separation) {
            const maxWidth = Math.max(
              ...layers.map((layer) => {
                layer[0].x = 0;
                layer.slice(1).forEach((node, i) => {
                  const prev = layer[i];
                  node.x = prev.x + separation(prev, node);
                });
                return layer[layer.length - 1].x;
              })
            );
            layers.forEach((layer) => {
              const halfWidth = layer[layer.length - 1].x / 2;
              layer.forEach((node) => {
                node.x = (node.x - halfWidth) / maxWidth + 0.5;
              });
            });
            return layers;
          }
          return coordSpread;
        }
        function greedy() {
          let assignment = mean;
          function coordGreedy(layers, separation) {
            layers.forEach(
              (layer) => layer.forEach((n) => n.degree = n.children.length + (n.data ? 0 : -3))
            );
            layers.forEach(
              (layer) => layer.forEach((n) => n.children.forEach((c) => ++c.degree))
            );
            layers[0][0].x = 0;
            layers[0].slice(1).forEach((node, i) => {
              const last = layers[0][i];
              node.x = last.x + separation(last, node);
            });
            layers.slice(0, layers.length - 1).forEach((top, i) => {
              const bottom = layers[i + 1];
              assignment(top, bottom);
              bottom.map((n, j) => [n, j]).sort(
                ([an, aj], [bn, bj]) => an.degree === bn.degree ? aj - bj : bn.degree - an.degree
              ).forEach(([n, j]) => {
                bottom.slice(j + 1).reduce((last, node) => {
                  node.x = Math.max(node.x, last.x + separation(last, node));
                  return node;
                }, n);
                bottom.slice(0, j).reverse().reduce((last, node) => {
                  node.x = Math.min(node.x, last.x - separation(node, last));
                  return node;
                }, n);
              });
            });
            const min2 = Math.min(
              ...layers.map((layer) => Math.min(...layer.map((n) => n.x)))
            );
            const span = Math.max(...layers.map((layer) => Math.max(...layer.map((n) => n.x)))) - min2;
            layers.forEach((layer) => layer.forEach((n) => n.x = (n.x - min2) / span));
            layers.forEach((layer) => layer.forEach((n) => delete n.degree));
            return layers;
          }
          return coordGreedy;
        }
        function mean(topLayer, bottomLayer) {
          bottomLayer.forEach((node) => {
            node.x = 0;
            node._count = 0;
          });
          topLayer.forEach(
            (n) => n.children.forEach((c) => c.x += (n.x - c.x) / ++c._count)
          );
          bottomLayer.forEach((n) => delete n._count);
        }
        let epsilon = 1e-60;
        let tmpa;
        let tmpb;
        do {
          epsilon += epsilon;
          tmpa = 1 + 0.1 * epsilon;
          tmpb = 1 + 0.2 * epsilon;
        } while (tmpa <= 1 || tmpb <= 1);
        var vsmall = epsilon;
        function dpori(a, lda, n) {
          let kp1, t;
          for (let k = 1; k <= n; k += 1) {
            a[k][k] = 1 / a[k][k];
            t = -a[k][k];
            for (let i = 1; i < k; i += 1) {
              a[i][k] *= t;
            }
            kp1 = k + 1;
            if (n < kp1) {
              break;
            }
            for (let j = kp1; j <= n; j += 1) {
              t = a[k][j];
              a[k][j] = 0;
              for (let i = 1; i <= k; i += 1) {
                a[i][j] += t * a[i][k];
              }
            }
          }
        }
        var dpori_1 = dpori;
        function dposl(a, lda, n, b) {
          let k, t;
          for (k = 1; k <= n; k += 1) {
            t = 0;
            for (let i = 1; i < k; i += 1) {
              t += a[i][k] * b[i];
            }
            b[k] = (b[k] - t) / a[k][k];
          }
          for (let kb = 1; kb <= n; kb += 1) {
            k = n + 1 - kb;
            b[k] /= a[k][k];
            t = -b[k];
            for (let i = 1; i < k; i += 1) {
              b[i] += t * a[i][k];
            }
          }
        }
        var dposl_1 = dposl;
        function dpofa(a, lda, n, info2) {
          let jm1, t, s;
          for (let j = 1; j <= n; j += 1) {
            info2[1] = j;
            s = 0;
            jm1 = j - 1;
            if (jm1 < 1) {
              s = a[j][j] - s;
              if (s <= 0) {
                break;
              }
              a[j][j] = Math.sqrt(s);
            } else {
              for (let k = 1; k <= jm1; k += 1) {
                t = a[k][j];
                for (let i = 1; i < k; i += 1) {
                  t -= a[i][j] * a[i][k];
                }
                t /= a[k][k];
                a[k][j] = t;
                s += t * t;
              }
              s = a[j][j] - s;
              if (s <= 0) {
                break;
              }
              a[j][j] = Math.sqrt(s);
            }
            info2[1] = 0;
          }
        }
        var dpofa_1 = dpofa;
        function qpgen2(dmat, dvec, fddmat, n, sol, lagr, crval, amat, bvec, fdamat, q, meq, iact, nnact = 0, iter, work, ierr) {
          let l1, it1, nvl, nact, temp, sum2, t1, tt, gc, gs, nu, t1inf, t2min, go;
          const r = Math.min(n, q);
          let l = 2 * n + r * (r + 5) / 2 + 2 * q + 1;
          for (let i = 1; i <= n; i += 1) {
            work[i] = dvec[i];
          }
          for (let i = n + 1; i <= l; i += 1) {
            work[i] = 0;
          }
          for (let i = 1; i <= q; i += 1) {
            iact[i] = 0;
            lagr[i] = 0;
          }
          const info2 = [];
          if (ierr[1] === 0) {
            dpofa_1(dmat, fddmat, n, info2);
            if (info2[1] !== 0) {
              ierr[1] = 2;
              return;
            }
            dposl_1(dmat, fddmat, n, dvec);
            dpori_1(dmat, fddmat, n);
          } else {
            for (let j = 1; j <= n; j += 1) {
              sol[j] = 0;
              for (let i = 1; i <= j; i += 1) {
                sol[j] += dmat[i][j] * dvec[i];
              }
            }
            for (let j = 1; j <= n; j += 1) {
              dvec[j] = 0;
              for (let i = j; i <= n; i += 1) {
                dvec[j] += dmat[j][i] * sol[i];
              }
            }
          }
          crval[1] = 0;
          for (let j = 1; j <= n; j += 1) {
            sol[j] = dvec[j];
            crval[1] += work[j] * sol[j];
            work[j] = 0;
            for (let i = j + 1; i <= n; i += 1) {
              dmat[i][j] = 0;
            }
          }
          crval[1] = -crval[1] / 2;
          ierr[1] = 0;
          const iwzv = n;
          const iwrv = iwzv + n;
          const iwuv = iwrv + r;
          const iwrm = iwuv + r + 1;
          const iwsv = iwrm + r * (r + 1) / 2;
          const iwnbv = iwsv + q;
          for (let i = 1; i <= q; i += 1) {
            sum2 = 0;
            for (let j = 1; j <= n; j += 1) {
              sum2 += amat[j][i] * amat[j][i];
            }
            work[iwnbv + i] = Math.sqrt(sum2);
          }
          nact = nnact;
          iter[1] = 0;
          iter[2] = 0;
          function fnGoto50() {
            iter[1] += 1;
            l = iwsv;
            for (let i = 1; i <= q; i += 1) {
              l += 1;
              sum2 = -bvec[i];
              for (let j = 1; j <= n; j += 1) {
                sum2 += amat[j][i] * sol[j];
              }
              if (Math.abs(sum2) < vsmall) {
                sum2 = 0;
              }
              if (i > meq) {
                work[l] = sum2;
              } else {
                work[l] = -Math.abs(sum2);
                if (sum2 > 0) {
                  for (let j = 1; j <= n; j += 1) {
                    amat[j][i] = -amat[j][i];
                  }
                  bvec[i] = -bvec[i];
                }
              }
            }
            for (let i = 1; i <= nact; i += 1) {
              work[iwsv + iact[i]] = 0;
            }
            nvl = 0;
            temp = 0;
            for (let i = 1; i <= q; i += 1) {
              if (work[iwsv + i] < temp * work[iwnbv + i]) {
                nvl = i;
                temp = work[iwsv + i] / work[iwnbv + i];
              }
            }
            if (nvl === 0) {
              for (let i = 1; i <= nact; i += 1) {
                lagr[iact[i]] = work[iwuv + i];
              }
              return 999;
            }
            return 0;
          }
          function fnGoto55() {
            for (let i = 1; i <= n; i += 1) {
              sum2 = 0;
              for (let j = 1; j <= n; j += 1) {
                sum2 += dmat[j][i] * amat[j][nvl];
              }
              work[i] = sum2;
            }
            l1 = iwzv;
            for (let i = 1; i <= n; i += 1) {
              work[l1 + i] = 0;
            }
            for (let j = nact + 1; j <= n; j += 1) {
              for (let i = 1; i <= n; i += 1) {
                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
              }
            }
            t1inf = true;
            for (let i = nact; i >= 1; i -= 1) {
              sum2 = work[i];
              l = iwrm + i * (i + 3) / 2;
              l1 = l - i;
              for (let j = i + 1; j <= nact; j += 1) {
                sum2 -= work[l] * work[iwrv + j];
                l += j;
              }
              sum2 /= work[l1];
              work[iwrv + i] = sum2;
              if (iact[i] <= meq) {
                continue;
              }
              if (sum2 <= 0) {
                continue;
              }
              t1inf = false;
              it1 = i;
            }
            if (!t1inf) {
              t1 = work[iwuv + it1] / work[iwrv + it1];
              for (let i = 1; i <= nact; i += 1) {
                if (iact[i] <= meq) {
                  continue;
                }
                if (work[iwrv + i] <= 0) {
                  continue;
                }
                temp = work[iwuv + i] / work[iwrv + i];
                if (temp < t1) {
                  t1 = temp;
                  it1 = i;
                }
              }
            }
            sum2 = 0;
            for (let i = iwzv + 1; i <= iwzv + n; i += 1) {
              sum2 += work[i] * work[i];
            }
            if (Math.abs(sum2) <= vsmall) {
              if (t1inf) {
                ierr[1] = 1;
                return 999;
              }
              for (let i = 1; i <= nact; i += 1) {
                work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
              }
              work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
              return 700;
            }
            sum2 = 0;
            for (let i = 1; i <= n; i += 1) {
              sum2 += work[iwzv + i] * amat[i][nvl];
            }
            tt = -work[iwsv + nvl] / sum2;
            t2min = true;
            if (!t1inf) {
              if (t1 < tt) {
                tt = t1;
                t2min = false;
              }
            }
            for (let i = 1; i <= n; i += 1) {
              sol[i] += tt * work[iwzv + i];
              if (Math.abs(sol[i]) < vsmall) {
                sol[i] = 0;
              }
            }
            crval[1] += tt * sum2 * (tt / 2 + work[iwuv + nact + 1]);
            for (let i = 1; i <= nact; i += 1) {
              work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;
            if (t2min) {
              nact += 1;
              iact[nact] = nvl;
              l = iwrm + (nact - 1) * nact / 2 + 1;
              for (let i = 1; i <= nact - 1; i += 1) {
                work[l] = work[i];
                l += 1;
              }
              if (nact === n) {
                work[l] = work[n];
              } else {
                for (let i = n; i >= nact + 1; i -= 1) {
                  if (work[i] === 0) {
                    continue;
                  }
                  gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                  gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                  if (work[i - 1] >= 0) {
                    temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                  } else {
                    temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
                  }
                  gc = work[i - 1] / temp;
                  gs = work[i] / temp;
                  if (gc === 1) {
                    continue;
                  }
                  if (gc === 0) {
                    work[i - 1] = gs * temp;
                    for (let j = 1; j <= n; j += 1) {
                      temp = dmat[j][i - 1];
                      dmat[j][i - 1] = dmat[j][i];
                      dmat[j][i] = temp;
                    }
                  } else {
                    work[i - 1] = temp;
                    nu = gs / (1 + gc);
                    for (let j = 1; j <= n; j += 1) {
                      temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
                      dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
                      dmat[j][i - 1] = temp;
                    }
                  }
                }
                work[l] = work[nact];
              }
            } else {
              sum2 = -bvec[nvl];
              for (let j = 1; j <= n; j += 1) {
                sum2 += sol[j] * amat[j][nvl];
              }
              if (nvl > meq) {
                work[iwsv + nvl] = sum2;
              } else {
                work[iwsv + nvl] = -Math.abs(sum2);
                if (sum2 > 0) {
                  for (let j = 1; j <= n; j += 1) {
                    amat[j][nvl] = -amat[j][nvl];
                  }
                  bvec[nvl] = -bvec[nvl];
                }
              }
              return 700;
            }
            return 0;
          }
          function fnGoto797() {
            l = iwrm + it1 * (it1 + 1) / 2 + 1;
            l1 = l + it1;
            if (work[l1] === 0) {
              return 798;
            }
            gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
            gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
            if (work[l1 - 1] >= 0) {
              temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
            } else {
              temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
            }
            gc = work[l1 - 1] / temp;
            gs = work[l1] / temp;
            if (gc === 1) {
              return 798;
            }
            if (gc === 0) {
              for (let i = it1 + 1; i <= nact; i += 1) {
                temp = work[l1 - 1];
                work[l1 - 1] = work[l1];
                work[l1] = temp;
                l1 += i;
              }
              for (let i = 1; i <= n; i += 1) {
                temp = dmat[i][it1];
                dmat[i][it1] = dmat[i][it1 + 1];
                dmat[i][it1 + 1] = temp;
              }
            } else {
              nu = gs / (1 + gc);
              for (let i = it1 + 1; i <= nact; i += 1) {
                temp = gc * work[l1 - 1] + gs * work[l1];
                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
                work[l1 - 1] = temp;
                l1 += i;
              }
              for (let i = 1; i <= n; i += 1) {
                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
                dmat[i][it1] = temp;
              }
            }
            return 0;
          }
          function fnGoto798() {
            l1 = l - it1;
            for (let i = 1; i <= it1; i += 1) {
              work[l1] = work[l];
              l += 1;
              l1 += 1;
            }
            work[iwuv + it1] = work[iwuv + it1 + 1];
            iact[it1] = iact[it1 + 1];
            it1 += 1;
            if (it1 < nact) {
              return 797;
            }
            return 0;
          }
          function fnGoto799() {
            work[iwuv + nact] = work[iwuv + nact + 1];
            work[iwuv + nact + 1] = 0;
            iact[nact] = 0;
            nact -= 1;
            iter[2] += 1;
            return 0;
          }
          go = 0;
          while (true) {
            go = fnGoto50();
            if (go === 999) {
              return;
            }
            while (true) {
              go = fnGoto55();
              if (go === 0) {
                break;
              }
              if (go === 999) {
                return;
              }
              if (go === 700) {
                if (it1 === nact) {
                  fnGoto799();
                } else {
                  while (true) {
                    fnGoto797();
                    go = fnGoto798();
                    if (go !== 797) {
                      break;
                    }
                  }
                  fnGoto799();
                }
              }
            }
          }
        }
        var qpgen2_1 = qpgen2;
        function solveQP(Dmat, dvec, Amat, bvec = [], meq = 0, factorized = [0, 0]) {
          const crval = [];
          const iact = [];
          const sol = [];
          const lagr = [];
          const work = [];
          const iter = [];
          let message = "";
          const n = Dmat.length - 1;
          const q = Amat[1].length - 1;
          if (!bvec) {
            for (let i = 1; i <= q; i += 1) {
              bvec[i] = 0;
            }
          }
          if (n !== Dmat[1].length - 1) {
            message = "Dmat is not symmetric!";
          }
          if (n !== dvec.length - 1) {
            message = "Dmat and dvec are incompatible!";
          }
          if (n !== Amat.length - 1) {
            message = "Amat and dvec are incompatible!";
          }
          if (q !== bvec.length - 1) {
            message = "Amat and bvec are incompatible!";
          }
          if (meq > q || meq < 0) {
            message = "Value of meq is invalid!";
          }
          if (message !== "") {
            return {
              message
            };
          }
          for (let i = 1; i <= q; i += 1) {
            iact[i] = 0;
            lagr[i] = 0;
          }
          const nact = 0;
          const r = Math.min(n, q);
          for (let i = 1; i <= n; i += 1) {
            sol[i] = 0;
          }
          crval[1] = 0;
          for (let i = 1; i <= 2 * n + r * (r + 5) / 2 + 2 * q + 1; i += 1) {
            work[i] = 0;
          }
          for (let i = 1; i <= 2; i += 1) {
            iter[i] = 0;
          }
          qpgen2_1(Dmat, dvec, n, n, sol, lagr, crval, Amat, bvec, n, q, meq, iact, nact, iter, work, factorized);
          if (factorized[1] === 1) {
            message = "constraints are inconsistent, no solution!";
          }
          if (factorized[1] === 2) {
            message = "matrix D in quadratic function is not positive definite!";
          }
          return {
            solution: sol,
            Lagrangian: lagr,
            value: crval,
            unconstrained_solution: dvec,
            // eslint-disable-line camelcase
            iterations: iter,
            iact,
            message
          };
        }
        var solveQP_1 = solveQP;
        var quadprog = {
          solveQP: solveQP_1
        };
        const { solveQP: solveQP$1 } = quadprog;
        var wrapper = function(qmat, cvec, amat, bvec, meq = 0, factorized = false) {
          const Dmat = [null].concat(qmat.map((row) => [null].concat(row)));
          const dvec = [null].concat(cvec.map((v) => -v));
          const Amat = [null].concat(amat.length === 0 ? new Array(qmat.length).fill([null]) : amat[0].map((_, i) => [null].concat(amat.map((row) => -row[i]))));
          const bvecp = [null].concat(bvec.map((v) => -v));
          const {
            solution,
            Lagrangian: lagrangian,
            value: boxedVal,
            unconstrained_solution: unconstrained,
            iterations: iters,
            iact,
            message
          } = solveQP$1(Dmat, dvec, Amat, bvecp, meq, [, +factorized]);
          if (message.length > 0) {
            throw new Error(message);
          } else {
            solution.shift();
            lagrangian.shift();
            unconstrained.shift();
            iact.push(0);
            const active = iact.slice(1, iact.indexOf(0)).map((v) => v - 1);
            const [, value] = boxedVal;
            const [, iterations, inactive] = iters;
            return {
              solution,
              lagrangian,
              unconstrained,
              iterations,
              inactive,
              active,
              value
            };
          }
        };
        var quadprogJs = wrapper;
        function indices(layers) {
          const inds = {};
          let i = 0;
          layers.forEach((layer) => layer.forEach((n) => inds[n.id] = i++));
          return inds;
        }
        function sep(layers, inds, separation) {
          const n = 1 + Math.max(...Object.values(inds));
          const A = [];
          const b = [];
          layers.forEach(
            (layer) => layer.slice(0, layer.length - 1).forEach((first, i) => {
              const second = layer[i + 1];
              const find2 = inds[first.id];
              const sind = inds[second.id];
              const cons = new Array(n).fill(0);
              cons[find2] = 1;
              cons[sind] = -1;
              A.push(cons);
              b.push(-separation(first, second));
            })
          );
          return [A, b];
        }
        function minDist(Q, pind, cind, coef) {
          Q[cind][cind] += coef;
          Q[cind][pind] -= coef;
          Q[pind][cind] -= coef;
          Q[pind][pind] += coef;
        }
        function minBend(Q, pind, nind, cind, coef) {
          Q[cind][cind] += coef;
          Q[cind][nind] -= 2 * coef;
          Q[cind][pind] += coef;
          Q[nind][cind] -= 2 * coef;
          Q[nind][nind] += 4 * coef;
          Q[nind][pind] -= 2 * coef;
          Q[pind][cind] += coef;
          Q[pind][nind] -= 2 * coef;
          Q[pind][pind] += coef;
        }
        function solve(Q, c, A, b, meq = 0) {
          c.pop();
          Q.pop();
          Q.forEach((row) => row.pop());
          A.forEach((row) => row.pop());
          const { solution } = quadprogJs(Q, c, A, b, meq);
          solution.push(0);
          return solution;
        }
        function layout(layers, inds, solution) {
          const min2 = Math.min(...solution);
          const span = Math.max(...solution) - min2;
          layers.forEach(
            (layer) => layer.forEach((n) => n.x = (solution[inds[n.id]] - min2) / span)
          );
        }
        function checkWeight(weight) {
          if (weight < 0 || weight >= 1) {
            throw new Error(`weight must be in [0, 1), but was ${weight}`);
          } else {
            return weight;
          }
        }
        function minCurve() {
          let weight = 0.5;
          function coordMinCurve(layers, separation) {
            const inds = indices(layers);
            const n = Object.keys(inds).length;
            const [A, b] = sep(layers, inds, separation);
            const c = new Array(n).fill(0);
            const Q = new Array(n).fill(null).map(() => new Array(n).fill(0));
            layers.forEach(
              (layer) => layer.forEach((parent) => {
                const pind = inds[parent.id];
                parent.children.forEach((child) => {
                  const cind = inds[child.id];
                  minDist(Q, pind, cind, 1 - weight);
                });
              })
            );
            layers.forEach(
              (layer) => layer.forEach((parent) => {
                const pind = inds[parent.id];
                parent.children.forEach((node) => {
                  const nind = inds[node.id];
                  node.children.forEach((child) => {
                    const cind = inds[child.id];
                    minBend(Q, pind, nind, cind, weight);
                  });
                });
              })
            );
            const solution = solve(Q, c, A, b);
            layout(layers, inds, solution);
            return layers;
          }
          coordMinCurve.weight = function(x) {
            return arguments.length ? (weight = checkWeight(x), coordMinCurve) : weight;
          };
          return coordMinCurve;
        }
        function topological() {
          function coordTopological(layers, separation) {
            if (!layers.every((layer) => 1 === layer.reduce((c2, n2) => c2 + !!n2.data, 0))) {
              throw new Error(
                "coordTopological() only works with a topological ordering"
              );
            }
            const inds = {};
            let i = 0;
            layers.forEach(
              (layer) => layer.forEach((n2) => n2.data || (inds[n2.id] = i++))
            );
            layers.forEach(
              (layer) => layer.forEach((n2) => inds[n2.id] === void 0 && (inds[n2.id] = i))
            );
            const n = ++i;
            const [A, b] = sep(layers, inds, separation);
            const c = new Array(n).fill(0);
            const Q = new Array(n).fill(null).map(() => new Array(n).fill(0));
            layers.forEach(
              (layer) => layer.forEach((parent) => {
                const pind = inds[parent.id];
                parent.children.forEach((node) => {
                  if (!node.data) {
                    const nind = inds[node.id];
                    node.children.forEach((child) => {
                      const cind = inds[child.id];
                      minBend(Q, pind, nind, cind, 1);
                    });
                  }
                });
              })
            );
            const solution = solve(Q, c, A, b);
            layout(layers, inds, solution);
            return layers;
          }
          return coordTopological;
        }
        function vert() {
          function coordVert2(layers, separation) {
            const inds = indices(layers);
            const n = Object.keys(inds).length;
            const [A, b] = sep(layers, inds, separation);
            const c = new Array(n).fill(0);
            const Q = new Array(n).fill(null).map(() => new Array(n).fill(0));
            layers.forEach(
              (layer) => layer.forEach((parent) => {
                const pind = inds[parent.id];
                parent.children.forEach((child) => {
                  const cind = inds[child.id];
                  if (parent.data) {
                    minDist(Q, pind, cind, 1);
                  }
                  if (child.data) {
                    minDist(Q, pind, cind, 1);
                  }
                });
              })
            );
            layers.forEach(
              (layer) => layer.forEach((parent) => {
                const pind = inds[parent.id];
                parent.children.forEach((node) => {
                  if (!node.data) {
                    const nind = inds[node.id];
                    node.children.forEach((child) => {
                      const cind = inds[child.id];
                      minBend(Q, pind, nind, cind, 1);
                    });
                  }
                });
              })
            );
            const solution = solve(Q, c, A, b);
            layout(layers, inds, solution);
            return layers;
          }
          return coordVert2;
        }
        function column2CoordRect() {
          function coordSpread(layers, columnWidthFunction, columnSeparationFunction) {
            const maxColumns = Math.max(
              ...layers.map(
                (layer) => Math.max(...layer.map((node) => node.columnIndex + 1))
              )
            );
            let columnWidth = Array.from(Array(maxColumns).keys()).map((_, index2) => index2).map(columnWidthFunction);
            let columnSeparation = Array.from(Array(maxColumns).keys()).map((_, index2) => index2).map(columnSeparationFunction);
            const maxWidth = Math.max(
              ...layers.map((layer) => {
                layer.forEach((node) => {
                  node.x0 = getColumnStartCoordinate(
                    columnWidth,
                    columnSeparation,
                    node.columnIndex
                  );
                  node.x1 = node.x0 + columnWidth[node.columnIndex];
                });
                return Math.max(...layer.map((node) => node.x1));
              })
            );
            layers.forEach((layer) => {
              layer.forEach((node) => {
                node.x0 = node.x0 / maxWidth;
                node.x1 = node.x1 / maxWidth;
              });
            });
            return layers;
          }
          return coordSpread;
          function getColumnStartCoordinate(columnWidth, columnSeparation, columnIndex) {
            let leadingColumnWidths = columnWidth.filter(
              (_, index2) => index2 < columnIndex
            );
            let leadingColumnSeparations = columnSeparation.filter(
              (_, index2) => index2 < columnIndex
            );
            return leadingColumnWidths.concat(leadingColumnSeparations).reduce((prevVal, currentVal) => prevVal + currentVal, 0);
          }
        }
        function simpleLeft() {
          function columnIndexAssignmentLeftToRight(layers) {
            layers.forEach((layer) => {
              layer.forEach((node, nodeIndex) => node.columnIndex = nodeIndex);
            });
          }
          return columnIndexAssignmentLeftToRight;
        }
        function simpleCenter() {
          function columnIndexAssignmentCenter(layers) {
            const maxNodesPerLayer = Math.max(...layers.map((layer) => layer.length));
            layers.forEach((layer) => {
              const nodesInLayer = layer.length;
              const startColumnIndex = Math.floor(
                (maxNodesPerLayer - nodesInLayer) / 2
              );
              layer.forEach(
                (node, nodeIndex) => node.columnIndex = startColumnIndex + nodeIndex
              );
            });
          }
          return columnIndexAssignmentCenter;
        }
        function adjacent() {
          let center2 = false;
          function columnIndexAssignmentAdjacent(layers) {
            if (layers.length == 0) {
              return;
            }
            const maxNodesCount = Math.max(...layers.map((layer) => layer.length));
            const maxNodesLayerIndex = layers.findIndex(
              (layer) => layer.length === maxNodesCount
            );
            layers[maxNodesLayerIndex].forEach(
              (node, index2) => node.columnIndex = index2
            );
            for (let i = maxNodesLayerIndex - 1; i >= 0; i--) {
              fillLayerBackwards(layers[i]);
            }
            for (let i = maxNodesLayerIndex + 1; i < layers.length; i++) {
              fillLayerForward(layers[i]);
            }
            function fillLayerBackwards(layer) {
              let actualColumnIndices;
              if (layer.length === maxNodesCount) {
                actualColumnIndices = layer.map((_, index2) => index2);
              } else {
                const desiredColumnIndices = layer.map((node, index2) => {
                  if (node.children == null || node.children.length === 0) {
                    return index2;
                  }
                  const childrenColumnIndices = node.children.map(
                    (child) => child.columnIndex
                  );
                  if (center2) {
                    return childrenColumnIndices[Math.floor((childrenColumnIndices.length - 1) / 2)];
                  } else {
                    return Math.min(...childrenColumnIndices);
                  }
                });
                actualColumnIndices = optimizeColumnIndices(desiredColumnIndices);
              }
              layer.forEach(
                (node, index2) => node.columnIndex = actualColumnIndices[index2]
              );
            }
            function fillLayerForward(layer) {
              let actualColumnIndices;
              if (layer.length === maxNodesCount) {
                actualColumnIndices = layer.map((_, index2) => index2);
              } else {
                const desiredColumnIndices = layer.map((node, index2) => {
                  if (node.parents == null || node.parents.length === 0) {
                    return index2;
                  }
                  const parentColumnIndices = node.parents.map(
                    (parent) => parent.columnIndex
                  );
                  if (center2) {
                    return parentColumnIndices[Math.floor((parentColumnIndices.length - 1) / 2)];
                  } else {
                    return Math.min(...parentColumnIndices);
                  }
                });
                actualColumnIndices = optimizeColumnIndices(desiredColumnIndices);
              }
              layer.forEach(
                (node, index2) => node.columnIndex = actualColumnIndices[index2]
              );
            }
            function optimizeColumnIndices(desiredColumnIndices) {
              if (!desiredColumnIndices.every((columnIndex) => isFinite(columnIndex))) {
                throw `columnComplex: non-finite column index encountered`;
              }
              let largestIndex = -1;
              desiredColumnIndices = desiredColumnIndices.map((columnIndex) => {
                if (columnIndex <= largestIndex) {
                  columnIndex = largestIndex + 1;
                }
                largestIndex = columnIndex;
                return columnIndex;
              });
              const max2 = Math.max(...desiredColumnIndices);
              const downShift = max2 - (maxNodesCount - 1);
              if (downShift > 0) {
                desiredColumnIndices = desiredColumnIndices.map(
                  (columnIndex, index2) => Math.max(columnIndex - downShift, index2)
                );
              }
              return desiredColumnIndices;
            }
          }
          columnIndexAssignmentAdjacent.center = function(x) {
            return arguments.length ? (center2 = x, columnIndexAssignmentAdjacent) : center2;
          };
          return columnIndexAssignmentAdjacent;
        }
        function complex() {
          let center2 = false;
          function columnIndexAssignmentSubtree(layers) {
            if (layers.length == 0) {
              return;
            }
            let roots2 = [];
            layers.forEach(
              (layer) => layer.forEach((node) => {
                if (node.parents == null || node.parents.length === 0) {
                  roots2.push(node);
                }
              })
            );
            let startColumnIndex = 0;
            roots2.forEach((node) => {
              const subtreeWidth = getSubtreeWidth(node);
              node.columnIndex = startColumnIndex + (center2 ? Math.floor((subtreeWidth - 1) / 2) : 0);
              assignColumnIndexToChildren(node, startColumnIndex);
              startColumnIndex += subtreeWidth;
            });
            function getSubtreeWidth(node) {
              if (node.children.length === 0) {
                return 1;
              }
              return node.children.reduce(
                (prevVal, child) => prevVal + getSubtreeWidth(child),
                0
              );
            }
            function assignColumnIndexToChildren(node, startColumnIndex2) {
              const widthPerChild = node.children.map(getSubtreeWidth);
              let childColumnIndex = startColumnIndex2;
              node.children.forEach((child, index2) => {
                if (child.columnIndex !== void 0) {
                  return;
                }
                child.columnIndex = childColumnIndex + (center2 ? Math.floor((widthPerChild[index2] - 1) / 2) : 0);
                assignColumnIndexToChildren(child, childColumnIndex);
                childColumnIndex += widthPerChild[index2];
              });
            }
          }
          columnIndexAssignmentSubtree.center = function(x) {
            return arguments.length ? (center2 = x, columnIndexAssignmentSubtree) : center2;
          };
          return columnIndexAssignmentSubtree;
        }
        function childLinks() {
          const links2 = [];
          this.eachChildLinks((l) => links2.push(l));
          return links2;
        }
        function count() {
          this.eachAfter((node) => {
            if (node.children.length) {
              node._leaves = Object.assign({}, ...node.children.map((c) => c._leaves));
              node.value = Object.keys(node._leaves).length;
            } else {
              node._leaves = { [node.id]: true };
              node.value = 1;
            }
          });
          this.each((n) => delete n._leaves);
          return this;
        }
        function connected() {
          if (this.id !== void 0) {
            return true;
          }
          const rootsSpan = this.roots().map((r) => r.descendants().map((n) => n.id));
          const reached = rootsSpan.map(() => false);
          const queue = [reached.length - 1];
          while (queue.length) {
            const i = queue.pop();
            if (reached[i]) {
              continue;
            }
            const spanMap = {};
            reached[i] = true;
            rootsSpan[i].forEach((n) => spanMap[n] = true);
            rootsSpan.forEach((span, j) => {
              if (span.some((n) => spanMap[n])) {
                queue.push(j);
              }
            });
          }
          return reached.every((b) => b);
        }
        function depth() {
          this.each((n) => {
            n.children.forEach((c) => (c._parents || (c._parents = [])).push(n));
          });
          this.eachBefore((n) => {
            n.value = Math.max(0, ...(n._parents || []).map((c) => 1 + c.value));
          });
          this.each((n) => delete n._parents);
          return this;
        }
        function descendants() {
          const descs = [];
          this.each((n) => descs.push(n));
          return descs;
        }
        function eachAfter(func) {
          const all = [];
          this.eachBefore((n) => all.push(n));
          all.reverse().forEach(func);
          return this;
        }
        function eachBefore(func) {
          this.each((n) => n._num_before = 0);
          this.each((n) => n.children.forEach((c) => ++c._num_before));
          const queue = this.roots();
          let node;
          let i = 0;
          while (node = queue.pop()) {
            func(node, i++);
            node.children.forEach((n) => --n._num_before || queue.push(n));
          }
          this.each((n) => delete n._num_before);
          return this;
        }
        function eachBreadth(func) {
          const seen = {};
          let current = [];
          let next = this.roots();
          let i = 0;
          do {
            current = next.reverse();
            next = [];
            let node;
            while (node = current.pop()) {
              if (!seen[node.id]) {
                seen[node.id] = true;
                func(node, i++);
                next.push(...node.children);
              }
            }
          } while (next.length);
        }
        function eachChildLinks(func) {
          if (this.id !== void 0) {
            let i = 0;
            this.children.forEach(
              (c, j) => func(
                {
                  source: this,
                  target: c,
                  data: this._childLinkData[j]
                },
                i++
              )
            );
          }
          return this;
        }
        function eachDepth(func) {
          const queue = this.roots();
          const seen = {};
          let node;
          let i = 0;
          while (node = queue.pop()) {
            if (!seen[node.id]) {
              seen[node.id] = true;
              func(node, i++);
              queue.push(...node.children);
            }
          }
          return this;
        }
        function eachLinks(func) {
          let i = 0;
          this.each((n) => n.eachChildLinks((l) => func(l, i++)));
          return this;
        }
        function toSet(arr) {
          const set3 = {};
          arr.forEach((e) => set3[e] = true);
          return set3;
        }
        function info(root2) {
          const info2 = {};
          root2.each(
            (node) => info2[node.id] = [node.data, toSet(node.children.map((n) => n.id))]
          );
          return info2;
        }
        function setEqual(a, b) {
          return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((k) => b[k]);
        }
        function equals(that) {
          const thisInfo = info(this);
          const thatInfo = info(that);
          return Object.keys(thisInfo).length === Object.keys(thatInfo).length && Object.entries(thisInfo).every(([nid, [thisData, thisChildren]]) => {
            const val = thatInfo[nid];
            if (!val)
              return false;
            const [thatData, thatChildren] = val;
            return thisData === thatData && setEqual(thisChildren, thatChildren);
          });
        }
        const sentinel = {};
        function every(func) {
          try {
            this.each((n, i) => {
              if (!func(n, i)) {
                throw sentinel;
              }
            });
          } catch (err) {
            if (err === sentinel) {
              return false;
            } else {
              throw err;
            }
          }
          return true;
        }
        function height() {
          return this.eachAfter(
            (n) => n.value = Math.max(0, ...n.children.map((c) => 1 + c.value))
          );
        }
        function links() {
          const links2 = [];
          this.eachLinks((l) => links2.push(l));
          return links2;
        }
        function reduce(func, start2) {
          let accum = start2;
          this.each((n, i) => {
            accum = func(accum, n, i);
          });
          return accum;
        }
        function roots() {
          return this.id === void 0 ? this.children.slice() : [this];
        }
        function size() {
          return this.reduce((a) => a + 1, 0);
        }
        const sentinel$1 = {};
        function some(func) {
          try {
            this.each((n) => {
              if (func(n)) {
                throw sentinel$1;
              }
            });
          } catch (err) {
            if (err === sentinel$1) {
              return true;
            } else {
              throw err;
            }
          }
          return false;
        }
        function sum(func) {
          this.eachAfter((node, i) => {
            const val = +func(node.data, i);
            node._descendants = Object.assign(
              { [node.id]: val },
              ...node.children.map((c) => c._descendants)
            );
            node.value = Object.values(node._descendants).reduce((a, b) => a + b);
          });
          this.each((n) => delete n._descendants);
          return this;
        }
        function Node(id2, data) {
          this.id = id2;
          this.data = data;
          this.children = [];
          this._childLinkData = [];
        }
        function copy() {
          const nodes = [];
          const cnodes = [];
          const mapping = {};
          this.each((node) => {
            nodes.push(node);
            const cnode = new Node(node.id, node.data);
            cnodes.push(cnode);
            mapping[cnode.id] = cnode;
          });
          cnodes.forEach((cnode, i) => {
            const node = nodes[i];
            cnode.children = node.children.map((c) => mapping[c.id]);
          });
          if (this.id === void 0) {
            const root2 = new Node(void 0, void 0);
            root2.children = this.children.map((c) => mapping[c.id]);
          } else {
            return mapping[this.id];
          }
        }
        function reverse() {
          const nodes = [];
          const cnodes = [];
          const mapping = {};
          const root2 = new Node(void 0, void 0);
          this.each((node) => {
            nodes.push(node);
            const cnode = new Node(node.id, node.data);
            cnodes.push(cnode);
            mapping[cnode.id] = cnode;
            if (!node.children.length) {
              root2.children.push(cnode);
            }
          });
          cnodes.forEach((cnode, i) => {
            const node = nodes[i];
            node.children.map((c, j) => {
              const cc = mapping[c.id];
              cc.children.push(cnode);
              cc._childLinkData.push(node._childLinkData[j]);
            });
          });
          return root2.children.length > 1 ? root2 : root2.children[0];
        }
        Node.prototype = {
          constructor: Node,
          childLinks,
          copy,
          count,
          connected,
          depth,
          descendants,
          each: eachDepth,
          eachAfter,
          eachBefore,
          eachBreadth,
          eachChildLinks,
          eachLinks,
          equals,
          every,
          height,
          links,
          reduce,
          reverse,
          roots,
          size,
          some,
          sum
        };
        function verify(root2) {
          if (root2.id !== void 0)
            throw new Error("invalid format for verification");
          if (!root2.children.length)
            throw new Error("no roots");
          const seen = {};
          const past = {};
          let rec = void 0;
          function visit(node) {
            if (seen[node.id]) {
              return false;
            } else if (past[node.id]) {
              rec = node.id;
              return [node.id];
            } else {
              past[node.id] = true;
              let result = node.children.reduce((chain, c) => chain || visit(c), false);
              delete past[node.id];
              seen[node.id] = true;
              if (result && rec)
                result.push(node.id);
              if (rec === node.id)
                rec = void 0;
              return result;
            }
          }
          const msg = root2.id === void 0 ? root2.children.reduce((msg2, r) => msg2 || visit(r), false) : visit(root2);
          if (msg)
            throw new Error("dag contained a cycle: " + msg.reverse().join(" -> "));
          root2.each((node) => {
            if (node.id.indexOf("\0") >= 0)
              throw new Error("node id contained null character");
            if (!node.data)
              throw new Error("node contained falsy data");
          });
          if (root2.links().some(({ data }) => !data))
            throw new Error("dag had falsy link data");
        }
        function dagStratify() {
          if (arguments.length) {
            throw Error(
              `got arguments to dagStratify(${arguments}), but constructor takes no aruguments. These were probably meant as data which should be called as dagStratify()(...)`
            );
          }
          let id2 = defaultId;
          let parentIds = defaultParentIds;
          let linkData = defaultLinkData;
          function dagStratify2(data) {
            if (!data.length)
              throw new Error("can't stratify empty data");
            const nodes = data.map((datum2, i) => {
              const nid = id2(datum2, i);
              try {
                return new Node(nid.toString(), datum2);
              } catch (TypeError2) {
                throw Error(`node ids must have toString but got ${nid} from ${datum2}`);
              }
            });
            const mapping = {};
            nodes.forEach((node) => {
              if (mapping[node.id]) {
                throw new Error("found a duplicate id: " + node.id);
              } else {
                mapping[node.id] = node;
              }
            });
            const root2 = new Node(void 0, void 0);
            nodes.forEach((node) => {
              const pids = parentIds(node.data) || [];
              pids.forEach((pid) => {
                const parent = mapping[pid];
                if (!parent)
                  throw new Error("missing id: " + pid);
                parent.children.push(node);
                parent._childLinkData.push(linkData(parent.data, node.data));
                return parent;
              });
              if (!pids.length) {
                root2.children.push(node);
              }
            });
            verify(root2);
            return root2.children.length > 1 ? root2 : root2.children[0];
          }
          dagStratify2.id = function(x) {
            return arguments.length ? (id2 = x, dagStratify2) : id2;
          };
          dagStratify2.parentIds = function(x) {
            return arguments.length ? (parentIds = x, dagStratify2) : parentIds;
          };
          dagStratify2.linkData = function(x) {
            return arguments.length ? (linkData = x, dagStratify2) : linkData;
          };
          return dagStratify2;
        }
        function defaultId(d) {
          return d.id;
        }
        function defaultParentIds(d) {
          return d.parentIds;
        }
        function defaultLinkData() {
          return {};
        }
        function connect() {
          if (arguments.length) {
            throw Error(
              `got arguments to dagConnect(${arguments}), but constructor takes no aruguments. These were probably meant as data which should be called as dagConnect()(...)`
            );
          }
          let sourceAccessor = defaultSource;
          let targetAccessor = defaultTarget;
          let linkData = defaultLinkData$1;
          function stratifyLinkData(parent, child) {
            return linkData(child.linkData[parent.id]);
          }
          function dagConnect2(data) {
            if (!data.length)
              throw new Error("can't create graph from empty data");
            const keyedData = {};
            data.forEach((datum2) => {
              const source = sourceAccessor(datum2);
              const target = targetAccessor(datum2);
              keyedData[source] || (keyedData[source] = { id: source, parentIds: [], linkData: {} });
              const node = keyedData[target] || (keyedData[target] = { id: target, parentIds: [], linkData: {} });
              node.parentIds.push(source);
              node.linkData[source] = datum2;
            });
            return dagStratify().linkData(stratifyLinkData)(Object.values(keyedData));
          }
          dagConnect2.sourceAccessor = function(x) {
            return arguments.length ? (sourceAccessor = x, dagConnect2) : sourceAccessor;
          };
          dagConnect2.targetAccessor = function(x) {
            return arguments.length ? (targetAccessor = x, dagConnect2) : targetAccessor;
          };
          dagConnect2.linkData = function(x) {
            return arguments.length ? (linkData = x, dagConnect2) : linkData;
          };
          return dagConnect2;
        }
        function defaultSource(d) {
          return d[0];
        }
        function defaultTarget(d) {
          return d[1];
        }
        function defaultLinkData$1(d) {
          return d;
        }
        function hierarchy() {
          if (arguments.length) {
            throw Error(
              `got arguments to dagHierarchy(${arguments}), but constructor takes no aruguments. These were probably meant as data which should be called as dagHierarchy()(...)`
            );
          }
          let id2 = defaultId$1;
          let children2 = defaultChildren;
          let linkData = defaultLinkData$2;
          function dagHierarchy(...data) {
            if (!data.length)
              throw new Error("must pass at least one node");
            const mapping = {};
            const queue = [];
            function nodify(datum2) {
              let did;
              try {
                did = id2(datum2).toString();
              } catch (TypeError2) {
                throw Error(
                  `node ids must have toString but got ${id2(datum2)} from ${datum2}`
                );
              }
              let res;
              if (!(res = mapping[did])) {
                res = new Node(did, datum2);
                queue.push(res);
                mapping[did] = res;
              } else if (datum2 !== res.data) {
                throw new Error("found a duplicate id: " + did);
              }
              return res;
            }
            const root2 = new Node(void 0, void 0);
            let node;
            root2.children = data.map(nodify);
            while (node = queue.pop()) {
              node.children = (children2(node.data) || []).map(nodify);
              node._childLinkData = node.children.map(
                (c) => linkData(node.data, c.data)
              );
            }
            verify(root2);
            return root2.children.length > 1 ? root2 : root2.children[0];
          }
          dagHierarchy.id = function(x) {
            return arguments.length ? (id2 = x, dagHierarchy) : id2;
          };
          dagHierarchy.children = function(x) {
            return arguments.length ? (children2 = x, dagHierarchy) : children2;
          };
          dagHierarchy.linkData = function(x) {
            return arguments.length ? (linkData = x, dagHierarchy) : linkData;
          };
          return dagHierarchy;
        }
        function defaultId$1(d) {
          return d.id;
        }
        function defaultChildren(d) {
          return d.children;
        }
        function defaultLinkData$2() {
          return {};
        }
        function Solution(tableau, evaluation, feasible, bounded) {
          this.feasible = feasible;
          this.evaluation = evaluation;
          this.bounded = bounded;
          this._tableau = tableau;
        }
        var Solution_1 = Solution;
        Solution.prototype.generateSolutionSet = function() {
          var solutionSet = {};
          var tableau = this._tableau;
          var varIndexByRow = tableau.varIndexByRow;
          var variablesPerIndex = tableau.variablesPerIndex;
          var matrix = tableau.matrix;
          var rhsColumn = tableau.rhsColumn;
          var lastRow = tableau.height - 1;
          var roundingCoeff = Math.round(1 / tableau.precision);
          for (var r = 1; r <= lastRow; r += 1) {
            var varIndex = varIndexByRow[r];
            var variable = variablesPerIndex[varIndex];
            if (variable === void 0 || variable.isSlack === true) {
              continue;
            }
            var varValue = matrix[r][rhsColumn];
            solutionSet[variable.id] = Math.round((Number.EPSILON + varValue) * roundingCoeff) / roundingCoeff;
          }
          return solutionSet;
        };
        function MilpSolution(tableau, evaluation, feasible, bounded, branchAndCutIterations) {
          Solution_1.call(this, tableau, evaluation, feasible, bounded);
          this.iter = branchAndCutIterations;
        }
        var MilpSolution_1 = MilpSolution;
        MilpSolution.prototype = Object.create(Solution_1.prototype);
        MilpSolution.constructor = MilpSolution;
        function Tableau(precision) {
          this.model = null;
          this.matrix = null;
          this.width = 0;
          this.height = 0;
          this.costRowIndex = 0;
          this.rhsColumn = 0;
          this.variablesPerIndex = [];
          this.unrestrictedVars = null;
          this.feasible = true;
          this.evaluation = 0;
          this.simplexIters = 0;
          this.varIndexByRow = null;
          this.varIndexByCol = null;
          this.rowByVarIndex = null;
          this.colByVarIndex = null;
          this.precision = precision || 1e-8;
          this.optionalObjectives = [];
          this.objectivesByPriority = {};
          this.savedState = null;
          this.availableIndexes = [];
          this.lastElementIndex = 0;
          this.variables = null;
          this.nVars = 0;
          this.bounded = true;
          this.unboundedVarIndex = null;
          this.branchAndCutIterations = 0;
        }
        var Tableau_1 = Tableau;
        Tableau.prototype.solve = function() {
          if (this.model.getNumberOfIntegerVariables() > 0) {
            this.branchAndCut();
          } else {
            this.simplex();
          }
          this.updateVariableValues();
          return this.getSolution();
        };
        function OptionalObjective(priority, nColumns) {
          this.priority = priority;
          this.reducedCosts = new Array(nColumns);
          for (var c = 0; c < nColumns; c += 1) {
            this.reducedCosts[c] = 0;
          }
        }
        OptionalObjective.prototype.copy = function() {
          var copy2 = new OptionalObjective(this.priority, this.reducedCosts.length);
          copy2.reducedCosts = this.reducedCosts.slice();
          return copy2;
        };
        Tableau.prototype.setOptionalObjective = function(priority, column, cost) {
          var objectiveForPriority = this.objectivesByPriority[priority];
          if (objectiveForPriority === void 0) {
            var nColumns = Math.max(this.width, column + 1);
            objectiveForPriority = new OptionalObjective(priority, nColumns);
            this.objectivesByPriority[priority] = objectiveForPriority;
            this.optionalObjectives.push(objectiveForPriority);
            this.optionalObjectives.sort(function(a, b) {
              return a.priority - b.priority;
            });
          }
          objectiveForPriority.reducedCosts[column] = cost;
        };
        Tableau.prototype.initialize = function(width, height2, variables, unrestrictedVars) {
          this.variables = variables;
          this.unrestrictedVars = unrestrictedVars;
          this.width = width;
          this.height = height2;
          var tmpRow = new Array(width);
          for (var i = 0; i < width; i++) {
            tmpRow[i] = 0;
          }
          this.matrix = new Array(height2);
          for (var j = 0; j < height2; j++) {
            this.matrix[j] = tmpRow.slice();
          }
          this.varIndexByRow = new Array(this.height);
          this.varIndexByCol = new Array(this.width);
          this.varIndexByRow[0] = -1;
          this.varIndexByCol[0] = -1;
          this.nVars = width + height2 - 2;
          this.rowByVarIndex = new Array(this.nVars);
          this.colByVarIndex = new Array(this.nVars);
          this.lastElementIndex = this.nVars;
        };
        Tableau.prototype._resetMatrix = function() {
          var variables = this.model.variables;
          var constraints = this.model.constraints;
          var nVars = variables.length;
          var nConstraints = constraints.length;
          var v, varIndex;
          var costRow = this.matrix[0];
          var coeff = this.model.isMinimization === true ? -1 : 1;
          for (v = 0; v < nVars; v += 1) {
            var variable = variables[v];
            var priority = variable.priority;
            var cost = coeff * variable.cost;
            if (priority === 0) {
              costRow[v + 1] = cost;
            } else {
              this.setOptionalObjective(priority, v + 1, cost);
            }
            varIndex = variables[v].index;
            this.rowByVarIndex[varIndex] = -1;
            this.colByVarIndex[varIndex] = v + 1;
            this.varIndexByCol[v + 1] = varIndex;
          }
          var rowIndex = 1;
          for (var c = 0; c < nConstraints; c += 1) {
            var constraint = constraints[c];
            var constraintIndex = constraint.index;
            this.rowByVarIndex[constraintIndex] = rowIndex;
            this.colByVarIndex[constraintIndex] = -1;
            this.varIndexByRow[rowIndex] = constraintIndex;
            var t, term, column;
            var terms = constraint.terms;
            var nTerms = terms.length;
            var row = this.matrix[rowIndex++];
            if (constraint.isUpperBound) {
              for (t = 0; t < nTerms; t += 1) {
                term = terms[t];
                column = this.colByVarIndex[term.variable.index];
                row[column] = term.coefficient;
              }
              row[0] = constraint.rhs;
            } else {
              for (t = 0; t < nTerms; t += 1) {
                term = terms[t];
                column = this.colByVarIndex[term.variable.index];
                row[column] = -term.coefficient;
              }
              row[0] = -constraint.rhs;
            }
          }
        };
        Tableau.prototype.setModel = function(model) {
          this.model = model;
          var width = model.nVariables + 1;
          var height2 = model.nConstraints + 1;
          this.initialize(width, height2, model.variables, model.unrestrictedVariables);
          this._resetMatrix();
          return this;
        };
        Tableau.prototype.getNewElementIndex = function() {
          if (this.availableIndexes.length > 0) {
            return this.availableIndexes.pop();
          }
          var index2 = this.lastElementIndex;
          this.lastElementIndex += 1;
          return index2;
        };
        Tableau.prototype.density = function() {
          var density = 0;
          var matrix = this.matrix;
          for (var r = 0; r < this.height; r++) {
            var row = matrix[r];
            for (var c = 0; c < this.width; c++) {
              if (row[c] !== 0) {
                density += 1;
              }
            }
          }
          return density / (this.height * this.width);
        };
        Tableau.prototype.setEvaluation = function() {
          var roundingCoeff = Math.round(1 / this.precision);
          var evaluation = this.matrix[this.costRowIndex][this.rhsColumn];
          var roundedEvaluation = Math.round((Number.EPSILON + evaluation) * roundingCoeff) / roundingCoeff;
          this.evaluation = roundedEvaluation;
          if (this.simplexIters === 0) {
            this.bestPossibleEval = roundedEvaluation;
          }
        };
        Tableau.prototype.getSolution = function() {
          var evaluation = this.model.isMinimization === true ? this.evaluation : -this.evaluation;
          if (this.model.getNumberOfIntegerVariables() > 0) {
            return new MilpSolution_1(this, evaluation, this.feasible, this.bounded, this.branchAndCutIterations);
          } else {
            return new Solution_1(this, evaluation, this.feasible, this.bounded);
          }
        };
        Tableau_1.prototype.simplex = function() {
          this.bounded = true;
          this.phase1();
          if (this.feasible === true) {
            this.phase2();
          }
          return this;
        };
        Tableau_1.prototype.phase1 = function() {
          var debugCheckForCycles = this.model.checkForCycles;
          var varIndexesCycle = [];
          var matrix = this.matrix;
          var rhsColumn = this.rhsColumn;
          var lastColumn = this.width - 1;
          var lastRow = this.height - 1;
          var unrestricted;
          var iterations = 0;
          while (true) {
            var leavingRowIndex = 0;
            var rhsValue = -this.precision;
            for (var r = 1; r <= lastRow; r++) {
              unrestricted = this.unrestrictedVars[this.varIndexByRow[r]] === true;
              var value = matrix[r][rhsColumn];
              if (value < rhsValue) {
                rhsValue = value;
                leavingRowIndex = r;
              }
            }
            if (leavingRowIndex === 0) {
              this.feasible = true;
              return iterations;
            }
            var enteringColumn = 0;
            var maxQuotient = -Infinity;
            var costRow = matrix[0];
            var leavingRow = matrix[leavingRowIndex];
            for (var c = 1; c <= lastColumn; c++) {
              var coefficient = leavingRow[c];
              unrestricted = this.unrestrictedVars[this.varIndexByCol[c]] === true;
              if (unrestricted || coefficient < -this.precision) {
                var quotient = -costRow[c] / coefficient;
                if (maxQuotient < quotient) {
                  maxQuotient = quotient;
                  enteringColumn = c;
                }
              }
            }
            if (enteringColumn === 0) {
              this.feasible = false;
              return iterations;
            }
            if (debugCheckForCycles) {
              varIndexesCycle.push([this.varIndexByRow[leavingRowIndex], this.varIndexByCol[enteringColumn]]);
              var cycleData = this.checkForCycles(varIndexesCycle);
              if (cycleData.length > 0) {
                this.model.messages.push("Cycle in phase 1");
                this.model.messages.push("Start :" + cycleData[0]);
                this.model.messages.push("Length :" + cycleData[1]);
                this.feasible = false;
                return iterations;
              }
            }
            this.pivot(leavingRowIndex, enteringColumn);
            iterations += 1;
          }
        };
        Tableau_1.prototype.phase2 = function() {
          var debugCheckForCycles = this.model.checkForCycles;
          var varIndexesCycle = [];
          var matrix = this.matrix;
          var rhsColumn = this.rhsColumn;
          var lastColumn = this.width - 1;
          var lastRow = this.height - 1;
          var precision = this.precision;
          var nOptionalObjectives = this.optionalObjectives.length;
          var optionalCostsColumns = null;
          var iterations = 0;
          var reducedCost, unrestricted;
          while (true) {
            var costRow = matrix[this.costRowIndex];
            if (nOptionalObjectives > 0) {
              optionalCostsColumns = [];
            }
            var enteringColumn = 0;
            var enteringValue = precision;
            var isReducedCostNegative = false;
            for (var c = 1; c <= lastColumn; c++) {
              reducedCost = costRow[c];
              unrestricted = this.unrestrictedVars[this.varIndexByCol[c]] === true;
              if (nOptionalObjectives > 0 && -precision < reducedCost && reducedCost < precision) {
                optionalCostsColumns.push(c);
                continue;
              }
              if (unrestricted && reducedCost < 0) {
                if (-reducedCost > enteringValue) {
                  enteringValue = -reducedCost;
                  enteringColumn = c;
                  isReducedCostNegative = true;
                }
                continue;
              }
              if (reducedCost > enteringValue) {
                enteringValue = reducedCost;
                enteringColumn = c;
                isReducedCostNegative = false;
              }
            }
            if (nOptionalObjectives > 0) {
              var o = 0;
              while (enteringColumn === 0 && optionalCostsColumns.length > 0 && o < nOptionalObjectives) {
                var optionalCostsColumns2 = [];
                var reducedCosts = this.optionalObjectives[o].reducedCosts;
                enteringValue = precision;
                for (var i = 0; i < optionalCostsColumns.length; i++) {
                  c = optionalCostsColumns[i];
                  reducedCost = reducedCosts[c];
                  unrestricted = this.unrestrictedVars[this.varIndexByCol[c]] === true;
                  if (-precision < reducedCost && reducedCost < precision) {
                    optionalCostsColumns2.push(c);
                    continue;
                  }
                  if (unrestricted && reducedCost < 0) {
                    if (-reducedCost > enteringValue) {
                      enteringValue = -reducedCost;
                      enteringColumn = c;
                      isReducedCostNegative = true;
                    }
                    continue;
                  }
                  if (reducedCost > enteringValue) {
                    enteringValue = reducedCost;
                    enteringColumn = c;
                    isReducedCostNegative = false;
                  }
                }
                optionalCostsColumns = optionalCostsColumns2;
                o += 1;
              }
            }
            if (enteringColumn === 0) {
              this.setEvaluation();
              this.simplexIters += 1;
              return iterations;
            }
            var leavingRow = 0;
            var minQuotient = Infinity;
            var varIndexByRow = this.varIndexByRow;
            for (var r = 1; r <= lastRow; r++) {
              var row = matrix[r];
              var rhsValue = row[rhsColumn];
              var colValue = row[enteringColumn];
              if (-precision < colValue && colValue < precision) {
                continue;
              }
              if (colValue > 0 && precision > rhsValue && rhsValue > -precision) {
                minQuotient = 0;
                leavingRow = r;
                break;
              }
              var quotient = isReducedCostNegative ? -rhsValue / colValue : rhsValue / colValue;
              if (quotient > precision && minQuotient > quotient) {
                minQuotient = quotient;
                leavingRow = r;
              }
            }
            if (minQuotient === Infinity) {
              this.evaluation = -Infinity;
              this.bounded = false;
              this.unboundedVarIndex = this.varIndexByCol[enteringColumn];
              return iterations;
            }
            if (debugCheckForCycles) {
              varIndexesCycle.push([this.varIndexByRow[leavingRow], this.varIndexByCol[enteringColumn]]);
              var cycleData = this.checkForCycles(varIndexesCycle);
              if (cycleData.length > 0) {
                this.model.messages.push("Cycle in phase 2");
                this.model.messages.push("Start :" + cycleData[0]);
                this.model.messages.push("Length :" + cycleData[1]);
                this.feasible = false;
                return iterations;
              }
            }
            this.pivot(leavingRow, enteringColumn, true);
            iterations += 1;
          }
        };
        var nonZeroColumns = [];
        Tableau_1.prototype.pivot = function(pivotRowIndex, pivotColumnIndex) {
          var matrix = this.matrix;
          var quotient = matrix[pivotRowIndex][pivotColumnIndex];
          var lastRow = this.height - 1;
          var lastColumn = this.width - 1;
          var leavingBasicIndex = this.varIndexByRow[pivotRowIndex];
          var enteringBasicIndex = this.varIndexByCol[pivotColumnIndex];
          this.varIndexByRow[pivotRowIndex] = enteringBasicIndex;
          this.varIndexByCol[pivotColumnIndex] = leavingBasicIndex;
          this.rowByVarIndex[enteringBasicIndex] = pivotRowIndex;
          this.rowByVarIndex[leavingBasicIndex] = -1;
          this.colByVarIndex[enteringBasicIndex] = -1;
          this.colByVarIndex[leavingBasicIndex] = pivotColumnIndex;
          var pivotRow = matrix[pivotRowIndex];
          var nNonZeroColumns = 0;
          for (var c = 0; c <= lastColumn; c++) {
            if (!(pivotRow[c] >= -1e-16 && pivotRow[c] <= 1e-16)) {
              pivotRow[c] /= quotient;
              nonZeroColumns[nNonZeroColumns] = c;
              nNonZeroColumns += 1;
            } else {
              pivotRow[c] = 0;
            }
          }
          pivotRow[pivotColumnIndex] = 1 / quotient;
          var coefficient, i, v0;
          var precision = this.precision;
          for (var r = 0; r <= lastRow; r++) {
            if (r !== pivotRowIndex) {
              var row = matrix[r];
              coefficient = row[pivotColumnIndex];
              if (!(coefficient >= -1e-16 && coefficient <= 1e-16)) {
                for (i = 0; i < nNonZeroColumns; i++) {
                  c = nonZeroColumns[i];
                  v0 = pivotRow[c];
                  if (!(v0 >= -1e-16 && v0 <= 1e-16)) {
                    row[c] = row[c] - coefficient * v0;
                  } else {
                    if (v0 !== 0) {
                      pivotRow[c] = 0;
                    }
                  }
                }
                row[pivotColumnIndex] = -coefficient / quotient;
              } else {
                if (coefficient !== 0) {
                  row[pivotColumnIndex] = 0;
                }
              }
            }
          }
          var nOptionalObjectives = this.optionalObjectives.length;
          if (nOptionalObjectives > 0) {
            for (var o = 0; o < nOptionalObjectives; o += 1) {
              var reducedCosts = this.optionalObjectives[o].reducedCosts;
              coefficient = reducedCosts[pivotColumnIndex];
              if (coefficient !== 0) {
                for (i = 0; i < nNonZeroColumns; i++) {
                  c = nonZeroColumns[i];
                  v0 = pivotRow[c];
                  if (v0 !== 0) {
                    reducedCosts[c] = reducedCosts[c] - coefficient * v0;
                  }
                }
                reducedCosts[pivotColumnIndex] = -coefficient / quotient;
              }
            }
          }
        };
        Tableau_1.prototype.checkForCycles = function(varIndexes) {
          for (var e1 = 0; e1 < varIndexes.length - 1; e1++) {
            for (var e2 = e1 + 1; e2 < varIndexes.length; e2++) {
              var elt1 = varIndexes[e1];
              var elt2 = varIndexes[e2];
              if (elt1[0] === elt2[0] && elt1[1] === elt2[1]) {
                if (e2 - e1 > varIndexes.length - e2) {
                  break;
                }
                var cycleFound = true;
                for (var i = 1; i < e2 - e1; i++) {
                  var tmp1 = varIndexes[e1 + i];
                  var tmp2 = varIndexes[e2 + i];
                  if (tmp1[0] !== tmp2[0] || tmp1[1] !== tmp2[1]) {
                    cycleFound = false;
                    break;
                  }
                }
                if (cycleFound) {
                  return [e1, e2 - e1];
                }
              }
            }
          }
          return [];
        };
        function Variable(id2, cost, index2, priority) {
          this.id = id2;
          this.cost = cost;
          this.index = index2;
          this.value = 0;
          this.priority = priority;
        }
        function IntegerVariable(id2, cost, index2, priority) {
          Variable.call(this, id2, cost, index2, priority);
        }
        IntegerVariable.prototype.isInteger = true;
        function SlackVariable(id2, index2) {
          Variable.call(this, id2, 0, index2, 0);
        }
        SlackVariable.prototype.isSlack = true;
        function Term(variable, coefficient) {
          this.variable = variable;
          this.coefficient = coefficient;
        }
        function createRelaxationVariable(model, weight, priority) {
          if (priority === 0 || priority === "required") {
            return null;
          }
          weight = weight || 1;
          priority = priority || 1;
          if (model.isMinimization === false) {
            weight = -weight;
          }
          return model.addVariable(weight, "r" + model.relaxationIndex++, false, false, priority);
        }
        function Constraint(rhs, isUpperBound, index2, model) {
          this.slack = new SlackVariable("s" + index2, index2);
          this.index = index2;
          this.model = model;
          this.rhs = rhs;
          this.isUpperBound = isUpperBound;
          this.terms = [];
          this.termsByVarIndex = {};
          this.relaxation = null;
        }
        Constraint.prototype.addTerm = function(coefficient, variable) {
          var varIndex = variable.index;
          var term = this.termsByVarIndex[varIndex];
          if (term === void 0) {
            term = new Term(variable, coefficient);
            this.termsByVarIndex[varIndex] = term;
            this.terms.push(term);
            if (this.isUpperBound === true) {
              coefficient = -coefficient;
            }
            this.model.updateConstraintCoefficient(this, variable, coefficient);
          } else {
            var newCoefficient = term.coefficient + coefficient;
            this.setVariableCoefficient(newCoefficient, variable);
          }
          return this;
        };
        Constraint.prototype.removeTerm = function(term) {
          return this;
        };
        Constraint.prototype.setRightHandSide = function(newRhs) {
          if (newRhs !== this.rhs) {
            var difference = newRhs - this.rhs;
            if (this.isUpperBound === true) {
              difference = -difference;
            }
            this.rhs = newRhs;
            this.model.updateRightHandSide(this, difference);
          }
          return this;
        };
        Constraint.prototype.setVariableCoefficient = function(newCoefficient, variable) {
          var varIndex = variable.index;
          if (varIndex === -1) {
            console.warn("[Constraint.setVariableCoefficient] Trying to change coefficient of inexistant variable.");
            return;
          }
          var term = this.termsByVarIndex[varIndex];
          if (term === void 0) {
            this.addTerm(newCoefficient, variable);
          } else {
            if (newCoefficient !== term.coefficient) {
              var difference = newCoefficient - term.coefficient;
              if (this.isUpperBound === true) {
                difference = -difference;
              }
              term.coefficient = newCoefficient;
              this.model.updateConstraintCoefficient(this, variable, difference);
            }
          }
          return this;
        };
        Constraint.prototype.relax = function(weight, priority) {
          this.relaxation = createRelaxationVariable(this.model, weight, priority);
          this._relax(this.relaxation);
        };
        Constraint.prototype._relax = function(relaxationVariable) {
          if (relaxationVariable === null) {
            return;
          }
          if (this.isUpperBound) {
            this.setVariableCoefficient(-1, relaxationVariable);
          } else {
            this.setVariableCoefficient(1, relaxationVariable);
          }
        };
        function Equality(constraintUpper, constraintLower) {
          this.upperBound = constraintUpper;
          this.lowerBound = constraintLower;
          this.model = constraintUpper.model;
          this.rhs = constraintUpper.rhs;
          this.relaxation = null;
        }
        Equality.prototype.isEquality = true;
        Equality.prototype.addTerm = function(coefficient, variable) {
          this.upperBound.addTerm(coefficient, variable);
          this.lowerBound.addTerm(coefficient, variable);
          return this;
        };
        Equality.prototype.removeTerm = function(term) {
          this.upperBound.removeTerm(term);
          this.lowerBound.removeTerm(term);
          return this;
        };
        Equality.prototype.setRightHandSide = function(rhs) {
          this.upperBound.setRightHandSide(rhs);
          this.lowerBound.setRightHandSide(rhs);
          this.rhs = rhs;
        };
        Equality.prototype.relax = function(weight, priority) {
          this.relaxation = createRelaxationVariable(this.model, weight, priority);
          this.upperBound.relaxation = this.relaxation;
          this.upperBound._relax(this.relaxation);
          this.lowerBound.relaxation = this.relaxation;
          this.lowerBound._relax(this.relaxation);
        };
        var expressions = {
          Constraint,
          Variable,
          IntegerVariable,
          SlackVariable,
          Equality,
          Term
        };
        var SlackVariable$1 = expressions.SlackVariable;
        Tableau_1.prototype.addCutConstraints = function(cutConstraints) {
          var nCutConstraints = cutConstraints.length;
          var height2 = this.height;
          var heightWithCuts = height2 + nCutConstraints;
          for (var h = height2; h < heightWithCuts; h += 1) {
            if (this.matrix[h] === void 0) {
              this.matrix[h] = this.matrix[h - 1].slice();
            }
          }
          this.height = heightWithCuts;
          this.nVars = this.width + this.height - 2;
          var c;
          var lastColumn = this.width - 1;
          for (var i = 0; i < nCutConstraints; i += 1) {
            var cut = cutConstraints[i];
            var r = height2 + i;
            var sign = cut.type === "min" ? -1 : 1;
            var varIndex = cut.varIndex;
            var varRowIndex = this.rowByVarIndex[varIndex];
            var constraintRow = this.matrix[r];
            if (varRowIndex === -1) {
              constraintRow[this.rhsColumn] = sign * cut.value;
              for (c = 1; c <= lastColumn; c += 1) {
                constraintRow[c] = 0;
              }
              constraintRow[this.colByVarIndex[varIndex]] = sign;
            } else {
              var varRow = this.matrix[varRowIndex];
              var varValue = varRow[this.rhsColumn];
              constraintRow[this.rhsColumn] = sign * (cut.value - varValue);
              for (c = 1; c <= lastColumn; c += 1) {
                constraintRow[c] = -sign * varRow[c];
              }
            }
            var slackVarIndex = this.getNewElementIndex();
            this.varIndexByRow[r] = slackVarIndex;
            this.rowByVarIndex[slackVarIndex] = r;
            this.colByVarIndex[slackVarIndex] = -1;
            this.variablesPerIndex[slackVarIndex] = new SlackVariable$1("s" + slackVarIndex, slackVarIndex);
            this.nVars += 1;
          }
        };
        Tableau_1.prototype._addLowerBoundMIRCut = function(rowIndex) {
          if (rowIndex === this.costRowIndex) {
            return false;
          }
          var model = this.model;
          var matrix = this.matrix;
          var intVar = this.variablesPerIndex[this.varIndexByRow[rowIndex]];
          if (!intVar.isInteger) {
            return false;
          }
          var d = matrix[rowIndex][this.rhsColumn];
          var frac_d = d - Math.floor(d);
          if (frac_d < this.precision || 1 - this.precision < frac_d) {
            return false;
          }
          var r = this.height;
          matrix[r] = matrix[r - 1].slice();
          this.height += 1;
          this.nVars += 1;
          var slackVarIndex = this.getNewElementIndex();
          this.varIndexByRow[r] = slackVarIndex;
          this.rowByVarIndex[slackVarIndex] = r;
          this.colByVarIndex[slackVarIndex] = -1;
          this.variablesPerIndex[slackVarIndex] = new SlackVariable$1("s" + slackVarIndex, slackVarIndex);
          matrix[r][this.rhsColumn] = Math.floor(d);
          for (var colIndex = 1; colIndex < this.varIndexByCol.length; colIndex += 1) {
            var variable = this.variablesPerIndex[this.varIndexByCol[colIndex]];
            if (!variable.isInteger) {
              matrix[r][colIndex] = Math.min(0, matrix[rowIndex][colIndex] / (1 - frac_d));
            } else {
              var coef = matrix[rowIndex][colIndex];
              var termCoeff = Math.floor(coef) + Math.max(0, coef - Math.floor(coef) - frac_d) / (1 - frac_d);
              matrix[r][colIndex] = termCoeff;
            }
          }
          for (var c = 0; c < this.width; c += 1) {
            matrix[r][c] -= matrix[rowIndex][c];
          }
          return true;
        };
        Tableau_1.prototype._addUpperBoundMIRCut = function(rowIndex) {
          if (rowIndex === this.costRowIndex) {
            return false;
          }
          var model = this.model;
          var matrix = this.matrix;
          var intVar = this.variablesPerIndex[this.varIndexByRow[rowIndex]];
          if (!intVar.isInteger) {
            return false;
          }
          var b = matrix[rowIndex][this.rhsColumn];
          var f = b - Math.floor(b);
          if (f < this.precision || 1 - this.precision < f) {
            return false;
          }
          var r = this.height;
          matrix[r] = matrix[r - 1].slice();
          this.height += 1;
          this.nVars += 1;
          var slackVarIndex = this.getNewElementIndex();
          this.varIndexByRow[r] = slackVarIndex;
          this.rowByVarIndex[slackVarIndex] = r;
          this.colByVarIndex[slackVarIndex] = -1;
          this.variablesPerIndex[slackVarIndex] = new SlackVariable$1("s" + slackVarIndex, slackVarIndex);
          matrix[r][this.rhsColumn] = -f;
          for (var colIndex = 1; colIndex < this.varIndexByCol.length; colIndex += 1) {
            var variable = this.variablesPerIndex[this.varIndexByCol[colIndex]];
            var aj = matrix[rowIndex][colIndex];
            var fj = aj - Math.floor(aj);
            if (variable.isInteger) {
              if (fj <= f) {
                matrix[r][colIndex] = -fj;
              } else {
                matrix[r][colIndex] = -(1 - fj) * f / fj;
              }
            } else {
              if (aj >= 0) {
                matrix[r][colIndex] = -aj;
              } else {
                matrix[r][colIndex] = aj * f / (1 - f);
              }
            }
          }
          return true;
        };
        Tableau_1.prototype.applyMIRCuts = function() {
        };
        Tableau_1.prototype._putInBase = function(varIndex) {
          var r = this.rowByVarIndex[varIndex];
          if (r === -1) {
            var c = this.colByVarIndex[varIndex];
            for (var r1 = 1; r1 < this.height; r1 += 1) {
              var coefficient = this.matrix[r1][c];
              if (coefficient < -this.precision || this.precision < coefficient) {
                r = r1;
                break;
              }
            }
            this.pivot(r, c);
          }
          return r;
        };
        Tableau_1.prototype._takeOutOfBase = function(varIndex) {
          var c = this.colByVarIndex[varIndex];
          if (c === -1) {
            var r = this.rowByVarIndex[varIndex];
            var pivotRow = this.matrix[r];
            for (var c1 = 1; c1 < this.height; c1 += 1) {
              var coefficient = pivotRow[c1];
              if (coefficient < -this.precision || this.precision < coefficient) {
                c = c1;
                break;
              }
            }
            this.pivot(r, c);
          }
          return c;
        };
        Tableau_1.prototype.updateVariableValues = function() {
          var nVars = this.variables.length;
          var roundingCoeff = Math.round(1 / this.precision);
          for (var v = 0; v < nVars; v += 1) {
            var variable = this.variables[v];
            var varIndex = variable.index;
            var r = this.rowByVarIndex[varIndex];
            if (r === -1) {
              variable.value = 0;
            } else {
              var varValue = this.matrix[r][this.rhsColumn];
              variable.value = Math.round((varValue + Number.EPSILON) * roundingCoeff) / roundingCoeff;
            }
          }
        };
        Tableau_1.prototype.updateRightHandSide = function(constraint, difference) {
          var lastRow = this.height - 1;
          var constraintRow = this.rowByVarIndex[constraint.index];
          if (constraintRow === -1) {
            var slackColumn = this.colByVarIndex[constraint.index];
            for (var r = 0; r <= lastRow; r += 1) {
              var row = this.matrix[r];
              row[this.rhsColumn] -= difference * row[slackColumn];
            }
            var nOptionalObjectives = this.optionalObjectives.length;
            if (nOptionalObjectives > 0) {
              for (var o = 0; o < nOptionalObjectives; o += 1) {
                var reducedCosts = this.optionalObjectives[o].reducedCosts;
                reducedCosts[this.rhsColumn] -= difference * reducedCosts[slackColumn];
              }
            }
          } else {
            this.matrix[constraintRow][this.rhsColumn] -= difference;
          }
        };
        Tableau_1.prototype.updateConstraintCoefficient = function(constraint, variable, difference) {
          if (constraint.index === variable.index) {
            throw new Error("[Tableau.updateConstraintCoefficient] constraint index should not be equal to variable index !");
          }
          var r = this._putInBase(constraint.index);
          var colVar = this.colByVarIndex[variable.index];
          if (colVar === -1) {
            var rowVar = this.rowByVarIndex[variable.index];
            for (var c = 0; c < this.width; c += 1) {
              this.matrix[r][c] += difference * this.matrix[rowVar][c];
            }
          } else {
            this.matrix[r][colVar] -= difference;
          }
        };
        Tableau_1.prototype.updateCost = function(variable, difference) {
          var varIndex = variable.index;
          var lastColumn = this.width - 1;
          var varColumn = this.colByVarIndex[varIndex];
          if (varColumn === -1) {
            var variableRow = this.matrix[this.rowByVarIndex[varIndex]];
            var c;
            if (variable.priority === 0) {
              var costRow = this.matrix[0];
              for (c = 0; c <= lastColumn; c += 1) {
                costRow[c] += difference * variableRow[c];
              }
            } else {
              var reducedCosts = this.objectivesByPriority[variable.priority].reducedCosts;
              for (c = 0; c <= lastColumn; c += 1) {
                reducedCosts[c] += difference * variableRow[c];
              }
            }
          } else {
            this.matrix[0][varColumn] -= difference;
          }
        };
        Tableau_1.prototype.addConstraint = function(constraint) {
          var sign = constraint.isUpperBound ? 1 : -1;
          var lastRow = this.height;
          var constraintRow = this.matrix[lastRow];
          if (constraintRow === void 0) {
            constraintRow = this.matrix[0].slice();
            this.matrix[lastRow] = constraintRow;
          }
          var lastColumn = this.width - 1;
          for (var c = 0; c <= lastColumn; c += 1) {
            constraintRow[c] = 0;
          }
          constraintRow[this.rhsColumn] = sign * constraint.rhs;
          var terms = constraint.terms;
          var nTerms = terms.length;
          for (var t = 0; t < nTerms; t += 1) {
            var term = terms[t];
            var coefficient = term.coefficient;
            var varIndex = term.variable.index;
            var varRowIndex = this.rowByVarIndex[varIndex];
            if (varRowIndex === -1) {
              constraintRow[this.colByVarIndex[varIndex]] += sign * coefficient;
            } else {
              var varRow = this.matrix[varRowIndex];
              var varValue = varRow[this.rhsColumn];
              for (c = 0; c <= lastColumn; c += 1) {
                constraintRow[c] -= sign * coefficient * varRow[c];
              }
            }
          }
          var slackIndex = constraint.index;
          this.varIndexByRow[lastRow] = slackIndex;
          this.rowByVarIndex[slackIndex] = lastRow;
          this.colByVarIndex[slackIndex] = -1;
          this.height += 1;
        };
        Tableau_1.prototype.removeConstraint = function(constraint) {
          var slackIndex = constraint.index;
          var lastRow = this.height - 1;
          var r = this._putInBase(slackIndex);
          var tmpRow = this.matrix[lastRow];
          this.matrix[lastRow] = this.matrix[r];
          this.matrix[r] = tmpRow;
          this.varIndexByRow[r] = this.varIndexByRow[lastRow];
          this.varIndexByRow[lastRow] = -1;
          this.rowByVarIndex[slackIndex] = -1;
          this.availableIndexes[this.availableIndexes.length] = slackIndex;
          constraint.slack.index = -1;
          this.height -= 1;
        };
        Tableau_1.prototype.addVariable = function(variable) {
          var lastRow = this.height - 1;
          var lastColumn = this.width;
          var cost = this.model.isMinimization === true ? -variable.cost : variable.cost;
          var priority = variable.priority;
          var nOptionalObjectives = this.optionalObjectives.length;
          if (nOptionalObjectives > 0) {
            for (var o = 0; o < nOptionalObjectives; o += 1) {
              this.optionalObjectives[o].reducedCosts[lastColumn] = 0;
            }
          }
          if (priority === 0) {
            this.matrix[0][lastColumn] = cost;
          } else {
            this.setOptionalObjective(priority, lastColumn, cost);
            this.matrix[0][lastColumn] = 0;
          }
          for (var r = 1; r <= lastRow; r += 1) {
            this.matrix[r][lastColumn] = 0;
          }
          var varIndex = variable.index;
          this.varIndexByCol[lastColumn] = varIndex;
          this.rowByVarIndex[varIndex] = -1;
          this.colByVarIndex[varIndex] = lastColumn;
          this.width += 1;
        };
        Tableau_1.prototype.removeVariable = function(variable) {
          var varIndex = variable.index;
          var c = this._takeOutOfBase(varIndex);
          var lastColumn = this.width - 1;
          if (c !== lastColumn) {
            var lastRow = this.height - 1;
            for (var r = 0; r <= lastRow; r += 1) {
              var row = this.matrix[r];
              row[c] = row[lastColumn];
            }
            var nOptionalObjectives = this.optionalObjectives.length;
            if (nOptionalObjectives > 0) {
              for (var o = 0; o < nOptionalObjectives; o += 1) {
                var reducedCosts = this.optionalObjectives[o].reducedCosts;
                reducedCosts[c] = reducedCosts[lastColumn];
              }
            }
            var switchVarIndex = this.varIndexByCol[lastColumn];
            this.varIndexByCol[c] = switchVarIndex;
            this.colByVarIndex[switchVarIndex] = c;
          }
          this.varIndexByCol[lastColumn] = -1;
          this.colByVarIndex[varIndex] = -1;
          this.availableIndexes[this.availableIndexes.length] = varIndex;
          variable.index = -1;
          this.width -= 1;
        };
        Tableau_1.prototype.log = function(message, force) {
          console.log("****", message, "****");
          console.log("Nb Variables", this.width - 1);
          console.log("Nb Constraints", this.height - 1);
          console.log("Basic Indexes", this.varIndexByRow);
          console.log("Non Basic Indexes", this.varIndexByCol);
          console.log("Rows", this.rowByVarIndex);
          console.log("Cols", this.colByVarIndex);
          var digitPrecision = 5;
          var varNameRowString = "", spacePerColumn = [" "], j, c, r, variable, varIndex, varName, varNameLength, valueSpace, nameSpace;
          var row, rowString;
          for (c = 1; c < this.width; c += 1) {
            varIndex = this.varIndexByCol[c];
            variable = this.variablesPerIndex[varIndex];
            if (variable === void 0) {
              varName = "c" + varIndex;
            } else {
              varName = variable.id;
            }
            varNameLength = varName.length;
            valueSpace = " ";
            nameSpace = "	";
            if (varNameLength > 5) {
              valueSpace += " ";
            } else {
              nameSpace += "	";
            }
            spacePerColumn[c] = valueSpace;
            varNameRowString += nameSpace + varName;
          }
          console.log(varNameRowString);
          var signSpace;
          var firstRow = this.matrix[this.costRowIndex];
          var firstRowString = "	";
          for (j = 1; j < this.width; j += 1) {
            signSpace = "	";
            firstRowString += signSpace;
            firstRowString += spacePerColumn[j];
            firstRowString += firstRow[j].toFixed(digitPrecision);
          }
          signSpace = "	";
          firstRowString += signSpace + spacePerColumn[0] + firstRow[0].toFixed(digitPrecision);
          console.log(firstRowString + "	Z");
          for (r = 1; r < this.height; r += 1) {
            row = this.matrix[r];
            rowString = "	";
            for (c = 1; c < this.width; c += 1) {
              signSpace = "	";
              rowString += signSpace + spacePerColumn[c] + row[c].toFixed(digitPrecision);
            }
            signSpace = "	";
            rowString += signSpace + spacePerColumn[0] + row[0].toFixed(digitPrecision);
            varIndex = this.varIndexByRow[r];
            variable = this.variablesPerIndex[varIndex];
            if (variable === void 0) {
              varName = "c" + varIndex;
            } else {
              varName = variable.id;
            }
            console.log(rowString + "	" + varName);
          }
          console.log("");
          var nOptionalObjectives = this.optionalObjectives.length;
          if (nOptionalObjectives > 0) {
            console.log("    Optional objectives:");
            for (var o = 0; o < nOptionalObjectives; o += 1) {
              var reducedCosts = this.optionalObjectives[o].reducedCosts;
              var reducedCostsString = "";
              for (j = 1; j < this.width; j += 1) {
                signSpace = reducedCosts[j] < 0 ? "" : " ";
                reducedCostsString += signSpace;
                reducedCostsString += spacePerColumn[j];
                reducedCostsString += reducedCosts[j].toFixed(digitPrecision);
              }
              signSpace = reducedCosts[0] < 0 ? "" : " ";
              reducedCostsString += signSpace + spacePerColumn[0] + reducedCosts[0].toFixed(digitPrecision);
              console.log(reducedCostsString + " z" + o);
            }
          }
          console.log("Feasible?", this.feasible);
          console.log("evaluation", this.evaluation);
          return this;
        };
        Tableau_1.prototype.copy = function() {
          var copy2 = new Tableau_1(this.precision);
          copy2.width = this.width;
          copy2.height = this.height;
          copy2.nVars = this.nVars;
          copy2.model = this.model;
          copy2.variables = this.variables;
          copy2.variablesPerIndex = this.variablesPerIndex;
          copy2.unrestrictedVars = this.unrestrictedVars;
          copy2.lastElementIndex = this.lastElementIndex;
          copy2.varIndexByRow = this.varIndexByRow.slice();
          copy2.varIndexByCol = this.varIndexByCol.slice();
          copy2.rowByVarIndex = this.rowByVarIndex.slice();
          copy2.colByVarIndex = this.colByVarIndex.slice();
          copy2.availableIndexes = this.availableIndexes.slice();
          var optionalObjectivesCopy = [];
          for (var o = 0; o < this.optionalObjectives.length; o++) {
            optionalObjectivesCopy[o] = this.optionalObjectives[o].copy();
          }
          copy2.optionalObjectives = optionalObjectivesCopy;
          var matrix = this.matrix;
          var matrixCopy = new Array(this.height);
          for (var r = 0; r < this.height; r++) {
            matrixCopy[r] = matrix[r].slice();
          }
          copy2.matrix = matrixCopy;
          return copy2;
        };
        Tableau_1.prototype.save = function() {
          this.savedState = this.copy();
        };
        Tableau_1.prototype.restore = function() {
          if (this.savedState === null) {
            return;
          }
          var save = this.savedState;
          var savedMatrix = save.matrix;
          this.nVars = save.nVars;
          this.model = save.model;
          this.variables = save.variables;
          this.variablesPerIndex = save.variablesPerIndex;
          this.unrestrictedVars = save.unrestrictedVars;
          this.lastElementIndex = save.lastElementIndex;
          this.width = save.width;
          this.height = save.height;
          var r, c;
          for (r = 0; r < this.height; r += 1) {
            var savedRow = savedMatrix[r];
            var row = this.matrix[r];
            for (c = 0; c < this.width; c += 1) {
              row[c] = savedRow[c];
            }
          }
          var savedBasicIndexes = save.varIndexByRow;
          for (c = 0; c < this.height; c += 1) {
            this.varIndexByRow[c] = savedBasicIndexes[c];
          }
          while (this.varIndexByRow.length > this.height) {
            this.varIndexByRow.pop();
          }
          var savedNonBasicIndexes = save.varIndexByCol;
          for (r = 0; r < this.width; r += 1) {
            this.varIndexByCol[r] = savedNonBasicIndexes[r];
          }
          while (this.varIndexByCol.length > this.width) {
            this.varIndexByCol.pop();
          }
          var savedRows = save.rowByVarIndex;
          var savedCols = save.colByVarIndex;
          for (var v = 0; v < this.nVars; v += 1) {
            this.rowByVarIndex[v] = savedRows[v];
            this.colByVarIndex[v] = savedCols[v];
          }
          if (save.optionalObjectives.length > 0 && this.optionalObjectives.length > 0) {
            this.optionalObjectives = [];
            this.optionalObjectivePerPriority = {};
            for (var o = 0; o < save.optionalObjectives.length; o++) {
              var optionalObjectiveCopy = save.optionalObjectives[o].copy();
              this.optionalObjectives[o] = optionalObjectiveCopy;
              this.optionalObjectivePerPriority[optionalObjectiveCopy.priority] = optionalObjectiveCopy;
            }
          }
        };
        function VariableData(index2, value) {
          this.index = index2;
          this.value = value;
        }
        Tableau_1.prototype.getMostFractionalVar = function() {
          var biggestFraction = 0;
          var selectedVarIndex = null;
          var selectedVarValue = null;
          var integerVariables = this.model.integerVariables;
          var nIntegerVars = integerVariables.length;
          for (var v = 0; v < nIntegerVars; v++) {
            var varIndex = integerVariables[v].index;
            var varRow = this.rowByVarIndex[varIndex];
            if (varRow === -1) {
              continue;
            }
            var varValue = this.matrix[varRow][this.rhsColumn];
            var fraction = Math.abs(varValue - Math.round(varValue));
            if (biggestFraction < fraction) {
              biggestFraction = fraction;
              selectedVarIndex = varIndex;
              selectedVarValue = varValue;
            }
          }
          return new VariableData(selectedVarIndex, selectedVarValue);
        };
        Tableau_1.prototype.getFractionalVarWithLowestCost = function() {
          var highestCost = Infinity;
          var selectedVarIndex = null;
          var selectedVarValue = null;
          var integerVariables = this.model.integerVariables;
          var nIntegerVars = integerVariables.length;
          for (var v = 0; v < nIntegerVars; v++) {
            var variable = integerVariables[v];
            var varIndex = variable.index;
            var varRow = this.rowByVarIndex[varIndex];
            if (varRow === -1) {
              continue;
            }
            var varValue = this.matrix[varRow][this.rhsColumn];
            if (Math.abs(varValue - Math.round(varValue)) > this.precision) {
              var cost = variable.cost;
              if (highestCost > cost) {
                highestCost = cost;
                selectedVarIndex = varIndex;
                selectedVarValue = varValue;
              }
            }
          }
          return new VariableData(selectedVarIndex, selectedVarValue);
        };
        Tableau_1.prototype.countIntegerValues = function() {
          var count2 = 0;
          for (var r = 1; r < this.height; r += 1) {
            if (this.variablesPerIndex[this.varIndexByRow[r]].isInteger) {
              var decimalPart = this.matrix[r][this.rhsColumn];
              decimalPart = decimalPart - Math.floor(decimalPart);
              if (decimalPart < this.precision && -decimalPart < this.precision) {
                count2 += 1;
              }
            }
          }
          return count2;
        };
        Tableau_1.prototype.isIntegral = function() {
          var integerVariables = this.model.integerVariables;
          var nIntegerVars = integerVariables.length;
          for (var v = 0; v < nIntegerVars; v++) {
            var varRow = this.rowByVarIndex[integerVariables[v].index];
            if (varRow === -1) {
              continue;
            }
            var varValue = this.matrix[varRow][this.rhsColumn];
            if (Math.abs(varValue - Math.round(varValue)) > this.precision) {
              return false;
            }
          }
          return true;
        };
        Tableau_1.prototype.computeFractionalVolume = function(ignoreIntegerValues) {
          var volume = -1;
          for (var r = 1; r < this.height; r += 1) {
            if (this.variablesPerIndex[this.varIndexByRow[r]].isInteger) {
              var rhs = this.matrix[r][this.rhsColumn];
              rhs = Math.abs(rhs);
              var decimalPart = Math.min(rhs - Math.floor(rhs), Math.floor(rhs + 1));
              if (decimalPart < this.precision) {
                if (!ignoreIntegerValues) {
                  return 0;
                }
              } else {
                if (volume === -1) {
                  volume = rhs;
                } else {
                  volume *= rhs;
                }
              }
            }
          }
          if (volume === -1) {
            return 0;
          }
          return volume;
        };
        var Tableau$1 = Tableau_1;
        function Cut(type2, varIndex, value) {
          this.type = type2;
          this.varIndex = varIndex;
          this.value = value;
        }
        function Branch(relaxedEvaluation, cuts) {
          this.relaxedEvaluation = relaxedEvaluation;
          this.cuts = cuts;
        }
        function sortByEvaluation(a, b) {
          return b.relaxedEvaluation - a.relaxedEvaluation;
        }
        Tableau_1.prototype.applyCuts = function(branchingCuts) {
          this.restore();
          this.addCutConstraints(branchingCuts);
          this.simplex();
          if (this.model.useMIRCuts) {
            var fractionalVolumeImproved = true;
            while (fractionalVolumeImproved) {
              var fractionalVolumeBefore = this.computeFractionalVolume(true);
              this.applyMIRCuts();
              this.simplex();
              var fractionalVolumeAfter = this.computeFractionalVolume(true);
              if (fractionalVolumeAfter >= 0.9 * fractionalVolumeBefore) {
                fractionalVolumeImproved = false;
              }
            }
          }
        };
        Tableau_1.prototype.branchAndCut = function() {
          var branches = [];
          var iterations = 0;
          var tolerance = this.model.tolerance;
          var toleranceFlag = true;
          var terminalTime = 1e99;
          if (this.model.timeout) {
            terminalTime = Date.now() + this.model.timeout;
          }
          var bestEvaluation = Infinity;
          var bestBranch = null;
          var bestOptionalObjectivesEvaluations = [];
          for (var oInit = 0; oInit < this.optionalObjectives.length; oInit += 1) {
            bestOptionalObjectivesEvaluations.push(Infinity);
          }
          var branch = new Branch(-Infinity, []);
          var acceptableThreshold;
          branches.push(branch);
          while (branches.length > 0 && toleranceFlag === true && Date.now() < terminalTime) {
            if (this.model.isMinimization) {
              acceptableThreshold = this.bestPossibleEval * (1 + tolerance);
            } else {
              acceptableThreshold = this.bestPossibleEval * (1 - tolerance);
            }
            if (tolerance > 0) {
              if (bestEvaluation < acceptableThreshold) {
                toleranceFlag = false;
              }
            }
            branch = branches.pop();
            if (branch.relaxedEvaluation > bestEvaluation) {
              continue;
            }
            var cuts = branch.cuts;
            this.applyCuts(cuts);
            iterations++;
            if (this.feasible === false) {
              continue;
            }
            var evaluation = this.evaluation;
            if (evaluation > bestEvaluation) {
              continue;
            }
            if (evaluation === bestEvaluation) {
              var isCurrentEvaluationWorse = true;
              for (var o = 0; o < this.optionalObjectives.length; o += 1) {
                if (this.optionalObjectives[o].reducedCosts[0] > bestOptionalObjectivesEvaluations[o]) {
                  break;
                } else if (this.optionalObjectives[o].reducedCosts[0] < bestOptionalObjectivesEvaluations[o]) {
                  isCurrentEvaluationWorse = false;
                  break;
                }
              }
              if (isCurrentEvaluationWorse) {
                continue;
              }
            }
            if (this.isIntegral() === true) {
              this.__isIntegral = true;
              if (iterations === 1) {
                this.branchAndCutIterations = iterations;
                return;
              }
              bestBranch = branch;
              bestEvaluation = evaluation;
              for (var oCopy = 0; oCopy < this.optionalObjectives.length; oCopy += 1) {
                bestOptionalObjectivesEvaluations[oCopy] = this.optionalObjectives[oCopy].reducedCosts[0];
              }
            } else {
              if (iterations === 1) {
                this.save();
              }
              var variable = this.getMostFractionalVar();
              var varIndex = variable.index;
              var cutsHigh = [];
              var cutsLow = [];
              var nCuts = cuts.length;
              for (var c = 0; c < nCuts; c += 1) {
                var cut = cuts[c];
                if (cut.varIndex === varIndex) {
                  if (cut.type === "min") {
                    cutsLow.push(cut);
                  } else {
                    cutsHigh.push(cut);
                  }
                } else {
                  cutsHigh.push(cut);
                  cutsLow.push(cut);
                }
              }
              var min2 = Math.ceil(variable.value);
              var max2 = Math.floor(variable.value);
              var cutHigh = new Cut("min", varIndex, min2);
              cutsHigh.push(cutHigh);
              var cutLow = new Cut("max", varIndex, max2);
              cutsLow.push(cutLow);
              branches.push(new Branch(evaluation, cutsHigh));
              branches.push(new Branch(evaluation, cutsLow));
              branches.sort(sortByEvaluation);
            }
          }
          if (bestBranch !== null) {
            this.applyCuts(bestBranch.cuts);
          }
          this.branchAndCutIterations = iterations;
        };
        var branchAndCut = {};
        var Constraint$1 = expressions.Constraint;
        var Equality$1 = expressions.Equality;
        var Variable$1 = expressions.Variable;
        var IntegerVariable$1 = expressions.IntegerVariable;
        function Model(precision, name) {
          this.tableau = new Tableau_1(precision);
          this.name = name;
          this.variables = [];
          this.integerVariables = [];
          this.unrestrictedVariables = {};
          this.constraints = [];
          this.nConstraints = 0;
          this.nVariables = 0;
          this.isMinimization = true;
          this.tableauInitialized = false;
          this.relaxationIndex = 1;
          this.useMIRCuts = false;
          this.checkForCycles = true;
          this.messages = [];
        }
        var Model_1 = Model;
        Model.prototype.minimize = function() {
          this.isMinimization = true;
          return this;
        };
        Model.prototype.maximize = function() {
          this.isMinimization = false;
          return this;
        };
        Model.prototype._getNewElementIndex = function() {
          if (this.availableIndexes.length > 0) {
            return this.availableIndexes.pop();
          }
          var index2 = this.lastElementIndex;
          this.lastElementIndex += 1;
          return index2;
        };
        Model.prototype._addConstraint = function(constraint) {
          var slackVariable = constraint.slack;
          this.tableau.variablesPerIndex[slackVariable.index] = slackVariable;
          this.constraints.push(constraint);
          this.nConstraints += 1;
          if (this.tableauInitialized === true) {
            this.tableau.addConstraint(constraint);
          }
        };
        Model.prototype.smallerThan = function(rhs) {
          var constraint = new Constraint$1(rhs, true, this.tableau.getNewElementIndex(), this);
          this._addConstraint(constraint);
          return constraint;
        };
        Model.prototype.greaterThan = function(rhs) {
          var constraint = new Constraint$1(rhs, false, this.tableau.getNewElementIndex(), this);
          this._addConstraint(constraint);
          return constraint;
        };
        Model.prototype.equal = function(rhs) {
          var constraintUpper = new Constraint$1(rhs, true, this.tableau.getNewElementIndex(), this);
          this._addConstraint(constraintUpper);
          var constraintLower = new Constraint$1(rhs, false, this.tableau.getNewElementIndex(), this);
          this._addConstraint(constraintLower);
          return new Equality$1(constraintUpper, constraintLower);
        };
        Model.prototype.addVariable = function(cost, id2, isInteger, isUnrestricted, priority) {
          if (typeof priority === "string") {
            switch (priority) {
              case "required":
                priority = 0;
                break;
              case "strong":
                priority = 1;
                break;
              case "medium":
                priority = 2;
                break;
              case "weak":
                priority = 3;
                break;
              default:
                priority = 0;
                break;
            }
          }
          var varIndex = this.tableau.getNewElementIndex();
          if (id2 === null || id2 === void 0) {
            id2 = "v" + varIndex;
          }
          if (cost === null || cost === void 0) {
            cost = 0;
          }
          if (priority === null || priority === void 0) {
            priority = 0;
          }
          var variable;
          if (isInteger) {
            variable = new IntegerVariable$1(id2, cost, varIndex, priority);
            this.integerVariables.push(variable);
          } else {
            variable = new Variable$1(id2, cost, varIndex, priority);
          }
          this.variables.push(variable);
          this.tableau.variablesPerIndex[varIndex] = variable;
          if (isUnrestricted) {
            this.unrestrictedVariables[varIndex] = true;
          }
          this.nVariables += 1;
          if (this.tableauInitialized === true) {
            this.tableau.addVariable(variable);
          }
          return variable;
        };
        Model.prototype._removeConstraint = function(constraint) {
          var idx = this.constraints.indexOf(constraint);
          if (idx === -1) {
            console.warn("[Model.removeConstraint] Constraint not present in model");
            return;
          }
          this.constraints.splice(idx, 1);
          this.nConstraints -= 1;
          if (this.tableauInitialized === true) {
            this.tableau.removeConstraint(constraint);
          }
          if (constraint.relaxation) {
            this.removeVariable(constraint.relaxation);
          }
        };
        Model.prototype.removeConstraint = function(constraint) {
          if (constraint.isEquality) {
            this._removeConstraint(constraint.upperBound);
            this._removeConstraint(constraint.lowerBound);
          } else {
            this._removeConstraint(constraint);
          }
          return this;
        };
        Model.prototype.removeVariable = function(variable) {
          var idx = this.variables.indexOf(variable);
          if (idx === -1) {
            console.warn("[Model.removeVariable] Variable not present in model");
            return;
          }
          this.variables.splice(idx, 1);
          if (this.tableauInitialized === true) {
            this.tableau.removeVariable(variable);
          }
          return this;
        };
        Model.prototype.updateRightHandSide = function(constraint, difference) {
          if (this.tableauInitialized === true) {
            this.tableau.updateRightHandSide(constraint, difference);
          }
          return this;
        };
        Model.prototype.updateConstraintCoefficient = function(constraint, variable, difference) {
          if (this.tableauInitialized === true) {
            this.tableau.updateConstraintCoefficient(constraint, variable, difference);
          }
          return this;
        };
        Model.prototype.setCost = function(cost, variable) {
          var difference = cost - variable.cost;
          if (this.isMinimization === false) {
            difference = -difference;
          }
          variable.cost = cost;
          this.tableau.updateCost(variable, difference);
          return this;
        };
        Model.prototype.loadJson = function(jsonModel) {
          this.isMinimization = jsonModel.opType !== "max";
          var variables = jsonModel.variables;
          var constraints = jsonModel.constraints;
          var constraintsMin = {};
          var constraintsMax = {};
          var constraintIds = Object.keys(constraints);
          var nConstraintIds = constraintIds.length;
          for (var c = 0; c < nConstraintIds; c += 1) {
            var constraintId = constraintIds[c];
            var constraint = constraints[constraintId];
            var equal = constraint.equal;
            var weight = constraint.weight;
            var priority = constraint.priority;
            var relaxed = weight !== void 0 || priority !== void 0;
            var lowerBound, upperBound;
            if (equal === void 0) {
              var min2 = constraint.min;
              if (min2 !== void 0) {
                lowerBound = this.greaterThan(min2);
                constraintsMin[constraintId] = lowerBound;
                if (relaxed) {
                  lowerBound.relax(weight, priority);
                }
              }
              var max2 = constraint.max;
              if (max2 !== void 0) {
                upperBound = this.smallerThan(max2);
                constraintsMax[constraintId] = upperBound;
                if (relaxed) {
                  upperBound.relax(weight, priority);
                }
              }
            } else {
              lowerBound = this.greaterThan(equal);
              constraintsMin[constraintId] = lowerBound;
              upperBound = this.smallerThan(equal);
              constraintsMax[constraintId] = upperBound;
              var equality = new Equality$1(lowerBound, upperBound);
              if (relaxed) {
                equality.relax(weight, priority);
              }
            }
          }
          var variableIds = Object.keys(variables);
          var nVariables = variableIds.length;
          this.tolerance = jsonModel.tolerance || 0;
          if (jsonModel.timeout) {
            this.timeout = jsonModel.timeout;
          }
          if (jsonModel.options) {
            if (jsonModel.options.timeout) {
              this.timeout = jsonModel.options.timeout;
            }
            if (this.tolerance === 0) {
              this.tolerance = jsonModel.options.tolerance || 0;
            }
            if (jsonModel.options.useMIRCuts) {
              this.useMIRCuts = jsonModel.options.useMIRCuts;
            }
            if (typeof jsonModel.options.exitOnCycles === "undefined") {
              this.checkForCycles = true;
            } else {
              this.checkForCycles = jsonModel.options.exitOnCycles;
            }
          }
          var integerVarIds = jsonModel.ints || {};
          var binaryVarIds = jsonModel.binaries || {};
          var unrestrictedVarIds = jsonModel.unrestricted || {};
          var objectiveName = jsonModel.optimize;
          for (var v = 0; v < nVariables; v += 1) {
            var variableId = variableIds[v];
            var variableConstraints = variables[variableId];
            var cost = variableConstraints[objectiveName] || 0;
            var isBinary = !!binaryVarIds[variableId];
            var isInteger = !!integerVarIds[variableId] || isBinary;
            var isUnrestricted = !!unrestrictedVarIds[variableId];
            var variable = this.addVariable(cost, variableId, isInteger, isUnrestricted);
            if (isBinary) {
              this.smallerThan(1).addTerm(1, variable);
            }
            var constraintNames = Object.keys(variableConstraints);
            for (c = 0; c < constraintNames.length; c += 1) {
              var constraintName = constraintNames[c];
              if (constraintName === objectiveName) {
                continue;
              }
              var coefficient = variableConstraints[constraintName];
              var constraintMin = constraintsMin[constraintName];
              if (constraintMin !== void 0) {
                constraintMin.addTerm(coefficient, variable);
              }
              var constraintMax = constraintsMax[constraintName];
              if (constraintMax !== void 0) {
                constraintMax.addTerm(coefficient, variable);
              }
            }
          }
          return this;
        };
        Model.prototype.getNumberOfIntegerVariables = function() {
          return this.integerVariables.length;
        };
        Model.prototype.solve = function() {
          if (this.tableauInitialized === false) {
            this.tableau.setModel(this);
            this.tableauInitialized = true;
          }
          return this.tableau.solve();
        };
        Model.prototype.isFeasible = function() {
          return this.tableau.feasible;
        };
        Model.prototype.save = function() {
          return this.tableau.save();
        };
        Model.prototype.restore = function() {
          return this.tableau.restore();
        };
        Model.prototype.activateMIRCuts = function(useMIRCuts) {
          this.useMIRCuts = useMIRCuts;
        };
        Model.prototype.debug = function(debugCheckForCycles) {
          this.checkForCycles = debugCheckForCycles;
        };
        Model.prototype.log = function(message) {
          return this.tableau.log(message);
        };
        var CleanObjectiveAttributes = function(model) {
          var fakeAttr, x, z;
          if (typeof model.optimize === "string") {
            if (model.constraints[model.optimize]) {
              fakeAttr = Math.random();
              for (x in model.variables) {
                if (model.variables[x][model.optimize]) {
                  model.variables[x][fakeAttr] = model.variables[x][model.optimize];
                }
              }
              model.constraints[fakeAttr] = model.constraints[model.optimize];
              delete model.constraints[model.optimize];
              return model;
            } else {
              return model;
            }
          } else {
            for (z in model.optimize) {
              if (model.constraints[z]) {
                if (model.constraints[z] === "equal") {
                  delete model.optimize[z];
                } else {
                  fakeAttr = Math.random();
                  for (x in model.variables) {
                    if (model.variables[x][z]) {
                      model.variables[x][fakeAttr] = model.variables[x][z];
                    }
                  }
                  model.constraints[fakeAttr] = model.constraints[z];
                  delete model.constraints[z];
                }
              }
            }
            return model;
          }
        };
        var Validation = {
          CleanObjectiveAttributes
        };
        function to_JSON(input) {
          var rxo = {
            /* jshint ignore:start */
            "is_blank": /^\W{0,}$/,
            "is_objective": /(max|min)(imize){0,}\:/i,
            //previous version
            //"is_int": /^\W{0,}int/i,
            //new version to avoid comments
            "is_int": /^(?!\/\*)\W{0,}int/i,
            "is_bin": /^(?!\/\*)\W{0,}bin/i,
            "is_constraint": /(\>|\<){0,}\=/i,
            "is_unrestricted": /^\S{0,}unrestricted/i,
            "parse_lhs": /(\-|\+){0,1}\s{0,1}\d{0,}\.{0,}\d{0,}\s{0,}[A-Za-z]\S{0,}/gi,
            "parse_rhs": /(\-|\+){0,1}\d{1,}\.{0,}\d{0,}\W{0,}\;{0,1}$/i,
            "parse_dir": /(\>|\<){0,}\=/gi,
            "parse_int": /[^\s|^\,]+/gi,
            "parse_bin": /[^\s|^\,]+/gi,
            "get_num": /(\-|\+){0,1}(\W|^)\d+\.{0,1}\d{0,}/g,
            // Why accepting character \W before the first digit?
            "get_word": /[A-Za-z].*/
            /* jshint ignore:end */
          }, model = {
            "opType": "",
            "optimize": "_obj",
            "constraints": {},
            "variables": {}
          }, constraints = {
            ">=": "min",
            "<=": "max",
            "=": "equal"
          }, tmp = "", ary = null, hldr = "", hldr2 = "", constraint = "", rhs = 0;
          if (typeof input === "string") {
            input = input.split("\n");
          }
          for (var i = 0; i < input.length; i++) {
            constraint = "__" + i;
            tmp = input[i];
            ary = null;
            if (rxo.is_objective.test(tmp)) {
              model.opType = tmp.match(/(max|min)/gi)[0];
              ary = tmp.match(rxo.parse_lhs).map(function(d) {
                return d.replace(/\s+/, "");
              }).slice(1);
              ary.forEach(function(d) {
                hldr = d.match(rxo.get_num);
                if (hldr === null) {
                  if (d.substr(0, 1) === "-") {
                    hldr = -1;
                  } else {
                    hldr = 1;
                  }
                } else {
                  hldr = hldr[0];
                }
                hldr = parseFloat(hldr);
                hldr2 = d.match(rxo.get_word)[0].replace(/\;$/, "");
                model.variables[hldr2] = model.variables[hldr2] || {};
                model.variables[hldr2]._obj = hldr;
              });
            } else if (rxo.is_int.test(tmp)) {
              ary = tmp.match(rxo.parse_int).slice(1);
              model.ints = model.ints || {};
              ary.forEach(function(d) {
                d = d.replace(";", "");
                model.ints[d] = 1;
              });
            } else if (rxo.is_bin.test(tmp)) {
              ary = tmp.match(rxo.parse_bin).slice(1);
              model.binaries = model.binaries || {};
              ary.forEach(function(d) {
                d = d.replace(";", "");
                model.binaries[d] = 1;
              });
            } else if (rxo.is_constraint.test(tmp)) {
              var separatorIndex = tmp.indexOf(":");
              var constraintExpression = separatorIndex === -1 ? tmp : tmp.slice(separatorIndex + 1);
              ary = constraintExpression.match(rxo.parse_lhs).map(function(d) {
                return d.replace(/\s+/, "");
              });
              ary.forEach(function(d) {
                hldr = d.match(rxo.get_num);
                if (hldr === null) {
                  if (d.substr(0, 1) === "-") {
                    hldr = -1;
                  } else {
                    hldr = 1;
                  }
                } else {
                  hldr = hldr[0];
                }
                hldr = parseFloat(hldr);
                hldr2 = d.match(rxo.get_word)[0];
                model.variables[hldr2] = model.variables[hldr2] || {};
                model.variables[hldr2][constraint] = hldr;
              });
              rhs = parseFloat(tmp.match(rxo.parse_rhs)[0]);
              tmp = constraints[tmp.match(rxo.parse_dir)[0]];
              model.constraints[constraint] = model.constraints[constraint] || {};
              model.constraints[constraint][tmp] = rhs;
            } else if (rxo.is_unrestricted.test(tmp)) {
              ary = tmp.match(rxo.parse_int).slice(1);
              model.unrestricted = model.unrestricted || {};
              ary.forEach(function(d) {
                d = d.replace(";", "");
                model.unrestricted[d] = 1;
              });
            }
          }
          return model;
        }
        function from_JSON(model) {
          if (!model) {
            throw new Error("Solver requires a model to operate on");
          }
          var output = "", lookup = {
            "max": "<=",
            "min": ">=",
            "equal": "="
          }, rxClean = new RegExp("[^A-Za-z0-9]+", "gi");
          output += model.opType + ":";
          for (var x in model.variables) {
            model.variables[x][x] = model.variables[x][x] ? model.variables[x][x] : 1;
            if (model.variables[x][model.optimize]) {
              output += " " + model.variables[x][model.optimize] + " " + x.replace(rxClean, "_");
            }
          }
          output += ";\n";
          for (x in model.constraints) {
            for (var y in model.constraints[x]) {
              for (var z in model.variables) {
                if (model.variables[z][x]) {
                  output += " " + model.variables[z][x] + " " + z.replace(rxClean, "_");
                }
              }
              output += " " + lookup[y] + " " + model.constraints[x][y];
              output += ";\n";
            }
          }
          if (model.ints) {
            output += "\n\n";
            for (x in model.ints) {
              output += "int " + x.replace(rxClean, "_") + ";\n";
            }
          }
          if (model.unrestricted) {
            output += "\n\n";
            for (x in model.unrestricted) {
              output += "unrestricted " + x.replace(rxClean, "_") + ";\n";
            }
          }
          return output;
        }
        var Reformat = function(model) {
          if (model.length) {
            return to_JSON(model);
          } else {
            return from_JSON(model);
          }
        };
        var Polyopt = function(solver, model) {
          var objectives = model.optimize, new_constraints = JSON.parse(JSON.stringify(model.optimize)), keys = Object.keys(model.optimize), tmp, counter = 0, vectors = {}, vector_key = "", obj = {}, pareto = [], i, j, x, y;
          delete model.optimize;
          for (i = 0; i < keys.length; i++) {
            new_constraints[keys[i]] = 0;
          }
          for (i = 0; i < keys.length; i++) {
            model.optimize = keys[i];
            model.opType = objectives[keys[i]];
            tmp = solver.Solve(model, void 0, void 0, true);
            for (y in keys) {
              if (!model.variables[keys[y]]) {
                tmp[keys[y]] = tmp[keys[y]] ? tmp[keys[y]] : 0;
                for (x in model.variables) {
                  if (model.variables[x][keys[y]] && tmp[x]) {
                    tmp[keys[y]] += tmp[x] * model.variables[x][keys[y]];
                  }
                }
              }
            }
            vector_key = "base";
            for (j = 0; j < keys.length; j++) {
              if (tmp[keys[j]]) {
                vector_key += "-" + (tmp[keys[j]] * 1e3 | 0) / 1e3;
              } else {
                vector_key += "-0";
              }
            }
            if (!vectors[vector_key]) {
              vectors[vector_key] = 1;
              counter++;
              for (j = 0; j < keys.length; j++) {
                if (tmp[keys[j]]) {
                  new_constraints[keys[j]] += tmp[keys[j]];
                }
              }
              delete tmp.feasible;
              delete tmp.result;
              pareto.push(tmp);
            }
          }
          for (i = 0; i < keys.length; i++) {
            model.constraints[keys[i]] = { "equal": new_constraints[keys[i]] / counter };
          }
          model.optimize = "cheater-" + Math.random();
          model.opType = "max";
          for (i in model.variables) {
            model.variables[i].cheater = 1;
          }
          for (i in pareto) {
            for (x in pareto[i]) {
              obj[x] = obj[x] || { min: 1e99, max: -1e99 };
            }
          }
          for (i in obj) {
            for (x in pareto) {
              if (pareto[x][i]) {
                if (pareto[x][i] > obj[i].max) {
                  obj[i].max = pareto[x][i];
                }
                if (pareto[x][i] < obj[i].min) {
                  obj[i].min = pareto[x][i];
                }
              } else {
                pareto[x][i] = 0;
                obj[i].min = 0;
              }
            }
          }
          tmp = solver.Solve(model, void 0, void 0, true);
          return {
            midpoint: tmp,
            vertices: pareto,
            ranges: obj
          };
        };
        var Constraint$2 = expressions.Constraint;
        var Variable$2 = expressions.Variable;
        var Numeral = expressions.Numeral;
        var Term$2 = expressions.Term;
        var Solver = function() {
          this.Model = Model_1;
          this.branchAndCut = branchAndCut;
          this.Constraint = Constraint$2;
          this.Variable = Variable$2;
          this.Numeral = Numeral;
          this.Term = Term$2;
          this.Tableau = Tableau$1;
          this.lastSolvedModel = null;
          this.Solve = function(model, precision, full, validate) {
            if (validate) {
              for (var test in Validation) {
                model = Validation[test](model);
              }
            }
            if (!model) {
              throw new Error("Solver requires a model to operate on");
            }
            if (model instanceof Model_1 === false) {
              model = new Model_1(precision).loadJson(model);
            }
            var solution = model.solve();
            this.lastSolvedModel = model;
            solution.solutionSet = solution.generateSolutionSet();
            if (full) {
              return solution;
            } else {
              var store = {};
              store.feasible = solution.feasible;
              store.result = solution.evaluation;
              store.bounded = solution.bounded;
              if (solution._tableau.__isIntegral) {
                store.isIntegral = true;
              }
              Object.keys(solution.solutionSet).forEach(function(d) {
                if (solution.solutionSet[d] !== 0) {
                  store[d] = solution.solutionSet[d];
                }
              });
              return store;
            }
          };
          this.ReformatLP = Reformat;
          this.MultiObjective = function(model) {
            return Polyopt(this, model);
          };
        };
        if (typeof window === "object") {
          window.solver = new Solver();
        }
        var main = new Solver();
        const crossings = "crossings";
        function opt() {
          let debug = false;
          function key(...nodes) {
            return nodes.map((n) => n.id).sort().join(debug ? " => " : "\0\0");
          }
          function perms(model, layer) {
            layer.sort((n1, n2) => n1.id > n2.id || -1);
            layer.slice(0, layer.length - 1).forEach(
              (n1, i) => layer.slice(i + 1).forEach((n2) => {
                const pair = key(n1, n2);
                model.ints[pair] = 1;
                model.constraints[pair] = { max: 1 };
                model.variables[pair] = { [pair]: 1 };
              })
            );
            layer.slice(0, layer.length - 1).forEach(
              (n1, i) => layer.slice(i + 1).forEach((n2, j) => {
                const pair1 = key(n1, n2);
                layer.slice(i + j + 2).forEach((n3) => {
                  const pair2 = key(n1, n3);
                  const pair3 = key(n2, n3);
                  const triangle = key(n1, n2, n3);
                  const triangleUp = triangle + "+";
                  model.constraints[triangleUp] = { max: 1 };
                  model.variables[pair1][triangleUp] = 1;
                  model.variables[pair2][triangleUp] = -1;
                  model.variables[pair3][triangleUp] = 1;
                  const triangleDown = triangle + "-";
                  model.constraints[triangleDown] = { min: 0 };
                  model.variables[pair1][triangleDown] = 1;
                  model.variables[pair2][triangleDown] = -1;
                  model.variables[pair3][triangleDown] = 1;
                });
              })
            );
          }
          function cross(model, layer) {
            layer.slice(0, layer.length - 1).forEach(
              (p1, i) => layer.slice(i + 1).forEach((p2) => {
                const pairp = key(p1, p2);
                p1.children.forEach(
                  (c1) => p2.children.filter((c) => c !== c1).forEach((c2) => {
                    const pairc = key(c1, c2);
                    const slack = debug ? `slack (${pairp}) (${pairc})` : `${pairp}\0\0\0${pairc}`;
                    const slackUp = `${slack}${debug ? " " : "\0\0\0"}+`;
                    const slackDown = `${slack}${debug ? " " : "\0\0\0"}-`;
                    model.variables[slack] = {
                      [slackUp]: 1,
                      [slackDown]: 1,
                      [crossings]: 1
                    };
                    const flip = +(c1.id > c2.id);
                    const sign = flip || -1;
                    model.constraints[slackUp] = { min: flip };
                    model.variables[pairp][slackUp] = 1;
                    model.variables[pairc][slackUp] = sign;
                    model.constraints[slackDown] = { min: -flip };
                    model.variables[pairp][slackDown] = -1;
                    model.variables[pairc][slackDown] = -sign;
                  })
                );
              })
            );
          }
          function decrossOpt2(layers) {
            const model = {
              optimize: crossings,
              optType: "min",
              constraints: {},
              variables: {},
              ints: {}
            };
            layers.forEach((lay) => perms(model, lay));
            layers.slice(0, layers.length - 1).forEach((lay) => cross(model, lay));
            const ordering = main.Solve(model);
            layers.forEach(
              (layer) => layer.sort(
                (n1, n2) => (n1.id > n2.id || -1) * (ordering[key(n1, n2)] || -1)
              )
            );
            return layers;
          }
          decrossOpt2.debug = function(x) {
            return arguments.length ? (debug = x, decrossOpt2) : debug;
          };
          return decrossOpt2;
        }
        function ascending2(a, b) {
          return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        }
        function bisector(compare) {
          if (compare.length === 1)
            compare = ascendingComparator(compare);
          return {
            left: function(a, x, lo, hi) {
              if (lo == null)
                lo = 0;
              if (hi == null)
                hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) < 0)
                  lo = mid + 1;
                else
                  hi = mid;
              }
              return lo;
            },
            right: function(a, x, lo, hi) {
              if (lo == null)
                lo = 0;
              if (hi == null)
                hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x) > 0)
                  hi = mid;
                else
                  lo = mid + 1;
              }
              return lo;
            }
          };
        }
        function ascendingComparator(f) {
          return function(d, x) {
            return ascending2(f(d), x);
          };
        }
        var ascendingBisect = bisector(ascending2);
        function number(x) {
          return x === null ? NaN : +x;
        }
        function quantile(values, p, valueof) {
          if (valueof == null)
            valueof = number;
          if (!(n = values.length))
            return;
          if ((p = +p) <= 0 || n < 2)
            return +valueof(values[0], 0, values);
          if (p >= 1)
            return +valueof(values[n - 1], n - 1, values);
          var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
          return value0 + (value1 - value0) * (i - i0);
        }
        function median(values, valueof) {
          var n = values.length, i = -1, value, numbers = [];
          if (valueof == null) {
            while (++i < n) {
              if (!isNaN(value = number(values[i]))) {
                numbers.push(value);
              }
            }
          } else {
            while (++i < n) {
              if (!isNaN(value = number(valueof(values[i], i, values)))) {
                numbers.push(value);
              }
            }
          }
          return quantile(numbers.sort(ascending2), 0.5);
        }
        function median$1() {
          function twolayerMedian(topLayer, bottomLayer) {
            bottomLayer.forEach((n) => n._median = []);
            topLayer.forEach((n, i) => n.children.forEach((c) => c._median.push(i)));
            bottomLayer.forEach((n) => n._median = median(n._median) || 0);
            bottomLayer.sort((a, b) => a._median - b._median);
            bottomLayer.forEach((n) => delete n._median);
          }
          return twolayerMedian;
        }
        function twoLayer() {
          let order = median$1();
          function decrossTwoLayer(layers) {
            layers.slice(0, layers.length - 1).forEach((layer, i) => order(layer, layers[i + 1]));
            return layers;
          }
          decrossTwoLayer.order = function(x) {
            return arguments.length ? (order = x, decrossTwoLayer) : order;
          };
          return decrossTwoLayer;
        }
        function commonjsRequire() {
          throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
        }
        function createCommonjsModule(fn, module2) {
          return module2 = { exports: {} }, fn(module2, module2.exports), module2.exports;
        }
        var FastPriorityQueue_1 = createCommonjsModule(function(module2) {
          var defaultcomparator = function(a, b) {
            return a < b;
          };
          function FastPriorityQueue(comparator) {
            if (!(this instanceof FastPriorityQueue))
              return new FastPriorityQueue(comparator);
            this.array = [];
            this.size = 0;
            this.compare = comparator || defaultcomparator;
          }
          FastPriorityQueue.prototype.clone = function() {
            var fpq = new FastPriorityQueue(this.compare);
            fpq.size = this.size;
            for (var i = 0; i < this.size; i++) {
              fpq.array.push(this.array[i]);
            }
            return fpq;
          };
          FastPriorityQueue.prototype.add = function(myval) {
            var i = this.size;
            this.array[this.size] = myval;
            this.size += 1;
            var p;
            var ap;
            while (i > 0) {
              p = i - 1 >> 1;
              ap = this.array[p];
              if (!this.compare(myval, ap)) {
                break;
              }
              this.array[i] = ap;
              i = p;
            }
            this.array[i] = myval;
          };
          FastPriorityQueue.prototype.heapify = function(arr) {
            this.array = arr;
            this.size = arr.length;
            var i;
            for (i = this.size >> 1; i >= 0; i--) {
              this._percolateDown(i);
            }
          };
          FastPriorityQueue.prototype._percolateUp = function(i, force) {
            var myval = this.array[i];
            var p;
            var ap;
            while (i > 0) {
              p = i - 1 >> 1;
              ap = this.array[p];
              if (!force && !this.compare(myval, ap)) {
                break;
              }
              this.array[i] = ap;
              i = p;
            }
            this.array[i] = myval;
          };
          FastPriorityQueue.prototype._percolateDown = function(i) {
            var size2 = this.size;
            var hsize = this.size >>> 1;
            var ai = this.array[i];
            var l;
            var r;
            var bestc;
            while (i < hsize) {
              l = (i << 1) + 1;
              r = l + 1;
              bestc = this.array[l];
              if (r < size2) {
                if (this.compare(this.array[r], bestc)) {
                  l = r;
                  bestc = this.array[r];
                }
              }
              if (!this.compare(bestc, ai)) {
                break;
              }
              this.array[i] = bestc;
              i = l;
            }
            this.array[i] = ai;
          };
          FastPriorityQueue.prototype._removeAt = function(index2) {
            if (this.isEmpty() || index2 > this.size - 1 || index2 < 0)
              return false;
            this._percolateUp(index2, true);
            this.poll();
            return true;
          };
          FastPriorityQueue.prototype.remove = function(myval, comparator) {
            if (!comparator) {
              comparator = this.compare;
            }
            if (this.isEmpty())
              return false;
            for (var i = 0; i < this.size; i++) {
              if (comparator(this.array[i], myval) || comparator(myval, this.array[i])) {
                continue;
              }
              return this._removeAt(i);
            }
            return false;
          };
          FastPriorityQueue.prototype.peek = function() {
            if (this.size == 0)
              return void 0;
            return this.array[0];
          };
          FastPriorityQueue.prototype.poll = function() {
            if (this.size == 0)
              return void 0;
            var ans = this.array[0];
            if (this.size > 1) {
              this.array[0] = this.array[--this.size];
              this._percolateDown(0 | 0);
            } else {
              this.size -= 1;
            }
            return ans;
          };
          FastPriorityQueue.prototype.replaceTop = function(myval) {
            if (this.size == 0)
              return void 0;
            var ans = this.array[0];
            this.array[0] = myval;
            this._percolateDown(0 | 0);
            return ans;
          };
          FastPriorityQueue.prototype.trim = function() {
            this.array = this.array.slice(0, this.size);
          };
          FastPriorityQueue.prototype.isEmpty = function() {
            return this.size === 0;
          };
          FastPriorityQueue.prototype.forEach = function(callback) {
            if (this.isEmpty() || typeof callback != "function")
              return;
            var i = 0;
            var fpq = this.clone();
            while (!fpq.isEmpty()) {
              callback(fpq.poll(), i++);
            }
          };
          FastPriorityQueue.prototype.kSmallest = function(k) {
            if (this.size == 0)
              return [];
            var comparator = this.compare;
            var arr = this.array;
            var fpq = new FastPriorityQueue(function(a, b) {
              return comparator(arr[a], arr[b]);
            });
            k = Math.min(this.size, k);
            var smallest = new Array(k);
            var j = 0;
            fpq.add(0);
            while (j < k) {
              var small = fpq.poll();
              smallest[j++] = this.array[small];
              var l = (small << 1) + 1;
              var r = l + 1;
              if (l < this.size)
                fpq.add(l);
              if (r < this.size)
                fpq.add(r);
            }
            return smallest;
          };
          var main2 = function() {
            var x = new FastPriorityQueue(function(a, b) {
              return a < b;
            });
            x.add(1);
            x.add(0);
            x.add(5);
            x.add(4);
            x.add(3);
            while (!x.isEmpty()) {
              console.log(x.poll());
            }
          };
          if (commonjsRequire.main === module2) {
            main2();
          }
          module2.exports = FastPriorityQueue;
        });
        function coffmanGraham() {
          let maxWidth = 0;
          function layeringCoffmanGraham(dag) {
            maxWidth = maxWidth || Math.floor(Math.sqrt(dag.reduce((a) => a + 1, 0)) + 0.5);
            dag.each((node2) => {
              node2._before = [];
              node2._parents = [];
            }).each((n) => n.children.forEach((c) => c._parents.push(n)));
            const queue = FastPriorityQueue_1((a, b) => {
              for (let j = 0; j < a._before.length; ++j) {
                if (j >= b._before.length) {
                  return false;
                } else if (a._before[j] < b._before[j]) {
                  return true;
                } else if (b._before[j] < a._before[j]) {
                  return false;
                }
              }
              return true;
            });
            dag.roots().forEach((n) => queue.add(n));
            let i = 0;
            let layer = 0;
            let width = 0;
            let node;
            while (node = queue.poll()) {
              if (width < maxWidth && node._parents.every((p) => p.layer < layer)) {
                node.layer = layer;
                width++;
              } else {
                node.layer = ++layer;
                width = 1;
              }
              node.children.forEach((child) => {
                child._before.push(i);
                if (child._before.length === child._parents.length) {
                  child._before.sort((a, b) => b - a);
                  queue.add(child);
                }
              });
              i++;
            }
            dag.each((node2) => {
              delete node2._before;
              delete node2._parents;
            });
            return dag;
          }
          layeringCoffmanGraham.width = function(x) {
            return arguments.length ? (maxWidth = x, layeringCoffmanGraham) : maxWidth;
          };
          return layeringCoffmanGraham;
        }
        function layeringLongestPath() {
          let topDown = true;
          function layeringLongestPath2(dag) {
            if (topDown) {
              const maxHeight = Math.max(
                ...dag.height().roots().map((d) => d.value)
              );
              dag.each((n) => {
                n.layer = maxHeight - n.value;
              });
            } else {
              dag.depth();
              dag.each((n) => {
                n.layer = n.value;
              });
            }
            return dag;
          }
          layeringLongestPath2.topDown = function(x) {
            return arguments.length ? (topDown = x, layeringLongestPath2) : topDown;
          };
          return layeringLongestPath2;
        }
        function simplex$1() {
          let debug = false;
          function layeringSimplex2(dag) {
            const prefix = debug ? "" : "\0";
            const delim = debug ? " -> " : "\0";
            const variables = {};
            const ints = {};
            const constraints = {};
            dag.each((node) => {
              const nid = `${prefix}${node.id}`;
              ints[nid] = 1;
              const variable = variables[nid] = { opt: node.children.length };
              node.children.forEach((child) => {
                const edge = `${node.id}${delim}${child.id}`;
                constraints[edge] = { min: 1 };
                variable[edge] = -1;
              });
            });
            dag.each((node) => {
              node.children.forEach((child) => {
                const variable = variables[`${prefix}${child.id}`];
                variable.opt--;
                variable[`${node.id}${delim}${child.id}`] = 1;
              });
            });
            const assignment = main.Solve({
              optimize: "opt",
              opType: "max",
              constraints,
              variables,
              ints
            });
            dag.each((n) => n.layer = assignment[`${prefix}${n.id}`] || 0);
            return dag;
          }
          layeringSimplex2.debug = function(x) {
            return arguments.length ? (debug = x, layeringSimplex2) : debug;
          };
          return layeringSimplex2;
        }
        function topological$1() {
          function layeringTopological(dag) {
            let layer = 0;
            dag.eachBefore((n) => n.layer = layer++);
            return dag;
          }
          return layeringTopological;
        }
        function index() {
          let debug = false;
          let nodeSize = false;
          let width = 1;
          let height2 = 1;
          let layering = simplex$1();
          let decross = twoLayer();
          let coord = greedy();
          let separation = defaultSeparation;
          function createLayers(dag) {
            const layers = [];
            dag.descendants().forEach((node) => {
              const layer = layers[node.layer] || (layers[node.layer] = []);
              layer.push(node);
              node.children = node.children.map((child) => {
                if (child.layer > node.layer + 1) {
                  let last = child;
                  for (let l = child.layer - 1; l > node.layer; l--) {
                    const dummy = new Node(
                      `${node.id}${debug ? "->" : "\0"}${child.id}${debug ? " (" : "\0"}${l}${debug ? ")" : ""}`,
                      void 0
                    );
                    dummy.children = [last];
                    (layers[l] || (layers[l] = [])).push(dummy);
                    last = dummy;
                  }
                  return last;
                } else {
                  return child;
                }
              });
            });
            return layers;
          }
          function removeDummies(dag) {
            dag.each((node) => {
              if (node.data) {
                node.children = node.children.map((child, i) => {
                  const points = [{ x: node.x, y: node.y }];
                  while (!child.data) {
                    points.push({ x: child.x, y: child.y });
                    [child] = child.children;
                  }
                  points.push({ x: child.x, y: child.y });
                  node._childLinkData[i].points = points;
                  return child;
                });
              }
            });
          }
          function sugiyama2(dag) {
            layering(dag);
            if (!dag.every((node) => node.children.every((c) => c.layer > node.layer)))
              throw new Error("layering wasn't proper");
            const layers = createLayers(dag);
            if (layers.length === 1) {
              const [layer] = layers;
              layer.forEach((n) => n.y = height2 / 2);
            } else {
              const dh = nodeSize ? height2 : height2 / (layers.length - 1);
              layers.forEach((layer, i) => layer.forEach((n) => n.y = dh * i));
            }
            if (layers.every((l) => l.length === 1)) {
              layers.forEach(([n]) => n.x = width / 2);
            } else {
              decross(layers);
              coord(layers, separation);
              const minGap = Math.min(
                ...layers.filter((layer) => layer.length > 1).map(
                  (layer) => Math.min(...layer.slice(1).map((n, i) => n.x - layer[i].x))
                )
              );
              const sw = nodeSize ? minGap : 1;
              layers.forEach((layer) => layer.forEach((n) => n.x *= width / sw));
            }
            removeDummies(dag);
            return dag;
          }
          sugiyama2.debug = function(x) {
            return arguments.length ? (debug = x, sugiyama2) : debug;
          };
          sugiyama2.size = function(x) {
            return arguments.length ? (nodeSize = false, [width, height2] = x, sugiyama2) : nodeSize ? null : [width, height2];
          };
          sugiyama2.nodeSize = function(x) {
            return arguments.length ? (nodeSize = true, [width, height2] = x, sugiyama2) : nodeSize ? [width, height2] : null;
          };
          sugiyama2.layering = function(x) {
            return arguments.length ? (layering = x, sugiyama2) : layering;
          };
          sugiyama2.decross = function(x) {
            return arguments.length ? (decross = x, sugiyama2) : decross;
          };
          sugiyama2.coord = function(x) {
            return arguments.length ? (coord = x, sugiyama2) : coord;
          };
          sugiyama2.separation = function(x) {
            return arguments.length ? (separation = x, sugiyama2) : separation;
          };
          return sugiyama2;
        }
        function defaultSeparation() {
          return 1;
        }
        function mean$2() {
          function twolayerMean(topLayer, bottomLayer) {
            bottomLayer.forEach((node) => {
              node._mean = 0;
              node._count = 0;
            });
            topLayer.forEach(
              (n, i) => n.children.forEach((c) => c._mean += (i - c._mean) / ++c._count)
            );
            bottomLayer.sort((a, b) => a._mean - b._mean);
            bottomLayer.forEach((node) => {
              delete node._mean;
              delete node._count;
            });
          }
          return twolayerMean;
        }
        const crossings$1 = "crossings";
        function opt$1() {
          let debug = false;
          function key(...nodes) {
            return nodes.map((n) => n.id).sort().join(debug ? " => " : "\0\0");
          }
          function perms(model, layer) {
            layer.sort((n1, n2) => n1.id > n2.id || -1);
            layer.slice(0, layer.length - 1).forEach(
              (n1, i) => layer.slice(i + 1).forEach((n2) => {
                const pair = key(n1, n2);
                model.ints[pair] = 1;
                model.constraints[pair] = { max: 1 };
                model.variables[pair] = { [pair]: 1 };
              })
            );
            layer.slice(0, layer.length - 1).forEach(
              (n1, i) => layer.slice(i + 1).forEach((n2, j) => {
                const pair1 = key(n1, n2);
                layer.slice(i + j + 2).forEach((n3) => {
                  const pair2 = key(n1, n3);
                  const pair3 = key(n2, n3);
                  const triangle = key(n1, n2, n3);
                  const triangleUp = triangle + "+";
                  model.constraints[triangleUp] = { max: 1 };
                  model.variables[pair1][triangleUp] = 1;
                  model.variables[pair2][triangleUp] = -1;
                  model.variables[pair3][triangleUp] = 1;
                  const triangleDown = triangle + "-";
                  model.constraints[triangleDown] = { min: 0 };
                  model.variables[pair1][triangleDown] = 1;
                  model.variables[pair2][triangleDown] = -1;
                  model.variables[pair3][triangleDown] = 1;
                });
              })
            );
          }
          function cross(model, layer) {
            layer.slice(0, layer.length - 1).forEach(
              (p1, i) => layer.slice(i + 1).forEach((p2) => {
                p1.children.forEach(
                  (c1) => p2.children.filter((c) => c !== c1).forEach((c2) => {
                    const pair = key(c1, c2);
                    model.variables[pair][crossings$1] = +(c1.id > c2.id) || -1;
                  })
                );
              })
            );
          }
          function twolayerOpt(topLayer, bottomLayer) {
            const model = {
              optimize: crossings$1,
              optType: "min",
              constraints: {},
              variables: {},
              ints: {}
            };
            perms(model, bottomLayer);
            cross(model, topLayer);
            const ordering = main.Solve(model);
            bottomLayer.sort(
              (n1, n2) => (n1.id > n2.id || -1) * (ordering[key(n1, n2)] || -1)
            );
          }
          twolayerOpt.debug = function(x) {
            return arguments.length ? (debug = x, twolayerOpt) : debug;
          };
          return twolayerOpt;
        }
        function greedy$1() {
          function greedy2(nodes) {
            const pos = [];
            const neg = [];
            nodes.forEach((node, layer) => {
              node.childLinks().sort(({ target: a }, { target: b }) => a.layer - b.layer).forEach(({ target, data }) => {
                if (target.layer === layer + 1) {
                  data.index = 0;
                } else {
                  const neg_index = (neg.findIndex((i) => i <= layer) + 1 || neg.length + 1) - 1;
                  const pos_index = (pos.findIndex((i) => i <= layer) + 1 || pos.length + 1) - 1;
                  if (neg_index < pos_index) {
                    data.index = -neg_index - 1;
                    neg[neg_index] = target.layer - 1;
                  } else {
                    data.index = pos_index + 1;
                    pos[pos_index] = target.layer - 1;
                  }
                }
              });
            });
          }
          return greedy2;
        }
        function index$1() {
          let width = 1;
          let height2 = 1;
          let indexer = greedy$1();
          function zherebko(dag) {
            const ordered = [];
            dag.eachBefore((node, i) => {
              node.layer = i;
              ordered.push(node);
            });
            const maxLayer = ordered.length - 1;
            if (maxLayer === 0) {
              const [node] = ordered;
              node.x = width / 2;
              node.y = height2 / 2;
            } else {
              indexer(ordered);
              let minIndex = 0;
              let maxIndex = 0;
              dag.eachLinks(({ data }) => {
                minIndex = Math.min(minIndex, data.index);
                maxIndex = Math.max(maxIndex, data.index);
              });
              if (minIndex === maxIndex) {
                minIndex = -1;
                maxIndex = 1;
              }
              dag.each((node) => {
                node.x = -minIndex / (maxIndex - minIndex) * width;
                node.y = node.layer / maxLayer * height2;
              });
              dag.eachLinks(({ source, target, data }) => {
                const points = [{ x: source.x, y: source.y }];
                const x = (data.index - minIndex) / (maxIndex - minIndex) * width;
                const y1 = (source.layer + 1) / maxLayer * height2;
                const y2 = (target.layer - 1) / maxLayer * height2;
                if (target.layer - source.layer === 2) {
                  points.push({ x, y: y1 });
                } else if (target.layer - source.layer > 2) {
                  points.push({ x, y: y1 }, { x, y: y2 });
                }
                points.push({ x: target.x, y: target.y });
                data.points = points;
              });
            }
            return dag;
          }
          zherebko.size = function(x) {
            return arguments.length ? ([width, height2] = x, zherebko) : [width, height2];
          };
          return zherebko;
        }
        function index$2() {
          let width = 1;
          let height2 = 1;
          let layering = layeringLongestPath().topDown(false);
          let decross = twoLayer();
          let columnAssignment = complex();
          let column2Coord = column2CoordRect();
          let interLayerSeparation = defaultLayerSeparation;
          let columnWidth = defaultColumnWidth;
          let columnSeparation = defaultColumnSeparation;
          function createLayers(dag) {
            const layers = [];
            const maxLayer = Math.max(
              0,
              ...dag.descendants().map((node) => node.layer)
            );
            dag.descendants().forEach((node) => {
              const layer = layers[node.layer] || (layers[node.layer] = []);
              layer.push(node);
              node.children = node.children.map((child) => {
                if (child.layer > node.layer + 1) {
                  let last = child;
                  for (let l = child.layer - 1; l > node.layer; l--) {
                    const dummy = new Node(
                      `${node.id}${"\0"}${child.id}${"\0"}${l}${""}`,
                      void 0
                    );
                    dummy.heightRatio = 0;
                    dummy.children = [last];
                    (layers[l] || (layers[l] = [])).push(dummy);
                    last = dummy;
                  }
                  return last;
                } else {
                  return child;
                }
              });
              if (node.children.length === 0 && node.layer < maxLayer) {
                let highestLayerNode = new Node(
                  `${node.id}${"\0"}${"\0"}${maxLayer}${""}`,
                  void 0
                );
                (layers[maxLayer] || (layers[maxLayer] = [])).push(highestLayerNode);
                let last = highestLayerNode;
                for (let l = maxLayer - 1; l > node.layer; l--) {
                  const dummy = new Node(
                    `${node.id}${"\0"}${highestLayerNode.id}${"\0"}${l}${""}`,
                    void 0
                  );
                  dummy.heightRatio = 0;
                  dummy.children = [last];
                  (layers[l] || (layers[l] = [])).push(dummy);
                  last = dummy;
                }
                node.children = [last];
              }
            });
            return layers;
          }
          function removeDummies(dag) {
            dag.each((node) => {
              if (node.data) {
                let childLinkDataIndex = 0;
                node.children = node.children.map((child) => {
                  const points = [getCenterBottom(node)];
                  while (child && !child.data) {
                    points.push(getCenterTop(child));
                    [child] = child.children === [] ? [null] : child.children;
                  }
                  if (child != null) {
                    points.push(getCenterTop(child));
                    node._childLinkData[childLinkDataIndex].points = points;
                    childLinkDataIndex++;
                  }
                  return child;
                }).filter((child) => child != null);
              }
            });
          }
          function getCenterTop(node) {
            return { x: node.x0 + (node.x1 - node.x0) / 2, y: node.y0 };
          }
          function getCenterBottom(node) {
            return { x: node.x0 + (node.x1 - node.x0) / 2, y: node.y1 };
          }
          function createParentsRelation(dag) {
            dag.each(
              (node) => node.children.forEach(
                (child) => (child.parents || (child.parents = [])).push(node)
              )
            );
          }
          function getLongestPathValue(dag) {
            let rootPaths = dag.roots().map(getLongestPathSubDag);
            return Math.max(0, ...rootPaths);
          }
          function getLongestPathSubDag(node) {
            let childPaths = node.children.map(getLongestPathSubDag);
            return (node.heightRatio || 0) + Math.max(0, ...childPaths);
          }
          function getLongestPathValueToRoot(node) {
            let parentPaths = node.parents ? node.parents.map(getLongestPathValueToRoot) : [];
            return (node.heightRatio || 0) + Math.max(0, ...parentPaths);
          }
          function arquint(dag) {
            let longestPathValue = getLongestPathValue(dag);
            layering(dag);
            if (!dag.every((node) => node.children.every((c) => c.layer > node.layer))) {
              throw new Error("layering wasn't proper");
            }
            const layers = createLayers(dag);
            if (layers.length === 1) {
              const [layer] = layers;
              layer.forEach((n) => {
                n.y0 = 0;
                n.y1 = 1;
              });
            } else {
              createParentsRelation(dag);
              let totalLayerSeparation = layers.reduce(
                (prevVal, layer, i) => prevVal + (i == 0 ? 0 : interLayerSeparation(layer, i)),
                0
              );
              let pathLength = longestPathValue + totalLayerSeparation;
              let cummulativeLayerSeparation = 0;
              layers.forEach((layer, i) => {
                cummulativeLayerSeparation += i == 0 ? 0 : interLayerSeparation(layer, i);
                layer.forEach((n) => {
                  let pathValueToRoot = getLongestPathValueToRoot(n);
                  n.y1 = (cummulativeLayerSeparation + pathValueToRoot) / pathLength;
                  n.y0 = n.y1 - n.heightRatio / pathLength;
                });
              });
            }
            decross(layers);
            columnAssignment(layers);
            column2Coord(layers, columnWidth, columnSeparation);
            layers.forEach(
              (layer) => layer.forEach((n) => {
                n.x0 *= width;
                n.x1 *= width;
                n.y0 *= height2;
                n.y1 *= height2;
              })
            );
            removeDummies(dag);
            return dag;
          }
          arquint.size = function(x) {
            return arguments.length ? ([width, height2] = x, arquint) : [width, height2];
          };
          arquint.layering = function(x) {
            return arguments.length ? (layering = x, arquint) : layering;
          };
          arquint.decross = function(x) {
            return arguments.length ? (decross = x, arquint) : decross;
          };
          arquint.columnAssignment = function(x) {
            return arguments.length ? (columnAssignment = x, arquint) : columnAssignment;
          };
          arquint.column2Coord = function(x) {
            return arguments.length ? (column2Coord = x, arquint) : column2Coord;
          };
          arquint.interLayerSeparation = function(x) {
            return arguments.length ? (interLayerSeparation = x, arquint) : interLayerSeparation;
          };
          arquint.columnWidth = function(x) {
            return arguments.length ? (columnWidth = x, arquint) : columnWidth;
          };
          arquint.columnSeparation = function(x) {
            return arguments.length ? (columnSeparation = x, arquint) : columnSeparation;
          };
          return arquint;
        }
        function defaultLayerSeparation() {
          return 1;
        }
        function defaultColumnWidth() {
          return 10;
        }
        function defaultColumnSeparation() {
          return 1;
        }
        exports2.coordCenter = center;
        exports2.coordGreedy = greedy;
        exports2.coordMinCurve = minCurve;
        exports2.coordTopological = topological;
        exports2.coordVert = vert;
        exports2.column2CoordRect = column2CoordRect;
        exports2.columnSimpleLeft = simpleLeft;
        exports2.columnSimpleCenter = simpleCenter;
        exports2.columnAdjacent = adjacent;
        exports2.columnComplex = complex;
        exports2.dagConnect = connect;
        exports2.dagHierarchy = hierarchy;
        exports2.dagStratify = dagStratify;
        exports2.decrossOpt = opt;
        exports2.decrossTwoLayer = twoLayer;
        exports2.layeringCoffmanGraham = coffmanGraham;
        exports2.layeringLongestPath = layeringLongestPath;
        exports2.layeringSimplex = simplex$1;
        exports2.layeringTopological = topological$1;
        exports2.sugiyama = index;
        exports2.twolayerMean = mean$2;
        exports2.twolayerMedian = median$1;
        exports2.twolayerOpt = opt$1;
        exports2.zherebko = index$1;
        exports2.arquint = index$2;
        exports2.dagNode = Node;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/d3-dispatch/src/dispatch.js
  var noop = { value: () => {
  } };
  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
        throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      return { type: t, name };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
      if (arguments.length < 2) {
        while (++i < n)
          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
            return t;
        return;
      }
      if (callback != null && typeof callback !== "function")
        throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type)
          _[t] = set(_[t], typename.name, callback);
        else if (callback == null)
          for (t in _)
            _[t] = set(_[t], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _)
        copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type2, that) {
      if ((n = arguments.length - 2) > 0)
        for (var args = new Array(n), i = 0, n, t; i < n; ++i)
          args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type2))
        throw new Error("unknown type: " + type2);
      for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    },
    apply: function(type2, that, args) {
      if (!this._.hasOwnProperty(type2))
        throw new Error("unknown type: " + type2);
      for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    }
  };
  function get(type2, name) {
    for (var i = 0, n = type2.length, c; i < n; ++i) {
      if ((c = type2[i]).name === name) {
        return c.value;
      }
    }
  }
  function set(type2, name, callback) {
    for (var i = 0, n = type2.length; i < n; ++i) {
      if (type2[i].name === name) {
        type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
        break;
      }
    }
    if (callback != null)
      type2.push({ name, value: callback });
    return type2;
  }
  var dispatch_default = dispatch;

  // node_modules/d3-selection/src/namespaces.js
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces_default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
      name = name.slice(i + 1);
    return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
  }

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/array.js
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  // node_modules/d3-selection/src/selectorAll.js
  function empty() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function")
      select = arrayAll(select);
    else
      select = selectorAll_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectChild.js
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/selectChildren.js
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update) {
    return new Array(update.length);
  }

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  // node_modules/d3-selection/src/constant.js
  function constant_default(x) {
    return function() {
      return x;
    };
  }

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length)
      return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function")
      value = constant_default(value);
    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1)
            i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength)
            ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter)
        enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update)
        update = update.selection();
    }
    if (onexit == null)
      exit.remove();
    else
      onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection(merges, this._parents);
  }

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4)
            next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare)
      compare = ascending;
    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node)
          return node;
      }
    }
    return null;
  }

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this)
      ++size;
    return size;
  }

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback) {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i])
          callback.call(node, node.__data__, i, group);
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttribute(name);
      else
        this.setAttribute(name, v);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.removeAttributeNS(fullname.space, fullname.local);
      else
        this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        this.style.removeProperty(name);
      else
        this.style.setProperty(name, v, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null)
        delete this[name];
      else
        this[name] = v;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n)
        if (!list.contains(names[i]))
          return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling)
      this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling)
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create2 = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create2.apply(this, arguments));
    });
  }

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent)
      parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames2(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      return { type: t, name };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on)
        return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i)
        on.length = i;
      else
        delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on)
        for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, options);
      o = { type: typename.type, name: typename.name, value, listener, options };
      if (!on)
        this.__on = [o];
      else
        on.push(o);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i)
      this.each(on(typenames[i], value, options));
    return this;
  }

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type2, params) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type2, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params)
        event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
      else
        event.initEvent(type2, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params);
    };
  }
  function dispatchFunction(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params.apply(this, arguments));
    };
  }
  function dispatch_default2(type2, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
  }

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i])
          yield node;
      }
    }
  }

  // node_modules/d3-selection/src/selection/index.js
  var root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: select_default,
    selectAll: selectAll_default,
    selectChild: selectChild_default,
    selectChildren: selectChildren_default,
    filter: filter_default,
    data: data_default,
    enter: enter_default,
    exit: exit_default,
    join: join_default,
    merge: merge_default,
    selection: selection_selection,
    order: order_default,
    sort: sort_default,
    call: call_default,
    nodes: nodes_default,
    node: node_default,
    size: size_default,
    empty: empty_default,
    each: each_default,
    attr: attr_default,
    style: style_default,
    property: property_default,
    classed: classed_default,
    text: text_default,
    html: html_default,
    raise: raise_default,
    lower: lower_default,
    append: append_default,
    insert: insert_default,
    remove: remove_default,
    clone: clone_default,
    datum: datum_default,
    on: on_default,
    dispatch: dispatch_default2,
    [Symbol.iterator]: iterator_default
  };
  var selection_default = selection;

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  // node_modules/d3-selection/src/sourceEvent.js
  function sourceEvent_default(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent)
      event = sourceEvent;
    return event;
  }

  // node_modules/d3-selection/src/pointer.js
  function pointer_default(event, node) {
    event = sourceEvent_default(event);
    if (node === void 0)
      node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  // node_modules/d3-drag/src/noevent.js
  var nonpassivecapture = { capture: true, passive: false };
  function noevent_default(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // node_modules/d3-drag/src/nodrag.js
  function nodrag_default(view) {
    var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
    } else {
      root2.__noselect = root2.style.MozUserSelect;
      root2.style.MozUserSelect = "none";
    }
  }
  function yesdrag(view, noclick) {
    var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
    if (noclick) {
      selection2.on("click.drag", noevent_default, nonpassivecapture);
      setTimeout(function() {
        selection2.on("click.drag", null);
      }, 0);
    }
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", null);
    } else {
      root2.style.MozUserSelect = root2.__noselect;
      delete root2.__noselect;
    }
  }

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition)
      prototype[key] = definition[key];
    return prototype;
  }

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*";
  var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
  var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  var reHex = /^#([0-9a-f]{3,8})$/;
  var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
  var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
  var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
  var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
  var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
  var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define_default(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a) {
    if (a <= 0)
      r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define_default(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a) {
    if (a <= 0)
      h = s = l = NaN;
    else if (l <= 0 || l >= 1)
      h = s = NaN;
    else if (s <= 0)
      h = NaN;
    return new Hsl(h, s, l, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl)
      return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Hsl();
    if (o instanceof Hsl)
      return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
    if (s) {
      if (r === max2)
        h = (g - b) / s + (g < b) * 6;
      else if (g === max2)
        h = (b - r) / s + 2;
      else
        h = (r - g) / s + 4;
      s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define_default(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  // node_modules/d3-interpolate/src/basis.js
  function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  function basis_default(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/constant.js
  var constant_default2 = (x) => () => x;

  // node_modules/d3-interpolate/src/color.js
  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }
  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
  }

  // node_modules/d3-interpolate/src/rgb.js
  var rgb_default = function rgbGamma(y) {
    var color2 = gamma(y);
    function rgb2(start2, end) {
      var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.r = r(t);
        start2.g = g(t);
        start2.b = b(t);
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
      for (i = 0; i < n; ++i) {
        color2 = rgb(colors[i]);
        r[i] = color2.r || 0;
        g[i] = color2.g || 0;
        b[i] = color2.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color2.opacity = 1;
      return function(t) {
        color2.r = r(t);
        color2.g = g(t);
        color2.b = b(t);
        return color2 + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis_default);
  var rgbBasisClosed = rgbSpline(basisClosed_default);

  // node_modules/d3-interpolate/src/number.js
  function number_default(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  // node_modules/d3-interpolate/src/string.js
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string_default(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i])
          s[i] += bm;
        else
          s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({ i, x: number_default(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2)
        s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    });
  }

  // node_modules/d3-interpolate/src/transform/decompose.js
  var degrees = 180 / Math.PI;
  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose_default(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b))
      a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d)
      c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d))
      c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c)
      a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX,
      scaleY
    };
  }

  // node_modules/d3-interpolate/src/transform/parse.js
  var svgNode;
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
  }
  function parseSvg(value) {
    if (value == null)
      return identity;
    if (!svgNode)
      svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate()))
      return identity;
    value = value.matrix;
    return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  // node_modules/d3-interpolate/src/transform/index.js
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180)
          b += 360;
        else if (b - a > 180)
          a += 360;
        q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }
    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }
    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a, b) {
      var s = [], q = [];
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null;
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n)
          s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  // node_modules/d3-interpolate/src/zoom.js
  var epsilon2 = 1e-12;
  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }
  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }
  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }
  var zoom_default = function zoomRho(rho, rho2, rho4) {
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      } else {
        var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }
      i.duration = S * 1e3 * rho / Math.SQRT2;
      return i;
    }
    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };
    return zoom;
  }(Math.SQRT2, 2, 4);

  // node_modules/d3-timer/src/timer.js
  var frame = 0;
  var timeout = 0;
  var interval = 0;
  var pokeDelay = 1e3;
  var taskHead;
  var taskTail;
  var clockLast = 0;
  var clockNow = 0;
  var clockSkew = 0;
  var clock = typeof performance === "object" && performance.now ? performance : Date;
  var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function")
        throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail)
          taskTail._next = this;
        else
          taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }
  function timerFlush() {
    now();
    ++frame;
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0)
        t._call.call(void 0, e);
      t = t._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay)
      clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time)
          time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame)
      return;
    if (timeout)
      timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity)
        timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval)
        interval = clearInterval(interval);
    } else {
      if (!interval)
        clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // node_modules/d3-timer/src/timeout.js
  function timeout_default(callback, delay, time) {
    var t = new Timer();
    delay = delay == null ? 0 : +delay;
    t.restart((elapsed) => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  // node_modules/d3-transition/src/transition/schedule.js
  var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule_default(node, name, id2, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules)
      node.__transition = {};
    else if (id2 in schedules)
      return;
    create(node, id2, {
      name,
      index,
      // For context during callback.
      group,
      // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > CREATED)
      throw new Error("too late; already scheduled");
    return schedule;
  }
  function set2(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > STARTED)
      throw new Error("too late; already running");
    return schedule;
  }
  function get2(node, id2) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id2]))
      throw new Error("transition not found");
    return schedule;
  }
  function create(node, id2, self) {
    var schedules = node.__transition, tween;
    schedules[id2] = self;
    self.timer = timer(schedule, 0, self.time);
    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start2, self.delay, self.time);
      if (self.delay <= elapsed)
        start2(elapsed - self.delay);
    }
    function start2(elapsed) {
      var i, j, n, o;
      if (self.state !== SCHEDULED)
        return stop();
      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name)
          continue;
        if (o.state === STARTED)
          return timeout_default(start2);
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } else if (+i < id2) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }
      timeout_default(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING)
        return;
      self.state = STARTED;
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }
    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
      while (++i < n) {
        tween[i].call(node, t);
      }
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }
    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id2];
      for (var i in schedules)
        return;
      delete node.__transition;
    }
  }

  // node_modules/d3-transition/src/interrupt.js
  function interrupt_default(node, name) {
    var schedules = node.__transition, schedule, active, empty2 = true, i;
    if (!schedules)
      return;
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) {
        empty2 = false;
        continue;
      }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }
    if (empty2)
      delete node.__transition;
  }

  // node_modules/d3-transition/src/selection/interrupt.js
  function interrupt_default2(name) {
    return this.each(function() {
      interrupt_default(this, name);
    });
  }

  // node_modules/d3-transition/src/transition/tween.js
  function tweenRemove(id2, name) {
    var tween0, tween1;
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }
      schedule.tween = tween1;
    };
  }
  function tweenFunction(id2, name, value) {
    var tween0, tween1;
    if (typeof value !== "function")
      throw new Error();
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n)
          tween1.push(t);
      }
      schedule.tween = tween1;
    };
  }
  function tween_default(name, value) {
    var id2 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get2(this.node(), id2).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
  }
  function tweenValue(transition2, name, value) {
    var id2 = transition2._id;
    transition2.each(function() {
      var schedule = set2(this, id2);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get2(node, id2).value[name];
    };
  }

  // node_modules/d3-transition/src/transition/interpolate.js
  function interpolate_default(a, b) {
    var c;
    return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
  }

  // node_modules/d3-transition/src/transition/attr.js
  function attrRemove2(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS2(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrConstantNS2(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attrFunctionNS2(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attr_default2(name, value) {
    var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
  }

  // node_modules/d3-transition/src/transition/attrTween.js
  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }
  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }
  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween_default(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    var fullname = namespace_default(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  // node_modules/d3-transition/src/transition/delay.js
  function delayFunction(id2, value) {
    return function() {
      init(this, id2).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id2, value) {
    return value = +value, function() {
      init(this, id2).delay = value;
    };
  }
  function delay_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
  }

  // node_modules/d3-transition/src/transition/duration.js
  function durationFunction(id2, value) {
    return function() {
      set2(this, id2).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id2, value) {
    return value = +value, function() {
      set2(this, id2).duration = value;
    };
  }
  function duration_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
  }

  // node_modules/d3-transition/src/transition/ease.js
  function easeConstant(id2, value) {
    if (typeof value !== "function")
      throw new Error();
    return function() {
      set2(this, id2).ease = value;
    };
  }
  function ease_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
  }

  // node_modules/d3-transition/src/transition/easeVarying.js
  function easeVarying(id2, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function")
        throw new Error();
      set2(this, id2).ease = v;
    };
  }
  function easeVarying_default(value) {
    if (typeof value !== "function")
      throw new Error();
    return this.each(easeVarying(this._id, value));
  }

  // node_modules/d3-transition/src/transition/filter.js
  function filter_default2(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/merge.js
  function merge_default2(transition2) {
    if (transition2._id !== this._id)
      throw new Error();
    for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/on.js
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0)
        t = t.slice(0, i);
      return !t || t === "start";
    });
  }
  function onFunction(id2, name, listener) {
    var on0, on1, sit = start(name) ? init : set2;
    return function() {
      var schedule = sit(this, id2), on = schedule.on;
      if (on !== on0)
        (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }
  function on_default2(name, listener) {
    var id2 = this._id;
    return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
  }

  // node_modules/d3-transition/src/transition/remove.js
  function removeFunction(id2) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition)
        if (+i !== id2)
          return;
      if (parent)
        parent.removeChild(this);
    };
  }
  function remove_default2() {
    return this.on("end.remove", removeFunction(this._id));
  }

  // node_modules/d3-transition/src/transition/select.js
  function select_default3(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selectAll.js
  function selectAll_default2(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selectorAll_default(select);
    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
            if (child = children2[k]) {
              schedule_default(child, name, id2, k, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selection.js
  var Selection2 = selection_default.prototype.constructor;
  function selection_default2() {
    return new Selection2(this._groups, this._parents);
  }

  // node_modules/d3-transition/src/transition/style.js
  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }
  function styleRemove2(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function styleFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null)
        string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id2, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
      if (on !== on0 || listener0 !== listener)
        (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }
  function style_default2(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
  }

  // node_modules/d3-transition/src/transition/styleTween.js
  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }
  function styleTween_default(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  // node_modules/d3-transition/src/transition/text.js
  function textConstant2(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction2(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function text_default2(value) {
    return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
  }

  // node_modules/d3-transition/src/transition/textTween.js
  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }
  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function textTween_default(value) {
    var key = "text";
    if (arguments.length < 1)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, textTween(value));
  }

  // node_modules/d3-transition/src/transition/transition.js
  function transition_default() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit2 = get2(node, id0);
          schedule_default(node, name, id1, i, group, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups, this._parents, name, id1);
  }

  // node_modules/d3-transition/src/transition/end.js
  function end_default() {
    var on0, on1, that = this, id2 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = { value: reject }, end = { value: function() {
        if (--size === 0)
          resolve();
      } };
      that.each(function() {
        var schedule = set2(this, id2), on = schedule.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule.on = on1;
      });
      if (size === 0)
        resolve();
    });
  }

  // node_modules/d3-transition/src/transition/index.js
  var id = 0;
  function Transition(groups, parents, name, id2) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id2;
  }
  function transition(name) {
    return selection_default().transition(name);
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection_default.prototype;
  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: select_default3,
    selectAll: selectAll_default2,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: filter_default2,
    merge: merge_default2,
    selection: selection_default2,
    transition: transition_default,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: on_default2,
    attr: attr_default2,
    attrTween: attrTween_default,
    style: style_default2,
    styleTween: styleTween_default,
    text: text_default2,
    textTween: textTween_default,
    remove: remove_default2,
    tween: tween_default,
    delay: delay_default,
    duration: duration_default,
    ease: ease_default,
    easeVarying: easeVarying_default,
    end: end_default,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  // node_modules/d3-ease/src/cubic.js
  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  // node_modules/d3-transition/src/selection/transition.js
  var defaultTiming = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(node, id2) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id2])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id2} not found`);
      }
    }
    return timing;
  }
  function transition_default2(name) {
    var id2, timing;
    if (name instanceof Transition) {
      id2 = name._id, name = name._name;
    } else {
      id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
        }
      }
    }
    return new Transition(groups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/selection/index.js
  selection_default.prototype.interrupt = interrupt_default2;
  selection_default.prototype.transition = transition_default2;

  // node_modules/d3-brush/src/brush.js
  var { abs, max, min } = Math;
  function number1(e) {
    return [+e[0], +e[1]];
  }
  function number2(e) {
    return [number1(e[0]), number1(e[1])];
  }
  var X = {
    name: "x",
    handles: ["w", "e"].map(type),
    input: function(x, e) {
      return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
    },
    output: function(xy) {
      return xy && [xy[0][0], xy[1][0]];
    }
  };
  var Y = {
    name: "y",
    handles: ["n", "s"].map(type),
    input: function(y, e) {
      return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
    },
    output: function(xy) {
      return xy && [xy[0][1], xy[1][1]];
    }
  };
  var XY = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
    input: function(xy) {
      return xy == null ? null : number2(xy);
    },
    output: function(xy) {
      return xy;
    }
  };
  function type(t) {
    return { type: t };
  }

  // node_modules/d3-zoom/src/constant.js
  var constant_default4 = (x) => () => x;

  // node_modules/d3-zoom/src/event.js
  function ZoomEvent(type2, {
    sourceEvent,
    target,
    transform: transform2,
    dispatch: dispatch2
  }) {
    Object.defineProperties(this, {
      type: { value: type2, enumerable: true, configurable: true },
      sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
      target: { value: target, enumerable: true, configurable: true },
      transform: { value: transform2, enumerable: true, configurable: true },
      _: { value: dispatch2 }
    });
  }

  // node_modules/d3-zoom/src/transform.js
  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var identity2 = new Transform(1, 0, 0);
  transform.prototype = Transform.prototype;
  function transform(node) {
    while (!node.__zoom)
      if (!(node = node.parentNode))
        return identity2;
    return node.__zoom;
  }

  // node_modules/d3-zoom/src/noevent.js
  function nopropagation2(event) {
    event.stopImmediatePropagation();
  }
  function noevent_default3(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // node_modules/d3-zoom/src/zoom.js
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === "wheel") && !event.button;
  }
  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }
  function defaultTransform() {
    return this.__zoom || identity2;
  }
  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
  }
  function defaultTouchable() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function defaultConstrain(transform2, extent, translateExtent) {
    var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
    return transform2.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }
  function zoom_default2() {
    var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
    function zoom(selection2) {
      selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    zoom.transform = function(collection, transform2, point, event) {
      var selection2 = collection.selection ? collection.selection() : collection;
      selection2.property("__zoom", defaultTransform);
      if (collection !== selection2) {
        schedule(collection, transform2, point, event);
      } else {
        selection2.interrupt().each(function() {
          gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
        });
      }
    };
    zoom.scaleBy = function(selection2, k, p, event) {
      zoom.scaleTo(selection2, function() {
        var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };
    zoom.scaleTo = function(selection2, k, p, event) {
      zoom.transform(selection2, function() {
        var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };
    zoom.translateBy = function(selection2, x, y, event) {
      zoom.transform(selection2, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };
    zoom.translateTo = function(selection2, x, y, p, event) {
      zoom.transform(selection2, function() {
        var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity2.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };
    function scale(transform2, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
    }
    function translate(transform2, p0, p1) {
      var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
      return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
    }
    function centroid(extent2) {
      return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
    }
    function schedule(transition2, transform2, point, event) {
      transition2.on("start.zoom", function() {
        gesture(this, arguments).event(event).start();
      }).on("interrupt.zoom end.zoom", function() {
        gesture(this, arguments).event(event).end();
      }).tween("zoom", function() {
        var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
        return function(t) {
          if (t === 1)
            t = b;
          else {
            var l = i(t), k = w / l[2];
            t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
          }
          g.zoom(null, t);
        };
      });
    }
    function gesture(that, args, clean) {
      return !clean && that.__zooming || new Gesture(that, args);
    }
    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }
    Gesture.prototype = {
      event: function(event) {
        if (event)
          this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform2) {
        if (this.mouse && key !== "mouse")
          this.mouse[1] = transform2.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch")
          this.touch0[1] = transform2.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch")
          this.touch1[1] = transform2.invert(this.touch1[0]);
        this.that.__zoom = transform2;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type2) {
        var d = select_default2(this.that).datum();
        listeners.call(
          type2,
          this.that,
          new ZoomEvent(type2, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type: type2,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };
    function wheeled(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      } else if (t.k === k)
        return;
      else {
        g.mouse = [p, t.invert(p)];
        interrupt_default(this);
        g.start();
      }
      noevent_default3(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }
    function mousedowned(event, ...args) {
      if (touchending || !filter2.apply(this, arguments))
        return;
      var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
      nodrag_default(event.view);
      nopropagation2(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt_default(this);
      g.start();
      function mousemoved(event2) {
        noevent_default3(event2);
        if (!g.moved) {
          var dx = event2.clientX - x0, dy = event2.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }
      function mouseupped(event2) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event2.view, g.moved);
        noevent_default3(event2);
        g.event(event2).end();
      }
    }
    function dblclicked(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
      noevent_default3(event);
      if (duration > 0)
        select_default2(this).transition().duration(duration).call(schedule, t1, p0, event);
      else
        select_default2(this).call(zoom.transform, t1, p0, event);
    }
    function touchstarted(event, ...args) {
      if (!filter2.apply(this, arguments))
        return;
      var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
      nopropagation2(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer_default(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0)
          g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2])
          g.touch1 = p, g.taps = 0;
      }
      if (touchstarting)
        touchstarting = clearTimeout(touchstarting);
      if (started) {
        if (g.taps < 2)
          touchfirst = p[0], touchstarting = setTimeout(function() {
            touchstarting = null;
          }, touchDelay);
        interrupt_default(this);
        g.start();
      }
    }
    function touchmoved(event, ...args) {
      if (!this.__zooming)
        return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
      noevent_default3(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer_default(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier)
          g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier)
          g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      } else if (g.touch0)
        p = g.touch0[0], l = g.touch0[1];
      else
        return;
      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }
    function touchended(event, ...args) {
      if (!this.__zooming)
        return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
      nopropagation2(event);
      if (touchending)
        clearTimeout(touchending);
      touchending = setTimeout(function() {
        touchending = null;
      }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier)
          delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier)
          delete g.touch1;
      }
      if (g.touch1 && !g.touch0)
        g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0)
        g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        if (g.taps === 2) {
          t = pointer_default(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select_default2(this).on("dblclick.zoom");
            if (p)
              p.apply(this, arguments);
          }
        }
      }
    }
    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default4(+_), zoom) : wheelDelta;
    };
    zoom.filter = function(_) {
      return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default4(!!_), zoom) : filter2;
    };
    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default4(!!_), zoom) : touchable;
    };
    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default4([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };
    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };
    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };
    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };
    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };
    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };
    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };
    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };
    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };
    return zoom;
  }

  // js/familytree.js
  var import_d3_dag = __toESM(require_d3_dag());
  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  function d3_append_multiline_text(d3element, text, delimiter = "_", css_class = void 0, line_sep = 14, line_offset = void 0, x = 13, dominant_baseline = "central") {
    if (!text)
      return;
    const d3text = d3element.append("text").attr("class", css_class).attr("dominant-baseline", dominant_baseline);
    const arr = text.split(delimiter);
    if (!line_offset) {
      line_offset = -line_sep * (arr.length - 1) / 2;
    }
    if (arr != void 0) {
      for (let i = 0; i < arr.length; i++) {
        d3text.append("tspan").text(arr[i]).attr("dy", i == 0 ? line_offset : line_sep).attr("x", x);
      }
    }
  }
  var FTDataHandler = class {
    constructor(data, start_node_id = data.start) {
      if (data.links.length > 0) {
        this.dag = (0, import_d3_dag.dagConnect)()(data.links);
        if (this.dag.id != void 0) {
          this.root = this.dag.copy();
          this.root.id = void 0;
          this.root.children = [this.dag];
          this.dag = this.root;
        }
        this.nodes = this.dag.descendants().map((node) => {
          if (node.id in data.unions)
            return new Union(node, data.unions[node.id], this);
          else if (node.id in data.persons)
            return new Person(node, data.persons[node.id], this);
        });
        this.nodes.forEach((n) => n._children = n._children.map((c) => c.ftnode));
        this.number_nodes = 0;
        this.nodes.forEach((node) => {
          node.id = node.id || this.number_nodes;
          this.number_nodes++;
        });
        this.root = this.find_node_by_id(start_node_id);
        this.root.visible = true;
        this.dag.children = [this.root];
      } else if (Object.values(data.persons).length > 0) {
        const root_data = data.persons[start_node_id];
        this.root = new import_d3_dag.dagNode(start_node_id, root_data);
        this.root = new Person(this.root, root_data, this);
        this.root.visible = true;
        this.number_nodes = 1;
        this.nodes = [this.root];
        this.dag = new import_d3_dag.dagNode(void 0, {});
        this.dag.children = this.root;
      }
    }
    update_roots() {
      this.dag.children = [this.root];
      const FT = this;
      function find_roots_recursive(node) {
        node.get_visible_inserted_neighbors().forEach((node2) => {
          if (node2.is_root())
            FT.dag.children.push(node2);
          find_roots_recursive(node2);
        });
      }
      ;
      find_roots_recursive(this.root);
    }
    find_node_by_id(id2) {
      return this.nodes.find((node) => node.id == id2);
    }
  };
  var FTNode = class extends import_d3_dag.dagNode {
    is_extendable() {
      return this.get_neighbors().filter((node) => !node.visible).length > 0;
    }
    get_visible_neighbors() {
      return this.get_neighbors().filter((node) => node.visible);
    }
    get_visible_inserted_neighbors() {
      return this.get_visible_neighbors().filter((node) => this.inserted_nodes.includes(node));
    }
  };
  var Union = class extends FTNode {
    constructor(dagNode2, data, ft_datahandler) {
      super(dagNode2.id, data);
      dagNode2.ftnode = this;
      this.ft_datahandler = ft_datahandler;
      this._children = dagNode2.children;
      this.children = [];
      this._childLinkData = dagNode2._childLinkData;
      this.inserted_nodes = [];
      this.inserted_links = [];
      this.visible = false;
    }
    get_neighbors() {
      return this.get_parents().concat(this.get_children());
    }
    get_parents() {
      var parents = this.data.partner.map((id2) => this.ft_datahandler.find_node_by_id(id2)).filter((node) => node != void 0);
      if (parents)
        return parents;
      else
        return [];
    }
    get_hidden_parents() {
      return this.get_parents().filter((parent) => !parent.visible);
    }
    get_visible_parents() {
      return this.get_parents().filter((parent) => parent.visible);
    }
    get_children() {
      var children2 = [];
      children2 = this.children.concat(this._children);
      children2 = children2.filter((c) => c != void 0);
      return children2;
    }
    get_hidden_children() {
      return this.get_children().filter((child) => !child.visible);
    }
    get_visible_children() {
      return this.get_children().filter((child) => child.visible);
    }
    show_child(child) {
      if (!this._children.includes(child)) {
        console.warn("Child node not in this' _children array.");
      }
      this.children.push(child);
      this._children.remove(child);
      if (child.visible) {
        this.inserted_links.push([this, child]);
      } else {
        child.visible = true;
        this.inserted_nodes.push(child);
      }
    }
    show_parent(parent) {
      if (!parent._children.includes(this)) {
        console.warn("This node not in parent's _children array.");
      }
      parent.children.push(this);
      parent._children.remove(this);
      if (parent.visible) {
        this.inserted_links.push([parent, this]);
      } else {
        parent.visible = true;
        this.inserted_nodes.push(parent);
      }
    }
    show() {
      this.visible = true;
      this.get_children().forEach((child) => {
        this.show_child(child);
      });
      this.get_parents().forEach((parent) => {
        this.show_parent(parent);
      });
    }
    get_visible_inserted_children() {
      return this.children.filter((child) => this.inserted_nodes.includes(child));
    }
    get_visible_inserted_parents() {
      return this.get_visible_parents().filter((parent) => this.inserted_nodes.includes(parent));
    }
    is_root() {
      return false;
    }
    hide_child(child) {
      if (!this.children.includes(child)) {
        console.warn("Child node not in this's children array.");
      }
      child.visible = false;
      this._children.push(child);
      this.children.remove(child);
      this.inserted_nodes.remove(child);
    }
    hide_parent(parent) {
      if (!parent.children.includes(this)) {
        console.warn("This node not in parent's children array.");
      }
      parent.visible = false;
      parent._children.push(this);
      parent.children.remove(this);
      this.inserted_nodes.remove(parent);
    }
    hide() {
      this.visible = false;
      this.get_visible_inserted_children().forEach((child) => {
        this.hide_child(child);
      });
      this.get_visible_inserted_parents().forEach((parent) => {
        this.hide_parent(parent);
      });
      this.inserted_links.forEach((edge) => {
        const source = edge[0];
        const target = edge[1];
        if (this == source) {
          this._children.push(target);
          this.children.remove(target);
        } else if (this == target) {
          source._children.push(this);
          source.children.remove(this);
        }
        ;
      });
      this.inserted_links = [];
    }
    get_own_unions() {
      return [];
    }
    get_parent_unions() {
      return [];
    }
    get_name() {
      return void 0;
    }
    get_birth_year() {
      return void 0;
    }
    get_birth_place() {
      return void 0;
    }
    get_death_year() {
      return void 0;
    }
    get_death_place() {
      return void 0;
    }
    is_union() {
      return true;
    }
    add_parent(person_data) {
      const id2 = person_data.id || "p" + ++this.ft_datahandler.number_nodes;
      const dagnode = new import_d3_dag.dagNode(id2, person_data);
      const person = new Person(dagnode, person_data, this.ft_datahandler);
      if (!("parent_union" in person_data))
        person_data.parent_union = void 0;
      if (!("own_unions" in person_data)) {
        person_data.own_unions = [this.id];
        person._childLinkData = [
          [person.id, this.id]
        ];
        person._children.push(this);
      }
      person.data = person_data;
      this.ft_datahandler.nodes.push(person);
      if (!person_data.own_unions.includes(this.id))
        person_data.own_unions.push(this.id);
      if (!this.data.partner.includes(person.id))
        this.data.partner.push(person.id);
      this.show_parent(person);
      this.ft_datahandler.update_roots();
      return person;
    }
    add_child(person_data) {
      const id2 = person_data.id || "p" + ++this.ft_datahandler.number_nodes;
      const dagnode = new import_d3_dag.dagNode(id2, person_data);
      const person = new Person(dagnode, person_data, this.ft_datahandler);
      if (!("parent_union" in person_data))
        person_data.parent_union = this.id;
      if (!("own_unions" in person_data))
        person_data.own_unions = [];
      person.data = person_data;
      this.ft_datahandler.nodes.push(person);
      if (!person_data.parent_union == this.id)
        person_data.parent_union == this.id;
      if (!this.data.children.includes(person.id))
        this.data.children.push(person.id);
      if (!this._childLinkData.includes([this.id, person.id]))
        this._childLinkData.push([this.id, person.id]);
      this.show_child(person);
      return person;
    }
  };
  var Person = class extends FTNode {
    constructor(dagNode2, data, ft_datahandler) {
      super(dagNode2.id, data);
      dagNode2.ftnode = this;
      this.ft_datahandler = ft_datahandler;
      this._children = dagNode2.children;
      this.children = [];
      this._childLinkData = dagNode2._childLinkData;
      this.inserted_nodes = [];
      this.inserted_links = [];
      this.visible = false;
    }
    get_name() {
      return this.data.name;
    }
    get_birth_year() {
      return this.data.birthyear;
    }
    get_birth_place() {
      return this.data.birthplace;
    }
    get_death_year() {
      return this.data.deathyear;
    }
    get_death_place() {
      return this.data.deathplace;
    }
    get_neighbors() {
      return this.get_own_unions().concat(this.get_parent_unions());
    }
    get_parent_unions() {
      var unions = [this.data.parent_union].map((id2) => this.ft_datahandler.find_node_by_id(id2)).filter((node) => node != void 0);
      var u_id = this.data.parent_union;
      if (unions)
        return unions;
      else
        return [];
    }
    get_hidden_parent_unions() {
      return this.get_parent_unions().filter((union) => !union.visible);
    }
    get_visible_parent_unions() {
      return this.get_parent_unions().filter((union) => union.visible);
    }
    get_visible_inserted_parent_unions() {
      return this.get_visible_parent_unions().filter((union) => this.inserted_nodes.includes(union));
    }
    is_root() {
      return this.get_visible_parent_unions().length == 0;
    }
    is_union() {
      return false;
    }
    get_own_unions() {
      var unions = (this.data.own_unions ?? []).map((id2) => this.ft_datahandler.find_node_by_id(id2)).filter((u) => u != void 0);
      if (unions)
        return unions;
      else
        return [];
    }
    get_hidden_own_unions() {
      return this.get_own_unions().filter((union) => !union.visible);
    }
    get_visible_own_unions() {
      return this.get_own_unions().filter((union) => union.visible);
    }
    get_visible_inserted_own_unions() {
      return this.get_visible_own_unions().filter((union) => this.inserted_nodes.includes(union));
    }
    get_parents() {
      var parents = [];
      this.get_parent_unions().forEach(
        (u) => parents = parents.concat(u.get_parents())
      );
    }
    get_other_partner(union_data) {
      var partner_id = union_data.partner.find(
        (p_id) => p_id != this.id & p_id != void 0
      );
      return all_nodes.find((n) => n.id == partner_id);
    }
    get_partners() {
      var partners = [];
      this.get_own_unions().forEach(
        (u) => {
          partners.push(this.get_other_partner(u.data));
        }
      );
      return partners.filter((p) => p != void 0);
    }
    get_children() {
      var children2 = [];
      this.get_own_unions().forEach(
        (u) => children2 = children2.concat(getChildren(u))
      );
      children2 = children2.filter((c) => c != void 0);
      return children2;
    }
    show_union(union) {
      union.show();
      this.inserted_nodes.push(union);
    }
    hide_own_union(union) {
      union.hide();
      this.inserted_nodes.remove(union);
    }
    hide_parent_union(union) {
      union.hide();
    }
    show() {
      this.get_hidden_own_unions().forEach((union) => this.show_union(union));
      this.get_hidden_parent_unions().forEach((union) => this.show_union(union));
    }
    hide() {
      this.get_visible_inserted_own_unions().forEach((union) => this.hide_own_union(union));
      this.get_visible_inserted_parent_unions().forEach((union) => this.hide_parent_union(union));
    }
    click() {
      if (this.is_extendable())
        this.show();
      else
        this.hide();
      this.ft_datahandler.update_roots();
    }
    add_own_union(union_data) {
      const id2 = union_data.id || "u" + ++this.ft_datahandler.number_nodes;
      const dagnode = new import_d3_dag.dagNode(id2, union_data);
      const union = new Union(dagnode, union_data, this.ft_datahandler);
      if (!("partner" in union_data))
        union_data.partner = [this.id];
      if (!("children" in union_data)) {
        union_data.children = [];
        union._childLinkData = [];
      }
      union.data = union_data;
      this.ft_datahandler.nodes.push(union);
      if (!union_data.partner.includes(this.id))
        union_data.partner.push(this.id);
      if (!this.data.own_unions.includes(union.id))
        this.data.own_unions.push(union.id);
      if (!this._childLinkData.includes([this.id, union.id]))
        this._childLinkData.push([this.id, union.id]);
      this.show_union(union);
      return union;
    }
    add_parent_union(union_data) {
      const id2 = union_data.id || "u" + ++this.ft_datahandler.number_nodes;
      const dagnode = new import_d3_dag.dagNode(id2, union_data);
      const union = new Union(dagnode, union_data, this.ft_datahandler);
      if (!("partner" in union_data))
        union_data.partner = [];
      if (!("children" in union_data)) {
        union_data.children = [this.id];
        union._childLinkData = [
          [union.id, this.id]
        ];
        union._children.push(this);
      }
      union.data = union_data;
      this.ft_datahandler.nodes.push(union);
      if (!union_data.children.includes(this.id))
        union_data.children.push(this.id);
      this.data.parent_union = union.id;
      this.show_union(union);
      this.ft_datahandler.update_roots();
      return union;
    }
  };
  var _FTDrawer = class {
    constructor(ft_datahandler, svg, x0, y0) {
      this.ft_datahandler = ft_datahandler;
      this.svg = svg;
      this._orientation = null;
      this.link_css_class = "link";
      this.g = this.svg.append("g");
      this.zoom = zoom_default2().on("zoom", (event) => this.g.attr("transform", event.transform));
      this.svg.call(this.zoom);
      this._tooltip_div = select_default2("body").append("div").attr("class", "tooltip").style("opacity", 0);
      this.tooltip(_FTDrawer.default_tooltip_func);
      this.layout = (0, import_d3_dag.sugiyama)().nodeSize([120, 120]).layering((0, import_d3_dag.layeringSimplex)()).decross(import_d3_dag.decrossOpt).coord((0, import_d3_dag.coordVert)());
      this.orientation("horizontal");
      this.transition_duration(750);
      this.link_path(_FTDrawer.default_link_path_func);
      this.node_label(_FTDrawer.default_node_label_func);
      this.node_size(_FTDrawer.default_node_size_func);
      this.node_class(_FTDrawer.default_node_class_func);
      const default_pos = this.default_root_position();
      this.ft_datahandler.root.x0 = x0 || default_pos[0];
      this.ft_datahandler.root.y0 = y0 || default_pos[1];
    }
    default_root_position() {
      return [
        this.svg.attr("width") / 2,
        this.svg.attr("height") / 2
      ];
    }
    orientation(value) {
      if (!value)
        return this.orientation;
      else {
        this._orientation = value;
        return this;
      }
    }
    node_separation(value) {
      if (!value)
        return this.layout.nodeSize();
      else {
        this.layout.nodeSize(value);
        return this;
      }
    }
    layering(value) {
      if (!value)
        return this.layout.layering();
      else {
        this.layout.layering(value);
        return this;
      }
    }
    decross(value) {
      if (!value)
        return this.layout.decross();
      else {
        this.layout.decross(value);
        return this;
      }
    }
    coord(value) {
      if (!value)
        return this.layout.coord();
      else {
        this.layout.coord(value);
        return this;
      }
    }
    transition_duration(value) {
      if (value != 0 & !value)
        return this._transition_duration;
      else {
        this._transition_duration = value;
        return this;
      }
    }
    static default_tooltip_func(node) {
      if (node.is_union())
        return;
      var content = `
                <span style='margin-left: 2.5px;'><b>` + node.get_name() + `</b></span><br>
                <table style="margin-top: 2.5px;">
                        <tr><td>born</td><td>` + (node.get_birth_year() || "?") + ` in ` + (node.data.birthplace || "?") + `</td></tr>
                        <tr><td>died</td><td>` + (node.get_death_year() || "?") + ` in ` + (node.data.deathplace || "?") + `</td></tr>
                </table>
                `;
      return content.replace(new RegExp("null", "g"), "?");
    }
    tooltip(tooltip_func) {
      if (!tooltip_func) {
        this.show_tooltips = false;
      } else {
        this.show_tooltips = true;
        this._tooltip_func = tooltip_func;
      }
      return this;
    }
    static default_node_label_func(node) {
      if (node.is_union())
        return;
      return node.get_name() + _FTDrawer.label_delimiter + (node.get_birth_year() || "?") + " - " + (node.get_death_year() || "?");
    }
    node_label(node_label_func) {
      if (!node_label_func) {
      } else {
        this.node_label_func = node_label_func;
      }
      ;
      return this;
    }
    static default_node_class_func(node) {
      if (node.is_union())
        return;
      else {
        if (node.is_extendable())
          return "person extendable";
        else
          return "person non-extendable";
      }
      ;
    }
    node_class(node_class_func) {
      if (!node_class_func) {
      } else {
        this.node_class_func = node_class_func;
      }
      ;
      return this;
    }
    static default_node_size_func(node) {
      if (node.is_union())
        return 0;
      else
        return 10;
    }
    node_size(node_size_func) {
      if (!node_size_func) {
      } else {
        this.node_size_func = node_size_func;
      }
      ;
      return this;
    }
    static default_link_path_func(s, d) {
      function vertical_s_bend(s2, d2) {
        return `M ${s2.x} ${s2.y}
            C ${s2.x} ${(s2.y + d2.y) / 2},
            ${d2.x} ${(s2.y + d2.y) / 2},
            ${d2.x} ${d2.y}`;
      }
      function horizontal_s_bend(s2, d2) {
        return `M ${s2.x} ${s2.y}
            C ${(s2.x + d2.x) / 2} ${s2.y},
              ${(s2.x + d2.x) / 2} ${d2.y},
              ${d2.x} ${d2.y}`;
      }
      return this._orientation == "vertical" ? vertical_s_bend(s, d) : horizontal_s_bend(s, d);
    }
    link_path(link_path_func) {
      if (!link_path_func) {
      } else {
        this.link_path_func = link_path_func;
      }
      ;
      return this;
    }
    static make_unique_link_id(link) {
      return link.id || link.source.id + "_" + link.target.id;
    }
    draw(source = this.ft_datahandler.root) {
      const nodes = this.ft_datahandler.dag.descendants(), links = this.ft_datahandler.dag.links();
      this.layout(this.ft_datahandler.dag);
      if (this._orientation == "horizontal") {
        var buffer = null;
        nodes.forEach(function(d) {
          buffer = d.x;
          d.x = d.y;
          d.y = buffer;
        });
      }
      var node = this.g.selectAll("g.node").data(nodes, (node2) => node2.id);
      var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", (_) => "translate(" + source.x0 + "," + source.y0 + ")").on("click", (_, node2) => {
        node2.click();
        this.draw(node2);
      }).attr("visible", true);
      if (this.show_tooltips) {
        const tooltip_div = this._tooltip_div, tooltip_func = this._tooltip_func;
        nodeEnter.on("mouseover", function(event, d) {
          tooltip_div.transition().duration(200).style("opacity", void 0);
          tooltip_div.html(tooltip_func(d));
          let height = tooltip_div.node().getBoundingClientRect().height;
          tooltip_div.style("left", event.pageX + 10 + "px").style("top", event.pageY - height / 2 + "px");
        }).on("mouseout", function(d) {
          tooltip_div.transition().duration(500).style("opacity", 0);
        });
      }
      ;
      nodeEnter.append("circle").attr("class", this.node_class_func).attr("r", 1e-6);
      const this_object = this;
      nodeEnter.each(function(node2) {
        d3_append_multiline_text(
          select_default2(this),
          this_object.node_label_func(node2),
          _FTDrawer.label_delimiter,
          "node-label"
        );
      });
      var nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition().duration(this.transition_duration()).attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
      nodeUpdate.select(".node circle").attr("r", this.node_size_func).attr("class", this.node_class_func).attr("cursor", "pointer");
      var nodeExit = node.exit().transition().duration(this.transition_duration()).attr("transform", (_) => "translate(" + source.x + "," + source.y + ")").attr("visible", false).remove();
      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);
      var link = this.g.selectAll("path." + this.link_css_class).data(links, _FTDrawer.make_unique_link_id);
      var linkEnter = link.enter().insert("path", "g").attr("class", this.link_css_class).attr("d", (_) => {
        var o = {
          x: source.x0,
          y: source.y0
        };
        return this.link_path_func(o, o);
      });
      var linkUpdate = linkEnter.merge(link);
      linkUpdate.transition().duration(this.transition_duration()).attr("d", (d) => this.link_path_func(d.source, d.target));
      var linkExit = link.exit().transition().duration(this.transition_duration()).attr("d", (_) => {
        var o = {
          x: source.x,
          y: source.y
        };
        return this.link_path_func(o, o);
      }).remove();
      this.svg.transition().duration(this.transition_duration()).call(
        this.zoom.transform,
        transform(this.g.node()).translate(-(source.x - source.x0), -(source.y - source.y0))
      );
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    clear() {
      this.g.selectAll("*").remove();
    }
  };
  var FTDrawer = _FTDrawer;
  __publicField(FTDrawer, "label_delimiter", "_");
  var FamilyTree = class extends FTDrawer {
    constructor(data, svg) {
      const ft_datahandler = new FTDataHandler(data);
      super(ft_datahandler, svg);
    }
    get root() {
      return this.ft_datahandler.root;
    }
    draw_data(data) {
      var x0 = null, y0 = null;
      if (this.root !== null) {
        [x0, y0] = [this.root.x0, this.root.y0];
      } else {
        [x0, y0] = this.default_root_position();
      }
      this.ft_datahandler = new FTDataHandler(data);
      this.root.x0 = x0;
      this.root.y0 = y0;
      this.clear();
      this.draw();
    }
    async load_data(path_to_new_data) {
      let { data } = await import(
        /* webpackIgnore: true */
        path_to_new_data
      );
      this.draw_data(data);
    }
  };
})();
