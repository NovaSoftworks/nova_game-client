import { NovaEngine } from './modules/engine/nova-engine'
import { Circle } from './modules/components/circle'
import { Player } from './modules/components/player'
import { PlayerInput } from './modules/components/player-input'
import { Transform } from './modules/components/transform'
import { CircleRendererSystem } from './modules/systems/circle-renderer-system'
import { InputSystem } from './modules/systems/input-system'
import { MoveSystem } from './modules/systems/move-system'

import { UI, UIAnchor, UILayout, UIPanel, UIText } from './modules/engine/ui'
import { Vector2 } from './modules/engine/core/math'

function startGame(playerName: string) {
    NovaEngine.initialize({ width: 960, height: 540 }, () => {
        NovaEngine.world.addSystem(new CircleRendererSystem())
        NovaEngine.world.addSystem(new InputSystem())
        NovaEngine.world.addSystem(new MoveSystem())
    })

    let player = NovaEngine.world.createEntity()
    NovaEngine.world.addComponent(player, new Player(playerName))
    NovaEngine.world.addComponent(player, new PlayerInput())
    NovaEngine.world.addComponent(player, new Transform(new Vector2(472, 262)))
    NovaEngine.world.addComponent(player, new Circle(16, 'orange'))

    const hud = UI.createScreen('hud')
    const playerNameText = new UIText(hud, UIAnchor.TOPLEFT, 20, 20)
    playerNameText.setText(playerName)
    UI.setScreen('hud')

    hud.printHierarchy()
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

    mainSection.style.display = 'none'
    novaContainer.style.display = 'flex'

    startGame(playerName)
}

var playBtn = document.getElementById('play-btn')!
playBtn.onclick = play
