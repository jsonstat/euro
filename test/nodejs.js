const
  EuroJSONstat=require("../main.cjs"),
	query={
		dataset: "une_rt_a",
		filter: {
			age: ["Y15-74"],
			sex: ["T"]
		}
	}
;

console.log("EuroJSONstat version " + EuroJSONstat.version + "\n");

EuroJSONstat.fetchDataset(query).then(ds=>{
	if(ds.class==="dataset"){
		const
			dataset=query.dataset,
			label=ds.label,
			classification=ds.role.classification,
			unemploy=ds.Data({time: "2021", unit: "PC_ACT", geo: "EU27_2020"}).value,
			status=ds.Data({time: "2017", unit: "PC_ACT", geo: "BE"}).status,
			statusLabel=EuroJSONstat.getStatusLabel(ds, status)
		;

		console.log(`"${dataset}" dataset has label "${label}".\n`);

		//When standardized, Eurostat's datasets are enriched with roles
		console.log(`Classification dimensions: ${classification}\n`);

		console.log(`Unemployment rate in 2021 in EU27: ${unemploy} %\n`);

		//Eurostat status meaning is easily retrieved
		console.log(`Status symbol of Belgium 2017 is "${status}" which means "${statusLabel}".`);
	}
});
