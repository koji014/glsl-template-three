/** @format */

import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import Common from './Common';

export type Options = Record<string, string | number | boolean | Color>;

type Color = {
    r: number;
    g: number;
    b: number;
};

export default class Gui {
    private readonly options?: Options;
    private readonly fps?: EssentialsPlugin.FpsGraphBladeApi;
    private readonly pane: Pane;

    /**
     * @constructor
     */
    constructor(options?: Options) {
        this.options = options;
        this.pane = new Pane();

        if (!this.options) return;

        this.pane.registerPlugin(EssentialsPlugin);

        this.pane.addBinding(this.options, 'timeScale', {
            min: 0.0,
            max: 2.0,
        }).on('change', (v) => {
            if (typeof v.value === 'number') {
                Common.timeScale = v.value;
            }
        });

        this.pane.addBinding(this.options, 'isHoge');

        this.fps = this.pane.addBlade({
            view: 'fpsgraph',
        }) as EssentialsPlugin.FpsGraphBladeApi;
    }

    /**
     * # FPSを更新する
     */
    private updateFps() {
        if (this.fps) {
            this.fps.begin();
            this.fps.end();
        }
    }

    /**
     * # rAF で実行する更新処理
     */
    update() {
        this.updateFps();
    }

    /**
     * # クリーンアップ処理
     */
    dispose() {
        this.pane.dispose();
    }
}
