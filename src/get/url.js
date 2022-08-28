/*jshint esversion: 6*/

import normalQuery from "../query/normal.js";

/**
 * Converts a query into a Eurostat URL
 * @param {string|Object} query Query object, dataset ID or Eurostat API end point
 * @returns {string} Eurostat API end point
 */
export default function getURL(query){
  const APIbase="https://ec.europa.eu/eurostat/api/dissemination/statistics/";
  
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
      query=normalQuery(query);

      let
        url=`${APIbase}${query.version}/data/${query.dataset}?lang=${query.lang}`,
        param=[]
      ;

      const filter=query.filter || null;
      if(filter && Object.keys(filter).length!==0){
        Object.keys(filter).forEach(dim=>{
          filter[dim].forEach(value=>{
            param.push(`${dim}=${value}`);
          });
        });
        url+="&"+param.join("&");
      }

      return url;
    }
  }

  //no dataset provided
  return null;
}
