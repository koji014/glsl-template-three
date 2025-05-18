/** @format */

export class Device {
    /**
     * モバイル端末 判定
     * @return {boolean}
     */
    static isMobile = (): boolean => {
        return /iPhone|Android/i.test(navigator.userAgent);
    };

    /**
     * iPad 判定
     * @return {boolean}
     */
    static isIpad = (): boolean => {
        const ua = window.navigator.userAgent.toLowerCase();
        return (
            ua.indexOf('ipad') > -1 || (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
        );
    };
}
