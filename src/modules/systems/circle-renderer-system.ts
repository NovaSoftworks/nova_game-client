import { NovaEngine } from '../engine/nova-engine'
import { System } from '../engine/ecs/system'
import { Circle } from '../components/circle'
import { Transform } from '../components/transform'
import { Rendering } from '../engine/core/rendering'

export class CircleRendererSystem extends System {
    update(step: number) {
        Rendering.clearCanvas()

        const entities = NovaEngine.world.queryEntities('Circle', 'Transform')
        for (const entity of entities) {
            const circleComponent = NovaEngine.world.getComponent<Circle>(entity, 'Circle')!
            const transformComponent = NovaEngine.world.getComponent<Transform>(entity, 'Transform')!

            this.drawCircle(circleComponent, transformComponent)
        }
    }

    drawCircle(circleComponent: Circle, transformComponent: Transform) {
        Rendering.ctx.beginPath()
        Rendering.ctx.arc(
            transformComponent.position.x,
            transformComponent.position.y,
            circleComponent.radius,
            0,
            2 * Math.PI
        )
        Rendering.ctx.fillStyle = circleComponent.color
        Rendering.ctx.fill()
        Rendering.ctx.closePath()
    }
}