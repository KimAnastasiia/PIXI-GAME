import { App } from '../system/App';

export class Diamond {
    constructor(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }
}