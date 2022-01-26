# my_graduation_project

## 运行项目需要做的事情
启动src/assets/static/myserver中的myserver.js服务器
模拟一些数据从服务器中返回

##数据库管理员
```JavaScript
use admin
db.createUser(
  {
    user: "XCSenior",
    pwd: "123",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
/* 合起来一行显示,才能输入进mongo命令中 */
db.createUser({user: "XCSenior",pwd: "123",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
```
### mongoDB的配置,启动系统服务器
```powershell
sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe\" ^ --service --config=\"C:\Program Files\MongoDB\Server\3.6\mongod.cfg\"" DisplayName= "MongoDB" start= auto

sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe\" ^ --service --config=\"C:\Program Files\MongoDB\Server\3.6\mongod.cfg\"" DisplayName= "MongoDB" start= auto

```



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
