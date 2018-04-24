title: 02 Work Share
speaker: Deng,hejun
transition: cards
theme: colors
highlightStyle: monokai_sublime
date: 2017年4月5日

[slide data-transition="horizontal3d"]
## 你即将从本文了解到
-----
* Spring Web Flow {:&.moveIn}
* Java Custom Tag
* Adobe Target & Ensighten
* Interact with Niche Protect & GIPE

[slide data-transition="horizontal3d"]
## JSP Spring Web Flow
* Spring Web Flow 的目标是成为管理Web应用页面流程的最佳方案 {:&.moveIn}
* Code sample

[slide data-transition="horizontal3d"]
## JSP 自定义标签
* 当页面包含一个自定义标签，它将被转化为servlet（用Java编写的Web服务端程序） {:&.bounceIn}
* 可以简单继承`SimpleTagSupport`并重写doTag来实现自己的tag
* 可以直接创建`.tag`文件来定义tag

[slide data-transition="horizontal3d"]
## Adobe Target
* Activities and Tests {:&.bounceIn}
* Location
* Audiences

[slide data-transition="horizontal3d"]
## Activities and Tests
  >For example, you might design an activity that tests two different landing pages, one that highlights information about women's summer shoes, and one that highlights more general summer apparel. The activity determines the conditions that control when each of these landing pages appears, and the metrics that determine which page is more successful. The activity is configured to start and end when specific conditions are met, such as between specific dates, or to start when the activity is approved and to end when it is deactivated.

* Activity Type {:&.bounceIn}
    * A/B Test {:&.bounceIn}

    `new layouts or different elementslarge interactions between elements`
    * A/B test with Analytics data
    * Multivariate test
    * Experience targeting

       `allows you to use targeting to display different landing page content for different visits.
        help you see which version produces more successful results.`
    * Automated personalization
    * Recommendations

[slide data-transition="horizontal3d"]
## Location
   >In Target Standard, a location can be any element on a page, as long as the page contains a single line of code that enables Target in the <head> section of each page you want to track. This line of code calls the JavaScript libraries needed to collect information and deliver targeted experiences to your visitors

   * at.js {:&.bounceIn}

   `No document.write`
   * mbox.js

   `calls Target.js is hosted by Adobe and is automatically updated by Adobe, mbox.js calls Target from every page that references the mbox.js file. This enables Target to do the following:`

        * Deliver Target activities
        * Track clicks
        * Track most success metrics
        * DOM manipulation

[slide data-transition="horizontal3d"]
## Audiences
    > Target audiences are a defined set of visitor criteria. Offers can be targeted to specific audiences (or segments). Only visitors who belong to that audience see the experience that is targeted to them.
    For example, you might target an activity to an audience made up of visitors who use a particular browser or operating system.


[slide data-transition="horizontal3d"]
## Implement Our Experience
* Server Side {:&.bounceIn}
  * TestAndTarget`Campaign` [enum] {:&.bounceIn}
     * 定义业务相关的Campaign／Activity {:&.bounceIn}
     * e.g.
     <pre>
     <code>
     QUOTO_SCHDULE_AAMI_REDESIGN("t1",
     new TestAndTargetExperience[]{TestAndTargetExperience.B,TestAndTargetExperience.C})
     </code>
     </pre>
     所以可以看出，一个`Campaign`可以拥有多个`Experience`
  * TestAndTarget`Experience` [enum]
     * 定义来目前为止我们所定义的所有`Experience`的可选项，供`Campaign`构造时初始化

  [slide data-transition="horizontal3d"]
  * TestAndTarget`CampaignExperience` {:&.bounceIn}
     * 内部缓存了一个Map<Campaign, Experience>: 表示当前所有的Campaign所已经应用上的Experience {:&.bounceIn}
     * 目前逻辑中，同一个Campaign不能应用多次Experience: 例如t0 ＝ 'c'之后，将没有机会再次改变t0所对应的Experience

[slide data-transition="horizontal3d"]
* 在JSP页面并未直接使用原始的Map，而是通过一个get方法实时转化原始的Map为Map<String,Experience>,其中Key由Campain的name（enum name）转化而来，它们彼此是等价的 {:&.bounceIn}
* 在JSP中使用的`testAndTargetExperience`来自于`flowConversation`,`flowConversation.testAndTargetExperience`是在web server端通过Action的调用，将requestParameter取出后构造新的`CampaignExperience`实例，就完成了Experience的应用／设置。

[slide data-transition="horizontal3d"]
* 业务上的Action存在一个集成链，Action在Webflow中指POJO类型的class，就是JavaBeans风格的class，以motor AAMI 的 car details page为例，其继承关系如下： {:&.bounceIn}
<pre>
<code>
  cardetailsActionAami -> CardetailsBaseAction ->
  NormalAction -> NormalAction<MotorQuote> -> Action ->
  WebflowStateMultiAction -> WebFlowMultiAction -> Action
</code>
</pre>
最终的Action是一个包含一个方法的接口：OutCome execute().

[slide data-transition="horizontal3d"]
* 每个page step flow 都继承了一个flow：`page-parent`，该flow里会通过action-state调用一个@Bean：actionExecutor（在通过@Configuration标记的FoundationConfiguration class里，它包含一系列bean的集合） {:&.bounceIn}
* 通过这个actionExecutor会根据当前page，找到对应的pageAction，执行，然后输出一个transition.

[slide data-transition="horizontal3d"]
## Ensighten
* 技术原理其实并不复杂
* 通过前面讲的Java Custom Tag的方式来窜改DOM或执行脚本，以达到动态脚本注入的效果
* 通过前端脚本注入，收集前端数据，发往 Data Collection Server，以进行数据分析

[slide data-transition="horizontal3d"]
## 一个最小代价的Ensighten实现

[slide data-transition="horizontal3d"]
## Data Layer Implematation
* 在 page head添加 `dataLayer`,我们是通过在每个brand的母版页的head处统一通过`ensighten tag`注入。例如：aami.jsp
<pre>
<code>
var dataLayer = {
    "siteID" : "in:ami",
    "rsID" : "sunami",
    "metricsServer" : "aami.com.au", //refers to the data collection server
    "enviroment" : "PROD",
    "pageName" : "",
    "dataModel" : {   // can define any data we want to collect.
        "products" : ""
    },
    "events" : []
};
</code>
</pre>


[slide data-transition="horizontal3d"]
## BootstrapJs
* 在 page head中添加对应环境的Bootstrap.js，它负责ensighten的触发和数据的转发。开发人员需特别注意的是不同的brand，不同的环境将会有不同的Bootstrap.js
<pre>
<code>
  &lt;script type="text/javascript" src="//nexus.ensighten.com/suncorp/aami-motor-stage/Bootstrap.js"&gt;
  &lt;/script&gt;
</code>
</pre>

[slide data-transition="horizontal3d"]
## Bottom Trigger
* placed after the dataLayer {:&.bounceIn}
* brefore the closing BODY tag
<pre>
<code>
&lt;script&gt;
(function(){if(typeof window.bottomTrigger == 'function'){ window.bottomTrigger();}})();
&lt;/script&gt;
</code>
</pre>

[slide data-transition="horizontal3d"]
## How Do We Implement
* 通过`ensighten tag`注入脚本，初始化dataLayer {:&.bounceIn}
* `pubsub.js`订阅了ensighten需要的全局事件（绑定到document对象），当事件在`publish`时，按以下方式通知`ensighten`
<pre>
<code>
    if(window.Bootstrapper)
    {
        Bootstrapper.bindPageSpecificCompletion(function(){
            if(event)
            {
                window.dataLayer.event = event;
            }

            Bootstrapper.ensEvent.trigger("event");
        });
    }
</code>
</pre>
* 在需要的地方更新dataLayer


[slide data-transition="horizontal3d"]
## Interact with Nich Protect & GIPE
* we hosted a rest api: `[POST]:/ajax/calculatePremiumOnQSP` {:&.bounceIn}
* we send a post ajax request to call the api above.
* the api will call Niche, and Niche will call GIPE by different endpoints base different brands.

[slide data-transition="horizontal3d"]
## Thanks
