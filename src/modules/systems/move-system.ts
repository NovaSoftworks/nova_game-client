import { System } from '../engine/ecs'
import { PlayerInput, Velocity } from '../components'

export class MoveSystem extends System {
    updateFixed(step: number) {
        for (const entity of this.queryEntities('PlayerInput', 'Velocity')) {
            const playerInput = this.getComponent<PlayerInput>(entity, 'PlayerInput')!
            const velocity = this.getComponent<Velocity>(entity, 'Velocity')!

            const speed = 300
            const movement = playerInput.moveDirection.multiply(speed)

            velocity.velocity = movement
        }
    }
}