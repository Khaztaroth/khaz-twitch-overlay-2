import React from "react"
import {useSpring, animated} from '@react-spring/web'

type Colors = {
    colorstart: string,
    colorend: string
}

function GradientShift(colorStart: string, colorEnd: string) {
    const gradient1 = useSpring({
            loop: {reverse: true},
            from: {stopColor: colorStart || 'rgb(169, 91, 234)'},
            to: {stopColor: colorEnd || 'rgb(244, 177, 79)'},
            config: {
                mass: 1,
                friction: 10,
                duration: 7200
            }
    })
    const gradient2 = useSpring({
            loop: {reverse: true},
            from: {stopColor: colorEnd || 'rgb(244, 177, 79)'},
            to: {stopColor: colorStart || 'rgb(169, 91, 234)'},
            config: {
                mass: 1,
                friction: 10,
                duration: 7200
            }
    })
    
return (
    <linearGradient id="gradient">
        <animated.stop style={gradient1} offset='10%' x1={100} y1={0} x2={0} y2={100}></animated.stop>
        <animated.stop style={gradient2} offset='90%' x1={0} y1={100} x2={100} y2={0}></animated.stop>
    </linearGradient>
)
}

export function GameRectangles(props: Colors) {

    const style = {
        stroke: 'url(#gradient)' || 'rgb(127,0,255)',
        strokeWidth: 10,
        fill: 'none',
        strokeDashoffset: 0,
        strokeMiterlimit: 4,
        opacity: 1,
    }

return (
    <svg  version="1.1" width="1920" height="1080" viewBox="0 0 1920 1080" xmlSpace="preserve">
    <desc>overlay boxes</desc>
    <defs>
        {GradientShift(props.colorstart, props.colorend)}
    </defs>
    <path d="M0,0L0,1080L1920,1080L1920,0L0,0ZM320,0L320,1080M320,900L1920,900M320,760L0,760" style={style}/>
    </svg>
)
}
