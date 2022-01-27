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

## 打开项目根目录命令行,以及service文件夹命令行,安装所依赖的库
```powershell
npm install
```

### 脚手架开发编译
```powershell
npm run serve
```

