export class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static zero() {
        return new Vector2(0, 0)
    }

    multiply(n) {
        return new Vector2(this.x * n, this.y * n)
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        const magnitude = this.magnitude()

        if (magnitude === 0) {
            return new Vector2(0, 0)
        }

        return new Vector2(this.x / magnitude, this.y / magnitude)
    }
}