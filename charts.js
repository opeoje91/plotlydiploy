function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samplesData = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesObject = samplesData.filter(
      (sampleObj) => sampleObj.id == sample
    );

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplesObject[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample["otu_ids"];
    var otuLabels = firstSample["otu_labels"];
    var sampleValues = firstSample["sample_values"];
    console.log(firstSample);
    console.log(sampleValues);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    var slicedIds = otuIds.slice(0, 10);
    var yTicks = slicedIds.map((e) => "OTU " + e).reverse();
    var selectSamples = sampleValues.slice(0, 10);
    var descendTicks = selectSamples.reverse();
    console.log(yTicks);
    console.log(descendTicks);

    // 8. Create the trace for the bar chart.
    // x values are the sample_values
    //  y values are the otu_ids
    //  reverse sample_values
    var reversedValues = sampleValues.reverse();
    var barData = [
      {
        x: descendTicks,
        y: yTicks,
        text: otuLabels,
        type: "bar",
        orientation: "h",
      },
    ];

    // 9. Create the layout for the bar chart.
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      paper_bgcolor: "green",
      font: { color: "pink", family: "Arial" }
      
    };

    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout);
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          color: otuIds,
          opacity: [0.6, 0.7, 0.8, 0.9],
          size: otuIds,
          sizeref: 2,
          sizemode: "area",
        },
        type: 'scatter'
      },
    ];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      hovermode: "otu_labels",
      showlegend: false,
      paper_bgcolor: "mintgreen",
     font: { color: "red", family: "Arial" }
      // height: 600,
      // width: 600
    };
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;

    // Create a variable that holds the first sample in the array.
    var metaObject = metadata.filter((sampleObj) => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMetaSample = metaObject[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.

    // 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(firstMetaSample["wfreq"]);
    // console.log(washFreq);

    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    // Plotly.newPlot();

    // // Use Plotly to plot the bubble data and layout.
    // Plotly.newPlot();

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: washFreq,
        title: { text: "Belly Button Washing Frequency" },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "Blue",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "purple" },
            { range: [8, 10], color: "green" },
          ],
        },
      }
    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
     font: { color: "darkblue", family: "Arial" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}
