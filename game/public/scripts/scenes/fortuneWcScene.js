// Our scene

var fortuneWcScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "fortuneWcScene" });

    },
    init: function(data = {didWin:true}) {
        this.setVolume =parseInt(localStorage.getItem("set_volume"))

        this.didWin = data.didWin;

        this.score = 0;

        this.lang = localStorage.getItem("lang");

        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        
        this.currentModeName = window.localStorage.getItem("current_mode")

        this.currentPlayerId = sessionStorage.getItem("player_id");

        this.gainedTrophee = localStorage.getItem('gained_trophee');

        this.previousAngle = 0;


        
        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));


    },
    preload: function() {
        // this.load.image('quiz_bg', './assets/screen_base.png');
        // this.load.image('top_banner', './assets/top_banner.png');

        // // Later set a spritesheet and definr the suitable player
        // this.load.image('red_banner', './assets/red_banner.png');
        // this.load.image('right_box_green', './assets/right_box_green.png');
        // this.load.image('box1', './assets/box1.png');
        // this.load.image('bubble_green', './assets/bubble_green.png');
        // this.load.image('bubble_red', './assets/bubble_red.png');

        // this.load.image('answer_box', './assets/button.png');
        // this.load.image('answer_box_correct', './assets/btn_correct.png');

        // this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');

        // this.load.image('yt_icon', './assets/yt_icon.png');
        // this.load.image('coin_icon', './assets/coin_icon.png');
        // this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        // this.load.image('poop_sad',  './assets/Poop/Poopguysad.png');
        // this.load.image('confetis',  './assets/confetis.png');
        // this.load.image('spinner',  './assets/spinner.png');
        // this.load.image('spinner_wc',  './assets/spinner_wc.png');
        // this.load.image('spin_point',  './assets/spin_point.png');


        // this.load.image('coin_icon', './assets/coin_icon.png');
        // this.load.image('pq_icon', './assets/Pq.png');

    },
        

    create: function() {
        


        var _self = this;

        this.spots = [
            {angle : 0, type : 'coin', value : 100},
            {angle : -45, type : 'coin', value : 300},
            {angle : -90, type : 'coin', value : 200},
            {angle : -135, type : 'pq',   value :   2},
            {angle : -180, type : 'coin', value : 100},
            {angle : -225, type : 'coin', value : 300},
            {angle : -270, type : 'coin', value : 200},
            {angle : -315, type : 'pq',   value :   1}
        ]

        // this.scale.lockOrientation("landscape-primary")
        this.cameras.main.fadeIn(500, 0, 0, 0)

        this.input.addPointer(1);

        this.cameras.main.setBackgroundColor('#6effff')

        this.sound.add('buzzer');
        
        this.sound.add('keyboard1');
        
        this.sound.add('keyboard2');
 
        var bg = this.add.image(0, 0, 'quiz_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     
     
        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

     
       
        // Quiz Box
        var gameoverBox = this.add.image(screenW * 0.5, screenH * 0.60, 'box1' );
        gameoverBox.setScale(1.1, 0.7);


           
        var coin_icon = this.add.image(screenW * 0.15, screenH * 0.38, "coin_icon" );
        coin_icon.setOrigin(0.5).setScale(0.1);
        
        var pq_icon = this.add.image(screenW * 0.15, screenH * 0.39, "pq_icon" );
        pq_icon.setOrigin(0.5).setScale(0.6);
        
        var gainedText = this.add.text(
            screenW * 0.23, screenH * 0.39, "100", {fontSize: 42, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5);

        var gainNotifGroup = _self.add.group();
        gainNotifGroup.addMultiple([gainedText, coin_icon, pq_icon]);

        gainNotifGroup.setVisible(false)


        // Spinner
        var spinner_wc = this.add.image(screenW * 0.5, screenH * 0.55, "spinner_wc" );
        spinner_wc.setOrigin(0.5, 0.5).setScale(1.9);

        var spinner = this.add.image(screenW * 0.5, screenH * 0.62, "spinner" );
        spinner.setOrigin(0.5, 0.5).setScale(0.62);
        
        var spin_point = this.add.image(screenW * 0.5, screenH * 0.45, "spin_point" );
        spin_point.setOrigin(0.5).setScale(0.7);
        
 
        var translations = {"en" : "TOILET OF FORTUNE", "fr" : "WC DE LA FORTUNE"};

        var titleText = this.add.text(
            screenW * 0.5, screenH * 0.09, translations[_self.lang], {fontSize: 42, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);
        
        // Btn LAUNCH Block
        var btnGroup2 = _self.add.group();
        btnBox2 = _self.add.image(0, 0, 'answer_box' );
        btnBox2.setScale(0.6, 0.7).setInteractive();

        var translations = {"en" : ["LAUNCH"], "fr" : ["LANCER"]};

        btn2 = _self.add.text(
            0, 0, translations[_self.lang], {fontSize: 26, color: "#000",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        btnGroup2.addMultiple([btnBox2, btn2])
        btnGroup2.setXY(screenW * 0.23, screenH * 0.86);

        btnBox2.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1');
            }
          
            // switchScene('sanitizeScene');
            btnBox2.disableInteractive().setAlpha(0.5);

            let r = Math.floor(Math.random() * (1 + (this.spots.length-1)));
            let spot = this.spots[r];
            let angle = spot.angle;
            let type = spot.type;
            let value = spot.value;

            let _angle = angle == this.previousAngle ? angle+360 : angle;

            if(Math.abs(this.previousAngle - angle) <= 180)
            {
                _angle = _angle + 360;
            }

            this.tweens.add({
                targets: [spinner],
                angle: _angle,
                yoyo: false,
                duration: 2000,
                ease: 'Sine.easeInOut'
            });

            this.previousAngle = angle;

            setTimeout(() => {
                
                if(type == "coin")
                {
                    var currentPoints = parseInt(localStorage.getItem("points")) + value;
                    localStorage.setItem("points", currentPoints)
                    
                    pq_icon.setAlpha(0);
                }
                else
                {
                    var currentPqs = parseInt(localStorage.getItem("bonus_pq")) + value;
                    localStorage.setItem("bonus_pq", currentPqs)

                    coin_icon.setAlpha(0);

                }

                // Notif
                gainedText.setText(value);
                gainNotifGroup.setVisible(true);
                 
                 // Get chain : Scene
                 let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];

                 //Update chain
                 _self.currentRoundChainIndex+=1;
                 localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

                 // console.log(scene)
                 setTimeout(() => {
                     switchScene(scene);
                 }, 1200);

            }, 2500);

        },this);

         

             
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0, 0, 'bubble_green');
        textBubble.setScale(1.05).setAlpha(0.8);
        textBubble.depth = 200;
        this.mcPoop = this.add.image(0, 0, 'poop_happy');
        this.mcPoop.setScale(-0.13, 0.13);
        this.mcPoop.depth = 200;
        
        var translations = {"en" : ["BRAVO! YOU HAVE WON THIS ROUND, HERE IS A LITTLE GIFT"], "fr" : ["BRAVO!! TU AS REMPORTÉ CETTE MANCHE VOICI UN PETIT CADEAU POUR LA SUITE"]};

        this.notifText = this.add.text(
            0, 0, "", {fontSize:  16, color: "black",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.45, 0.70);
        this.notifText.depth = 200;

        this.notifText.setText(breakString(translations[_self.lang][0], 10))


        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        // answerNotifGroup.setVisible(false)


        answerNotifGroup.setXY(screenW * 0.88, screenH * 0.70);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.78, 0 ,1 , 1)
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





 
 