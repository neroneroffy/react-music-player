import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import CoolPlayer from '../src/index'
const { useState } = React
const App = () => {
  const [ data, setData ] = useState([
      {
          src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
          artist: '瑾姝Hikari',
          name: '大氿歌',
          img: 'http://neroht.com/daguige.jpg',
          id: '66575568442',
          lyric: '[00:00.000] 作曲 : ilem\n[00:01.000] 作词 : ilem\n[00:18.071]翻唱/和编：瑾姝\n[00:19.328]土生木酿水中火\n[00:24.591]金樽玉液小乾坤\n[00:29.322]文痴武客三点血\n[00:33.811]江湖相见半盏春\n[00:42.576]一白忘忧再消愁\n[00:47.311]三碗同天竞风流\n[00:52.062]浮云苍狗烂柯泥\n[00:56.569]唯此醪糟诚不欺\n[01:01.582]花枪风雪挑葫芦\n[01:06.313]哨棒过岗打猛虎\n[01:11.315]谪仙对影捞玉蟾\n[01:16.067]诗圣放歌击浪还\n[01:20.060]大瓮一扬倾江海\n[01:24.810]饮日吞月胸中来\n[01:29.561]大梦一场三千载\n[01:34.311]悲喜穿肠莫挂怀\n[01:39.073]大风翕张浪形骸\n[01:43.826]疏狂放歌死便埋\n[01:48.810]大疯一趟两相忘\n[01:53.567]不知东方天既白\n[02:04.321]（间奏）\n[02:18.321]一白忘忧再消愁\n[02:23.319]三碗同天竞风流\n[02:28.070]浮云苍狗烂柯泥\n[02:32.817]唯此醪糟诚不欺\n[02:37.320]羲之流觞笔抒怀\n[02:42.312]琅琊太守伛偻来\n[02:47.061]关公壮行斩华雄\n[02:52.062]悟空借胆闹天宫\n[02:56.063]大瓮一扬倾江海\n[03:00.814]饮日吞月胸中来\n[03:05.312]大梦一场三千载\n[03:10.312]悲喜穿肠莫挂怀\n[03:16.312]啊~~\n[03:20.068]大风翕张浪形骸\n[03:24.567]疏狂放歌死便埋\n[03:29.315]大疯一趟两相忘\n[03:34.313]不知东方天既白\n',
      },
      {
          src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
          artist: '瑾姝',
          name: '西巷桥边',
          img: 'http://neroht.com/109951164352276322.jpg',
          id: '66575568141',
      },
      {
          src: 'http://neroht.com/%E6%AD%A2%E6%88%98%E4%B9%8B%E6%AE%87-piano.mp3',
          artist: '张斗完',
          name: '止战之殇（纯钢琴）',
          img: 'http://neroht.com/jay.jpg',
          id: '66575568441',
      },
      {
          src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E8%B5%A4%E4%BC%B6%EF%BC%88Cover%EF%BC%9AHITA%EF%BC%89.mp3',
          artist: '瑾姝Hikari',
          name: '赤伶',
          img: 'http://neroht.com/chiling.jpg',
          id: '66575568443',
      },
      {
          src: 'http://neroht.com/%E4%BC%A6%E6%A1%91%20-%20%E7%83%9F%E9%9B%A8%E8%A1%8C%E8%88%9F.mp3',
          artist: '伦桑',
          name: '烟雨行舟',
          img: 'http://neroht.com/yanyuxingzhou.jpg',
          id: '66575568444',
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
  ])
  const [ lyric, setLyric ] = useState<string>('')
  const [ lyricLoading, setLyricLoading ] = useState<boolean>(false)
  const onDelete = (index: number, id: string) => {
      data.splice(index, 1)
      setData(data)
  }

  const onLyricMatched = (lyrics: any[], currentIndex: number) => {

  }
  const onMusicChange = (id: string) => {
      setLyric('')
      setLyricLoading(true)
      fetch(`/api/lyric/${id}`)
          .then(res => res.json())
          .then(res => {
              if (res.result) {
                  setLyricLoading(false)
                  setLyric(res.data)
              }
          })
  }

  const musicActions = [
      (music: any, active: boolean) => {
          return <span key={'favourite'} onClick={() => {
            console.log(music, active)
        }}>收藏</span>
      },
      (music: any) => {
        return <span style={{ margin: '0 8px' }} key={'share'} onClick={() => {
            console.log(music)
        }}>分享</span>
      },
      (music: any) => {
        return <span key={'download'} onClick={() => {
            console.log(music)
        }}>下载</span>
      },
  ]
  const actions = [
      (music: any) => {
          return <div style={{ fontSize: 22, marginRight: 8 }} key={'a'}>
              <svg
                  className="icon"
                  style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden", color: '#868686'}}
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1279">
                  <path
                      d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z"
                      fill="" p-id="1280"></path>
              </svg>
          </div>
      },
      (music: any) => {
          return <div style={{ fontSize: 22 }} key={'b'}>
              <svg className="icon"
                   style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden", color: '#868686'}}
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3936">
                  <path
                      d="M711.713554 104.804974c-77.222779 0-151.3388 35.948747-199.713554 92.53451-48.374754-56.585763-122.490775-92.53451-199.713554-92.53451-136.915299 0-244.094344 107.180068-244.094344 244.094344 0 167.537737 150.894685 304.453037 379.456265 511.933485l64.352657 58.361199 64.352657-58.361199C804.913213 653.353378 955.808922 516.438079 955.808922 348.900342 955.808922 211.985042 848.628854 104.804974 711.713554 104.804974zM516.660136 795.149848l-4.660136 4.216022-4.660136-4.216022C296.308543 603.64628 156.952658 477.160517 156.952658 348.900342c0-88.539522 66.793242-155.332764 155.332764-155.332764 68.346621 0 134.917806 44.158732 158.217465 104.738459l82.770122 0c23.521716-60.579727 90.092901-104.738459 158.439522-104.738459 88.539522 0 155.332764 66.793242 155.332764 155.332764C867.046319 477.160517 727.690434 603.64628 516.660136 795.149848z"
                      p-id="3937"></path>
              </svg>
          </div>
      },
  ]
    return <div className={'wrapper'}>
      <CoolPlayer
          onDelete={onDelete}
          data={data}
      />
{/*
      <CoolPlayer
          onDelete={onDelete}
          onLyricMatched={onLyricMatched}
          data={data}
          showLyricNormal={true}
          onMusicChange={onMusicChange}
          lyric={lyric}
          lyricLoading={lyricLoading}
          musicActions={musicActions}
          actions={actions}
          playListHeader={{
              headerLeft: '播放列表',
              headerRight: '清除全部'
          }}
      />
*/}
  </div>;
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
