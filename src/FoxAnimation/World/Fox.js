'use strict';

import * as THREE from 'three';
import FoxAnimation from '../FoxAnimation.js';


export default class Fox{
    constructor(){
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;
        this.time = this.foxAnimation.time;

        this.resource = this.resources.items.foxModel;
        
        this.setModel();
        this.setAnimation();
    }
    setModel(){
        this.model = this.resource.scene;
        this.model.scale.set(0.02,0.02,0.02);

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
            }
        });
        this.scene.add(this.model);
    }
    setAnimation(){
        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.model);
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.action.play();
    }
    update(){
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}