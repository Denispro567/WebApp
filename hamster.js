import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js'
import Stats from './js/Stats.js'
import {GUI} from './js/dat.gui.module.js'
import {GLTFLoader} from './js/GLTFLoader.js'

class Player {
	
	constructor(scene){
    
    this.myScene = scene;

    
    //this.object = this.myScene.scene.children[1];
    console.log(this.object);
    
  }


    
	  /*
    const geometry = new THREE.BoxGeometry(1,1,1)//boxWidth, boxHeight, boxDepth);
  	const material = new THREE.MeshNormalMaterial(); 

  	this.object = new THREE.Mesh(geometry, material);
  	
   	}
    */
    

        

   	move(time) {
      console.log(this.object.position.x);

   		this.object.position.x +=time
   	}
}


class MyScene {

	constructor() {
			
		this.canvas = document.querySelector('#c')
		this.renderer = new THREE.WebGLRenderer({canvas : this.canvas, alpha : true,})
		this.scene = new THREE.Scene()
		 
		this.initCamera()
		this.addDecoration()
    this.loadModel()

	}

  loadModel() {
      const loader = new GLTFLoader();
      const url = 'Objects/scene.gltf';
      loader.load(url, function(gltf) {
          this.addObject(gltf.scene);
             
    
        })
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
		this.camera.position.z = -4 ;
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

 	addObject(object) {
 		this.scene.add(object)
 	}

 	addDecoration() {
 		const ground = new THREE.Mesh(
 							new THREE.PlaneBufferGeometry( 100, 4, 1, 1 ),
 							new THREE.MeshBasicMaterial()
 							);

 		this.addObject(ground);
 		ground.position.y = -0.5
 		// ground.receiveShadow = true; // to do
 		ground.rotation.x = - Math.PI / 2
 		
 	}

}

class EventHandler {

	constructor() {
		//this.scene = scene;
		//this.player = player
	}

	waitForEvents() {

		return new Promise(resolve => {
 			setTimeout(function() {
 				//console.log("waiting...")
 			
 			}, 50);
 		})
	}

	performMove(dt) {
 		return new Promise(resolve => {
 			setTimeout(function() {
 				//scene.canvas.addEventListener("keydown", event =>{
 					//if(event.keyCode === 32 ) player.move(dt);
 					//console.log(dt)
 				
 			}, 50);
 		})
 	}
}

/*
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

*/

function main() {
 	const myScene = new MyScene()
 	const player = new Player(myScene)
 	const eventHandler = new EventHandler(myScene,player)

 	//myScene.addObject(player.object)

 	
 	

 	let dt = 0.01

 	function render(time) {


 	  eventHandler.waitForEvents().then(
      myScene.canvas.addEventListener("keydown", event =>{
          if(event.keyCode === 32 ) player.move(dt);
        }
      )
    )

 	  myScene.update()
 	  
 	  

 	  requestAnimationFrame(render)
 	}
 	
  requestAnimationFrame(render)
}

main()


