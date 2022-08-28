// jsonstat-euro v2.0.0 Copyright 2022 Xavier Badosa https://jsonstat.com
import e from"jsonstat-toolkit";var t="2.0.0";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){var t=e.lang||"en",l=e.version||"1.0",n=e.dataset||null,a=e.filter||null,i=e.label||null,o={class:"query",lang:t,version:l,dataset:n};return a&&"object"===r(a)&&0!==Object.keys(a).length&&(Object.keys(a).forEach((function(e){var t=a[e];Array.isArray(t)||(a[e]=[t]),0===a[e].length&&delete a[e]})),o.filter=a),i&&"object"===r(i)&&0!==Object.keys(i).length&&(o.label=i),o}function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function a(e,t,r,a){var i,o=JSON.parse(JSON.stringify(e));if("string"==typeof a&&o.filter.hasOwnProperty("geo")&&-1!==o.filter.geo.indexOf(a)||(a=null),n(o,"filter")){switch(r){case"last":i=function(e){o.filter[e]=o.filter[e].slice(-1)};break;case"middle":i=function(e){var t=Math.round(o.filter[e].length/2);o.filter[e]=o.filter[e].slice(t-1,t)};break;default:i=function(e){o.filter[e]=o.filter[e].slice(0,1)}}Object.keys(o.filter).forEach(i),!0===t&&(delete o.filter.time,o.filter.lastTimePeriod=["1"]),a&&(o.filter.geo=[a])}return n(o,"label")&&n(o.label,"category")&&(Object.keys(o.label.category).forEach((function(e){o.label.category[e]=o.label.category[e].slice(0,1)})),!0===t&&delete o.label.category.time),l(o)}function i(e){var t=JSON.parse(JSON.stringify(e));return n(t,"filter")?(delete t.filter.time,t.filter.lastTimePeriod=["1"]):t.filter={lastTimePeriod:["1"]},l(t)}function o(e,t,r){void 0===r&&(r=Object.keys(t),t=l({dataset:null,filter:t}));var a=JSON.parse(JSON.stringify(e)),i=n(t,"filter"),o=n(t,"label")&&n(t.label,"category");return r.forEach((function(e){i&&n(t.filter,e)&&(n(a,"filter")||(a.filter={}),a.filter[e]=t.filter[e]),o&&n(t.label.category,e)&&(n(a,"label")?n(a.label,"category")||(a.label.category={}):a.label={},a.label.category[e]=t.label.category[e])})),l(a)}function s(e,t){var r=JSON.parse(JSON.stringify(e)),a=n(r,"filter"),i=n(r,"label"),o=i&&n(r.label,"category"),s=i&&n(r.label,"dimension");return t.forEach((function(e){a&&delete r.filter[e],i&&(o&&delete r.label.category[e],s&&delete r.label.dimension[e])})),l(r)}function c(e){return s(e,["time","lastTimePeriod","sinceTimePeriod"])}function f(e){if("string"==typeof e){if(/https?:\/\//i.test(e))return e;e={dataset:e}}if("object"===r(e)&&null!==e&&!Array.isArray(e)&&e.dataset){e=l(e);var t="".concat("https://ec.europa.eu/eurostat/api/dissemination/statistics/").concat(e.version,"/data/").concat(e.dataset,"?lang=").concat(e.lang),n=[],a=e.filter||null;return a&&0!==Object.keys(a).length&&(Object.keys(a).forEach((function(e){a[e].forEach((function(t){n.push("".concat(e,"=").concat(t))}))})),t+="&"+n.join("&")),t}return null}function u(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach((function(t){switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":case"indic_co":case"na_item":case"indic":e.role.metric.push(t);break;default:e.role.classification.push(t)}})),e.role.geo.length||delete e.role.geo,e.role.time.length||delete e.role.time,e.role.metric.length||delete e.role.metric,e.role.classification.length||delete e.role.classification}function b(t){if(t)return e(f(t)).then((function(e){return"dataset"===e.class?(u(e),e):e}),(function(e){var t=e.message.slice(0,3),r=isNaN(t)?"418":t;return{class:"error",status:r,label:"418"!==r?e.message.slice(4):e.message}}))}function y(e,t){"string"==typeof e&&(e={dataset:e});var r=!1!==t?i(e):e;return b(r).then((function(e){if("error"===e.class)return e;if(e.error)return{class:"error",status:e.error.status,label:e.error.label};var t={},l={},n={};return e.id.forEach((function(r){var a=e.Dimension(r);l[r]=a.label,t[r]=a.id,n[r]=a.Category().map((function(e){return e.label}))})),{class:"query",dataset:r.dataset,filter:t,label:{dataset:e.label,dimension:l,category:n},lang:r.lang||"en",version:r.version||"1.0"}}))}function g(e,t,r,l){"string"==typeof e&&(e={dataset:e}),"boolean"!=typeof t&&(t=!1),"string"!=typeof r&&(r="first"),"string"!=typeof l&&(l=null);var i=n(e,"filter")?e.filter:null;if(i&&0!==Object.keys(i).length){var c=Object.keys(i);return y(o(e,i),!1).then((function(e){return"error"===e.class?e:y(s(a(e,t,r,l),c),!1).then((function(t){return"error"===t.class?t:o(e,t,c)}))}))}return y(e,!1).then((function(e){return e}))}function d(e,t){return e.extension.status.label[t]}function m(t){var r=n(t,"lang")?t.lang:"en",l=n(t,"dataset")?t.dataset:null,a={lang:r.toUpperCase(),datasetId:l},i=Object.keys(t.filter),o=i.map((function(e){return t.filter[e].length})),s={};i.forEach((function(e){s[e]={label:t.label.dimension[e],category:{index:t.filter[e],label:{}}},t.filter[e].forEach((function(r,l){Object.defineProperty(s[e].category.label,r,{value:t.label.category[e][l]})}))}));var c={version:"2.0",class:"dataset",label:t.label.dataset,extension:a,id:i,size:o,dimension:s,value:[]},f=e(c);return u(f),f}export{o as addParamQuery,b as fetchDataset,g as fetchFullQuery,y as fetchQuery,m as getEmptyDataset,d as getStatusLabel,f as getURL,i as lastPeriodQuery,s as removeParamQuery,c as removeTimeQuery,u as setRole,a as simpleQuery,t as version};
