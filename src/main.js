import { Metrics } from './modules/metrics.js'
import { NovaEngine } from './modules/engine/nova-engine.js'
import { Circle } from './modules/components/circle.js'
import { Input } from './modules/components/input.js'
import { Transform } from './modules/components/transform.js'
import { InputSystem } from './modules/systems/input-system.js'
import { MoveSystem } from './modules/systems/move-system.js'
import { CircleRendererSystem } from './modules/systems/circle-renderer-system.js'

NovaEngine.start({ width: 1280, height: 720 }, () => {
    let player = NovaEngine.createEntity()
    NovaEngine.addComponent(player, new Input())
    NovaEngine.addComponent(player, new Transform(600, 300))
    NovaEngine.addComponent(player, new Circle(16, 'orange'))

    NovaEngine.addSystem(new CircleRendererSystem())
    NovaEngine.addSystem(new InputSystem())
    NovaEngine.addSystem(new MoveSystem())
})

Metrics.show()
