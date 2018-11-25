$(document).ready(function() {

    $("#add").click(function() {
        var lastField = $("#buildyourform div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
        fieldWrapper.data("idx", intId);

        //expense input fields
        var fDesc = $("<font size=\"3\" class=\"fieldDescription\" >Expense Type</font>");
        var fName = $("<input type=\"text\" class=\"fieldname\" />");
        var fDesc2 = $("<font size=\"3\" class=\"fieldDescription\" >Cost</font>");
        var fValue = $("<input type=\"number\" class=\"fieldcost\" />");
        //var fType = $("<select class=\"fieldtype\"><option value=\"checkbox\">Checked</option><option value=\"textbox\">Text</option><option value=\"textarea\">Paragraph</option></select>");
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
        removeButton.click(function() {
            $(this).parent().remove();
        });

        //append to page container
        fieldWrapper.append(removeButton);
        fieldWrapper.append(fDesc);
        fieldWrapper.append(fName);
        //fieldWrapper.append(fType);
        fieldWrapper.append(fDesc2);
        fieldWrapper.append(fValue);
        $("#buildyourform").append(fieldWrapper);
    });

    //global variable to hold expense values
    var expenses;

    $("#display").click(function() {
        //reset piechart and array before every display
        $("#piechart").empty();
        expenses = [['Charges', 'Percent of Budget']];
        //var fieldSet = $("<fieldset id=\"yourform\"><legend>Your Form</legend></fieldset>");
        $("#buildyourform div").each(function() {
            //var id = "input" + $(this).attr("id").replace("field","");
            //var label = $("<label for=\"" + id + "\">" + $(this).find("input.fieldname").first().val() + "</label>");
            //retrieve every expense value pair and add to array
            var curExpense = [$(this).find("input.fieldname").first().val(), parseInt($(this).find("input.fieldcost").first().val())];
            expenses.push(curExpense);

            /*var input;
            switch ($(this).find("select.fieldtype").first().val()) {
                case "checkbox":
                    input = $("<input type=\"checkbox\" id=\"" + id + "\" name=\"" + id + "\" />");
                    break;
                case "textbox":
                    input = $("<input type=\"text\" id=\"" + id + "\" name=\"" + id + "\" />");
                    break;
                case "textarea":
                    input = $("<textarea id=\"" + id + "\" name=\"" + id + "\" ></textarea>");
                    break;
            } */
            //fieldSet.append(label);
            //fieldSet.append(input);
        });
        //$("body").append(fieldSet);
        console.log(expenses);
        // Load google charts from expense array
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    });

    //if a file is uploaded, this method is triggered
    document.getElementById('file').onchange = function(){
      var fileDisplayArea = document.getElementById('fileDisplayArea');
      var fileInput = document.getElementById('file');

      var file = this.files[0];
      var textType = /text.plain/; //.* means everything so changed to .plain
      //console.log(file.type);

      if (file.type.match(textType)) {
        var reader = new FileReader();
        $("#piechart").empty();
        expenses = [['Charges', 'Percent of Budget']];

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
              //console.log(category_price[1]);

              var price = parseInt(category_price[1]);
              category_price[1] = price;
              expenses.push(category_price);
            }
          }

          console.log(expenses);
        };
        reader.readAsText(file);

        // Load google charts
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        fileInput.disabled = true;
        fileDisplayArea.innerText = "";
      } else {
        fileDisplayArea.innerText = "File not supported!";
      }

    };

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
});
