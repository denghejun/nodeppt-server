title: 05 Architecture Constraints
speaker: Deng,hejun
transition: cards
files: /css/theme.css
highlightStyle: monokai_sublime
date: 2015年12月20日

[slide data-transition="horizontal3d"]
## 华丽编程之面向抽象的重要性
-----
ThoughtWorks - Deng,Hejun
<hr class="main-hr" />
* Abstract Oriented (面向抽象) {:&.moveIn}
* Architecture Constraints (架构制约)
* Best Practice (最佳实践)


[slide data-transition="horizontal3d"]
## Abstract Oriented (面向抽象)
-----
<hr class="desc"/>
<span class="desc">~ 针对复合事物或逻辑进行具象升华的编程活动就是面向抽象 ~</span>



[slide data-transition="horizontal3d"]
* 在编程范畴，尤其在企业级应用编程领域，大多编程人员一上手就已固化思维：Controller，Service，Repository,接下来是漫无止境的业务代码堆积。 {:&.bounceIn}
* 我一直对这种扁平“层”概念持怀疑态度，用另外一种角度来看，分层技术解决了文件归属问题，它只是解决了”这个“问题而不是“这类”问题，这就是之前提到的面向抽象的重要性。

[slide data-transition="horizontal3d"]
* 一旦你具象了问题，你就失去了对领域的绝对控制。 {:&.moveIn}
* 面向抽象不再是讲有一个Base Class “Shape”，下边的具象是Circle，Square..。如果没有意识到这个问题，那与“只会编写Yaml/Jenkins file”没有区别。

[slide data-transition="horizontal3d"]
* 抽象的本质是因为变化 {:&.moveIn}
* 同样的事物在某一时刻某一条件下会产生不一样的效应。
* 业务决策代码编写的时候你要清楚这些业务行为所有的变化点，这就是面向抽象编程的本质
* 如果读一些框架的源码你就会体会到，过度设计其实往往不存在，只是编写者考虑到的变化你却不屑一顾

[slide data-transition="horizontal3d"]
不要给任何人重构你代码的机会，因为从一开始你就应该知道你要做良好的抽象



[slide data-transition="kontext"]
## Architecture Constraints (架构制约)
-----
<hr class="desc"/>
<span class="desc">~ 给具备一定规模的目标设计一条良好的演进路线就是架构制约 ~</span>



[slide data-transition="horizontal3d"]
* 这绝对不是通常讲的软件架构范畴。一直在思考代码是怎么坏掉的。 {:&.moveIn}
* 我对某些IDE工具提供所谓Refactor行为总是嗤之以鼻，他会给编程人员一种 “嗯，我已经完成了对
这片代码的重构” 的绝对错觉，而实际上你只是抽取了一个方法或是挪了一个位置
* 我赞成工具带来的重构手法以及安全性，但不建议过度依赖以至于"丧失理智"
* 我相信优秀的代码必须经过手工打造，而不是利用IDE的把戏。

[slide data-transition="horizontal3d"]
"越简单的代码就越强壮"，"简单的代码就是美"？
<hr class="desc"/>


[slide data-transition="horizontal3d"]
* 这是我们常常听到的，某一角度讲这难道不是在变向拉低编程门槛？ {:&.moveIn}
* No one question was fixed by one single if statement。
* 麻木的相信就是迷信，最好的编程体验是隐藏复杂暴露简单。

[slide data-transition="horizontal3d"]
* 代码变坏的另外一个原因是没有 Architecture Constraints(架构制约)

<span class="desc">
其实很好理解，只是很少人去思考。假设我们认为Spring Boot是我们解
决某一问题所使用的架构，那么百分百使用这个架构的人必定受到这个架构的约束，那么不同的开发
者都必定拥有相同的开发体验（约束），不同的开发者写出来的代码必然都能够在Spring Boot下良
好的工作，并且能够在这个架构约束下高质量的完成需求。而现实是，传统的编程模式让开发者认为
我只要完成了对应的“层”就可以了，而不思考我要不要实现一个业务架构制约，让以后的业务代码在
这个约束下进化。
</span>

[slide data-transition="horizontal3d"]
* 比如，我在之前有实现一个文字命令输入处理的逻辑问题，最终呈现的制约效果是这样的： {:&.moveIn}
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

* 这意味无论将来业务上的需求如何进化，架构制约着开发者不能胡来，同时架构的重要目的还是提供
给后续开发者良好的编程体验，譬如将来有一种新的输入命令需要处理，开发者只需要添加新的输入
指令/命令具象即可像预期的那样工作。 


[slide data-transition="horizontal3d"]
## Best Practice (最佳实践)
-----
<hr class="desc"/>
<span class="desc">~ 刚刚的代码部分是什么，你会怎么做？ ~</span>


[slide data-transition="horizontal3d"]
## 刚刚的代码部分是什么，你会怎么做
-----
* 编码前的思考，有利于提高`编码自信` {:&.bounceIn}
    * 字符串处理是一个常规的编程问题，它应该是一种纯粹的对`数据收集`的部分，不应该混合在计算、转换这样的操作中 {:&.bounceIn}
    * 罗马数字应是一个专业的`领域`系统，需要提供计算和转换的标准接口，应该将它设计成一种公共资源，甚至与本需求无关。例如 Math.PI，RomanNumbers.IV。

[slide data-transition="horizontal"]
##  分离抽象
-----
* 面对复杂多样的数据信息时，`分类`是尝试解决复杂度、大规模的有效解决方案 {:&.bounceIn}
    * `glob is I`: 这是一种对罗马数字进行别名约定的描述输入; {:&.bounceIn}
    * `glob glob Silver is 34 Credits`: 这是一种对商品单价的隐式描述；
    * `how much is pish tegj glob glob ?`:这是一种纯粹的用别名的方式询问罗马数字组合后与十进制值的转换描述；
    * `how many Credits is glob prok Silver ?`:这是一种询问商品数量与总价的计算描述；
    * `how much a could be A if foo = wow ?`:这是一种异常输入，属于程序处理范围之外的输入；

[slide data-transition="horizontal3d"]
## 面向抽象
-----
* 首先为了区分出指令数据和行为，我们进行以下约定 {:&.bounceIn}
    * `指令（Directive）`：代指用户的输入，进行解析用户输入并缓存，是纯粹的数据部分 {:&.bounceIn}
    * `命令（Command）`：代指操作指令（数据）的行动者；将何种指令进行何种处理并输出是其本质；





[slide data-transition="horizontal3d"]
## Directive
-----
<pre>
<code>
public class CommandDirective
{
	public CommandDirective(string content)
	{
		this.Content = content;
		this.Validate(content);
	}

	public string Content { get; private set; }

	protected virtual void Validate(string content)
	{

	}
}

public abstract class CommandDirective&lt;TCommand&gt; : CommandDirective where TCommand : Command
{
	public CommandDirective(string content) : base(content)
	{
	}

	public abstract TCommand Command { get; }
}
</code>
</pre>

[slide data-transition="horizontal3d"]
## Command
-----
<pre>
<code>

public abstract class Command
{
	public abstract object Execute();
}

public abstract class Command&lt;TDirective&gt; : Command where TDirective : CommandDirective
{
	protected TDirective _directive;

	public Command(TDirective directive)
	{
		this._directive = directive;
	}
}

</code>
</pre>

[slide data-transition="horizontal3d"]
-----
<pre><code>
*** UI ***
|_GuideMenus
|_GuideMenus/ExitMenu.cs
|_GuideMenus/InputDataFromConsoleMenu.cs
|_GuideMenus/InputDataFromFileMenu.cs

*** Core System ***
|_Guider.cs
|_Commands ## 指令系统
|_Commands/AliasCommand.cs
|_Commands/UnitPriceCommand.cs
|_Commands/HowManyCommand.cs
|_Commands/HowMuchCommand.cs
|_Commands/UnknownCommand.cs
|_Strategies ## 指令策略系统
|_Strategies/AliasCommandStrategy.cs
|_Strategies/UnitPriceCommandStrategy.cs
|_Strategies/HowManyCommandStrategy.cs
|_Strategies/HowMuchCommandStrategy.cs
|_Strategies/UnknownCommandStrategy.cs
|_Core ## 对指令系统和策略系统提供核心抽象支撑
|_Core/Command.cs
|_Core/CommandDirective.cs
|_Core/DirectiveProxy.cs
|_Core/ICommandStrategy.cs
</code></pre>


[slide data-transition="horizontal3d"]
<pre>
<code>
*** Roman Number System ***
|_RomanCalculator.cs
|_RomanNumber.cs
|_SymbolEnum.cs

*** Unit Tests ***
|_...

</code>
</pre>


[slide data-transition="horizontal3d"]
## 如何管理抽象的实例
-----
<pre>
  <code >
public static class DirectiveProxy&lt;TDirective&gt; where TDirective : CommandDirective
{
	public static TDirective Create(string content)
	{
		return (TDirective)Activator.CreateInstance(typeof(TDirective), new object[] { content });
	}
}
</code>
</pre>

* 请总是为你的抽象提供一个工厂去对外使用，这样有几个好处 {:&.bounceIn}
    * 创建对象与对象本身、对象本身与使用对象本身都是`分离`的 {:&.bounceIn}
    * 工厂有利于对对象创建情况`统一`监控



[slide data-transition="kontext"]
## 尽量提高抽象实例使用时的可读性
-----
<pre>
<code >
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("glob is I").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("prok is V").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("pish is X").Command.Execute();
DirectiveProxy&lt;AliasCommandDirective&gt;.Create("tegj is L").Command.Execute();
DirectiveProxy&lt;UnitPriceCommandDirective&gt;.Create("glob glob Silver is 34 Credits").Command.Execute();
var response = DirectiveProxy&lt;HowManyCommandDirective&gt;.Create("how many Credits is glob prok Silver ?").Command.Execute();

Assert.That(response?.ToString(), Is.EqualTo("glob prok Silver is 68 Credits"));
</code>
</pre>

[slide data-transition="horizontal3d"]
## 在什么样的情况下使用何种指令
-----
* How about this? {:&.bounceIn}
<pre><code>
var input = 'Whatever';
switch(input)
{
    case "A": // execute directive A
    case "B": // execute directive B
    ...
}
</code>
</pre>
* And this?
<pre>
<code>
var input = 'Whatever';
if(input like 'A')
{
    // do something...
}
else if(input like 'B')
{
    // do another...
}
</code>
</pre>

[slide data-transition="horizontal3d"]
## `面条式`代码的危害
* 它基本不满足 {:&.bounceIn}
    * 可维护,可扩展 {:&.bounceIn}
    * 低耦合,高内聚
    * 改动一处，影响整体
    * 无法反应业务规则具象
* 大量潜伏在我们的程序中，你对它将`毫无头绪`

[slide data-transition="horizontal3d"]
## 显然我们遇到的是一个策略问题
-----
* 这是一个经常在我们程序中遇到的问题（`case when ... then ...`) {:&.bounceIn}
* 消除`面条式`代码，你仅需要一个基于策略的设计
<pre><code>
public interface ICommandStrategy
{
	bool CanExecute(string content);
	GuideResponse Execute(string content);
}
</code></pre>


[slide data-transition="horizontal3d"]
## 最终使用策略看起来是这样子
-----
<pre>
<code>
private static GuideResponse Solve(string content)
{
	try
	{
		return CommandStrategies.FirstOrDefault(o => o.CanExecute(content))?.Execute(content) ?? GuideResponse.Unknown;
	}
	catch
	{
		return GuideResponse.Unknown;
	}
}
</code>
</pre>


[slide data-transition="horizontal3d"]
## 新Feature将不会是问题
-----
* 用户新增输入类型：xxx is I：意思是给罗马数字换一种别名 {:&.bounceIn}
* 用户会输入：How many Silvers is glob glob Gold？：意思是glob glob个金子是多少银？

[slide data-transition="horizontal3d"]
## 引入IoC会怎样
-----
* 只需要将策略托管到容器 {:&.bounceIn}






[slide data-transition="horizontal3d"]
## 总是将代码放到安全的地方
-----
建议总是把代码`push`到任何你喜欢的任何方式托管的`Repository`，因为我总觉得把代码存储到我单机的电脑磁盘中会`不保险`，也不便于`回顾`    。

[slide data-transition="horizontal3d"]
## Thanks
