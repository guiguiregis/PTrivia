// Our scene
 

var difficultyScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "difficultyScene" });

    },
    init: function(data) {

        this.routeFromSelection = data.routeFromSelection;

        this.score = 0;

        this.lang = localStorage.getItem("lang");

        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        
        // ...

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        this.eliminatedPlayers = JSON.parse(window.localStorage.getItem("eliminated_players"));

        this.currentRound = parseInt(window.localStorage.getItem("current_round"));

        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));

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
        this.load.image('chain', './assets/Chaine.png');
        

        this.load.image('text_bubble', './assets/text_bubble.png');
        this.load.image('poop_happy', './assets/poop_happy.png');
        this.load.image('poop_sad',  './assets/poop_sad.png');
 

        this.load.image('gold', './assets/gold_poop.png');
        this.load.image('silver', './assets/silver_poop.png');
        this.load.image('bronze', './assets/bronze_poop.png');
        this.load.image('none', './assets/silver_poop.png');
 

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
            screenW * 0.50, screenH * 0.10, window.localization["SELECT_DIFFICULTY"][_self.lang], {fontSize: 32, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);


        this.playersAvatars = [];
        var difficulties = this.playerProgress;
         
        var difficultyPos = [{x : 0.20, y : 0.47 }, {x : 0.50, y : 0.47 },{x : 0.80, y : 0.47 }]

   

        for (let i = 0; i < difficulties.length; i++) {

            var diffObj = difficulties[i];

            createDifficultyItem(diffObj, i, difficultyPos[i]);
            
        }



        function createDifficultyItem(difficultyItem, i ,pos = {x:0, y : 0})
        {
            // ... mode availability
            // var activateMode = false;
            // if(previousUnlocked(i))
            //     activateMode = true;

            const textColors = {"none" : "black", "gold" : "gold", "bronze" : "maroon", "silver" : "#c9c9c9"}

            _self.playersAvatars[i] = _self.add.group();
            _self.playersAvatars[i].bg = _self.add.image(0, 0, 'quiz_box');
            _self.playersAvatars[i].bg.setScale(0.35, 0.5)

            _self.playersAvatars[i].trophee = _self.add.image(0, 0, difficultyItem.trophee);
            _self.playersAvatars[i].trophee.setScale(0.6).setOrigin(0.5, 0.45);
          

            var tropheeName = difficultyItem.trophee.toString().toUpperCase();
            if(tropheeName == "NONE")
            {
                tropheeName = "NO_TROPHEE";
                _self.playersAvatars[i].trophee.setAlpha(0.3);
            }

            _self.playersAvatars[i].text = _self.add.text(
                0, 0, window.localization["BEST_SCORE"][_self.lang], {fontSize: 15, color: "black", fontFamily: "Mont" }
            ).setOrigin(0.5, 7.5);

            _self.playersAvatars[i].bestScore = _self.add.text(
                0, 0, difficultyItem.bestScore.toString(), {fontSize: 45, color: textColors[difficultyItem.trophee], fontStyle: "bolder", fontFamily: "Impact" }
            ).setOrigin(0.5, 2.25);

          
            _self.playersAvatars[i].tropheeName = _self.add.text(
                0, 0, window.localization[tropheeName][_self.lang], {fontSize: 22, color: "black", fontStyle: "normal", fontFamily: "Impact" }
            ).setOrigin(0.5, -3.5);

            _self.playersAvatars[i].btnBg = _self.add.image(0, 0, 'answer_box' ).setInteractive();
            _self.playersAvatars[i].btnBg.setScale(0.6, 0.65).setOrigin(0.5,-1.5).setAlpha(difficultyItem.unlocked ? 1 : 0.65);
            _self.playersAvatars[i].btnText = _self.add.text(
                0, 0, window.localization[difficultyItem.name][_self.lang], {fontSize: 23, color: "white", stroke: '#000000',
                strokeThickness: 4,fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, -4.1);


            _self.playersAvatars[i].locker = _self.add.image(0, 0, 'chain' ).setScale(0.5).setOrigin(0.59);
            _self.playersAvatars[i].locker.setAlpha(difficultyItem.unlocked ? 0 : 1);
 

            _self.playersAvatars[i].btnBg.on('pointerdown', ()=>{
                if(!difficultyItem.unlocked) return;
                  
                // Save selected mode in localStorage
                  localStorage.setItem("current_mode", difficultyItem.name);
                // alert("Taped !")
                //   defineOpponents(difficultyItem);
                //   // Set session 
                    // console.log(_self.routeFromSelection)
                    if(_self.routeFromSelection)
                    {
                        switchScene("gameScene")
                    }
                    else // From Replay action
                    {
                        switchScene("selectionScene", {redirect : true})
                    }
            },this);


            _self.playersAvatars[i].addMultiple([_self.playersAvatars[i].bg , _self.playersAvatars[i].locker , _self.playersAvatars[i].trophee, _self.playersAvatars[i].text, _self.playersAvatars[i].bestScore, _self.playersAvatars[i].tropheeName, _self.playersAvatars[i].btnBg, _self.playersAvatars[i].btnText])
            _self.playersAvatars[i].setXY(screenW * pos.x , screenH * pos.y);  
            _self.playersAvatars[i].propertyValueSet("x", screenW * (pos.x) , 0 ,1 , 1)
            // _self.playersAvatars[i].propertyValueSet("y", screenH * (pos.y + 0.0), 0 ,1 , 1)
        
        }

        // Check if can activated mode
        function previousUnlocked(index)
        {
            var unlock = false;
            var prev = index - 1;
            var unlockers = ["bronze", "silver", "gold"];
            if (prev >= 0)
            {
                if(unlockers.find(u => u == _self.playerProgress[prev].trophee))
                    unlock = true;
            }else
            {
                unlock = true;
            }

            return unlock;
        }



        function defineOpponents(selectedPlayer)
        {

            var newPlayers = [];

            var _globalPlayers = [...window.globalPlayers];
            var shuffledPlayers = _globalPlayers.sort((a, b) => 0.5 - Math.random());
            
            var index = shuffledPlayers.indexOf(selectedPlayer);
            shuffledPlayers.splice(index, 1);
            selectedPlayer.podiumIndex = 0;
            newPlayers.push(selectedPlayer);

            for (let i = 0; i < 4; i++) { // 4 Opponents
                var p = shuffledPlayers[i];

                p.podiumIndex = i+1;
                newPlayers.push(p);
            }


            window.players = newPlayers;
            localStorage.setItem("current_players", JSON.stringify(newPlayers));

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
            
            var players = [
                {name:"Me", points : 0, avatar : "player_1_avatar"}, 
                {name:"Player2", points : 0, avatar : "player_2_avatar"},
                {name:"Player3", points : 0, avatar : "player_3_avatar"},
                {name:"Player4", points : 0, avatar : "player_4_avatar"},
                {name:"Player5", points : 0, avatar : "player_5_avatar"}
            ]

            localStorage.setItem("current_players", JSON.stringify(players));
        
            var eliminated = [];
            localStorage.setItem("eliminated_players", JSON.stringify(eliminated));
        
            switchScene('gameoverScene');
        }


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





 
 