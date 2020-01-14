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
export const looseBody = () =>  {
    let body = document.body;
    body.style.position = '';
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    document.body.style.cssText = ``;
    body.style.top = '';
}
