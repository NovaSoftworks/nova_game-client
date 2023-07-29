import { Input } from './core/input'
import { Physics } from './core/physics'
import { Rendering } from './core/rendering'
import { Time } from './core/time'
import { UI } from './core/ui'
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

        window.requestAnimationFrame(NovaEngine.update)
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





