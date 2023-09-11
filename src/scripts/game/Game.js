import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { Platforms } from "./Platforms";
import * as Matter from 'matter-js';
export class Game extends Scene {
    create() {
        this.createBackground();
        this.createHero()
        this.createPlatforms()
        this.setEvents();
        this.createUI();
    }
    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }
    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);
        const diamond = colliders.find(body => body.gameDiamond);
        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }
    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }
    createHero() {
        this.hero = new Hero()
        this.container.addChild(this.hero.sprite)
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
    }
    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container) 
    }
    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }
    update(dt){
        this.bg.update(dt)
        this.platfroms.update(dt)
    }
}
