const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 定义一个表，需要主键,Id是自动生成的 */
let ObjectId = Schema.Types.ObjectId;

// 创建UserSchema用户模型
const userSchema = new Schema({
	UserId : ObjectId,
	userName : { unique:true , type : String },
	passWord : String,
	createAt : { type: Date , default: Date.now() },
	lastLoginAt : { type: Date , default: Date.now() }
});
/* 发布模型 */
mongoose.model("User",userSchema);


// 加盐加密
