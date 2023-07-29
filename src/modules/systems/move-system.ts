import { NovaEngine } from '../engine/nova-engine'
import { System } from '../engine/ecs/system'
import { PlayerInput } from '../components/player-input'
import { Transform } from '../components/transform'

export class MoveSystem extends System {
    update(step: number) {
        for (const entity of NovaEngine.world.queryEntities('PlayerInput', 'Transform')) {
            const inputComponent = NovaEngine.world.getComponent<PlayerInput>(entity, 'PlayerInput')!
            const transformComponent = NovaEngine.world.getComponent<Transform>(entity, 'Transform')!

            const speed = 300
            const movement = inputComponent.moveDirection.multiply(speed * step)

            transformComponent.position.x += movement.x
            transformComponent.position.y += movement.y
        }
    }
}
