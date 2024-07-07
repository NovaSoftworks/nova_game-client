import { System } from '../engine/ecs'
import { RenderingUtils } from '../engine/utils'
import { Circle, Transform } from '../components'

export class CircleRendererSystem extends System {
    update(step: number) {
        const entities = this.world.queryEntities(Circle, Transform)
        for (const entity of entities) {
            const circleComponent = this.world.getComponent(entity, Circle)!
            const transformComponent = this.world.getComponent(entity, Transform)!

            this.drawCircle(circleComponent, transformComponent)

        }
    }

    drawCircle(circleComponent: Circle, transformComponent: Transform) {
        RenderingUtils.ctx.beginPath()
        RenderingUtils.ctx.arc(
            transformComponent.position.x + circleComponent.radius,
            transformComponent.position.y + circleComponent.radius,
            circleComponent.radius,
            0,
            2 * Math.PI
        )
        RenderingUtils.ctx.fillStyle = circleComponent.color
        RenderingUtils.ctx.fill()
        RenderingUtils.ctx.closePath()
    }
}