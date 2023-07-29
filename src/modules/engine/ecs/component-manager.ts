import { Component } from "./component";
import { Entity } from "./entity";

export class ComponentManager {
    static components: Map<string, Array<Component>> = new Map<string, Array<Component>>()

    static addComponent(entity: Entity, component: Component) {
        const componentName = component.name

        if (!ComponentManager.components.has(componentName)) {
            ComponentManager.components.set(componentName, []);
        }

        const componentArray = ComponentManager.components.get(componentName)
        if (componentArray)
            componentArray[entity.id] = component
    }

    static removeComponent(entity: Entity, componentName: string) {
        const componentArray = ComponentManager.components.get(componentName)
        if (componentArray)
            delete componentArray[entity.id]
    }

    static getComponent<T extends Component>(entity: Entity, componentName: string): T | undefined {
        const componentArray = ComponentManager.components.get(componentName)
        if (componentArray) {
            return componentArray[entity.id] as T
        }

        return undefined
    }
}