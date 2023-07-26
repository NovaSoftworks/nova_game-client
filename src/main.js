import { Metrics } from './modules/metrics.js'
import { NovaEngine } from './modules/engine/nova-engine.js'
import { Circle } from './modules/components/circle.js'
import { Input } from './modules/components/input.js'
import { Transform } from './modules/components/transform.js'
import { InputSystem } from './modules/systems/input-system.js'
import { MoveSystem } from './modules/systems/move-system.js'
import { CircleRendererSystem } from './modules/systems/circle-renderer-system.js'

import { UIAnchor, UILayout, UITextCase } from './modules/engine/core/ui.js'
const UI = NovaEngine.UI

function startGame() {
    NovaEngine.start({ width: 960, height: 540 }, () => {
        let player = NovaEngine.createEntity()
        NovaEngine.addComponent(player, new Input())
        NovaEngine.addComponent(player, new Transform(472, 262))
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