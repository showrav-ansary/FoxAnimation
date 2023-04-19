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

        this.setInstance();
    }
    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.instance.useLegacyLights = 'physicallyCorrectLights';
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setClearColor(0x211d20);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }
    update() {
        this.instance.render(this.scene, this.camera.instance);
    }
}