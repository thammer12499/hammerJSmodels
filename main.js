import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
//import * as THREE from 'three';
//import '/style.css';
//import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// Background
const spaceTexture = new THREE.TextureLoader().load('images/night_sky.jpg')
scene.background = spaceTexture;

//Geometry and material declarations//
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347 } );
const cube = new THREE.Mesh(geometry, material);

//Phong Material Object//
const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

// Object texture mapping
const smileTexture = new THREE.TextureLoader().load('images/smile.jpg')
const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 );
const smileMaterial = new THREE.MeshBasicMaterial({map: smileTexture})
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial);
scene.add(smileMesh);

// Normal Texture Map
const normalTexture = new THREE.TextureLoader().load('images/normals/textureNormal.png');
const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
const torusMaterial = new THREE.MeshStandardMaterial( {
    normalMap: normalTexture,
    roughness: 0,
    metalness: .8
} );
const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );
scene.add( torusKnot );
torusKnot.position.y = 20

//Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

camera.position.setZ(50);
camera.position.setX(-3);

scene.add(pointLight);
scene.add(ambientLight);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)
// Orbit Control
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(cube);
cube.position.z= -15;
cube.position.x= -15;
cube.rotation.x= 45;
cube.rotation.y= 45;

scene.add(icoMesh);
icoMesh.position.z= -15;
icoMesh.position.x= 15;

renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.z += -0.03
    icoMesh.rotation.y += -0.03
    // rotate smiley sphere
    smileMesh.rotation.y += 0.05
    // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
    controls.update()
    renderer.render( scene, camera );
}

animate();