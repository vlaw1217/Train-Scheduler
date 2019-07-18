



$(document).ready(function () {
    // Initialize Firebase //
    /* vicky setting */
    let firebaseConfig = {
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

        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let fristTrain = $("#firstTrain").val().trim();
        let frequencyA = $("#frenquencyType").val().trim();

        let trainSchedule = {
            trainName,
            destination,
            fristTrain,
            frequencyA
        };

        database.ref("/trainSchedule").push(trainSchedule);

    });

    database.ref("/trainSchedule").on("child_added", function (snapshot) {
        let trainSchedule = snapshot.val();
        console.log(trainSchedule);
        let trainScheduleHTML = `
                <tr>
                    <td scope="col">${trainSchedule.trainName}</td>
                    <td scope="col">${trainSchedule.destination}</td>
                    <td scope="col">${trainSchedule.frequencyA}</td>
                    <td scope="col">Next Arrival</td>
                    <td scope="col">Minutes Away</td>
                </tr>
                `;

        $("#train-table tbody").append(trainScheduleHTML);
    });








});