import * as React from 'react';
import classnames from 'classnames'
import { coolPlayerTypes } from '../../../index'
import './index.less'

const { useEffect, useRef } = React

const LyricNormal = (props: coolPlayerTypes.lyricNormal.ILyricNormalProps) => {
  const { lyric,
    tLyric,
    lyricIndex,
    info,
    loading,
    lyricPlaceholder =  '暂无歌词',
    primaryColor
  } = props
  const artist = info ? info.artist : ''
  const name = info ? info.name : ''
  const lyricEl = useRef(null)
  const lyricItemEl = useRef(null)
  useEffect(() => {
    if (lyricEl.current) {
      if (lyricEl.current.scrollTo && lyricIndex > 0) {
        lyricEl.current.scrollTo(0, (lyricIndex + 1 + 0.5) * lyricItemEl.current.offsetHeight)
      }
    }
  }, [lyricIndex])
  const content = lyric.length ?
    <ul className={'cool-lyric-content'} ref={lyricEl}>
      {
        Object.keys(tLyric).length ?
          lyric.map((v, i) => {
            return <li
              key={v.time}
              ref={lyricItemEl}
              className={'lyric-item-normal t-lyric-item-normal'}
              style={ i === lyricIndex ? { color: primaryColor } : null}
            >
              <div>{v.lyric}</div>
              <div>{tLyric[v.time]}</div>
            </li>
          })
          :
          lyric.map((v, i) => {
            return <li
              key={v.time}
              ref={lyricItemEl}
              className={'lyric-item-normal'}
              style={ i === lyricIndex ? { color: primaryColor } : null}
            >{v.lyric}</li>
          })
      }
      <li className={'lyric-item-normal-bottom'}></li>

    </ul>
    :
    <div className={'cool-lyric-center-wrapper'}>
      <span className={'cool-lyric-center'}>{lyricPlaceholder}</span>
    </div>
  return <div className={'cool-lyric'}>
    <div className="cool-lyric-title-wrapper">
      <h4 title={`${name} ${artist ? artist : '' }`}>{name} { artist ? `(${artist})` : '' }</h4>
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
export default LyricNormal
