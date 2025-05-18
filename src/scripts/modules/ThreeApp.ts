/** @format */

import Common from './Common';
import Pointer from './Pointer';
import Output from './Output';

export default class ThreeApp {
    private readonly output: Output;
    private readonly wrapper: HTMLElement;

    /**
     * @constructor
     * @param {HTMLElement} wrapper
     */
    constructor(wrapper: HTMLElement) {
        this.wrapper = wrapper;
        this.output = new Output();

        this.resize = this.resize.bind(this);
        this.render = this.render.bind(this);

        window.addEventListener('resize', this.resize);
    }

    /**
     * # 初期化処理
     */
    init() {
        Common.init();
        Pointer.init();
        this.output.init();
    }

    /**
     * # レンダリングを開始する前のセットアップを行う
     */
    setup() {
        this.wrapper.appendChild(Common.renderer.domElement);
        this.resize();
        Common.clock.start();
    }

    /**
     * # 描画処理
     */
    render() {
        requestAnimationFrame(this.render);

        Common.update();
        this.output.update();
    }

    /**
     * # リサイズ処理
     */
    private resize() {
        Common.resize();
        this.output.resize();
    }
}
