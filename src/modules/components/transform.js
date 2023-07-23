import { Vector2 } from "../engine/core/math";

export class Transform {
    constructor(x = 0, y = 0, rotation = 0, scale = 1) {
        this.position = new Vector2(x, y)
        this.rotation = rotation;
        this.scale = scale;
    }
}
