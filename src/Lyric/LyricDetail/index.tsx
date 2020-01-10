import * as React from 'react';
import { ILyric, ISongs } from '../../index'
import './index.less'
import classnames from "classnames";
import Timeout = NodeJS.Timeout;

interface IProps {
    lyric: ILyric[]
    lyricIndex: number
    info: ISongs
    loading: boolean
    lyricPlaceholder: React.ReactElement | React.ReactNode | string
}

const { useEffect, useRef, useState } = React
let looseTimeout: Timeout
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

    const [ loose, setLoose ] = useState<boolean>(true)
    useEffect(() => {
        if (lyricEl.current && lyricBaseLineEl.current && lyricItemEl.current) {
            if (loose) {
                lyricEl.current.scrollTo(0, (lyricIndex + 1 + 0.5) * lyricItemEl.current.offsetHeight)
            }
        }
    }, [lyricIndex])

    const onLyricScroll = () => {
        clearTimeout(looseTimeout)
        setLoose(false)
        looseTimeout = setTimeout(() => {
            setLoose(true)
        }, 1000)


    }

    const content = lyric.length ?
        <ul className={'cool-lyric-content'} ref={lyricEl} onScroll={onLyricScroll}>
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
