import { InputUtils } from '../engine/utils'
import { System } from '../engine/ecs'
import { Input } from '../components'
import { Vector2 } from '../engine/math'

export class InputSystem extends System {
    create() {
        if (!this.world.getSingleton(Input)) {
            const input = new Input()
            this.world.addSingleton(input)
        }
    }

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

        const input = this.world.getSingleton(Input)
        if (input)
            input.moveDirection = moveInput.normalize()
    }
}
