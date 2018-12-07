import React, { Component } from 'react';
import Store from './Store'

export default class ChatSotre {
    constructor() {
    }


    /**
     key:保存的key值
     object：保存的value
     expires：有效时间，
     */

    static saveExpires(key, object, expires) {

        Store.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: object,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: expires
        });

    }
    static saveIDExpires(key, id, object, expires) {
        Store.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            id: id,
            data: object,
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: expires
        });

    }

    static save(key, object) {
        this.saveExpires(key, object, defaultExpires);
    }

    static _remove(key) {
        // 删除单个数据
        Store.remove({
            key: key,
        });
    }
    static _removeID(key, id) {
        // 删除单个数据
        Store.remove({
            key: key,
            id: id
        });
    }
    static _removeAll() {
        // 移除所有"key-id"数据（但会保留只有key的数据）
        Store.clearMap();
    }

    static _clearDataByKey(key) {
        // !! 清除某个key下的所有数据
        Store.clearMapForKey(key);
    }

    /**
     查询数据
     */

    static _load(key, callBack, errorCallBack) {
        this._idLoad(key, null, null, null, callBack, errorCallBack);
    }

    //有id参数的查询数据
    static _idLoad(key, id, params, someFlag, callBack, errorCallBack) {

        Store.load({
            key: key,
            id: id,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: params,
                someFlag: someFlag,
            },
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    errorCallBack(err.name)
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }
    //没有参数的查询数据
    static _noIdLoad(key, params, someFlag, callBack, errorCallBack) {

        Store.load({
            key: key,
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: false,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: params,
                someFlag: someFlag,
            },
        }).then(ret => {
            callBack(ret);
            return ret;
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    // callBack(err);
                    errorCallBack(err)
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    // 获取某个key下的所有id(仅key-id数据)
    static getIdsForKey(key, callBack, errorCallBack) {
        Store.getIdsForKey(key).then(ids => {
            callBack(ids)
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            errorCallBack(err.name)
        });
    }
    //获取某个key下的所有数据(仅key-id数据)
    static getAllDataForKey(key, callBack, errorCallBack) {
        Store.getAllDataForKey(key).then(users => {
            callBack(users)
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            errorCallBack(err.name)
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    errorCallBack(err.name)
                    break;
                case 'ExpiredError':
                    // TODO
                    this._clearDataByKey(key);
                    errorCallBack(err.name)
                    break;
            }

        });
    }
    //// 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
    static getBatchData(keys) {
        Store.getBatchData(keys)
            .then(results => {
            }).catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                Alert.alert(
                    '提示2',
                    JSON.stringify(err),
                    [],
                    { cancelable: true }
                )

            });
    }
    //根据key和一个id数组来读取批量数据
    static getBatchDataWithIds(key, ids, callBack, errorCallBack) {
        Store.getBatchDataWithIds({
            key: key,
            ids: ids,
        }).then(users => {
            callBack(users)
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            errorCallBack(err.name)
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    errorCallBack(err.name)
                    break;
                case 'ExpiredError':
                    // TODO
                    this._clearDataByKey(key);
                    errorCallBack(err.name)
                    break;
            }

        });
    }
}