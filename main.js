var song = " ";
leftWristX = 0 ;
leftWristY = 0 ;   
rightWristX = 0 ;
rightWristY = 0 ; 
scoreLeftWrist = 0 ;
function preload()
{
song = loadSound('music.mp3');
}

function setup()
{
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,ModelLoaded);
poseNet.on("pose",gotPoses);
}
function gotPoses(results)
{
if (results.length > 0)
 { 
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Score Left Wrist = " + scoreLeftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right Wrist Y = " + rightWristY + " Right Wrist X = " + rightWristX);
}
}
function draw()
{
    image(video,0,0,600,500);
    fill("#0000FF");
    stroke("#0000FF");
    if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divided_by_1000 = remove_decimals/1000;
    volume = leftWristY_divided_by_1000*2;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);}
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function ModelLoaded()
{
    console.log("Pose Net is initialized");
}
