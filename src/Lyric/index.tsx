import * as React from 'react';
import { ILyric } from '../index'
import classnames from 'classnames'
import './index.less'
interface IProps {
    lyric: ILyric[],
    lyricIndex: number
}

const { useEffect, useState, useRef } = React

const CoolLyric = (props: IProps) => {
    const { lyric, lyricIndex } = props
    const lyricEl = useRef(null)
    const [scrolledHeight, setScrolledHeight] = useState<number>(0)
    useEffect(() => {
        // const currentIndex = lyric.filter(item => item.current)
        const scrollUnit = lyricEl.current.scrollHeight / lyric.length
        setScrolledHeight(lyricIndex * scrollUnit + 16)
        lyricEl.current.scrollTop = scrolledHeight
    }, [lyricIndex])
    return <ul className={'cool-lyric'} ref={lyricEl}>
        <li className={'lyric-item'}></li>
        <li className={'lyric-item'}></li>
        <li className={'lyric-item'}></li>
        <li className={'lyric-item'}></li>
        <li className={'lyric-item'}></li>
        <li className={'lyric-item'}></li>
        {
            lyric.map((v, i) => {
                return <li
                    key={v.time}
                    className={classnames('lyric-item', {
                        ['current-lyric']: i === lyricIndex,
                    })}
                >{v.lyric}</li>
            })
        }
    </ul>
}
export default CoolLyric
