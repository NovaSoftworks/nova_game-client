import { NovaEngine } from '../engine/nova-engine.js'
import { Rendering } from '../engine/core/rendering.js'

export class CircleRendererSystem {
    update() {
        Rendering.clearCanvas()

        const entities = NovaEngine.queryEntities('Circle', 'Transform')
        for (const entity of entities) {
            const circleComponent = NovaEngine.getComponent(entity, 'Circle')
            const transformComponent = NovaEngine.getComponent(entity, 'Transform')

            this.drawCircle(circleComponent, transformComponent)
        }
    }

    drawCircle(circleComponent, transformComponent) {
        Rendering.ctx.beginPath()
        Rendering.ctx.arc(
            transformComponent.position.x,
            transformComponent.position.y,
            circleComponent.radius * transformComponent.scale,
            0,
            2 * Math.PI
        )
        Rendering.ctx.fillStyle = circleComponent.color
        Rendering.ctx.fill()
        Rendering.ctx.closePath()
    }
}