import { System } from '../../engine/ecs'
import { RenderingUtils } from '../../engine/utils'
import { Collider, Transform } from '../components'

export class ColliderRendererSystem extends System {
    update(step: number) {
        const collidableEntities = this.world.queryEntities(Collider, Transform)

        for (const entity of collidableEntities) {
            const collider = this.world.getComponent(entity, Collider)!
            const transform = this.world.getComponent(entity, Transform)!

            this.drawCollider(collider, transform)
        }
    }

    drawCollider(collider: Collider, transformComponent: Transform) {
        const rectangle = collider.shape
        RenderingUtils.ctx.beginPath()
        RenderingUtils.ctx.rect(
            transformComponent.position.x,
            transformComponent.position.y,
            rectangle.width,
            rectangle.height
        )
        RenderingUtils.ctx.fillStyle = 'rgba(255,255,255,.3)'
        RenderingUtils.ctx.fill()
        RenderingUtils.ctx.closePath()
    }
}