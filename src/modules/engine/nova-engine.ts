import { Time } from './core/time'
import { Physics } from './core/physics'
import { Rendering } from './core/rendering'
import { ComponentManager } from './ecs/component-manager'
import { EntityManager } from './ecs/entity-manager'
import { SystemManager } from './ecs/system-manager'
import { UI } from './core/ui'
import { Entity } from './ecs/entity'

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

    static queryEntities(...componentTypes): Array<Entity> {
        const entities = EntityManager.getAllEntities()

        return entities.filter(entity => {
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

    accumulatedTime += (dt * 1000) // as dt is in seconds

    while (accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
        SystemManager.updateFixedSystems(Physics.fixedTimeStep / 1000)
        accumulatedTime -= Physics.fixedTimeStep;
        Physics.stepNumber++
    }

    Rendering.clearCanvas()
    SystemManager.updateSystems(dt)

    window.requestAnimationFrame(update)
}
