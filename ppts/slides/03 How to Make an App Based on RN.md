title: 03 How Do I Make an App Based on RN
speaker: Deng,hejun
transition: cards
files: /css/theme.css
highlightStyle: monokai_sublime
date: 2017年4月5日

[slide data-transition="horizontal3d"]
## 你即将从本文了解到
<hr style="border-color:yellow"/>

* About React & React Native {:&.moveIn}
* Flux and Redux
* Container Components Pattern
* Dynamic Update
* [Five Films] App

[slide data-transition="horizontal3d"]
## About React & React Native

[slide data-transition="horizontal3d"]
## React & React Native
一种View层新的实现方式，与传统的实现风格有很大差异
<hr style="border-color: white"/>
<br/>
<br/>

* <font style="color:yellow">Declarative View：基于状态管理的声明式视图</font> {:&.moveIn}
* <font style="color:yellow">Component-Based：基于组件的视图管理</font>
* <font style="color:yellow">Learn Once, Write Anywhere：React Native 就是基于React 在移动端的实现</font>

[slide data-transition="horizontal3d"]
## Flux and Redux

[slide data-transition="horizontal3d"]
## Flux
一种开发模式，并不是开发框架。

<img src="/images/flux-data-flow.png" height="200" width="100%" />


<br/>
<br/>

* <font style="color:yellow">dispatcher：应用中唯一的传递数据和行为的方式</font> {:&.moveIn}
* <font style="color:yellow">stores：托管整个应用的数据中心</font>
* <font style="color:yellow">views (React components)：组件视图</font>


[slide data-transition="horizontal3d"]
## Redux
<img src="/images/flux.png" height="200" width="45%" />
<img src="/images/redux.jpg" height="200" width="45%" />


* [Redux](http://redux.js.org/)是[Flux](http://facebook.github.io/flux/docs/in-depth-overview.html#content)架构风格的进一步实现。它是一个基于JavaScript的 state container。所以Redux 非常适用来托管 React Component 的状态，而不是让 State Initialize、State Update充斥 在应用程序的每个角落。这就是Flux风格，一个好的状态管理容器不仅能让你的 codebase 更加的清爽，更重要的是让 state 时时可见、随时还原成为了可能。 {:&.moveIn}

[slide data-transition="horizontal3d"]
## Redux Tools
为了使用更好的编程模式<br/>你最好需要一起使用Redux的配套基础设施<br/>它能让你的代码看起来更符合预期
<hr style="border-color: Silver"/>

* [<font style="color:rgb(83, 230, 31)">react-redux</font>](https://github.com/reactjs/react-redux) {:&.bounceIn}
* [<font style="color:yellow">redux-actions</font>](https://github.com/acdlite/redux-actions)
* [<font style="color:orange">redux-thunk</font>](https://github.com/gaearon/redux-thunk)
* [<font style="color:white">redux-logger</font>](https://github.com/evgenyrodionov/redux-logger)

[slide data-transition="horizontal3d"]
## Container Components Pattern

[slide data-transition="horizontal3d"]
## A New Pattern
基于React而诞生的一种新的设计模式
<br/>也算是对Flux架构风格的一种实现
<br/>因为它同时也阐述了单向数据流
<hr style="border-color:Silver"/>
* <font style="color:yellow">Container用来管理应用的业务逻辑</font> {:&.bounceIn}
* <font style="color:yellow">视图(View)部分只用来无业务逻辑的渲染</font>

[slide data-transition="horizontal3d"]
## Comment List
* 试用一个简单的idea来阐述这个事实：有一个React Component叫CommentList，一旦它Load完成，它就渲染出所有 comment 的 user 和 content {:&.bounceIn}
* ```
class CommentList extends React.Component {
  this.state = { comments: [] };

  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }

  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}
```

[slide data-transition="horizontal3d"]
## What's the Turth
* 实际上，你的 Component 负责了以下两件事情(将来或许更多)

  * <font color=yellow>负责从后端API拉取 Comments 的数据</font>
  * <font color=yellow>负责将它以一定的形式渲染到UI</font>

  <hr/><br/>



* 首先，这并没有什么错误 {:&.bounceIn}
* 但忽略了 React 的一些特性：Reusability (可重用性)
* 既然我们推崇职责单一原则，那么显然，以上风格的确是存在设计上的缺陷, 但并不是错误
* 我们就要尝试将正确的事物放到正确的位置，让它们以更好的方式进行链接、协同工作。




[slide data-transition="horizontal3d"]
## Container Component
```
class CommentListContainer extends React.Component {
  state = { comments: [] };
  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```
<hr style="border-color:black"/>
```
class CommentList extends React.Component {
  render() {
    return (
    <ul>
    {this.props.comments.map(c => (
      <li>{c.body}—{c.author}</li>
    ))}
    </ul>
    )
  }
}
```

[slide data-transition="horizontal3d"]
## Dynamic Update

[slide data-transition="horizontal3d"]
## How It Works

* 对于 React Native 开发的 App 来讲，其内容包含两个方面 {:&.moveIn}
  * <font color=yellow>JavaScript 脚本</font>  {:&.moveIn}
  * <font color=yellow>图片、音乐、视频等静态资源</font>
* Packager 通过App入口文件(index.ios.js)，将所有的脚本文件、静态资源打包成一个 bundle
* 将Bundle包托管到任意的server上
* 设定一个更新策略，例如App启动时检测bundle版本


[slide data-transition="horizontal3d"]
## Code Push
Microsoft 在 git hub 上托管的一个开源项目<br/>
专注于处理 App 动态更新，对 React Native 有很好的支持<br/>
<hr/>
```
{
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: 'Release Note: ',
        mandatoryContinueButtonLabel: '好',
        title.: '更新',
        optionalUpdateMessage: '发现可用更新，是否立即更新？\r\n',
        mandatoryUpdateMessage: '发现可用更新，建议立即更新。\r\n',
        optionalIgnoreButtonLabel: '不了，谢谢',
        optionalInstallButtonLabel: '安装更新'
      },
      installMode: codePush.InstallMode.IMMEDIATE
    }
```

[slide data-transition="horizontal3d"]
## App Enviroment


* App 的生存环境有三种 {:&.bounceIn}
  * <font color=yellow>Dev</font> {:&.bounceIn}
  * <font color=yellow>Staging</font>
  * <font color=yellow>Production</font>
* 它们分别从以下三个位置下载bundle文件 {:&.bounceIn}
  * <font color=yellow>一般是指定的本地端口获取 bundle 包</font> {:&.bounceIn}
  * <font color=yellow>从code push server 获取对应 App 的 Staging 环境的 bundle 包</font>
  * <font color=yellow>从code push server 获取对应 App 的 Production 环境的 bundle 包</font>


[slide data-transition="horizontal3d"]
## Release to Staging
* 我已经在code push托管了一个名叫 FilmNight 的 IOS App，每当我修改了本地的任何文件，我会执行以下命令先将其 release 到 Staging 环境 {:&.bounceIn}
```
code-push release-react FilmNight ios  --description "release to Staging env first."
```
* 接下来通过以下命令检查更新是否已经成功上传到 code push server
```
code-push deployment ls FilmNight
```
<img src="/images/ls.png" height="300" width="100%" />


[slide data-transition="horizontal3d"]
## Release to Production
* 当你在 Staging 测试通过后，可以通过以下命令，将这个 Staging 的版本 Promote (提升) 到 Production： {:&.bounceIn}
```
code-push promote FilmNight Staging Production
```
* 用上一步骤中所用到的相同命令 check production 的版本是否已经提升。
<img src="/images/pr.png" height="300" width="100%" />

[slide data-transition="horizontal3d"]
## Check Install Status
* 在 code push server 端也会记录 Install 的次数： {:&.bounceIn}
<img src="/images/pi.png" height="300" width="100%" />

[slide data-transition="horizontal3d"]
## Five Films

<video width="80%" controls style="background-color:black">
  <source tyle="{border: 10px solid red}"  src="/images/app.mp4" type="video/mp4">
您的浏览器不支持 video 标签。
</video>
<hr style="border-color: white"/>
 <video width="80%" controls style="background-color:black">
  <source tyle="{border: 10px solid red}"  src="/images/update-ios.mp4" type="video/mp4">
您的浏览器不支持 video 标签。
</video>

[slide data-transition="horizontal3d"]
## Components & Tech
<img src="/images/ts.png" height="150" width="50%" />
<hr style="border-color: white"/>
<br/>

* [<font style="color:rgb(83, 230, 31)">Five-Films</font>](https://github.com/denghejun/react-native-modular-bootstrapper) {:&.bounceIn}
* [<font style="color:rgb(231, 251, 1)">Five-Films-Interface</font>](https://github.com/denghejun/react-native-modular-bootstrapper)
* [<font style="color:rgb(238, 83, 149)">Five-Films-Service</font>](https://github.com/denghejun/react-native-modular-bootstrapper)
* [<font style="color:rgb(7, 244, 236)">React-Native-Modular-Bootstrapper</font>](https://github.com/denghejun/react-native-modular-bootstrapper)


[slide data-transition="horizontal3d"]
## react-native-modular-bootstrapper
One useful modular development framework depends on Ioc, Expo and TypeScript for react native. {:&.moveIn}
<hr style="border-color: white"/>
<br/>

<img src="https://raw.githubusercontent.com/denghejun/react-native-modular-bootstrapper/master/src/image/logo3.png" height="200" width="50%" />

[<font style="color:rgb(83, 230, 31)">react-native-modular-bootstrapper</font>](https://github.com/denghejun/react-native-modular-bootstrapper) {:&.bounceIn}

[React Native Modular Bootstrapper](https://github.com/denghejun/react-native-modular-bootstrapper.git) &middot;[![npm version](https://badge.fury.io/js/react-native-modular-bootstrapper.svg)](https://badge.fury.io/js/react-native-modular-bootstrapper) &middot;

[![NPM](https://nodei.co/npm/react-native-modular-bootstrapper.png?downloads=true&downloadRank=true)](https://nodei.co/npm/react-native-modular-bootstrapper/)



[slide data-transition="horizontal3d"]
## Thanks
