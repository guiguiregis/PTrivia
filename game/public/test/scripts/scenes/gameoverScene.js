// Our scene

var gameoverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameoverScene" });

    },
    init: function(data = {didWin:true}) {

        this.didWin = data.didWin;

        this.score = 0;

        this.lang = localStorage.getItem("lang");

        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        
        this.currentModeName = window.localStorage.getItem("current_mode")

        this.currentPlayerId = sessionStorage.getItem("player_id");

        this.gainedTrophee = localStorage.getItem('gained_trophee');


    },
    preload: function() {
        this.load.image('quiz_bg', './assets/screen_base.png');
        this.load.image('top_banner', './assets/top_banner.png');

        // Later set a spritesheet and definr the suitable player
        this.load.image('red_banner', './assets/red_banner.png');
        this.load.image('right_box_green', './assets/right_box_green.png');
        this.load.image('right_box_red', './assets/right_box_red.png');
        this.load.image('bubble_green', './assets/bubble_green.png');
        this.load.image('bubble_red', './assets/bubble_red.png');

        this.load.image('answer_box', './assets/button.png');
        this.load.image('answer_box_correct', './assets/btn_correct.png');

        this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');

        this.load.image('yt_icon', './assets/yt_icon.png');
        this.load.image('coin_icon', './assets/coin_icon.png');
        this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        this.load.image('poop_sad',  './assets/Poop/Poopguysad.png');
        this.load.image('confetis',  './assets/confetis.png');


        //Players

        this.load.spritesheet('player_1_avatar', './assets/perso_1.png', { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_2_avatar', './assets/perso_2.png', { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_3_avatar', './assets/perso_3.png', { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_4_avatar', './assets/perso_4.png', { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_5_avatar', './assets/perso_5.png', { frameWidth: 374, frameHeight: 400 });

    
        this.load.spritesheet('player_6_avatar', './assets/perso_6.png',   { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_7_avatar', './assets/perso_7.png',   { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_8_avatar', './assets/perso_8.png',   { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_9_avatar', './assets/perso_9.png',   { frameWidth: 374, frameHeight: 400 });
        this.load.spritesheet('player_10_avatar', './assets/perso_10.png', { frameWidth: 374, frameHeight: 400 });
    

        this.load.image('gold', './assets/gold_poop.png');
        this.load.image('silver', './assets/silver_poop.png');
        this.load.image('bronze', './assets/bronze_poop.png');
        this.load.image('none', './assets/silver_poop.png');

    },
        

    create: function() {
        

        var _self = this;

        // this.scale.lockOrientation("landscape-primary")
        this.cameras.main.fadeIn(500, 0, 0, 0)

        this.input.addPointer(1);

        // this.cameras.main.setBackgroundColor('#000000')
 
        var bg = this.add.image(0, 0, 'quiz_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     
     
        var confetis = this.add.image(0, screenH*0.2, 'confetis');
        confetis.setScale(1.2).setOrigin(0).setAlpha(0);
        if(this.didWin) confetis.setAlpha(1)
        
        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

     
       
        // Quiz Box
        var gameoverBox = this.add.image(screenW * 0.8, screenH * 0.60, 'right_box_red' );
        gameoverBox.setScale(0.70);
        if(this.didWin) gameoverBox.setTexture("right_box_green")


        var boxTitleText = this.add.text(
            screenW * 0.80, screenH * 0.36, "GAME OVER", {fontSize: 36, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);
        
        if(this.didWin) boxTitleText.setText("gagné".toLocaleUpperCase())


        // Quiz Box
        var currentPlayer = window.globalPlayers.find(e=>e.id == _self.currentPlayerId) || {avatar : 'player_1_avatar'};
        var player = this.add.image(screenW * 0.3, screenH * 0.7, currentPlayer.avatar );
        player.setOrigin(0.5, 0.5).setScale(0.9);
        
  

         
        var trophee = this.add.image(screenW * 0.60, screenH * 0.25, this.gainedTrophee);
        trophee.setScale(0.45).setAlpha(this.gainedTrophee == "none" || this.gainedTrophee == undefined ? 0 : 1)




        var titleText = this.add.text(
            screenW * 0.20, screenH * 0.09, "MODE "+window.localization[this.currentModeName][_self.lang], {fontSize: 42, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);


        var scoreText = this.add.text(
            screenW * 0.80, screenH * 0.07, "SCORE : ", {fontSize: 30, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        var points = localStorage.getItem('goscreen_points')
        var scoreValueText = this.add.text(
            screenW * 0.90, screenH * 0.07, points, {fontSize: 30, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);



        var gainText = this.add.text(
            screenW * 0.76, screenH * 0.55, "TON GAIN : ", {fontSize: 24, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        var gain = localStorage.getItem('goscreen_points')

        var gainValueText = this.add.text(
            screenW * 0.846, screenH * 0.55, gain, {fontSize: 24, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);


        var coinIcon = _self.add.image(screenW * 0.90, screenH * 0.54, 'coin_icon' );
        coinIcon.setScale(0.045)
        
        // Btn Block
        var btnGroup1 = _self.add.group();
        btnBox1 = _self.add.image(0, 0, 'answer_box' );
        btnBox1.setScale(0.40, 0.54).setInteractive();
        btn1 = _self.add.text(
            0, 0, _self.restartBtnText, {fontSize: 26, color: "#000",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);
        btnGroup1.addMultiple([btnBox1, btn1])
        btnGroup1.setXY(screenW * 0.80, screenH * 0.66);
        btnBox1.on('pointerdown', ()=>{
            // ...
            m_currentQuizIndex = 0;
            // switchScene('gameScene');
            var playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
            var noProgress = true;
            playerProgress.forEach(element => {
                if(element.trophee != "none")
                    noProgress = false
            });
            if(noProgress)
            {
                switchScene('selectionScene');
            }
            else
            {
                switchScene('difficultyScene');
            }

        },this);

         
    
        var btnBoxYt = _self.add.image(screenW * 0.80, screenH * 0.84, 'yt_icon' );
        btnBoxYt.setScale(0.1).setInteractive();
        
        // Btn INVEST Block
        var btnGroup2 = _self.add.group();
        btnBox2 = _self.add.image(0, 0, 'answer_box_correct' );
        btnBox2.setScale(1).setInteractive();
        btn2 = _self.add.text(
            0, 0, "INVESTIR", {fontSize: 26, color: "#000",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);
        btnGroup2.addMultiple([btnBox2, btn2])
        btnGroup2.setXY(screenW * 0.52, screenH * 0.94);
        btnBox2.on('pointerdown', ()=>{
           
            switchScene('sanitizeScene');

        },this);

         

             
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0, 0, 'bubble_red');
        textBubble.setScale(1.0).setAlpha(0.8);
        textBubble.depth = 200;
        this.mcPoop = this.add.image(0, 0, 'poop_sad');
        this.mcPoop.setScale(-0.13, 0.13);
        this.mcPoop.depth = 200;
        this.notifText = this.add.text(
            0, 0, "OH DOMMAGE!!\nMAIS TU PEUX\nRETENTER TA CHANCE", {fontSize:  17, color: "black",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.45, 0.85);
        this.notifText.depth = 200;

        if(this.didWin)
        {
            textBubble.setTexture('bubble_green');
            this.mcPoop.setTexture('poop_happy')
            this.notifText.setText("FELICITATION !!\nTU ES LE CHAMPION\nDE L'ASSAINISSEMENT")
        }


        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        // answerNotifGroup.setVisible(false)


        answerNotifGroup.setXY(screenW * 0.60, screenH * 0.70);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.48, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.51, 0 ,1 , 1)




        function breakString(str, limit){
            let brokenString = '';
            for(let i = 0, count = 0; i < str.length; i++){
               if(count >= limit && str[i] === ' '){
                  count = 0;
                  brokenString += '\n';
               }else{
                  count++;
                  brokenString += str[i];
               }
            }
            return brokenString;
         }
            
     

        var _self = this;
    
        function switchScene(newScene)
        {
            showLoader()
_self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }
 
        // Loader
        hideLoader();
},

    update: function() {


    },

    render: function() {

         // Display
      
    }
});





 
 