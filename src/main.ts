import { World } from './modules/engine/ecs'
import { InputUtils, RenderingUtils, TimeUtils } from './modules/engine/utils'
import { CircleRendererSystem, ColliderRendererSystem, ConnectionSystem, GameStateSystem, InputSystem, MoveSystem, NameplateRendererSystem, PhysicsSystem, TickSystem, UISystem } from './modules/systems'

const world = new World()

RenderingUtils.initialize('nova_render')
InputUtils.initialize()

world.createSystem(GameStateSystem)
world.createSystem(UISystem)
world.createSystem(TickSystem)
world.createSystem(ConnectionSystem)
world.createSystem(PhysicsSystem)
world.createSystem(CircleRendererSystem)
world.createSystem(InputSystem)
world.createSystem(MoveSystem)
world.createSystem(ColliderRendererSystem)
world.createSystem(NameplateRendererSystem)

window.requestAnimationFrame(gameLoop)

function gameLoop() {
    RenderingUtils.clearCanvas()
    TimeUtils.calculateDeltaTime()

    world.update()

    window.requestAnimationFrame(gameLoop)
}
