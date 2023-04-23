'use strict';

import * as THREE from 'three';
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import sources from './sources.js';
import Debug from './Utils/Debug.js';


let instance = null;

export default class FoxAnimation {
    constructor(canvas) {
        if (instance)
            return instance;

        instance = this;

        // Global access
        window.FoxAnimation = this;

        // Canvas
        this.canvas = canvas;

        // Setup
        this.debug = new Debug();
        this.resources = new Resources(sources);
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        

        

        this.sizes.on('resize', () => {
            this.resize()
        });

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}