// PART 1: CANVAS

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let width;
let height;

let pxScale = window.devicePixelRatio;

function setup() {
  // full browser canvas
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  canvas.width = width * pxScale;
  canvas.height = height * pxScale;

  context.scale(pxScale, pxScale);
}

function draw() {
  if (width !== window.innerWidth || height !== window.innerHeight) {
    setup();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  let pixelData = pixels.data;

  // animated blue pixel backround
  for (let i = 0; i < pixelData.length; i += 4) { // cycle through pixels
    pixelData[i] = 0;
    pixelData[i + 1] = 0;
    pixelData[i + 2] = Math.floor(Math.random() * 255);
    pixelData[i + 3] = 255;
  }

  context.putImageData(pixels, 0, 0);

  requestAnimationFrame(draw);
}

window.addEventListener('load', () => {
  setup();
  draw();
});

// PART 2: WEBGL

let camera, scene, renderer, controls, model;

function init() {


  scene = new THREE.Scene();
  let w = window.innerWidth;
  let h = window.innerHeight;

  camera = new THREE.PerspectiveCamera(20, w/h, 1, 1000);
  camera.position.z = 55;
  camera.position.y = -12;
  camera.position.x = -110;
  scene.add(camera);

  //get ghost white using light
  let light = new THREE.DirectionalLight(0xffffff, 10);
  light.position.set(1, 1, 1);
  scene.add(light);

  let secondlight = new THREE.DirectionalLight(0xffffff, 10);
  secondlight.position.set(-5, 0, -3);
  scene.add(secondlight);

  let thirdlight = new THREE.DirectionalLight(0xffffff, 10);
  thirdlight.position.set(0, 0, -1);
  scene.add(thirdlight);

  //GL Transmission Format loader
  let loader = new THREE.GLTFLoader();

  //glTF resource
  loader.load(
    'scene5.gltf',
    function ( gltf ) {
      model = gltf.scene
      scene.add( model );

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
    }
  );

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(w, h);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

  let vector = 0.1;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  //animate the ghost up and down
  if (model) {
    model.position.y += vector;
    //model.rotation.y += 0.01;

    if (model.position.y > 1) {
      vector = -0.03;
    }

    if (model.position.y < 0) {
      vector = 0.03;
    }
  }

  controls.update();
}

init();
animate();
