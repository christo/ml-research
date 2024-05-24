/*
Adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
 */

type Hsl = { h: number, s: number, l: number };

/**
 * Convert rgb components in range 0-1 to hsl in range 0-360, 0-100, 0-100
 */
function rgbToHsl(r: number, g: number, b: number): Hsl {
    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin;
    let h = 0;

    if (delta === 0) {
        // RGB equal
        h = 0;
    } else if (cmax === r) {
        // Red is max
        h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
        // Green is max
        h = (b - r) / delta + 2;
    } else {
        // Blue is max
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60) % 360;

    let l = (cmax + cmin) / 2;
    l = +(l * 100).toFixed(1);

    let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);

    return {h, s, l};
}

/**
 * Format hsl as css expression
 */
function hslToCss(hsl: { s: number; h: number; l: number }) {
    return "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)";
}

/**
 * Convert components in range 0-255 to hsl object.
 */
function Rgb255Hsl(red: number, green: number, blue: number): Hsl {
    return rgbToHsl(red / 255, green / 255, blue / 255);
}