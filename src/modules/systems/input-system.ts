import { InputUtils } from '../engine/utils'
import { System } from '../engine/ecs'
import { PlayerInput } from '../components'
import { Vector2 } from '../engine/math'

export class InputSystem extends System {
    update(step: number) {
        const moveInput: Vector2 = Vector2.zero()

        if (InputUtils.getKeyDown('w') || InputUtils.getKeyDown('ArrowUp')) {
            moveInput.y = -1
        }

        if (InputUtils.getKeyDown('s') || InputUtils.getKeyDown('ArrowDown')) {
            moveInput.y = 1
        }

        if (InputUtils.getKeyDown('a') || InputUtils.getKeyDown('ArrowLeft')) {
            moveInput.x = -1
        }

        if (InputUtils.getKeyDown('d') || InputUtils.getKeyDown('ArrowRight')) {
            moveInput.x = 1
        }

        for (const entity of this.world.queryEntities(PlayerInput)) {
            const inputComponent = this.world.getComponent(entity, PlayerInput)!

            inputComponent.moveDirection = moveInput.normalize()
        }
    }
}
