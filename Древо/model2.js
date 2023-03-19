import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { default as Stats } from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js";

const clock = new THREE.Clock();
let scene = new THREE.Scene();

const stats = Stats();
document.body.appendChild(stats.dom);

let len = 3;
let vertices = [0, 0, 0, 10, 0, 0, 10, 0, 10, 0, 0, 10];
let vert_arr = [0, 0, 0, 0, len, 0, (Math.sqrt(3)*len/2), len/2, 0, (Math.sqrt(3)*len/6), len/2, len];
let indices = [0, 1, 2, 0, 1, 3, 1, 2, 3, 0, 2, 3];

let cameraTarget = new THREE.Vector3(0, 3, 0);

let geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(vertices), 3)
  //new THREE.BufferAttribute(new Float32Array(vert_arr), 3)
);
geometry.setIndex(indices);
geometry.computeVertexNormals();

let material = new THREE.MeshPhongMaterial({ color: 0xffffff });
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-5, 0, -5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("#ffffff");
spotLight.position.set(2, 5, 2);
spotLight.castShadow = true;
spotLight.intensity = 1;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 75;
spotLight.shadow.mapSize.width = 8192;
spotLight.shadow.mapSize.height = 8192;
spotLight.shadow.bias = -0.01;
spotLight.target.position.set(0, 0, 0);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);
scene.add(spotLight.target);
scene.add(spotLightHelper);
scene.add(mesh);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 1;
//scene.add(sphere);

const TetraGeometry = new THREE.ConeGeometry( 1, 2, 3 );
const TetraMaterial = new THREE.MeshPhongMaterial( {color: 0xff00ff} );
let cone = new THREE.Mesh(TetraGeometry, TetraMaterial );
cone.position.y = 3;
cone.position.z = 0;
scene.add(cone); 

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000
);
camera.position.set(0, 5, 0);
// camera.position.z = 5;
// camera.position.y = 1;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  spotLightHelper.update();

  const elapsedTime = clock.getElapsedTime();

  //cone.rotation.x += 0.01;
  //cone.rotation.y += 0.01;
  //cone.rotation.z += 0.01;
  camera.position.x = Math.cos(elapsedTime * 0.5) * 2;
  camera.position.z = Math.sin(elapsedTime * 0.5) * 2;
  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}

animate();
