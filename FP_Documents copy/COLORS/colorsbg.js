//RANDOM PIX BACKGROUND

const canvas = document.getElementById('bg');
const context = canvas.getContext('2d');

let width;
let height;

let pxScale = window.devicePixelRatio;

      function setup() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        canvas.width = width * pxScale;
        canvas.height = height * pxScale;

        context.scale(pxScale, pxScale);

        draw();
      }

      function draw() {
        let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixelData = pixels.data;

        for (let i = 0; i < pixelData.length; i += 4) {
          pixelData[i] = Math.floor(Math.random() * 255);
          pixelData[i + 1] = Math.floor(Math.random() * 255);
          pixelData[i + 2] = Math.floor(Math.random() * 255);
          pixelData[i + 3] = 255;
        }

        context.putImageData(pixels, 0, 0);
      }

      window.addEventListener('load', setup);

      window.addEventListener('resize', setup);
