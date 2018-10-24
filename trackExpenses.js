var expenses = [['Charges', 'Percent of Budget']];


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
};
