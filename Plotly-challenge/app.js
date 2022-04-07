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
      hovertemplate : filteredData[0].otu_labels.slice(0, 10).reverse()
    
    }];

    Plotly.newPlot('bar', data, layout)
  
    
  })
  
}

// function to populate drop down menu and event handler for when an option from the dropdown is selected

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
    //get the graph to display the first participant's data when the page initially loads
    var uponLoadingpage = participant_names[0];
    console.log(uponLoadingpage);
    createBarcharts(uponLoadingpage);
  });
}

function optionChanged(newVariable) {
  console.log(newVariable);
  createBarcharts(newVariable);


}

dropdownEventhandler();


function bubbleCharts() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubble")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 10000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 1, 40]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.gdpPercap); } )
      .attr("cy", function (d) { return y(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")

})



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
 