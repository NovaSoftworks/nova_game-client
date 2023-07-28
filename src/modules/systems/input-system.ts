import { NovaEngine } from '../engine/nova-engine';
import { System } from '../engine/ecs/system'
import { Input } from '../components/input'
import { Vector2 } from '../engine/core/math';

export class InputSystem extends System {
    keyState: Array<boolean> = []

    constructor() {
        super()

        // Event listeners to capture WASD keys
        window.addEventListener('keydown', (event) => {
            this.keyState[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keyState[event.key] = false;
        });
    }

    update(step: number) {
        const moveInput: Vector2 = Vector2.zero()

        if (this.keyState['w'] || this.keyState['ArrowUp']) {
            moveInput.y = -1;
        }

        if (this.keyState['s'] || this.keyState['ArrowDown']) {
            moveInput.y = 1;
        }

        if (this.keyState['a'] || this.keyState['ArrowLeft']) {
            moveInput.x = -1;
        }

        if (this.keyState['d'] || this.keyState['ArrowRight']) {
            moveInput.x = 1;
        }

        for (const entity of NovaEngine.queryEntities("Input")) {
            const inputComponent = NovaEngine.getComponent<Input>(entity, "Input")!

            inputComponent.moveDirection = moveInput.normalize()
        }
    }
}
