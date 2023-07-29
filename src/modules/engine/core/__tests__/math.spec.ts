import { Vector2 } from '../math'

describe('Vector2', () => {
    // Test the constructor
    it('should create a Vector2 object with the given x and y values', () => {
        const vector = new Vector2(2, 3)
        expect(vector.x).toBe(2)
        expect(vector.y).toBe(3)
    })

    // Test the static zero method
    it('should create a Vector2 object with x and y values as 0', () => {
        const zeroVector = Vector2.zero()
        expect(zeroVector.x).toBe(0)
        expect(zeroVector.y).toBe(0)
    })

    // Test the multiply method
    it('should return a new Vector2 object with multiplied x and y values', () => {
        const vector = new Vector2(2, 3)
        const multipliedVector = vector.multiply(2)
        expect(multipliedVector.x).toBe(4)
        expect(multipliedVector.y).toBe(6)
    })

    // Test the magnitude method
    it('should return the correct magnitude of the vector', () => {
        const vector = new Vector2(3, 4)
        const magnitude = vector.magnitude()
        expect(magnitude).toBe(5) // Magnitude of (3, 4) is 5 (Pythagorean theorem)
    })

    // Test the normalize method
    it('should return a new Vector2 object with the same direction and magnitude of 1', () => {
        const vector = new Vector2(3, 4)
        const normalizedVector = vector.normalize()
        expect(normalizedVector.magnitude()).toBeCloseTo(1, 5) // Close to 1 with a precision of 5 decimal places
    })

    // Test normalize method when vector has a magnitude of 0
    it('should return a zero vector if the vector has a magnitude of 0', () => {
        const zeroVector = new Vector2(0, 0)
        const normalizedVector = zeroVector.normalize()
        expect(normalizedVector.x).toBe(0)
        expect(normalizedVector.y).toBe(0)
    })
})