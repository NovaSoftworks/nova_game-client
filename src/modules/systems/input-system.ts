import { NovaEngine } from '../engine/nova-engine';
import { Input } from '../engine/core/input';
import { System } from '../engine/ecs/system'
import { PlayerInput } from '../components/player-input'
import { Vector2 } from '../engine/core/math';

export class InputSystem extends System {
    update(step: number) {
        const moveInput: Vector2 = Vector2.zero()

        if (Input.getKeyDown('w') || Input.getKeyDown('ArrowUp')) {
            moveInput.y = -1;
        }

        if (Input.getKeyDown('s') || Input.getKeyDown('ArrowDown')) {
            moveInput.y = 1;
        }

        if (Input.getKeyDown('a') || Input.getKeyDown('ArrowLeft')) {
            moveInput.x = -1;
        }

        if (Input.getKeyDown('d') || Input.getKeyDown('ArrowRight')) {
            moveInput.x = 1;
        }

        for (const entity of NovaEngine.world.queryEntities("PlayerInput")) {
            const inputComponent = NovaEngine.world.getComponent<PlayerInput>(entity, "PlayerInput")!

            inputComponent.moveDirection = moveInput.normalize()
        }
    }
}
