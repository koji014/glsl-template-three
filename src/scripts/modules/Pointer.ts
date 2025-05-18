/** @format */

import * as THREE from 'three';
import Common from './Common';

class Pointer {
    pointerMoved: boolean;
    coords: THREE.Vector2;
    private prevCoords: THREE.Vector2;
    diff: THREE.Vector2;
    private timer: number | null;

    /**
     * @constructor
     */
    constructor() {
        this.pointerMoved = false;
        this.coords = new THREE.Vector2();
        this.prevCoords = new THREE.Vector2();
        this.diff = new THREE.Vector2(); // 座標の差分を格納
        this.timer = null; // タイマーID

        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
    }

    /**
     * # イベントリスナーの登録を行う
     */
    init() {
        document.body.addEventListener('pointermove', this.onPointerMove, false);
        document.body.addEventListener('pointerdown', this.onPointerDown, false);
    }

    /**
     * # 座標の設定を行う
     * @param {number} x - ポインタの x 座標
     * @param {number} y - ポインタの y 座標
     */
    setCoords(x: number, y: number) {
        if (this.timer) clearTimeout(this.timer);

        // ポインタ座標を設定
        const coordsX = (x / Common.width) * 2 - 1; // ポインタ座標を -1 ~ 1 に正規化
        const coordsY = -(y / Common.height) * 2 + 1; // y軸は正負を反転
        this.coords.set(coordsX, coordsY);

        // ポインタの操作フラグ
        this.pointerMoved = true;
        // 100ms 操作がない場合、停止と判断
        this.timer = setTimeout(() => {
            this.pointerMoved = false;
        }, 100);
    }

    /**
     * # ポインター操作時の処理
     * @param {PointerEvent} e - イベントオブジェクト
     */
    onPointerMove(e: PointerEvent) {
        // タッチ操作時の処理
        if (e.pointerType == 'touch' && e.isPrimary) {
            this.setCoords(e.pageX, e.pageY);
        }
        // マウス操作時の処理
        else {
            this.setCoords(e.clientX, e.clientY);
        }
    }

    /**
     * # タッチデバイス用の操作判定（画面をタッチした時の処理）
     * @param {PointerEvent} e - イベントオブジェクト
     */
    onPointerDown(e: PointerEvent) {
        if (e.pointerType !== 'touch' || !e.isPrimary) return;

        this.setCoords(e.pageX, e.pageY);
    }

    /**
     * # ポインタ座標の差分を更新
     */
    update() {
        this.diff.subVectors(this.coords, this.prevCoords);
        this.prevCoords.copy(this.coords);
    }
}

export default new Pointer();
