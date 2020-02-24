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

describe('unit test for coolPlayer', () => {
  const _data = [
    {
      src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
      artist: '瑾姝',
      name: '西巷桥边',
      img: 'http://neroht.com/109951164352276322.jpg',
      id: '66575568141',
    },
    {
      src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
      artist: '瑾姝Hikari',
      name: '大氿歌',
      img: 'http://neroht.com/daguige.jpg',
      id: '66575568442',
    },
  ]
  test('点击播放列表中的某一首音乐，应触发onMusicChange函数', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer
      onMusicChange={fn}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const playThis = findTestWrapper(singleMusic.at(1), 'play-this')
    playThis.simulate('click')
    expect(fn).toHaveBeenCalledWith(_data[1].id, _data[1])
  })
  test('删除播放列表中的某一首音乐，应触发onDelete函数', () => {
    const fn = jest.fn()
    const coolPlayer = shallow(<CoolPlayer
      onDelete={fn}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const iconDelete = findTestWrapper(singleMusic.at(1), 'icon-delete')
    iconDelete.simulate('click')
    expect(fn).toHaveBeenCalledWith(1, _data[1].id)
  })
})