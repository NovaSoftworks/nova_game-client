import { System } from '../engine/ecs'
import { Collider, Transform, Velocity } from '../components'
import { Vector2 } from '../engine/math'

export class PhysicsSystem extends System {
    updateFixed(fixedStep: number) {
        const collidableEntities = this.world.queryEntities(Collider, Transform)
        const movingEntities = this.world.queryEntities(Transform, Velocity)

        for (const movingEntity of movingEntities) {
            const collider = this.world.getComponent(movingEntity, Collider)
            const transform = this.world.getComponent(movingEntity, Transform)!
            const velocity = this.world.getComponent(movingEntity, Velocity)!

            const oldPosition = transform.position
            transform.position = transform.position.add(velocity.velocity.multiply(fixedStep))

            if (collider) {
                for (const otherEntity of collidableEntities) {
                    if (movingEntity.id != otherEntity.id) {

                        const otherCollider = this.world.getComponent(otherEntity, Collider)!
                        const otherTransform = this.world.getComponent(otherEntity, Transform)!

                        if (this.detectCollision(collider, transform, otherCollider, otherTransform)) {
                            const collidingEntityDistance = this.distanceBetween(collider, transform, otherCollider, otherTransform)

                            const direction = velocity.velocity.normalize()
                            const adjust = direction.multiply(Math.max(collidingEntityDistance.magnitude() - 1, 0))
                            transform.position = oldPosition.add(adjust)

                            velocity.velocity = Vector2.zero()
                            break
                        }
                    }
                }
            }
        }
    }

    detectCollision(c1: Collider, t1: Transform, c2: Collider, t2: Transform) {
        const collisionDetected = t1.position.x < t2.position.x + c2.shape.width &&
            t1.position.x + c1.shape.width > t2.position.x &&
            t1.position.y < t2.position.y + c2.shape.height &&
            t1.position.y + c1.shape.height > t2.position.y

        if (collisionDetected) {
            c1.colliding = true
            c2.colliding = true
        } else {
            c1.colliding = false
            c2.colliding = false
        }

        return collisionDetected
    }

    distanceBetween(c1: Collider, t1: Transform, c2: Collider, t2: Transform): Vector2 {
        // Calculate the center points of each AABB
        const center1 = new Vector2(t1.position.x + c1.shape.width / 2, t1.position.y + c1.shape.height / 2)
        const center2 = new Vector2(t2.position.x + c2.shape.width / 2, t2.position.y + c2.shape.height / 2)

        // Calculate the distance vector between the two centers
        const dist = center2.subtract(center1)

        // If the distance vector's X component is greater than the sum of the half-widths,
        // the rectangles are separated on the X axis
        const halfWidths = c1.shape.width / 2 + c2.shape.width / 2
        const dx = Math.abs(dist.x) - halfWidths

        // Similarly for the Y axis
        const halfHeights = c1.shape.height / 2 + c2.shape.height / 2
        const dy = Math.abs(dist.y) - halfHeights

        // Return the distance between the AABBs, or (0, 0) if they're overlapping
        return new Vector2(Math.max(dx, 0), Math.max(dy, 0))
    }
}