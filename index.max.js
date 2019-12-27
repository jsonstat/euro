var
  datasetsElement=document.querySelector("#datasets"),
  dimElement=document.querySelector("#dimensions"),
  dataElement=document.querySelector("#data")
;

fetch("queries.json").then(function(res){
  var queries=res.json();
  datasetsElement.innerHTML=datasets(queries);

  document.querySelector("select").addEventListener("change", function(event){
    getMeta(
      event.target.value==="" ? null : queries[event.target.value]
    );
  });
});

/**********************************************************************/


function datasets(qa){
  var select=[];

  select.push('<select name="ds"><option value="">Choose a dataset</option>');
  qa.forEach(function(q, i){
    var
      dataset=q.dataset,
      label=q.label.dataset
    ;

    select.push('<option value="' + i + '">' + label + ' (' + dataset + ')</option>');
  });
  select.push('</select>');

  return select.join("");
}

function getMeta(query){
  dataElement.innerText="";

  if(query===null){
    return warn("META", "RESET");
  }

  query.lang=document.querySelector("#languages input[type=radio]:checked").value;

  warn("META", "FETCH");
  EuroJSONstat.fetchFullQuery(query).then(function(fq){
    if(fq.class==="error"){
      return warn("META", "ERROR", fq.status, fq.label);
    }

    dimensions( EuroJSONstat.getEmptyDataset(fq), query );
  });
}

function dimensions(ds, query){
  var
    input=[],
    sortedId=sortByRole(ds.role)
  ;

  sortedId.forEach(function(d){
    var
      dim=ds.Dimension(d),
      len=dim.length,
      single=(len===1),
      role=dim.role
    ;

    input.push('<details class="'+role+'">');
    input.push('<summary>' + ico(role) + dim.label + '</summary><div class="cont"><div id="items">');

    if(!single){
      input.push(
        '<label><input onclick="chkall(&apos;'+d+'&apos;,this)" type="checkbox" />All</label>'
      );
    }

    dim.id.forEach(function(c,i,a){
      var checkbox="";

      if(role!=="time"){
        if(!single){
          checkbox='<input class="filter" type="checkbox" name="'+d+'" value="'+c+'"/>';
        }
        input.push('<label>' + checkbox + dim.Category(c).label + '</label>');
      }else{ //time desc order
        var pos=len-i-1;

        if(!single){
          checkbox='<input onclick="timechk(&apos;item&apos;)" class="filter" type="checkbox" name="'+d+'" value="'+a[pos]+'"/>';
        }
        input[input.length+pos]=
          '<label>' + checkbox +
          dim.Category(pos).label +
          '</label>'
        ;
      }
    });

    if(role==="time"){
      input.push(period(len));
    }

    input.push('</div></div></details>');
  });

  var msg=(query.filter) ? "Selection required" : "";
  input.push('<div id="button"><button class="btn btn-default" id="get">Load Data</button><span id="down"><a id="csv"></a></span><span id="msg">' + msg + '</span></div>');

  dimElement.innerHTML=input.join("");

  document.querySelector("button").addEventListener("click", function(){
    document.querySelector("#data").innerHTML="";
    document.querySelector("#down").innerHTML='<a id="csv"></a>';
    getData(removeFilter(query), ds.id);
  });
}

function period(len){
  var options=[];

  for(var i=0; i<len; i++){
    options.push('<option value="'+(i+1)+'">'+(i+1)+'</option>');
  }
  return '</div><div id="number"><label><input class="filter" onclick="timechk(&apos;number&apos;)" type="checkbox" name="lasttime">Number of last periods<select onchange="timechk(&apos;select&apos;)" name="lastTimePeriod">' + options.join("") + '</select></label>';
}

function timechk(s){
  var
    number=document.querySelector(".time #number input")
  ;

  if(s==="select"){
    number.checked=true;
    s="number";
  }

  if(s==="number"){
    //IE
    Array.prototype.forEach.call(document.querySelectorAll(".time #items input"), function(e){
    //document.querySelectorAll(".time #items input").forEach(function(e){
      e.checked=false;
    });
  }else{
    document.querySelector(".time #number input").checked=false;
  }
}
function sortByRole(role){
  return role.geo.concat(role.time, role.metric, role.classification);
}
function removeFilter(q){
  delete q.filter;
  return q;
}
function getData(q, dim){
  warn("DATA", "FETCH");

  var filter={};
  dim.forEach(function(d){
    filter[d]=[];
    //IE
    Array.prototype.forEach.call(document.querySelectorAll("input.filter[name=" + d + "]"), function(i){
    //instead of document.querySelectorAll("input.filter[name=" + d + "]").forEach(function(i){
      if(i.checked){
        filter[d].push(i.value);
      }
    });
    if(document.querySelector("input[name=lasttime]").checked){
      delete filter.time;
      filter.lastTimePeriod=[ document.querySelector("select[name=lastTimePeriod] option:checked").value ];
    }
  });

  var query=EuroJSONstat.addParamQuery(q, filter);
  EuroJSONstat.fetchDataset(query).then(function(ds){
    if(ds.class==="error"){
      if(ds.status==="416"){
        warn("DATA", "416");
      }else{
        warn("DATA", "ERROR", ds.status, ds.label);
      }
      return;
    }
    warn("DATA", "RESET");

    var status=(ds.extension.status) ? statusInfo(ds.extension.status.label) : "";

    dataElement.innerHTML=
      JSONstatUtils.datalist(ds, {
        counter: true,
  			tblclass: "datalist",
  			numclass: "number",
  			valclass: "value",
  			vlabel: "VALUE",
        status: true,
        slabel: "STATUS",
        na: " ",
        locale: query.lang
      })
      +
      status
    ;

    var csvLink=document.querySelector("#csv");
    //If browser supports the html5 download attribute
    if(typeof csvLink.download!=="undefined"){
      var
        csv=JSONstatUtils.toCSV(
          ds,
          {
            status: true,
            slabel: "status",
            vlabel: "value",
            na: " "
          }
        )
      ;

      csvLink.href="data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      csvLink.download=ds.extension.datasetId + ".csv";
      csvLink.className="btn btn-default";
      csvLink.innerHTML="Download CSV";
    }

    addTopAndCaption(EuroJSONstat.getURL(query));
  });
}

function chkall(d, that){
  //IE
  Array.prototype.forEach.call(document.querySelectorAll("input[name="+d+"]"), function(e){
  //instead of document.querySelectorAll("input[name="+d+"]").forEach(function(e){
    e.checked=that.checked;
  });

  if(d==="time"){
    document.querySelector("#number input").checked=false;
  }
}

function ico(r){
  var cls="glyphicon-signal";
  switch (r) {
    case "geo":
      cls="glyphicon-map-marker";
    break;
    case "time":
      cls="glyphicon-time";
    break;
    case "metric":
      cls="glyphicon-dashboard";
    break;
  }

  return '<span title="' + r + '" class="glyphicon ' + cls + '"></span> ';
}

function addTopAndCaption(url){
  var
    top=document.querySelector(".datalist tr > th"),
    tfoot=document.querySelector(".datalist tfoot td"),
    source=tfoot.innerText
  ;

  top.innerHTML='<a title="Up" href="#top">#</a>';
  top.id="top";

  tfoot.innerHTML=source + '<a title="Top of the table" href="#top">&uarr;</a>';

  document.querySelector("caption").innerHTML=url.replace(/&/g, "&<wbr>");
}

function warn(el, id, code, text){
  var
    element=(el==="META") ? dimElement : document.querySelector("#msg"),
    s
  ;

  switch(id) {
    case "FETCH":
      s=(el==="META") ? "Retrieving metadata...": "Retrieving data...";
    break;
    case "416":
      s="Too many cells requested. Please, select fewer categories.";
    break;
    case "ERROR":
      s="Sorry, an error ocurred: " + code + " (" + text + ")";
    break;
    case "RESET":
      s="";
    break;
  }
  element.innerText=s;
}

function statusInfo(o){
  var arr=[];

  arr.push('<div id="status">');
  Object.keys(o).forEach(function(s){
    arr.push("<p><tt>" + s + "</tt> = " + o[s]  + "</p>");
  });
  arr.push("</div>");

  return arr.join("");
}
