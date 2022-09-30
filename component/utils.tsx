import * as constVars from '../component/constVars'

//加速度センサ使用認証
export function deviceMotionRequest() {
  if (navigator.userAgent.match(/iPhone/)) {
      if (DeviceMotionEvent.requestPermission) {
          DeviceMotionEvent.requestPermission().then((permissionState) => {
              if (permissionState === "granted") {
                  constVars.setDevice('iPhone');
                  window.addEventListener("devicemotion", function(event){ motionCatch(event) });
              }
          }).catch((e) => {alert(e);});
      }
  } else {
      if (navigator.userAgent.match(/Android.+Mobile/)) {
          constVars.setDevice('Android');
          // 直接motionCatch(event)とはできない
          window.addEventListener("devicemotion", function(event){ motionCatch(event) });
      }
  }
}

// 四捨五入関数
export function orgRound(value, base) {
  return Math.round(value * base) / base;
}

// 加速度をキャッチする関数
export function motionCatch(event) {
  const tempAclr:object = event.accelerationIncludingGravity; //event.acceleratio;
  constVars.setAclr(tempAclr);
}

// 判定する周期の設定
export const timer = setInterval(displayData, 33);

// 加速度を表示する関数
export function displayData(self:object) {
  const nowAclr = constVars.aclr;
  if (nowAclr.y > constVars.THREATHOLD) {
      if (constVars.device === 'iPhone')
          constVars.setFlagTorS('SlideBack');
      else
          constVars.setFlagTorS('SlideFront');
      self.judge(constVar.icon);
  }
  if (nowAclr.y < - constVars.THREATHOLD) {
      if (constVars.device === 'iPhone')
        constVars.setFlagTorS('SlideFront');
      else  
        constVars.setFlagTorS('SlideBack');
      self.judge(constVar.icon);
  }
}