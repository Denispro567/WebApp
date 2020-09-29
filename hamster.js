import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js'
import Stats from './js/Stats.js'
import {GUI} from './js/dat.gui.module.js'
import {GLTFLoader} from './js/GLTFLoader.js'

class Player {
	
	constructor(){
    

    
  }

  	setPlayer(object) {
  		this.object = object
  	}


           

   	move(time) {
      //console.log(this.object.position.x);

   		this.object.position.x +=time
   	}
}


class MyScene {

	constructor() {
			
		this.canvas = document.querySelector('#c')
		this.renderer = new THREE.WebGLRenderer({canvas : this.canvas, alpha : true,})
		this.renderer.shadowMap.enabled = true;
		
		this.scene = new THREE.Scene()
		 
		this.initCamera()
		this.setControls()
		this.addDecoration()
   

	}

  

	addLight(Light = new THREE.HemisphereLight(0xffffbb,3)) {

    	this.scene.add(Light)
	}
	setControls() {
		this.controls = new OrbitControls(this.camera,this.renderer.domElement);
		this.controls.update()
	}

	initCamera() {
		const fov = 30;
 		const aspect = this.canvas.clientWidth/this.canvas.clientHeight;  // the canvas default
  		const near = 1;
 		const far = 5000;


		this.camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

		this.camera.position.set( 10, 10, 50 );
		
		
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
 	update(delta) {
 		this.controls.update()
 		this.resizeRendererToDisplaySize()

 		
 		this.renderer.render(this.scene, this.camera);
 	}

 	addObject(object) {
 		this.scene.add(object)
 	}

 	addDecoration() {
 		const length = 100;
 		const ground = new THREE.Mesh(
 							new THREE.PlaneBufferGeometry( length, length/20, 1, 1 ),
 							new THREE.MeshBasicMaterial()
 							);

 		
 		ground.position.set(length/2.5,0,0) 
 		ground.receiveShadow = true; // to do
 		ground.rotation.x = - Math.PI / 2
 		this.addObject(ground);
 		
 	}

}

class EventHandler {

	constructor() {
		
	}

	waitForEvents() {

		return new Promise(resolve => {
 			setTimeout(function() {
 				//console.log("waiting...")
 			
 			}, 50);
 		})
	}

	
 		
 	
}





function main() {
 	const myScene = new MyScene()
 	const player = new Player()
 	const eventHandler = new EventHandler(myScene,player)

 	var mixers = [];

 	const loader = new GLTFLoader();
    const url = 'Model/Flamingo.glb';
    loader.load(url, function(gltf) {
    		console.log(gltf);
      		var mesh = gltf.scene.children[ 0 ];
          
          	var s = 0.02;
			mesh.scale.set( s, s, s );
			mesh.position.y = 5;
			mesh.rotation.y =  Math.PI / 2;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			myScene.addObject(mesh);
			player.setPlayer(mesh);
            
            var mixer = new THREE.AnimationMixer( mesh );
			mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
			mixers.push( mixer )
		   })
	
 	//myScene.addObject(player.object)

 	


 	
    let clock = new THREE.Clock();
    

 	function render(time) {

 		var delta = clock.getDelta();
 		let distance = delta*0.05;

 	   eventHandler.waitForEvents().then(
       myScene.canvas.addEventListener("keydown", event =>{
           if(event.keyCode === 32 ) player.move(distance);
        }
      )
    )
 	  
 	  
 	  
 	 

 	  for ( var i = 0; i < mixers.length; i ++ ) {

			mixers[i].update(delta);

		}
	

 	  myScene.update()
 	  
 	  

 	  requestAnimationFrame(render)
 	}
 	
  requestAnimationFrame(render)
}

main()


