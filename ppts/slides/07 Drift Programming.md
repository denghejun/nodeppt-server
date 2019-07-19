title: 07 Drift Programming
speaker: Deng,HeJun
transition: cards
files: /css/theme.css
highlightStyle: monokai_sublime
date: 2019年7月12日

[slide data-transition="horizontal3d"]
<img class="full-img" src="/images/car3.jpg"/>
## Drift Programming <br/>(漂移编程/华丽编程的甩尾效应)
-----
ThoughtWorks - Deng,Hejun
<hr class="main-hr" />
* Service Circles (服务环绕) {:&.moveIn}
* Architecture Constraints (架构制约)
* Abstract Oriented (面向抽象)
* Drift Programming (漂移编程) 



[slide data-transition="horizontal"]
-----
“昨天晚上我输给一辆AE86，他用惯性过弯，他的速度很快，我只看到他的车有一个豆腐店的招牌， 
请问你知道他是谁吗? ”<span style="float:right;margin-top:50px"> ——《Initial D》</span>

[slide data-transition="horizontal3d"]
-----
* Drift 是 一种“华丽”的快速过弯的驾驶技术 {:&.moveIn}
* 肖邦的演奏技巧精湛、音响华丽，被誉为“花丛中的大炮”
* Drift Programming 不是捷径，是编程范畴的华丽技术

[slide data-transition="horizontal"]
## Service Circles (服务环绕)
-----
<hr class="main-hr" />
<span class="desc">A set of service points for biz target.</span>
[slide data-transition="horizontal3d"]
* Layer {:&.moveIn}
* Circle
* Circle vs Layer



[slide data-transition="horizontal3d"]
## Layer
-----
<span class="desc">~“层”的概念也已有很多年了，它解决了代码归属问题~</span>
[slide data-transition="horizontal3d"]
-----
* 层的宽阔程度容易让开发人员在核心问题上处于迷失状态 {:&.moveIn}
* 层的概念可以轻易套用到任何问题，没有向心力
* 开发人员在为应该把这部分编码放在那一层的问题上浪费时间



[slide data-transition="horizontal3d"]
## Circle
-----
<span class="desc">~顾名思义，我们就是要构建在核心问题之外的“环绕功能”~</span>
<img src="/images/sc.png"/>
[slide data-transition="horizontal3d"]
-----
* 所有的功能像是围绕着问题域创建了一层一层的“环” {:&.moveIn}
* 环状结构能让组件享有不同的层级的功能，称之为“服务环绕”

[slide data-transition="horizontal3d"]
-----
* 环是无数服务对象(ServicePoint)的聚集的表现 {:&.moveIn}
* 环上出现的只能是服务对象
* 是对服务进行分级设定，是迭代构建强大系统的良好方案

[slide data-transition="horizontal3d"]
-----


[slide data-transition="horizontal3d"]
## Circle vs Layer
-----
<span class="desc">~物理形状上的差异会影响设计者的程序设计~</span>
[slide data-transition="horizontal3d"]
-----
* Service Circle的设计是对服务的专注实现 {:&.moveIn}
* 层与层之间的交互是标准统一的，可以说是“无趣的“
* Circle的向心力更加的强、目标更加的明确
* Layer则更加的扁平、宽阔
* Circle更适合目标性较强的编程实现
* Layer更适合实现企业级的宽泛实现


[slide data-transition="horizontal"]
## Architecture Constraints (架构制约)
-----
<hr class="main-hr" />
<span class="desc">～一直在思考代码是怎么坏掉的～</span>
[slide data-transition="horizontal3d"]
-----
* 某些IDE工具提供完成了对这片代码的重构的绝对错觉 {:&.moveIn}
* 优秀的代 码都是纯手工打造的，而不是利用IDE的把戏
* 越简单的代码就越强壮“，”简单的代码就是美" ？
* No one question was fixed by one single if statement
* 实现一个业务架构制约并在其约束下稳定演进是必要的


[slide data-transition="horizontal3d"]
-----
我在之前有实现一个文字命令输入处理的逻辑问题，最终呈现的制约效果是这样的...
[slide data-transition="horizontal3d"]
-----
<pre>
<code>
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("glob is I").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("prok is V").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("pish is X").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("tegj is L").Command.Execute();
DirectiveProxy&lt;UnitPriceCommandDirective&gt;.Create("glob glob Silver is 34 Credits").Command.Execute();
var response = DirectiveProxy&lt;HowManyCommandDirective&gt;.Create("how many Credits is glob 
prok Silver ?").Command.Execute();
Assert.That(response?.ToString(), Is.EqualTo("glob prok Silver is 68 Credits"));
</code>
</pre>

[slide data-transition="horizontal3d"]
-----
* 无论将来业务上的需求如何进化架构制约着开发者不能胡来 {:&.moveIn}
* 同时架构的重要目的还是提供给后续开发者良好的编程体验


[slide data-transition="horizontal"]
## Abstract Oriented (面向抽象)
-----
<hr class="main-hr" />
<span class="desc">～不要给任何人重构你代码的机会，因为从一开始你就应该知道你要做良好的抽象～</span>
[slide data-transition="horizontal3d"]
* 大多编程人员早已固化思维 {:&.moveIn}
* 只是解决了”这个“问题而不是“这类”问题
* 一旦你具象了问题，你就失去了对领域的绝对控制
* 面向抽象不再是 Shape、Circle、Square 
* 抽象的本质是因为变化
* 同样的事物会在某一时刻某一条件下会产生不一样的效应
* 过度设计其实是不存在的，编写者考虑到的变化你却不屑一顾




[slide data-transition="horizontal"]
## Drift Programming
-----
<hr class="main-hr" />
<span class="desc">～Drift Programming? For what?～</span>
[slide data-transition="horizontal3d"]
* Drift Programming Core {:&.moveIn}
  * Service Circles(服务环绕) {:&.moveIn}
  * Architecture Constraints(架构制约)
  * Abstract Oriented(面向抽象)
* 不受具体模式的制约
* 清晰的反应所解决的问题是什么
* 帮助抵抗复杂业务想把我们甩开的离心力




[slide data-transition="horizontal3d"]
## Thanks
