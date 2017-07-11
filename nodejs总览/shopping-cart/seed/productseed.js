var Product = require('../models/product');

var mongoose = require('mongoose');

//没加这句话出现的问题
//(node:7084) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;


// app.js 没有连接数据库  FUCK FUCK FUCK FUCK
// 配置mongodb
//会自动创建数据库
mongoose.connect('mongodb://localhost/expressauth');

//数据
var product = [
	new Product({
		imgPath: 'http://f.01ny.cn/forum/201102/09/1933501p7gb6nvo7s7mhzs.jpg',
		title: '《越狱》（Prison Break）',
		discription: '《越狱》（Prison Break）是由葛·艾坦尼斯等执导，保罗·舒尔灵编剧，温特沃思·米勒和多米尼克·珀塞尔等人主演的剧情悬疑电视剧。该剧讲述的是一个关于拯救的故事，迈克尔为了救他被人陷害入狱的哥哥林肯，计划越狱并成功逃脱，在逃亡生涯中再次入狱，最后收集证据以求脱罪的过程',
		price: 9.4
	}),
	new Product({
		imgPath: 'http://ww3.sinaimg.cn/large/006a0xdJjw1f8lxn0loi5j30xc0kutc0.jpg',
		title: '《西部世界》',
		discription: '《西部世界》是一部于HBO播出的美国科幻西部惊悚电视剧，由乔纳森·诺兰和妻子丽莎·乔伊共同创作，改编自美国小说家迈克尔·克莱顿导演和编剧的1973年科幻电影《钻石宫》，以及较少程度的1976年续集《未来世界》。这是第二次根据两部电影改编的电视剧，第一次是一部短暂的1980年剧集《西部之外》',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://tu.rrsub.com/ftp/2016/0427/9f97ce264f66f4ffc0f77473b1983ad4.jpg',
		title: '《疑犯追踪》',
		discription: '《疑犯追踪》，是美国CBS电视台制作的犯罪电视系列剧，由强纳森·诺兰与J·J·亚柏拉罕共同打造出剧情架构，全五季共103集。 影集在2011年5月13日正式宣传，并在2011年9月22日首播。2012年5月10日拍摄完整一季共22集，并在2012年5月17日宣布在第一季增加一集。',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://pic.enorth.com.cn/003/013/573/00301357320_d5b84c9a.jpg',
		title: '《神探夏洛克》',
		discription: '《神探夏洛克》是一部英国BBC 电视连续剧，改编自亚瑟·柯南·道尔爵士的夏洛克·福尔摩斯侦探小说。该剧将原著的故事背景从19世纪大英帝国鼎盛时期搬到了21世纪英国繁华热闹的大都市。 本剧编剧为史蒂芬·莫法特和马克·加蒂斯。由本尼迪克·康伯巴奇饰演夏洛克·福尔摩斯，马丁·弗瑞曼饰演约翰·华生。',
		price: 9.0
	}),
	new Product({
		imgPath: 'https://upload.wikimedia.org/wikipedia/zh/b/be/Lost-Season1.jpg',
		title: '《LOST》',
		discription: '《迷失》是一部美国电视连续剧，最初由美国广播公司播出，全剧从2004年9月22日开播，到2010年5月23日完结，共播出六季。内容讲述从澳大利亚悉尼飞往美国洛杉矶的海洋航空公司815航班在南太平洋一个神秘热带小岛上坠毁后，发生在幸存者身上的故事。',
		price: 8.8
	}),
	new Product({
		imgPath: 'http://img1.gtimg.com/ent/pics/hv1/165/85/1909/124154565.jpg',
		title: '《黑吃黑》',
		discription: '《黑吃黑》是葛·艾坦尼斯执导，Alan Ball、安东尼·斯塔尔等主演的犯罪题材电视剧。。故事发生在宾夕法尼亚的Banshee镇，曾经坐过牢的诈骗大师兼飞天大盗lucas（安东尼·斯塔尔 Antony Starr 饰）拿到了Banshee警长的身份，取代他成为了当地执法者。',
		price: 8.5
	}),
	new Product({
		imgPath: 'http://photocdn.sohu.com/20130407/Img371824432.jpg',
		title: '《无耻之徒》',
		discription: '《无耻之徒》是一部改编自同名英国电视剧的黑色喜剧，由原作保罗·艾伯特开创、约翰·威尔士开发，并于2011年1月9日在Showtime开播。虽然剧本设定故事发生在芝加哥南区的贫民窟，但实际上大部分的场景都是在洛杉矶进行拍摄，只有部分外景取自芝加哥。',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/g/ga9m98dj8r55pfs.jpg',
		title: '《行尸走肉》',
		discription: '《行尸走肉》是一部由法兰·达拉本特创作的美国恐怖电视系列剧，改编自由罗伯特·柯克曼、东尼·摩尔和查理·艾德勒共同绘制的同名漫画。主角是由安德鲁·林肯所扮演的副警长瑞克·格莱姆斯，他从昏迷中醒来后发现自己身处于已被丧尸占领的末日后世界里。接着他决定开始寻找自己的家人，并在沿路中遇到许多其他的生还者。',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://www.vilogo.com/wp-content/uploads/64965070201405071654224556184105792_005.gif',
		title: '《神盾局特工》',
		discription: '《神盾局特工》是一部美国广播公司于2013年制作并播出的电视剧，由乔斯·温登根据漫威漫画中的同名组织神盾局为蓝本创作，属于漫威电影宇宙的系列作品之一，从电影系列的第二阶段开始。',
		price: 8.9
	}),
	new Product({
		imgPath: 'http://mkv.cn/wp-content/uploads/image/21384_o.jpg',
		title: '《实习医生格蕾》',
		discription: '《实习医生格蕾》是一部以医学为主题，在美国十分受欢迎的黄金时段影集。曾经获得艾美奖，第一季在2005年3月27日于美国广播公司首播，故事主要围绕在由艾莲·朋佩欧饰演的梅莉迪丝·格蕾，她是华盛顿西雅图格瑞斯医院的外科实习医生。 ',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://img1.gtimg.com/ent/pics/hv1/232/210/1904/123861382.jpg',
		title: '《逍遥法外》',
		discription: '《逍遥法外》是ABC于2014年9月25日起开播的电视剧。 本剧由ShondaLand制作公司彼得·诺沃克开创并由珊达·莱梅斯担任执行制作。故事讲述由维奥拉·戴维斯饰演的一个在费城大学担任法律课讲师的律师，以及围绕在他与其学生的杀人案件的故事。',
		price: 9.0
	}),
	new Product({
		imgPath: 'http://8drama.com/wp-content/uploads/2016/04/00_579.jpg',
		title: '《冰与火之歌》',
		discription: '《冰与火之歌》，是由美国作家乔治·R·R·马丁所著的史诗奇幻。按照作者计划，该系列将有7部，目前出版至第5部。《冰与火之歌》不同于古典奇幻作品中常有的善恶分明、充满魔法、并有许多非人种族参与故事的情节，而是以较写实的方法去呈现故事中的世界。 2011年本作被HBO改编成电视剧权力的游戏。',
		price: 9.4
	}),
	new Product({
		imgPath: 'https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/0/0l01jm9yobh4xo4.jpg',
		title: '《闪电侠》',
		discription: '《闪电侠》是一部美国电视剧，为格雷格·勃兰蒂、安德鲁·克雷斯伯格和杰夫·约翰斯共同开发，并于CW电视网播出。改编自DC漫画超级英雄《闪电侠》，故事叙述主角巴里·艾伦在一次粒子加速器爆炸意外中获得了极速移动的超能力，因此开始化身为超级英雄“闪电侠”为中心城打击犯罪。',
		price: 8.0
	}),
	new Product({
		imgPath: 'http://pic1.16pic.com/00/03/09/16pic_309861_b.jpg',
		title: '《绿箭侠》',
		discription: '《绿箭侠》改编自“DC漫画”，讲述了亿万阔少奥利弗·奎恩遭遇海难，困于小岛五年后被渔民救起，重返故乡斯塔灵市。奥利弗在炼狱岛上揭开了父亲参与的一场恐怖计划，同岛上的雇佣兵、黑手党、恐怖分子之间发生的故事。',
		price: 8.0
	}),
	new Product({
		imgPath: 'https://upload.wikimedia.org/wikipedia/zh/thumb/2/24/BlackMirrorTitleCard.jpg/250px-BlackMirrorTitleCard.jpg',
		title: '《黑镜》',
		discription: '《黑镜》是查理·布鲁克制作和编剧的一部诗选剧。按布鲁克的原话，本剧的内容和结构是“每集都有不同的演员、不同的背景，甚至一个不同的现实。但都是关于我们当今的生活方式的- 如果我们愚蠢，十分钟之后就会是这样。”',
		price: 8.6
	}),
	new Product({
		imgPath: 'http://upload.rzw.com.cn/2015/1124/1448354583363.jpg',
		title: '《唐顿庄园》（Downton Abbey）',
		discription: '《唐顿庄园》（Downton Abbey）背景设定在1910年代英王乔治五世在位时约克郡一个虚构的庄园——“唐顿庄园”，故事开始于格兰瑟姆伯爵一家由家产继承问题而引发的种种纠葛，呈现了英国上层贵族与其仆人们在森严的等级制度下的人间百态。',
		price: 8.7
	}),
	new Product({
		imgPath: 'https://upload.wikimedia.org/wikipedia/zh/2/2d/Boardwalk_Empire_2010_Intertitle.png',
		title: '《大西洋帝国》',
		discription: '《大西洋帝国》是一部美国历史时代戏剧类影集，由付费有线电视网HBO制播，背景设定在禁酒时期的新泽西州大西洋城，由史蒂夫·布西密饰演主角努基·汤普森。',
		price: 9.0
	})
]

var done = 0;
for(var i = 0; i < product.length; i++){
	product[i].save(function(err){
		// done++
		// if (done == product.length) {
		// 	exit();
		// }
			if (err) {
    			console.log(err);
  			} else {
   				 console.log(i);
  			}
	});
}


function exit() {
	mongoose.disconnect();
}
