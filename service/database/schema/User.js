const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 定义一个表，需要主键,Id是自动生成的 */
let ObjectId = Schema.Types.ObjectId;

/* 加盐加密部分 */
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;	//加盐的深度

// 创建UserSchema用户模型，构造函数传参需要传进一个配置对象
const userSchema = new Schema({
	UserId : { type:ObjectId },/* userId主键,使用mongoose自动生成 */
	userName : { unique:true , type : String },/* unique表示不重复的 */
	password : String,
	createAt : { type: Date , default: Date.now() },
	lastLoginAt : { type: Date , default: Date.now() }
},{
	collection:"user"
});

/* 每次保存新增数据的时候都进行加盐加密处理 */
//!注意使用箭头函数this的指向问题
userSchema.pre("save" , function(next){
	/* 传入加密深度 */
	bcrypt.genSalt(SALT_WORK_FACTOR , (err,salt)=>{
		if(err){ //如果加盐失败
			console.log("bcrypt.genSalt()加盐失败");
			return next(err);
		}
		// 加密
		bcrypt.hash(this.password , salt ,(err,hash)=>{
			if(err){ //如果加密失败
				console.log("bcrypt.genSalt()加密失败");
				return next(err);
			}
			this.password = hash;	//加密好的hash值
			next();		//加密完成
		});
	})
});


/* 发布模型 */
/* 参数1表collection的名称,需要一模一样。参数2使用哪个schema，就是刚才创建的schema */
mongoose.model("User",userSchema);


