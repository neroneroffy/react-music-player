import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            songInfo:[
              {
                src:"http://neroht.com/%E6%AD%A2%E6%88%98%E4%B9%8B%E6%AE%87-piano.mp3",
                artist:"张斗完",
                name:"止战之殇（纯钢琴）",
                img:"http://neroht.com/jay.jpg",
                id:"66575568441"
              },
              {
                src:"http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3",
                artist:"瑾姝Hikari",
                name:"大氿歌",
                img:"http://neroht.com/daguige.jpg",
                id:"66575568442"
              },
              {
                src:"http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E8%B5%A4%E4%BC%B6%EF%BC%88Cover%EF%BC%9AHITA%EF%BC%89.mp3",
                artist:"瑾姝Hikari",
                name:"赤伶",
                img:"http://neroht.com/chiling.jpg",
                id:"66575568443"
              },
              {
                src:"http://neroht.com/%E4%BC%A6%E6%A1%91%20-%20%E7%83%9F%E9%9B%A8%E8%A1%8C%E8%88%9F.mp3",
                artist:"伦桑",
                name:"烟雨行舟",
                img:"http://neroht.com/yanyuxingzhou.jpg",
                id:"66575568444"
              },
              {
                src:"http://neroht.com/%E8%A2%81%E9%9B%A8%E6%A1%90%20-%20%E6%8A%98%E6%9C%88%E6%BB%A1%E5%85%9C.mp3",
                artist:"袁雨桐",
                name:"折月满兜",
                img:"http://neroht.com/zheyuemandou.jpg",
                id:"66575568445"
              },
              {
                src:"http://neroht.com/Take%20Your%20Time%20%20-%20alexandr.mp3",
                artist:"Alexandr",
                name:"Take Your Time",
                img:"http://neroht.com/alexander.png",
                id:"66575568446"
              },
            ]
        };
        this.delSong = this.delSong.bind(this)
    }

    delSong(i,id){
        console.log(id)
        this.state.songInfo.splice(i,1)

    }

    render() {

    return (
      <div className="App">
          <ReactMusicPlayer
            info={this.state.songInfo}
            onDel = {this.delSong}
          />

      </div>
    );
  }
}

export default App;
