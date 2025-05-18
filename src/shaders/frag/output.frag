precision mediump float;

uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uResolution;
varying vec2 vTexCoord;

void main() {
    gl_FragColor = vec4(vTexCoord, 1.0, 1.0);
}
