import { NovaEventBus } from './modules/engine/events'
import { AuthenticationManager, NetworkManager } from './modules/engine/networking'
import { ConnectionUtils, InputUtils, RenderingUtils, TimeUtils } from './modules/engine/utils'
import { GameManager } from './modules/game'

const eventBus = new NovaEventBus()

const networkManager = new NetworkManager(eventBus)
const authenticationManager = new AuthenticationManager(networkManager)

const gameManager = new GameManager(eventBus)


InputUtils.initialize()
ConnectionUtils.initialize(networkManager, authenticationManager)
RenderingUtils.initialize('nova_render')

function gameLoop() {
    RenderingUtils.clearCanvas()
    TimeUtils.calculateDeltaTime()

    gameManager.update()

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

// const player = world.createEntity()

// world.addComponent(player, new Transform(new Vector2(472, 262)))
// world.addComponent(player, new Circle(16, 'orange'))
// world.addComponent(player, new Collider(new Rectangle(32, 32)))
// world.addComponent(player, new Velocity())
// world.addComponent(player, new Nameplate('orange'))

// console.log('Spawned player')

// window.requestAnimationFrame(gameLoop)

// function gameLoop() {
//     RenderingUtils.clearCanvas()
//     TimeUtils.calculateDeltaTime()

//     world.update()

//     window.requestAnimationFrame(gameLoop)
// }