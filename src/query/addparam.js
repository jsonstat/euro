import {ELANG, EVERSION} from "../constants.js";
import hasProp from "./hasprop.js";

/**
 * Transforms a filter into a query
 * @param {Object} filter Querifiable object (ex. { "geo": ["AT"]} })
 * @param {string} [lang] Eurostat's API language
 * @param {string} [version] Eurostat API version
 * @returns {Object} Dummy query (no dataset) for transformation purposes
 */
function querify(filter, lang, version){
  return {
    class: "query",
    dataset: null,
    filter,
    lang: lang || ELANG,
    version: version || EVERSION
  };
}

/**
 * Imports the specified parameters to a query from a new query
 * or from a filter (ex. { "geo": ["AT"]} })
 * @param {Object} query Original query
 * @param {Object|Array} aquery New query or a filter (see querify())
 * @param {Array} [params] List of parameters to be imported
 * @returns {Object} New query created from two queries
 */
export default function addParamQuery(query, aquery, params){
  //Two arguments instead of three
  if(typeof params==="undefined"){
    params=Object.keys(aquery);
    aquery=querify(aquery);
  }

  const
    q=JSON.parse(JSON.stringify(query)),
    aHasFilter=hasProp(aquery, "filter"),
    aHasCategory=
      hasProp(aquery, "label") &&
      hasProp(aquery.label, "category")
  ;

  params.forEach(param=>{
    if(
      aHasFilter &&
      hasProp(aquery.filter, param)
    ){
      if(!hasProp(q, "filter")){
        q.filter={};
      }

      q.filter[param]=aquery.filter[param];
    }

    if(
      aHasCategory &&
      hasProp(aquery.label.category, param)
    ){
      if(!hasProp(q, "label")){
        q.label={};
      }else if(!hasProp(q.label, "category")){
        q.label.category={};
      }

      q.label.category[param]=aquery.label.category[param];
    }
  });

  q.class="query";
  q.lang=query.lang ? query.lang : ELANG;
  q.version=query.version ? query.version : EVERSION;
  return q;
}
