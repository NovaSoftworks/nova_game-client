import { System } from "./system";

export class SystemManager {
    static systems: Array<System> = []

    static addSystem(system: System) {
        SystemManager.systems.push(system)
    }

    static updateSystems(step: number) {
        for (const system of SystemManager.systems) {
            system.update(step)
        }
    }

    static updateFixedSystems(fixedStep: number) {
        for (const system of SystemManager.systems) {
            system.updateFixed(fixedStep)
        }
    }
}
