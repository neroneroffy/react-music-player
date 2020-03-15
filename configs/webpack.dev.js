const path = require('path')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    before(app, server){
      app.get('/api/lyric/:id', function (req, res) {
        let result = {
          result: true,
          data: null
        }
        if (req.params.id === '66575568141') {
          result = {
            result: true,
            data: {
              lyric: '[00:00.000] 作曲 : 袁雨桐\n[00:00.031] 作词 : 芒果冰沙柠檬水\n[00:00.93]策划：袁雨桐\n[00:02.18]作词：芒果冰沙柠檬水\n[00:05.86]歌手：慕斯の小乖 瑾姝\n[00:06.85]和声编唱：shelly雪菜\n[00:07.94]混音：圣雨轻纱\n[00:08.58]海报：且离不语\n[00:09.28]题字：未海\n[00:09.49]曲绘：含姜\n[00:10.22]PV：阿逗\n[00:11.01]剧情策划：米羔\n[00:11.84]剧情编剧：闵太岁\n[00:12.96]成年王爷：江笙【翼之声】\n[00:13.90]成年女侠：赟珩【翼之声】\n[00:14.81]幼年王爷：上蝎【语翼配音组】\n[00:15.51]幼年女侠：安陌【长安古意】\n[00:16.10]家仆：戾格\n[00:16.67]音效后期：墓墓Musak\n[00:17.30]-镜予歌出品-\n[00:19.25]【慕斯の小乖】\n[00:19.60]满身月华香气\n[00:22.11]妄猜天中事\n[00:24.52]应是白玉盘里折枝\n[00:29.09]绊倒早慧稚子\n[00:31.30]撞散紫色衣襟上寒气\n[00:38.73]应是嫦娥轻掷\n[00:41.38]于热闹市井\n[00:43.75]才幸得此间能与君相识\n[00:48.07]颔首谢侠客义气\n[00:50.96]同行看花灯千里\n[00:56.36]【瑾姝】\n[00:57.23]欲踏遍山河看尽锦绣万里\n[01:02.09]而你是万里清辉中一处景\n[01:06.91]再谈前岁中不更事的闯荡昂首风发意气\n[01:16.36]曾阅过诗书也知江湖侠气\n[01:21.32]笑问长刀出鞘否二三轶事\n[01:26.10]而你胜似茶馆里说书人也道不完的传奇\n[01:35.94]\n[01:54.32]【慕斯の小乖】\n[01:55.31]纵使圆月正明\n[01:58.04]总有言尽时\n[02:00.49]这场年少因缘会际\n[02:05.04]未到凉风起时\n[02:07.38]便带着悬念挥手离去\n[02:14.72]又是一年秋瞑\n[02:17.37]熟悉场景里\n[02:19.74]西巷桥边轻风枯叶交织\n[02:23.90]共花灯泛起涟漪\n[02:26.83]惊动谁人的思绪\n[02:32.28]【瑾姝】\n[02:33.09]说书人故事再添壮志豪情\n[02:38.04]结饰台榭上 陈词又多几笔\n[02:42.89]戏言传闻里你飞檐走壁到底可信不可信\n[02:52.48]再逢时天花盛放烟树历历\n[02:57.21]倒映在唇边弯弯含笑眸子\n[03:01.98]桥下花灯兀自放远了你暂留此间的足迹\n[03:10.73]【合唱】\n[03:11.57]江湖客看了太多月朗星稀\n[03:16.52]颠沛流离间难免见景生情\n[03:21.22]揽尽万千萤火光亮也难及当年月下风景\n[03:30.89]说起这一路崎岖甘之如饴\n[03:35.65]践行后未 复有人能与其奇\n[03:40.33]相对斟满月桂陈酒数杯敬月敬君敬知己\n[03:51.62]\n',
            }}
        }
        if (req.params.id === '66575568425354321') {
          result = {
            result: true,
            data: {
              lyric: "[00:00.425] 作词:Mika\n[00:00.850] 作曲:Mika\n[00:00.860]What's the big idea\n[00:03.230]Yo, Mika\n[00:10.680]I said sucking to hard on your lollipop\n[00:13.530]Oh, loves gonna get you down\n[00:15.550]I said sucking to hard on your lollipop\n[00:18.220]Oh, loves gonna get you down\n[00:20.880]Sucking to hard on your lollipop\n[00:23.600]Loves gonna get you down\n[00:25.860]Sucking to hard on your lollipop\n[00:28.490]Loves gonna get you down\n[00:30.560]Say love, say love\n[00:33.500]Loves gonna get you down\n[00:35.590]Say love, say love\n[00:38.100]Loves gonna get you down\n[00:40.370]I went walking with my momma one day\n[00:42.890]When she warn me what people say\n[00:45.360]Live your life until love is found\n[00:48.100]'Cos loves gonna get you down\n[00:50.370]Take a look at the girl next door\n[00:52.880]She's a player and a downright bore\n[00:55.370]She's a slowzer, she wants more\n[00:58.600]Oh,bad girls get you down\n[01:00.370]Sing it\n[01:00.950]Sucking to hard on your lollipop\n[01:03.570]Oh, loves gonna get you down\n[01:05.850]Sucking to hard on your lollipop\n[01:08.500]Oh, loves gonna get you down\n[01:10.590]Say love, say love\n[01:13.170]Oh, loves gonna get you down\n[01:15.550]Say love, say love\n[01:18.130]Oh, loves gonna get you down\n[01:20.420]Mama told me what I should know\n[01:22.830]Too much candy gonna rot your soul\n[01:25.289]If she loves you let her go\n[01:28.190]'Cos love only gets you down\n[01:30.380]Take a look at a boy like me\n[01:32.680]Never stood on my own two feet\n[01:35.360]now I'm blue, as I can be\n[01:37.870]Oh, love only got me down\n[01:40.320]Sing it\n[01:41.390]Sucking to hard on your lollipop\n[01:43.600]Oh, loves gonna get you down\n[01:45.830]Sucking to hard on your lollipop\n[01:48.500]Oh, loves gonna get you down\n[01:50.550]Say love, say love\n[01:53.600]Oh loves gonna get you down\n[01:55.570]Say love, say love\n[01:58.190]Oh loves gonna get you down\n[02:00.610]I was walking with my momma one day\n[02:02.900]When she told me what people say\n[02:05.320]Live your life until love is found\n[02:08.110]Or loves gonna get you down\n[02:10.240]Sing it\n[02:11.120]Sucking to hard on your lollipop\n[02:13.460]Loves gonna get you down\n[02:15.720]Sucking to hard on your lollipop\n[02:18.430]Oh, loves gonna get you down\n[02:20.610]Say love, say love\n[02:23.160]Oh, loves gonna get you down\n[02:25.650]Say love, say love\n[02:28.130]Oh, loves gonna get you down\n[02:30.300]Mama told me what I should know\n[02:32.810]Too much cand gonna rot your soul\n[02:35.320]If she loves you let her go\n[02:38.230]'Cos love only gets you down\n[02:41.200]\n[02:49.740]\n[02:50.920]Sucking to hard on your lollipop\n[02:53.430]loves gonna get you down\n[02:55.680]Sucking to hard on your lollipop\n[02:58.410]loves gonna get you down\n[03:01.270]\n",
              tLyric: '[by:人间好时节]\n[00:00.860]嘿,有什么大不了的！\n[00:03.230]呦 MIKA\n[00:10.680]我说， 用力吃你的棒棒糖，爱情只会让你失望\n[00:13.530]爱情只会让你失望\n[00:15.550]我说， 用力吃你的棒棒糖\n[00:18.220]爱情只会让你失望\n[00:20.880]用力吃你的棒棒糖\n[00:23.600]爱情只会让你失望\n[00:25.860]用力吃你的棒棒糖\n[00:28.490]爱情只会让你失望\n[00:30.560]说爱,说爱\n[00:33.500]爱情会让你失望\n[00:35.590]说爱,说爱\n[00:38.100]爱情会让你失望\n[00:40.370]有一天，我和妈妈一起散步\n[00:42.890]她提醒我 人们说的那些话\n[00:45.360]漫漫度过你的人生直到发现真爱\n[00:48.100]因为爱情会让你失望\n[00:50.370]看看隔壁的那个女孩\n[00:52.880]她是个爱玩游戏的风流女人\n[00:55.370]她放慢了脚步,她想要更多\n[00:58.600]哦,坏女孩会让你失望\n[01:00.370]唱吧\n[01:00.950]用力吃你的棒棒糖\n[01:03.570]爱情只会让你失望\n[01:05.850]用力吃你的棒棒糖\n[01:08.500]爱情只会让你失望\n[01:10.590]说爱,说爱\n[01:13.170]爱情只会让你失望\n[01:15.550]说爱,说爱\n[01:18.130]爱情只会让你失望\n[01:20.420]妈妈告诉我一些生活的道理\n[01:22.830]太多的糖果会驱使我的灵魂\n[01:25.289]如果她爱你，就让她尽情的释放\n[01:28.190]因为爱情只会让你失望\n[01:30.380]看着那个象我的男孩\n[01:32.680]从来没有独立的前行\n[01:35.360]现在我很忧郁,因为我可以\n[01:37.870]哦,爱情不会让我失望\n[01:40.320]唱吧\n[01:41.390]用力吃你的棒棒糖\n[01:43.600]爱情只会让你失望\n[01:45.830]用力吃你的棒棒糖\n[01:48.500]爱情只会让你失望\n[01:50.550]说爱,说爱\n[01:53.600]爱情只会让你失望\n[01:55.570]说爱,说爱\n[01:58.190]爱情只会让你失望\n[02:00.610]有一天,我和妈妈一起散步\n[02:02.900]当她提醒我 人们说的那些话的时候\n[02:05.320]漫漫度过你的人生直到发现真爱\n[02:08.110]爱情只会让你失望\n[02:10.240]唱吧\n[02:11.120]用力吃你的棒棒糖\n[02:13.460]爱情只会让你失望\n[02:15.720]用力吃你的棒棒糖\n[02:18.430]爱情只会让你失望\n[02:20.610]说爱,说爱\n[02:23.160]爱情只会让你失望\n[02:25.650]说爱,说爱\n[02:28.130]爱情只会让你失望\n[02:30.300]妈妈告诉我一些生活的道理\n[02:32.810]太多的糖果会驱使我的灵魂\n[02:35.320]如果她爱你,就让她尽情的释放\n[02:38.230]爱情只会让你失望\n[02:50.920]用力吃你的棒棒糖\n[02:53.430]爱情只会让你失望\n[02:55.680]用力吃你的棒棒糖\n[02:58.410]爱情只会让你失望\n',

            }
          }
        }
        setTimeout(() => {
          res.send(result)
        }, 2000)
      })
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: path.join(__dirname, '../dist/index.html'),
      template: path.join(__dirname, '../example/index.html'),
      title: 'music'
    })
  ]
}
module.exports = merge(baseConfig, devConfig)
