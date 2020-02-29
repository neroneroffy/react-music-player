import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import CoolPlayer from '../src/index'
import { coolPlayerTypes } from '../src/types'
const { useState, useEffect, useRef } = React
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
  const [ dataExternal, setDataExternal ] = useState([
    {
      src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
      artist: 'Señorita',
      name: 'Shawn Mendes',
      img: 'http://neroht.com/Señorita.jpg',
      id: '66575568423123',
      lyric: "[by:Trap_Girl]\n[00:00.000] 作曲 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:01.000] 作词 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:12.22]Camila Cabello：\n[00:15.29]I love it when you call me Señorita\n[00:19.36]I wish I could pretend I didn't need ya\n[00:23.43]But every touch is ooh la la la\n[00:26.54]It's true la la la\n[00:28.51]Ooh I should be runnin'\n[00:30.57]Ooh you keep me coming for ya\n[00:32.95]Shawn Mendes：\n[00:33.29]Land in miami\n[00:35.22]The air was hot from summer rain\n[00:37.27]Sweat dripping off me\n[00:39.44]Before I even knew her name la la la\n[00:44.41]It felt like ooh la la la\n[00:47.07]Yeah noo\n[00:49.47]Sapphire moonlight\n[00:51.50]We danced for hours in the sand\n[00:53.65]Tequila sunrise\n[00:55.71]Her body fit right in my hands la la la\n[01:00.85]It felt like ooh la la la yeah\n[01:04.28]Both：\n[01:04.47]I love it when you call me Señorita\n[01:08.54]I wish I could pretend I didn't need ya\n[01:12.64]But every touch is ooh la la la\n[01:15.76]It's true la la la\n[01:17.86]Ooh I should be runnin'\n[01:19.85]Oohh you know I love it when you call me Señorita\n[01:25.05]I wish it wasn't so d**n hard to leave ya\n[01:29.12]But every touch is ooh la la la\n[01:32.26]It's true la la la\n[01:34.16]Ooh I should be runnin'\n[01:36.18]Ooh you keep me coming for ya\n[01:38.54]Camila Cabello：\n[01:38.86]Locked in the hotel\n[01:40.86]There's just somethings that never change\n[01:42.92]You say we're just friends\n[01:44.92]But friends don't know the way you taste la la la\n[01:50.63]God knows it's been a long time coming don't ya let me fall ooh\n[01:54.50]Both：\n[01:55.08]Hooked on your lips undress me\n[01:57.03]Hooked on your tongue\n[01:58.99]Oh I love your kiss is deadly don't stop\n[02:02.11]I love it when you call me Señorita\n[02:06.04]I wish I could pretend I didn't need ya\n[02:10.04]But every touch is ooh la la la\n[02:13.11]It's true la la la\n[02:15.21]Ooh I should be runnin'\n[02:17.23]Ooh you know I love it when you call me Señorita\n[02:22.42]I wish it wasn't so d**n hard to leave ya\n[02:26.48]But every touch is ooh la la la\n[02:29.60]It's true la la la\n[02:31.61]Ooh I should be runnin'\n[02:33.68]Ooh you keep me coming for ya\n[02:37.44]All along I've been coming for ya\n[02:40.31]For you\n[02:41.70]And I hope it means something to you\n[02:45.75]Call my name I'll be coming for ya\n[02:48.36]Coming for ya\n[02:49.42]Calling for ya\n[02:50.50]Coming for ya\n[02:51.81]For ya\n[02:55.80]For ya\n[02:57.87]Oh she loves it when I call her\n[02:59.94]For ya\n[03:04.55]Ooh I should be runnin'\n[03:06.51]Ooh you keep me coming for ya\n",
      tLyric: "[by:咆哮的小清新___]\n[00:12.22]\n[00:15.29]我爱你称我为\"我的小姐\"时的样子\n[00:19.36]多希望我可以假装不需要你\n[00:23.43]但每一次触碰都妙不可语\n[00:26.54]真实无比 lalala\n[00:28.51]噢 我想我应该逃走\n[00:30.57]噢但你却将我牢牢吸引掌控\n[00:32.95]\n[00:33.29]着陆在迈阿密\n[00:35.22]盛夏雨季的空气炙热难息\n[00:37.27]汗流不停\n[00:39.44]在我知道她的名字之前就汗流不停\n[00:44.41]那感觉就像 噢\n[00:47.07]\n[00:49.47]午夜里的蓝宝石璀璨不息\n[00:51.50]你我在沙滩上久久共舞\n[00:53.65]配上龙舌兰日出\n[00:55.71]她的身躯线条刚好适合你的手掌一握\n[01:00.85]那感觉一如 噢妙不可语\n[01:04.28]\n[01:04.47]我爱你称我为\"我的小姐\"时的样子\n[01:08.54]多希望我可以假装不需要你\n[01:12.64]但每一次触碰都妙不可语\n[01:15.76]真实无比 lalala\n[01:17.86]噢 我想我应该逃走\n[01:19.85]但你知道你称我为\"我的小姐\"时我有多么享受\n[01:25.05]多希望我可以轻易就离开你\n[01:29.12]但每一次触碰都妙不可语\n[01:32.26]真实无比 lalala\n[01:34.16]噢 我想我应该逃走\n[01:36.18]噢但你却将我牢牢吸引掌控\n[01:38.54]\n[01:38.86]把自己锁在房间里\n[01:40.86]始终有一些无法改变的事情\n[01:42.92]你说我们只是朋友\n[01:44.92]但朋友又怎么知道你有多么可口\n[01:50.63]你知道我们也这样维持了许久 别让我失望难过\n[01:54.50]\n[01:55.08]当你的双唇将我衣裳剥落\n[01:57.03]噢在你舌尖沦陷的我\n[01:58.99]噢亲爱的 你的吻教人销魂 别停下来\n[02:02.11]我爱你称我为\"我的小姐\"时的样子\n[02:06.04]多希望我可以假装不需要你\n[02:10.04]但每一次触碰都妙不可语\n[02:13.11]但每一次触碰都真实无比 lalala\n[02:15.21]噢 我想我应该逃走\n[02:17.23]但你知道你称我为\"我的小姐\"时我有多么享受\n[02:22.42]希望我可以轻易就离开你\n[02:26.48]但每一次触碰都妙不可语\n[02:29.60]真实无比 lalala\n[02:31.61]噢 我想我应该逃走\n[02:33.68]噢但你却将我牢牢吸引掌控\n[02:37.44]一直以来我都那么戒不掉你\n[02:40.31]为你\n[02:41.70]希望那对你来说有所意义\n[02:45.75]我会随叫随到只要你呼唤我名\n[02:48.36]只为你(我到来时她总是无比欣喜)\n[02:49.42]只为你\n[02:50.50]只为你\n[02:51.81]只为你\n[02:55.80]只为你\n[02:57.87](我到来时她总是无比欣喜)\n[02:59.94]只为你\n[03:04.55]噢我想我应该逃走\n[03:06.51]但你却将我牢牢吸引掌控\n"
    },
    {
      src: 'http://neroht.com/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://neroht.com/mika.jpg',
      id: '66575568425354321',
      lyric: "[00:00.425] 作词:Mika\n[00:00.850] 作曲:Mika\n[00:00.860]What's the big idea\n[00:03.230]Yo, Mika\n[00:04.440]\n[00:09.500]\n[00:10.680]I said sucking to hard on your lollipop\n[00:13.530]Oh, loves gonna get you down\n[00:15.550]I said sucking to hard on your lollipop\n[00:18.220]Oh, loves gonna get you down\n[00:20.880]Sucking to hard on your lollipop\n[00:23.600]Loves gonna get you down\n[00:25.860]Sucking to hard on your lollipop\n[00:28.490]Loves gonna get you down\n[00:30.560]Say love, say love\n[00:33.500]Loves gonna get you down\n[00:35.590]Say love, say love\n[00:38.100]Loves gonna get you down\n[00:40.370]I went walking with my momma one day\n[00:42.890]When she warn me what people say\n[00:45.360]Live your life until love is found\n[00:48.100]'Cos loves gonna get you down\n[00:50.370]Take a look at the girl next door\n[00:52.880]She's a player and a downright bore\n[00:55.370]She's a slowzer, she wants more\n[00:58.600]Oh,bad girls get you down\n[01:00.370]Sing it\n[01:00.950]Sucking to hard on your lollipop\n[01:03.570]Oh, loves gonna get you down\n[01:05.850]Sucking to hard on your lollipop\n[01:08.500]Oh, loves gonna get you down\n[01:10.590]Say love, say love\n[01:13.170]Oh, loves gonna get you down\n[01:15.550]Say love, say love\n[01:18.130]Oh, loves gonna get you down\n[01:20.420]Mama told me what I should know\n[01:22.830]Too much candy gonna rot your soul\n[01:25.289]If she loves you let her go\n[01:28.190]'Cos love only gets you down\n[01:30.380]Take a look at a boy like me\n[01:32.680]Never stood on my own two feet\n[01:35.360]now I'm blue, as I can be\n[01:37.870]Oh, love only got me down\n[01:40.320]Sing it\n[01:41.390]Sucking to hard on your lollipop\n[01:43.600]Oh, loves gonna get you down\n[01:45.830]Sucking to hard on your lollipop\n[01:48.500]Oh, loves gonna get you down\n[01:50.550]Say love, say love\n[01:53.600]Oh loves gonna get you down\n[01:55.570]Say love, say love\n[01:58.190]Oh loves gonna get you down\n[02:00.610]I was walking with my momma one day\n[02:02.900]When she told me what people say\n[02:05.320]Live your life until love is found\n[02:08.110]Or loves gonna get you down\n[02:10.240]Sing it\n[02:11.120]Sucking to hard on your lollipop\n[02:13.460]Loves gonna get you down\n[02:15.720]Sucking to hard on your lollipop\n[02:18.430]Oh, loves gonna get you down\n[02:20.610]Say love, say love\n[02:23.160]Oh, loves gonna get you down\n[02:25.650]Say love, say love\n[02:28.130]Oh, loves gonna get you down\n[02:30.300]Mama told me what I should know\n[02:32.810]Too much cand gonna rot your soul\n[02:35.320]If she loves you let her go\n[02:38.230]'Cos love only gets you down\n[02:41.200]\n[02:49.740]\n[02:50.920]Sucking to hard on your lollipop\n[02:53.430]loves gonna get you down\n[02:55.680]Sucking to hard on your lollipop\n[02:58.410]loves gonna get you down\n[03:01.270]\n"
    },
    {
      src: 'http://neroht.com/Shayne Ward - Breathless.mp3',
      artist: 'Shayne Ward',
      name: 'Breathless',
      img: 'http://neroht.com/shayneWard.jpg',
      id: '66575568425467865',
      lyric: "[by:青烟x]\n[ti:Breathless]\n[ar:Shayne Ward]\n[al:Breathless]\n[by:青烟]\n[00:00.000] 作词 : BIRGISSON, ARNTHOR/KOTECHA, SAVAN/YACOUB, RAMI\n[00:09.00]If our love was a fairy tale\n[00:13.04]I would charge in and rescue you\n[00:16.95]On a yacht baby we would sail\n[00:20.77]To an island where we'd say I do\n[00:24.52]And if we had babies they would look like you\n[00:28.44]It'd be so beautiful if that came true\n[00:32.34]You don't even know how very special you are\n[00:36.66]Chorus\n[00:37.96]You leave me breathless\n[00:42.55]You're everything good in my life\n[00:45.55]You leave me breathless\n[00:50.20]I still can't believe that you're mine\n[00:53.74]You just walked out of one of my dreams\n[00:57.83]So beautiful you're leaving me\n[01:02.11]Breathless\n[01:07.00]And if our love was a story book\n[01:11.15]We would meet on the very first page\n[01:15.01]The last chapter would be about\n[01:18.45]How I'm thankful for the life we've made\n[01:22.61]And if we had babies they would have your eyes\n[01:26.66]I would fall deeper watching you give life\n[01:30.46]You don't even know how very special you are\n[01:35.90]You leave me breathless\n[01:40.88]You're everything good in my life\n[01:43.89]You leave me breathless\n[01:48.46]I still can't believe that you're mine\n[01:51.69]You just walked out of one of my dreams\n[01:55.87]So beautiful you're leaving me\n[02:00.32]You must have been sent from heaven to earth to change me\n[02:06.38]You're like an angel\n[02:08.42]The thing that I feel is stronger than love believe me\n[02:13.84]You're something special\n[02:16.03]I only hope that I'll one day deserve what you've given me\n[02:21.49]But all I can do is try\n[02:26.00]Every day of my life\n[02:33.86]You leave me breathless\n[02:38.66]You're everything good in my life\n[02:41.93]You leave me breathless\n[02:46.47]I still can't believe that you're mine\n[02:49.78]You just walked out of one of my dreams\n[02:53.99]So beautiful you're leaving me\n[02:58.21]Breathless\n[03:02.19]You're everything good in my life\n[03:05.23]You leave me breathless\n[03:09.72]I still can't believe that you're mine\n[03:12.96]You just walked out of one of my dreams\n[03:17.44]So beautiful you're leaving me\n[03:21.37]Breathless\n"
    },
  ])
  const [ currentAudio, setCurrentAudio ] = useState(null)
  const [ lyric, setLyric ] = useState<string>('')
  const [ lyricLoading, setLyricLoading ] = useState<boolean>(false)
  const [ playing, setPlaying ] = useState<boolean>(false)
  const [ volumeLeft, setVolumeLeft ] = useState<number>(0)
  const [ volumeValue, setVolumeValue ] = useState<number>(0.4)
  const [ mouseDown, setMouseDown ] = useState<boolean>(false)
  const totalVolumeEl = useRef(null)
  const volumeProgressEl = useRef(null)
  useEffect(() => {
    setCurrentAudio(dataExternal[0])
  }, [])
  useEffect(() => {
    setVolumeLeft(totalVolumeEl.current.getBoundingClientRect().left)
  }, [document.body.clientWidth])
  const onDelete = (index: number, id: string) => {
    data.splice(index, 1)
    setData(data)
  }

  const onLyricMatched = (lyrics: any[], currentIndex: number) => {

  }
  const onMusicChange = (id: string, currentMusic: coolPlayerTypes.IAudio) => {
    setLyric('')
    setCurrentAudio(currentMusic)
    if (!currentMusic.lyric) {
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
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1279"
        >
          <path
            d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z"
            fill=""
            p-id="1280"
          >
          </path>
        </svg>
      </div>
    },
    (music: any) => {
      return <div style={{ fontSize: 22 }} key={'b'}>
        <svg
          className="icon"
          style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden", color: '#868686'}}
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3936">
          <path
            d="M711.713554 104.804974c-77.222779 0-151.3388 35.948747-199.713554 92.53451-48.374754-56.585763-122.490775-92.53451-199.713554-92.53451-136.915299 0-244.094344 107.180068-244.094344 244.094344 0 167.537737 150.894685 304.453037 379.456265 511.933485l64.352657 58.361199 64.352657-58.361199C804.913213 653.353378 955.808922 516.438079 955.808922 348.900342 955.808922 211.985042 848.628854 104.804974 711.713554 104.804974zM516.660136 795.149848l-4.660136 4.216022-4.660136-4.216022C296.308543 603.64628 156.952658 477.160517 156.952658 348.900342c0-88.539522 66.793242-155.332764 155.332764-155.332764 68.346621 0 134.917806 44.158732 158.217465 104.738459l82.770122 0c23.521716-60.579727 90.092901-104.738459 158.439522-104.738459 88.539522 0 155.332764 66.793242 155.332764 155.332764C867.046319 477.160517 727.690434 603.64628 516.660136 795.149848z"
            p-id="3937"
          ></path>
        </svg>
      </div>
  },
  ]
  const playThis = (index: number) => {
    setCurrentAudio(dataExternal[index])
    setPlaying(true)
  }
  const onTogglePlaying = () => {
    setPlaying(!playing)
  }
    const setVolume = (pageX: number, volume?:number) => {
      const volumeRate = volume || (pageX - volumeLeft) / totalVolumeEl.current.offsetWidth;
      if (volumeRate > 0.01 && volumeRate <= 1) {
        setVolumeValue(volumeRate)
        volumeProgressEl.current.style.width = volumeRate * 100 + '%';
      } else if (volumeRate <= 0.01) {
        setVolumeValue(0)
      } else {
        setVolumeValue(1)
      }
    }
    const startMoveVolume = (e: React.TouchEvent<HTMLDivElement>) => {
      setVolume(e.touches[0].pageX)
    }
    const moveVolume = (e: React.TouchEvent<HTMLDivElement>) => {
      setVolume(e.touches[0].pageX)
    }
    // PC端改变音量
    const clickChangeVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setVolume(e.pageX)
    }
    const mouseDownVolume = () => {
      setMouseDown(true)
    }
    const slideChangeVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (mouseDown) {
        setVolume(e.pageX)
      }
    }
    const mouseUpVolume = () => {
      setMouseDown(false)
    }
    const mouseLeave = () => {
      setMouseDown(false)
    }

    const onVolumeChange = (volume: number) => {
      if (volume) {
        setVolume(0, volume)
      }
    }

    return <div className={'example'}>
      <div className={'main'}>
        <div className={'audio-list'}>
          {
            dataExternal.map((item, index) => {
              return <div key={item.id} className={'audio-item'} onClick={() => playThis(index)}>
                <div className="left">
                  <img src={item.img} alt=""/>
                  <div className={'audio-info'}>
                      <div>{item.name}</div>
                      <div>{item.artist}</div>
                  </div>
                </div>
                <div className="right">
                  <svg
                    className="icon-play"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12608"
                    data-test={'play-btn'}
                  >
                    <path
                      d="M844.704269 475.730473L222.284513 116.380385a43.342807 43.342807 0 0 0-65.025048 37.548353v718.692951a43.335582 43.335582 0 0 0 65.025048 37.541128l622.412531-359.342864a43.357257 43.357257 0 0 0 0.007225-75.08948z"
                      fill="" p-id="12609"
                    />
                  </svg>
                </div>
              </div>
            })
          }
        </div>
        <div className={'operation'}>
          <button
            onClick={onTogglePlaying}
            className={'play-control'}
          >
            {
              playing ? 'Pause' : 'Play'
            }
          </button>
          <div
            className="volume-control-wrapper"
            onTouchMove={moveVolume}
            onTouchStart={startMoveVolume}
            onMouseDown={mouseDownVolume}
            onMouseMove={slideChangeVolume}
            onMouseUp={mouseUpVolume}
            onMouseLeave={mouseLeave}
            onClick={clickChangeVolume}
          >
            <div
              className={'volume-control'}
              ref={totalVolumeEl}
              onClick={clickChangeVolume}
            >
              <div
                className="volume-slider"
                style={{ background: '#017fff' }}
                ref={volumeProgressEl}
              >
                <div
                    className='volume-dot'
                ></div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div className={'wrapper'}>
        <CoolPlayer
          onDelete={onDelete}
          autoPlay={false}
          playing={playing}
          onLyricMatched={onLyricMatched}
          currentAudio={currentAudio}
          data={data}
          showLyricNormal={true}
          onMusicChange={onMusicChange}
          onVolumeChange={onVolumeChange}
          lyric={lyric}
          lyricLoading={lyricLoading}
          musicActions={musicActions}
          actions={actions}
          volume={volumeValue}
          playListHeader={{
              headerLeft: '播放列表',
              headerRight: '清除全部'
          }}
          onModeChange={(currentMode, prevMode) => {
              console.log(currentMode, prevMode)
          }}
        />
      </div>
    </div>
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
