export class Rendering {
    static canvas: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D

    static setCanvas(canvasElement: HTMLCanvasElement) {

        Rendering.canvas = canvasElement

        const ctx = canvasElement.getContext('2d')

        if (!ctx)
            throw new Error("Could not get the 2D game canvas context.")
        else
            Rendering.ctx = ctx
    }

    static clearCanvas() {
        const ctx = Rendering.ctx

        Rendering.ctx.fillStyle = "#202027"
        Rendering.ctx.fillRect(0, 0, Rendering.canvas.width, Rendering.canvas.height)
    }
}

export default Rendering
