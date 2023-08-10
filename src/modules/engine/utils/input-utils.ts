export class InputUtils {
    static keyState: { [key: string]: boolean } = {}

    static initialize() {
        window.addEventListener('keydown', (event) => {
            InputUtils.keyState[event.key] = true
        })

        window.addEventListener('keyup', (event) => {
            InputUtils.keyState[event.key] = false
        })

        window.addEventListener('blur', (event) => {
            InputUtils.keyState = {}
        })
    }

    static getKeyDown(key: string): boolean {
        return InputUtils.keyState[key] || false
    }

    static getKeyUp(key: string): boolean {
        // Add logic to track key releases if needed
        // You can use a combination of keydown and keyup events to track this.
        // For simplicity, we'll just use the keyState directly here.
        return !InputUtils.keyState[key] || false
    }
}
