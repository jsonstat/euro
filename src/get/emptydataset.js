/*jshint esversion: 6*/

import JSONstat from "jsonstat-toolkit";
import setRole from "../set/role.js";
import {ELANG} from "../constants.js";
import hasProp from "../query/hasprop.js";

/**
 * Create an empty (valueless) jsonstat dataset instance
 * @param {Object} query A (generally explicit) query
 * @returns {Object} an empty (only metadata) jsonstat dataset instance
 */
export default function getEmptyDataset(query){
  const
    lang=(hasProp(query, "lang")) ? query.lang : ELANG,
    datasetId=(hasProp(query, "dataset")) ? query.dataset : null, //emptyDataset accepts queries without dataset code
    extension={
      lang: lang.toUpperCase(), //Eurostat uses uppercase in extension lang
      datasetId
    },
    id=Object.keys(query.filter),
    size=id.map(i=>query.filter[i].length),
    dimension={}
  ;

  id.forEach(i=>{
    dimension[i]={
      label: query.label.dimension[i],
      category: {
        index: query.filter[i],
        label: {}
      }
    };

    query.filter[i].forEach((c,p)=>{
      Object.defineProperty(
        dimension[i].category.label,
        c,
        { value: query.label.category[i][p] }
      );
    });
  });

  const
    js={
      version: "2.0",
      class: "dataset",
      //href: getURL(query), Eurostat does not support valueless dataset requests
      label: query.label.dataset,
      extension,
      id,
      size,
      dimension,
      value: []
    },
    ds=JSONstat(js)
  ;

  setRole(ds);
  return ds;
}
