export const getLyric = (lyric: string) => {
    const lyricList = []
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
            const totalTime = Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + millisecond
            lyricList.push([totalTime, strings])
        }
    }
    return lyricList
}
