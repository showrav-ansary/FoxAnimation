'use strict';

import * as THREE from 'three';
import FoxAnimation from '../FoxAnimation.js';


export default class Fox{
    constructor(){
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;
        this.time = this.foxAnimation.time;
        this.debug = this.foxAnimation.debug;

        if(this.debug.active){
            const debugObjects = {
                idle: () => { this.animation.play['idle']},
                walking: () => { this.animation.play['walking']},
                running: () => { this.animation.play['running']}
            }
            this.debug.UI.addFolder('Fox');

        }

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

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]);
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]);
        
        this.animation.actions.currentAction = this.animation.actions.idle

        this.animation.actions.currentAction.play();

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction = this.animation.actions.currentAction;

            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(oldAction, 1);

            this.animation.actions.currentAction = newAction;
        }
    }
    update(){
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}