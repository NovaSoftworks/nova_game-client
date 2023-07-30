import { System } from '../engine/ecs'
import { Rendering } from '../engine/core'
import { Collider, Transform } from '../components'

export class ColliderRendererSystem extends System {
    update(step: number) {
        const collidableEntities = this.queryEntities('Collider', 'Transform')

        for (const entity of collidableEntities) {
            const collider = this.getComponent<Collider>(entity, 'Collider')!
            const transform = this.getComponent<Transform>(entity, 'Transform')!

            this.drawCollider(collider, transform)
        }
    }

    drawCollider(collider: Collider, transformComponent: Transform) {
        const rectangle = collider.shape
        Rendering.ctx.beginPath()
        Rendering.ctx.rect(
            transformComponent.position.x,
            transformComponent.position.y,
            rectangle.width,
            rectangle.height
        )
        Rendering.ctx.fillStyle = 'rgba(255,255,255,.3)'
        Rendering.ctx.fill()
        Rendering.ctx.closePath()
    }
}