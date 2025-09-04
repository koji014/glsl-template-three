/** @format */

import * as THREE from 'three';
import Common from './Common';
import Pointer from './Pointer';
import Gui, { type Options } from './Gui';
import base_vert from '../../shaders/vert/base.vert';
import output_frag from '../../shaders/frag/output.frag';

export default class Output {
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private readonly uniforms: THREE.ShaderMaterialParameters['uniforms'];
    private readonly options: Options;
    private readonly gui: Gui;

    static CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 50,
        position: new THREE.Vector3(0.0, 0.0, 10.0),
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    };

    /**
     * @constructor
     */
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            Output.CAMERA_PARAM.fovy,
            Output.CAMERA_PARAM.aspect,
            Output.CAMERA_PARAM.near,
            Output.CAMERA_PARAM.far
        );

        this.uniforms = {
            uTime: { value: Common.time },
            uResolution: {
                value: new THREE.Vector2(Common.width, Common.height),
            },
            uPointer: { value: Pointer.coords },
        };

        this.options = {
            timeScale: Common.timeScale,
            isHoge: false,
        };
        this.gui = new Gui(this.options);
    }

    /**
     * # 初期化処理
     */
    init() {
        // Camera
        this.camera.position.copy(Output.CAMERA_PARAM.position);
        this.camera.lookAt(Output.CAMERA_PARAM.lookAt);

        // Mesh
        const planeGeometry = new THREE.PlaneGeometry(2.0, 2.0);
        const planeMaterial = new THREE.RawShaderMaterial({
            vertexShader: base_vert,
            fragmentShader: output_frag,
            wireframe: false,
            uniforms: this.uniforms,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.scene.add(plane);
    }

    /**
     * #リサイズ処理
     */
    resize() {
        this.camera.aspect = Common.aspect;
        this.camera.updateProjectionMatrix();
        if (this.uniforms) {
            this.uniforms.uResolution.value.set(Common.width, Common.height);
        }
    }

    /**
     * #最終出力シーンの描画
     */
    private render() {
        if (this.uniforms) {
            this.uniforms.uTime.value = Common.time;
        }
        Common.renderer.render(this.scene, this.camera);
    }

    /**
     * # rAF で実行する更新処理
     */
    update() {
        this.render();
        this.gui.update();
    }
}
