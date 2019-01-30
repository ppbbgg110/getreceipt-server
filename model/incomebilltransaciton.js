var bill = require('./incomebill');
var mustAddProperty = [
        'time',
        'money',
        'title',
        'content'
];

var determineMustProperty = (item) => {
        for (property in mustAddProperty) {
                if (mustAddProperty[property] in item)
                        continue;
                else
                        return "refuse";
        }
        return "pass";
}

var transToModelType = (oneincomerecord)=>{
        var onerecord={}
        onerecord.time=oneincomerecord.time;
        onerecord.amount=oneincomerecord.money;
        onerecord.platform=oneincomerecord.platform;
        onerecord.content=oneincomerecord.content;
        return onerecord;
}

module.exports.addOneIncomeBillItem = (item, callback) => {
        if(item == null)
                callback('请传入插入数据');
        if(determineMustProperty(item) == "refuse")
                callback('缺少必要属性', null);
        bill.add(transToModelType(item),(err,result)=>{
                if(err) callback(err,null);
                callback(null,result);
        });
}

module.exports.getNowIncomeBillItem = (callback) =>{
        bill.getOneItemByTime(null,null,(err,result)=>{
                if(err) callback(err,null);
                callback(null,result);
        });
}
