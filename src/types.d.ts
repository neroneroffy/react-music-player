type PlayMode = 'order' | 'random' | 'loop'
declare namespace coolPlayerTypes {
    interface IPlayerProps {
        autoPlay?: boolean
        playing?: boolean
        showPlayDetail?: boolean
        onDelete?: (index: number, id: string) => void
        volume?: number
        onVolumeChange?: (volume: number) => void
        data: IAudio[]
        playListPlaceholder?: string
        currentAudio?: IAudio
        zIndex?: number
        onLyricMatched?: (lyric: ILyric[], currentIndex: number) => void
        showLyricNormal?: boolean
        showLyricMini?: boolean
        onMusicChange?: (id: string, currentMusic: IAudio) => void
        onPlayStatusChange?: (currentMusic: IAudio, isPlaying: boolean) => void
        onModeChange?: (currentMode: PlayMode, prevMode: PlayMode) => void
        playMode?: PlayMode
        lyric?: string
        tLyric?: string
        lyricLoading?: boolean
        lyricPlaceholder?: React.ReactNode | string
        avatarPlaceholder?: React.ReactNode
        actions?: Array<(data: IAudio) => React.ReactNode>
        musicActions?: Array<(data: IAudio, active?: boolean) => React.ReactNode>
        playListHeader? : {
            headerLeft?: React.ReactNode | string,
            headerRight?: React.ReactNode | string,
        }
    }
    interface IAudio {
        src: string
        artist: string
        name: string
        img: string
        id: string
        lyric?: string
        tLyric?: string
    }
    interface ILyric {
        time: number | string
        lyric: string
    }
    interface ITLyric {
      [ key: number ]: string
      [ key: string ]: string
    }
    namespace lyricDetail {
        interface ILyricDetailProps {
            lyric: ILyric[]
            tLyric?: ITLyric
            lyricIndex: number
            info: IAudio
            loading: boolean
            lyricFullScreen: boolean
            lyricPlaceholder: React.ReactElement | React.ReactNode | string
            onSetProgressWithScroll: (time: number) => void
        }
    }
    namespace lyricMini {
        interface ILyricMiniProps {
            lyric: ILyric[]
            tLyric?: ITLyric
            lyricIndex: number
        }
    }
    namespace lyricNormal {
        interface ILyricNormalProps {
            lyric: ILyric[]
            tLyric?: ITLyric
            lyricIndex: number
            info: IAudio
            loading: boolean
            lyricPlaceholder: React.ReactElement | React.ReactNode | string
        }
    }
}

export { coolPlayerTypes }
