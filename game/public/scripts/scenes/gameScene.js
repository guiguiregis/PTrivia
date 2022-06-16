// Our scene
const PLAYERS_COUNT = 5;

var gameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "gameScene" });
    },

    init: function(data) {
        this.setVolume =parseInt(localStorage.getItem("set_volume"))
        this.lang = localStorage.getItem("lang");

        this.playBtnText = window.localization["PLAY"][localStorage.getItem("lang")];
        this.sanitizeBtnText = window.localization["SANITIZE"][localStorage.getItem("lang")];

        var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
        localStorage.setItem("quizes", JSON.stringify(quizes_ref));

        var fiows_ref = JSON.parse(localStorage.getItem("fiows_ref"));
        localStorage.setItem("fiows", JSON.stringify(fiows_ref));

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));

        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));

    },
    preload: function() {
 
        // this.load.image('screen_bg', './assets/screen_base.png');
        
        // this.load.image('btn_bg', './assets/button.png');
        // this.load.image('btn_bg1', './assets/button.png');

        // this.load.spritesheet('player', './assets/glitch_walker.png', { frameWidth: 104, frameHeight: 114 });
        // this.load.image('podium', './assets/podium.png');


        // // Players
        // this.load.image('player1', './assets/perso_1.png');
        // this.load.image('player2', './assets/perso_2.png');
        // this.load.image('player3', './assets/perso_3.png');
        // this.load.image('player4', './assets/perso_4.png');
        // this.load.image('player5', './assets/perso_5.png');
        // this.load.image('player6', './assets/perso_6.png');
        // this.load.image('player7', './assets/perso_7.png');
        // this.load.image('player8', './assets/perso_8.png');
        // this.load.image('player9', './assets/perso_9.png');
        // this.load.image('player10', './assets/perso_10.png');


        // //Players

        // this.load.spritesheet('player_1_avatar_full', './assets/perso_1.png', { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_2_avatar_full', './assets/perso_2.png', { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_3_avatar_full', './assets/perso_3.png', { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_4_avatar_full', './assets/perso_4.png', { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_5_avatar_full', './assets/perso_5.png', { frameWidth: 374, frameHeight: 801 });

   
        // this.load.spritesheet('player_6_avatar_full', './assets/perso_6.png',   { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_7_avatar_full', './assets/perso_7.png',   { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_8_avatar_full', './assets/perso_8.png',   { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_9_avatar_full', './assets/perso_9.png',   { frameWidth: 374, frameHeight: 801 });
        // this.load.spritesheet('player_10_avatar_full', './assets/perso_10.png', { frameWidth: 374, frameHeight: 801 });


    },
    create: function() {
        
        var _self = this;
        this.cameras.main.setBackgroundColor('#6effff')
        var bg = this.add.image(0, 0, 'screen_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);

        this.sound.add('buzzer');
        
        this.sound.add('keyboard1');
        
        this.sound.add('keyboard2');

        // this.langText = this.add.text(
        //     screenW * 0.95, 
        //     30, 
        //     this.lang, 
        //     {
        //         fontSize: window.bg_y_scale * 25,
        //         color: "#fff",
        //         fontStyle: "bold",
        //         textTransform : "uppercase"
        //     }
        // ).setOrigin(0.5).setInteractive();

        // this.langText.on('pointerdown', ()=>{
        //     // ...
        //     var lang = this.lang;

        //     switch (lang) {
        //         case "en":
        //             lang = "fr";
        //             break;
        //         case "fr":
        //             lang = "en";
        //             break;
        //     } 
        //     this.lang = lang;
        //     localStorage.setItem("lang", this.lang);


        //     // Localize
        //     localize();

        // },this);

      
        // Animation set
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] }),
            // frameRate: 8,
            repeat: -1
        });


        // Players


        this.players = [];
        function positionPlayers()
        {
            for (let i = 0; i < _self.currentPlayers.length; i++) {
                
                var podiumIndex = _self.currentPlayers[i].podiumIndex;
                _self.players[i] = _self.add.image(screenW * (window.playerPositions[podiumIndex]) , screenH * 0.50, _self.currentPlayers[i].avatar+'_full' );
                _self.players[i].setScale(0.28);

                _self.players[i].score = _self.add.text(
                    screenW * (window.playerPositions[podiumIndex]) , screenH * 0.53, _self.currentPlayers[i].points , {fontSize: 18, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
                ).setOrigin(0.5);

                _self.players[i].score.depth = 20;     
            }
        }

        positionPlayers();

        positionPlayers();

  
        //Podiums

        var podium1 = this.add.image(screenW * window.playerPositions[0] , screenH * 0.59, 'podium' );
        podium1.setScale(0.75);
    
        var podium2 = this.add.image(screenW * window.playerPositions[1] , screenH * 0.59, 'podium' );
        podium2.setScale(0.75);
    
        var podium3 = this.add.image(screenW * window.playerPositions[2] , screenH * 0.59, 'podium' );
        podium3.setScale(0.75);
    
        var podium4 = this.add.image(screenW * window.playerPositions[3] , screenH * 0.59, 'podium' );
        podium4.setScale(0.75);
    
        var podium5 = this.add.image(screenW * window.playerPositions[4] , screenH * 0.59, 'podium' );
        podium5.setScale(0.75);


        //Btn Invest
        // var playGroup2 = this.add.group();
        // investBox2=this.add.image(screenW * 0.53, screenH * 0.63, 'btn_bg' );
        // investBox2.setScale(0.45,  0.55).setInteractive();  
        // this.playText2 = this.add.text(
        //     0, 0, this.sanitizeBtnText, {fontSize: 20, color: "green",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.5, 0.65);
        // playGroup2.addMultiple([investBox2, this.playText2]);
        // playGroup2.setXY(screenW * 0.61, screenH * 0.90);
        
        // investBox2.on('pointerdown', ()=>{
        //     // ...
        //     switchScene('sanitizeScene');

        // },this);

        //Btn Play
        var playGroup1 = this.add.group();
        playBox1 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_bg' );
        playBox1.setScale(0.45,  0.55).setInteractive();

        this.playText1 = this.add.text(
            0, 0, this.playBtnText , {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        playGroup1.addMultiple([playBox1, this.playText1]);
        playGroup1.setXY(screenW * 0.5, screenH * 0.90);

        playBox1.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1'); 
            }
            
            // ...
            // Get chain : Scene
            let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];

            //Update chain
            _self.currentRoundChainIndex+=1;
            localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

            // console.log(window.roundChain)
            switchScene(scene);

        },this);


      // Btn image play 
        // var playGroup1 = this.add.group();
        // playBox1 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_bg' );
        // playBox1.setScale(0.45,  0.55).setInteractive();

        // this.playText3 = this.add.text(
        //     0, 0, "play image" , {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.5, 0.65);

        // playGroup1.addMultiple([playBox1, this.playText3]);
        // playGroup1.setXY(screenW * 0.15, screenH * 0.90);
        // playBox1.on('pointerdown', ()=>{
        //    // ...
        //     switchScene('wordImageScene');

        // },this);

        // playGroup1.setVisible(false);

    
        function switchScene(newScene)
        {
            showLoader()
            _self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }
     


        function localize()
        {

            _self.playBtnText = window.localization["PLAY"][_self.lang];
            _self.sanitizeBtnText = window.localization["SANITIZE"][_self.lang];

        }


        

        // DEFINE RANDOM NAMES
        function giveRandomNames(players)
        {



            let currentPlayerName = window.localStorage.getItem("player_name");

            players[0].name = currentPlayerName;

            var names = {...window.randomNames};
            
            for (let i = 1; i < players.length; i++) // First player is not considered
            {
                const p = players[i];
                var gender = p.gender;
                
                
                var randomIndex = Math.floor(Math.random() * (1 + (names[gender].length - 1)));

                var randomName = names[gender][randomIndex];
                // Delete from selectables
                names[gender].splice(randomIndex, 1);

                players[i].name = randomName;
                
            }

            // Update players name
            window.localStorage.setItem("current_players", JSON.stringify(players));


        }  
        
        
        // RANDOMIZE NAMES 
        if(this.currentPlayers.length == PLAYERS_COUNT) // If just started
        {
            giveRandomNames(this.currentPlayers)
        }

        // Loader
        hideLoader();
    },
    
    update: function() {
        // Update Localization
        // this.langText.setText(this.lang) 
        this.playText1.setText(this.playBtnText)
        // this.playText2.setText(this.sanitizeBtnText)
    }
});



 
 