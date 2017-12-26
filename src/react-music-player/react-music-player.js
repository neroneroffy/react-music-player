import React, {Component} from 'react';
import './react-music-player.css';
class ReactMusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused:false,
            totalTime:0
        };
        this.last = this.last.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
    }
    componentDidMount(){
        this.refs.audio.addEventListener('canplaythrough',()=>{
            let musicTime = parseInt(this.refs.audio.duration);
            if(musicTime<60){
                musicTime = `00:${musicTime<10?`0${musicTime}`:musicTime}`
            }else{
                musicTime = `${parseInt(musicTime/60)<10?`0${parseInt(musicTime/60)}`:parseInt(musicTime/60)}:${musicTime%60<10?`0${musicTime%60}`:musicTime%60}`
            }
            this.setState({
                totalTime:musicTime
            })

        })
    }
    last(){}
    play(){
        totalTime:console.log(this.refs.audio);
        if(this.refs.audio.paused){
            this.refs.audio.play()
            this.setState({
                isPaused:true
            })
        }else{
            this.refs.audio.pause()
            this.setState({
                isPaused:false
            })

        }


    }
    next(){}
    render() {
        return (
            <div id="react-music-player">
                <div className="react-music-player-inner" >
                    <div className="left-control">
                        <span className="icon-last" onClick={this.last}></span>

                        <span className={this.state.isPaused?"icon-333":"icon-44"} onClick={this.play}></span>
                        <span className="icon-next" onClick={this.next}></span>
                    </div>
                    <div className="music-box">
                        <div className="picture">

                        </div>
                        <div className="music-info">
                            <div className="music-name">
                                西城男孩：My Love
                            </div>
                            <div className="progress"></div>
                            <div className="time">
                                <div className="total-time">{this.state.totalTime}</div>
                                <div className="remain-time">2：59</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-control">
                        <span className="icon-666"></span>
                    </div>
                    <audio src={this.props.src} ref = "audio"></audio>
                </div>
            </div>
        )
    }
}
export default ReactMusicPlayer