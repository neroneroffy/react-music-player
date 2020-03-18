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
  test('点击播放列表中的某一首音乐，应触发onAudioChange函数', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer
      onAudioChange={fn}
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
  test('如果传入playListAudioActions，应该渲染出music-actions容器', () => {
    const playListAudioActions = [
      (music, active) => {
        return <span key={'favourite'}>收藏</span>
      }
    ]
    const coolPlayer = shallow(<CoolPlayer
      playListAudioActions={playListAudioActions}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const playListAudioActionsWrapper = findTestWrapper(coolPlayer, 'music-actions')
    expect(playListAudioActionsWrapper).length = 1
  })
  test('如果传入actions，应该渲染出play-actions容器', () => {
    const actions = [
      (music, active) => {
        return <span key={'test-actions'}>test-actions</span>
      }
    ]
    const coolPlayer = shallow(<CoolPlayer
      actions={actions}
      data={_data}
    />)
    const playActionsWrapper = findTestWrapper(coolPlayer, 'play-actions')
    expect(playActionsWrapper).length = 1
  })
  test('如果传入的autoPlay属性为true，那么音乐应该开始播放', () => {
    const coolPlayer = mount(<CoolPlayer data={_data} autoPlay={true}/>)
    const audio = findTestWrapper(coolPlayer, 'audio')
    expect(audio.instance().isPaused).toBeFalsy()
  })
  test('如果传入了currentAudio，那么播放器应该展示传入的这首歌曲的信息', () => {
    const currentAudio = _data[1]
    const coolPlayer = mount(<CoolPlayer data={_data} currentAudio={currentAudio}/>)
    const musicName = findTestWrapper(coolPlayer, 'music-name')
    expect(musicName.text()).toBe('大氿歌')
  })
  test('点击进度条，应该播放到相应位置', () => {
    const currentAudio = _data[1]
    const coolPlayer = mount(<CoolPlayer data={_data} currentAudio={currentAudio}/>)
    const progressBar = findTestWrapper(coolPlayer, 'progress-bar')
    progressBar.simulate('click', {
      pageX: 0
    })
    const audio = findTestWrapper(coolPlayer, 'audio')
    expect(audio.instance().currentTime).toBe(0)
  })
  test('如果传入了playListShow为true，播放列表应该出现', () => {
    const coolPlayer = mount(<CoolPlayer playListShow={true} data={_data}/>)
    const playListModal = findTestWrapper(coolPlayer, 'play-list-modal')
    expect(playListModal.length).toBe(1)
  })
  test('如果传入了playListShow为false，播放列表应该隐藏', () => {
    const coolPlayer = mount(<CoolPlayer playListShow={false} data={_data}/>)
    const playListModal = findTestWrapper(coolPlayer, 'play-list-modal')
    expect(playListModal.length).toBe(0)
  })
  test('如果传入了playDetailShow为true，播放详情应该显示', () => {
    const coolPlayer = mount(<CoolPlayer playDetailShow={true} data={_data}/>)
    const coolPlayerDetail = findTestWrapper(coolPlayer, 'cool-player-detail-modal')
    expect(coolPlayerDetail.length).toBe(1)
  })
  test('如果传入了playDetailShow为false，播放详情应该隐藏', () => {
    const coolPlayer = mount(<CoolPlayer playDetailShow={false} data={_data}/>)
    const coolPlayerDetail = findTestWrapper(coolPlayer, 'cool-player-detail-modal')
    expect(coolPlayerDetail.length).toBe(0)
  })
  test('如果传入了showDetailLyric为false，播放详情不应展示歌词', () => {
    const coolPlayer = mount(<CoolPlayer showDetailLyric={false} data={_data}/>)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const coolLyricDetail = findTestWrapper(coolPlayer, 'lyric-full-screen')
    expect(coolLyricDetail.length).toBe(0)
  })
})