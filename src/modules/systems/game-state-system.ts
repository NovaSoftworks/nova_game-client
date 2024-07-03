import { GameState, State } from '../components'
import { EventType, System } from '../engine/ecs'

export class GameStateSystem extends System {
    create() {
        if (!this.world.getSingleton(GameState)) {
            this.world.addSingleton(new GameState())
        }
    }

    update(deltaTime: number) {
        const gameState = this.world.getSingleton(GameState)
        if (!gameState) return

        switch (gameState.state) {
            case State.Login:
                for (const e of this.world.getEventsByType(EventType.LOGIN_SUCCESS)) {
                    gameState.state = State.Playing
                }
                break
            case State.Playing:
                break
            case State.Disconnected:
                break
        }
    }
}