export function ColorCorrection (color: string) {
    const convert = require('color-convert')
    let ogColor = color;

    const hsv = convert.hex.hsv(ogColor);

    const useAdjustedColor = () => {
        const h = hsv[0]
        const s = hsv[1]
        const v = hsv[2]

        const maxValue = Math.min( 70, s);
        
        let correctedColor = [h,maxValue,v]

        return correctedColor
    }

    const adjustedColor = useAdjustedColor()
    const adjustedColorToHex = "#" + convert.hsv.hex(adjustedColor)

    return adjustedColorToHex
}