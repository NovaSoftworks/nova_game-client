export class Rendering {
    static canvas;
    static ctx;

    static setCanvas(canvasElement) {
        Rendering.canvas = canvasElement;
        Rendering.ctx = canvasElement.getContext('2d');
    }

    static clearCanvas() {
        Rendering.ctx.fillStyle = "#202027";
        Rendering.ctx.fillRect(0, 0, Rendering.canvas.width, Rendering.canvas.height);
    }
}
