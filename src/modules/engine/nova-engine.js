import { Time } from './core/time.js'
import { Physics } from './core/physics.js'
import { Rendering } from './core/rendering.js'
import { ComponentManager } from './ecs/component-manager.js'
import { EntityManager } from './ecs/entity-manager.js'
import { SystemManager } from './ecs/system-manager.js'
import { UI } from './core/ui.js'

export class NovaEngine {
    static UI = UI
    static createEntity = EntityManager.createEntity
    static addComponent = ComponentManager.addComponent
    static getComponent = ComponentManager.getComponent
    static addSystem = SystemManager.addSystem

    static start(options = { width: 1280, height: 720 }, callback) {
        init(options.width, options.height)

        if (typeof callback === 'function') {
            callback();
        }

        window.requestAnimationFrame(update);
    }

    static queryEntities(...componentTypes) {
        const entities = EntityManager.getAllEntities()

        return entities.filter((entity) => {
            for (const componentType of componentTypes) {
                if (!ComponentManager.getComponent(entity, componentType)) {
                    return false;
                }
            }
            return true;
        });
    }
}


let accumulatedTime = 0

function init(canvasWidth, canvasHeight) {
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    document.getElementById("game-canvas-container").appendChild(canvas)

    Rendering.setCanvas(canvas)
}

function update() {
    Time.calculateDeltaTime()
    let dt = Time.deltaTime

    accumulatedTime += (dt * 1000) // as dt is in seconds

    while (accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
        SystemManager.fixedUpdate(Physics.fixedTimeStep / 1000)
        accumulatedTime -= Physics.fixedTimeStep;
        Physics.stepNumber++
    }

    Rendering.clearCanvas()
    SystemManager.update(dt)

    window.requestAnimationFrame(update)
}
