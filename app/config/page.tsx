'use client'
import React, {useState} from 'react';
import { useSpring, animated } from "react-spring"

function GradientShift(colorstart: string, colorend: string) {
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
        <stop style={{stopColor: colorstart}} offset='10%'  />
        <stop style={{stopColor:colorend}} offset='90%' />
    </animated.linearGradient>
)
}

export default function Config() {
    const [path, setPath] = useState<string>()
    const [colorStart, setColorStart] = useState<string>('')
    const [colorEnd, setColorEnd] = useState<string>('')

    const handlePath = () => {
        var pathInput = (document.getElementById('path') as HTMLInputElement).value
        var colorStart = (document.getElementById('colorStart') as HTMLInputElement).value
        var colorEnd = (document.getElementById('colorEnd') as HTMLInputElement).value

        setPath(pathInput)
        setColorStart(colorStart)
        setColorEnd(colorEnd)
    }

    const style = {
        label: 'inline align-middle text-left text-white drop-shadow-lg',
        input: 'border-2 border-black p-2 m-2 drop-shadow-lg rounded-lg',
        svg: {
            stroke: 'url(#gradient)',
            strokeWidth: 10,
            fill: 'none',
            strokeDashoffset: 0,
            strokeMiterlimit: 4,
            opacity: 1,
        }
    }

        return (
            <div>
                <form action={`./scenes/custom`} className='border-2 border-black mb-6 text-center bg-gray-500'>
                    <label htmlFor='path' className={style.label} >Shape property</label>
                    <input type='text' id='path' name='path' onChange={handlePath} className={style.input} />
                    <label htmlFor='colorStart' className={style.label} >Color A</label>
                    <input type='text' id='colorStart' name='colorStart' onChange={handlePath} className={style.input} />
                    <label htmlFor='colorEnd' className={style.label} >Color B</label>
                    <input type='text' id='colorEnd' name='colorEnd' onChange={handlePath} className={style.input} />
                    <button type='submit' className='block mx-auto my-3 text-white border-2 border-black bg-slate-400 rounded-full py-2 px-4 shadow-lg hover:border-slate-600 hover:border-2 hover:text-black'>Submit</button>
                </form>

                <div className=''>
                <svg  version="1.1" width="1280" height="720" viewBox="0 0 1920 1080" xmlSpace="preserve" className='m-auto border-2 border-black border-spacing-4'>
                <desc>overlay boxes</desc>
                <defs>
                    {GradientShift(colorStart, colorEnd)}
                </defs>
                <path d={path} style={style.svg}/>
                </svg>
                </div>
            </div>
        );
    };