import { Entity } from "./entity"

export class EntityManager {
    static entities: Map<number, Entity> = new Map<number, Entity>()
    static nextEntityId: number = 1

    constructor() { }

    static createEntity(): Entity {
        const entity = new Entity(EntityManager.nextEntityId++)

        EntityManager.entities.set(entity.id, entity)

        return entity
    }

    static getEntity(entityId: number): Entity | undefined {
        return EntityManager.entities.get(entityId);
    }

    static destroyEntity(entityId: number) {
        EntityManager.entities.delete(entityId)
    }

    static getAllEntities(): Array<Entity> {
        return [...EntityManager.entities.values()];
    }
}
