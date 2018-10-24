var expenses = [['Charges', 'Percent of Budget']];

document.getElementById('file').onchange = function(){
  var fileDisplayArea = document.getElementById('fileDisplayArea');
  var fileInput = document.getElementById('file');

  var file = this.files[0];
  var textType = /text.plain/; //.* means everything so changed to .plain
  console.log(file.type);

  if (file.type.match(textType)) {
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      //console.log(this.result);

      // By lines
      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        ///console.log();
        var data = lines[line];

        if(data !== null && data !== '') {
          var category_price = data.split(' ');
          console.log(category_price[1]);

          var price = parseInt(category_price[1]);
          category_price[1] = price;
          expenses.push(category_price);
        }
      }

      //console.log(expenses);
    };
    reader.readAsText(file);

    // Load google charts
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
      var data = google.visualization.arrayToDataTable(expenses);/*[
        ['Charges', 'Percent of Budget'],
        ['Rent', 25],
        ['Food', 15],
        ['Gas', 5],
        ['Phone Bill', 5],
        ['Electric', 5],
        ['Remaining', 45]
      ] */

      // Optional; add a title and set the width and height of the chart
      var options = {'title':'Your Budget Summary', 'width':825, 'height':600};

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }

    fileInput.disabled = true;
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }

};
