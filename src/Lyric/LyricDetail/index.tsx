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
    lyricFullScreen: boolean
    lyricPlaceholder: React.ReactElement | React.ReactNode | string
    onSetProgressWithScroll: (time: number) => void
}

const { useEffect, useRef, useState } = React
let looseTimeout: Timeout
let baseLineTimeout: Timeout
const LyricDetail = (props: IProps) => {
    const { lyric,
        lyricIndex,
        info: { artist, name },
        loading,
        lyricPlaceholder =  '纯音乐，请欣赏',
        lyricFullScreen,
        onSetProgressWithScroll,
    } = props
    const lyricEl = useRef(null)
    const lyricBaseLineEl = useRef(null)
    const lyricItemEl = useRef(null)
    const [ loose, setLoose ] = useState<boolean>(true)
    const [ baseLineVisible, setBaseLineVisible ] = useState<boolean>(false)
    const [ scrolledTime, setScrolledTime ] = useState<number | string>(0)
    const [ lyricIndexStandby, setLyricIndexStandby ] = useState<number>(-1)
    useEffect(() => {
        if (lyricEl.current && lyricBaseLineEl.current && lyricItemEl.current) {
            if (loose) {
                lyricEl.current.scrollTo(0, (lyricIndex + 1 + 0.5) * lyricItemEl.current.offsetHeight)
            }
        }
    }, [lyricIndex])

    const onLyricScroll = () => {
        clearTimeout(looseTimeout)
        clearTimeout(baseLineTimeout)
        setLoose(false)
        looseTimeout = setTimeout(() => {
            setLoose(true)
        }, 500)
        baseLineTimeout = setTimeout(() => {
            setBaseLineVisible(false)
            setLyricIndexStandby(-1)
        }, 1500)
        const currentLyricIndex = (lyricEl.current.scrollTop / lyricItemEl.current.offsetHeight) - 1.5
        const currentLyric: ILyric = lyric[ Math.ceil(currentLyricIndex) ]
        if (currentLyricIndex >= 0 || currentLyricIndex <= lyric.length) {
            if (currentLyric) {
                if (baseLineVisible && lyricFullScreen) {
                    const scrolledLyricIndex = lyric.findIndex(item => {
                        return item.time === currentLyric.time
                    })
                    setLyricIndexStandby(scrolledLyricIndex)
                }
                setScrolledTime(currentLyric.time)
            }
        }
    }

    const getTime = (musicTime: number) => {
        let time
        if (musicTime) {
            if (musicTime < 60) {
                time = `00:${musicTime < 10 ? `0${musicTime}` : musicTime}`
            } else {
                time = `${ parseInt(`${musicTime / 60}`, 0) < 10 ?
                    `0${parseInt(`${musicTime / 60}`, 0)}`
                    :
                        parseInt(`${musicTime / 60}`, 0)}:${musicTime % 60 < 10 ?
                        `0${musicTime % 60}`
                        :
                        musicTime % 60}`
            }
            return time.split('.')[0]

        } else {
            return `00:00`
        }
    }

    const playFromThisPoint = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (baseLineVisible) {
            setBaseLineVisible(false)
            onSetProgressWithScroll(Number(scrolledTime))
        }
    }

    const onTouchMove = () => {
        if (lyricFullScreen) {
            setBaseLineVisible(true)
        }
    }
    const content = lyric.length ?
        <ul
            className={ classnames('cool-lyric-content', {
            'cool-lyric-content-full-screen': lyricFullScreen
        }) }
            ref={lyricEl}
            onScroll={onLyricScroll}
            onTouchMove={onTouchMove}
        >
            <li className={'lyric-item'} ref={lyricItemEl}></li>
            {
                lyric.map((v, i) => {
                    return <li
                        key={v.time}
                        className={classnames('lyric-item', {
                            ['current-lyric']: i === lyricIndex,
                            ['current-lyric-standby']: i === lyricIndexStandby,
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
        </ul>
        :
        <div
            className={'cool-lyric-center-wrapper'}

        >
            <span className={'cool-lyric-center'}>{ lyricPlaceholder }</span>
        </div>
    console.log(baseLineVisible);
    return <div className={ classnames('cool-lyric-detail', {
        'cool-lyric-detail-full-screen': lyricFullScreen
    }) }>
        <div
            className={classnames('cool-lyric-base-line-wrapper', {
                'cool-lyric-base-line-wrapper-show': baseLineVisible && lyricFullScreen
            })}
            ref={lyricBaseLineEl}
        >
            <div className='cool-lyric-scrolled-time'>
                { getTime(Number(scrolledTime)) }
            </div>
            <div className='cool-lyric-base-line'></div>
            <div
                className='cool-lyric-scrolled-play'
                onClick={playFromThisPoint}
            >
                <svg
                    className="icon-play"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12608"
                >
                    <path
                        d="M844.704269 475.730473L222.284513 116.380385a43.342807 43.342807 0 0 0-65.025048 37.548353v718.692951a43.335582 43.335582 0 0 0 65.025048 37.541128l622.412531-359.342864a43.357257 43.357257 0 0 0 0.007225-75.08948z"
                        fill="" p-id="12609"/>
                </svg>

            </div>
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
