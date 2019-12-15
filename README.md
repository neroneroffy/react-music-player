﻿## 一个基于React的适配PC端和移动端的轻量音乐播放器

**@ React16.12.0**

两年前的代码，最近用hooks和TypeScript重构了一下

[点击查看演示](http://akongkong.cn/build/)</br>

[技术文章](https://segmentfault.com/a/1190000012628577)


### 功能
 * 播放，暂停
 * 上一曲，下一曲
 * 滑动或者点击歌曲进度条实现音乐的快进快退
 * 音乐剩余时间同步显示
 * 缓冲进度条
 * 播放进度条
 * 音量控制
 * 点击菜单按钮展开与隐藏播放列表
 * 播放列表内音乐播放，删除，当前播放音乐高亮显示
 * 播放音乐时封面图片旋转，暂停时停止旋转（只在PC端可查看，移动端隐藏音乐封面图片）


### 说明
```
https://github.com/neroneroffy/react-music-player.git

//安装依赖
npm install

//启动项目
npm run dev

// 访问
http://localhost:8080
```

| API           | 说明                         | 类型     |
| ------------- |:----------------------------:| --------:|
| data          | 传入组件的歌曲数据           | Array    |
| onDelete      | 删除播放列表内歌曲的回调函数 | Function |

### usage

```
const App = () => {
  const [ data, setData ] = useState([
      {
          src: 'http://neroht.com/%E6%AD%A2%E6%88%98%E4%B9%8B%E6%AE%87-piano.mp3',
          artist: '张斗完',
          name: '止战之殇（纯钢琴）',
          img: 'http://neroht.com/jay.jpg',
          id: '66575568441',
      },
      {
          src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
          artist: '瑾姝Hikari',
          name: '大氿歌',
          img: 'http://neroht.com/daguige.jpg',
          id: '66575568442',
      }
  ])
  // onDelete是当删除播放列表内的歌曲时，触发的函数
  const onDelete = (index: number, id: string) => {
      data.splice(index, 1)
      setData(data)
  }

  return <div className={'wrapper'}>
      <CoolPlayer onDelete={onDelete} data={data}/>
  </div>;
}
```

后续会暴露出更多api，支持更灵活的配置
