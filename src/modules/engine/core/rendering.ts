export class Rendering {
    static canvas: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D | undefined

    static setCanvas(canvasElement: HTMLCanvasElement) {
        Rendering.canvas = canvasElement

        const ctx = canvasElement.getContext('2d')
        Rendering.ctx = ctx != null ? ctx : undefined
    }

    static clearCanvas() {
        const ctx = Rendering.ctx

        Rendering.ctx.fillStyle = "#202027"
        Rendering.ctx.fillRect(0, 0, Rendering.canvas.width, Rendering.canvas.height)
    }
}
