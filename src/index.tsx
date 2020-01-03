import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.less'
import Timeout = NodeJS.Timeout;
import { getLyric } from './utils'
import LyricNormal from './Lyric/LyricNormal/index'
import LyricMini from './Lyric/LyricMini/index'
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
    showLyricNormal?: boolean
    showLyricMini?: boolean
    onMusicChange?: (id: string) => void
    lyric?: string
    lyricLoading?: boolean
    lyricPlaceholder?: React.ReactNode | string
    avatarPlaceholder?: React.ReactNode
    actions?: Array<(data: ISongs) => React.ReactNode>
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
    const actionsEl = useRef(null)
    const canvasEl = useRef(null)
    const avatarEl = useRef(null)
    const coolPlayerInnerEl = useRef(null)
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
    const [ isMute, setIsMute ] = useState<boolean>(false);
    const { showLyricNormal = true,
        showLyricMini = true,
        lyric: lyricFromProps = '',
        lyricLoading = false,
        lyricPlaceholder,
        avatarPlaceholder = null,
        musicActions = [],
        actions = [],
        playListHeader = {
            headerLeft: '播放列表',
            headerRight: '',
        },
    } = props
    let lyricList: ILyric[] = getLyric(currentMusic.lyric || lyricFromProps)
    let indexArr: number[] = []

    let drawCircle = (rate: number): void => {}

    useEffect(() => {
        if (canvasEl.current) {
            const cvs: HTMLCanvasElement = canvasEl.current
            const ctx = cvs.getContext("2d");
            const w = cvs && cvs.width/2;
            const h = cvs && cvs.height/2;
            ctx.lineWidth = 10
            const r = Math.min(w,h) - ctx.lineWidth / 2;
            drawCircle = (rate: number) => {
                ctx.clearRect(0,0,cvs.width,cvs.height)
                ctx.beginPath();
                ctx.strokeStyle = "#eeeeee"
                ctx.arc(w,h,r,0,Math.PI * 2)
                ctx.stroke()
                ctx.beginPath()
                ctx.strokeStyle="#017fff"
                ctx.lineCap = "round"
                const p = rate * 2
                const start = Math.PI * 3 / 2
                const end = start+Math.PI * p
                ctx.arc(w,h,r,start,end)
                if (p > 0) {
                    ctx.stroke()
                }
            }
        }
        drawCircle(0)
    }, [ canvasEl ])

    useEffect(() => {
        if (data.length) {
            props.onMusicChange(currentMusic.id)
        }
    }, [currentMusic])

    useEffect(() => {
        const { zIndex = 1000 } = props
        coolPlayerEl.current.style.zIndex = zIndex
        coolPlayerInnerEl.current.style.zIndex = zIndex
        musicBoxEl.current.style.zIndex = zIndex + 100
        playControlEl.current.style.zIndex = zIndex + 200
        coolPlayListWrapper.current.style.zIndex = zIndex + 100
        progressEl.current.style.zIndex = zIndex + 200
        playedEl.current.style.zIndex = zIndex + 300
        actionsEl.current.style.zIndex = zIndex + 300
        canvasEl.current.style.zIndex = zIndex + 300
        avatarEl.current.style.zIndex = zIndex + 400
        if (document.body.clientWidth > 680) {
            coolPlayListWrapper.current.style.zIndex = zIndex - 100
        }
    }, [document.body.clientWidth])

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
        drawCircle(playPer)
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
            setIsMute(false)
        } else if (volumeRate <= 0.01) {
            audio.volume = 0
            setIsMute(true)
        } else {
            audio.volume = 1
            setIsMute(false)
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
            <div className='cool-player-inner' ref={coolPlayerInnerEl}>
                <div className='cool-player-control' ref={playControlEl}>
                    <svg
                        className="icon-prev"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11891"
                        onClick={last}
                    >
                        <path
                            d="M625.5 513V216.1c0-13.5 2.5-28.9-12.9-35.9-14.2-6.4-26.3 1.5-37.7 9.5C434.5 288 294 386.1 153.8 484.7c-32.2 22.7-31.7 33.7 0.9 56.6C292.9 638.2 431.2 735 569.5 831.8c4.2 2.9 8.4 5.9 12.8 8.4 27 14.7 43 5.7 43.1-25.1 0.4-75.9 0.1-151.8 0.1-227.8V513zM727.9 512.8c0 92.1-0.1 184.1 0 276.2 0 37.7 19.1 60.8 50.1 61.4 32 0.7 52.2-23 52.2-61.8 0.1-184.1 0.1-368.2 0-552.3 0-37.5-19.3-60.9-50.1-61.5-31.8-0.6-52.2 23.3-52.2 61.9-0.1 92 0 184 0 276.1z"
                            p-id="11892"
                        />
                    </svg>
                    {
                        !isPaused && currentMusic.src ?
                          <svg
                            className="icon-puase"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13385"
                            onClick={pause}
                          >
                            <path
                              d="M757.52 73.107h-62.493c-34.526 0-62.498 27.984-62.498 62.511v749.948c0 34.526 27.974 62.493 62.498 62.493h62.493c34.516 0 62.502-27.968 62.502-62.493v-749.953c-0.001-34.524-27.984-62.509-62.502-62.509zM320.054 73.107h-62.502c-34.526 0-62.498 27.984-62.498 62.511v749.948c0 34.526 27.974 62.493 62.498 62.493h62.502c34.505 0 62.493-27.968 62.493-62.493v-749.953c-0.001-34.524-27.984-62.509-62.493-62.509z"
                              p-id="13386"/>
                          </svg>
                            :
                          <svg
                            className="icon-play"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12608"
                            onClick={play}
                          >
                            <path
                              d="M844.704269 475.730473L222.284513 116.380385a43.342807 43.342807 0 0 0-65.025048 37.548353v718.692951a43.335582 43.335582 0 0 0 65.025048 37.541128l622.412531-359.342864a43.357257 43.357257 0 0 0 0.007225-75.08948z"
                              fill="" p-id="12609"/>
                          </svg>
                    }
                    <svg
                        className="icon-next"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12235"
                        onClick={next}
                    >
                        <path
                            d="M402.9 513V216.1c0-13.5-2.5-28.9 12.9-35.9 14.2-6.4 26.3 1.5 37.7 9.5 140.5 98.3 281 196.4 421.2 295 32.2 22.7 31.7 33.7-0.9 56.6C735.6 638.2 597.3 734.9 459 831.7c-4.2 2.9-8.4 5.9-12.8 8.4-27 14.7-43 5.7-43.1-25.1-0.4-75.9-0.1-151.8-0.1-227.8-0.1-24.8-0.1-49.5-0.1-74.2zM300.5 512.8c0 92.1 0.1 184.1 0 276.2 0 37.7-19.1 60.8-50.1 61.4-32 0.7-52.2-23-52.2-61.8-0.1-184.1-0.1-368.2 0-552.3 0-37.5 19.3-60.9 50.1-61.5 31.8-0.6 52.2 23.3 52.2 61.9v276.1z"
                            p-id="12236"/>
                    </svg>
                </div>
                <div className='cool-player-box' ref={musicBoxEl}>
                    <div className={classnames('picture-wrapper', {
                        'picture-wrapper-large': !isPaused
                    })}>
                        <div className='picture'>
                            <canvas ref={canvasEl} className="circle-progress" width="62" height="62" />
                            {
                                currentMusic.src ?
                                    <div className='avatar' ref={avatarEl}>
                                        <img src={currentMusic.img} ref={musicAvatarEl} alt='image is lost'/>
                                    </div>
                                    :
                                    avatarPlaceholder
                            }
                        </div>
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
                        {
                            showLyricMini &&
                                <div className="cool-lyric-mini-wrapper">
                                    <LyricMini
                                      lyric={lyric || []}
                                      lyricIndex={lyricIndex}
                                    />
                                </div>
                        }
                    </div>
                    <div className='cool-player-list-btn'>
                        <svg
                            className="icon-menu"
                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15150"
                            onClick={showMusicList}
                        >
                            <path
                                d="M92 92l840 0C965.104 92 992 118.864 992 152c0 33.136-26.896 60-60 60L92 212C58.864 212 32 185.136 32 152 32 118.864 58.864 92 92 92zM92 452l840 0c33.104 0 60 26.864 60 60 0 33.104-26.896 60-60 60L92 572C58.864 572 32 545.104 32 512 32 478.864 58.864 452 92 452zM92 812l840 0c33.104 0 60 26.896 60 60s-26.896 60-60 60L92 932C58.864 932 32 905.104 32 872S58.864 812 92 812z"
                                p-id="15151"
                            />
                        </svg>
                    </div>
                </div>
                {
                    actions.length &&
                        <div className='cool-player-actions' ref={actionsEl}>
                            {
                                actions.map(item => item(currentMusic))
                            }
                        </div>

                }
                <div className='right-control'>
                    {
                        isMute ?
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 716 634.14"
                            className={'icon-mute'}
                          >
                            <path d="M77.4-128.81a12.79,12.79,0,0,1,18.08-.86,12.78,12.78,0,0,1,4.19,9.47V73.66l64,69.36V-120.2A76.8,76.8,0,0,0,138.54-177a76.8,76.8,0,0,0-108.49,5.15L-47.84-86.2-4.27-39Z" transform="translate(238 197)"/><path d="M341.4,387.33l-508-553.11a29.55,29.55,0,0,0-41.77-1.68,29.87,29.87,0,0,0-1.68,42l508,553.1a29.55,29.55,0,0,0,41.78,1.69h0A29.89,29.89,0,0,0,341.4,387.33Z" transform="translate(238 197)"/><path d="M478,119.93a353.16,353.16,0,0,0-150.39-289.4A32,32,0,0,0,283-161.71a32,32,0,0,0,7.76,44.58A289.67,289.67,0,0,1,330.3,323.61l43.44,47.07A352.83,352.83,0,0,0,478,119.93Z" transform="translate(238 197)"/><path d="M349.2,119.93A215.78,215.78,0,0,0,251.55-60.78a32,32,0,0,0-44.31,9.21,32,32,0,0,0,9.21,44.3A152,152,0,0,1,241.13,227L284.56,274A215.59,215.59,0,0,0,349.2,119.93Z" transform="translate(238 197)"/><path d="M99.67,360.34A12.8,12.8,0,0,1,77.4,369L-42.82,236.73a89.61,89.61,0,0,0-66.3-29.33H-148.4A25.6,25.6,0,0,1-174,181.8V58.34a25.61,25.61,0,0,1,25.6-25.61h37.51L-168-29.12a89.64,89.64,0,0,0-70,87.46V181.8a89.6,89.6,0,0,0,89.6,89.6h39.28a25.59,25.59,0,0,1,18.94,8.38L30.05,412a76.79,76.79,0,0,0,133.62-51.66v-30l-64-69.36Z" transform="translate(238 197)"/>
                          </svg>
                            :
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 716 634.14"
                              className={'icon-volumn'}
                          >
                              <path d="M-42.82,236.73,77.4,369a12.8,12.8,0,0,0,22.27-8.61V-120.2a12.78,12.78,0,0,0-4.19-9.47,12.79,12.79,0,0,0-18.08.86L-42.82,3.41a89.58,89.58,0,0,1-66.3,29.32H-148.4A25.6,25.6,0,0,0-174,58.34V181.8a25.6,25.6,0,0,0,25.6,25.6h39.28a89.59,89.59,0,0,1,66.3,29.33ZM-148.4,271.4A89.6,89.6,0,0,1-238,181.8V58.34a89.6,89.6,0,0,1,89.6-89.61h39.28a25.6,25.6,0,0,0,18.94-8.37L30.05-171.87A76.8,76.8,0,0,1,138.54-177a76.8,76.8,0,0,1,25.13,56.82V360.34A76.79,76.79,0,0,1,30.05,412L-90.18,279.78a25.59,25.59,0,0,0-18.94-8.38ZM216.45-7.27a32,32,0,0,1-9.21-44.3,32,32,0,0,1,44.31-9.21,216,216,0,0,1,0,361.43,32,32,0,1,1-35.1-53.51,152.06,152.06,0,0,0,0-254.41Zm74.34-109.86A32,32,0,0,1,283-161.71a32,32,0,0,1,44.58-7.76,353.66,353.66,0,0,1,0,578.81A32,32,0,1,1,290.79,357a289.67,289.67,0,0,0,0-474.13Zm0,0" transform="translate(238 197)"/>
                          </svg>
                    }

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
                        <div
                            className='volume-control'
                            ref={totalVolumeEl}
                        >
                            <div className='volume-progress' ref={volumeProgressEl}></div>
                        </div>
                    </div>
                </div>
                <audio src={currentMusic.src ? currentMusic.src : ''} ref={audioEl}/>
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
                                                            {
                                                                currentMusic.src === v .src && isPlayed ?
                                                                    <svg
                                                                        className="icon-playing"
                                                                        viewBox="0 0 1024 1024" version="1.1"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        p-id="4542">
                                                                        <path
                                                                            d="M844.743872 64.641229l-483.775168 80.814584c-1.567705 0.25071-3.031033 0.710175-4.453429 1.254573l-17.475 0c-11.915377 0-21.38403 9.532097-21.38403 21.280676l0 553.029462c-18.875906-10.912537-40.825824-17.140379-64.216557-17.140379-70.927399 0-128.433114 57.359382-128.433114 128.139425S182.512289 960.15695 253.439688 960.15695c70.926376 0 128.433114-57.359382 128.433114-128.139425 0-5.184069-0.314155-10.285251-0.899486-15.259542 0.585331-1.964748 0.899486-4.013407 0.899486-6.187933l0-449.764564 449.513854-79.267345 0 311.298955c-18.875906-10.870582-40.825824-17.142425-64.216557-17.142425-70.927399 0-128.433114 57.401338-128.433114 128.183428 0 70.738088 57.505715 128.139425 128.433114 128.139425 70.926376 0 128.432091-57.401338 128.432091-128.139425 0-5.184069-0.313132-10.285251-0.898463-15.301498 0.585331-1.966795 0.898463-4.015454 0.898463-6.187933l0-597.97307c0-10.45205-7.587815-19.190061-17.579377-20.946055-3.491521-2.173502-7.881504-3.051499-12.710486-2.257413l-11.370978 1.922792-1.170662 0C849.927941 63.135946 847.21004 63.679321 844.743872 64.641229z"
                                                                            p-id="4543"
                                                                        />
                                                                    </svg>
                                                                    :
                                                                    <svg
                                                                        className="icon-play"
                                                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12608"
                                                                        onClick={() => playThis(i)}
                                                                    >
                                                                        <path
                                                                            d="M844.704269 475.730473L222.284513 116.380385a43.342807 43.342807 0 0 0-65.025048 37.548353v718.692951a43.335582 43.335582 0 0 0 65.025048 37.541128l622.412531-359.342864a43.357257 43.357257 0 0 0 0.007225-75.08948z"
                                                                            fill="" p-id="12609"
                                                                        />
                                                                    </svg>

                                                            }

                                                        </div>
                                                        <div
                                                            className='single-music-name'
                                                            onClick={() => playThis(i)}
                                                            title={v.name}
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
                                                            <svg
                                                                className="icon-delete"
                                                                viewBox="0 0 1024 1024" version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                p-id="14221"
                                                                onClick={() => delMusic(i, v.id)}
                                                            >
                                                                <path
                                                                    d="M905.095 208.272c-0.723-13.831-8.416-22.5-21.935-24.964-9.591-1.748-19.427-2.978-29.157-3.003-86.191-0.226-172.383-0.131-258.575-0.132-33.351 0-33.746-0.003-33.526-32.945 0.107-16.082-2.276-30.68-17.72-38.771-18.485-9.684-38.335-9.957-56.659-0.784-17.966 8.993-20.791 26.286-18.357 44.809 0.489 3.722-0.236 7.611 0.315 11.317 1.911 12.864-3.273 16.675-16.211 16.658-65.739-0.088-131.48 0.861-197.221 1.272-33.198 0.208-66.403-0.284-99.596 0.188-17.428 0.248-31.405 5.801-32.05 26.883-0.632 20.665 11.01 30.367 29.789 32.983 8.168 1.138 16.754 1.418 24.885 0.245 18.279-2.637 24.062 3.035 23.817 22.671-1.187 95.25-0.536 190.522-0.536 285.787 0 94.508-0.052 189.017 0.02 283.525 0.042 54.383 27.569 82.889 81.862 83.012 154.237 0.351 308.475 0.311 462.712 0.022 54.345-0.102 81.543-28.003 81.768-82.957 0.262-64.265 0.061-128.531 0.061-192.797 0-125.507 0.497-251.018-0.52-376.517-0.158-19.465 5.267-25.341 23.708-22.741 12.025 1.695 24.391 0.459 35.599-4.637 12.134-5.515 18.229-15.704 17.527-29.124zM703.894 852.013c-127.824 0.459-255.648 1.108-383.472 1.53-42.18 0.139-55.197-13.105-55.226-55.644-0.06-88.514-0.018-177.028-0.018-265.542 0-90.027 0.354-180.056-0.345-270.078-0.118-15.18 2.786-20.515 19.406-20.441 154.329 0.685 308.663 0.647 462.992 0.03 15.437-0.062 18.313 4.852 18.296 19.052-0.212 176.262 0.311 352.525 0.354 528.787 0.012 48.329-14.318 62.135-61.987 62.306zM457.826 551.954c-0.005 62.494 0.248 124.989-0.122 187.48-0.16 27.053-21.176 42.105-41.952 30.851-13.621-7.378-15.183-20.088-15.14-33.959 0.217-70.131 0.1-140.263 0.099-210.395 0-52.078-0.013-104.156 0.005-156.234 0.01-28.205 9.473-41.657 29.029-41.383 19.282 0.27 28.061 13.458 28.076 42.408 0.031 60.412 0.009 120.822 0.005 181.232zM640.505 548.427c0 67.266 0.079 134.531-0.04 201.797-0.046 25.885-12.42 41.664-31.659 41.105-18.649-0.542-30.391-15.588-30.412-40.16-0.114-135.287-0.119-270.574 0.002-405.861 0.023-25.653 10.741-38.957 30.533-39.21 20.326-0.26 31.51 13.901 31.546 40.533 0.091 67.264 0.03 134.53 0.03 201.796z"
                                                                    p-id="14222"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                showLyricNormal &&
                                <LyricNormal
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
