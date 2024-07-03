export class RenderingUtils {
    static canvas: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D

    static initialize(canvasId) {
        const canvas = <HTMLCanvasElement>document.getElementById(canvasId)
        if (!canvas) return

        RenderingUtils.setCanvas(canvas)
    }

    static setCanvas(canvasElement: HTMLCanvasElement) {

        RenderingUtils.canvas = canvasElement

        const ctx = canvasElement.getContext('2d')

        if (!ctx)
            throw new Error("Could not get the 2D game canvas context.")
        else
            RenderingUtils.ctx = ctx
    }

    static clearCanvas() {
        const ctx = RenderingUtils.ctx

        RenderingUtils.ctx.fillStyle = "#202027"
        RenderingUtils.ctx.fillRect(0, 0, RenderingUtils.canvas.width, RenderingUtils.canvas.height)
    }
}
