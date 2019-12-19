/*jshint esversion: 6*/

import {ELANG, EVERSION} from "../constants.js";

/**
 * Normalizes a query
 * @param {Object} query Original query
 * @returns {Object} Normalized query
 */
export default function normalQuery(query){
  const
    lang=query.lang || ELANG,
    version=query.version || EVERSION,
    dataset=query.dataset || null,
    filter=query.filter || null,
    label=query.label || null,
    nquery={
      class: "query",
      lang,
      version,
      dataset
    }
  ;

  if(filter && typeof filter==="object" && Object.keys(filter).length!==0){
    //category values must be inside array
    Object.keys(filter).forEach(dim=>{
      const d=filter[dim];
      if(!Array.isArray(d)){
        filter[dim]=[d];
      }

      if(filter[dim].length===0){
        delete filter[dim];
      }
    });

//    if(Object.keys(filter).length!==0){
      nquery.filter=filter;
  //  }
  }

  if(label && typeof label==="object" && Object.keys(label).length!==0){
    nquery.label=label;
  }

  return nquery;
}
