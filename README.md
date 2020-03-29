<p align="center">
  <img alt="logo" src="http://neroht.com/logo.png" width="100" max-width="100%">
</p>

<h1 align="center">
react-cool-music-player
</h1>

<h4 align="center">
适配PC端与移动设备的响应式音频播放组件
</h4>

**React@16.12.0** **TypeScript@3.7.3**

[点击查看演示](http://coolplayer.neroht.com/)</br>

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
   - 音量为0时，音量图标切换为静音

# Usage
安装依赖
```
npm install react-cool-player
```
在代码中使用
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import CoolPlayer from 'react-cool-music-player'
import 'node_modules/react-cool-music-player/dist/index.css'
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
    /*唯一标识*/
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
| data                                     | 传入组件的音频数据， 会展示在播放列表中                                                          | IAudio[]                                                                                     | -                         |
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
| lyricLoading                             | 异步加载歌词时的loading状态                                                                      | boolean                                                                                      | false                     |
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
如果你对于组件中的任何图标不满意，那么可以将自定义的图标传入组件替换掉不想要的图标：
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
自带的歌词需要存储在音频数据的lyric字段中，如需显示歌词译文，则需要将它存储在tLyric字段中。
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
支持单独传入对应音频的歌词，可以在onAudioChange函数中获取当前的音频，然后远程加载歌词传到播放器内显示，但应该注意，应在onAudioChange函数中将之前的歌词重置为空。
```javascript
const App = () => {
  const data = [
    {
      src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://neroht.com/Señorita.jpg',
      id: '66575568423123',
      lyric: "[by:Trap_Girl]\n[00:00.000] 作曲 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:01.000] 作词 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:12.22]Camila Cabello：\n[00:15.29]I love it when you call me Señorita\n[00:19.36]I wish I could pretend I didn't need ya\n[00:23.43]But every touch is ooh la la la\n[00:26.54]It's true la la la\n[00:28.51]Ooh I should be runnin'\n[00:30.57]Ooh you keep me coming for ya\n[00:32.95]Shawn Mendes：\n[00:33.29]Land in miami\n[00:35.22]The air was hot from summer rain\n[00:37.27]Sweat dripping off me\n[00:39.44]Before I even knew her name la la la\n[00:44.41]It felt like ooh la la la\n[00:47.07]Yeah noo\n[00:49.47]Sapphire moonlight\n[00:51.50]We danced for hours in the sand\n[00:53.65]Tequila sunrise\n[00:55.71]Her body fit right in my hands la la la\n[01:00.85]It felt like ooh la la la yeah\n[01:04.28]Both：\n[01:04.47]I love it when you call me Señorita\n[01:08.54]I wish I could pretend I didn't need ya\n[01:12.64]But every touch is ooh la la la\n[01:15.76]It's true la la la\n[01:17.86]Ooh I should be runnin'\n[01:19.85]Oohh you know I love it when you call me Señorita\n[01:25.05]I wish it wasn't so d**n hard to leave ya\n[01:29.12]But every touch is ooh la la la\n[01:32.26]It's true la la la\n[01:34.16]Ooh I should be runnin'\n[01:36.18]Ooh you keep me coming for ya\n[01:38.54]Camila Cabello：\n[01:38.86]Locked in the hotel\n[01:40.86]There's just somethings that never change\n[01:42.92]You say we're just friends\n[01:44.92]But friends don't know the way you taste la la la\n[01:50.63]God knows it's been a long time coming don't ya let me fall ooh\n[01:54.50]Both：\n[01:55.08]Hooked on your lips undress me\n[01:57.03]Hooked on your tongue\n[01:58.99]Oh I love your kiss is deadly don't stop\n[02:02.11]I love it when you call me Señorita\n[02:06.04]I wish I could pretend I didn't need ya\n[02:10.04]But every touch is ooh la la la\n[02:13.11]It's true la la la\n[02:15.21]Ooh I should be runnin'\n[02:17.23]Ooh you know I love it when you call me Señorita\n[02:22.42]I wish it wasn't so d**n hard to leave ya\n[02:26.48]But every touch is ooh la la la\n[02:29.60]It's true la la la\n[02:31.61]Ooh I should be runnin'\n[02:33.68]Ooh you keep me coming for ya\n[02:37.44]All along I've been coming for ya\n[02:40.31]For you\n[02:41.70]And I hope it means something to you\n[02:45.75]Call my name I'll be coming for ya\n[02:48.36]Coming for ya\n[02:49.42]Calling for ya\n[02:50.50]Coming for ya\n[02:51.81]For ya\n[02:55.80]For ya\n[02:57.87]Oh she loves it when I call her\n[02:59.94]For ya\n[03:04.55]Ooh I should be runnin'\n[03:06.51]Ooh you keep me coming for ya\n",
      tLyric: "[by:咆哮的小清新___]\n[00:12.22]\n[00:15.29]我爱你称我为\"我的小姐\"时的样子\n[00:19.36]多希望我可以假装不需要你\n[00:23.43]但每一次触碰都妙不可语\n[00:26.54]真实无比 lalala\n[00:28.51]噢 我想我应该逃走\n[00:30.57]噢但你却将我牢牢吸引掌控\n[00:32.95]\n[00:33.29]着陆在迈阿密\n[00:35.22]盛夏雨季的空气炙热难息\n[00:37.27]汗流不停\n[00:39.44]在我知道她的名字之前就汗流不停\n[00:44.41]那感觉就像 噢\n[00:47.07]\n[00:49.47]午夜里的蓝宝石璀璨不息\n[00:51.50]你我在沙滩上久久共舞\n[00:53.65]配上龙舌兰日出\n[00:55.71]她的身躯线条刚好适合你的手掌一握\n[01:00.85]那感觉一如 噢妙不可语\n[01:04.28]\n[01:04.47]我爱你称我为\"我的小姐\"时的样子\n[01:08.54]多希望我可以假装不需要你\n[01:12.64]但每一次触碰都妙不可语\n[01:15.76]真实无比 lalala\n[01:17.86]噢 我想我应该逃走\n[01:19.85]但你知道你称我为\"我的小姐\"时我有多么享受\n[01:25.05]多希望我可以轻易就离开你\n[01:29.12]但每一次触碰都妙不可语\n[01:32.26]真实无比 lalala\n[01:34.16]噢 我想我应该逃走\n[01:36.18]噢但你却将我牢牢吸引掌控\n[01:38.54]\n[01:38.86]把自己锁在房间里\n[01:40.86]始终有一些无法改变的事情\n[01:42.92]你说我们只是朋友\n[01:44.92]但朋友又怎么知道你有多么可口\n[01:50.63]你知道我们也这样维持了许久 别让我失望难过\n[01:54.50]\n[01:55.08]当你的双唇将我衣裳剥落\n[01:57.03]噢在你舌尖沦陷的我\n[01:58.99]噢亲爱的 你的吻教人销魂 别停下来\n[02:02.11]我爱你称我为\"我的小姐\"时的样子\n[02:06.04]多希望我可以假装不需要你\n[02:10.04]但每一次触碰都妙不可语\n[02:13.11]但每一次触碰都真实无比 lalala\n[02:15.21]噢 我想我应该逃走\n[02:17.23]但你知道你称我为\"我的小姐\"时我有多么享受\n[02:22.42]希望我可以轻易就离开你\n[02:26.48]但每一次触碰都妙不可语\n[02:29.60]真实无比 lalala\n[02:31.61]噢 我想我应该逃走\n[02:33.68]噢但你却将我牢牢吸引掌控\n[02:37.44]一直以来我都那么戒不掉你\n[02:40.31]为你\n[02:41.70]希望那对你来说有所意义\n[02:45.75]我会随叫随到只要你呼唤我名\n[02:48.36]只为你(我到来时她总是无比欣喜)\n[02:49.42]只为你\n[02:50.50]只为你\n[02:51.81]只为你\n[02:55.80]只为你\n[02:57.87](我到来时她总是无比欣喜)\n[02:59.94]只为你\n[03:04.55]噢我想我应该逃走\n[03:06.51]但你却将我牢牢吸引掌控\n"
    },
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
如果音频因为某些原因不可播放（例如没有版权许可），则可以在音频数据结构中添加disabled字段，值为Boolean类型。此时播放列表内如果有被禁用的音频，那么它将会被置灰，点击无法被播放出来，
但可以被移出播放列表。如果想表明被禁用的原因，可以添加disabledReason字段，字段值将展示在音频名称后面。
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


