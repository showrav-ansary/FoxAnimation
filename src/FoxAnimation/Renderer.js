'use strict';

import * as THREE from 'three';
import FoxAnimation from "./FoxAnimation.js";

export default class Renderer {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.sizes = this.foxAnimation.sizes;
        this.scene = this.foxAnimation.scene;
        this.canvas = this.foxAnimation.canvas;
        this.camera = this.foxAnimation.camera;
    }
}