'use strict';

import * as lilgui from 'lil-gui';

export default class Debug{
    constructor(){
        this.active = window.location.hash === '#debug';
        if(this.active){
            this.UI = new lilgui.GUI();
        }
    }
}