package com.wchatapp;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.wchatapp.push.PushPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
              new PushPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initPushService(this);
  }
  private static final String TAG = "AppApplication";
  /**
   * 初始化云推送通道
   * @param applicationContext
   */
  private void initPushService(final Context applicationContext) {
    this.createNotificationChannel();
    PushServiceFactory.init(applicationContext);
    final CloudPushService pushService = PushServiceFactory.getCloudPushService();
    pushService.register(applicationContext, new CommonCallback() {
      @Override
      public void onSuccess(String response) {
        Log.i(TAG, "init cloudchannel success");
        //setConsoleText("init cloudchannel success");
      }
      @Override
      public void onFailed(String errorCode, String errorMessage) {
        Log.e(TAG, "init cloudchannel failed -- errorcode:" + errorCode + " -- errorMessage:" + errorMessage);
        //setConsoleText("init cloudchannel failed -- errorcode:" + errorCode + " -- errorMessage:" + errorMessage);
      }
    });
  }

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
      {
        // 通知渠道的id
        String id = "systemmsg";
        // 用户可以看到的通知渠道的名字.
        CharSequence name = "系统消息";
        // 用户可以看到的通知渠道的描述
        String description = "系统消息";
        int importance = NotificationManager.IMPORTANCE_HIGH;
        NotificationChannel mChannel = new NotificationChannel(id, name, importance);
        // 配置通知渠道的属性
        mChannel.setDescription(description);
        // 设置通知出现时的闪灯（如果 android 设备支持的话）
        mChannel.enableLights(true);
        mChannel.setLightColor(Color.RED);
        // 设置通知出现时的震动（如果 android 设备支持的话）
        mChannel.enableVibration(true);
        mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
        //最后在notificationmanager中创建该通知渠道
        mNotificationManager.createNotificationChannel(mChannel);
      }
      {
        // 通知渠道的id
        String id = "usermsg";
        // 用户可以看到的通知渠道的名字.
        CharSequence name = "用户消息";
        // 用户可以看到的通知渠道的描述
        String description = "用户消息";
        int importance = NotificationManager.IMPORTANCE_HIGH;
        NotificationChannel mChannel = new NotificationChannel(id, name, importance);
        // 配置通知渠道的属性
        mChannel.setDescription(description);
        // 设置通知出现时的闪灯（如果 android 设备支持的话）
        mChannel.enableLights(true);
        mChannel.setLightColor(Color.RED);
        // 设置通知出现时的震动（如果 android 设备支持的话）
        mChannel.enableVibration(true);
        mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
        //最后在notificationmanager中创建该通知渠道
        mNotificationManager.createNotificationChannel(mChannel);
      }
    }
  }
}
