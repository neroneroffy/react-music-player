import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import CoolMusicPlayer from '../src'
// import CoolMusicPlayer from '../dist'
// import '../dist/index.css'
import { coolPlayerTypes } from '../index'
const logo = require('./assets/logo.png').default
import classnames from 'classnames'
import IAudio = coolPlayerTypes.IAudio;
const { useState, useEffect, useRef } = React
type PlayModeTypes = 'order' | 'random' | 'loop'
enum PlayMode {
  Order = 'order',
  Random = 'random',
  Loop = 'loop'
}
const IconMore = <svg
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  fill={'#bfbfbf'}
>
  <path d="M746.662019 512c0 51.835575 42.044582 93.865831 93.865831 93.865831 51.851948 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.013883-93.865831-93.865831-93.865831C788.706601 418.135192 746.662019 460.163401 746.662019 512z" p-id="1150"></path><path d="M89.604272 512c0 51.835575 42.043558 93.865831 93.864808 93.865831 51.822272 0 93.865831-42.029232 93.865831-93.865831 0-51.836599-42.043558-93.865831-93.865831-93.865831C131.648854 418.135192 89.604272 460.163401 89.604272 512z" p-id="1151"></path><path d="M418.132634 512c0 51.835575 42.013883 93.865831 93.866854 93.865831 51.821249 0 93.864808-42.029232 93.864808-93.865831 0-51.836599-42.043558-93.865831-93.864808-93.865831C460.146517 418.135192 418.132634 460.163401 418.132634 512z" p-id="1152">
  </path>
</svg>
const App = () => {
  const [ data, setData ] = useState([
    {
      src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
      artist: '瑾姝',
      name: '西巷桥边',
      img: 'http://neroht.com/109951164352276322.jpg',
      id: '66575568141',
    },
    {
      src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
      artist: '瑾姝Hikari',
      name: '大氿歌',
      img: 'http://neroht.com/daguige.jpg',
      id: '66575568442',
      lyric: '[00:00.000] 作曲 : ilem\n[00:01.000] 作词 : ilem\n[00:18.071]翻唱/和编：瑾姝\n[00:19.328]土生木酿水中火\n[00:24.591]金樽玉液小乾坤\n[00:29.322]文痴武客三点血\n[00:33.811]江湖相见半盏春\n[00:42.576]一白忘忧再消愁\n[00:47.311]三碗同天竞风流\n[00:52.062]浮云苍狗烂柯泥\n[00:56.569]唯此醪糟诚不欺\n[01:01.582]花枪风雪挑葫芦\n[01:06.313]哨棒过岗打猛虎\n[01:11.315]谪仙对影捞玉蟾\n[01:16.067]诗圣放歌击浪还\n[01:20.060]大瓮一扬倾江海\n[01:24.810]饮日吞月胸中来\n[01:29.561]大梦一场三千载\n[01:34.311]悲喜穿肠莫挂怀\n[01:39.073]大风翕张浪形骸\n[01:43.826]疏狂放歌死便埋\n[01:48.810]大疯一趟两相忘\n[01:53.567]不知东方天既白\n[02:04.321]（间奏）\n[02:18.321]一白忘忧再消愁\n[02:23.319]三碗同天竞风流\n[02:28.070]浮云苍狗烂柯泥\n[02:32.817]唯此醪糟诚不欺\n[02:37.320]羲之流觞笔抒怀\n[02:42.312]琅琊太守伛偻来\n[02:47.061]关公壮行斩华雄\n[02:52.062]悟空借胆闹天宫\n[02:56.063]大瓮一扬倾江海\n[03:00.814]饮日吞月胸中来\n[03:05.312]大梦一场三千载\n[03:10.312]悲喜穿肠莫挂怀\n[03:16.312]啊~~\n[03:20.068]大风翕张浪形骸\n[03:24.567]疏狂放歌死便埋\n[03:29.315]大疯一趟两相忘\n[03:34.313]不知东方天既白\n',
    },
    {
      src: 'http://neroht.com/Shawn Mendes - Señorita.mp3',
      artist: 'Shawn Mendes',
      name: 'Señorita',
      img: 'http://neroht.com/Señorita.jpg',
      id: '66575568423123',
      lyric: "[by:Trap_Girl]\n[00:00.000] 作曲 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:01.000] 作词 : Shawn Mendes/Camila Cabello/Andrew Wotman/Benjamin Levin/Ali Tamposi/Charlotte Emma Aitchison/Jack Patterson/Magnus August Höiberg\n[00:12.22]Camila Cabello：\n[00:15.29]I love it when you call me Señorita\n[00:19.36]I wish I could pretend I didn't need ya\n[00:23.43]But every touch is ooh la la la\n[00:26.54]It's true la la la\n[00:28.51]Ooh I should be runnin'\n[00:30.57]Ooh you keep me coming for ya\n[00:32.95]Shawn Mendes：\n[00:33.29]Land in miami\n[00:35.22]The air was hot from summer rain\n[00:37.27]Sweat dripping off me\n[00:39.44]Before I even knew her name la la la\n[00:44.41]It felt like ooh la la la\n[00:47.07]Yeah noo\n[00:49.47]Sapphire moonlight\n[00:51.50]We danced for hours in the sand\n[00:53.65]Tequila sunrise\n[00:55.71]Her body fit right in my hands la la la\n[01:00.85]It felt like ooh la la la yeah\n[01:04.28]Both：\n[01:04.47]I love it when you call me Señorita\n[01:08.54]I wish I could pretend I didn't need ya\n[01:12.64]But every touch is ooh la la la\n[01:15.76]It's true la la la\n[01:17.86]Ooh I should be runnin'\n[01:19.85]Oohh you know I love it when you call me Señorita\n[01:25.05]I wish it wasn't so d**n hard to leave ya\n[01:29.12]But every touch is ooh la la la\n[01:32.26]It's true la la la\n[01:34.16]Ooh I should be runnin'\n[01:36.18]Ooh you keep me coming for ya\n[01:38.54]Camila Cabello：\n[01:38.86]Locked in the hotel\n[01:40.86]There's just somethings that never change\n[01:42.92]You say we're just friends\n[01:44.92]But friends don't know the way you taste la la la\n[01:50.63]God knows it's been a long time coming don't ya let me fall ooh\n[01:54.50]Both：\n[01:55.08]Hooked on your lips undress me\n[01:57.03]Hooked on your tongue\n[01:58.99]Oh I love your kiss is deadly don't stop\n[02:02.11]I love it when you call me Señorita\n[02:06.04]I wish I could pretend I didn't need ya\n[02:10.04]But every touch is ooh la la la\n[02:13.11]It's true la la la\n[02:15.21]Ooh I should be runnin'\n[02:17.23]Ooh you know I love it when you call me Señorita\n[02:22.42]I wish it wasn't so d**n hard to leave ya\n[02:26.48]But every touch is ooh la la la\n[02:29.60]It's true la la la\n[02:31.61]Ooh I should be runnin'\n[02:33.68]Ooh you keep me coming for ya\n[02:37.44]All along I've been coming for ya\n[02:40.31]For you\n[02:41.70]And I hope it means something to you\n[02:45.75]Call my name I'll be coming for ya\n[02:48.36]Coming for ya\n[02:49.42]Calling for ya\n[02:50.50]Coming for ya\n[02:51.81]For ya\n[02:55.80]For ya\n[02:57.87]Oh she loves it when I call her\n[02:59.94]For ya\n[03:04.55]Ooh I should be runnin'\n[03:06.51]Ooh you keep me coming for ya\n",
      tLyric: "[by:咆哮的小清新___]\n[00:12.22]\n[00:15.29]我爱你称我为\"我的小姐\"时的样子\n[00:19.36]多希望我可以假装不需要你\n[00:23.43]但每一次触碰都妙不可语\n[00:26.54]真实无比 lalala\n[00:28.51]噢 我想我应该逃走\n[00:30.57]噢但你却将我牢牢吸引掌控\n[00:32.95]\n[00:33.29]着陆在迈阿密\n[00:35.22]盛夏雨季的空气炙热难息\n[00:37.27]汗流不停\n[00:39.44]在我知道她的名字之前就汗流不停\n[00:44.41]那感觉就像 噢\n[00:47.07]\n[00:49.47]午夜里的蓝宝石璀璨不息\n[00:51.50]你我在沙滩上久久共舞\n[00:53.65]配上龙舌兰日出\n[00:55.71]她的身躯线条刚好适合你的手掌一握\n[01:00.85]那感觉一如 噢妙不可语\n[01:04.28]\n[01:04.47]我爱你称我为\"我的小姐\"时的样子\n[01:08.54]多希望我可以假装不需要你\n[01:12.64]但每一次触碰都妙不可语\n[01:15.76]真实无比 lalala\n[01:17.86]噢 我想我应该逃走\n[01:19.85]但你知道你称我为\"我的小姐\"时我有多么享受\n[01:25.05]多希望我可以轻易就离开你\n[01:29.12]但每一次触碰都妙不可语\n[01:32.26]真实无比 lalala\n[01:34.16]噢 我想我应该逃走\n[01:36.18]噢但你却将我牢牢吸引掌控\n[01:38.54]\n[01:38.86]把自己锁在房间里\n[01:40.86]始终有一些无法改变的事情\n[01:42.92]你说我们只是朋友\n[01:44.92]但朋友又怎么知道你有多么可口\n[01:50.63]你知道我们也这样维持了许久 别让我失望难过\n[01:54.50]\n[01:55.08]当你的双唇将我衣裳剥落\n[01:57.03]噢在你舌尖沦陷的我\n[01:58.99]噢亲爱的 你的吻教人销魂 别停下来\n[02:02.11]我爱你称我为\"我的小姐\"时的样子\n[02:06.04]多希望我可以假装不需要你\n[02:10.04]但每一次触碰都妙不可语\n[02:13.11]但每一次触碰都真实无比 lalala\n[02:15.21]噢 我想我应该逃走\n[02:17.23]但你知道你称我为\"我的小姐\"时我有多么享受\n[02:22.42]希望我可以轻易就离开你\n[02:26.48]但每一次触碰都妙不可语\n[02:29.60]真实无比 lalala\n[02:31.61]噢 我想我应该逃走\n[02:33.68]噢但你却将我牢牢吸引掌控\n[02:37.44]一直以来我都那么戒不掉你\n[02:40.31]为你\n[02:41.70]希望那对你来说有所意义\n[02:45.75]我会随叫随到只要你呼唤我名\n[02:48.36]只为你(我到来时她总是无比欣喜)\n[02:49.42]只为你\n[02:50.50]只为你\n[02:51.81]只为你\n[02:55.80]只为你\n[02:57.87](我到来时她总是无比欣喜)\n[02:59.94]只为你\n[03:04.55]噢我想我应该逃走\n[03:06.51]但你却将我牢牢吸引掌控\n"
    },
    {
      src: 'http://neroht.com/%E6%AD%A2%E6%88%98%E4%B9%8B%E6%AE%87-piano.mp3',
      artist: '张斗完',
      name: '止战之殇（纯钢琴）',
      img: 'http://neroht.com/jay.jpg',
      id: '66575568441',
      disabled: true,
      disabledReason: '版权问题，无法播放'
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
      disabled: true,
    },
  ])
  const [ dataExternal, setDataExternal ] = useState([
    {
      src: 'http://neroht.com/Adam%20Lambert%20-%20Outlaws%20of%20Love.mp3',
      artist: 'Adam Lambert',
      name: 'Outlaws of love',
      img: 'http://neroht.com/outlows-of-love.jpg',
      id: '665755681875',
      lyric: "[00:02.73]Songwriters: WESTBERG, RUNE / JEAN, BC / LAMBERT, ADAM\n[00:12.73]Oh, nowhere left to go\n[00:17.41]Are we getting closer? Closer?\n[00:25.38]No, all we know is \"No\"\n[00:30.50]Nights are getting colder, colder\n[00:38.46]Hey, tears all fall the same\n[00:43.23]We all feel the rain\n[00:46.14]We can't change\n[00:52.72]Everywhere we go\n[00:56.59]We're looking for the sun\n[00:59.02]Nowhere to grow old\n[01:02.03]We're always on the run\n[01:05.10]They say we'll rot in Hell\n[01:08.75]But I don't think we will\n[01:11.83]They've branded us enough\n[01:14.17]Outlaws of love.\n[01:22.57]Scars make us who we are\n[01:27.92]Hearts and homes are broken, broken\n[01:35.75]Far, we could go so far\n[01:40.59]With our minds wide open, open\n[01:48.61]Hey, tears all fall the same\n[01:53.46]We all feel the rain\n[01:56.65]We can't change\n[01:59.88]Everywhere we go\n[02:02.20]We're looking for the sun\n[02:06.64]Nowhere to grow old\n[02:09.13]We're always on the run\n[02:12.57]They say we'll rot in Hell\n[02:15.66]But I don't think we will\n[02:18.41]They've branded us enough\n[02:21.55]Outlaws of love\n[02:51.23]Everywhere we go\n[02:54.01]We're looking for the sun\n[02:57.34]Nowhere to grow old\n[03:00.49]We're always on the run\n[03:03.70]They say we'll rot in Hell\n[03:06.57]But I don't think we will\n[03:10.08]They've branded us enough\n[03:13.16]Outlaws of love\n[03:19.44]Outlaws of love\n[03:25.39]Outlaws of love\n[03:31.92]Outlaws of love\n[03:38.23]Outlaws of love\n",
      tLyric: "[by:学渣1234]\n[00:02.73]词曲作者:westberg符文/ jean bc /亚当兰伯特\n[00:12.73]何去何从\n[00:17.41]我们可否愈加紧紧相依\n[00:25.38]不，我们都明白并非如此\n[00:30.50]夜愈寒，心愈冷\n[00:38.46]我们都曾黯然泪下\n[00:43.23]任凭风雨蹂躏\n[00:46.14]却无力改变眼前的一切\n[00:52.72]四处游走\n[00:56.59]只为寻找一丝温暖\n[00:59.02]奔波寻找\n[01:02.03]依旧无处白头偕老\n[01:05.10]他们说我们将因这孽缘步入地狱\n[01:08.75]可我 从未认同\n[01:11.83]我们受够了束缚\n[01:14.17]以囚徒之名，为爱逃亡\n[01:22.57]伤痕让我们看清自己\n[01:27.92]就算肝肠寸断，无处安身\n[01:35.75]只要我们敞开心扉\n[01:40.59]爱就可蔓延千里\n[01:48.61]我们都曾黯然泪\n[01:53.46]任凭风雨蹂躏\n[01:56.65]却无力改变眼前的一切\n[01:59.88]四处游走\n[02:02.20]只为寻找一丝温暖\n[02:06.64]奔波寻找\n[02:09.13]依旧无处白头偕老\n[02:12.57]他们说我们将因这孽缘步入地狱\n[02:15.66]可我 从未认同\n[02:18.41]我们受够了束缚\n[02:21.55]为爱亡命流浪\n[02:51.23]行遍天涯\n[02:54.01]我们四处寻找阳光\n[02:57.34]无处可白头偕老\n[03:00.49]我们一直奔波流浪\n[03:03.70]他们说我们会在地狱中腐烂\n[03:06.57]但我不相信\n[03:10.08]他们为我们烙上罪孽的印记\n[03:13.16]我们便沦为爱的亡命之徒\n[03:19.44]以囚徒之名，为爱逃亡\n[03:25.39]以囚徒之名，为爱逃亡\n[03:31.92]以囚徒之名，为爱逃亡\n[03:38.23]以囚徒之名，为爱逃亡\n"
    },
    {
      src: 'http://neroht.com/MIKA - Lollipop.mp3',
      artist: 'Mika',
      name: 'Lollipop',
      img: 'http://neroht.com/mika.jpg',
      id: '66575568425354321',
      // disabled: true,
    },
    {
      src: 'http://neroht.com/Shayne Ward - Breathless.mp3',
      artist: 'Shayne Ward',
      name: 'Breathless',
      img: 'http://neroht.com/shayneWard.jpg',
      id: '66575568425467865',
      lyric: "[by:青烟x]\n[ti:Breathless]\n[ar:Shayne Ward]\n[al:Breathless]\n[by:青烟]\n[00:00.000] 作词 : BIRGISSON, ARNTHOR/KOTECHA, SAVAN/YACOUB, RAMI\n[00:09.00]If our love was a fairy tale\n[00:13.04]I would charge in and rescue you\n[00:16.95]On a yacht baby we would sail\n[00:20.77]To an island where we'd say I do\n[00:24.52]And if we had babies they would look like you\n[00:28.44]It'd be so beautiful if that came true\n[00:32.34]You don't even know how very special you are\n[00:36.66]Chorus\n[00:37.96]You leave me breathless\n[00:42.55]You're everything good in my life\n[00:45.55]You leave me breathless\n[00:50.20]I still can't believe that you're mine\n[00:53.74]You just walked out of one of my dreams\n[00:57.83]So beautiful you're leaving me\n[01:02.11]Breathless\n[01:07.00]And if our love was a story book\n[01:11.15]We would meet on the very first page\n[01:15.01]The last chapter would be about\n[01:18.45]How I'm thankful for the life we've made\n[01:22.61]And if we had babies they would have your eyes\n[01:26.66]I would fall deeper watching you give life\n[01:30.46]You don't even know how very special you are\n[01:35.90]You leave me breathless\n[01:40.88]You're everything good in my life\n[01:43.89]You leave me breathless\n[01:48.46]I still can't believe that you're mine\n[01:51.69]You just walked out of one of my dreams\n[01:55.87]So beautiful you're leaving me\n[02:00.32]You must have been sent from heaven to earth to change me\n[02:06.38]You're like an angel\n[02:08.42]The thing that I feel is stronger than love believe me\n[02:13.84]You're something special\n[02:16.03]I only hope that I'll one day deserve what you've given me\n[02:21.49]But all I can do is try\n[02:26.00]Every day of my life\n[02:33.86]You leave me breathless\n[02:38.66]You're everything good in my life\n[02:41.93]You leave me breathless\n[02:46.47]I still can't believe that you're mine\n[02:49.78]You just walked out of one of my dreams\n[02:53.99]So beautiful you're leaving me\n[02:58.21]Breathless\n[03:02.19]You're everything good in my life\n[03:05.23]You leave me breathless\n[03:09.72]I still can't believe that you're mine\n[03:12.96]You just walked out of one of my dreams\n[03:17.44]So beautiful you're leaving me\n[03:21.37]Breathless\n",
    },
  ])
  const [ currentAudio, setCurrentAudio ] = useState<coolPlayerTypes.IAudio>(dataExternal[0])
  const [ lyric, setLyric ] = useState<string>('')
  const [ tLyric, setTLyric ] = useState<string>('')
  const [ lyricLoading, setLyricLoading ] = useState<boolean>(false)
  const [ playing, setPlaying ] = useState<boolean>(false)
  const [ volumeLeft, setVolumeLeft ] = useState<number>(0)
  const [ volumeValue, setVolumeValue ] = useState<number>(0.4)
  const [ mouseDown, setMouseDown ] = useState<boolean>(false)
  const [ playMode, setPlayMode ] = useState<PlayModeTypes>(PlayMode.Order)
  const [ currentPlayMode, setCurrentPlayMode ] = useState<PlayModeTypes>(PlayMode.Order)
  const [ playListShow, setPlayListShow ] = useState<boolean>(false)
  const [ playDetailShow, setPlayDetailShow ] = useState<boolean>(false)
  const [ noActionsShow, setNoActionsShow ] = useState<boolean>(false)
  const totalVolumeEl = useRef(null)
  const volumeProgressEl = useRef(null)
  useEffect(() => {
    setCurrentAudio(dataExternal[0])
  }, [])
  useEffect(() => {
    setVolumeLeft(totalVolumeEl.current.getBoundingClientRect().left)
  }, [document.body.clientWidth])
  const onDelete = (index: number, id: string) => {
    const _data = JSON.parse(JSON.stringify(data))
    _data.splice(index, 1)
    setData(_data)
  }

  const onAudioChange = (id: string, currentMusic: coolPlayerTypes.IAudio) => {
    setLyric('')
    setTLyric('')
    setCurrentAudio(currentMusic)
    if (!currentMusic.lyric) {
      setLyricLoading(true)
      fetch(`/api/lyric/${id}`)
        .then(res => {
          const cloneRes = res.clone()
          return cloneRes.json()
        })
        .then(res => {
          console.log('lyric data is:', res);
          setLyricLoading(false)
          if (res.result && res.data) {
            const { lyric, tLyric } = res.data
            setLyric(lyric)
            if (tLyric) {
              setTLyric(tLyric)
            }
          }
        })
    }
  }
  const noActions = () => {
    setNoActionsShow(true)
    setTimeout(() => {
      setNoActionsShow(false)
    }, 2000)
  }
  const playListAudioActions = [
    (music: any, active: boolean) => {
      return <span key={'favourite'} onClick={noActions}>收藏</span>
    },
    (music: any) => {
      return <span style={{ margin: '0 8px' }} key={'share'} onClick={noActions}>分享</span>
    },
    (music: any) => {
      return <span key={'download'} onClick={noActions}>下载</span>
    },
  ]
  const actions = [
    (music: any) => {
      return <div style={{ fontSize: 22, marginRight: 8 }} key={'a'} onClick={noActions}>
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
      return <div style={{ fontSize: 22 }} key={'b'} onClick={noActions}>
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
  const detailActionsBottom = [
    (music: any) => {
      return <div className={'detail-bottom-actions-icon'} key={'detail-a'} onClick={noActions}>
        <svg
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
      return <div className={'detail-bottom-actions-icon'} key={'detail-b'} onClick={noActions}>
        <svg
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3936">
          <path
            d="M711.713554 104.804974c-77.222779 0-151.3388 35.948747-199.713554 92.53451-48.374754-56.585763-122.490775-92.53451-199.713554-92.53451-136.915299 0-244.094344 107.180068-244.094344 244.094344 0 167.537737 150.894685 304.453037 379.456265 511.933485l64.352657 58.361199 64.352657-58.361199C804.913213 653.353378 955.808922 516.438079 955.808922 348.900342 955.808922 211.985042 848.628854 104.804974 711.713554 104.804974zM516.660136 795.149848l-4.660136 4.216022-4.660136-4.216022C296.308543 603.64628 156.952658 477.160517 156.952658 348.900342c0-88.539522 66.793242-155.332764 155.332764-155.332764 68.346621 0 134.917806 44.158732 158.217465 104.738459l82.770122 0c23.521716-60.579727 90.092901-104.738459 158.439522-104.738459 88.539522 0 155.332764 66.793242 155.332764 155.332764C867.046319 477.160517 727.690434 603.64628 516.660136 795.149848z"
            p-id="3937"
          ></path>
        </svg>
      </div>
    },
    (music: any) => {
      return <div className={'detail-bottom-actions-icon'} key={'detail-c'} onClick={noActions}>
        <svg
          viewBox="0 0 1265 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="26" height="26"
        >
          <path d="M1025.724758 311.892298A401.369796 401.369796 0 0 0 298.08016 182.41817a310.737906 310.737906 0 0 0 25.894826 621.475813 51.789651 51.789651 0 0 0 0-103.579302 207.158604 207.158604 0 0 1 0-414.317209h16.31374l5.178965-1.553689 4.40212-1.812638 4.661069-2.589483 3.884224-2.330534a27.707463 27.707463 0 0 0 4.143172-3.625276l3.366327-3.107379a20.456912 20.456912 0 0 0 3.107379-3.884223 22.787446 22.787446 0 0 0 3.107379-4.402121l1.294742-1.812638a298.049442 298.049442 0 0 1 557.515593 110.570905v1.55369a6.214758 6.214758 0 0 0 0 2.071586c0 2.589483 0 5.178965 1.812638 7.768448v1.553689a51.789651 51.789651 0 0 0 3.625276 7.768448 51.789651 51.789651 0 0 0 44.021203 25.894825h8.027396a133.876248 133.876248 0 0 1 21.751654-2.589482 142.42154 142.42154 0 0 1 0 284.843081H971.345624a51.789651 51.789651 0 0 0 0 103.579302h38.842239a245.741894 245.741894 0 0 0 15.536895-492.001685z"></path>
          <path d="M781.795501 803.893983l-87.783458 87.783459V519.050902a38.842238 38.842238 0 0 0-77.684477 0v372.367591L528.803056 803.893983a38.842238 38.842238 0 0 0-54.89703 55.155978l153.815263 153.815264a35.734859 35.734859 0 0 0 12.170568 8.027396 41.949617 41.949617 0 0 0 13.983206 2.589482 38.065394 38.065394 0 0 0 14.501103-2.84843 38.842238 38.842238 0 0 0 13.206361-9.063189l153.556315-153.556316A38.842238 38.842238 0 1 0 781.795501 803.893983z"></path>
        </svg>
      </div>
    },
    (music: any) => {
      return <div className={'detail-bottom-actions-icon comment-icon'} key={'detail-d'} onClick={noActions}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M525.473684 1024L296.421053 808.421053H161.684211c-88.926316 0-161.684211-72.757895-161.684211-161.684211V161.684211c0-88.926316 72.757895-161.684211 161.684211-161.684211h700.631578c88.926316 0 161.684211 72.757895 161.684211 161.684211v485.052631c0 88.926316-72.757895 161.684211-161.684211 161.684211h-110.48421l-226.357895 215.578947z m0-110.484211l172.463158-164.378947 24.252632-21.557895H862.315789c45.810526 0 80.842105-35.031579 80.842106-80.842105V161.684211c0-45.810526-35.031579-80.842105-80.842106-80.842106H161.684211C115.873684 80.842105 80.842105 115.873684 80.842105 161.684211v485.052631c0 45.810526 35.031579 80.842105 80.842106 80.842105h167.073684l24.252631 21.557895 172.463158 164.378947z"></path>
          <path d="M269.473684 404.210526m-80.842105 0a80.842105 80.842105 0 1 0 161.68421 0 80.842105 80.842105 0 1 0-161.68421 0Z"></path>
          <path d="M512 404.210526m-80.842105 0a80.842105 80.842105 0 1 0 161.68421 0 80.842105 80.842105 0 1 0-161.68421 0Z"></path>
          <path d="M754.526316 404.210526m-80.842105 0a80.842105 80.842105 0 1 0 161.68421 0 80.842105 80.842105 0 1 0-161.68421 0Z"></path>
        </svg>
      </div>
    },
  ]
  const detailActionTopRight = (music: any) => {
    return <div onClick={noActions}>
      { IconMore }
    </div>
  }
  const playThis = (index: number) => {
    setCurrentAudio(dataExternal[index])
    setPlaying(true)
  }

  const onPlayModeControl = () => {
    switch (currentPlayMode){
      case PlayMode.Order:
        setPlayMode(PlayMode.Random)
        break;
      case PlayMode.Random:
        setPlayMode(PlayMode.Loop)
        break;
      case PlayMode.Loop:
        setPlayMode(PlayMode.Order)
    }
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

  const onClearPlayList = () => {
    const sure = confirm('Are you sure to delete all songs?')
    if (sure) {
      setData([])
    }
  }

  const onPlayListShow = () => {
    setPlayListShow(true)
  }
  const onPlayDetailShow = () => {
    setPlayDetailShow(true)
  }
  const onPlayListHide = () => {
    setPlayListShow(false)
  }
  return <div className={'example'}>
    <div className={'main'}>
      <div className={'tip'} style={ noActionsShow? { display: 'block' } : { display: 'none' }}>
        User-defined action
      </div>
      <div className="logo">
        <img src={logo} alt="logo"/>
        <p>
          A music player component build with react and typescript for mobile and PC
        </p>
        <p>
          <a href="https://github.com/neroneroffy/react-music-player">Documentation</a>
        </p>
      </div>
      <div className={'audio-list'}>
        {
          dataExternal.map((item, index) => {
            return <div
                    key={item.id}
                    className={classnames('audio-item', {
                      'audio-item-active': currentAudio && item.id === currentAudio.id
                    })}
                    onClick={() => playThis(index)}
            >
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
      <div className={'exp-operation'}>
        <div className="control">
          <div className={'title'}>Play control</div>
          <div className={'content'}>
            <button onClick={onTogglePlaying}>
              { playing ? 'Pause' : 'Play' }
            </button>
          </div>
        </div>
        <div className={'control'}>
          <div className={'title'}>Play mode control</div>
          <div className={'content'}>
            <button
              onClick={onPlayModeControl}
              className={'play-mode-control'}
            >
              { currentPlayMode }
            </button>
          </div>
        </div>
        <div className={'control'}>
          <div className={'title'}>Play list control</div>
          <div className={'content'}>
            <button
              onClick={onPlayListShow}
              className={'play-mode-control'}
            >
              Show PlayList
            </button>
          </div>
        </div>
        <div className={'control play-detail-operation'}>
          <div className={'title'}>Play detail control</div>
          <div className={'content'}>
            <button
              onClick={onPlayDetailShow}
              className={'play-detail-control'}
            >
              Show play detail
            </button>
          </div>
        </div>
        <div className={'control'}>
          <div className={'title'}>Volume control</div>
          <div className={'content'}>
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
                  style={{ background: '#33beff' }}
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
        </div>
    </div>
    <div className={'wrapper'}>
      <CoolMusicPlayer
        playListPlaceholder={'No Data'}
        onDelete={onDelete}
        data={data}
        currentAudio={currentAudio}
        play={playing}
        showLyricNormal={true}
        showDetailLyric={true}
        onAudioChange={onAudioChange}
        onVolumeChange={onVolumeChange}
        lyric={lyric}
        tLyric={tLyric}
        lyricLoading={lyricLoading}
        playListAudioActions={playListAudioActions}
        actions={actions}
        volume={volumeValue}
        detailBackground={<div className={'blur-filter'}></div>}
        playListHeader={{
          headerLeft: 'Play List',
          headerRight: <span onClick={onPlayListHide} className={'close-play-list'}>Close</span>
        }}
        onModeChange={(currentMode: PlayModeTypes, prevMode: PlayModeTypes) => {
          console.log('currentMode:', currentMode, 'prevMode:', prevMode)
          setCurrentPlayMode(currentMode)
        }}
        onPlayStatusChange={(currentAudio: IAudio, isPlayed: boolean) => {
          // console.log('currentAudio:', currentAudio, 'isPlayed:', isPlayed)
          setPlaying(isPlayed)
        }}
        showPlayDetail={true}
        showLyricMini={true}
        playListShow={playListShow}
        playDetailShow={playDetailShow}
        onPlayListStatusChange={(status: boolean) => {
          setPlayListShow(status)
        }}
        onPlayDetailStatusChange={(status: boolean) => {
          setPlayDetailShow(status)
        }}
        playMode={playMode}
        detailActionTopRight={detailActionTopRight}
        detailActionsBottom={detailActionsBottom}
      />
    </div>
  </div>
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
