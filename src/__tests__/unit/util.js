/**
 * Author: NERO
 * Date: 2020/2/7 0007
 * Time: 16:43
 *
 */
import { getLyric } from '../../utils'

describe('工具类单元测试', () => {
  test('歌词格式化函数，传入字符串，应返回格式化后的歌词数组', () => {
    const lyric = '[00:00.000] 作曲 : ilem\n[00:01.000] 作词 : ilem'
    const lyricFormated =[{"time":0,"lyric":" 作曲 : ilem"},{"time":1,"lyric":" 作词 : ilem"}]
    expect(getLyric(lyric)).toEqual(lyricFormated)
  })
})