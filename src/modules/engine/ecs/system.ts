import { World } from "./"

export abstract class System {
    world: World
    enabled: boolean = true

    constructor(world: World) {
        this.world = world
    }

    create() {

    }

    destroy() {

    }

    update(step: number) {

    }

    updateFixed(fixedStep: number) {

    }
}