
var id = [];
var meta = [];
var samples = [];


function init() {

    d3.json("data/samples.json").then(function (data) {

        
        id = data.names;
        meta = data.metadata;
        samples = data.samples;

        
        var selection = d3.select("#selDataset");
        id.forEach(element => {
            var options = selection.append("option");
            options.property("value", element);
            options.text(element);
        });

        
        optionChanged(selection.property("value"));
    });
}


init();



function optionChanged(id) {
    barPlot(id);
    bubbleChart(id);
    demoGraphic(id);
};


function barPlot(id) {


    var filtered = samples.filter(event => parseInt(event.id) === parseInt(id));

  
    var samp_data = filtered[0];

   
    var sample_values = samp_data.sample_values.slice(0, 10).reverse();
    var otu_ids = samp_data.otu_ids.slice(0, 10).reverse();
    var otu_labels = samp_data.otu_labels.slice(0, 10).reverse();

    
    var trace = {
        x: sample_values,
        y: otu_ids.map(id => `OTU ${id}`),
        text: otu_labels,
        type: "bar",
        orientation: "h",
    };


    var data = [trace];

 
    var layout = {
        title: `<b>Top OTUs Found`,
        yaxis: {
            title: "<b>OTU ID</b>"
        },
        xaxis: {
            title: "<b># of Samples</b>"
        }
    };

 
    Plotly.newPlot("bar", data, layout);
};

function bubbleChart(id) {

    
    var filtered = samples.filter(event => parseInt(event.id) === parseInt(id));

    
    var samp_data = filtered[0];

    
    var sample_values = samp_data.sample_values;
    var otu_ids = samp_data.otu_ids;
    var otu_labels = samp_data.otu_labels;


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

    var data = [trace];

    
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
  
    Plotly.newPlot('bubble', data, layout);
}



