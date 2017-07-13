title: 01 Merchant's Guide To The Galaxy
speaker: Deng,hejun
transition: cards
theme: colors
highlightStyle: monokai_sublime
date: 2015年12月20日

[slide data-transition="horizontal3d"]
## 你即将从本文了解到
-----
* 面向抽象 {:&.moveIn}
* 面向抽象的技术或手段
* 如何管理抽象实例
* 面条式代码
* Merchant's Guide To The Galaxy




[slide data-transition="earthquake"]
## 面向对象编程的本质
-----
* 为什么要谈OOP这个基础话题? {:&.bounceIn}
    * 越`简单`,越`重要` {:&.moveIn}
	* `维护`类项目的痛点
    * 我希望从不同的人身上`吸取经验`
* 你眼中的OOP本质是什么？
    * `真实世界`的、更好的、直接`映射` {:&.moveIn}
    * 实质是`面向抽象`编程
    * 为了将代码变成`文档`
    * 向美好的事物`无限逼近`


[slide data-transition="kontext"]
## 哪些技术可以有效的支撑OOP
-----

* 你所知道的好的OOP技术或手段？ {:&.bounceIn}
    * `多态`(语言本身提供) {:&.moveIn}
    * `Design Pattern`
    * `IOC(DI)`（IOC的真实含义？）
    * `DDD`
    * `Micro Service`
		* Small is beautiful. {:&.moveIn}
		* Make each program do one thing well.
		* Build a prototype as soon as possible.
		* Choose portability over efficiency.
	* `AOP`(对oop的补充)
    * Whatever {:.yellow}

[slide data-transition="earthquake"]
## Merchant's Guide To The Galaxy
-----
<pre>
<code>
A sample input file would be like this:

glob is I
prok is V
pish is X
tegj is L
glob glob Silver is 34 Credits
glob prok Gold is 57800 Credits
pish pish Iron is 3910 Credits
how much is pish tegj glob glob ?
how many Credits is glob prok Silver ?
how many Credits is glob prok Gold ?
how many Credits is glob prok Iron ?
how much wood could a woodchuck chuck if a woodchuck could chuck= wood ?

Corresponding output to this would be as given below :

pish tegj glob glob is 42
glob prok Silver is 68 Credits
glob prok Gold is 57800 Credits
glob prok Iron is 782 Credits
I have no idea what you are talking about
</code>
</pre>

[slide data-transition="horizontal3d"]
## 这是什么，你会怎么做
-----
* 编码前的思考，有利于提高`编码自信` {:&.bounceIn}
    * 字符串处理是一个常规的编程问题，它应该是一种纯粹的对`数据收集`的部分，不应该混合在计算、转换这样的操作中 {:&.bounceIn}
    * 罗马数字应是一个专业的`领域`系统，需要提供计算和转换的标准接口，应该将它设计成一种公共资源，甚至与本需求无关；
    * 支持从文件输入和控制台输入，实际上为了接口的统一，理论上应该把从控制台输入的数据也缓存到临时文件，这样系统的入口单一，接口的`调用方`会觉得更加舒适



[slide data-transition="horizontal"]
##  分离抽象
-----
* 面对复杂多样的数据信息时，`分类`是尝试解决复杂度、大规模的有效解决方案 {:&.bounceIn}
    * `glob is I`: 这是一种对罗马数字进行别名约定的描述输入; {:&.bounceIn}
    * `glob glob Silver is 34 Credits`: 这是一种对商品单价的隐式描述；
    * `how much is pish tegj glob glob ?`:这是一种纯粹的用别名的方式询问罗马数字组合后与十进制值的转换描述；
    * `how many Credits is glob prok Silver ?`:这是一种询问商品数量与总价的计算描述；
    * `how much wood could a woodchuck chuck if a woodchuck could chuck= wood ?`:这是一种异常输入，属于程序处理范围之外的输入；

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
## 深度设计使其满足低耦合、可扩展、优雅
-----
<pre><code>
*** 控制台 ***
GuideConsole(.exe)
|_GuideMenus
|_GuideMenus/ExitMenu.cs
|_GuideMenus/InputDataFromConsoleMenu.cs
|_GuideMenus/InputDataFromFileMenu.cs

*** 银河系指南系统 ***
GuideToTheGalaxy(.dll)
|_GalaxyGuider.cs
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
*** 罗马数字资源系统 ***
RomanNumerals(.dll)
|_RomanCalculator.cs
|_RomanNumber.cs
|_SymbolEnum.cs

*** 基于 NUnit 单元测试 ***
GuideToTheGalaxy.Tests(.exe)
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
* `I think that's not a good idea.`

[slide data-transition="horizontal3d"]
## `面条式`代码的危害
* 它基本不满足 {:&.bounceIn}
    * 可维护,可扩展 {:&.bounceIn}
    * 低耦合,高内聚
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
* 用户会输入：xxx（具体我忘记了） is I：意思是给罗马数字换一种别名 {:&.bounceIn}
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
