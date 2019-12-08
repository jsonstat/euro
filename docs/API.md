# API Reference

> [JSON-stat for Eurostat v.1](https://github.com/jsonstat/euro/blob/master/README.md) ▸ **API Reference**

* [Query functions](#query-functions)
* [Fetch functions](#fetch-functions)
* [Get functions](#get-functions)
* [Set functions](#set-functions)

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

## Fetch functions

Fetch functions are asynchronous functions that connect to Eurostat and retrieve dataset information.

### fetchDataset

Gets a query, a dataset ID or a Eurostat API end point and returns a promise of a jsonstat dataset instance.

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
    console.log("Error label: " + ds.label);
  }else{
    console.log("Dataset label: " + ds.label);
  }
});
```

### fetchQuery

Gets a query or a dataset ID and returns a promise of an explicit version of the original query. By default, only the last time period is retrieved: a second parameter (*false*) can be provided to retrieve all the time periods available.

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
    console.log("Error label: " + q.label);
  }else{
    console.log(q);
  }
});
```

## Get functions

Get functions are translation functions.

### getEmptyDataset

Creates an empty (metadata-only) jsonstat dataset instance from an explicit query.

```js
EuroJSONstat.fetchQuery("une_rt_a").then(q=>{
  if(q.class==="error"){
    console.log("Error label: " + q.label);
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
    console.log(statusId + " = " + statusLabel);
  }
);
```

### getURL

Converts a query or a dataset ID into a Eurostat API end point.

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

## Set functions

### setRole

Gets a jsonstat dataset instance and adds role information to it. Generally, you won&rsquo;t need to use it: all jsonstat dataset instances returned by JSON-stat for Eurostat have already set role.
