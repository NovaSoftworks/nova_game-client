import { NovaEngine } from './modules/engine/nova-engine'
import { Circle, Collider, Nameplate, Player, PlayerInput, Transform, Velocity } from './modules/components'
import { CircleRendererSystem, ColliderRendererSystem, InputSystem, MoveSystem, NameplateRendererSystem, PhysicsSystem, TickSystem } from './modules/systems'
import { UIAnchor, UIText } from './modules/engine/ui'
import { Rectangle, Vector2 } from './modules/engine/math'
import { NetworkManager } from './modules/engine/networking/network-manager'

function startGame(playerName: string) {
    const gameWidth = 960
    const gameHeight = 540

    NovaEngine.initialize({ width: gameWidth, height: gameHeight }, () => {
        NovaEngine.world.createSystem(TickSystem)
        NovaEngine.world.createSystem(PhysicsSystem)
        NovaEngine.world.createSystem(CircleRendererSystem)
        NovaEngine.world.createSystem(InputSystem)
        NovaEngine.world.createSystem(MoveSystem)
        //NovaEngine.world.createSystem(ColliderRendererSystem)
        NovaEngine.world.createSystem(NameplateRendererSystem)
    })

    // Create wall thickness
    spawnWalls(gameWidth, gameHeight)

    spawnPlayer(playerName)

    createUI(playerName)
}

function spawnWalls(gameWidth: number, gameHeight: number) {
    let wallThickness = 8 // Modify as needed

    // Create top wall
    let topWall = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(topWall, new Transform(new Vector2(0, 0)))
    NovaEngine.world.addComponent(topWall, new Collider(new Rectangle(gameWidth, wallThickness)))

    // Create bottom wall
    let bottomWall = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(bottomWall, new Transform(new Vector2(0, gameHeight - wallThickness)))
    NovaEngine.world.addComponent(bottomWall, new Collider(new Rectangle(gameWidth, wallThickness)))

    // Create left wall
    let leftWall = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(leftWall, new Transform(new Vector2(0, wallThickness)))
    NovaEngine.world.addComponent(leftWall, new Collider(new Rectangle(wallThickness, gameHeight - 2 * wallThickness)))

    // Create right wall
    let rightWall = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(rightWall, new Transform(new Vector2(gameWidth - wallThickness, wallThickness)))
    NovaEngine.world.addComponent(rightWall, new Collider(new Rectangle(wallThickness, gameHeight - 2 * wallThickness)))
}

function spawnPlayer(playerName: string) {
    let player = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(player, new Player(playerName))
    NovaEngine.world.addComponent(player, new PlayerInput())
    NovaEngine.world.addComponent(player, new Transform(new Vector2(472, 262)))
    NovaEngine.world.addComponent(player, new Circle(16, 'orange'))
    NovaEngine.world.addComponent(player, new Collider(new Rectangle(32, 32)))
    NovaEngine.world.addComponent(player, new Velocity())
    NovaEngine.world.addComponent(player, new Nameplate('orange'))
}

function createUI(playerName: string) {
    const hud = NovaEngine.UI.createScreen('hud')
    const playerNameText = new UIText(hud, UIAnchor.TOPLEFT, 20, 20)
    playerNameText.setText(playerName)
    NovaEngine.UI.setScreen('hud')
}

function play(e) {
    if (e)
        e.preventDefault()

    const mainSection = document.getElementsByClassName('main-section')[0] as HTMLElement
    const novaContainer = document.getElementById('nova_container')
    const playerNameInput = document.getElementById('nova_player-name-input') as HTMLInputElement

    if (!novaContainer) {
        throw new Error('Could not find a #nova_container')
    }


    if (!playerNameInput) {
        throw new Error('Could not find a #nova_player-name-input')
    }

    const playerName = playerNameInput.value
    if (playerName.length < 2) {
        alert('Your username is too short (must be >= 2).')
        return
    }

    const networkManager: NetworkManager = new NetworkManager()
    networkManager.connect('ws://localhost:8080', () => {
        networkManager.authenticate(playerName, (success, error) => {
            if (success) {
                mainSection.style.display = 'none'
                novaContainer.style.display = 'flex'
                startGame(playerName)
            } else {
                alert(`Authentication failed: ${error}`)
            }
        })
    })
}

var playBtn = document.getElementById('play-btn')!
playBtn.onclick = play
