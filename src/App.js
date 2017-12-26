import React, { Component } from 'react';
import ReactMusicPlayer from './react-music-player/react-music-player';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            song:"http://fs.w.kugou.com/201712262118/b5bac96f682e556ab1cedff76833a26b/G081/M0A/05/05/8YYBAFguleKAX1ZfADkGCWPf1xY008.mp3"
        }
        this.last = this.last.bind(this)
        this.play = this.play.bind(this)
        this.next = this.next.bind(this)
    }
    last(){}
    play(){}
    next(){

    }

    render() {
    return (
      <div className="App">
          <ReactMusicPlayer
            src={this.state.song}
            onPlay = {this.play}
            onLast = {this.last}
            onNext = {this.next}

          />

      </div>
    );
  }
}

export default App;
