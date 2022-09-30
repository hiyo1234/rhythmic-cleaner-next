import * as constVars from '../component/constVars'

export function setPhina(){

phina.globalize();

phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    this.backgroundColor = params.backgroundColor;
    constVars.setParams(params);
    SoundManager.volume = 0.15;
    SoundManager.musicVolume = 0.15;
    const self = this;

    const bg = Sprite('bg_title').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = constVars.ALPHA_TITLE;

    const bg_title = Sprite('title')
    .setPosition(this.gridX.center(), this.gridY.center())
    .setScale(0.6, 0.6)
    .addChildTo(this);

    Sprite('logo').addChildTo(this).setPosition(90, 80).setScale(0.4, 0.4);

    // PathShape({
    //   stroke: "magenta",
    //   strokeWidth: 1,
    //   paths: [Vector2(this.gridX.span(8), this.gridY.span(16)), 
    //     Vector2(this.gridX.span(8), this.gridY.span(4.5))]
    // }).addChildTo(this);
    // PathShape({
    //   stroke: "magenta",
    //   strokeWidth: 5,
    //   paths: [Vector2(this.gridX.span(0), this.gridY.span(16)), 
    //     Vector2(this.gridX.span(7.5), this.gridY.span(4.5))]
    // }).addChildTo(this);
    // PathShape({
    //   stroke: "magenta",
    //   strokeWidth: 5,
    //   paths: [Vector2(this.gridX.span(16), this.gridY.span(16)), 
    //     Vector2(this.gridX.span(8.5), this.gridY.span(4.5))]
    // }).addChildTo(this);


    // const intervalId = setInterval(() =>{
    //   var x = Math.randint(95, this.gridX.width-95);
    //   var y = 300;
    //   TitleNotes(x,y, this).group.addChildTo(this);
    // }, 700);


    Label({
      text: "リズム De! 掃除機",
      fill: "white",
      fontSize: 70,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.span(3) + 25)
    .addChildTo(this);

    const playMethodGroup = DisplayElement().setPosition(this.gridX.span(13) - 10, this.gridY.span(1) + 15).addChildTo(this);
    const playMethodButton = RectangleShape({
      width: 220,
      height: 80,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 7,
      cornerRadius: 16
    }).addChildTo(playMethodGroup).setInteractive(true);
    Label({
      text: "遊び方",
      fontSize: 48,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(playMethodGroup);
    playMethodButton.onpointstart = function() {   
      self.exit({nexLabel: 'playMethod'})
    };

    const touchLabelGroup = DisplayElement().setPosition(this.gridX.center(), this.gridY.span(14)- 30).addChildTo(this);
    const nextButton = RectangleShape({
      width: 450,
      height: 150,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 15,
      cornerRadius: 70,
    }).addChildTo(touchLabelGroup).setInteractive(true);
    const touchLabel = Label({
      text: "Tap to start",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(touchLabelGroup);
    touchLabel.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 900)
    .to({alpha: 1}, 900);


    // モバイルでの再生制限アンロックのため、画面タッチ時にSoundを無音再生
    // enterイベント自体は1つのみしか発火されていない
    nextButton.onclick = function() {
      var event = "touchstart";
      var dom = self.app.domElement;
      dom.addEventListener(event, (function() {
        return function f() {
          var context = phina.asset.Sound.getAudioContext();
          var buf = context.createBuffer(1, 1, 22050);
          var src = context.createBufferSource();
          src.buffer = buf;
          src.connect(context.destination);
          src.start(0);
          dom.removeEventListener(event, f, false);
        }
      }()), false);
      // シーン遷移
      SoundManager.play('point');
      self.exit({nextLabel: 'selectMusic'});
    };
  },
});

//////////////////////////////////////////////////////////////////////

phina.define("PlayMethodScene", {
  superClass: "DisplayScene",

  init: function (params) {
    this.superInit(params);
    this.backgroundColor = "black";
    const self = this;

    const playMethodGroup = DisplayElement()
      .setPosition(this.gridX.center(), this.gridY.span(1))
      .addChildTo(this);
    const playMethodButton = RectangleShape({
      width: 220,
      height: 80,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 7,
      cornerRadius: 16,
    })
      .addChildTo(playMethodGroup)
      .setInteractive(true);
    Label({
      text: "遊び方",
      fontSize: 48,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(playMethodGroup);

    Sprite('play_image').addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5.5)).setScale(0.55, 0.55);

    const textGroup = DisplayElement()
    .setPosition(this.gridX.center(), this.gridY.span(11.3))
    .addChildTo(this);

    RectangleShape({
      width: 600,
      height: 260,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 10,
      cornerRadius: 16,
    })
      .addChildTo(textGroup)
      .setPosition(0, 10);

    Label({
      text: "1. スマホを掃除機に取り付けよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-285, -75)
      .addChildTo(textGroup);

    Label({
      text: "2. ノーツに合わせて(矢印付きのものはその方向に)\n    掃除機をスライドさせよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-285, 0)
      .addChildTo(textGroup);

    Label({
      text: "3. 掃除機の音がうるさい場合は\n    イヤホンをつけよう",
      fill: "white",
      fontSize: 25,
      align: "left",
    })
      .setPosition(-285, 85)
      .addChildTo(textGroup);

    const prevButtonGroup = DisplayElement()
      .setPosition(this.gridX.center(), this.gridY.span(14.5))
      .addChildTo(this);
    const prevButton = RectangleShape({
      width: 240,
      height: 100,
      fill: "black",
      stroke: "cyan",
      strokeWidth: 10,
      cornerRadius: 45,
    }).addChildTo(prevButtonGroup);
    prevButton.setInteractive(true);
    prevButton.onpointstart = function () {
      // SoundManager.play('title_music');
      // self.app.pushScene(TitleScene(params));
      self.exit();
    };
    Label({
      text: "戻る",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(prevButtonGroup);
  },
});


//////////////////////////////////////////////////////////////////////

phina.define('SelectMusicScene', {
  superClass: 'DisplayScene',

  init: function(params) {
    this.superInit(params);
    const self = this;
    let music = "";
    const num = [];
    const labels = [];
    const lines = [];
    let selectFlag = false;
    let circleY = 0;
    self.count = 0;
    this.mode = 'normal';

    function set(nowNum) {
      self.mode = 'normal';
      self.circleRightText.text = '易';
      self.circleRight.stroke = 'cyan';
      self.circleRightText.stroke = "cyan";
      selectFlag = true;
      circleGroup.visible = true;
      nextLabel.fill = "white";
      SoundManager.stopMusic();
      for(var i=0; i<3; i++){
        if(i === nowNum) {
          num[i].fill = "white";
          labels[i].fill = "white";
          lines[i].stroke = "cyan";
        }
        else{
          num[i].fill = "white";
          labels[i].fill = "white";
          lines[i].stroke = "darkcyan";
        }
      }

      if(nowNum === 0)
        circleY = 335;
      else if(nowNum === 1)
        circleY = 485;
      else 
        circleY = 635;
      circleGroup.setPosition(0, circleY);

      if(nowNum === 0)
        music = "shiningStar";
      else if(nowNum === 1)
        music = "catlife";
      else
        music = "hyakkaryouran";
      SoundManager.playMusic(music, null, false);
    }

    function setMode() {
      SoundManager.play('select');
      if (self.mode === 'normal') {
        self.mode = 'hard';
        self.circleRightText.text = '難';
        self.circleRight.stroke = 'magenta';
        self.circleRightText.stroke = "magenta";
      }
      else {
        self.mode = 'normal';
        self.circleRightText.text = '易';
        self.circleRight.stroke = 'cyan';
        self.circleRightText.stroke = "cyan";
      }
    }

    const bg = Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = constVars.ALPHA;

    Label({
      text: "曲・難易度を\n選択して下さい",
      fill: "white",
      fontSize: 60,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.span(2))
    .addChildTo(this);

    const circleGroup = DisplayElement().setVisible(false).addChildTo(this);
    self.circleLeft = Sprite('logo').setPosition(60, 0)
    .addChildTo(circleGroup).setScale(0.35, 0.35);
    self.circleRight = RectangleShape({
      width: 80,
      height: 80,
      fill: null,
      stroke: 'cyan',
      strokeWidth: 5,
    }).addChildTo(circleGroup).setPosition(580, 0).setInteractive(true);
    self.circleRight.on("pointstart", function() {   
      setMode();
    });
    self.modeLabel = Label({
      text: "難易度",
      fill: "white",
      fontSize: 33,
      stroke: "cyan",
      strokeWidth: 2,
    }).addChildTo(circleGroup).setPosition(580, -63);
    self.circleRightText = Label({
      text: "易",
      fill: "white",
      fontSize: 50,
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(circleGroup).setPosition(580, 0);
    self.circleLeft.tweener.clear()
    .setLoop(true)
    .to({alpha: 0}, 900)
    .to({alpha: 1}, 900);

    const songGroup = DisplayElement().setPosition(this.gridX.center(), this.gridY.span(7.3)).addChildTo(this);
    PathShape({
      stroke: "cyan",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(-8), this.gridY.span(-3.7)), 
        Vector2(this.gridX.span(8), this.gridY.span(-3.7))]
    }).addChildTo(songGroup);
    PathShape({
      stroke: "cyan",
      strokeWidth: 5,
      paths: [Vector2(this.gridX.span(-8), this.gridY.span(4.0)), 
        Vector2(this.gridX.span(8), this.gridY.span(4.0))]
    }).addChildTo(songGroup);

    const point1 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, -150).setInteractive(true);
    num.push(Label({
      text: "1.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, -150));
    labels.push(Label({
      text: "Shining Star",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, -150));
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, -100), 
        Vector2(200, -100)]
    }).addChildTo(songGroup));
    point1.on("pointstart", function() {   
      set(0);
    });

    const point2 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 0).setInteractive(true);
    num.push(Label({
      text: "2.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 0));
    labels.push(Label({
      text: "Cat life",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(35, 0));
    labels[1].setInteractive(true);
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, 50), 
        Vector2(200, 50)]
    }).addChildTo(songGroup));
    labels[1].on("pointstart", function() {   
      set(1);
    });
    point2.on("pointstart", function() {   
      set(1);
    });
    
    const point3 = RectangleShape({
      width: 400,
      height: 100,
      fill: null,
      strokeWidth: 0,
    }).addChildTo(songGroup).setPosition(0, 150).setInteractive(true);
    num.push(Label({
      text: "3.",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(-175, 150));
    labels.push(Label({
      text: "百花繚乱",
      fontSize: 52,
      fill: "white",
      strokeWidth: 3,
    }).addChildTo(songGroup).setPosition(40, 150));
    labels[2].setInteractive(true);
    lines.push(PathShape({
      stroke: "darkcyan",
      strokeWidth: 5,
      paths: [Vector2(-200, 200), 
        Vector2(200, 200)]
    }).addChildTo(songGroup));
    point3.on("pointstart", function() {   
      set(2);
    });

    const nextButtonGroup = DisplayElement().setPosition(this.gridX.span(12) - 20, this.gridY.span(14)- 30).addChildTo(this);
    const nextButton = RectangleShape({
      width: 240,
      height: 100,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
    }).addChildTo(nextButtonGroup);
    nextButton.setInteractive(true);
    nextButton.onpointstart = function() {
      if(selectFlag){
        SoundManager.stopMusic();
        SoundManager.play('point');
        self.exit({
          music: music,
          mode: self.mode,
        });
      }
      else{
        self.app.pushScene(pauseScene());
      }
    };
    const nextLabel = Label({
      text: "OK",
      fontSize: 60,
      fill: "gray",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(nextButtonGroup);

    const prevButtonGroup = DisplayElement().setPosition(this.gridX.span(4) + 20, this.gridY.span(14)- 30).addChildTo(this);
    const prevButton = RectangleShape({
      width: 240,
      height: 100,
      fill: 'black',
      stroke: 'cyan',
      strokeWidth: 10,
    }).addChildTo(prevButtonGroup);
    prevButton.setInteractive(true);
    prevButton.onpointstart = function() {
      SoundManager.stopMusic();
      SoundManager.volume = 0.5;
      SoundManager.play('back');
      SoundManager.volume = 0.15;
      self.exit({nextLabel: 'title'});
    };
    Label({
      text: "戻る",
      fontSize: 60,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 3,
    }).addChildTo(prevButtonGroup);

  },
});

phina.define("pauseScene", {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    this.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    const self = this;
    
    Label({
      text: "開始するには曲を選択して下さい",
      fill: "white",
      fontSize: 35,
      stroke: "cyan",
      strokeWidth: 3,
    })
    .setPosition(this.gridX.center(), this.gridY.center(-1))
    .addChildTo(this);

    Button({
      width: 270,
      text: "曲選択に戻る",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    }).addChildTo(this)
    .setPosition(this.gridX.center(), this.gridY.center(1))
    .onpush = function () {
        self.exit();
    };
  },
});

//////////////////////////////////////////////////////////////////////
phina.define('ResultScene2', {
  superClass: 'DisplayScene',

  init: function(params) {
    // 親クラス初期化
    this.superInit(params);
    // 背景色
    this.backgroundColor = 'black';
    this.rank = '';
    self = this;  

    const rank_score = params.result_score/constVars.MAX_SCORE[params.music_title]

    if (rank_score > 0.8){
      this.rank = "S";
    }else if(rank_score > 0.6){
      this.rank = "A";
    }else if(rank_score> 0.4){
      this.rank = "B";
    }else{
      this.rank = "C";
    }


    const bg = Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = constVars.ALPHA;


    //結果表示の曲名変換
    let text1;
    if(params.music_title　===　"shiningStar"){
      text1="Shining Star";
    }else if(params.music_title === "catlife"){
      text1="Cat life";
    }else{
      text1="百花繚乱"
    }

    // ラベル
    Label({
      text: text1,
      fontSize: 60,
      fill: 'white',
      stroke: 'cyan',
      strokeWidth: 5
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(2));

    Label({
      text: `score: ${params.result_score}`,
      fontSize: 60,
      fill: 'cyan',
      stroke: 'white',
      strokeWidth: 8
    }).addChildTo(this).setPosition(this.gridX.span(10), this.gridY.span(4.2));

    Label({
      text: this.rank,
      fontSize: 100,
      fill: 'magenta',
      stroke: 'white',
      strokeWidth: 10
    }).addChildTo(this).setPosition(this.gridX.span(3.5), this.gridY.span(4));

    PathShape({
      paths:[
          Vector2(-300, 0),
          Vector2(300, 0)
      ]
  }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5));

  //スコア詳細
    ScoreView("perfect : ", params.perfect_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(6));
    ScoreView("great : ", params.great_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(7.5));
    ScoreView("good : ", params.good_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(9));
    ScoreView("miss : ", params.miss_times).group.addChildTo(this).setPosition(this.gridX.span(7), this.gridY.span(10.5));


    //タイトル遷移ボタン
    Button({
      text: 'もう一度遊ぶ',
      fontColor: 'white',
      strokeWidth:10,
      stroke:"cyan",
      fill: "black",
      width: 300,
      cornerRadius:40
    })
    .setOrigin(0.5, 0.5)
    .setPosition(this.gridX.span(5), this.gridY.span(12.5))
    .addChildTo(this)
    .onpointstart=function() {
      SoundManager.volume = 0.5;
      SoundManager.play('back');
      SoundManager.volume = 0.15;
      self.exit(); // 自分を渡す
    };

    const twitter_group = DisplayElement().addChildTo(this).setPosition(this.gridX.span(12), this.gridY.span(12.5));
    // twitterシェアボタン
    const shareButton = phina.ui.Button({
      text: "twitter",
      fontSize: 30,
      width: 230,
      height: 54,
      cornerRadius:25
    })
    .setPosition(this.gridX.center(), this.gridY.span(14.5))
    .addChildTo(twitter_group)

    const twitter_button = CircleShape({
      fill: "#00acee"
    })
    .addChildTo(twitter_group)
    // .setPosition(this.gridX.center(),this.gridY.center());
    twitter_button.setInteractive(true);
    twitter_button.onpointstart = function() {
      const text = '{0}\nScore: {1}\n'.format("リズムDe!掃除機",params.result_score);
      const url = phina.social.Twitter.createURL({
        text: text,
        hashtags: ["リズムDe掃除機", "技育展"],
        url: params.url// 指定がない場合はlocation.hrefが代入される
      });

    // 新規タブで開く場合
    const childWindow = window.open('about:blank');
    childWindow.location.href = url;
  
    };

    const twitter_image = Sprite('twitter_logo')
    .addChildTo(twitter_group)
    twitter_image.height = 30;
    twitter_image.width = 30;
  },

  // update: function() {
  //   // 背景のループ処理
  //   var first = this.bgGroup.children.first;
  //   if (first.right < 0) {
  //     first.addChildTo(this.bgGroup);
  //     this.bgGroup.children.last.left = this.bgGroup.children.first.right;
  //   }
  // },

});
//////////////////////////////////////////////////////////////////////


//mainシーン
phina.define("MainScene", {
  superClass: "DisplayScene",

  init: function (options) {
    this.superInit(options);
    const music = options.music;
    const self = this;
    const gx = this.gridX;
    const gy = this.gridY;
    const AM = phina.asset.AssetManager;
    // var beatmap = DEBUG_BEATMAP;
    const beatmap = AM.get("json", music).data;

    // タイマーのセット
    this.elapsedTime = 0; // 経過時間
    this.gameTime = 0 - constVars.MUSIC_START_DELAY + beatmap.offset; // 判定用時間
    //スコア
    this.totalScore = 0;
    this.perfect_times = 0;
    this.great_times = 0;
    this.good_times = 0;
    this.miss_times = 0;
    //コンボ
    this.combo = 0;

    this.rating_ratio = 1;


    const bg = Sprite('bgM').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    bg.alpha = constVars.ALPHA;

    PathShape({
      stroke: "gray",
      strokeWidth: 10,
      paths: [
        Vector2(0, gy.span(2) + this.gridY.span(constVars.MARKER_COODINATE_Y)),
        Vector2(this.gridX.width, gy.span(2) + this.gridY.span(constVars.MARKER_COODINATE_Y)),
      ],
    }).addChildTo(this);

    this.gauge = Gauge({
      x: this.gridX.center(), y: this.gridY.span(2),
      width: 400,
      height: 30,
      cornerRadius: 10,
      maxValue: constVars.MAX_SCORE[music] * 0.8,
      value: 0,
      fill: 'white',
      gaugeColor: 'cyan',
      stroke: 'silver',
      strokeWidth: 5,
    }).addChildTo(this).on("enterframe", function () {
      this.value = self.totalScore;
    });


    const vacume = Sprite('vacume').addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(14.7));
    vacume.width = 500;
    vacume.height = 300;


    // 時間が来たら音楽流す
    this.one("musicstart", function () {
      SoundManager.playMusic(music, null, false);
    });


    // 判定部マーカの表示
    const icon = UnitIcon()
      .setPosition(
        gx.center(),
        gy.span(2) + this.gridY.span(constVars.MARKER_COODINATE_Y)
      )
      .addChildTo(this);
      constVars.setIcon(icon);
    //タップ判定=最終的に消す
    icon.onpointstart = () => {
      constVars.setFlagTorS('Touch');
      this.judge(icon);
    }

    // 譜面の展開
    this.markerGroup = DisplayElement()
      .setPosition(gx.center(), gy.span(2))
      .addChildTo(this);
    beatmap.notes.forEach((note) => {
      if(options.mode === 'normal') {
        TargetMarker(note.targetTime, 0).group.addChildTo(
          this.markerGroup
        );
      }
      else {
        TargetMarker(note.targetTime, note.direction).group.addChildTo(
          this.markerGroup
        );
      }
    });


    // score表示
    this.scoreLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "cyan",
      fill: "white",
      strokeWidth: 10,
      fontSize: 70,
    })
      .setPosition(gx.center(), gy.span(3))
      .addChildTo(this)
      .on("enterframe", function () {
        self.totalScore = Math.round(self.totalScore);
        this.text = self.totalScore;
      });


    // combo表示
    this.comboLabel = Label({
      text: 0,
      textAlign: "center",
      stroke: "cyan",
      fill: "white",
      strokeWidth: 10,
      fontSize: 70,
    })
      .setPosition(gx.span(13), gy.span(6))
      .addChildTo(this)
      .on("enterframe", function () {
        this.text = self.combo;
      });
    this.comboview = Label({
      text: "COMBO",
      textAlign: "center",
      stroke: "black",
      fill: "white",
      strokeWidth: 10,
      fontSize: 40,
    })
      .setPosition(gx.span(13), gy.span(7))
      .addChildTo(this);


    // // 加速度表示(デバッグ用)
    // var aclr_label = Label(orgRound(aclr.y, 10).toString()).addChildTo(this);
    // aclr_label.fontSize = 48;
    // aclr_label.fill = "white";
    // aclr_label.setPosition(gx.span(2), gy.span(4));
    // aclr_label.update = function () {
    //   this.text = orgRound(aclr.y, 10).toString();
    // };


    // ポーズボタン
    Button({
      text: "PAUSE",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    })
      .addChildTo(this)
      .setOrigin(1, 0)
      .setPosition(this.width, 0).onpush = function () {
      SoundManager.pauseMusic();
      // ポーズシーンをpushする
      self.app.pushScene(MyPauseScene());
    };


    // 結果画面への遷移ボタン
    Button({
      text: "RESULT",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    })
      .setOrigin(1, 0)
      .setPosition(216, 0)
      .addChildTo(this).onpointstart = function () {
      SoundManager.stopMusic();
      SoundManager.volume = 0.5;
      SoundManager.play('result');
      SoundManager.volume = 0.15;
      self.exit({
        result_score: self.totalScore,
        perfect_times: self.perfect_times,
        great_times: self.great_times,
        good_times: self.good_times,
        miss_times: self.miss_times,
        music_title: music
      }); // 自分を渡す
    };
  },


  update: function (app) {
    // タイマー加算
    this.elapsedTime += app.deltaTime;
    this.gameTime += app.deltaTime;

    // ゲームスタートまでの猶予
    if (this.has("musicstart") && this.elapsedTime > constVars.MUSIC_START_DELAY) {
      this.flare("musicstart");
    }

    // マーカー描画
    const markers = this.markerGroup.children;
    markers.forEach((m) => {
      if (!m.isAwake) return;

      const time = this.gameTime;
      var rTime = m.targetTime - time; // ノーツの出現予定時間 - 音楽再生以降の経過時間

      if (rTime < constVars.MARKER_APPEARANCE_DELTA) {
        // マーカーの位置比率や縮小率（倍率）を計算する
        // ratioはアイコンに近いほど1.0に近づく
        const ratio =
          (time - (m.targetTime - constVars.MARKER_APPEARANCE_DELTA)) /
          constVars.MARKER_APPEARANCE_DELTA;
        const distance = constVars.BIAS + constVars.UNIT_ARRANGE_RADIUS * ratio;

        m.setVisible(true)
          .setPosition(m.vector.x * distance, m.vector.y * distance)
          .setScale(ratio, ratio);
      }

      // 通りすぎたノーツをmiss判定とする処理
      if (constVars.RATING_TABLE["miss"].range < -rTime) {
        this.reaction(m, "miss");
        this.miss_times += 1;
        this.combo = 0;
        //スコアの最大値の算出
        // this.totalScore *= 1.1;
        // this.totalScore += RATING_TABLE["perfect"].score;
    
      }
    });
  },

  // 判定処理
  judge: function (unitIcon) {
    const time = this.gameTime;

    // 判定可能マーカーを探索
    const markers = this.markerGroup.children;
    markers.some((m) => {
      if (!m.isAwake) return; 
      // マーカーが有効かつtrackIdが一致、かつ判定範囲内
      // 判定が狭い順に判定し、該当したらループ拔ける
      const delta = Math.abs(m.targetTime - time);
      if (delta <= constVars.RATING_TABLE["perfect"].range) {
        if (constVars.flagTorS === 'Touch' || m.direction === 0 
          || constVars.flagTorS === 'SlideFront' && (m.direction === 1)
          || constVars.flagTorS === 'SlideBack' && (m.direction === -1)) {
          unitIcon.fireEffect();
          SoundManager.play("hit");
          this.reaction(m, "perfect");
          this.perfect_times += 1;
          this.combo_func();
          this.effect_func('perfect');
          return true;
        }
        else {
          this.reaction(m, "miss");
          this.miss_times += 1;
          this.combo = 0;
          return true;
        }
      }
      if (delta <= constVars.RATING_TABLE["great"].range) {
        if (constVars.flagTorS === 'Touch' || m.direction === 0 
          || constVars.flagTorS === 'SlideFront' && (m.direction === 1)
          || constVars.flagTorS === 'SlideBack' && (m.direction === -1)) {
          unitIcon.fireEffect();
          SoundManager.play("hit");
          this.reaction(m, "great");
          this.great_times += 1;
          this.combo_func();
          this.effect_func('great');
          return true;
        }
        else {
          this.reaction(m, "miss");
          this.miss_times += 1;
          this.combo = 0;
          return true;
        }
      }
      if (delta <= constVars.RATING_TABLE["good"].range) {
        if (constVars.flagTorS === 'Touch' || m.direction === 0 
          || constVars.flagTorS === 'SlideFront' && (m.direction === 1)
          || constVars.flagTorS === 'SlideBack' && (m.direction === -1)) {
          unitIcon.fireEffect();
          SoundManager.play("hit");
          this.reaction(m, "good");
          this.good_times += 1;
          this.combo_func();
          return true;
        }
        else {
          this.reaction(m, "miss");
          this.miss_times += 1;
          this.combo = 0;
          return true;
        }
      }
      if (delta <= constVars.RATING_TABLE["miss"].range) {
        this.reaction(m, "miss");
        this.miss_times += 1;
        this.combo = 0;
        return true;
      }
    });
  },

// bonusエフェクトの表示
  combo_func: function () {
    this.combo += 1;
    if (this.combo > 1) {
      RateLabel({ text: "BONUS ×1.1", fontSize: 40 })
        .setPosition(this.gridX.center(), this.gridY.span(4))
        .addChildTo(this);
    }
  },

  effect_func: function (status) {
    const self = this;

    const noteA = Sprite('note4')
    .setPosition(self.gridX.center(3), self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y))
    .setVisible(false)
    .addChildTo(self);
    noteA.tweener.set({ scaleX: 0.3, scaleY: 0.3, alpha: 1, rotation: -10, visible:true })
    .to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 10, x:self.gridX.center(5), y:self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y - 4)}, 700)
    .wait(100)
    .call(function () {
      noteA.remove();
    }, this);

    const noteB = Sprite('note16_2')
    .setPosition(self.gridX.center(-3), self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y))
    .setVisible(false)
    .addChildTo(self);
    noteB.tweener.set({ scaleX: 0.3, scaleY: 0.3, alpha: 1, rotation: -10, visible:true })
    .to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 10, x:self.gridX.center(-5), y:self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y - 4)}, 700)
    .wait(100)
    .call(function () {
      noteB.remove();
    }, this);

    if(status === 'perfect') {
      const noteC = Sprite('note16_2')
      .setPosition(self.gridX.center(4), self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y + 1))
      .setVisible(false)
      .addChildTo(self);
      noteC.tweener.set({ scaleX: 0.3, scaleY: 0.3, alpha: 1, rotation: -10, visible:true })
      .to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 10, x:self.gridX.center(6), y:self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y - 2)}, 700)
      .wait(100)
      .call(function () {
        noteC.remove();
      }, this);
    }

    if(status === 'perfect') {
      const noteD = Sprite('note8')
      .setPosition(self.gridX.center(-4), self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y + 1))
      .setVisible(false)
      .addChildTo(self);
      noteD.tweener.set({ scaleX: 0.3, scaleY: 0.3, alpha: 1, rotation: -10, visible:true })
      .to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 10, x:self.gridX.center(-6), y:self.gridY.span(1) + self.gridY.span(constVars.MARKER_COODINATE_Y - 2)}, 700)
      .wait(100)
      .call(function () {
        noteD.remove();
      }, this);
    }
  },

  //判定処理結果表示関数
  reaction: function (marker, rating) {
    // マーカー不可視化
    marker.isAwake = false;
    marker.visible = false;

    RateLabel({ text: rating.toUpperCase(), fontSize: 60 })
      .setPosition(this.gridX.center(), this.gridY.center())
      .addChildTo(this);
      if (rating == 'miss'){
        this.rating_ratio = 1.0;
      }else{
        this.rating_ratio *= 1.1;
      }

      this.totalScore += constVars.RATING_TABLE[rating].score * this.rating_ratio;
  },
});

phina.define("MyPauseScene", {
  superClass: "DisplayScene",
  init: function () {
    this.superInit(constVars.params);
    this.backgroundColor = "rgba(0, 0, 0, 0.7)";
    const self = this;

    Button({
      text: "再開する",
      stroke: "cyan",
      strokeWidth: 10,
      fill: "black",
    }).addChildTo(this)
    .setPosition(this.gridX.center(), this.gridY.center())
    .onpush = function () {
        SoundManager.resumeMusic();
        self.exit();
    };
  },
});

//////////////////////////////////////////////////////////////////////////////////

//判定部マーカ
phina.define("UnitIcon", {
  superClass: "phina.display.CircleShape",

  init: function () {
    this.superInit({
      radius: constVars.MARKER_RADIUS,
      strokeWidth: constVars.MARKER_STROKE_WIDTH,
      stroke: "red",
      fill: false,
    });
    this.setInteractive(true);
  },

  //エフェクト発火関数
  fireEffect: function () {
    EffectWave().addChildTo(this);
  },
});

//判定エフェクト
phina.define("EffectWave", {
  superClass: "phina.display.CircleShape",

  init: function () {
    this.superInit({
      radius: constVars.MARKER_RADIUS,
      stroke: false,
      fill: "white",
    });

    this.tweener
      .to({ scaleX: 1.7, scaleY: 1.7, alpha: 0 }, 250)
      .call(function () {
        this.remove();
      }, this);
  },
});

//ノーツ
phina.define("TargetMarker", {
  init: function (targetTime, direction) {
    this.group = DisplayElement();
    this.marker = Sprite("garbage").addChildTo(this.group);
    this.marker.scaleX = 0.6;
    this.marker.scaleY = 0.6;
    this.arrow = null;
    if (direction === 1)
      this.arrow = Arrow(0).group.addChildTo(this.group);
    else if (direction === -1)
      this.arrow = Arrow(1).group.addChildTo(this.group);

    this.group.visible = false;
    this.group.scaleX = this.scaleY = 0;
    this.group.isAwake = true;
    this.group.targetTime = targetTime;
    this.group.vector = phina.geom.Vector2(0, 1);
    this.group.direction = direction;
  },
});

//矢印オブジェクト
phina.define("Arrow", {
  init: function (turn) {
    this.group = DisplayElement();
    this.triangle = TriangleShape({
      fill: "red",
      strokeWidth: 0,
      radius: 40,
    })
      .addChildTo(this.group)
      .setPosition(0, 0);
    this.rectangle = RectangleShape({
      width: 22,
      height: 65,
      fill: "red",
      strokeWidth: 0,
    })
      .addChildTo(this.group)
      .setPosition(0, 30);
    this.group.setRotation(180 * turn);
    if (turn) this.group.setPosition(0, 12);
    else this.group.setPosition(0, -12);
  },
});

//文字エフェクト
phina.define("RateLabel", {
  superClass: "phina.display.Label",

  init: function (textParam) {
    this.superInit({
      text: textParam.text,
      fontSize: textParam.fontSize,
      strokeWidth: 8,
      fill: "pink",
      stroke: "white",
    });

    this.tweener
      .set({ scaleX: 0.2, scaleY: 0.2, alpha: 0 })
      .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130, "easeOutCirc")
      .wait(250)
      .to({ alpha: 0 }, 100)
      .call(function () {
        this.remove();
      }, this);
  },
});

//スコア詳細
phina.define("ScoreView", {
  init: function (title, score) {
    this.group = DisplayElement();
    this.label1 = Label({
      text: title,
      // text: params.perfect_times,
      fontSize: 40,
      fill: "white",
      stroke: "cyan",
      strokeWidth: 5,
    })
      .addChildTo(this.group)
      .setPosition(0, 0);
    this.label2 = Label({
      text: score,
      // text: params.perfect_times,
      fontSize: 40,
      fill: "white",
    })
      .addChildTo(this.group)
      .setPosition(150, 0);
    // Label({
    //   text: score,
    //   // text: params.perfect_times,
    //   fontSize: 60,
    //   fill: 'red',
    // }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  },
});

//タイトルのノーツ
phina.define("TitleNotes", {
  init: function (x, y, scene) {
    this.group = DisplayElement().addChildTo(scene);
    this.marker = Sprite("garbage").addChildTo(this.group);
    this.group.scaleX = 0.2;
    this.group.scaleY = 0.2;
    this.group.x = x;
    this.group.y = y;

    this.vy = 5.0;
    this.group.vy = 1.0;
    this.group.update = function () {
      this.vy += 0.2;
      this.y += this.vy;
      if (this.bottom > 750) {
        EffectWave().addChildTo(scene).setPosition(this.x, 750);
        this.remove();
      }
    }
  }
});

}
