// d3-dag Version 0.3.5-edited. Copyright 2020 undefined.
// Change compared to d3-dag Version 0.3.5:
// - add exports.dagNode
// - fixed vulnerabilities in dependencies
// change made by Benjamin W. Portner
// original version by Erik Brinkman: https://github.com/erikbrinkman/d3-dag

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (factory((global.d3 = global.d3 || {})));
}(this, (function (exports) {
  'use strict';

  // Compute x coordinates for nodes that maximizes the spread of nodes in [0, 1]
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

  // Compute x coordinates for nodes that greedily assigns coordinates and then spaces them out

  // TODO Implement other methods for initial greedy assignment

  function greedy() {
    let assignment = mean;

    function coordGreedy(layers, separation) {
      // Assign degrees
      // The 3 at the end ensures that dummy nodes have the lowest priority
      layers.forEach((layer) =>
        layer.forEach((n) => (n.degree = n.children.length + (n.data ? 0 : -3)))
      );
      layers.forEach((layer) =>
        layer.forEach((n) => n.children.forEach((c) => ++c.degree))
      );

      // Set first nodes
      layers[0][0].x = 0;
      layers[0].slice(1).forEach((node, i) => {
        const last = layers[0][i];
        node.x = last.x + separation(last, node);
      });

      // Set remaining nodes
      layers.slice(0, layers.length - 1).forEach((top, i) => {
        const bottom = layers[i + 1];
        assignment(top, bottom);
        // FIXME This order is import, i.e. we right and then left. We should actually do both, and then take the average
        bottom
          .map((n, j) => [n, j])
          .sort(([an, aj], [bn, bj]) =>
            an.degree === bn.degree ? aj - bj : bn.degree - an.degree
          )
          .forEach(([n, j]) => {
            bottom.slice(j + 1).reduce((last, node) => {
              node.x = Math.max(node.x, last.x + separation(last, node));
              return node;
            }, n);
            bottom
              .slice(0, j)
              .reverse()
              .reduce((last, node) => {
                node.x = Math.min(node.x, last.x - separation(node, last));
                return node;
              }, n);
          });
      });

      const min = Math.min(
        ...layers.map((layer) => Math.min(...layer.map((n) => n.x)))
      );
      const span =
        Math.max(...layers.map((layer) => Math.max(...layer.map((n) => n.x)))) -
        min;
      layers.forEach((layer) => layer.forEach((n) => (n.x = (n.x - min) / span)));
      layers.forEach((layer) => layer.forEach((n) => delete n.degree));
      return layers;
    }

    return coordGreedy;
  }

  function mean(topLayer, bottomLayer) {
    bottomLayer.forEach((node) => {
      node.x = 0.0;
      node._count = 0.0;
    });
    topLayer.forEach((n) =>
      n.children.forEach((c) => (c.x += (n.x - c.x) / ++c._count))
    );
    bottomLayer.forEach((n) => delete n._count);
  }

  let epsilon = 1.0e-60;
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

      // dscal(k - 1, t, a[1][k], 1);
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

        // daxpy(k, t, a[1][k], 1, a[1][j], 1);
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

      // t = ddot(k - 1, a[1][k], 1, b[1], 1);
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

      // daxpy(k - 1, t, a[1][k], 1, b[1], 1);
      for (let i = 1; i < k; i += 1) {
        b[i] += t * a[i][k];
      }
    }
  }

  var dposl_1 = dposl;

  function dpofa(a, lda, n, info) {
    let jm1, t, s;

    for (let j = 1; j <= n; j += 1) {
      info[1] = j;
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

          // t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
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
      info[1] = 0;
    }
  }

  var dpofa_1 = dpofa;

  function qpgen2(dmat, dvec, fddmat, n, sol, lagr, crval, amat, bvec, fdamat, q, meq, iact, nnact = 0, iter, work, ierr) {
    let l1, it1, nvl, nact, temp, sum, t1, tt, gc, gs, nu, t1inf, t2min, go;

    const r = Math.min(n, q);

    let l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

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

    const info = [];

    if (ierr[1] === 0) {
      dpofa_1(dmat, fddmat, n, info);
      if (info[1] !== 0) {
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
    const iwsv = iwrm + (r * (r + 1)) / 2;
    const iwnbv = iwsv + q;

    for (let i = 1; i <= q; i += 1) {
      sum = 0;
      for (let j = 1; j <= n; j += 1) {
        sum += amat[j][i] * amat[j][i];
      }
      work[iwnbv + i] = Math.sqrt(sum);
    }

    nact = nnact;

    iter[1] = 0;
    iter[2] = 0;

    function fnGoto50() {
      iter[1] += 1;

      l = iwsv;
      for (let i = 1; i <= q; i += 1) {
        l += 1;
        sum = -bvec[i];
        for (let j = 1; j <= n; j += 1) {
          sum += amat[j][i] * sol[j];
        }
        if (Math.abs(sum) < vsmall) {
          sum = 0;
        }
        if (i > meq) {
          work[l] = sum;
        } else {
          work[l] = -Math.abs(sum);
          if (sum > 0) {
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
        sum = 0;
        for (let j = 1; j <= n; j += 1) {
          sum += dmat[j][i] * amat[j][nvl];
        }
        work[i] = sum;
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
        sum = work[i];
        l = iwrm + (i * (i + 3)) / 2;
        l1 = l - i;
        for (let j = i + 1; j <= nact; j += 1) {
          sum -= work[l] * work[iwrv + j];
          l += j;
        }
        sum /= work[l1];
        work[iwrv + i] = sum;
        if (iact[i] <= meq) {
          continue;
        }
        if (sum <= 0) {
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

      sum = 0;
      for (let i = iwzv + 1; i <= iwzv + n; i += 1) {
        sum += work[i] * work[i];
      }
      if (Math.abs(sum) <= vsmall) {
        if (t1inf) {
          ierr[1] = 1;

          return 999; // GOTO 999
        }
        for (let i = 1; i <= nact; i += 1) {
          work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
        }
        work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;

        return 700; // GOTO 700
      }
      sum = 0;
      for (let i = 1; i <= n; i += 1) {
        sum += work[iwzv + i] * amat[i][nvl];
      }
      tt = -work[iwsv + nvl] / sum;
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

      crval[1] += tt * sum * (tt / 2 + work[iwuv + nact + 1]);
      for (let i = 1; i <= nact; i += 1) {
        work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
      }
      work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

      if (t2min) {
        nact += 1;
        iact[nact] = nvl;

        l = iwrm + ((nact - 1) * nact) / 2 + 1;
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
              temp = Math.abs(gc * Math.sqrt(1 + gs * gs /
                (gc * gc)));
            } else {
              temp = -Math.abs(gc * Math.sqrt(1 + gs * gs /
                (gc * gc)));
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
                dmat[j][i] = nu * (dmat[j][i - 1] + temp) -
                  dmat[j][i];
                dmat[j][i - 1] = temp;

              }
            }
          }
          work[l] = work[nact];
        }
      } else {
        sum = -bvec[nvl];
        for (let j = 1; j <= n; j += 1) {
          sum += sol[j] * amat[j][nvl];
        }
        if (nvl > meq) {
          work[iwsv + nvl] = sum;
        } else {
          work[iwsv + nvl] = -Math.abs(sum);
          if (sum > 0) {
            for (let j = 1; j <= n; j += 1) {
              amat[j][nvl] = -amat[j][nvl];
            }
            bvec[nvl] = -bvec[nvl];
          }
        }

        return 700; // GOTO 700
      }

      return 0;
    }

    function fnGoto797() {
      l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
      l1 = l + it1;
      if (work[l1] === 0) {
        return 798; // GOTO 798
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
        return 798; // GOTO 798
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
          dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) -
            dmat[i][it1 + 1];
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
        return 797; // GOTO 797
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
    while (true) { // eslint-disable-line no-constant-condition
      go = fnGoto50();
      if (go === 999) {
        return;
      }
      while (true) { // eslint-disable-line no-constant-condition
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
            while (true) { // eslint-disable-line no-constant-condition
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

    // In Fortran the array index starts from 1
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
    if ((meq > q) || (meq < 0)) {
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
    for (let i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i += 1) {
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
      unconstrained_solution: dvec, // eslint-disable-line camelcase
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

  var wrapper = function (qmat, cvec, amat, bvec, meq = 0, factorized = false) {
    const Dmat = [null].concat(qmat.map(row => [null].concat(row)));
    const dvec = [null].concat(cvec.map(v => -v));
    const Amat = [null].concat(amat.length === 0 ? new Array(qmat.length).fill([null]) : amat[0].map((_, i) => [null].concat(amat.map(row => -row[i]))));
    const bvecp = [null].concat(bvec.map(v => -v));
    const {
      solution,
      Lagrangian: lagrangian,
      value: boxedVal,
      unconstrained_solution: unconstrained,

      iterations: iters,
      iact,
      message
    } = solveQP$1(Dmat, dvec, Amat, bvecp, meq, [, +factorized]); // eslint-disable-line no-sparse-arrays

    if (message.length > 0) {
      throw new Error(message);
    } else {
      solution.shift();
      lagrangian.shift();
      unconstrained.shift();
      iact.push(0);
      const active = iact.slice(1, iact.indexOf(0)).map(v => v - 1);
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

  // Assign coords to layers by solving a QP

  // Compute indices used to index arrays
  function indices(layers) {
    const inds = {};
    let i = 0;
    layers.forEach((layer) => layer.forEach((n) => (inds[n.id] = i++)));
    return inds;
  }

  // Compute constraint arrays for layer separation
  function sep(layers, inds, separation) {
    const n = 1 + Math.max(...Object.values(inds));
    const A = [];
    const b = [];

    layers.forEach((layer) =>
      layer.slice(0, layer.length - 1).forEach((first, i) => {
        const second = layer[i + 1];
        const find = inds[first.id];
        const sind = inds[second.id];
        const cons = new Array(n).fill(0);
        cons[find] = 1;
        cons[sind] = -1;
        A.push(cons);
        b.push(-separation(first, second));
      })
    );

    return [A, b];
  }

  // Update Q that minimizes edge distance squared
  function minDist(Q, pind, cind, coef) {
    Q[cind][cind] += coef;
    Q[cind][pind] -= coef;
    Q[pind][cind] -= coef;
    Q[pind][pind] += coef;
  }

  // Update Q that minimizes curve of edges through a node
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

  // Solve for node positions
  function solve(Q, c, A, b, meq = 0) {
    // Arbitrarily set the last coordinate to 0, which makes the formula valid
    // This is simpler than special casing the last element
    c.pop();
    Q.pop();
    Q.forEach((row) => row.pop());
    A.forEach((row) => row.pop());

    // Solve
    const { solution } = quadprogJs(Q, c, A, b, meq);

    // Undo last coordinate removal
    solution.push(0);
    return solution;
  }

  // Assign nodes x in [0, 1] based on solution
  function layout(layers, inds, solution) {
    // Rescale to be in [0, 1]
    const min = Math.min(...solution);
    const span = Math.max(...solution) - min;
    layers.forEach((layer) =>
      layer.forEach((n) => (n.x = (solution[inds[n.id]] - min) / span))
    );
  }

  // Assign nodes in each layer an x coordinate in [0, 1] that minimizes curves

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
      layers.forEach((layer) =>
        layer.forEach((parent) => {
          const pind = inds[parent.id];
          parent.children.forEach((child) => {
            const cind = inds[child.id];
            minDist(Q, pind, cind, 1 - weight);
          });
        })
      );

      layers.forEach((layer) =>
        layer.forEach((parent) => {
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

    coordMinCurve.weight = function (x) {
      return arguments.length
        ? ((weight = checkWeight(x)), coordMinCurve)
        : weight;
    };

    return coordMinCurve;
  }

  // Assign nodes in each layer an x coordinate in [0, 1] that minimizes curves

  function topological() {
    function coordTopological(layers, separation) {
      if (
        !layers.every((layer) => 1 === layer.reduce((c, n) => c + !!n.data, 0))
      ) {
        throw new Error(
          "coordTopological() only works with a topological ordering"
        );
      }

      // This takes advantage that the last "node" is set to 0
      const inds = {};
      let i = 0;
      layers.forEach((layer) =>
        layer.forEach((n) => n.data || (inds[n.id] = i++))
      );
      layers.forEach((layer) =>
        layer.forEach((n) => inds[n.id] === undefined && (inds[n.id] = i))
      );

      const n = ++i;
      const [A, b] = sep(layers, inds, separation);

      const c = new Array(n).fill(0);
      const Q = new Array(n).fill(null).map(() => new Array(n).fill(0));
      layers.forEach((layer) =>
        layer.forEach((parent) => {
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

  // Assign nodes in each layer an x coordinate in [0, 1] that minimizes curves

  function vert() {
    function coordVert(layers, separation) {
      const inds = indices(layers);
      const n = Object.keys(inds).length;
      const [A, b] = sep(layers, inds, separation);

      const c = new Array(n).fill(0);
      const Q = new Array(n).fill(null).map(() => new Array(n).fill(0));
      layers.forEach((layer) =>
        layer.forEach((parent) => {
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

      layers.forEach((layer) =>
        layer.forEach((parent) => {
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

    return coordVert;
  }

  // Compute x0 and x1 coordinates for nodes that maximizes the spread of nodes in [0, 1].
  // It uses columnIndex that has to be present in each node.
  // due to the varying height of the nodes, nodes from different layers might be present at the same y coordinate
  // therefore, nodes should not be centered in their layer but centering should be considered over all layers
  //
  function column2CoordRect() {
    function coordSpread(layers, columnWidthFunction, columnSeparationFunction) {
      // calculate the number of columns
      const maxColumns = Math.max(
        ...layers.map((layer) =>
          Math.max(...layer.map((node) => node.columnIndex + 1))
        )
      );
      // call columnWidthFunction for each column index to get an array with the width of each column index:
      let columnWidth = Array.from(Array(maxColumns).keys())
        .map((_, index) => index)
        .map(columnWidthFunction);
      // similarly for the separation of the columns, where columnSeparation[0] is the separation between column 0 and 1:
      let columnSeparation = Array.from(Array(maxColumns).keys())
        .map((_, index) => index)
        .map(columnSeparationFunction);

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

    function getColumnStartCoordinate(
      columnWidth,
      columnSeparation,
      columnIndex
    ) {
      let leadingColumnWidths = columnWidth.filter(
        (_, index) => index < columnIndex
      );
      let leadingColumnSeparations = columnSeparation.filter(
        (_, index) => index < columnIndex
      );
      return leadingColumnWidths
        .concat(leadingColumnSeparations)
        .reduce((prevVal, currentVal) => prevVal + currentVal, 0);
    }
  }

  function simpleLeft() {
    // trivial column assignment (based on node's index in its layer => fill up columns from left to right)
    function columnIndexAssignmentLeftToRight(layers) {
      layers.forEach((layer) => {
        layer.forEach((node, nodeIndex) => (node.columnIndex = nodeIndex));
      });
    }

    return columnIndexAssignmentLeftToRight;
  }

  function simpleCenter() {
    // keeps order of nodes in a layer but spreads nodes in a layer over the middle columns
    function columnIndexAssignmentCenter(layers) {
      const maxNodesPerLayer = Math.max(...layers.map((layer) => layer.length));
      layers.forEach((layer) => {
        const nodesInLayer = layer.length;
        const startColumnIndex = Math.floor(
          (maxNodesPerLayer - nodesInLayer) / 2
        );
        layer.forEach(
          (node, nodeIndex) => (node.columnIndex = startColumnIndex + nodeIndex)
        );
      });
    }

    return columnIndexAssignmentCenter;
  }

  function adjacent() {
    let center = false;

    function columnIndexAssignmentAdjacent(layers) {
      // assigns column indices to the layer with most nodes first.
      // afterwards starting from the layer with most nodes, column indices are assigned
      // to nodes in adjacent layers. Column indices are assigned with respect to the
      // node's parents or children while maintaining the same ordering in the layer.
      // overlapping nodes can occur because nodes can be placed in the same column
      // although they do not have a children/parents relation with each other
      if (layers.length == 0) {
        return;
      }

      // find layer index with most entries:
      const maxNodesCount = Math.max(...layers.map((layer) => layer.length));
      const maxNodesLayerIndex = layers.findIndex(
        (layer) => layer.length === maxNodesCount
      );

      // layer with most nodes simply assign columnIndex to the node's index:
      layers[maxNodesLayerIndex].forEach(
        (node, index) => (node.columnIndex = index)
      );

      // layer with most nodes stays unchanged
      // first, visit each layer above the layer with most nodes
      for (let i = maxNodesLayerIndex - 1; i >= 0; i--) {
        fillLayerBackwards(layers[i]);
      }

      // then, visit each layer below the layer with most nodes
      for (let i = maxNodesLayerIndex + 1; i < layers.length; i++) {
        fillLayerForward(layers[i]);
      }

      function fillLayerBackwards(layer) {
        let actualColumnIndices;
        if (layer.length === maxNodesCount) {
          // leave layer unchanged
          actualColumnIndices = layer.map((_, index) => index);
        } else {
          // map each node to its desired location:
          const desiredColumnIndices = layer.map((node, index) => {
            if (node.children == null || node.children.length === 0) {
              return index;
            }
            const childrenColumnIndices = node.children.map(
              (child) => child.columnIndex
            );
            if (center) {
              // return column index of middle child
              return childrenColumnIndices[
                Math.floor((childrenColumnIndices.length - 1) / 2)
              ];
            } else {
              return Math.min(...childrenColumnIndices);
            }
          });
          // based on the desired column index, the actual column index needs to be assigned
          // however, the column indices have to be strictly monotonically increasing and have to
          // be greater or equal 0 and smaller than maxNodesCount!
          actualColumnIndices = optimizeColumnIndices(desiredColumnIndices);
        }

        // assign now the column indices to the nodes:
        layer.forEach(
          (node, index) => (node.columnIndex = actualColumnIndices[index])
        );
      }

      function fillLayerForward(layer) {
        let actualColumnIndices;
        if (layer.length === maxNodesCount) {
          // leave layer unchanged
          actualColumnIndices = layer.map((_, index) => index);
        } else {
          // map each node to its desired location:
          const desiredColumnIndices = layer.map((node, index) => {
            if (node.parents == null || node.parents.length === 0) {
              return index;
            }
            const parentColumnIndices = node.parents.map(
              (parent) => parent.columnIndex
            );
            if (center) {
              // return column index of middle parent
              return parentColumnIndices[
                Math.floor((parentColumnIndices.length - 1) / 2)
              ];
            } else {
              return Math.min(...parentColumnIndices);
            }
          });
          // based on the desired column index, the actual column index needs to be assigned
          // however, the column indices have to be strictly monotonically increasing and have to
          // be greater or equal 0 and smaller than maxNodesCount!
          actualColumnIndices = optimizeColumnIndices(desiredColumnIndices);
        }

        // assign now the column indices to the nodes:
        layer.forEach(
          (node, index) => (node.columnIndex = actualColumnIndices[index])
        );
      }

      function optimizeColumnIndices(desiredColumnIndices) {
        if (!desiredColumnIndices.every((columnIndex) => isFinite(columnIndex))) {
          throw `columnComplex: non-finite column index encountered`;
        }

        // step 1: reorder indices such that they are strictly monotonically increasing
        let largestIndex = -1;
        desiredColumnIndices = desiredColumnIndices.map((columnIndex) => {
          if (columnIndex <= largestIndex) {
            columnIndex = largestIndex + 1;
          }
          largestIndex = columnIndex;
          return columnIndex;
        });

        // step 2: shift indices such that they are larger or equal 0 and smaller than maxNodesCount
        const max = Math.max(...desiredColumnIndices);
        const downShift = max - (maxNodesCount - 1);
        if (downShift > 0) {
          // nodes need to be shifted by that amount
          desiredColumnIndices = desiredColumnIndices.map((columnIndex, index) =>
            Math.max(columnIndex - downShift, index)
          );
        }

        return desiredColumnIndices;
      }
    }

    columnIndexAssignmentAdjacent.center = function (x) {
      return arguments.length
        ? ((center = x), columnIndexAssignmentAdjacent)
        : center;
    };

    return columnIndexAssignmentAdjacent;
  }

  function complex() {
    let center = false;

    function columnIndexAssignmentSubtree(layers) {
      // starts at root nodes and assigns column indices based on their subtrees
      if (layers.length == 0) {
        return;
      }

      // find all root nodes
      let roots = [];
      layers.forEach((layer) =>
        layer.forEach((node) => {
          if (node.parents == null || node.parents.length === 0) {
            roots.push(node);
          }
        })
      );

      // iterate over each root and assign column indices to each node in its subtree.
      // if a node already has a columnIndex, do not change it, this case can occur if the node has more than one predecessor
      let startColumnIndex = 0;
      roots.forEach((node) => {
        const subtreeWidth = getSubtreeWidth(node);
        node.columnIndex =
          startColumnIndex + (center ? Math.floor((subtreeWidth - 1) / 2) : 0);
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

      function assignColumnIndexToChildren(node, startColumnIndex) {
        const widthPerChild = node.children.map(getSubtreeWidth);
        let childColumnIndex = startColumnIndex;
        node.children.forEach((child, index) => {
          if (child.columnIndex !== undefined) {
            // stop recursion, this child was already visited
            return;
          }
          child.columnIndex =
            childColumnIndex +
            (center ? Math.floor((widthPerChild[index] - 1) / 2) : 0);
          assignColumnIndexToChildren(child, childColumnIndex);
          childColumnIndex += widthPerChild[index];
        });
      }
    }

    columnIndexAssignmentSubtree.center = function (x) {
      return arguments.length
        ? ((center = x), columnIndexAssignmentSubtree)
        : center;
    };

    return columnIndexAssignmentSubtree;
  }

  // Get an array of all links to children
  function childLinks() {
    const links = [];
    this.eachChildLinks((l) => links.push(l));
    return links;
  }

  // This function sets the value of each descendant to be the number of its descendants including itself
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

  // Return true if the dag is connected
  function connected() {
    if (this.id !== undefined) {
      return true;
    }

    const rootsSpan = this.roots().map((r) => r.descendants().map((n) => n.id));
    const reached = rootsSpan.map(() => false);
    const queue = [reached.length - 1];
    while (queue.length) {
      const i = queue.pop();
      if (reached[i]) {
        continue; // already explored
      }
      const spanMap = {};
      reached[i] = true;
      rootsSpan[i].forEach((n) => (spanMap[n] = true));
      rootsSpan.forEach((span, j) => {
        if (span.some((n) => spanMap[n])) {
          queue.push(j);
        }
      });
    }
    return reached.every((b) => b);
  }

  // Set each node's value to be zero for leaf nodes and the greatest distance to
  // any leaf node for other nodes
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

  // Return an array of all descendants
  function descendants() {
    const descs = [];
    this.each((n) => descs.push(n));
    return descs;
  }

  // Call function on each node such that a node is called before any of its parents
  function eachAfter(func) {
    // TODO Better way to do this?
    const all = [];
    this.eachBefore((n) => all.push(n));
    all.reverse().forEach(func);
    return this;
  }

  // Call a function on each node such that a node is called before any of its children
  function eachBefore(func) {
    this.each((n) => (n._num_before = 0));
    this.each((n) => n.children.forEach((c) => ++c._num_before));

    const queue = this.roots();
    let node;
    let i = 0;
    while ((node = queue.pop())) {
      func(node, i++);
      node.children.forEach((n) => --n._num_before || queue.push(n));
    }

    this.each((n) => delete n._num_before);
    return this;
  }

  // Call nodes in bread first order
  // No guarantees are made on whether the function is called first, or children
  // are queued. This is important if the function modifies a node's children.
  function eachBreadth(func) {
    const seen = {};
    let current = [];
    let next = this.roots();
    let i = 0;
    do {
      current = next.reverse();
      next = [];
      let node;
      while ((node = current.pop())) {
        if (!seen[node.id]) {
          seen[node.id] = true;
          func(node, i++);
          next.push(...node.children);
        }
      }
    } while (next.length);
  }

  // Call a function on each child link
  function eachChildLinks(func) {
    if (this.id !== undefined) {
      let i = 0;
      this.children.forEach((c, j) =>
        func(
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

  // Call a function on each node in an arbitrary order
  // No guarantees are made with respect to whether the function is called first
  // or the children are queued. This is important if the function modifies the
  // children of a node.
  function eachDepth(func) {
    const queue = this.roots();
    const seen = {};
    let node;
    let i = 0;
    while ((node = queue.pop())) {
      if (!seen[node.id]) {
        seen[node.id] = true;
        func(node, i++);
        queue.push(...node.children);
      }
    }
    return this;
  }

  // Call a function on each link in the dag
  function eachLinks(func) {
    let i = 0;
    this.each((n) => n.eachChildLinks((l) => func(l, i++)));
    return this;
  }

  // Compare two dag_like objects for equality
  function toSet(arr) {
    const set = {};
    arr.forEach((e) => (set[e] = true));
    return set;
  }

  function info(root) {
    const info = {};
    root.each(
      (node) =>
        (info[node.id] = [node.data, toSet(node.children.map((n) => n.id))])
    );
    return info;
  }

  function setEqual(a, b) {
    return (
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((k) => b[k])
    );
  }

  function equals(that) {
    const thisInfo = info(this);
    const thatInfo = info(that);
    return (
      Object.keys(thisInfo).length === Object.keys(thatInfo).length &&
      Object.entries(thisInfo).every(([nid, [thisData, thisChildren]]) => {
        const val = thatInfo[nid];
        if (!val) return false;
        const [thatData, thatChildren] = val;
        return thisData === thatData && setEqual(thisChildren, thatChildren);
      })
    );
  }

  // Return true of function returns true for every node
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

  // Set each node's value to zero for leaf nodes and the greatest distance to
  // any leaf for other nodes
  function height() {
    return this.eachAfter(
      (n) => (n.value = Math.max(0, ...n.children.map((c) => 1 + c.value)))
    );
  }

  // Return an array of all of the links in a dag
  function links() {
    const links = [];
    this.eachLinks((l) => links.push(l));
    return links;
  }

  // Reduce over nodes
  function reduce(func, start) {
    let accum = start;
    this.each((n, i) => {
      accum = func(accum, n, i);
    });
    return accum;
  }

  // Return the roots of the current dag
  function roots() {
    return this.id === undefined ? this.children.slice() : [this];
  }

  // Count the number of nodes
  function size() {
    return this.reduce((a) => a + 1, 0);
  }

  // Return true if function returns true on at least one node
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

  // Call a function on each nodes data and set its value to the sum of the function return and the return value of all descendants
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

  function Node(id, data) {
    this.id = id;
    this.data = data;
    this.children = [];
    this._childLinkData = [];
  }

  // Must be internal for new Node creation
  // Copy this dag returning a new DAG pointing to the same data with same structure.
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

    if (this.id === undefined) {
      const root = new Node(undefined, undefined);
      root.children = this.children.map((c) => mapping[c.id]);
    } else {
      return mapping[this.id];
    }
  }

  // Reverse
  function reverse() {
    const nodes = [];
    const cnodes = [];
    const mapping = {};
    const root = new Node(undefined, undefined);
    this.each((node) => {
      nodes.push(node);
      const cnode = new Node(node.id, node.data);
      cnodes.push(cnode);
      mapping[cnode.id] = cnode;
      if (!node.children.length) {
        root.children.push(cnode);
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

    return root.children.length > 1 ? root : root.children[0];
  }

  Node.prototype = {
    constructor: Node,
    childLinks: childLinks,
    copy: copy,
    count: count,
    connected: connected,
    depth: depth,
    descendants: descendants,
    each: eachDepth,
    eachAfter: eachAfter,
    eachBefore: eachBefore,
    eachBreadth: eachBreadth,
    eachChildLinks: eachChildLinks,
    eachLinks: eachLinks,
    equals: equals,
    every: every,
    height: height,
    links: links,
    reduce: reduce,
    reverse: reverse,
    roots: roots,
    size: size,
    some: some,
    sum: sum
  };

  // Verify that a dag meets all criteria for validity
  // Note, this is written such that root must be a dummy node, i.e. have an undefined id
  function verify(root) {
    // Test that dummy criteria is met
    if (root.id !== undefined) throw new Error("invalid format for verification");

    // Test that there are roots
    if (!root.children.length) throw new Error("no roots");

    // Test that dag is free of cycles
    const seen = {};
    const past = {};
    let rec = undefined;
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
        if (result && rec) result.push(node.id);
        if (rec === node.id) rec = undefined;
        return result;
      }
    }
    const msg =
      root.id === undefined
        ? root.children.reduce((msg, r) => msg || visit(r), false)
        : visit(root);
    if (msg)
      throw new Error("dag contained a cycle: " + msg.reverse().join(" -> "));

    // Test that all nodes are valid
    root.each((node) => {
      if (node.id.indexOf("\0") >= 0)
        throw new Error("node id contained null character");
      if (!node.data) throw new Error("node contained falsy data");
    });

    // Test that all link data is valid
    if (root.links().some(({ data }) => !data))
      throw new Error("dag had falsy link data");
  }

  // Create a dag with stratified data

  function dagStratify() {
    if (arguments.length) {
      throw Error(
        `got arguments to dagStratify(${arguments}), but constructor takes no aruguments. ` +
        `These were probably meant as data which should be called as dagStratify()(...)`
      );
    }

    let id = defaultId;
    let parentIds = defaultParentIds;
    let linkData = defaultLinkData;

    function dagStratify(data) {
      if (!data.length) throw new Error("can't stratify empty data");
      const nodes = data.map((datum, i) => {
        const nid = id(datum, i);
        try {
          return new Node(nid.toString(), datum);
        } catch (TypeError) {
          throw Error(`node ids must have toString but got ${nid} from ${datum}`);
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

      const root = new Node(undefined, undefined);
      nodes.forEach((node) => {
        const pids = parentIds(node.data) || [];
        pids.forEach((pid) => {
          const parent = mapping[pid];
          if (!parent) throw new Error("missing id: " + pid);
          parent.children.push(node);
          parent._childLinkData.push(linkData(parent.data, node.data));
          return parent;
        });
        if (!pids.length) {
          root.children.push(node);
        }
      });

      verify(root);
      return root.children.length > 1 ? root : root.children[0];
    }

    dagStratify.id = function (x) {
      return arguments.length ? ((id = x), dagStratify) : id;
    };

    dagStratify.parentIds = function (x) {
      return arguments.length ? ((parentIds = x), dagStratify) : parentIds;
    };

    dagStratify.linkData = function (x) {
      return arguments.length ? ((linkData = x), dagStratify) : linkData;
    };

    return dagStratify;
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

  // Create a dag with edge data

  function connect() {
    if (arguments.length) {
      throw Error(
        `got arguments to dagConnect(${arguments}), but constructor takes no aruguments. ` +
        `These were probably meant as data which should be called as dagConnect()(...)`
      );
    }

    let sourceAccessor = defaultSource;
    let targetAccessor = defaultTarget;
    let linkData = defaultLinkData$1;

    function stratifyLinkData(parent, child) {
      return linkData(child.linkData[parent.id]);
    }

    function dagConnect(data) {
      if (!data.length) throw new Error("can't create graph from empty data");
      const keyedData = {};
      data.forEach((datum) => {
        const source = sourceAccessor(datum);
        const target = targetAccessor(datum);
        keyedData[source] ||
          (keyedData[source] = { id: source, parentIds: [], linkData: {} });
        const node =
          keyedData[target] ||
          (keyedData[target] = { id: target, parentIds: [], linkData: {} });
        node.parentIds.push(source);
        node.linkData[source] = datum;
      });

      return dagStratify().linkData(stratifyLinkData)(Object.values(keyedData));
    }

    dagConnect.sourceAccessor = function (x) {
      return arguments.length
        ? ((sourceAccessor = x), dagConnect)
        : sourceAccessor;
    };

    dagConnect.targetAccessor = function (x) {
      return arguments.length
        ? ((targetAccessor = x), dagConnect)
        : targetAccessor;
    };

    dagConnect.linkData = function (x) {
      return arguments.length ? ((linkData = x), dagConnect) : linkData;
    };

    return dagConnect;
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

  // Create a dag from a hierarchy representation

  function hierarchy() {
    if (arguments.length) {
      throw Error(
        `got arguments to dagHierarchy(${arguments}), but constructor takes no aruguments. ` +
        `These were probably meant as data which should be called as dagHierarchy()(...)`
      );
    }
    let id = defaultId$1;
    let children = defaultChildren;
    let linkData = defaultLinkData$2;

    function dagHierarchy(...data) {
      if (!data.length) throw new Error("must pass at least one node");
      const mapping = {};
      const queue = [];

      function nodify(datum) {
        let did;
        try {
          did = id(datum).toString();
        } catch (TypeError) {
          throw Error(
            `node ids must have toString but got ${id(datum)} from ${datum}`
          );
        }
        let res;
        if (!(res = mapping[did])) {
          res = new Node(did, datum);
          queue.push(res);
          mapping[did] = res;
        } else if (datum !== res.data) {
          throw new Error("found a duplicate id: " + did);
        }
        return res;
      }

      const root = new Node(undefined, undefined);
      let node;
      root.children = data.map(nodify);
      while ((node = queue.pop())) {
        node.children = (children(node.data) || []).map(nodify);
        node._childLinkData = node.children.map((c) =>
          linkData(node.data, c.data)
        );
      }

      verify(root);
      return root.children.length > 1 ? root : root.children[0];
    }

    dagHierarchy.id = function (x) {
      return arguments.length ? ((id = x), dagHierarchy) : id;
    };

    dagHierarchy.children = function (x) {
      return arguments.length ? ((children = x), dagHierarchy) : children;
    };

    dagHierarchy.linkData = function (x) {
      return arguments.length ? ((linkData = x), dagHierarchy) : linkData;
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

  /*global module*/

  function Solution(tableau, evaluation, feasible, bounded) {
    this.feasible = feasible;
    this.evaluation = evaluation;
    this.bounded = bounded;
    this._tableau = tableau;
  }
  var Solution_1 = Solution;

  Solution.prototype.generateSolutionSet = function () {
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
      if (variable === undefined || variable.isSlack === true) {
        continue;
      }

      var varValue = matrix[r][rhsColumn];
      solutionSet[variable.id] =
        Math.round((Number.EPSILON + varValue) * roundingCoeff) / roundingCoeff;
    }

    return solutionSet;
  };

  /*global module*/
  /*global require*/


  function MilpSolution(tableau, evaluation, feasible, bounded, branchAndCutIterations) {
    Solution_1.call(this, tableau, evaluation, feasible, bounded);
    this.iter = branchAndCutIterations;
  }
  var MilpSolution_1 = MilpSolution;
  MilpSolution.prototype = Object.create(Solution_1.prototype);
  MilpSolution.constructor = MilpSolution;

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/



  /*************************************************************
   * Class: Tableau
   * Description: Simplex tableau, holding a the tableau matrix
   *              and all the information necessary to perform
   *              the simplex algorithm
   * Agruments:
   *        precision: If we're solving a MILP, how tight
   *                   do we want to define an integer, given
   *                   that 20.000000000000001 is not an integer.
   *                   (defaults to 1e-8)
   **************************************************************/
  function Tableau(precision) {
    this.model = null;

    this.matrix = null;
    this.width = 0;
    this.height = 0;

    this.costRowIndex = 0;
    this.rhsColumn = 0;

    this.variablesPerIndex = [];
    this.unrestrictedVars = null;

    // Solution attributes
    this.feasible = true; // until proven guilty
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

  Tableau.prototype.solve = function () {
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

  OptionalObjective.prototype.copy = function () {
    var copy = new OptionalObjective(this.priority, this.reducedCosts.length);
    copy.reducedCosts = this.reducedCosts.slice();
    return copy;
  };

  Tableau.prototype.setOptionalObjective = function (priority, column, cost) {
    var objectiveForPriority = this.objectivesByPriority[priority];
    if (objectiveForPriority === undefined) {
      var nColumns = Math.max(this.width, column + 1);
      objectiveForPriority = new OptionalObjective(priority, nColumns);
      this.objectivesByPriority[priority] = objectiveForPriority;
      this.optionalObjectives.push(objectiveForPriority);
      this.optionalObjectives.sort(function (a, b) {
        return a.priority - b.priority;
      });
    }

    objectiveForPriority.reducedCosts[column] = cost;
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau.prototype.initialize = function (width, height, variables, unrestrictedVars) {
    this.variables = variables;
    this.unrestrictedVars = unrestrictedVars;

    this.width = width;
    this.height = height;


    // console.time("tableau_build");
    // BUILD AN EMPTY ARRAY OF THAT WIDTH
    var tmpRow = new Array(width);
    for (var i = 0; i < width; i++) {
      tmpRow[i] = 0;
    }

    // BUILD AN EMPTY TABLEAU
    this.matrix = new Array(height);
    for (var j = 0; j < height; j++) {
      this.matrix[j] = tmpRow.slice();
    }

    //
    // TODO: Benchmark This
    //this.matrix = new Array(height).fill(0).map(() => new Array(width).fill(0));

    // console.timeEnd("tableau_build");
    // console.log("height",height);
    // console.log("width",width);
    // console.log("------");
    // console.log("");


    this.varIndexByRow = new Array(this.height);
    this.varIndexByCol = new Array(this.width);

    this.varIndexByRow[0] = -1;
    this.varIndexByCol[0] = -1;

    this.nVars = width + height - 2;
    this.rowByVarIndex = new Array(this.nVars);
    this.colByVarIndex = new Array(this.nVars);

    this.lastElementIndex = this.nVars;
  };

  Tableau.prototype._resetMatrix = function () {
    var variables = this.model.variables;
    var constraints = this.model.constraints;

    var nVars = variables.length;
    var nConstraints = constraints.length;

    var v, varIndex;
    var costRow = this.matrix[0];
    var coeff = (this.model.isMinimization === true) ? -1 : 1;
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

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau.prototype.setModel = function (model) {
    this.model = model;

    var width = model.nVariables + 1;
    var height = model.nConstraints + 1;


    this.initialize(width, height, model.variables, model.unrestrictedVariables);
    this._resetMatrix();
    return this;
  };

  Tableau.prototype.getNewElementIndex = function () {
    if (this.availableIndexes.length > 0) {
      return this.availableIndexes.pop();
    }

    var index = this.lastElementIndex;
    this.lastElementIndex += 1;
    return index;
  };

  Tableau.prototype.density = function () {
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

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau.prototype.setEvaluation = function () {
    // Rounding objective value
    var roundingCoeff = Math.round(1 / this.precision);
    var evaluation = this.matrix[this.costRowIndex][this.rhsColumn];
    var roundedEvaluation =
      Math.round((Number.EPSILON + evaluation) * roundingCoeff) / roundingCoeff;

    this.evaluation = roundedEvaluation;
    if (this.simplexIters === 0) {
      this.bestPossibleEval = roundedEvaluation;
    }
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau.prototype.getSolution = function () {
    var evaluation = (this.model.isMinimization === true) ?
      this.evaluation : -this.evaluation;

    if (this.model.getNumberOfIntegerVariables() > 0) {
      return new MilpSolution_1(this, evaluation, this.feasible, this.bounded, this.branchAndCutIterations);
    } else {
      return new Solution_1(this, evaluation, this.feasible, this.bounded);
    }
  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/



  //-------------------------------------------------------------------
  // Function: solve
  // Detail: Main function, linear programming solver
  //-------------------------------------------------------------------
  Tableau_1.prototype.simplex = function () {
    // Bounded until proven otherwise
    this.bounded = true;

    // Execute Phase 1 to obtain a Basic Feasible Solution (BFS)
    this.phase1();

    // Execute Phase 2
    if (this.feasible === true) {
      // Running simplex on Initial Basic Feasible Solution (BFS)
      // N.B current solution is feasible
      this.phase2();
    }

    return this;
  };

  //-------------------------------------------------------------------
  // Description: Convert a non standard form tableau
  //              to a standard form tableau by eliminating
  //              all negative values in the Right Hand Side (RHS)
  //              This results in a Basic Feasible Solution (BFS)
  //
  //-------------------------------------------------------------------
  Tableau_1.prototype.phase1 = function () {
    var debugCheckForCycles = this.model.checkForCycles;
    var varIndexesCycle = [];

    var matrix = this.matrix;
    var rhsColumn = this.rhsColumn;
    var lastColumn = this.width - 1;
    var lastRow = this.height - 1;

    var unrestricted;
    var iterations = 0;

    while (true) {
      // ******************************************
      // ** PHASE 1 - STEP  1 : FIND PIVOT ROW **
      //
      // Selecting leaving variable (feasibility condition):
      // Basic variable with most negative value
      //
      // ******************************************
      var leavingRowIndex = 0;
      var rhsValue = -this.precision;
      for (var r = 1; r <= lastRow; r++) {
        unrestricted = this.unrestrictedVars[this.varIndexByRow[r]] === true;

        //
        // *Don't think this does anything...
        //
        //if (unrestricted) {
        //    continue;
        //}

        var value = matrix[r][rhsColumn];
        if (value < rhsValue) {
          rhsValue = value;
          leavingRowIndex = r;
        }
      }

      // If nothing is strictly smaller than 0; we're done with phase 1.
      if (leavingRowIndex === 0) {
        // Feasible, champagne!
        this.feasible = true;
        return iterations;
      }


      // ******************************************
      // ** PHASE 1 - STEP  2 : FIND PIVOT COLUMN **
      //
      //
      // ******************************************
      // Selecting entering variable
      var enteringColumn = 0;
      var maxQuotient = -Infinity;
      var costRow = matrix[0];
      var leavingRow = matrix[leavingRowIndex];
      for (var c = 1; c <= lastColumn; c++) {
        var coefficient = leavingRow[c];
        //
        // *Don't think this does anything...
        //
        //if (-this.precision < coefficient && coefficient < this.precision) {
        //    continue;
        //}
        //

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
        // Not feasible
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

  //-------------------------------------------------------------------
  // Description: Apply simplex to obtain optimal solution
  //              used as phase2 of the simplex
  //
  //-------------------------------------------------------------------
  Tableau_1.prototype.phase2 = function () {
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

      // Selecting entering variable (optimality condition)
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
        // There exist optional improvable objectives
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


      // If no entering column could be found we're done with phase 2.
      if (enteringColumn === 0) {
        this.setEvaluation();
        this.simplexIters += 1;
        return iterations;
      }

      // Selecting leaving variable
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
        // optimal value is -Infinity
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

  // Array holding the column indexes for which the value is not null
  // on the pivot row
  // Shared by all tableaux for smaller overhead and lower memory usage
  var nonZeroColumns = [];


  //-------------------------------------------------------------------
  // Description: Execute pivot operations over a 2d array,
  //          on a given row, and column
  //
  //-------------------------------------------------------------------
  Tableau_1.prototype.pivot = function (pivotRowIndex, pivotColumnIndex) {
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

    // Divide everything in the target row by the element @
    // the target column
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

    // for every row EXCEPT the pivot row,
    // set the value in the pivot column = 0 by
    // multiplying the value of all elements in the objective
    // row by ... yuck... just look below; better explanation later
    var coefficient, i, v0;
    var precision = this.precision;

    // //////////////////////////////////////
    //
    // This is step 2 of the pivot function.
    // It is, by far, the most expensive piece of
    // this whole process where the code can be optimized (faster code)
    // without changing the whole algorithm (fewer cycles)
    //
    // 1.) For every row but the pivot row
    // 2.) Update each column to 
    //    a.) itself
    //        less
    //    b.) active-row's pivot column
    //        times
    //    c.) whatever-the-hell this is: nonZeroColumns[i]
    // 
    // //////////////////////////////////////
    // console.time("step-2");
    for (var r = 0; r <= lastRow; r++) {
      if (r !== pivotRowIndex) {

        // Set reference to the row we're working on
        //
        var row = matrix[r];

        // Catch the coefficient that we're going to end up dividing everything by
        coefficient = row[pivotColumnIndex];

        // No point Burning Cycles if
        // Zero to the thing
        if (!(coefficient >= -1e-16 && coefficient <= 1e-16)) {
          for (i = 0; i < nNonZeroColumns; i++) {
            c = nonZeroColumns[i];
            // No point in doing math if you're just adding
            // Zero to the thing
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
    // console.timeEnd("step-2");

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



  Tableau_1.prototype.checkForCycles = function (varIndexes) {
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

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  function Variable(id, cost, index, priority) {
    this.id = id;
    this.cost = cost;
    this.index = index;
    this.value = 0;
    this.priority = priority;
  }

  function IntegerVariable(id, cost, index, priority) {
    Variable.call(this, id, cost, index, priority);
  }
  IntegerVariable.prototype.isInteger = true;

  function SlackVariable(id, index) {
    Variable.call(this, id, 0, index, 0);
  }
  SlackVariable.prototype.isSlack = true;

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
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

    return model.addVariable(weight, "r" + (model.relaxationIndex++), false, false, priority);
  }

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  function Constraint(rhs, isUpperBound, index, model) {
    this.slack = new SlackVariable("s" + index, index);
    this.index = index;
    this.model = model;
    this.rhs = rhs;
    this.isUpperBound = isUpperBound;

    this.terms = [];
    this.termsByVarIndex = {};

    // Error variable in case the constraint is relaxed
    this.relaxation = null;
  }

  Constraint.prototype.addTerm = function (coefficient, variable) {
    var varIndex = variable.index;
    var term = this.termsByVarIndex[varIndex];
    if (term === undefined) {
      // No term for given variable
      term = new Term(variable, coefficient);
      this.termsByVarIndex[varIndex] = term;
      this.terms.push(term);
      if (this.isUpperBound === true) {
        coefficient = -coefficient;
      }
      this.model.updateConstraintCoefficient(this, variable, coefficient);
    } else {
      // Term for given variable already exists
      // updating its coefficient
      var newCoefficient = term.coefficient + coefficient;
      this.setVariableCoefficient(newCoefficient, variable);
    }

    return this;
  };

  Constraint.prototype.removeTerm = function (term) {
    // TODO
    return this;
  };

  Constraint.prototype.setRightHandSide = function (newRhs) {
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

  Constraint.prototype.setVariableCoefficient = function (newCoefficient, variable) {
    var varIndex = variable.index;
    if (varIndex === -1) {
      console.warn("[Constraint.setVariableCoefficient] Trying to change coefficient of inexistant variable.");
      return;
    }

    var term = this.termsByVarIndex[varIndex];
    if (term === undefined) {
      // No term for given variable
      this.addTerm(newCoefficient, variable);
    } else {
      // Term for given variable already exists
      // updating its coefficient if changed
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

  Constraint.prototype.relax = function (weight, priority) {
    this.relaxation = createRelaxationVariable(this.model, weight, priority);
    this._relax(this.relaxation);
  };

  Constraint.prototype._relax = function (relaxationVariable) {
    if (relaxationVariable === null) {
      // Relaxation variable not created, priority was probably "required"
      return;
    }

    if (this.isUpperBound) {
      this.setVariableCoefficient(-1, relaxationVariable);
    } else {
      this.setVariableCoefficient(1, relaxationVariable);
    }
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  function Equality(constraintUpper, constraintLower) {
    this.upperBound = constraintUpper;
    this.lowerBound = constraintLower;
    this.model = constraintUpper.model;
    this.rhs = constraintUpper.rhs;
    this.relaxation = null;
  }

  Equality.prototype.isEquality = true;

  Equality.prototype.addTerm = function (coefficient, variable) {
    this.upperBound.addTerm(coefficient, variable);
    this.lowerBound.addTerm(coefficient, variable);
    return this;
  };

  Equality.prototype.removeTerm = function (term) {
    this.upperBound.removeTerm(term);
    this.lowerBound.removeTerm(term);
    return this;
  };

  Equality.prototype.setRightHandSide = function (rhs) {
    this.upperBound.setRightHandSide(rhs);
    this.lowerBound.setRightHandSide(rhs);
    this.rhs = rhs;
  };

  Equality.prototype.relax = function (weight, priority) {
    this.relaxation = createRelaxationVariable(this.model, weight, priority);
    this.upperBound.relaxation = this.relaxation;
    this.upperBound._relax(this.relaxation);
    this.lowerBound.relaxation = this.relaxation;
    this.lowerBound._relax(this.relaxation);
  };


  var expressions = {
    Constraint: Constraint,
    Variable: Variable,
    IntegerVariable: IntegerVariable,
    SlackVariable: SlackVariable,
    Equality: Equality,
    Term: Term
  };

  /*global require*/

  var SlackVariable$1 = expressions.SlackVariable;

  Tableau_1.prototype.addCutConstraints = function (cutConstraints) {
    var nCutConstraints = cutConstraints.length;

    var height = this.height;
    var heightWithCuts = height + nCutConstraints;

    // Adding rows to hold cut constraints
    for (var h = height; h < heightWithCuts; h += 1) {
      if (this.matrix[h] === undefined) {
        this.matrix[h] = this.matrix[h - 1].slice();
      }
    }

    // Adding cut constraints
    this.height = heightWithCuts;
    this.nVars = this.width + this.height - 2;

    var c;
    var lastColumn = this.width - 1;
    for (var i = 0; i < nCutConstraints; i += 1) {
      var cut = cutConstraints[i];

      // Constraint row index
      var r = height + i;

      var sign = (cut.type === "min") ? -1 : 1;

      // Variable on which the cut is applied
      var varIndex = cut.varIndex;
      var varRowIndex = this.rowByVarIndex[varIndex];
      var constraintRow = this.matrix[r];
      if (varRowIndex === -1) {
        // Variable is non basic
        constraintRow[this.rhsColumn] = sign * cut.value;
        for (c = 1; c <= lastColumn; c += 1) {
          constraintRow[c] = 0;
        }
        constraintRow[this.colByVarIndex[varIndex]] = sign;
      } else {
        // Variable is basic
        var varRow = this.matrix[varRowIndex];
        var varValue = varRow[this.rhsColumn];
        constraintRow[this.rhsColumn] = sign * (cut.value - varValue);
        for (c = 1; c <= lastColumn; c += 1) {
          constraintRow[c] = -sign * varRow[c];
        }
      }

      // Creating slack variable
      var slackVarIndex = this.getNewElementIndex();
      this.varIndexByRow[r] = slackVarIndex;
      this.rowByVarIndex[slackVarIndex] = r;
      this.colByVarIndex[slackVarIndex] = -1;
      this.variablesPerIndex[slackVarIndex] = new SlackVariable$1("s" + slackVarIndex, slackVarIndex);
      this.nVars += 1;
    }
  };

  Tableau_1.prototype._addLowerBoundMIRCut = function (rowIndex) {

    if (rowIndex === this.costRowIndex) {
      //console.log("! IN MIR CUTS : The index of the row corresponds to the cost row. !");
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

    //Adding a row
    var r = this.height;
    matrix[r] = matrix[r - 1].slice();
    this.height += 1;

    // Creating slack variable
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

  Tableau_1.prototype._addUpperBoundMIRCut = function (rowIndex) {

    if (rowIndex === this.costRowIndex) {
      //console.log("! IN MIR CUTS : The index of the row corresponds to the cost row. !");
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

    //Adding a row
    var r = this.height;
    matrix[r] = matrix[r - 1].slice();
    this.height += 1;

    // Creating slack variable

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


  //
  // THIS MAKES SOME MILP PROBLEMS PROVIDE INCORRECT
  // ANSWERS...
  //
  // QUICK FIX: MAKE THE FUNCTION EMPTY...
  //
  Tableau_1.prototype.applyMIRCuts = function () {

    // var nRows = this.height;
    // for (var cst = 0; cst < nRows; cst += 1) {
    //    this._addUpperBoundMIRCut(cst);
    // }


    // // nRows = tableau.height;
    // for (cst = 0; cst < nRows; cst += 1) {
    //    this._addLowerBoundMIRCut(cst);
    // }

  };

  /*global require*/
  /*global console*/


  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau_1.prototype._putInBase = function (varIndex) {
    // Is varIndex in the base?
    var r = this.rowByVarIndex[varIndex];
    if (r === -1) {
      // Outside the base
      // pivoting to take it out
      var c = this.colByVarIndex[varIndex];

      // Selecting pivot row
      // (Any row with coefficient different from 0)
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

  Tableau_1.prototype._takeOutOfBase = function (varIndex) {
    // Is varIndex in the base?
    var c = this.colByVarIndex[varIndex];
    if (c === -1) {
      // Inside the base
      // pivoting to take it out
      var r = this.rowByVarIndex[varIndex];

      // Selecting pivot column
      // (Any column with coefficient different from 0)
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

  Tableau_1.prototype.updateVariableValues = function () {
    var nVars = this.variables.length;
    var roundingCoeff = Math.round(1 / this.precision);
    for (var v = 0; v < nVars; v += 1) {
      var variable = this.variables[v];
      var varIndex = variable.index;

      var r = this.rowByVarIndex[varIndex];
      if (r === -1) {
        // Variable is non basic
        variable.value = 0;
      } else {
        // Variable is basic
        var varValue = this.matrix[r][this.rhsColumn];
        variable.value = Math.round((varValue + Number.EPSILON) * roundingCoeff) / roundingCoeff;
      }
    }
  };

  Tableau_1.prototype.updateRightHandSide = function (constraint, difference) {
    // Updates RHS of given constraint
    var lastRow = this.height - 1;
    var constraintRow = this.rowByVarIndex[constraint.index];
    if (constraintRow === -1) {
      // Slack is not in base
      var slackColumn = this.colByVarIndex[constraint.index];

      // Upading all the RHS values
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
      // Slack variable of constraint is in base
      // Updating RHS with the difference between the old and the new one
      this.matrix[constraintRow][this.rhsColumn] -= difference;
    }
  };

  Tableau_1.prototype.updateConstraintCoefficient = function (constraint, variable, difference) {
    // Updates variable coefficient within a constraint
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

  Tableau_1.prototype.updateCost = function (variable, difference) {
    // Updates variable coefficient within the objective function
    var varIndex = variable.index;
    var lastColumn = this.width - 1;
    var varColumn = this.colByVarIndex[varIndex];
    if (varColumn === -1) {
      // Variable is in base
      var variableRow = this.matrix[this.rowByVarIndex[varIndex]];

      var c;
      if (variable.priority === 0) {
        var costRow = this.matrix[0];

        // Upading all the reduced costs
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
      // Variable is not in the base
      // Updating coefficient with difference
      this.matrix[0][varColumn] -= difference;
    }
  };

  Tableau_1.prototype.addConstraint = function (constraint) {
    // Adds a constraint to the tableau
    var sign = constraint.isUpperBound ? 1 : -1;
    var lastRow = this.height;

    var constraintRow = this.matrix[lastRow];
    if (constraintRow === undefined) {
      constraintRow = this.matrix[0].slice();
      this.matrix[lastRow] = constraintRow;
    }

    // Setting all row cells to 0
    var lastColumn = this.width - 1;
    for (var c = 0; c <= lastColumn; c += 1) {
      constraintRow[c] = 0;
    }

    // Initializing RHS
    constraintRow[this.rhsColumn] = sign * constraint.rhs;

    var terms = constraint.terms;
    var nTerms = terms.length;
    for (var t = 0; t < nTerms; t += 1) {
      var term = terms[t];
      var coefficient = term.coefficient;
      var varIndex = term.variable.index;

      var varRowIndex = this.rowByVarIndex[varIndex];
      if (varRowIndex === -1) {
        // Variable is non basic
        constraintRow[this.colByVarIndex[varIndex]] += sign * coefficient;
      } else {
        // Variable is basic
        var varRow = this.matrix[varRowIndex];
        var varValue = varRow[this.rhsColumn];
        for (c = 0; c <= lastColumn; c += 1) {
          constraintRow[c] -= sign * coefficient * varRow[c];
        }
      }
    }
    // Creating slack variable
    var slackIndex = constraint.index;
    this.varIndexByRow[lastRow] = slackIndex;
    this.rowByVarIndex[slackIndex] = lastRow;
    this.colByVarIndex[slackIndex] = -1;

    this.height += 1;
  };

  Tableau_1.prototype.removeConstraint = function (constraint) {
    var slackIndex = constraint.index;
    var lastRow = this.height - 1;

    // Putting the constraint's slack in the base
    var r = this._putInBase(slackIndex);

    // Removing constraint
    // by putting the corresponding row at the bottom of the matrix
    // and virtually reducing the height of the matrix by 1
    var tmpRow = this.matrix[lastRow];
    this.matrix[lastRow] = this.matrix[r];
    this.matrix[r] = tmpRow;

    // Removing associated slack variable from basic variables
    this.varIndexByRow[r] = this.varIndexByRow[lastRow];
    this.varIndexByRow[lastRow] = -1;
    this.rowByVarIndex[slackIndex] = -1;

    // Putting associated slack variable index in index manager
    this.availableIndexes[this.availableIndexes.length] = slackIndex;

    constraint.slack.index = -1;

    this.height -= 1;
  };

  Tableau_1.prototype.addVariable = function (variable) {
    // Adds a variable to the tableau
    // var sign = constraint.isUpperBound ? 1 : -1;

    var lastRow = this.height - 1;
    var lastColumn = this.width;
    var cost = this.model.isMinimization === true ? -variable.cost : variable.cost;
    var priority = variable.priority;

    // Setting reduced costs
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

    // Setting all other column cells to 0
    for (var r = 1; r <= lastRow; r += 1) {
      this.matrix[r][lastColumn] = 0;
    }

    // Adding variable to trackers
    var varIndex = variable.index;
    this.varIndexByCol[lastColumn] = varIndex;

    this.rowByVarIndex[varIndex] = -1;
    this.colByVarIndex[varIndex] = lastColumn;

    this.width += 1;
  };


  Tableau_1.prototype.removeVariable = function (variable) {
    var varIndex = variable.index;

    // Putting the variable out of the base
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

    // Removing variable from non basic variables
    this.varIndexByCol[lastColumn] = -1;
    this.colByVarIndex[varIndex] = -1;

    // Adding index into index manager
    this.availableIndexes[this.availableIndexes.length] = varIndex;

    variable.index = -1;

    this.width -= 1;
  };

  /*global require*/
  /*global console*/


  //-------------------------------------------------------------------
  // Description: Display a tableau matrix
  //              and additional tableau information
  //
  //-------------------------------------------------------------------
  Tableau_1.prototype.log = function (message, force) {

    console.log("****", message, "****");
    console.log("Nb Variables", this.width - 1);
    console.log("Nb Constraints", this.height - 1);
    // console.log("Variable Ids", this.variablesPerIndex);
    console.log("Basic Indexes", this.varIndexByRow);
    console.log("Non Basic Indexes", this.varIndexByCol);
    console.log("Rows", this.rowByVarIndex);
    console.log("Cols", this.colByVarIndex);

    var digitPrecision = 5;

    // Variable declaration
    var varNameRowString = "",
      spacePerColumn = [" "],
      j,
      c,
      r,
      variable,
      varIndex,
      varName,
      varNameLength,
      valueSpace,
      nameSpace;

    var row,
      rowString;

    for (c = 1; c < this.width; c += 1) {
      varIndex = this.varIndexByCol[c];
      variable = this.variablesPerIndex[varIndex];
      if (variable === undefined) {
        varName = "c" + varIndex;
      } else {
        varName = variable.id;
      }

      varNameLength = varName.length;
      valueSpace = " ";
      nameSpace = "\t";

      ///////////
      /*valueSpace = " ";
      nameSpace = " ";

      for (s = 0; s < nSpaces; s += 1) {
          if (varNameLength > 5) {
              valueSpace += " ";
          } else {
              nameSpace += " ";
          }
      }*/

      ///////////
      if (varNameLength > 5) {
        valueSpace += " ";
      } else {
        nameSpace += "\t";
      }

      spacePerColumn[c] = valueSpace;

      varNameRowString += nameSpace + varName;
    }
    console.log(varNameRowString);

    var signSpace;

    // Displaying reduced costs
    var firstRow = this.matrix[this.costRowIndex];
    var firstRowString = "\t";

    ///////////
    /*for (j = 1; j < this.width; j += 1) {
        signSpace = firstRow[j] < 0 ? "" : " ";
        firstRowString += signSpace;
        firstRowString += spacePerColumn[j];
        firstRowString += firstRow[j].toFixed(2);
    }
    signSpace = firstRow[0] < 0 ? "" : " ";
    firstRowString += signSpace + spacePerColumn[0] +
        firstRow[0].toFixed(2);
    console.log(firstRowString + " Z");*/

    ///////////
    for (j = 1; j < this.width; j += 1) {
      signSpace = "\t";
      firstRowString += signSpace;
      firstRowString += spacePerColumn[j];
      firstRowString += firstRow[j].toFixed(digitPrecision);
    }
    signSpace = "\t";
    firstRowString += signSpace + spacePerColumn[0] +
      firstRow[0].toFixed(digitPrecision);
    console.log(firstRowString + "\tZ");


    // Then the basic variable rowByVarIndex
    for (r = 1; r < this.height; r += 1) {
      row = this.matrix[r];
      rowString = "\t";

      ///////////
      /*for (c = 1; c < this.width; c += 1) {
          signSpace = row[c] < 0 ? "" : " ";
          rowString += signSpace + spacePerColumn[c] + row[c].toFixed(2);
      }
      signSpace = row[0] < 0 ? "" : " ";
      rowString += signSpace + spacePerColumn[0] + row[0].toFixed(2);*/

      ///////////
      for (c = 1; c < this.width; c += 1) {
        signSpace = "\t";
        rowString += signSpace + spacePerColumn[c] + row[c].toFixed(digitPrecision);
      }
      signSpace = "\t";
      rowString += signSpace + spacePerColumn[0] + row[0].toFixed(digitPrecision);


      varIndex = this.varIndexByRow[r];
      variable = this.variablesPerIndex[varIndex];
      if (variable === undefined) {
        varName = "c" + varIndex;
      } else {
        varName = variable.id;
      }
      console.log(rowString + "\t" + varName);
    }
    console.log("");

    // Then reduced costs for optional objectives
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
        reducedCostsString += signSpace + spacePerColumn[0] +
          reducedCosts[0].toFixed(digitPrecision);
        console.log(reducedCostsString + " z" + o);
      }
    }
    console.log("Feasible?", this.feasible);
    console.log("evaluation", this.evaluation);

    return this;
  };

  /*global require*/


  Tableau_1.prototype.copy = function () {
    var copy = new Tableau_1(this.precision);

    copy.width = this.width;
    copy.height = this.height;

    copy.nVars = this.nVars;
    copy.model = this.model;

    // Making a shallow copy of integer variable indexes
    // and variable ids
    copy.variables = this.variables;
    copy.variablesPerIndex = this.variablesPerIndex;
    copy.unrestrictedVars = this.unrestrictedVars;
    copy.lastElementIndex = this.lastElementIndex;

    // All the other arrays are deep copied
    copy.varIndexByRow = this.varIndexByRow.slice();
    copy.varIndexByCol = this.varIndexByCol.slice();

    copy.rowByVarIndex = this.rowByVarIndex.slice();
    copy.colByVarIndex = this.colByVarIndex.slice();

    copy.availableIndexes = this.availableIndexes.slice();

    var optionalObjectivesCopy = [];
    for (var o = 0; o < this.optionalObjectives.length; o++) {
      optionalObjectivesCopy[o] = this.optionalObjectives[o].copy();
    }
    copy.optionalObjectives = optionalObjectivesCopy;


    var matrix = this.matrix;
    var matrixCopy = new Array(this.height);
    for (var r = 0; r < this.height; r++) {
      matrixCopy[r] = matrix[r].slice();
    }

    copy.matrix = matrixCopy;

    return copy;
  };

  Tableau_1.prototype.save = function () {
    this.savedState = this.copy();
  };

  Tableau_1.prototype.restore = function () {
    if (this.savedState === null) {
      return;
    }

    var save = this.savedState;
    var savedMatrix = save.matrix;
    this.nVars = save.nVars;
    this.model = save.model;

    // Shallow restore
    this.variables = save.variables;
    this.variablesPerIndex = save.variablesPerIndex;
    this.unrestrictedVars = save.unrestrictedVars;
    this.lastElementIndex = save.lastElementIndex;

    this.width = save.width;
    this.height = save.height;

    // Restoring matrix
    var r, c;
    for (r = 0; r < this.height; r += 1) {
      var savedRow = savedMatrix[r];
      var row = this.matrix[r];
      for (c = 0; c < this.width; c += 1) {
        row[c] = savedRow[c];
      }
    }

    // Restoring all the other structures
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

  /*global require*/


  function VariableData(index, value) {
    this.index = index;
    this.value = value;
  }

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau_1.prototype.getMostFractionalVar = function () {
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

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau_1.prototype.getFractionalVarWithLowestCost = function () {
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
        // Variable value is non basic
        // its value is 0
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

  /*global require*/


  Tableau_1.prototype.countIntegerValues = function () {
    var count = 0;
    for (var r = 1; r < this.height; r += 1) {
      if (this.variablesPerIndex[this.varIndexByRow[r]].isInteger) {
        var decimalPart = this.matrix[r][this.rhsColumn];
        decimalPart = decimalPart - Math.floor(decimalPart);
        if (decimalPart < this.precision && -decimalPart < this.precision) {
          count += 1;
        }
      }
    }

    return count;
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Tableau_1.prototype.isIntegral = function () {
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

  // Multiply all the fractional parts of variables supposed to be integer
  Tableau_1.prototype.computeFractionalVolume = function (ignoreIntegerValues) {
    var volume = -1;
    // var integerVariables = this.model.integerVariables;
    // var nIntegerVars = integerVariables.length;
    // for (var v = 0; v < nIntegerVars; v++) {
    //     var r = this.rowByVarIndex[integerVariables[v].index];
    //     if (r === -1) {
    //         continue;
    //     }
    //     var rhs = this.matrix[r][this.rhsColumn];
    //     rhs = Math.abs(rhs);
    //     var decimalPart = Math.min(rhs - Math.floor(rhs), Math.floor(rhs + 1));
    //     if (decimalPart < this.precision) {
    //         if (!ignoreIntegerValues) {
    //             return 0;
    //         }
    //     } else {
    //         if (volume === -1) {
    //             volume = rhs;
    //         } else {
    //             volume *= rhs;
    //         }
    //     }
    // }

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

  /*global require*/
  /*global module*/








  var Tableau$1 = Tableau_1;

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/


  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  function Cut(type, varIndex, value) {
    this.type = type;
    this.varIndex = varIndex;
    this.value = value;
  }

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  function Branch(relaxedEvaluation, cuts) {
    this.relaxedEvaluation = relaxedEvaluation;
    this.cuts = cuts;
  }

  //-------------------------------------------------------------------
  // Branch sorting strategies
  //-------------------------------------------------------------------
  function sortByEvaluation(a, b) {
    return b.relaxedEvaluation - a.relaxedEvaluation;
  }


  //-------------------------------------------------------------------
  // Applying cuts on a tableau and resolving
  //-------------------------------------------------------------------
  Tableau_1.prototype.applyCuts = function (branchingCuts) {
    // Restoring initial solution
    this.restore();

    this.addCutConstraints(branchingCuts);
    this.simplex();
    // Adding MIR cuts
    if (this.model.useMIRCuts) {
      var fractionalVolumeImproved = true;
      while (fractionalVolumeImproved) {
        var fractionalVolumeBefore = this.computeFractionalVolume(true);
        this.applyMIRCuts();
        this.simplex();

        var fractionalVolumeAfter = this.computeFractionalVolume(true);

        // If the new fractional volume is bigger than 90% of the previous one
        // we assume there is no improvement from the MIR cuts
        if (fractionalVolumeAfter >= 0.9 * fractionalVolumeBefore) {
          fractionalVolumeImproved = false;
        }
      }
    }
  };

  //-------------------------------------------------------------------
  // Function: MILP
  // Detail: Main function, my attempt at a mixed integer linear programming
  //         solver
  //-------------------------------------------------------------------
  Tableau_1.prototype.branchAndCut = function () {
    var branches = [];
    var iterations = 0;
    var tolerance = this.model.tolerance;
    var toleranceFlag = true;
    var terminalTime = 1e99;

    //
    // Set Start Time on model...
    // Let's build out a way to *gracefully* quit
    // after {{time}} milliseconds
    //

    // 1.) Check to see if there's a timeout on the model
    //
    if (this.model.timeout) {
      // 2.) Hooray! There is!
      //     Calculate the final date
      //
      terminalTime = Date.now() + this.model.timeout;
    }

    // This is the default result
    // If nothing is both *integral* and *feasible*
    var bestEvaluation = Infinity;
    var bestBranch = null;
    var bestOptionalObjectivesEvaluations = [];
    for (var oInit = 0; oInit < this.optionalObjectives.length; oInit += 1) {
      bestOptionalObjectivesEvaluations.push(Infinity);
    }

    // And here...we...go!

    // 1.) Load a model into the queue
    var branch = new Branch(-Infinity, []);
    var acceptableThreshold;

    branches.push(branch);
    // If all branches have been exhausted terminate the loop
    while (branches.length > 0 && toleranceFlag === true && Date.now() < terminalTime) {

      if (this.model.isMinimization) {
        acceptableThreshold = this.bestPossibleEval * (1 + tolerance);
      } else {
        acceptableThreshold = this.bestPossibleEval * (1 - tolerance);
      }

      // Abort while loop if termination tolerance is both specified and condition is met
      if (tolerance > 0) {
        if (bestEvaluation < acceptableThreshold) {
          toleranceFlag = false;
        }
      }

      // Get a model from the queue
      branch = branches.pop();
      if (branch.relaxedEvaluation > bestEvaluation) {
        continue;
      }

      // Solving from initial relaxed solution
      // with additional cut constraints

      // Adding cut constraints
      var cuts = branch.cuts;
      this.applyCuts(cuts);

      iterations++;
      if (this.feasible === false) {
        continue;
      }

      var evaluation = this.evaluation;
      if (evaluation > bestEvaluation) {
        // This branch does not contain the optimal solution
        continue;
      }

      // To deal with the optional objectives
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

      // Is the model both integral and feasible?
      if (this.isIntegral() === true) {

        //
        // Store the fact that we are integral
        //
        this.__isIntegral = true;


        if (iterations === 1) {
          this.branchAndCutIterations = iterations;
          return;
        }
        // Store the solution as the bestSolution
        bestBranch = branch;
        bestEvaluation = evaluation;
        for (var oCopy = 0; oCopy < this.optionalObjectives.length; oCopy += 1) {
          bestOptionalObjectivesEvaluations[oCopy] = this.optionalObjectives[oCopy].reducedCosts[0];
        }
      } else {
        if (iterations === 1) {
          // Saving the first iteration
          // TODO: implement a better strategy for saving the tableau?
          this.save();
        }

        // If the solution is
        //  a. Feasible
        //  b. Better than the current solution
        //  c. but *NOT* integral

        // So the solution isn't integral? How do we solve this.
        // We create 2 new models, that are mirror images of the prior
        // model, with 1 exception.

        // Say we're trying to solve some stupid problem requiring you get
        // animals for your daughter's kindergarten petting zoo party
        // and you have to choose how many ducks, goats, and lambs to get.

        // Say that the optimal solution to this problem if we didn't have
        // to make it integral was {duck: 8, lambs: 3.5}
        //
        // To keep from traumatizing your daughter and the other children
        // you're going to want to have whole animals

        // What we would do is find the most fractional variable (lambs)
        // and create new models from the old models, but with a new constraint
        // on apples. The constraints on the low model would look like:
        // constraints: {...
        //   lamb: {max: 3}
        //   ...
        // }
        //
        // while the constraints on the high model would look like:
        //
        // constraints: {...
        //   lamb: {min: 4}
        //   ...
        // }
        // If neither of these models is feasible because of this constraint,
        // the model is not integral at this point, and fails.

        // Find out where we want to split the solution
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

        var min = Math.ceil(variable.value);
        var max = Math.floor(variable.value);

        var cutHigh = new Cut("min", varIndex, min);
        cutsHigh.push(cutHigh);

        var cutLow = new Cut("max", varIndex, max);
        cutsLow.push(cutLow);

        branches.push(new Branch(evaluation, cutsHigh));
        branches.push(new Branch(evaluation, cutsLow));

        // Sorting branches
        // Branches with the most promising lower bounds
        // will be picked first
        branches.sort(sortByEvaluation);
      }
    }

    // Adding cut constraints for the optimal solution
    if (bestBranch !== null) {
      // The model is feasible
      this.applyCuts(bestBranch.cuts);
    }
    this.branchAndCutIterations = iterations;
  };

  var branchAndCut = {

  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/




  var Constraint$1 = expressions.Constraint;
  var Equality$1 = expressions.Equality;
  var Variable$1 = expressions.Variable;
  var IntegerVariable$1 = expressions.IntegerVariable;

  /*************************************************************
   * Class: Model
   * Description: Holds the model of a linear optimisation problem
   **************************************************************/
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

    //
    // Quick and dirty way to leave useful information
    // for the end user without hitting the console
    // or modifying the primary return object...
    //
    this.messages = [];
  }
  var Model_1 = Model;

  Model.prototype.minimize = function () {
    this.isMinimization = true;
    return this;
  };

  Model.prototype.maximize = function () {
    this.isMinimization = false;
    return this;
  };

  // Model.prototype.addConstraint = function (constraint) {
  //     // TODO: make sure that the constraint does not belong do another model
  //     // and make
  //     this.constraints.push(constraint);
  //     return this;
  // };

  Model.prototype._getNewElementIndex = function () {
    if (this.availableIndexes.length > 0) {
      return this.availableIndexes.pop();
    }

    var index = this.lastElementIndex;
    this.lastElementIndex += 1;
    return index;
  };

  Model.prototype._addConstraint = function (constraint) {
    var slackVariable = constraint.slack;
    this.tableau.variablesPerIndex[slackVariable.index] = slackVariable;
    this.constraints.push(constraint);
    this.nConstraints += 1;
    if (this.tableauInitialized === true) {
      this.tableau.addConstraint(constraint);
    }
  };

  Model.prototype.smallerThan = function (rhs) {
    var constraint = new Constraint$1(rhs, true, this.tableau.getNewElementIndex(), this);
    this._addConstraint(constraint);
    return constraint;
  };

  Model.prototype.greaterThan = function (rhs) {
    var constraint = new Constraint$1(rhs, false, this.tableau.getNewElementIndex(), this);
    this._addConstraint(constraint);
    return constraint;
  };

  Model.prototype.equal = function (rhs) {
    var constraintUpper = new Constraint$1(rhs, true, this.tableau.getNewElementIndex(), this);
    this._addConstraint(constraintUpper);

    var constraintLower = new Constraint$1(rhs, false, this.tableau.getNewElementIndex(), this);
    this._addConstraint(constraintLower);

    return new Equality$1(constraintUpper, constraintLower);
  };

  Model.prototype.addVariable = function (cost, id, isInteger, isUnrestricted, priority) {
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
    if (id === null || id === undefined) {
      id = "v" + varIndex;
    }

    if (cost === null || cost === undefined) {
      cost = 0;
    }

    if (priority === null || priority === undefined) {
      priority = 0;
    }

    var variable;
    if (isInteger) {
      variable = new IntegerVariable$1(id, cost, varIndex, priority);
      this.integerVariables.push(variable);
    } else {
      variable = new Variable$1(id, cost, varIndex, priority);
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

  Model.prototype._removeConstraint = function (constraint) {
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

  //-------------------------------------------------------------------
  // For dynamic model modification
  //-------------------------------------------------------------------
  Model.prototype.removeConstraint = function (constraint) {
    if (constraint.isEquality) {
      this._removeConstraint(constraint.upperBound);
      this._removeConstraint(constraint.lowerBound);
    } else {
      this._removeConstraint(constraint);
    }

    return this;
  };

  Model.prototype.removeVariable = function (variable) {
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

  Model.prototype.updateRightHandSide = function (constraint, difference) {
    if (this.tableauInitialized === true) {
      this.tableau.updateRightHandSide(constraint, difference);
    }
    return this;
  };

  Model.prototype.updateConstraintCoefficient = function (constraint, variable, difference) {
    if (this.tableauInitialized === true) {
      this.tableau.updateConstraintCoefficient(constraint, variable, difference);
    }
    return this;
  };


  Model.prototype.setCost = function (cost, variable) {
    var difference = cost - variable.cost;
    if (this.isMinimization === false) {
      difference = -difference;
    }

    variable.cost = cost;
    this.tableau.updateCost(variable, difference);
    return this;
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Model.prototype.loadJson = function (jsonModel) {
    this.isMinimization = (jsonModel.opType !== "max");

    var variables = jsonModel.variables;
    var constraints = jsonModel.constraints;

    var constraintsMin = {};
    var constraintsMax = {};

    // Instantiating constraints
    var constraintIds = Object.keys(constraints);
    var nConstraintIds = constraintIds.length;

    for (var c = 0; c < nConstraintIds; c += 1) {
      var constraintId = constraintIds[c];
      var constraint = constraints[constraintId];
      var equal = constraint.equal;

      var weight = constraint.weight;
      var priority = constraint.priority;
      var relaxed = weight !== undefined || priority !== undefined;

      var lowerBound, upperBound;
      if (equal === undefined) {
        var min = constraint.min;
        if (min !== undefined) {
          lowerBound = this.greaterThan(min);
          constraintsMin[constraintId] = lowerBound;
          if (relaxed) { lowerBound.relax(weight, priority); }
        }

        var max = constraint.max;
        if (max !== undefined) {
          upperBound = this.smallerThan(max);
          constraintsMax[constraintId] = upperBound;
          if (relaxed) { upperBound.relax(weight, priority); }
        }
      } else {
        lowerBound = this.greaterThan(equal);
        constraintsMin[constraintId] = lowerBound;

        upperBound = this.smallerThan(equal);
        constraintsMax[constraintId] = upperBound;

        var equality = new Equality$1(lowerBound, upperBound);
        if (relaxed) { equality.relax(weight, priority); }
      }
    }

    var variableIds = Object.keys(variables);
    var nVariables = variableIds.length;



    //
    //
    // *** OPTIONS ***
    //
    //

    this.tolerance = jsonModel.tolerance || 0;

    if (jsonModel.timeout) {
      this.timeout = jsonModel.timeout;
    }

    //
    //
    // The model is getting too sloppy with options added to it...
    // mebe it needs an "options" option...?
    //
    // YES! IT DOES!
    // DO IT!
    // NOW!
    // HERE!!!
    //
    if (jsonModel.options) {

      //
      // TIMEOUT
      //
      if (jsonModel.options.timeout) {
        this.timeout = jsonModel.options.timeout;
      }

      //
      // TOLERANCE
      //
      if (this.tolerance === 0) {
        this.tolerance = jsonModel.options.tolerance || 0;
      }

      //
      // MIR CUTS - (NOT WORKING)
      //
      if (jsonModel.options.useMIRCuts) {
        this.useMIRCuts = jsonModel.options.useMIRCuts;
      }

      //
      // CYCLE CHECK...tricky because it defaults to false
      //
      //
      // This should maybe be on by default...
      //
      if (typeof jsonModel.options.exitOnCycles === "undefined") {
        this.checkForCycles = true;
      } else {
        this.checkForCycles = jsonModel.options.exitOnCycles;
      }


    }


    //
    //
    // /// OPTIONS \\\
    //
    //

    var integerVarIds = jsonModel.ints || {};
    var binaryVarIds = jsonModel.binaries || {};
    var unrestrictedVarIds = jsonModel.unrestricted || {};

    // Instantiating variables and constraint terms
    var objectiveName = jsonModel.optimize;
    for (var v = 0; v < nVariables; v += 1) {
      // Creation of the variables
      var variableId = variableIds[v];
      var variableConstraints = variables[variableId];
      var cost = variableConstraints[objectiveName] || 0;
      var isBinary = !!binaryVarIds[variableId];
      var isInteger = !!integerVarIds[variableId] || isBinary;
      var isUnrestricted = !!unrestrictedVarIds[variableId];
      var variable = this.addVariable(cost, variableId, isInteger, isUnrestricted);

      if (isBinary) {
        // Creating an upperbound constraint for this variable
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
        if (constraintMin !== undefined) {
          constraintMin.addTerm(coefficient, variable);
        }

        var constraintMax = constraintsMax[constraintName];
        if (constraintMax !== undefined) {
          constraintMax.addTerm(coefficient, variable);
        }
      }
    }

    return this;
  };

  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  Model.prototype.getNumberOfIntegerVariables = function () {
    return this.integerVariables.length;
  };

  Model.prototype.solve = function () {
    // Setting tableau if not done
    if (this.tableauInitialized === false) {
      this.tableau.setModel(this);
      this.tableauInitialized = true;
    }

    return this.tableau.solve();
  };

  Model.prototype.isFeasible = function () {
    return this.tableau.feasible;
  };

  Model.prototype.save = function () {
    return this.tableau.save();
  };

  Model.prototype.restore = function () {
    return this.tableau.restore();
  };

  Model.prototype.activateMIRCuts = function (useMIRCuts) {
    this.useMIRCuts = useMIRCuts;
  };

  Model.prototype.debug = function (debugCheckForCycles) {
    this.checkForCycles = debugCheckForCycles;
  };

  Model.prototype.log = function (message) {
    return this.tableau.log(message);
  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/
  /*global exports*/


  // All functions in this module that
  // get exported to main ***MUST***
  // return a functional LPSolve JSON style
  // model or throw an error

  var CleanObjectiveAttributes = function (model) {
    // Test to see if the objective attribute
    // is also used by one of the constraints
    //
    // If so...create a new attribute on each
    // variable
    var fakeAttr,
      x, z;

    if (typeof model.optimize === "string") {
      if (model.constraints[model.optimize]) {
        // Create the new attribute
        fakeAttr = Math.random();

        // Go over each variable and check
        for (x in model.variables) {
          // Is it there?
          if (model.variables[x][model.optimize]) {
            model.variables[x][fakeAttr] = model.variables[x][model.optimize];
          }
        }

        // Now that we've cleaned up the variables
        // we need to clean up the constraints
        model.constraints[fakeAttr] = model.constraints[model.optimize];
        delete model.constraints[model.optimize];
        return model;
      } else {
        return model;
      }
    } else {
      // We're assuming its an object?
      for (z in model.optimize) {
        if (model.constraints[z]) {
          // Make sure that the constraint
          // being optimized isn't constrained
          // by an equity collar
          if (model.constraints[z] === "equal") {
            // Its constrained by an equal sign;
            // delete that objective and move on
            delete model.optimize[z];

          } else {
            // Create the new attribute
            fakeAttr = Math.random();

            // Go over each variable and check
            for (x in model.variables) {
              // Is it there?
              if (model.variables[x][z]) {
                model.variables[x][fakeAttr] = model.variables[x][z];
              }
            }
            // Now that we've cleaned up the variables
            // we need to clean up the constraints
            model.constraints[fakeAttr] = model.constraints[z];
            delete model.constraints[z];
          }
        }
      }
      return model;
    }
  };

  var Validation = {
    CleanObjectiveAttributes: CleanObjectiveAttributes
  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/
  /*jshint -W083 */






  /*************************************************************
  * Method: to_JSON
  * Scope: Public:
  * Agruments: input: Whatever the user gives us
  * Purpose: Convert an unfriendly formatted LP
  *          into something that our library can
  *          work with
  **************************************************************/
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
      "get_num": /(\-|\+){0,1}(\W|^)\d+\.{0,1}\d{0,}/g, // Why accepting character \W before the first digit?
      "get_word": /[A-Za-z].*/
      /* jshint ignore:end */
    },
      model = {
        "opType": "",
        "optimize": "_obj",
        "constraints": {},
        "variables": {}
      },
      constraints = {
        ">=": "min",
        "<=": "max",
        "=": "equal"
      },
      tmp = "", ary = null, hldr = "", hldr2 = "",
      constraint = "", rhs = 0;

    // Handle input if its coming
    // to us as a hard string
    // instead of as an array of
    // strings
    if (typeof input === "string") {
      input = input.split("\n");
    }

    // Start iterating over the rows
    // to see what all we have
    for (var i = 0; i < input.length; i++) {

      constraint = "__" + i;

      // Get the string we're working with
      tmp = input[i];

      // Reset the array
      ary = null;

      // Test to see if we're the objective
      if (rxo.is_objective.test(tmp)) {
        // Set up in model the opType
        model.opType = tmp.match(/(max|min)/gi)[0];

        // Pull apart lhs
        ary = tmp.match(rxo.parse_lhs).map(function (d) {
          return d.replace(/\s+/, "");
        }).slice(1);



        // *** STEP 1 *** ///
        // Get the variables out
        ary.forEach(function (d) {

          // Get the number if its there
          hldr = d.match(rxo.get_num);

          // If it isn't a number, it might
          // be a standalone variable
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

          // Get the variable type
          hldr2 = d.match(rxo.get_word)[0].replace(/\;$/, "");

          // Make sure the variable is in the model
          model.variables[hldr2] = model.variables[hldr2] || {};
          model.variables[hldr2]._obj = hldr;

        });
        ////////////////////////////////////
      } else if (rxo.is_int.test(tmp)) {
        // Get the array of ints
        ary = tmp.match(rxo.parse_int).slice(1);

        // Since we have an int, our model should too
        model.ints = model.ints || {};

        ary.forEach(function (d) {
          d = d.replace(";", "");
          model.ints[d] = 1;
        });
        ////////////////////////////////////
      } else if (rxo.is_bin.test(tmp)) {
        // Get the array of bins
        ary = tmp.match(rxo.parse_bin).slice(1);

        // Since we have an binary, our model should too
        model.binaries = model.binaries || {};

        ary.forEach(function (d) {
          d = d.replace(";", "");
          model.binaries[d] = 1;
        });
        ////////////////////////////////////
      } else if (rxo.is_constraint.test(tmp)) {
        var separatorIndex = tmp.indexOf(":");
        var constraintExpression = (separatorIndex === -1) ? tmp : tmp.slice(separatorIndex + 1);

        // Pull apart lhs
        ary = constraintExpression.match(rxo.parse_lhs).map(function (d) {
          return d.replace(/\s+/, "");
        });

        // *** STEP 1 *** ///
        // Get the variables out
        ary.forEach(function (d) {
          // Get the number if its there
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


          // Get the variable name
          hldr2 = d.match(rxo.get_word)[0];

          // Make sure the variable is in the model
          model.variables[hldr2] = model.variables[hldr2] || {};
          model.variables[hldr2][constraint] = hldr;

        });

        // *** STEP 2 *** ///
        // Get the RHS out
        rhs = parseFloat(tmp.match(rxo.parse_rhs)[0]);

        // *** STEP 3 *** ///
        // Get the Constrainer out
        tmp = constraints[tmp.match(rxo.parse_dir)[0]];
        model.constraints[constraint] = model.constraints[constraint] || {};
        model.constraints[constraint][tmp] = rhs;
        ////////////////////////////////////
      } else if (rxo.is_unrestricted.test(tmp)) {
        // Get the array of unrestricted
        ary = tmp.match(rxo.parse_int).slice(1);

        // Since we have an int, our model should too
        model.unrestricted = model.unrestricted || {};

        ary.forEach(function (d) {
          d = d.replace(";", "");
          model.unrestricted[d] = 1;
        });
      }
    }
    return model;
  }


  /*************************************************************
  * Method: from_JSON
  * Scope: Public:
  * Agruments: model: The model we want solver to operate on
  * Purpose: Convert a friendly JSON model into a model for a
  *          real solving library...in this case
  *          lp_solver
  **************************************************************/
  function from_JSON(model) {
    // Make sure we at least have a model
    if (!model) {
      throw new Error("Solver requires a model to operate on");
    }

    var output = "",
      lookup = {
        "max": "<=",
        "min": ">=",
        "equal": "="
      },
      rxClean = new RegExp("[^A-Za-z0-9]+", "gi");

    // Build the objective statement
    output += model.opType + ":";

    // Iterate over the variables
    for (var x in model.variables) {
      // Give each variable a self of 1 unless
      // it exists already
      model.variables[x][x] = model.variables[x][x] ? model.variables[x][x] : 1;

      // Does our objective exist here?
      if (model.variables[x][model.optimize]) {
        output += " " + model.variables[x][model.optimize] + " " + x.replace(rxClean, "_");
      }
    }

    // Add some closure to our line thing
    output += ";\n";

    // And now... to iterate over the constraints
    for (x in model.constraints) {
      for (var y in model.constraints[x]) {
        for (var z in model.variables) {
          // Does our Constraint exist here?
          if (model.variables[z][x]) {
            output += " " + model.variables[z][x] + " " + z.replace(rxClean, "_");
          }
        }
        // Add the constraint type and value...
        output += " " + lookup[y] + " " + model.constraints[x][y];
        output += ";\n";
      }
    }

    // Are there any ints?
    if (model.ints) {
      output += "\n\n";
      for (x in model.ints) {
        output += "int " + x.replace(rxClean, "_") + ";\n";
      }
    }

    // Are there any unrestricted?
    if (model.unrestricted) {
      output += "\n\n";
      for (x in model.unrestricted) {
        output += "unrestricted " + x.replace(rxClean, "_") + ";\n";
      }
    }

    // And kick the string back
    return output;
  }


  var Reformat = function (model) {
    // If the user is giving us an array
    // or a string, convert it to a JSON Model
    // otherwise, spit it out as a string
    if (model.length) {
      return to_JSON(model);
    } else {
      return from_JSON(model);
    }
  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/

  /***************************************************************
   * Method: polyopt
   * Scope: private
   * Agruments:
   *        model: The model we want solver to operate on.
                   Because we're in here, we're assuming that
                   we're solving a multi-objective optimization
                   problem. Poly-Optimization. polyopt.

                   This model has to be formed a little differently
                   because it has multiple objective functions.
                   Normally, a model has 2 attributes: opType (string,
                   "max" or "min"), and optimize (string, whatever
                   attribute we're optimizing.

                   Now, there is no opType attribute on the model,
                   and optimize is an object of attributes to be
                   optimized, and how they're to be optimized.
                   For example:

                   ...
                   "optimize": {
                      "pancakes": "max",
                      "cost": "minimize"
                   }
                   ...


   **************************************************************/

  var Polyopt = function (solver, model) {

    // I have no idea if this is actually works, or what,
    // but here is my algorithm to solve linear programs
    // with multiple objective functions

    // 1. Optimize for each constraint
    // 2. The results for each solution is a vector
    //    representing a vertex on the polytope we're creating
    // 3. The results for all solutions describes the shape
    //    of the polytope (would be nice to have the equation
    //    representing this)
    // 4. Find the mid-point between all vertices by doing the
    //    following (a_1 + a_2 ... a_n) / n;
    var objectives = model.optimize,
      new_constraints = JSON.parse(JSON.stringify(model.optimize)),
      keys = Object.keys(model.optimize),
      tmp,
      counter = 0,
      vectors = {},
      vector_key = "",
      obj = {},
      pareto = [],
      i, j, x, y;

    // Delete the optimize object from the model
    delete model.optimize;

    // Iterate and Clear
    for (i = 0; i < keys.length; i++) {
      // Clean up the new_constraints
      new_constraints[keys[i]] = 0;
    }

    // Solve and add
    for (i = 0; i < keys.length; i++) {

      // Prep the model
      model.optimize = keys[i];
      model.opType = objectives[keys[i]];

      // solve the model
      tmp = solver.Solve(model, undefined, undefined, true);

      // Only the variables make it into the solution;
      // not the attributes.
      //
      // Because of this, we have to add the attributes
      // back onto the solution so we can do math with
      // them later...

      // Loop over the keys
      for (y in keys) {
        // We're only worried about attributes, not variables
        if (!model.variables[keys[y]]) {
          // Create space for the attribute in the tmp object
          tmp[keys[y]] = tmp[keys[y]] ? tmp[keys[y]] : 0;
          // Go over each of the variables
          for (x in model.variables) {
            // Does the variable exist in tmp *and* does attribute exist in this model?
            if (model.variables[x][keys[y]] && tmp[x]) {
              // Add it to tmp
              tmp[keys[y]] += tmp[x] * model.variables[x][keys[y]];
            }
          }
        }
      }

      // clear our key
      vector_key = "base";
      // this makes sure that if we get
      // the same vector more than once,
      // we only count it once when finding
      // the midpoint
      for (j = 0; j < keys.length; j++) {
        if (tmp[keys[j]]) {
          vector_key += "-" + ((tmp[keys[j]] * 1000) | 0) / 1000;
        } else {
          vector_key += "-0";
        }
      }

      // Check here to ensure it doesn't exist
      if (!vectors[vector_key]) {
        // Add the vector-key in
        vectors[vector_key] = 1;
        counter++;

        // Iterate over the keys
        // and update our new constraints
        for (j = 0; j < keys.length; j++) {
          if (tmp[keys[j]]) {
            new_constraints[keys[j]] += tmp[keys[j]];
          }
        }

        // Push the solution into the paretos
        // array after cleaning it of some
        // excess data markers

        delete tmp.feasible;
        delete tmp.result;
        pareto.push(tmp);
      }
    }

    // Trying to find the mid-point
    // divide each constraint by the
    // number of constraints
    // *midpoint formula*
    // (x1 + x2 + x3) / 3
    for (i = 0; i < keys.length; i++) {
      model.constraints[keys[i]] = { "equal": new_constraints[keys[i]] / counter };
    }

    // Give the model a fake thing to optimize on
    model.optimize = "cheater-" + Math.random();
    model.opType = "max";

    // And add the fake attribute to the variables
    // in the model
    for (i in model.variables) {
      model.variables[i].cheater = 1;
    }

    // Build out the object with all attributes
    for (i in pareto) {
      for (x in pareto[i]) {
        obj[x] = obj[x] || { min: 1e99, max: -1e99 };
      }
    }

    // Give each pareto a full attribute list
    // while getting the max and min values
    // for each attribute
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
    // Solve the model for the midpoints
    tmp = solver.Solve(model, undefined, undefined, true);

    return {
      midpoint: tmp,
      vertices: pareto,
      ranges: obj
    };

  };

  /*global describe*/
  /*global require*/
  /*global module*/
  /*global it*/
  /*global console*/
  /*global process*/
  /*global setTimeout*/


  //-------------------------------------------------------------------
  // SimplexJS
  // https://github.com/
  // An Object-Oriented Linear Programming Solver
  //
  // By Justin Wolcott (c)
  // Licensed under the MIT License.
  //-------------------------------------------------------------------






  var Constraint$2 = expressions.Constraint;
  var Variable$2 = expressions.Variable;
  var Numeral = expressions.Numeral;
  var Term$2 = expressions.Term;

  // Place everything under the Solver Name Space
  var Solver = function () {

    this.Model = Model_1;
    this.branchAndCut = branchAndCut;
    this.Constraint = Constraint$2;
    this.Variable = Variable$2;
    this.Numeral = Numeral;
    this.Term = Term$2;
    this.Tableau = Tableau$1;

    this.lastSolvedModel = null;

    /*************************************************************
     * Method: Solve
     * Scope: Public:
     * Agruments:
     *        model: The model we want solver to operate on
     *        precision: If we're solving a MILP, how tight
     *                   do we want to define an integer, given
     *                   that 20.000000000000001 is not an integer.
     *                   (defaults to 1e-9)
     *            full: *get better description*
     *        validate: if left blank, it will get ignored; otherwise
     *                  it will run the model through all validation
     *                  functions in the *Validate* module
     **************************************************************/
    this.Solve = function (model, precision, full, validate) {
      // Run our validations on the model
      // if the model doesn't have a validate
      // attribute set to false
      if (validate) {
        for (var test in Validation) {
          model = Validation[test](model);
        }
      }

      // Make sure we at least have a model
      if (!model) {
        throw new Error("Solver requires a model to operate on");
      }

      if (model instanceof Model_1 === false) {
        model = new Model_1(precision).loadJson(model);
      }

      var solution = model.solve();
      this.lastSolvedModel = model;
      solution.solutionSet = solution.generateSolutionSet();

      // If the user asks for a full breakdown
      // of the tableau (e.g. full === true)
      // this will return it
      if (full) {
        return solution;
      } else {
        // Otherwise; give the user the bare
        // minimum of info necessary to carry on

        var store = {};

        // 1.) Add in feasibility to store;
        store.feasible = solution.feasible;

        // 2.) Add in the objective value
        store.result = solution.evaluation;

        store.bounded = solution.bounded;

        if (solution._tableau.__isIntegral) {
          store.isIntegral = true;
        }

        // 3.) Load all of the variable values
        Object.keys(solution.solutionSet)
          .forEach(function (d) {
            //
            // When returning data in standard format,
            // Remove all 0's
            //
            if (solution.solutionSet[d] !== 0) {
              store[d] = solution.solutionSet[d];
            }

          });

        return store;
      }

    };

    /*************************************************************
     * Method: ReformatLP
     * Scope: Public:
     * Agruments: model: The model we want solver to operate on
     * Purpose: Convert a friendly JSON model into a model for a
     *          real solving library...in this case
     *          lp_solver
     **************************************************************/
    this.ReformatLP = Reformat;


    /*************************************************************
    * Method: MultiObjective
    * Scope: Public:
    * Agruments:
    *        model: The model we want solver to operate on
    *        detail: if false, or undefined; it will return the
    *                result of using the mid-point formula; otherwise
    *                it will return an object containing:
    *
    *                1. The results from the mid point formula
    *                2. The solution for each objective solved
    *                   in isolation (pareto)
    *                3. The min and max of each variable along
    *                   the frontier of the polytope (ranges)
    * Purpose: Solve a model with multiple objective functions.
    *          Since a potential infinite number of solutions exist
    *          this naively returns the mid-point between
    *
    * Note: The model has to be changed a little to work with this.
    *       Before an *opType* was required. No more. The objective
    *       attribute of the model is now an object instead of a
    *       string.
    *
    *  *EXAMPLE MODEL*
    *
    *   model = {
    *       optimize: {scotch: "max", soda: "max"},
    *       constraints: {fluid: {equal: 100}},
    *       variables: {
    *           scotch: {fluid: 1, scotch: 1},
    *           soda: {fluid: 1, soda: 1}
    *       }
    *   }
    *
    **************************************************************/
    this.MultiObjective = function (model) {
      return Polyopt(this, model);
    };
  };

  // var define = define || undefined;
  // var window = window || undefined;

  // If the project is loading through require.js, use `define` and exit
  if (typeof window === "object") {
    window.solver = new Solver();
  }
  // Ensure that its available in node.js env
  var main = new Solver();

  // Order nodes such that the total number of crossings is minimized

  const crossings = "crossings";

  function opt() {
    let debug = false;

    function key(...nodes) {
      return nodes
        .map((n) => n.id)
        .sort()
        .join(debug ? " => " : "\0\0");
    }

    function perms(model, layer) {
      layer.sort((n1, n2) => n1.id > n2.id || -1);

      layer.slice(0, layer.length - 1).forEach((n1, i) =>
        layer.slice(i + 1).forEach((n2) => {
          const pair = key(n1, n2);
          model.ints[pair] = 1;
          model.constraints[pair] = { max: 1 };
          model.variables[pair] = { [pair]: 1 };
        })
      );

      layer.slice(0, layer.length - 1).forEach((n1, i) =>
        layer.slice(i + 1).forEach((n2, j) => {
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
      layer.slice(0, layer.length - 1).forEach((p1, i) =>
        layer.slice(i + 1).forEach((p2) => {
          const pairp = key(p1, p2);
          p1.children.forEach((c1) =>
            p2.children
              .filter((c) => c !== c1)
              .forEach((c2) => {
                const pairc = key(c1, c2);
                const slack = debug
                  ? `slack (${pairp}) (${pairc})`
                  : `${pairp}\0\0\0${pairc}`;
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

    function decrossOpt(layers) {
      // Initialize model
      const model = {
        optimize: crossings,
        optType: "min",
        constraints: {},
        variables: {},
        ints: {}
      };

      // Add variables and permutation invariants
      layers.forEach((lay) => perms(model, lay));

      // Add crossing minimization
      layers.slice(0, layers.length - 1).forEach((lay) => cross(model, lay));

      // Solve objective
      const ordering = main.Solve(model);

      // Sort layers
      layers.forEach((layer) =>
        layer.sort(
          (n1, n2) => (n1.id > n2.id || -1) * (ordering[key(n1, n2)] || -1)
        )
      );

      return layers;
    }

    decrossOpt.debug = function (x) {
      return arguments.length ? ((debug = x), decrossOpt) : debug;
    };

    return decrossOpt;
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function (a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function (a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function (d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);

  function number(x) {
    return x === null ? NaN : +x;
  }

  function quantile(values, p, valueof) {
    if (valueof == null) valueof = number;
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
    if (p >= 1) return +valueof(values[n - 1], n - 1, values);
    var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
    return value0 + (value1 - value0) * (i - i0);
  }

  function median(values, valueof) {
    var n = values.length,
      i = -1,
      value,
      numbers = [];

    if (valueof == null) {
      while (++i < n) {
        if (!isNaN(value = number(values[i]))) {
          numbers.push(value);
        }
      }
    }

    else {
      while (++i < n) {
        if (!isNaN(value = number(valueof(values[i], i, values)))) {
          numbers.push(value);
        }
      }
    }

    return quantile(numbers.sort(ascending), 0.5);
  }

  function median$1() {
    function twolayerMedian(topLayer, bottomLayer) {
      bottomLayer.forEach((n) => (n._median = []));
      topLayer.forEach((n, i) => n.children.forEach((c) => c._median.push(i)));
      bottomLayer.forEach((n) => (n._median = median(n._median) || 0));
      bottomLayer.sort((a, b) => a._median - b._median);
      bottomLayer.forEach((n) => delete n._median);
    }

    return twolayerMedian;
  }

  // Order nodes using two layer algorithm

  // TODO Add number of passes, with 0 being keep passing up and down until no changes (is this guaranteed to never change?, maybe always terminate if no changes, so this can be set very high to almost achieve that effect)
  // TODO Add optional greedy swapping of nodes after assignment
  // TODO Add two layer noop. This only makes sense if there's a greedy swapping ability

  function twoLayer() {
    let order = median$1();

    function decrossTwoLayer(layers) {
      layers
        .slice(0, layers.length - 1)
        .forEach((layer, i) => order(layer, layers[i + 1]));
      return layers;
    }

    decrossTwoLayer.order = function (x) {
      return arguments.length ? ((order = x), decrossTwoLayer) : order;
    };

    return decrossTwoLayer;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var FastPriorityQueue_1 = createCommonjsModule(function (module) {

    var defaultcomparator = function (a, b) {
      return a < b;
    };

    // the provided comparator function should take a, b and return *true* when a < b
    function FastPriorityQueue(comparator) {
      if (!(this instanceof FastPriorityQueue)) return new FastPriorityQueue(comparator);
      this.array = [];
      this.size = 0;
      this.compare = comparator || defaultcomparator;
    }

    FastPriorityQueue.prototype.clone = function () {
      var fpq = new FastPriorityQueue(this.compare);
      fpq.size = this.size;
      for (var i = 0; i < this.size; i++) {
        fpq.array.push(this.array[i]);
      }
      return fpq;
    };

    // Add an element into the queue
    // runs in O(log n) time
    FastPriorityQueue.prototype.add = function (myval) {
      var i = this.size;
      this.array[this.size] = myval;
      this.size += 1;
      var p;
      var ap;
      while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        if (!this.compare(myval, ap)) {
          break;
        }
        this.array[i] = ap;
        i = p;
      }
      this.array[i] = myval;
    };

    // replace the content of the heap by provided array and "heapifies it"
    FastPriorityQueue.prototype.heapify = function (arr) {
      this.array = arr;
      this.size = arr.length;
      var i;
      for (i = this.size >> 1; i >= 0; i--) {
        this._percolateDown(i);
      }
    };

    // for internal use
    FastPriorityQueue.prototype._percolateUp = function (i, force) {
      var myval = this.array[i];
      var p;
      var ap;
      while (i > 0) {
        p = (i - 1) >> 1;
        ap = this.array[p];
        // force will skip the compare
        if (!force && !this.compare(myval, ap)) {
          break;
        }
        this.array[i] = ap;
        i = p;
      }
      this.array[i] = myval;
    };

    // for internal use
    FastPriorityQueue.prototype._percolateDown = function (i) {
      var size = this.size;
      var hsize = this.size >>> 1;
      var ai = this.array[i];
      var l;
      var r;
      var bestc;
      while (i < hsize) {
        l = (i << 1) + 1;
        r = l + 1;
        bestc = this.array[l];
        if (r < size) {
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

    // internal
    // _removeAt(index) will delete the given index from the queue,
    // retaining balance. returns true if removed.
    FastPriorityQueue.prototype._removeAt = function (index) {
      if (this.isEmpty() || index > this.size - 1 || index < 0) return false;

      // impl1:
      //this.array.splice(index, 1);
      //this.heapify(this.array);
      // impl2:
      this._percolateUp(index, true);
      this.poll();
      return true;
    };

    // remove(myval[, comparator]) will remove the given item from the
    // queue, checked for equality by using compare if a new comparator isn't provided.
    // (for exmaple, if you want to remove based on a seperate key value, not necessarily priority).
    // return true if removed.
    FastPriorityQueue.prototype.remove = function (myval, comparator) {
      if (!comparator) {
        comparator = this.compare;
      }
      if (this.isEmpty()) return false;
      for (var i = 0; i < this.size; i++) {
        if (comparator(this.array[i], myval) || comparator(myval, this.array[i])) {
          continue;
        }
        // items are equal, remove
        return this._removeAt(i);
      }
      return false;
    };

    // Look at the top of the queue (a smallest element)
    // executes in constant time
    //
    // Calling peek on an empty priority queue returns
    // the "undefined" value.
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
    //
    FastPriorityQueue.prototype.peek = function () {
      if (this.size == 0) return undefined;
      return this.array[0];
    };

    // remove the element on top of the heap (a smallest element)
    // runs in logarithmic time
    //
    // If the priority queue is empty, the function returns the
    // "undefined" value.
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined
    //
    // For long-running and large priority queues, or priority queues
    // storing large objects, you may  want to call the trim function
    // at strategic times to recover allocated memory.
    FastPriorityQueue.prototype.poll = function () {
      if (this.size == 0) return undefined;
      var ans = this.array[0];
      if (this.size > 1) {
        this.array[0] = this.array[--this.size];
        this._percolateDown(0 | 0);
      } else {
        this.size -= 1;
      }
      return ans;
    };

    // This function adds the provided value to the heap, while removing
    //  and returning the peek value (like poll). The size of the priority
    // thus remains unchanged.
    FastPriorityQueue.prototype.replaceTop = function (myval) {
      if (this.size == 0) return undefined;
      var ans = this.array[0];
      this.array[0] = myval;
      this._percolateDown(0 | 0);
      return ans;
    };

    // recover unused memory (for long-running priority queues)
    FastPriorityQueue.prototype.trim = function () {
      this.array = this.array.slice(0, this.size);
    };

    // Check whether the heap is empty
    FastPriorityQueue.prototype.isEmpty = function () {
      return this.size === 0;
    };

    // iterate over the items in order, pass a callback that receives (item, index) as args.
    // TODO once we transpile, uncomment
    // if (Symbol && Symbol.iterator) {
    //   FastPriorityQueue.prototype[Symbol.iterator] = function*() {
    //     if (this.isEmpty()) return;
    //     var fpq = this.clone();
    //     while (!fpq.isEmpty()) {
    //       yield fpq.poll();
    //     }
    //   };
    // }
    FastPriorityQueue.prototype.forEach = function (callback) {
      if (this.isEmpty() || typeof callback != 'function') return;
      var i = 0;
      var fpq = this.clone();
      while (!fpq.isEmpty()) {
        callback(fpq.poll(), i++);
      }
    };

    // return the k 'smallest' elements of the queue
    // runs in O(k log k) time
    // this is the equivalent of repeatedly calling poll, but
    // it has a better computational complexity, which can be
    // important for large data sets.
    FastPriorityQueue.prototype.kSmallest = function (k) {
      if (this.size == 0) return [];
      var comparator = this.compare;
      var arr = this.array;
      var fpq = new FastPriorityQueue(function (a, b) {
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
        if (l < this.size) fpq.add(l);
        if (r < this.size) fpq.add(r);
      }
      return smallest;
    };

    // just for illustration purposes
    var main = function () {
      // main code
      var x = new FastPriorityQueue(function (a, b) {
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

    if (commonjsRequire.main === module) {
      main();
    }

    module.exports = FastPriorityQueue;
  });

  // Assign layer to each node that constrains width

  function coffmanGraham() {
    let maxWidth = 0;

    function layeringCoffmanGraham(dag) {
      maxWidth =
        maxWidth || Math.floor(Math.sqrt(dag.reduce((a) => a + 1, 0)) + 0.5);

      // Initialize node data
      dag
        .each((node) => {
          node._before = [];
          node._parents = [];
        })
        .each((n) => n.children.forEach((c) => c._parents.push(n)));

      // Create queue
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

      // Start with root nodes
      dag.roots().forEach((n) => queue.add(n));
      let i = 0;
      let layer = 0;
      let width = 0;
      let node;
      while ((node = queue.poll())) {
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

      // Remove bookkeeping
      dag.each((node) => {
        delete node._before;
        delete node._parents;
      });
      return dag;
    }

    layeringCoffmanGraham.width = function (x) {
      return arguments.length
        ? ((maxWidth = x), layeringCoffmanGraham)
        : maxWidth;
    };

    return layeringCoffmanGraham;
  }

  // Assign a value for the layer of each node that minimizes the length of the longest path
  function layeringLongestPath() {
    let topDown = true;

    function layeringLongestPath(dag) {
      if (topDown) {
        const maxHeight = Math.max(
          ...dag
            .height()
            .roots()
            .map((d) => d.value)
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

    layeringLongestPath.topDown = function (x) {
      return arguments.length ? ((topDown = x), layeringLongestPath) : topDown;
    };

    return layeringLongestPath;
  }

  // Assign a layer value for each node that minimizes the number of dummy nodes that need to be added

  function simplex$1() {
    let debug = false;

    function layeringSimplex(dag) {
      // use null prefixes to prevent clash
      const prefix = debug ? "" : "\0";
      const delim = debug ? " -> " : "\0";

      const variables = {};
      const ints = {};
      const constraints = {};
      dag.each((node) => {
        const nid = `${prefix}${node.id}`;
        ints[nid] = 1;
        const variable = (variables[nid] = { opt: node.children.length });
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
        constraints: constraints,
        variables: variables,
        ints: ints
      });
      // lp solver doesn't assign some zeros
      dag.each((n) => (n.layer = assignment[`${prefix}${n.id}`] || 0));
      return dag;
    }

    layeringSimplex.debug = function (x) {
      return arguments.length ? ((debug = x), layeringSimplex) : debug;
    };

    return layeringSimplex;
  }

  // Assign a value for the layer of each node that is a topological ordering
  function topological$1() {
    // TODO Add option to optimally assign layer to minimize number of dummy
    // nodes, similar to simplex. This might be combinatoric.

    function layeringTopological(dag) {
      let layer = 0;
      dag.eachBefore((n) => (n.layer = layer++));
      return dag;
    }

    return layeringTopological;
  }

  // Compute a sugiyama layout for a dag assigning each node an x and y

  function index() {
    let debug = false;
    let nodeSize = false;
    let width = 1;
    let height = 1;
    let layering = simplex$1();
    let decross = twoLayer();
    let coord = greedy();
    let separation = defaultSeparation;

    // Takes a dag where nodes have a layer attribute, and adds dummy nodes so each
    // layer is adjacent, and returns an array of each layer of nodes.
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
                `${node.id}${debug ? "->" : "\0"}${child.id}${debug ? " (" : "\0"
                }${l}${debug ? ")" : ""}`,
                undefined
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

    function sugiyama(dag) {
      // Compute layers
      layering(dag);
      // Verify layering
      if (!dag.every((node) => node.children.every((c) => c.layer > node.layer)))
        throw new Error("layering wasn't proper");
      // Create layers
      const layers = createLayers(dag);
      // Assign y
      if (layers.length === 1) {
        const [layer] = layers;
        layer.forEach((n) => (n.y = height / 2));
      } else {
        const dh = nodeSize ? height : height / (layers.length - 1);
        layers.forEach((layer, i) => layer.forEach((n) => (n.y = dh * i)));
      }
      if (layers.every((l) => l.length === 1)) {
        // Next steps aren't necessary
        // This will also be true if layers.length === 1
        layers.forEach(([n]) => (n.x = width / 2));
      } else {
        // Minimize edge crossings
        decross(layers);
        // Assign coordinates
        coord(layers, separation);
        // Scale x
        const minGap = Math.min(
          ...layers
            .filter((layer) => layer.length > 1)
            .map((layer) =>
              Math.min(...layer.slice(1).map((n, i) => n.x - layer[i].x))
            )
        );
        const sw = nodeSize ? minGap : 1.0;
        layers.forEach((layer) => layer.forEach((n) => (n.x *= width / sw)));
      }
      // Remove dummy nodes and update edge data
      removeDummies(dag);
      return dag;
    }

    sugiyama.debug = function (x) {
      return arguments.length ? ((debug = x), sugiyama) : debug;
    };

    sugiyama.size = function (x) {
      return arguments.length
        ? ((nodeSize = false), ([width, height] = x), sugiyama)
        : nodeSize
          ? null
          : [width, height];
    };

    sugiyama.nodeSize = function (x) {
      return arguments.length
        ? ((nodeSize = true), ([width, height] = x), sugiyama)
        : nodeSize
          ? [width, height]
          : null;
    };

    sugiyama.layering = function (x) {
      return arguments.length ? ((layering = x), sugiyama) : layering;
    };

    sugiyama.decross = function (x) {
      return arguments.length ? ((decross = x), sugiyama) : decross;
    };

    sugiyama.coord = function (x) {
      return arguments.length ? ((coord = x), sugiyama) : coord;
    };

    sugiyama.separation = function (x) {
      return arguments.length ? ((separation = x), sugiyama) : separation;
    };

    return sugiyama;
  }

  function defaultSeparation() {
    return 1;
  }

  function mean$2() {
    function twolayerMean(topLayer, bottomLayer) {
      bottomLayer.forEach((node) => {
        node._mean = 0.0;
        node._count = 0;
      });
      topLayer.forEach((n, i) =>
        n.children.forEach((c) => (c._mean += (i - c._mean) / ++c._count))
      );
      bottomLayer.sort((a, b) => a._mean - b._mean);
      bottomLayer.forEach((node) => {
        delete node._mean;
        delete node._count;
      });
    }

    return twolayerMean;
  }

  // Order nodes such that the total number of crossings is minimized

  const crossings$1 = "crossings";

  function opt$1() {
    let debug = false;

    function key(...nodes) {
      return nodes
        .map((n) => n.id)
        .sort()
        .join(debug ? " => " : "\0\0");
    }

    function perms(model, layer) {
      layer.sort((n1, n2) => n1.id > n2.id || -1);

      layer.slice(0, layer.length - 1).forEach((n1, i) =>
        layer.slice(i + 1).forEach((n2) => {
          const pair = key(n1, n2);
          model.ints[pair] = 1;
          model.constraints[pair] = { max: 1 };
          model.variables[pair] = { [pair]: 1 };
        })
      );

      layer.slice(0, layer.length - 1).forEach((n1, i) =>
        layer.slice(i + 1).forEach((n2, j) => {
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
      layer.slice(0, layer.length - 1).forEach((p1, i) =>
        layer.slice(i + 1).forEach((p2) => {
          p1.children.forEach((c1) =>
            p2.children
              .filter((c) => c !== c1)
              .forEach((c2) => {
                const pair = key(c1, c2);
                model.variables[pair][crossings$1] = +(c1.id > c2.id) || -1;
              })
          );
        })
      );
    }

    function twolayerOpt(topLayer, bottomLayer) {
      // Initialize model
      const model = {
        optimize: crossings$1,
        optType: "min",
        constraints: {},
        variables: {},
        ints: {}
      };

      // Add variables and permutation invariants
      perms(model, bottomLayer);

      // Add crossing minimization
      cross(model, topLayer);

      // Solve objective
      const ordering = main.Solve(model);

      // Sort layers
      bottomLayer.sort(
        (n1, n2) => (n1.id > n2.id || -1) * (ordering[key(n1, n2)] || -1)
      );
    }

    twolayerOpt.debug = function (x) {
      return arguments.length ? ((debug = x), twolayerOpt) : debug;
    };

    return twolayerOpt;
  }

  // Assign an index to links greedily
  function greedy$1() {
    function greedy(nodes) {
      const pos = [];
      const neg = [];

      nodes.forEach((node, layer) => {
        node
          .childLinks()
          .sort(({ target: a }, { target: b }) => a.layer - b.layer)
          .forEach(({ target, data }) => {
            if (target.layer === layer + 1) {
              data.index = 0;
            } else {
              const neg_index =
                (neg.findIndex((i) => i <= layer) + 1 || neg.length + 1) - 1;
              const pos_index =
                (pos.findIndex((i) => i <= layer) + 1 || pos.length + 1) - 1;
              if (neg_index < pos_index) {
                // Default right
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

    return greedy;
  }

  // Compute a zherebko layout for a dag assigning each node an x and y

  function index$1() {
    let width = 1;
    let height = 1;
    let indexer = greedy$1();

    function zherebko(dag) {
      // Topological Sort
      const ordered = [];
      dag.eachBefore((node, i) => {
        node.layer = i;
        ordered.push(node);
      });
      const maxLayer = ordered.length - 1;
      if (maxLayer === 0) {
        // center if only one node
        const [node] = ordered;
        node.x = width / 2;
        node.y = height / 2;
      } else {
        // Get indices
        indexer(ordered);

        // Map to coordinates
        let minIndex = 0;
        let maxIndex = 0;
        dag.eachLinks(({ data }) => {
          minIndex = Math.min(minIndex, data.index);
          maxIndex = Math.max(maxIndex, data.index);
        });
        if (minIndex === maxIndex) {
          // === 0
          // Center if graph is a line
          minIndex = -1;
          maxIndex = 1;
        }
        dag.each((node) => {
          node.x = (-minIndex / (maxIndex - minIndex)) * width;
          node.y = (node.layer / maxLayer) * height;
        });
        dag.eachLinks(({ source, target, data }) => {
          const points = [{ x: source.x, y: source.y }];

          const x = ((data.index - minIndex) / (maxIndex - minIndex)) * width;
          const y1 = ((source.layer + 1) / maxLayer) * height;
          const y2 = ((target.layer - 1) / maxLayer) * height;
          if (target.layer - source.layer === 2) {
            points.push({ x: x, y: y1 });
          } else if (target.layer - source.layer > 2) {
            points.push({ x: x, y: y1 }, { x: x, y: y2 });
          }

          points.push({ x: target.x, y: target.y });
          data.points = points;
        });
      }
      return dag;
    }

    zherebko.size = function (x) {
      return arguments.length
        ? (([width, height] = x), zherebko)
        : [width, height];
    };

    return zherebko;
  }

  function index$2() {
    let width = 1;
    let height = 1;
    let layering = layeringLongestPath().topDown(false);
    let decross = twoLayer();
    let columnAssignment = complex();
    let column2Coord = column2CoordRect();
    let interLayerSeparation = defaultLayerSeparation;
    let columnWidth = defaultColumnWidth;
    let columnSeparation = defaultColumnSeparation;

    // Takes a dag where nodes have a layer attribute, and adds dummy nodes so each
    // layer is adjacent and each path ends in the last layer, and returns an array of each layer of nodes.
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
            // child is not in the next layer of node => insert nodes in the intermediate layers
            let last = child;
            for (let l = child.layer - 1; l > node.layer; l--) {
              const dummy = new Node(
                `${node.id}${"\0"}${child.id}${"\0"
                }${l}${""}`,
                undefined
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
          // insert a dummy node per layer
          let highestLayerNode = new Node(
            `${node.id}${"\0"}${"\0"}${maxLayer}${""
            }`,
            undefined
          );
          (layers[maxLayer] || (layers[maxLayer] = [])).push(highestLayerNode);
          let last = highestLayerNode;
          for (let l = maxLayer - 1; l > node.layer; l--) {
            const dummy = new Node(
              `${node.id}${"\0"}${highestLayerNode.id}${"\0"
              }${l}${""}`,
              undefined
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
          node.children = node.children
            .map((child) => {
              const points = [getCenterBottom(node)];
              while (child && !child.data) {
                // dummies have height 0, so it should not matter whether
                // getCenterTop or getCenterBottom is used
                points.push(getCenterTop(child));
                [child] = child.children === [] ? [null] : child.children;
              }
              if (child != null) {
                points.push(getCenterTop(child));
                node._childLinkData[childLinkDataIndex].points = points;
                childLinkDataIndex++;
              }
              return child;
            })
            .filter((child) => child != null);
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
      dag.each((node) =>
        node.children.forEach((child) =>
          (child.parents || (child.parents = [])).push(node)
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

    // includes heightRatio of node
    function getLongestPathValueToRoot(node) {
      let parentPaths = node.parents
        ? node.parents.map(getLongestPathValueToRoot)
        : [];
      return (node.heightRatio || 0) + Math.max(0, ...parentPaths);
    }

    function arquint(dag) {
      let longestPathValue = getLongestPathValue(dag);
      // Compute layers
      layering(dag);
      // Verify layering
      if (
        !dag.every((node) => node.children.every((c) => c.layer > node.layer))
      ) {
        throw new Error("layering wasn't proper");
      }
      // Create layers
      const layers = createLayers(dag);
      // Assign y
      if (layers.length === 1) {
        const [layer] = layers;
        layer.forEach((n) => {
          n.y0 = 0;
          n.y1 = 1;
        });
      } else {
        createParentsRelation(dag);
        let totalLayerSeparation = layers.reduce(
          (prevVal, layer, i) =>
            prevVal + (i == 0 ? 0 : interLayerSeparation(layer, i)),
          0
        );
        let pathLength = longestPathValue + totalLayerSeparation;
        let cummulativeLayerSeparation = 0;
        layers.forEach((layer, i) => {
          cummulativeLayerSeparation +=
            i == 0 ? 0 : interLayerSeparation(layer, i);
          layer.forEach((n) => {
            let pathValueToRoot = getLongestPathValueToRoot(n);
            n.y1 = (cummulativeLayerSeparation + pathValueToRoot) / pathLength;
            n.y0 = n.y1 - n.heightRatio / pathLength;
          });
        });
      }

      // Minimize edge crossings
      decross(layers);
      // assign an index to each node indicating the "column" in which it should be placed
      columnAssignment(layers);
      // Assign coordinates
      column2Coord(layers, columnWidth, columnSeparation);
      // Scale x and y
      layers.forEach((layer) =>
        layer.forEach((n) => {
          n.x0 *= width;
          n.x1 *= width;
          n.y0 *= height;
          n.y1 *= height;
        })
      );
      // Remove dummy nodes and update edge data
      removeDummies(dag);
      return dag;
    }

    arquint.size = function (x) {
      return arguments.length
        ? (([width, height] = x), arquint)
        : [width, height];
    };

    arquint.layering = function (x) {
      return arguments.length ? ((layering = x), arquint) : layering;
    };

    arquint.decross = function (x) {
      return arguments.length ? ((decross = x), arquint) : decross;
    };

    arquint.columnAssignment = function (x) {
      return arguments.length
        ? ((columnAssignment = x), arquint)
        : columnAssignment;
    };

    arquint.column2Coord = function (x) {
      return arguments.length ? ((column2Coord = x), arquint) : column2Coord;
    };

    arquint.interLayerSeparation = function (x) {
      return arguments.length
        ? ((interLayerSeparation = x), arquint)
        : interLayerSeparation;
    };

    arquint.columnWidth = function (x) {
      return arguments.length ? ((columnWidth = x), arquint) : columnWidth;
    };

    arquint.columnSeparation = function (x) {
      return arguments.length
        ? ((columnSeparation = x), arquint)
        : columnSeparation;
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

  exports.coordCenter = center;
  exports.coordGreedy = greedy;
  exports.coordMinCurve = minCurve;
  exports.coordTopological = topological;
  exports.coordVert = vert;
  exports.column2CoordRect = column2CoordRect;
  exports.columnSimpleLeft = simpleLeft;
  exports.columnSimpleCenter = simpleCenter;
  exports.columnAdjacent = adjacent;
  exports.columnComplex = complex;
  exports.dagConnect = connect;
  exports.dagHierarchy = hierarchy;
  exports.dagStratify = dagStratify;
  exports.decrossOpt = opt;
  exports.decrossTwoLayer = twoLayer;
  exports.layeringCoffmanGraham = coffmanGraham;
  exports.layeringLongestPath = layeringLongestPath;
  exports.layeringSimplex = simplex$1;
  exports.layeringTopological = topological$1;
  exports.sugiyama = index;
  exports.twolayerMean = mean$2;
  exports.twolayerMedian = median$1;
  exports.twolayerOpt = opt$1;
  exports.zherebko = index$1;
  exports.arquint = index$2;
  exports.dagNode = Node;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
