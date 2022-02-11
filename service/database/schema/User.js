const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 定义一个表，需要主键,Id是自动生成的 */
let ObjectId = Schema.Types.ObjectId;

// 创建UserSchema用户模型，构造函数传参需要传进一个配置对象
const userSchema = new Schema({
	UserId : { type:ObjectId },/* userId主键,使用mongoose自动生成 */
	userName : { unique:true , type : String },/* unique表示不重复的 */
	passWord : String,
	createAt : { type: Date , default: Date.now() },
	lastLoginAt : { type: Date , default: Date.now() }
});
/* 发布模型 */
/* 参数1表collection的名称,需要一模一样。参数2使用哪个schema，就是刚才创建的schema */
mongoose.model("User",userSchema);



//TODO:加盐加密,简单密码进行加密,使得暴力破解难度变高
