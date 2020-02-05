const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, '../example/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader'
          },
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.less$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' },
        ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(jpg|png|gif|jpeg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'images/[name].[hash:8].[ext]'
      }
    }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
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
            data: '[00:00.000] 作曲 : 袁雨桐\n[00:00.031] 作词 : 芒果冰沙柠檬水\n[00:00.93]策划：袁雨桐\n[00:02.18]作词：芒果冰沙柠檬水\n[00:05.86]歌手：慕斯の小乖 瑾姝\n[00:06.85]和声编唱：shelly雪菜\n[00:07.94]混音：圣雨轻纱\n[00:08.58]海报：且离不语\n[00:09.28]题字：未海\n[00:09.49]曲绘：含姜\n[00:10.22]PV：阿逗\n[00:11.01]剧情策划：米羔\n[00:11.84]剧情编剧：闵太岁\n[00:12.96]成年王爷：江笙【翼之声】\n[00:13.90]成年女侠：赟珩【翼之声】\n[00:14.81]幼年王爷：上蝎【语翼配音组】\n[00:15.51]幼年女侠：安陌【长安古意】\n[00:16.10]家仆：戾格\n[00:16.67]音效后期：墓墓Musak\n[00:17.30]-镜予歌出品-\n[00:19.25]【慕斯の小乖】\n[00:19.60]满身月华香气\n[00:22.11]妄猜天中事\n[00:24.52]应是白玉盘里折枝\n[00:29.09]绊倒早慧稚子\n[00:31.30]撞散紫色衣襟上寒气\n[00:38.73]应是嫦娥轻掷\n[00:41.38]于热闹市井\n[00:43.75]才幸得此间能与君相识\n[00:48.07]颔首谢侠客义气\n[00:50.96]同行看花灯千里\n[00:56.36]【瑾姝】\n[00:57.23]欲踏遍山河看尽锦绣万里\n[01:02.09]而你是万里清辉中一处景\n[01:06.91]再谈前岁中不更事的闯荡昂首风发意气\n[01:16.36]曾阅过诗书也知江湖侠气\n[01:21.32]笑问长刀出鞘否二三轶事\n[01:26.10]而你胜似茶馆里说书人也道不完的传奇\n[01:35.94]\n[01:54.32]【慕斯の小乖】\n[01:55.31]纵使圆月正明\n[01:58.04]总有言尽时\n[02:00.49]这场年少因缘会际\n[02:05.04]未到凉风起时\n[02:07.38]便带着悬念挥手离去\n[02:14.72]又是一年秋瞑\n[02:17.37]熟悉场景里\n[02:19.74]西巷桥边轻风枯叶交织\n[02:23.90]共花灯泛起涟漪\n[02:26.83]惊动谁人的思绪\n[02:32.28]【瑾姝】\n[02:33.09]说书人故事再添壮志豪情\n[02:38.04]结饰台榭上 陈词又多几笔\n[02:42.89]戏言传闻里你飞檐走壁到底可信不可信\n[02:52.48]再逢时天花盛放烟树历历\n[02:57.21]倒映在唇边弯弯含笑眸子\n[03:01.98]桥下花灯兀自放远了你暂留此间的足迹\n[03:10.73]【合唱】\n[03:11.57]江湖客看了太多月朗星稀\n[03:16.52]颠沛流离间难免见景生情\n[03:21.22]揽尽万千萤火光亮也难及当年月下风景\n[03:30.89]说起这一路崎岖甘之如饴\n[03:35.65]践行后未 复有人能与其奇\n[03:40.33]相对斟满月桂陈酒数杯敬月敬君敬知己\n[03:51.62]\n',
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
