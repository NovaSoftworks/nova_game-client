import { Input } from './core/input'
import { Rendering } from './core/rendering'
import { Time } from './core/time'
import { UI } from './ui'
import { World } from './ecs/world'

export class NovaEngine {
    static UI = UI
    static world = World.current

    static initialize(options: any, callback: Function) {
        const containerId = options.containerId || 'nova_container'
        const canvasWidth = options.width || 1280
        const canvasHeight = options.height || 720

        Rendering.initialize(containerId, canvasWidth, canvasHeight)

        if (callback) {
            callback()
        }

        Input.initialize()
        UI.initialize(Rendering.canvas)

        window.requestAnimationFrame(NovaEngine.update)
    }

    private static accumulatedTime = 0
    static fixedTimeStep: number = 16 // ms
    static stepNumber: number = 0

    private static update() {
        Rendering.clearCanvas()
        Time.calculateDeltaTime()
        let dt = Time.deltaTime

        NovaEngine.accumulatedTime += dt

        while (NovaEngine.accumulatedTime >= NovaEngine.fixedTimeStep) { // comparing ms with ms
            NovaEngine.world.updateFixedSystems(NovaEngine.fixedTimeStep / 1000)
            NovaEngine.accumulatedTime -= NovaEngine.fixedTimeStep
            NovaEngine.stepNumber++
        }
        NovaEngine.world.updateSystems(dt / 1000)

        window.requestAnimationFrame(NovaEngine.update)
    }
}