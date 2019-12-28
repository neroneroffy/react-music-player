import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.less'
import Timeout = NodeJS.Timeout;
import { getLyric } from './utils'
import CoolLyric from './Lyric'
import classnames from 'classnames'
const { useState, useRef, useEffect } = React
let rotateTimer: Timeout
export interface ISongs {
    src: string
    artist: string
    name: string
    img: string
    id: string
    lyric?: string
}
export interface ILyric {
    time: number | string
    lyric: string
}

interface IProps {
    onDelete?: (index: number, id: string) => void
    data: ISongs[]
    zIndex?: number
    onLyricMatched?: (lyric: ILyric[], currentIndex: number) => void
    showLyric?: boolean
    onMusicChange?: (id: string) => void
    lyric?: string
    lyricLoading?: boolean
    lyricPlaceholder?: React.ReactNode | string
    avatarPlaceholder?: React.ReactNode
    musicActions?: Array<(data: ISongs, active?: boolean) => React.ReactNode>
    playListHeader? : {
        headerLeft?: React.ReactNode | string,
        headerRight?: React.ReactNode | string,

    }
}
const CoolPlayer = (props: IProps) => {
    const { data } = props
    const initialMusic = {
        src: '',
        artist: '',
        name: '',
        img: '',
        id: '',
    }
    const audioEl = useRef(null)
    const musicAvatarEl = useRef(null)
    const bufferedEl = useRef(null)
    const playedEl = useRef(null)
    const progressEl = useRef(null)
    const totalVolumeEl = useRef(null)
    const volumeProgressEl = useRef(null)
    const coolPlayerEl = useRef(null)
    const musicBoxEl = useRef(null)
    const playListEl = useRef(null)
    const coolPlayListWrapper = useRef(null)
    const playControlEl = useRef(null)
    const [ isPaused, setPaused ] = useState<boolean>(true);
    const [ totalTime, setTotalTime ] = useState<number | string>(0);
    const [ playedLeft, setPlayedLeft ] = useState<number>(0);
    const [ volumnLeft, setVolumnLeft ] = useState<number>(0);
    const [ remainTime, setRemainTime ] = useState<number | string>(0);
    const [ angle, setAngle ] = useState<number>(0);
    const [ mouseDown, setMouseDown ] = useState<boolean>(false);
    const [ musicListShow, setMusicListShow ] = useState<boolean>(false);
    const [ currentMusic, setCurrentMusic ] = useState<ISongs>(data[0] || initialMusic);
    const [ isPlayed, setIsPlayed ] = useState<boolean>(false);
    const [ lyric, setLyric ] = useState<ILyric[]>([]);
    const [ lyricIndex, setLyricIndex ] = useState<number>(-1);
    const { showLyric = true,
        lyric: lyricFromProps = '',
        lyricLoading = false,
        lyricPlaceholder,
        avatarPlaceholder = null,
        musicActions = [],
        playListHeader = {
            headerLeft: '播放列表',
            headerRight: '',
        }
    } = props
    let lyricList: ILyric[] = getLyric(currentMusic.lyric || lyricFromProps)
    let indexArr: number[] = []

    useEffect(() => {
        if (data.length) {
            props.onMusicChange(currentMusic.id)
        }
    }, [currentMusic])

    useEffect(() => {
        const { zIndex = 1000 } = props
        coolPlayerEl.current.style.zIndex = zIndex
        musicBoxEl.current.style.zIndex = zIndex + 100
        playControlEl.current.style.zIndex = zIndex + 200
        coolPlayListWrapper.current.style.zIndex = zIndex - 100
        progressEl.current.style.zIndex = zIndex + 200
        playedEl.current.style.zIndex = zIndex + 300
    }, [])

    useEffect(() => {
        setCurrentMusic(data[0] || initialMusic)
        audioEl.current.addEventListener('canplay', setInitialTotalTime)
        // 设置初始音量
        volumeProgressEl.current.style.width = '50%';
        audioEl.current.volume = 0.5
        return () => {
            audioEl.current.removeEventListener('canplay', setInitialTotalTime)
            audioEl.current.removeEventListener('timeupdate', setProgress)
        }
    }, [])

    useEffect(() => {
        if (!isPaused) {
            clearInterval(rotateTimer)
            rotateTimer = setInterval(() => {
                setAngle(angle + 1)
                musicAvatarEl.current.style.transform = `rotate(${angle}deg)`;
            }, 33)
        }
        return () => {
            clearInterval(rotateTimer)
        }
    }, [angle, isPaused])

    useEffect(() => {
        const audio = audioEl.current
        if (!isPaused) {
            audio.play()
        } else {
            audio.pause()
        }
        audio.addEventListener('timeupdate', setProgress);
    }, [isPaused, currentMusic])

    useEffect(() => {
        const audio = audioEl.current
        lyricList = getLyric(currentMusic.lyric || lyricFromProps)
        indexArr = []
        setLyric(lyricList)
        audio.addEventListener('timeupdate', setLyricHighLight)
        return () => {
            audioEl.current.removeEventListener('timeupdate', setLyricHighLight)
        }
    }, [currentMusic, lyricFromProps])
    const setInitialTotalTime = () => {
        // 获取总时间
        const musicTotalTime = parseInt(audioEl.current.duration, 0);
        setTotalTime(getTime(musicTotalTime))
        setRemainTime(getTime(musicTotalTime))
        setPlayedLeft(playedEl.current.getBoundingClientRect().left)
        setVolumnLeft(totalVolumeEl.current.getBoundingClientRect().left)
    }
    const setLyricHighLight = () => {
        const current = audioEl.current.currentTime
        if (currentMusic.lyric || lyricFromProps) {
            lyricList.map((item, index) => {
                if (item && lyricList[index - 1]) {
                    if (current >= item.time) {
                        indexArr.push(index)
                        props.onLyricMatched(lyricList, indexArr[indexArr.length - 1])
                    }
                }
            })
            setLyricIndex(indexArr[indexArr.length - 1])
        }
    }
    const setProgress = () => {
        // 设置播放进度条
        const playPer = audioEl.current.currentTime / audioEl.current.duration;
        playedEl.current.style.width = playPer * 100 + '%';
        // 设置缓冲进度条
        const timeRages = audioEl.current.buffered;
        let bufferedTime = 0
        if (timeRages.length !== 0) {
            bufferedTime = timeRages.end(timeRages.length - 1);
        }
        const bufferedPer = bufferedTime / audioEl.current.duration;
        bufferedEl.current.style.width = bufferedPer * 100 + '%';
        // 设置剩余时间
        const musicRemainTime = parseInt(`${audioEl.current.duration - audioEl.current.currentTime}`, 0);
        setRemainTime(getTime(musicRemainTime))
        if (audioEl.current.ended) {
            next()
        }

    }
    const play = () => {
        if (!data.length) { return }
        setPaused(false)
        setIsPlayed(true)
    }
    const pause = () => {
        setPaused(true)
    }
    const last = () => {
        setAngle(0)
        setLyricIndex(-1)
        if (!currentMusic.src) {
            return
        }
        let current

        current = data.findIndex(item => item.src === currentMusic.src)
        if ( current > 0 ) {
            setCurrentMusic(data[current - 1])
        } else {
            setCurrentMusic(data[data.length - 1])
        }
    }
    const next = () => {
        setAngle(0)
        setLyricIndex(-1)
        if (!currentMusic.src) {
            return
        }
        let current
        current = data.findIndex(item => item.id === currentMusic.id)
        if (current < data.length - 1) {
            setCurrentMusic(data[current + 1])
        } else {
            setCurrentMusic(data[0])
        }
    }
    // PC端设置进度条
    const setTimeOnPc = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const audio = audioEl.current;
        if (audio.currentTime !== 0) {
            const newWidth = (e.pageX - playedLeft) / progressEl.current.offsetWidth;
            playedEl.current.style.width = newWidth * 100 + '%';
            audio.currentTime = newWidth * audio.duration;
            setLyricHighLight()
        }
    }
    const setTime = (e: React.TouchEvent<HTMLDivElement>) => {
        const audio = audioEl.current
        const newWidth = (e.touches[0].pageX - playedLeft) / progressEl.current.offsetWidth;
        playedEl.current.style.width = newWidth * 100 + '%';
        audio.currentTime = newWidth * audio.duration

    }

    // PC端点击事件
    const clickChangeTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!e.pageX) {
            return
        }
        setTimeOnPc(e)
    }
    // PC端拖动进度条
    const onMouseDown = () => {
        setMouseDown(true)
    }
    const slideChangeTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (mouseDown) {
            setTimeOnPc(e)
        }
    }
    const onMouseUp = () => {
        setMouseDown(false)
    }
    const onTouchTimeChangeStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (audioEl.current.currentTime !== 0) {
            setTime(e)
        }
    }
    const onTouchMoveProgress = (e: React.TouchEvent<HTMLDivElement>) => {
        const audio = audioEl.current;
        if (audio.currentTime !== 0) {
            setTime(e)
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
            return time

        } else {
            return `00:00`
        }
    }
    const setVolume = (pageX: number) => {
        const audio = audioEl.current
        const volumeRate = (pageX - volumnLeft) / totalVolumeEl.current.offsetWidth;
        if (volumeRate > 0.01 && volumeRate <= 1) {
            audio.volume = volumeRate
            volumeProgressEl.current.style.width = volumeRate * 100 + '%';
        } else if (volumeRate <= 0.01) {
            audio.volume = 0
        } else {
            audio.volume = 1
        }
    }
    const startMoveVolume = (e: React.TouchEvent<HTMLDivElement>) => {
        if (audioEl.current.currentTime !== 0) {
            setVolume(e.touches[0].pageX)
        }
    }
    const moveVolume = (e: React.TouchEvent<HTMLDivElement>) => {
        if (audioEl.current.currentTime !== 0) {
            setVolume(e.touches[0].pageX)
        }
    }
    // PC端改变音量
    const clickChangeVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setVolume(e.pageX)
    }
    const mouseDownVulume = () => {
        setMouseDown(true)
    }
    const slideChangeVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (mouseDown) {
            setVolume(e.pageX)
        }
    }
    const mouseUpVolume = () => {
        setMouseDown(false)
    }
    const mouseLeave = () => {
        setMouseDown(false)
    }
    // 展开播放列表
    const showMusicList = () => {
        setMusicListShow(!musicListShow)
    }
    const playThis = (i: number) => {
        setCurrentMusic(data[i])
        play()
    }
    const delMusic = (i: number, id: string) => {
        const audio = audioEl.current
        if (data[i].src === currentMusic.src) {
            if (i <= data.length - 1 && data[i + 1]) {
                setCurrentMusic(data[i + 1])
            } else if (!data[i + 1] && data[i - 1]) {
                // 删除的是最后一首
                clearInterval(rotateTimer);
                setCurrentMusic(data[0])
            } else {
                // 都删除完了
                clearInterval(rotateTimer);
                audio.currentTime = 0;
                bufferedEl.current.style.width = 0;
                playedEl.current.style.width = 0;
                const invalidCurrent = {
                        src: '',
                        artist: '',
                        name: '',
                        img: '',
                        id: '',
                }
                setCurrentMusic(invalidCurrent)
                setIsPlayed(false)
                setMusicListShow(false)
            }
        }
        props.onDelete(i, id)
    }
    return <div id={'cool-player'} ref={coolPlayerEl}>
        <div className='cool-player-wrapper'>
            <div className='cool-player-inner' >
                <div className='cool-player-control' ref={playControlEl}>
                    <i className='icon-last' onClick={last}/>
                    {
                        !isPaused && currentMusic.src ?
                            <i className='icon-pause' onClick={pause}/>
                            :
                            <i className='icon-play' onClick={play}/>
                    }
                    <i className='icon-next' onClick={next}/>
                </div>
                <div className='cool-player-box' ref={musicBoxEl}>
                    <div className='picture'>
                        {
                            currentMusic.src ?
                                <img src={currentMusic.img} ref={musicAvatarEl} alt='image is lost'/>
                                :
                                avatarPlaceholder
                        }

                    </div>
                    <div className='music-info'>
                        <div className='music-name'>
                            {
                                currentMusic.src && (`${currentMusic.artist}：${currentMusic.name}`)
                            }
                        </div>
                        <div
                            className='progress-wrapper'
                            ref={progressEl}
                            onTouchMove={onTouchMoveProgress}
                            onTouchStart={onTouchTimeChangeStart}
                            onClick={clickChangeTime}
                            onMouseDown={onMouseDown}
                            onMouseMove={slideChangeTime}
                            onMouseUp={onMouseUp}
                            onMouseLeave={mouseLeave}
                        >
                            <div className='progress' >
                                <div className='progress-buffered' ref={ bufferedEl }></div>
                                <div className='progress-played' ref={ playedEl }></div>
                            </div>

                        </div>
                        <div className='time'>
                            <div className='total-time'>{ currentMusic.src ? totalTime : '00:00'}</div>
                            <span>/</span>
                            <div className='remain-time'>{ currentMusic.src ? remainTime : '00:00'}</div>
                        </div>
                    </div>
                    <div className='cool-player-list-btn'>
                        <i className='icon-menu' onClick={showMusicList}/>
                    </div>
                </div>
                <div className='cool-player-list-wrapper' ref={coolPlayListWrapper}>
                    <ReactCSSTransitionGroup
                        transitionName='cool-player-list-show'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        {
                            musicListShow ?
                                <div className='cool-player-list-lyric' ref={playListEl}>
                                    <div className={'cool-player-list-component'}>
                                        <div className='cool-player-list-title'>
                                            <div className='cool-player-list-title-left'>
                                                { playListHeader.headerLeft }
                                            </div>
                                            <div className='cool-player-list-title-left'>
                                                { playListHeader.headerRight }
                                            </div>

                                        </div>
                                        <div className='single-music-wrapper'>
                                            {
                                                data.map((v, i) => {
                                                    return (
                                                        <div
                                                            className='single-music'
                                                            style={ currentMusic.src === v .src && isPlayed ?
                                                                { background: '#33beff', color: '#fff' }
                                                                :
                                                                null}
                                                            key={v.id}
                                                        >
                                                            <div className={'single-music-left'}>
                                                                <div className='single-music-play'>
                                                                    <i
                                                                        className={
                                                                            currentMusic.src === v .src && isPlayed ?
                                                                            'icon-playing'
                                                                            :
                                                                            'icon-play'
                                                                        }
                                                                        onClick={() => playThis(i)}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className='single-music-name'
                                                                    onClick={() => playThis(i)}
                                                                >{v.name}</div>
                                                            </div>
                                                            <div className='single-music-right'>
                                                                {
                                                                    musicActions.length && <div
                                                                      className={'single-music-actions'}
                                                                      onClick={() => {
                                                                        if (currentMusic.id !== v.id || !isPlayed) {
                                                                            playThis(i)
                                                                        }
                                                                      }}
                                                                    >
                                                                        <div className={classnames('single-music-actions-content', {
                                                                            'single-music-actions-actived': (currentMusic.id === v.id && isPlayed)
                                                                        })}>
                                                                            {
                                                                                musicActions.map(item => item(v, currentMusic.id === v.id || false))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div
                                                                    className='single-music-artist'
                                                                    onClick={() => playThis(i)}
                                                                >{v.artist}</div>
                                                                <div className='single-music-del'>
                                                                    <i className='icon-del'
                                                                       onClick={() => delMusic(i, v.id)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        showLyric &&
                                          <CoolLyric
                                            lyric={lyric || []}
                                            lyricIndex={lyricIndex}
                                            info={currentMusic}
                                            loading={lyricLoading}
                                            lyricPlaceholder={lyricPlaceholder}
                                          />
                                    }
                                </div>
                                :
                                null
                        }

                    </ReactCSSTransitionGroup>
                </div>
                <div className='right-control'>
                    <div
                        className='volume-control-wrapper'
                        onTouchMove={moveVolume}
                        onTouchStart={startMoveVolume}
                        onClick={clickChangeVolume}
                        onMouseDown={mouseDownVulume}
                        onMouseMove={slideChangeVolume}
                        onMouseUp={mouseUpVolume}
                        onMouseLeave={mouseLeave}
                    >
                        <div className='volume-control'
                             ref={totalVolumeEl}
                        >
                            <div className='volume-progress' ref={volumeProgressEl}></div>
                        </div>

                    </div>
                    <i className='icon-volume'/>
                </div>
                <audio src={currentMusic.src ? currentMusic.src : ''} ref={audioEl}/>
            </div>
        </div>

        <ReactCSSTransitionGroup
            transitionName='cool-player-list-model'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
            {
                musicListShow ?
                    <div className='modal' onClick={showMusicList}></div>
                    :
                    null
            }
        </ReactCSSTransitionGroup>
    </div>
}

export default CoolPlayer;
