import { Rendering } from '..'

describe('Rendering', () => {
    // Mock canvas element and 2D context
    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    beforeEach(() => {
        canvas = document.createElement('canvas')
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    })

    // Test the setCanvas method
    it('should set the canvas and 2D context correctly', () => {
        Rendering.setCanvas(canvas)

        expect(Rendering.canvas).toBe(canvas)
        expect(Rendering.ctx).toBe(ctx)
    })

    // Test if clearCanvas method works with an invalid canvas context
    it('should throw an error if the canvas context is undefined', () => {
        const invalidCanvas: HTMLCanvasElement = document.createElement('canvas')
        invalidCanvas.getContext = () => null

        // Pass an invalid canvas without a 2D context
        expect(() => {
            Rendering.setCanvas(invalidCanvas)
        }).toThrowError("Could not get the 2D game canvas context.")
    })

    // Test the clearCanvas method
    it('should clear the canvas with the correct background color', () => {
        // Set up a spy to spy on the fillRect method of the context
        const fillRectSpy = jest.spyOn(ctx, 'fillRect')

        // Set the canvas and clear it
        Rendering.setCanvas(canvas)
        Rendering.clearCanvas()

        // Assert that fillRect was called with the correct arguments
        expect(fillRectSpy).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height)
        expect(ctx.fillStyle).toBe('#202027')
    })
})