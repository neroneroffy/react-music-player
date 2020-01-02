import * as React from 'react';
import { ILyric } from '../../index'
import './index.less'
interface IProps {
    lyric: ILyric[]
    lyricIndex: number
}
const { useEffect, useState, useRef } = React

const LyricMini = (props: IProps) => {
    const { lyric, lyricIndex } = props
    const [ currentLyric, setCurrentLyric ] = useState<string>('')
    const lyricEl = useRef(null)
    useEffect(() => {
        setCurrentLyric('')
        lyricEl.current.style.marginTop = -18
        if (lyric.length && lyric[lyricIndex]) {
            setCurrentLyric(lyric[lyricIndex].lyric)
        }
    }, [lyricIndex])

    return <div className={'cool-lyric-mini'}>
        <div ref={lyricEl} className={'cool-lyric-mini-content'}>
            { currentLyric }
        </div>
    </div>
}

export default LyricMini