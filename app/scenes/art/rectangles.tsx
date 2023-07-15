import React from "react"
import {useSpring, animated} from '@react-spring/web'

type Colors = {
    colorstart: string,
    colorend: string
}

function GradientShift(colorStart: string, colorEnd: string) {
    const gradientMove = useSpring({
        loop: true,
        from: {gradientTransform: 'rotate(0 0.5 0.5)'},
        to: {gradientTransform: 'rotate(360 0.5 0.5)'},
        config: {
            duration: 1000*15,
        }
    })
    
return (
    <animated.linearGradient id="gradient" {...gradientMove}>
        <stop style={{stopColor: 'rgb(244, 177, 79)'}} offset='10%'  />
        <stop style={{stopColor: 'rgb(169, 91, 234)'}} offset='90%' />
    </animated.linearGradient>
)
}

export function ArtRectangles(props: Colors) {

    const style = {
        stroke: 'url(#gradient)',
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
    <path d="M0,0L0,1080L1920,1080L1920,0L0,0ZM320,0L320,1080M320,760L0,760" style={style}/>
    </svg>
)
}
