// jsonstat-euro v1.0.6 Copyright 2019 Xavier Badosa https://jsonstat.com
var e="1.0.6";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n="en",r="2.1";function i(e){var i=e.lang||n,l=e.version||r,a=e.dataset||null,s=e.filter||null,o=e.label||null,u={class:"query",lang:i,version:l,dataset:a};return s&&"object"===t(s)&&0!==Object.keys(s).length&&(Object.keys(s).forEach((function(e){var t=s[e];Array.isArray(t)||(s[e]=[t]),0===s[e].length&&delete s[e]})),u.filter=s),o&&"object"===t(o)&&0!==Object.keys(o).length&&(u.label=o),u}function l(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function a(e,t){var n=JSON.parse(JSON.stringify(e));return l(n,"filter")&&(Object.keys(n.filter).forEach((function(e){n.filter[e]=n.filter[e].slice(0,1)})),!0===t&&(delete n.filter.time,n.filter.lastTimePeriod=["1"])),l(n,"label")&&l(n.label,"category")&&(Object.keys(n.label.category).forEach((function(e){n.label.category[e]=n.label.category[e].slice(0,1)})),!0===t&&delete n.label.category.time),i(n)}function s(e){var t=JSON.parse(JSON.stringify(e));return l(t,"filter")?(delete t.filter.time,t.filter.lastTimePeriod=["1"]):t.filter={lastTimePeriod:["1"]},i(t)}function o(e,t,n){void 0===n&&(n=Object.keys(t),t=i({dataset:null,filter:t}));var r=JSON.parse(JSON.stringify(e)),a=l(t,"filter"),s=l(t,"label")&&l(t.label,"category");return n.forEach((function(e){a&&l(t.filter,e)&&(l(r,"filter")||(r.filter={}),r.filter[e]=t.filter[e]),s&&l(t.label.category,e)&&(l(r,"label")?l(r.label,"category")||(r.label.category={}):r.label={},r.label.category[e]=t.label.category[e])})),i(r)}function u(e,t){var n=JSON.parse(JSON.stringify(e)),r=l(n,"filter"),a=l(n,"label"),s=a&&l(n.label,"category"),o=a&&l(n.label,"dimension");return t.forEach((function(e){r&&delete n.filter[e],a&&(s&&delete n.label.category[e],o&&delete n.label.dimension[e])})),i(n)}function f(e){return u(e,["time","lastTimePeriod","sinceTimePeriod"])}var c="1.0.8";function h(e){var t,n,r,i,l=function(e,t){var n,r=[];if("string"==typeof e&&(e=[e]),Array.isArray(e)){if(e.length===t)return e;if(1===e.length){for(n=0;n<t;n++)r.push(e[0]);return r}}for(n=0;n<t;n++){var i=void 0===e[n]?null:e[n];r.push(i)}return r};if(this.length=0,this.id=[],null!=e)switch(this.class=e.class||"bundle",this.class){case"bundle":var a=[],s=0;if(this.error=null,this.length=0,null===e||"object"!=typeof e)return void(this.class=null);if(e.hasOwnProperty("error"))return void(this.error=e.error);if("dataset"===e.class||"collection"===e.class||"dimension"===e.class)return new h(e);for(n in e)s++,a.push(n);this.__tree__=e,this.length=s,this.id=a;break;case"dataset":e.hasOwnProperty("__tree__")?this.__tree__=t=e.__tree__:this.__tree__=t=e,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.updated=t.updated||null,this.source=t.source||null,this.extension=t.extension||null;var o,u=0,f=t.size||t.dimension&&t.dimension.size;if(this.size=f,t.hasOwnProperty("value")&&Array.isArray(t.value))u=t.value.length;else{var c=1;for(o=f.length;o--;)c*=f[o];u=c}if(this.value=l(t.value,u),this.status=t.hasOwnProperty("status")?l(t.status,u):null,t.hasOwnProperty("dimension")){var d=t.dimension,y=t.role||!t.version&&d.role||null,v=t.id||d.id,p=f.length,g=function(e){y.hasOwnProperty(e)||(y[e]=null)};if(!Array.isArray(v)||!Array.isArray(f)||v.length!=p)return;if(this.length=p,this.id=v,y&&(g("time"),g("geo"),g("metric"),g("classification")),y&&null===y.classification){var b=[],m=["time","geo","metric"],_=function(e,t){for(var n=t.length;n--;)if(e===t[n])return!0;return!1};for(o=0;o<3;o++){var x=y[m[o]];null!==x&&(b=b.concat(x))}for(y.classification=[],o=0;o<p;o++)_(v[o],b)||y.classification.push(v[o]);0===y.classification.length&&(y.classification=null)}this.role=y,this.n=u;for(var O=0,k=this.length;O<k;O++)if(d[v[O]].category.hasOwnProperty("index")){if(Array.isArray(d[v[O]].category.index)){var w={},j=d[v[O]].category.index;for(r=j.length,i=0;i<r;i++)w[j[i]]=i;d[v[O]].category.index=w}}else{var A=0;for(n in d[v[O]].category.index={},d[v[O]].category.label)d[v[O]].category.index[n]=A++}}else this.length=0;break;case"dimension":if(!e.hasOwnProperty("__tree__"))return new h({version:"2.0",class:"dataset",dimension:{d:e},id:["d"],size:[function(e){var t=void 0===e.index?e.label:e.index;return Array.isArray(t)?t.length:Object.keys(t).length}(e.category)],value:[null]}).Dimension(0);var E=[],D=(t=e.__tree__).category;if(!t.hasOwnProperty("category"))return;if(!D.hasOwnProperty("label"))for(n in D.label={},D.index)D.label[n]=n;for(n in D.index)E[D.index[n]]=n;this.__tree__=t,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.id=E,this.length=E.length,this.role=e.role,this.hierarchy=D.hasOwnProperty("child"),this.extension=t.extension||null;break;case"category":var P=e.child;this.id=P,this.length=null===P?0:P.length,this.index=e.index,this.label=e.label,this.note=e.note||null,this.unit=e.unit,this.coordinates=e.coord;break;case"collection":if(this.length=0,this.label=e.label||null,this.note=e.note||null,this.link=e.link||null,this.href=e.href||null,this.updated=e.updated||null,this.source=e.source||null,this.extension=e.extension||null,null!==this.link&&e.link.item){var S=e.link.item;if(this.length=Array.isArray(S)?S.length:0,this.length)for(i=0;i<this.length;i++)this.id[i]=S[i].href}}}function d(e){if(!e.ok)throw new Error(e.status+" "+e.statusText);return e.json()}function y(e,t){return"object"==typeof e?new h(e):"version"===e?c:fetch?fetch(e,t).then(d).then((function(e){return new h(e)})):void 0}function v(e){if("string"==typeof e){if(/https?:\/\//i.test(e))return e;e={dataset:e}}if("object"===t(e)&&null!==e&&!Array.isArray(e)&&e.dataset){e=i(e);var n="".concat("https://ec.europa.eu/eurostat/wdds/rest/data/","v").concat(e.version,"/json/").concat(e.lang,"/").concat(e.dataset),r=[],l=e.filter||null;return l&&0!==Object.keys(l).length&&(Object.keys(l).forEach((function(e){l[e].forEach((function(t){r.push("".concat(e,"=").concat(t))}))})),n+="?"+r.join("&")),n}return null}function p(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach((function(t){switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":e.role.metric.push(t);break;default:e.role.classification.push(t)}}))}function g(e){if(e)return y(v(e)).then((function(e){return"dataset"===e.class?(p(e),e):e}),(function(e){var t=e.message.slice(0,3),n=isNaN(t)?"418":t;return{class:"error",status:n,label:"418"!==n?e.message.slice(4):e.message}}))}function b(e,t){"string"==typeof e&&(e={dataset:e});var i=!1!==t?s(e):e;return g(i).then((function(e){if("error"===e.class)return e;var t={},l={},a={};return e.id.forEach((function(n){var r=e.Dimension(n);l[n]=r.label,t[n]=r.id,a[n]=r.Category().map((function(e){return e.label}))})),{class:"query",dataset:i.dataset,filter:t,label:{dataset:e.label,dimension:l,category:a},lang:i.lang||n,version:i.version||r}}))}function m(e){"string"==typeof e&&(e={dataset:e});var t=l(e,"filter")?e.filter:null;if(t&&0!==Object.keys(t).length){var n=Object.keys(t);return b(o(e,t),!1).then((function(e){return"error"===e.class?e:b(u(a(e),n),!1).then((function(t){return"error"===t.class?t:o(e,t,n)}))}))}return b(e,!1).then((function(e){return e}))}function _(e,t){return e.extension.status.label[t]}function x(e){var t=l(e,"lang")?e.lang:n,r=l(e,"dataset")?e.dataset:null,i={lang:t.toUpperCase(),datasetId:r},a=Object.keys(e.filter),s=a.map((function(t){return e.filter[t].length})),o={};a.forEach((function(t){o[t]={label:e.label.dimension[t],category:{index:e.filter[t],label:{}}},e.filter[t].forEach((function(n,r){Object.defineProperty(o[t].category.label,n,{value:e.label.category[t][r]})}))}));var u=y({version:"2.0",class:"dataset",label:e.label.dataset,extension:i,id:a,size:s,dimension:o,value:[]});return p(u),u}h.prototype.Item=function(e){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof e)return e>this.length||e<0?null:this.link.item[e];var t,n=[];if("object"==typeof e){if(!e.class&&!e.follow)return null;e.class&&(t="dataset"===e.class&&"boolean"==typeof e.embedded?!0===e.embedded?function(e,t,r){var i=e.link.item[t];r.class===i.class&&i.id&&i.size&&i.dimension&&n.push(i)}:function(e,t,r){var i=e.link.item[t];r.class!==i.class||i.id&&i.size&&i.dimension||n.push(i)}:function(e,t,r){r.class===e.link.item[t].class&&n.push(e.link.item[t])})}else t=function(e,t){n.push(e.link.item[t])};for(var r=0;r<this.length;r++)t(this,r,e);return n},h.prototype.Dataset=function(e){if(null===this)return null;if("dataset"===this.class)return void 0!==e?this:[this];var t,n=[],r=0;if("collection"===this.class){var i=this.Item({class:"dataset",embedded:!0});if(void 0===e){for(t=i.length;r<t;r++)n.push(new h(i[r]));return n}if("number"==typeof e&&e>=0&&e<i.length)return new h(i[e]);if("string"==typeof e)for(t=i.length;r<t;r++)if(i[r].href===e)return new h(i[r]);return null}if("bundle"!==this.class)return null;if(void 0===e){for(t=this.id.length;r<t;r++)n.push(this.Dataset(this.id[r]));return n}if("number"==typeof e){var l=this.id[e];return void 0!==l?this.Dataset(l):null}var a=this.__tree__[e];return void 0===a?null:new h({class:"dataset",__tree__:a})},h.prototype.Dimension=function(e,t){t="boolean"!=typeof t||t;var n,r=[],i=this.id.length,l=function(e,t){if(null!==e)for(var n in e)for(var r=null!==e[n]?e[n].length:0;r--;)if(e[n][r]===t)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===e){for(n=0;n<i;n++)r.push(this.Dimension(this.id[n]));return r}if("number"==typeof e){var a=this.id[e];return void 0!==a?this.Dimension(a,t):null}var s=this.role;if("object"==typeof e){if(e.hasOwnProperty("role")){for(n=0;n<i;n++){var o=this.id[n];l(s,o)===e.role&&r.push(this.Dimension(o,t))}return void 0===r[0]?null:r}return null}var u=this.__tree__.dimension;if(void 0===u)return null;var f=u[e];return void 0===f?null:t?new h({class:"dimension",__tree__:f,role:l(s,e)}):function(e,t){var n=[];for(var r in e)n[e[r]]=t[r];return n}(f.category.index,f.category.label)},h.prototype.Category=function(e){if(null===this||"dimension"!==this.class)return null;if(void 0===e){for(var t=[],n=0,r=this.id.length;n<r;n++)t.push(this.Category(this.id[n]));return t}if("number"==typeof e){var i=this.id[e];return void 0!==i?this.Category(i):null}var l=this.__tree__.category;if(void 0===l)return null;var a=l.index[e];if(void 0===a)return null;var s=l.unit&&l.unit[e]||null,o=l.coordinates&&l.coordinates[e]||null,u=l.child&&l.child[e]||null,f=l.note&&l.note[e]||null;return new h({class:"category",index:a,label:l.label[e],note:f,child:u,unit:s,coord:o})},h.prototype.Slice=function(e){if(null===this||"dataset"!==this.class)return null;if(void 0===e)return this;if(!Array.isArray(e)){var t,n=[];for(t in e)n.push([t,e[t]]);e=n}var r=this,i=e.length,l=r.toTable({field:"id",content:"id",status:!0}),a=r.status,s=l.shift(),o=!1,u=[],f=[],c=[],h=[];return e.forEach((function(e){var t=r.Dimension(e[0]);if(null!==t){var n=t.id.indexOf(e[1]);-1!==n?(c.push([r.id.indexOf(e[0]),n]),h.push(t.Category(n).label)):o=!0}else o=!0})),o?null:(l.forEach((function(t){var n,r={},l=0;for(n=t.length;n--;)r[s[n]]=t[n];e.forEach((function(e){r[e[0]]===e[1]&&l++})),i===l&&(u.push(r.value),f.push(r.status))})),r.n=u.length,r.value=r.__tree__.value=u,r.status=r.__tree__.status=null!==a?f:null,e.forEach((function(e,t){r.size[c[t][0]]=1,r.__tree__.dimension[e[0]].category.index={},r.__tree__.dimension[e[0]].category.index[e[1]]=0,r.__tree__.dimension[e[0]].category.label={},r.__tree__.dimension[e[0]].category.label[e[1]]=h[t]})),r)},h.prototype.Data=function(e,t){var n,r,i=[],l=function(e){for(var t in e)if(e.hasOwnProperty(t))return t};if(null===this||"dataset"!==this.class)return null;if(void 0===e){for(r=this.value.length,n=0;n<r;n++)i.push(this.Data(n));return i}if("boolean"!=typeof t&&(t=!0),"number"==typeof e){var a=this.value[e];return void 0===a?null:t?{value:a,status:this.status?this.status[e]:null}:a}var s="object",o=this.__tree__,u=o.size||o.dimension&&o.dimension.size,f=u.length;if(Array.isArray(e)){if(!Array.isArray(e[0])){if(this.length!==e.length)return null;var c=1,h=0,d=[],y=[];for(n=0;n<f;n++)if(void 0!==e[n]){if("number"!=typeof e[n]||e[n]>=u[n])return null;h+=(c*=n>0?u[f-n]:1)*e[f-n-1]}else d.push(n),y.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var v=0,p=y[0];v<p;v++){var g=[];for(n=0;n<f;n++)n!==d[0]?g.push(e[n]):g.push(v);i.push(this.Data(g,t))}return i}return t?{value:this.value[h],status:this.status?this.status[h]:null}:this.value[h]}s="array"}var b=function(e,t,n){var r,i=[],a={},s=e.dimension,o=e.id||s.id,u=e.size||s&&s.size;if("array"===n){for(r=t.length;r--;)a[t[r][0]]=t[r][1];t=a}for(var f=0,c=o.length;f<c;f++){var h=o[f],d=t[h];i.push("string"==typeof d?d:1===u[f]?l(s[h].category.index):null)}return i}(o,e,s),m=[],_=o.dimension,x=o.id||_.id;for(n=0,r=b.length;n<r;n++)m.push(_[x[n]].category.index[b[n]]);return this.Data(m,t)},h.prototype.toTable=function(e,t){if(null===this||"dataset"!==this.class)return null;1==arguments.length&&"function"==typeof e&&(t=e,e=null),e=e||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1};var n,r,i,l,a,s=this.__tree__,o=!0===e.status;if("function"==typeof t){n=this.toTable(e);var u=[],f="array"!==e.type?0:1;for(a=(z="object"!==e.type?n.slice(f):n.rows.slice(0)).length,r=0;r<a;r++){var c=t.call(this,z[r],r);void 0!==c&&u.push(c)}return"object"===e.type?{cols:n.cols,rows:u}:("array"===e.type&&u.unshift(n[0]),u)}if("arrobj"===e.type){var h=[],d=(n=this.toTable({field:"id",content:e.content,status:o})).shift(),y=s.role&&s.role.metric,v=function(){},p={},g=this,b=g.id,m=e.by&&-1!==b.indexOf(e.by)?e.by:null,_=!0===e.meta,x=void 0!==e.drop&&Array.isArray(e.drop)?e.drop:[],O=!0===e.comma,k=!0===e.bylabel,w=function(t){if(_){var n={};return b.forEach((function(e){var t=g.Dimension(e);n[e]={label:t.label,role:t.role,categories:{id:t.id,label:g.Dimension(e,!1)}}})),{meta:{label:g.label,source:g.source,updated:g.updated,id:b,status:o,unit:e.unit,by:m,bylabel:k,drop:null!==m&&x.length>0?x:null,prefix:null!==m?T||"":null,comma:O,dimensions:n},data:t}}return t};if(null===m&&e.unit&&y){if("id"!==e.content)for(var j=y.length;j--;){var A=this.Dimension(y[j]);p[y[j]]={};for(var E=A.length;E--;)p[y[j]][A.Category(E).label]=A.id[E]}v=function(t,n){if(-1!==y.indexOf(t)){var r=s.dimension[t].category;r.unit?D.unit=r.unit["id"!==e.content?p[t][n]:n]:D.unit=null}},e.unit=!0}else e.unit=!1;for(a=n.length,r=0;r<a;r++){var D={};for(i=n[r].length;i--;)D[d[i]]=n[r][i],v(d[i],n[r][i]);h.push(D)}if(O&&h.forEach((function(e){null!==e.value&&(e.value=(""+e.value).replace(".",","))})),null!==m){var P,S={},z=[],N={},T=void 0!==e.prefix?e.prefix:"";x.forEach((function(e,t){(!g.Dimension(e)||g.Dimension(e).length>1)&&(x[t]="")}));var C=b.filter((function(e){return e!==m&&-1===x.indexOf(e)})),J=g.Dimension(m),I=function(e,t){var n=[];return t.forEach((function(t){n.push(e[t])})),n.join("\t")},V=function(e,t){var n={};return t.forEach((function(t){n[t]=e[t]})),n};for(var q in"id"!==e.content?k?P=function(e,t,n){e[t][T+n[m]]=n.value}:(J.Category().forEach((function(e,t){N[e.label]=J.id[t]})),P=function(e,t,n){e[t][T+N[n[m]]]=n.value}):P=function(e,t,n){e[t][T+n[m]]=n.value},h.forEach((function(e){var t=I(e,C);void 0===S[t]&&(S[t]=V(e,C)),P(S,t,e,m)})),S)z.push(S[q]);return o=!1,w(z)}return w(h)}var U,B,F,G,H="id"===e.field;if("object"===e.type){var K="number"==typeof this.value[0]||null===this.value[0]?"number":"string";U=function(e,t){var n=H&&e||t||e;te.push({id:e,label:n,type:"string"})},B=function(e,t,n){var r=(H?"value":e)||"Value",i=(H?"status":t)||"Status";n&&te.push({id:"status",label:i,type:"string"}),te.push({id:"value",label:r,type:K})},F=function(e){ye.push({v:e})},G=function(e){ye.push({v:e}),ne.push({c:ye})}}else U=function(e,t){var n=H&&e||t||e;te.push(n)},B=function(e,t,n){var r=(H?"value":e)||"Value",i=(H?"status":t)||"Status";n&&te.push(i),te.push(r),ee.push(te)},F=function(e){ye.push(e)},G=function(e){ye.push(e),ee.push(ye)};var L=s.dimension,M=s.id||L.id,Q=s.size||L.size,R=M.length;if(R!=Q.length)return!1;var W=[],X=1,Y=(j=1,[]),Z=[],$=[],ee=[],te=[],ne=[];for(r=0;r<R;r++){var re=M[r],ie=L[re].label;U(re,ie),X*=Q[r],j*=Q[r];var le=[];for(i=0;i<Q[r];i++)for(var ae in L[M[r]].category.index)if(L[M[r]].category.index[ae]===i){var se="id"!==e.content&&L[M[r]].category.label?L[M[r]].category.label[ae]:ae;le.push(se)}W.push(le),Y.push(j)}for(B(e.vlabel,e.slabel,o),a=W.length,r=0;r<a;r++){for(var oe=[],ue=0,fe=W[r].length;ue<fe;ue++)for(var ce=0;ce<X/Y[r];ce++)oe.push(W[r][ue]);Z.push(oe)}for(a=Z.length,r=0;r<a;r++){var he=[],de=0;for(l=0;l<X;l++)he.push(Z[r][de]),++de===Z[r].length&&(de=0);$.push(he)}for(l=0;l<X;l++){var ye=[];a=Z.length;for(var ve=0;ve<a;ve++)F($[ve][l]);o&&F(this.status?this.status[l]:null),G(this.value[l])}return"object"===e.type?{cols:te,rows:ne}:ee},h.prototype.node=function(){return this.__tree__},h.prototype.toString=function(){return this.class};export{o as addParamQuery,g as fetchDataset,m as fetchFullQuery,b as fetchQuery,x as getEmptyDataset,_ as getStatusLabel,v as getURL,s as lastPeriodQuery,u as removeParamQuery,f as removeTimeQuery,p as setRole,a as simpleQuery,e as version};
