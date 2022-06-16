// Our scene
// const PLAYERS_COUNT = 5;

//breaking a string
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



var tutoScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "tutoScene" });
    },

    init: function(data) {

        this.lang = localStorage.getItem("lang");

        this.playBtnText = window.localization["PLAY"][localStorage.getItem("lang")];
        this.welcomeText = window.localization["TUTO"][localStorage.getItem("lang")];
        this.sanitizeBtnText = window.localization["SANITIZE"][localStorage.getItem("lang")];
        this.setVolume =parseInt(localStorage.getItem("set_volume"))

        var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
        localStorage.setItem("quizes", JSON.stringify(quizes_ref));

        var fiows_ref = JSON.parse(localStorage.getItem("fiows_ref"));
        localStorage.setItem("fiows", JSON.stringify(fiows_ref));

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));

        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));
        this.setVolume =parseInt(localStorage.getItem("set_volume"))




        // this.mcPoopText = {"fr" : "Choisis ton avatar et commence la partie avec 4 autres joueurs. Le jeu se déroule sur 3 niveaux : facile, moyen et difficile.\nTon parcours débutera avec le niveau facile et ta victoire sera soldée par une coupe qui te permettra de débloquer le niveau moyen jusqu’au niveau difficile.\nPlus tu cumules de poop coins, plus tu restes dans la partie. Dans le cas contraire tu es éliminé.\nTu auras droit à des bonus avec le WC de la Fortune.\nInvestis enfin tes poop coins pour améliorer l'assainissement de ta ville.Alors qu’attends-tu? Nous te mettons au défi.\nALLEZ CHAMPION !!!",
        //                     "en": "Select your avatar, and compete with 4 other player. \nEach correct answer earns you poop coinsThe game has 3 levels- easy, medium, and difficult.After completing each level your score will determine if you win a bronze, silver or gold cup.  If you win one of the cups you will be moved to the next level.The more poop coins you earn, the longer you stay in the game otherwise  you are eliminated. You will earn bonuses with the Toilet of Fortune. \nFinally, invest your poop coins to improve the sanitation of your city.So what are you waiting for? We are challenging you.\nGO CHAMPION!!!"
        //                 }

        this.mcPoopText = {"fr" : "Choisis ton avatar et commence la partie avec 4 autres\njoueurs.\nLe jeu se déroule sur 3 niveaux : facile, moyen et difficile.\nTon parcours débutera avec le niveau facile et ta victoire\nsera soldée par une coupe qui te permettra \nde débloquer le niveau moyen jusqu’au niveau difficile.\nPlus tu cumules de poop coins, plus tu restes dans la partie.\nDans le cas contraire tu es éliminé.\nTu auras droit à des bonus avec le WC de la Fortune.\nInvestis enfin tes poop coins pour améliorer\nl'assainissement de ta ville.\nAlors qu’attends-tu? Nous te mettons au défi.\n\nALLEZ CHAMPION !!!",
                            "en": "Select your avatar, and compete with 4 other player.\nEach correct answer earns you poop coins.\nThe game has 3 levels-easy, medium, and difficult.\nAfter completing each level your score will determine if you\nwin a bronze, silver or gold cup.\nIf you win one of the cups you will be moved to\nthe next level. The more poop coins you earn,\nthe longer you stay in the game\notherwise  you are eliminated.\nYou will earn bonuses with the Toilet of Fortune.\nFinally, invest your poop coins to improve\nthe sanitation of your city.\nSo what are you waiting for? We are challenging you.\n\nGO CHAMPION!!!"
                        }
        // this.missPoopText = {"fr":"A cet effet, Niyel, agence de plaidoyer a créé le jeu Poop Trivia pour toi. Confrontes d’autres joueurs soucieux de l’assainissement comme toi, totalise des points et remporte la coupe en bronze ou en argent. Ou MIEUX !!! Devient sacré gagnant du championnat de l’assainissement édition 2. Il est temps de démontrer si tes compétences en assainissement sont au TOP. Let’s go…",
        //                     "en" : "To this end, Niyel, an advocacy agency has created the game Poop Trivia for you. Face off against other sanitation-conscious players like you, score points and win the bronze or silver cup. Or better !!! Become the crowned winner of the Edition 2 Sanitation Championship. It's time to show off if your sanitation skills are TOP. Let’s go ..."
        //                     }


 },
    preload: function() {

    },
    create: function() {
        
        this.cameras.main.setBackgroundColor('#6effff')

        var _self = this; 
        var bg = this.add.image(0, 0, 'screen_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);

        this.sound.add('buzzer');
        
        this.sound.add('keyboard1');
        
        this.sound.add('keyboard2');

        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

     
        this.titleText = this.add.text(
            screenW * 0.5, screenH * 0.09, this.welcomeText, {fontSize: 32, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

       
        // for switch langages
        this.langage_an = this.add.image(screenW * 0.91, screenH * 0.88, 'langage_EN');
        this.langage_an.setOrigin(0).setInteractive();
        

        this.langage_fr = this.add.image(screenW * 0.91, screenH * 0.88, 'langage_FR');
        this.langage_fr.setOrigin(0).setInteractive();

         // for volumes of sounds
      
        this.volume_on = this.add.image(screenW * 0.85, screenH * 0.88, 'volume_on_small');
        this.volume_on.setOrigin(0).setInteractive();

        this.volume_off= this.add.image(screenW * 0.85, screenH * 0.88, 'volume_off_small');
        this.volume_off.setOrigin(0).setInteractive();


        this.volume_off.on("pointerdown",()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1') 
            }
           
            localStorage.setItem("set_volume",0)
            this.setVolume=1;
        })

        this.volume_on.on("pointerdown",()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1') 
            }
            
            localStorage.setItem("set_volume",1)
            this.setVolume=0;
        })
        

        // function setLangage() {
        
        //     if (_self.lang=="en" ) {
        //         _self.langage_fr.setVisible(true);
        //         _self.langage_an.setVisible(false);
              
        //     } else {
        //         _self.langage_an.setVisible(true);
        //         _self.langage_fr.setVisible(false);
               
        //     }

        // }

        // setInterval(() => {
        //     setLangage()
        // },1000);
        
        this.langage_an.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1'); 
            }
            
            
            // ...
            // setLangage();
            var lang = this.lang;

            switch (lang) {
                case "en":
                    lang = "fr";
                   
                    break;
                case "fr":
                    lang = "en";
                    break;
            } 
            this.lang = lang;
            localStorage.setItem("lang", this.lang);


            // Localize
            localize();
        
        },this);

        this.langage_fr.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1');
            }
          
            // ...
           
            var lang = this.lang;

            switch (lang) {
                case "en":
                    
                    lang = "fr";
                    break;
                case "fr":
                    lang = "en";
                    break;
            } 
            this.lang = lang;
            localStorage.setItem("lang", this.lang);


            // Localize
            localize();

        },this);

     

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
     
        //Btn Play
        var playGroup1 = this.add.group();
        playBox1 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_bg' );
        playBox1.setScale(0.45,  0.55).setInteractive();
        playBox1.depth = 204;
        this.playText1 = this.add.text(
            0, 0, this.playBtnText , {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.5);

        this.playText1.depth = 204;

        playGroup1.addMultiple([playBox1, this.playText1]);
        playGroup1.setXY(screenW * 0.5, screenH * 0.89);

        playBox1.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1'); 
            }
           
            swicthScene("selectionScene");
            // window.location.href='./form.html'

        },this);

        
        //set poop
        this.mcPoop = this.add.image(0, 0, 'poop_happy');
        this.mcPoop.setScale( 0.15).setOrigin(2.7,-0.5);
        this.mcPoop.depth = 202;
     
        this.missPoop = this.add.image(0, 0, 'miss_poop_happy');
        this.missPoop.setScale(-0.15, 0.15).setOrigin(3.3,0.5);
        this.missPoop.depth = 202;
        // this.missPoop.setVisible(false);

        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0, 0, 'box1');
        textBubble.setScale( 0.80, 0.68).setAlpha(1);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            0, 0, breakString(_self.mcPoopText[_self.lang], 68), {fontSize:  18, color: "black",fontStyle: "bold", fontFamily: "Mont", align:"center" }
        ).setOrigin(0.48, 0.50);
        this.notifText.depth = 200;
        answerNotifGroup.addMultiple([this.missPoop,this.mcPoop,  textBubble,  this.notifText])
        // answerNotifGroup.setVisible(false)


        answerNotifGroup.setXY(screenW * 0.40, screenH * 0.8);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.50, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.53, 0 ,1 , 1)

        
        var switchInterval;

        _self.isMc = true;
        
        function switchCharacter(female = true)
        {
            switchInterval = setTimeout(() => {
                
                _self.mcPoop.setVisible(!female);
                _self.missPoop.setVisible(female);

                // let text = female ? _self.missPoopText[_self.lang] : _self.mcPoopText[_self.lang];
                // _self.isMc = female ? false : true;

                // _self.notifText.setText(breakString(text, 30));

                // setTimeout(() => {
                //     let female = false
                //     // switchCharacter(female)
                    
                // }, 600);

            }, 12000);
        }


        // switchCharacter();


        function swicthScene(newScene)
        {
            showLoader()
            _self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;

            if(switchInterval)
                clearInterval(switchInterval);
        }
     

  

        function localize()
        {

            _self.playBtnText = window.localization["PLAY"][_self.lang];
            _self.welcomeText = window.localization["WELCOME"][_self.lang];
            // _self.sanitizeBtnText = window.localization["SANITIZE"][_self.lang];

        }


        

        // DEFINE RANDOM NAMES
        function giveRandomNames(players)
        {

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
        // if(this.currentPlayers.length == PLAYERS_COUNT) // If just started
        // {
        //     giveRandomNames(this.currentPlayers)
        // }

        // Loader
        hideLoader();
       
    },
    
    update: function() {
        // Update Localization
        // this.langText.setText(this.lang) 
        this.playText1.setText(this.playBtnText)
        this.titleText.setText(this.welcomeText)
        if(this.isMc)
        {
            // this.notifText.setText(breakString(this.mcPoopText[this.lang], 50));
            this.notifText.setText(this.mcPoopText[this.lang]);
        }
        else
        {
            // this.notifText.setText(breakString(this.missPoopText[this.lang], 50));
            this.notifText.setText(this.missPoopText[this.lang]);
        }
        // this.playText2.setText(this.sanitizeBtnText)

        if (this.lang=="en" ) {
            this.langage_fr.setVisible(true);
            this.langage_an.setVisible(false);
          
        } else {
            this.langage_an.setVisible(true);
            this.langage_fr.setVisible(false);
           
        }

        if (localStorage.getItem("set_volume")!=null) {
            
            if (this.setVolume==0) {
                this.volume_on.setVisible(false);
                this.volume_off.setVisible(true);
                localStorage.setItem("set_volume",0)
            } else {
                this.volume_off.setVisible(false);
                this.volume_on.setVisible(true);
                localStorage.setItem("set_volume",1)
            }
        }
        
    }
});



 
 