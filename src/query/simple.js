/*jshint esversion: 6*/

import {ELANG, EVERSION} from "../constants.js";
import hasProp from "./hasprop.js";

/**
 * Tries to transform a query into a new one that returns a single cell cube
 * (single cell guaranteed if original query is a fully explicit one)
 * @param {Object} query Fully explicit query
 * @returns {Object} New query for the last period and the first category of each dimension
 */
export default function simpleQuery(query, time){
  const q=JSON.parse(JSON.stringify(query));

  //Only equeries with filter can be uniqueried
  if(hasProp(q, "filter")){
    Object.keys(q.filter).forEach(f=>{q.filter[f]=q.filter[f].slice(0,1);});
    if(time===true){
      delete q.filter.time;
      q.filter.lastTimePeriod=["1"];
    }
  }

  if(
    hasProp(q, "label") &&
    hasProp(q.label, "category")
  ){
    Object.keys(q.label.category).forEach(f=>{q.label.category[f]=q.label.category[f].slice(0,1);});
    if(time===true){
      delete q.label.category.time;
    }
  }

  q.class="query";
  q.lang=query.lang ? query.lang : ELANG;
  q.version=query.version ? query.version : EVERSION;
  return q;
}
