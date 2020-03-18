/**
 * Author: NERO
 * Date: 2020/2/16 0016
 * Time: 14:22
 * unit test for index
 *
 */
import * as React from 'react'
import { shallow, mount } from 'enzyme'
import CoolPlayer from '../../index'
import {findTestWrapper} from '../../utils/testUtils'

describe('unit test for lyricDetail', () => {
  test('传入了tLyric，则应该在原歌词下面显示翻译歌词', () => {
    const currentAudio = {
      src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://neroht.com/Señorita.jpg',
      id: '66575568423123',
      lyric: '[00:15.29]I love it when you call me Señorita\n[00:19.36]I wish I could pretend I did not need ya',
      tLyric: '[00:15.29]我爱你称我为我的小姐时的样子\n[00:19.36]多希望我可以假装不需要你'
    }

    const coolPlayer = mount(<CoolPlayer
      data={[]}
      showDetailLyric={true}
      currentAudio={currentAudio}
    />)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const tLyricItem = findTestWrapper(coolPlayer, 't-lyric-item')
    expect(tLyricItem.length).toBe(2)
  })
  test('如果传入了lyric，则应该显示歌词', () => {
    const currentAudio = {
      src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://neroht.com/Señorita.jpg',
      id: '66575568423123',
      lyric: '[00:15.29]I love it when you call me Señorita\n[00:19.36]I wish I could pretend I did not need ya',
    }
    const coolPlayer = mount(<CoolPlayer
      data={[]}
      showDetailLyric={true}
      currentAudio={currentAudio}
    />)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const tLyricItem = findTestWrapper(coolPlayer, 'lyric-item')
    expect(tLyricItem.length).toBe(2)
  })
})