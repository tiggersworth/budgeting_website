document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  console.log(app)

});

var db = firebase.firestore();

// db.settings({
//   timestampsInSnapshots: true
// });

function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
}

var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');
var rent;
var electric;
var food;
var gas;
var car_insurance;
var dog_expenses;
var dental_insurance;
var going_out_expenses;
var netflix;
var spotify;
var internet;
var cell_phone;
var health_insurance;
var dog_insurance;

$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });
    data.push(h);
    rent = data[0];
    electric = data[1];
    food = data[2];
    gas = data[3];
    car_insurance = data[4];
    health_insurance = data[5];
    dog_expenses = data[6];
    dental_insurance = data[7];
    dog_insurance = data[8];
    going_out_expenses = data[9];
    netflix = data[10];
    spotify = data[11];
    internet = data[12];
    cell_phone = data[13];
  });
  getUserUID();
  // Output the result

  $EXPORT.text(JSON.stringify(data));
});

function setProfile() {
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
                 }
}

function getUserUID() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid;
      var stringv = String(userid); //stringv holds string version of user.uid
      // console.log("userid",stringv);
      db.collection("users").doc(stringv).set({
        rent: rent,
        electric: electric,
        food: food,
        gas: gas,
        car_insurance: car_insurance,
        health_insurance: health_insurance,
        dog_expenses: dog_expenses,
        dental_insurance: dental_insurance,
        dog_insurance: dog_insurance,
        going_out_expenses: going_out_expenses,
        netflix: netflix,
        spotify: spotify,
        internet: internet,
        cell_phone: cell_phone
      })
      // console.log(rent);
      // console.log(electric);
      getData();

      return user.uid;
    }
  });
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
};

function pushUserUID() {
  db.collection("users").doc(stringv).set({
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

var stringUser;

function getStringUserUID() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userid = user.uid; //NON STRING OF ID
      var stringv = String(userid); //stringv holds string version of user.uid
      console.log("userid",stringv);
      stringUser = stringv.valueOf();
      console.log("heeere", stringUser);
      return stringv;
    }
  });
}

getStringUserUID();
//var docRef = db.collection("users").doc(getStringUserUID());
//console.log(stringUser);

function getData() {
  var docRef = db.collection("users").doc(String(firebase.auth().currentUser.uid));

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}
console.log(stringUser);

// initFirebaseAuth();
checkSetup();
setProfile();
getUserUID();
getData();
//pushUserUID();
// welcomeUser();

// Shortcuts to DOM Elements.
// var welcomeMessage = document.getElementById('welcome_message');


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
    fieldWrapper.append(fDesc2);
    fieldWrapper.append(fValue);
    $("#buildyourform").append(fieldWrapper);
  });

  //global variable to hold expense values
  var expenses;
  var budget = 250;

  $("#display").click(function() {
    if(checkMissingExpenseFields()) {
      //reset piechart and array before every display
      $("#piechart").empty();
      expenses = [['Charges', 'Percent of Budget']];
      //var fieldSet = $("<fieldset id=\"yourform\"><legend>Your Form</legend></fieldset>");
      var totalSpent = 0;
      $("#buildyourform div").each(function() {
        //var id = "input" + $(this).attr("id").replace("field","");
        //var label = $("<label for=\"" + id + "\">" + $(this).find("input.fieldname").first().val() + "</label>");

        //retrieve every expense value pair and add to array
        var curExpense = [$(this).find("input.fieldname").first().val(), parseInt($(this).find("input.fieldcost").first().val())];
        expenses.push(curExpense);

        totalSpent += parseInt($(this).find("input.fieldcost").first().val());
      });
      var remain = budget - totalSpent;
      expenses.push(['Remaining', remain]);
      displayWeeklyBudgetValues(budget, remain);

      // Load google charts from expense array
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      document.getElementById('file').disabled = true;
    } else {
      alert("Please make sure you used numerical values for Cost and all expense fields are filled out.");
    }

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
        // Entire file console.log(this.result);
        var totalSpent = 0;
        // By lines
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
          var data = lines[line];

          if(data !== null && data !== '') {
            var category_price = data.split(' ');

            var price = parseInt(category_price[1]);
            category_price[1] = price;
            expenses.push(category_price);
            totalSpent += price;
          }
        }
        var remain = budget - totalSpent;
        expenses.push(['Remaining', remain]);

        displayWeeklyBudgetValues(budget, remain);
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
    var options = {'title':'Your Budget Summary', 'width':625, 'height':350, is3D: true};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  //weekly bar chart load and draw methods
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawWeekChart);

  function drawWeekChart() {
    var data = google.visualization.arrayToDataTable([
      ['Week', 'Budget', 'Expenses', 'Remaining'],
      ['Week 1', 250, 50, 200],
      ['Week 2', 250, 0, 250],
      ['Week 3', 250, 125, 125],
      ['Week 4', 250, 175, 75]
    ]);

    var options = {
      chart: {
        title: 'Weekly',
        subtitle: 'Budget, Expenses, and Remaining Amount',
      },
      bars: 'horizontal' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('weekbarchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  //monthly bar chart load and draw methods
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawMonthChart);

  function drawMonthChart() {
    var data = google.visualization.arrayToDataTable([
      ['Month', 'Budget', 'Expenses', 'Remaining'],
      ['January', 1000, 400, 600],
      ['February', 1000, 460, 540],
      ['March', 1000, 1120, 0],
      ['April', 1000, 540, 460],
      ['May', 1000, 640, 360],
      ['June', 1000, 740, 260],
      ['July', 1000, 840, 160],
      ['August', 1000, 300, 700],
      ['September', 1000, 450, 550],
      ['October', 1000, 220, 780],
      ['November', 1000, 330, 670],
      ['December', 1000, 560, 440]
    ]);

    var options = {
      chart: {
        title: 'Monthly',
        subtitle: 'Budget, Expenses, and Remaining Amount',
      },
      bars: 'horizontal' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('monthbarchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  function displayWeeklyBudgetValues(starting, remaining) {
    $("#bd1").remove();
    var start = $("<font size=\"3\" id=\"bd1\" class=\"budgetDescription\" >Starting Weekly Budget: <b>" + starting + "</b></font>");
    $("#piechartcontainer").append(start);

    $("#bd2").remove();
    $("#msg").remove();
    $("#closebtn").remove();

    //TODO: fix this to make div container visible again for messages
    //var div = this.parentElement;
    //div.style.opacity = "0";
    //setTimeout(function(){ div.style.display = "none"; }, 600);

    //if there is still money remaining in the budget
    var remain, message;
    var button = $("<span class=\"closebtn\" id=\"closebtn\">&times;</span>");

    if(remaining > 0) {
      remain = $("<font size=\"3\" id=\"bd2\" class=\"budgetDescription2\" color=\"green\">Remaining Budget: <b>" + remaining + "</b></font>");

      message = $("<font id=\"msg\">Keep up your good budgeting habits!</font>");

      document.getElementById("alert").style.backgroundColor = "#4CAF50";
    } else {
      remain = $("<font size=\"3\" id=\"bd2\" class=\"budgetDescription2\" color=\"red\">Remaining Budget: <b>" + remaining + "</b></font>");

      message = $("<font id=\"msg\">You have <strong>exceeded</strong> your allocated budget! Check out this <a href=\"https://wallethub.com/edu/budgeting-tips/16897/\">page</a> for budgeting tips!</font>");

      document.getElementById("alert").style.backgroundColor = "#f44336";
    }

    $("#piechartcontainer").append(remain);
    $("#alert").append(button);
    $("#alert").append(message);

    var close = document.getElementsByClassName("closebtn");
    var i;

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
      }
    }

  }

  function checkMissingExpenseFields(){
    var name = document.getElementsByClassName("fieldname");
    var cost = document.getElementsByClassName("fieldcost");
    var i, j;

    for (i = 0; i < name.length; i++) {
      if (name[i].value == "") {
        return false;
      }
    }

    for (j = 0; j < cost.length; j++) {
      if (cost[j].value == "" || isNaN(cost[j].value)) {
        return false;
      }
    }

    return true;
  }

});
