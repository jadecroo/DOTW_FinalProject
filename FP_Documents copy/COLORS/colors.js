// AUDIO VISUALIZER
const music = document.getElementById("play");
const stop = document.getElementById("stop");
const audioElement = document.querySelector('audio');

var threshold = 480 ;  //Point where the flower will change color
var frequencies = 200 ; //Number of records to count

music.onclick = function() {

    audioElement.play();

    const flower = document.getElementById("centerflower");
    const center = document.getElementById("flowercenter");
    const petal1 = document.getElementById("petal1");
    const petal2 = document.getElementById("petal2");
    const petal3 = document.getElementById("petal3");
    const petal4 = document.getElementById("petal4");
    const petal5 = document.getElementById("petal5");
    const petal6 = document.getElementById("petal6");

    const context = new AudioContext();
    audio.crossOrigin = "anonymous";
    let src = context.createMediaElementSource(audioElement);
    const analyser = context.createAnalyser();
    var biquadFilter = context.createBiquadFilter();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 1024;

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);

        let sum = 0;

        for(let i = 0; i < bufferLength; i++) {
            if(i < frequencies) sum += dataArray[i];
        }

        //Change CSS according to threshold
        let avg = (sum / frequencies) * 4;
        flower.style.transform = `scale(${avg / 255})`;
        center.style.backgroundColor = avg > threshold ? "violet" : "blue";
        petal1.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";
        petal2.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";
        petal3.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";
        petal4.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";
        petal5.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";
        petal6.style.backgroundColor = avg > threshold ? "#FF1591 " : "violet";

    };
    
    audio.play();
    renderFrame();
};

stop.onclick = function() {
  audioElement.pause();
}
