export class Time {
    static previousFrameTime: number = performance.now()

    /**
     * The interval in seconds between the last frame and the current frame.
     */
    static deltaTime: number = 0 // s

    /**
     * Calculates the current deltaTime.
     */
    static calculateDeltaTime() {
        const currentFrameTime = performance.now()
        Time.deltaTime = (currentFrameTime - Time.previousFrameTime) / 1000
        Time.previousFrameTime = currentFrameTime
    }
}
