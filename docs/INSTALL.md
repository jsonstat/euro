# Installation

> [JSON-stat for Eurostat](https://github.com/jsonstat/euro/blob/master/README.md) ▸ **Installation**

## Browser

### Script tag

<strong>jsonstat-euro</strong> is built on top of <strong>jsonstat-toolkit</strong>. Copy the latest version of the [jsonstat-toolkit code](https://raw.githubusercontent.com/jsonstat/toolkit/master/iife.js) and the latest version of the [jsonstat-euro code](https://raw.githubusercontent.com/jsonstat/euro/master/iife.js) to your server and use script tags in your webpage to link to them. Both are also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script src="https://unpkg.com/jsonstat-toolkit@1.0.8"></script>
<script src="https://unpkg.com/jsonstat-euro@1.0.5"></script>
```

```html
<script src="https://cdn.jsdelivr.net/combine/npm/jsonstat-toolkit@1.0.8,npm/jsonstat-euro@1.0.5"></script>
```

The JSON-stat for Eurostat works on any modern browser. It also supports Internet Explorer 9 or higher as long as its connection capabilities (fetch* functions) are not used. To support its connection capabilities polyfills for [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) are required:

```html
<script src="https://cdn.jsdelivr.net/combine/npm/es6-promise@4.2.8,npm/whatwg-fetch@3.0.0"></script>
<script src="https://unpkg.com/jsonstat-euro@1.0.5"></script>
```

### ECMAScript module

Very modern browsers support ECMAScript modules. Copy the latest version of the [ECMAScript module](https://raw.githubusercontent.com/jsonstat/euro/master/import.mjs) to your server and import it in your webpage. The module is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script type="module">
import * as JSONstatUtils from "https://cdn.jsdelivr.net/npm/jsonstat-euro@1.0.5/import.mjs";
</script>
```

```html
<script type="module">
import * as JSONstatUtils from "https://unpkg.com/jsonstat-euro@1.0.5/import.mjs";
</script>
```

The ECMAScript module works on any browser that support ECMAScript modules.

## Node.js

```
$ npm install jsonstat-euro
```

#### CommonJS

```js
const EuroJSONstat = require("jsonstat-euro");
```

#### ES Module

```js
import * as EuroJSONstat from "jsonstat-euro";
```
