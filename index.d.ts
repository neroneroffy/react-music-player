import * as React from 'react'

type PlayMode = 'order' | 'random' | 'loop'
declare namespace coolPlayerTypes {
  interface IPlayerProps {
    /*播放列表的音频数据*/
    data?: IAudio[]
    /*是否开始播放*/
    play?: boolean
    /*播放列表为空时候的占位文字*/
    playListPlaceholder?: string
    /*需要播放的音频，可以控制当前播放器的音频，若不传入，播放器内待播放的音频默认为播放列表第一个音频*/
    currentAudio?: IAudio
    /*控制播放列表展示与隐藏*/
    playListShow?: boolean
    /*播放列表显示和隐藏时的回调函数，如果希望通过playListShow控制播放列表的显示隐藏状态，则需要在这个回调中同步设置playListShow的值*/
    onPlayListStatusChange?: (status: boolean) => void
    /*点击歌曲图标是否展示播放详情（移动端有效）*/
    showPlayDetail?: boolean
    /*播放详情页面的背景*/
    detailBackground?: React.ReactNode
    /*便于外部控制播放详情的显示与隐藏*/
    playDetailShow?: boolean
    /*播放详情展示或者隐藏时的回调函数，如果希望通过playDetailShow控制播放详情的显示隐藏状态，则需要在这个回调中同步设置playDetailShow的值*/
    onPlayDetailStatusChange?: (status: boolean) => void
    /*删除播放列表音频的回调函数*/
    onDelete?: (index: number, id: string) => void
    /*音量，传入组件可以控制播放器音量大小*/
    volume?: number
    /*音量变化时的回调函数*/
    onVolumeChange?: (volume: number) => void
    /*播放器整体容器的z-index值*/
    zIndex?: number
    /*在非移动端状态下是否展示歌词*/
    showLyricNormal?: boolean
    /*移动端状态下是否在歌曲详情页面展示歌词*/
    showDetailLyric?: boolean
    /*移动端状态下是否展示迷你歌词*/
    showLyricMini?: boolean
    /*播放器内音频改变触发的回调函数*/
    onAudioChange?: (id: string, currentMusic: IAudio) => void
    /*切换播放和暂停触发的回调函数*/
    onPlayStatusChange?: (currentMusic: IAudio, isPlayed: boolean) => void
    /*切换播放模式触发的回调函数*/
    onModeChange?: (currentMode: PlayMode, prevMode: PlayMode) => void
    /*播放模式，传入可控制播放器内播放列表的播放模式（顺序播放、随机播放、单曲循环）*/
    playMode?: PlayMode
    /*异步加载歌词时，传入的歌词数据*/
    lyric?: string
    /*异步加载歌词时，如需要展示歌词翻译，可将翻译后的歌词传入*/
    tLyric?: string
    /*异步加载歌词时的loading状态，便于歌词组件展示loading状态*/
    lyricLoading?: boolean
    /*歌词组件为空时的占位元素*/
    lyricPlaceholder?: React.ReactNode | string
    /*移动端状态下，播放详情中是否需要通过手动滚动歌词调整播放进度*/
    showProgressControlByLyricScroll?: boolean
    /*歌曲图片为空时歌曲图标的占位元素*/
    avatarPlaceholder?: React.ReactNode
    /*非移动端状态下，展示在播放器内部的操作组，在播放模式按钮与音量控制按钮之间*/
    actions?: Array<(data: IAudio) => React.ReactNode>
    /*移动端状态下，展示在播放详情内部右上角的操作元素*/
    detailActionTopRight?: (data: IAudio) => React.ReactNode
    /*移动端状态下，展示在播放详情内部进度条上方的操作组*/
    detailActionsBottom?: Array<(data: IAudio) => React.ReactNode>
    /*播放列表内每首音频的操作组，在歌曲名称右侧，移动端激活状态下显示，非移动端hover时显示*/
    playListAudioActions?: Array<(data: IAudio, active?: boolean) => React.ReactNode>
    /*播放列表顶部的左右两个元素*/
    playListHeader? : {
      headerLeft?: React.ReactNode | string,
      headerRight?: React.ReactNode | string,
    }
    /*主题颜色*/
    primaryColor?: string
    /*自定义图标*/
    icons?: {
      /*控制播放列表显示或隐藏的图标*/
      playListIcon?: React.ReactNode
      /*播放列表每个音频前面的播放按钮*/
      playListPlay?: React.ReactNode
      /*播放列表中每个音频正在播放的图标*/
      playListPlaying?: React.ReactNode
      /*播放列表中删除音频的删除图标*/
      deleteIcon?: React.ReactNode
      /*播放*/
      playIcon?: React.ReactNode
      /*暂停*/
      pauseIcon?: React.ReactNode
      /*上一首*/
      prevIcon?: React.ReactNode
      /*下一首*/
      nextIcon?: React.ReactNode
      /*顺序播放*/
      modeOrder?: React.ReactNode
      /*随机播放*/
      modeRandom?: React.ReactNode
      /*单曲循环*/
      modeLoop?: React.ReactNode
      /*音量*/
      volumeIcon?: React.ReactNode
      /*静音*/
      muteIcon?: React.ReactNode
      /*隐藏播放详情*/
      detailHide?: React.ReactNode
    }
  }
  interface IAudio {
    /*音频链接*/
    src: string
    /*歌手*/
    artist: string
    /*音频名称*/
    name: string
    /*音频图片*/
    img: string
    /*唯一标识*/
    id: string
    /*歌词*/
    lyric?: string
    /*歌词翻译*/
    tLyric?: string
    /*是否不可用，组件内部的音频初始值会有这个值，表示当前无音频*/
    invalid?: boolean
    /*是否禁用*/
    disabled?: boolean
    /*禁用的原因*/
    disabledReason?: string | React.ReactNode
  }
  interface ILyric {
    /*当前歌词的时间*/
    time: number | string
    /*歌词文字*/
    lyric: string
  }
  interface ITLyric {
    /*时间：歌词*/
    [ key: number ]: string
    [ key: string ]: string
  }
  namespace lyricDetail {
    interface ILyricDetailProps {
      /*歌词*/
      lyric: ILyric[]
      /*歌词翻译*/
      tLyric?: ITLyric
      /*与当前播放时间匹配的歌词index*/
      lyricIndex: number
      /*音频信息*/
      info: IAudio
      /*加载状态*/
      loading: boolean
      /*歌词是否全屏展示*/
      lyricFullScreen: boolean
      /*歌词占位符*/
      lyricPlaceholder: React.ReactElement | React.ReactNode | string
      /*滚动歌词时，点击播放按钮触发的回调函数，可以在函数中设置播放进度*/
      onSetProgressWithScroll: (time: number) => void
      /*是否需要通过手动滚动歌词调整播放进度*/
      showProgressControlByLyricScroll?: boolean
    }
  }
  namespace lyricMini {
    interface ILyricMiniProps {
      /*歌词*/
      lyric: ILyric[]
      /*与当前播放时间匹配的歌词index*/
      lyricIndex: number
    }
  }
  namespace lyricNormal {
    interface ILyricNormalProps {
      /*歌词*/
      lyric: ILyric[]
      /*歌词翻译*/
      tLyric?: ITLyric
      /*与当前播放时间匹配的歌词index*/
      lyricIndex: number
      /*音频信息*/
      info: IAudio
      /*加载状态*/
      loading: boolean
      /*歌词占位符*/
      lyricPlaceholder: React.ReactElement | React.ReactNode | string
      /*主题颜色*/
      primaryColor?: string
    }
  }
}

export { coolPlayerTypes }

export default class CoolPlayer extends React.PureComponent<
  coolPlayerTypes.IPlayerProps,
  any
  > {}