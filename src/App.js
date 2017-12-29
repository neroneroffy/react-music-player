import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            songInfo:[
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400003qQ0fP3eO7Ud.m4a?vkey=4E2F5D4C6E11A19665DDB748711AE7A34DE8E1EB204F24E2199044942C89BC3C6ACC543D8F6D8B8FA577151BCFE9A3342EC27B9D2084C462&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Lgor Krutoi",
                    name:"Sad Angel",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718050449118558.jpg",
                    id:"66575568441"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400001mRdfM3xfVEN.m4a?vkey=4B5A7C17329FAF8DF5099C2A7971FF2FE4DCC836EEA3A2DFAB5DC62BA5B8315EC61AF678BCA5A8C288EF7DC5D60546D1EBAA04A248CCC7D2&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Katy Perry",
                    name:"E.T.",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718110721175318.jpg",
                    id:"66575568442"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400001kQq0u0nS4Vc.m4a?vkey=A9D213F528D2C93C2049D14ECA10F35EA5F31A8981B36DBF6685F22FE58F1DAE1888ACB8101E13B4103F17F28BD9DEEA903F56A69AD43A56&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"潘玮柏",
                    name:"不得不爱",
                    img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=781787101,1026788150&fm=27&gp=0.jpg",
                    id:"66575568443"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400000SB3xt2B9Hzz.m4a?vkey=6BCC37952733F3BC68CB1E21EDC302D1A54445D3B2C8E507166C81F81BB752374F9D0D1FCA0D0376A06FBEADBC7754E07359510852FB3CD4&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Linkin Park",
                    name:"PowerLess",
                    img:"http://imge.kugou.com/stdmusic/20150719/20150719054342954247.jpg",
                    id:"66575568444"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C4000027CLWZ4BmeuD.m4a?vkey=3C0AD7669FFEDD84F3F4D24FFC4EFAF78301873DE8DF28763079AB830911586B4DFAFAFD648717111D0E5E92EE97EB8ED869DC7478CDE8A1&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"一人一生",
                    name:"周玥",
                    img:"http://imge.kugou.com/stdmusic/20150715/20150715232125208969.jpg",
                    id:"66575568445"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400004GDHAj0qKwqT.m4a?vkey=65D3AF3B0604F69FC87E00A2DDA99C444F4FF449E532A49BEC42C93D96D8B58B06C5B99A7A7BCF5FC8E89109604F063A19318036EBA4F9D5&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Onerepublic",
                    name:"Love Runs Out",
                    img:"http://imge.kugou.com/stdmusic/20140414/20140414143525544064.jpg",
                    id:"66575568446"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C4000005BD9C0udHLx.m4a?vkey=385D0DEC4BE25B095DB1BF40474AA2B79CB4C2BF8223A22BC94C9AF71C069A64EDEA60422E4EE3AD3E6E99585D3BA33FE6EF990657659555&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Radio Edit",
                    name:"The Fire",
                    img:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002r2Rjj2ncF1O.jpg?max_age=2592000",
                    id:"66575568447"
                },
                {
                    src:"http://dl.stream.qqmusic.qq.com/C400002jr6vV32KHfc.m4a?vkey=D5AF2B9AE79BFA1C700B20988C4B420A2D6DDB9A42D73BB2AC3FBE33F4FE1958C1D62A89ACEE96B1D0AAF38AB52386CC8EDB210A49BFA3D0&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"Linkin Park",
                    name:"Iridescent",
                    img:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002Bb0I616Be2R.jpg?max_age=2592000",
                    id:"66575568449"
                },

                {
                    src:"http://dl.stream.qqmusic.qq.com/C400003OUbOh0ZGYfw.m4a?vkey=92A73AF9BDD058FA7569108760F60F338D81A822499BED097AA7221E476D0C7517FE5D6CF233D7A9F1C50FB161B939998260550C5C419B71&guid=6723780100&uin=1053209711&fromtag=66",
                    artist:"陶喆",
                    name:"Melody",
                    img:"http://imge.kugou.com/stdmusic/20150718/20150718174252663587.jpg",
                    id:"66575568448"
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
