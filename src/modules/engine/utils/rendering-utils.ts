export class RenderingUtils {
    static canvas: HTMLCanvasElement
    static ctx: CanvasRenderingContext2D

    static initialize(containerId, canvasWidth, canvasHeight) {
        const canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        const gameCanvasContainer = document.getElementById(containerId)
        if (gameCanvasContainer) {
            gameCanvasContainer.appendChild(canvas)
        } else {
            throw new Error(`Could not attach the game to #${containerId}.`)
        }

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
