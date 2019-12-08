/*jshint esversion: 6*/

import JSONstat from "jsonstat-toolkit";
import getURL from "../get/url.js";
import setRole from "../set/role.js";


/**
 * Fetches (async) a normalized Eurostat jsonstat dataset.
 * @param {string|Object} query A Eurostat dataset ID, a Eurostat API endpoint or a query
 * @returns {Object} jsonstat dataset instance on success
 */
export default function fetchDataset(o){
  if(o){
    return JSONstat( getURL(o) )
      .then(ds=>{
        if(ds.class==="dataset"){
          setRole(ds);
          return ds;
        }else{
          return ds;
        }
      },
      e=>{
        const
          status=e.message.slice(0,3),
          label=(status==="416") ? "Too many categories have been requested. Maximum is 50." : e.message.slice(4)
        ;

        return {
          class: "error",
          status,
          label
        };
      }
    );
  }
}
