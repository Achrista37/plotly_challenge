// build a function to unpack data from json source and return an array of values

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


// build a function to build promise and put data into variables
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

    var layout = {
      title: "Belly Button Biodiversity",
      xaxis: { title: "Values" },
      yaxis: { title: "Organism" }
    };

    var data = [{
      type: 'bar',
      x: sample_data[0].sample_values.sort((a, b) => b.sample_values - a.sample_values).slice(0, 5).reverse(),
      y: sample_data[0].otu_ids.sort((a, b) => b.sample_values - a.sample_values).slice(0, 5).reverse(),
      orientation: 'h'}];

    Plotly.newPlot('bar', data, layout)
    
    
  })
  
}

accessJson("samples.json");






      /*
      var stock = data.dataset.dataset_code;
      var startDate = data.dataset.start_date;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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