import {ELANG, EVERSION} from "../constants.js";


/**
 * Converts a query into a Eurostat URL
 * @param {Object} query Query
 * @returns {string} Eurostat API end point
 */
export default function getURL(query){
  const APIbase="https://ec.europa.eu/eurostat/wdds/rest/data/";

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
        if(Array.isArray(dim)){
          filter[dim].forEach(value=>{
            param.push(`${dim}=${value}`);
          });
        }else{ //Not an array? But it must be! Ok let's be tolerant
          param.push(`${dim}=${filter[dim]}`);
        }
      });
      url+="?"+param.join("&");
    }

    return url;
  }

  //no dataset provided
  return null;
}
