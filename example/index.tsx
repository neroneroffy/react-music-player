import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import CoolPlayer, { ILyric } from '../src/index'
const { useState } = React
const App = () => {
  const [ data, setData ] = useState([
      {
          src: 'http://neroht.com/%E9%95%9C%E4%BA%88%E6%AD%8C%20-%20%E8%A5%BF%E5%B7%B7%E6%A1%A5%E8%BE%B9.mp3',
          artist: '瑾姝',
          name: '西巷桥边',
          img: 'http://neroht.com/109951164352276322.jpg',
          id: '66575568141',
          lyric: '[00:00.000] 作曲 : 袁雨桐\n[00:00.031] 作词 : 芒果冰沙柠檬水\n[00:00.93]策划：袁雨桐\n[00:02.18]作词：芒果冰沙柠檬水\n[00:05.86]歌手：慕斯の小乖 瑾姝\n[00:06.85]和声编唱：shelly雪菜\n[00:07.94]混音：圣雨轻纱\n[00:08.58]海报：且离不语\n[00:09.28]题字：未海\n[00:09.49]曲绘：含姜\n[00:10.22]PV：阿逗\n[00:11.01]剧情策划：米羔\n[00:11.84]剧情编剧：闵太岁\n[00:12.96]成年王爷：江笙【翼之声】\n[00:13.90]成年女侠：赟珩【翼之声】\n[00:14.81]幼年王爷：上蝎【语翼配音组】\n[00:15.51]幼年女侠：安陌【长安古意】\n[00:16.10]家仆：戾格\n[00:16.67]音效后期：墓墓Musak\n[00:17.30]-镜予歌出品-\n[00:19.25]【慕斯の小乖】\n[00:19.60]满身月华香气\n[00:22.11]妄猜天中事\n[00:24.52]应是白玉盘里折枝\n[00:29.09]绊倒早慧稚子\n[00:31.30]撞散紫色衣襟上寒气\n[00:38.73]应是嫦娥轻掷\n[00:41.38]于热闹市井\n[00:43.75]才幸得此间能与君相识\n[00:48.07]颔首谢侠客义气\n[00:50.96]同行看花灯千里\n[00:56.36]【瑾姝】\n[00:57.23]欲踏遍山河看尽锦绣万里\n[01:02.09]而你是万里清辉中一处景\n[01:06.91]再谈前岁中不更事的闯荡昂首风发意气\n[01:16.36]曾阅过诗书也知江湖侠气\n[01:21.32]笑问长刀出鞘否二三轶事\n[01:26.10]而你胜似茶馆里说书人也道不完的传奇\n[01:35.94]\n[01:54.32]【慕斯の小乖】\n[01:55.31]纵使圆月正明\n[01:58.04]总有言尽时\n[02:00.49]这场年少因缘会际\n[02:05.04]未到凉风起时\n[02:07.38]便带着悬念挥手离去\n[02:14.72]又是一年秋瞑\n[02:17.37]熟悉场景里\n[02:19.74]西巷桥边轻风枯叶交织\n[02:23.90]共花灯泛起涟漪\n[02:26.83]惊动谁人的思绪\n[02:32.28]【瑾姝】\n[02:33.09]说书人故事再添壮志豪情\n[02:38.04]结饰台榭上 陈词又多几笔\n[02:42.89]戏言传闻里你飞檐走壁到底可信不可信\n[02:52.48]再逢时天花盛放烟树历历\n[02:57.21]倒映在唇边弯弯含笑眸子\n[03:01.98]桥下花灯兀自放远了你暂留此间的足迹\n[03:10.73]【合唱】\n[03:11.57]江湖客看了太多月朗星稀\n[03:16.52]颠沛流离间难免见景生情\n[03:21.22]揽尽万千萤火光亮也难及当年月下风景\n[03:30.89]说起这一路崎岖甘之如饴\n[03:35.65]践行后未 复有人能与其奇\n[03:40.33]相对斟满月桂陈酒数杯敬月敬君敬知己\n[03:51.62]\n',
      },
      {
          src: 'http://neroht.com/%E6%AD%A2%E6%88%98%E4%B9%8B%E6%AE%87-piano.mp3',
          artist: '张斗完',
          name: '止战之殇（纯钢琴）',
          img: 'http://neroht.com/jay.jpg',
          id: '66575568441',
      },
      {
          src: 'http://neroht.com/%E7%91%BE%E5%A7%9DHikari%20-%20%E5%A4%A7%E6%B0%BF%E6%AD%8C%EF%BC%88%E6%88%8F%E8%85%94%E7%89%88%EF%BC%89%EF%BC%88Cover%EF%BC%9Ailem%EF%BC%89.mp3',
          artist: '瑾姝Hikari',
          name: '大氿歌',
          img: 'http://neroht.com/daguige.jpg',
          id: '66575568442',
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
  const onDelete = (index: number, id: string) => {
      data.splice(index, 1)
      setData(data)
  }

  const onLyricMatched = (lyrics: ILyric[], currentIndex: number) => {

  }
  return <div className={'wrapper'}>
      <CoolPlayer
          onDelete={onDelete}
          onLyricMatched={onLyricMatched}
          data={data}
          showLyric={true}
      />
  </div>;
}

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)
