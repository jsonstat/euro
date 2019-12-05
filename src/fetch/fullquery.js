//Experimental (and basically useless as it is)

import addParamQuery from "../query/addparam.js";
import removeParamQuery from "../query/removeparam.js";
import simpleQuery from "../query/simple.js";
import fetchQuery from "./query.js";

/**
 * Tries to convert (async) an unfiltered query into a fully explicit one
 * by fetching datasets
 * @param {Object} query Dataset code expressed as an unfiltered query
 * @param {Object} [geo] Geograhical category
 * @returns {Object} a fully explicit query on success
 */
export default function fetchFullQuery(query, geo){
 const filter=(typeof geo==="string") ?
   addParamQuery(query, {geo: [geo]})
   :
   addParamQuery(query, {filterNonGeo: ["1"]})
 ;

 return fetchQuery( filter ).then(e=>{
   if(e.class==="error"){
     return e;
   }

   return fetchQuery( removeParamQuery(simpleQuery(e), ["time", "geo"]) , false).then(
     t=>{
       if(t.class==="error"){
         return t;
       }
       return addParamQuery(e,t,["time","geo"]);
     }
   );
 });
}
