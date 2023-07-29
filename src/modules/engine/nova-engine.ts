import { Physics } from './core/physics'
import { Rendering } from './core/rendering'
import { Time } from './core/time'
import { UI } from './core/ui'
import { World } from './ecs/world'

export class NovaEngine {
    static UI = UI
    static world = World.current

    static start(options = { width: 1280, height: 720 }, callback) {
        NovaEngine.setupCanvas(options.width, options.height)

        if (typeof callback === 'function') {
            callback()
        }

        window.requestAnimationFrame(NovaEngine.update)
    }

    private static setupCanvas(canvasWidth, canvasHeight) {
        const canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        const gameCanvasContainer = document.getElementById("game-canvas-container")
        if (gameCanvasContainer) {
            gameCanvasContainer.appendChild(canvas)
        } else {
            throw new Error("Could not attach the game to #game-canvas-container.")
        }

        Rendering.setCanvas(canvas)
    }

    private static accumulatedTime = 0
    private static update() {
        Time.calculateDeltaTime()
        let dt = Time.deltaTime

        NovaEngine.accumulatedTime += dt

        while (NovaEngine.accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
            NovaEngine.world.updateFixedSystems(Physics.fixedTimeStep / 1000)
            NovaEngine.accumulatedTime -= Physics.fixedTimeStep
            Physics.stepNumber++
        }

        Rendering.clearCanvas()
        NovaEngine.world.updateSystems(dt / 1000)

        window.requestAnimationFrame(NovaEngine.update)
    }
}





