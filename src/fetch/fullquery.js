/*jshint esversion: 6*/

import addParamQuery from "../query/addparam.js";
import removeParamQuery from "../query/removeparam.js";
import simpleQuery from "../query/simple.js";
import fetchQuery from "./query.js";
import hasProp from "../query/hasprop.js";

/**
 * Tries to convert (async) an unfiltered query into a fully explicit one
 * by fetching datasets
 * @param {Object|string} query Query or dataset ID
 * @returns {Object} a fully explicit query on success
 */
export default function fetchFullQuery(query){
  if(typeof query==="string"){
    query={ dataset: query };
  }

  const filter=(hasProp(query, "filter")) ? query.filter : null;

  if(filter && Object.keys(filter).length!==0){
    const
      filterDimensions=Object.keys(filter),
      filtered=addParamQuery(query, filter)
    ;

    return fetchQuery(filtered, false).then(ds=>{
      if(ds.class==="error"){
        return ds;
      }

      const
        simple=simpleQuery(ds),
        open=removeParamQuery(simple, filterDimensions)
      ;

      return fetchQuery(open, false).then(f=>{
        if(f.class==="error"){
          return f;
        }
        return addParamQuery(ds, f, filterDimensions);
      });
    });
  }else{
    return fetchQuery(query, false).then(ds=>ds);
  }
}
