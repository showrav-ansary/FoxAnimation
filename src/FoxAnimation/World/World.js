'use strict';

import * as THREE from 'three';
import FoxAnimation from '../FoxAnimation.js';
import Environment from './Environment.js';

export default class World {
    constructor() {
        this.foxAnimation = new FoxAnimation();
        this.scene = this.foxAnimation.scene;
        this.resources = this.foxAnimation.resources;

        // Test mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                wireframe: false
            })
        );

        this.scene.add(testMesh);

        this.resources.on('ready', () => {
            console.log('resources are ready');
        });

        // Setup
        this.environment = new Environment();
    }


}