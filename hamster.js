import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js'
import Stats from './js/Stats.js'
import {GUI} from './js/dat.gui.module.js'

class Player {
	
	constructor(scene){

	const geometry = new THREE.BoxGeometry(1,1,1)//boxWidth, boxHeight, boxDepth);
  	const material = new THREE.MeshNormalMaterial(); 

  	this.obj = new THREE.Mesh(geometry, material);
  	
  	this.addOnScene(scene)

  	}

	addOnScene(scene) {
		scene.add(this.obj)
	}





}

function addLightsOn(scene) 
{
	
    const color = 0xffffbb;
    const size = 3;
    const light = new THREE.HemisphereLight( color, size );
    scene.add(light);

    let helper = new THREE.HemisphereLightHelper( light, 5 );
	scene.add( helper )
  
}



function getControls(camera,renderer) {
	return new OrbitControls(camera,renderer.domElement);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth

    const height = canvas.clientHeight

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
 }



function main(){

	const canvas = document.querySelector('#c')
	const renderer = new THREE.WebGLRenderer({canvas, alpha : true,})
	

	const scene = new THREE.Scene()
	addLightsOn(scene)

	const fov = 75;
 	const aspect = canvas.clientWidth/canvas.clientHeight;  // the canvas default
  	const near = 0.1;
 	const far = 1000;


	const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
	camera.position.z = 2;
	

	const controls = getControls(camera,renderer)
	controls.update()

	let player = new Player(scene)

  	

function render(time) {
    time *= 0.001;

    controls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth/canvas.clientHeight
      camera.updateProjectionMatrix()
    }


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  	//renderer.render(scene, camera);
  	requestAnimationFrame(render);
}

main()
