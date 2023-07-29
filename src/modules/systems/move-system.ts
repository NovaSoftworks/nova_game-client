import { NovaEngine } from '../engine/nova-engine'
import { System } from '../engine/ecs/system'
import { Input } from '../components/input'
import { Transform } from '../components/transform'

export class MoveSystem extends System {
    update(step: number) {
        for (const entity of NovaEngine.queryEntities('Input', 'Transform')) {
            const inputComponent = NovaEngine.getComponent<Input>(entity, 'Input')!
            const transformComponent = NovaEngine.getComponent<Transform>(entity, 'Transform')!

            const speed = 300
            const movement = inputComponent.moveDirection.multiply(speed * step)

            transformComponent.position.x += movement.x
            transformComponent.position.y += movement.y
        }
    }
}