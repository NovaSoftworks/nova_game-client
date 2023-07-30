import { System } from '../engine/ecs'
import { Rendering } from '../engine/core'
import { Circle, Nameplate, Player, Transform } from '../components'

export class NameplateRendererSystem extends System {
    update(step: number) {
        const entities = this.queryEntities('Transform', 'Nameplate', 'Circle')
        for (const entity of entities) {
            const circle = this.getComponent<Circle>(entity, 'Circle')!
            const nameplate = this.getComponent<Nameplate>(entity, 'Nameplate')!
            const transform = this.getComponent<Transform>(entity, 'Transform')!

            const player = this.getComponent<Player>(entity, 'Player')

            if (player)
                this.drawNameplate(player.username, circle, nameplate, transform)

        }
    }

    drawNameplate(name: string, circle: Circle, nameplate: Nameplate, transform: Transform) {
        const ctx = Rendering.ctx
        ctx.font = nameplate.font
        ctx.fillStyle = nameplate.color
        ctx.textBaseline = 'middle'

        // Measure the width and height of the text
        const textMetrics = ctx.measureText(name.toUpperCase())

        // Calculate the position where the text should start in order for it to be centered
        let textStartX = transform.position.x + circle.radius - textMetrics.width / 2
        let textStartY = transform.position.y - (parseInt(ctx.font) / 2) - 5

        // Check if text goes outside of the canvas
        const canvasWidth = Rendering.canvas.width
        const canvasHeight = Rendering.canvas.height

        if (textStartX < 0) {
            textStartX = 0
        } else if (textStartX + textMetrics.width > canvasWidth) {
            textStartX = canvasWidth - textMetrics.width
        }

        if (textStartY < parseInt(ctx.font, 10)) { //ensure the text doesn't go beyond the top edge
            textStartY = transform.position.y + circle.radius * 2 + (parseInt(ctx.font) / 2) + 5
        }

        // Render the text at the calculated position
        ctx.fillText(name.toUpperCase(), textStartX, textStartY)
    }
}