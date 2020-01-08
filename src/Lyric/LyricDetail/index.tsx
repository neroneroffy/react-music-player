import * as React from 'react';
import { ILyric, ISongs } from '../../index'
import './index.less'
import classnames from "classnames";

interface IProps {
    lyric: ILyric[]
    lyricIndex: number
    info: ISongs
    loading: boolean
    lyricPlaceholder: React.ReactElement | React.ReactNode | string
}

const { useEffect, useRef } = React

const LyricDetail = (props: IProps) => {
    const { lyric,
        lyricIndex,
        info: { artist, name },
        loading,
        lyricPlaceholder =  '纯音乐，请欣赏',
    } = props
    const lyricEl = useRef(null)
    const lyricBaseLineEl = useRef(null)
    const lyricItemEl = useRef(null)
    useEffect(() => {
        if (lyricEl.current && lyricBaseLineEl.current && lyricItemEl.current) {
            const scrollUnit = lyricEl.current.scrollHeight / lyric.length
            lyricEl.current.scrollTo(0, (lyricIndex + 1 + 0.5) * lyricItemEl.current.offsetHeight)
        }
    }, [lyricIndex])

    const content = lyric.length ?
        <ul className={'cool-lyric-content'} ref={lyricEl}>
            <li className={'lyric-item'} ref={lyricItemEl}></li>
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
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
            <li className={'lyric-item'}></li>
        </ul>
        :
        <div className={'cool-lyric-center-wrapper'}>
            <span className={'cool-lyric-center'}>{ lyricPlaceholder }</span>
        </div>
    return <div className={'cool-lyric-detail'}>
        <div className={'cool-lyric-base-line-wrapper'} ref={lyricBaseLineEl}>
            <div className="cool-lyric-base-line"></div>
        </div>
        {
            loading ?
                <div className={'cool-lyric-center-wrapper'}>
                    <span className={'cool-lyric-center'}>loading...</span>
                </div>
                :
                content
        }
    </div>
}

export default LyricDetail
