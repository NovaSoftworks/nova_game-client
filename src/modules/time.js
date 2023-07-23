export class Time {
    static previousFrameTime = performance.now()

    /**
     * The interval in seconds between the last frame and the current frame.
     */
    static deltaTime = 0 // s

    /**
     * Calculates the current deltaTime.
     */
    static calculateDeltaTime() {
        const currentFrameTime = performance.now()
        Time.deltaTime = (currentFrameTime - Time.previousFrameTime) / 1000
        Time.previousFrameTime = currentFrameTime
    }
}
