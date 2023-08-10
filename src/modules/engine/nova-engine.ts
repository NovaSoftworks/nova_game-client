import { InputUtils, RenderingUtils, TimeUtils } from './utils'
import { UI } from './ui'
import { World } from './ecs/world'

export class NovaEngine {
    static UI = UI
    static world = World.current

    static initialize(options: any, callback: Function) {
        const containerId = options.containerId || 'nova_container'
        const canvasWidth = options.width || 1280
        const canvasHeight = options.height || 720

        RenderingUtils.initialize(containerId, canvasWidth, canvasHeight)

        if (callback) {
            callback()
        }

        InputUtils.initialize()
        UI.initialize(RenderingUtils.canvas)

        window.requestAnimationFrame(NovaEngine.update)
    }

    private static accumulatedTime = 0
    static fixedTimeStep: number = 16 // ms
    static stepNumber: number = 0

    private static update() {
        RenderingUtils.clearCanvas()
        TimeUtils.calculateDeltaTime()
        let dt = TimeUtils.deltaTime

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