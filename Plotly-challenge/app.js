// build a function to unpack data from json source and return an array of values then chart with Plotly

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


// build a function to build promise and put data into variables with dataset "0"
function accessJson(jsonfile) {
  d3.json(jsonfile).then((data) => {
// Grab values from the data json object to build the plots
    var metadata = data.metadata;
    var bb_data = data;
    var sample_data = data.samples;
    var id940 = sample_data[0].otu_ids;
    console.log(bb_data);
    console.log(metadata);
    console.log(sample_data);
    console.log(id940)
    console.log(sample_data.length)
 
 // build layout for the graph
    var layout = {
      title: "Top 10 OTUs Found ",
      xaxis: { title: "Values" },
      yaxis: { title: "Organism" }
    };

  //build data component for the graph

    var data = [{
      type: 'bar',
      x: sample_data[0].sample_values.slice(0, 10).reverse(),
      y: sample_data[0].otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      orientation: 'h'}];

    Plotly.newPlot('bar', data, layout)
  
    
  })
  
}

//accessJson("samples.json");


//build a function to utilize d3 to grab json file and put data into variables, then ultimately create charts based on those data

function createBarcharts(idSelector) {
  d3.json("samples.json").then((data) => {
// Grab values from the data json object to build the plots
    var metadata = data.metadata;
    var bb_data = data;
    var sample_data = data.samples;
    //console.log(sample_data);
    console.log(idSelector);
    ///
    var filteredData = sample_data.filter(row => row.id == idSelector);
    console.log(filteredData);
   // console.log(row['id']);
    var OTUIDs = filteredData[0].otu_ids;
    console.log(OTUIDs);
    var SampleValues = filteredData[0].sample_values;
    /*
    console.log(bb_data);
    console.log(metadata);
    console.log(sample_data);
    console.log(id940);
    console.log(sample_data.length);
 */
 // build layout for the graph
    var layout = {
      title: "Top 10 OTUs Found ",
      xaxis: { title: "Values" },
      yaxis: { title: "Organism" }
    };

  //build data component for the graph
    console.log(filteredData.sample_values);
    var data = [{
      type: 'bar',
      x: SampleValues.slice(0, 10).reverse(),
      y: OTUIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      orientation: 'h',
        options: {
          plugins: {
            tooltip: {
              filter : function(tooltipItem){
                return tooltipItem[0].otu_labels === filteredData[0].otu_labels;
              }
            }
          }
        }
    
    }];

    Plotly.newPlot('bar', data, layout)
  
    
  })
  
}
//accessJson("samples.json");


  //FOR LOOP TO ITERATE AND GET PARTICIPANTS' ID NUMBER
 
/////////////////////////////////////////////////////////////////////////////////////////////


function dropdownEventhandler() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  d3.json("samples.json").then((data) => { 
    var participant_names = data.names;
    console.log(participant_names);
    participant_names.forEach((name) => {
      dropdownMenu
    	.append('option')
      .text(name) // text showed in the menu
      .property("value", name);
      console.log(name);
      
    });
    var uponLoadinggraph = participant_names[0];
    console.log(uponLoadinggraph);
    createBarcharts(uponLoadinggraph);
  });
}

function optionChanged(newVariable) {
  console.log(newVariable);
  createBarcharts(newVariable);


}

dropdownEventhandler();



/*
 for (i = 0; i < sample.data.length; i++) {
    tbody.html("");    
    //populate table with filtered UFO data
    x.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });

    }
  } 





  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;

  var CHART = d3.selectAll("#plot").node();

  // Initialize x and y arrays
  var x = [];
  var y = [];

  switch(dataset) {
    case "dataset1":
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
      break;

    case "dataset2":
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
      break;

    case "dataset3":
      x = [100, 200, 300, 400, 500];
      y = [10, 100, 50, 10, 0];
      break;

    default:
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 3, 4, 5];
      break;
  }


  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(CHART, "x", [x]);
  Plotly.restyle(CHART, "y", [y]);
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //////////////////////////////////////////////////////////////////
  //  Create the Traces
    var trace1 = {
      x: data.organ,
      y: data.survival.map(val => Math.sqrt(val)),
      type: "box",
      name: "Cancer Survival",
      boxpoints: "all"
    };
  
    // Create the data array for the plot
    var data = [trace1];
  
    // Define the plot layout
    var layout = {
      title: "Square Root of Cancer Survival by Organ",
      xaxis: { title: "Organ" },
      yaxis: { title: "Square Root of Survival" }
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
  });
  */


  /*
 Object.entries(filteredObject).forEach(([key, value]) => {


    filteredData = filteredData.filter(row => row[key] === value);
    console.log(filteredData);

  });
*/
 