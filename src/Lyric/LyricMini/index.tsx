import * as React from 'react';
import './index.less'
import { coolPlayerTypes } from '../../../index'

const { useEffect, useState, useRef } = React

const LyricMini = (props: coolPlayerTypes.lyricMini.ILyricMiniProps) => {
  const { lyric, lyricIndex } = props
  const [ currentLyric, setCurrentLyric ] = useState<string>('')
  const lyricEl = useRef(null)
  useEffect(() => {
    setCurrentLyric('')
    lyricEl.current.style.marginTop = -18
    if (lyric.length && lyric[lyricIndex]) {
      setCurrentLyric(lyric[lyricIndex].lyric)
    }
  }, [lyric, lyricIndex])

  return <div className={'cool-lyric-mini'}>
    <div ref={lyricEl} className={'cool-lyric-mini-content'}>
      { currentLyric }
    </div>
  </div>
}

export default LyricMini