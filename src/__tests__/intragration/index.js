/**
 * Author: NERO
 * Date: 2020/1/31 0031
 * Time: 11:05
 *
 */
import * as React from 'react'
import { mount } from 'enzyme'
import { getTime } from '../../utils/index'
import CoolPlayer from '../../index'
import { findTestWrapper } from '../../utils/testUtils'

describe('cool player functional test', () => {
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
  const currentAudio = {
    src: 'http://neroht.com/%E4%BC%A6%E6%A1%91%20-%20%E7%83%9F%E9%9B%A8%E8%A1%8C%E8%88%9F.mp3',
    artist: '伦桑',
    name: '烟雨行舟',
    img: 'http://neroht.com/yanyuxingzhou.jpg',
    id: '66575568444',
  }
  test('点击播放列表按钮后，播放列表应该出现', () => {
    const coolPlayer = mount(<CoolPlayer data={_data}/>)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const playListModal = findTestWrapper(coolPlayer, 'play-list-modal')
    expect(playListModal.length).toBe(1)
  })
  test('展开播放列表，如果传入了歌曲数据，那么应该渲染出歌曲列表', () => {
    const coolPlayer = mount(<CoolPlayer data={_data}/>)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    expect(singleMusic.length).toBe(_data.length)
  })
  test('点击播放按钮后，音乐应该播放', () => {
    const coolPlayer = mount(<CoolPlayer data={_data} playing={false}/>)
    const playBtn = findTestWrapper(coolPlayer, 'play-btn')
    const audio = findTestWrapper(coolPlayer, 'audio')
    audio.instance().play = jest.fn()
    playBtn.simulate('click')
    expect(audio.instance().play).toHaveBeenCalled()
  })
  test('点击暂停按钮后，音乐应该停止播放', () => {
    const coolPlayer = mount(<CoolPlayer data={_data}/>)
    const audio = findTestWrapper(coolPlayer, 'audio')
    if (!audio.instance().paused) {
      const pauseBtn = findTestWrapper(coolPlayer, 'pause-btn')
      audio.instance().pause = jest.fn()
      pauseBtn.simulate('click')
      expect(audio.instance().pause).toHaveBeenCalled()
    }
  })
  test('点击上一首，应该播放当前歌曲的上一首音乐', () => {
    let currentMusic = _data[0]
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      currentAudio={currentAudio}
      onMusicChange={(id, audio) => {
        currentMusic = audio
      }}
    />)
    const prevBtn = findTestWrapper(coolPlayer, 'prev-btn')
    prevBtn.simulate('click')
    expect(currentMusic).toEqual(_data[1])
  })
  test('点击下一首，应该播放当前歌曲的下一首音乐', () => {
    let currentMusic = _data[1]
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      currentAudio={currentAudio}
      onMusicChange={(id, audio) => {
        currentMusic = audio
      }}
    />)
    const nextBtn = findTestWrapper(coolPlayer, 'next-btn')
    nextBtn.simulate('click')
    expect(currentMusic).toEqual(_data[0])
  })
  test('点击播放模式切换按钮，应显示正确的播放模式', () => {
    const playMode = {
      Order: 1,
      Random:2,
      Loop:3
    }
    let mode = 1
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      currentAudio={currentAudio}
      onModeChange={(currentMode) => {
        mode = currentMode
      }}
    />)
    const playModeBtn = findTestWrapper(coolPlayer, 'play-mode-btn')
    playModeBtn.simulate('click')
    expect(mode === playMode.Random)
    expect(findTestWrapper(coolPlayer, 'random').length).toBe(1)
    playModeBtn.simulate('click')
    expect(mode === playMode.Loop)
    expect(findTestWrapper(coolPlayer, 'loop').length).toBe(1)
    playModeBtn.simulate('click')
    expect(mode === playMode.Order)
    expect(findTestWrapper(coolPlayer, 'order').length).toBe(1)
  })
  test('切换静音，应该有效', () => {
    const coolPlayer = mount(<CoolPlayer
      data={_data}
    />)
    const notMute = findTestWrapper(coolPlayer, 'icon-volume')
    notMute.simulate('click')
    expect(findTestWrapper(coolPlayer, 'icon-mute').length).toBe(1)
    const mute = findTestWrapper(coolPlayer, 'icon-mute')
    mute.simulate('click')
    expect(findTestWrapper(coolPlayer, 'icon-volume').length).toBe(1)
  })
  test('点击播放列表中的某一首歌曲，应该播放这首歌曲，该歌曲前方的图标应变为播放中', () => {
    let audio
    const coolPlayer = mount(<CoolPlayer
      onMusicChange={(id, music) => {
        audio = music
      }}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const playThis = findTestWrapper(singleMusic.at(1), 'play-this')
    playThis.simulate('click')
    expect(audio).toEqual(_data[1])
    const _singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const iconPlaying = findTestWrapper(_singleMusic.at(1), 'icon-playing')
    expect(iconPlaying.length).toBe(1)
  })
  test('如果正在播放播放列表的最后一首音乐，但删除了它，应播放第一首歌曲', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer
      onDelete={fn}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const iconPlay = findTestWrapper(singleMusic.at(1), 'icon-play')
    iconPlay.simulate('click')
    const iconDelete = findTestWrapper(singleMusic.at(1), 'icon-delete')
    iconDelete.simulate('click')
    const audio = findTestWrapper(coolPlayer, 'audio')
    expect(audio.instance().src).toBe(_data[0].src)
  })
  test('如果在播放列表中当前正在播放的音乐被删除，应该播放下一首音乐', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer
      onDelete={fn}
      data={_data}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const iconPlay = findTestWrapper(singleMusic.at(0), 'icon-play')
    iconPlay.simulate('click')
    const iconDelete = findTestWrapper(singleMusic.at(0), 'icon-delete')
    iconDelete.simulate('click')
    const audio = findTestWrapper(coolPlayer, 'audio')
    expect(audio.instance().src).toBe(_data[1].src)
  })
  test('如果在播放列表中的音乐都被删除完了，播放控制中的音乐信息应该清空，进度条归零', () => {
    const fn = jest.fn()
    const fakeData = [ _data[0] ]
    const coolPlayer = mount(<CoolPlayer
      onDelete={fn}
      data={fakeData}
    />)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    const iconPlay = findTestWrapper(singleMusic.at(0), 'icon-play')
    iconPlay.simulate('click')
    const iconDelete = findTestWrapper(singleMusic.at(0), 'icon-delete')
    iconDelete.simulate('click')
    const audio = findTestWrapper(coolPlayer, 'audio')
    const musicName = findTestWrapper(coolPlayer, 'music-name')
    const progressBuffered = findTestWrapper(coolPlayer, 'progress-buffered')
    const progressPlayed = findTestWrapper(coolPlayer, 'progress-played')
    expect(audio.instance().src).toBe('')
    expect(musicName.text()).toBe('')
    expect(progressBuffered.instance().style.width).toBe('0%')
    expect(progressPlayed.instance().style.width).toBe('0%')
  })
  test('点击音乐的头像，详情应该出现', () => {
    const coolPlayer = mount(<CoolPlayer data={_data} playing={false}/>)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const coolPlayerDetail = findTestWrapper(coolPlayer, 'cool-player-detail')
    expect(coolPlayerDetail.length).toBe(1)
  })
})