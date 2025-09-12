/** @format */

import ThreeApp from './modules/ThreeApp';

window.addEventListener(
    'DOMContentLoaded',
    () => {
        const wrapper = document.querySelector<HTMLElement>('#webgl');

        if (!wrapper) {
            console.error('Failed to find a valid element with the ID "webgl".');
            return;
        }

        const app = new ThreeApp(wrapper);
        app.init();
        app.setup();
        app.render();
    },
    false
);
