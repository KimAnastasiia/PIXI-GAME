import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
        this.creatrPlatform({
            rows:4, 
            cols:6,
            x:200
        })
    }
    creatrPlatform(data){
        const platform = new Platform(data.rows, data.cols, data.x)
        this.container.addChild(platform.container)
    }
    update() {
        if ((this.current.container.x + this.current.container.width) < window.innerWidth) {
            this.createPlatform(this.randomData);
        }
    }
}