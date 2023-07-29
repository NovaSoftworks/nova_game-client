import { System } from '../engine/ecs/system'
import { PlayerInput } from '../components/player-input'
import { Transform } from '../components/transform'

export class MoveSystem extends System {
    update(step: number) {
        for (const entity of this.queryEntities('PlayerInput', 'Transform')) {
            const playerInput = this.getComponent<PlayerInput>(entity, 'PlayerInput')!
            const transform = this.getComponent<Transform>(entity, 'Transform')!

            const speed = 300
            const movement = playerInput.moveDirection.multiply(speed * step)

            transform.position.x += movement.x
            transform.position.y += movement.y
        }
    }
}