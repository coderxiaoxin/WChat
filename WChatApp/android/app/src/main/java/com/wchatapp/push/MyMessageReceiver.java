package com.wchatapp.push;

import android.content.Context;
import android.util.Log;

import com.alibaba.sdk.android.push.MessageReceiver;
import com.alibaba.sdk.android.push.notification.CPushMessage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;

import javax.annotation.Nullable;

public class MyMessageReceiver extends MessageReceiver {
    public MyMessageReceiver() {
        super();
    }

    @Override
    protected void onMessage(Context context, CPushMessage cPushMessage) {
        super.onMessage(context, cPushMessage);
        WritableMap params = Arguments.createMap();
        params.putString("messageId", cPushMessage.getMessageId());
        params.putString("content", cPushMessage.getContent());
        params.putString("title", cPushMessage.getTitle());
        sendEvent(getReactContext(), "onMessage", params);
    }
    @Override
    protected void onNotification(Context context, String s, String s1, Map<String, String> map) {
        super.onNotification(context, s, s1, map);
        WritableMap params = Arguments.createMap();
        params.putString("content", s1);
        params.putString("title", s);
        for (Map.Entry<String, String> entry: map.entrySet()) {
            params.putString(entry.getKey(), entry.getValue());
        }
        sendEvent(getReactContext(), "onNotification", params);
    }
    private void sendEvent(ReactContext context, String eventName, @Nullable WritableMap params) {
        if (context == null) {
            Log.i(TAG, "reactContext==null");
        }else{
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    private  ReactContext getReactContext(){
        return PushModule.getContext();
    }
}
