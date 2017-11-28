let loadwxjs = ()=> {
  return new Promise(function (resolve, reject) {
    if(!window.wx){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.0.0.js";
      script.onerror = reject;
      document.head.appendChild(script);
      let tmr = setInterval(()=>{
        if(window.wx){
          resolve(wx);
          clearInterval(tmr)
        }
      },100);
    }else{
      resolve(wx);
    }
  })
}

let wxConfig = (shareinfo,wxready)=>{
  if(!shareinfo) return;
  loadwxjs().then(wx=>{
    // console.log(wx);
    wx.config({
      debug: true,
      appId:shareinfo.shareAppId,
      timestamp: shareinfo.shareTime,
      nonceStr: shareinfo.shareNonceStr,
      signature: shareinfo.shareSignature,
      jsApiList: [
       'checkJsApi',
       'onMenuShareTimeline',
       'onMenuShareAppMessage',
       'onMenuShareQQ',
       'onMenuShareWeibo',
       'onMenuShareQZone',
       'hideMenuItems',
       'showMenuItems',
       'hideAllNonBaseMenuItem',
       'showAllNonBaseMenuItem',
       'translateVoice',
       'startRecord',
       'stopRecord',
       'onVoiceRecordEnd',
       'playVoice',
       'onVoicePlayEnd',
       'pauseVoice',
       'stopVoice',
       'uploadVoice',
       'downloadVoice',
       'chooseImage',
       'previewImage',
       'uploadImage',
       'downloadImage',
       'getNetworkType',
       'openLocation',
       'getLocation',
       'hideOptionMenu',
       'showOptionMenu',
       'closeWindow',
       'scanQRCode',
       'chooseWXPay',
       'openProductSpecificView',
       'addCard',
       'chooseCard',
       'openCard'
      ]
    });
    let sharedata = shareinfo.shareData;
    wx.ready(function(){
      wx.onMenuShareTimeline(sharedata);
      wx.onMenuShareAppMessage(sharedata);
      wx.onMenuShareQQ(sharedata);
      wx.onMenuShareWeibo(sharedata);
      wx.onMenuShareQZone(sharedata);
      wx.showOptionMenu();
      if(typeof(wxready)=='function'){
        wxready(wx);
      }
    });
  });
}
export default wxConfig
