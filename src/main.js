import { Metrics } from './modules/metrics'
import { NovaEngine } from './modules/engine/nova-engine'
import { Circle } from './modules/components/circle'
import { Input } from './modules/components/input'
import { Transform } from './modules/components/transform'
import { InputSystem } from './modules/systems/input-system'
import { MoveSystem } from './modules/systems/move-system'
import { CircleRendererSystem } from './modules/systems/circle-renderer-system'

import { UIAnchor, UILayout, UITextCase } from './modules/engine/core/ui'
import { Vector2 } from './modules/engine/core/math'
const UI = NovaEngine.UI

function startGame() {
    NovaEngine.start({ width: 960, height: 540 }, () => {
        let player = NovaEngine.createEntity()
        NovaEngine.addComponent(player, new Input())
        NovaEngine.addComponent(player, new Transform(new Vector2(472, 262)))
        NovaEngine.addComponent(player, new Circle(16, 'orange'))

        NovaEngine.addSystem(new CircleRendererSystem())
        NovaEngine.addSystem(new InputSystem())
        NovaEngine.addSystem(new MoveSystem())
    })

    setupUI()
    Metrics.show()
}

function setupUI() {
    UI.createScreen('hud', (hud) => {
        const nameText = UI.createText(hud, { anchor: UIAnchor.TOPLEFT, offsetX: 20, offsetY: 20, case: UITextCase.UPPER, color: 'white' }).setText('Marem')
    })

    UI.setScreen('hud')

    UI.printHierarchy()
}

function play(e) {
    if (e)
        e.preventDefault()

    const mainSection = document.getElementsByClassName('main-section')[0]
    const gameCanvasContainer = document.getElementById('game-canvas-container')

    mainSection.style.display = 'none'
    gameCanvasContainer.style.display = 'flex'

    startGame()
}

var playBtn = document.getElementById('play-btn')

playBtn.onclick = play

// DEV
play()