import { Metrics } from './modules/metrics.js';
import { Time } from './modules/time.js';
import { Physics } from './modules/physics.js';

let accumulatedTime = 0

function mainLoop() {
    Time.calculateDeltaTime()
    let dt = Time.deltaTime

    update(dt)

    accumulatedTime += (dt * 1000) // as dt is in seconds

    while (accumulatedTime >= Physics.fixedTimeStep) { // comparing ms with ms
        fixedUpdate(Physics.fixedTimeStep)
        accumulatedTime -= Physics.fixedTimeStep;
        Physics.stepNumber++
    }

    window.requestAnimationFrame(mainLoop)
}

function update() {
    console.log("updating")
}

function fixedUpdate() {
    console.log(`Fixed update nb ${Physics.stepNumber}`)
}

window.requestAnimationFrame(mainLoop)
Metrics.show()