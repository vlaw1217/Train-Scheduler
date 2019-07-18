$(document).ready(function () {
    
    
    // Initialize Firebase //
    var firebaseConfig = {
        apiKey: "AIzaSyC0duOMYn3EHuQNBy204CxfF7eWE3mVZfA",
        authDomain: "train-scheduler-1679a.firebaseapp.com",
        databaseURL: "https://train-scheduler-1679a.firebaseio.com",
        projectId: "train-scheduler-1679a",
        storageBucket: "",
        messagingSenderId: "618216615643",
        appId: "1:618216615643:web:7423fda1b358945a"
    };
    
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        let trainName = $("#trainName").val().trim()
        let destination = $("$destination").val().trim()
        let fristTrain = $("$firstTrain").val().trim()
        let frequency = $("$frequency").val().trim()
    
        let trainSchedule = {
            trainName,
            destination,
            fristTrain,
            frequency
        };

        database.ref("/trainSchedule").push(trainSchedule);

    });

    







   
    
});