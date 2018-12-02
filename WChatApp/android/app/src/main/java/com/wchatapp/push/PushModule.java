package com.wchatapp.push;

import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PushModule extends ReactContextBaseJavaModule {
    private static ReactContext context;
    public PushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
    public static ReactContext getContext() {
        return context;
    }
    //模块名，在JavaScript中调用相关方法时需要首先引入MPush模块
    @Override
    public String getName() {
        return "MPush";
    }

    /**
     * 获取设备ID
     * @param callback
     */
    @ReactMethod
    public void getDeviceId(Callback callback) {
        callback.invoke(PushServiceFactory.getCloudPushService().getDeviceId());
    }

    /**
     * 绑定账号
     * @param account
     * @param callback
     */
    @ReactMethod
    public void bindAccount(String account, final Callback callback) {
        PushServiceFactory.getCloudPushService().bindAccount(account, new CommonCallback() {
            @Override
            public void onSuccess(String s) {
                callback.invoke(1,"bind account success");
            }
            @Override
            public void onFailed(String s, String s1) {
                callback.invoke(0,"bind account failed. errorCode:" + s + ", errorMsg:" + s1);
            }
        });
    }
}
