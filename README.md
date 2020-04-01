﻿<p align="center">
  <img alt="logo" src="http://neroht.com/logo.png" width="100" max-width="100%">
</p>

<h1 align="center">
react-cool-music-player
</h1>

<h4 align="center">
Responsive audio play assembly adaptive with PCs and mobile devices. All icons and texts are customizable. Theme colors can be modified. Synchronized scrolling of lyrics is supported.
</h4>

<p align="center">
  <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="version 1.0.5" src="https://img.shields.io/badge/version-1.0.5-orange">
</p>

<p align="center">
  <a style="margin-right: 8px" href="http://coolplayer.neroht.com/">Click here to view a demonstration</a> |
  <a style="margin-left: 8px" href="https://github.com/neroneroffy/react-music-player/blob/master/CN.md">中文文档</a>
</p>


## Functions
Adaptive with PCs and mobile devices. Popup of the play detail page is supported on mobile devices.
1. Play control
   - Previous song,next song
   - Pause
   - Scroll or click on the progress bar of the song to realize fast forward and fast backward of the music.
   - Scroll the lyrics to locate the play position and implement functions of fast forward and fast backward.
   -  Play, delete music in the playlist, and the currently playing music is highlighted.
2. Volume control
   - Drag, click on the volume control bar to control the volume.
   - Click on the volume icon to switch the mute status. 3. 状态展示
3. Status display
   - The cover picture rotates when music is playing and stops rotating when music pauses.
   - Remaining time of the music is displayed.
   - Buffer bar.
   - Play progress bar.
   - Lyrics synchronously scroll and the current lyrics are highlighted.
   - When the volume is 0, the volume icon is displayed as a mute icon.

# Usage
install
```
npm install react-cool-music-player
```

Use in code

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
Audio data structure in the player:
```typescript
  interface IAudio {
    /*Audio link*/
    src: string
    /*author*/
    artist: string
    /*audio name*/
    name: string
    /*audio image*/
    img: string
    /*audio ID*/
    id: string
    /*lyrics*/
    lyric?: string
    /*lyric translation*/
    tLyric?: string
    /*disabled or not*/
    disabled?: boolean
    /*reasons for being disabled*/
    disabledReason?: string | React.ReactNode
  }
```
## Complete API list
| API                                      | 说明                                                                                             | 类型                                                                                         | 默认值                    |
| :--------------------------------------- |:-------------------------------------------------------------------------------------------------| :--------------------------------------------------------------------------------------------| :-------------------------|
| data                                     | Audio data introduced into the assembly, which is displayed in the playlist                                                           | IAudio[]                                                                                     | -                         |
| play                                     | Controls the player to start and stop playing                                                                         | boolean                                                                                      | false                     |
| playListPlaceholder                      | Placeholder text when the playlist is empty                                                                       | string                                                                                       | 'No data'                 |
| currentAudio                             | Can control audio of the current player. If it is not introduced, the audio to be played in the player is the first audio in the playlist by default                 | IAudio                                                                                       | -                         |
| playListShow                             | Facilitates externally controlling display and hiding of the playlist                                                                   | boolean                                                                                      | false                     |
| showPlayDetail                           | Whether play details are displayed upon click on the song icon (valid on mobile devices)                                                       | boolean                                                                                      | true                      |
| playDetailShow                           | Facilitates externally controlling display and hiding of the play details (valid on mobile devices)                                                   | boolean                                                                                      | false                     |
| detailBackground                         | Background of the play detail page (valid on mobile devices)                                                                | `React.ReactNode`                                                                            | -                         |
| volume                                   | Volume, which, after being introduced into the assembly, can control the volume size of the player, ranging from 0 to 1                                               | number                                                                                       | 0.5                       |
| zIndex                                   | z-index value of the player                                                                        | number                                                                                       | 1000                      |
| showLyricNormal                          | Whether to display lyrics on non-mobile devices                                                                     | boolean                                                                                      | false                     |
| showDetailLyric                          | Whether to display lyrics on the song detail page on mobile devices                                                           | boolean                                                                                      | false                     |
| showLyricMini                            | Whether to display mini lyrics on mobile devices                                                                     | boolean                                                                                      | false                     |
| playMode                                 | Play mode, which, after being introduced, can control the play modes of the playlist in the player (play in order, random play, single cycle)                   | `order`,`random`,`loop`                                                                      | `order`                   |
| lyric                                    | Introduced lyric data when lyrics are loaded asynchronously                                                                   | string                                                                                       | -                         |
| tLyric                                   | Introduced lyric translation when lyrics are loaded asynchronously if it is needed to display lyric translation                                             | string                                                                                       | -                         |
| lyricLoading                             | Loading status display for loading lyrics asynchronously                                                                 | boolean                                                                                      | false                     |
| lyricPlaceholder                         | Placeholder element when lyric data is empty                                                                         | `React.ReactNode` or `string`                                                                | false                     |
| showProgressControlByLyricScroll         | Whether it is needed to manually scroll lyrics to adjust the play progress in play details on mobile devices                                     | boolean                                                                                      | true                      |
| avatarPlaceholder                        | Placeholder element of the song icon when the song image is empty                                                                 | `React.ReactNode`                                                                            | <div></div>               |
| actions                                  | An action group displayed in the player on non-mobile devices, between the play mode button and the volume control button                       | `Array<(data: IAudio) => React.ReactNode>`                                                   | []                        |
| detailActionTopRight                     | An action element displayed at the upper right corner in the play details on mobile devices                                                 | `(data: IAudio) => React.ReactNode`                                                          | -                         |
| detailActionsBottom                      | An action group displayed above the progress bar in the play details on mobile devices                                               | `Array<(data: IAudio) => React.ReactNode>`                                                   | []                        |
| playListAudioActions                     | An action group of each piece of audio in the playlist, located on the right side of the song name, displayed in the activated status on a mobile terminal and when a non-mobile devices hovers            | `Array<(data: IAudio, active?: boolean) => React.ReactNode>`                                 | []                        |
| playListHeader                           | Two (left and right) elements on the top of the playlist                                                                       | { headerLeft?: ` React.ReactNode or string`, headerRight?: `React.ReactNode or string` }     | headerLeft: 'Play list', headerRight: '' |
| primaryColor                             | Theme colors                                                                                         | string                                                                                       | '#33beff'                  |
| icons                                    | Customized icon                                                                                       | Object                                                                                       | See descriptions below                 |
| onPlayListStatusChange                   | A callback function when the playlist is displayed and hidden. If you wish to control the display and hiding statuses of the playlist through playListShow, you need to set the value of playListShow synchronously in this callback function | (status: boolean) => void                                      | -                          |
| onPlayDetailStatusChange                 | A callback function when play details are displayed or hidden. If you wish to control the display and hiding statuses of play details through playDetailShow, you need to set the value of playDetailShow synchronously in this callback function | (status: boolean) => void                                | -                          |
| onDelete                                 | Deletes the callback function of the audio in the playlist                                                                       | (index: number, id: string) => void                                                          | -                          |
| onVolumeChange                           | A callback function when the volume changes                                                                             | (volume: number) => void                                                                     | -                          |
| onAudioChange                            | A callback function triggered by audio change in the player                                                                   | (id: string, currentMusic: IAudio) => void                                                   | -                          |
| onPlayStatusChange                       | A callback function triggered by switch between play and pause                                                                     | (currentMusic: IAudio, isPlayed: boolean) => void                                            | -                          |
| onModeChange                             | A callback function triggered by switch between play modes                                                                       | (currentMode: PlayMode, prevMode: PlayMode) => void                                          | -                          |

## Build commands
* Installing dependency
```
npm install
```
* Starting the development environment
```
npm run dev
```
* Local access
```
http://localhost:8080
```
* Packing construction
```
npm run build
```
* Packing and starting the express server access locally
```
npm start
```
* Automated testing
```
npm run test
```
* Generating a test coverage report
```
npm run coverage
```
* Code style check
```
npm run lint
```
* Automatic restoration of the code style
```
npm run lint-fix
```

## Customized icons
If you are unsatisfied with any icon in the assembly, you can introduce a customized icon into the assembly to replace the undesired one.
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
Complete icon list：
```typescript
interface Iicon {
      /*An icon that controls the playlist to be displayed or hidden*/
      playListIcon?: React.ReactNode
      /*A play button in front of each of the audio in the playlist*/
      playListPlay?: React.ReactNode
      /*An icon of each of the audio that is being played in the playlist*/
      playListPlaying?: React.ReactNode
      /*An icon for deleting audio in the playlis*/
      deleteIcon?: React.ReactNode
      /*Play*/
      playIcon?: React.ReactNode
      /*Pause*/
      pauseIcon?: React.ReactNode
      /*Previous*/
      prevIcon?: React.ReactNode
      /*Next*/
      nextIcon?: React.ReactNode
      /*Order*/
      modeOrder?: React.ReactNode
      /*Random*/
      modeRandom?: React.ReactNode
      /*Single circle*/
      modeLoop?: React.ReactNode
      /*Volume*/
      volumeIcon?: React.ReactNode
      /*Mute*/
      muteIcon?: React.ReactNode
      /*Hide play details*/
      detailHide?: React.ReactNode
}
```
## Lyrics display function
The player supports two manners: build-in lyrics of audio data and remote loading lyrics. Both of the manners can support display of translations of lyrics. Lyrics and translations thereof must be in the following form:
```javascript
const lyricExample = '[00:18.220]Oh, loves gonna get you down\n[00:20.880]Sucking to hard on your lollipop\n[00:23.600]Loves gonna get you down'
```
### Build-in lyrics
Build-in lyrics need to be stored in the lyric filed of the audio data. If the lyric translation needs to be displayed, it is necessary to store it in the tLyric field.
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
### Remote loading lyrics
Separate introduction of lyrics of the current audio is supported. Current audio information may be obtained in the onAudioChange function, corresponding lyrics are then remotely loaded and introduced into the player for display. However, it should be noted that the preceding lyrics should be reset to be empty in the onAudioChange function.
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
## Audio disabled status
If audio cannot be played for certain reasons (such as no copyright permission), a disabled field can be added in the audio data structure, the value of which field is of type Boolean. In this case, if the playlist contains disabled audio, the playlist will be set to be grey and fail to play upon click. Disabled audio, if any, is skipped in switching between a previous song and a next one.

The disabled status can be removed from the playlist. If you wish to indicate reasons for being disabled, you may add a disabledReason field. The field value will be displayed following the name of each audio in the playlist.

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
## External control of the play status
The player provides a play attribute to support externally controlling play and pause.
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

## Introduction of an action group
If functions of the current player cannot satisfy your needs, you may introduce an action group to extend functions. With actions as an example, its action group is an array, and each element of the array receives information of the currently playing audio in a manner of render-props and returns a ReactNode. The remaining action groups are: detailActionTopRight (the type is a function, referring to the above API list)

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


