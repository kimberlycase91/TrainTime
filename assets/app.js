//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA1tT53mI_6cj_RxF6_lz9W02JkVe8JI4A",
    authDomain: "train-time-85f86.firebaseapp.com",
    databaseURL: "https://train-time-85f86.firebaseio.com",
    projectId: "train-time-85f86",
    storageBucket: "train-time-85f86.appspot.com",
    messagingSenderId: "278442275445",
    appId: "1:278442275445:web:c17f9c4940f68f0e143e3c",
    measurementId: "G-H6RXYBM17J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

var database = firebase.database();

//display current time on the page
function update() {
    $("#clock").html(moment().format('D. MMMM YYYY H:mm:ss'));
}
setInterval(update, 1000);

// Create button for adding train + update the database
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var firstTime = $("#first-train").val().trim();
    var tFrequency = $("#frequency").val().trim();
    console.log(trainName, trainDestination, firstTime, tFrequency);

    //local temporary object to hold train input
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTime,
        frequency: tFrequency
    };

    //push new train input to database
    database.ref().push(newTrain);

    //log everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency)

    //clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// retrieve trains from the train database.
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //Store everyting into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().first;
    var tFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTime);
    console.log(tFrequency)

    //calculate the next train time 
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextTrainPretty = moment(nextTrain).format("hh:mm")

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrainPretty).addClass("nextTrainTime"),
        $("<td>").text(tMinutesTillTrain).addClass("minutesTillTrain")
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
})

database.ref().on("value", function(snapshot) {

    // Then we console.log the value of snapshot
    console.log(snapshot.val());

    // Update the clickCounter variable with data from the database.
    var firstTime = snapshot.val().first;
    var tFrequency = snapshot.val().frequency;

    // Then we change the html associated with the number.
    $(".nextTrainTime").text(snapshot.val().firstTime);

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
  }, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  });