import {ELANG, EVERSION} from "../constants.js";
import lastPeriodQuery from "../query/lastperiod.js";
import fetchDataset from "./dataset.js";

/**
 * Converts (async) an implicit query into an explicit one
 * by fetching a dataset
 * @param {Object} query Implicit query
 * @param {boolean} [last] true (def.) to retrieve only the last time period
 * @returns {Object} an explicit query on success
 */
export default function fetchQuery(query, last){
  const q=(last!==false) ? lastPeriodQuery(query) : query;

  return fetchDataset(q).
    then(ds=>{
      if(ds.class==="error"){
        return ds;
      }

      const
        filter={},
        dimension={},
        category={}
      ;
      ds.id.forEach(d=>{
        const dim=ds.Dimension(d);

        dimension[d]=dim.label;
        filter[d]=dim.id;
        category[d]=dim.Category().map(e=>e.label);
      });

      return {
        class: "query",
        dataset: q.dataset,
        filter,
        label: {
          dataset: ds.label,
          //not very useful in the case of present Eurostat API: label=id
          dimension,
          category
        },
        lang: q.lang || ELANG,
        version: q.version || EVERSION
      };
    })
  ;
}
