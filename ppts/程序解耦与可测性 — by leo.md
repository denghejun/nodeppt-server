title:程序解耦与可测性 — by leo
speaker:Leo Deng
theme:colors
highlightStyle:monokai_sublime
date:2015年12月20日
transition:horizontal3d
circle
earthquake
vkontext
cards
stick
pulse


[slide]
## 你即将从本文了解到
----
程序解耦与可测
* 单元测试的引入 {:&.bounceIn}
* 为什么一些开发人员讨厌写单元测试
* 什么是理想的单元测试
* 组件单元可测性与Moq
* IOC（DI）与Moq
* Autofac与Moq实现的单元测试
  * 我们要实现什么功能
  * 我们如何设计这个系统
  * 我们如何测试这个系统

[slide]
## 单元测试的引入
----
工程师们对产品质量的不稳定性的一次深刻反思
* TDD（测试驱动开发）将单元测试放到了一项工程的第一位 {:&.zoomIn}
* 既然产品质量、代码质量如此重要，与其反反复复的产生bug、回归测试、修改bug，不如一开始我们就动手测试它
* 当然，这次，我可不是要谈怎么做TDD。本文是想给那些有想着手做单元测试的开发者们却又没有好方案的一个指引

[slide]
## 为什么一些开发人员讨厌写单元测试
----
大概是没有找到编写真正单元测试的方法

* 原生单元测试所用的数据往往令人头疼 {:&.bounceIn}
* 被测逻辑组件没什么复杂逻辑，逻辑都在SQL里，数据不能反复测试,测了也白测，说不定某天就失败了
* 单元测试依赖一些其他配置信息，难以统一维护
* 数据或配置发生了变化，单元测试某一天大面积失败，一个个排查原因很烦
* 确实挺令人头疼的，我可不想为了单元测试而写这样的单元测试，因为我知道，那都是“骗人的”。

[slide]
## 什么是理想的单元测试
----
我觉得它是这样的
* 被测组件单元所依赖的其它组件提供的功能不能包含在内，因为那是其他组件单元要测试的部分 {:&.moveIn}
* 被测组件单元依赖的其他组件默认是正确返回的或模拟它的异常情况，测试被测组件处理异常的逻辑
* 被测组件单元所用到的所有数据不得依赖真实的文件/DB/远端调用（如API,WCF），有2个主要原因:
  * 文件/DB/远端调用都是一些IO/网络的访问，这些极有可能导致我们的单元测试失败，而它并不是真的逻辑错误；
  * 严重依赖DB/文件的数据往往就是dev/prd的数据，单元测试不应该去操作这些数据，它极有可能是非常严谨的且时时变化的

[slide]
## 组件单元可测性与Moq
----
单元测试最佳助手Moq
* Moq就是单元测试最佳助手，它是完全开源的，可到github上搜索。 {:&.bounceIn}
* 所谓的Mock，就是要模仿一些被测组件所依赖的组件的行为，来测试被测组件在各种工况下是否正常工作。所以，并不是常人所说的那样，仅仅mock数据而已，反而，我觉得最重要的却是行为。

* 要想写出可测试的组件单元，有很多种途径，但最佳实践方式我觉得还是“面向接口编程”，这也是Moq所推荐的做法。
* Moq之于.NET,只支持mock那些vitual/abstract的部件，而Interface是天生具备的这些特性的，所以面向接口编程是将你的程序变为可测、易测的第一步。

[slide]
## IOC（DI）与Moq
----
这两者本质上并没有任何关系，它们的方向点甚至都是不同的
* 一个用以探寻组件间低耦合依赖的最佳实践，另一个用来探寻单元测试的完美之道 {:&.bounceIn}
* 他们有一个共同的概念在里面：“Dependency”
* IOC所谓的依赖大多数是接口形式的依赖，Moq是模拟被测组件所需要的各种依赖
* 那么能结合IOC和Moq，在单元测试的时候，让IOC容器来自动管理被测组件所需要的依赖么？
* 这个想法已被另一个开源的IOC组件Autofac捆绑实现。可见多往深处想想，信息量往往很大

* Autofac不要仅仅用来做与单元测试的东西,那不是它真正的本领。看本文所要聊的其实就是用Autofac+Moq来做一个组件间低耦合、可测试的应用程序。前者用来解决低耦合，后者用来解决单元测试编写与执行。

[slide data-transition="stick"]
## Autofac与Moq实现单元测试是一种怎样的体验
----
理论是实践的重中之重
* 如果你是直接跳到这一小节的，我觉得你可能太着急了，因为理论是实践的重中之重，或许你应该看看前面的内容 {:&.moveIn}
* 我们需要的Package有：[Autofac, Autofac.Configuration, Autofac.Extras.Moq, Moq]

[slide data-transition="stick"]
## 我们要实现什么功能
----
一个奇怪的计算逻辑
* 一个很小的demo，很简单，我有一个console app，需要执行一个功能：将2个整形数字的和乘以该2个数字的差，将结果以通知的形式打印到控制台。即：Print((a+b)*(a-b)). {:&.bounceIn}

[slide]
## 我们如何设计这个系统
----
组件依赖图例
* ![](/assets/image/sys-design.png)  {:&.bounceIn}
* Client依赖的AppDependentServices组件里只包含了2个Interface，表示Client的服务依赖
* CalculateServiceProvider，NotifyServiceProvider是服务依赖组件的2个提供方组件
* 所有组件都是不同的程序集，client并未直接强依赖ServiceProvider，就是简单的面向接口

[slide]
## Biz
业务逻辑等价于被测单元
* ![](/assets/image/console-core.png) ![](/assets/image/main.png) {:&.bounceIn}
* Core.CalculateComplex利用依赖的外部服务实现了一个复杂的操作
* 用"计算服务"完成了2个整形之和与只差的乘积
* 用"通知服务"将计算结果以特定的format对外发布了消息
* 在client端创建一个基于配置文件的IOC容器，并在有限的Scope（资源管理）中，从容器中取得我想要的Core服务进行该操作的调用

[slide data-transition="earthquake"]
## 我们如何测试这个系统
为了避免本文是TDD相关的嫌疑，我将单元测试放在了最后
* 你完全可以在系统设计完成后就立即着手单元测试 {:&.bounceIn}
* 结合Autofac + Moq，测试该业务功能的代码看起来是下面这样的（注释）
* ![](/assets/image/test-code.png)

[slide data-transition="earthquake"]
## 保持你的单元测试自动化与可读
----
**<font color='yellow'>这是下一次的分享</font>**
* NET原生的单元测试 {:&.zoomIn}
* 从门缝中塞出的测试报告
* Cake 与 单元测试
* 单元测试与报表


* .<div> {:&.zoomIn}
 <img src="/assets/image/cake-code-sample.png" width="200" height="200" hspace="0" vspace="0">
 <img src="/assets/image/cake-tasks.png" width="200" height="200" hspace="0" vspace="0">
 <img src="/assets/image/nunit-test-runner.png" width="200" height="200" hspace="0" vspace="0">
 <img src="/assets/image/report-all.png" width="200" height="200" hspace="0" vspace="0">
</div>