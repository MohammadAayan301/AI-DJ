song = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
    song = loadSound("dk_song.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function modelloaded() {
    console.log("POSENET IS INITIALIZED!")
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist = " + scoreleftwrist + " scorerightwrist = " + scorerightwrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx + " leftwristy = " + leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightwristx + " rightwristy = " + rightwristy);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("orange");

    if (scorerightwrist > 0.01) {
        circle(rightwristx, rightwristy, 20);

        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }

        else if (rightWristy > 100 && rightWristy <= 200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }

        else if (rightWristy > 200 && rightWristy <= 300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }

        else if (rightWristy > 300 && rightWristy <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }

        else if (rightWristy > 400 && rightWristy <= 500){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreleftwrist > 0.01) {
        circle(leftwristx, leftwristy, 20);
        numberleftwristy = Number(leftwristy);
        remove_decimals = floor(numberleftwristy);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}