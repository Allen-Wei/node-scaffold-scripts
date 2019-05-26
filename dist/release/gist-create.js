!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(3)),r(n(4)),r(n(6))},function(e,t,n){"use strict";function r(e){const t=Array.from(e),n={};for(;t.length;){const e=t[0];if(!e||"-"!==e[0]){t.splice(0,1);continue}const r=t[1]||"";n[e]=0===r.length||"-"===r[0]||r,t.splice(0,2)}return n}Object.defineProperty(t,"__esModule",{value:!0}),t.getArgs=r,t.autoGetArgs=function(){return r(process.argv)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1),i=n(5);function s(e,t){c(e)}function c(...e){console.log.apply(this,e)}function a(e,t){return i.render(e,t)}t.print=s,t.getPrinter=function(e){return function(t){c(`[${e}] ${t}`)}},t.log=c,t.debug=function(...e){console.debug.apply(this,e)},t.render=a,t.renderDir=function(e,t){for(let n of t){const t=r.dirname(n.path);o.existsSync(t)||(s(`create directory ${t}`),o.mkdirSync(t,{recursive:!0}));const i=a(n.template,Object.assign({},n.vm,e));s(`write content(${i.length} bytes) to ${n.path}`),o.writeFileSync(n.path,i,{encoding:"utf8"})}return{success:!0}}},function(e,t,n){var r,o,i,s;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
s=function(e){var t=Object.prototype.toString,n=Array.isArray||function(e){return"[object Array]"===t.call(e)};function r(e){return"function"==typeof e}function o(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){return null!=e&&"object"==typeof e&&t in e}var s=RegExp.prototype.test,c=/\S/;function a(e){return!function(e,t){return s.call(e,t)}(c,e)}var u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},l=/\s*/,f=/\s+/,p=/\s*=/,h=/\s*\}/,d=/#|\^|\/|>|\{|&|=|!/;function y(e){this.string=e,this.tail=e,this.pos=0}function g(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function v(){this.cache={}}y.prototype.eos=function(){return""===this.tail},y.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},y.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},g.prototype.push=function(e){return new g(e,this)},g.prototype.lookup=function(e){var t,n,o,s=this.cache;if(s.hasOwnProperty(e))t=s[e];else{for(var c,a,u,l=this,f=!1;l;){if(e.indexOf(".")>0)for(c=l.view,a=e.split("."),u=0;null!=c&&u<a.length;)u===a.length-1&&(f=i(c,a[u])||(n=c,o=a[u],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(o))),c=c[a[u++]];else c=l.view[e],f=i(l.view,e);if(f){t=c;break}l=l.parent}s[e]=t}return r(t)&&(t=t.call(this.view)),t},v.prototype.clearCache=function(){this.cache={}},v.prototype.parse=function(t,r){var i=this.cache,s=t+":"+(r||e.tags).join(":"),c=i[s];return null==c&&(c=i[s]=function(t,r){if(!t)return[];var i,s,c,u=[],g=[],v=[],w=!1,b=!1;function m(){if(w&&!b)for(;v.length;)delete g[v.pop()];else v=[];w=!1,b=!1}function S(e){if("string"==typeof e&&(e=e.split(f,2)),!n(e)||2!==e.length)throw new Error("Invalid tags: "+e);i=new RegExp(o(e[0])+"\\s*"),s=new RegExp("\\s*"+o(e[1])),c=new RegExp("\\s*"+o("}"+e[1]))}S(r||e.tags);for(var k,x,j,O,_,P,E=new y(t);!E.eos();){if(k=E.pos,j=E.scanUntil(i))for(var T=0,$=j.length;T<$;++T)a(O=j.charAt(T))?v.push(g.length):b=!0,g.push(["text",O,k,k+1]),k+=1,"\n"===O&&m();if(!E.scan(i))break;if(w=!0,x=E.scan(d)||"name",E.scan(l),"="===x?(j=E.scanUntil(p),E.scan(p),E.scanUntil(s)):"{"===x?(j=E.scanUntil(c),E.scan(h),E.scanUntil(s),x="&"):j=E.scanUntil(s),!E.scan(s))throw new Error("Unclosed tag at "+E.pos);if(_=[x,j,k,E.pos],g.push(_),"#"===x||"^"===x)u.push(_);else if("/"===x){if(!(P=u.pop()))throw new Error('Unopened section "'+j+'" at '+k);if(P[1]!==j)throw new Error('Unclosed section "'+P[1]+'" at '+k)}else"name"===x||"{"===x||"&"===x?b=!0:"="===x&&S(j)}if(P=u.pop())throw new Error('Unclosed section "'+P[1]+'" at '+E.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(g))}(t,r)),c},v.prototype.render=function(e,t,n,r){var o=this.parse(e,r),i=t instanceof g?t:new g(t);return this.renderTokens(o,i,n,e,r)},v.prototype.renderTokens=function(e,t,n,r,o){for(var i,s,c,a="",u=0,l=e.length;u<l;++u)c=void 0,"#"===(s=(i=e[u])[0])?c=this.renderSection(i,t,n,r):"^"===s?c=this.renderInverted(i,t,n,r):">"===s?c=this.renderPartial(i,t,n,o):"&"===s?c=this.unescapedValue(i,t):"name"===s?c=this.escapedValue(i,t):"text"===s&&(c=this.rawValue(i)),void 0!==c&&(a+=c);return a},v.prototype.renderSection=function(e,t,o,i){var s=this,c="",a=t.lookup(e[1]);if(a){if(n(a))for(var u=0,l=a.length;u<l;++u)c+=this.renderTokens(e[4],t.push(a[u]),o,i);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)c+=this.renderTokens(e[4],t.push(a),o,i);else if(r(a)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,i.slice(e[3],e[5]),function(e){return s.render(e,t,o)}))&&(c+=a)}else c+=this.renderTokens(e[4],t,o,i);return c}},v.prototype.renderInverted=function(e,t,r,o){var i=t.lookup(e[1]);if(!i||n(i)&&0===i.length)return this.renderTokens(e[4],t,r,o)},v.prototype.renderPartial=function(e,t,n,o){if(n){var i=r(n)?n(e[1]):n[e[1]];return null!=i?this.renderTokens(this.parse(i,o),t,n,i):void 0}},v.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},v.prototype.escapedValue=function(t,n){var r=n.lookup(t[1]);if(null!=r)return e.escape(r)},v.prototype.rawValue=function(e){return e[1]},e.name="mustache.js",e.version="3.0.1",e.tags=["{{","}}"];var w=new v;return e.clearCache=function(){return w.clearCache()},e.parse=function(e,t){return w.parse(e,t)},e.render=function(e,t,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(n(i=e)?"array":typeof i)+'" was given as the first argument for mustache#render(template, view, partials)');var i;return w.render(e,t,r,o)},e.to_html=function(t,n,o,i){var s=e.render(t,n,o);if(!r(i))return s;i(s)},e.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,function(e){return u[e]})},e.Scanner=y,e.Context=g,e.Writer=v,e},t&&"string"!=typeof t.nodeName?s(t):(o=[t],void 0===(i="function"==typeof(r=s)?r.apply(t,o):r)||(e.exports=i))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(0);t.recursiveDirFiles=function*e(t){if(!r.existsSync(t))return void console.warn(`NO DIRECTORY ${t}`);const n=r.readdirSync(t).map(e=>o.join(t,e));yield*n.filter(e=>r.statSync(e).isFile());for(let t of n.filter(e=>r.statSync(e).isDirectory()))yield*e(t)},t.pwdByExecScriptFilePath=function(){return process.argv[1]&&r.existsSync(process.argv[1])?o.dirname(process.argv[1]):e},t.absPath=function(e){return o.resolve(e||"")}}).call(this,"/")},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),o=n(9),i=n(0),s=n(1),c="gist-create.js",a=r.autoGetArgs();function u(){const e=(a["--token"]||process.env.GIST_TOKEN).toString();if(!/[\d\w]+/.test(e))throw new Error(`error token format: ${e}`);return e}0===Object.keys(a).length||a["--help"]?r.print(`\n使用: node ${c} [opitons]\n\n选项: \n    --help          显示帮助信息\n    --token         Gist token(缺省状态读取环境变量GIST_TOKEN). 创建token: https://github.com/settings/tokens \n    --public        是否创建公开Gist, 默认false, 传递了参数就变成true. \n    --description   Gist描述\n\n    --directory     需要上传到gist上的文件的目录\n    --recursive     是否需要递归获取文件(默认false, 传递了参数为true.)\n    --name-match    文件名正则匹配\n\n    --files         需要上传到gist上的文件列表, 多个用逗号分隔.\n\n例子:\n    node ${c} --token your_token_value --directory ./ --name-match ".(js|ts)$"\n    node ${c} --token your_token_value --files ./file.txt,./dir/file2.md\n`):function(){const e=function(e){return e.reduce((e,t)=>{let n=i.basename(t);return e[n]&&(n=t.replace(/[\\\/:?]/g,"_")),e[n]={content:s.readFileSync(t,{encoding:"utf8"}).toString()},r.debug(`read file ${t}, ${e[n].content.length} bytes.`),e},{})}(function(){const e=a["--files"];if("string"==typeof e)return e.split(",").map(e=>i.resolve(e)).filter(e=>s.existsSync(e));const t=a["--directory"],n=a["--name-match"],o=a["--recursive"];if("string"!=typeof t)throw new Error("directory parameter is empty");const c=i.resolve(t);if(!s.existsSync(c))throw new Error(`directory ${c} is not found`);const u=!0===o?r.recursiveDirFiles(c):s.readdirSync(c).map(e=>i.join(c,e)).filter(e=>s.statSync(e).isFile());return Array.from(u).filter(e=>"string"!=typeof n||new RegExp(n).test(e))}()),t=a["--description"],n=a["--public"],c={description:"string"==typeof t?t:"from gist-create.js",public:"boolean"==typeof n&&n,files:e};let l=o.request({hostname:"api.github.com",port:443,path:"/gists",method:"POST",headers:{"User-Agent":"nodejs","Content-Type":"application/json",Authorization:`token ${u()}`}},e=>{let t="";e.on("data",e=>t+=e),e.on("end",()=>{const n=JSON.parse(t);201!==e.statusCode?r.print(JSON.stringify(n,null,"  ")):r.print(`create success: ${n.html_url}`)}),e.on("error",e=>{throw e})});l.write(JSON.stringify(c)),l.end(),r.debug("start create gist...")}()},function(e,t){e.exports=require("https")}]);