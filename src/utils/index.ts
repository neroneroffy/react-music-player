import { coolPlayerTypes } from '../types'
export const getLyric = (lyric: string): coolPlayerTypes.ILyric[] => {
  const lyricList: coolPlayerTypes.ILyric[] = []
  if (!lyric) {
    return lyricList
  }
  const lyricArr = lyric.split('\n')
  const timeReg = /\d{2}:\d{2}((\.|\:)(\d{2}|\d{3}))/g
  const timeRegWithBracket = /\[\d{2}:\d{2}((\.|\:)(\d{2}|\d{3}))\]/g
  for (const item of lyricArr) {
    const time = item.match(timeReg)
    const strings = item.replace(timeRegWithBracket, '')
    if (time && time.length) {
      const minutes = time[0].split(':')[0]
      const secondsAndMillisecond = time[0].split(':')[1]
      const seconds = secondsAndMillisecond.split('.')[0]
      const millisecond = secondsAndMillisecond.split('.')[1]
      const totalTime = Number(Number(minutes) * 6e4 + Number(seconds) * 1e3
                + (Number(millisecond) || 0) * 1) / 1e3
      lyricList.push({
        time: totalTime,
        lyric: strings,
      })
    }
  }
  return lyricList
}

export const fixedBody = () => {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += `position:fixed;top:-${scrollTop}px;width:100%;overflow:hidden`;
}

export const getTime = (musicTime?: number) => {
  let time
  if (musicTime) {
    musicTime = Math.ceil(musicTime)
    if (musicTime < 60) {
      time = `00:${musicTime < 10 ? `0${musicTime}` : musicTime}`
    } else {
      time = `${parseInt(`${musicTime / 60}`, 0) < 10 ?
        `0${parseInt(`${musicTime / 60}`, 0)}`
        :
        parseInt(`${musicTime / 60}`, 0)}:${musicTime % 60 < 10 ?
        `0${musicTime % 60}`
        :
        musicTime % 60}`
    }
    return time
  } else {
    return '00:00'
  }
}

export const looseBody = () =>  {
  let body = document.body;
  body.style.position = '';
  let top = body.style.top;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
  document.body.style.cssText = '';
  body.style.top = '';
}
