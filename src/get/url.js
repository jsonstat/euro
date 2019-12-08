/*jshint esversion: 6*/

import {ELANG, EVERSION} from "../constants.js";

/**
 * Converts a query into a Eurostat URL
 * @param {string|Object} query Query
 * @returns {string} Eurostat API end point
 */
export default function getURL(query){
  const APIbase="https://ec.europa.eu/eurostat/wdds/rest/data/";

  //string
  if(typeof query==="string"){
    //url
    if(/https?:\/\//i.test(query)){
      return query;
    }

    //querified a dataset id
    query={ dataset: query };
  }

  //object
  if(typeof query==="object" && query!==null && !Array.isArray(query)){
    if(query.dataset){
      const
        filter=query.filter || null,
        lang=query.lang || ELANG,
        version=query.version || EVERSION
      ;
      let
        url=`${APIbase}v${version}/json/${lang}/${query.dataset}`,
        param=[]
      ;

      if(filter){
        Object.keys(filter).forEach(dim=>{
          const d=filter[dim];
          if(Array.isArray(d)){
            d.forEach(value=>{
              param.push(`${dim}=${value}`);
            });
          }else{ //Not an array? But it must be! Ok let's be tolerant
            param.push(`${dim}=${d}`);
          }
        });
        url+="?"+param.join("&");
      }

      return url;
    }
  }

  //no dataset provided
  return null;
}
