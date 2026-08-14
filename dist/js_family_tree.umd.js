(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('console')) :
	typeof define === 'function' && define.amd ? define(['exports', 'console'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FT = {}, global.console));
})(this, (function (exports, console$1) { 'use strict';

	var C0=($,X)=>()=>(X||$((X={exports:{}}).exports,X),X.exports);var e1=C0((JZ,a1)=>{var b0=0.000000000000000000000000000000000000000000000000000000000001,t1,r1;do b0+=b0,t1=1+0.1*b0,r1=1+0.2*b0;while(t1<=1||r1<=1);a1.exports=b0;});var X5=C0((BZ,$5)=>{function X7($,X,Y){let K,Z;for(let U=1;U<=Y;U+=1){$[U][U]=1/$[U][U],Z=-$[U][U];for(let F=1;F<U;F+=1)$[F][U]*=Z;if(K=U+1,Y<K)break;for(let F=K;F<=Y;F+=1){Z=$[U][F],$[U][F]=0;for(let R=1;R<=U;R+=1)$[R][F]+=Z*$[R][U];}}}$5.exports=X7;});var K5=C0((EZ,Y5)=>{function Y7($,X,Y,K){let Z,U;for(Z=1;Z<=Y;Z+=1){U=0;for(let F=1;F<Z;F+=1)U+=$[F][Z]*K[F];K[Z]=(K[Z]-U)/$[Z][Z];}for(let F=1;F<=Y;F+=1){Z=Y+1-F,K[Z]/=$[Z][Z],U=-K[Z];for(let R=1;R<Z;R+=1)K[R]+=U*$[R][Z];}}Y5.exports=Y7;});var U5=C0((_Z,Z5)=>{function K7($,X,Y,K){let Z,U,F;for(let R=1;R<=Y;R+=1){if(K[1]=R,F=0,Z=R-1,Z<1){if(F=$[R][R]-F,F<=0)break;$[R][R]=Math.sqrt(F);}else {for(let J=1;J<=Z;J+=1){U=$[J][R];for(let B=1;B<J;B+=1)U-=$[B][R]*$[B][J];U/=$[J][J],$[J][R]=U,F+=U*U;}if(F=$[R][R]-F,F<=0)break;$[R][R]=Math.sqrt(F);}K[1]=0;}}Z5.exports=K7;});var R5=C0((VZ,F5)=>{var v$=e1(),Z7=X5(),U7=K5(),F7=U5();function R7($,X,Y,K,Z,U,F,R,J,B,E,A,_,M=0,P,V,W){let H,Q,q,N,C,G,O,S,D,T,z,x,w,y,v=Math.min(K,E),j=2*K+v*(v+5)/2+2*E+1;for(let I=1;I<=K;I+=1)V[I]=X[I];for(let I=K+1;I<=j;I+=1)V[I]=0;for(let I=1;I<=E;I+=1)_[I]=0,U[I]=0;let m=[];if(W[1]===0){if(F7($,Y,K,m),m[1]!==0){W[1]=2;return}U7($,Y,K,X),Z7($,Y,K);}else {for(let I=1;I<=K;I+=1){Z[I]=0;for(let k=1;k<=I;k+=1)Z[I]+=$[k][I]*X[k];}for(let I=1;I<=K;I+=1){X[I]=0;for(let k=I;k<=K;k+=1)X[I]+=$[I][k]*Z[k];}}F[1]=0;for(let I=1;I<=K;I+=1){Z[I]=X[I],F[1]+=V[I]*Z[I],V[I]=0;for(let k=I+1;k<=K;k+=1)$[k][I]=0;}F[1]=-F[1]/2,W[1]=0;let h=K,b=h+K,f=b+v,u=f+v+1,p=u+v*(v+1)/2,s=p+E;for(let I=1;I<=E;I+=1){G=0;for(let k=1;k<=K;k+=1)G+=R[k][I]*R[k][I];V[s+I]=Math.sqrt(G);}N=M,P[1]=0,P[2]=0;function X0(){P[1]+=1,j=p;for(let I=1;I<=E;I+=1){j+=1,G=-J[I];for(let k=1;k<=K;k+=1)G+=R[k][I]*Z[k];if(Math.abs(G)<v$)G=0;if(I>A)V[j]=G;else if(V[j]=-Math.abs(G),G>0){for(let k=1;k<=K;k+=1)R[k][I]=-R[k][I];J[I]=-J[I];}}for(let I=1;I<=N;I+=1)V[p+_[I]]=0;q=0,C=0;for(let I=1;I<=E;I+=1)if(V[p+I]<C*V[s+I])q=I,C=V[p+I]/V[s+I];if(q===0){for(let I=1;I<=N;I+=1)U[_[I]]=V[f+I];return 999}return 0}function e(){for(let I=1;I<=K;I+=1){G=0;for(let k=1;k<=K;k+=1)G+=$[k][I]*R[k][q];V[I]=G;}H=h;for(let I=1;I<=K;I+=1)V[H+I]=0;for(let I=N+1;I<=K;I+=1)for(let k=1;k<=K;k+=1)V[H+k]=V[H+k]+$[k][I]*V[I];x=true;for(let I=N;I>=1;I-=1){G=V[I],j=u+I*(I+3)/2,H=j-I;for(let k=I+1;k<=N;k+=1)G-=V[j]*V[b+k],j+=k;if(G/=V[H],V[b+I]=G,_[I]<=A)continue;if(G<=0)continue;x=false,Q=I;}if(!x){O=V[f+Q]/V[b+Q];for(let I=1;I<=N;I+=1){if(_[I]<=A)continue;if(V[b+I]<=0)continue;if(C=V[f+I]/V[b+I],C<O)O=C,Q=I;}}G=0;for(let I=h+1;I<=h+K;I+=1)G+=V[I]*V[I];if(Math.abs(G)<=v$){if(x)return W[1]=1,999;for(let I=1;I<=N;I+=1)V[f+I]=V[f+I]-O*V[b+I];return V[f+N+1]=V[f+N+1]+O,700}G=0;for(let I=1;I<=K;I+=1)G+=V[h+I]*R[I][q];if(S=-V[p+q]/G,w=true,!x){if(O<S)S=O,w=false;}for(let I=1;I<=K;I+=1)if(Z[I]+=S*V[h+I],Math.abs(Z[I])<v$)Z[I]=0;F[1]+=S*G*(S/2+V[f+N+1]);for(let I=1;I<=N;I+=1)V[f+I]=V[f+I]-S*V[b+I];if(V[f+N+1]=V[f+N+1]+S,w){N+=1,_[N]=q,j=u+(N-1)*N/2+1;for(let I=1;I<=N-1;I+=1)V[j]=V[I],j+=1;if(N===K)V[j]=V[K];else {for(let I=K;I>=N+1;I-=1){if(V[I]===0)continue;if(D=Math.max(Math.abs(V[I-1]),Math.abs(V[I])),T=Math.min(Math.abs(V[I-1]),Math.abs(V[I])),V[I-1]>=0)C=Math.abs(D*Math.sqrt(1+T*T/(D*D)));else C=-Math.abs(D*Math.sqrt(1+T*T/(D*D)));if(D=V[I-1]/C,T=V[I]/C,D===1)continue;if(D===0){V[I-1]=T*C;for(let k=1;k<=K;k+=1)C=$[k][I-1],$[k][I-1]=$[k][I],$[k][I]=C;}else {V[I-1]=C,z=T/(1+D);for(let k=1;k<=K;k+=1)C=D*$[k][I-1]+T*$[k][I],$[k][I]=z*($[k][I-1]+C)-$[k][I],$[k][I-1]=C;}}V[j]=V[N];}}else {G=-J[q];for(let I=1;I<=K;I+=1)G+=Z[I]*R[I][q];if(q>A)V[p+q]=G;else if(V[p+q]=-Math.abs(G),G>0){for(let I=1;I<=K;I+=1)R[I][q]=-R[I][q];J[q]=-J[q];}return 700}return 0}function A0(){if(j=u+Q*(Q+1)/2+1,H=j+Q,V[H]===0)return 798;if(D=Math.max(Math.abs(V[H-1]),Math.abs(V[H])),T=Math.min(Math.abs(V[H-1]),Math.abs(V[H])),V[H-1]>=0)C=Math.abs(D*Math.sqrt(1+T*T/(D*D)));else C=-Math.abs(D*Math.sqrt(1+T*T/(D*D)));if(D=V[H-1]/C,T=V[H]/C,D===1)return 798;if(D===0){for(let I=Q+1;I<=N;I+=1)C=V[H-1],V[H-1]=V[H],V[H]=C,H+=I;for(let I=1;I<=K;I+=1)C=$[I][Q],$[I][Q]=$[I][Q+1],$[I][Q+1]=C;}else {z=T/(1+D);for(let I=Q+1;I<=N;I+=1)C=D*V[H-1]+T*V[H],V[H]=z*(V[H-1]+C)-V[H],V[H-1]=C,H+=I;for(let I=1;I<=K;I+=1)C=D*$[I][Q]+T*$[I][Q+1],$[I][Q+1]=z*($[I][Q]+C)-$[I][Q+1],$[I][Q]=C;}return 0}function M0(){H=j-Q;for(let I=1;I<=Q;I+=1)V[H]=V[j],j+=1,H+=1;if(V[f+Q]=V[f+Q+1],_[Q]=_[Q+1],Q+=1,Q<N)return 797;return 0}function J0(){return V[f+N]=V[f+N+1],V[f+N+1]=0,_[N]=0,N-=1,P[2]+=1,0}y=0;while(true){if(y=X0(),y===999)return;while(true){if(y=e(),y===0)break;if(y===999)return;if(y===700)if(Q===N)J0();else {while(true)if(A0(),y=M0(),y!==797)break;J0();}}}}F5.exports=R7;});function J1($){for(let X of $)return X;return}function O0($){for(let X of $)return $.delete(X),X;return}function P0($,X,Y){let K=$.get(X);if(K===void 0)$.set(X,[Y]);else K.push(Y);}function m0($,X,Y){let K=$.get(X);if(K===void 0)$.set(X,new Set([Y]));else K.add(Y);}function U$($,X,Y){let K=$.get(X);if(K!==void 0){if(K.delete(Y),!K.size)$.delete(X);}}var{toString:z5}=Object.prototype;function F$($){return z5.call($)==="[object RegExp]"}function R$($){let X=typeof $;return $!==null&&(X==="object"||X==="function")}var{propertyIsEnumerable:j5}=Object.prototype;function J$($){return [...Object.keys($),...Object.getOwnPropertySymbols($).filter((X)=>j5.call($,X))]}var x5=["await","break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","import","in","instanceof","new","null","return","super","switch","this","throw","true","try","typeof","var","void","while","with","yield","implements","interface","let","package","private","protected","public","static","arguments","eval"],f5=["globalThis","Infinity","NaN","undefined"];function B$({includeGlobalProperties:$=false}={}){return new Set([...x5,...$?f5:[]])}var b5=/[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}]*/u,B1=`(?<![@#$_\\p{ID_Continue}\\p{ID_Start}])(?!(?:${[...B$({includeGlobalProperties:true})].join("|")})(?![$_\\p{ID_Continue}]))${b5.source}`,w5=new RegExp(B1,"u"),k5=new RegExp(`^${B1}$`,"u");function E$({exact:$=true}={}){return $?k5:w5}function _$($){let X=(...Y)=>$(...Y);return Object.defineProperty(X,"name",{value:`functionTimeout(${$.name||"<anonymous>"})`,configurable:true}),X}var V$=typeof Worker<"u"?Worker:void 0;class A1 extends Error{constructor($){super($);this.name="TimeoutError";}}class M1 extends Error{constructor($){super();this.name="AbortError",this.message=$;}}var _1=($)=>globalThis.DOMException===void 0?new M1($):new DOMException($),V1=($)=>{let X=$.reason===void 0?_1("This operation was aborted."):$.reason;return X instanceof Error?X:_1(X)};function A$($,X){let{milliseconds:Y,fallback:K,message:Z,customTimers:U={setTimeout,clearTimeout}}=X,F,R,B=new Promise((E,A)=>{if(typeof Y!=="number"||Math.sign(Y)!==1)throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${Y}\``);if(X.signal){let{signal:M}=X;if(M.aborted)A(V1(M));R=()=>{A(V1(M));},M.addEventListener("abort",R,{once:true});}if(Y===Number.POSITIVE_INFINITY){$.then(E,A);return}let _=new A1;F=U.setTimeout.call(void 0,()=>{if(K){try{E(K());}catch(M){A(M);}return}if(typeof $.cancel==="function")$.cancel();if(Z===false)E();else if(Z instanceof Error)A(Z);else _.message=Z??`Promise timed out after ${Y} milliseconds`,A(_);},Y),(async()=>{try{E(await $);}catch(M){A(M);}})();}).finally(()=>{if(B.clear(),R&&X.signal)X.signal.removeEventListener("abort",R);});return B.clear=()=>{U.clearTimeout.call(void 0,F),F=void 0;},B}var v5=($)=>{let X=$.addEventListener||$.on||$.addListener,Y=$.removeEventListener||$.off||$.removeListener;if(!X||!Y)throw TypeError("Emitter is not compatible");return {addListener:X.bind($),removeListener:Y.bind($)}};function y5($,X,Y){let K,Z=new Promise((U,F)=>{if(Y={rejectionEvents:["error"],multiArgs:false,resolveImmediately:false,...Y},!(Y.count>=0&&(Y.count===Number.POSITIVE_INFINITY||Number.isInteger(Y.count))))throw TypeError("The `count` option should be at least 0 or more");Y.signal?.throwIfAborted();let R=[X].flat(),J=[],{addListener:B,removeListener:E}=v5($),A=(...M)=>{let P=Y.multiArgs?M:M[0];if(Y.filter&&!Y.filter(P))return;if(J.push(P),Y.count===J.length)K(),U(J);},_=(M)=>{K(),F(M);};K=()=>{for(let M of R)E(M,A);for(let M of Y.rejectionEvents)E(M,_);};for(let M of R)B(M,A);for(let M of Y.rejectionEvents)B(M,_);if(Y.signal)Y.signal.addEventListener("abort",()=>{_(Y.signal.reason);},{once:true});if(Y.resolveImmediately)U(J);});if(Z.cancel=K,typeof Y.timeout==="number"){let U=A$(Z,{milliseconds:Y.timeout});return U.cancel=K,U}return Z}function H0($,X,Y){if(typeof Y==="function")Y={filter:Y};Y={...Y,count:1,resolveImmediately:false};let K=y5($,X,Y),Z=K.then((U)=>U[0]);return Z.cancel=K.cancel,Z}var h5=Boolean(globalThis.process?.versions?.node),m5=($)=>new globalThis.Blob([$],{type:"text/javascript"}),u5=($)=>{return `data:text/javascript;base64,${globalThis.Buffer.from($).toString("base64")}`};function P1($){let X,Y,K=()=>{if(X)URL.revokeObjectURL(X);Y?.terminate();};if(h5)Y=new V$(u5($),{type:"module"});else X=URL.createObjectURL(m5($)),Y=new V$(X,{type:"module"});return {worker:Y,cleanup:K}}var g5=($)=>`
	globalThis.onmessage = async ({data: arguments_}) => {
		try {
			const output = await (${$.toString()})(...arguments_);
			globalThis.postMessage({output});
		} catch (error) {
			globalThis.postMessage({error});
		}
	};
	`;function u0($){let X=g5($),Y=()=>P1(X);async function K({worker:U,arguments_:F}){let R=H0(U,"message",{rejectionEvents:["error","messageerror"]});U.postMessage(F);let{data:{output:J,error:B}}=await R;if(B)throw B;return J}let Z=async(...U)=>{let{worker:F,cleanup:R}=Y();try{return await K({arguments_:U,worker:F})}finally{R();}};return Z.withSignal=(U)=>async(...F)=>{U.throwIfAborted();let{worker:R,cleanup:J}=Y(),B=H0(U,[],{rejectionEvents:["abort"]});try{return await Promise.race([K({arguments_:F,worker:R}),B])}catch(E){throw U.throwIfAborted(),E}finally{B.cancel(),J();}},Z}var c5=($)=>`
	const nothing = Symbol('nothing');
	let iterator = nothing;

	globalThis.onmessage = async ({data: arguments_}) => {
		try {
			if (iterator === nothing) {
				iterator = await (${$.toString()})(...arguments_);
			}

			const output = await iterator.next();
			globalThis.postMessage({output});
		} catch (error) {
			globalThis.postMessage({error});
		}
	};
	`;function H1($){let X=c5($),Y=()=>P1(X),K=(...Z)=>({async*[Symbol.asyncIterator](){let{worker:U,cleanup:F}=Y();try{let R=!0;while(!0){let J=H0(U,"message",{rejectionEvents:["error","messageerror"]});U.postMessage(R?Z:void 0),R=!1;let{data:{output:B,error:E}}=await J;if(E)throw E;let{value:A,done:_}=B;if(_)break;yield A;}}finally{F();}}});return K.withSignal=(Z)=>(...U)=>({async*[Symbol.asyncIterator](){Z.throwIfAborted();let{worker:F,cleanup:R}=Y(),J=H0(Z,[],{rejectionEvents:["abort"]});try{let B=!0;while(!0){let E=Promise.race([H0(F,"message",{rejectionEvents:["error","messageerror"]}),J]);F.postMessage(B?U:void 0),B=!1;let{data:{output:A,error:_}}=await E;if(_)throw _;let{value:M,done:P}=A;if(P)break;yield M;}}catch(B){throw Z.throwIfAborted(),B}finally{J.cancel(),R();}}}),K}var p5={},l5=($)=>{if($===void 0||Number.isNaN($))return;let X=Math.max(1,Math.trunc(Math.abs($)));if(!Number.isFinite(X))return;return X};function W1($,X,{timeout:Y,throwOnTimeout:K}={}){try{return _$(()=>structuredClone($).test(X),{timeout:l5(Y),context:p5})()}catch(Z){throw Z}}u0(($,X,Y)=>{return new RegExp($,X).test(Y)});u0(($,X,Y)=>{let Z=new RegExp($,X).exec(Y);if(Z===null)return;return {match:Z[0],index:Z.index,groups:Z.slice(1),namedGroups:Z.groups??{},input:Z.input}});H1(function*($,X,Y){let K=new RegExp($,X),Z=Y.matchAll(K);for(let U of Z)yield {match:U[0],index:U.index,groups:U.slice(1),namedGroups:U.groups??{},input:U.input};});var d5=E$();function M$($){if(typeof $!=="string")throw TypeError(`Expected a string, got \`${typeof $}\`.`);if($.length>1e5)return  false;return W1(d5,$,{timeout:1000})}var n5={"\n":String.raw`\n`,"\r":String.raw`\r`,"\t":String.raw`\t`,"\b":String.raw`\b`,"\f":String.raw`\f`,"\v":String.raw`\v`,"\x00":String.raw`\0`};function P$($,X,Y){let K=[];return function Z(U,F={},R=""){let J=F.indent||"\t",B;if(F.inlineCharacterLimit===void 0)B={newline:`
`,newlineOrSpace:`
`,pad:R,indent:R+J};else B={newline:"@@__STRINGIFY_OBJECT_NEW_LINE__@@",newlineOrSpace:"@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@",pad:"@@__STRINGIFY_OBJECT_PAD__@@",indent:"@@__STRINGIFY_OBJECT_INDENT__@@"};let E=(M)=>{if(F.inlineCharacterLimit===void 0)return M;let P=M.replaceAll(B.newline,"").replaceAll(B.newlineOrSpace," ").replaceAll(B.pad,"").replaceAll(B.indent,"");if(P.length<=F.inlineCharacterLimit)return P;return M.replaceAll(B.newline,`
`).replaceAll(B.newlineOrSpace,`
`).replaceAll(B.pad,R).replaceAll(B.indent,R+J)};if(K.includes(U))return '"[Circular]"';let A=typeof U;if(U===null||U===void 0||A==="number"||A==="boolean"||A==="function"||F$(U))return String(U);if(A==="bigint")return String(U)+"n";if(A==="symbol"){let{description:M}=U;if(M===void 0)return "Symbol()";if(M?.startsWith("Symbol.")&&Symbol[M.slice(7)]===U)return M;let P=Symbol.keyFor(U);if(P!==void 0)return `Symbol.for(${Z(P,F)})`;return `Symbol(${Z(M,F)})`}if(U instanceof Date)return Number.isNaN(U.getTime())?"new Date('Invalid Date')":`new Date('${U.toISOString()}')`;if(U instanceof Map||U instanceof Set){let M=U instanceof Map,P=M?"Map":"Set";if(U.size===0)return `new ${P}()`;K.push(U);let V=[...U].map((W)=>{if(M){let[H,Q]=W;return B.indent+`[${Z(H,F,R+J)}, ${Z(Q,F,R+J)}]`}return B.indent+Z(W,F,R+J)}).join(","+B.newlineOrSpace);return K.pop(),E(`new ${P}([${B.newline}${V}${B.newline}${B.pad}])`)}if(Array.isArray(U)){if(U.length===0)return "[]";K.push(U);let M=U.map((P,V)=>{let W=Z(P,F,R+J);if(F.transform)W=F.transform(U,V,W);return B.indent+W}).join(","+B.newlineOrSpace);return K.pop(),E(`[${B.newline}${M}${B.newline}${B.pad}]`)}if(R$(U)){let M=J$(U);if(F.filter)M=M.filter((V)=>F.filter(U,V));if(M.length===0)return "{}";K.push(U);let P=M.map((V)=>{let W=typeof V==="symbol",H;if(W)H=`[${Z(V,F)}]`;else if(M$(V))H=V;else H=Z(V,F);let Q=Z(U[V],F,R+J);if(F.transform)Q=F.transform(U,V,Q);return B.indent+H+": "+Q}).join(","+B.newlineOrSpace);return K.pop(),E(`{${B.newline}${P}${B.newline}${B.pad}}`)}let _=String(U).replaceAll("\\","\\\\").replaceAll(/[\u0000-\u001F\u007F]/g,(M)=>n5[M]??`\\u${M.codePointAt(0).toString(16).padStart(4,"0")}`);if(F.singleQuotes===false)return `"${_.replaceAll('"',String.raw`\"`)}"`;return `'${_.replaceAll("'",String.raw`\'`)}'`}($,X,Y)}function*E0($,...X){let Y=new Set,K;while((K=X.pop())!==void 0){if(Y.has(K))continue;yield K,Y.add(K),X.push(...$(K));}}function H$($,X){let Y=[];for(let[K,Z]of n(X))Y.push($[K]),Y.push(Z);return Y.push($[$.length-1]),Y.join("")}function L($,...X){let Y=g(X,(K)=>P$(K,{indent:"  ",singleQuotes:false,inlineCharacterLimit:60}));return Error(H$($,Y))}function Q1($){return `internal error: ${$}; if you encounter this please submit an issue at: https://github.com/erikbrinkman/d3-dag/issues`}function d($,...X){let Y=g(X,(K)=>K.toString());return Error(Q1(H$($,Y)))}function r($,X,...Y){let[K,...Z]=$,U=g(Y,(J)=>J.toString()),F=H$(Z,U),R=X.name||"anonymous";return Error("d3dagBuiltin"in X?Q1(`builtin ${K}'${R}'${F}`):`custom ${K}'${R}'${F}`)}function*n($){let X=0;for(let Y of $)yield [X++,Y];}function*K0($,X){for(let[Y,K]of n($))yield*X(K,Y);}function*g($,X){for(let[Y,K]of n($))yield X(K,Y);}function*Z0($,X){for(let[Y,K]of n($))if(X(K,Y))yield K;}function s5($,X){for(let[Y,K]of n($))if(X(K,Y))return  true;return  false}function G1($,X){return !s5($,(Y,K)=>!X(Y,K))}function*o5($,X,Y,K){let Z=Math.min(Y,$.length);for(let U=X;U<Z;U+=K)yield $[U];}function*i5($,X,Y,K){let Z=Math.max(Y,-1);for(let U=X;U>Z;U+=K)yield $[U];}function c($,X=0,Y=$.length,K=1){if(K>0)return o5($,X,Y,K);else if(K<0)return i5($,X,Y,K);else throw L`can't slice with zero stride`}function*a(...$){for(let X of $)yield*X;}function*l($){let X=$[Symbol.iterator](),Y=X.next();if(!Y.done){let K=Y.value,Z;while(!(Z=X.next()).done)yield [K,Z.value],K=Z.value;}}function g0($){return typeof $==="object"&&$!==null&&Symbol.iterator in $&&typeof $[Symbol.iterator]==="function"}function Q$($){let X=[],Y,K=new Map;for(let[F,R]of n($.nodes()))if(K.set(R,F),X.push({x:R.ux,y:R.uy,data:R.data}),R===$)Y=F;let Z=[];for(let{source:F,target:R,data:J,points:B}of $.links())Z.push({source:K.get(F),target:K.get(R),points:B,data:J});return {nodes:X,links:Z,index:Y,v:1}}class S1{node;indeg;outdeg;stat;constructor($,X,Y,K="inactive"){this.node=$;this.indeg=X;this.outdeg=Y;this.stat=K;}bucket(){let $=this.indeg===0?-1/0:this.outdeg===0?1/0:this.indeg-this.outdeg;return this.stat==="top"?Math.min($,0):this.stat==="bottom"?Math.max($,0):$}isTop(){return this.indeg<=this.outdeg&&this.stat!=="bottom"||this.stat==="top"}}function N1($,X){let Y=$[X];if(Y===void 0){let K=new Set;return $[X]=K,K}else return Y}function C1($){let X;while($.length&&!(X=$[$.length-1])?.size)$.pop();return X||void 0}function D1($,X=()=>{return}){let Y=new Map,K=new Map,Z=new Set,U=new Set,F=[],R=[];function J(q){if(q===-1/0)return Z;else if(q===1/0)return U;else if(q<=0)return N1(F,-q);else return N1(R,q-1)}for(let q of $){let N=q.nparentLinks(),C=q.nchildLinks(),G=new S1(q,N,C),O=X(q);if(Y.set(q,G),O===void 0)G.stat="active",J(G.bucket()).add(G);else m0(K,O,G);}let B=[...K].sort(([q],[N])=>q-N).map(([,q])=>q),E=0,A=B.length,_=B.length?B[E++]:new Set,M=B.length>1?B[--A]:new Set;for(let q of _)q.stat="top",J(q.bucket()).add(q);for(let q of M)q.stat="bottom",J(q.bucket()).add(q);function P(){let q;if(q=O0(Z)??O0(U))return q;let N=C1(F),C=C1(R);if(C)return O0(F.length>R.length?N:C);else if(N)return O0(N)}let V=Array(Y.size),W=0,H=Y.size,Q;while(Q=P()){let{node:q}=Q,N=Q.isTop()?W++:--H;Q.stat="ranked",V[N]=q;for(let[C,G]of q.parentCounts()){let O=Y.get(C);if(J(O.bucket()).delete(O),O.outdeg-=G,O.stat!=="ranked"&&O.stat!=="inactive")J(O.bucket()).add(O);}for(let[C,G]of q.childCounts()){let O=Y.get(C);if(J(O.bucket()).delete(O),O.indeg-=G,O.stat!=="ranked"&&O.stat!=="inactive")J(O.bucket()).add(O);}if(_.delete(Q),!_.size&&E<A){_=B[E++];for(let C of _)C.stat="top",J(C.bucket()).add(C);}if(M.delete(Q),!M.size&&E<A){M=B[--A];for(let C of M)C.stat="bottom",J(C.bucket()).add(C);}}return V}function O1($,X){let Y=new Set,K=new Set,Z=[],U;for(let F of $){if(K.has(F))continue;Z.push(F);while(U=Z.pop()){if(Y.delete(U),K.has(U))continue;K.add(U),Z.push(...X(U));}Y.add(F);}return Y}function X6($){let X=new Map(g($,(Z)=>[Z,Z.nparents()])),Y=[...g(Z0(X,([,Z])=>Z===0),([Z])=>Z)];for(let Z of Y)X.delete(Z);let K;while(K=Y.pop())for(let Z of K.children()){let U=X.get(Z)-1;if(U)X.set(Z,U);else X.delete(Z),Y.push(Z);}return !X.size}class L1{#X=0;#$=0;#F=0;#Y=true;#Z=new Set;#J=new Set;*nodes(){for(let $ of this.split())yield*$.nodes();}topological($){return D1(this.nodes(),$)}*links(){for(let $ of this.nodes())yield*$.childLinks();}nnodes(){return this.#X}nlinks(){return this.#$}*roots(){for(let $ of this.split())yield*$.roots();}*leaves(){for(let $ of this.split())yield*$.leaves();}*sources(){for(let $ of this.split())yield*$.sources();}*sinks(){for(let $ of this.split())yield*$.sinks();}*split(){yield*this.#Z;let $;while($=J1(this.#J))yield $,$.nnodes();}connected(){let $=false;for(let X of this.split())if($)return  false;else $=true;return  true}multi(){return !!this.#F}acyclic(){if(this.#Y===null){for(let $ of this.split())if(!$.acyclic())return this.#Y=false,false;return this.#Y=true,true}else return this.#Y}node($){return this.#X+=1,new q$(this,this.#Z,this.#J,this.#_,this.#V,this.#R,$)}link($,X,Y){return $.link($,X,Y)}#_=()=>{this.#X-=1;};#V=($,X)=>{if(this.#$+=1,$)this.#F+=1;else if(!X&&this.#Y===true)this.#Y=null;};#R=($)=>{if(this.#$-=1,$)this.#F-=1;else if(this.#Y===false)this.#Y=null;};toJSON(){return Q$(this)}}function T1($){for(let X of $.values())for(let Y of X)return Y}function W0($){return $ instanceof q$}class q${data;#X;#$;#F;#Y;#Z;#J;#_=0;#V=0;#R=new Map;#M=0;#B=new Map;#U;#K;ux;uy;get x(){if(this.ux===void 0)throw L`can't get \`x\` when \`ux\` is undefined`;else return this.ux}set x($){this.ux=$;}get y(){if(this.uy===void 0)throw L`can't get \`y\` when \`uy\` is undefined`;else return this.uy}set y($){this.uy=$;}constructor($,X,Y,K,Z,U,F){this.data=F;this.#X=$,this.#Z=X,this.#J=Y,this.#$=K,this.#F=Z,this.#Y=U,this.#U=this,this.#K={nnodes:1,nlinks:0,multis:0,acyclic:true,roots:[this],leaves:[this],sources:new Set([this]),sinks:new Set([this])},this.#Z.add(this);}#A(){let $=this;while($.#U!==$)$.#U=$.#U.#U,$=$.#U;return $}#E(){let $=this.#A();if($.#K===void 0)throw d`undefined cached info`;else if($.#K!==null)return $.#K;else {let X=0,Y=0,K=0;for(let Z of this.nodes())X+=1,Y+=Z.nchildLinks(),K+=Z.#_,Z.#U=this,Z.#K=void 0,this.#J.delete(Z);return this.#Z.add(this),this.#K={nnodes:X,nlinks:Y,multis:K,acyclic:null,roots:null,leaves:null,sources:null,sinks:null}}}#P=($)=>{let{source:X,target:Y}=$,K=X.nchildLinksTo(Y)>1;if(K){let Z=X.#E();X.#_-=1,Z.nlinks-=1,Z.multis-=1;}else {let Z=X.#A();Z.#K=null,this.#Z.delete(Z),this.#J.add(X),X.#U=X,X.#K=null,this.#J.add(Y),Y.#U=Y,Y.#K=null;}this.#Y(K),U$(X.#B,Y,$),X.#M-=1,U$(Y.#R,X,$),Y.#V-=1;};*nodes(){yield*E0(($)=>a($.children(),$.parents()),this);}topological($){return D1(this.nodes(),$)}*links(){for(let $ of this.nodes())yield*$.childLinks();}nnodes(){return this.#E().nnodes}nlinks(){return this.#E().nlinks}*split(){yield this;}connected(){return  true}multi(){return this.#E().multis>0}acyclic(){let $=this.#E();return $.acyclic===null?$.acyclic=X6(this.nodes()):$.acyclic}node($){if(this.#X)return this.#X.node($);else throw L`can't add a node from a deleted node`}link($,X,Y){if(!this.#X)throw L`can't add a link from a deleted node`;else if($===X)throw L`tried to create a link between the same node, but self loops are not supported`;else if(W0($)&&W0(X)&&$.#X===X.#X&&this.#X===$.#X){let K=new z1(this.#X,$,X,this.#P,Y),Z=$.nchildLinksTo(X)>0,U=$.#A(),F=U.#K,R=X.#A(),J=R.#K;if(Z&&F)$.#_+=1,F.nlinks+=1,F.multis+=1;else if(Z)$.#_+=1;else if(U===R&&F){if(F.nlinks+=1,F.acyclic===true)F.acyclic=null;F.sources?.delete(X),F.sinks?.delete($);}else if(U!==R&&F&&J){let[B,E,A,_]=F.nnodes>J.nnodes?[U,F,R,J]:[R,J,U,F];if(this.#Z.delete(A),A.#U=B,A.#K=void 0,E.nnodes+=_.nnodes,E.nlinks+=_.nlinks+1,E.multis+=_.multis,E.acyclic=E.acyclic===false||_.acyclic===false?false:E.acyclic===true&&_.acyclic===true?true:null,E.roots=null,E.leaves=null,E.sources&&_.sources){for(let M of _.sources)E.sources.add(M);E.sources.delete(X);}else E.sources=null;if(E.sinks&&_.sinks){for(let M of _.sinks)E.sinks.add(M);E.sinks.delete($);}else E.sinks=null;}else if(U!==R)this.#Z.delete(U),this.#Z.delete(R),this.#J.add($),$.#U=$,$.#K=null,this.#J.add(X),X.#U=X,X.#K=null,U.#K=null,R.#K=null;return this.#F(Z,U!==R),$.#M+=1,m0($.#B,X,K),X.#V+=1,m0(X.#R,$,K),K}else throw L`when creating a link, both source and target must be current members of the same graph, and can't have been deleted`}nparents(){return this.#R.size}nchildren(){return this.#B.size}nparentLinks(){return this.#V}nchildLinks(){return this.#M}nparentLinksTo($){return W0($)?this.#R.get($)?.size??0:0}*parentLinksTo($){if(W0($)){let X=this.#R.get($);if(X)yield*X;}}nchildLinksTo($){return W0($)?this.#B.get($)?.size??0:0}*childLinksTo($){if(W0($)){let X=this.#B.get($);if(X)yield*X;}}*parents(){yield*this.#R.keys();}*children(){yield*this.#B.keys();}*parentCounts(){for(let[$,X]of this.#R)yield [$,X.size];}*childCounts(){for(let[$,X]of this.#B)yield [$,X.size];}*parentLinks(){for(let $ of this.#R.values())yield*$;}*childLinks(){for(let $ of this.#B.values())yield*$;}*ancestors(){yield*E0(($)=>$.parents(),this);}*descendants(){yield*E0(($)=>$.children(),this);}*roots(){let $=this.#E();if(!$.roots)$.roots=[...O1(this.nodes(),(X)=>X.children())];yield*$.roots;}*leaves(){let $=this.#E();if(!$.leaves)$.leaves=[...O1(this.nodes(),(X)=>X.parents())];yield*$.leaves;}*sources(){let $=this.#E();if(!$.sources){$.sources=new Set;for(let X of this.nodes())if(X.nparents()===0)$.sources.add(X);}yield*$.sources;}*sinks(){let $=this.#E();if(!$.sinks){$.sinks=new Set;for(let X of this.nodes())if(X.nchildren()===0)$.sinks.add(X);}yield*$.sinks;}parent($,X){return this.link($,this,X)}child($,X){return this.link(this,$,X)}delete(){if(this.#X){let $;while($=T1(this.#B))$.delete();while($=T1(this.#R))$.delete();this.#Z.delete(this),this.#J.delete(this),this.#$(),this.#X=null,this.#K=null;}}toJSON(){return Q$(this)}}class z1{source;target;data;#X;#$;points=[];constructor($,X,Y,K,Z){this.source=X;this.target=Y;this.data=Z;this.#X=$,this.#$=K;}delete(){if(this.#X)this.#$(this),this.#X=null;}}function i(){return new L1}function y1($){function X(K){let Z;if($.topDown)Z=E0((U)=>[...U.children()].sort((F,R)=>R.nchildren()-F.nchildren()),...K0(K,(U)=>[...Z0(U,(F)=>!F.nparents())].sort((F,R)=>R.nchildren()-F.nchildren())));else Z=E0((U)=>[...U.parents()].sort((F,R)=>R.nparents()-F.nparents()),...K0(c(K,K.length-1,-1,-1),(U)=>[...Z0(U,(F)=>!F.nchildren())].sort((F,R)=>R.nparents()-F.nparents())));for(let U of K)U.splice(0);for(let U of Z){let{data:F}=U;if(F.role==="node")for(let R=F.topLayer;R<=F.bottomLayer;++R)K[R].push(U);else K[F.layer].push(U);}}function Y(K){if(K===void 0)return $.topDown;else return y1({topDown:K})}return X.topDown=Y,X.d3dagBuiltin=true,X}function q0(...$){if($.length)throw L`got arguments to decrossDfs(${$}); you probably forgot to construct decrossDfs before passing to decross: \`sugiyama().decross(decrossDfs())\`, note the trailing "()"`;return y1({topDown:true})}class z${constructor($,X,Y,K){this.feasible=Y,this.evaluation=X,this.bounded=K,this._tableau=$,this.solutionSet={};}generateSolutionSet(){let $={},X=this._tableau,Y=X.varIndexByRow,K=X.variablesPerIndex,Z=X.matrix,U=X.width,F=X.rhsColumn,R=X.height-1,J=Math.round(1/X.precision);for(let B=1;B<=R;B+=1){let E=Y[B],A=K[E];if(A===void 0||A.isSlack===true)continue;let _=Z[B*U+F];$[A.id]=Math.round((Number.EPSILON+_)*J)/J;}return $}}class l1 extends z${constructor($,X,Y,K,Z){super($,X,Y,K);this.iter=Z;}}class i0{constructor($=64){this.heap=Array($),this.size=0,this.seqCounter=0,this.pool=Array(64),this.poolSize=0;}allocEntry($,X){if(this.poolSize>0){let Y=this.pool[--this.poolSize];return Y.branch=$,Y.seq=X,Y}return {branch:$,seq:X}}freeEntry($){if(this.poolSize<256)this.pool[this.poolSize++]=$;}get length(){return this.size}isEmpty(){return this.size===0}clear(){this.size=0,this.seqCounter=0;}isBefore($,X){if($.branch.relaxedEvaluation!==X.branch.relaxedEvaluation)return $.branch.relaxedEvaluation<X.branch.relaxedEvaluation;return $.seq>X.seq}push($){let X=this.heap,Y=this.size;if(this.size++,Y>=X.length)X.length=X.length*2;let K=this.allocEntry($,this.seqCounter++);while(Y>0){let Z=Y-1>>1,U=X[Z];if(!this.isBefore(K,U))break;X[Y]=U,Y=Z;}X[Y]=K;}pop(){if(this.size===0)return;let $=this.heap,X=$[0],Y=X.branch;if(this.size--,this.freeEntry(X),this.size===0)return Y;let K=$[this.size],Z=0,U=this.size>>1;while(Z<U){let F=(Z<<1)+1,R=$[F],J=F+1;if(J<this.size&&this.isBefore($[J],R))F=J,R=$[J];if(!this.isBefore(R,K))break;$[Z]=R,Z=F;}return $[Z]=K,Y}peek(){return this.size>0?this.heap[0].branch:void 0}}function h1($,X,Y){return {type:$,varIndex:X,value:Y}}function T$($,X){return {relaxedEvaluation:$,cuts:X}}function D$(){let $=(Y,K)=>{var Z;if(Y.restore(),Y.addCutConstraints(K),Y.simplex(),(Z=Y.model)===null||Z===void 0?void 0:Z.useMIRCuts){let U=Y.computeFractionalVolume(true);while(U>0){Y.applyMIRCuts(),Y.simplex();let F=Y.computeFractionalVolume(true);if(F>=0.9*U)break;U=F;}}};return {applyCuts:$,branchAndCut:(Y)=>{var K,Z,U,F,R;let J=new i0,B=0,E=(Z=(K=Y.model)===null||K===void 0?void 0:K.tolerance)!==null&&Z!==void 0?Z:0,A=true,_=1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;if((U=Y.model)===null||U===void 0?void 0:U.timeout)_=Date.now()+Y.model.timeout;let M=1/0,P=null,V=[],W=Y.optionalObjectives,H=W.length;for(let N=0;N<H;N+=1)V.push(1/0);let Q=T$(-1/0,[]),q;J.push(Q);while(!J.isEmpty()&&A===true&&Date.now()<_){if((F=Y.model)===null||F===void 0?void 0:F.isMinimization)q=Y.bestPossibleEval*(1+E);else q=Y.bestPossibleEval*(1-E);if(E>0){if(M<q)A=false;}let N=J.pop();if(N.relaxedEvaluation>=M)continue;let C=N.cuts;if($(Y,C),B++,Y.feasible===false)continue;let G=Y.evaluation;if(G>M)continue;if(G===M){let O=true;for(let S=0;S<H;S+=1){let D=W[S].reducedCosts[0],T=V[S];if(D>T)break;else if(D<T){O=false;break}}if(O)continue}if(Y.isIntegral()===true){if(Y.__isIntegral=true,B===1){Y.branchAndCutIterations=B;return}P=N,M=G;for(let O=0;O<H;O+=1)V[O]=W[O].reducedCosts[0];if((R=Y.model)===null||R===void 0?void 0:R.keep_solutions){let O=Y.model.tableau.getSolution(),S=O.generateSolutionSet();if(S.result=O.evaluation,!Y.model.solutions)Y.model.solutions=[];Y.model.solutions.push(S);}}else {if(B===1)Y.save();let O=Y.getMostFractionalVar(),S=O.index,D=O.value,T=[],z=[],x=C.length;for(let v=0;v<x;v+=1){let j=C[v];if(j.varIndex===S)if(j.type==="min")z.push(j);else T.push(j);else T.push(j),z.push(j);}let w=h1("min",S,Math.ceil(D));T.push(w);let y=h1("max",S,Math.floor(D));z.push(y),J.push(T$(G,T)),J.push(T$(G,z));}}if(P!==null)$(Y,P.cuts);Y.branchAndCutIterations=B;}}}class j${constructor(){this.pairs=[],this.positions=new Map;}add($,X){let Y=`${$}_${X}`,K=this.pairs.length;this.pairs.push([$,X]);let Z=this.positions.get(Y);if(Z===void 0)return this.positions.set(Y,[K]),[];for(let U of Z){let F=K-U;if(F>this.pairs.length-K)continue;let R=true;for(let J=1;J<F&&U+F+J<this.pairs.length;J++){let B=this.pairs[U+J],E=this.pairs[U+F+J];if(B[0]!==E[0]||B[1]!==E[1]){R=false;break}}if(R)return [U,F]}return Z.push(K),[]}}function F6(){if(this.bounded=true,this.phase1(),this.feasible===true)this.phase2();return this}function R6(){let $=this.matrix,X=this.width,Y=this.rhsColumn,K=X-1,Z=this.height-1,F=-this.precision,R=0,J=1e4;while(R<J){let B=0,E=F;for(let P=1;P<=Z;P++){let V=$[P*X+Y];if(V<E)E=V,B=P;}if(B===0)return this.feasible=true,this.setEvaluation(),R;let A=0,_=1/0,M=B*X;for(let P=1;P<=K;P++){let V=$[M+P];if(V<F){let W=$[P];if(W>=F){let H=W/-V;if(H<_)_=H,A=P;}}}if(A===0)return this.feasible=false,-1;this.pivot(B,A),R++;}return this.feasible=false,R}function J6(){let X=this.model.checkForCycles?new j$:null,Y=this.matrix,K=this.width,Z=this.rhsColumn,U=this.width-1,F=this.height-1,R=this.precision,J=-R,B=this.unrestrictedVars,E=this.varIndexByRow,A=this.varIndexByCol,M=Math.max(F,U),P=0,V=false,W=-1/0,H=null,Q=null,q=null,N=null,C=null;while(true){let G=0,O=J;for(let T=1;T<=F;T++){if(B[E[T]]===true)continue;let z=Y[T*K+Z];if(z<O)O=z,G=T;}if(G===0)return this.feasible=true,P;if(!V&&P>0&&O<=W){if(P>=10&&H===null)H=Y.slice(),Q=E.slice(),q=A.slice(),N=this.rowByVarIndex.slice(),C=this.colByVarIndex.slice();if(P>=M){if(V=true,H){Y.set(H);for(let T=0;T<Q.length;T++)E[T]=Q[T];for(let T=0;T<q.length;T++)A[T]=q[T];for(let T=0;T<N.length;T++)this.rowByVarIndex[T]=N[T];for(let T=0;T<C.length;T++)this.colByVarIndex[T]=C[T];P=0;continue}}}if(P===0)W=O;let S=0,D=G*K;if(V){for(let T=1;T<=U;T++)if(Y[D+T]<J){S=T;break}if(S===0)for(let T=1;T<=U;T++){let z=Y[D+T];if(B[A[T]]===true&&(z<J||z>R)){S=T;break}}}else {let T=-1/0;for(let z=1;z<=U;z++){let x=Y[D+z];if(x<J){let w=-Y[z]/x;if(T<w)T=w,S=z;}}if(S===0)for(let z=1;z<=U;z++){let x=Y[D+z];if(B[A[z]]===true&&(x<J||x>R)){S=z;break}}}if(S===0)return this.feasible=false,P;if(X){let T=X.add(E[G],A[S]);if(T.length>0)return this.model.messages.push("Cycle in phase 1"),this.model.messages.push("Start :"+T[0]),this.model.messages.push("Length :"+T[1]),this.feasible=false,P}this.pivot(G,S),P+=1;}}function B6(){let X=this.model.checkForCycles?new j$:null,Y=this.matrix,K=this.width,Z=this.rhsColumn,U=this.width-1,F=this.height-1,R=this.precision,J=-R,B=this.optionalObjectives.length,E=null,A=this.unrestrictedVars,_=this.varIndexByCol,M=this.varIndexByRow,P=0,V,W,H=100,Q=5,q=false,N=Y[Z],C=0,G=0,O=0,S=U,D=this.pricingBatchSize>0?this.pricingBatchSize:Math.min(500,Math.max(50,Math.floor(Math.sqrt(S)))),T=S>D*2;while(true){if(B>0)E=[];if(!q&&P>0&&P%H===0){let j=Y[Z],m=Math.abs(j-N),h=Math.max(1,Math.abs(N));if(m/h<0.0000000001){if(C++,C>=Q)q=true,G=P,O=j;}else C=0;N=j;}if(q&&P-G>F){let j=Y[Z],m=Math.abs(j-O),h=Math.max(1,Math.abs(O));if(m/h<0.0000000001)return this.setEvaluation(),this.simplexIters+=1,P;G=P,O=j;}let z=0,x=R,w=false;if(q)for(let j=1;j<=U;j++){if(V=Y[j],W=A[_[j]]===true,W&&V<0){z=j,x=-V,w=true;break}if(V>R){z=j,x=V,w=false;break}}else if(T){let j=this.pricingBatchStart,m=0,h=Math.ceil(S/D);while(z===0&&m<h){let b=this.pricingBatchStart,f=Math.min(b+D-1,U);for(let u=b;u<=f;u++){if(V=Y[u],W=A[_[u]]===true,B>0&&J<V&&V<R){E===null||E===void 0||E.push(u);continue}if(W&&V<0){if(-V>x)x=-V,z=u,w=true;continue}if(V>x)x=V,z=u,w=false;}this.pricingBatchStart=f>=U?1:f+1,m++;}if(z!==0)this.pricingBatchStart=j;}else for(let j=1;j<=U;j++){if(V=Y[j],W=A[_[j]]===true,B>0&&J<V&&V<R){E===null||E===void 0||E.push(j);continue}if(W&&V<0){if(-V>x)x=-V,z=j,w=true;continue}if(V>x)x=V,z=j,w=false;}if(B>0){let j=0;while(z===0&&E&&E.length>0&&j<B){let m=[],h=this.optionalObjectives[j].reducedCosts;x=R;for(let b=0;b<E.length;b++){let f=E[b];if(V=h[f],W=A[_[f]]===true,J<V&&V<R){m.push(f);continue}if(W&&V<0){if(-V>x)x=-V,z=f,w=true;continue}if(V>x)x=V,z=f,w=false;}E=m,j+=1;}}if(z===0)return this.setEvaluation(),this.simplexIters+=1,P;let y=0,v=1/0;for(let j=1;j<=F;j++){let m=j*K,h=Y[m+Z],b=Y[m+z];if(J<b&&b<R)continue;if(b>0&&R>h&&h>J){v=0,y=j;break}let f=w?-h/b:h/b;if(f>R&&v>f)v=f,y=j;}if(v===1/0)return this.evaluation=-1/0,this.bounded=false,this.unboundedVarIndex=_[z],P;if(X){let j=X.add(M[y],_[z]);if(j.length>0)return this.model.messages.push("Cycle in phase 2"),this.model.messages.push("Start :"+j[0]),this.model.messages.push("Length :"+j[1]),this.feasible=false,P}this.pivot(y,z),P+=1;}}var L0=new Int32Array(1024),n0=new Float64Array(1024);function E6($,X){let Y=this.matrix,K=this.width;if(K>L0.length)L0=new Int32Array(K*2),n0=new Float64Array(K*2);let Z=$*K,U=Y[Z+X],F=1/U,R=this.height,J=this.varIndexByRow[$],B=this.varIndexByCol[X];this.varIndexByRow[$]=B,this.varIndexByCol[X]=J,this.rowByVarIndex[B]=$,this.rowByVarIndex[J]=-1,this.colByVarIndex[B]=-1,this.colByVarIndex[J]=X;let E=0;for(let M=0;M<K;M++){let P=Z+M,V=Y[P];if(!(V>=-1e-16&&V<=0.0000000000000001)){let W=V/U;Y[P]=W,L0[E]=M,n0[E]=W,E++;}else Y[P]=0;}Y[Z+X]=F;for(let M=0;M<R;M++)if(M!==$){let P=M*K,V=Y[P+X];if(!(V>=-1e-16&&V<=0.0000000000000001)){let W=V;if(!(W>=-1e-16&&W<=0.0000000000000001)){for(let H=0;H<E;H++){let Q=L0[H],q=n0[H];if(!(q>=-1e-16&&q<=0.0000000000000001))Y[P+Q]-=W*q;else if(q!==0)Y[Z+Q]=0;}Y[P+X]=-W/U;}else if(W!==0)Y[P+X]=0;}}let A=this.optionalObjectives,_=A.length;if(_>0)for(let M=0;M<_;M++){let P=A[M].reducedCosts,V=P[X];if(V!==0){for(let W=0;W<E;W++){let H=L0[W];P[H]-=V*n0[W];}P[X]=-V*F;}}}function _6($){for(let X=0;X<$.length-1;X++)for(let Y=X+1;Y<$.length;Y++){let K=$[X],Z=$[Y];if(K[0]===Z[0]&&K[1]===Z[1]){if(Y-X>$.length-Y)break;let U=true;for(let F=1;F<Y-X;F++){let R=$[X+F],J=$[Y+F];if(R[0]!==J[0]||R[1]!==J[1]){U=false;break}}if(U)return [X,Y-X]}}return []}class x0{constructor($,X,Y,K){this.id=$,this.cost=X,this.index=Y,this.value=0,this.priority=K;}}class d1 extends x0{constructor($,X,Y,K){super($,X,Y,K);this.isInteger=true;}}class f0 extends x0{constructor($,X){super($,0,X,0);this.isSlack=true;}}class x${constructor($,X){this.variable=$,this.coefficient=X;}}function n1($,X,Y){if(Y===0||Y==="required")return null;let K=X===void 0?1:X,Z=Y===void 0?1:Y,U=$.isMinimization===false?-K:K;return $.addVariable(U,"r"+$.relaxationIndex++,false,false,Z)}class G0{constructor($,X,Y,K){this.slack=new f0("s"+Y,Y),this.index=Y,this.model=K,this.rhs=$,this.isUpperBound=X,this.terms=[],this.termsByVarIndex={},this.relaxation=null;}addTerm($,X){let Y=X.index,K=this.termsByVarIndex[Y];if(K===void 0){let Z=new x$(X,$);this.termsByVarIndex[Y]=Z,this.terms.push(Z);let U=this.isUpperBound===true?-$:$;this.model.updateConstraintCoefficient(this,X,U);}else {let Z=K.coefficient+$;this.setVariableCoefficient(Z,X);}return this}removeTerm($){return this}setRightHandSide($){if($!==this.rhs){let X=$-this.rhs;if(this.isUpperBound===true)X=-X;this.rhs=$,this.model.updateRightHandSide(this,X);}return this}setVariableCoefficient($,X){let Y=X.index;if(Y===-1){console.warn("[Constraint.setVariableCoefficient] Trying to change coefficient of inexistant variable.");return}let K=this.termsByVarIndex[Y];if(K===void 0)this.addTerm($,X);else if($!==K.coefficient){let Z=$-K.coefficient;if(this.isUpperBound===true)Z=-Z;K.coefficient=$,this.model.updateConstraintCoefficient(this,X,Z);}return this}relax($,X){this.relaxation=n1(this.model,$,X),this._relax(this.relaxation);}_relax($){if($===null)return;if(this.isUpperBound)this.setVariableCoefficient(-1,$);else this.setVariableCoefficient(1,$);}}class L${constructor($,X){this.isEquality=true,this.upperBound=$,this.lowerBound=X,this.model=$.model,this.rhs=$.rhs,this.relaxation=null;}addTerm($,X){return this.upperBound.addTerm($,X),this.lowerBound.addTerm($,X),this}removeTerm($){return this.upperBound.removeTerm($),this.lowerBound.removeTerm($),this}setRightHandSide($){this.upperBound.setRightHandSide($),this.lowerBound.setRightHandSide($),this.rhs=$;}relax($,X){this.relaxation=n1(this.model,$,X),this.upperBound.relaxation=this.relaxation,this.upperBound._relax(this.relaxation),this.lowerBound.relaxation=this.relaxation,this.lowerBound._relax(this.relaxation);}}class s1{constructor($){this.value=$;}}function V6($){let X=$.length,Y=this.height,K=Y+X,Z=this.width,U=Z-1,F=this.matrix,R=K*Z;if(F.length<R){let P=Math.ceil(R*1.5),V=new Float64Array(P);V.set(F),this.matrix=V;}let J=this.matrix;this.height=K,this.nVars=this.width+this.height-2;let B=this.rhsColumn,E=this.rowByVarIndex,A=this.colByVarIndex,_=this.varIndexByRow,M=this.variablesPerIndex;for(let P=0;P<X;P+=1){let V=$[P],W=Y+P,H=W*Z,Q=V.type==="min"?-1:1,q=V.varIndex,N=E[q];if(N===-1){J[H+B]=Q*V.value;for(let C=1;C<=U;C+=1)J[H+C]=0;J[H+A[q]]=Q;}else {let C=N*Z,G=J[C+B];J[H+B]=Q*(V.value-G);for(let O=1;O<=U;O+=1)J[H+O]=-Q*J[C+O];}N=this.getNewElementIndex(),_[W]=N,E[N]=W,A[N]=-1,M[N]=new f0("s"+N,N),this.nVars+=1;}}function A6($){if($===this.costRowIndex)return  false;let X=this.width,Y=this.matrix,K=$*X,Z=this.variablesPerIndex[this.varIndexByRow[$]];if(Z===void 0||!Z.isInteger)return  false;let U=Y[K+this.rhsColumn],F=U-Math.floor(U);if(F<this.precision||F>1-this.precision)return  false;let R=this.height,J=R*X,B=(R+1)*X;if(Y.length<B){let H=Math.ceil(B*1.5),Q=new Float64Array(H);Q.set(Y),this.matrix=Q;}let E=this.matrix;this.height+=1,this.nVars+=1;let A=this.getNewElementIndex();this.varIndexByRow[R]=A,this.rowByVarIndex[A]=R,this.colByVarIndex[A]=-1,this.variablesPerIndex[A]=new f0("s"+A,A);let _=this.rhsColumn;E[J+_]=Math.floor(U);let M=this.variablesPerIndex,P=this.varIndexByCol,V=P.length,W=1-F;for(let H=1;H<V;H+=1){let Q=M[P[H]],q=E[K+H];if(Q!==void 0&&Q.isInteger){let N=Math.floor(q),C=N+Math.max(0,q-N-F)/W;E[J+H]=C;}else E[J+H]=Math.min(0,q/W);}for(let H=0;H<X;H+=1)E[J+H]-=E[K+H];return  true}function M6($){if($===this.costRowIndex)return  false;let X=this.width,Y=this.matrix,K=$*X,Z=this.variablesPerIndex[this.varIndexByRow[$]];if(Z===void 0||!Z.isInteger)return  false;let U=Y[K+this.rhsColumn],F=U-Math.floor(U);if(F<this.precision||F>1-this.precision)return  false;let R=this.height,J=R*X,B=(R+1)*X;if(Y.length<B){let H=Math.ceil(B*1.5),Q=new Float64Array(H);Q.set(Y),this.matrix=Q;}let E=this.matrix;this.height+=1,this.nVars+=1;let A=this.getNewElementIndex();this.varIndexByRow[R]=A,this.rowByVarIndex[A]=R,this.colByVarIndex[A]=-1,this.variablesPerIndex[A]=new f0("s"+A,A);let _=this.rhsColumn;E[J+_]=-F;let M=this.variablesPerIndex,P=this.varIndexByCol,V=P.length,W=1-F;for(let H=1;H<V;H+=1){let Q=M[P[H]],q=E[K+H],N=q-Math.floor(q);if(Q!==void 0&&Q.isInteger)E[J+H]=N<=F?-N:-(1-N)*F/N;else E[J+H]=q>=0?-q:q*F/W;}return  true}function P6(){let $=this.height,X=0,Y=10;for(let K=1;K<$&&X<Y;K++)if(this.addLowerBoundMIRCut(K))X++;}function H6($){let X=this.width,Y=this.rowByVarIndex[$];if(Y===-1){let K=this.colByVarIndex[$];for(let Z=1;Z<this.height;Z+=1){let U=this.matrix[Z*X+K];if(U<-this.precision||this.precision<U){Y=Z;break}}this.pivot(Y,K);}return Y}function W6($){let X=this.width,Y=this.colByVarIndex[$];if(Y===-1){let K=this.rowByVarIndex[$],Z=K*X;for(let U=1;U<this.height;U+=1){let F=this.matrix[Z+U];if(F<-this.precision||this.precision<F){Y=U;break}}this.pivot(K,Y);}return Y}function Q6(){let $=this.width,X=this.matrix,Y=this.rhsColumn,K=this.variables.length,Z=Math.round(1/this.precision);for(let U=0;U<K;U+=1){let F=this.variables[U],R=F.index,J=this.rowByVarIndex[R];if(J===-1)F.value=0;else {let B=X[J*$+Y];F.value=Math.round((B+Number.EPSILON)*Z)/Z;}}}function q6($,X){let Y=this.width,K=this.matrix,Z=this.rhsColumn,U=this.height-1,F=this.rowByVarIndex[$.index];if(F===-1){let R=this.colByVarIndex[$.index];for(let B=0;B<=U;B+=1){let E=B*Y;K[E+Z]-=X*K[E+R];}let J=this.optionalObjectives.length;if(J>0)for(let B=0;B<J;B+=1){let E=this.optionalObjectives[B].reducedCosts;E[Z]-=X*E[R];}}else K[F*Y+Z]-=X;}function G6($,X,Y){if($.index===X.index)throw Error("[Tableau.updateConstraintCoefficient] constraint index should not be equal to variable index !");let K=this.width,Z=this.matrix,F=this.putInBase($.index)*K,R=this.colByVarIndex[X.index];if(R===-1){let B=this.rowByVarIndex[X.index]*K;for(let E=0;E<K;E+=1)Z[F+E]+=Y*Z[B+E];}else Z[F+R]-=Y;}function I6($,X){let Y=this.width,K=this.matrix,Z=$.index,U=Y-1,F=this.colByVarIndex[Z];if(F===-1){let R=this.rowByVarIndex[Z]*Y;if($.priority===0)for(let J=0;J<=U;J+=1)K[J]+=X*K[R+J];else {let J=this.objectivesByPriority[$.priority].reducedCosts;for(let B=0;B<=U;B+=1)J[B]+=X*K[R+B];}}else K[F]-=X;}function N6($){let X=$.isUpperBound?1:-1,Y=this.height,K=this.width,Z=K-1,F=(Y+1)*K;if(this.matrix.length<F){let _=this.matrix.length,M=Math.max(K*16,Math.floor(_*0.5)),P=_+M,V=this.matrix,W=new Float64Array(P);W.set(V),this.matrix=W;}let R=this.matrix,J=Y*K;for(let _=0;_<=Z;_+=1)R[J+_]=0;R[J+this.rhsColumn]=X*$.rhs;let B=$.terms,E=B.length;for(let _=0;_<E;_+=1){let M=B[_],P=M.coefficient,V=M.variable.index,W=this.rowByVarIndex[V];if(W===-1)R[J+this.colByVarIndex[V]]+=X*P;else {let H=W*K;for(let Q=0;Q<=Z;Q+=1)R[J+Q]-=X*P*R[H+Q];}}let A=$.index;this.varIndexByRow[Y]=A,this.rowByVarIndex[A]=Y,this.colByVarIndex[A]=-1,this.height+=1;}function C6($){let X=$.index,Y=this.height-1,K=this.width,Z=this.matrix,U=this.putInBase(X),F=U*K,R=Y*K;for(let J=0;J<K;J++){let B=Z[R+J];Z[R+J]=Z[F+J],Z[F+J]=B;}this.varIndexByRow[U]=this.varIndexByRow[Y],this.varIndexByRow[Y]=-1,this.rowByVarIndex[X]=-1,this.availableIndexes[this.availableIndexes.length]=X,$.slack.index=-1,this.height-=1;}function O6($){this.height-1;let X=this.width,Y=X+1,K=this.height,Z=this.model.isMinimization===true?-$.cost:$.cost,U=$.priority,F=this.matrix,R=new Float64Array(K*Y);for(let E=0;E<K;E++){let A=E*X,_=E*Y;for(let M=0;M<X;M++)R[_+M]=F[A+M];}this.matrix=R,this.width=Y;let J=Y-1,B=this.optionalObjectives.length;if(B>0)for(let E=0;E<B;E+=1)this.optionalObjectives[E].reducedCosts[J]=0;if(U===0)R[J]=Z;else this.setOptionalObjective(U,J,Z),R[J]=0;this.colByVarIndex[$.index]=J,this.varIndexByCol[J]=$.index;}function T6($){let X=$.index,Y=this.width,K=this.matrix,Z=Y-1,U=this.takeOutOfBase(X),F=this.height-1;for(let R=0;R<=F;R+=1){let J=R*Y;K[J+U]=K[J+Z];}this.varIndexByCol[U]=this.varIndexByCol[Z],this.rowByVarIndex[X]=-1,this.colByVarIndex[X]=-1,this.availableIndexes[this.availableIndexes.length]=X,this.width-=1;}function S6(){let $=new this.constructor(this.precision,this.branchAndCutService);$.width=this.width,$.height=this.height,$.nVars=this.nVars,$.model=this.model,$.variables=this.variables,$.variablesPerIndex=this.variablesPerIndex,$.unrestrictedVars=this.unrestrictedVars,$.lastElementIndex=this.lastElementIndex,$.varIndexByRow=this.varIndexByRow.slice(),$.varIndexByCol=this.varIndexByCol.slice(),$.rowByVarIndex=this.rowByVarIndex.slice(),$.colByVarIndex=this.colByVarIndex.slice(),$.availableIndexes=this.availableIndexes.slice();let X=[];for(let Y=0;Y<this.optionalObjectives.length;Y++)X[Y]=this.optionalObjectives[Y].copy();return $.optionalObjectives=X,$.objectivesByPriority={...this.objectivesByPriority},$.optionalObjectivePerPriority={...this.optionalObjectivePerPriority},$.matrix=new Float64Array(this.matrix),$}function D6(){this.savedState=this.copy();}function L6(){if(this.savedState===null)return;let $=this.savedState;this.nVars=$.nVars,this.model=$.model,this.variables=$.variables,this.variablesPerIndex=$.variablesPerIndex,this.unrestrictedVars=$.unrestrictedVars,this.lastElementIndex=$.lastElementIndex,this.width=$.width,this.height=$.height,this.matrix.set($.matrix);let X=$.varIndexByRow,Y=this.height;for(let R=0;R<Y;R+=1)this.varIndexByRow[R]=X[R];this.varIndexByRow.length=Y;let K=$.varIndexByCol,Z=this.width;for(let R=0;R<Z;R+=1)this.varIndexByCol[R]=K[R];this.varIndexByCol.length=Z;let{rowByVarIndex:U,colByVarIndex:F}=$;for(let R=0;R<this.nVars;R+=1)this.rowByVarIndex[R]=U[R],this.colByVarIndex[R]=F[R];if($.optionalObjectives.length>0&&this.optionalObjectives.length>0){this.optionalObjectives=[],this.optionalObjectivePerPriority={};for(let R=0;R<$.optionalObjectives.length;R++){let J=$.optionalObjectives[R].copy();this.optionalObjectives[R]=J,this.optionalObjectivePerPriority[J.priority]=J,this.objectivesByPriority[J.priority]=J;}}}function z6(){let $=0,X=this.width,Y=this.matrix,K=this.rhsColumn;for(let Z=1;Z<this.height;Z+=1){let U=this.variablesPerIndex[this.varIndexByRow[Z]];if(U!==void 0&&U.isInteger){let F=Y[Z*X+K],R=F-Math.floor(F);if(R<this.precision&&-R<this.precision)$+=1;}}return $}function j6(){let $=this.width,X=this.matrix,Y=this.rhsColumn,K=this.model.integerVariables,Z=K.length,U=this.rowByVarIndex,F=this.precision;for(let R=0;R<Z;R++){let J=K[R].index,B=U[J];if(B!==-1){let E=X[B*$+Y];if(Math.abs(E-Math.round(E))>F)return  false}}return  true}function x6($){let X=-1,Y=this.width,K=this.matrix,Z=this.rhsColumn,U=this.height,F=this.variablesPerIndex,R=this.varIndexByRow,J=this.precision;for(let B=1;B<U;B+=1){let E=F[R[B]];if(E!==void 0&&E.isInteger){let A=K[B*Y+Z],_=Math.abs(A);if(Math.min(_-Math.floor(_),Math.floor(_+1))<J){if($!==true)return 0}else if(X===-1)X=_;else X*=_;}}return X===-1?0:X}function f6(){let $=0,X=null,Y=0,K=this.width,Z=this.matrix,U=this.rhsColumn,F=this.model.integerVariables,R=F.length,J=this.rowByVarIndex;for(let B=0;B<R;B+=1){let E=F[B].index,A=J[E];if(A!==-1){let _=Z[A*K+U],M=Math.abs(_-Math.round(_));if(M>$)$=M,X=E,Y=_;}}return {index:X,value:Y}}function b6(){let $=1/0,X=null,Y=null,K=this.width,Z=this.matrix,U=this.rhsColumn,F=this.model.integerVariables,R=F.length;for(let J=0;J<R;J+=1){let B=F[J],E=B.index,A=this.rowByVarIndex[E];if(A!==-1){let _=Z[A*K+U];if(Math.abs(_-Math.round(_))>this.precision&&B.cost<$)$=B.cost,X=E,Y=_;}}return {index:X,value:Y}}function w6($,X){if(!X)return this;console.log("****",$,"****"),console.log("Nb Variables",this.width-1),console.log("Nb Constraints",this.height-1),console.log("Basic Indexes",this.varIndexByRow),console.log("Non Basic Indexes",this.varIndexByCol),console.log("Rows",this.rowByVarIndex),console.log("Cols",this.colByVarIndex);let Y=5,K=this.matrix,Z=this.width,U="",F=[" "],R,J,B,E,A,_,M;for(J=1;J<this.width;J+=1){B=this.varIndexByCol[J];let Q=this.variablesPerIndex[B];if(Q===void 0)E="c"+B;else E=Q.id;if(A=E.length,_=" ",M="\t",A>5)_+=" ";else M+="\t";F[J]=_,U+=M+E;}console.log(U);let P,V=this.costRowIndex*Z,W="\t";for(R=1;R<this.width;R+=1)P="\t",W+=P,W+=F[R],W+=K[V+R].toFixed(Y);P="\t",W+=P+F[0]+K[V].toFixed(Y),console.log(W+"\tZ");for(let Q=1;Q<this.height;Q+=1){let q=Q*Z,N="\t";for(J=1;J<this.width;J+=1)P="\t",N+=P+F[J]+K[q+J].toFixed(Y);P="\t",N+=P+F[0]+K[q].toFixed(Y),B=this.varIndexByRow[Q];let C=this.variablesPerIndex[B];if(C===void 0)E="c"+B;else E=C.id;console.log(N+"\t"+E);}console.log("");let H=this.optionalObjectives.length;if(H>0){console.log("    Optional objectives:");for(let Q=0;Q<H;Q+=1){let q=this.optionalObjectives[Q].reducedCosts,N="";for(R=1;R<this.width;R+=1)P=q[R]<0?"":" ",N+=P,N+=F[R],N+=q[R].toFixed(Y);P=q[0]<0?"":" ",N+=P+F[0]+q[0].toFixed(Y),console.log(N+" z"+Q);}}return console.log("Feasible?",this.feasible),console.log("evaluation",this.evaluation),this}function o1($,X,Y){return {priority:$,reducedCosts:Y?Y.slice():Array(X).fill(0),copy(){return o1(this.priority,this.reducedCosts.length,this.reducedCosts)}}}class f${constructor($=0.00000001,X){this.model=null,this.matrix=new Float64Array(0),this.width=0,this.height=0,this.costRowIndex=0,this.rhsColumn=0,this.variablesPerIndex=[],this.unrestrictedVars={},this.feasible=true,this.evaluation=0,this.simplexIters=0,this.varIndexByRow=[],this.varIndexByCol=[],this.rowByVarIndex=[],this.colByVarIndex=[],this.optionalObjectives=[],this.objectivesByPriority={},this.optionalObjectivePerPriority={},this.savedState=null,this.availableIndexes=[],this.lastElementIndex=0,this.variables=[],this.nVars=0,this.bounded=true,this.unboundedVarIndex=null,this.branchAndCutIterations=0,this.bestPossibleEval=0,this.pricingBatchStart=1,this.pricingBatchSize=0,this.precision=$,this.branchAndCutService=X!==null&&X!==void 0?X:D$();}simplex(){return F6.call(this),this}phase1(){return J6.call(this)}phase2(){return B6.call(this)}dualSimplex(){return R6.call(this)}pivot($,X){E6.call(this,$,X);}checkForCycles($){return _6.call(this,$)}countIntegerValues(){return z6.call(this)}isIntegral(){return j6.call(this)}computeFractionalVolume($){return x6.call(this,$)}addCutConstraints($){V6.call(this,$);}applyMIRCuts(){P6.call(this);}addLowerBoundMIRCut($){return A6.call(this,$)}addUpperBoundMIRCut($){return M6.call(this,$)}getMostFractionalVar(){return f6.call(this)}getFractionalVarWithLowestCost(){return b6.call(this)}putInBase($){return H6.call(this,$)}takeOutOfBase($){return W6.call(this,$)}updateVariableValues(){Q6.call(this);}updateRightHandSide($,X){q6.call(this,$,X);}updateConstraintCoefficient($,X,Y){G6.call(this,$,X,Y);}updateCost($,X){I6.call(this,$,X);}addConstraint($){N6.call(this,$);}removeConstraint($){C6.call(this,$);}addVariable($){O6.call(this,$);}removeVariable($){T6.call(this,$);}copy(){return S6.call(this)}save(){D6.call(this);}restore(){L6.call(this);}log($){return w6.call(this,$),this}applyCuts($){this.branchAndCutService.applyCuts(this,$);}branchAndCut(){this.branchAndCutService.branchAndCut(this);}solve(){var $,X;if(((X=($=this.model)===null||$===void 0?void 0:$.getNumberOfIntegerVariables())!==null&&X!==void 0?X:0)>0)this.branchAndCut();else this.simplex();return this.updateVariableValues(),this.getSolution()}getSolution(){var $,X,Y;let K=(($=this.model)===null||$===void 0?void 0:$.isMinimization)===true?this.evaluation:-this.evaluation;if(((Y=(X=this.model)===null||X===void 0?void 0:X.getNumberOfIntegerVariables())!==null&&Y!==void 0?Y:0)>0)return new l1(this,K,this.feasible,this.bounded,this.branchAndCutIterations);else return new z$(this,K,this.feasible,this.bounded)}setOptionalObjective($,X,Y){let K=this.objectivesByPriority[$];if(K===void 0){let Z=Math.max(this.width,X+1);K=o1($,Z),this.objectivesByPriority[$]=K,this.optionalObjectivePerPriority[$]=K,this.optionalObjectives.push(K),this.optionalObjectives.sort((U,F)=>U.priority-F.priority);}K.reducedCosts[X]=Y;}initialize($,X,Y,K){this.variables=Y,this.unrestrictedVars=K,this.width=$,this.height=X,this.matrix=new Float64Array($*X),this.varIndexByRow=Array(this.height),this.varIndexByCol=Array(this.width),this.varIndexByRow[0]=-1,this.varIndexByCol[0]=-1,this.nVars=$+X-2,this.rowByVarIndex=Array(this.nVars),this.colByVarIndex=Array(this.nVars),this.lastElementIndex=this.nVars;}_resetMatrix(){if(this.model===null)throw Error("[Tableau._resetMatrix] Model not set");let $=this.matrix,X=this.width,Y=this.model.variables,K=this.model.constraints,Z=Y.length,U=K.length,F=this.model.isMinimization===true?-1:1;for(let J=0;J<Z;J+=1){let B=Y[J],E=B.priority,A=F*B.cost;if(E===0)$[J+1]=A;else this.setOptionalObjective(E,J+1,A);let _=Y[J].index;this.rowByVarIndex[_]=-1,this.colByVarIndex[_]=J+1,this.varIndexByCol[J+1]=_;}let R=1;for(let J=0;J<U;J+=1){let B=K[J],E=B.index;this.rowByVarIndex[E]=R,this.colByVarIndex[E]=-1,this.varIndexByRow[R]=E;let A=B.terms,_=A.length,M=R*X;if(R++,B.isUpperBound){for(let P=0;P<_;P+=1){let V=A[P],W=this.colByVarIndex[V.variable.index];$[M+W]=V.coefficient;}$[M]=B.rhs;}else {for(let P=0;P<_;P+=1){let V=A[P],W=this.colByVarIndex[V.variable.index];$[M+W]=-V.coefficient;}$[M]=-B.rhs;}}}setModel($){this.model=$;let X=$.nVariables+1,Y=$.nConstraints+1;return this.initialize(X,Y,$.variables,$.unrestrictedVariables),this._resetMatrix(),this}getNewElementIndex(){if(this.availableIndexes.length>0)return this.availableIndexes.pop();let $=this.lastElementIndex;return this.lastElementIndex+=1,$}density(){let $=0,X=this.matrix,Y=this.width;for(let K=0;K<this.height;K++){let Z=K*Y;for(let U=0;U<Y;U++)if(X[Z+U]!==0)$+=1;}return $/(this.height*this.width)}setEvaluation(){let $=Math.round(1/this.precision),X=this.matrix[this.costRowIndex*this.width+this.rhsColumn],Y=Math.round((Number.EPSILON+X)*$)/$;if(this.evaluation=Y,this.simplexIters===0)this.bestPossibleEval=Y;}}function k6($,X){var Y,K,Z,U,F,R,J;let B=false;for(let E of $.constraints){if(X.removedConstraints.has(E))continue;if(!E.isUpperBound)continue;let A=0;for(let M of E.terms)if(X.fixedVariables.has(M.variable))A+=M.coefficient*X.fixedVariables.get(M.variable);else {let P=(Y=X.tightenedBounds.get(M.variable))!==null&&Y!==void 0?Y:{},V=(K=P.lower)!==null&&K!==void 0?K:0;if(M.coefficient>0)A+=M.coefficient*V;else {let W=(Z=P.upper)!==null&&Z!==void 0?Z:1/0;A+=M.coefficient*W;}}let _=E.rhs-A;if(_<0)continue;for(let M of E.terms){if(X.fixedVariables.has(M.variable))continue;if(!M.variable.isInteger)continue;if(M.coefficient<=0)continue;let P=(U=X.tightenedBounds.get(M.variable))!==null&&U!==void 0?U:{},V=(F=P.lower)!==null&&F!==void 0?F:0,W=(R=P.upper)!==null&&R!==void 0?R:1;if(V>=-0.5&&W<=1.5){if(M.coefficient*(W-V)>_+0.000001){let Q=V+_/M.coefficient;if(Q<W-0.000001){let q=(J=X.tightenedBounds.get(M.variable))!==null&&J!==void 0?J:{};if(!q.upper||Q<q.upper)X.tightenedBounds.set(M.variable,{...q,upper:Q}),X.stats.boundsTightened++,B=true;}}}}}return B}function v6($,X){var Y,K,Z;let U=false;for(let F of $.constraints){if(X.removedConstraints.has(F))continue;let R=0,J=0;for(let B of F.terms){let E=X.fixedVariables.get(B.variable);if(E!==void 0){R+=B.coefficient*E,J+=B.coefficient*E;continue}let A=(Y=X.tightenedBounds.get(B.variable))!==null&&Y!==void 0?Y:{},_=(K=A.lower)!==null&&K!==void 0?K:0,M=(Z=A.upper)!==null&&Z!==void 0?Z:1/0;if(B.coefficient>0)R+=B.coefficient*_,J+=B.coefficient*(M===1/0?10000000000:M);else R+=B.coefficient*(M===1/0?10000000000:M),J+=B.coefficient*_;}if(F.isUpperBound){if(J<=F.rhs+0.000001)X.removedConstraints.add(F),X.stats.constraintsRemoved++,U=true;if(R>F.rhs+0.000001)return X.isInfeasible=true,false}else {if(R>=F.rhs-0.000001)X.removedConstraints.add(F),X.stats.constraintsRemoved++,U=true;if(J<F.rhs-0.000001)return X.isInfeasible=true,false}}return U}function y6($){var X,Y;let K={fixedVariables:new Map,removedConstraints:new Set,tightenedBounds:new Map,isInfeasible:false,stats:{variablesFixed:0,constraintsRemoved:0,boundsTightened:0}},Z=true,U=0,F=5;while(Z&&U<F){Z=false,U++;for(let R of $.constraints){if(K.removedConstraints.has(R))continue;let J=R.terms.filter((B)=>!K.fixedVariables.has(B.variable));if(J.length===0){let B=0;for(let A of R.terms){let _=K.fixedVariables.get(A.variable);if(_!==void 0)B+=A.coefficient*_;}if(!(R.isUpperBound?B<=R.rhs+0.000001:B>=R.rhs-0.000001))return K.isInfeasible=true,K;K.removedConstraints.add(R),K.stats.constraintsRemoved++,Z=true;}else if(J.length===1){let B=J[0],E=B.variable,A=B.coefficient,_=R.rhs;for(let P of R.terms)if(P.variable!==E){let V=K.fixedVariables.get(P.variable);if(V!==void 0)_-=P.coefficient*V;}let M=_/A;if(R.isUpperBound)if(A>0){let P=K.tightenedBounds.get(E);if(!(P===null||P===void 0?void 0:P.upper)||M<P.upper)K.tightenedBounds.set(E,{...P,upper:M}),K.stats.boundsTightened++,Z=true;}else {let P=K.tightenedBounds.get(E);if(!(P===null||P===void 0?void 0:P.lower)||M>P.lower)K.tightenedBounds.set(E,{...P,lower:M}),K.stats.boundsTightened++,Z=true;}K.removedConstraints.add(R),K.stats.constraintsRemoved++;}}for(let[R,J]of K.tightenedBounds){if(K.fixedVariables.has(R))continue;if(J.lower!==void 0&&J.upper!==void 0){if(J.lower>J.upper+0.000001)return K.isInfeasible=true,K;if(Math.abs(J.lower-J.upper)<0.000001){let B=J.lower;if(R.isInteger)B=Math.round(B);K.fixedVariables.set(R,B),K.stats.variablesFixed++,Z=true;}}if(R.isInteger&&J.lower!==void 0&&J.lower>=0.5){if(((X=J.upper)!==null&&X!==void 0?X:1/0)<=1.5)K.fixedVariables.set(R,1),K.stats.variablesFixed++,Z=true;}if(R.isInteger&&J.upper!==void 0&&J.upper<=0.5){if(((Y=J.lower)!==null&&Y!==void 0?Y:0)>=-0.5)K.fixedVariables.set(R,0),K.stats.variablesFixed++,Z=true;}}if(v6($,K))Z=true;if(K.isInfeasible)return K;if(k6($,K))Z=true;}return K}class o0{constructor($,X,Y){this.tableau=new f$($,Y),this.name=X,this.variables=[],this.integerVariables=[],this.unrestrictedVariables={},this.constraints=[],this.nConstraints=0,this.nVariables=0,this.isMinimization=true,this.tableauInitialized=false,this.relaxationIndex=1,this.useMIRCuts=false,this.checkForCycles=true,this.messages=[],this.availableIndexes=[],this.lastElementIndex=0,this.usePresolve=true,this.presolveResult=null;}minimize(){return this.isMinimization=true,this}maximize(){return this.isMinimization=false,this}_getNewElementIndex(){if(this.availableIndexes.length>0)return this.availableIndexes.pop();let $=this.lastElementIndex;return this.lastElementIndex+=1,$}_addConstraint($){let X=$.slack;if(this.tableau.variablesPerIndex[X.index]=X,this.constraints.push($),this.nConstraints+=1,this.tableauInitialized===true)this.tableau.addConstraint($);}smallerThan($){let X=new G0($,true,this.tableau.getNewElementIndex(),this);return this._addConstraint(X),X}greaterThan($){let X=new G0($,false,this.tableau.getNewElementIndex(),this);return this._addConstraint(X),X}equal($){let X=new G0($,true,this.tableau.getNewElementIndex(),this);this._addConstraint(X);let Y=new G0($,false,this.tableau.getNewElementIndex(),this);return this._addConstraint(Y),new L$(X,Y)}addVariable($,X,Y,K,Z){if(typeof Z==="string")switch(Z){case "required":Z=0;break;case "strong":Z=1;break;case "medium":Z=2;break;case "weak":Z=3;break;default:Z=0;break}let U=this.tableau.getNewElementIndex(),F=X!==null&&X!==void 0?X:"v"+U,R=$!==null&&$!==void 0?$:0,J=Z!==null&&Z!==void 0?Z:0,B;if(Y){let E=new d1(F,R,U,J);this.integerVariables.push(E),B=E;}else B=new x0(F,R,U,J);if(this.variables.push(B),this.tableau.variablesPerIndex[U]=B,K)this.unrestrictedVariables[U]=true;if(this.nVariables+=1,this.tableauInitialized===true)this.tableau.addVariable(B);return B}_removeConstraint($){let X=this.constraints.indexOf($);if(X===-1){console.warn("[Model.removeConstraint] Constraint not present in model");return}if(this.constraints.splice(X,1),this.nConstraints-=1,this.tableauInitialized===true)this.tableau.removeConstraint($);if($.relaxation)this.removeVariable($.relaxation);}removeConstraint($){if($.isEquality){let X=$;this._removeConstraint(X.upperBound),this._removeConstraint(X.lowerBound);}else this._removeConstraint($);return this}removeVariable($){let X=this.variables.indexOf($);if(X===-1){console.warn("[Model.removeVariable] Variable not present in model");return}if(this.variables.splice(X,1),this.tableauInitialized===true)this.tableau.removeVariable($);return this}updateRightHandSide($,X){if(this.tableauInitialized===true)this.tableau.updateRightHandSide($,X);return this}updateConstraintCoefficient($,X,Y){if(this.tableauInitialized===true)this.tableau.updateConstraintCoefficient($,X,Y);return this}setCost($,X){let Y=$-X.cost;if(this.isMinimization===false)Y=-Y;return X.cost=$,this.tableau.updateCost(X,Y),this}loadJson($){this.isMinimization=$.opType!=="max";let{variables:X,constraints:Y}=$,K={},Z={},U=Object.keys(Y),F=U.length;for(let V=0;V<F;V+=1){let W=U[V],H=Y[W],Q=H.equal,q=H.weight,N=H.priority,C=q!==void 0||N!==void 0,G,O;if(Q===void 0){let S=H.min;if(S!==void 0){if(G=this.greaterThan(S),K[W]=G,C)G.relax(q,N);}let D=H.max;if(D!==void 0){if(O=this.smallerThan(D),Z[W]=O,C)O.relax(q,N);}}else {G=this.greaterThan(Q),K[W]=G,O=this.smallerThan(Q),Z[W]=O;let S=new L$(G,O);if(C)S.relax(q,N);}}let R=Object.keys(X),J=R.length;if(this.tolerance=$.tolerance||0,$.timeout)this.timeout=$.timeout;if($.options){if($.options.timeout)this.timeout=$.options.timeout;if(this.tolerance===0)this.tolerance=$.options.tolerance||0;if($.options.useMIRCuts)this.useMIRCuts=$.options.useMIRCuts;if(typeof $.options.exitOnCycles>"u")this.checkForCycles=true;else this.checkForCycles=$.options.exitOnCycles;if($.options.keep_solutions)this.keep_solutions=$.options.keep_solutions;else this.keep_solutions=false;if($.options.presolve!==void 0)this.usePresolve=$.options.presolve;}let B=$.ints||{},E=$.binaries||{},A=$.unrestricted||{},_=$.optimize,P=!R.some((V)=>(_ in X[V]))&&R.includes(_);for(let V=0;V<J;V+=1){let W=R[V],H=X[W],Q=P?W===_?1:0:H[_]||0,q=!!E[W],N=!!B[W]||q,C=!!A[W],G=this.addVariable(Q,W,N,C);if(q)this.smallerThan(1).addTerm(1,G);let O=Object.keys(H);for(let S=0;S<O.length;S+=1){let D=O[S];if(D===_)continue;let T=H[D],z=K[D];if(z!==void 0)z.addTerm(T,G);let x=Z[D];if(x!==void 0)x.addTerm(T,G);}}return this}getNumberOfIntegerVariables(){return this.integerVariables.length}solve(){if(this.usePresolve&&this.presolveResult===null){if(this.presolveResult=y6(this),this.presolveResult.isInfeasible)return this.tableau.feasible=false,this.tableau.getSolution();this.applyPresolveReductions(this.presolveResult);}if(this.tableauInitialized===false)this.tableau.setModel(this),this.tableauInitialized=true;return this.tableau.solve()}applyPresolveReductions($){for(let[X,Y]of $.fixedVariables)X.value=Y,X.cost=0;}isFeasible(){return this.tableau.feasible}save(){this.tableau.save();}restore(){this.tableau.restore();}activateMIRCuts($){this.useMIRCuts=$;}debug($){this.checkForCycles=$;}log($){return this.tableau.log($)}}var S$={optype:"opType",OpType:"opType",op_type:"opType",type:"opType",optimise:"optimize",Optimize:"optimize",objective:"optimize",constraint:"constraints",Constraints:"constraints",variable:"variables",Variables:"variables",vars:"variables",int:"ints",integers:"ints",Ints:"ints",binary:"binaries",Binaries:"binaries"},h6={minimum:"min",maximum:"max",Min:"min",Max:"max",eq:"equal",equals:"equal",Equal:"equal"};function m6($){let X=Object.keys($);for(let Y of X){let K=S$[Y];if(K)console.warn(`[jsLPSolver] Warning: Model has '${Y}' but expected '${K}'. This may cause unexpected behavior.`);}if(!$.optimize&&!X.some((Y)=>S$[Y]==="optimize"))console.warn("[jsLPSolver] Warning: Model is missing 'optimize' property. The solver needs to know which attribute to optimize.");if(!$.opType&&!X.some((Y)=>S$[Y]==="opType"))console.warn(`[jsLPSolver] Warning: Model is missing 'opType' property. Defaulting to 'max'. Use 'opType: "max"' or 'opType: "min"' to be explicit.`);if($.constraints){for(let[Y,K]of Object.entries($.constraints))if(typeof K==="object"&&K!==null)for(let Z of Object.keys(K)){let U=h6[Z];if(U)console.warn(`[jsLPSolver] Warning: Constraint '${Y}' has '${Z}' but expected '${U}'.`);}}return $}function u6($){let X,Y,K;if(typeof $.optimize==="string"){if($.constraints[$.optimize]){X=Math.random();for(Y in $.variables)if($.variables[Y][$.optimize])$.variables[Y][X]=$.variables[Y][$.optimize];return $.constraints[X]=$.constraints[$.optimize],delete $.constraints[$.optimize],$}return $}else {for(K in $.optimize)if($.constraints[K])if($.constraints[K]==="equal")delete $.optimize[K];else {X=Math.random();for(Y in $.variables)if($.variables[Y][K])$.variables[Y][X]=$.variables[Y][K];$.constraints[X]=$.constraints[K],delete $.constraints[K];}return $}}var m1=Object.freeze({__proto__:null,CleanObjectiveAttributes:u6,WarnOnTypos:m6}),s0={};function g6($){return JSON.parse(JSON.stringify($))}function u1($){if($&&typeof $==="object")return $;throw Error("Polyopt requires the solver to return an object result.")}function c6($,X,Y){for(let K of Y){if(X.variables[K])continue;if(typeof $[K]!=="number")$[K]=0;for(let[Z,U]of Object.entries(X.variables)){let F=U[K],R=$[Z];if(typeof F==="number"&&typeof R==="number")$[K]+=R*F;}}}function p6($,X){return `base-${X.map((K)=>{let Z=$[K];return typeof Z==="number"?Math.round(Z*1000)/1000:0}).join("-")}`}function l6($){var X;let Y={};for(let K of $)for(let[Z,U]of Object.entries(K)){if(typeof U!=="number")continue;let F=(X=Y[Z])!==null&&X!==void 0?X:{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};Y[Z]={min:Math.min(F.min,U),max:Math.max(F.max,U)};}for(let K of $)for(let Z of Object.keys(Y)){if(typeof K[Z]!=="number")K[Z]=0;Y[Z].min=Math.min(Y[Z].min,K[Z]),Y[Z].max=Math.max(Y[Z].max,K[Z]);}for(let[K,Z]of Object.entries(Y))if(!Number.isFinite(Z.min))Y[K]={min:0,max:0};return Y}function g1($,X){let Y=g6(X),K=Y.optimize,Z=Object.keys(K);if(Z.length===0)throw Error("Multi-objective solve requires at least one objective definition.");let U=Y;delete U.optimize,delete U.opType;let F={},R=new Set,J=[];for(let _ of Z)F[_]=0;for(let _ of Z){Y.optimize=_,Y.opType=K[_];let M=u1($.Solve(Y,void 0,void 0,true));c6(M,Y,Z);let P=p6(M,Z);if(R.has(P))continue;R.add(P);for(let q of Z){let N=M[q];if(typeof N==="number")F[q]+=N;}let{feasible:V,result:W,bounded:H,...Q}=M;J.push(Q);}for(let _ of Z)Y.constraints[_]={equal:F[_]/R.size};let B=`cheater-${Math.random()}`;Y.optimize=B,Y.opType="max";for(let _ of Object.values(Y.variables))_[B]=1;let E=l6(J);return {midpoint:u1($.Solve(Y,void 0,void 0,true)),vertices:J,ranges:E}}function d6($){return $&&$.__esModule&&Object.prototype.hasOwnProperty.call($,"default")?$.default:$}function n6($){var X={is_objective:/(max|min)(imize){0,}\:/i,is_int:/^(?!\/\*)\W{0,}int/i,is_bin:/^(?!\/\*)\W{0,}bin/i,is_constraint:/(\>|\<){0,}\=/i,is_unrestricted:/^\S{0,}unrestricted/i,parse_lhs:/(\-|\+){0,1}\s{0,1}\d{0,}\.{0,}\d{0,}\s{0,}[A-Za-z]\S{0,}/gi,parse_rhs:/(\-|\+){0,1}\d{1,}\.{0,}\d{0,}\W{0,}\;{0,1}$/i,parse_dir:/(\>|\<){0,}\=/gi,parse_int:/[^\s|^\,]+/gi,parse_bin:/[^\s|^\,]+/gi,get_num:/(\-|\+){0,1}(\W|^)\d+\.{0,1}\d{0,}/g,get_word:/[A-Za-z].*/},Y={opType:"",optimize:"_obj",constraints:{},variables:{}},K={">=":"min","<=":"max","=":"equal"},Z="",U=null,F="",R="",J="",B=0;if(typeof $==="string")$=$.split(`
`);for(var E=0;E<$.length;E++)if(J="__"+E,Z=$[E],U=null,X.is_objective.test(Z))Y.opType=Z.match(/(max|min)/gi)[0],U=Z.match(X.parse_lhs).map(function(M){return M.replace(/\s+/,"")}).slice(1),U.forEach(function(M){if(F=M.match(X.get_num),F===null)if(M.substr(0,1)==="-")F=-1;else F=1;else F=F[0];F=parseFloat(F),R=M.match(X.get_word)[0].replace(/\;$/,""),Y.variables[R]=Y.variables[R]||{},Y.variables[R]._obj=F;});else if(X.is_int.test(Z))U=Z.match(X.parse_int).slice(1),Y.ints=Y.ints||{},U.forEach(function(M){M=M.replace(";",""),Y.ints[M]=1;});else if(X.is_bin.test(Z))U=Z.match(X.parse_bin).slice(1),Y.binaries=Y.binaries||{},U.forEach(function(M){M=M.replace(";",""),Y.binaries[M]=1;});else if(X.is_constraint.test(Z)){var A=Z.indexOf(":"),_=A===-1?Z:Z.slice(A+1);U=_.match(X.parse_lhs).map(function(M){return M.replace(/\s+/,"")}),U.forEach(function(M){if(F=M.match(X.get_num),F===null)if(M.substr(0,1)==="-")F=-1;else F=1;else F=F[0];F=parseFloat(F),R=M.match(X.get_word)[0],Y.variables[R]=Y.variables[R]||{},Y.variables[R][J]=F;}),B=parseFloat(Z.match(X.parse_rhs)[0]),Z=K[Z.match(X.parse_dir)[0]],Y.constraints[J]=Y.constraints[J]||{},Y.constraints[J][Z]=B;}else if(X.is_unrestricted.test(Z))U=Z.match(X.parse_int).slice(1),Y.unrestricted=Y.unrestricted||{},U.forEach(function(M){M=M.replace(";",""),Y.unrestricted[M]=1;});return Y}function s6($){if(!$)throw Error("Solver requires a model to operate on");var X="",Y={max:"<=",min:">=",equal:"="},K=new RegExp("[^A-Za-z0-9_[{}/.&#$%~'@^]","gi");if($.opType){X+=$.opType+":";for(var Z in $.variables)if($.variables[Z][Z]=$.variables[Z][Z]?$.variables[Z][Z]:1,$.variables[Z][$.optimize])X+=" "+$.variables[Z][$.optimize]+" "+Z.replace(K,"_");}else X+="max:";X+=`;

`;for(var U in $.constraints)for(var F in $.constraints[U])if(typeof Y[F]<"u"){for(var R in $.variables)if(typeof $.variables[R][U]<"u")X+=" "+$.variables[R][U]+" "+R.replace(K,"_");X+=" "+Y[F]+" "+$.constraints[U][F],X+=`;
`;}if($.ints){X+=`

`;for(var J in $.ints)X+="int "+J.replace(K,"_")+`;
`;}if($.unrestricted){X+=`

`;for(var B in $.unrestricted)X+="unrestricted "+B.replace(K,"_")+`;
`;}return X}var o6=function($){if($.length)return n6($);else return s6($)},i6=d6(o6);function c1($,X,Y){return {type:$,varIndex:X,value:Y}}function z0($,X,Y,K,Z,U,F){return {relaxedEvaluation:$,cuts:X,depth:Y,branchVarIndex:K,branchDirection:Z,branchFractionality:U,parentEvaluation:F}}function t6($={}){let{nodeSelection:X="hybrid",branching:Y="pseudocost",useDiving:K=true,strongBranchingCandidates:Z=5}=$,U=new Map,F=(_)=>{let M=U.get(_);if(!M)M={upSum:0,upCount:0,downSum:0,downCount:0},U.set(_,M);return M},R=(_,M,P,V)=>{let W=F(_),H=P/(M==="up"?1-V:V);if(M==="up")W.upSum+=H,W.upCount++;else W.downSum+=H,W.downCount++;},J=(_,M)=>{let P=F(_),V=P.upCount>0?P.upSum/P.upCount:1,W=P.downCount>0?P.downSum/P.downCount:1,H=V*(1-M),Q=W*M;return Math.max(H,0.000001)*Math.max(Q,0.000001)},B=(_,M)=>{let{width:P,matrix:V,rhsColumn:W}=_,H=_.model.integerVariables,Q=_.precision,q=[];for(let N of H){let C=N.index,G=_.rowByVarIndex[C];if(G!==-1){let O=V[G*P+W],S=Math.abs(O-Math.round(O));if(S>Q)q.push({index:C,value:O,fraction:S});}}if(q.length===0)return null;if(Y==="most-fractional")return q.sort((N,C)=>C.fraction-N.fraction),{index:q[0].index,value:q[0].value};if(Y==="pseudocost"){let N=-1/0,C=q[0];for(let G of q){let O=J(G.index,G.fraction);if(O>N)N=O,C=G;}return {index:C.index,value:C.value}}if(Y==="strong"){q.sort((G,O)=>O.fraction-G.fraction),q=q.slice(0,Z);let N=-1/0,C=q[0];for(let G of q){let O=F(G.index);if(O.upCount>=2&&O.downCount>=2){let S=J(G.index,G.fraction);if(S>N)N=S,C=G;}else {let S=G.fraction*(1-G.fraction);if(S>N)N=S,C=G;}}return {index:C.index,value:C.value}}return {index:q[0].index,value:q[0].value}},E=(_,M)=>{var P;if(_.restore(),_.addCutConstraints(M),_.simplex(),((P=_.model)===null||P===void 0?void 0:P.useMIRCuts)&&_.feasible){let V=true,W=0,H=3;while(V&&W<H){let Q=_.computeFractionalVolume(true);_.applyMIRCuts(),_.simplex();let q=_.computeFractionalVolume(true);if(W++,q>=0.9*Q)V=false;}}};return {applyCuts:E,branchAndCut:(_)=>{var M,P,V,W,H;let Q=new i0,q=[],N=0,C=(P=(M=_.model)===null||M===void 0?void 0:M.tolerance)!==null&&P!==void 0?P:0,G=true,O=1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;if((V=_.model)===null||V===void 0?void 0:V.timeout)O=Date.now()+_.model.timeout;let S=1/0,D=null,T=[];for(let j=0;j<_.optionalObjectives.length;j+=1)T.push(1/0);let z=1,x=0,w=X==="depth-first"||X==="hybrid",y=z0(-1/0,[],0),v;if(w)q.push(y);else Q.push(y);while((w?q.length>0:!Q.isEmpty())&&G===true&&Date.now()<O){if((W=_.model)===null||W===void 0?void 0:W.isMinimization)v=_.bestPossibleEval*(1+C);else v=_.bestPossibleEval*(1-C);if(C>0&&S<v)G=false;let j;if(w&&q.length>0)j=q.pop();else if(!Q.isEmpty())j=Q.pop();else break;if(j.relaxedEvaluation>=S)continue;let m=j.cuts;if(_.evaluation,E(_,m),N++,!_.feasible)continue;let h=_.evaluation;if(h>S)continue;if(j.branchVarIndex!==void 0&&j.branchDirection!==void 0&&j.branchFractionality!==void 0&&j.parentEvaluation!==void 0){let b=Math.abs(h-j.parentEvaluation);R(j.branchVarIndex,j.branchDirection,b,j.branchFractionality);}if(h===S){let b=true;for(let f=0;f<_.optionalObjectives.length;f++)if(_.optionalObjectives[f].reducedCosts[0]>T[f])break;else if(_.optionalObjectives[f].reducedCosts[0]<T[f]){b=false;break}if(b)continue}if(_.isIntegral()){if(_.__isIntegral=true,x++,N===1){_.branchAndCutIterations=N;return}D=j,S=h;for(let b=0;b<_.optionalObjectives.length;b++)T[b]=_.optionalObjectives[b].reducedCosts[0];if((H=_.model)===null||H===void 0?void 0:H.keep_solutions){let b=_.model.tableau.getSolution(),f=b.generateSolutionSet();if(f.result=b.evaluation,!_.model.solutions)_.model.solutions=[];_.model.solutions.push(f);}if(X==="hybrid"&&x>=z){w=false;while(q.length>0)Q.push(q.pop());}}else {if(N===1)_.save();let b=B(_);if(!b)continue;let{index:f,value:u}=b,p=[],s=[],X0=m.length;for(let B0=0;B0<X0;B0++){let t=m[B0];if(t.varIndex===f)if(t.type==="min")s.push(t);else p.push(t);else p.push(t),s.push(t);}let e=Math.ceil(u),A0=Math.floor(u),M0=e-u,J0=u-A0,I=c1("min",f,e);p.push(I);let k=c1("max",f,A0);s.push(k);let Y0=j.depth+1;if(w)q.push(z0(h,s,Y0,f,"down",J0,h)),q.push(z0(h,p,Y0,f,"up",M0,h));else Q.push(z0(h,p,Y0,f,"up",M0,h)),Q.push(z0(h,s,Y0,f,"down",J0,h));}}if(D!==null)E(_,D.cuts);_.branchAndCutIterations=N;}}}function r6($){return {matrix:new Float64Array($.matrix),width:$.width,height:$.height,nVars:$.nVars,varIndexByRow:$.varIndexByRow.slice(),varIndexByCol:$.varIndexByCol.slice(),rowByVarIndex:$.rowByVarIndex.slice(),colByVarIndex:$.colByVarIndex.slice(),availableIndexes:$.availableIndexes.slice(),lastElementIndex:$.lastElementIndex,evaluation:$.evaluation,feasible:$.feasible}}function a6($,X){if($.matrix.length>=X.matrix.length)$.matrix.set(X.matrix);else $.matrix=new Float64Array(X.matrix);$.width=X.width,$.height=X.height,$.nVars=X.nVars;let Y=X.height;for(let U=0;U<Y;U++)$.varIndexByRow[U]=X.varIndexByRow[U];$.varIndexByRow.length=Y;let K=X.width;for(let U=0;U<K;U++)$.varIndexByCol[U]=X.varIndexByCol[U];$.varIndexByCol.length=K;let Z=X.nVars;for(let U=0;U<Z;U++)$.rowByVarIndex[U]=X.rowByVarIndex[U],$.colByVarIndex[U]=X.colByVarIndex[U];$.availableIndexes=X.availableIndexes.slice(),$.lastElementIndex=X.lastElementIndex,$.evaluation=X.evaluation,$.feasible=X.feasible;}function p1($,X,Y){return {type:$,varIndex:X,value:Y}}function j0($,X,Y,K,Z){return {relaxedEvaluation:$,cuts:X,depth:Y,parentCheckpoint:K,newCut:Z}}function e6($={}){let{nodeSelection:X="hybrid",branching:Y="pseudocost",maxCheckpoints:K=50}=$,Z=new Map,U=(_)=>{let M=Z.get(_);if(!M)M={upSum:0,upCount:0,downSum:0,downCount:0},Z.set(_,M);return M},F=(_,M,P,V)=>{let W=U(_),H=P/(M==="up"?1-V:V);if(M==="up")W.upSum+=H,W.upCount++;else W.downSum+=H,W.downCount++;},R=(_,M)=>{let P=U(_),V=P.upCount>0?P.upSum/P.upCount:1,W=P.downCount>0?P.downSum/P.downCount:1,H=V*(1-M),Q=W*M;return Math.max(H,0.000001)*Math.max(Q,0.000001)},J=(_)=>{let{width:M,matrix:P,rhsColumn:V}=_,W=_.model.integerVariables,H=_.precision,Q=[];for(let C of W){let G=C.index,O=_.rowByVarIndex[G];if(O!==-1){let S=P[O*M+V],D=Math.abs(S-Math.round(S));if(D>H)Q.push({index:G,value:S,fraction:D});}}if(Q.length===0)return null;if(Y==="most-fractional")return Q.sort((C,G)=>G.fraction-C.fraction),Q[0];let q=-1/0,N=Q[0];for(let C of Q){let G=R(C.index,C.fraction);if(G>q)q=G,N=C;}return N},B=(_,M)=>{var P;if(_.restore(),_.addCutConstraints(M),_.simplex(),((P=_.model)===null||P===void 0?void 0:P.useMIRCuts)&&_.feasible){let V=true,W=0,H=3;while(V&&W<H){let Q=_.computeFractionalVolume(true);_.applyMIRCuts(),_.simplex();let q=_.computeFractionalVolume(true);if(W++,q>=0.9*Q)V=false;}}},E=(_,M)=>{var P;if(M.parentCheckpoint&&M.newCut)a6(_,M.parentCheckpoint),_.addCutConstraints([M.newCut]),_.simplex();else _.restore(),_.addCutConstraints(M.cuts),_.simplex();if(((P=_.model)===null||P===void 0?void 0:P.useMIRCuts)&&_.feasible){let V=true,W=0,H=3;while(V&&W<H){let Q=_.computeFractionalVolume(true);_.applyMIRCuts(),_.simplex();let q=_.computeFractionalVolume(true);if(W++,q>=0.9*Q)V=false;}}};return {applyCuts:B,branchAndCut:(_)=>{var M,P,V,W,H;let Q=new i0,q=[],N=0,C=0,G=(P=(M=_.model)===null||M===void 0?void 0:M.tolerance)!==null&&P!==void 0?P:0,O=true,S=1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;if((V=_.model)===null||V===void 0?void 0:V.timeout)S=Date.now()+_.model.timeout;let D=1/0,T=null,z=[];for(let j=0;j<_.optionalObjectives.length;j++)z.push(1/0);let x=1,w=0,y=X==="depth-first"||X==="hybrid",v=j0(-1/0,[],0);if(y)q.push(v);else Q.push(v);while((y?q.length>0:!Q.isEmpty())&&O===true&&Date.now()<S){let j;if((W=_.model)===null||W===void 0?void 0:W.isMinimization)j=_.bestPossibleEval*(1+G);else j=_.bestPossibleEval*(1-G);if(G>0&&D<j)O=false;let m;if(y&&q.length>0)m=q.pop();else if(!Q.isEmpty())m=Q.pop();else break;if(m.relaxedEvaluation>=D)continue;let h=_.evaluation;if(E(_,m),N++,!_.feasible)continue;let b=_.evaluation;if(b>D)continue;if(m.newCut&&h!==0){let f=Math.abs(b-h);F(m.newCut.varIndex,m.newCut.type==="min"?"up":"down",f,0.5);}if(b===D){let f=true;for(let u=0;u<_.optionalObjectives.length;u++)if(_.optionalObjectives[u].reducedCosts[0]>z[u])break;else if(_.optionalObjectives[u].reducedCosts[0]<z[u]){f=false;break}if(f)continue}if(_.isIntegral()){if(_.__isIntegral=true,w++,N===1){_.branchAndCutIterations=N;return}T=m,D=b;for(let f=0;f<_.optionalObjectives.length;f++)z[f]=_.optionalObjectives[f].reducedCosts[0];if((H=_.model)===null||H===void 0?void 0:H.keep_solutions){let f=_.model.tableau.getSolution(),u=f.generateSolutionSet();if(u.result=f.evaluation,!_.model.solutions)_.model.solutions=[];_.model.solutions.push(u);}if(X==="hybrid"&&w>=x){y=false;while(q.length>0)Q.push(q.pop());}}else {if(N===1)_.save();let f=J(_);if(!f)continue;let{index:u,value:p}=f,s;if(y&&C<K)s=r6(_),C++;let X0=[],e=[],A0=m.cuts.length;for(let B0=0;B0<A0;B0++){let t=m.cuts[B0];if(t.varIndex===u)if(t.type==="min")e.push(t);else X0.push(t);else X0.push(t),e.push(t);}let M0=Math.ceil(p),J0=Math.floor(p),I=p1("min",u,M0);X0.push(I);let k=p1("max",u,J0);e.push(k);let Y0=m.depth+1;if(y)q.push(j0(b,e,Y0,s,k)),q.push(j0(b,X0,Y0,s,I));else Q.push(j0(b,X0,Y0)),Q.push(j0(b,e,Y0));}}if(T!==null)B(_,T.cuts);_.branchAndCutIterations=N;}}}class i1{constructor(){this.Model=o0,this.Tableau=f$,this.Constraint=G0,this.Variable=x0,this.Numeral=s1,this.Term=x$,this.External=s0,this.ReformatLP=i6,this.branchAndCutService=D$(),this.branchAndCut=($)=>this.branchAndCutService.branchAndCut($),this.lastSolvedModel=null;}selectBranchAndCutService($){var X,Y,K,Z;let U=$.options,F=(U===null||U===void 0?void 0:U.nodeSelection)||(U===null||U===void 0?void 0:U.branching);if((U===null||U===void 0?void 0:U.useIncremental)===true)return e6({nodeSelection:(X=U===null||U===void 0?void 0:U.nodeSelection)!==null&&X!==void 0?X:"hybrid",branching:(Y=U===null||U===void 0?void 0:U.branching)!==null&&Y!==void 0?Y:"pseudocost"});if(F)return t6({nodeSelection:(K=U===null||U===void 0?void 0:U.nodeSelection)!==null&&K!==void 0?K:"hybrid",branching:(Z=U===null||U===void 0?void 0:U.branching)!==null&&Z!==void 0?Z:"pseudocost",useDiving:true});return D$()}Solve($,X,Y,K){if(K)for(let F in m1){let R=m1[F];if(typeof R==="function")$=R($);}if(!$)throw Error("Solver requires a model to operate on");if(typeof $.optimize==="object"){if(Object.keys($.optimize).length>1)return g1(this,$)}if($.external)return this.solveWithExternalSolver($);let Z;if(!($ instanceof o0)){let F=this.selectBranchAndCutService($);Z=new o0(X,void 0,F).loadJson($);}else Z=$;let U=Z.solve();if(this.lastSolvedModel=Z,U.solutionSet=U.generateSolutionSet(),Y)return U;return this.buildSimplifiedResult(U)}solveWithExternalSolver($){var X;let Y=Object.keys(s0),K=JSON.stringify(Y);if(!((X=$.external)===null||X===void 0?void 0:X.solver))throw Error(`Model has 'external' object without solver attribute. Available: ${K}`);let Z=$.external.solver;if(!s0[Z])throw Error(`Solver '${Z}' not supported. Available: ${K}`);return s0[Z].solve($)}buildSimplifiedResult($){let X={feasible:$.feasible,result:$.evaluation,bounded:$.bounded};if($._tableau.__isIntegral)X.isIntegral=true;for(let Y of Object.keys($.solutionSet)){let K=$.solutionSet[Y];if(K!==0)X[Y]=K;}return X}MultiObjective($){return g1(this,$)}}var o=new i1;if(typeof define==="function")define([],()=>o);else if(typeof window==="object")window.solver=o;else if(typeof self==="object")self.solver=o;function I0($){if(typeof $!=="function"){let[X,Y]=$;if(X<=0||Y<=0)throw L`all node sizes must be positive, but got width ${X} and height ${Y}`;return ()=>[X,Y]}else {let X=new Map;return (K)=>{let Z=X.get(K);if(Z===void 0){Z=$(K);let[U,F]=Z;if(U<=0||F<=0)throw L`all node sizes must be positive, but got width ${U} and height ${F} for node with data: ${K.data}; make sure the callback passed to \`sugiyama().nodeSize(...)\` is doing that`;X.set(K,Z);}return Z}}}function k$($){if(typeof $!=="function"){let[X,Y]=$;return [()=>X,()=>Y]}else {let X=$;return [(Y)=>X(Y)[0],(Y)=>X(Y)[1]]}}var J7=R5();function B7($,X,Y,K=[],Z=0,U=[0,0]){let F=[],R=[],J=[],B=[],E=[],A=[],_="",M=$.length-1,P=Y[1].length-1;if(!K)for(let H=1;H<=P;H+=1)K[H]=0;if(M!==$[1].length-1)_="Dmat is not symmetric!";if(M!==X.length-1)_="Dmat and dvec are incompatible!";if(M!==Y.length-1)_="Amat and dvec are incompatible!";if(P!==K.length-1)_="Amat and bvec are incompatible!";if(Z>P||Z<0)_="Value of meq is invalid!";if(_!=="")return {message:_};for(let H=1;H<=P;H+=1)R[H]=0,B[H]=0;let V=0,W=Math.min(M,P);for(let H=1;H<=M;H+=1)J[H]=0;F[1]=0;for(let H=1;H<=2*M+W*(W+5)/2+2*P+1;H+=1)E[H]=0;for(let H=1;H<=2;H+=1)A[H]=0;if(J7($,X,M,M,J,B,F,Y,K,M,P,Z,R,V,A,E,U),U[1]===1)_="constraints are inconsistent, no solution!";if(U[1]===2)_="matrix D in quadratic function is not positive definite!";return {solution:J,Lagrangian:B,value:F,unconstrained_solution:X,iterations:A,iact:R,message:_}}var y$=B7;function h$($){let X=0,Y=0;for(let K of $)Y++,X+=(K-X)/Y;return Y?X:void 0}function J5($){let X=[...$];if(X.sort((Y,K)=>Y-K),X.length===0)return;else if(X.length===2)return (X[0]+X[1])/2;else if(X.length%2===0){let Y=X.length/2,K=X[0],Z=X[Y-1],U=X[Y],F=X[X.length-1],R=Z-K,J=F-U;return (Z*J+U*R)/(R+J)}else return X[(X.length-1)/2]}function _7($,X){let Y=new Map;for(let E of $){let A=X.get(E);if(A===void 0)continue;P0(Y,A,E);}let K=[...Y.entries()].sort(([E],[A])=>E-A).flatMap(([,E])=>E),Z=new Map($.map((E,A)=>[E,A])),U=$.filter((E)=>X.get(E)===void 0),F=Array(U.length).fill(null);function R(E,A,_,M){if(A<=E)return;let P=Math.floor((E+A)/2),V=U[P],W=Z.get(V),H=0,Q=[H];for(let N=_;N<M;++N)H+=Z.get(K[N])<W?-1:1,Q.push(H);let q=_+Q.indexOf(Math.min(...Q));F[P]=q,R(E,P,_,q),R(P+1,A,q,M);}R(0,U.length,0,K.length),F.push(K.length+1);let J=0,B=0;for(let[E,A]of K.entries()){while(F[B]===E)$[J++]=U[B++];$[J++]=A;}while(F[B]===K.length)$[J++]=U[B++];}function B5({aggregate:$}){function X(K,Z,U){let[F,R]=U?[Z,K]:[K,Z],J=U?(A)=>A.parents():(A)=>A.children(),B=new Map(R.map((A,_)=>[A,_])),E=new Map(F.map((A)=>{let M=B.get(A)??$(g(J(A),(P)=>B.get(P)));return [A,M]}));_7(F,E);}function Y(K){if(K===void 0)return $;else return B5({aggregate:K})}return X.aggregator=Y,X.d3dagBuiltin=true,X}function m$(...$){if($.length)throw L`got arguments to twolayerAgg(${$}); you probably forgot to construct twolayerAgg before passing to order: \`decrossTwoLayer().order(twolayerAgg())\`, note the trailing "()"`;return B5({aggregate:J5})}function V7($,X,Y,K,Z){if(!X.length)return [];let U=[[0]],F=[0],R=[[0]],J=[0];for(let A of $){let _=[0];_.push(...A),U.push(_);}F.push(...X),R.push(...X.map(()=>[0]));for(let A of Y)for(let[_,M]of A.entries())R[_+1].push(-M);J.push(...K.map((A)=>-A));let{solution:B,message:E}=y$(U,F,R,J,Z);if(E.length)throw d`quadratic program failed: ${E}`;return B.shift(),B}function t0($,X,Y,K,Z=0){X.pop(),$.pop(),$.forEach((F)=>{F.pop();}),Y.forEach((F)=>{F.pop();});let U=V7($,X,Y,K,Z);return U.push(0),U}function E5($){let X=new Map,Y=0;for(let K of $)for(let Z of K)if(!X.has(Z))X.set(Z,Y++);return X}function r0($,X,Y,K=0){let Z=1+Math.max(...X.values()),U=Array(Z).fill(null).map((B,E)=>Array(Z).fill(null).map((A,_)=>E===_?K:0)),F=Array(Z).fill(0),R=[],J=[];for(let B of $)for(let[E,A]of l(B)){let _=X.get(E),M=X.get(A),P=Array(Z).fill(0);P[_]=1,P[M]=-1,R.push(P),J.push(-Y(E,A));}return [U,F,R,J]}function _5($,X,Y,K){$[Y][Y]+=K,$[Y][X]-=K,$[X][Y]-=K,$[X][X]+=K;}function a0($,X,Y,K,Z,U){let F=Z+U;$[K][K]+=U*U,$[K][Y]-=U*F,$[K][X]+=U*Z,$[Y][K]-=F*U,$[Y][Y]+=F*F,$[Y][X]-=F*Z,$[X][K]+=Z*U,$[X][Y]-=Z*F,$[X][X]+=Z*Z;}function e0($,X,Y,K){for(let[F,R]of Y)F.x=K[R];let Z=1/0,U=-1/0;for(let F of $){let R=F[0],J=F[F.length-1];Z=Math.min(Z,R.x-X(void 0,R)),U=Math.max(U,J.x+X(J,void 0));}for(let F of Y.keys())F.x-=Z;return U-Z}function _0($){return h$(K0($,(X)=>g(X.children(),(Y)=>Y.y-X.y)))}function V5([$,X,Y]){if($<=0||X<=0||Y<=0)throw L`simplex weights must be positive, but got: ${$}, ${X}, ${Y}`}function A7($,X){if(typeof X!=="function"){let[Y,K,Z]=X;return (U,F)=>{switch(+(U.data.role==="node")+ +(F.data.role==="node")){case 0:return Z;case 1:return K;case 2:return Y;default:throw d`invalid count`}}}else {let Y=new Map;for(let Z of K0($,(U)=>U))if(Z.data.role==="node"){let U=Z.data.node,F=new Map;for(let R of U.childLinks()){let{target:J}=R,B=X(R);V5(B),F.set(J,B);}Y.set(U,F);}let K=(Z,U)=>{return Y.get(Z)?.get(U)??Y.get(U).get(Z)};return (Z,U)=>{if(Z.data.role==="link"){let{source:F,target:R}=Z.data.link,[,J,B]=K(F,R);return U.data.role==="link"?B:J}else if(U.data.role==="link"){let{source:F,target:R}=U.data.link,[,J]=K(F,R);return J}else {let[F]=K(Z.data.node,U.data.node);return F}}}}function A5($){function X(K,Z){let U={},F={},R=A7(K,$.weight),J=new Map,B=0;for(let G of K)for(let O of G)if(!J.has(O)){let S=`${B++}`;J.set(O,S),U[S]={};}function E(G){return J.get(G)}for(let G of K)for(let[O,S]of l(G)){let D=E(O),T=E(S),z=`layer ${D} -> ${T}`,x=Z(O,S);F[z]={min:x},U[D][z]=-1,U[T][z]=1;}let A=_0(J.keys()),_=1/0,M=0,P=0;for(let G of J.keys()){let O=G.nchildren(),S=G.nparents();if(O>0)M++;if(S>0)P++;let D=E(G);for(let T of G.children()){let z=E(T),x=`link ${D} -> ${z}`,w=`${x} parent`;F[w]={min:0};let y=`${x} child`;F[y]={min:0},U[D][w]=1,U[D][y]=-1,U[z][w]=-1,U[z][y]=1;let v=R(G,T),j=(T.y-G.y)/A,m=v/j;_=Math.min(_,m),U[x]={opt:m,[w]:1,[y]:1};}}let V=_/(M+1),W=_/(P+1);for(let G of J.keys()){let O=G.nchildren(),S=G.nparents();if(O>0){let D=E(G),T=`child ${D}`,z=`${T} pos`,x=`${T} neg`;F[z]={min:0},F[x]={min:0},U[D][z]=1,U[D][x]=-1;let w=1/O;for(let y of G.children()){let v=E(y);U[v][z]=-w,U[v][x]=w;}U[T]={opt:V,[z]:1,[x]:1};}if(S>0){let D=E(G),T=`parents ${D}`,z=`${T} pos`,x=`${T} neg`;F[z]={min:0},F[x]={min:0},U[D][z]=1,U[D][x]=-1;let w=1/S;for(let y of G.parents()){let v=E(y);U[v][z]=-w,U[v][x]=w;}U[T]={opt:W,[z]:1,[x]:1};}}let H=o.Solve({optimize:"opt",opType:"min",variables:U,constraints:F});if(!H.feasible)throw d`could not find a feasible simplex solution`;let Q=H;for(let[G,O]of J)G.x=Q[O]??0;let q=0,N=0;for(let G of K){let O=G[0];q=Math.min(q,O.x-Z(void 0,O));let S=G[G.length-1];N=Math.max(N,S.x+Z(S,void 0));}for(let G of J.keys())G.x-=q;let C=N-q;if(C<=0)throw L`must assign nonzero width to at least one node; double check the callback passed to \`sugiyama().nodeSize(...)\``;else return C}function Y(K){if(K===void 0)return $.weight;else {if(typeof K!=="function")V5(K);let{weight:Z,...U}=$;return A5({...U,weight:K})}}return X.weight=Y,X.d3dagBuiltin=true,X}function u$(...$){if($.length)throw L`got arguments to coordSimplex(${$}); you probably forgot to construct coordSimplex before passing to coord: \`sugiyama().coord(coordSimplex())\`, note the trailing "()"`;else return A5({weight:[1,2,8]})}function M5($,X){let Y=new Map,K=new Map($.map((U,F)=>[U,F]));function Z(U,F){let R=Y.get(U)?.get(F);if(R!==void 0)return R;else if(K.has(U)||K.has(F))return  -1/0;else {let J=0;for(let[A,_]of X(U)){let M=K.get(A);for(let[P,V]of X(F)){let W=K.get(P);J+=Math.sign(M-W)*_*V;}}let B=Y.get(U);if(B===void 0)Y.set(U,new Map([[F,J]]));else B.set(F,J);let E=Y.get(F);if(E===void 0)Y.set(F,new Map([[U,-J]]));else E.set(U,-J);return J}}return Z}function M7($,X){let Y=[[0,$.length]],K;while(K=Y.pop()){let[Z,U]=K;if(Z>=U)continue;let F=0,R=U;for(let J=Z;J<U-1;++J){let B=X($[J],$[J+1]);if(B>F)F=B,R=J;}if(R!==U){let J=$[R+1];$[R+1]=$[R],$[R]=J,Y.push([Z,R+1],[R+1,U]);}}}function P7($,X){let Y=Array($.length*($.length-1)/2);for(;;){let K=0;for(let B=1;B<$.length;++B){let E=0,A=K;for(let _=B-1;_>=0;--_)Y[A]=E,E+=X($[_],$[B]),A-=$.length-_-1;K+=$.length-B;}let Z=0,U=0,F=0,R=0;for(let B=0;B<$.length-1;++B){let E=0;for(let A=B+1;A<$.length;++A){E+=X($[B],$[A]);let _=Y[Z++]+E;if(_>U)U=_,F=B,R=A;}}if(U===0)break;let J=$[R];$[R]=$[F],$[F]=J;}}function g$({baseOp:$,doScan:X}){function Y(U,F,R){$(U,F,R);let J=R?F:U,B=R?M5(U,(E)=>E.parentCounts()):M5(F,(E)=>E.childCounts());if(X)P7(J,B);else M7(J,B);}function K(U){if(U===void 0)return $;else return g$({baseOp:U,doScan:X})}Y.base=K;function Z(U){if(U===void 0)return X;else return g$({baseOp:$,doScan:U})}return Y.scan=Z,Y.d3dagBuiltin=true,Y}function c$(...$){if($.length)throw L`got arguments to twolayerGreedy(${$}); you probably forgot to construct twolayerGreedy before passing to order: \`decrossTwoLayer().order(twolayerGreedy())\`, note the trailing "()"`;return g$({baseOp:()=>{return},doScan:false})}function p$($,X){function Y(K,Z){let U=K?$(K):0,F=Z?$(Z):0,R=(U+F)/2;return K&&Z?R+X:R}return Y}function $$($){let X=0;for(let[Y,K]of l($)){let Z=new Map(K.map((U,F)=>[U,F]));for(let[U,F]of Y.entries())for(let R of Y.slice(U+1))for(let[J,B]of F.childCounts())for(let[E,A]of R.childCounts())if(J!==E&&Z.get(J)>Z.get(E))X+=B*A;}return X}function X$($){function X(U){let F=U.slice().reverse(),R=U.map((E)=>E.slice()),J=$$(R),B=$.inits.length?$.inits:[()=>{return}];for(let E of B){E(U);let A=true;for(let _=0;_<$.passes&&A;++_){A=false;for(let[V,W]of l(U)){let H=W.slice();if($.order(V,W,true),W.some((Q,q)=>H[q]!==Q))A=true;}let M=$$(U);if(M<J)J=M,R=U.map((V)=>V.slice());for(let[V,W]of l(F)){let H=W.slice();if($.order(W,V,false),W.some((Q,q)=>H[q]!==Q))A=true;}let P=$$(U);if(P<J)J=P,R=U.map((V)=>V.slice());}}U.splice(0,U.length,...R);}function Y(U){if(U===void 0)return $.order;else {let{order:F,...R}=$;return X$({...R,order:U})}}X.order=Y;function K(U){if(U===void 0)return [...$.inits];else {let{inits:F,...R}=$;return X$({...R,inits:U})}}X.inits=K;function Z(U){if(U===void 0)return $.passes;else if(U<=0)throw L`number of passes must be positive`;else return X$({...$,passes:U})}return X.passes=Z,X.d3dagBuiltin=true,X}function l$(...$){if($.length)throw L`got arguments to decrossTwoLayer(${$}); you probably forgot to construct decrossTwoLayer before passing to decross: \`sugiyama().decross(decrossTwoLayer())\`, note the trailing "()"`;return X$({order:c$().base(m$()),inits:[q0().topDown(true),q0().topDown(false)],passes:24})}function d$($,X){return +!!($&&X)}function n$($){function X(Z,U){let F={},R={},J=new Map(g(Z.nodes(),(H,Q)=>[H,Q.toString()]));function B(H){return J.get(H)}function E(H){return F[B(H)]}function A(H,Q,q,N,C=0){let G=E(Q),O=E(q),S=`${H}: ${B(Q)} -> ${B(q)}`;R[S]={min:N},G[S]=-1,O[S]=1,G.opt+=C,O.opt-=C;}function _(H,Q,q){A(`${H} before`,Q,q,0),A(`${H} after`,q,Q,0);}let M=[],P=new Map;for(let H of Z.nodes()){let Q=B(H);F[Q]={opt:0};let q=$.rank(H);if(q!==void 0)M.push([q,H]);let N=$.group(H);if(N!==void 0){let C=P.get(N);if(C)C.push(H);else P.set(N,[H]);}}let V=new Set;for(let H of Z.topological($.rank)){for(let[Q,q]of H.childCounts())if(V.has(Q))A("link",Q,H,U(Q,H),q);else A("link",H,Q,U(H,Q),q);V.add(H);}let W=M.sort(([H],[Q])=>H-Q);for(let[[H,Q],[q,N]]of l(W))if(H<q)A("rank",Q,N,U(Q,N));else _("rank",Q,N);for(let H of P.values())for(let[Q,q]of l(H))_("group",Q,q);try{let H=o.Solve({optimize:"opt",opType:"max",variables:F,constraints:R,ints:{}});if(!H.feasible)throw d`could not find a feasible simplex solution`;let Q=H,q=0,N=0;for(let C of Z.nodes()){let G=Q[B(C)]??0;C.y=G,q=Math.min(q,G-U(void 0,C)),N=Math.max(N,G+U(C,void 0));}for(let C of Z.nodes())C.y-=q;return N-q}catch{if(P.size)throw L`could not find a feasible simplex layout; this is likely due to group constraints producing an infeasible layout, try relaxing the functions you're passing to \`layeringSimplex().group(...)\``;else throw d`could not find a feasible simplex solution`}}function Y(Z){if(Z===void 0)return $.rank;else {let{rank:U,...F}=$;return n$({...F,rank:Z})}}X.rank=Y;function K(Z){if(Z===void 0)return $.group;else {let{group:U,...F}=$;return n$({...F,group:Z})}}return X.group=K,X.d3dagBuiltin=true,X}function P5(){return}function s$(...$){if($.length)throw L`got arguments to layeringSimplex(${$}); you probably forgot to construct layeringSimplex before passing to layering: \`sugiyama().layering(layeringSimplex())\`, note the trailing "()"`;return n$({rank:P5,group:P5})}function H5($,X,Y,K){for(let[U,[F,R]]of X){let J=F.bottomLayer;for(let B of U.childLinks()){let[E,A]=X.get(B.target),_=E.topLayer;if(_>J){let M=R;for(let P=J+1;P<_;++P){let V=$.node({link:B,layer:P,role:"link"});M.child(V,void 0),M=V;}M.child(A);}else if(_<J){let M=A;for(let P=_+1;P<J;++P){let V=$.node({link:B,layer:P,role:"link"});M.child(V,void 0),M=V;}M.child(R);}else throw r`layering ${K} assigned nodes with an edge to the same layer`}}let Z=Array(Y).fill(null).map(()=>[]);for(let U of $.nodes()){let{data:F}=U;if(F.role==="node"){let{topLayer:R,bottomLayer:J}=F;for(let B=R;B<=J;++B)Z[B].push(U);}else {let{layer:R}=F;Z[R].push(U);}}for(let U of Z)if(!U.length)throw r`layering ${K} didn't assign a node to every layer`;return Z}function o$($,X,Y,K,Z){let U=i(),F=Array(K).fill(false),R=new Map;for(let _ of $.nodes()){let M=_.uy;if(M===void 0)throw r`layering ${Z} didn't assign a layer to a node`;else if(M<0||M>=K)throw r`layering ${Z} assigned node an invalid layer: ${M}`;else {if(!F[M]){for(let V of a(_.parents(),_.children()))if(V.uy===M-1&&_.nparentLinksTo(V)+_.nchildLinksTo(V)>1){F[M]=true;break}}let P={node:_,topLayer:M,bottomLayer:M,role:"node"};R.set(_,[P,U.node(P)]);}}let J=0,B=F.map((_)=>J+=+_);for(let[_]of R.values()){let M=B[_.topLayer];_.topLayer+=M,_.bottomLayer+=M;}let E=H5(U,R,K+J,Z),A=-Y;for(let _ of E){A+=Y;let M=Math.max(-Y,...g(_,({data:V})=>V.role==="node"?X(V.node):-1/0)),P=A+M/2;for(let V of _)V.y=P;A+=M;}return [E,A]}function i$($){for(let X of $)for(let Y of X)if(Y.data.role==="node"){let{node:K}=Y.data;K.x=Y.x,K.y=Y.y;for(let Z of Y.children()){let U=[[Y.x,Y.y]],F;while(Z.data.role==="link")F=Z.data.link,U.push([Z.x,Z.y]),[Z]=Z.children();U.push([Z.x,Z.y]);let R=Z.data.node,J=a(K.childLinksTo(R),K.parentLinksTo(R));if(!F)[F]=J;if(F.source!==K)U.reverse();F.points.splice(0,F.points.length,...U);}}}function t$($,X=0){return ({data:Y})=>Y.role==="node"?$(Y.node):X}function W5($,X,Y,K,Z=0.001){for(let U of $){for(let F of U)if(F.ux===void 0)throw r`coord ${K} didn't assign an x to every node`;for(let[[F,R],[J,B]]of l(a([[void 0,0]],g(U,(E)=>[E,E.x]),[[void 0,Y]])))if(B-R<X(F,J)-Z)throw r`coord ${K} assigned nodes too close for separation`}}function V0($,X){function Y(B){let E;if(!B.nnodes())E={width:0,height:0};else {let[A,_]=k$(I0($.nodeSize)),[M,P]=X.gap,V=$.layering(B,d$)+1,[W,H]=o$(B,_,P,V,$.layering);$.decross(W);let Q=p$(t$(A),M),q=$.coord(W,Q);W5(W,Q,q,$.coord),i$(W),E={width:q,height:H};}for(let A of $.tweaks)E=A(B,E);return E}function K(B){if(B===void 0)return $.layering;else {let{layering:E,...A}=$;return V0({...A,layering:B},X)}}Y.layering=K;function Z(B){if(B===void 0)return $.decross;else {let{decross:E,...A}=$;return V0({...A,decross:B},X)}}Y.decross=Z;function U(B){if(B===void 0)return $.coord;else {let{coord:E,...A}=$;return V0({...A,coord:B},X)}}Y.coord=U;function F(B){if(B===void 0)return $.tweaks;else {let{tweaks:E,...A}=$;return V0({...A,tweaks:B},X)}}Y.tweaks=F;function R(B){if(B===void 0)return $.nodeSize;else if(typeof B!=="function"&&(B[0]<=0||B[1]<=0)){let[E,A]=B;throw L`constant nodeSize must be positive, but got: [${E}, ${A}]`}else {let{nodeSize:E,...A}=$;return V0({...A,nodeSize:B},X)}}Y.nodeSize=R;function J(B){if(B!==void 0){let[E,A]=B;if(E<0||A<0)throw L`gap width (${E}) and height (${A}) must be non-negative`;return V0($,{...X,gap:B})}else {let[E,A]=X.gap;return [E,A]}}return Y.gap=J,Y}function w0(...$){if($.length)throw L`got arguments to sugiyama(${$}), but constructor takes no arguments; these were probably meant as data which should be called as \`sugiyama()(...)\``;else return V0({layering:s$(),decross:l$(),coord:u$(),nodeSize:[1,1],tweaks:[]},{gap:[1,1]})}function I7($,X){for(let Z of $.nodes()){let U=Z.x;Z.x=Z.y,Z.y=U;}for(let Z of $.links())for(let U of Z.points){let[F]=U;U[0]=U[1],U[1]=F;}let{width:Y,height:K}=X;return {width:K,height:Y}}function N7($,X){let{height:Y}=X;for(let K of $.nodes())K.y=Y-K.y;for(let K of $.links())for(let Z of K.points)Z[1]=Y-Z[1];return X}function C7($,X){let{width:Y}=X;for(let K of $.nodes())K.x=Y-K.x;for(let K of $.links())for(let Z of K.points)Z[0]=Y-Z[0];return X}function k0($="diagonal"){if($==="diagonal")return I7;else if($==="vertical")return N7;else if($==="horizontal")return C7;else throw L`invalid tweakFlip style: ${$}`}function y0($){if(typeof $!=="string")throw L`id is supposed to be type string but got type ${typeof $}`;return $}function h0($){function X(F){let R=i(),J=new Map;for(let[B,E]of F.entries()){let A=y0($.sourceId(E,B)),_=J.get(A);if(_===void 0)_=R.node($.nodeDatum(A,B)),J.set(A,_);let M=y0($.targetId(E,B)),P=J.get(M);if(P===void 0)P=R.node($.nodeDatum(M,B)),J.set(M,P);if(A!==M||!$.single)R.link(_,P,E);}return R}function Y(F){if(F===void 0)return $.sourceId;else {let{sourceId:R,...J}=$;return h0({...J,sourceId:F})}}X.sourceId=Y;function K(F){if(F===void 0)return $.targetId;else {let{targetId:R,...J}=$;return h0({...J,targetId:F})}}X.targetId=K;function Z(F){if(F===void 0)return $.nodeDatum;else {let{nodeDatum:R,...J}=$;return h0({...J,nodeDatum:F})}}X.nodeDatum=Z;function U(F){if(F===void 0)return $.single;else return h0({...$,single:F})}return X.single=U,X}function f7($){if(typeof $!=="object"||$===null||!(0 in $))throw L`default source id expected datum[0] to exist but got datum: ${$}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``;let X=$[0];if(typeof X==="string")return X;else throw L`default source id expected datum[0] to be a string but got datum: ${$}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``}function b7($){if(typeof $!=="object"||$===null||!(1 in $))throw L`default target id expected datum[1] to exist but got datum: ${$}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``;let X=$[1];if(typeof X==="string")return X;else throw L`default target id expected datum[1] to be a string but got datum: ${$}; you should check the data you're passing to \`graphConnect()\` to make sure it looks like \`[[source_id, target_id], ...]\` or set a custom accessor with \`graphConnect().source(d => ...).target(d => ...)\``}function w7($){return $}function k7(...$){if($.length)throw L`got arguments to graphConnect(${$}), but constructor takes no arguments; these were probably meant as data which should be called as \`graphConnect()(...)\``;else return h0({sourceId:f7,targetId:b7,nodeDatum:w7,single:false})}function K$($){function X(U){let F=i(),R=new Map,J=[];for(let[B,E]of U.entries()){let A=y0($.id(E,B)),_=F.node(E),M=$.parentData(E,B)??[];for(let[P,V]of M)J.push([P,_,V]);if(R.has(A))throw L`found a duplicate id: ${A}, but ids passed to \`graphStratify()\` must be unique`;else R.set(A,_);}for(let[B,E,A]of J){let _=R.get(B);if(!_)throw L`missing id: ${B}; this id was references in a node's parentIds, but no node with that id exists`;F.link(_,E,A);}return F}function Y(U){if(U===void 0)return $.id;else {let{id:F,...R}=$;return K$({...R,id:U})}}X.id=Y;function K(U){if(U===void 0)return $.parentData;else {let{parentIds:F,parentData:R,...J}=$;return K$({...J,parentIds:m7(U),parentData:U})}}X.parentData=K;function Z(U){if(U===void 0)return $.parentIds;else {let{parentIds:F,parentData:R,...J}=$;return K$({...J,parentIds:U,parentData:S5(U)})}}return X.parentIds=Z,X}function S5($){function X(Y,K){return g($(Y,K)??[],(Z)=>[Z,void 0])}return X.wrapped=$,X}function m7($){function X(Y,K){return g($(Y,K)??[],([Z])=>Z)}return X.wrapped=$,X}function u7($){if(typeof $!=="object"||$===null||!("id"in $))throw L`datum did not have an id field, and no id accessor was specified; try calling \`graphStratify().id(d => d...)\` to set a custom id accessor`;let{id:X}=$;if(typeof X==="string")return X;else throw L`datum has an id field that was not a string, and no id accessor was specified; try calling \`graphStratify().id(d => d...)\` to set a custom id accessor`}function T5($){if(typeof $!=="object"||$===null)throw L`default parentIds function expected datum to be an object but got: ${$}; try setting a custom accessor for parentIds with \`graphStratify().parentIds(d => ...)\``;else if(!("parentIds"in $))return;let{parentIds:X}=$;if(X===void 0||g0(X)&&G1(X,(Y)=>typeof Y==="string"))return X;else throw L`default parentIds function expected parentIds to be an iterable of strings but got: ${X}; try setting a custom accessor for parentIds with \`graphStratify().parentIds(d => ...)\``}function g7(...$){if($.length)throw L`got arguments to graphStratify(${$}), but constructor takes no arguments; these were probably meant as data which should be called as \`graphStratify()(...)\``;else return K$({id:u7,parentIds:T5,parentData:S5(T5)})}function d7($,X){if(typeof $!=="function")return ()=>$;else {let Y=new Map;for(let K of K0(X,(Z)=>Z))if(K.data.role==="node"){let Z=K.data.node,U=new Map;for(let F of Z.childLinks()){let R=$(F);if(R<0)throw L`link weights must be non-negative; double check the accessor passed into \`coordQuad().vertWeak(...)\``;else U.set(F.target,R);}Y.set(Z,U);}return (K,Z)=>Y.get(K)?.get(Z)??Y.get(Z).get(K)}}function U1($,X,Y){if(typeof $!=="function")return ()=>$;else {let K=new Map;return (Z)=>{let U=K.get(Z);if(U===void 0){let F=$(Z);if(F<0)throw Error(`${X} weights must be non-negative; double check the accessor passed into \`coordQuad().${Y}(...)\``);else return K.set(Z,F),F}else return U}}}function N0($){function X(R,J){let B=E5(R),[E,A,_,M]=r0(R,B,J,$.comp),P=d7($.vertWeak,R),V=U1($.vertStrong,"link","vertStrong"),W=U1($.linkCurve,"link","linkCurve"),H=U1($.nodeCurve,"node","nodeCurve"),Q=_0(B.keys());for(let[N,C]of B){let G=N.data;for(let O of N.children()){let S=B.get(O),D=O.data,T,z;if(G.role==="link")T=G.link.source,z=G.link.target;else if(D.role==="link")T=D.link.source,z=D.link.target;else T=G.node,z=D.node;let x=G.role==="node"?P(T,z):V(G.link),w=D.role==="node"?P(T,z):V(D.link),y=D.role==="node"?H(D.node):W(D.link),v=(O.y-N.y)/Q;_5(E,C,S,(x+w)/v);for(let j of O.children()){let m=B.get(j),h=(j.y-O.y)/Q;a0(E,C,S,m,y/v,y/h);}}}let q;try{let N=t0(E,A,_,M);q=e0(R,J,B,N);}catch(N){if(typeof N==="string")throw d`${N}`;else throw d`undefined quadprog exception`}if(q<=0)throw L`must assign nonzero width to at least one node; double check the callback passed to \`sugiyama().nodeSize(...)\``;else return q}function Y(R){if(R===void 0)return $.vertWeak;else if(typeof R==="number"&&R<0)throw L`vertWeak must be non-negative but was: ${R}`;else {let{vertWeak:J,...B}=$;return N0({...B,vertWeak:R})}}X.vertWeak=Y;function K(R){if(R===void 0)return $.vertStrong;else if(typeof R==="number"&&R<0)throw L`vertStrong must be non-negative but was: ${R}`;else {let{vertStrong:J,...B}=$;return N0({...B,vertStrong:R})}}X.vertStrong=K;function Z(R){if(R===void 0)return $.linkCurve;else if(typeof R==="number"&&R<0)throw L`linkCurve must be non-negative but was: ${R}`;else {let{linkCurve:J,...B}=$;return N0({...B,linkCurve:R})}}X.linkCurve=Z;function U(R){if(R===void 0)return $.nodeCurve;else if(typeof R==="number"&&R<0)throw L`nodeCurve must be non-negative but was: ${R}`;else {let{nodeCurve:J,...B}=$;return N0({...B,nodeCurve:R})}}X.nodeCurve=U;function F(R){if(R===void 0)return $.comp;else if(R<=0)throw L`compress weight must be positive, but was: ${R}`;else return N0({...$,comp:R})}return X.compress=F,X.d3dagBuiltin=true,X}function n7(...$){if($.length)throw L`got arguments to coordQuad(${$}); you probably forgot to construct coordQuad before passing to coord: \`sugiyama().coord(coordQuad())\`, note the trailing "()"`;else return N0({vertWeak:1,vertStrong:0,linkCurve:1,nodeCurve:0,comp:0.000001})}

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
	        return [k0('diagonal')];
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
	            const nodePrio = { ...partnerPrio };
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
	            layering: s$(),
	            decross: customSugiyamaDecross,
	            coord: n7(),
	            orientation: Horizontal,
	        };
	        this.opts = { ...this.opts, ...opts };
	    }
	    /**
	     * Calculates the layout for the given nodes.
	     * Builds a temporary graph from the visible nodes, applies the Sugiyama layout,
	     * and writes the computed x/y coordinates back to the nodes.
	     */
	    calculateLayout(nodes) {
	        // build a temporary graph from the visible nodes
	        const builder = g7()
	            .id((n) => n.data.id)
	            .parentIds((n) => n.visibleParentIDs());
	        const graph = builder(nodes);
	        // define the layout
	        const layout = w0()
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
	        const builder = k7().nodeDatum((id) => {
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
	                Object.assign(union, {
	                    ...data.unions[id],
	                    id: id,
	                    type: CUnion,
	                    visible: (_c = union.visible) !== null && _c !== void 0 ? _c : false,
	                    insertedBy: (_d = union.insertedBy) !== null && _d !== void 0 ? _d : null,
	                });
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
	        const builder = g7();
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
	            nodeRightClickFunction: D3Renderer.defaultNodeRightClickFunction,
	            nodeCSSClassFunction: D3Renderer.defaultNodeCSSClassFunction,
	            nodeLabelFunction: D3Renderer.defaultNodeLabelFunction,
	            nodeTooltipFunction: D3Renderer.defaultNodeTooltipFunction,
	            nodeSizeFunction: D3Renderer.defaultNodeSizeFunction,
	        };
	        this.ft = ft;
	        this.opts = { ...this.opts, ...opts };
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
	     * Default node right-click handler: doesn't do anything.
	     */
	    static defaultNodeRightClickFunction(node, ft) {
	        return;
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
	            .on('contextmenu', (event, d) => this.opts.nodeRightClickFunction(d, this.ft))
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
	        if (this.data.links.some(([s, t]) => s === sourceId && t === targetId)) {
	            console$1.warn(`Link from ${sourceId} to ${targetId} already exists. Skipping add.`);
	            return;
	        }
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
