## 一个基于React的适配PC端和移动端的轻量音乐播放器

> 技术：React16

之前基于Vue写了一个播放器，带各种功能，最后把自己绕死了。这次用React重写了个，舍弃了那些没用的功能，只保留了基本功能。并且利用媒体查询适配移动端和手机端。组件之间传值利用props，这个播放器先供自己用，以后会抽离成为一个插件。如果感觉不错给个星星~

[点击查看项目](http://www.wwwprince.cn/build/index.html)
[项目文章](https://segmentfault.com/a/1190000012628577)

图片演示：

![image](https://github.com/capslocktao/react-music-player/blob/master/show.gif)

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
git clone git@github.com:capslocktao/react-music-player.git

//安装依赖
npm install

//启动项目
npm start

//打包编译
npm run build
```

| API           | 说明               | 类型      |
| ------------- |:------------------:| --------:|
| info          | 传入组件的歌曲数据    | Array    |
| onDel         | 删除歌曲的回调函数    | Function |

info接收的参数类型为一个对象数组
```
    render() {
        const songInfo = [
            {
                src:"http://fs.w.kugou.com/201712281346/32b6de4127502b0f2defb32a859b7278/G048/M00/1B/0F/EJQEAFYl4ZuAUSEVAEIa293rBH4619.mp3",
                artist:"陶喆",
                name:"Melody",
                img:"http://imge.kugou.com/stdmusic/20150718/20150718174252663587.jpg",
                id:"66575568441"
            },
            {
                src:"http://fs.w.kugou.com/201712281315/2e497482c4283748d6b3d3e7912caada/G010/M07/1F/1D/qoYBAFUKLG2AFwOuAD6hYqqxfPE635.mp3",
                artist:"周杰伦",
                name:"千里之外",
                img:"http://imge.kugou.com/stdmusic/20170728/20170728122746411503.jpg",
                id:"43245456534"
            }
        ]
    return (
      <div className="App">
          <ReactMusicPlayer
            info={songInfo}
            onDel = {this.delSong}
          />
      </div>
    );
  }
```
onDel是当删除播放列表内的歌曲时，触发的函数
```
    delSong(i,id){
        //接收两个参数：i为删除的歌曲在播放列表中的位置；id为删除掉的歌曲的id
    }
```
