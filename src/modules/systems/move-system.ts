import { System } from '../engine/ecs'
import { PlayerInput, Velocity } from '../components'

export class MoveSystem extends System {
    updateFixed(step: number) {
        for (const entity of this.world.queryEntities(PlayerInput, Velocity)) {
            const playerInput = this.world.getComponent(entity, PlayerInput)!
            const velocity = this.world.getComponent(entity, Velocity)!

            const speed = 300
            const movement = playerInput.moveDirection.multiply(speed)

            velocity.velocity = movement
        }
    }
}