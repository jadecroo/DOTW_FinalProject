const canvas = document.getElementById('bg2');
const context = canvas.getContext('2d');

let width;
let height;

let pxScale = window.devicePixelRatio;

function init() {

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
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
}

window.addEventListener('load', init);

window.addEventListener('resize', init);
