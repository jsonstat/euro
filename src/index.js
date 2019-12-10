/*jshint esversion: 6*/

export {
  version
} from "../package.json";

export {
  default as simpleQuery
} from "./query/simple.js";

export {
  default as lastPeriodQuery
} from "./query/lastperiod.js";

export {
  default as addParamQuery
} from "./query/addparam.js";

export {
  default as removeParamQuery,
  removeTimeQuery
} from "./query/removeparam.js";

//Async functions

export {
  default as fetchQuery
} from "./fetch/query.js";

export {
  default as fetchFullQuery
} from "./fetch/fullquery.js";

export {
  default as fetchDataset
} from "./fetch/dataset.js";

//Translation functions

export {
  default as getURL
} from "./get/url.js";

export {
  default as getStatusLabel
} from "./get/statuslabel.js";

export {
  default as getEmptyDataset
} from "./get/emptydataset.js";

//DS transformation functions

export {
  default as setRole
} from "./set/role.js";
