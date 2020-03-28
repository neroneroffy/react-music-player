/**
 * Author: NERO
 * Date: 2020/1/31 0031
 * Time: 11:05
 *
 */
import * as React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils';
import CoolPlayer from '../../index'
import LyricDetail from '../../Lyric/LyricDetail'
import { findTestWrapper } from '../../utils/testUtils'

describe('cool player functional test', () => {
  const _data = [
    {
      src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
      artist: '瑾姝',
      name: '西巷桥边',
      img: 'http://neroht.com/109951164352276322.jpg',
      id: '66575568141',
      lyric: '[00:00.000] 作曲 : 袁雨桐\n[00:00.031] 作词 : 芒果冰沙柠檬水\n[00:00.93]策划：袁雨桐\n[00:02.18]作词：芒果冰沙柠檬水\n[00:05.86]歌手：慕斯の小乖 瑾姝\n[00:06.85]和声编唱：shelly雪菜\n[00:07.94]混音：圣雨轻纱\n[00:08.58]海报：且离不语\n[00:09.28]题字：未海\n[00:09.49]曲绘：含姜\n[00:10.22]PV：阿逗\n[00:11.01]剧情策划：米羔\n[00:11.84]剧情编剧：闵太岁\n[00:12.96]成年王爷：江笙【翼之声】\n[00:13.90]成年女侠：赟珩【翼之声】\n[00:14.81]幼年王爷：上蝎【语翼配音组】\n[00:15.51]幼年女侠：安陌【长安古意】\n[00:16.10]家仆：戾格\n[00:16.67]音效后期：墓墓Musak\n[00:17.30]-镜予歌出品-\n[00:19.25]【慕斯の小乖】\n[00:19.60]满身月华香气\n[00:22.11]妄猜天中事\n[00:24.52]应是白玉盘里折枝\n[00:29.09]绊倒早慧稚子\n[00:31.30]撞散紫色衣襟上寒气\n[00:38.73]应是嫦娥轻掷\n[00:41.38]于热闹市井\n[00:43.75]才幸得此间能与君相识\n[00:48.07]颔首谢侠客义气\n[00:50.96]同行看花灯千里\n[00:56.36]【瑾姝】\n[00:57.23]欲踏遍山河看尽锦绣万里\n[01:02.09]而你是万里清辉中一处景\n[01:06.91]再谈前岁中不更事的闯荡昂首风发意气\n[01:16.36]曾阅过诗书也知江湖侠气\n[01:21.32]笑问长刀出鞘否二三轶事\n[01:26.10]而你胜似茶馆里说书人也道不完的传奇\n[01:35.94]\n[01:54.32]【慕斯の小乖】\n[01:55.31]纵使圆月正明\n[01:58.04]总有言尽时\n[02:00.49]这场年少因缘会际\n[02:05.04]未到凉风起时\n[02:07.38]便带着悬念挥手离去\n[02:14.72]又是一年秋瞑\n[02:17.37]熟悉场景里\n[02:19.74]西巷桥边轻风枯叶交织\n[02:23.90]共花灯泛起涟漪\n[02:26.83]惊动谁人的思绪\n[02:32.28]【瑾姝】\n[02:33.09]说书人故事再添壮志豪情\n[02:38.04]结饰台榭上 陈词又多几笔\n[02:42.89]戏言传闻里你飞檐走壁到底可信不可信\n[02:52.48]再逢时天花盛放烟树历历\n[02:57.21]倒映在唇边弯弯含笑眸子\n[03:01.98]桥下花灯兀自放远了你暂留此间的足迹\n[03:10.73]【合唱】\n[03:11.57]江湖客看了太多月朗星稀\n[03:16.52]颠沛流离间难免见景生情\n[03:21.22]揽尽万千萤火光亮也难及当年月下风景\n[03:30.89]说起这一路崎岖甘之如饴\n[03:35.65]践行后未 复有人能与其奇\n[03:40.33]相对斟满月桂陈酒数杯敬月敬君敬知己\n[03:51.62]\n',

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
  test('点击播放列表按钮后，播放列表应该出现，onPlayListStatusChange应该被触发', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer onPlayListStatusChange={fn} data={_data}/>)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const playListModal = findTestWrapper(coolPlayer, 'play-list-modal')
    expect(playListModal.length).toBe(1)
    expect(fn).toHaveBeenCalledWith(true)
  })
  test('展开播放列表，如果传入了歌曲数据，那么应该渲染出歌曲列表', () => {
    const coolPlayer = mount(<CoolPlayer data={_data}/>)
    const btn = findTestWrapper(coolPlayer, 'play-list-btn')
    btn.simulate('click')
    const singleMusic = findTestWrapper(coolPlayer, 'single-music')
    expect(singleMusic.length).toBe(_data.length)
  })
  test('如果歌曲被禁用，点击播放按钮后，音乐不应该播放', () => {
    const dataDisabled = {
      src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
      artist: '瑾姝Hikari',
      name: '大氿歌',
      img: 'http://neroht.com/daguige.jpg',
      id: '66575568442',
      disabled: true,
    }
    const coolPlayer = mount(<CoolPlayer data={_data} currentAudio={dataDisabled} playing={false}/>)
    const playBtn = findTestWrapper(coolPlayer, 'play-btn')
    const audio = findTestWrapper(coolPlayer, 'audio')
    audio.instance().play = jest.fn()
    playBtn.simulate('click')
    expect(audio.instance().play).toHaveBeenCalledTimes(0)
  })
  test('点击播放按钮后，音乐应该播放', () => {
    const coolPlayer = mount(<CoolPlayer data={_data}/>)
    const playBtn = findTestWrapper(coolPlayer, 'play-btn')
    const audio = findTestWrapper(coolPlayer, 'audio')
    audio.instance().play = jest.fn()
    playBtn.simulate('click')
    expect(audio.instance().play).toHaveBeenCalled()
  })
  test('如果没传入音频，点击播放按钮后，音乐不应该播放', () => {
    const coolPlayer = mount(<CoolPlayer/>)
    const playBtn = findTestWrapper(coolPlayer, 'play-btn')
    const audio = findTestWrapper(coolPlayer, 'audio')
    audio.instance().play = jest.fn()
    playBtn.simulate('click')
    expect(audio.instance().play).toHaveBeenCalledTimes(0)
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
  test('如果传入的歌曲被禁用，点击播放按钮后，音乐不应该播放', () => {
    const disabledData = [{
      src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
      artist: '瑾姝',
      name: '西巷桥边',
      img: 'http://neroht.com/109951164352276322.jpg',
      id: '66575568141',
      lyric: '[00:00.000] 作曲 : 袁雨桐\n[00:00.031] 作词 : 芒果冰沙柠檬水\n[00:00.93]策划：袁雨桐\n[00:02.18]作词：芒果冰沙柠檬水\n[00:05.86]歌手：慕斯の小乖 瑾姝\n[00:06.85]和声编唱：shelly雪菜\n[00:07.94]混音：圣雨轻纱\n[00:08.58]海报：且离不语\n[00:09.28]题字：未海\n[00:09.49]曲绘：含姜\n[00:10.22]PV：阿逗\n[00:11.01]剧情策划：米羔\n[00:11.84]剧情编剧：闵太岁\n[00:12.96]成年王爷：江笙【翼之声】\n[00:13.90]成年女侠：赟珩【翼之声】\n[00:14.81]幼年王爷：上蝎【语翼配音组】\n[00:15.51]幼年女侠：安陌【长安古意】\n[00:16.10]家仆：戾格\n[00:16.67]音效后期：墓墓Musak\n[00:17.30]-镜予歌出品-\n[00:19.25]【慕斯の小乖】\n[00:19.60]满身月华香气\n[00:22.11]妄猜天中事\n[00:24.52]应是白玉盘里折枝\n[00:29.09]绊倒早慧稚子\n[00:31.30]撞散紫色衣襟上寒气\n[00:38.73]应是嫦娥轻掷\n[00:41.38]于热闹市井\n[00:43.75]才幸得此间能与君相识\n[00:48.07]颔首谢侠客义气\n[00:50.96]同行看花灯千里\n[00:56.36]【瑾姝】\n[00:57.23]欲踏遍山河看尽锦绣万里\n[01:02.09]而你是万里清辉中一处景\n[01:06.91]再谈前岁中不更事的闯荡昂首风发意气\n[01:16.36]曾阅过诗书也知江湖侠气\n[01:21.32]笑问长刀出鞘否二三轶事\n[01:26.10]而你胜似茶馆里说书人也道不完的传奇\n[01:35.94]\n[01:54.32]【慕斯の小乖】\n[01:55.31]纵使圆月正明\n[01:58.04]总有言尽时\n[02:00.49]这场年少因缘会际\n[02:05.04]未到凉风起时\n[02:07.38]便带着悬念挥手离去\n[02:14.72]又是一年秋瞑\n[02:17.37]熟悉场景里\n[02:19.74]西巷桥边轻风枯叶交织\n[02:23.90]共花灯泛起涟漪\n[02:26.83]惊动谁人的思绪\n[02:32.28]【瑾姝】\n[02:33.09]说书人故事再添壮志豪情\n[02:38.04]结饰台榭上 陈词又多几笔\n[02:42.89]戏言传闻里你飞檐走壁到底可信不可信\n[02:52.48]再逢时天花盛放烟树历历\n[02:57.21]倒映在唇边弯弯含笑眸子\n[03:01.98]桥下花灯兀自放远了你暂留此间的足迹\n[03:10.73]【合唱】\n[03:11.57]江湖客看了太多月朗星稀\n[03:16.52]颠沛流离间难免见景生情\n[03:21.22]揽尽万千萤火光亮也难及当年月下风景\n[03:30.89]说起这一路崎岖甘之如饴\n[03:35.65]践行后未 复有人能与其奇\n[03:40.33]相对斟满月桂陈酒数杯敬月敬君敬知己\n[03:51.62]\n',
      disabled: true
    }]
    const coolPlayer = mount(<CoolPlayer data={disabledData}/>)
    const playBtn = findTestWrapper(coolPlayer, 'play-btn')
    const audio = findTestWrapper(coolPlayer, 'audio')
    audio.instance().play = jest.fn()
    playBtn.simulate('click')
    expect(audio.instance().play).toHaveBeenCalledTimes(0)
  })
  test('点击上一首，应该播放当前歌曲的上一首音乐', () => {
    let currentMusic = _data[0]
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      currentAudio={currentAudio}
      onAudioChange={(id, audio) => {
        currentMusic = audio
      }}
    />)
    const prevBtn = findTestWrapper(coolPlayer, 'prev-btn')
    prevBtn.simulate('click')
    expect(currentMusic).toEqual(_data[1])
  })
  test('点击上一首，如果当前上一首被disabled，则跳过它，播放再上一首', () => {
    const _data = [
      {
        src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
        artist: 'Señorita',
        name: 'Shawn Mendes',
        img: 'http://neroht.com/Señorita.jpg',
        id: '66575568423123',
      },
      {
        src: 'http://neroht.com/MIKA - Lollipop.mp3',
        artist: 'Mika',
        name: 'Lollipop',
        img: 'http://neroht.com/mika.jpg',
        id: '66575568425354321',
      },
      {
        src: 'http://neroht.com/Shayne Ward - Breathless.mp3',
        artist: 'Shayne Ward',
        name: 'Breathless',
        img: 'http://neroht.com/shayneWard.jpg',
        id: '66575568425467865',
        disabled: true,
      },
    ]
    let currentMusic = _data[0]
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      onAudioChange={(id, audio) => {
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
      onAudioChange={(id, audio) => {
        currentMusic = audio
      }}
    />)
    const nextBtn = findTestWrapper(coolPlayer, 'next-btn')
    nextBtn.simulate('click')
    expect(currentMusic).toEqual(_data[0])
  })
  test('点击下一首，如果当前下一首被disabled，则跳过它，播放再下一首', () => {
    const _data = [
      {
        src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
        artist: 'Señorita',
        name: 'Shawn Mendes',
        img: 'http://neroht.com/Señorita.jpg',
        id: '66575568423123',
      },
      {
        src: 'http://neroht.com/MIKA - Lollipop.mp3',
        artist: 'Mika',
        name: 'Lollipop',
        img: 'http://neroht.com/mika.jpg',
        id: '66575568425354321',
        disabled: true,
      },
      {
        src: 'http://neroht.com/Shayne Ward - Breathless.mp3',
        artist: 'Shayne Ward',
        name: 'Breathless',
        img: 'http://neroht.com/shayneWard.jpg',
        id: '66575568425467865',
      },
    ]
    let currentMusic = _data[0]
    const coolPlayer = mount(<CoolPlayer
      data={_data}
      onAudioChange={(id, audio) => {
        currentMusic = audio
      }}
    />)

    const nextBtn = findTestWrapper(coolPlayer, 'next-btn')
    nextBtn.simulate('click')
    expect(currentMusic).toEqual(_data[2])
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
      onAudioChange={(id, music) => {
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
  test('点击音乐的头像，详情应该出现，onPlayDetailStatusChange函数应该被触发', () => {
    const fn = jest.fn()
    const coolPlayer = mount(<CoolPlayer data={_data} onPlayDetailStatusChange={fn} playing={false}/>)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const coolPlayerDetail = findTestWrapper(coolPlayer, 'cool-player-detail-modal')
    expect(coolPlayerDetail.length).toBe(1)
    expect(fn).toBeCalledWith(true)
  })
  test('播放详情点击歌词，歌词应该全屏', (done) => {
    const coolPlayer = mount(<CoolPlayer data={_data} showDetailLyric={true} playing={false}/>)
    const detailShow = findTestWrapper(coolPlayer, 'detail-show')
    detailShow.simulate('click')
    const lyricFullScreen = findTestWrapper(coolPlayer, 'lyric-full-screen')
    lyricFullScreen.simulate('click')
    const lyricDetailWrapper = findTestWrapper(coolPlayer, 'lyric-detail-wrapper')
    setTimeout(() => {
      expect(lyricDetailWrapper.instance().className).toBe('cool-lyric-detail cool-lyric-detail-full-screen')
      done()
    }, 60)
  })
})