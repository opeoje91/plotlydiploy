
// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var metadata = data.samples;

        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var samplesObject = metadata.filter(sampleObj => sampleObj.id == sample);

        //  5. Create a variable that holds the first sample in the array.
        var firstSample = samplesObject[0]

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otuIds = firstSample["otu_ids"];
        var otuLabels = firstSample["otu_labels"];
        var sampleValues = firstSample["sample_values"];
        console.log(firstSample);
        console.log(sampleValues);
        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        //  so the otu_ids with the most bacteria are last. 
        var slicedIds = otuIds.slice(0, 10)
        var yTicks = slicedIds.map(e => "OTU " + e).reverse();
        var selectSamples = sampleValues.slice(0, 10);
        var descendTicks = selectSamples.reverse();
        console.log(yTicks);
        console.log(descendTicks);

        // 8. Create the trace for the bar chart. 
        // x values are the sample_values
        //  y values are the otu_ids
        //  reverse sample_values
        var reversedValues = sampleValues.reverse();
        var barData = [{
            x: descendTicks,
            y: yTicks,
            text: otuLabels,
            type: "bar",
            orientation: "h"

        }];

        // 9. Create the layout for the bar chart. 
        var barLayout = {
            title: "Top 10 Bacteria Found"

        };

        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, barLayout);
        // 1. Create the trace for the bubble chart.
        var bubbleData = [{
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                // color: 'rgb(93, 164, 214)', //'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                size: otuIds,
                sizeref: 2,
                sizemode: 'area'
            }
        }];
        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: { title: "OTU ID" },
            hovermode: "otu_labels",
            showlegend: false,
            // height: 600,
            // width: 600

        };
        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // 3. Create a variable that holds the washing frequency.
        var washFreq = metadata["wfreq"].float();
        console.log(washFreq);

        // 4. Create the trace for the gauge chart.
        var gaugeData = [

        ];

        // 5. Create the layout for the gauge chart.
        var gaugeLayout = {

        };
        
        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot();
    });
}