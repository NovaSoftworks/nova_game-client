import { Metrics } from './modules/core/metrics.js';
import { Time } from './modules/core/time.js';
import { Physics } from './modules/core/physics.js';
import { SystemManager } from './modules/core/ecs/system-manager.js';

let accumulatedTime = 0

function gameLoop() {
    Time.calculateDeltaTime()
    let dt = Time.deltaTime

    accumulatedTime += (dt * 1000) // as dt is in seconds

    while (accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
        SystemManager.fixedUpdate(Physics.fixedTimeStep / 1000)
        accumulatedTime -= Physics.fixedTimeStep;
        Physics.stepNumber++
    }

    SystemManager.update(dt)

    window.requestAnimationFrame(gameLoop)
}

SystemManager.addSystem({
    fixedUpdate: true,
    update: function (dt) {
        console.log(`My first system. dt = ${dt}`)
    }
})
SystemManager.addSystem({
    update: function (dt) {
        console.log(`My second system. dt = ${dt}`)
    }
})

window.requestAnimationFrame(gameLoop)
Metrics.show()