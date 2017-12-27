import React, {Component} from 'react';
import './react-music-player.css';
class ReactMusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused:false,
            totalTime:0,
            playPer:0,
            bufferedPer:0,
            playedLeft:0,
            remainTime:0
        };
        this.last = this.last.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
        this.startChangeTime = this.startChangeTime.bind(this)
        this.moveProgress = this.moveProgress.bind(this)
    }
    componentDidMount(){
        let audio = this.refs.audio
        audio.addEventListener('canplay',()=>{
            //获取总时间
            let totalTime = parseInt(this.refs.audio.duration);

            this.setState({
                totalTime:this.getTime(totalTime),
                remainTime:this.getTime(totalTime),
                playedLeft:this.refs.played.getBoundingClientRect().left
            });
            //
        })

    }
    last(){}
    play(){
        let audio = this.refs.audio;
        if(audio.paused){
            audio.play()
            this.setState({
                isPaused:true,

            })
        }else{
            audio.pause()
            this.setState({
                isPaused:false
            })
        }
        audio.addEventListener('timeupdate',()=>{
            //设置播放进度条
            let playPer = audio.currentTime/audio.duration;
            this.refs.played.style.width = playPer*100+"%";
            //设置缓冲进度条
            let timeRages = audio.buffered;
            let bufferedTime = timeRages.end(timeRages.length-1);
            let bufferedPer = bufferedTime/audio.duration;
            this.refs.buffered.style.width = bufferedPer*100+"%";
            //设置剩余时间
            let remainTime = parseInt(audio.duration - audio.currentTime);
            this.setState({
                remainTime:this.getTime(remainTime)
            },()=>{
                console.log(this.state.remainTime)
            })
            if(playPer>bufferedPer){

            }
        })


    }
    next(){}
    startChangeTime(e){
        this.setTime(e)
    }
    moveProgress(e){
        let audio = this.refs.audio;
        if(audio.currentTime !== 0){
            this.setTime(e)
        }
    }
    getTime(musicTime){
        if(musicTime<60){
            musicTime = `00:${musicTime<10?`0${musicTime}`:musicTime}`
        }else{
            musicTime = `${parseInt(musicTime/60)<10?`0${parseInt(musicTime/60)}`:parseInt(musicTime/60)}:${musicTime%60<10?`0${musicTime%60}`:musicTime%60}`
        }
        return musicTime
    }
    setTime(e){

        let audio = this.refs.audio;
        let newWidth = (e.touches[0].pageX-this.state.playedLeft)/this.refs.progress.offsetWidth
        this.refs.played.style.width = newWidth*100 + "%";
        audio.currentTime = newWidth*audio.duration

    }
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
                            <div className="progress-wrapper" ref="progress"
                                 onTouchMove={this.moveProgress}
                                 onTouchStart={this.startChangeTime}
                            >
                                <div className="progress" ref="progress">
                                    <div className="progress-buffered" ref="buffered" ></div>
                                    <div className="progress-played" ref="played"></div>
                                </div>

                            </div>
                            <div className="time">
                                <div className="total-time">{this.state.totalTime}</div>
                                <span>/</span>
                                <div className="remain-time">{this.state.remainTime}</div>
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