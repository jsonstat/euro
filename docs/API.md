# API Reference

> [JSON-stat for Eurostat](https://github.com/jsonstat/euro/blob/master/README.md) ▸ **API Reference**

* [Fetch functions](#fetch-functions)
* [Get functions](#get-functions)
* [Query functions](#query-functions)
* [Set functions](#set-functions)


If you haven&rsquo;t read the [README](https://github.com/jsonstat/euro/blob/master/README.md), please do so before reading the API reference.

JSON-stat for Eurostat version is exposed as version.

```js
console.log(EuroJSONstat.version);
```

## Fetch functions

Fetch functions are asynchronous functions that connect to Eurostat and retrieve dataset information. On error, the status code and message returned by the server are exposed in the reject function. If the error was produced on the client side, status code "418" is returned.

<blockquote>
<strong>Warning</strong>: Since version 2.0.0, JSON-stat for Eurostat uses the latest Eurostat dataset API (called API Statistics). Prior versions of JSON-stat for Eurostat used the old Eurostat dataset API (called JSON Web Service). See <a href="https://wikis.ec.europa.eu/display/EUROSTATHELP/API+Statistics+-+migrating+from+JSON+web+service+to+API+Statistics">API Statistics - migrating from JSON web service to API Statistics</a>.
</blockquote>

### fetchEmptyDataset

Takes a query, a dataset code or a Eurostat API end point and returns a promise of a JSON-stat metadata-only dataset (default) or of a jsonstat metadata-only dataset instance (when the second argument is true). If the query has filters, they will be ignored.

```js
EuroJSONstat.fetchEmptyDataset(
  {
    "dataset": "une_rt_a",
    "lang": "fr"
  },
  true
).then(ds=>{
  if(ds.class==="error"){
    console.log(`Error label: "${ds.label}"`);
  }else{
    console.log(`Dataset label: "${ds.label}"`);
  }
});
```

(If you use a dataset code as input, you won&rsquo;t be able to choose language or API version.)

Take into account that when retrieving a jsonstat instance of very big datasets, the value property will be filled with as many nulls as expected values. When retrieving a JSON-stat object, the value property is an empty array.

### fetchDataset

Takes a query, a dataset code or a Eurostat API end point and returns a promise of a jsonstat dataset instance.

```js
EuroJSONstat.fetchDataset(
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"]
    }
  }
).then(ds=>{
  if(ds.class==="error"){
    console.log(`Error label: "${ds.label}"`);
  }else{
    console.log(`Dataset label: "${ds.label}"`);
  }
});
```

(If you use a dataset code as input, you won&rsquo;t be able to choose language or API version.)

### fetchQuery

Takes a query or a dataset code and returns a promise of an explicit version of the original query. By default, only the last time period is retrieved: a second parameter (*false*) can be provided to retrieve all the time periods available.

```js
EuroJSONstat.fetchQuery(
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"]
    }
  }
).then(q=>{
  if(q.class==="error"){
    console.log(`Error label: "${q.label}"`);
  }else{
    console.log(q);
  }
});
```

(If you use a dataset code as input, you won&rsquo;t be able to choose language or API version.)

### fetchFullQuery

Tries to convert a query into a fully explicit one. It returns a promise.

```js
EuroJSONstat.fetchFullQuery({
  "dataset": "une_rt_a"
}).then(eq=>{
  if(eq.class==="error"){
    console.log(`Error ${eq.status} (${eq.label})`);
  }else{
    console.log(eq);
  }
});
```

Eurostat imposes a limitation on the number of categories (50) that can be retrieved in a single request. In this number, time and (usually) geo are not taken into account. To avoid this limitation, you may need to provide an initial valid filter for the dataset in the query. Including a filter in the query is the way to tell *fetchFullQuery* that the aforementioned limitation avoids retrieving directly the requested dataset information and to try an indirect way. The initial filter will be drop in the returned query: it just plays an ancillary role in a two-step process. When a filter is provided, *fetchFullQuery* will try to build a fully explicit query by retrieving two filtered datasets: the first one will include the provided filter; the second one will be a complementary dataset.

```js
EuroJSONstat.fetchFullQuery({
  "dataset": "nama_10_gdp",
  "label": { "dataset": "GDP and main components" },
  "filter": {
    "na_item": ["B1G"]
  }
}).then(eq=>{
  if(eq.class==="error"){
    console.log(`Error ${eq.status} (${eq.label})`);
  }else{
    console.log(eq);
  }
});
```

Take into account that not any valid filter will do the job: the filter may define a small enough filtered dataset but not a small enough complementary dataset.

When *fetchFullQuery* is unable to build a fully explicit query due to Eurostat&rsquo;s request size limits, it returns a status code 416.

Getting a fully explicit query is useful as an input for *getEmptyDataset*:

```js
EuroJSONstat.fetchFullQuery({
  "dataset": "cens_01rhsize",
  "filter": {
    "age": ["TOTAL"],
    "geo": ["CZ"]
  }
}).then(eq=>{
  if(eq.class==="error"){
    console.log(`Error ${eq.status} (${eq.label})`);
  }else{
    const ds=EuroJSONstat.getEmptyDataset(eq);
    console.log(`Data available for ${ds.Dimension("geo").length} regions.`);
  }
});
```

## Get functions

Get functions are conversion functions.

### getEmptyDataset

Creates an empty (metadata-only) jsonstat dataset instance from an explicit query.

```js
EuroJSONstat.fetchQuery("une_rt_a").then(q=>{
  if(q.class==="error"){
    console.log(`Error label: "${q.label}"`);
  }else{
    const ds=EuroJSONstat.getEmptyDataset(q);
    console.log(ds);
  }
});
```

### getStatusLabel

Translates a Eurostat status ID (in a jsonstat dataset instance) into a status label. It takes two parameters: a jsonstat dataset instance (object) and a status ID (string).

```js
EuroJSONstat.fetchDataset("une_rt_a").then(
  ds=>{
    const
      statusId=ds.Data({geo: "AT", time: "1983", sex: "T", age: "TOTAL", unit: "PC_ACT"}).status,
      statusLabel=EuroJSONstat.getStatusLabel(ds,statusId)
    ;
    console.log(`"${statusId}" = "${statusLabel}"`);
  }
);
```

### getURL

Converts a query or a dataset code into a Eurostat API end point.

```js
const
  query={
    dataset: "une_rt_a",
    filter: {
      geo: ["AT"],
      sex: ["T"],
      age: ["TOTAL"],
      unit: ["PC_ACT"]
    }
  },
  url=EuroJSONstat.getURL(query)
;
```

(If you use a dataset code as input, you won&rsquo;t be able to choose language or API version.)

## Query functions

Query functions are conversion functions: they take at least a query as argument and return a query.

### addParamQuery

Creates a new query from a query and a filter by adding the filter to the query

```js
EuroJSONstat.addParamQuery(
  //query
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"],
      "time": ["2017", "2018"]
    }
  },
  //filter
  {
    "age": ["TOTAL"]
  }
);
```

or from two queries and a list of dimensions to be imported from the second query to the first one

```js
EuroJSONstat.addParamQuery(
  //first query
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"],
      "time": ["2017", "2018"]
    }
  },
  //second query
  {
    "dataset": "une_rt_a",
    "filter": {
      "age": ["TOTAL"],
      "unit": ["PC_ACT", "PC_POP", "THS_PER"],
      "sex": ["T"],
    }
  },
  //list of dimensions to import into the first query from the filter in the second query
  ["sex", "age"]
);
```

### removeParamQuery

Creates a new query from a query and a list of dimensions and returns a new query without the specified dimensions filters.

```js
EuroJSONstat.removeParamQuery(
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"],
      "time": ["2018"]
    }
  },
  ["geo"]
);
```

### removeTimeQuery

Creates a new query from a query by removing any time filter.

```js
EuroJSONstat.removeTimeQuery(
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"],
      "time": ["2018"]
    }
  }
);
```

### lastPeriodQuery

Takes a query and adds a last time period filter. It returns a new query filtered for the last time period.

```js
EuroJSONstat.lastPeriodQuery(
  {
    "dataset": "une_rt_a",
    "filter": {
      "geo": ["AT"]
    }
  }
);
```

### simpleQuery

When a fully explicit query is provided, it returns a new query for the last period and the first category of each dimension.

```js
EuroJSONstat.simpleQuery(
  {
    "dataset": "une_rt_a",
    "filter": {
      "age": ["TOTAL","Y25-74","Y_LT25"],
      "unit": ["PC_ACT","PC_POP","THS_PER"],
      "sex": ["F","M","T"],
      "geo": ["AT", ...],
      "time": [..., "2018"]
    },
    "label": {
      "dataset": "Unemployment by sex and age - annual average",
      "dimension": {
        "age": "age",
        "unit": "unit",
        "sex": "sex",
        "geo": "geo",
        "time": "time"
      },
      "category": {
        "age": ["Total","From 25 to 74 years","Less than 25 years"],
        "unit": ["Percentage of active population","Percentage of total population","Thousand persons"],
        "sex": ["Females","Males","Total"],
        "geo": ["Austria"],
        "time": ["2018"]
      }
    }
  }
);
```

## Set functions

### setRole

Takes a jsonstat dataset instance and adds role information to it. Generally, you won&rsquo;t need to use it: all jsonstat dataset instances returned by JSON-stat for Eurostat have already set role.
