import { System } from '../engine/ecs'
import { Rendering } from '../engine/core'
import { Circle, Transform } from '../components'

export class CircleRendererSystem extends System {
    update(step: number) {
        const entities = this.queryEntities('Circle', 'Transform')
        for (const entity of entities) {
            const circleComponent = this.getComponent<Circle>(entity, 'Circle')!
            const transformComponent = this.getComponent<Transform>(entity, 'Transform')!

            this.drawCircle(circleComponent, transformComponent)

        }
    }

    drawCircle(circleComponent: Circle, transformComponent: Transform) {
        Rendering.ctx.beginPath()
        Rendering.ctx.arc(
            transformComponent.position.x + circleComponent.radius,
            transformComponent.position.y + circleComponent.radius,
            circleComponent.radius,
            0,
            2 * Math.PI
        )
        Rendering.ctx.fillStyle = circleComponent.color
        Rendering.ctx.fill()
        Rendering.ctx.closePath()
    }
}