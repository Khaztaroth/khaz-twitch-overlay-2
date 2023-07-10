import NodeCache from "node-cache";

const cache = new NodeCache
var convert = require('color-convert') // eslint-disable-line global-require //
var randomColor = require('randomcolor') // eslint-disable-line global-require //

export function ColorCorrection (color: string, user: string) {
    const userColor = cache.get(user);
    
    
    var workingColor: string | {}
    
    if (!color && !userColor) {
        const newColor = randomColor()
        cache.set(user, newColor)
        workingColor = newColor
    } else {
        workingColor = userColor || color
    }
    
    const hsv = convert.hex.hsv(workingColor);
    
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