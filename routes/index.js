var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/HX2');
var async = require("async");

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


var friend3 = {
    creater: {
        username: 'au',
        nickname: 'an',
        alias: 'aa'
    },
    target: {
        username: 'bu',
        nickname: 'bn',
        alias: 'ba'
    },
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
    if (!(req.body.newUser.username && req.body.newUser.password && req.body.newUser.sex && req.body.newUser.nickname && req.body.newUser.cid)){
        res.statusCode = 400;
        res.json({result: '用户名,密码,性别,昵称都需要填写!'});
        return;
    }

    var newUser;

    function callback(err, result) {
        if (err){
            res.statusCode = 400;
            res.json({result: err.toString()});
        }
        else{
            res.json({result: req.body.newUser.username});
        }
    }

    async.waterfall([
            function(next){
                db.get('user').insert(
                    {
                        username: req.body.newUser.username,
                        password: req.body.newUser.password,
                        nickname: req.body.newUser.nickname,
                        sex: req.body.newUser.sex
                    },
                    next
                );
            },
            function(result, next)
            {
                newUser = result;
                //清空同台设备绑定的其他用户
                db.get('info').findAndModify(
                    {
                        cid: {$eq: req.body.newUser.cid}
                    },
                    {
                        $set:
                        {
                            cid: null
                        }
                    },
                    next
                );
            },
            function(result, next){
                db.get('info').insert(
                    {
                        username: req.body.newUser.username,
                        sex: req.body.newUser.sex,
                        cid: req.body.newUser.cid
                    },
                    next
                );
            }
        ],
        callback
    );
});

router.post('/login', function(req, res) {
    db.get('user').find(
        {
            username: req.body.username,
            password: req.body.password
        },
        function(e,docs){
            if (docs.length == 1)
            {
                //清空同台设备绑定的其他用户
                db.get('info').findAndModify(
                    {
                        cid: {$eq: req.body.cid},
                        username: {$ne: req.body.username}
                    },
                    {
                        $set:
                        {
                            cid: null
                        }
                    },
                    function(err, docs1)
                    {
                        if (err){
                            res.statusCode = 400;
                            res.json({result: err.toString()});
                        }
                        else{
                            res.json({result: docs[0].username});
                        }
                    }
                );
            }
            else
            {
                res.statusCode = 400;
                res.json({result: '用户名或密码错误!'});
                return;
            }
        }
    );
});

router.get('/getMeets', function(req, res) {
    db.get('meet').find(
        {
            $or: [
                {"creater.username": req.query.username},
                {"target.username": req.query.username}
            ],
            status: {$ne:"成功"}
        },
        {
            sort: {_id: -1}
        },
        function(err, docs){
            if (err){
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else{
                res.json({result: docs});
            }
        }
    );

});

router.post('/updateInfo', function(req, res){
    db.get('info').findAndModify(
        {username: req.body.username},
        {
            $set: {
                specialInfo: req.body.myInfo.specialInfo,
                specialPic: req.body.myInfo.specialPic,
                updateTime: Date.now(),
                latestLocation: req.body.latestLocation
            }
        },
        {
            new: true
        },
        function(err, doc){
            if (err) {
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else {
                res.json({result: 'ok'});
            }
        }
    );
});

router.post('/searchTargets', function(req, res) {
    var realResult = null;
    var before15Min = Date.now() - 15*60000;
    function finalCallback(err, result){
        if (err) {
            res.statusCode = 400;
            res.json({result: err.toString()});
        }
        else {
            res.json({result: result});
        }
    }
    async.waterfall([
            function(next){
                db.get('info').col.aggregate(
                    [
                        {
                            $geoNear: {
                                near: { type: "Point", coordinates: [ Number(req.body.sendLoc.lng), Number(req.body.sendLoc.lat) ] },
                                distanceField: "latestLocation",
                                maxDistance: 500,
                                query: {
                                    locUpdateTime: {$gt: before15Min},
                                    username:{$ne: req.body.username},
                                    "specialInfo.sex":req.body.meetCondition.specialInfo.sex
                                },
                                //includeLocs: "dist.location",
                                //num: 100,
                                spherical: true
                            }
                        },
                        {
                            $project: {
                                finalTotal: {
                                    $let: {
                                        vars: {
                                            vhair: { $cond: { if: {$eq: ['$specialInfo.hair', req.body.meetCondition.specialInfo.hair]}, then: 1, else: 0 } },
                                            vglasses: { $cond: { if: {$eq: ['$specialInfo.glasses', req.body.meetCondition.specialInfo.glasses]}, then: 1, else: 0 } },
                                            vclothesType: { $cond: { if: {$eq: ['$specialInfo.clothesType', req.body.meetCondition.specialInfo.clothesType]}, then: 1, else: 0 } },
                                            vclothesColor: { $cond: { if: {$eq: ['$specialInfo.clothesColor', req.body.meetCondition.specialInfo.clothesColor]}, then: 1, else: 0 } },
                                            vclothesStyle: { $cond: { if: {$eq: ['$specialInfo.clothesStyle', req.body.meetCondition.specialInfo.clothesStyle]}, then: 1, else: 0 } }
                                        },
                                        in: { $add: [ "$$vhair", "$$vglasses", "$$vclothesType", "$$vclothesColor", "$$vclothesStyle" ] }
                                    }
                                },
                                username: 1,
                                specialPic: 1
                            }
                        },
                        {
                            $match :
                            {
                                finalTotal: {$gte: 4}
                            }
                        },
                        {
                            $sort:
                            {
                                finalTotal: -1
                            }
                        }
                    ],
                    next
                );
            },
            function(result, next){
                realResult = result;
                //随机图片
                var needRanNum = 4 - result.length;
                if (needRanNum > 0)
                {
                    //已有图片
                    var existPics = result.map(function(info) {
                        return info.specialPic;
                    });

                    db.get('info').find(
                        {
                            specialPic: {
                                $exists: true, $nin: existPics,
                                $ne: ""
                            },
                            username:{$ne: req.body.username}
                        },
                        {limit: needRanNum},
                        next
                    );
                }
                else{
                    finalCallback(null, realResult);
                }
            },
            function(result, next)
            {
                var fakeResult = result.map(function(info){
                    return {username: "fake", specialPic: info.specialPic};
                });
                next(null, realResult.concat(fakeResult));
            }
        ],
        finalCallback
    );
});

router.post('/createMeet', function(req, res) {
    function finalCallback(err, result){
        if (err) {
            res.statusCode = 400;
            res.json({result: err.toString()});
        }
        else {
            result.createTime = new Date( parseInt( result._id.toString().substring(0,8), 16 ) * 1000 ).toISOString();
            res.json({result: result});
        }
    }

    if (req.body.status == '待确认')
    {
        async.waterfall([
                function(next){
                    db.get('user').findOne(
                        {
                            username: req.body.creater_username
                        },
                        next
                    );
                },
                function(result, next){
                    db.get('meet').insert(
                        {
                            creater: {
                                username: result.username,
                            },
                            target: null,
                            status: req.body.status,
                            mapLoc: req.body.mapLoc,
                            specialInfo: req.body.specialInfo,
                            personLoc: req.body.personLoc
                        },
                        next
                    );
                }
            ],
            finalCallback
        );
    }
    //待回复
    else
    {
        var tmpSpecialPic;
        async.waterfall([
                function(next){
                    db.get('info').findOne(
                        {
                            username: req.body.target_username
                        },
                        next
                    );
                },
                function(result, next){
                    tmpSpecialPic = result.specialPic;
                    db.get('user').findOne(
                        {
                            username: req.body.target_username
                        },
                        next
                    );
                },
                function(result, next){
                    //确认meet
                    if (req.body.meetId)
                    {
                        db.get('meet').findAndModify(
                            {
                                _id: req.body.meetId
                            }, // query
                            {
                                $set: {
                                    target: {
                                        username: req.body.target_username,
                                        nickname: result.nickname,
                                        specialPic: tmpSpecialPic
                                    },
                                    status: '待回复'
                                }
                            },
                            {
                                new: true
                            },
                            next
                        );
                    }
                    else
                    {
                        db.get('meet').insert(
                            {
                                creater: {
                                    username: req.body.creater_username
                                },
                                target: {
                                    username: req.body.target_username,
                                    nickname: result.nickname,
                                    specialPic: tmpSpecialPic
                                },
                                status: req.body.status,
                                mapLoc: req.body.mapLoc,
                                specialInfo: req.body.specialInfo,
                                personLoc: req.body.personLoc
                            },
                            next
                        );
                    }
                }
            ],
            finalCallback
        );
    }
});

router.post('/replySuccess', function(req, res) {
    function finalCallback(err, doc) {
        if (err){
            res.statusCode = 400;
            res.json({result: err.toString()});
        }
        else{
            res.json({result: doc, meetId: req.body.meetId});
        }
    }

    var tmpSpecialPic;
    async.waterfall([
            function(next){
                db.get('friend').find(
                    {
                        $or: [
                            {
                                "creater.username" : req.body.creater_username,
                                "target.username" : req.body.target_username
                            },
                            {
                                "creater.username" : req.body.target_username,
                                "target.username" : req.body.creater_username
                            }
                        ]
                    },
                    next
                );
            },
            function(result, next)
            {
                if (result.length > 0)
                {
                    res.statusCode = 409;
                    res.json({result: "此人已经是你的朋友"});
                    return;
                }
                else
                {
                    db.get('info').findOne(
                        {
                            username: req.body.creater_username
                        },
                        next
                    );
                }
            },
            function(result, next){
                tmpSpecialPic = result.specialPic;
                db.get('user').findOne(
                    {
                        username: req.body.creater_username
                    },
                    next
                );
            },
            function(result, next){
                //设置meet为成功, 添加creater的specialPic, nickname
                db.get('meet').findAndModify(
                    {
                        _id: req.body.meetId
                    }, // query
                    {
                        $set:
                        {
                            "creater.nickname": result.nickname,
                            "creater.specialPic": tmpSpecialPic,
                            status: '成功'
                        }
                    },
                    { new: true }, // options
                    next
                );
            },
            function(result, next){
                //
                db.get('friend').insert(
                    {
                        creater: result.creater,
                        target: result.target,
                        messages: []
                    },
                    next
                );
            }
        ],
        finalCallback
    );
});

router.get('/getFriends', function(req, res) {
    db.get('friend').find(
        {
            $or: [
                {"creater.username": req.query.username},
                {"target.username": req.query.username}
            ]
        },
        function(err, docs){
            if (err){
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else{
                res.json({result: docs});
            }
        }
    );
});

router.put('/updateLocation', function(req, res) {
    db.get('info').findAndModify(
        {
            username: req.body.username
        }, // query
        {
            $set:
            {
                latestLocation: req.body.latestLocation,
                locUpdateTime: Date.now()
            }
        },
        {}, // options
        function(err, doc) {
            if (err){
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else
            {
                res.json({result: 'ok'});
            }
        });
});

router.get('/existInfo', function(req, res) {
    var now = new Date();
    var currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var currentDateTimeStamp = currentDate.getTime();
    db.get('info').find(
        {
            username: req.query.username,
            updateTime: {$gt:currentDateTimeStamp}
        },
        function(err, docs){
            if (err){
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else
            {
                if (docs.length > 0)
                {
                    res.json({result: 'yes'});
                }
                else
                {
                    res.json({result: 'no'});
                }
            }
        }
    );
});

router.get('/getInfo', function(req, res) {
    var now = new Date();
    var currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var currentDateTimeStamp = currentDate.getTime();
    db.get('info').find(
        {
            username: req.query.username,
            updateTime: {$gt:currentDateTimeStamp}
        },
        function(err, docs){
            if (err){
                res.statusCode = 400;
                res.json({result: err.toString()});
            }
            else{
                if (docs.length == 0)
                {
                    db.get('user').findOne(
                        {
                            username: req.query.username
                        },
                        function(err, doc){
                            if (err) {
                                res.statusCode = 400;
                                res.json({result: err.toString()});
                            }
                            else
                            {
                                res.json(
                                    {
                                        result: {
                                            "specialInfo": {
                                                "sex": doc.sex,
                                                "clothesColor": null,
                                                "clothesStyle": null,
                                                "clothesType": null,
                                                "glasses": null,
                                                "hair": null
                                            },
                                            specialPic: null
                                        }
                                    }
                                );
                            }

                        }
                    );
                }
                else
                {
                    res.json({
                        result: docs[0]
                    });
                }
            }
        }
    );
});


router.get('/getBigPic', function(req, res) {
    res.json({result: ''});
});

router.post('/uploadSpecialPic', function(req, res){
    res.json({result: req.files.avatar.name});
});

router.get('/getLocs', function(req, res) {
    res.json({result: locs});
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
module.exports = router;
