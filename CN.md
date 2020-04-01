<p align="center">
  <img alt="logo" src="http://neroht.com/logo.png" width="100" max-width="100%">
</p>

<h1 align="center">
react-cool-music-player
</h1>

<h4 align="center">
适配PC端与移动设备的响应式音频播放组件。所有图标和文字可自定义，主题颜色可以修改，支持歌词同步滚动。
</h4>

<p align="center">
  <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="version 1.0.5" src="https://img.shields.io/badge/version-1.0.5-orange">
</p>

<p align="center">
  <a style="margin-right: 8px" href="http://coolplayer.neroht.com/">点击查看演示</a>
</p>


## 功能
适配PC端与移动设备，移动设备支持弹出播放详情页面
1. 播放控制
   - 上一曲，下一曲
   - 播放暂停
   - 滑动或者点击歌曲进度条实现音乐的快进快退
   - 滚动歌词定位播放位置，实现快进快退功能
   - 播放列表内音乐播放，删除，当前播放音乐高亮显示
2. 音量控制
   - 拖动、点击音量控制条控制音量
   - 点击音量图标切换静音状态
3. 状态展示
   - 播放音乐时封面图片旋转，暂停时停止旋转
   - 音乐剩余时间显示
   - 缓冲进度条
   - 播放进度条
   - 歌词同步滚动且当前歌词高亮
   - 音量为0时，音量图标显示为静音图标

# Usage
安装
```
npm install react-cool-music-player
```

在代码中使用

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import CoolPlayer from 'react-cool-music-player'
import 'react-cool-music-player/dist/index.css'
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://audio-avatar-cdn/Señorita.jpg',
      id: '66575568423123',
    },
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
    },
  ]
  return <div className={'wrapper'}>
      <CoolPlayer data={data}/>
    </div>
}
const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
```
# API
播放器内音频的数据结构：
```typescript
  interface IAudio {
    /*音频链接*/
    src: string
    /*歌手*/
    artist: string
    /*音频名称*/
    name: string
    /*音频图片*/
    img: string
    /*音频的id*/
    id: string
    /*歌词*/
    lyric?: string
    /*歌词翻译*/
    tLyric?: string
    /*是否禁用*/
    disabled?: boolean
    /*禁用的原因*/
    disabledReason?: string | React.ReactNode
  }
```
## 完整的API列表
| API                                      | 说明                                                                                             | 类型                                                                                         | 默认值                    |
| :--------------------------------------- |:-------------------------------------------------------------------------------------------------| :--------------------------------------------------------------------------------------------| :-------------------------|
| data                                     | 传入组件的音频数据，会展示在播放列表中                                                           | IAudio[]                                                                                     | -                         |
| play                                     | 控制播放器开始和停止播放                                                                         | boolean                                                                                      | false                     |
| playListPlaceholder                      | 播放列表为空时候的占位文字                                                                       | string                                                                                       | 'No data'                 |
| currentAudio                             | 可以控制当前播放器的音频，若不传入，播放器内待播放的音频默认为播放列表第一个音频                 | IAudio                                                                                       | -                         |
| playListShow                             | 便于外部控制播放列表展示与隐藏                                                                   | boolean                                                                                      | false                     |
| showPlayDetail                           | 点击歌曲图标是否展示播放详情（移动端有效）                                                       | boolean                                                                                      | true                      |
| playDetailShow                           | 便于外部控制播放详情的显示与隐藏（移动端有效）                                                   | boolean                                                                                      | false                     |
| detailBackground                         | 播放详情页面的背景（移动端有效）                                                                 | `React.ReactNode`                                                                            | -                         |
| volume                                   | 音量，传入组件可以控制播放器音量大小，范围是0到1                                                 | number                                                                                       | 0.5                       |
| zIndex                                   | 播放器整体容器的z-index值                                                                        | number                                                                                       | 1000                      |
| showLyricNormal                          | 在非移动端状态下是否展示歌词                                                                     | boolean                                                                                      | false                     |
| showDetailLyric                          | 移动端状态下是否在歌曲详情页面展示歌词                                                           | boolean                                                                                      | false                     |
| showLyricMini                            | 移动端状态下是否展示迷你歌词                                                                     | boolean                                                                                      | false                     |
| playMode                                 | 播放模式，传入可控制播放器内播放列表的播放模式（顺序播放、随机播放、单曲循环）                   | `order`,`random`,`loop`                                                                      | `order`                   |
| lyric                                    | 异步加载歌词时，传入的歌词数据                                                                   | string                                                                                       | -                         |
| tLyric                                   | 异步加载歌词时，如需要展示歌词翻译，传入的歌词翻译                                               | string                                                                                       | -                         |
| lyricLoading                             | 用于异步加载歌词时的加载状态显示                                                                 | boolean                                                                                      | false                     |
| lyricPlaceholder                         | 歌词数据为空时的占位元素                                                                         | `React.ReactNode` or `string`                                                                | false                     |
| showProgressControlByLyricScroll         | 移动端状态下，播放详情中是否需要通过手动滚动歌词调整播放进度                                     | boolean                                                                                      | true                      |
| avatarPlaceholder                        | 歌曲图片为空时歌曲图标的占位元素                                                                 | `React.ReactNode`                                                                            | <div></div>               |
| actions                                  | 非移动端状态下，展示在播放器内部的操作组，在播放模式按钮与音量控制按钮之间                       | `Array<(data: IAudio) => React.ReactNode>`                                                   | []                        |
| detailActionTopRight                     | 移动端状态下，展示在播放详情内部右上角的操作元素                                                 | `(data: IAudio) => React.ReactNode`                                                          | -                         |
| detailActionsBottom                      | 移动端状态下，展示在播放详情内部进度条上方的操作组                                               | `Array<(data: IAudio) => React.ReactNode>`                                                   | []                        |
| playListAudioActions                     | 播放列表内每首音频的操作组，在歌曲名称右侧，移动端激活状态下显示，非移动端hover时显示            | `Array<(data: IAudio, active?: boolean) => React.ReactNode>`                                 | []                        |
| playListHeader                           | 播放列表顶部的左右两个元素                                                                       | { headerLeft?: ` React.ReactNode or string`, headerRight?: `React.ReactNode or string` }     | headerLeft: 'Play list', headerRight: '' |
| primaryColor                             | 主题颜色                                                                                         | string                                                                                       | '#33beff'                  |
| icons                                    | 自定义图标                                                                                       | Object                                                                                       | 见下方描述                 |
| onPlayListStatusChange                   | 播放列表显示和隐藏时的回调函数，如果希望通过playListShow控制播放列表的显示隐藏状态，则需要在这个回调中同步设置playListShow的值 | (status: boolean) => void                                      | -                          |
| onPlayDetailStatusChange                 | 播放详情展示或者隐藏时的回调函数，如果希望通过playDetailShow控制播放详情的显示隐藏状态，则需要在这个回调中同步设置playDetailShow的值 | (status: boolean) => void                                | -                          |
| onDelete                                 | 删除播放列表音频的回调函数                                                                       | (index: number, id: string) => void                                                          | -                          |
| onVolumeChange                           | 音量变化时的回调函数                                                                             | (volume: number) => void                                                                     | -                          |
| onAudioChange                            | 播放器内音频改变触发的回调函数                                                                   | (id: string, currentMusic: IAudio) => void                                                   | -                          |
| onPlayStatusChange                       | 切换播放和暂停触发的回调函数                                                                     | (currentMusic: IAudio, isPlayed: boolean) => void                                            | -                          |
| onModeChange                             | 切换播放模式触发的回调函数                                                                       | (currentMode: PlayMode, prevMode: PlayMode) => void                                          | -                          |

## 构建命令
* 安装依赖
```
npm install
```
* 启动开发环境
```
npm run dev
```
* 本地访问
```
http://localhost:8080
```
* 打包构建
```
npm run build
```
* 打包并在本地启动express服务器访问
```
npm start
```
* 自动化测试
```
npm run test
```
* 生成测试覆盖率报告
```
npm run coverage
```
* 代码风格检查
```
npm run lint
```
* 代码风格自动修复
```
npm run lint-fix
```

## 自定义图标
如果你对于组件中的任何图标不满意，那么可以将自定义的图标传入组件替换掉不想要的图标。
```javascript
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
    },
  ]
  return <div className={'wrapper'}>
      <CoolPlayer
        data={data}
        icons={{
          playIcon: <svg
              viewBox="0 0 1025 1024"
              width="26" height="26"
          >
            <path
              d="M398.848 253.952l322.048 234.496c13.312 12.288 13.824 32.768 2.048 46.08l-1.536 1.536L399.36 770.56c-13.312 10.24-30.72-3.072-30.72-24.064V277.504c0-20.992 16.896-34.304 30.208-23.552z m113.664-221.696c-264.704 0.512-479.232 215.552-478.72 480.768 0.512 265.216 216.064 479.744 480.768 479.232 264.704-0.512 479.232-215.04 479.232-480.256-0.512-265.216-215.552-480.256-481.28-479.744 0-0.512 0 0 0 0z m0 885.76c-224.256-0.512-405.504-182.784-404.992-406.528s182.784-405.504 406.528-404.992c223.744 0.512 404.992 182.272 404.992 406.016 0.512 223.744-181.76 405.504-406.528 405.504 0.512 0 0.512 0 0 0z"
              fill="#2C2C2C"
            />
          </svg>
        }}
      />
    </div>
}
```
完整的图标列表：
```typescript
interface Iicon {
      /*控制播放列表显示或隐藏的图标*/
      playListIcon?: React.ReactNode
      /*播放列表每个音频前面的播放按钮*/
      playListPlay?: React.ReactNode
      /*播放列表中每个音频正在播放的图标*/
      playListPlaying?: React.ReactNode
      /*播放列表中删除音频的删除图标*/
      deleteIcon?: React.ReactNode
      /*播放*/
      playIcon?: React.ReactNode
      /*暂停*/
      pauseIcon?: React.ReactNode
      /*上一首*/
      prevIcon?: React.ReactNode
      /*下一首*/
      nextIcon?: React.ReactNode
      /*顺序播放*/
      modeOrder?: React.ReactNode
      /*随机播放*/
      modeRandom?: React.ReactNode
      /*单曲循环*/
      modeLoop?: React.ReactNode
      /*音量*/
      volumeIcon?: React.ReactNode
      /*静音*/
      muteIcon?: React.ReactNode
      /*隐藏播放详情*/
      detailHide?: React.ReactNode
}
```
## 歌词显示功能
播放器支持音频数据自带歌词与远程加载歌词两种方式，这两种方式都可以支持歌词的译文显示。歌词与歌词译文必须是以下这种形式：
```javascript
const lyricExample = '[00:18.220]Oh, loves gonna get you down\n[00:20.880]Sucking to hard on your lollipop\n[00:23.600]Loves gonna get you down'
```
### 自带歌词
自带的歌词需要存储在音频数据的lyric字段中，如需显示歌词译文，则需要将它存储在tLyric字段中。注意：当在移动端显示迷你歌词时，不会显示歌词译文
```javascript
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
      lyric: "[00:00.425] 作词:Mika\n[00:00.850] 作曲:Mika\n[00:00.860]What's the big idea\n[00:03.230]Yo, Mika\n[00:10.680]I said sucking to hard on your lollipop\n[00:13.530]Oh, loves gonna get you down",
      tLyric: '[by:人间好时节]\n[00:00.860]嘿,有什么大不了的！\n[00:03.230]呦 MIKA\n[00:10.680]我说， 用力吃你的棒棒糖，爱情只会让你失望',
    },
  ]
  return <div className={'wrapper'}>
      <CoolPlayer
        data={data}
        showLyricNormal={true}
        showDetailLyric={true}
      />
    </div>
}
```
### 远程加载歌词
支持单独传入当前音频的歌词，可以在onAudioChange函数中获取当前的音频信息，然后远程加载相应歌词传到播放器内显示，但应该注意，在onAudioChange函数中应该将之前的歌词重置为空。
```javascript
const App = () => {
  const data = [
    {
      src: 'http://neroht.com/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://neroht.com/mika.jpg',
      id: '66575568425354321',
    },
  ]
  const [ lyric, setLyric ] = useState('')
  const [ tLyric, setTLyric ] = useState('')
  const [ lyricLoading, setLyricLoading ] = useState(false)
  const onAudioChange = (id, currentMusic) => {
    setLyric('')
    setTLyric('')
    if (!currentMusic.lyric) {
      fetch(`/api/lyric/${id}`)
        .then(res => {
          return res.json()
        })
        .then(res => {
          setLyricLoading(false)
          if (res.result && res.data) {
            const { lyric, tLyric } = res.data
            setLyric(lyric)
            if (tLyric) {
              setTLyric(tLyric)
            }
          }
        })
    }
  }
  return <div className={'wrapper'}>
      <CoolPlayer
        data={data}
        lyric={lyric}
        tLyric={tLyric}
        lyricLoading={lyricLoading}
        onAudioChange={onAudioChange}
      />
    </div>
}
```
## 音频禁用状态
如果音频因为某些原因不可播放（例如没有版权许可），则可以在音频数据结构中添加disabled字段，值为Boolean类型。此时播放列表内如果有被禁用的音频，那么它将会被置灰，点击无法被播放出来。切换上一首下一首时，如果遇到被禁用的音频，则会跳过它。
禁用状态可以被移出播放列表。如果想表明被禁用的原因，可以添加disabledReason字段，字段值将展示在音频名称后面。
```javascript
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://audio-avatar-cdn/Señorita.jpg',
      id: '66575568423123',
      disabled: true,
      disabledReason: 'Cannot play the Audio'
    },
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
    },
  ]
  return <div className={'wrapper'}>
      <CoolPlayer data={data}/>
    </div>
}
```
## 外部控制播放状态
播放器提供play属性来支持从外部控制播放与暂停。
```javascript
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
    },
  ]
  const [ play, setPlay ] = useState(false)
  const onTogglePlaying = () => {
    setPlay(!play)
  }
  return <div className={'wrapper'}>
     <button onClick={onTogglePlaying}>
        { play ? 'Pause' : 'Play' }
     </button>
     <CoolPlayer data={data} play={play}/>
    </div>
}
```

## 传入操作组
如果当前播放器的功能不满足的你需求，你可以传入操作组来进行功能扩展。以actions为例，操作组是一个数组，数组的每个元素使用render-props的方式接收
当前播放的音频信息，并返回一个ReactNode。其余的操作组有：detailActionTopRight（类型为函数，参照上方API列表）、detailActionsBottom、playListAudioActions
```javascript
const App = () => {
  const data = [
    {
      src: 'http://audio-cdn/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://audio-avatar-cdn/mika.jpg',
      id: '66575568425354321',
    },
  ]
  const onActionsClick = audio => {
    console.log(audio) // data[0]
  }
  const actions = [
    audio => <div key={'a'} onClick={() => onActionsClick(audio)}>action A </div>,
    audio => <div key={'b'} onClick={() => onActionsClick(audio)}>action B</div>
  ]
  return <div className={'wrapper'}>
     <CoolPlayer data={data} actions={actions}/>
    </div>
}
```


