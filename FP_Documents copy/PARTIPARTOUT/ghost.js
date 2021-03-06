// WEBGL GHOST

const audioElement = document.querySelector('audio');
const music = document.getElementById("play");
const stop = document.getElementById("stop");

let camera, scene, renderer, controls, model, light1, light2, object, sphere;

var clock = new THREE.Clock();

music.onclick = function() {

function init() {

  audioElement.play();

  scene = new THREE.Scene();
  let w = window.innerWidth;
  let h = window.innerHeight;

  camera = new THREE.PerspectiveCamera(5, w/h, 1, 1000);
  camera.position.z = 100;
  camera.position.y = -12;
  camera.position.x = -110;
  scene.add(camera);

  var sphere = new THREE.SphereBufferGeometry( 0.1, 4, 2 );

  light1 = new THREE.PointLight( 0xffffff, 2, 50 );
	light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	scene.add( light1 );

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
  render();

  //animate the ghost up and down
  if (model) {
    model.position.y += vector;
    //model.rotation.y += 0.01;

    if (model.position.y > 0.5) {
      vector = -0.005;
    }

    if (model.position.y < 0) {
      vector = 0.005;
    }

  }

  controls.update();
}

function render() {
  var time = Date.now() * 0.0005;
	var delta = clock.getDelta();

	if (object) object.rotation.y -= 0.5 * delta;

	light1.position.x = Math.sin( time * 0.7 ) * 3;
	light1.position.y = Math.cos( time * 0.5 ) * 4;
	light1.position.z = Math.cos( time * 0.3 ) * 3;

  renderer.render(scene, camera);
}

init();
animate();

};

stop.onclick = function() {
  audioElement.pause();

};
