type PlayMode = 'order' | 'random' | 'loop'
declare namespace coolPlayerTypes {
  interface IPlayerProps {
    /*播放列表的音频数据*/
    data?: IAudio[]
    /*播放列表为空时候的占位文字*/
    playListPlaceholder?: string
    /*需要播放的音频，可以控制当前播放器的音频，若不传，播放器内待播放的音频默认为播放列表第一个音频*/
    currentAudio?: IAudio
    /*组件在渲染时是否自动播放*/
    autoPlay?: boolean
    /*控制播放列表展示与隐藏*/
    playListShow?: boolean
    /*播放列表显示和隐藏时的回调，如果希望通过playListShow控制播放列表的显示隐藏状态，则需要在这个回调中同步设置playListShow的值*/
    onPlayListStatusChange?: (status: boolean) => void
    /*控制组件播放状态，true播放，false暂停*/
    playing?: boolean
    /*点击歌曲图标是否展示播放详情（移动端有效）*/
    showPlayDetail?: boolean
    /*删除播放列表的回调函数*/
    onDelete?: (index: number, id: string) => void
    /*音量，传入组件可以控制播放器音量大小*/
    volume?: number
    /*组件内部音量变化时的回调函数*/
    onVolumeChange?: (volume: number) => void
    /*播放器整体容器的z-index值*/
    zIndex?: number
    /*在非移动端状态下是否展示歌词*/
    showLyricNormal?: boolean
    /*移动端状态下是否展示迷你歌词*/
    showLyricMini?: boolean
    /*播放器内音频切换触发的回调函数*/
    onAudioChange?: (id: string, currentMusic: IAudio) => void
    /*切换播放和暂停触发的回调函数*/
    onPlayStatusChange?: (currentMusic: IAudio, isPlaying: boolean) => void
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
    /*播放列表内每首音频的操作组，在歌曲名称右侧，移动端激活状态下显示，非移动端hover时显示*/
    playListAudioActions?: Array<(data: IAudio, active?: boolean) => React.ReactNode>
    /*播放列表顶部的左右两个元素*/
    playListHeader? : {
      headerLeft?: React.ReactNode | string,
      headerRight?: React.ReactNode | string,
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
    }
  }
}

export { coolPlayerTypes }
