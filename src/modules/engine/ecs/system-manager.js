export class SystemManager {
    static systems = []
    static fixedUpdateSystems = []

    static addSystem(system) {
        if (system.fixedUpdate) {
            SystemManager.fixedUpdateSystems.push(system);
        } else {
            SystemManager.systems.push(system);
        }
    }

    static update(deltaTime) {
        for (const system of SystemManager.systems) {
            system.update(deltaTime);
        }
    }

    static fixedUpdate(fixedDeltaTime) {
        for (const system of SystemManager.fixedUpdateSystems) {
            system.update(fixedDeltaTime);
        }
    }
}
