// Our scene
function resetStorage()
{
    // Session
    sessionStorage.clear();

    // Storage
    localStorage.setItem("current_round", 1);
    localStorage.setItem("current_level", 1);
    localStorage.removeItem("player_name");
    localStorage.removeItem("current_players");
    localStorage.removeItem("eliminated_players");
    localStorage.setItem("points", 0);
    localStorage.setItem("bonus_pq", 1);
    localStorage.setItem("roundChainIndex", 0);

    // localStorage.setItem("player_progress", JSON.stringify(window.playerProgress));
    // localStorage.setItem("current_mode", "EASY");

}




var selectionScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "selectionScene" });

    },
    init: function(data) {

        resetStorage();


        this.redirect = data.redirect;

        this.m_enteredPlayerName = "Moi";

        this.score = 0;

        this.lang = localStorage.getItem("lang");

        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        
        // ...

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        this.eliminatedPlayers = JSON.parse(window.localStorage.getItem("eliminated_players"));

        this.currentRound = parseInt(window.localStorage.getItem("current_round"));

        this.currentPlayerName = window.localStorage.getItem("player_name");
        this.currentPlayerId = window.sessionStorage.getItem("player_id");

        // ...

        
    },
    preload: function() {
 
        this.load.image('quiz_bg_white', './assets/screen_base.png');
        this.load.image('top_banner', './assets/top_banner.png');

        // Later set a spritesheet and definr the suitable player
        this.load.image('winners_bloc', './assets/winners_bloc.png');
        this.load.image('losers_bloc', './assets/losers_bloc.png');
        this.load.image('quiz_box', './assets/box1.png');
        this.load.image('answer_box', './assets/button.png');

        this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');

        this.load.image('star_on', './assets/star_on.png');

        this.load.image('ok_btn', './assets/ok_btn.png');
        this.load.image('exit_btn', './assets/exit_btn.png');
        

        this.load.image('text_bubble', './assets/text_bubble.png');
        this.load.image('poop_happy', './assets/poop_happy.png');
        this.load.image('poop_sad',  './assets/poop_sad.png');

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


    },
        

    create: function() {
        

        this.cameras.main.fadeIn(500, 0, 0, 0)

        var _self = this;

        this.input.addPointer(1);

        // this.cameras.main.setBackgroundColor('#ffffff')
 
        var bg = this.add.image(0, 0, 'quiz_bg_white');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     

        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

     
        var titleText = this.add.text(
            screenW * 0.50, screenH * 0.10, "CHOISIS TON PERSO", {fontSize: 32, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);


        this.playersAvatars = [];
        var playersPos = [
                            {x : 0.14, y : 0.37 }, {x : 0.32, y : 0.37 },{x : 0.50, y : 0.37 }, {x : 0.68, y : 0.37 }, {x : 0.86, y : 0.37 },
                            {x : 0.14, y : 0.75 }, {x : 0.32, y : 0.75 },{x : 0.50, y : 0.75 }, {x : 0.68, y : 0.75 }, {x : 0.86, y : 0.75 }
                         ]

   

        for (let i = 0; i < window.globalPlayers.length; i++) {

            var pObj = window.globalPlayers[i];

            createAvatar(pObj, i, playersPos[i]);
            
        }



        function createAvatar(playerObject, i ,pos = {x:0, y : 0})
        {

            _self.playersAvatars[i] = _self.add.group();
            _self.playersAvatars[i].bg = _self.add.image(0, 0, 'quiz_box');
            _self.playersAvatars[i].bg.setScale(0.2, 0.3)

            _self.playersAvatars[i].avatar = _self.add.image(0, 0, playerObject.avatar);
            _self.playersAvatars[i].avatar.setScale(0.35).setOrigin(0.5, 1.05)
          
            _self.playersAvatars[i].text = _self.add.text(
                0, 0, "", {fontSize: 19, color: "black",fontStyle: "bold", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.0);

            _self.playersAvatars[i].btnBg = _self.add.image(0, 0, 'answer_box' );
            _self.playersAvatars[i].btnBg.setScale(0.4, 0.45).setInteractive();
            _self.playersAvatars[i].btnText = _self.add.text(
                0, 0, "CHOISIR", {fontSize: 19, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            _self.playersAvatars[i].btnBg.on('pointerdown', ()=>{
                // ...
                  // Save selected player name in localStorage
                  localStorage.setItem("player_name", _self.m_enteredPlayerName);
                  localStorage.setItem("bonus_pq", 1);

                  defineOpponents(playerObject);
                  // Set session 
                  sessionStorage.setItem("player_name", _self.m_enteredPlayerName);
                  sessionStorage.setItem("player_id", playerObject.id);
  
                //   switchScene("gameScene")
                  switchScene("difficultyScene", {routeFromSelection : true})
            },this);


            _self.playersAvatars[i].addMultiple([_self.playersAvatars[i].bg, _self.playersAvatars[i].avatar, _self.playersAvatars[i].text, _self.playersAvatars[i].btnBg, _self.playersAvatars[i].btnText])
            _self.playersAvatars[i].setXY(screenW * pos.x , screenH * pos.y);  
            _self.playersAvatars[i].propertyValueSet("x", screenW * (pos.x) , 0 ,1 , 1)
            _self.playersAvatars[i].propertyValueSet("y", screenH * (pos.y + 0.12), 0 ,1 , 1)
        
        }



        function defineOpponents(selectedPlayer)
        {

            var newPlayers = [];

            var _globalPlayers = [...window.globalPlayers];
            var shuffledPlayers = _globalPlayers.sort((a, b) => 0.5 - Math.random());
            
            var index = shuffledPlayers.indexOf(selectedPlayer);
            shuffledPlayers.splice(index, 1);
            selectedPlayer.podiumIndex = 0;
            selectedPlayer.name = _self.m_enteredPlayerName;
            newPlayers.push(selectedPlayer);

            for (let i = 0; i < 4; i++) { // 4 Opponents
                var p = shuffledPlayers[i];

                p.podiumIndex = i+1;
                newPlayers.push(p);
            }


            window.players = newPlayers;
            localStorage.setItem("current_players", JSON.stringify(newPlayers));

            
        }     


        // REDIRECT SECTION


        function defineAndRedirect(currentPlayerId)
        {

            var newPlayers = [];

            var _globalPlayers = [...window.globalPlayers];
            var shuffledPlayers = _globalPlayers.sort((a, b) => 0.5 - Math.random());
            
            var selectedPlayer = shuffledPlayers.find(e=>e.id == currentPlayerId);

            var index = shuffledPlayers.indexOf(selectedPlayer);
            selectedPlayer.podiumIndex = 0;
            shuffledPlayers.splice(index, 1);
            newPlayers.push(selectedPlayer);

            for (let i = 0; i < 4; i++) { // 4 Opponents
                var p = shuffledPlayers[i];

                p.podiumIndex = i+1;
                newPlayers.push(p);
            }


            window.players = newPlayers;
            localStorage.setItem("current_players", JSON.stringify(newPlayers));
            localStorage.setItem("eliminated_players", JSON.stringify([]));


            // Go to gamescene
            switchScene("gameScene")

        }
        
        

        if(this.redirect)
        {
            defineAndRedirect(this.currentPlayerId)
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


        // function resetAll(resetProgress = true)
        // {
             
        //     if(resetProgress)
        //     {
        //         localStorage.setItem("points", 0);
        //         localStorage.setItem("current_level", 1);
        //     }
            
        //     localStorage.setItem("current_round", 1);
            
        //     var players = [
        //         {name:"Me", points : 0, avatar : "player_1_avatar"}, 
        //         {name:"Player2", points : 0, avatar : "player_2_avatar"},
        //         {name:"Player3", points : 0, avatar : "player_3_avatar"},
        //         {name:"Player4", points : 0, avatar : "player_4_avatar"},
        //         {name:"Player5", points : 0, avatar : "player_5_avatar"}
        //     ]

        //     localStorage.setItem("current_players", JSON.stringify(players));
        
        //     var eliminated = [];
        //     localStorage.setItem("eliminated_players", JSON.stringify(eliminated));
        
        //     switchScene('gameoverScene');
        // }


        function switchScene(newScene, obj = {})
        {
            showLoader()
_self.scene.start(newScene, obj);
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





 
 