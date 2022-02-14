const fs = require('fs');

fs.readFile("./goods.json","utf-8",function(err,data) {
	let newData = JSON.parse(data);
	let pushData = [];
	let i = 0;

	/* 开始提纯数据 */
	newData.RECORDS.map(function(value,index) {
		if(value.IMAGE1 != null){
			pushData.push(value);
			console.log(value.NAME);
			++i;
		}
	});
	console.log(i);
	// console.log(pushData);

	/* 提纯后写入新的文件，生成提纯结果 */
	fs.writeFile("./newGoods.json",JSON.stringify(pushData),function (err) {
		!err ? console.log("写入newGoods.json成功!") : console.log("写入newGoods.json失败",err);
	});
})
