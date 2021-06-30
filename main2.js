var SpeechRecognition = window.webkitSpeechRecognition;
var deviceType = ""; 
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        deviceType = "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
        deviceType = "mobile";
    }
    console.log('desktop')
    deviceType = "desktop";
  };
  getDeviceType();
var recognition = new SpeechRecognition();
function preload(){

}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.position(540, 320);
    if(deviceType == 'desktop'){
        video = createCapture({
            audio: false,
            video: {
              facingMode: "user"
            }
          });
    } 
    if(deviceType == 'mobile'){
        video = createCapture({
            audio: false,
            video: {
              facingMode: {
                exact: "environment"
              }
            }
          });
    }
    video.hide();
    video.size(400, 400);
    // The Model Link: https://teachablemachine.withgoogle.com/models/vC8rQztn0/
    // The Model Json Link: https://storage.googleapis.com/tm-model/vC8rQztn0/model.json
    classifire = ml5.imageClassifier('MobileNet', modelLoaded);

}
recognition.start();

function draw(){
    image(video, 0, 0, 400, 400)
    classifire.classify(video, gotResult);
    
    recognition.onresult = function(event) {

        console.log(event); 
       
       var Content = event.results[0][0].transcript;
           console.log(Content);
             if(Content =="snapshot")
             {
               console.log("Takeing Snapshot");
               save('Your Identified Image.png');
             }
       }
}
function modelLoaded(){
    console.log('Successfully loaded the model')
}
function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        object_name = document.getElementById('object_name');
        accuracy_number = document.getElementById('accuracy_number');
        mainResultOfName = results[0].label;
        mainResultOfAccuracy = results[0].confidence;
        object_name.innerHTML = mainResultOfName;
        accuracy_number.innerHTML = mainResultOfAccuracy.toFixed(2);
    }
}
