import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { default as Stats } from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js";

function ctg(x){
    return Math.cos(x)/Math.sin(x);
}

const clock = new THREE.Clock();
let scene = new THREE.Scene();

const stats = Stats();
document.body.appendChild(stats.dom);

const div = document.querySelector('.threejs');

let mesh;

const form1 = document.getElementById("colours");
const form2 = document.getElementById("lights")

form1.addEventListener('change', (e) => {
    cone.material.color.set(e.target.value);
})

form2.addEventListener('change', (f) => {
    // alert(f.target.value);
    if (f.target.value == 'amb') {
        ambientLight.intensity *= -1;
    }
    if (f.target.value == 'main') {
        mainLight.intensity *= -1;
    }
    if (f.target.value == 'sophit') {
        sophLight.intensity *= -1;
    }
    if (f.target.value == 'direct') {
        directionalLight.intensity *= -1;
    }
    if (f.target.value == 'hemi') {
        hemiLight.intensity *= -1;
    }
    if (f.target.value == 'fog') {
        if (f.target.checked){
            scene.fog.density = 1;
            scene.fog.near = 1;
            scene.fog.far = 10;
        }
        else {
            scene.fog.density = 0.1;
            scene.fog.near = 5;
            scene.fog.far = 30;
        }
    }
})

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = div.clientWidth / div.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(div.clientWidth, div.clientHeight);
}

const camera = new THREE.PerspectiveCamera(70, div.clientWidth / div.clientHeight, 0.1, 200);
camera.position.set(-5, 2, -10);
let cameraTarget = new THREE.Vector3(0, 0.4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(div.clientWidth, div.clientHeight);

div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color('gray');
scene.fog = new THREE.Fog('gray', 1, 10);

const hemiLight = new THREE.HemisphereLight(0x000000, 0x0000ff);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xE2D86F, 0.3);
mainLight.position.set(0, 10, -5);
mainLight.target.position.set(0, 1, 0);
scene.add(mainLight);
scene.add(mainLight.target);

const sophLight = new THREE.SpotLight(0xFFFFFF);
sophLight.position.set(4, 2, 4);
sophLight.target.position.set(0, 0.4, 0);
sophLight.castShadow = true;
sophLight.intensity = 0.8;
sophLight.shadow.camera.near = 0.1;
sophLight.shadow.camera.far = 1;
sophLight.shadow.mapSize.width = 1024;
sophLight.shadow.mapSize.height = 1024;
sophLight.shadow.bias = -0.01;
scene.add(sophLight);
scene.add(sophLight.target);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-5, 2, -5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // default
directionalLight.shadow.mapSize.height = 1024; // default
directionalLight.shadow.camera.top = 1;
directionalLight.shadow.camera.bottom = -1;
directionalLight.shadow.camera.left = -1;
directionalLight.shadow.camera.right = 1;
scene.add(directionalLight);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    // new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF, dithering: false })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const square_fon = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({color: 0xFFFFFF, dithering: false})
);

square_fon.position.z = 7;
square_fon.material.side = THREE.DoubleSide; 

scene.add(square_fon);

// const loader = new STLLoader();
//     loader.load('/models/qtip.STL', function (geometry) {

//     const material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x111111, shininess: 200 });
//     mesh = new THREE.Mesh(geometry, material);

//     let box = new THREE.Box3();
//     let size = new THREE.Vector3();

//     box.setFromObject(mesh).getSize(size);
//     mesh.scale.set(1 / size.y, 1 / size.y, 1 / size.y);

//     let center = new THREE.Vector3()
//     box.setFromObject(mesh).getCenter(center);
//     mesh.position.set(-center.x, 0, -center.z);
//     mesh.castShadow = true;
//     scene.add(mesh);
// });


let len = 1;
let vertices = [0, 0, 0, 10, 0, 0, 10, 0, 10, 0, 0, 10];
let vert_arr = [0, 0, 0, 0, 0, len, (Math.sqrt(3)*len/2), 0, len/2, (Math.sqrt(3)*len/6), len, len/2];
// let indices = [2, 1, 0, 0, 3, 2];
let indices = [0, 1, 2, 0, 1, 3, 1, 2, 3, 0, 2, 3];
let custom_geom = new THREE.BufferGeometry();
custom_geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vert_arr), 3));

custom_geom.setIndex(indices);
custom_geom.computeVertexNormals();

let material2 = new THREE.MeshPhongMaterial({ color: 'aqua', side: THREE.DoubleSide });
let mesh2 = new THREE.Mesh(custom_geom, material2);
mesh2.position.set(0, 0, 0);
mesh2.castShadow = true;
mesh2.receiveShadow = true;
scene.add(mesh2);

const TetraGeometry = new THREE.ConeGeometry( 1, 1, 3 );
const TetraMaterial = new THREE.MeshPhongMaterial( {color: 0xFA36A0} );
let cone = new THREE.Mesh(TetraGeometry, TetraMaterial );
cone.position.set(1, 0, 1.5);
cone.receiveShadow = true;
cone.castShadow = true;
scene.add(cone);

function animate() {
    stats.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    const elapsedTime = clock.getElapsedTime()

    // camera.position.y = ctg(elapsedTime * 0.5);
    camera.position.z = Math.sin(elapsedTime * 0.5) * 4;
    camera.position.x = Math.cos(elapsedTime * 0.5) * 4;
    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);
}

animate();