// Create arrays to hold data
var id = [];
var meta = [];
var samples = [];


function init() {
    d3.json("data/samples.json").then(function (data) {
        id = data.names;
        meta = data.metadata;
        samples = data.samples;

        var select = d3.select("#selDataset");
        id.forEach(element => {
            var options = select.append("option");
            options.property("value", element);
            options.text(element);
        });
            optionChanged(selection.property("value"));
    });
}


init();


// Create function to call graphs
function optionChanged(id) {
    barPlot(id);
    bubbleChart(id);
    demoGraphic(id);
};

// Create function for horizontal bar graph
function barPlot(id) {

    // Filter Data 
    var filtered = samples.filter(event => parseInt(event.id) === parseInt(id));
    var samp_data = filtered[0];

    // Create sample values, ids, and labels
    var sample_values = samp_data.sample_values.slice(0, 10).reverse();
    var otu_ids = samp_data.otu_ids.slice(0, 10).reverse();
    var otu_labels = samp_data.otu_labels.slice(0, 10).reverse();

    // Create trace
    var trace = {
        x: sample_values,
        y: otu_ids.map(id => `OTU ${id}`),
        text: otu_labels,
        type: "bar",
        orientation: "h",
    };

    // Edit Data
    var data = [trace];

    // Edit layout
    var layout = {
        title: `<b>Top OTUs Found`,
        yaxis: {
            title: "<b>OTU ID</b>"
        },
        xaxis: {
            title: "<b># of Samples</b>"
        }
    };

    // Create bar chart
    Plotly.newPlot("bar", data, layout);
};

// Create function for bubble chart
function bubbleChart(id) {

    // Filter data
    var filtered = samples.filter(event => parseInt(event.id) === parseInt(id));
    var samp_data = filtered[0];

    // create sample values, ids, and labels
    var sample_values = samp_data.sample_values;
    var otu_ids = samp_data.otu_ids;
    var otu_labels = samp_data.otu_labels;

    // Create trace
    var trace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
        },
        type: 'scatter',
        text: otu_labels,
        color: sample_values,
    };

    // Edit Data 
    var data = [trace];

    // Edit layout
    var layout = {
        title: `<b>OTUs Found`,
        showlegend: false,
        xaxis: {
            title: "<b>OTU ID</b>"
        },
        yaxis: {
            title: "<b># of Samples</b>"
        }
    };
  
    // Create bubble chart
    Plotly.newPlot('bubble', data, layout);
}



