'use strict';

import * as THREE from 'three';
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from './Camera.js';


let instance = null;


export default class FoxAnimation{
    constructor(canvas){
        if(instance)
            return instance;

        instance = this;

        // Global access
        window.FoxAnimation = this;

        // Canvas
        this.canvas = canvas;

        // Setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();

        this.sizes.on('resize', ()=>{
            this.resize()
        });

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }

    resize(){
        this.camera.resize();
    }

    update(){
        this.camera.update();
    }
}