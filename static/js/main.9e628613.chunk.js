(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{55:function(e,t,a){e.exports=a(75)},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},71:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(33),i=a.n(o);a(60),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(12),s=a(8),c=a(13),u=a(14),d=a(17),m=(a(61),a(18)),h=(a(62),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isStart,a=e.isFinish,n=e.isWall,o=e.row,i=e.col,l=e.onMouseDown,s=e.onMouseEnter,c=e.onMouseUp,u=a?"node-finish":t?"node-start":n?"node-wall":"node-empty";return r.a.createElement("td",{id:"node-".concat(o,"-").concat(i),key:"node-".concat(o,"-").concat(i),className:"node ".concat(u),onMouseDown:function(){return l(o,i)},onMouseEnter:function(){return s(o,i)},onMouseUp:function(){return c()}})}}]),t}(n.Component));a(63);function f(e,t,a){var n=[];t.distance=0;for(var r=function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done);a=!0){var l=o.value,s=!0,c=!1,u=void 0;try{for(var d,m=l[Symbol.iterator]();!(s=(d=m.next()).done);s=!0){var h=d.value;t.push(h)}}catch(f){c=!0,u=f}finally{try{s||null==m.return||m.return()}finally{if(c)throw u}}}}catch(f){n=!0,r=f}finally{try{a||null==i.return||i.return()}finally{if(n)throw r}}return t}(e);r.length;){v(r);var o=r.shift();if(o===a)return n;if(!o.isWall||o.isStart){if(o.distance===1/0)return n;o.isVisited=!0,n.push(o),g(o,e)}}return n}function v(e){e.sort((function(e,t){return e.distance-t.distance}))}function g(e,t){var a=function(e,t){var a=[],n=e.col,r=e.row;return r>0&&a.push(t[r-1][n]),r<t.length-1&&a.push(t[r+1][n]),n>0&&a.push(t[r][n-1]),n<t[0].length-1&&a.push(t[r][n+1]),a.filter((function(e){return!e.isVisited}))}(e,t),n=!0,r=!1,o=void 0;try{for(var i,l=a[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var s=i.value;s.distance=e.distance+1,s.previousNode=e}}catch(c){r=!0,o=c}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}}function w(e){for(var t=[],a=e;null!==a;)t.unshift(a),a=a.previousNode;return t}var E={algorithmSelected:"Dijkstra",enableVisualize:!1,toggleAlgorithm:function(){},toggleEnable:function(){},toggleClear:function(){},completedVisualize:!1,clearBoard:!1,mazeSelected:null,toggleMaze:function(){},clearWalls:!1,toggleClearWalls:function(){},clearPath:!1,toggleClearPath:function(){}},p=r.a.createContext(E),S=function(e,t){for(var a=[],n=0;n<e;n++){for(var r=[],o=0;o<t;o++)r.push(y(n,o));a.push(r)}return a},N=function(e,t,a,n){for(var r=[],o=0;o<e;o++){for(var i=[],l=0;l<t;l++)i.push({col:l,row:o,isStart:o===a[0]&&l===a[1],isFinish:o===n[0]&&l===n[1],distance:1/0,isVisited:!1,isWall:!1,previousNode:null,timestamp:Date.now(),f:1/0,g:1/0,h:1/0});r.push(i)}return r},O=function(e,t,a){for(var n=e.slice(),r=0;r<t;r++)for(var o=0;o<a;o++){document.getElementById("node-".concat(r,"-").concat(o)).className=5===r&&5===o?"node node-start":5===r&&15===o?"node node-finish":"node node-empty";var i={col:o,row:r,isStart:5===r&&5===o,isFinish:5===r&&15===o,distance:1/0,isVisited:!1,isWall:!1,previousNode:null,timestamp:Date.now(),f:1/0,g:1/0,h:1/0};n[r][o]=i}return n},y=function(e,t){return{col:t,row:e,isStart:5===e&&5===t,isFinish:5===e&&15===t,distance:1/0,isVisited:!1,isWall:!1,previousNode:null,timestamp:Date.now(),f:1/0,g:1/0,h:1/0}},C=function(e,t,a){if(e[t][a].isStart||e[t][a].isFinish)return null;var n=e.slice(),r=n[t][a],o=Object(m.a)({},r,{isWall:!r.isWall,isVisited:!1,distance:1/0,previousNode:null,timestamp:Date.now()});return n[t][a]=o,n},b=a(40),T=a.n(b);function _(e,t,a,n,r){for(var o,i=[],l=[],s=[],c=0;c<n;c++){for(var u=[],d=0;d<r;d++)u.push(!1);l.push(u)}t.f=0,t.g=0,t.h=0,i.push(t);for(var m=!1;0!==i.length;){if(i.length>0&&i.sort((function(e,t){return e.f-t.f})),l[(o=i.shift()).row][o.col]=!0,s.push(o),W(o.row-1,o.col,n,r)){if(P(o.row-1,o.col,e)){m=!0,e[o.row-1][o.col].previousNode=o;break}if(!l[o.row-1][o.col]&&!M(o.row-1,o.col,e)){var h=o.g+1,f=k(e[o.row-1][o.col],a),v=h+f;(e[o.row-1][o.col].f===1/0||e[o.row-1][o.col].f>v)&&(i.push(e[o.row-1][o.col]),e[o.row-1][o.col].f=v,e[o.row-1][o.col].g=h,e[o.row-1][o.col].h=f,e[o.row-1][o.col].previousNode=o)}}if(W(o.row+1,o.col,n,r)){if(P(o.row+1,o.col,e)){m=!0,e[o.row+1][o.col].previousNode=o;break}if(!l[o.row+1][o.col]&&!M(o.row+1,o.col,e)){var g=o.g+1,w=k(e[o.row+1][o.col],a),E=g+w;(e[o.row+1][o.col].f===1/0||e[o.row+1][o.col].f>E)&&(i.push(e[o.row+1][o.col]),e[o.row+1][o.col].f=E,e[o.row+1][o.col].g=g,e[o.row+1][o.col].h=w,e[o.row+1][o.col].previousNode=o)}}if(W(o.row,o.col+1,n,r)){if(P(o.row,o.col+1,e)){m=!0,e[o.row][o.col+1].previousNode=o;break}if(!l[o.row][o.col+1]&&!M(o.row,o.col+1,e)){var p=o.g+1,S=k(e[o.row][o.col+1],a),N=p+S;(e[o.row][o.col+1].f===1/0||e[o.row][o.col+1].f>N)&&(i.push(e[o.row][o.col+1]),e[o.row][o.col+1].f=N,e[o.row][o.col+1].g=p,e[o.row][o.col+1].h=S,e[o.row][o.col+1].previousNode=o)}}if(W(o.row,o.col-1,n,r)){if(P(o.row,o.col-1,e)){m=!0,e[o.row][o.col-1].previousNode=o;break}if(!l[o.row][o.col-1]&&!M(o.row,o.col-1,e)){var O=o.g+1,y=k(e[o.row][o.col-1],a),C=O+y;(e[o.row][o.col-1].f===1/0||e[o.row][o.col-1].f>C)&&(i.push(e[o.row][o.col-1]),e[o.row][o.col-1].f=C,e[o.row][o.col-1].g=O,e[o.row][o.col-1].h=y,e[o.row][o.col-1].previousNode=o)}}}return m?(s.push(a),s):null}function W(e,t,a,n){return e>=0&&t>=0&&e<a&&t<n}function M(e,t,a){return!!a[e][t].isWall}function P(e,t,a){return!!a[e][t].isFinish}function k(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}function A(e,t,a,n,r){for(var o=[],i=0;i<r;i++)o.push(e[0][i]);for(var l=0,s=0;s<n-1;s++)o.push(e[s][l]),s===n-2&&0===l&&(s=0,l=r-1);for(var c=0;c<r;c++)o.push(e[n-1][c]);return function e(t,a,n,r,o,i,l,s,c,u){if(r-i<2||o-l<2)return;var d=Math.floor(Math.random()*[0,1].length);c&&(d=!c);var m=D(t,d,r,o,i,l,c,u);null===m&&(m=D(t,d=!d,r,o,i,l,c,u));var h=function(e,t,a,n,r,o){var i=[];if(o){for(var l=n;l<t;l++)l%2!==0&&i.push(l);return i[Math.floor(Math.random()*i.length)]}for(var s=r;s<a;s++)s%2!==0&&i.push(s);return i[Math.floor(Math.random()*i.length)]}(0,r,o,i,l,d);if(d){for(var f=i;f<=r;f++)f!==h&&s.push(t[m][f]);e(t,a,n,r,m-1,i,l,s,d,h),e(t,a,n,r,o,i,m+1,s,d,h)}else{for(var v=l;v<=o;v++)v!==h&&s.push(t[v][m]);e(t,a,n,r,o,m+1,l,s,d,h),e(t,a,n,m-1,o,i,l,s,d,h)}}(e,t,a,r-2,n-2,1,1,o),o}function D(e,t,a,n,r,o,i,l){var s,c,u,d,m=!0;if(t){if(z(e,s=(u=F(o,n))[d=Math.floor(Math.random()*u.length)],c,a,n,r,o,t,i,l))return s;for(;m;){if(0===u.length)return null;if(z(e,s,c,a,n,r,o,t,i,l))m=!1;else{for(var h=0;h<u.length;h++)h===d&&(u.splice(h,1),h--);s=u[d=Math.floor(Math.random()*u.length)]}}return s}if(z(e,s,c=(u=F(r,a))[d=Math.floor(Math.random()*u.length)],a,n,r,o,t,i,l))return c;for(;m;){if(0===u.length)return null;if(z(e,s,c,a,n,r,o,t,i,l))m=!1;else{for(var f=0;f<u.length;f++)f===d&&(u.splice(f,1),f--);c=u[d=Math.floor(Math.random()*u.length)]}}return c}function z(e,t,a,n,r,o,i,l,s,c){return l?!(l^s&&t===c)&&((r-t)%2===1&&(t-i)%2===1):!(l^s&&a===c)&&((n-a)%2===1&&(a-o)%2===1)}function F(e,t){for(var a=[],n=e;n<=t;n++)n%2===0&&a.push(n);return a}function U(e,t,a,n,r,o){for(var i=0;i<n;i++)for(var l=0;l<r;l++)e[i][l].isWall||(e[i][l].isVisited=!1,e[i][l].previousNode=null);return function(e,t,a,n,r,o){var i,l=[],s=[];l.push(t);for(;0!==l.length;){if((i=l.pop()).isVisited=!0,s.push(i),j(i,a))return s;I(e,i,n,r,o).forEach((function(e){l.push(e)}))}return s}(e,t,a,n,r,o)}function j(e,t){return e.row===t.row&&e.col===t.col}function I(e,t,a,n,r){var o,i=[];return!B(t.row+1,t.col,a,n)||R(t.row+1,t.col,e)||V(t.row+1,t.col,e)||i.push(e[t.row+1][t.col]),!B(t.row-1,t.col,a,n)||R(t.row-1,t.col,e)||V(t.row-1,t.col,e)||i.push(e[t.row-1][t.col]),!B(t.row,t.col+1,a,n)||R(t.row,t.col+1,e)||V(t.row,t.col+1,e)||i.push(e[t.row][t.col+1]),!B(t.row,t.col-1,a,n)||R(t.row,t.col-1,e)||V(t.row,t.col-1,e)||i.push(e[t.row][t.col-1]),r?((o=i).sort((function(){return Math.random()-.5})),o):i}function B(e,t,a,n){return e>=0&&t>=0&&e<a&&t<n}function R(e,t,a){return!!a[e][t].isWall}function V(e,t,a){return a[e][t].isVisited}function L(){return Math.random()>=.7}function x(e,t,a){var n=[];t.distance=0;for(var r=function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done);a=!0){var l=o.value,s=!0,c=!1,u=void 0;try{for(var d,m=l[Symbol.iterator]();!(s=(d=m.next()).done);s=!0){var h=d.value;t.push(h)}}catch(f){c=!0,u=f}finally{try{s||null==m.return||m.return()}finally{if(c)throw u}}}}catch(f){n=!0,r=f}finally{try{a||null==i.return||i.return()}finally{if(n)throw r}}return t}(e);r.length;){Z(r);var o=r.shift();if(o===a)return n;if(!o.isWall||o.isStart){if(o.distance===1/0)return n;o.isVisited=!0,n.push(o),G(o,e)}}return n}function Z(e){e.sort((function(e,t){return e.distance-t.distance}))}function G(e,t){var a=function(e,t){var a=[],n=e.col,r=e.row;return r>0&&a.push(t[r-1][n]),r<t.length-1&&a.push(t[r+1][n]),n>0&&a.push(t[r][n-1]),n<t[0].length-1&&a.push(t[r][n+1]),a.filter((function(e){return!e.isVisited}))}(e,t),n=!0,r=!1,o=void 0;try{for(var i,l=a[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var s=i.value;s.distance=e.distance+1,s.previousNode=e}}catch(c){r=!0,o=c}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}}var H=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={grid:S(a.props.row_count,a.props.col_count),mousePressed:!1,wallDrawing:!1,moveStartNode:!1,moveEndNode:!1,curStartPos:[5,5],curEndPos:[5,15],computed:!1,available:!0,curAlgorithm:"",ROW_COUNT:a.props.row_count,COL_COUNT:a.props.col_count},a}return Object(d.a)(t,e),Object(s.a)(t,null,[{key:"getDerivedStateFromProps",value:function(e,t){return!t.available||e.col_count===t.COL_COUNT&&e.row_count===t.ROW_COUNT?t:Object(m.a)({},t,{COL_COUNT:e.col_count,ROW_COUNT:e.row_count,grid:N(e.row_count,e.col_count,t.curStartPos,t.curEndPos)})}}]),Object(s.a)(t,[{key:"clear",value:function(){this.setState({grid:O(this.state.grid,this.state.ROW_COUNT,this.state.COL_COUNT),mousePressed:!1,wallDrawing:!1,moveStartNode:!1,moveEndNode:!1,curStartPos:[5,5],curEndPos:[5,15],computed:!1,available:!0,curAlgorithm:""})}},{key:"clearWalls",value:function(){for(var e=this.state.grid,t=0;t<this.state.ROW_COUNT;t++)for(var a=0;a<this.state.COL_COUNT;a++)e[t][a].isStart||e[t][a].isFinish||e[t][a].isVisited||e[t][a].isWall&&(e[t][a].isWall=!e[t][a].isWall,document.getElementById("node-".concat(t,"-").concat(a)).className="node node-empty")}},{key:"clearPath",value:function(){for(var e=this.state.grid,t=0;t<this.state.ROW_COUNT;t++)for(var a=0;a<this.state.COL_COUNT;a++)!e[t][a].isVisited||e[t][a].isStart||e[t][a].isFinish||(e[t][a].isVisited=!e[t][a].isVisited,document.getElementById("node-".concat(t,"-").concat(a)).className="node node-empty")}},{key:"handleMouseDown",value:function(e,t,a){if(!a&&this.state.available)if(this.state.grid[e][t].isStart)this.setState({mousePressed:!0,moveStartNode:!0});else if(this.state.grid[e][t].isFinish)this.setState({mousePressed:!0,moveEndNode:!0});else{var n=C(this.state.grid,e,t);if(null===n)return;this.setState({grid:n,mousePressed:!0,wallDrawing:!0})}}},{key:"handleMouseEnter",value:function(e,t,a){var n=this;if(this.state.mousePressed&&!a&&this.state.available&&!(T()(Date.now()).diff(T()(this.state.grid[e][t].timestamp),"milisecond")<200))if(this.state.moveStartNode){var r=function(e,t,a,n,r){var o=e.slice();if(o[t][a].isFinish)return null;var i=o[n][r],l=Object(m.a)({},i,{isStart:!1,timestamp:Date.now()});l.isWall?document.getElementById("node-".concat(n,"-").concat(r)).className="node node-wall":document.getElementById("node-".concat(n,"-").concat(r)).className="node node-empty";var s=o[t][a],c=Object(m.a)({},s,{distance:1/0,isVisited:!1,previousNode:null,isStart:!0,timestamp:Date.now()});return document.getElementById("node-".concat(t,"-").concat(a)).className="node node-start",o[n][r]=l,o[t][a]=c,o}(this.state.grid,e,t,this.state.curStartPos[0],this.state.curStartPos[1]);null!=r&&this.setState({grid:r,curStartPos:[e,t]},(function(){n.state.computed&&n.reCalculateGrid()}))}else if(this.state.moveEndNode){var o=function(e,t,a,n,r){var o=e.slice();if(o[t][a].isStart)return null;var i=o[n][r],l=Object(m.a)({},i,{isFinish:!1,timestamp:Date.now()});l.isWall?document.getElementById("node-".concat(n,"-").concat(r)).className="node node-wall":document.getElementById("node-".concat(n,"-").concat(r)).className="node node-empty";var s=o[t][a],c=Object(m.a)({},s,{isFinish:!0,isVisited:!1,previousNode:null,distance:1/0,timestamp:Date.now()});return document.getElementById("node-".concat(t,"-").concat(a)).className="node node-finish",o[n][r]=l,o[t][a]=c,o}(this.state.grid,e,t,this.state.curEndPos[0],this.state.curEndPos[1]);null!=o&&this.setState({grid:o,curEndPos:[e,t]},(function(){n.state.computed&&n.reCalculateGrid()}))}else if(this.state.wallDrawing){var i=C(this.state.grid,e,t);if(null===i)return;this.setState({grid:i})}}},{key:"handleMouseUp",value:function(){this.state.mousePressed&&this.setState({mousePressed:!1,wallDrawing:!1,moveStartNode:!1,moveEndNode:!1})}},{key:"reCalculateGrid",value:function(){console.log(this.state.curAlgorithm);for(var e=this.state.grid,t=0;t<this.state.ROW_COUNT;t++)for(var a=0;a<this.state.COL_COUNT;a++)e[t][a].distance=1/0,e[t][a].isVisited=!1,e[t][a].f=1/0,e[t][a].g=1/0,e[t][a].h=1/0;var n,r=this.state.curStartPos,o=this.state.curEndPos,i=e[r[0]][r[1]],l=e[o[0]][o[1]];if("Dijkstra"===this.state.curAlgorithm||"A*"===this.state.curAlgorithm||"BFS"===this.state.curAlgorithm){"Dijkstra"===this.state.curAlgorithm?n=f(e,i,l):"A*"===this.state.curAlgorithm?n=_(e,i,l,this.state.ROW_COUNT,this.state.COL_COUNT):"BFS"===this.state.curAlgorithm&&(n=x(e,i,l,this.state.ROW_COUNT,this.state.COL_COUNT));var s=w(l);if(!n)return;var c=!0,u=!1,d=void 0;try{for(var m,h=n[Symbol.iterator]();!(c=(m=h.next()).done);c=!0){var v=m.value;v.isStart||v.isFinish||(document.getElementById("node-".concat(v.row,"-").concat(v.col)).className="node node-visited")}}catch(z){u=!0,d=z}finally{try{c||null==h.return||h.return()}finally{if(u)throw d}}var g=!0,E=!1,p=void 0;try{for(var S,N=s[Symbol.iterator]();!(g=(S=N.next()).done);g=!0){var O=S.value;O.isStart||O.isFinish||(document.getElementById("node-".concat(O.row,"-").concat(O.col)).className="node node-shortest-path")}}catch(z){E=!0,p=z}finally{try{g||null==N.return||N.return()}finally{if(E)throw p}}for(var y=0;y<this.state.ROW_COUNT;y++)for(var C=0;C<this.state.COL_COUNT;C++)s.includes(this.state.grid[y][C])||n.includes(this.state.grid[y][C])||(this.state.grid[y][C].isWall?document.getElementById("node-".concat(y,"-").concat(C)).className="node node-wall":document.getElementById("node-".concat(y,"-").concat(C)).className="node node-empty")}else{n="DFS"===this.state.curAlgorithm?U(e,i,l,this.state.ROW_COUNT,this.state.COL_COUNT,!1):U(e,i,l,this.state.ROW_COUNT,this.state.COL_COUNT,!0);var b=!0,T=!1,W=void 0;try{for(var M,P=n[Symbol.iterator]();!(b=(M=P.next()).done);b=!0){var k=M.value;k.isStart||k.isFinish||(document.getElementById("node-".concat(k.row,"-").concat(k.col)).className="node node-shortest-path")}}catch(z){T=!0,W=z}finally{try{b||null==P.return||P.return()}finally{if(T)throw W}}for(var A=0;A<this.state.ROW_COUNT;A++)for(var D=0;D<this.state.COL_COUNT;D++)n.includes(this.state.grid[A][D])||(this.state.grid[A][D].isWall?document.getElementById("node-".concat(A,"-").concat(D)).className="node node-wall":document.getElementById("node-".concat(A,"-").concat(D)).className="node node-empty")}}},{key:"animatePath",value:function(e,t,a){for(var n=this,r=function(r){if(r===e.length-1)return setTimeout((function(){n.animateShortestPath(t,a)}),10*r),{v:void 0};setTimeout((function(){var t=e[r];t.isStart||t.isFinish||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited-animation")}),10*r)},o=0;o<e.length;o++){var i=r(o);if("object"===typeof i)return i.v}}},{key:"animateShortestPath",value:function(e,t){for(var a=this,n=function(n){setTimeout((function(){var r=e[n];r.isStart||r.isFinish||(document.getElementById("node-".concat(r.row,"-").concat(r.col)).className="node node-shortest-path-animation"),n===e.length-1&&(t&&t(),a.setState({computed:!0,available:!0}))}),25*n)},r=0;r<e.length;r++)n(r)}},{key:"visualizeDijkstra",value:function(e){var t=this.state.grid,a=this.state.curStartPos,n=this.state.curEndPos,r=t[a[0]][a[1]],o=t[n[0]][n[1]],i=f(t,r,o),l=w(o);this.animatePath(i,l,e)}},{key:"visualizeAstar",value:function(e){var t=this.state,a=t.grid,n=t.curStartPos,r=t.curEndPos,o=a[n[0]][n[1]],i=a[r[0]][r[1]],l=_(a,o,i,this.state.ROW_COUNT,this.state.COL_COUNT),s=w(i);this.animatePath(l,s,e)}},{key:"visualizeDFS",value:function(e,t){var a=this.state,n=a.grid,r=a.curStartPos,o=a.curEndPos,i=U(n,n[r[0]][r[1]],n[o[0]][o[1]],this.state.ROW_COUNT,this.state.COL_COUNT,t);this.animateShortestPath(i,e)}},{key:"visualizeBFS",value:function(e){var t=this.state,a=t.grid,n=t.curStartPos,r=t.curEndPos,o=a[n[0]][n[1]],i=a[r[0]][r[1]],l=x(a,o,i,this.state.ROW_COUNT,this.state.COL_COUNT),s=w(i);this.animatePath(l,s,e)}},{key:"visualizeRecursiveMaze",value:function(e){var t=this;this.setState({available:!1});for(var a=this.state,n=a.grid,r=a.curStartPos,o=a.curEndPos,i=n[r[0]][r[1]],l=n[o[0]][o[1]],s=A(n,i,l,this.state.ROW_COUNT,this.state.COL_COUNT),c=function(a){setTimeout((function(){C(n,s[a].row,s[a].col),s[a].isStart||s[a].isFinish||(document.getElementById("node-".concat(s[a].row,"-").concat(s[a].col)).className="node node-wall"),a===s.length-1&&(e(null),t.setState({available:!0}))}),10*a)},u=0;u<s.length;u++)c(u)}},{key:"visualizeSimpleMaze",value:function(e){var t=this;this.setState({available:!1});for(var a=this.state.grid,n=function(e,t,a){for(var n=[],r=0;r<t;r++)for(var o=0;o<a;o++)L()&&n.push(e[r][o]);return n}(a,this.state.ROW_COUNT,this.state.COL_COUNT),r=function(r){setTimeout((function(){C(a,n[r].row,n[r].col),n[r].isStart||n[r].isFinish||(document.getElementById("node-".concat(n[r].row,"-").concat(n[r].col)).className="node node-wall"),r===n.length-1&&(e(null),t.setState({available:!0}))}),10*r)},o=0;o<n.length;o++)r(o)}},{key:"visualizeStairMaze",value:function(e){var t=this;this.setState({available:!1});for(var a=this.state.grid,n=function(e,t,a){for(var n=[],r=t-2,o=!0,i=1;i<a-1;i++)n.push(e[r][i]),1===r?o=!o:r!==t-2||o||(o=!o),o?r-=1:r+=1;return n}(a,this.state.ROW_COUNT,this.state.COL_COUNT),r=function(r){setTimeout((function(){C(a,n[r].row,n[r].col),n[r].isStart||n[r].isFinish||(document.getElementById("node-".concat(n[r].row,"-").concat(n[r].col)).className="node node-wall"),r===n.length-1&&(e(null),t.setState({available:!0}))}),10*r)},o=0;o<n.length;o++)r(o)}},{key:"checkState",value:function(e,t,a,n,r,o,i,l,s,c,u){var d=this;null!==o&&this.state.available?"RECURSIVEMAZE"===o?setTimeout((function(){d.clearWalls(),setTimeout((function(){d.visualizeRecursiveMaze(i)}),10)}),10):"SIMPLEMAZE"===o?setTimeout((function(){d.clearWalls(),setTimeout((function(){d.visualizeSimpleMaze(i)}),10)}),10):"STAIRMAZE"===o&&setTimeout((function(){d.clearWalls(),setTimeout((function(){d.visualizeStairMaze(i)}),10)}),10):e?"Dijkstra"===t?setTimeout((function(){d.state.available&&(d.state.computed?(d.clear(),d.setState({available:!1,curAlgorithm:"Dijkstra"})):d.setState({available:!1,curAlgorithm:"Dijkstra"}),d.visualizeDijkstra(a))}),10):"A*"===t?setTimeout((function(){d.state.available&&(d.state.computed?(d.clear(),d.setState({available:!1,curAlgorithm:"A*"})):d.setState({available:!1,curAlgorithm:"A*"}),d.visualizeAstar(a))}),10):"DFS"===t||"RANDOMDFS"===t?setTimeout((function(){d.state.available&&(d.state.computed?(d.clear(),d.setState({available:!1,curAlgorithm:t})):d.setState({available:!1,curAlgorithm:t}),"RANDOMDFS"===t?d.visualizeDFS(a,!0):d.visualizeDFS(a,!1))}),10):"BFS"===t?setTimeout((function(){d.state.available&&(d.state.computed?(d.clear(),d.setState({available:!1,curAlgorithm:t})):d.setState({available:!1,curAlgorithm:t}),d.visualizeBFS(a,!1))}),10):setTimeout((function(){a()}),10):r?setTimeout((function(){n(),d.clear()}),10):c?setTimeout((function(){u(),d.clearPath(),setTimeout((function(){d.setState({available:!0,curAlgorithm:t,computed:!1})}),10)}),10):l&&setTimeout((function(){s(),d.clearWalls(),console.log("DASD",d.state.curAlgorithm),null!==d.state.curAlgorithm&&""!==d.state.curAlgorithm&&d.setState({},(function(){d.reCalculateGrid()}))}),10)}},{key:"render",value:function(){var e=this,t=this.state.grid;return r.a.createElement(p.Consumer,null,(function(a){var n=a.enableVisualize,o=a.algorithmSelected,i=a.toggleEnable,l=a.toggleClear,s=a.clearBoard,c=a.mazeSelected,u=a.toggleMaze,d=a.clearWalls,m=a.toggleClearWalls,f=a.clearPath,v=a.toggleClearPath;return e.state.available&&e.checkState(n,o,i,l,s,c,u,d,m,f,v),r.a.createElement("table",{className:"grid"},r.a.createElement("tbody",null,t.map((function(t,a){return r.a.createElement("tr",{id:a,key:a},t.map((function(t,a){return r.a.createElement(h,{key:a,isStart:t.isStart,isFinish:t.isFinish,isVisited:t.isVisited,isWall:t.isWall,row:t.row,col:t.col,onMouseDown:function(t,a){return e.handleMouseDown(t,a,n)},onMouseEnter:function(t,a){return e.handleMouseEnter(t,a,n)},onMouseUp:function(){return e.handleMouseUp()}})})))}))))}))}}]),t}(n.Component),J=a(31),$=a(32),q=a(9),K=a(38),Q=a(88),X=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"setAlgorithm",value:function(e){this.props.algorithmSelectHandler(e)}},{key:"render",value:function(){return r.a.createElement(J.a,{bg:"dark",variant:"dark",expand:"lg"},r.a.createElement(J.a.Brand,{href:"#home"},"PathFinder"),r.a.createElement(J.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(J.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement($.a,{className:"mr-auto"},r.a.createElement(Y,null),r.a.createElement(re,null),r.a.createElement(ee,null),r.a.createElement(te,null),r.a.createElement(ae,null),";",r.a.createElement(ne,null),";")))}}]),t}(n.Component);function Y(){return r.a.createElement(p.Consumer,null,(function(e){e.algorithmSelected;var t=e.toggleAlgorithm;return r.a.createElement(q.a,{title:"Algorithm",id:"basic-nav-dropdown"},r.a.createElement(q.a.Item,{onSelect:function(){t("Dijkstra")}},"Dijkstra"),r.a.createElement(q.a.Item,{onSelect:function(){t("A*")}},"A* Algorithm"),r.a.createElement(q.a.Item,{onSelect:function(){t("BFS")}},"BFS"),r.a.createElement(q.a.Item,{onSelect:function(){t("DFS")}},"DFS"),r.a.createElement(q.a.Item,{onSelect:function(){t("RANDOMDFS")}},"Random DFS"))}))}function ee(){return r.a.createElement(p.Consumer,null,(function(e){var t=e.algorithmSelected,a=e.toggleEnable,n=e.enableVisualize;return r.a.createElement(Q.a,null," ",r.a.createElement(K.a,{variant:"primary",disabled:n,onClick:n?null:function(){!function(e){e()}(a)}},n?"Loading\u2026":"Run "+t))}))}function te(){return r.a.createElement(p.Consumer,null,(function(e){var t=e.toggleClear;return r.a.createElement($.a.Link,{onClick:t},"Clear Board")}))}function ae(){return r.a.createElement(p.Consumer,null,(function(e){var t=e.toggleClearWalls;return r.a.createElement($.a.Link,{onClick:t},"Clear Walls")}))}function ne(){return r.a.createElement(p.Consumer,null,(function(e){var t=e.toggleClearPath;return r.a.createElement($.a.Link,{onClick:t},"Clear Paths")}))}function re(){return r.a.createElement(p.Consumer,null,(function(e){var t=e.toggleMaze;return r.a.createElement(q.a,{title:"Mazes & Patterns",id:"basic-nav-dropdown"},r.a.createElement(q.a.Item,{onSelect:function(){return t("RECURSIVEMAZE")}},"Recursive Division"),r.a.createElement(q.a.Item,{onSelect:function(){return t("SIMPLEMAZE")}},"Simple Maze"),r.a.createElement(q.a.Item,{onSelect:function(){return t("STAIRMAZE")}},"Staircase Maze"))}))}var oe=a(89);a(71);function ie(){return r.a.createElement("div",{id:"documentation",key:"documentation",className:"documentation"},r.a.createElement(oe.a,{container:!0,spacing:1},r.a.createElement(oe.a,{container:!0,item:!0,xs:12,spacing:2},r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-wall"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"Wall Node")))),r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-start"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"Start Node"))))),r.a.createElement(oe.a,{container:!0,item:!0,xs:12,spacing:3},r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-visited"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"Visited Node")))),r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-finish"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"End Node"))))),r.a.createElement(oe.a,{container:!0,item:!0,xs:12,spacing:3}),r.a.createElement(oe.a,{container:!0,item:!0,xs:12,spacing:3},r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-shortest-path"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"Visited Node")))),r.a.createElement(oe.a,{item:!0,xs:12,sm:4,md:4,lg:4},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"node node-empty"})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"column"},r.a.createElement("div",null,"Empty Node")))))))}var le=r.a.createContext({START_NODE_ROW:5,START_NODE_COL:5,FINISH_NODE_ROW:15,FINISH_NODE_COL:30});function se(){return r.a.createElement(le.Consumer,null,(function(e){var t=e.row_count,a=e.col_count;return r.a.createElement(r.a.Fragment,null,r.a.createElement(X,null),r.a.createElement(ie,null),r.a.createElement(H,{row_count:t,col_count:a}))}))}a(74);var ce=a(53);function ue(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var de=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).toggleAlgorithm=function(e){a.setState((function(t){return{algorithmSelected:e}}))},a.toggleMaze=function(e){a.setState((function(t){return{mazeSelected:e}}))},a.toggleEnable=function(){a.setState((function(e){return{enableVisualize:!e.enableVisualize}}))},a.toggleClear=function(){a.setState((function(e){return{clearBoard:!e.clearBoard,algorithmSelected:""}}))},a.toggleClearWalls=function(){a.setState((function(e){return{clearWalls:!e.clearWalls}}))},a.toggleClearPath=function(){a.setState((function(e){return{clearPath:!e.clearPath}}))},a.state={algorithmSelected:E.algorithmSelected,enableVisualize:E.enableVisualize,toggleAlgorithm:a.toggleAlgorithm,toggleEnable:a.toggleEnable,toggleClear:a.toggleClear,clearBoard:!1,mazeSelected:E.mazeSelected,toggleMaze:a.toggleMaze,clearWalls:!1,toggleClearWalls:a.toggleClearWalls,clearPath:!1,toggleClearPath:a.toggleClearPath},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(p.Provider,{value:this.state},r.a.createElement(se,null))}}]),t}(n.Component),me=function(){var e=function(){var e=Object(n.useState)(ue()),t=Object(ce.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){function e(){r(ue())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a}(),t=function(e,t){var a=Math.floor(t/25)-0,n=Math.floor(e/25)-10;return{row_count:n%2===0?n-1:n,col_count:a%2===0?a-1:a}}(e.height,e.width),a=t.row_count,o=t.col_count;return r.a.createElement(le.Provider,{value:{row_count:a,col_count:o}},r.a.createElement(de,null))};i.a.render(r.a.createElement(me,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[55,1,2]]]);
//# sourceMappingURL=main.9e628613.chunk.js.map