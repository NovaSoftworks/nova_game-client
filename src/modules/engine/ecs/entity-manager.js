import { Entity } from "./entity.js"

export class EntityManager {
    static entities = new Map()
    static nextEntityId = 1

    constructor() { }

    static createEntity() {
        const entity = new Entity(EntityManager.nextEntityId++)

        EntityManager.entities.set(entity.id, entity)

        return entity
    }

    static getEntity(entityId) {
        return EntityManager.entities.get(entityId);
    }

    static destroyEntity(entity) {
        EntityManager.entities.delete(entity.id)
    }

    static getAllEntities() {
        return [...EntityManager.entities.values()];
    }
}
