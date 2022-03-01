# my_graduation_project

## 运行项目需要做的事情
用node.js启动src/assets/static/myserver中的myserver.js服务器
模拟一些数据从服务器中返回

##数据库管理员
```JavaScript
/* 在mongoShell中输入use admin，进入管理员，然后添加User及管理员权限 */
/* 合起来一行显示,才能输入进mongoShell命令中 */
db.createUser({user: "XCSenior",pwd: "123",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
```
## mongoDB启动与mongoDB控制台
管理员启动shell,输入：
```powershell
mongod
mongo
```

## 打开项目根目录命令行,以及service文件夹命令行,安装所依赖的库
```powershell
npm install
```

### 脚手架开发编译
```powershell
npm run serve
```

### 展示图预览

![pic1](https://github.com/XCSenior/my_graduation_project/blob/master/ProjectImg/%E6%AF%95%E8%AE%BE%20(1).png?raw=true)

![pic2](https://github.com/XCSenior/my_graduation_project/blob/master/ProjectImg/%E6%AF%95%E8%AE%BE%20(2).png?raw=true)

![pic3](https://github.com/XCSenior/my_graduation_project/blob/master/ProjectImg/%E6%AF%95%E8%AE%BE%20(3).png?raw=true)
