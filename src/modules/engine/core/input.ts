export class Input {
    static keyState: { [key: string]: boolean } = {}

    static initialize() {
        window.addEventListener('keydown', (event) => {
            Input.keyState[event.key] = true
        })

        window.addEventListener('keyup', (event) => {
            Input.keyState[event.key] = false
        })

        window.addEventListener('blur', (event) => {
            Input.keyState = {}
        })
    }

    static getKeyDown(key: string): boolean {
        return Input.keyState[key] || false
    }

    static getKeyUp(key: string): boolean {
        // Add logic to track key releases if needed
        // You can use a combination of keydown and keyup events to track this.
        // For simplicity, we'll just use the keyState directly here.
        return !Input.keyState[key] || false
    }
}