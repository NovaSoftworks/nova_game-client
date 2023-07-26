import { NovaEngine } from '../engine/nova-engine.js'

export class MoveSystem {
    fixedUpdate = true

    update(dt) {
        const entities = NovaEngine.queryEntities('Input', 'Transform')

        for (const entity of entities) {
            const inputComponent = NovaEngine.getComponent(entity, 'Input')
            const transformComponent = NovaEngine.getComponent(entity, 'Transform')

            const speed = 300
            const movement = inputComponent.moveDirection.multiply(speed * dt)

            transformComponent.position.x += movement.x
            transformComponent.position.y += movement.y
        }
    }
}
