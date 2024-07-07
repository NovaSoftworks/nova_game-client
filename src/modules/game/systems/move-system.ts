import { System } from '../engine/ecs'
import { Input, Velocity } from '../components'

export class MoveSystem extends System {
    updateFixed(step: number) {
        const input = this.world.getSingleton(Input)!

        for (const entity of this.world.queryEntities(Velocity)) {
            const velocity = this.world.getComponent(entity, Velocity)!

            const speed = 300
            const movement = input.moveDirection.multiply(speed)

            velocity.velocity = movement
        }
    }
}