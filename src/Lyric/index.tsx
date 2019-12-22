import * as React from 'react';
import { ILyric, ISongs } from '../index'
import classnames from 'classnames'
import './index.less'
interface IProps {
    lyric: ILyric[],
    lyricIndex: number,
    info: ISongs
}

const { useEffect, useRef } = React

const CoolLyric = (props: IProps) => {
    const { lyric, lyricIndex, info: { artist, name } } = props
    const lyricEl = useRef(null)
    useEffect(() => {
        const scrollUnit = lyricEl.current.scrollHeight / lyric.length
        lyricEl.current.scrollTo(0, lyricIndex * scrollUnit - lyricIndex * 1)
    }, [lyricIndex])
    return <div className={'cool-lyric'}>
        <h4>{name} ({artist})</h4>
        <div className='cool-lyric-cover'></div>
        <ul className={'cool-lyric-content'} ref={lyricEl}>
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
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
        </ul>
    </div>
}
export default CoolLyric
