Status = ""
input_text = ""
objects = []

function createCanvas() {
    canvas = createCanvas(380 , 480)
    canvas.position(480 , 250)
    video = createCapture(VIDEO)
    video.size(300 , 290)
    video.hide()
}

function start() {
    object_Detector = ml5.objectDetector('cocossd' , modelLoaded)
    document.getElementById("Status").innerHTML = "Status : object is detected"
    input_text = document.getElementById("imput").value
}

function modelLoaded() {
    console.log("Model is loaded");
    Status = true
}

function draw() {
    image(video , 0 , 0 , 300 , 290)

    if (Status != "") {
        for( i = 0 ; i < objects.length ; i++){
            document.getElementById("Status").innerHTML = "Status : objects are detected"
            console.log(objects.length);
            fill("#000000")
            precent = floor(objects[i].confidence*100)
            text(objects[i].label + "" + precent + "%" , objects[i].x + 15 , objects[i].y + 15)
            nofill()
            stroke("#000000")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)

            if (objects[i].label == input_text) {
                video.stop()
                object_Detector.detected(gotResult)
                document.getElementById("object_found").innerHTML = input_text + " found"
                var synth = window.speechSynthesis
                var utterThis = new SpeechSynthesisUtterance(input_text + "found")
                synth.speak(utterThis)
            } else {
                document.getElementById("object_found").innerHTML = input_text + " not found"
            }
        }
        
    }
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results
    }
}