title: 04 ASP.NET MVC
speaker: Deng,hejun
transition: cards
theme: colors
highlightStyle: monokai_sublime
date: 2018年11月1日

[slide data-transition="horizontal3d"]
## 你即将从本文了解到
<hr style="border-color:yellow"/>

* ASP.NET Webform VS ASP.NET MVC  {:&.moveIn}
* ASP.NET MVC
  * Convention over Configuration {:&.moveIn}
  * Route
  * Resource Bundle
  * Controller
  * View
  * View Model
  * Partial View
  * Web.config
  * JS Module
  * RestAPIClient
* ASP.NET MVC DI - Castle
[slide data-transition="horizontal3d"]
## ASP.NET Webform VS ASP.NET MVC

[slide data-transition="horizontal3d"]
## ASP.NET Webform
* <font color=orange>View State</font>: 页面状态管理 {:&.moveIn}
* <font color=orange>Server Side Controls</font>: 很多可用的服务器控件
* <font color=orange>Lot many options for Server Control Events</font>: 很多可用的服务器控件事件
* <font color=orange>Faster Development </font>: 更加快速的开发
* <font color=orange>Page Life Cycle Events</font>: 完整的页面生命周期


[slide data-transition="horizontal3d"]
## ASP.NET MVC
* <font color=orange>Light Weight</font>: 更加的轻量级 {:&.moveIn}
* <font color=orange>Better Control over Design</font>: 给予开发者页面设计更好的控制，使得前端/UX人员可以独立设计好页面
* <font color=orange>Server Performance</font>: 更好的服务器性能，丢掉了大量的服务器控件、事件交互等
* <font color=orange>Better Page Load Time</font>: 更快的页面响应时间，丢掉了ViewState、ServerControls等
* <font color=orange>Loose coupling</font>: 解耦. 没有了类似aspx页面强依赖的后端代码，事件代码，取而代之的是Controller，使得测试成为了可能
* <font color=orange>Separation of Concerns</font>: 关注点分离，M-V-C自我管理
* <font color=orange>SEO friendly URLs</font>: 相比直接访问 xxx.aspx，具有更友好的 route url


[slide data-transition="horizontal3d"]
## Convention over Configuration (约定胜于配置)
* 所有Controller必须在一个Controllers文件目录下。e.g.： Controller\HomeController, Controller\ProposalController {:&.moveIn}
* 所有View包含在Views/{Controller}文件目录下，并且约定Controller中Action的名字为各自缺省View的文件名字。e.g.：Views\Home\Index.cshtml
* Page Url默认由Controller中的Action构成，/{Controller}/{Action}。e.g.: /home/index
* 这些约定都可以通过重写覆盖，但微软不建议你这么做

[slide data-transition="horizontal3d"]
## Route
* 两种定义路由的方式 {:&.moveIn}
* ```
routes.MapRoute(
        name: "Shop",
        url: "Shopping/{action}/{id}",
        defaults: new
        {
            controller = "Shop",
            action = "All",
            id = UrlParameter.Optional
        }
    );
routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new {
                controller = "Home",
                action = "Index",
                id = UrlParameter.Optional }
        );
```

* ```
route('/product/details/{productName}')
```

[slide data-transition="horizontal3d"]
## Resource Bundle
* ASP.NET 提供css、js打包、压缩功能以减少页面加载文件大小和文件数量 {:&.moveIn}
* 打包、压缩后的文件并不真实存在，而是存储在内存中
* css打包原则：注意css打包图片路径问题
* js打包原则：js 在出错后并不会继续执行，所以保证各个功能模块执行不影响其他


[slide data-transition="horizontal3d"]
## Web.config
ASP.NET Web应用程序的配置文件。
* Web应用相关配置 {:&.moveIn}
* 自定义Key-Value配置
* 数据库链接字符串

[slide data-transition="horizontal3d"]
## JS Module

[slide data-transition="horizontal3d"]
```
(function(){
  var sayHello = function(){};
  sayHello();
  }())
```

[slide data-transition="horizontal3d"]
```
(function(globalModule){
  globalModule.sayHello = function(){}
}(globalModule))

globalModule.sayHello();
```

[slide data-transition="horizontal3d"]
```
var module = (function(){
  var send = function(){};
  return {
    sayHello: function(){},
      send: send
  }
  }())

module.sayHello();
```

[slide data-transition="horizontal3d"]
```
var moduleA = (function(module){
  return $.extend(module,
  {
    sayHello: function(){},
        send: send
  })
  }(moduleA || {}))

moduleA.sayHello();
```

[slide data-transition="horizontal3d"]
```
var homeModule = (function(module){
  module.send = function(content){

  }

  ... // more function

  return module;
})(homeModule || {});

homeModule.send('Hello, world!');
```



[slide data-transition="horizontal3d"]
#RestAPIClient
* RestAPIClient<EggshellService>.Client {:&.moveIn}

[slide data-transition="horizontal3d"]
#ASP.NET MVC DI - Castle
* 容器管理，服务注册和依赖注入 {:&.moveIn}
