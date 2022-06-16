// Our scene

var recapScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "recapScene" });

    },
    init: function(data) {

        this.score = 0;
        this.setVolume = parseInt(localStorage.getItem("set_volume"))

        this.lang = localStorage.getItem("lang");

        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        
        // ...

        this.currentPlayerName = window.localStorage.getItem("player_name");

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        this.eliminatedPlayers = JSON.parse(window.localStorage.getItem("eliminated_players"));

        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));

        // ...

        
    },
    preload: function() {
 
        // this.load.image('quiz_bg_white', './assets/screen_base.png');
        // this.load.image('top_banner', './assets/top_banner.png');

        // // Later set a spritesheet and definr the suitable player
        // this.load.image('winners_bloc', './assets/winners_bloc.png');
        // this.load.image('losers_bloc', './assets/losers_bloc.png');
        // this.load.image('quiz_box', './assets/box1.png');
        // this.load.image('answer_box', './assets/button.png');

        // this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');

        // this.load.image('star_on', './assets/star_on.png');

        // this.load.image('ok_btn', './assets/ok_btn.png');
        // this.load.image('exit_btn', './assets/exit_btn.png');
        

        // this.load.image('text_bubble', './assets/text_bubble.png');
        // this.load.image('poop_happy', './assets/poop_happy.png');
        // this.load.image('poop_sad',  './assets/poop_sad.png');

        // //add by Marius 
        // this.load.image('miss_poop_happy',  './assets/poop_miss_happy.png');
        // this.load.image('miss_poop_sad',  './assets/poop_miss_sad.png');
        

        //Players

        // this.load.spritesheet('player_1_avatar', './assets/perso_1.png', { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_2_avatar', './assets/perso_2.png', { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_3_avatar', './assets/perso_3.png', { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_4_avatar', './assets/perso_4.png', { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_5_avatar', './assets/perso_5.png', { frameWidth: 374, frameHeight: 400 });

   
        // this.load.spritesheet('player_6_avatar', './assets/perso_6.png',   { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_7_avatar', './assets/perso_7.png',   { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_8_avatar', './assets/perso_8.png',   { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_9_avatar', './assets/perso_9.png',   { frameWidth: 374, frameHeight: 400 });
        // this.load.spritesheet('player_10_avatar', './assets/perso_10.png', { frameWidth: 374, frameHeight: 400 });


    },
        

    create: function() {
        

        this.cameras.main.fadeIn(500, 0, 0, 0)

        var _self = this;

        this.input.addPointer(1);

        this.cameras.main.setBackgroundColor('#6effff')
 
        var bg = this.add.image(0, 0, 'quiz_bg_white');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     
        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

        this.sound.add('buzzer');
        
        this.sound.add('keyboard1');
        
        this.sound.add('keyboard2');

        function playSound(t){
            if (_self.setVolume==1) {
                _self.sound.play(t);  
            }
        }

        var r = this.currentRound - 1;
        var round = "PREMIER";

        switch (r) {
            case 1:
                var translations = {"en" : "FIRST", "fr" : "PREMIER"};

                round = translations[_self.lang];
                break;

            case 2:
                var translations = {"en" : "SECOND", "fr" : "DEUXIEME"};

                round = translations[_self.lang];
                break;

            case 3:
                var translations = {"en" : "THIRD", "fr" : "TROISIEME"};

                round = translations[_self.lang];
                break;
            
            case 0:
                var translations = {"en" : "THIRD", "fr" : "TROISIEME"};

                round = translations[_self.lang];
                break;
        }


        var translations = {"en" : "END OF THE ", "fr" : "FIN DU "};

        var message = translations[_self.lang] + round + " ROUND";

        var translations = {"en" : "END OF THE LEVEL", "fr" : "FIN DE LA PARTIE"};

        if(round == "TROISIEME" || round == "THIRD")
            message = translations[_self.lang]

        var titleText = this.add.text(
            screenW * 0.50, screenH * 0.1, message, {fontSize: 32, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        var winners_bloc = this.add.image(screenW * 0.025, screenH * 0.2, 'winners_bloc');
        winners_bloc.setOrigin(0, 0).setScale(0.72,0.67);

        var okIcon = this.add.image(screenW * 0.46, screenH * 0.24, 'ok_btn');
        okIcon.setScale(0.5);

        var losers_bloc = this.add.image(screenW * 0.50, screenH * 0.2, 'losers_bloc');
        losers_bloc.setOrigin(0, 0).setScale(0.72,0.67);

        var noIcon = this.add.image(screenW * 0.94, screenH * 0.24, 'exit_btn');
        noIcon.setScale(0.5);

        this.playersAvatars = [];
        var winnersPos = [{x : 0.17, y : 0.34 }, {x : 0.33, y : 0.34 },
                          {x : 0.17, y : 0.61 }, {x : 0.33, y : 0.61 }]

        var losersPos = [{x : 0.65, y : 0.34 }, {x : 0.82, y : 0.34 },
                         {x : 0.65, y : 0.61 }, {x : 0.82, y : 0.61 }]

   

        for (let i = 0; i < this.currentPlayers.length; i++) {

            var pObj = this.currentPlayers[i];

            createAvatar(pObj, i, winnersPos[i]);
            
        }

        
        for (let i = 0; i < this.eliminatedPlayers.length; i++) {

            var pObj = this.eliminatedPlayers[i];

            createAvatar(pObj, i, losersPos[i]);
            
        }


        this.mcPoop = this.add.image(0, 0, 'poop_happy');
        this.mcPoop.setScale( 0.15);
        this.mcPoop.depth = 200;
     
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0, 0, 'text_bubble_oriente');
        textBubble.setScale( -0.25,  0.25).setAlpha(0.9);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            0, 0, "BONNE\nREPONSE", {fontSize:  15, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.40, 0.8);
        this.notifText.depth = 200;

        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        // answerNotifGroup.setVisible(false)

        answerNotifGroup.setXY(screenW * 0.389, screenH * 0.8);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.47, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.64, 0 ,1 , 1)


        var right_answers = {"en" : ["Bravo! You are qualified!", "Bravo! You won"], "fr" : ["Bravo! tu es qualifié!!", "Bravo! tu as gagné!!"]};
        var wrong_answers = {"en" : ["Oh no! you lost"], "fr": ["Oh non ! Tu as perdu"]};


        if(this.currentPlayers.find(e=>e.name == this.currentPlayerName)) // Add more control on it
        {
            this.mcPoop.setTexture("poop_happy");
            this.notifText.setText(breakString(right_answers[_self.lang][0], 8));

            if(this.currentPlayers.length == 1) // So Winner
            {
                this.notifText.setText(breakString(right_answers[_self.lang][1], 8));

                // winnersLine.setText("YOU WON !!!")
            }
           
        } 
        else
        {   //add by Marius
            let ans=getRandomArbitrary(1,10);

            let poop = "poop_sad";

            if (ans%2==0) {

              poop="miss_poop_sad" 
              
            }

            this.mcPoop.setTexture(poop);

            this.notifText.setText(breakString(wrong_answers[_self.lang][0], 8));

        }
        
        var nextBtn = this.add.group();
        nextBtnBg = this.add.image(0, 0, 'answer_box' );
        nextBtnBg.setScale(0.45,  0.55).setInteractive();

        var translations = {"en" : "NEXT", "fr" : "SUIVANT"};
        
        nextBtnText = this.add.text(
            0, 0, translations[_self.lang], {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        
        nextBtn.addMultiple([nextBtnBg, nextBtnText])
        nextBtn.setXY(screenW * 0.85, screenH * 0.90);

        nextBtnBg.on('pointerdown', ()=>{
          
            playSound('keyboard1');
            
            // ...
            // Check if Player this.currentPlayerName has lost or not
            if(this.currentPlayers.find(e=>e.name == this.currentPlayerName)) // Add more control on it
            {
               
                // var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
                // localStorage.setItem("quizes", JSON.stringify(quizes_ref));

                if(this.currentPlayers.length == 1) // So Winner
                {
                    resetAll(false);
                }
                else
                {
                 
                    // switchScene('gameScene');
                    // switchScene('quizScene');
                    // // Get chain : Scene
                    // let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];

                    // //Update chain
                    // _self.currentRoundChainIndex+=1;
                    // localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

                    // // console.log(scene)
                    // switchScene(scene);
                    switchScene('fortuneWcScene');
                }
            }
            else
            {
                // Reset preseted data :
                resetAll();
            }


        },this);


        function createAvatar(playerObject, i ,pos = {x:0, y : 0})
        {

            _self.playersAvatars[i] = _self.add.group();
            _self.playersAvatars[i].avatar = _self.add.image(0, 0, playerObject.avatar);
            _self.playersAvatars[i].avatar.setScale(0.25)
          
            _self.playersAvatars[i].text = _self.add.text(
                0, 0, playerObject.name, {fontSize: 17, color: "black",fontStyle: "bold", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.2);
            _self.playersAvatars[i].addMultiple([_self.playersAvatars[i].avatar, _self.playersAvatars[i].text])
            _self.playersAvatars[i].setXY(screenW * pos.x , screenH * pos.y);  
            _self.playersAvatars[i].propertyValueSet("x", screenW * (pos.x) , 0 ,1 , 1)
            _self.playersAvatars[i].propertyValueSet("y", screenH * (pos.y + 0.1), 0 ,1 , 1)
        
        }


       
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


        function resetAll(resetProgress = true)
        {
             
            if(resetProgress)
            {
                localStorage.setItem("points", 0);
                localStorage.setItem("current_level", 1);
            }
            
            localStorage.setItem("current_round", 1);
            
            var players = window.players;

            localStorage.setItem("current_players", JSON.stringify(players));
        
            var eliminated = [];
            localStorage.setItem("eliminated_players", JSON.stringify(eliminated));
        
            switchScene('gameoverScene', {didWin:!resetProgress});
        }


        function switchScene(newScene, obj = {})
        {
            showLoader()
            _self.scene.start(newScene, obj);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
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





 
 