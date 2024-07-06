import { Circle, Collider, Nameplate, Transform, Velocity } from './modules/components'
import { World } from './modules/engine/ecs'
import { Rectangle, Vector2 } from './modules/engine/math'
import { InputUtils, RenderingUtils, TimeUtils } from './modules/engine/utils'
import { CircleRendererSystem, ColliderRendererSystem, InputSystem, MoveSystem, NameplateRendererSystem, PhysicsSystem, TickSystem } from './modules/systems'

const world = new World()

RenderingUtils.initialize('nova_render')
InputUtils.initialize()

world.createSystem(TickSystem)
world.createSystem(PhysicsSystem)
world.createSystem(CircleRendererSystem)
world.createSystem(InputSystem)
world.createSystem(MoveSystem)
// world.createSystem(ColliderRendererSystem)
world.createSystem(NameplateRendererSystem)

const player = world.createEntity()

world.addComponent(player, new Transform(new Vector2(472, 262)))
world.addComponent(player, new Circle(16, 'orange'))
world.addComponent(player, new Collider(new Rectangle(32, 32)))
world.addComponent(player, new Velocity())
world.addComponent(player, new Nameplate('orange'))

console.log('Spawned player')

window.requestAnimationFrame(gameLoop)

function gameLoop() {
    RenderingUtils.clearCanvas()
    TimeUtils.calculateDeltaTime()

    world.update()

    window.requestAnimationFrame(gameLoop)
}
