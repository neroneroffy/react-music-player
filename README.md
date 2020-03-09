## 持续开发中... 文档尚未更新完毕

**@ React16.12.0**

两年前的代码，最近用hooks和TypeScript重构了一下

[点击查看演示](http://akongkong.cn/build/)</br>

[技术文章](https://segmentfault.com/a/1190000012628577)


### 功能
1. 播放控制
   - 上一曲，下一曲
   - 播放暂停
   - 滑动或者点击歌曲进度条实现音乐的快进快退
   - 滚动歌词定位播放位置
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
### 说明
* 安装依赖
```
npm install
```
* 启动开发环境
```
npm run dev
```
* 访问
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

| API           | 说明                         | 类型     |
| ------------- |:----------------------------:| --------:|
| data          | 传入组件的播放列表歌曲数据   | Array    |
| onDelete      | 删除播放列表内歌曲的回调函数 | Function |

### usage
```javascript
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CoolPlayer from 'react-cool-music-player'
const { useState, useEffect } = React
const App = () => {
  const data = [
    {
      src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
      artist: '瑾姝Hikari',
      name: '大氿歌',
      img: 'http://neroht.com/daguige.jpg',
      id: '66575568442',
      lyric: '[00:00.000] 作曲 : ilem\n[00:01.000] 作词 : ilem\n[00:18.071]翻唱/和编：瑾姝\n[00:19.328]土生木酿水中火\n...',
    },
    {
      src: 'http://neroht.com/%E8%A2%81%E9%9B%A8%E6%A1%90%20-%20%E6%8A%98%E6%9C%88%E6%BB%A1%E5%85%9C.mp3',
      artist: '袁雨桐',
      name: '折月满兜',
      img: 'http://neroht.com/zheyuemandou.jpg',
      id: '66575568445',
    },
    {
      src: 'http://neroht.com/Take%20Your%20Time%20%20-%20alexandr.mp3',
      artist: 'Alexandr',
      name: 'Take Your Time',
      img: 'http://neroht.com/alexander.png',
      id: '66575568446',
    },
  ]
  const [ currentAudio, setCurrentAudio ] = useState(null)
  useEffect(() => {
    setCurrentAudio(data[0])
  }, [])

  const onDelete = (index, id) => {
    console.log('current music index is :', index, 'music id is :', id)
  }
  
  const onVolumeChange = (volume) => {
    console.log('current volume is :', volume)
  }

  const onLyricMatched = (lyrics, currentIndex) => {
    console.log('current lyric is: ', lyrics, 'current lyric index is: ', currentIndex)
  }
  const onMusicChange = (id, currentMusic) => {
    console.log('current music is', currentMusic)
  }

  const musicActions = [
    music => {
      return <span key={'favourite'} onClick={() => {
        console.log('current music is:', music)
      }}>收藏</span>
    },
    music => {
      return <span style={{ margin: '0 8px' }} key={'share'} onClick={() => {
        console.log(music)
      }}>分享</span>
    },
    music => {
      return <span key={'download'} onClick={() => {
        console.log(music)
      }}>下载</span>
    },
  ]
  const actions = [
    (music: any) => {
      return <div style={{ fontSize: 22, marginRight: 8 }} key={'Collect'}>
        Collect
      </div>
    },
    (music: any) => {
      return <div style={{ fontSize: 22 }} key={'Download'}>
        Download
      </div>
  }]

  return <div className={'example'}>
    <div className={'wrapper'}>
      <CoolPlayer
        playListPlaceholder={'还没有歌曲哦~'}
        onDelete={onDelete}
        autoPlay={false}
        onLyricMatched={onLyricMatched}
        currentAudio={currentAudio}
        data={data}
        showLyricNormal={true}
        onMusicChange={onMusicChange}
        onVolumeChange={onVolumeChange}
        musicActions={musicActions}
        actions={actions}
        playListHeader={{
          headerLeft: '播放列表',
          headerRight: '清除全部'
        }}
        onModeChange={(currentMode, prevMode) => {
          console.log('current play mode is: ', currentMode, 'last play mode is', prevMode)
        }}
      />
    </div>
  </div>
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)

```