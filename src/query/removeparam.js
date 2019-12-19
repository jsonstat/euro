/*jshint esversion: 6*/

import normalQuery from "./normal.js";
import hasProp from "./hasprop.js";

/**
 * Removes parameters from a query
 * @param {Object} query Fully explicit query
 * @param {Array} params List of parameters to be removed from query
 * @returns {Object} New query without the specified parameters
 */
export default function removeParamQuery(query, params){
  const
    q=JSON.parse(JSON.stringify(query)),
    hasFilter=hasProp(q, "filter"),
    hasLabel=hasProp(q, "label"),
    hasCategory=hasLabel && hasProp(q.label, "category"),
    hasDimension=hasLabel && hasProp(q.label, "dimension")
  ;

  params.forEach(param=>{
    if(hasFilter){
      delete q.filter[param];
    }

    if(hasLabel){
      if(hasCategory){
        delete q.label.category[param];
      }
      if(hasDimension){
        delete q.label.dimension[param];
      }
    }
  });

  return normalQuery(q);
}

/**
* Removes time parameters from a query
* Eurostat allows to specify time in several ways
* @param {Object} query Fully explicit query
* @returns {Object} New query without time parameters
*/
export function removeTimeQuery(query){
  return removeParamQuery(query, ["time", "lastTimePeriod", "sinceTimePeriod"]);
}
