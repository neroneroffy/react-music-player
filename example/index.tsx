import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import CoolPlayer, { ILyric } from '../src/index'
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

  const onLyricMatched = (lyrics: ILyric[], currentIndex: number) => {

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
  return <div className={'wrapper'}>
      <CoolPlayer
          onDelete={onDelete}
          onLyricMatched={onLyricMatched}
          data={data}
          showLyric={true}
          onMusicChange={onMusicChange}
          lyric={lyric}
          lyricLoading={lyricLoading}
      />
  </div>;
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
