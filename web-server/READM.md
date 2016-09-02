# 将指定的xx.js以windows服务的形式安装并运行
- 特别适用于Http/TCP server，这样就不必要总是打开一个控制台来监听端口了
- 直接运行：node windows-service即可开始安装
- 若因权限问题导致安装的服务无法正常启动，则尝试右键服务->属性->Logon,以你本机的账户名和密码登录
