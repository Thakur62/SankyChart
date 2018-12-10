
 google.charts.load("current", {packages:["sankey"]});
 google.charts.setOnLoadCallback(drawChart);
  
google.charts.load("current", {packages:["sankey"]});


function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
   updateChart(lines);
}



function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}


function updateChart(lines) {

	console.log("update chart method gets called")
    dataTable = new google.visualization.DataTable();
	console.log("lines in the console ")
	var numRows = lines.length;

    // in this case the first column is of type 'string'.
    dataTable.addColumn('string', lines[0][0]);
    dataTable.addColumn('string', lines[0][1]);
    dataTable.addColumn('number', lines[0][2]);
//    dataTable.addColumn('number', lines[0][3]);
//    
    for (var i = 1; i < numRows; i++){
    	lines[i][2] = parseInt(lines[i][2]);
    	console.log("After the conversion values" + lines[i][2]);
    }
    
    for (var i = 1; i < numRows; i++) {
	    	dataTable.addRow(lines[i]);
	}
    var options = {
		width : 600,
	};
    
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(dataTable, options);        

}


