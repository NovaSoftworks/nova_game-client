import { System } from '../engine/ecs'
import { RenderingUtils } from '../engine/utils'
import { Circle, Nameplate, Player, Transform } from '../components'

export class NameplateRendererSystem extends System {
    update(step: number) {
        const entities = this.world.queryEntities(Transform, Nameplate, Circle)
        for (const entity of entities) {
            const circle = this.world.getComponent(entity, Circle)!
            const nameplate = this.world.getComponent(entity, Nameplate)!
            const transform = this.world.getComponent(entity, Transform)!

            const player = this.world.getComponent(entity, Player)

            if (player)
                this.drawNameplate(player.username, circle, nameplate, transform)

        }
    }

    drawNameplate(name: string, circle: Circle, nameplate: Nameplate, transform: Transform) {
        const ctx = RenderingUtils.ctx
        ctx.font = nameplate.font
        ctx.fillStyle = nameplate.color
        ctx.textBaseline = 'middle'

        // Measure the width and height of the text
        const textWidth = ctx.measureText(name.toUpperCase()).width
        const textHalfHeight = (parseInt(ctx.font) / 2)

        // Calculate the position where the text should start in order for it to be centered
        let textStartX = transform.position.x + circle.radius - textWidth / 2
        let textStartY = transform.position.y - textHalfHeight - 5

        // Check if text goes outside of the canvas
        const canvasWidth = RenderingUtils.canvas.width
        const canvasHeight = RenderingUtils.canvas.height

        if (textStartX < 0) {
            textStartX = 0
        } else if (textStartX + textWidth > canvasWidth) {
            textStartX = canvasWidth - textWidth
        }

        if (textStartY < textHalfHeight) { //ensure the text doesn't go beyond the top edge
            textStartY = Math.max(
                transform.position.y + circle.radius * 2 + textHalfHeight + 5,
                0 + textHalfHeight
            )
        } else if (textStartY > canvasHeight) {
            textStartY = canvasHeight - textHalfHeight
        }

        // Render the text at the calculated position
        ctx.fillText(name.toUpperCase(), textStartX, textStartY)
    }
}