import { NovaEngine } from '../engine/nova-engine.js';

export class InputSystem {
    constructor() {
        this.keyState = {};

        // Event listeners to capture WASD keys
        window.addEventListener('keydown', (event) => {
            this.keyState[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keyState[event.key] = false;
        });
    }

    update(dt) {
        for (const entity of NovaEngine.queryEntities("Input")) {
            const inputComponent = NovaEngine.getComponent(entity, "Input")

            inputComponent.moveDirection.x = 0
            inputComponent.moveDirection.y = 0

            if (this.keyState['w'] || this.keyState['ArrowUp']) {
                inputComponent.moveDirection.y = -1;
            }

            if (this.keyState['s'] || this.keyState['ArrowDown']) {
                inputComponent.moveDirection.y = 1;
            }

            if (this.keyState['a'] || this.keyState['ArrowLeft']) {
                inputComponent.moveDirection.x = -1;
            }

            if (this.keyState['d'] || this.keyState['ArrowRight']) {
                inputComponent.moveDirection.x = 1;
            }

            inputComponent.moveDirection = inputComponent.moveDirection.normalize()
        }
    }
}
