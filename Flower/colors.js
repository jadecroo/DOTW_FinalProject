
// AUDIO
const music = document.getElementById("play");
const stop = document.getElementById("stop");
const audioElement = document.querySelector('audio');

var threshold = 480 ;  //Point where turn the "flower" pink
var frequencies = 120 ; //Number of records to count (You want to look for lower frequencies)

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
        requestAnimationFrame(renderFrame); // Takes callback function to invoke before rendering


        analyser.getByteFrequencyData(dataArray); // Copies the frequency data into dataArray
        // Results in a normalized array of values between 0 and 255
        // Before this step, dataArray's values are all zeros (but with length of 8192)

        let sum = 0;

        for(let i = 0; i < bufferLength; i++) {
            if(i < frequencies) sum += dataArray[i];

            //Do some other stuff
        }

        //Change CSS according to threshold
        let avg = (sum / frequencies) * 4;
        flower.style.transform = `scale(${avg / 255})`;
        center.style.backgroundColor = avg > threshold ? "yellow" : "violet";
        petal1.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        petal2.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        petal3.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        petal4.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        petal5.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        petal6.style.backgroundColor = avg > threshold ? "pink" : "yellow";
        //flower.innerText = ~~avg;

    };

    //!!This functions have to be called outside of the rendering function (renderFrame)!!
    audio.play();
    renderFrame();
};

stop.onclick = function() {
  audioElement.pause();
}

/* Sliders
const sliderF = document.querySelector(".slider.f");
const sliderFvalue = document.querySelector(".slider-value.f");
const sliderT = document.querySelector(".slider.t");
const sliderTvalue = document.querySelector(".slider-value.t");

sliderF.oninput = function() {
  sliderFvalue.innerText = this.value;
  frequencies = +this.value;
}

sliderT.oninput = function() {
  sliderTvalue.innerText = this.value;
  threshold = +this.value;
}*/
