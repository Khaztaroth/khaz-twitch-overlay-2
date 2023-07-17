import React from "react"
import {useSpring, animated} from '@react-spring/web'
import instructions from "./instructions"

var params: URLSearchParams 
if (typeof window !== 'undefined') {
    params = new URLSearchParams(window.location.search)
}

function GradientShift() {
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
        <stop style={{stopColor: params?.get('colorStart') || 'rgb(0,0,0)'}} offset='10%'  />
        <stop style={{stopColor: params?.get('colorEnd') || 'rgb(150,150,150)'}} offset='90%' />
    </animated.linearGradient>
)
}

export function CustomRectangles() {

    const style = {
        stroke: 'url(#gradient)',
        strokeWidth: 10,
        fill: 'none',
        strokeDashoffset: 0,
        strokeMiterlimit: 4,
        opacity: 1,
    }

const customPath = params?.get('path')

return (
    <svg  version="1.1" width="1920" height="1080" viewBox="0 0 1920 1080" xmlSpace="preserve">
    <desc>overlay boxes</desc>
    <defs>
        {GradientShift()}
    </defs>
    {(customPath === null)? instructions() : <path d={customPath} style={style}/>}
    </svg>
)
}
