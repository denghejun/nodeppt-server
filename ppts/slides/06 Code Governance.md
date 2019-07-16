title: 06 Code Governance
speaker: Deng,HeJun
transition: cards
files: /css/theme.css
highlightStyle: monokai_sublime
date: 2019年7月12日

[slide data-transition="horizontal"]
## 你即将从本文了解到
-----
<hr class="main-hr" />
* 代码治理的目标 {:&.moveIn}
* 关键结果
* 迭代计划




[slide data-transition="horizontal3d"]
## 代码治理的目标
-----
<hr class="main-hr" />
<span class="desc">~我们期望的美好愿景是什么~</span>
[slide data-transition="horizontal3d"]
* 同一Codebase下，统一的编程风格 {:&.moveIn}
* 面对开发人员的更好的编程体验，增强编码自信
* 稳健的软件架构演进
* 保证代码质量，降低产品发布的业务风险



[slide data-transition="horizontal"]
## 关键结果
-----
<hr class="main-hr" />
<span class="desc">~围绕每个"美好愿景"的度量集合~</span>



[slide data-transition="horizontal3d"]
## 同一Codebase下，统一的编程风格
-----
<span class="desc">~最好的状态看起来像是同一个人在编码~</span>
[slide data-transition="horizontal3d"]
-----
* 所有代码格式化统一 {:&.bounceIn}
* 消除 10 个核心 Package 所有魔法数字（未经定义的常量）
* 消除 10 个核心 Package 所有重复代码  
* 消除 10 个核心 Package 所有无语意硬编码
* 在应用程序构建周期中引入 1 个代码格式检查的环节


[slide data-transition="horizontal3d"]
## 面对开发人员更好编程体验增强编码自信
-----
<span class="desc">~合理的框架制约一定具备良好的编程体验和效率~</span>

[slide data-transition="horizontal3d"]
-----
* 制定 1 个统一的"后端"异常处理框架 {:&.moveIn}
* 制定 1 个统一的"后端"常规业务逻辑处理可测试的编程模型
* 制定 1 个统一的"前后端"交互编程模型
* 制定 1 个"前端"代码模块化的通用框架



[slide data-transition="horizontal3d"]
## 稳健的软件架构演进
-----
<span class="desc">~针对具体的问题域构建合理的架构制约对演进是必要的~</span>

[slide data-transition="horizontal3d"]
-----
* 重构 5 个不合理设计的核心业务模块 {:&.moveIn}
* 解决 2 个关键的技术债务
* 构建 1 个统一的领域分层结构
* 编写 1 个控制代码圈复杂度的插件



[slide data-transition="horizontal3d"]
## 保证代码质量，降低产品发布的业务风险
-----
<span class="desc">~单元测试和技术风险交流能有效降低业务风险~</span>
[slide data-transition="horizontal3d"]
-----
* 制定 1 个统一的单元测试框架和编程模型 {:&.moveIn}
* 在应用程序构建周期中加入 1 个测试覆盖率检查的环节
* 完成 20 个核心 Package 测试覆盖率达 80%
* 制定 1 个代码审核的标准和定期会议时间
* 制定 1 个固定的 Tech Huddle 会议时间



[slide data-transition="horizontal"]
## 迭代计划
-----
<hr class="main-hr" />
<span class="desc">~按目标优先级和依赖关系分迭代治理~</span>


[slide data-transition="horizontal3d"]
## 目标优先级和依赖关系
-----
[slide data-transition="horizontal3d"]
-----
* 🚩🚩🚩🚩：同一Codebase下，统一的编程风格 {:&.bounceIn}
* 🚩🚩🚩： 面对开发人员的更好的编程体验，增强编码自信 
* 🚩🚩： 保证代码质量，降低产品发布的业务风险
* 🚩： 稳健的软件架构演进


[slide data-transition="horizontal3d"]
## Sprint 0 （1 week）
-----
<span class="desc">~迭代开端的准备工作~</span>
[slide data-transition="horizontal3d"]
-----
* 确定代码治理人力资源和业务开发人力资源分配 {:&.bounceIn}
* 确定代码治理与并行业务开发的策略
* 确定周期性审核"目标完成度"的方式和时间
* 制定代码治理专项电子看板
* 收集讨论并确定关键结果中的数字

[slide data-transition="horizontal3d"]
-----
* <span class="head-text">Sprint 1</span> - 同一Codebase下，统一的编程风格（about 2 weeks） {:&.moveIn}
* <span class="head-text">Sprint 2，3</span> - 面对开发人员的更好的编程体验，增强编码自信（about 4 weeks）
* <span class="head-text">Sprint 4、5</span> - 稳健的软件架构演进（about 4 weeks）
* <span class="head-text">Sprint 6、7</span> - 保证代码质量，降低产品发布的业务风险（about 4 weeks）



[slide data-transition="horizontal3d"]
## Thanks
