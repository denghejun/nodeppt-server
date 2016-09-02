### 一个丰富多彩的NodePPT Web Server Site。
- 其中用到了将`Node`应用程序安装成`windows服务`的功能，参见[https://github.com/denghejun/nodeapp-windowsService](https://github.com/denghejun/nodeapp-windowsService)

- 直接运行web server下：`node windows-service`即可安装指定的Windows服务
- 直接运行Web server下：`node uninstall-service`即可卸载指定的Windows服务
- `web server`的`IP`和端口号在源码`nodeppt-server.js`中指定的

- 随后你可以直接在浏览器中访问http://xxxx(IP):yy(port)即可.

- nodeppt是一个比较好的基于node的web ppt模块，可以从github获取资源，需要安装`node`和`node ppt`：`npm install -g nodeppt`
