/*jshint esversion: 6*/

import JSONstat from "jsonstat-toolkit";
import getURL from "../get/url.js";
import setRole from "../set/role.js";


/**
 * Fetches (async) a normalized Eurostat jsonstat dataset.
 * @param {string|Object} query A Eurostat dataset ID, a Eurostat API endpoint or a query (filters are ignored)
 * @param {boolean} instance Type of return value (Default false)
 * @returns {Object} jsonstat dataset instance or object on success
 */
export default function fetchEmptyDataset(o, instance){
	function responseJSON(resp) {
		if(!resp.ok){
			throw new Error(resp.status + " " + resp.statusText);
		}
		return resp.json();
	}
	
	if(o){
		if(typeof o==="string"){
    		o={ dataset: o };
  		}

		o.filter={ time_period: ["null"] };

		return fetch( getURL(o) ).then(responseJSON).then(d1 => 
			{
				const 
					ds=JSONstat(d1),
					pos=d1.id.indexOf("time"),
					filter={}
				;

				ds.id.forEach(e => {
					if(e!=="time"){
						filter[e]=[ds.Dimension(e).id[0]];
					}
				});

				d1.value=[];

				o.filter=filter;
				return fetch( getURL(o) ).then(responseJSON).then(d2 => {
					d1.size[pos]=d2.size[pos];
					d1.dimension.time.category=d2.dimension.time.category;

					if(instance){
						let ds=JSONstat(d1);
						if(ds.class==="dataset"){
							setRole(ds);
							return ds;
						}else{
							return ds;
						}
					}else{
						return d1;
					}
				});
			},
				e=>{
				//Not elegant. Should be catched by JSONstat()
				const
					code=e.message.slice(0,3),
					status=( !isNaN(code) ) ? code : "418", //418 is used here to inform that error was not returned by the server but instead it was produced in the client's side
					label=(status!=="418") ? e.message.slice(4) : e.message
					//label=(status==="416") ? "Too many categories have been requested. Maximum is 50." : e.message.slice(4)
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
