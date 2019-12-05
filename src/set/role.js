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
        ds.role.metric.push(d);
      break;
      default:
        ds.role.classification.push(d);
    }
  });
}
