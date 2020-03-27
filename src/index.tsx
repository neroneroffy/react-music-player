import * as React from 'react'
import './index.less'
import { getLyric, getTLyric, getTime, fixedBody, looseBody } from './utils'
import LyricNormal from './Lyric/LyricNormal/index'
import LyricMini from './Lyric/LyricMini/index'
import LyricDetail from './Lyric/LyricDetail/index'
import classnames from 'classnames'
import { coolPlayerTypes } from './types'
import {
  IconPlaylistPlaying,
  IconPlaylistPlay,
  IconPlay,
  IconPause,
  IconPrev,
  IconNext,
  IconMenu,
  IconModeOrder,
  IconModeRandom,
  IconModeLoop,
  IconVolume,
  IconMute,
  IconDetailHide,
  IconDelete,
} from './icons'
const { useState, useRef, useEffect, useCallback } = React
const CSSTransitionGroup = require('react-addons-css-transition-group')
let rotateTimer: NodeJS.Timeout
let fullScreenTimeout: NodeJS.Timeout

enum PlayMode {
    Order = 'order',
    Random = 'random',
    Loop = 'loop'
}
type PlayModeTypes = 'order' | 'random' | 'loop'
const CoolPlayer = (props: coolPlayerTypes.IPlayerProps) => {
  const { data, currentAudio } = props
  const initialMusic = {
    src: '',
    artist: '',
    name: '',
    img: '',
    id: '',
    lyric: '',
    invalid: true,
  }
  const audioEl = useRef(null)
  const musicAvatarEl = useRef(null)
  const bufferedEl = useRef(null)
  const playedEl = useRef(null)
  const detailMusicAvatarEl = useRef(null)
  const detailBufferedEl = useRef(null)
  const detailPlayedEl = useRef(null)
  const progressEl = useRef(null)
  const detailProgressEl = useRef(null)
  const detailProgressBarEl = useRef(null)
  const totalVolumeEl = useRef(null)
  const volumeProgressEl = useRef(null)
  const coolPlayerEl = useRef(null)
  const musicBoxEl = useRef(null)
  const playListEl = useRef(null)
  const coolPlayListWrapper = useRef(null)
  const playControlEl = useRef(null)
  const actionsEl = useRef(null)
  const insideCircleEl = useRef(null)
  const avatarEl = useRef(null)
  const coolPlayerModalEl = useRef(null)
  const coolPlayerInnerEl = useRef(null)
  const coolPlayerDetailEl = useRef(null)
  const coolPlayerDetailAudioTopEl = useRef(null)
  const detailPicWrapperEl = useRef(null)
  const [ isPaused, setPaused ] = useState<boolean>(true)
  const [ totalTime, setTotalTime ] = useState<number | string>('00:00')
  const [ playedLeft, setPlayedLeft ] = useState<number>(0)
  const [ detailPlayedLeft, setDetailPlayedLeft ] = useState<number>(0)
  const [ volumeLeft, setVolumeLeft ] = useState<number>(0)
  const [ volumeValue, setVolumeValue ] = useState<number>(0)
  const [ remainTime, setRemainTime ] = useState<number | string>('00:00')
  const [ angle, setAngle ] = useState<number>(0)
  const [ mouseDown, setMouseDown ] = useState<boolean>(false)
  const [ musicListShow, setMusicListShow ] = useState<boolean>(false)
  const [ currentMusic, setCurrentMusic ] = useState<coolPlayerTypes.IAudio>(currentAudio || data && data[0] || initialMusic)
  const [ isPlayed, setIsPlayed ] = useState<boolean>(false)
  const [ lyric, setLyric ] = useState<coolPlayerTypes.ILyric[]>([])
  const [ tLyric, setTLyric ] = useState<coolPlayerTypes.ITLyric>({})
  const [ lyricIndex, setLyricIndex ] = useState<number>(-1)
  const [ isMute, setIsMute ] = useState<boolean>(false)
  const [ detailVisible, setDetailVisible ] = useState<boolean>(false)
  const [ mode, setMode ] = useState<PlayModeTypes>(PlayMode.Order)
  const [ lyricFullScreen, setLyricFullScreen ] = useState<boolean>(false)
  const [ playedWidth, setPlayedWidth ] = useState<number>(0)
  const [ bufferedWidth, setBufferedWidth ] = useState<number>(0)
  const [ playPercent, setPlayPercent ] = useState<number>(0)
  const { showLyricNormal = true,
    showLyricMini = true,
    playListShow = false,
    playDetailShow = false,
    lyric: lyricFromProps = '',
    tLyric: tLyricFromProps = '',
    lyricLoading = false,
    lyricPlaceholder,
    avatarPlaceholder = <div className={'cool-player-avatar-placeholder'}></div>,
    playListAudioActions = [],
    actions = [],
    detailActionsBottom = [],
    detailActionTopRight,
    playListHeader = {
      headerLeft: '播放列表',
      headerRight: '',
    },
    onPlayStatusChange,
    autoPlay = false,
    onModeChange,
    playMode: playModeFromProps = PlayMode.Order,
    onVolumeChange,
    volume = 0.5,
    playListPlaceholder = 'No data',
    showPlayDetail = true,
    showDetailLyric = false,
    showProgressControlByLyricScroll = true,
    onPlayDetailStatusChange,
    detailBackground,
    primaryColor = '#33beff',
    icons = {},
    onPlayListStatusChange,
  } = props
  const {
    playList = IconMenu,
    playListPlay = IconPlaylistPlay,
    playListPlaying = IconPlaylistPlaying,
    deleteIcon = IconDelete,
    playIcon = IconPlay,
    pauseIcon = IconPause,
    prevIcon = IconPrev,
    nextIcon = IconNext,
    modeOrder = IconModeOrder,
    modeRandom = IconModeRandom,
    modeLoop = IconModeLoop,
    volumeIcon = IconVolume,
    muteIcon = IconMute,
    detailHide = IconDetailHide,
  } = icons
  let lyricList: coolPlayerTypes.ILyric[] = getLyric(currentMusic && currentMusic.lyric || lyricFromProps)
  let tLyricList: {} = getTLyric(currentMusic && currentMusic.tLyric || tLyricFromProps)
  let indexArr: number[] = []

  useEffect(() => {
    if (insideCircleEl.current && playPercent) {
      const circleProgress = insideCircleEl.current
      const circleLength = Math.floor(2 * Math.PI * circleProgress.getAttribute('r'));
      circleProgress.setAttribute('stroke-dasharray','' + circleLength * playPercent + ',10000');
    }
  }, [ insideCircleEl, playPercent ])

  useEffect(() => {
    if (currentMusic) {
      if (insideCircleEl.current) {
        insideCircleEl.current.setAttribute('stroke-dasharray','0,10000');
      }
    }
    if (props.onAudioChange && currentMusic) {
      props.onAudioChange(currentMusic.id, currentMusic)
    }
    setLyricIndex(-1)
    setLyric([])
    setTLyric({})
    setAngle(0)
  }, [currentMusic])
  useEffect(() => {
    const { zIndex = 1000 } = props
    coolPlayerEl.current.style.zIndex = zIndex
    coolPlayerInnerEl.current.style.zIndex = zIndex
    musicBoxEl.current.style.zIndex = zIndex + 100
    playControlEl.current.style.zIndex = zIndex + 200
    coolPlayListWrapper.current.style.zIndex = zIndex - 100
    progressEl.current.style.zIndex = zIndex + 200
    playedEl.current.style.zIndex = zIndex + 300
    if (avatarEl.current ) {
      avatarEl.current.style.zIndex = zIndex + 400
    }
    if (actionsEl.current ) {
      actionsEl.current.style.zIndex = zIndex + 300
    }
    if (detailPicWrapperEl.current) {
      detailPicWrapperEl.current.style.zIndex = zIndex + 700
    }
    if (document.body.clientWidth <= 680) {
      coolPlayListWrapper.current.style.zIndex = zIndex + 5000
    }
  }, [document.body.clientWidth])

  useEffect(() => {
    const { zIndex = 1000 } = props
    if (coolPlayerDetailEl.current) {
      coolPlayerDetailEl.current.style.zIndex = zIndex + 4000
    }
    if (coolPlayerDetailAudioTopEl.current) {
      coolPlayerDetailAudioTopEl.current.style.zIndex = zIndex + 100
    }
  }, [ detailVisible ])

  useEffect(() => {
    const { zIndex = 1000 } = props
    if (coolPlayerModalEl.current && musicListShow) {
      coolPlayerModalEl.current.style.zIndex = zIndex + 4500
    }
  }, [ musicListShow ])

  useEffect(() => {
    // setCurrentMusic(currentAudio || initialMusic || data[0])
    audioEl.current.addEventListener('canplay', setInitialTotalTime)
    volumeProgressEl.current.style.width = '50%';
    audioEl.current.volume = volume
    setVolumeValue(volume)
    return () => {
      audioEl.current.removeEventListener('canplay', setInitialTotalTime)
      audioEl.current.removeEventListener('timeupdate', setProgress)
    }
  }, [])

  useEffect(() => {
    if (autoPlay) {
      play()
    }
  }, [autoPlay, currentMusic])
  useEffect(() => {
    if (currentAudio) {
      setCurrentMusic(currentAudio)
    }
  }, [ currentAudio ])
  const rotate = () => {
    rotateTimer = setTimeout(() => {
      rotate()
      setAngle(angle + 1)
      if (musicAvatarEl.current) {
        musicAvatarEl.current.style.transform = `rotate(${angle}deg)`;
      }
      if (detailMusicAvatarEl.current) {
        detailMusicAvatarEl.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 25)
  }

  useEffect(() => {
    if (!isPaused) {
      clearTimeout(rotateTimer)
      if (!currentMusic || (currentMusic && currentMusic.disabled)) {
        return
      }
      rotate()
    }
    return () => {
      clearTimeout(rotateTimer)
    }
  }, [ angle, isPaused, currentMusic])

  useEffect(() => {
    if (detailMusicAvatarEl.current) {
      detailMusicAvatarEl.current.style.transform = `rotate(${angle}deg)`;
    }
  }, [ detailVisible ])

  useEffect(() => {
    const audio = audioEl.current
    if (!isPaused) {
      audio.play()
    } else {
      audio.pause()
    }
    audio.addEventListener('timeupdate', setProgress);
    return () => {
      audio.removeEventListener('timeupdate', setProgress)
    }
  }, [isPaused, currentMusic, mode])

  useEffect(() => {
    if (playedEl.current) {
      playedEl.current.style.width = '0%';
    }
    if (detailPlayedEl.current) {
      detailPlayedEl.current.style.width = '0%';
    }
    if (bufferedEl.current) {
      bufferedEl.current.style.width = '0%';
    }
    if (detailBufferedEl.current) {
      detailBufferedEl.current.style.width = '0%';
    }
  }, [ currentMusic ])
  useEffect(() => {
    const audio = audioEl.current
    lyricList = getLyric(currentMusic && currentMusic.lyric || lyricFromProps)
    tLyricList = getTLyric(currentMusic && currentMusic.tLyric || tLyricFromProps)
    indexArr = []
    setLyric(lyricList)
    setTLyric(tLyricList)
    audio.addEventListener('timeupdate', setLyricHighLight)
    return () => {
      audioEl.current.removeEventListener('timeupdate', setLyricHighLight)
    }
  }, [currentMusic, lyricFromProps, tLyricFromProps])

  useEffect(() => {
    setVolume(0, volume)
  }, [volume])

  useEffect(() => {
    if (playModeFromProps) {
      setMode(playModeFromProps)
      if (playModeFromProps !== mode) {
        playMode()
      }
    }
  }, [playModeFromProps])

  useEffect(() => {
    setMusicListShow(playListShow)
  }, [ playListShow ])

  useEffect(() => {
    if (playDetailShow) {
      onShowDetail()
    } else {
      onHideDetail()
    }
  }, [ playDetailShow ])

  const setInitialTotalTime = () => {
    // 获取总时间
    const musicTotalTime = parseInt(audioEl.current.duration, 0);
    setTotalTime(getTime(musicTotalTime))
    setRemainTime(getTime(0))
    setPlayedLeft(playedEl.current.getBoundingClientRect().left)
    setVolumeLeft(totalVolumeEl.current.getBoundingClientRect().left)
    if (detailPlayedEl.current) {
      setPlayedLeft(detailPlayedEl.current.getBoundingClientRect().left)
    }
  }
  const setLyricHighLight = () => {
    const current = audioEl.current.currentTime
    if ((currentMusic && currentMusic.lyric) || lyricFromProps) {
      lyricList.map((item, index) => {
        if (item && lyricList[index - 1]) {
          if (current >= item.time) {
            indexArr.push(index)
          }
        }
      })
      setLyricIndex(indexArr[indexArr.length - 1])
    }
  }
  const setProgress = () => {
    // 设置播放进度条
    let playPer = audioEl.current.currentTime / audioEl.current.duration;
    const { duration } = audioEl.current
    if (duration !== duration) {
      playPer = 0
    }
    setPlayPercent(playPer)
    playedEl.current.style.width = playPer * 100 + '%';
    setPlayedWidth(playPer * 100)
    if (detailPlayedEl.current) {
      detailPlayedEl.current.style.width = playPer * 100 + '%';
    }
    // 设置缓冲进度条
    const timeRages = audioEl.current.buffered;
    let bufferedTime = 0
    if (timeRages.length !== 0) {
      bufferedTime = timeRages.end(timeRages.length - 1);
    }
    const bufferedPer = bufferedTime / audioEl.current.duration;
    bufferedEl.current.style.width = bufferedPer * 100 + '%';
    setBufferedWidth(bufferedPer * 100)
    if (detailBufferedEl.current) {
      detailBufferedEl.current.style.width = bufferedPer * 100 + '%';
    }
    // 设置剩余时间
    const musicRemainTime = parseInt(`${audioEl.current.currentTime}`, 0);
    setTimeout(() => {
      setRemainTime(getTime(musicRemainTime))
    })
    if (audioEl.current.ended) {
      clearTimeout(rotateTimer)
      setPlayPercent(0)
      playedEl.current.style.width = '0%';
      setPlayedWidth(0)
      if (detailPlayedEl.current) {
        detailPlayedEl.current.style.width = '0%';
      }
      pause()
      if(mode === PlayMode.Order){
        next()
        play()
      }else if(mode === PlayMode.Random){
        random()
      }else if(mode === PlayMode.Loop){
        const currentMusicAgain = JSON.parse(JSON.stringify(currentMusic))
        setCurrentMusic(currentMusicAgain)
        play()
      }
      setAngle(0)
    }
  }
  const play = () => {
    if (!currentMusic || currentMusic.invalid || currentMusic.disabled) { return }
    setPaused(false)
    setIsPlayed(true)
    if (onPlayStatusChange) {
      onPlayStatusChange(currentMusic, true)
    }
  }
  const pause = () => {
    setPaused(true)
    if (onPlayStatusChange) {
      onPlayStatusChange(currentMusic, false)
    }
  }
  const last = (index?: number) => {
    setAngle(0)
    setLyricIndex(-1)
    if (!currentMusic || !currentMusic.src) {
      return
    }
    let current

    current = index || data.findIndex(item => item.src === currentMusic.src)
    if (current > 0) {
      if (data[current - 1].disabled) {
        last(current - 1)
        return
      }
      setCurrentMusic(data[current - 1])
    } else {
      if (data[data.length - 1].disabled) {
        return
      }
      setCurrentMusic(data[data.length - 1])
    }
  }
  const next = (index?: number) => {
    setAngle(0)
    setLyricIndex(-1)
    if (!currentMusic || !currentMusic.src) {
      return
    }
    let current
    current = index || data.findIndex(item => item.id === currentMusic.id)
    if (current < data.length - 1) {
      if (data[current + 1].disabled) {
        next(current + 1)
        return
      }
      setCurrentMusic(data[current + 1])
    } else {
      if (data[0].disabled) {
        return
      }
      setCurrentMusic(data[0])
    }
  }
  const random = () => {
    if(data.length !== 0){
      let randomIndex = Math.ceil(Math.random() * data.length - 1);
      if (data[ randomIndex ].disabled) {
        random()
        return
      }
      setCurrentMusic(data[ randomIndex ])
      setAngle(0)
      play()
    }
  }

  const setTimeOnPc = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, action?: string) => {
    const audio = audioEl.current;
    if (audio.currentTime !== 0) {
      let targetPoint = 0;
      let newWidth = 0;
      if(action === 'touch' && detailVisible){
        targetPoint = e.pageX - detailPlayedLeft
        newWidth = targetPoint / detailProgressBarEl.current.offsetWidth;
      }else{
        targetPoint = e.pageX - playedLeft;
        newWidth = targetPoint / progressEl.current.offsetWidth;
      }
      playedEl.current.style.width = newWidth * 100 + '%';
      audio.currentTime = newWidth * audio.duration;
      setLyricHighLight()
    }
  }
  const setTime = (e: React.TouchEvent<HTMLDivElement>, action?: string) => {
    const audio = audioEl.current
    let targetPoint = e.touches[0].pageX - playedLeft
    let newWidth
    if(action === 'touch' && detailVisible){
      targetPoint = e.touches[0].pageX - detailPlayedLeft
      newWidth = targetPoint / detailProgressBarEl.current.offsetWidth;
      detailPlayedEl.current.style.width = newWidth * 100 + '%';
    } else {
      newWidth = targetPoint / progressEl.current.offsetWidth;
      playedEl.current.style.width = newWidth * 100 + '%';
    }
    audio.currentTime = newWidth * audio.duration
  }
  // PC端点击事件
  const clickChangeTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, action?: string) => {
    if (!e.pageX) {
      return
    }
    // setTimeOnPc(e, action)
  }
  // Drag the progress bar on PC
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.pageX) {
      return
    }
    setMouseDown(true)
    setTimeOnPc(e)
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
      setTime(e, 'touch')
    }
  }
  const onTouchMoveProgress = (e: React.TouchEvent<HTMLDivElement>) => {
    const audio = audioEl.current;
    if (audio.currentTime !== 0) {
      setTime(e, 'touch')
    }
  }

  const setVolume = (pageX: number, volumeValue?: number) => {
    const audio = audioEl.current
    const volumeRate = volumeValue || (pageX - volumeLeft) / totalVolumeEl.current.offsetWidth;
    let currentVolume = volumeRate
    if (volumeRate > 0.01 && volumeRate <= 1) {
      audio.volume = volumeRate
      currentVolume = volumeRate
      volumeProgressEl.current.style.width = volumeRate * 100 + '%';
      setIsMute(false)
    } else if (volumeRate <= 0.01) {
      audio.volume = 0
      currentVolume = 0
      setIsMute(true)
    } else {
      audio.volume = 1
      currentVolume = 1
      setIsMute(false)
    }
    setVolumeValue(currentVolume)
    onVolumeChange && onVolumeChange(currentVolume)
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
  // Change the volume on PC
  const clickChangeVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setVolume(e.pageX)
  }
  const mouseDownVolume = () => {
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
  // Show the play list wrapper
  const showMusicList = () => {
    setMusicListShow(!musicListShow)
    if (onPlayListStatusChange) {
      onPlayListStatusChange(!musicListShow)
    }
  }
  const playThis = (i: number) => {
    if (data[i].disabled) { return }
    setCurrentMusic(data[i])
    play()
  }
  const delMusic = (i: number, id: string) => {
    const audio = audioEl.current
    if (!props.onDelete) {
      return
    }
    if (currentMusic && data[i] && (data[i].src === currentMusic.src)) {
      if (i <= data.length - 1 && data[i + 1]) {
        setCurrentMusic(data[i + 1])
      } else if (!data[i + 1] && data[i - 1]) {
        // 删除的是最后一首
        clearTimeout(rotateTimer);
        setCurrentMusic(data[0])
      } else {
        // 都删除完了
        clearTimeout(rotateTimer);
        audio.currentTime = 0;
        bufferedEl.current.style.width = 0;
        if (detailBufferedEl.current) {
          detailBufferedEl.current.style.width = 0;
        }
        if (playedEl.current) {
          playedEl.current.style.width = 0;
        }
        if (detailPlayedEl.current) {
          detailPlayedEl.current.style.width = 0;
        }
        const invalidCurrent = {
          src: '',
          artist: '',
          name: '',
          img: '',
          id: '',
        }
        setCurrentMusic(invalidCurrent)
        setIsPlayed(false)
        setLyric([])
        setTLyric({})
        setLyricIndex(-1)
      }
    }
    props.onDelete(i, id)
  }
  const playMode = () => {
    let currentMode = mode
    switch (mode){
      case PlayMode.Order:
        setMode(PlayMode.Random)
        currentMode = PlayMode.Random
        break;
      case PlayMode.Random:
        setMode(PlayMode.Loop)
        currentMode = PlayMode.Loop
        break;
      case PlayMode.Loop:
        setMode(PlayMode.Order)
        currentMode = PlayMode.Order
    }
    if (onModeChange) {
      onModeChange(currentMode, mode)
    }
  }
  const onShowDetail = () => {
    if (document.body.clientWidth > 680) {
      return
    }
    fixedBody()
    setDetailVisible(true)
    if (onPlayDetailStatusChange) {
      onPlayDetailStatusChange(true)
    }
    setTimeout(() => {
      if (detailPlayedEl.current) {
        setDetailPlayedLeft(detailPlayedEl.current.getBoundingClientRect().left)
        detailPlayedEl.current.style.width = playedWidth + '%'
        detailBufferedEl.current.style.width = bufferedWidth + '%'
      }
    })
  }
  const onHideDetail = () => {
    looseBody()
    setDetailVisible(false)
    if (onPlayDetailStatusChange) {
      onPlayDetailStatusChange(false)
    }
  }
  const onSwitchPlayMode = () => {
    const singleCycle = <div data-test={'loop'}>{ modeLoop }</div>
    const playInOrder = <div data-test={'order'}>{ modeOrder }</div>
    const playInRandom = <div data-test={'random'}>{ modeRandom }</div>
    switch (mode) {
      case PlayMode.Order:
        return playInOrder
      case PlayMode.Random:
        return playInRandom
      case PlayMode.Loop:
        return singleCycle
    }
  }
  const onLyricFullScreen = () => {
    clearTimeout(fullScreenTimeout)
    fullScreenTimeout = setTimeout(() => {
      setLyricFullScreen(!lyricFullScreen)
    }, 50)

  }
  const onSetProgressWithScroll = (time: number) => {
    const totalTime = audioEl.current.duration
    const playPercent = time / totalTime
    playedEl.current.style.width = playPercent * 100 + '%';
    audioEl.current.currentTime = playPercent * audioEl.current.duration;
    setLyricHighLight()
    play()

  }
  const onToggleMute = () => {
    if (isMute) {
      setIsMute(false)
      audioEl.current.volume = volumeValue
      onVolumeChange && onVolumeChange(volumeValue)
    } else {
      setIsMute(true)
      audioEl.current.volume = 0
      onVolumeChange && onVolumeChange(0)
    }
  }
  return <div id={'cool-player'} ref={coolPlayerEl}>
    <div className="cool-player-wrapper">
      <div className="cool-player-inner" ref={coolPlayerInnerEl}>
        <div className="cool-player-control" ref={playControlEl}>
          <div className={'cool-player-control-btn'}>
            <div className="icon-prev" onClick={() => last()} data-test={'prev-btn'}>
              { prevIcon }
            </div>
            {
              !isPaused && currentMusic && currentMusic.src ?
                <div className="icon-puase" onClick={() => { pause() }} data-test={'pause-btn'}>
                  { pauseIcon }
                </div>
                :
                <div className="icon-play" onClick={play} data-test={'play-btn'}>
                  { playIcon }
                </div>
            }
            <div className="icon-next" onClick={() => next()} data-test={'next-btn'}>
              { nextIcon }
            </div>
          </div>
        </div>
        <div className="cool-player-box" ref={musicBoxEl}>
          <div className={ classnames('picture-wrapper', {
            'picture-wrapper-large': !isPaused
          })}>
            <div
              className="picture"
              onClick={ showPlayDetail ? onShowDetail : () => null }
              data-test={'detail-show'}
            >
              <svg
                xmlns="http://www.w3.org/200/svg"
                height="64"
                width="64"
                className="circle-progress"
              >
                <circle
                  className={'outside-circle'}
                  cx="31"
                  cy="33"
                  r="27"
                  fill="none"
                  stroke="#e4e4e4"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {
                  currentMusic &&
                  <circle
                    className={'inside-circle'}
                    ref={ insideCircleEl }
                    id="J_progress_bar"
                    cx="31"
                    cy="31"
                    r="26"
                    fill="none"
                    stroke={ primaryColor }
                    strokeWidth="5"
                  />

                }
              </svg>
              {
                currentMusic && currentMusic.src ?
                  <div className="avatar" ref={ avatarEl }>
                    <img src={ currentMusic.img } ref={ musicAvatarEl } alt="image is lost"/>
                  </div>
                  :
                  avatarPlaceholder
              }
            </div>
          </div>
          <div className="cool-player-audio-info">
            <div
              className="cool-player-audio-name"
              data-test={'music-name'}
              title={currentMusic && currentMusic.src && `${currentMusic.name}`}
            >
              {
                currentMusic && currentMusic.src && (`${currentMusic.name}`)
              }
            </div>
            <div
              className="progress-wrapper"
              ref={ progressEl }
              onTouchMove={onTouchMoveProgress}
              onTouchStart={onTouchTimeChangeStart}
              onClick={clickChangeTime}
              onMouseDown={onMouseDown}
              onMouseMove={slideChangeTime}
              onMouseUp={onMouseUp}
              onMouseLeave={mouseLeave}
              data-test={'progress-bar'}
            >
              <div className="progress" >
                <div className="progress-buffered" data-test={'progress-buffered'} ref={ bufferedEl }></div>
                <div
                  className="progress-played"
                  data-test={'progress-played'}
                  ref={ playedEl }
                  style={{ background: primaryColor }}
                >
                  <div className="progress-action-point"></div>
                </div>
              </div>

            </div>
            <div className="time">
              <div className="remain-time">{ currentMusic && currentMusic.src ? remainTime : '00:00'}</div>
              <span>/</span>
              <div className="total-time" data-test={'total-time'}>{ currentMusic && currentMusic.src ? totalTime : '00:00'}</div>

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
          <div className="cool-player-list-mode-btn">
            <div className="icon-menu" onClick={showMusicList}>
              { playList }
            </div>
            <div className="cool-player-mode">
              <div className="mode" data-test={'play-mode-btn'} onClick={ playMode }>
                { onSwitchPlayMode() }
              </div>
            </div>

          </div>
        </div>
        {
          actions.length &&
          <div
            className="cool-player-actions"
            ref={actionsEl}
            data-test={'play-actions'}
          >
            {
              actions.map(item => item(currentMusic))
            }
          </div>
        }

        <div className="right-control">
          {
            isMute ?
              <div className={'icon-mute'} onClick={onToggleMute} data-test={'icon-mute'}>
                { volumeIcon }
              </div>
              :
              <div className={'icon-volume'} onClick={onToggleMute} data-test={'icon-volume'}>
                { muteIcon }
              </div>
          }

          <div
            className="volume-control-wrapper"
            onTouchMove={moveVolume}
            onTouchStart={startMoveVolume}
            onClick={clickChangeVolume}
            onMouseDown={mouseDownVolume}
            onMouseMove={slideChangeVolume}
            onMouseUp={mouseUpVolume}
            onMouseLeave={mouseLeave}
          >
            <div
              className="volume-control"
              ref={totalVolumeEl}
            >
              <div
                className="volume-progress"
                ref={volumeProgressEl}
                style={{ background: primaryColor }}
              >
                <div className="volume-progress-dot"></div>
              </div>
            </div>
          </div>
        </div>
        <audio src={ currentMusic && currentMusic.src ? currentMusic.src : '' } data-test={ 'audio' } ref={ audioEl }/>
      </div>
    </div>
    <div className="cool-player-list-wrapper" ref={coolPlayListWrapper}>
      <CSSTransitionGroup
        transitionName="cool-player-list-show"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {
          musicListShow ?
            <div className="cool-player-list-lyric" ref={playListEl}>
              <div
                className={classnames('cool-player-list-component', {
                  'cool-player-list-component-half': showLyricNormal
                })}
              >
                <div className="cool-player-list-title">
                  <div className="cool-player-list-title-left">
                    { playListHeader.headerLeft }
                  </div>
                  <div className="cool-player-list-title-left">
                    { playListHeader.headerRight }
                  </div>
                </div>
                {
                  data && data.length ?
                    <div className="cool-player-audio-wrapper">
                      {
                        data.map((v, i) => {
                          return v.disabled ?
                            <div
                              className={'cool-player-audio cool-player-audio-disabled'}
                              key={v.id}
                            >
                              <div className={'cool-player-audio-left'}>
                                <div className="cool-player-audio-play">
                                  <div className="icon-play">
                                    { playListPlay }
                                  </div>
                                </div>
                                <div className="cool-player-audio-name" title={v.name}>{v.name}</div>
                              </div>
                              <div className="cool-player-audio-right">
                                {
                                  (v.disabled && v.disabledReason) &&
                                    <div className={'cool-player-disabled-reason'}>
                                      { v.disabledReason }
                                    </div>
                                }
                                <div
                                  className="cool-player-audio-artist"
                                >{v.artist}</div>
                                <div className="cool-player-audio-del" onClick={() => delMusic(i, v.id)} data-test={'icon-delete'}>
                                  { deleteIcon }
                                </div>
                              </div>
                            </div>
                            :
                            <div
                              className={'cool-player-audio'}
                              style={
                                currentMusic && currentMusic.src === v .src && isPlayed ?
                                  { background: primaryColor, color: '#fff' }
                                  :
                                  null
                              }
                              key={v.id}
                              data-test={'single-music'}
                            >
                              <div className={'cool-player-audio-left'}>
                                <div className="cool-player-audio-play">
                                  {
                                    currentMusic && currentMusic.src === v .src && isPlayed ?
                                      <div
                                        className="icon-playing"
                                        data-test={'icon-playing'}
                                      >
                                        { playListPlaying }
                                      </div>
                                      :
                                      <div
                                        className="icon-play"
                                        onClick={() => playThis(i)}
                                        data-test={'icon-play'}
                                      >
                                        { playListPlay }
                                      </div>
                                  }

                                </div>
                                <div
                                  className="cool-player-audio-name"
                                  onClick={() => playThis(i)}
                                  title={v.name}
                                  data-test={'play-this'}
                                >{v.name}</div>
                              </div>
                              <div className="cool-player-audio-right">
                                {
                                  playListAudioActions.length ? <div
                                    className={'cool-player-audio-actions'}
                                    onClick={() => {
                                      if (currentMusic.id !== v.id || !isPlayed) {
                                        playThis(i)
                                      }
                                    }}
                                  >
                                    <div
                                      className={classnames('cool-player-audio-actions-content', {
                                        'cool-player-audio-actions-actived': (currentMusic && currentMusic.id === v.id && isPlayed)
                                      })}
                                      data-test={'music-actions'}
                                    >
                                      {
                                        playListAudioActions.map(item => item(v, currentMusic && currentMusic.id === v.id || false))
                                      }
                                    </div>
                                  </div>
                                    :
                                    null
                                }
                                <div
                                  className="cool-player-audio-artist"
                                  onClick={() => playThis(i)}
                                >{v.artist}</div>
                                <div className="cool-player-audio-del" onClick={() => delMusic(i, v.id)} data-test={'icon-delete'}>
                                  { deleteIcon }
                                </div>
                              </div>
                            </div>
                        })
                      }
                    </div>
                    :
                    <div className={'play-list-placeholder'}>
                      { playListPlaceholder }
                    </div>
                }
              </div>
              {
                showLyricNormal &&
                  <LyricNormal
                    lyric={lyric || []}
                    tLyric={tLyric || {}}
                    lyricIndex={lyricIndex}
                    info={currentMusic}
                    loading={lyricLoading}
                    lyricPlaceholder={lyricPlaceholder}
                    primaryColor={primaryColor}
                  />
              }
            </div>
            :
            null
        }

      </CSSTransitionGroup>
    </div>
    <CSSTransitionGroup
      transitionName="cool-player-list-model"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      {
        musicListShow ?
          <div className="cool-player-modal" data-test="play-list-modal" ref={coolPlayerModalEl} onClick={showMusicList}></div>
          :
          null
      }
    </CSSTransitionGroup>
    <CSSTransitionGroup
      transitionName="cool-player-detail-show"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {
        detailVisible &&
        <div className="cool-player-detail" data-test={'cool-player-detail-modal'} ref={ coolPlayerDetailEl }>
          <div className={'cool-player-detail-bg'}>
            { detailBackground }
          </div>
          <div className={'cool-player-detail-top'} ref={coolPlayerDetailAudioTopEl}>
            <div className="cool-player-detail-close" data-test={'close-detail'} onClick={ onHideDetail }>
              { detailHide }
            </div>
            <div className="cool-player-detail-music-info" >
              <div className="title">{ currentMusic && currentMusic.name }</div>
              <div className="artist">{ currentMusic && currentMusic.artist }</div>
            </div>
            <div className={'cool-player-detail-actions'}>
              { detailActionTopRight && detailActionTopRight(currentMusic) }
            </div>
          </div>
          {
            currentMusic && !currentMusic.invalid &&
            <div
              data-test={'cool-player-detail-avatar'}
              className={ classnames('cool-player-detail-img', {
                'cool-player-detail-img-hidden': lyricFullScreen
              }) }
            >
              <div className="album-border" ></div>
              <div className="detail-pic-wrapper" ref={ detailPicWrapperEl }>
                <img className="detailPic" ref={ detailMusicAvatarEl } src={ currentMusic && currentMusic.img } alt=""/>
              </div>
            </div>
          }
          {
            showDetailLyric &&
            <div
              className={ classnames('cool-player-detail-lyric', {
                'cool-player-detail-lyric-full-screen': lyricFullScreen
              }) }
              data-test={'lyric-full-screen'}
              onClick={ onLyricFullScreen }
            >
              <LyricDetail
                lyric={ lyric || [] }
                tLyric={ tLyric || {} }
                lyricIndex={ lyricIndex }
                info={ currentMusic }
                loading={ lyricLoading }
                lyricPlaceholder={ lyricPlaceholder }
                lyricFullScreen={ lyricFullScreen }
                onSetProgressWithScroll={ onSetProgressWithScroll }
                showProgressControlByLyricScroll={showProgressControlByLyricScroll}
              />
            </div>
          }
          <div className="cool-player-detail-panel">
            <div className="cool-player-detail-panel-actions">
              {
                detailActionsBottom.length && detailActionsBottom.map(item => item(currentMusic))
              }
            </div>
            <div
              className="detail-progress"
              ref={ detailProgressEl }
              onTouchMove={ onTouchMoveProgress }
              onTouchStart={ onTouchTimeChangeStart }
              onClick={ e => clickChangeTime(e, 'touch') }
            >
              <div className={'progress-time'}>{ remainTime }</div>
              <div className="progress" ref={ detailProgressBarEl }>
                <div className="progress-buffered" ref={ detailBufferedEl }></div>
                <div
                  className="progress-played"
                  ref={ detailPlayedEl }
                  style={{ background: primaryColor }}
                >
                  <div className={'progress-action-point'}></div>
                </div>
              </div>
              <div className={'progress-time'}>{ totalTime }</div>
            </div>
            <div className="cool-player-operate">
              <div className="mode" onClick={ playMode }>
                { onSwitchPlayMode() }
              </div>
              <div className="operation">
                <div className="icon-prev" onClick={() => last()}>
                  { prevIcon }
                </div>
                {
                  !isPaused && currentMusic && currentMusic.src ?
                    <div className="icon-puase" onClick={pause}>
                      { pauseIcon }
                    </div>
                    :
                    <div className="icon-play" onClick={play}>
                      { playIcon }
                    </div>
                }
                <div className="icon-next" onClick={() => next()}>
                  { nextIcon }
                </div>
              </div>
              <div className="play-list-show-btn">
                <div className="icon-menu" onClick={showMusicList}>
                  { playList }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </CSSTransitionGroup>
  </div>
}

export default CoolPlayer;
