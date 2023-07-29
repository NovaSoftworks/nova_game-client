import { Physics } from './core/physics'
import { Rendering } from './core/rendering'
import { Time } from './core/time'
import { UI } from './core/ui'
import { World } from './ecs/world'
import { Entity } from './ecs/entity'

export class NovaEngine {
    static UI = UI
    static world = World.current

    static start(options = { width: 1280, height: 720 }, callback) {
        init(options.width, options.height)

        if (typeof callback === 'function') {
            callback();
        }

        window.requestAnimationFrame(update);
    }
}


let accumulatedTime = 0

function init(canvasWidth, canvasHeight) {
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const gameCanvasContainer = document.getElementById("game-canvas-container")
    if (gameCanvasContainer) {
        gameCanvasContainer.appendChild(canvas)
    } else {
        throw new Error("Could not attach the game to #game-canvas-container.");
    }

    Rendering.setCanvas(canvas)
}

function update() {
    Time.calculateDeltaTime()
    let dt = Time.deltaTime

    accumulatedTime += dt

    while (accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
        NovaEngine.world.updateFixedSystems(Physics.fixedTimeStep / 1000)
        accumulatedTime -= Physics.fixedTimeStep;
        Physics.stepNumber++
    }

    Rendering.clearCanvas()
    NovaEngine.world.updateSystems(dt / 1000)

    window.requestAnimationFrame(update)
}