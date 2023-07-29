export class Rendering {
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

        Rendering.setCanvas(canvas)
    }

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
