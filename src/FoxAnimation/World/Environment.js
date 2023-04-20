'use strict';

import FoxAnimation from "../FoxAnimation.js";
import * as THREE from 'three';


export default class Environment {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;
        this.setSunLight();
        this.setEnvironmentMap();
    }
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(3.5, 2, -1.25);
        this.scene.add(this.sunLight);
    }
    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.encoding = THREE.sRGBEncoding;

        this.scene.environment = this.environmentMap.texture;

        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){

                child.material.envMap = this.environmentMap.texture;
                child.material.envMapIntensity = this.environmentMap.intensity;
                child.material.needsUpdate = true;
                }
            });
        }
        this.setEnvironmentMap.updateMaterial();
    }
}