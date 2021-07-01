/*jshint esversion: 6*/

/**
 * Adds role information to a Eurostat jsonstat dataset instance
 * by modifying it.
 * @param {Object} ds jsonstat dataset instance
 */
export default function setRole(ds){
  ds.role={
    geo: [],
    time: [],
    metric: [],
    classification: []
  };

  ds.id.forEach(d=>{
    ds.Dimension(d).role=(d==="time" || d==="geo") ? d : "classification";

    switch(d){
      case "geo":
      case "time":
        ds.role[d].push(d);
      break;
      case "unit":
      case "s_adj":
      case "indic_co":
        ds.role.metric.push(d);
      break;
      default:
        ds.role.classification.push(d);
    }
  });

  if(!ds.role.geo.length){
    delete ds.role.geo;
  }
  if(!ds.role.time.length){
    delete ds.role.time;
  }
  if(!ds.role.metric.length){
    delete ds.role.metric;
  }
  if(!ds.role.classification.length){
    delete ds.role.classification;
  }
}
