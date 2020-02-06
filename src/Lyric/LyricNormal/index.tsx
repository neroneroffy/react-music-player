import * as React from 'react';
import classnames from 'classnames'
import { coolPlayerTypes } from '../../types'
import './index.less'

const { useEffect, useRef } = React

const LyricNormal = (props: coolPlayerTypes.lyricNormal.ILyricNormalProps) => {
    const { lyric,
        lyricIndex,
        info: { artist, name },
        loading,
        lyricPlaceholder =  '纯音乐，请欣赏',
    } = props
    const lyricEl = useRef(null)
    useEffect(() => {
        if (lyricEl.current) {
            const scrollUnit = lyricEl.current.scrollHeight / lyric.length
            if (lyricEl.current.scrollTo) {
                lyricEl.current.scrollTo(0, lyricIndex * scrollUnit - lyricIndex * 1)
            }
        }
    }, [lyricIndex])

    const content = lyric.length ?
        <ul className={'cool-lyric-content'} ref={lyricEl}>
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
        </ul>
        :
        <div className={'cool-lyric-center-wrapper'}>
            <span className={'cool-lyric-center'}>{lyricPlaceholder}</span>
        </div>
    return <div className={'cool-lyric'}>
        <h4>{name} ({artist})</h4>
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
export default LyricNormal
