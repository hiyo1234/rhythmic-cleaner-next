
//画面サイズ(固定)
export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 1060;
//　ノーツが落ちてくる角度
export const UNIT_ARRANGE_RADIUS = SCREEN_WIDTH * 0.77;
export const BIAS = 130;

//　検出部マーカのパラメータ
export const MARKER_RADIUS = 70;
export const MARKER_STROKE_WIDTH = 8;
export const MARKER_COODINATE_Y = 9.3;

// ノーツ出現時間(ms)
export const MARKER_APPEARANCE_DELTA = 1000;
//　開始時音楽再生までの時間
export const MUSIC_START_DELAY = 2000;

// 採点基準
export const RATING_TABLE = {
  perfect: {
    score: 1000,
    range: 50, //ms
  },
  great: {
    score: 500,
    range: 70, //ms
  },
  good: {
    score: 100,
    range: 100, //ms
  },
  miss: {
    score: 0,
    range: 130, //ms
  },
};

export const MAX_SCORE = {
  shiningStar: 120099,
  catlife: 329038,
  hyakkaryouran: 363042
}

// 読み取られた加速度の値
export const aclr = {
  x : 0,
  y : 0,
  z : 0
}
export function setAclr(v:object){
  aclr.x = v.x;
  aclr.y = v.y;
  aclr.z = v.z;
}

// 判定する加速度の閾値
export const THREATHOLD = 3;
// タッチかスライドかのフラグ
export let flagTorS = 'Touch'; //SlideFrout, SlideBack
export const setFlagTorS = function(f){
  flagTorS = f;
} 
// デバイスの種類
export let device = 'iPhone';
export const setDevice = function(f){
  device = f;
} 

//
export let self:object;
export const setSelf = function(v:object){
  self = v;
} 
export let icon;
export const setIcon = function(v){
  icon = v;
} 
export let params;
export const setParams = function(v){
  params = v;
} 

//背景の透明度
export const ALPHA = 0.8;
export const ALPHA_TITLE = 1.0;

export const ASSETS = {
  image: {
    twitter_logo: "/image/twitter_logo.png",
    garbage: "/image/grbg.png",
    vacume: "/image/vacume.png",
    logo: "/image/logoC.png",
    bg: "/image/bg2.png",
    bgM: "/image/bg_main.png",
    note4: "/image/note4.png",
    note8: "/image/note8.png",
    note16_2: "/image/note16_2.png",
    title: "/image/title.png",
    bg_title: "/image/bg_title.png",
    play_image: "/image/play_image.png"
  },
  sound: {
    point: "/sound/point.mp3",
    shiningStar: "/sound/shiningStar.mp3",
    catlife: "/sound/catlife.mp3",
    hyakkaryouran: "/sound/hyakkaryouran.mp3",
    hit: "/sound/tamborine.mp3",
    select: "/sound/select.mp3",
    back: "/sound/back2.mp3",
    result: "/sound/result.mp3",
  },
  json: {
    shiningStar: "/json/shiningStar.json",
    catlife: "/json/catlife.json",
    hyakkaryouran: "/json/hyakkaryouran.json",
  }
};
