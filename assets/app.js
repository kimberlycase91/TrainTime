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

// Create button for adding train + update the database
$("#add-train-btn").on("click", function(event){
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

alert("Train successfully added")

//clears all of the text-boxes
$("#train-name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");
});

// Create a way to retrieve trains from the train database.
database.ref().on("child_added", function(childSnapshot){
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
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
})

// Create a way to calculate the months worked. Using difference between start and current time.

//    Then use moment.js formatting to set difference in months.

// Calculate Total billed