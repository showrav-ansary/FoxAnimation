'use strict';

import * as THREE from 'three';
import FoxAnimation from '../FoxAnimation.js';
import Environment from './Environment.js';
import Floor from './Floor.js';

export default class World {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;


        this.resources.on('ready', () => {
            this.floor = new Floor();
            this.environment = new Environment();
            
        });

        // Setup
       
    }


}