
/**
 * Created by Lucy on 2018/8/22.
 */
 import {
    Alert,
} from 'react-native';
import MyStorage from '../store/ChatStore'
let storage;
export default class  common  {
    constructor(props) {
        storage=MyStorage._getStorage();
        global.storage = storage;
    }
    //数组反序
    static reverse(a){
        var b=[];
        var len = a.length;//获取数组的长度
        for (var i = 0; i <len; i++) {
            b[i] = a[len-1-i];
        }
        return b;
    }
    //数组截取
    static subArray(a,index){//index代表开始的数据指标
        var b=[];
        var len = a.length;//获取数组的长度
        var j=0;
        for (var i = index; i <len; i++) {
            b[j] = a[i];
            j++
        }
        return b;
    }
    static getImage(){
        var imageList=[
            require('../../assets/images/1.png'),
            require('../../assets/images/2.png'),
            require('../../assets/images/3.png'),
            require('../../assets/images/4.png'),
            require('../../assets/images/5.png'),
            require('../../assets/images/6.png'),
            require('../../assets/images/7.png'),
            require('../../assets/images/8.png')];
        return imageList;
    }
    //事件处理逻辑
    static onMessage(e,isRead) {
        //先查询有没有这个分类，没有分类添加，有分类不添加

        var icon=parseInt(11*Math.random());//随机图标
        var groupList=JSON.parse(e.content);
        groupList["isRead"]=isRead;
        groupList["icon"]=icon;
        MyStorage._idLoad("type",groupList.group_name,null,null,(groupDetail)=>{
            groupDetail.lastMessage=groupList.msg||"";
            //最后一条的信息重写这个应用的详情
            MyStorage.saveIDExpires(
                "type",
                groupList.group_name,
                groupDetail,
                null
            );
        },(errorData)=>{//全部过期的数据
            //新建的这个分类
            var item={
                "appName":groupList.group_name,
                "appID":groupList.group_name,
                "isNotice":true,//消息勿打扰
                "unReadNum":0,//未读
                "lastMessage":groupList.msg||"",//最后一条数据
                "icon":icon//图标
            }
            MyStorage.saveIDExpires(
                "type",
                groupList.group_name,
                item,
                null
            );
        })
        MyStorage.saveIDExpires(
            groupList.group_name,
            groupList.group_id,
            groupList,
            null
        );
    }
    //通知处理逻辑
    static onNotification(e)
    {
        Alert.alert(
            '提示onNotification',
            "onNotification:" + e.title + ", Content:" + e.content,
            [],
            { cancelable: true }
        )
    }
    //获取分类的文字介绍
    static getGroupDetail(type)
    {
        var info="";
        switch (type)
        {
            case "泉州水利":info="这是泉州水利的介绍哦要说什么，我也不知道";break;
            case "保证金系统":info="这是保证金系统的介绍哦要说什么，我也不知道";break;
            case "住建":info="这是住建的介绍哦要说什么，我也不知道";break;
            case "测试":info="这是测试的介绍哦要说什么，我也不知道";break;
            case "移动推送":info="这是移动推送的介绍哦要说什么，我也不知道";break;
            default:info="这是找不到什么分类哦";break;
        }
        return info;
    }
}
