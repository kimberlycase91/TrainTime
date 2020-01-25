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
  firebase.analytics();
// Create button for adding new employees - then update the html + update the database

// Create a way to retrieve employees from the employee database.
// Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// Calculate Total billed