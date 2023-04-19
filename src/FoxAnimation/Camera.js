'use strict'

import FoxAnimation from './FoxAnimation.js';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export default class Camera {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.sizes = this.foxAnimation.sizes;
        this.scene = this.foxAnimation.scene;
        this.canvas = this.foxAnimation.canvas;

        this.setInstance();
        this.setOrbitControls();
    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.position.set(6, 4, 8);
        this.scene.add(this.instance);
    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
    update() {
        this.controls.update();
    }
}