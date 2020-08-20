import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js'
import Stats from './js/Stats.js'
import {GUI} from './js/dat.gui.module.js'

class Player {
	
	constructor(scene){

	const geometry = new THREE.BoxGeometry(1,1,1)//boxWidth, boxHeight, boxDepth);
  	const material = new THREE.MeshNormalMaterial(); 

  	this.object = new THREE.Mesh(geometry, material);
  	
  	
  	}
}


class MyScene {

	constructor() {
			
		this.canvas = document.querySelector('#c')
		this.renderer = new THREE.WebGLRenderer({canvas : this.canvas, alpha : true,})
		this.scene = new THREE.Scene()
		 
		this.initCamera()

	}

	addLight(Light = new THREE.HemisphereLight(0xffffbb,3)) {

    	this.scene.add(Light)
	}
	setControls() {
		this.controls = new OrbitControls(this.camera,this.renderer.domElement);
		this.controls.update()
	}

	initCamera() {
		const fov = 75;
 		const aspect = this.canvas.clientWidth/this.canvas.clientHeight;  // the canvas default
  		const near = 0.1;
 		const far = 1000;


		this.camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
		this.camera.position.z = 2;
		this.setControls()
	}

	resizeRendererToDisplaySize() {
    	const canvas = this.renderer.domElement;
    	const width = canvas.clientWidth

    	const height = canvas.clientHeight

   		const needResize = canvas.width !== width || canvas.height !== height;
    	if (needResize) {
      		this.renderer.setSize(width, height, false);
      		this.camera.aspect = canvas.clientWidth/canvas.clientHeight
      		this.camera.updateProjectionMatrix()
    	}
    	return needResize;
 	}
 	update() {
 		this.controls.update()
 		this.resizeRendererToDisplaySize()
 		this.renderer.render(this.scene, this.camera);
 	}

 	addObject(player) {
 		this.scene.add(player.object)
 	}

}



 function main() {
 	const myScene = new MyScene()
 	const player = new Player()

 	myScene.addObject(player)

 	function render(time) {
 		time *=0.001
 		myScene.update()
 		requestAnimationFrame(render)
 	}
 	requestAnimationFrame(render)
 }

main()


