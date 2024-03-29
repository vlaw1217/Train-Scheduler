// Initialize Firebase //

let firebaseConfig
= {
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



function removeSchedule(deleteKey) {
    
    database.ref("/trainSchedule").child(deleteKey).remove();
    location.reload(true);
    
}

$(document).ready(function () {

// Add Train Table //
    $("#add-train-btn").on("click", function (event) {

        event.preventDefault();

        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrain = $("#firstTrain").val().trim();
        let frequency = $("#frequency").val().trim();

        //console.log(frequency);
        let trainSchedule = {
            trainName,
            destination,
            firstTrain,
            frequency
        };

        database.ref("/trainSchedule").push(trainSchedule);


    });

// Schedule List //
    database.ref("/trainSchedule").on("child_added", function (snapshot) {
        let trainSchedule = snapshot.val();
        
        let trainKey = snapshot.key;
        
        let firstTimeConverted = moment(trainSchedule.firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        let tRemainder = diffTime % trainSchedule.frequency;
        console.log(tRemainder);

        let minutesAway = trainSchedule.frequency - tRemainder;
        console.log(minutesAway);

        let nextTrain = moment().add(minutesAway, "minutes").format("hh:mma");
       

        let trainScheduleHTML = `
        <tr>
        <td scope="col">${trainSchedule.trainName}</td>
        <td scope="col">${trainSchedule.destination}</td>
        <td scope="col">${trainSchedule.frequency}</td>
        <td scope="col">${nextTrain}</td>
        <td scope="col">${minutesAway}</td>
        <td><button id="delete_btn" onclick=removeSchedule('${trainKey}')>Delete</button></td>
 
        </tr>
        `;

        $("#train-table").append(trainScheduleHTML);


    });

});




