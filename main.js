import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js'
import Stats from './js/Stats.js'
import gui from './js/dat.gui.module.js'
import {GLTFLoader} from './js/GLTFLoader.js'

var scene = new THREE.Scene();





var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / 
	window.innerHeight, 0.1, 1000 )

var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

document.body.appendChild(renderer.domElement )

let root
let loader = new GLTFLoader()
loader.load('Model/BoomBox/glTF/BoomBox.gltf', (obj) => {
	
	root = obj.scene
	root.scale.set(200,200,200)
	scene.add(root);
})


let controls = new OrbitControls(camera,renderer.domElement);

controls.update()

let stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

let light = new THREE.DirectionalLight( 0xffffff, 1 )
light.position.set(-20,20,20)
light.castShadow = true

scene.add(light)



let ground = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 30, 8, 1, 1 ),
					new THREE.MeshStandardMaterial( { color: 0xffffff, side : THREE.DoubleSide })
					);


ground.position.y = -2
ground.receiveShadow = true;
ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
scene.add( ground );

camera.position.set(0,5,5)

let helper, axesHelper;

function setHelpers () {
	helper = new THREE.CameraHelper( light.shadow.camera );
	scene.add( helper );

	axesHelper = new THREE.AxesHelper( 5 );
	scene.add( axesHelper );
}

setHelpers()



function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth
    //canvas.clientWidth;
    const height = window.innerHeight
    //canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

function animate() {

	stats.begin()

	controls.update();
	if(resizeRendererToDisplaySize(renderer))
	{
		const canvas = renderer.domElement;
      	camera.aspect = canvas.clientWidth / canvas.clientHeight;
      	camera.updateProjectionMatrix();
	}
	root.position.x += 0.001
	renderer.render(scene,camera)
	requestAnimationFrame(animate)
	
	stats.end()



}





animate()
