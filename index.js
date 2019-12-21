var datasetsElement=document.querySelector("#datasets"),dimElement=document.querySelector("#dimensions"),dataElement=document.querySelector("#data");function datasets(e){var r=[];return r.push('<select name="ds"><option value="">Choose a dataset</option>'),e.forEach(function(e,t){var a=e.dataset,n=e.label.dataset;r.push('<option value="'+t+'">'+n+" ("+a+")</option>")}),r.push("</select>"),r.join("")}function getMeta(t){if(dataElement.innerText="",null===t)return warn("META","RESET");t.lang=document.querySelector("#languages input[type=radio]:checked").value,warn("META","FETCH"),EuroJSONstat.fetchFullQuery(t).then(function(e){if("error"===e.class)return warn("META","ERROR",e.status,e.label);dimensions(EuroJSONstat.getEmptyDataset(e),t)})}function dimensions(e,t){var s=[];sortByRole(e.role).forEach(function(r){var o=e.Dimension(r),l=o.role;s.push("<details>"),s.push("<summary>"+ico(l)+o.label+"</summary><div>"),1<o.length&&s.push('<label><input onclick="chkall(&apos;'+r+'&apos;,this)" type="checkbox" />All</label>'),o.id.forEach(function(e,t,a){if("time"!==l)s.push('<label><input class="filter" type="checkbox" name="'+r+'" value="'+e+'"/>'+o.Category(e).label+"</label>");else{var n=o.length-t-1;s[s.length+n]='<label><input class="filter" type="checkbox" name="'+r+'" value="'+a[n]+'"/>'+o.Category(n).label+"</label>"}}),s.push("</div></details>")});var a=t.filter?"Selection required":"";s.push('<div id="button"><button class="btn btn-default" id="get">Load Data</button><span id="down"><a id="csv"></a></span><span id="msg">'+a+"</span></div>"),dimElement.innerHTML=s.join(""),document.querySelector("button").addEventListener("click",function(){document.querySelector("#data").innerHTML="",document.querySelector("#down").innerHTML='<a id="csv"></a>',getData(removeFilter(t),e.id)})}function sortByRole(e){return e.geo.concat(e.time,e.metric,e.classification)}function removeFilter(e){return delete e.filter,e}function getData(e,t){warn("DATA","FETCH");var a={};t.forEach(function(t){a[t]=[],Array.prototype.forEach.call(document.querySelectorAll("input.filter[name="+t+"]"),function(e){e.checked&&a[t].push(e.value)})});var r=EuroJSONstat.addParamQuery(e,a);EuroJSONstat.fetchDataset(r).then(function(e){if("error"!==e.class){warn("DATA","RESET");var t=e.extension.status?statusInfo(e.extension.status.label):"";dataElement.innerHTML=JSONstatUtils.datalist(e,{counter:!0,tblclass:"datalist",numclass:"number",valclass:"value",vlabel:"VALUE",status:!0,slabel:"STATUS",na:" ",locale:r.lang})+t;var a=document.querySelector("#csv");if(void 0!==a.download){var n=JSONstatUtils.toCSV(e,{status:!0,slabel:"status",vlabel:"value",na:" "});a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(n),a.download=e.extension.datasetId+".csv",a.className="btn btn-default",a.innerHTML="Download CSV"}addTopAndCaption(EuroJSONstat.getURL(r))}else"416"===e.status?warn("DATA","416"):warn("DATA","ERROR",e.status,e.label)})}function chkall(e,t){Array.prototype.forEach.call(document.querySelectorAll("input[name="+e+"]"),function(e){e.checked=t.checked})}function ico(e){var t="glyphicon-signal";switch(e){case"geo":t="glyphicon-map-marker";break;case"time":t="glyphicon-time";break;case"metric":t="glyphicon-dashboard"}return'<span title="'+e+'" class="glyphicon '+t+'"></span> '}function addTopAndCaption(e){var t=document.querySelector(".datalist tr > th"),a=document.querySelector(".datalist tfoot td"),n=a.innerText;t.innerHTML='<a title="Up" href="#top">#</a>',t.id="top",a.innerHTML=n+'<a title="Top of the table" href="#top">&uarr;</a>',document.querySelector("caption").innerHTML=e.replace(/&/g,"&<wbr>")}function warn(e,t,a,n){var r,o="META"===e?dimElement:document.querySelector("#msg");switch(t){case"FETCH":r="META"===e?"Retrieving metadata...":"Retrieving data...";break;case"416":r="Too many cells requested. Please, select fewer categories.";break;case"ERROR":r="Sorry, an error ocurred: "+a+" ("+n+")";break;case"RESET":r=""}o.innerText=r}function statusInfo(t){var a=[];return a.push('<div id="status">'),Object.keys(t).forEach(function(e){a.push("<p><tt>"+e+"</tt> = "+t[e]+"</p>")}),a.push("</div>"),a.join("")}datasetsElement.innerHTML=datasets(queries),document.querySelector("select").addEventListener("change",function(e){getMeta(""===e.target.value?null:queries[e.target.value])});