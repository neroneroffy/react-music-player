import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            songInfo:[
                {
                    src:"http://fs.w.kugou.com/201712281342/f0293d1a5d86d345364a256ec1b54f45/G010/M00/16/19/Sg0DAFUJgSeAIsPrAGE0MiqUZx0865.mp3",
                    artist:"Lgor Krutoi",
                    name:"Sad Angel",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718050449118558.jpg",
                    id:"66575568441"
                },
                {
                    src:"http://fs.w.kugou.com/201712281336/e4e22ff44009a1b90c5e906f131d47e8/G006/M07/00/07/poYBAFT-yTeAIKyKADOtiPZnT2s919.mp3",
                    artist:"Katy Perry",
                    name:"E.T.",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718110721175318.jpg",
                    id:"66575568442"
                },
                {
                    src:"http://fs.w.kugou.com/201712272040/af7b99f707919446dea18bd492477676/G010/M09/01/11/qoYBAFUPb_mAPJ0gAESAeCGHGCA586.mp3",
                    artist:"潘玮柏",
                    name:"不得不爱",
                    img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=781787101,1026788150&fm=27&gp=0.jpg",
                    id:"66575568443"
                },
                {
                    src:"http://fs.w.kugou.com/201712272302/2ce63592efac90923e844bc5395a9003/G009/M06/1B/01/SQ0DAFUKTsiAVxyrADKyKv9yT2Y242.mp3",
                    artist:"LinkinPark",
                    name:"PowerLess",
                    img:"http://imge.kugou.com/stdmusic/20150719/20150719054342954247.jpg",
                    id:"66575568444"
                },
                {
                    src:"http://fs.w.kugou.com/201712281345/3d79652ef86e8a578a521003e19cc906/G022/M02/00/1B/toYBAFWh_2uAH7MdAECWokh9cyI289.mp3",
                    artist:"一人一生",
                    name:"周玥",
                    img:"http://imge.kugou.com/stdmusic/20150715/20150715232125208969.jpg",
                    id:"66575568445"
                },
                {
                    src:"http://fs.w.kugou.com/201712281314/6212d3985ca7002d1248109ab1801c9f/G009/M07/12/1B/qYYBAFULdymAS--BADbXLqiqRug897.mp3",
                    artist:"Onerepublic",
                    name:"Love Runs Out",
                    img:"http://imge.kugou.com/stdmusic/20140414/20140414143525544064.jpg",
                    id:"66575568446"
                },
                {
                    src:"http://fs.w.kugou.com/201712281255/853c50be873824ef3fb832fc38c0d887/G009/M02/08/01/qYYBAFUK1PuAc39DACokkUYP38E526.mp3",
                    artist:"Kina Grannis",
                    name:"The Fire",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718055732300434.jpg",
                    id:"66575568447"
                },
                {
                    src:"http://fs.w.kugou.com/201712281346/32b6de4127502b0f2defb32a859b7278/G048/M00/1B/0F/EJQEAFYl4ZuAUSEVAEIa293rBH4619.mp3",
                    artist:"陶喆",
                    name:"Melody",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718174252663587.jpg",
                    id:"66575568448"
                },
                {
                    src:"http://fs.w.kugou.com/201712281315/2e497482c4283748d6b3d3e7912caada/G010/M07/1F/1D/qoYBAFUKLG2AFwOuAD6hYqqxfPE635.mp3",
                    artist:"周杰伦",
                    name:"千里之外",
                    img:"http://imge.kugou.com/stdmusic/20170728/20170728122746411503.jpg",
                    id:"66575568449"
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
