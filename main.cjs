// jsonstat-euro v1.0.6 Copyright 2019 Xavier Badosa https://jsonstat.com
"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var JSONstat=_interopDefault(require("jsonstat-toolkit")),version="1.0.6";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var ELANG="en",EVERSION="2.1";function normalQuery(e){var t=e.lang||ELANG,r=e.version||EVERSION,a=e.dataset||null,o=e.filter||null,l=e.label||null,n={class:"query",lang:t,version:r,dataset:a};return o&&"object"===_typeof(o)&&0!==Object.keys(o).length&&(Object.keys(o).forEach((function(e){var t=o[e];Array.isArray(t)||(o[e]=[t]),0===o[e].length&&delete o[e]})),n.filter=o),l&&"object"===_typeof(l)&&0!==Object.keys(l).length&&(n.label=l),n}function hasProp(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function simpleQuery(e,t){var r=JSON.parse(JSON.stringify(e));return hasProp(r,"filter")&&(Object.keys(r.filter).forEach((function(e){r.filter[e]=r.filter[e].slice(0,1)})),!0===t&&(delete r.filter.time,r.filter.lastTimePeriod=["1"])),hasProp(r,"label")&&hasProp(r.label,"category")&&(Object.keys(r.label.category).forEach((function(e){r.label.category[e]=r.label.category[e].slice(0,1)})),!0===t&&delete r.label.category.time),normalQuery(r)}function lastPeriodQuery(e){var t=JSON.parse(JSON.stringify(e));return hasProp(t,"filter")?(delete t.filter.time,t.filter.lastTimePeriod=["1"]):t.filter={lastTimePeriod:["1"]},normalQuery(t)}function querify(e,t,r){return normalQuery({dataset:null,filter:e})}function addParamQuery(e,t,r){void 0===r&&(r=Object.keys(t),t=querify(t));var a=JSON.parse(JSON.stringify(e)),o=hasProp(t,"filter"),l=hasProp(t,"label")&&hasProp(t.label,"category");return r.forEach((function(e){o&&hasProp(t.filter,e)&&(hasProp(a,"filter")||(a.filter={}),a.filter[e]=t.filter[e]),l&&hasProp(t.label.category,e)&&(hasProp(a,"label")?hasProp(a.label,"category")||(a.label.category={}):a.label={},a.label.category[e]=t.label.category[e])})),normalQuery(a)}function removeParamQuery(e,t){var r=JSON.parse(JSON.stringify(e)),a=hasProp(r,"filter"),o=hasProp(r,"label"),l=o&&hasProp(r.label,"category"),n=o&&hasProp(r.label,"dimension");return t.forEach((function(e){a&&delete r.filter[e],o&&(l&&delete r.label.category[e],n&&delete r.label.dimension[e])})),normalQuery(r)}function removeTimeQuery(e){return removeParamQuery(e,["time","lastTimePeriod","sinceTimePeriod"])}function getURL(e){if("string"==typeof e){if(/https?:\/\//i.test(e))return e;e={dataset:e}}if("object"===_typeof(e)&&null!==e&&!Array.isArray(e)&&e.dataset){e=normalQuery(e);var t="".concat("https://ec.europa.eu/eurostat/wdds/rest/data/","v").concat(e.version,"/json/").concat(e.lang,"/").concat(e.dataset),r=[],a=e.filter||null;return a&&0!==Object.keys(a).length&&(Object.keys(a).forEach((function(e){a[e].forEach((function(t){r.push("".concat(e,"=").concat(t))}))})),t+="?"+r.join("&")),t}return null}function setRole(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach((function(t){switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":e.role.metric.push(t);break;default:e.role.classification.push(t)}}))}function fetchDataset(e){if(e)return JSONstat(getURL(e)).then((function(e){return"dataset"===e.class?(setRole(e),e):e}),(function(e){var t=e.message.slice(0,3),r=isNaN(t)?"418":t;return{class:"error",status:r,label:"418"!==r?e.message.slice(4):e.message}}))}function fetchQuery(e,t){"string"==typeof e&&(e={dataset:e});var r=!1!==t?lastPeriodQuery(e):e;return fetchDataset(r).then((function(e){if("error"===e.class)return e;var t={},a={},o={};return e.id.forEach((function(r){var l=e.Dimension(r);a[r]=l.label,t[r]=l.id,o[r]=l.Category().map((function(e){return e.label}))})),{class:"query",dataset:r.dataset,filter:t,label:{dataset:e.label,dimension:a,category:o},lang:r.lang||ELANG,version:r.version||EVERSION}}))}function fetchFullQuery(e){"string"==typeof e&&(e={dataset:e});var t=hasProp(e,"filter")?e.filter:null;if(t&&0!==Object.keys(t).length){var r=Object.keys(t);return fetchQuery(addParamQuery(e,t),!1).then((function(e){return"error"===e.class?e:fetchQuery(removeParamQuery(simpleQuery(e),r),!1).then((function(t){return"error"===t.class?t:addParamQuery(e,t,r)}))}))}return fetchQuery(e,!1).then((function(e){return e}))}function getStatusLabel(e,t){return e.extension.status.label[t]}function getEmptyDataset(e){var t=hasProp(e,"lang")?e.lang:ELANG,r=hasProp(e,"dataset")?e.dataset:null,a={lang:t.toUpperCase(),datasetId:r},o=Object.keys(e.filter),l=o.map((function(t){return e.filter[t].length})),n={};o.forEach((function(t){n[t]={label:e.label.dimension[t],category:{index:e.filter[t],label:{}}},e.filter[t].forEach((function(r,a){Object.defineProperty(n[t].category.label,r,{value:e.label.category[t][a]})}))}));var s={version:"2.0",class:"dataset",label:e.label.dataset,extension:a,id:o,size:l,dimension:n,value:[]},i=JSONstat(s);return setRole(i),i}exports.addParamQuery=addParamQuery,exports.fetchDataset=fetchDataset,exports.fetchFullQuery=fetchFullQuery,exports.fetchQuery=fetchQuery,exports.getEmptyDataset=getEmptyDataset,exports.getStatusLabel=getStatusLabel,exports.getURL=getURL,exports.lastPeriodQuery=lastPeriodQuery,exports.removeParamQuery=removeParamQuery,exports.removeTimeQuery=removeTimeQuery,exports.setRole=setRole,exports.simpleQuery=simpleQuery,exports.version=version;
