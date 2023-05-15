'use strict';

import FoxAnimation from "../FoxAnimation.js";
import * as THREE from 'three';


export default class Environment {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;
        this.debug = this.foxAnimation.debug;

        if (this.debug.active) {
            this.debugFolder = this.debug.UI.addFolder('Environment');
        }


        this.setSunLight();
        this.setEnvironmentMap();
    }
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(3.5, 2, -1.25);
        this.scene.add(this.sunLight);

        if (this.debug.active) {
            this.debugFolder.sunLight = this.debugFolder.addFolder('Sun Light');
            this.debugFolder.sunLight
                .add(this.sunLight, 'intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .name('Sunlight Intensity')

            this.debugFolder.sunLight
                .addColor(this.sunLight, 'color')
                .name('Sunlight Color')

            this.debugFolder.sunLight.position = this.debugFolder.sunLight.addFolder('Positions');
            this.debugFolder.sunLight.position
                .add(this.sunLight.position,'x')
                .min(-5)
                .max(5)
                .step(0.001)
                .name('X')
            
            this.debugFolder.sunLight.position
                .add(this.sunLight.position,'y')
                .min(-5)
                .max(5)
                .step(0.001)
                .name('Y')
            
            this.debugFolder.sunLight.position
                .add(this.sunLight.position,'z')
                .min(-5)
                .max(5)
                .step(0.001)
                .name('Z')
            
        }
    }
    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.texture.encoding = THREE.sRGBEncoding;

        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {

                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        }
        this.environmentMap.updateMaterial();

        if (this.debug.active) {
            this.debugFolder.textureSettings = this.debugFolder.addFolder('Textures');

            this.debugFolder.textureSettings
                .add(this.environmentMap, 'intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .name('Environment Map Intensity')
                .onChange(this.environmentMap.updateMaterial)
        }
    }
}