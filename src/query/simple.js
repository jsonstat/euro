/*jshint esversion: 6*/

import normalQuery from "./normal.js";
import hasProp from "./hasprop.js";

/**
 * Tries to transform a query into a new one that returns a single cell cube
 * (single cell guaranteed if original query is a fully explicit one)
 * @param {Object} query Fully explicit query
 * @param {Boolean} time Use last time period available
 * @param {option} option "first" (default), "last", "middle". Category selection criterion
 * @returns {Object} New query for the last period and the first category of each dimension
 */
export default function simpleQuery(query, time, option){
  const q=JSON.parse(JSON.stringify(query));

  let select;

  switch(option) {
    case "last":
      select=function(f){
        q.filter[f]=q.filter[f].slice(-1);
      };
    break;
    case "middle":
      select=function(f){
        const p=Math.round(q.filter[f].length/2);
        q.filter[f]=q.filter[f].slice(p-1, p);
      };
    break;
    default:
      select=function(f){
        //option "first"
        q.filter[f]=q.filter[f].slice(0,1);
      };
  }

  //Only equeries with filter can be uniqueried
  if(hasProp(q, "filter")){
    Object.keys(q.filter).forEach(select);
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

  return normalQuery(q);
}
