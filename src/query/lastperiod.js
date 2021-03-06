/*jshint esversion: 6*/

import normalQuery from "./normal.js";
import hasProp from "./hasprop.js";

/**
 * Adds a last time period filter to an implicit query. Doesn't care about labels.
 * @param {Object} query Implicit query
 * @returns {Object} Similar implicit query filtered for the last time period
 */
export default function lastPeriodQuery(query){
  const q=JSON.parse(JSON.stringify(query));

  if(hasProp(q, "filter")){
    delete q.filter.time;
    q.filter.lastTimePeriod=["1"];
  }else{
    q.filter={
      "lastTimePeriod": ["1"]
    };
  }

  return normalQuery(q);
}
