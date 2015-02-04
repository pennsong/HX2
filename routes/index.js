var express = require('express');
var router = express.Router();

var meets = [
    {
        "_id" : "1",
        "creater" : {
            username: 'a',
            specialPic: 'a.jpg'
        },
        "target" : {
            username: 'b',
            specialPic: 'b.jpg'
        },
        "status" : "待回复",

        "personLoc" : {
            "lng" : 121.59488830726742,
            "lat" : 31.20935257061497
        },
        "mapLoc": {
            "uid":"82cf55ea33c0f0eefbdc856b",
            "name":"北京银行ATM",
            "address":"北京1"
        },
        "specialInfo": {
            "sex" : "男",
            "clothesColor" : "红/紫/粉",
            "clothesStyle" : "纯色",
            "clothesType" : "风衣/大衣",
            "glasses" : "带",
            "hair" : "竖起"
        }
    },
    {
        "_id" : "2",
        "creater" : {
            username: 'a',
            specialPic: 'a.jpg'
        },
        "target" : {
            username: 'c',
            specialPic: 'c.jpg'
        },
        "status" : "成功",

        "personLoc" : {
            "lng" : 121.59488830726742,
            "lat" : 31.20935257061497
        },
        "mapLoc": {
            "uid":"82cf55ea33c0f0eefbdc856b",
            "name":"北京银行ATM",
            "address":"北京2"
        },
        "specialInfo": {
            "sex" : "男",
            "clothesColor" : "红/紫/粉",
            "clothesStyle" : "纯色",
            "clothesType" : "风衣/大衣",
            "glasses" : "带",
            "hair" : "竖起"
        }
    },
    {
        "_id" : "3",
        "creater" : {
            username: 'a',
            specialPic: 'a.jpg'
        },
        "targett" : null,
        "status" : "待确认",

        "personLoc" : {
            "lng" : 121.59488830726742,
            "lat" : 31.20935257061497
        },
        "mapLoc": {
            "uid":"82cf55ea33c0f0eefbdc856b",
            "name":"北京银行ATM",
            "address":"北京市东城区东长安街天安门内"
        },
        "specialInfo": {
            "sex" : "男",
            "clothesColor" : "红/紫/粉",
            "clothesStyle" : "纯色",
            "clothesType" : "风衣/大衣",
            "glasses" : "带",
            "hair" : "竖起"
        }
    },
    {
        "_id" : "4",
        "creater" : {
            username: 'b',
            specialPic: 'b.jpg'
        },
        "target" : {
            username: 'a',
            specialPic: 'a.jpg'
        },
        "status" : "待回复",

        "personLoc" : {
            "lng" : 121.59488830726742,
            "lat" : 31.20935257061497
        },
        "mapLoc": {
            "uid":"82cf55ea33c0f0eefbdc856b",
            "name":"北京银行ATM",
            "address":"北京市东城区东长安街天安门内"
        },
        "specialInfo": {
            "sex" : "男",
            "clothesColor" : "红/紫/粉",
            "clothesStyle" : "纯色",
            "clothesType" : "风衣/大衣",
            "glasses" : "带",
            "hair" : "竖起"
        }
    }
];

var chats = [
    {
        from: 'a',
        to: 'b',
        msg: 'msg1',
        time: '2015-01-01 19:00'
    },
    {
        from: 'b',
        to: 'a',
        msg: 'msg2',
        time: '2015-01-01 19:01'
    }
];

var targets = [
    {
        username: 'ta',
        specialPic: 'a.jpg'
    },
    {
        username: 'tb',
        specialPic: 'b.jpg'
    }
];

var specialInfo = {
    sex: '男',
    hair: '竖起',
    glasses: '带',
    clothesType: '风衣/大衣',
    clothesColor: '红/紫/粉',
    clothesStyle: '纯色'
}

var friend = {
    displayName: 'fad',
    specialPic: 'a.jpg',
    messages: [
    ]
}

var friend2 = {
    displayName: 'fbd',
    specialPic: 'b.jpg',
    messages: [
        {
            from: 'a',
            to: 'b',
            content: 'tt1',
            time: '2015-01-01 10:00'
        },
        {
            from: 'b',
            to: 'a',
            content: 'tt2',
            time: '2015-01-01 10:01'
        }
    ]
}

var friends = {
    fa: friend,
    fb: friend2
}

var locs = [
    {
        "name":"北京银行ATM1",
        "location":{
            "lat":39.914704,
            "lng":116.402285
        },
        "address":"北京市东城区",
        "street_id":"08db2caeab1dc6dcfb2213da",
        "uid":"08db2caeab1dc6dcfb2213da",
        "detail_info":{
            "distance":149,
            "tag":"金融;atm"
        }
    },
    {
        "name":"交通银行ATM2",
        "location":{
            "lat":39.917437,
            "lng":116.403147
        },
        "address":"北京市东城区东长安街天安门内",
        "uid":"7af671e39c0b6c1158f6be9f",
        "detail_info":{
            "distance":280,
            "tag":"金融;atm",
            "type":"life",
            "detail_url":"http://api.map.baidu.com/place/detail?uid=7af671e39c0b6c1158f6be9f&output=html&source=placeapi_v2",
            "overall_rating":"0",
            "service_rating":"0",
            "environment_rating":"0",
            "image_num":"1"
        }
    },
    {
        "name":"中国银行ATM3",
        "location":{
            "lat":39.912947,
            "lng":116.396089
        },
        "address":"北京市西城区西长安街2号",
        "street_id":"82cf55ea33c0f0eefbdc856b",
        "uid":"82cf55ea33c0f0eefbdc856b",
        "detail_info":{
            "distance":712,
            "tag":"金融;atm",
            "type":"life",
            "detail_url":"http://api.map.baidu.com/place/detail?uid=82cf55ea33c0f0eefbdc856b&output=html&source=placeapi_v2",
            "overall_rating":"0",
            "service_rating":"0",
            "environment_rating":"0",
            "image_num":"2"
        }
    },
    {
        "name":"中信银行ATM4",
        "location":{
            "lat":39.916226,
            "lng":116.412688
        },
        "address":"南湾子胡同1号北京香江戴斯酒店",
        "street_id":"1ef6d8865a6870889de32120",
        "uid":"1ef6d8865a6870889de32120",
        "detail_info":{
            "distance":753,
            "tag":"金融;atm"
        }
    },
    {
        "name":"原麦加利银行",
        "location":{
            "lat":39.908533,
            "lng":116.406818
        },
        "address":"东交民巷39",
        "street_id":"6cc9b6851fa53eb715c9057e",
        "uid":"6cc9b6851fa53eb715c9057e",
        "detail_info":{
            "distance":757,
            "tag":"金融;银行"
        }
    }
];

var meet =  {
    "_id" : "999",
    "creater" : {
        username: 'a',
        specialPic: 'a.jpg'
    },
    "target" : {
        username: 'b',
        specialPic: 'b.jpg'
    },
    "status" : "待回复",

    "personLoc" : {
        "lng" : 121.59488830726742,
        "lat" : 31.20935257061497
    },
    "mapLoc": {
        "uid":"82cf55ea33c0f0eefbdc856b",
        "name":"北京银行ATM",
        "address":"北京市东城区东长安街天安门内"
    },
    "specialInfo": {
        "sex" : "男",
        "clothesColor" : "红/紫/粉",
        "clothesStyle" : "纯色",
        "clothesType" : "风衣/大衣",
        "glasses" : "带",
        "hair" : "竖起"
    }
};
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
    if (!(req.body.newUser.username && req.body.newUser.password && req.body.newUser.sex && req.body.newUser.nickname)){
        res.statusCode = 400;
        res.json({result: '用户名,密码,性别,昵称都需要填写!'});
        return;
    }
    res.json({result: req.body.newUser.username});
});

router.put('/login', function(req, res) {
    res.json({result: req.body.username});
});

router.get('/getMeets', function(req, res) {
    res.json({result: meets});
});

router.put('/updateInfo', function(req, res) {
    console.log(req);
    res.json({result: 'ok'});
});

router.get('/getLocs', function(req, res) {
    res.json({result: locs});
});

router.post('/searchTargets', function(req, res) {
    res.json({result: targets});
});

router.get('/getBigPic', function(req, res) {
    res.json({result: ''});
});

router.post('/createMeet', function(req, res) {
    res.json({result: meet});
});

router.put('/decideMeet', function(req, res) {
    res.json({result: meet});
});

router.put('/replyMeet', function(req, res) {
    res.json({result: friend});
});

router.get('/getFriends', function(req, res) {
    res.json({result: friends});
});

router.delete('/deleteFriend', function(req, res) {
    res.json({result: 'ok'});
});

router.get('/getChats', function(req, res) {
    res.json({result: chats});
});

router.post('/sendChatMsg', function(req, res) {
    res.json({result: 'ok'});
});

router.get('/getSpecialInfo', function(req, res) {
    res.json({
        result: {
            specialInfo: specialInfo,
            specialPic: "b.jpg"
        }
    });
});

module.exports = router;
