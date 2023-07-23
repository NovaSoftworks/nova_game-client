import { Time } from './time.js';

export class Metrics {
    static interval

    static displayInDom(elementId) {
        document.getElementById(elementId).innerHTML = `<ul><li>fps: ${Math.round(1 / Time.deltaTime)}</li><li>ms: ${Time.deltaTime * 1000}</li></ul>`;
    }

    static show() {
        Metrics.interval = setInterval(() => {
            Metrics.displayInDom("metrics")
        }, 5000)
    }

    static hide() {
        clearInterval(Metrics.interval)
    }
}