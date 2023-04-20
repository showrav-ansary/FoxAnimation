'use strict';

import * as THREE from 'three';
import FoxAnimation from '../FoxAnimation.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Fox from './Fox.js';

export default class World {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;


        this.resources.on('ready', () => {
            this.floor = new Floor();
            this.fox = new Fox();
            this.environment = new Environment();
            
        });

        // Setup
       
    }
    update(){
        if(this.fox)
            this.fox.update();
    }


}