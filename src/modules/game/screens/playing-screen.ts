import { World } from "../../engine/ecs"
import { Rectangle, Vector2 } from "../../engine/math"
import { Circle, Collider, Connection, Nameplate, Player, Transform, Velocity } from "../components"
import { CircleRendererSystem, InputSystem, MoveSystem, NameplateRendererSystem, PhysicsSystem } from '../systems'
import { NovaScreen } from "./nova-screen"

export class PlayingScreen extends NovaScreen {
    protected screen: HTMLElement = document.getElementById('nova-ui__playing-screen')!

    private usernameText = document.getElementById('nova-ui__username-text')!

    enter() {
        this.usernameText.innerHTML = this.gameContext.username!

        const world = new World()
        this.gameContext.world = world

        world.createSystem(PhysicsSystem)
        world.createSystem(CircleRendererSystem)
        world.createSystem(InputSystem)
        world.createSystem(MoveSystem)
        // world.createSystem(ColliderRendererSystem)
        world.createSystem(NameplateRendererSystem)

        const player = world.createEntity()
        this.gameContext.playerEntityId = player.id
        world.addComponent(player, new Player())
        world.addComponent(player, new Connection(this.gameContext.username!))
        world.addComponent(player, new Transform(new Vector2(472, 262)))
        world.addComponent(player, new Circle(16, 'orange'))
        world.addComponent(player, new Collider(new Rectangle(32, 32)))
        world.addComponent(player, new Velocity())
        world.addComponent(player, new Nameplate('orange'))
    }

    exit() {
        this.usernameText.innerHTML = ''
        const world = this.gameContext.world!

        world.destroySystem(PhysicsSystem)
        world.destroySystem(CircleRendererSystem)
        world.destroySystem(InputSystem)
        world.destroySystem(MoveSystem)
        // world.destroySystem(ColliderRendererSystem)
        world.destroySystem(NameplateRendererSystem)


        world.destroyEntity(this.gameContext.playerEntityId!)
    }
}