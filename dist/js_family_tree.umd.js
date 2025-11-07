(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FT = {}));
})(this, (function (exports) { 'use strict';

    // d3-dag Version 1.1.0. Copyright 2023 Erik Brinkman.
    var Ro=Object.create;var _t=Object.defineProperty,zo=Object.defineProperties,Bo=Object.getOwnPropertyDescriptor,Vo=Object.getOwnPropertyDescriptors,$o=Object.getOwnPropertyNames,st=Object.getOwnPropertySymbols,Po=Object.getPrototypeOf,Wt=Object.prototype.hasOwnProperty,Wn=Object.prototype.propertyIsEnumerable;var Pt=(e,t)=>{if(t=Symbol[e])return t;throw Error("Symbol."+e+" is not defined")};var _n=(e,t,n)=>t in e?_t(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n,T=(e,t)=>{for(var n in t||(t={}))Wt.call(t,n)&&_n(e,n,t[n]);if(st)for(var n of st(t))Wn.call(t,n)&&_n(e,n,t[n]);return e},R=(e,t)=>zo(e,Vo(t));var V=(e,t)=>{var n={};for(var r in e)Wt.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&st)for(var r of st(e))t.indexOf(r)<0&&Wn.call(e,r)&&(n[r]=e[r]);return n};var H=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var _o=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of $o(t))!Wt.call(e,i)&&i!==n&&_t(e,i,{get:()=>t[i],enumerable:!(r=Bo(t,i))||r.enumerable});return e};var An=(e,t,n)=>(n=e!=null?Ro(Po(e)):{},_o(!e||!e.__esModule?_t(n,"default",{value:e,enumerable:true}):n,e));var At=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var C=(e,t,n)=>(At(e,t,"read from private field"),n?n.call(e):t.get(e)),F=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n);},P=(e,t,n,r)=>(At(e,t,"write to private field"),t.set(e,n),n);var ae=(e,t,n)=>(At(e,t,"access private method"),n);var Wo=function(e,t){this[0]=e,this[1]=t;};var Y=e=>{var t=e[Pt("asyncIterator")],n=false,r,i={};return t==null?(t=e[Pt("iterator")](),r=o=>i[o]=a=>t[o](a)):(t=t.call(e),r=o=>i[o]=a=>{if(n){if(n=false,o==="throw")throw a;return a}return n=true,{done:false,value:new Wo(new Promise(s=>{var u=t[o](a);if(!(u instanceof Object))throw TypeError("Object expected");s(u);}),1)}}),i[Pt("iterator")]=()=>i,r("next"),"throw"in t?r("throw"):i.throw=o=>{throw o},"return"in t&&r("return"),i};var sn=H((ru,sr)=>{function ar(e,t,n,r){this.feasible=n,this.evaluation=t,this.bounded=r,this._tableau=e;}sr.exports=ar;ar.prototype.generateSolutionSet=function(){for(var e={},t=this._tableau,n=t.varIndexByRow,r=t.variablesPerIndex,i=t.matrix,o=t.rhsColumn,a=t.height-1,s=Math.round(1/t.precision),u=1;u<=a;u+=1){var d=n[u],l=r[d];if(!(l===void 0||l.isSlack===true)){var f=i[u][o];e[l.id]=Math.round((Number.EPSILON+f)*s)/s;}}return e};});var lr=H((ou,dr)=>{var ur=sn();function xt(e,t,n,r,i){ur.call(this,e,t,n,r),this.iter=i;}dr.exports=xt;xt.prototype=Object.create(ur.prototype);xt.constructor=xt;});var pe=H((iu,fr)=>{var fi=sn(),ci=lr();function ge(e){this.model=null,this.matrix=null,this.width=0,this.height=0,this.costRowIndex=0,this.rhsColumn=0,this.variablesPerIndex=[],this.unrestrictedVars=null,this.feasible=true,this.evaluation=0,this.simplexIters=0,this.varIndexByRow=null,this.varIndexByCol=null,this.rowByVarIndex=null,this.colByVarIndex=null,this.precision=e||1e-8,this.optionalObjectives=[],this.objectivesByPriority={},this.savedState=null,this.availableIndexes=[],this.lastElementIndex=0,this.variables=null,this.nVars=0,this.bounded=true,this.unboundedVarIndex=null,this.branchAndCutIterations=0;}fr.exports=ge;ge.prototype.solve=function(){return this.model.getNumberOfIntegerVariables()>0?this.branchAndCut():this.simplex(),this.updateVariableValues(),this.getSolution()};function un(e,t){this.priority=e,this.reducedCosts=new Array(t);for(var n=0;n<t;n+=1)this.reducedCosts[n]=0;}un.prototype.copy=function(){var e=new un(this.priority,this.reducedCosts.length);return e.reducedCosts=this.reducedCosts.slice(),e};ge.prototype.setOptionalObjective=function(e,t,n){var r=this.objectivesByPriority[e];if(r===void 0){var i=Math.max(this.width,t+1);r=new un(e,i),this.objectivesByPriority[e]=r,this.optionalObjectives.push(r),this.optionalObjectives.sort(function(o,a){return o.priority-a.priority});}r.reducedCosts[t]=n;};ge.prototype.initialize=function(e,t,n,r){this.variables=n,this.unrestrictedVars=r,this.width=e,this.height=t;for(var i=new Array(e),o=0;o<e;o++)i[o]=0;this.matrix=new Array(t);for(var a=0;a<t;a++)this.matrix[a]=i.slice();this.varIndexByRow=new Array(this.height),this.varIndexByCol=new Array(this.width),this.varIndexByRow[0]=-1,this.varIndexByCol[0]=-1,this.nVars=e+t-2,this.rowByVarIndex=new Array(this.nVars),this.colByVarIndex=new Array(this.nVars),this.lastElementIndex=this.nVars;};ge.prototype._resetMatrix=function(){var e=this.model.variables,t=this.model.constraints,n=e.length,r=t.length,i,o,a=this.matrix[0],s=this.model.isMinimization===true?-1:1;for(i=0;i<n;i+=1){var u=e[i],d=u.priority,l=s*u.cost;d===0?a[i+1]=l:this.setOptionalObjective(d,i+1,l),o=e[i].index,this.rowByVarIndex[o]=-1,this.colByVarIndex[o]=i+1,this.varIndexByCol[i+1]=o;}for(var f=1,p=0;p<r;p+=1){var m=t[p],g=m.index;this.rowByVarIndex[g]=f,this.colByVarIndex[g]=-1,this.varIndexByRow[f]=g;var c,b,y,h=m.terms,N=h.length,v=this.matrix[f++];if(m.isUpperBound){for(c=0;c<N;c+=1)b=h[c],y=this.colByVarIndex[b.variable.index],v[y]=b.coefficient;v[0]=m.rhs;}else {for(c=0;c<N;c+=1)b=h[c],y=this.colByVarIndex[b.variable.index],v[y]=-b.coefficient;v[0]=-m.rhs;}}};ge.prototype.setModel=function(e){this.model=e;var t=e.nVariables+1,n=e.nConstraints+1;return this.initialize(t,n,e.variables,e.unrestrictedVariables),this._resetMatrix(),this};ge.prototype.getNewElementIndex=function(){if(this.availableIndexes.length>0)return this.availableIndexes.pop();var e=this.lastElementIndex;return this.lastElementIndex+=1,e};ge.prototype.density=function(){for(var e=0,t=this.matrix,n=0;n<this.height;n++)for(var r=t[n],i=0;i<this.width;i++)r[i]!==0&&(e+=1);return e/(this.height*this.width)};ge.prototype.setEvaluation=function(){var e=Math.round(1/this.precision),t=this.matrix[this.costRowIndex][this.rhsColumn],n=Math.round((Number.EPSILON+t)*e)/e;this.evaluation=n,this.simplexIters===0&&(this.bestPossibleEval=n);};ge.prototype.getSolution=function(){var e=this.model.isMinimization===true?this.evaluation:-this.evaluation;return this.model.getNumberOfIntegerVariables()>0?new ci(this,e,this.feasible,this.bounded,this.branchAndCutIterations):new fi(this,e,this.feasible,this.bounded)};});var cr=H(()=>{var nt=pe();nt.prototype.simplex=function(){return this.bounded=true,this.phase1(),this.feasible===true&&this.phase2(),this};nt.prototype.phase1=function(){for(var e=this.model.checkForCycles,t=[],n=this.matrix,r=this.rhsColumn,i=this.width-1,o=this.height-1,a,s=0;;){for(var u=0,d=-this.precision,l=1;l<=o;l++){a=this.unrestrictedVars[this.varIndexByRow[l]]===true;var f=n[l][r];f<d&&(d=f,u=l);}if(u===0)return this.feasible=true,s;for(var p=0,m=-1/0,g=n[0],c=n[u],b=1;b<=i;b++){var y=c[b];if(a=this.unrestrictedVars[this.varIndexByCol[b]]===true,a||y<-this.precision){var h=-g[b]/y;m<h&&(m=h,p=b);}}if(p===0)return this.feasible=false,s;if(e){t.push([this.varIndexByRow[u],this.varIndexByCol[p]]);var N=this.checkForCycles(t);if(N.length>0)return this.model.messages.push("Cycle in phase 1"),this.model.messages.push("Start :"+N[0]),this.model.messages.push("Length :"+N[1]),this.feasible=false,s}this.pivot(u,p),s+=1;}};nt.prototype.phase2=function(){for(var e=this.model.checkForCycles,t=[],n=this.matrix,r=this.rhsColumn,i=this.width-1,o=this.height-1,a=this.precision,s=this.optionalObjectives.length,u=null,d=0,l,f;;){var p=n[this.costRowIndex];s>0&&(u=[]);for(var m=0,g=a,c=false,b=1;b<=i;b++){if(l=p[b],f=this.unrestrictedVars[this.varIndexByCol[b]]===true,s>0&&-a<l&&l<a){u.push(b);continue}if(f&&l<0){-l>g&&(g=-l,m=b,c=true);continue}l>g&&(g=l,m=b,c=false);}if(s>0)for(var y=0;m===0&&u.length>0&&y<s;){var h=[],N=this.optionalObjectives[y].reducedCosts;g=a;for(var v=0;v<u.length;v++){if(b=u[v],l=N[b],f=this.unrestrictedVars[this.varIndexByCol[b]]===true,-a<l&&l<a){h.push(b);continue}if(f&&l<0){-l>g&&(g=-l,m=b,c=true);continue}l>g&&(g=l,m=b,c=false);}u=h,y+=1;}if(m===0)return this.setEvaluation(),this.simplexIters+=1,d;for(var L=0,k=1/0,w=this.varIndexByRow,S=1;S<=o;S++){var O=n[S],I=O[r],z=O[m];if(!(-a<z&&z<a)){if(z>0&&a>I&&I>-a){k=0,L=S;break}var M=c?-I/z:I/z;M>a&&k>M&&(k=M,L=S);}}if(k===1/0)return this.evaluation=-1/0,this.bounded=false,this.unboundedVarIndex=this.varIndexByCol[m],d;if(e){t.push([this.varIndexByRow[L],this.varIndexByCol[m]]);var $=this.checkForCycles(t);if($.length>0)return this.model.messages.push("Cycle in phase 2"),this.model.messages.push("Start :"+$[0]),this.model.messages.push("Length :"+$[1]),this.feasible=false,d}this.pivot(L,m,true),d+=1;}};var dn=[];nt.prototype.pivot=function(e,t){var n=this.matrix,r=n[e][t],i=this.height-1,o=this.width-1,a=this.varIndexByRow[e],s=this.varIndexByCol[t];this.varIndexByRow[e]=s,this.varIndexByCol[t]=a,this.rowByVarIndex[s]=e,this.rowByVarIndex[a]=-1,this.colByVarIndex[s]=-1,this.colByVarIndex[a]=t;for(var u=n[e],d=0,l=0;l<=o;l++)u[l]>=-1e-16&&u[l]<=1e-16?u[l]=0:(u[l]/=r,dn[d]=l,d+=1);u[t]=1/r;for(var f,p,m,g=this.precision,c=0;c<=i;c++)if(c!==e&&!(n[c][t]>=-1e-16&&n[c][t]<=1e-16)){var b=n[c];if(f=b[t],f>=-1e-16&&f<=1e-16)f!==0&&(b[t]=0);else {for(p=0;p<d;p++)l=dn[p],m=u[l],m>=-1e-16&&m<=1e-16?m!==0&&(u[l]=0):b[l]=b[l]-f*m;b[t]=-f/r;}}var y=this.optionalObjectives.length;if(y>0)for(var h=0;h<y;h+=1){var N=this.optionalObjectives[h].reducedCosts;if(f=N[t],f!==0){for(p=0;p<d;p++)l=dn[p],m=u[l],m!==0&&(N[l]=N[l]-f*m);N[t]=-f/r;}}};nt.prototype.checkForCycles=function(e){for(var t=0;t<e.length-1;t++)for(var n=t+1;n<e.length;n++){var r=e[t],i=e[n];if(r[0]===i[0]&&r[1]===i[1]){if(n-t>e.length-n)break;for(var o=true,a=1;a<n-t;a++){var s=e[t+a],u=e[n+a];if(s[0]!==u[0]||s[1]!==u[1]){o=false;break}}if(o)return [t,n-t]}}return []};});var kt=H((uu,gr)=>{function ln(e,t,n,r){this.id=e,this.cost=t,this.index=n,this.value=0,this.priority=r;}function pr(e,t,n,r){ln.call(this,e,t,n,r);}pr.prototype.isInteger=true;function fn(e,t){ln.call(this,e,0,t,0);}fn.prototype.isSlack=true;function hr(e,t){this.variable=e,this.coefficient=t;}function mr(e,t,n){return n===0||n==="required"?null:(t=t||1,n=n||1,e.isMinimization===false&&(t=-t),e.addVariable(t,"r"+e.relaxationIndex++,false,false,n))}function Te(e,t,n,r){this.slack=new fn("s"+n,n),this.index=n,this.model=r,this.rhs=e,this.isUpperBound=t,this.terms=[],this.termsByVarIndex={},this.relaxation=null;}Te.prototype.addTerm=function(e,t){var n=t.index,r=this.termsByVarIndex[n];if(r===void 0)r=new hr(t,e),this.termsByVarIndex[n]=r,this.terms.push(r),this.isUpperBound===true&&(e=-e),this.model.updateConstraintCoefficient(this,t,e);else {var i=r.coefficient+e;this.setVariableCoefficient(i,t);}return this};Te.prototype.removeTerm=function(e){return this};Te.prototype.setRightHandSide=function(e){if(e!==this.rhs){var t=e-this.rhs;this.isUpperBound===true&&(t=-t),this.rhs=e,this.model.updateRightHandSide(this,t);}return this};Te.prototype.setVariableCoefficient=function(e,t){var n=t.index;if(n===-1){console.warn("[Constraint.setVariableCoefficient] Trying to change coefficient of inexistant variable.");return}var r=this.termsByVarIndex[n];if(r===void 0)this.addTerm(e,t);else if(e!==r.coefficient){var i=e-r.coefficient;this.isUpperBound===true&&(i=-i),r.coefficient=e,this.model.updateConstraintCoefficient(this,t,i);}return this};Te.prototype.relax=function(e,t){this.relaxation=mr(this.model,e,t),this._relax(this.relaxation);};Te.prototype._relax=function(e){e!==null&&(this.isUpperBound?this.setVariableCoefficient(-1,e):this.setVariableCoefficient(1,e));};function Ue(e,t){this.upperBound=e,this.lowerBound=t,this.model=e.model,this.rhs=e.rhs,this.relaxation=null;}Ue.prototype.isEquality=true;Ue.prototype.addTerm=function(e,t){return this.upperBound.addTerm(e,t),this.lowerBound.addTerm(e,t),this};Ue.prototype.removeTerm=function(e){return this.upperBound.removeTerm(e),this.lowerBound.removeTerm(e),this};Ue.prototype.setRightHandSide=function(e){this.upperBound.setRightHandSide(e),this.lowerBound.setRightHandSide(e),this.rhs=e;};Ue.prototype.relax=function(e,t){this.relaxation=mr(this.model,e,t),this.upperBound.relaxation=this.relaxation,this.upperBound._relax(this.relaxation),this.lowerBound.relaxation=this.relaxation,this.lowerBound._relax(this.relaxation);};gr.exports={Constraint:Te,Variable:ln,IntegerVariable:pr,SlackVariable:fn,Equality:Ue,Term:hr};});var yr=H(()=>{var vt=pe(),cn=kt().SlackVariable;vt.prototype.addCutConstraints=function(e){for(var t=e.length,n=this.height,r=n+t,i=n;i<r;i+=1)this.matrix[i]===void 0&&(this.matrix[i]=this.matrix[i-1].slice());this.height=r,this.nVars=this.width+this.height-2;for(var o,a=this.width-1,s=0;s<t;s+=1){var u=e[s],d=n+s,l=u.type==="min"?-1:1,f=u.varIndex,p=this.rowByVarIndex[f],m=this.matrix[d];if(p===-1){for(m[this.rhsColumn]=l*u.value,o=1;o<=a;o+=1)m[o]=0;m[this.colByVarIndex[f]]=l;}else {var g=this.matrix[p],c=g[this.rhsColumn];for(m[this.rhsColumn]=l*(u.value-c),o=1;o<=a;o+=1)m[o]=-l*g[o];}var b=this.getNewElementIndex();this.varIndexByRow[d]=b,this.rowByVarIndex[b]=d,this.colByVarIndex[b]=-1,this.variablesPerIndex[b]=new cn("s"+b,b),this.nVars+=1;}};vt.prototype._addLowerBoundMIRCut=function(e){if(e===this.costRowIndex)return  false;this.model;var n=this.matrix,r=this.variablesPerIndex[this.varIndexByRow[e]];if(!r.isInteger)return  false;var i=n[e][this.rhsColumn],o=i-Math.floor(i);if(o<this.precision||1-this.precision<o)return  false;var a=this.height;n[a]=n[a-1].slice(),this.height+=1,this.nVars+=1;var s=this.getNewElementIndex();this.varIndexByRow[a]=s,this.rowByVarIndex[s]=a,this.colByVarIndex[s]=-1,this.variablesPerIndex[s]=new cn("s"+s,s),n[a][this.rhsColumn]=Math.floor(i);for(var u=1;u<this.varIndexByCol.length;u+=1){var d=this.variablesPerIndex[this.varIndexByCol[u]];if(!d.isInteger)n[a][u]=Math.min(0,n[e][u]/(1-o));else {var l=n[e][u],f=Math.floor(l)+Math.max(0,l-Math.floor(l)-o)/(1-o);n[a][u]=f;}}for(var p=0;p<this.width;p+=1)n[a][p]-=n[e][p];return  true};vt.prototype._addUpperBoundMIRCut=function(e){if(e===this.costRowIndex)return  false;this.model;var n=this.matrix,r=this.variablesPerIndex[this.varIndexByRow[e]];if(!r.isInteger)return  false;var i=n[e][this.rhsColumn],o=i-Math.floor(i);if(o<this.precision||1-this.precision<o)return  false;var a=this.height;n[a]=n[a-1].slice(),this.height+=1,this.nVars+=1;var s=this.getNewElementIndex();this.varIndexByRow[a]=s,this.rowByVarIndex[s]=a,this.colByVarIndex[s]=-1,this.variablesPerIndex[s]=new cn("s"+s,s),n[a][this.rhsColumn]=-o;for(var u=1;u<this.varIndexByCol.length;u+=1){var d=this.variablesPerIndex[this.varIndexByCol[u]],l=n[e][u],f=l-Math.floor(l);d.isInteger?f<=o?n[a][u]=-f:n[a][u]=-(1-f)*o/f:l>=0?n[a][u]=-l:n[a][u]=l*o/(1-o);}return  true};vt.prototype.applyMIRCuts=function(){};});var Nr=H(()=>{var ye=pe();ye.prototype._putInBase=function(e){var t=this.rowByVarIndex[e];if(t===-1){for(var n=this.colByVarIndex[e],r=1;r<this.height;r+=1){var i=this.matrix[r][n];if(i<-this.precision||this.precision<i){t=r;break}}this.pivot(t,n);}return t};ye.prototype._takeOutOfBase=function(e){var t=this.colByVarIndex[e];if(t===-1){for(var n=this.rowByVarIndex[e],r=this.matrix[n],i=1;i<this.height;i+=1){var o=r[i];if(o<-this.precision||this.precision<o){t=i;break}}this.pivot(n,t);}return t};ye.prototype.updateVariableValues=function(){for(var e=this.variables.length,t=Math.round(1/this.precision),n=0;n<e;n+=1){var r=this.variables[n],i=r.index,o=this.rowByVarIndex[i];if(o===-1)r.value=0;else {var a=this.matrix[o][this.rhsColumn];r.value=Math.round((a+Number.EPSILON)*t)/t;}}};ye.prototype.updateRightHandSide=function(e,t){var n=this.height-1,r=this.rowByVarIndex[e.index];if(r===-1){for(var i=this.colByVarIndex[e.index],o=0;o<=n;o+=1){var a=this.matrix[o];a[this.rhsColumn]-=t*a[i];}var s=this.optionalObjectives.length;if(s>0)for(var u=0;u<s;u+=1){var d=this.optionalObjectives[u].reducedCosts;d[this.rhsColumn]-=t*d[i];}}else this.matrix[r][this.rhsColumn]-=t;};ye.prototype.updateConstraintCoefficient=function(e,t,n){if(e.index===t.index)throw new Error("[Tableau.updateConstraintCoefficient] constraint index should not be equal to variable index !");var r=this._putInBase(e.index),i=this.colByVarIndex[t.index];if(i===-1)for(var o=this.rowByVarIndex[t.index],a=0;a<this.width;a+=1)this.matrix[r][a]+=n*this.matrix[o][a];else this.matrix[r][i]-=n;};ye.prototype.updateCost=function(e,t){var n=e.index,r=this.width-1,i=this.colByVarIndex[n];if(i===-1){var o=this.matrix[this.rowByVarIndex[n]],a;if(e.priority===0){var s=this.matrix[0];for(a=0;a<=r;a+=1)s[a]+=t*o[a];}else {var u=this.objectivesByPriority[e.priority].reducedCosts;for(a=0;a<=r;a+=1)u[a]+=t*o[a];}}else this.matrix[0][i]-=t;};ye.prototype.addConstraint=function(e){var t=e.isUpperBound?1:-1,n=this.height,r=this.matrix[n];r===void 0&&(r=this.matrix[0].slice(),this.matrix[n]=r);for(var i=this.width-1,o=0;o<=i;o+=1)r[o]=0;r[this.rhsColumn]=t*e.rhs;for(var a=e.terms,s=a.length,u=0;u<s;u+=1){var d=a[u],l=d.coefficient,f=d.variable.index,p=this.rowByVarIndex[f];if(p===-1)r[this.colByVarIndex[f]]+=t*l;else {var m=this.matrix[p];m[this.rhsColumn];for(o=0;o<=i;o+=1)r[o]-=t*l*m[o];}}var c=e.index;this.varIndexByRow[n]=c,this.rowByVarIndex[c]=n,this.colByVarIndex[c]=-1,this.height+=1;};ye.prototype.removeConstraint=function(e){var t=e.index,n=this.height-1,r=this._putInBase(t),i=this.matrix[n];this.matrix[n]=this.matrix[r],this.matrix[r]=i,this.varIndexByRow[r]=this.varIndexByRow[n],this.varIndexByRow[n]=-1,this.rowByVarIndex[t]=-1,this.availableIndexes[this.availableIndexes.length]=t,e.slack.index=-1,this.height-=1;};ye.prototype.addVariable=function(e){var t=this.height-1,n=this.width,r=this.model.isMinimization===true?-e.cost:e.cost,i=e.priority,o=this.optionalObjectives.length;if(o>0)for(var a=0;a<o;a+=1)this.optionalObjectives[a].reducedCosts[n]=0;i===0?this.matrix[0][n]=r:(this.setOptionalObjective(i,n,r),this.matrix[0][n]=0);for(var s=1;s<=t;s+=1)this.matrix[s][n]=0;var u=e.index;this.varIndexByCol[n]=u,this.rowByVarIndex[u]=-1,this.colByVarIndex[u]=n,this.width+=1;};ye.prototype.removeVariable=function(e){var t=e.index,n=this._takeOutOfBase(t),r=this.width-1;if(n!==r){for(var i=this.height-1,o=0;o<=i;o+=1){var a=this.matrix[o];a[n]=a[r];}var s=this.optionalObjectives.length;if(s>0)for(var u=0;u<s;u+=1){var d=this.optionalObjectives[u].reducedCosts;d[n]=d[r];}var l=this.varIndexByCol[r];this.varIndexByCol[n]=l,this.colByVarIndex[l]=n;}this.varIndexByCol[r]=-1,this.colByVarIndex[t]=-1,this.availableIndexes[this.availableIndexes.length]=t,e.index=-1,this.width-=1;};});var br=H(()=>{var pi=pe();pi.prototype.log=function(e,t){console.log("****",e,"****"),console.log("Nb Variables",this.width-1),console.log("Nb Constraints",this.height-1),console.log("Basic Indexes",this.varIndexByRow),console.log("Non Basic Indexes",this.varIndexByCol),console.log("Rows",this.rowByVarIndex),console.log("Cols",this.colByVarIndex);var n=5,r="",i=[" "],o,a,u,d,l,f,p,g,c,b,y;for(a=1;a<this.width;a+=1)l=this.varIndexByCol[a],d=this.variablesPerIndex[l],d===void 0?f="c"+l:f=d.id,p=f.length,g=" ",c="	",p>5?g+=" ":c+="	",i[a]=g,r+=c+f;console.log(r);var h,N=this.matrix[this.costRowIndex],v="	";for(o=1;o<this.width;o+=1)h="	",v+=h,v+=i[o],v+=N[o].toFixed(n);for(h="	",v+=h+i[0]+N[0].toFixed(n),console.log(v+"	Z"),u=1;u<this.height;u+=1){for(b=this.matrix[u],y="	",a=1;a<this.width;a+=1)h="	",y+=h+i[a]+b[a].toFixed(n);h="	",y+=h+i[0]+b[0].toFixed(n),l=this.varIndexByRow[u],d=this.variablesPerIndex[l],d===void 0?f="c"+l:f=d.id,console.log(y+"	"+f);}console.log("");var L=this.optionalObjectives.length;if(L>0){console.log("    Optional objectives:");for(var k=0;k<L;k+=1){var w=this.optionalObjectives[k].reducedCosts,S="";for(o=1;o<this.width;o+=1)h=w[o]<0?"":" ",S+=h,S+=i[o],S+=w[o].toFixed(n);h=w[0]<0?"":" ",S+=h+i[0]+w[0].toFixed(n),console.log(S+" z"+k);}}return console.log("Feasible?",this.feasible),console.log("evaluation",this.evaluation),this};});var xr=H(()=>{var Lt=pe();Lt.prototype.copy=function(){var e=new Lt(this.precision);e.width=this.width,e.height=this.height,e.nVars=this.nVars,e.model=this.model,e.variables=this.variables,e.variablesPerIndex=this.variablesPerIndex,e.unrestrictedVars=this.unrestrictedVars,e.lastElementIndex=this.lastElementIndex,e.varIndexByRow=this.varIndexByRow.slice(),e.varIndexByCol=this.varIndexByCol.slice(),e.rowByVarIndex=this.rowByVarIndex.slice(),e.colByVarIndex=this.colByVarIndex.slice(),e.availableIndexes=this.availableIndexes.slice();for(var t=[],n=0;n<this.optionalObjectives.length;n++)t[n]=this.optionalObjectives[n].copy();e.optionalObjectives=t;for(var r=this.matrix,i=new Array(this.height),o=0;o<this.height;o++)i[o]=r[o].slice();return e.matrix=i,e};Lt.prototype.save=function(){this.savedState=this.copy();};Lt.prototype.restore=function(){if(this.savedState!==null){var e=this.savedState,t=e.matrix;this.nVars=e.nVars,this.model=e.model,this.variables=e.variables,this.variablesPerIndex=e.variablesPerIndex,this.unrestrictedVars=e.unrestrictedVars,this.lastElementIndex=e.lastElementIndex,this.width=e.width,this.height=e.height;var n,r;for(n=0;n<this.height;n+=1){var i=t[n],o=this.matrix[n];for(r=0;r<this.width;r+=1)o[r]=i[r];}var a=e.varIndexByRow;for(r=0;r<this.height;r+=1)this.varIndexByRow[r]=a[r];for(;this.varIndexByRow.length>this.height;)this.varIndexByRow.pop();var s=e.varIndexByCol;for(n=0;n<this.width;n+=1)this.varIndexByCol[n]=s[n];for(;this.varIndexByCol.length>this.width;)this.varIndexByCol.pop();for(var u=e.rowByVarIndex,d=e.colByVarIndex,l=0;l<this.nVars;l+=1)this.rowByVarIndex[l]=u[l],this.colByVarIndex[l]=d[l];if(e.optionalObjectives.length>0&&this.optionalObjectives.length>0){this.optionalObjectives=[],this.optionalObjectivePerPriority={};for(var f=0;f<e.optionalObjectives.length;f++){var p=e.optionalObjectives[f].copy();this.optionalObjectives[f]=p,this.optionalObjectivePerPriority[p.priority]=p;}}}};});var Lr=H(()=>{var kr=pe();function vr(e,t){this.index=e,this.value=t;}kr.prototype.getMostFractionalVar=function(){for(var e=0,t=null,n=null,r=.5,i=this.model.integerVariables,o=i.length,a=0;a<o;a++){var s=i[a].index,u=this.rowByVarIndex[s];if(u!==-1){var d=this.matrix[u][this.rhsColumn],l=Math.abs(d-Math.round(d));e<l&&(e=l,t=s,n=d);}}return new vr(t,n)};kr.prototype.getFractionalVarWithLowestCost=function(){for(var e=1/0,t=null,n=null,r=this.model.integerVariables,i=r.length,o=0;o<i;o++){var a=r[o],s=a.index,u=this.rowByVarIndex[s];if(u!==-1){var d=this.matrix[u][this.rhsColumn];if(Math.abs(d-Math.round(d))>this.precision){var l=a.cost;e>l&&(e=l,t=s,n=d);}}}return new vr(t,n)};});var wr=H(()=>{var pn=pe();pn.prototype.countIntegerValues=function(){for(var e=0,t=1;t<this.height;t+=1)if(this.variablesPerIndex[this.varIndexByRow[t]].isInteger){var n=this.matrix[t][this.rhsColumn];n=n-Math.floor(n),n<this.precision&&-n<this.precision&&(e+=1);}return e};pn.prototype.isIntegral=function(){for(var e=this.model.integerVariables,t=e.length,n=0;n<t;n++){var r=this.rowByVarIndex[e[n].index];if(r!==-1){var i=this.matrix[r][this.rhsColumn];if(Math.abs(i-Math.round(i))>this.precision)return  false}}return  true};pn.prototype.computeFractionalVolume=function(e){for(var t=-1,n=1;n<this.height;n+=1)if(this.variablesPerIndex[this.varIndexByRow[n]].isInteger){var r=this.matrix[n][this.rhsColumn];r=Math.abs(r);var i=Math.min(r-Math.floor(r),Math.floor(r+1));if(i<this.precision){if(!e)return 0}else t===-1?t=r:t*=r;}return t===-1?0:t};});var Sr=H((ku,Dr)=>{cr();yr();Nr();br();xr();Lr();wr();Dr.exports=pe();});var mn=H(()=>{var Ir=pe();function Or(e,t,n){this.type=e,this.varIndex=t,this.value=n;}function hn(e,t){this.relaxedEvaluation=e,this.cuts=t;}function hi(e,t){return t.relaxedEvaluation-e.relaxedEvaluation}Ir.prototype.applyCuts=function(e){if(this.restore(),this.addCutConstraints(e),this.simplex(),this.model.useMIRCuts)for(var t=true;t;){var n=this.computeFractionalVolume(true);this.applyMIRCuts(),this.simplex();var r=this.computeFractionalVolume(true);r>=.9*n&&(t=false);}};Ir.prototype.branchAndCut=function(){var e=[],t=0,n=this.model.tolerance,r=true,i=1e99;this.model.timeout&&(i=Date.now()+this.model.timeout);for(var o=1/0,a=null,s=[],u=0;u<this.optionalObjectives.length;u+=1)s.push(1/0);var d=new hn(-1/0,[]),l;for(e.push(d);e.length>0&&r===true&&Date.now()<i;)if(this.model.isMinimization?l=this.bestPossibleEval*(1+n):l=this.bestPossibleEval*(1-n),n>0&&o<l&&(r=false),d=e.pop(),!(d.relaxedEvaluation>o)){var f=d.cuts;if(this.applyCuts(f),t++,this.feasible!==false){var p=this.evaluation;if(!(p>o)){if(p===o){for(var m=true,g=0;g<this.optionalObjectives.length&&!(this.optionalObjectives[g].reducedCosts[0]>s[g]);g+=1)if(this.optionalObjectives[g].reducedCosts[0]<s[g]){m=false;break}if(m)continue}if(this.isIntegral()===true){if(this.__isIntegral=true,t===1){this.branchAndCutIterations=t;return}a=d,o=p;for(var c=0;c<this.optionalObjectives.length;c+=1)s[c]=this.optionalObjectives[c].reducedCosts[0];}else {t===1&&this.save();for(var b=this.getMostFractionalVar(),y=b.index,h=[],N=[],v=f.length,L=0;L<v;L+=1){var k=f[L];k.varIndex===y?k.type==="min"?N.push(k):h.push(k):(h.push(k),N.push(k));}var w=Math.ceil(b.value),S=Math.floor(b.value),O=new Or("min",y,w);h.push(O);var I=new Or("max",y,S);N.push(I),e.push(new hn(p,h)),e.push(new hn(p,N)),e.sort(hi);}}}}a!==null&&this.applyCuts(a.cuts),this.branchAndCutIterations=t;};});var Gr=H((Su,Tr)=>{var mi=pe();mn();var rt=kt(),wt=rt.Constraint,Cr=rt.Equality,gi=rt.Variable,yi=rt.IntegerVariable;rt.Term;function J(e,t){this.tableau=new mi(e),this.name=t,this.variables=[],this.integerVariables=[],this.unrestrictedVariables={},this.constraints=[],this.nConstraints=0,this.nVariables=0,this.isMinimization=true,this.tableauInitialized=false,this.relaxationIndex=1,this.useMIRCuts=false,this.checkForCycles=true,this.messages=[];}Tr.exports=J;J.prototype.minimize=function(){return this.isMinimization=true,this};J.prototype.maximize=function(){return this.isMinimization=false,this};J.prototype._getNewElementIndex=function(){if(this.availableIndexes.length>0)return this.availableIndexes.pop();var e=this.lastElementIndex;return this.lastElementIndex+=1,e};J.prototype._addConstraint=function(e){var t=e.slack;this.tableau.variablesPerIndex[t.index]=t,this.constraints.push(e),this.nConstraints+=1,this.tableauInitialized===true&&this.tableau.addConstraint(e);};J.prototype.smallerThan=function(e){var t=new wt(e,true,this.tableau.getNewElementIndex(),this);return this._addConstraint(t),t};J.prototype.greaterThan=function(e){var t=new wt(e,false,this.tableau.getNewElementIndex(),this);return this._addConstraint(t),t};J.prototype.equal=function(e){var t=new wt(e,true,this.tableau.getNewElementIndex(),this);this._addConstraint(t);var n=new wt(e,false,this.tableau.getNewElementIndex(),this);return this._addConstraint(n),new Cr(t,n)};J.prototype.addVariable=function(e,t,n,r,i){if(typeof i=="string")switch(i){case "required":i=0;break;case "strong":i=1;break;case "medium":i=2;break;case "weak":i=3;break;default:i=0;break}var o=this.tableau.getNewElementIndex();t==null&&(t="v"+o),e==null&&(e=0),i==null&&(i=0);var a;return n?(a=new yi(t,e,o,i),this.integerVariables.push(a)):a=new gi(t,e,o,i),this.variables.push(a),this.tableau.variablesPerIndex[o]=a,r&&(this.unrestrictedVariables[o]=true),this.nVariables+=1,this.tableauInitialized===true&&this.tableau.addVariable(a),a};J.prototype._removeConstraint=function(e){var t=this.constraints.indexOf(e);if(t===-1){console.warn("[Model.removeConstraint] Constraint not present in model");return}this.constraints.splice(t,1),this.nConstraints-=1,this.tableauInitialized===true&&this.tableau.removeConstraint(e),e.relaxation&&this.removeVariable(e.relaxation);};J.prototype.removeConstraint=function(e){return e.isEquality?(this._removeConstraint(e.upperBound),this._removeConstraint(e.lowerBound)):this._removeConstraint(e),this};J.prototype.removeVariable=function(e){var t=this.variables.indexOf(e);if(t===-1){console.warn("[Model.removeVariable] Variable not present in model");return}return this.variables.splice(t,1),this.tableauInitialized===true&&this.tableau.removeVariable(e),this};J.prototype.updateRightHandSide=function(e,t){return this.tableauInitialized===true&&this.tableau.updateRightHandSide(e,t),this};J.prototype.updateConstraintCoefficient=function(e,t,n){return this.tableauInitialized===true&&this.tableau.updateConstraintCoefficient(e,t,n),this};J.prototype.setCost=function(e,t){var n=e-t.cost;return this.isMinimization===false&&(n=-n),t.cost=e,this.tableau.updateCost(t,n),this};J.prototype.loadJson=function(e){this.isMinimization=e.opType!=="max";for(var t=e.variables,n=e.constraints,r={},i={},o=Object.keys(n),a=o.length,s=0;s<a;s+=1){var u=o[s],d=n[u],l=d.equal,f=d.weight,p=d.priority,m=f!==void 0||p!==void 0,g,c;if(l===void 0){var b=d.min;b!==void 0&&(g=this.greaterThan(b),r[u]=g,m&&g.relax(f,p));var y=d.max;y!==void 0&&(c=this.smallerThan(y),i[u]=c,m&&c.relax(f,p));}else {g=this.greaterThan(l),r[u]=g,c=this.smallerThan(l),i[u]=c;var h=new Cr(g,c);m&&h.relax(f,p);}}var N=Object.keys(t),v=N.length;this.tolerance=e.tolerance||0,e.timeout&&(this.timeout=e.timeout),e.options&&(e.options.timeout&&(this.timeout=e.options.timeout),this.tolerance===0&&(this.tolerance=e.options.tolerance||0),e.options.useMIRCuts&&(this.useMIRCuts=e.options.useMIRCuts),typeof e.options.exitOnCycles=="undefined"?this.checkForCycles=true:this.checkForCycles=e.options.exitOnCycles);for(var L=e.ints||{},k=e.binaries||{},w=e.unrestricted||{},S=e.optimize,O=0;O<v;O+=1){var I=N[O],z=t[I],M=z[S]||0,$=!!k[I],_=!!L[I]||$,W=!!w[I],B=this.addVariable(M,I,_,W);$&&this.smallerThan(1).addTerm(1,B);var Z=Object.keys(z);for(s=0;s<Z.length;s+=1){var E=Z[s];if(E!==S){var j=z[E],U=r[E];U!==void 0&&U.addTerm(j,B);var ne=i[E];ne!==void 0&&ne.addTerm(j,B);}}}return this};J.prototype.getNumberOfIntegerVariables=function(){return this.integerVariables.length};J.prototype.solve=function(){return this.tableauInitialized===false&&(this.tableau.setModel(this),this.tableauInitialized=true),this.tableau.solve()};J.prototype.isFeasible=function(){return this.tableau.feasible};J.prototype.save=function(){return this.tableau.save()};J.prototype.restore=function(){return this.tableau.restore()};J.prototype.activateMIRCuts=function(e){this.useMIRCuts=e;};J.prototype.debug=function(e){this.checkForCycles=e;};J.prototype.log=function(e){return this.tableau.log(e)};});var Rr=H(Mr=>{Mr.CleanObjectiveAttributes=function(e){var t,n,r;if(typeof e.optimize=="string")if(e.constraints[e.optimize]){t=Math.random();for(n in e.variables)e.variables[n][e.optimize]&&(e.variables[n][t]=e.variables[n][e.optimize]);return e.constraints[t]=e.constraints[e.optimize],delete e.constraints[e.optimize],e}else return e;else {for(r in e.optimize)if(e.constraints[r])if(e.constraints[r]==="equal")delete e.optimize[r];else {t=Math.random();for(n in e.variables)e.variables[n][r]&&(e.variables[n][t]=e.variables[n][r]);e.constraints[t]=e.constraints[r],delete e.constraints[r];}return e}};});var Dt=H((Iu,zr)=>{function Ni(e){var t={is_objective:/(max|min)(imize){0,}\:/i,is_int:/^(?!\/\*)\W{0,}int/i,is_bin:/^(?!\/\*)\W{0,}bin/i,is_constraint:/(\>|\<){0,}\=/i,is_unrestricted:/^\S{0,}unrestricted/i,parse_lhs:/(\-|\+){0,1}\s{0,1}\d{0,}\.{0,}\d{0,}\s{0,}[A-Za-z]\S{0,}/gi,parse_rhs:/(\-|\+){0,1}\d{1,}\.{0,}\d{0,}\W{0,}\;{0,1}$/i,parse_dir:/(\>|\<){0,}\=/gi,parse_int:/[^\s|^\,]+/gi,parse_bin:/[^\s|^\,]+/gi,get_num:/(\-|\+){0,1}(\W|^)\d+\.{0,1}\d{0,}/g,get_word:/[A-Za-z].*/},n={opType:"",optimize:"_obj",constraints:{},variables:{}},r={">=":"min","<=":"max","=":"equal"},i="",a=null,s="",u="",d="",l=0;typeof e=="string"&&(e=e.split(`
`));for(var f=0;f<e.length;f++)if(d="__"+f,i=e[f],a=null,t.is_objective.test(i))n.opType=i.match(/(max|min)/gi)[0],a=i.match(t.parse_lhs).map(function(g){return g.replace(/\s+/,"")}).slice(1),a.forEach(function(g){s=g.match(t.get_num),s===null?g.substr(0,1)==="-"?s=-1:s=1:s=s[0],s=parseFloat(s),u=g.match(t.get_word)[0].replace(/\;$/,""),n.variables[u]=n.variables[u]||{},n.variables[u]._obj=s;});else if(t.is_int.test(i))a=i.match(t.parse_int).slice(1),n.ints=n.ints||{},a.forEach(function(g){g=g.replace(";",""),n.ints[g]=1;});else if(t.is_bin.test(i))a=i.match(t.parse_bin).slice(1),n.binaries=n.binaries||{},a.forEach(function(g){g=g.replace(";",""),n.binaries[g]=1;});else if(t.is_constraint.test(i)){var p=i.indexOf(":"),m=p===-1?i:i.slice(p+1);a=m.match(t.parse_lhs).map(function(g){return g.replace(/\s+/,"")}),a.forEach(function(g){s=g.match(t.get_num),s===null?g.substr(0,1)==="-"?s=-1:s=1:s=s[0],s=parseFloat(s),u=g.match(t.get_word)[0],n.variables[u]=n.variables[u]||{},n.variables[u][d]=s;}),l=parseFloat(i.match(t.parse_rhs)[0]),i=r[i.match(t.parse_dir)[0]],n.constraints[d]=n.constraints[d]||{},n.constraints[d][i]=l;}else t.is_unrestricted.test(i)&&(a=i.match(t.parse_int).slice(1),n.unrestricted=n.unrestricted||{},a.forEach(function(g){g=g.replace(";",""),n.unrestricted[g]=1;}));return n}function bi(e){if(!e)throw new Error("Solver requires a model to operate on");var t="",i={max:"<=",min:">=",equal:"="},o=new RegExp("[^A-Za-z0-9_[{}/.&#$%~'@^]","gi");if(e.opType){t+=e.opType+":";for(var a in e.variables)e.variables[a][a]=e.variables[a][a]?e.variables[a][a]:1,e.variables[a][e.optimize]&&(t+=" "+e.variables[a][e.optimize]+" "+a.replace(o,"_"));}else t+="max:";t+=`;

`;for(var s in e.constraints)for(var u in e.constraints[s])if(typeof i[u]!="undefined"){for(var d in e.variables)typeof e.variables[d][s]!="undefined"&&(t+=" "+e.variables[d][s]+" "+d.replace(o,"_"));t+=" "+i[u]+" "+e.constraints[s][u],t+=`;
`;}if(e.ints){t+=`

`;for(var l in e.ints)t+="int "+l.replace(o,"_")+`;
`;}if(e.unrestricted){t+=`

`;for(var f in e.unrestricted)t+="unrestricted "+f.replace(o,"_")+`;
`;}return t}zr.exports=function(e){return e.length?Ni(e):bi(e)};});var Br=H(()=>{});var Vr=H(()=>{});var Pr=H(gn=>{gn.reformat=Dt();function $r(e){return e=e.replace("\\r\\n",`\r
`),e=e.split(`\r
`),e=e.filter(function(t){var n;return n=new RegExp(" 0$","gi"),!(n.test(t)===true||(n=new RegExp("\\d$","gi"),n.test(t)===false))}).map(function(t){return t.split(/\:{0,1} +(?=\d)/)}).reduce(function(t,n,r){return t[n[0]]=n[1],t},{}),e}gn.solve=function(e){return new Promise(function(t,n){typeof window!="undefined"&&n("Function Not Available in Browser");var r=Dt()(e);e.external||n("Data for this function must be contained in the 'external' attribute. Not seeing anything there."),e.external.binPath||n("No Executable | Binary path provided in arguments as 'binPath'"),e.external.args||n("No arguments array for cli | bash provided on 'args' attribute"),e.external.tempName||n("No 'tempName' given. This is necessary to produce a staging file for the solver to operate on");var i=Br();i.writeFile(e.external.tempName,r,function(o,a){if(o)n(o);else {var s=Vr().execFile;e.external.args.push(e.external.tempName),s(e.external.binPath,e.external.args,function(u,d){if(u)if(u.code===1)t($r(d));else {var l={"-2":"Out of Memory",1:"SUBOPTIMAL",2:"INFEASIBLE",3:"UNBOUNDED",4:"DEGENERATE",5:"NUMFAILURE",6:"USER-ABORT",7:"TIMEOUT",9:"PRESOLVED",25:"ACCURACY ERROR",255:"FILE-ERROR"},f={code:u.code,meaning:l[u.code],data:d};n(f);}else t($r(d));});}});})};});var Wr=H((zu,_r)=>{_r.exports={lpsolve:Pr()};});var yn=H((Bu,Ar)=>{Ar.exports=function(e,t){var n=t.optimize,r=JSON.parse(JSON.stringify(t.optimize)),i=Object.keys(t.optimize),o,a=0,s={},u="",d={},l=[],f,p,m,g;for(delete t.optimize,f=0;f<i.length;f++)r[i[f]]=0;for(f=0;f<i.length;f++){t.optimize=i[f],t.opType=n[i[f]],o=e.Solve(t,void 0,void 0,true);for(g in i)if(!t.variables[i[g]]){o[i[g]]=o[i[g]]?o[i[g]]:0;for(m in t.variables)t.variables[m][i[g]]&&o[m]&&(o[i[g]]+=o[m]*t.variables[m][i[g]]);}for(u="base",p=0;p<i.length;p++)o[i[p]]?u+="-"+(o[i[p]]*1e3|0)/1e3:u+="-0";if(!s[u]){for(s[u]=1,a++,p=0;p<i.length;p++)o[i[p]]&&(r[i[p]]+=o[i[p]]);delete o.feasible,delete o.result,l.push(o);}}for(f=0;f<i.length;f++)t.constraints[i[f]]={equal:r[i[f]]/a};t.optimize="cheater-"+Math.random(),t.opType="max";for(f in t.variables)t.variables[f].cheater=1;for(f in l)for(m in l[f])d[m]=d[m]||{min:1e99,max:-1e99};for(f in d)for(m in l)l[m][f]?(l[m][f]>d[f].max&&(d[f].max=l[m][f]),l[m][f]<d[f].min&&(d[f].min=l[m][f])):(l[m][f]=0,d[f].min=0);return o=e.Solve(t,void 0,void 0,true),{midpoint:o,vertices:l,ranges:d}};});var jr=H((Vu,Er)=>{var xi=Sr(),Nn=Gr(),ki=mn(),It=kt(),Ur=Rr(),vi=It.Constraint,Li=It.Variable,wi=It.Numeral,Di=It.Term,St=Wr(),Ot=function(){this.Model=Nn,this.branchAndCut=ki,this.Constraint=vi,this.Variable=Li,this.Numeral=wi,this.Term=Di,this.Tableau=xi,this.lastSolvedModel=null,this.External=St,this.Solve=function(e,t,n,r){if(r)for(var i in Ur)e=Ur[i](e);if(!e)throw new Error("Solver requires a model to operate on");if(typeof e.optimize=="object"&&Object.keys(e.optimize>1))return yn()(this,e);if(e.external){var o=Object.keys(St);if(o=JSON.stringify(o),!e.external.solver)throw new Error("The model you provided has an 'external' object that doesn't have a solver attribute. Use one of the following:"+o);if(!St[e.external.solver])throw new Error("No support (yet) for "+e.external.solver+". Please use one of these instead:"+o);return St[e.external.solver].solve(e)}else {e instanceof Nn||(e=new Nn(t).loadJson(e));var a=e.solve();if(this.lastSolvedModel=e,a.solutionSet=a.generateSolutionSet(),n)return a;var s={};return s.feasible=a.feasible,s.result=a.evaluation,s.bounded=a.bounded,a._tableau.__isIntegral&&(s.isIntegral=true),Object.keys(a.solutionSet).forEach(function(u){a.solutionSet[u]!==0&&(s[u]=a.solutionSet[u]);}),s}},this.ReformatLP=Dt(),this.MultiObjective=function(e){return yn()(this,e)};};typeof define=="function"?define([],function(){return new Ot}):typeof window=="object"?window.solver=new Ot:typeof self=="object"&&(self.solver=new Ot);Er.exports=new Ot;});var Jr=H((Yu,Zr)=>{var ot=1e-60,Hr,Fr;do ot+=ot,Hr=1+.1*ot,Fr=1+.2*ot;while(Hr<=1||Fr<=1);Zr.exports=ot;});var Kr=H((Xu,Qr)=>{function Ii(e,t,n){let r,i;for(let o=1;o<=n;o+=1){e[o][o]=1/e[o][o],i=-e[o][o];for(let a=1;a<o;a+=1)e[a][o]*=i;if(r=o+1,n<r)break;for(let a=r;a<=n;a+=1){i=e[o][a],e[o][a]=0;for(let s=1;s<=o;s+=1)e[s][a]+=i*e[s][o];}}}Qr.exports=Ii;});var Xr=H((ed,Yr)=>{function Ci(e,t,n,r){let i,o;for(i=1;i<=n;i+=1){o=0;for(let a=1;a<i;a+=1)o+=e[a][i]*r[a];r[i]=(r[i]-o)/e[i][i];}for(let a=1;a<=n;a+=1){i=n+1-a,r[i]/=e[i][i],o=-r[i];for(let s=1;s<i;s+=1)r[s]+=o*e[s][i];}}Yr.exports=Ci;});var to=H((td,eo)=>{function Ti(e,t,n,r){let i,o,a;for(let s=1;s<=n;s+=1){if(r[1]=s,a=0,i=s-1,i<1){if(a=e[s][s]-a,a<=0)break;e[s][s]=Math.sqrt(a);}else {for(let u=1;u<=i;u+=1){o=e[u][s];for(let d=1;d<u;d+=1)o-=e[d][s]*e[d][u];o/=e[u][u],e[u][s]=o,a+=o*o;}if(a=e[s][s]-a,a<=0)break;e[s][s]=Math.sqrt(a);}r[1]=0;}}eo.exports=Ti;});var ro=H((nd,no)=>{var xn=Jr(),Gi=Kr(),Mi=Xr(),Ri=to();function zi(e,t,n,r,i,o,a,s,u,d,l,f,p,m=0,g,c,b){let y,h,N,v,L,k,w,S,O,I,z,M,$,_,W=Math.min(r,l),B=2*r+W*(W+5)/2+2*l+1;for(let x=1;x<=r;x+=1)c[x]=t[x];for(let x=r+1;x<=B;x+=1)c[x]=0;for(let x=1;x<=l;x+=1)p[x]=0,o[x]=0;let Z=[];if(b[1]===0){if(Ri(e,n,r,Z),Z[1]!==0){b[1]=2;return}Mi(e,n,r,t),Gi(e,n,r);}else {for(let x=1;x<=r;x+=1){i[x]=0;for(let G=1;G<=x;G+=1)i[x]+=e[G][x]*t[G];}for(let x=1;x<=r;x+=1){t[x]=0;for(let G=x;G<=r;G+=1)t[x]+=e[x][G]*i[G];}}a[1]=0;for(let x=1;x<=r;x+=1){i[x]=t[x],a[1]+=c[x]*i[x],c[x]=0;for(let G=x+1;G<=r;G+=1)e[G][x]=0;}a[1]=-a[1]/2,b[1]=0;let E=r,j=E+r,U=j+W,ne=U+W+1,ee=ne+W*(W+1)/2,ve=ee+l;for(let x=1;x<=l;x+=1){k=0;for(let G=1;G<=r;G+=1)k+=s[G][x]*s[G][x];c[ve+x]=Math.sqrt(k);}v=m,g[1]=0,g[2]=0;function Co(){g[1]+=1,B=ee;for(let x=1;x<=l;x+=1){B+=1,k=-u[x];for(let G=1;G<=r;G+=1)k+=s[G][x]*i[G];if(Math.abs(k)<xn&&(k=0),x>f)c[B]=k;else if(c[B]=-Math.abs(k),k>0){for(let G=1;G<=r;G+=1)s[G][x]=-s[G][x];u[x]=-u[x];}}for(let x=1;x<=v;x+=1)c[ee+p[x]]=0;N=0,L=0;for(let x=1;x<=l;x+=1)c[ee+x]<L*c[ve+x]&&(N=x,L=c[ee+x]/c[ve+x]);if(N===0){for(let x=1;x<=v;x+=1)o[p[x]]=c[U+x];return 999}return 0}function To(){for(let x=1;x<=r;x+=1){k=0;for(let G=1;G<=r;G+=1)k+=e[G][x]*s[G][N];c[x]=k;}y=E;for(let x=1;x<=r;x+=1)c[y+x]=0;for(let x=v+1;x<=r;x+=1)for(let G=1;G<=r;G+=1)c[y+G]=c[y+G]+e[G][x]*c[x];M=true;for(let x=v;x>=1;x-=1){k=c[x],B=ne+x*(x+3)/2,y=B-x;for(let G=x+1;G<=v;G+=1)k-=c[B]*c[j+G],B+=G;k/=c[y],c[j+x]=k,!(p[x]<=f)&&(k<=0||(M=false,h=x));}if(!M){w=c[U+h]/c[j+h];for(let x=1;x<=v;x+=1)p[x]<=f||c[j+x]<=0||(L=c[U+x]/c[j+x],L<w&&(w=L,h=x));}k=0;for(let x=E+1;x<=E+r;x+=1)k+=c[x]*c[x];if(Math.abs(k)<=xn){if(M)return b[1]=1,999;for(let x=1;x<=v;x+=1)c[U+x]=c[U+x]-w*c[j+x];return c[U+v+1]=c[U+v+1]+w,700}k=0;for(let x=1;x<=r;x+=1)k+=c[E+x]*s[x][N];S=-c[ee+N]/k,$=true,M||w<S&&(S=w,$=false);for(let x=1;x<=r;x+=1)i[x]+=S*c[E+x],Math.abs(i[x])<xn&&(i[x]=0);a[1]+=S*k*(S/2+c[U+v+1]);for(let x=1;x<=v;x+=1)c[U+x]=c[U+x]-S*c[j+x];if(c[U+v+1]=c[U+v+1]+S,$){v+=1,p[v]=N,B=ne+(v-1)*v/2+1;for(let x=1;x<=v-1;x+=1)c[B]=c[x],B+=1;if(v===r)c[B]=c[r];else {for(let x=r;x>=v+1;x-=1)if(c[x]!==0&&(O=Math.max(Math.abs(c[x-1]),Math.abs(c[x])),I=Math.min(Math.abs(c[x-1]),Math.abs(c[x])),c[x-1]>=0?L=Math.abs(O*Math.sqrt(1+I*I/(O*O))):L=-Math.abs(O*Math.sqrt(1+I*I/(O*O))),O=c[x-1]/L,I=c[x]/L,O!==1))if(O===0){c[x-1]=I*L;for(let G=1;G<=r;G+=1)L=e[G][x-1],e[G][x-1]=e[G][x],e[G][x]=L;}else {c[x-1]=L,z=I/(1+O);for(let G=1;G<=r;G+=1)L=O*e[G][x-1]+I*e[G][x],e[G][x]=z*(e[G][x-1]+L)-e[G][x],e[G][x-1]=L;}c[B]=c[v];}}else {k=-u[N];for(let x=1;x<=r;x+=1)k+=i[x]*s[x][N];if(N>f)c[ee+N]=k;else if(c[ee+N]=-Math.abs(k),k>0){for(let x=1;x<=r;x+=1)s[x][N]=-s[x][N];u[N]=-u[N];}return 700}return 0}function Go(){if(B=ne+h*(h+1)/2+1,y=B+h,c[y]===0||(O=Math.max(Math.abs(c[y-1]),Math.abs(c[y])),I=Math.min(Math.abs(c[y-1]),Math.abs(c[y])),c[y-1]>=0?L=Math.abs(O*Math.sqrt(1+I*I/(O*O))):L=-Math.abs(O*Math.sqrt(1+I*I/(O*O))),O=c[y-1]/L,I=c[y]/L,O===1))return 798;if(O===0){for(let x=h+1;x<=v;x+=1)L=c[y-1],c[y-1]=c[y],c[y]=L,y+=x;for(let x=1;x<=r;x+=1)L=e[x][h],e[x][h]=e[x][h+1],e[x][h+1]=L;}else {z=I/(1+O);for(let x=h+1;x<=v;x+=1)L=O*c[y-1]+I*c[y],c[y]=z*(c[y-1]+L)-c[y],c[y-1]=L,y+=x;for(let x=1;x<=r;x+=1)L=O*e[x][h]+I*e[x][h+1],e[x][h+1]=z*(e[x][h]+L)-e[x][h+1],e[x][h]=L;}return 0}function Mo(){y=B-h;for(let x=1;x<=h;x+=1)c[y]=c[B],B+=1,y+=1;return c[U+h]=c[U+h+1],p[h]=p[h+1],h+=1,h<v?797:0}function Pn(){return c[U+v]=c[U+v+1],c[U+v+1]=0,p[v]=0,v-=1,g[2]+=1,0}for(_=0;;){if(_=Co(),_===999)return;for(;_=To(),_!==0;){if(_===999)return;if(_===700)if(h===v)Pn();else {for(;Go(),_=Mo(),_===797;);Pn();}}}}no.exports=zi;});var io=H(oo=>{var Bi=ro();function Vi(e,t,n,r=[],i=0,o=[0,0]){let a=[],s=[],u=[],d=[],l=[],f=[],p="",m=e.length-1,g=n[1].length-1;if(!r)for(let y=1;y<=g;y+=1)r[y]=0;if(m!==e[1].length-1&&(p="Dmat is not symmetric!"),m!==t.length-1&&(p="Dmat and dvec are incompatible!"),m!==n.length-1&&(p="Amat and dvec are incompatible!"),g!==r.length-1&&(p="Amat and bvec are incompatible!"),(i>g||i<0)&&(p="Value of meq is invalid!"),p!=="")return {message:p};for(let y=1;y<=g;y+=1)s[y]=0,d[y]=0;let c=0,b=Math.min(m,g);for(let y=1;y<=m;y+=1)u[y]=0;a[1]=0;for(let y=1;y<=2*m+b*(b+5)/2+2*g+1;y+=1)l[y]=0;for(let y=1;y<=2;y+=1)f[y]=0;return Bi(e,t,m,m,u,d,a,n,r,m,g,i,s,c,f,l,o),o[1]===1&&(p="constraints are inconsistent, no solution!"),o[1]===2&&(p="matrix D in quadratic function is not positive definite!"),{solution:u,Lagrangian:d,value:a,unconstrained_solution:t,iterations:f,iact:s,message:p}}oo.solveQP=Vi;});var so=H((od,ao)=>{ao.exports=io();});function En(e){for(let t of e)return t}function je(e){for(let t of e)return e.delete(t),t}function Re(e,t,n){let r=e.get(t);r===void 0?e.set(t,[n]):r.push(n);}function ut(e,t,n){let r=e.get(t);r===void 0?e.set(t,new Set([n])):r.add(n);}function Ut(e,t,n){let r=e.get(t);r!==void 0&&(r.delete(n),r.size||e.delete(t));}var{toString:Ao}=Object.prototype;function Et(e){return Ao.call(e)==="[object RegExp]"}function jt(e){let t=typeof e;return e!==null&&(t==="object"||t==="function")}var{propertyIsEnumerable:Uo}=Object.prototype;function qt(e){return [...Object.keys(e),...Object.getOwnPropertySymbols(e).filter(t=>Uo.call(e,t))]}function Ht(e,t,n){let r=[];return function i(o,a={},s=""){let u=a.indent||"	",d;a.inlineCharacterLimit===void 0?d={newline:`
`,newlineOrSpace:`
`,pad:s,indent:s+u}:d={newline:"@@__STRINGIFY_OBJECT_NEW_LINE__@@",newlineOrSpace:"@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@",pad:"@@__STRINGIFY_OBJECT_PAD__@@",indent:"@@__STRINGIFY_OBJECT_INDENT__@@"};let l=f=>{if(a.inlineCharacterLimit===void 0)return f;let p=f.replace(new RegExp(d.newline,"g"),"").replace(new RegExp(d.newlineOrSpace,"g")," ").replace(new RegExp(d.pad+"|"+d.indent,"g"),"");return p.length<=a.inlineCharacterLimit?p:f.replace(new RegExp(d.newline+"|"+d.newlineOrSpace,"g"),`
`).replace(new RegExp(d.pad,"g"),s).replace(new RegExp(d.indent,"g"),s+u)};if(r.includes(o))return '"[Circular]"';if(o==null||typeof o=="number"||typeof o=="boolean"||typeof o=="function"||typeof o=="symbol"||Et(o))return String(o);if(o instanceof Date)return `new Date('${o.toISOString()}')`;if(Array.isArray(o)){if(o.length===0)return "[]";r.push(o);let f="["+d.newline+o.map((p,m)=>{let g=o.length-1===m?d.newline:","+d.newlineOrSpace,c=i(p,a,s+u);return a.transform&&(c=a.transform(o,m,c)),d.indent+c+g}).join("")+d.pad+"]";return r.pop(),l(f)}if(jt(o)){let f=qt(o);if(a.filter&&(f=f.filter(m=>a.filter(o,m))),f.length===0)return "{}";r.push(o);let p="{"+d.newline+f.map((m,g)=>{let c=f.length-1===g?d.newline:","+d.newlineOrSpace,b=typeof m=="symbol",y=!b&&/^[a-z$_][$\w]*$/i.test(m),h=b||y?m:i(m,a),N=i(o[m],a,s+u);return a.transform&&(N=a.transform(o,m,N)),d.indent+String(h)+": "+N+c}).join("")+d.pad+"}";return r.pop(),l(p)}return o=o.replace(/\\/g,"\\\\"),o=String(o).replace(/[\r\n]/g,f=>f===`
`?"\\n":"\\r"),a.singleQuotes===false?(o=o.replace(/"/g,'\\"'),`"${o}"`):(o=o.replace(/'/g,"\\'"),`'${o}'`)}(e,t,n)}function*Oe(e,...t){let n=new Set,r;for(;(r=t.pop())!==void 0;)n.has(r)||(yield r,n.add(r),t.push(...e(r)));}function Ft(e,t){let n=[];for(let[r,i]of K(t))n.push(e[r]),n.push(i);return n.push(e[e.length-1]),n.join("")}function D(e,...t){let n=A(t,r=>Ht(r,{indent:"  ",singleQuotes:false,inlineCharacterLimit:60}));return new Error(Ft(e,n))}function jn(e){return `internal error: ${e}; if you encounter this please submit an issue at: https://github.com/erikbrinkman/d3-dag/issues`}function te(e,...t){let n=A(t,r=>r.toString());return new Error(jn(Ft(e,n)))}function oe(e,t,...n){let[r,...i]=e,o=A(n,u=>u.toString()),a=Ft(i,o),s=t.name||"anonymous";return new Error("d3dagBuiltin"in t?jn(`builtin ${r}'${s}'${a}`):`custom ${r}'${s}'${a}`)}function*K(e){let t=0;for(let n of e)yield [t++,n];}function*Ne(e,t){for(let[n,r]of K(e))yield*Y(t(r,n));}function*A(e,t){for(let[n,r]of K(e))yield t(r,n);}function*be(e,t){for(let[n,r]of K(e))t(r,n)&&(yield r);}function Zt(e,t){for(let[n,r]of K(e))if(t(r,n))return  true;return  false}function Hn(e,t){return !Zt(e,(n,r)=>!t(n,r))}function*Eo(e,t,n,r){let i=Math.min(n,e.length);for(let o=t;o<i;o+=r)yield e[o];}function*jo(e,t,n,r){let i=Math.max(n,-1);for(let o=t;o>i;o+=r)yield e[o];}function q(e,t=0,n=e.length,r=1){if(r>0)return Eo(e,t,n,r);if(r<0)return jo(e,t,n,r);throw D`can't slice with zero stride`}function*se(...e){for(let t of e)yield*Y(t);}function*Q(e){let t=e[Symbol.iterator](),n=t.next();if(!n.done){let r=n.value,i;for(;!(i=t.next()).done;)yield [r,i.value],r=i.value;}}function dt(e){return typeof e=="object"&&e!==null&&Symbol.iterator in e&&typeof e[Symbol.iterator]=="function"}function Qt(e){let t=[],n,r=new Map;for(let[a,s]of K(e.nodes()))r.set(s,a),t.push({x:s.ux,y:s.uy,data:s.data}),s===e&&(n=a);let i=[];for(let{source:a,target:s,data:u,points:d}of e.links())i.push({source:r.get(a),target:r.get(s),points:d,data:u});return {nodes:t,links:i,index:n,v:1}}var Kt=class{constructor(t,n,r,i="inactive"){this.node=t;this.indeg=n;this.outdeg=r;this.stat=i;}bucket(){let t=this.indeg===0?-1/0:this.outdeg===0?1/0:this.indeg-this.outdeg;return this.stat==="top"?Math.min(t,0):this.stat==="bottom"?Math.max(t,0):t}isTop(){return this.indeg<=this.outdeg&&this.stat!=="bottom"||this.stat==="top"}};function Zn(e,t){let n=e[t];if(n===void 0){let r=new Set;return e[t]=r,r}else return n}function Jn(e){var n;let t;for(;e.length&&!((n=t=e[e.length-1])!=null&&n.size);)e.pop();return t||void 0}function Yn(e,t=()=>{}){let n=new Map,r=new Map,i=new Set,o=new Set,a=[],s=[];function u(N){return N===-1/0?i:N===1/0?o:N<=0?Zn(a,-N):Zn(s,N-1)}for(let N of e){let v=N.nparentLinks(),L=N.nchildLinks(),k=new Kt(N,v,L),w=t(N);n.set(N,k),w===void 0?(k.stat="active",u(k.bucket()).add(k)):ut(r,w,k);}let d=[...r].sort(([N],[v])=>N-v).map(([,N])=>N),l=0,f=d.length,p=d.length?d[l++]:new Set,m=d.length>1?d[--f]:new Set;for(let N of p)N.stat="top",u(N.bucket()).add(N);for(let N of m)N.stat="bottom",u(N.bucket()).add(N);function g(){var k;let N;if(N=(k=je(i))!=null?k:je(o))return N;let v=Jn(a),L=Jn(s);if(L)return je(a.length>s.length?v:L);if(v)return je(v)}let c=Array(n.size),b=0,y=n.size,h;for(;h=g();){let{node:N}=h,v=h.isTop()?b++:--y;h.stat="ranked",c[v]=N;for(let[L,k]of N.parentCounts()){let w=n.get(L);u(w.bucket()).delete(w),w.outdeg-=k,w.stat!=="ranked"&&w.stat!=="inactive"&&u(w.bucket()).add(w);}for(let[L,k]of N.childCounts()){let w=n.get(L);u(w.bucket()).delete(w),w.indeg-=k,w.stat!=="ranked"&&w.stat!=="inactive"&&u(w.bucket()).add(w);}if(p.delete(h),!p.size&&l<f){p=d[l++];for(let L of p)L.stat="top",u(L.bucket()).add(L);}if(m.delete(h),!m.size&&l<f){m=d[--f];for(let L of m)L.stat="bottom",u(L.bucket()).add(L);}}return c}function Qn(e,t){let n=new Set,r=new Set,i=[],o;for(let a of e)if(!r.has(a)){for(i.push(a);o=i.pop();)n.delete(o),!r.has(o)&&(r.add(o),i.push(...t(o)));n.add(a);}return n}function Qo(e){let t=new Map(A(e,i=>[i,i.nparents()])),n=[...A(be(t,([,i])=>i===0),([i])=>i)];for(let i of n)t.delete(i);let r;for(;r=n.pop();)for(let i of r.children()){let o=t.get(i)-1;o?t.set(i,o):(t.delete(i),n.push(i));}return !t.size}var Be,Ve,$e,ce,He,Fe,ft,ct,pt,Yt=class{constructor(){F(this,Be,0);F(this,Ve,0);F(this,$e,0);F(this,ce,true);F(this,He,new Set);F(this,Fe,new Set);F(this,ft,()=>{P(this,Be,C(this,Be)-1);});F(this,ct,(t,n)=>{P(this,Ve,C(this,Ve)+1),t?P(this,$e,C(this,$e)+1):!n&&C(this,ce)===true&&P(this,ce,null);});F(this,pt,t=>{P(this,Ve,C(this,Ve)-1),t?P(this,$e,C(this,$e)-1):C(this,ce)===false&&P(this,ce,null);});}*nodes(){for(let t of this.split())yield*Y(t.nodes());}topological(t){return Yn(this.nodes(),t)}*links(){for(let t of this.nodes())yield*Y(t.childLinks());}nnodes(){return C(this,Be)}nlinks(){return C(this,Ve)}*roots(){for(let t of this.split())yield*Y(t.roots());}*leaves(){for(let t of this.split())yield*Y(t.leaves());}*split(){yield*Y(C(this,He));let t;for(;t=En(C(this,Fe));)yield t,t.nnodes();}connected(){let t=false;for(let n of this.split()){if(t)return  false;t=true;}return  true}multi(){return !!C(this,$e)}acyclic(){if(C(this,ce)===null){for(let t of this.split())if(!t.acyclic())return P(this,ce,false),false;return P(this,ce,true),true}else return C(this,ce)}node(t){return P(this,Be,C(this,Be)+1),new lt(this,C(this,He),C(this,Fe),C(this,ft),C(this,ct),C(this,pt),t)}link(t,n,r){return t.link(t,n,r)}toJSON(){return Qt(this)}};Be=new WeakMap,Ve=new WeakMap,$e=new WeakMap,ce=new WeakMap,He=new WeakMap,Fe=new WeakMap,ft=new WeakMap,ct=new WeakMap,pt=new WeakMap;function Kn(e){for(let t of e.values())for(let n of t)return n}function ze(e){return e instanceof lt}var re,Ze,Je,Qe,xe,we,Ie,Pe,de,_e,le,ie,X,Ce,qe,he,Le,ht,lt=class{constructor(t,n,r,i,o,a,s){this.data=s;F(this,Ce);F(this,he);F(this,re,void 0);F(this,Ze,void 0);F(this,Je,void 0);F(this,Qe,void 0);F(this,xe,void 0);F(this,we,void 0);F(this,Ie,0);F(this,Pe,0);F(this,de,new Map);F(this,_e,0);F(this,le,new Map);F(this,ie,void 0);F(this,X,void 0);F(this,ht,t=>{var o,a;let{source:n,target:r}=t,i=n.nchildLinksTo(r)>1;if(i){P(n,Ie,C(n,Ie)-1);let s=ae(o=n,he,Le).call(o);s.nlinks-=1,s.multis-=1;}else {let s=ae(a=n,Ce,qe).call(a);P(s,X,null),C(this,xe).delete(s),C(this,we).add(n),P(n,ie,n),P(n,X,null),C(this,we).add(r),P(r,ie,r),P(r,X,null);}C(this,Qe).call(this,i),Ut(C(n,le),r,t),P(n,_e,C(n,_e)-1),Ut(C(r,de),n,t),P(r,Pe,C(r,Pe)-1);});P(this,re,t),P(this,xe,n),P(this,we,r),P(this,Ze,i),P(this,Je,o),P(this,Qe,a),P(this,ie,this),P(this,X,{nnodes:1,nlinks:0,multis:0,acyclic:true,roots:[this],leaves:[this]}),C(this,xe).add(this);}get x(){if(this.ux===void 0)throw D`can't get \`x\` when \`ux\` is undefined`;return this.ux}set x(t){this.ux=t;}get y(){if(this.uy===void 0)throw D`can't get \`y\` when \`uy\` is undefined`;return this.uy}set y(t){this.uy=t;}*nodes(){yield*Y(Oe(t=>se(t.children(),t.parents()),this));}topological(t){return Yn(this.nodes(),t)}*links(){for(let t of this.nodes())yield*Y(t.childLinks());}nnodes(){return ae(this,he,Le).call(this).nnodes}nlinks(){return ae(this,he,Le).call(this).nlinks}*split(){yield this;}connected(){return  true}multi(){return ae(this,he,Le).call(this).multis>0}acyclic(){let t=ae(this,he,Le).call(this);return t.acyclic===null?t.acyclic=Qo(this.nodes()):t.acyclic}node(t){if(C(this,re))return C(this,re).node(t);throw D`can't add a node from a deleted node`}link(t,n,r){var i,o;if(C(this,re)){if(t===n)throw D`tried to create a link between the same node, but self loops are not supported`;if(ze(t)&&ze(n)&&C(t,re)===C(n,re)&&C(this,re)===C(t,re)){let a=new Xt(C(this,re),t,n,C(this,ht),r),s=t.nchildLinksTo(n)>0,u=ae(i=t,Ce,qe).call(i),d=C(u,X),l=ae(o=n,Ce,qe).call(o),f=C(l,X);if(s&&d)P(t,Ie,C(t,Ie)+1),d.nlinks+=1,d.multis+=1;else if(s)P(t,Ie,C(t,Ie)+1);else if(u===l&&d)d.nlinks+=1,d.acyclic===true&&(d.acyclic=null);else if(u!==l&&d&&f){let[p,m,g,c]=d.nnodes>f.nnodes?[u,d,l,f]:[l,f,u,d];C(this,xe).delete(g),P(g,ie,p),P(g,X,void 0),m.nnodes+=c.nnodes,m.nlinks+=c.nlinks+1,m.multis+=c.multis,m.acyclic=m.acyclic===false||c.acyclic===false?false:m.acyclic===true&&c.acyclic===true?true:null,m.roots=null,m.leaves=null;}else u!==l&&(P(u,X,null),P(l,X,null));return C(this,Je).call(this,s,u!==l),P(t,_e,C(t,_e)+1),ut(C(t,le),n,a),P(n,Pe,C(n,Pe)+1),ut(C(n,de),t,a),a}else throw D`when creating a link, both source and target must be current members of the same graph, and can't have been deleted`}else throw D`can't add a link from a deleted node`}nparents(){return C(this,de).size}nchildren(){return C(this,le).size}nparentLinks(){return C(this,Pe)}nchildLinks(){return C(this,_e)}nparentLinksTo(t){var n,r;return ze(t)&&(r=(n=C(this,de).get(t))==null?void 0:n.size)!=null?r:0}*parentLinksTo(t){if(ze(t)){let n=C(this,de).get(t);n&&(yield*Y(n));}}nchildLinksTo(t){var n,r;return ze(t)&&(r=(n=C(this,le).get(t))==null?void 0:n.size)!=null?r:0}*childLinksTo(t){if(ze(t)){let n=C(this,le).get(t);n&&(yield*Y(n));}}*parents(){yield*Y(C(this,de).keys());}*children(){yield*Y(C(this,le).keys());}*parentCounts(){for(let[t,n]of C(this,de))yield [t,n.size];}*childCounts(){for(let[t,n]of C(this,le))yield [t,n.size];}*parentLinks(){for(let t of C(this,de).values())yield*Y(t);}*childLinks(){for(let t of C(this,le).values())yield*Y(t);}*ancestors(){yield*Y(Oe(t=>t.parents(),this));}*descendants(){yield*Y(Oe(t=>t.children(),this));}*roots(){let t=ae(this,he,Le).call(this);t.roots||(t.roots=[...Qn(this.nodes(),n=>n.children())]),yield*Y(t.roots);}*leaves(){let t=ae(this,he,Le).call(this);t.leaves||(t.leaves=[...Qn(this.nodes(),n=>n.parents())]),yield*Y(t.leaves);}parent(t,n){return this.link(t,this,n)}child(t,n){return this.link(this,t,n)}delete(){if(C(this,re)){let t;for(;t=Kn(C(this,le));)t.delete();for(;t=Kn(C(this,de));)t.delete();C(this,xe).delete(this),C(this,we).delete(this),C(this,Ze).call(this),P(this,re,null),P(this,X,null);}}toJSON(){return Qt(this)}};re=new WeakMap,Ze=new WeakMap,Je=new WeakMap,Qe=new WeakMap,xe=new WeakMap,we=new WeakMap,Ie=new WeakMap,Pe=new WeakMap,de=new WeakMap,_e=new WeakMap,le=new WeakMap,ie=new WeakMap,X=new WeakMap,Ce=new WeakSet,qe=function(){let t=this;for(;C(t,ie)!==t;)P(t,ie,C(C(t,ie),ie)),t=C(t,ie);return t},he=new WeakSet,Le=function(){let t=ae(this,Ce,qe).call(this);if(C(t,X)===void 0)throw te`undefined cached info`;if(C(t,X)!==null)return C(t,X);{let n=0,r=0,i=0;for(let o of this.nodes())n+=1,r+=o.nchildLinks(),i+=C(o,Ie),P(o,ie,this),P(o,X,void 0),C(this,we).delete(o);return C(this,xe).add(this),P(this,X,{nnodes:n,nlinks:r,multis:i,acyclic:null,roots:null,leaves:null})}},ht=new WeakMap;var We,Ke,Xt=class{constructor(t,n,r,i,o){this.source=n;this.target=r;this.data=o;F(this,We,void 0);F(this,Ke,void 0);this.points=[];P(this,We,t),P(this,Ke,i);}delete(){C(this,We)&&(C(this,Ke).call(this,this),P(this,We,null));}};We=new WeakMap,Ke=new WeakMap;function ue(){return new Yt}function Ye(e){if(typeof e!="string")throw D`id is supposed to be type string but got type ${typeof e}`;return e}function Xe(e){function t(a){let s=ue(),u=new Map;for(let[d,l]of a.entries()){let f=Ye(e.sourceId(l,d)),p=u.get(f);p===void 0&&(p=s.node(e.nodeDatum(f,d)),u.set(f,p));let m=Ye(e.targetId(l,d)),g=u.get(m);g===void 0&&(g=s.node(e.nodeDatum(m,d)),u.set(m,g)),(f!==m||!e.single)&&s.link(p,g,l);}return s}function n(a){if(a===void 0)return e.sourceId;{let s=e,{sourceId:u}=s,d=V(s,["sourceId"]);return Xe(R(T({},d),{sourceId:a}))}}t.sourceId=n;function r(a){if(a===void 0)return e.targetId;{let s=e,{targetId:u}=s,d=V(s,["targetId"]);return Xe(R(T({},d),{targetId:a}))}}t.targetId=r;function i(a){if(a===void 0)return e.nodeDatum;{let s=e,{nodeDatum:u}=s,d=V(s,["nodeDatum"]);return Xe(R(T({},d),{nodeDatum:a}))}}t.nodeDatum=i;function o(a){return a===void 0?e.single:Xe(R(T({},e),{single:a}))}return t.single=o,t}function Ko(e){if(typeof e!="object"||e===null||!(0 in e))throw D`default source id expected datum[0] to exist but got datum: ${e}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``;let t=e[0];if(typeof t=="string")return t;throw D`default source id expected datum[0] to be a string but got datum: ${e}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``}function Yo(e){if(typeof e!="object"||e===null||!(1 in e))throw D`default target id expected datum[1] to exist but got datum: ${e}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``;let t=e[1];if(typeof t=="string")return t;throw D`default target id expected datum[1] to be a string but got datum: ${e}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``}function Xo(e){return e}function ei(...e){if(e.length)throw D`got arguments to graphConnect(${e}), but constructor takes no arguments; these were probably meant as data which should be called as \`graphConnect()(...)\``;return Xe({sourceId:Ko,targetId:Yo,nodeDatum:Xo,single:false})}function mt(e){function t(o){var d;let a=ue(),s=new Map,u=[];for(let[l,f]of o.entries()){let p=Ye(e.id(f,l)),m=a.node(f),g=(d=e.parentData(f,l))!=null?d:[];for(let[c,b]of g)u.push([c,m,b]);if(s.has(p))throw D`found a duplicate id: ${n}, but ids passed to \`graphStratify()\` must be unique`;s.set(p,m);}for(let[l,f,p]of u){let m=s.get(l);if(!m)throw D`missing id: ${l}; this id was references in a node's parentIds, but no node with that id exists`;a.link(m,f,p);}return a}function n(o){if(o===void 0)return e.id;{let a=e,{id:s}=a,u=V(a,["id"]);return mt(R(T({},u),{id:o}))}}t.id=n;function r(o){if(o===void 0)return e.parentData;{let a=e,{parentIds:s,parentData:u}=a,d=V(a,["parentIds","parentData"]);return mt(R(T({},d),{parentIds:oi(o),parentData:o}))}}t.parentData=r;function i(o){if(o===void 0)return e.parentIds;{let a=e,{parentIds:s,parentData:u}=a,d=V(a,["parentIds","parentData"]);return mt(R(T({},d),{parentIds:o,parentData:nr(o)}))}}return t.parentIds=i,t}function nr(e){function t(n,r){var i;return A((i=e(n,r))!=null?i:[],o=>[o,void 0])}return t.wrapped=e,t}function oi(e){function t(n,r){var i;return A((i=e(n,r))!=null?i:[],([o])=>o)}return t.wrapped=e,t}function ii(e){if(typeof e!="object"||e===null||!("id"in e))throw D`datum did not have an id field, and no id accessor was specified; try calling \`graphStratify().id(d => d...)\` to set a custom id accessor`;let{id:t}=e;if(typeof t=="string")return t;throw D`datum has an id field that was not a string, and no id accessor was specified; try calling \`graphStratify().id(d => d...)\` to set a custom id accessor`}function tr(e){if(typeof e!="object"||e===null)throw D`default parentIds function expected datum to be an object but got: ${e}; try setting a custom accessor for parentIds with \`graphStratify().parentIds(d => ...)\``;if(!("parentIds"in e))return;let{parentIds:t}=e;if(t===void 0||dt(t)&&Hn(t,n=>typeof n=="string"))return t;throw D`default parentIds function expected parentIds to be an iterable of strings but got: ${t}; try setting a custom accessor for parentIds with \`graphStratify().parentIds(d => ...)\``}function ai(...e){if(e.length)throw D`got arguments to graphStratify(${e}), but constructor takes no arguments; these were probably meant as data which should be called as \`graphStratify()(...)\``;return mt({id:ii,parentIds:tr,parentData:nr(tr)})}var qr=An(jr());function fe(e,t,n,r,i={}){let s=qr.Solve.call({},{optimize:e,opType:t,constraints:r,variables:n,ints:i}),{feasible:o}=s,a=V(s,["feasible"]);if(!o)throw te`could not find a feasible simplex solution`;return a}function Tt(e){if(typeof e!="function"){let[t,n]=e;if(t<=0||n<=0)throw D`all node sizes must be positive, but got width ${t} and height ${n}`;return ()=>[t,n]}else {let t=new Map;return r=>{let i=t.get(r);if(i===void 0){i=e(r);let[o,a]=i;if(o<=0||a<=0)throw D`all node sizes must be positive, but got width ${o} and height ${a} for node with data: ${r.data}; make sure the callback passed to \`sugiyama().nodeSize(...)\` is doing that`;t.set(r,i);}return i}}}function bn(e){if(typeof e!="function"){let[t,n]=e;return [()=>t,()=>n]}else {let t=e;return [n=>t(n)[0],n=>t(n)[1]]}}var fo=An(so());function kn(e){let t=0,n=0;for(let r of e)n++,t+=(r-t)/n;return n?t:void 0}function uo(e){let t=[...e];if(t.sort((n,r)=>n-r),t.length!==0){if(t.length===2)return (t[0]+t[1])/2;if(t.length%2===0){let n=t.length/2,r=t[0],i=t[n-1],o=t[n],a=t[t.length-1],s=i-r,u=a-o;return (i*u+o*s)/(s+u)}else return t[(t.length-1)/2]}}function Pi(e,t){let n=new Map;for(let l of e){let f=t.get(l);f!==void 0&&Re(n,f,l);}let r=[...n.entries()].sort(([l],[f])=>l-f).flatMap(([,l])=>l),i=new Map(e.map((l,f)=>[l,f])),o=e.filter(l=>t.get(l)===void 0),a=new Array(o.length).fill(null);function s(l,f,p,m){if(f<=l)return;let g=Math.floor((l+f)/2),c=o[g],b=i.get(c),y=0,h=[y];for(let v=p;v<m;++v)y+=i.get(r[v])<b?-1:1,h.push(y);let N=p+h.indexOf(Math.min(...h));a[g]=N,s(l,g,p,N),s(g+1,f,N,m);}s(0,o.length,0,r.length),a.push(r.length+1);let u=0,d=0;for(let[l,f]of r.entries()){for(;a[d]==l;)e[u++]=o[d++];e[u++]=f;}for(;a[d]==r.length;)e[u++]=o[d++];}function lo({aggregate:e}){function t(r,i,o){let[a,s]=o?[i,r]:[r,i],u=o?f=>f.parents():f=>f.children(),d=new Map(s.map((f,p)=>[f,p])),l=new Map(a.map(f=>{let p=d.get(f),m=p!=null?p:e(A(u(f),g=>d.get(g)));return [f,m]}));Pi(a,l);}function n(r){return r===void 0?e:lo({aggregate:r})}return t.aggregator=n,t.d3dagBuiltin=true,t}function vn(...e){if(e.length)throw D`got arguments to twolayerAgg(${e}); you probably forgot to construct twolayerAgg before passing to order: \`decrossTwoLayer().order(twolayerAgg())\`, note the trailing "()"`;return lo({aggregate:uo})}function _i(e,t,n,r,i){if(!t.length)return [];let o=[[0]],a=[0],s=[[0]],u=[0];for(let f of e){let p=[0];p.push(...f),o.push(p);}a.push(...t),s.push(...t.map(()=>[0]));for(let f of n)for(let[p,m]of f.entries())s[p+1].push(-m);u.push(...r.map(f=>-f));let{solution:d,message:l}=(0, fo.solveQP)(o,a,s,u,i);if(l.length)throw te`quadratic program failed: ${l}`;return d.shift(),d}function Gt(e,t,n,r,i=0){t.pop(),e.pop(),e.forEach(a=>a.pop()),n.forEach(a=>a.pop());let o=_i(e,t,n,r,i);return o.push(0),o}function co(e){let t=new Map,n=0;for(let r of e)for(let i of r)t.has(i)||t.set(i,n++);return t}function Mt(e,t,n,r=0){let i=1+Math.max(...t.values()),o=Array(i).fill(null).map((d,l)=>Array(i).fill(null).map((f,p)=>l===p?r:0)),a=Array(i).fill(0),s=[],u=[];for(let d of e)for(let[l,f]of Q(d)){let p=t.get(l),m=t.get(f),g=Array(i).fill(0);g[p]=1,g[m]=-1,s.push(g),u.push(-n(l,f));}return [o,a,s,u]}function po(e,t,n,r){e[n][n]+=r,e[n][t]-=r,e[t][n]-=r,e[t][t]+=r;}function Rt(e,t,n,r,i,o){let a=i+o;e[r][r]+=o*o,e[r][n]-=o*a,e[r][t]+=o*i,e[n][r]-=a*o,e[n][n]+=a*a,e[n][t]-=a*i,e[t][r]+=i*o,e[t][n]-=i*a,e[t][t]+=i*i;}function zt(e,t,n,r){for(let[a,s]of n)a.x=r[s];let i=1/0,o=-1/0;for(let a of e){let s=a[0],u=a[a.length-1];i=Math.min(i,s.x-t(void 0,s)),o=Math.max(o,u.x+t(u,void 0));}for(let a of n.keys())a.x-=i;return o-i}function Ge(e){return kn(Ne(e,t=>A(t.children(),n=>n.y-t.y)))}function ho([e,t,n]){if(e<=0||t<=0||n<=0)throw D`simplex weights must be positive, but got: ${e}, ${t}, ${n}`}function Wi(e,t){if(typeof t!="function"){let[n,r,i]=t;return (o,a)=>{switch(+(o.data.role==="node")+ +(a.data.role==="node")){case 0:return i;case 1:return r;case 2:return n;default:throw te`invalid count`}}}else {let n=new Map;for(let r of Ne(e,i=>i))if(r.data.role==="node"){let i=r.data.node,o=new Map;for(let a of i.childLinks()){let{target:s}=a,u=t(a);ho(u),o.set(s,u);}n.set(i,o);}return (r,i)=>{if(r.data.role==="link"){let{source:o,target:a}=r.data.link,[,s,u]=n.get(o).get(a);return i.data.role==="link"?u:s}else if(i.data.role==="link"){let{source:o,target:a}=i.data.link,[,s]=n.get(o).get(a);return s}else {let[o]=n.get(r.data.node).get(i.data.node);return o}}}}function mo(e){function t(r,i){var b;let o={},a={},s=Wi(r,e.weight),u=new Map,d=0;for(let y of r)for(let h of y)if(!u.has(h)){let N=`${d++}`;u.set(h,N),o[N]={};}function l(y){return u.get(y)}for(let y of r)for(let[h,N]of Q(y)){let v=l(h),L=l(N),k=`layer ${v} -> ${L}`,w=i(h,N);a[k]={min:w},o[v][k]=-1,o[L][k]=1;}let f=Ge(u.keys());for(let y of u.keys()){let h=l(y);for(let N of y.children()){let v=l(N),L=`link ${h} -> ${v}`,k=`${L} parent`;a[k]={min:0};let w=`${L} child`;a[w]={min:0},o[h][k]=1,o[h][w]=-1,o[v][k]=-1,o[v][w]=1;let S=s(y,N),O=(N.y-y.y)/f;o[L]={opt:S/O,[k]:1,[w]:1};}}let p=fe("opt","min",o,a);for(let[y,h]of u)y.x=(b=p[h])!=null?b:0;let m=0,g=0;for(let y of r){let h=y[0];m=Math.min(m,h.x-i(void 0,h));let N=y[y.length-1];g=Math.max(g,N.x+i(N,void 0));}for(let y of u.keys())y.x-=m;let c=g-m;if(c<=0)throw D`must assign nonzero width to at least one node; double check the callback passed to \`sugiyama().nodeSize(...)\``;return c}function n(r){if(r===void 0)return e.weight;{typeof r!="function"&&ho(r);let i=e,{weight:o}=i,a=V(i,["weight"]);return mo(R(T({},a),{weight:r}))}}return t.weight=n,t.d3dagBuiltin=true,t}function Ln(...e){if(e.length)throw D`got arguments to coordSimplex(${e}); you probably forgot to construct coordSimplex before passing to coord: \`sugiyama().coord(coordSimplex())\`, note the trailing "()"`;return mo({weight:[1,2,8]})}function go(e,t){let n=new Map,r=new Map(e.map((o,a)=>[o,a]));function i(o,a){var u;let s=(u=n.get(o))==null?void 0:u.get(a);if(s!==void 0)return s;if(r.has(o)||r.has(a))return  -1/0;{let d=0;for(let[p,m]of t(o)){let g=r.get(p);for(let[c,b]of t(a)){let y=r.get(c);d+=Math.sign(g-y)*m*b;}}let l=n.get(o);l===void 0?n.set(o,new Map([[a,d]])):l.set(a,d);let f=n.get(a);return f===void 0?n.set(a,new Map([[o,-d]])):f.set(o,-d),d}}return i}function Ai(e,t){let n=[[0,e.length]],r;for(;r=n.pop();){let[i,o]=r;if(i>=o)continue;let a=0,s=o;for(let u=i;u<o-1;++u){let d=t(e[u],e[u+1]);d>a&&(a=d,s=u);}if(s!==o){let u=e[s+1];e[s+1]=e[s],e[s]=u,n.push([i,s],[s+2,o]);}}}function Ui(e,t){let n=Array(e.length*(e.length-1)/2);for(;;){let r=0;for(let d=1;d<e.length;++d){let l=0,f=r;for(let p=d-1;p>=0;--p)n[f]=l,l+=t(e[p],e[d]),f-=e.length-p-1;r+=e.length-d;}let i=0,o=0,a=0,s=0;for(let d=0;d<e.length-1;++d){let l=0;for(let f=d+1;f<e.length;++f){l+=t(e[d],e[f]);let p=n[i++]+l;p>o&&(o=p,a=d,s=f);}}if(o===0)break;let u=e[s];e[s]=e[a],e[a]=u;}}function wn({baseOp:e,doScan:t}){function n(o,a,s){e(o,a,s);let u=s?a:o,d=s?go(o,l=>l.parentCounts()):go(a,l=>l.childCounts());t?Ui(u,d):Ai(u,d);}function r(o){return o===void 0?e:wn({baseOp:o,doScan:t})}n.base=r;function i(o){return o===void 0?t:wn({baseOp:e,doScan:o})}return n.scan=i,n.d3dagBuiltin=true,n}function Dn(...e){if(e.length)throw D`got arguments to twolayerGreedy(${e}); you probably forgot to construct twolayerGreedy before passing to order: \`decrossTwoLayer().order(twolayerGreedy())\`, note the trailing "()"`;return wn({baseOp:()=>{},doScan:false})}function Sn(e,t){function n(r,i){let o=r?e(r):0,a=i?e(i):0,s=(o+a)/2;return r&&i?s+t:s}return n}function Bt(e){let t=0;for(let[n,r]of Q(e)){let i=new Map(r.map((o,a)=>[o,a]));for(let[o,a]of n.entries())for(let s of n.slice(o+1))for(let[u,d]of a.childCounts())for(let[l,f]of s.childCounts())u!==l&&i.get(u)>i.get(l)&&(t+=d*f);}return t}function yo(e){function t(r){let i;e.topDown?i=Oe(o=>[...o.children()].sort((a,s)=>s.nchildren()-a.nchildren()),...Ne(r,o=>[...be(o,a=>!a.nparents())].sort((a,s)=>s.nchildren()-a.nchildren()))):i=Oe(o=>[...o.parents()].sort((a,s)=>s.nparents()-a.nparents()),...Ne(q(r,r.length-1,-1,-1),o=>[...be(o,a=>!a.nchildren())].sort((a,s)=>s.nparents()-a.nparents())));for(let o of r)o.splice(0);for(let o of i){let{data:a}=o;if(a.role==="node")for(let s=a.topLayer;s<=a.bottomLayer;++s)r[s].push(o);else r[a.layer].push(o);}}function n(r){return r===void 0?e.topDown:yo({topDown:r})}return t.topDown=n,t.d3dagBuiltin=true,t}function Vt(...e){if(e.length)throw D`got arguments to decrossDfs(${e}); you probably forgot to construct decrossDfs before passing to decross: \`sugiyama().decross(decrossDfs())\`, note the trailing "()"`;return yo({topDown:true})}function $t(e){function t(o){let a=o.slice().reverse(),s=o.map(l=>l.slice()),u=Bt(s),d=e.inits.length?e.inits:[()=>{}];for(let l of d){l(o);let f=true;for(let p=0;p<e.passes&&f;++p){f=false;for(let[c,b]of Q(o)){let y=b.slice();e.order(c,b,true),b.some((h,N)=>y[N]!==h)&&(f=true);}let m=Bt(o);m<u&&(u=m,s=o.map(c=>c.slice()));for(let[c,b]of Q(a)){let y=b.slice();e.order(b,c,false),b.some((h,N)=>y[N]!==h)&&(f=true);}let g=Bt(o);g<u&&(u=g,s=o.map(c=>c.slice()));}}o.splice(0,o.length,...s);}function n(o){if(o===void 0)return e.order;{let a=e,{order:s}=a,u=V(a,["order"]);return $t(R(T({},u),{order:o}))}}t.order=n;function r(o){if(o===void 0)return [...e.inits];{let a=e,{inits:s}=a,u=V(a,["inits"]);return $t(R(T({},u),{inits:o}))}}t.inits=r;function i(o){if(o===void 0)return e.passes;if(o<=0)throw D`number of passes must be positive`;return $t(R(T({},e),{passes:o}))}return t.passes=i,t.d3dagBuiltin=true,t}function On(...e){if(e.length)throw D`got arguments to decrossTwoLayer(${e}); you probably forgot to construct decrossTwoLayer before passing to decross: \`sugiyama().decross(decrossTwoLayer())\`, note the trailing "()"`;return $t({order:Dn().base(vn()),inits:[Vt().topDown(true),Vt().topDown(false)],passes:24})}function In(e,t){return +!!(e&&t)}function Cn(e){function t(i,o){var y;let a={},s={},u=new Map(A(i.nodes(),(h,N)=>[h,N.toString()]));function d(h){return u.get(h)}function l(h){return a[d(h)]}function f(h,N,v,L,k=0){let w=l(N),S=l(v),O=`${h}: ${d(N)} -> ${d(v)}`;s[O]={min:L},w[O]=-1,S[O]=1,w.opt+=k,S.opt-=k;}function p(h,N,v){f(`${h} before`,N,v,0),f(`${h} after`,v,N,0);}let m=[],g=new Map;for(let h of i.nodes()){let N=d(h);a[N]={opt:0};let v=e.rank(h);v!==void 0&&m.push([v,h]);let L=e.group(h);if(L!==void 0){let k=g.get(L);k?k.push(h):g.set(L,[h]);}}let c=new Set;for(let h of i.topological(e.rank)){for(let[N,v]of h.childCounts())c.has(N)?f("link",N,h,o(N,h),v):f("link",h,N,o(h,N),v);c.add(h);}let b=m.sort(([h],[N])=>h-N);for(let[[h,N],[v,L]]of Q(b))h<v?f("rank",N,L,o(N,L)):p("rank",N,L);for(let h of g.values())for(let[N,v]of Q(h))p("group",N,v);try{let h=fe("opt","max",a,s,{}),N=0,v=0;for(let L of i.nodes()){let k=(y=h[d(L)])!=null?y:0;L.y=k,N=Math.min(N,k-o(void 0,L)),v=Math.max(v,k+o(L,void 0));}for(let L of i.nodes())L.y-=N;return v-N}catch(h){throw g.size?D`could not find a feasible simplex layout; this is likely due to group constraints producing an infeasible layout, try relaxing the functions you're passing to \`layeringSimplex().group(...)\``:te`could not find a feasible simplex solution`}}function n(i){if(i===void 0)return e.rank;{let o=e,{rank:a}=o,s=V(o,["rank"]);return Cn(R(T({},s),{rank:i}))}}t.rank=n;function r(i){if(i===void 0)return e.group;{let o=e,{group:a}=o,s=V(o,["group"]);return Cn(R(T({},s),{group:i}))}}return t.group=r,t.d3dagBuiltin=true,t}function No(){}function Tn(...e){if(e.length)throw D`got arguments to layeringSimplex(${e}); you probably forgot to construct layeringSimplex before passing to layering: \`sugiyama().layering(layeringSimplex())\`, note the trailing "()"`;return Cn({rank:No,group:No})}function bo(e,t,n,r){for(let[o,[a,s]]of t){let u=a.bottomLayer;for(let d of o.childLinks()){let[l,f]=t.get(d.target),p=l.topLayer;if(p>u){let m=s;for(let g=u+1;g<p;++g){let c=e.node({link:d,layer:g,role:"link"});m.child(c,void 0),m=c;}m.child(f);}else if(p<u){let m=f;for(let g=p+1;g<u;++g){let c=e.node({link:d,layer:g,role:"link"});m.child(c,void 0),m=c;}m.child(s);}else throw oe`layering ${r} assigned nodes with an edge to the same layer`}}let i=Array(n).fill(null).map(()=>[]);for(let o of e.nodes()){let{data:a}=o;if(a.role==="node"){let{topLayer:s,bottomLayer:u}=a;for(let d=s;d<=u;++d)i[d].push(o);}else {let{layer:s}=a;i[s].push(o);}}for(let o of i)if(!o.length)throw oe`layering ${r} didn't assign a node to every layer`;return i}function Gn(e,t,n,r,i){let o=ue(),a=Array(r).fill(false),s=new Map;for(let p of e.nodes()){let m=p.uy;if(m===void 0)throw oe`layering ${i} didn't assign a layer to a node`;if(m<0||m>=r)throw oe`layering ${i} assigned node an invalid layer: ${m}`;{let g=se(p.parentCounts(),p.childCounts());!a[m]&&Zt(g,([{uy:b},y])=>y>1&&b===m-1)&&(a[m]=true);let c={node:p,topLayer:m,bottomLayer:m,role:"node"};s.set(p,[c,o.node(c)]);}}let u=0,d=a.map(p=>u+=+p);for(let[p]of s.values()){let m=d[p.topLayer];p.topLayer+=m,p.bottomLayer+=m;}let l=bo(o,s,r+u,i),f=-n;for(let p of l){f+=n;let m=Math.max(-n,...A(p,({data:c})=>c.role==="node"?t(c.node):-1/0)),g=f+m/2;for(let c of p)c.y=g;f+=m;}return [l,f]}function Mn(e){for(let t of e)for(let n of t)if(n.data.role==="node"){let{node:r}=n.data;r.x=n.x,r.y=n.y;for(let i of n.children()){let o=[[n.x,n.y]],a;for(;i.data.role==="link";)a=i.data.link,o.push([i.x,i.y]),[i]=i.children();o.push([i.x,i.y]);let s=i.data.node,u=se(r.childLinksTo(s),r.parentLinksTo(s));a||([a]=u),a.source!==r&&o.reverse(),a.points.splice(0,a.points.length,...o);}}}function Rn(e,t=0){return ({data:n})=>n.role==="node"?e(n.node):t}function xo(e,t,n,r,i=.001){for(let o of e){for(let a of o)if(a.ux===void 0)throw oe`coord ${r} didn't assign an x to every node`;for(let[[a,s],[u,d]]of Q(se([[void 0,0]],A(o,l=>[l,l.x]),[[void 0,n]])))if(d-s<t(a,u)-i)throw oe`coord ${r} assigned nodes too close for separation`}}function Me(e,t){function n(d){let l;if(!d.nnodes())l={width:0,height:0};else {let[f,p]=bn(Tt(e.nodeSize)),[m,g]=t.gap,c=e.layering(d,In)+1,[b,y]=Gn(d,p,g,c,e.layering);e.decross(b);let h=Sn(Rn(f),m),N=e.coord(b,h);xo(b,h,N,e.coord),Mn(b),l={width:N,height:y};}for(let f of e.tweaks)l=f(d,l);return l}function r(d){if(d===void 0)return e.layering;{let l=e,{layering:f}=l,p=V(l,["layering"]);return Me(R(T({},p),{layering:d}),t)}}n.layering=r;function i(d){if(d===void 0)return e.decross;{let l=e,{decross:f}=l,p=V(l,["decross"]);return Me(R(T({},p),{decross:d}),t)}}n.decross=i;function o(d){if(d===void 0)return e.coord;{let l=e,{coord:f}=l,p=V(l,["coord"]);return Me(R(T({},p),{coord:d}),t)}}n.coord=o;function a(d){if(d===void 0)return e.tweaks;{let l=e,{tweaks:f}=l,p=V(l,["tweaks"]);return Me(R(T({},p),{tweaks:d}),t)}}n.tweaks=a;function s(d){if(d===void 0)return e.nodeSize;if(typeof d!="function"&&(d[0]<=0||d[1]<=0)){let[f,p]=d;throw D`constant nodeSize must be positive, but got: [${f}, ${p}]`}else {let l=e,{nodeSize:f}=l,p=V(l,["nodeSize"]);return Me(R(T({},p),{nodeSize:d}),t)}}n.nodeSize=s;function u(d){if(d!==void 0){let[l,f]=d;if(l<0||f<0)throw D`gap width (${l}) and height (${f}) must be non-negative`;return Me(e,R(T({},t),{gap:d}))}else {let[l,f]=t.gap;return [l,f]}}return n.gap=u,n}function ji(...e){if(e.length)throw D`got arguments to sugiyama(${e}), but constructor takes no arguments; these were probably meant as data which should be called as \`sugiyama()(...)\``;return Me({layering:Tn(),decross:On(),coord:Ln(),nodeSize:[1,1],tweaks:[]},{gap:[1,1]})}function Zi(e,t){if(typeof e!="function")return ()=>e;{let n=new Map;for(let r of Ne(t,i=>i))if(r.data.role==="node"){let i=r.data.node,o=new Map;for(let a of i.childLinks()){let s=e(a);if(s<0)throw D`link weights must be non-negative; double check the accessor passed into \`coordQuad().vertWeak(...)\``;o.set(a.target,s);}n.set(i,o);}return (r,i)=>n.get(r).get(i)}}function zn(e,t,n){if(typeof e!="function")return ()=>e;{let r=new Map;return i=>{let o=r.get(i);if(o===void 0){let a=e(i);if(a<0)throw new Error(`${t} weights must be non-negative; double check the accessor passed into \`coordQuad().${n}(...)\``);return r.set(i,a),a}else return o}}}function Ee(e){function t(s,u){let d=co(s),[l,f,p,m]=Mt(s,d,u,e.comp),g=Zi(e.vertWeak,s),c=zn(e.vertStrong,"link","vertStrong"),b=zn(e.linkCurve,"link","linkCurve"),y=zn(e.nodeCurve,"node","nodeCurve"),h=Ge(d.keys());for(let[v,L]of d){let k=v.data,w=k.role==="node"?k.node:k.link.source;for(let S of v.children()){let O=d.get(S),I=S.data,z=I.role==="node"?I.node:I.link.target,M=k.role==="node"?g(w,z):c(k.link),$=I.role==="node"?g(w,z):c(I.link),_=I.role==="node"?y(I.node):b(I.link),W=(S.y-v.y)/h;po(l,L,O,(M+$)/W);for(let B of S.children()){let Z=d.get(B),E=(B.y-S.y)/h;Rt(l,L,O,Z,_/W,_/E);}}}let N;try{let v=Gt(l,f,p,m);N=zt(s,u,d,v);}catch(v){throw typeof v=="string"?te`${v}`:te`undefined quadprog exception`}if(N<=0)throw D`must assign nonzero width to at least one node; double check the callback passed to \`sugiyama().nodeSize(...)\``;return N}function n(s){if(s===void 0)return e.vertWeak;if(typeof s=="number"&&s<0)throw D`vertWeak must be non-negative but was: ${s}`;{let u=e,{vertWeak:d}=u,l=V(u,["vertWeak"]);return Ee(R(T({},l),{vertWeak:s}))}}t.vertWeak=n;function r(s){if(s===void 0)return e.vertStrong;if(typeof s=="number"&&s<0)throw D`vertStrong must be non-negative but was: ${s}`;{let u=e,{vertStrong:d}=u,l=V(u,["vertStrong"]);return Ee(R(T({},l),{vertStrong:s}))}}t.vertStrong=r;function i(s){if(s===void 0)return e.linkCurve;if(typeof s=="number"&&s<0)throw D`linkCurve must be non-negative but was: ${s}`;{let u=e,{linkCurve:d}=u,l=V(u,["linkCurve"]);return Ee(R(T({},l),{linkCurve:s}))}}t.linkCurve=i;function o(s){if(s===void 0)return e.nodeCurve;if(typeof s=="number"&&s<0)throw D`nodeCurve must be non-negative but was: ${s}`;{let u=e,{nodeCurve:d}=u,l=V(u,["nodeCurve"]);return Ee(R(T({},l),{nodeCurve:s}))}}t.nodeCurve=o;function a(s){if(s===void 0)return e.comp;if(s<=0)throw D`compress weight must be positive, but was: ${s}`;return Ee(R(T({},e),{comp:s}))}return t.compress=a,t.d3dagBuiltin=true,t}function Ji(...e){if(e.length)throw D`got arguments to coordQuad(${e}); you probably forgot to construct coordQuad before passing to coord: \`sugiyama().coord(coordQuad())\`, note the trailing "()"`;return Ee({vertWeak:1,vertStrong:0,linkCurve:1,nodeCurve:0,comp:1e-6})}function aa(e,t){for(let i of e.nodes()){let o=i.x;i.x=i.y,i.y=o;}for(let i of e.links())for(let o of i.points){let[a]=o;o[0]=o[1],o[1]=a;}let{width:n,height:r}=t;return {width:r,height:n}}function sa(e,t){let{height:n}=t;for(let r of e.nodes())r.y=n-r.y;for(let r of e.links())for(let i of r.points)i[1]=n-i[1];return t}function ua(e,t){let{width:n}=t;for(let r of e.nodes())r.x=n-r.x;for(let r of e.links())for(let i of r.points)i[0]=n-i[0];return t}function da(e="diagonal"){if(e==="diagonal")return aa;if(e==="vertical")return sa;if(e==="horizontal")return ua;throw D`invalid tweakFlip style: ${e}`}

    const Vertical = 'vertical';
    const Horizontal = 'horizontal';

    /**
     * Translates 'horizontal' and 'vertical' to whatever D3-DAG needs.
     */
    function translateOrientationToTweak(orientation) {
        if (orientation == Vertical) {
            return [];
        }
        else if (orientation == Horizontal) {
            return [da('diagonal')];
        }
        else {
            throw Error('Invalid orientation: ' + orientation);
        }
    }
    /**
     * Custom decrossing function for the Sugiyama layout.
     *
     * Sorting priorities for nodes within a layer are:
     *   1. Parent position (sum of indices of visible parents in the previous layer)
     *   2. Birth year (ascending)
     *   3. Name (alphabetical)
     *   4. Partner offset (places nodes without parents above/below their partner)
     *
     * This helps to keep partner nodes visually grouped and improves the readability
     * of the family tree layout.
     *
     * @param layers - The array of layers, each containing SugiNode<ClickableNode> nodes.
     */
    function customSugiyamaDecross(layers) {
        var _a, _b;
        const priorities = new Map();
        const clickableNodeToLayerNodeMap = new Map();
        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
            const layer = layers[layerIndex].filter((n) => n.data.role == 'node');
            const previousLayer = layerIndex > 0
                ? layers[layerIndex - 1].filter((n) => n.data.role == 'node')
                : null;
            const nodesWithoutParents = new Set();
            // determine the priority of each node
            for (let node of layer) {
                const cnode = node.data.node.data;
                clickableNodeToLayerNodeMap.set(cnode, node);
                // birth year e.g. 1990 or 60 for persons, otherwise 0
                const yearWeight = cnode.isPerson
                    ? ((_a = cnode.data.birthyear) !== null && _a !== void 0 ? _a : 0)
                    : 0;
                // name for persons, otherwise ZZZZZZ
                const nameWeight = cnode.isPerson
                    ? ((_b = cnode.data.name) !== null && _b !== void 0 ? _b : 'ZZZZZZ')
                    : 'ZZZZZZ';
                // sum of parent indices (layer positions) e.g. 1+2=3
                let parentWeight = 0;
                if (previousLayer) {
                    const parentIndices = cnode.visibleParents.map((p) => previousLayer.indexOf(clickableNodeToLayerNodeMap.get(p)));
                    if (parentIndices.length > 0) {
                        parentWeight = parentIndices.reduce((a, b) => a + b);
                    }
                    else {
                        // nodes without parents are processed separately below
                        nodesWithoutParents.add(node);
                    }
                }
                // save priority in map
                priorities.set(node, {
                    parentPos: parentWeight,
                    birthyear: yearWeight,
                    name: nameWeight,
                    partnerOffset: 0,
                });
            }
            // nodes without parents copy the priority of their partner
            const partnerCounter = new Map();
            nodesWithoutParents.forEach((node) => {
                var _a;
                const cnode = node.data.node.data;
                // find the partner node
                const cpartner = cnode.visiblePartners[0];
                const partner = clickableNodeToLayerNodeMap.get(cpartner);
                if (!partner)
                    return;
                // assign same priority
                const partnerPrio = priorities.get(partner);
                if (!partnerPrio)
                    return;
                const nodePrio = Object.assign({}, partnerPrio);
                priorities.set(node, nodePrio);
                // this part makes sure that parentless nodes are arranged
                // alternately above and below their partners
                let count = (_a = partnerCounter.get(cpartner)) !== null && _a !== void 0 ? _a : 0;
                partnerCounter.set(cpartner, count + 1);
                nodePrio.partnerOffset = count % 2 ? -1 : 1;
            });
            // debugging
            for (let node of layer) {
                // @ts-ignore
                node.data.node.data.data.priority = priorities.get(node);
            }
            // the actual sorting operation: re-arrange nodes based on their priority values
            layers[layerIndex] = layer.sort((a, b) => {
                const prioA = priorities.get(a);
                const prioB = priorities.get(b);
                if (!prioA || !prioB)
                    return 0;
                if (prioA.parentPos !== prioB.parentPos)
                    return prioA.parentPos - prioB.parentPos;
                if (prioA.birthyear !== prioB.birthyear)
                    return prioA.birthyear - prioB.birthyear;
                if (prioA.name !== prioB.name)
                    return prioA.name.localeCompare(prioB.name);
                else
                    return prioA.partnerOffset - prioB.partnerOffset;
            });
        }
    }
    /**
     * Layout calculator using d3-dag's Sugiyama algorithm.
     * Responsible for computing node and link positions for the
     * family tree visualization.
     */
    class D3DAGLayoutCalculator {
        constructor(opts) {
            /**
             * Default options for configuring the layout algorithm.
             * Can be overwritten by passing `opts` argument to the
             * `D3DAGLayoutCalculator` constructor.
             */
            this.opts = {
                nodeSize: (node) => [50, 100],
                layering: Tn(),
                decross: customSugiyamaDecross,
                coord: Ji(),
                orientation: Horizontal,
            };
            this.opts = Object.assign(Object.assign({}, this.opts), opts);
        }
        /**
         * Calculates the layout for the given nodes.
         * Builds a temporary graph from the visible nodes, applies the Sugiyama layout,
         * and writes the computed x/y coordinates back to the nodes.
         */
        calculateLayout(nodes) {
            // build a temporary graph from the visible nodes
            const builder = ai()
                .id((n) => n.data.id)
                .parentIds((n) => n.visibleParentIDs());
            const graph = builder(nodes);
            // define the layout
            const layout = ji()
                .nodeSize(this.opts.nodeSize)
                .layering(this.opts.layering)
                .decross(this.opts.decross)
                .coord(this.opts.coord)
                .tweaks(translateOrientationToTweak(this.opts.orientation));
            // calculate the layout
            layout(graph);
            // write x and y back to original nodes
            const layoutedNodes = [...graph.nodes()].map((n) => {
                n.data.x = n.x;
                n.data.y = n.y;
                return n.data;
            });
            // unwrap links: replace source and target with ClickableNodes
            const layoutedLinks = [...graph.links()].map((l) => {
                return {
                    source: l.source.data,
                    target: l.target.data,
                };
            });
            return {
                nodes: layoutedNodes,
                links: layoutedLinks,
                orientation: this.opts.orientation,
            };
        }
    }

    const CPerson = 'person';
    const CUnion = 'union';

    /**
     * Returns all neighboring nodes (upstream and downstream) of this node.
     */
    function neighbors() {
        return [...this.children(), ...this.parents()];
    }
    /**
     * Returns all visible neighboring nodes.
     * Will be unions if this is a person. Will be persons if this is a union.
     */
    function visibleNeighbors() {
        return this.neighbors.filter((n) => n.data.visible);
    }
    /**
     * Returns all invisible neighboring nodes.
     * Will be unions if this is a person. Will be persons if this is a union.
     */
    function invisibleNeighbors() {
        return this.neighbors.filter((n) => !n.data.visible);
    }
    /**
     * Returns all visible downstream nodes.
     * Will be unions if this is a person. Will be persons if this is a union.
     */
    function visibleChildren() {
        return [...this.children()].filter((n) => n.data.visible);
    }
    /**
     * Returns all visible upstream nodes.
     * Will be unions if this is a person. Will be persons if this is a union.
     */
    function visibleParents() {
        return [...this.parents()].filter((n) => n.data.visible);
    }
    /**
     * Returns all visible partner nodes (other parents of shared children).
     * Will always be persons.
     */
    function visiblePartners() {
        return this.visibleChildren
            .map((c) => c.visibleParents)
            .flat()
            .filter((p) => p != this);
    }
    /**
     * Returns all neighboring nodes that were inserted by expanding this node.
     */
    function insertedNodes() {
        return this.neighbors.filter((n) => n.data.insertedBy === this);
    }
    /**
     * Returns true if this node can be expanded to show more neighbors.
     */
    function extendable() {
        return this.invisibleNeighbors.length > 0;
    }
    /**
     * Returns true if this node represents a union (family).
     */
    function isUnion() {
        return this.data.type == CUnion;
    }
    /**
     * Returns true if this node represents a person.
     */
    function isPerson() {
        return this.data.type == CPerson;
    }
    /**
     * Expands this node to show its neighbors. Recursively expands inserted nodes if applicable.
     * If `addInsertedNodes` is true, marks newly visible neighbors as inserted by this node.
     */
    function showNeighbors(addInsertedNodes = false) {
        if (addInsertedNodes) {
            for (let n of this.invisibleNeighbors) {
                n.data.insertedBy = this;
            }
        }
        for (let n of this.insertedNodes) {
            n.data.visible = true;
            // `addInsertedNodes` only for the clicked person and it's neighbor unions
            n.showNeighbors(addInsertedNodes && n.isUnion);
        }
    }
    /**
     * Recursively collapses this node and all inserted nodes.
     * If `resetInsertedNodes` is true, resets the `insertedBy` property of the hidden nodes.
     */
    function hideNeighbors(resetInsertedNodes = false) {
        for (let n of this.insertedNodes) {
            if (resetInsertedNodes) {
                n.data.insertedBy = null;
            }
            n.data.visible = false;
            n.hideNeighbors(false);
        }
    }
    /**
     * Handles a click event on this node.
     * Expands the node if it is extendable, otherwise collapses it.
     * Throws an error if called on a union node.
     */
    function click() {
        if (this.isUnion) {
            throw Error('Only person nodes can be clicked.');
        }
        if (this.extendable) {
            this.showNeighbors(true);
        }
        else {
            this.hideNeighbors(true);
        }
    }
    /**
     * Returns the IDs of all visible parent nodes.
     */
    function visibleParentIDs() {
        return this.visibleParents.map((p) => p.data.id);
    }
    /**
     * Augments the prototype of a d3-dag GraphNode to add ClickableNode properties and methods.
     * This enables interactive features such as expanding/collapsing nodes and partner/neighbor queries.
     * @param node - A GraphNode instance (any instance will do)
     */
    function augmentD3DAGNodeClass(node) {
        const prototype = node.constructor.prototype;
        Object.defineProperty(prototype, 'neighbors', {
            get: neighbors,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'visibleNeighbors', {
            get: visibleNeighbors,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'invisibleNeighbors', {
            get: invisibleNeighbors,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'visibleChildren', {
            get: visibleChildren,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'visibleParents', {
            get: visibleParents,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'visiblePartners', {
            get: visiblePartners,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'insertedNodes', {
            get: insertedNodes,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'extendable', {
            get: extendable,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'isUnion', {
            get: isUnion,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(prototype, 'isPerson', {
            get: isPerson,
            configurable: true,
            enumerable: false,
        });
        prototype.showNeighbors = showNeighbors;
        prototype.hideNeighbors = hideNeighbors;
        prototype.click = click;
        prototype.visibleParentIDs = visibleParentIDs;
    }

    /**
     * Imports family tree data (declarations see [familyTreeData](src/familyTreeData.ts))
     * and converts it into a graph of `ClickableNodes`.
     */
    class FamilyTreeDataV1Importer {
        /**
         * Imports the provided family tree data and returns an array of ClickableNodes.
         * The graph is constructed from the
         * `links` array of the `data` object by default. If no links are found, the `parentIds`
         * fields of each `person` and `union` are used as a fallback. Uses JavaScript's
         * prototype augmentation feature to add methods to `d3-dag`'s native node class.
         */
        import(data) {
            let graph;
            if ((!data.persons || Object.keys(data.persons).length === 0) &&
                (!data.links || data.links.length === 0)) {
                return [];
            }
            if (data.links && data.links.length > 0) {
                graph = this.buildGraphFromLinks(data);
            }
            else {
                graph = this.buildGraphFromParentIds(data);
            }
            const nodes = [...graph.nodes()];
            // add custom methods (augment prototype)
            augmentD3DAGNodeClass(nodes[0]);
            return nodes;
        }
        /**
         * Builds a graph from the provided data using the links array.
         * Each node is assigned its type, id, visibility, and insertedBy fields.
         */
        buildGraphFromLinks(data) {
            const builder = ei().nodeDatum((id) => {
                var _a, _b, _c, _d;
                if (id in data.persons) {
                    const person = data.persons[id];
                    Object.assign(person, {
                        id: id,
                        type: CPerson,
                        visible: (_a = person.visible) !== null && _a !== void 0 ? _a : id == data.start,
                        insertedBy: (_b = person.insertedBy) !== null && _b !== void 0 ? _b : null,
                    });
                    return person;
                }
                else if (id in data.unions) {
                    const union = data.unions[id];
                    Object.assign(union, Object.assign(Object.assign({}, data.unions[id]), { id: id, type: CUnion, visible: (_c = union.visible) !== null && _c !== void 0 ? _c : false, insertedBy: (_d = union.insertedBy) !== null && _d !== void 0 ? _d : null }));
                    return union;
                }
                else {
                    throw Error(`ID '${id}' not found in data.persons or data.unions.`);
                }
            });
            return builder(data.links);
        }
        /**
         * Builds a graph from the provided data using parentId relationships.
         * Each node is assigned its type, id, visibility, and insertedBy fields.
         */
        buildGraphFromParentIds(data) {
            const builder = ai();
            const personArr = Object.entries(data.persons).map(([id, person]) => {
                var _a, _b;
                Object.assign(person, {
                    id: id,
                    type: CPerson,
                    visible: (_a = person.visible) !== null && _a !== void 0 ? _a : id == data.start,
                    insertedBy: (_b = person.insertedBy) !== null && _b !== void 0 ? _b : null,
                });
                return person;
            });
            const unionArr = Object.entries(data.unions).map(([id, union]) => {
                var _a, _b;
                Object.assign(union, {
                    id: id,
                    type: CUnion,
                    visible: (_a = union.visible) !== null && _a !== void 0 ? _a : false,
                    insertedBy: (_b = union.insertedBy) !== null && _b !== void 0 ? _b : null,
                });
                return union;
            });
            const allNodes = [...personArr, ...unionArr];
            return builder(allNodes);
        }
    }

    function descending(a, b) {
      return a == null || b == null ? NaN
        : b < a ? -1
        : b > a ? 1
        : b >= a ? 0
        : NaN;
    }

    var noop = {value: () => {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames$1(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames$1(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$1(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    // Given something array like (or null), returns something that is strictly an
    // array. This is used to ensure that array-like objects passed to d3.selectAll
    // or selection.selectAll are converted into proper arrays when creating a
    // selection; we don’t ever want to create a selection backed by a live
    // HTMLCollection or NodeList. However, note that selection.selectAll will use a
    // static NodeList as a group, since it safely derived from querySelectorAll.
    function array(x) {
      return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function arrayAll(select) {
      return function() {
        return array(select.apply(this, arguments));
      };
    }

    function selection_selectAll(select) {
      if (typeof select === "function") select = arrayAll(select);
      else select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function childMatcher(selector) {
      return function(node) {
        return node.matches(selector);
      };
    }

    var find = Array.prototype.find;

    function childFind(match) {
      return function() {
        return find.call(this.children, match);
      };
    }

    function childFirst() {
      return this.firstElementChild;
    }

    function selection_selectChild(match) {
      return this.select(match == null ? childFirst
          : childFind(typeof match === "function" ? match : childMatcher(match)));
    }

    var filter = Array.prototype.filter;

    function children() {
      return Array.from(this.children);
    }

    function childrenFilter(match) {
      return function() {
        return filter.call(this.children, match);
      };
    }

    function selection_selectChildren(match) {
      return this.selectAll(match == null ? children
          : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = new Map,
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
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

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
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

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
          exit[i] = node;
        }
      }
    }

    function datum(node) {
      return node.__data__;
    }

    function selection_data(value, key) {
      if (!arguments.length) return Array.from(this, datum);

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    // Given some data, this returns an array-like view of it: an object that
    // exposes a length property and allows numeric indexing. Note that unlike
    // selectAll, this isn’t worried about “live” collections because the resulting
    // array will only be used briefly while data is being bound. (It is possible to
    // cause the data to change while iterating by using a key function, but please
    // don’t; we’d rather avoid a gratuitous copy.)
    function arraylike(data) {
      return typeof data === "object" && "length" in data
        ? data // Array, TypedArray, NodeList, array-like
        : Array.from(data); // Map, Set, iterable, string, or anything else
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
      } else {
        enter = enter.append(onenter + "");
      }
      if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
      }
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(context) {
      var selection = context.selection ? context.selection() : context;

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending;

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

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      return Array.from(this);
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      let size = 0;
      for (const node of this) ++size; // eslint-disable-line no-unused-vars
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

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
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

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
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
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

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

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

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    function contextListener(listener) {
      return function(event) {
        listener.call(this, event, this.__data__);
      };
    }

    function parseTypenames(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, options) {
      return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, options);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, options) {
      var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
      return this;
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    function* selection_iterator() {
      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) yield node;
        }
      }
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    function selection_selection() {
      return this;
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      selectChild: selection_selectChild,
      selectChildren: selection_selectChildren,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      selection: selection_selection,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch,
      [Symbol.iterator]: selection_iterator
    };

    function select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    function sourceEvent(event) {
      let sourceEvent;
      while (sourceEvent = event.sourceEvent) event = sourceEvent;
      return event;
    }

    function pointer(event, node) {
      event = sourceEvent(event);
      if (node === undefined) node = event.currentTarget;
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

    // These are typically used in conjunction with noevent to ensure that we can
    // preventDefault on the event.
    const nonpassivecapture = {capture: true, passive: false};

    function noevent$1(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function dragDisable(view) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", noevent$1, nonpassivecapture);
      } else {
        root.__noselect = root.style.MozUserSelect;
        root.style.MozUserSelect = "none";
      }
    }

    function yesdrag(view, noclick) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", null);
      if (noclick) {
        selection.on("click.drag", noevent$1, nonpassivecapture);
        setTimeout(function() { selection.on("click.drag", null); }, 0);
      }
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", null);
      } else {
        root.style.MozUserSelect = root.__noselect;
        delete root.__noselect;
      }
    }

    function define$1(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
        reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
        reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
        reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
        reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
        reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define$1(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
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
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
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

    define$1(Rgb, rgb, extend(Color, {
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
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
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
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
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

    define$1(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
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
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
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

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant$1 = x => () => x;

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
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

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

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    var degrees = 180 / Math.PI;

    var identity$1 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var svgNode;

    /* eslint-disable no-undef */
    function parseCss(value) {
      const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
    }

    function parseSvg(value) {
      if (value == null) return identity$1;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

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

    var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

      // p0 = [ux0, uy0, w0]
      // p1 = [ux1, uy1, w1]
      function zoom(p0, p1) {
        var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
            ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
            dx = ux1 - ux0,
            dy = uy1 - uy0,
            d2 = dx * dx + dy * dy,
            i,
            S;

        // Special case for u0 ≅ u1.
        if (d2 < epsilon2) {
          S = Math.log(w1 / w0) / rho;
          i = function(t) {
            return [
              ux0 + t * dx,
              uy0 + t * dy,
              w0 * Math.exp(rho * t * S)
            ];
          };
        }

        // General case.
        else {
          var d1 = Math.sqrt(d2),
              b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
              b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
              r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
              r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
          S = (r1 - r0) / rho;
          i = function(t) {
            var s = t * S,
                coshr0 = cosh(r0),
                u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
            return [
              ux0 + u * dx,
              uy0 + u * dy,
              w0 * coshr0 / cosh(rho * s + r0)
            ];
          };
        }

        i.duration = S * 1000 * rho / Math.SQRT2;

        return i;
      }

      zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
      };

      return zoom;
    })(Math.SQRT2, 2, 4);

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
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
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
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
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(elapsed => {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
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

    function init(node, id) {
      var schedule = get(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
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

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? interpolateRgb
          : (c = color(b)) ? (b = c, interpolateRgb)
          : interpolateString)(a, b);
    }

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

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

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
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get(this.node(), id).ease;
    }

    function easeVarying(id, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        set(this, id).ease = v;
      };
    }

    function transition_easeVarying(value) {
      if (typeof value !== "function") throw new Error;
      return this.each(easeVarying(this._id, value));
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });

        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      easeVarying: transition_easeVarying,
      end: transition_end,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          throw new Error(`transition ${id} not found`);
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    var constant = x => () => x;

    function ZoomEvent(type, {
      sourceEvent,
      target,
      transform,
      dispatch
    }) {
      Object.defineProperties(this, {
        type: {value: type, enumerable: true, configurable: true},
        sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
        target: {value: target, enumerable: true, configurable: true},
        transform: {value: transform, enumerable: true, configurable: true},
        _: {value: dispatch}
      });
    }

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

    var identity = new Transform(1, 0, 0);

    Transform.prototype;

    function nopropagation(event) {
      event.stopImmediatePropagation();
    }

    function noevent(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    // Ignore right-click, since that should open the context menu.
    // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
    function defaultFilter(event) {
      return (!event.ctrlKey || event.type === 'wheel') && !event.button;
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
      return this.__zoom || identity;
    }

    function defaultWheelDelta(event) {
      return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
    }

    function defaultTouchable() {
      return navigator.maxTouchPoints || ("ontouchstart" in this);
    }

    function defaultConstrain(transform, extent, translateExtent) {
      var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
          dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
          dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
          dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
      return transform.translate(
        dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
        dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
      );
    }

    function zoom() {
      var filter = defaultFilter,
          extent = defaultExtent,
          constrain = defaultConstrain,
          wheelDelta = defaultWheelDelta,
          touchable = defaultTouchable,
          scaleExtent = [0, Infinity],
          translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
          duration = 250,
          interpolate = interpolateZoom,
          listeners = dispatch("start", "zoom", "end"),
          touchstarting,
          touchfirst,
          touchending,
          touchDelay = 500,
          wheelDelay = 150,
          clickDistance2 = 0,
          tapDistance = 10;

      function zoom(selection) {
        selection
            .property("__zoom", defaultTransform)
            .on("wheel.zoom", wheeled, {passive: false})
            .on("mousedown.zoom", mousedowned)
            .on("dblclick.zoom", dblclicked)
          .filter(touchable)
            .on("touchstart.zoom", touchstarted)
            .on("touchmove.zoom", touchmoved)
            .on("touchend.zoom touchcancel.zoom", touchended)
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }

      zoom.transform = function(collection, transform, point, event) {
        var selection = collection.selection ? collection.selection() : collection;
        selection.property("__zoom", defaultTransform);
        if (collection !== selection) {
          schedule(collection, transform, point, event);
        } else {
          selection.interrupt().each(function() {
            gesture(this, arguments)
              .event(event)
              .start()
              .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
              .end();
          });
        }
      };

      zoom.scaleBy = function(selection, k, p, event) {
        zoom.scaleTo(selection, function() {
          var k0 = this.__zoom.k,
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return k0 * k1;
        }, p, event);
      };

      zoom.scaleTo = function(selection, k, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t0 = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
              p1 = t0.invert(p0),
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
        }, p, event);
      };

      zoom.translateBy = function(selection, x, y, event) {
        zoom.transform(selection, function() {
          return constrain(this.__zoom.translate(
            typeof x === "function" ? x.apply(this, arguments) : x,
            typeof y === "function" ? y.apply(this, arguments) : y
          ), extent.apply(this, arguments), translateExtent);
        }, null, event);
      };

      zoom.translateTo = function(selection, x, y, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
          return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
            typeof x === "function" ? -x.apply(this, arguments) : -x,
            typeof y === "function" ? -y.apply(this, arguments) : -y
          ), e, translateExtent);
        }, p, event);
      };

      function scale(transform, k) {
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
        return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
      }

      function translate(transform, p0, p1) {
        var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
        return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
      }

      function centroid(extent) {
        return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
      }

      function schedule(transition, transform, point, event) {
        transition
            .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
            .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
            .tween("zoom", function() {
              var that = this,
                  args = arguments,
                  g = gesture(that, args).event(event),
                  e = extent.apply(that, args),
                  p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                  w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                  a = that.__zoom,
                  b = typeof transform === "function" ? transform.apply(that, args) : transform,
                  i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
              return function(t) {
                if (t === 1) t = b; // Avoid rounding error on end.
                else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
                g.zoom(null, t);
              };
            });
      }

      function gesture(that, args, clean) {
        return (!clean && that.__zooming) || new Gesture(that, args);
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
          if (event) this.sourceEvent = event;
          return this;
        },
        start: function() {
          if (++this.active === 1) {
            this.that.__zooming = this;
            this.emit("start");
          }
          return this;
        },
        zoom: function(key, transform) {
          if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
          if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
          if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
          this.that.__zoom = transform;
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
        emit: function(type) {
          var d = select(this.that).datum();
          listeners.call(
            type,
            this.that,
            new ZoomEvent(type, {
              sourceEvent: this.sourceEvent,
              target: zoom,
              transform: this.that.__zoom,
              dispatch: listeners
            }),
            d
          );
        }
      };

      function wheeled(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var g = gesture(this, args).event(event),
            t = this.__zoom,
            k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
            p = pointer(event);

        // If the mouse is in the same location as before, reuse it.
        // If there were recent wheel events, reset the wheel idle timeout.
        if (g.wheel) {
          if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
            g.mouse[1] = t.invert(g.mouse[0] = p);
          }
          clearTimeout(g.wheel);
        }

        // If this wheel event won’t trigger a transform change, ignore it.
        else if (t.k === k) return;

        // Otherwise, capture the mouse point and location at the start.
        else {
          g.mouse = [p, t.invert(p)];
          interrupt(this);
          g.start();
        }

        noevent(event);
        g.wheel = setTimeout(wheelidled, wheelDelay);
        g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

        function wheelidled() {
          g.wheel = null;
          g.end();
        }
      }

      function mousedowned(event, ...args) {
        if (touchending || !filter.apply(this, arguments)) return;
        var currentTarget = event.currentTarget,
            g = gesture(this, args, true).event(event),
            v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
            p = pointer(event, currentTarget),
            x0 = event.clientX,
            y0 = event.clientY;

        dragDisable(event.view);
        nopropagation(event);
        g.mouse = [p, this.__zoom.invert(p)];
        interrupt(this);
        g.start();

        function mousemoved(event) {
          noevent(event);
          if (!g.moved) {
            var dx = event.clientX - x0, dy = event.clientY - y0;
            g.moved = dx * dx + dy * dy > clickDistance2;
          }
          g.event(event)
           .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
        }

        function mouseupped(event) {
          v.on("mousemove.zoom mouseup.zoom", null);
          yesdrag(event.view, g.moved);
          noevent(event);
          g.event(event).end();
        }
      }

      function dblclicked(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var t0 = this.__zoom,
            p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
            p1 = t0.invert(p0),
            k1 = t0.k * (event.shiftKey ? 0.5 : 2),
            t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

        noevent(event);
        if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
        else select(this).call(zoom.transform, t1, p0, event);
      }

      function touchstarted(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var touches = event.touches,
            n = touches.length,
            g = gesture(this, args, event.changedTouches.length === n).event(event),
            started, i, t, p;

        nopropagation(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          p = [p, this.__zoom.invert(p), t.identifier];
          if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
          else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
        }

        if (touchstarting) touchstarting = clearTimeout(touchstarting);

        if (started) {
          if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
          interrupt(this);
          g.start();
        }
      }

      function touchmoved(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t, p, l;

        noevent(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
          else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
        }
        t = g.that.__zoom;
        if (g.touch1) {
          var p0 = g.touch0[0], l0 = g.touch0[1],
              p1 = g.touch1[0], l1 = g.touch1[1],
              dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
              dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
          t = scale(t, Math.sqrt(dp / dl));
          p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        }
        else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
        else return;

        g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
      }

      function touchended(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t;

        nopropagation(event);
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, touchDelay);
        for (i = 0; i < n; ++i) {
          t = touches[i];
          if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
          else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
        }
        if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
        if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
        else {
          g.end();
          // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
          if (g.taps === 2) {
            t = pointer(t, this);
            if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
              var p = select(this).on("dblclick.zoom");
              if (p) p.apply(this, arguments);
            }
          }
        }
      }

      zoom.wheelDelta = function(_) {
        return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
      };

      zoom.filter = function(_) {
        return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
      };

      zoom.touchable = function(_) {
        return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
      };

      zoom.extent = function(_) {
        return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
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

    /**
     * D3Renderer is responsible for rendering the family tree using D3.
     * It handles SVG creation, zoom/pan, node and link rendering, tooltips, and labels.
     */
    class D3Renderer {
        /**
         * Constructs a new D3Renderer.
         * @param container - The HTML element to render into.
         * @param ft - The FamilyTree instance to visualize.
         * @param opts - Optional renderer options to override defaults.
         */
        constructor(container, ft, opts) {
            /** Default renderer options, can be overwritten via the constructor. */
            this.opts = {
                transitionDuration: 750, // ms
                linkPathFunction: D3Renderer.defaultLinkPathFunction,
                linkCSSClassFunction: D3Renderer.defaultLinkCSSClassFunction,
                nodeClickFunction: D3Renderer.defaultNodeClickFunction,
                nodeCSSClassFunction: D3Renderer.defaultNodeCSSClassFunction,
                nodeLabelFunction: D3Renderer.defaultNodeLabelFunction,
                nodeTooltipFunction: D3Renderer.defaultNodeTooltipFunction,
                nodeSizeFunction: D3Renderer.defaultNodeSizeFunction,
            };
            this.ft = ft;
            this.opts = Object.assign(Object.assign({}, this.opts), opts);
            this.container = container;
        }
        /** Gets the current container element. */
        get container() {
            return this._container;
        }
        /** Sets the container element and initializes the SVG and tooltip. */
        set container(c) {
            this._container = c;
            this.initializeContainer();
        }
        /** Returns true if running in a JSDOM environment (used for testing). */
        get isJSDOM() {
            return /jsdom/i.test(this.container.ownerDocument.defaultView.navigator.userAgent);
        }
        /**
         * Initializes the SVG, group, zoom behavior, and tooltip div in the container.
         */
        initializeContainer() {
            // set container class
            select(this.container).attr('class', 'svg-container');
            // create svg element in container
            this.svg = select(this.container).append('svg');
            // create group element in svg
            this.g = this.svg.append('g').attr('transform', 'translate(0, 0)');
            // add zoom and pan behavior
            this.zoom = zoom().on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });
            this.svg.call(this.zoom);
            // create tooltip div
            this.tooltipDiv = select(this.container)
                .append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0)
                .style('visibility', 'hidden');
        }
        /**
         * Default function to generate the SVG path for a link, using S-bends
         * for vertical or horizontal orientation.
         */
        static defaultLinkPathFunction(link, orientation) {
            function vertical_s_bend(s, d) {
                // Creates a diagonal curve fit for vertically oriented trees
                return `M ${s.x} ${s.y} 
        C ${s.x} ${(s.y + d.y) / 2},
        ${d.x} ${(s.y + d.y) / 2},
        ${d.x} ${d.y}`;
            }
            function horizontal_s_bend(s, d) {
                // Creates a diagonal curve fit for horizontally oriented trees
                return `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`;
            }
            const s = link.source;
            const d = link.target;
            return orientation == Vertical
                ? vertical_s_bend(s, d)
                : horizontal_s_bend(s, d);
        }
        /**
         * Default node click handler: delegates to the FamilyTree's nodeClickHandler.
         */
        static defaultNodeClickFunction(node, ft) {
            ft.nodeClickHandler(node);
        }
        /**
         * Default function to generate labels for a node.
         * Returns an array of strings containing name, birthyear and deathyear.
         * Each array entry representing a line of the label.
         */
        static defaultNodeLabelFunction(node, missingData = '?') {
            if (node.isUnion)
                return [];
            const { name, birthyear, deathyear } = node.data;
            const lines = [
                name,
                `${birthyear !== null && birthyear !== void 0 ? birthyear : missingData} - ${deathyear !== null && deathyear !== void 0 ? deathyear : missingData}`,
            ];
            return lines;
        }
        /**
         * Default function to generate the tooltip for a node.
         * Returns a formatted HTML string with name, birth, and death info.
         */
        static defaultNodeTooltipFunction(node, missingData = '?') {
            if (node.isUnion)
                return;
            const { name, birthyear, birthplace, deathyear, deathplace } = node.data;
            const content = `
      <span style='margin-left: 2.5px;'>
        <b>${name}</b>
      </span><br>
      <table style="margin-top: 2.5px;">
        <tr>
          <td>born</td>
          <td>${birthyear} in ${birthplace}</td>
        </tr>
        <tr>
          <td>died</td>
          <td>${deathyear} in ${deathplace}</td>
        </tr>
      </table>`;
            // replace undefined entries with ?
            return content.replace(/undefined/g, missingData);
        }
        /**
         * Default function to determine the size of a node.
         * Returns 10 for persons, 0 for unions.
         */
        static defaultNodeSizeFunction(node) {
            if (node.isUnion)
                return 0;
            if (node.isPerson)
                return 10;
            return 0;
        }
        /**
         * Default function to determine the CSS class for a node.
         * Combines extendability (can be extended/collapsed) and type (person/union).
         */
        static defaultNodeCSSClassFunction(node) {
            const class1 = node.extendable ? 'extendable' : 'non-extendable';
            const class2 = node.data.type;
            return class1 + ' ' + class2;
        }
        /**
         * Default function to determine the CSS class for a link.
         * Returns 'link' for all links.
         */
        static defaultLinkCSSClassFunction(link) {
            return 'link';
        }
        /**
         * Renders the nodes (persons and unions), handling enter, update, and exit transitions.
         * @param nodes - The nodes to render.
         * @param previousPosition - Optional previous position for transitions.
         * @param newPosition - Optional new position for transitions.
         * @returns The selection of entering node groups.
         */
        renderNodes(nodes, previousPosition, newPosition) {
            const selection = this.g
                .selectAll('g')
                .data(nodes, (n) => n.data.id);
            const enteringGroups = selection.enter().append('g');
            // entering groups transition from clicked node old to final position
            enteringGroups
                .attr('transform', (d) => {
                const transitionStart = previousPosition !== null && previousPosition !== void 0 ? previousPosition : d;
                return 'translate(' + transitionStart.x + ',' + transitionStart.y + ')';
            })
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('class', 'node-group')
                .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
            enteringGroups
                .append('circle')
                .on('click', (event, d) => this.opts.nodeClickFunction(d, this.ft))
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('r', this.opts.nodeSizeFunction)
                .attr('class', (d) => this.opts.nodeCSSClassFunction(d));
            // exiting nodes move from current position to clicked node new position
            selection
                .exit()
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('transform', (d) => {
                const transitionEnd = newPosition !== null && newPosition !== void 0 ? newPosition : d;
                return 'translate(' + transitionEnd.x + ',' + transitionEnd.y + ')';
            })
                .remove();
            // update existing nodes
            selection
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
                .select('circle')
                .attr('class', (d) => this.opts.nodeCSSClassFunction(d));
            return enteringGroups;
        }
        /**
         * Renders the links as SVG paths, handling enter, update, and exit transitions.
         * @param layoutResult - The layout result containing links.
         * @param previousPosition - Optional previous position for transitions.
         * @param newPosition - Optional new position for transitions.
         */
        renderLinks(layoutResult, previousPosition, newPosition) {
            const links = layoutResult.links;
            const selection = this.g
                .selectAll('path')
                .data(links, (l) => l.source.data.id + l.target.data.id);
            // entering links transition from old clicked node position to final position
            selection
                .enter()
                .append('path')
                .attr('d', (link) => {
                const transitionStart = previousPosition !== null && previousPosition !== void 0 ? previousPosition : link.source;
                const transitionStartLink = {
                    source: transitionStart,
                    target: transitionStart,
                };
                return this.opts.linkPathFunction(transitionStartLink, layoutResult.orientation);
            })
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('d', (link) => {
                return this.opts.linkPathFunction(link, layoutResult.orientation);
            })
                .attr('class', this.opts.linkCSSClassFunction);
            // updated links transition from current position to new position
            selection
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('d', (link) => {
                return this.opts.linkPathFunction(link, layoutResult.orientation);
            });
            // exiting links transition from current position to clicked node new position
            selection
                .exit()
                .transition()
                .duration(this.opts.transitionDuration)
                .attr('d', (link) => {
                const transitionEnd = newPosition !== null && newPosition !== void 0 ? newPosition : link.target;
                const transitionEndLink = {
                    source: transitionEnd,
                    target: transitionEnd,
                };
                return this.opts.linkPathFunction(transitionEndLink, layoutResult.orientation);
            })
                .remove();
        }
        /**
         * Sets up tooltips for the given node selection.
         * Shows and hides the tooltip div on mouseover/mouseout.
         * @param nodeSelect - The d3 selection containing all nodes.
         */
        setupTooltips(nodeSelect) {
            const tooltip_div = this.tooltipDiv;
            const tooltip_func = this.opts.nodeTooltipFunction;
            nodeSelect.on('mouseover', function (event, node) {
                const tooltipContent = tooltip_func(node);
                if (tooltipContent)
                    tooltip_div.html(tooltipContent);
                else
                    return;
                const height = tooltip_div.node().getBoundingClientRect().height;
                tooltip_div
                    .style('left', event.pageX + 10 + 'px')
                    .style('top', event.pageY - height / 2 + 'px')
                    .transition()
                    .duration(200)
                    .style('opacity', 1)
                    .style('visibility', 'visible');
            });
            nodeSelect.on('mouseout', function (d) {
                tooltip_div
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .style('visibility', 'hidden');
            });
        }
        /**
         * Renders multi-line labels for entering nodes.
         * Each line is rendered as a separate <tspan> element.
         * @param enteringNodes - The selection of entering nodes.
         * @param cssClass - CSS class for the text element.
         * @param lineSep - Vertical separation between lines.
         * @param xOffset - Horizontal offset for the text.
         * @param dominantBaseline - SVG dominant-baseline attribute value.
         */
        renderLabels(enteringNodes, cssClass = 'node-label', lineSep = 14, xOffset = 13, dominantBaseline = 'central') {
            const nodeLabelFunction = this.opts.nodeLabelFunction;
            enteringNodes
                .append('text')
                .attr('class', cssClass)
                .attr('dominant-baseline', dominantBaseline)
                .selectAll('tspan')
                .data((node) => {
                const lines = nodeLabelFunction(node);
                const yOffset = (-lineSep * (lines.length - 1)) / 2;
                return lines.map((line, i) => ({
                    line,
                    dy: i === 0 ? yOffset : lineSep,
                }));
            })
                .enter()
                .append('tspan')
                .text((d) => d.line)
                .attr('x', xOffset)
                .attr('dy', (d) => d.dy);
        }
        /**
         * Sorts the DOM elements in the main group so that nodes are drawn on top of links.
         * Ensures correct visual stacking order.
         */
        sortDomElements() {
            const nodes_and_links = this.g
                .selectChildren()
                .nodes()
                .sort((a, b) => descending(a.tagName, b.tagName));
            nodes_and_links.forEach((el) => el.parentNode.appendChild(el));
        }
        /**
         * Main render function. Draws the current layout, updates nodes and links, tooltips, and labels.
         * Also centers the view on the clicked node unless running in JSDOM.
         * @param layoutResult - The layout result to render.
         * @param previousPosition - Optional previous position for transitions.
         * @param newPosition - Optional new position for transitions.
         */
        render(layoutResult, previousPosition, newPosition) {
            // add / update / remove links and nodes
            this.renderLinks(layoutResult, previousPosition, newPosition);
            const nodeSelect = this.renderNodes(layoutResult.nodes, previousPosition, newPosition);
            // ensure that nodes are drawn on top of links
            this.sortDomElements();
            // add tooltips and node labels
            this.setupTooltips(nodeSelect);
            this.renderLabels(nodeSelect, 'node-label', 14, 13, 'central');
            // center view on clicked node
            // work-around because JSDOM+d3-zoom throws errors
            if (!this.isJSDOM) {
                const centerNode = newPosition !== null && newPosition !== void 0 ? newPosition : layoutResult.nodes[0];
                if (!centerNode)
                    return;
                this.zoom.translateTo(this.svg.transition().duration(this.opts.transitionDuration), centerNode.x, centerNode.y);
            }
        }
        /**
         * Deletes all rendered elements from the SVG.
         */
        clear() {
            this.g.selectAll('*').remove();
        }
    }

    /**
     * Main class for managing, rendering, and interacting with a family tree.
     * Handles data import, layout calculation, rendering, and runtime modifications.
     */
    class FamilyTree {
        /**
         * Constructs a new FamilyTree instance.
         * @param data - The family tree data object.
         * @param container - The HTML element to render the tree into.
         * @param opts - Optional configuration for layout, rendering, and styling.
         */
        constructor(data, container, opts) {
            var _a;
            this.data = this.fixData(data);
            this.importer = new FamilyTreeDataV1Importer();
            this.layouter = new D3DAGLayoutCalculator(opts);
            this.renderer = new D3Renderer(container, this, opts);
            // import data
            this._nodes = this.importer.import(data);
            this._root =
                (_a = this.nodes.find((n) => n.data.id == data.start)) !== null && _a !== void 0 ? _a : this.nodes[0];
            // set all nodes visible if specified
            if (opts === null || opts === void 0 ? void 0 : opts.showAll) {
                for (let n of this.nodes) {
                    n.data.visible = true;
                }
            }
            this.render(undefined);
        }
        /** Returns the current array of nodes. */
        get nodes() {
            return this._nodes;
        }
        /** Sets the array of nodes. (private) */
        set nodes(nodes) {
            this._nodes = nodes;
        }
        /** Returns the current root node. */
        get root() {
            return this._root;
        }
        /** Sets the root node. (private) */
        set root(node) {
            this._root = node;
        }
        /**
         * Ensures that the data object has all required fields initialized.
         * @param data - The input family tree data.
         * @returns The fixed family tree data with all necessary fields.
         */
        fixData(data) {
            if (!data) {
                data = { start: '', persons: {}, unions: {}, links: [] };
            }
            if (!data.persons) {
                data.persons = {};
            }
            if (!data.unions) {
                data.unions = {};
            }
            if (!data.links) {
                data.links = [];
            }
            return data;
        }
        /**
         * Collects all nodes in the currently visible subgraph, starting from the root.
         * Uses a recursive depth-first search to gather all visible neighbors.
         * @returns An array of visible ClickableNodes.
         */
        getVisibleSubgraph() {
            function recursiveVisibleNeighborCollector(node, result = []) {
                if (!result.includes(node)) {
                    result = result.concat([node]);
                }
                const newVisibleNeighbors = node.visibleNeighbors.filter((n) => !result.includes(n));
                for (let n of newVisibleNeighbors) {
                    result = recursiveVisibleNeighborCollector(n, result);
                }
                return result;
            }
            if (!this.root) {
                return [];
            }
            return recursiveVisibleNeighborCollector(this.root);
        }
        /**
         * Renders the visible parts of the graph.
         * @param clickedNode - The node that was clicked, if any (used for transitions).
         */
        render(clickedNode) {
            const visibleNodes = this.getVisibleSubgraph();
            // get the old position of the clicked node for transitions
            const previousPosition = clickedNode
                ? { x: clickedNode.x, y: clickedNode.y }
                : undefined;
            // calculate new positions for all nodes
            const layoutResult = this.layouter.calculateLayout(visibleNodes);
            // get the new position of the clicked node for transitions
            const newPosition = clickedNode
                ? { x: clickedNode.x, y: clickedNode.y }
                : undefined;
            // render graph
            this.renderer.render(layoutResult, previousPosition, newPosition);
        }
        /**
         * Handles a click event on a node.
         * Expands or collapses the node and re-renders the tree.
         * @param node - The node that was clicked.
         */
        nodeClickHandler(node) {
            node.click();
            this.render(node);
        }
        /**
         * Re-imports the data and re-renders the tree.
         * Useful after modifying the underlying data (e.g. adding or removing nodes and links).
         */
        reimportData() {
            var _a;
            this.nodes = this.importer.import(this.data);
            this.root =
                (_a = this.nodes.find((n) => n.data.id == this.data.start)) !== null && _a !== void 0 ? _a : this.nodes[0];
            this.render(undefined);
        }
        /**
         * Generates a random string ID.
         * @returns A random string suitable for use as a person or union ID.
         */
        getRandomId() {
            return `${Math.random().toString(36).substring(2, 9)}`;
        }
        /**
         * Adds a new person to the family tree data and optionally re-renders. Assigns a
         * random ID if `data` doesn't contain one.
         * @param data - The person data to add.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        addPerson(data, render = true) {
            var _a;
            const id = (_a = data.id) !== null && _a !== void 0 ? _a : `p${this.getRandomId()}`;
            data.visible = true;
            this.data.persons[id] = data;
            if (render)
                this.reimportData();
        }
        /**
         * Removes a person and all associated links from the family tree data.
         * Optionally re-renders.
         * @param id - The ID of the person to remove.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        deletePerson(id, render = true) {
            delete this.data.persons[id];
            this.data.links = this.data.links.filter((l) => l[0] != id && l[1] != id // remove all links to/from this person
            );
            if (render)
                this.reimportData();
        }
        /**
         * Adds a new union (family) to the family tree data and optionally re-renders. Assigns a
         * random ID if `data` doesn't contain one.
         * @param data - The union data to add.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        addUnion(data, render = true) {
            var _a;
            const id = (_a = data.id) !== null && _a !== void 0 ? _a : `u${this.getRandomId()}`;
            data.visible = true;
            this.data.unions[id] = data;
            if (render)
                this.reimportData();
        }
        /**
         * Removes a union and all associated links from the family tree data.
         * Optionally re-renders.
         * @param id - The ID of the union to remove.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        deleteUnion(id, render = true) {
            delete this.data.unions[id];
            this.data.links = this.data.links.filter((l) => l[0] != id && l[1] != id // remove all links to/from this union
            );
            if (render)
                this.reimportData();
        }
        /**
         * Adds a new link (edge) between two nodes in the family tree data.
         * Optionally re-renders.
         * @param sourceId - The source node ID.
         * @param targetId - The target node ID.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        addLink(sourceId, targetId, render = true) {
            const link = [sourceId, targetId];
            // prevent duplicates
            if (this.data.links.some(([s, t]) => s === sourceId && t === targetId))
                return;
            this.data.links.push(link);
            if (render)
                this.reimportData();
        }
        /**
         * Removes a link (edge) between two nodes in the family tree data.
         * Optionally re-renders.
         * @param sourceId - The source node ID.
         * @param targetId - The target node ID.
         * @param render - If true, re-imports and re-renders the tree (default: true).
         */
        deleteLink(sourceId, targetId, render = true) {
            this.data.links = this.data.links.filter((l) => !(l[0] == sourceId && l[1] == targetId));
            if (render)
                this.reimportData();
        }
    }

    exports.FamilyTree = FamilyTree;

}));
//# sourceMappingURL=js_family_tree.umd.js.map
