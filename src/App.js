import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            songInfo:[
                {
                    src:"http://fs.w.kugou.com/201712272345/7cfb64956f4baf5cb2eb020b05810458/G023/M07/04/0D/95MEAFWGR7KAUejpAEJwKrYM5iA619.mp3",
                    artist:"潘玮柏",
                    name:"我想更懂你",
                    img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514373217232&di=d639eb68cfae040bf8457d2af3e6bfdd&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fbaike%2Fawhcrop%3D545%2C545%2Fsign%3Daa0ad059a318972bb5705d9994a20bb4%2F14ce36d3d539b60040efe3fae150352ac65cb75e.jpg"
                },
                {
                    src:"http://fs.w.kugou.com/201712272040/af7b99f707919446dea18bd492477676/G010/M09/01/11/qoYBAFUPb_mAPJ0gAESAeCGHGCA586.mp3",
                    artist:"潘玮柏",
                    name:"不得不爱",
                    img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=781787101,1026788150&fm=27&gp=0.jpg"
                },
                {
                    src:"http://fs.w.kugou.com/201712272302/2ce63592efac90923e844bc5395a9003/G009/M06/1B/01/SQ0DAFUKTsiAVxyrADKyKv9yT2Y242.mp3",
                    artist:"LinkinPark",
                    name:"PowerLess",
                    img:"http://imge.kugou.com/stdmusic/20150719/20150719054342954247.jpg"
                },
            ]
        };
        this.last = this.last.bind(this)
        this.play = this.play.bind(this)
        this.next = this.next.bind(this)
        this.delSong = this.delSong.bind(this)
    }
    last(){}
    play(){}
    next(){

    }
    delSong(i){

        this.state.songInfo.splice(i,1)

    }

    render() {
    return (
      <div className="App">
          <ReactMusicPlayer
            info={this.state.songInfo}
            onPlay = {this.play}
            onLast = {this.last}
            onNext = {this.next}
            onDel = {this.delSong}
          />

      </div>
    );
  }
}

export default App;
