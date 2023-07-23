export class ComponentManager {
    static components = new Map()

    static addComponent(entity, component) {
        const componentName = component.constructor.name

        if (!ComponentManager.components.has(componentName)) {
            ComponentManager.components.set(componentName, []);
        }

        ComponentManager.components.get(componentName)[entity.id] = component
    }

    static removeComponent(entity, componentName) {
        if (ComponentManager.components.has(componentName)) {
            delete ComponentManager.components.get(componentName)[entity.id]
        }
    }

    static getComponent(entity, componentName) {
        if (ComponentManager.components.has(componentName)) {
            return ComponentManager.components.get(componentName)[entity.id]
        }

        return null
    }
}