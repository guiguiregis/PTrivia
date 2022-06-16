
function getFileId(url){
    return url.split('/')[5];
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}


var wordImageScene= new Phaser.Class({

    Extends:Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "wordImageScene" });

    },

    init:function(data){

        console.log("init");
        // window.m_currentQuizIndex = 0;
        // let m=localStorage.getItem("fiows_ref");
        // console.log(m);

        this.currentModeName = window.localStorage.getItem("current_mode")

        this.currentMode = window.modes[this.currentModeName];
        this.setVolume =parseInt(localStorage.getItem("set_volume"))
        this.currentLevel = parseInt(window.localStorage.getItem("current_level"));
        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        // this.currentPoints = parseInt(window.localStorage.getItem("points"));
        this.currentBonusPq = parseInt(window.localStorage.getItem("bonus_pq"));
          
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));

        this.lang = localStorage.getItem("lang");
        // this.score = 0;
        this.m_papers = 0;
        this.m_corrects = 0;
        this.m_errors = 0; 

        // var fetchedFiows = [...window.fiows];
        this.remoteFiows = JSON.parse(localStorage.getItem("fiows"));
        // var fetchedFiows = [...this.remoteFiows];

        // // console.log(remoteFiows)
        // var sorted = [];
        // for (var i = 3; i >= 0; --i) {

        //     var r = Math.floor(Math.random() * (1 + (fetchedFiows.length-1)));
        //     var element = fetchedFiows[r];

        //     // Add and delete
        //     sorted.push(element);
        //     var f = fetchedFiows.splice(r, 1);
        //     // console.log(f);
            
        // }

        // var shuffledQuizzes = fetchedFiows.sort((a, b) => 0.5 - Math.random());
        // this.fiows = sorted;
        // localStorage.setItem("fiows", JSON.stringify(fetchedFiows))
        // console.log(fetchedFiows)



        this.currentPlayerName = window.localStorage.getItem("player_name");

        // Reset all scores :

        //    var qualified = JSON.parse(localStorage.getItem('current_players'));

        //      for (let i = 0; i < qualified.length; i++) {
                    
        //          qualified[i].points = 0;
        //          localStorage.setItem('current_players', JSON.stringify(qualified));
        //         //  console.log(qualified)
        //      }
    
        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        currentPlayersPrev = [...this.currentPlayers];

        this.currentPoints = this.currentPlayers.find(p=>p.name == this.currentPlayerName).points;
        this.score = this.currentPoints;


        // console.log(this.currentPlayers);

        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
        this.question = localStorage.getItem("lien")

        this.newPlayer=parseInt(localStorage.getItem("newPlayer"))

        this.first_time=parseInt( localStorage.getItem('world_first_time'))

        this.text_tuto_header=window.localization["QUIZZ1"][localStorage.getItem("lang")];
        this.text_tuto=window.localization["TUTO4"][localStorage.getItem("lang")];
        this.reponse=window.localization["TUTO3"][localStorage.getItem("lang")];
        this.playBtnText=window.localization["PLAY"][localStorage.getItem("lang")];
    },

    
    preload:function(){

        this.load.crossOrigin = 'anonymous';

        // this.load.baseURL = 'https://s3-eu-west-1.amazonaws.com/xzyvmgtxseboq/';

        // this.load.image("quiz_img",'adidas_300x250.jpg')

        // console.log(this.load.);
        // this.load.image('top_banner', './assets/top_banner.png');
        // this.load.image('screen_base', './assets/screen_base.png');
        // this.load.image('quiz_header_correct','./assets/quiz_header_correct.png')
        // this.load.image('quiz_header_false','./assets/quiz_header_false.png')
        // this.load.image('exit_btn','./assets/exit_btn.png')
        // this.load.image('coin_header_bg','./assets/coin_header_bg.png')
        // this.load.image('quiz_header_paper','./assets/quiz_header_paper.png')
        // this.load.image('btn_default','./assets/box3.png')
        // this.load.image('btn_green','./assets/btn_green.png')
        // this.load.image('btn_red','./assets/btn_red.png')
        // this.load.image('box1','./assets/box1.png')
        // // this.load.image('Poopguysad','./assets/Poop/Poopguysad.png');
        // this.load.image('text_bubble_oriente','./assets/text_bubble_oriente.png')
        // this.load.image('perso_3','./assets/perso_3.png')
        // this.load.image('player_bg', './assets/player_bg.png')


        // //add by Marius 
        // this.load.image('miss_poop_happy',  './assets/Poop/Poopgirlhappy_oriente.png');
        // this.load.image('miss_poop_sad',  './assets/Poop/Poopgirlsad_oriente.png');
        // this.load.image('poopHappy', './assets/Poop/Poopguyhappy_oriente.png');
        // this.load.image('Poopguysad',  './assets/Poop/Poopguysad_oriente.png');
        
        // //Players

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

      
        // this.load.image("quiz_img",'https://i.ibb.co/JsPFqYq/Parchment.png')


        // Fiows
        // console.log(this.remoteFiows)
        for (let i = 0; i < this.remoteFiows.length; i++) {
            
            var f = this.remoteFiows[i];
            var imgUrl = f.questions[this.lang];
            var id = f.id;
            var key = "fiow_"+id;
            this.load.image(key,imgUrl)
        
        }

    },

    create:function(){

        const newPlayer=this.newPlayer
        this.cameras.main.setBackgroundColor('#6effff')
        _self=this;

        var answerNotifTO;

       if (this.setVolume==1) {
           
            this.sound.add('buzzer');
          
            this.sound.add('keyboard1');
            
            this.sound.add('keyboard2');
       }

       function playSound(t){
            if (_self.setVolume==1) {
                _self.sound.play(t);  
            }
       }



        function first_time() {

            if (_self.first_time===0) {

                var bg1 = _self.add.image(0, 0, 'screen_base');
                bg1.setScale(window.bg_x_scale, window.bg_y_scale+0.3).setOrigin(0);
         
                var top_banner1 = _self.add.image(screenW*0.5, 35, 'top_banner');
                top_banner1.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

                
               var title = _self.add.text(
                screenW*0.5, 35,_self.text_tuto_header, {fontSize: 40, color: "white",fontStyle: "bolder", fontFamily: "Helvetica" }
                ).setOrigin(0.5, 0.5);
              
                //set box of image
                var boxImage1=_self.add.image(screenW*0.47, screenH*0.58, 'box1');
                boxImage1.setScale(window.bg_x_scale*0.5,window.bg_y_scale*0.48)
        
          // image
                 _self.quizImgQuestion1 =_self.add.image(screenW * 0.45,screenH * 0.65, "Truck");
                 
                 _self.quizImgQuestion1.setScale(window.bg_x_scale*0.45,window.bg_y_scale*0.4);

                
                var answerNotifGroup1 = _self.add.group();
                var textBubble1 = _self.add.image(screenW*0.3, screenH*0.45, 'bubble_intro');
                textBubble1.setScale(-1.5, 1.9);
               // textBubble1.depth = 200;  

                //set poop

                _self.mcPoop1 = _self.add.image(screenW*0.1, screenH*0.85, 'miss_poop_happy');
                _self.mcPoop1.setScale(0.15,0.15);
                _self.mcPoop1.depth = 200;
        
                _self.notifText1 = _self.add.text(
                    screenW*0.33, screenH*0.4,_self.text_tuto, {fontSize:20, color: "black",fontStyle: "bold", fontFamily: "Helvetica" }
                ).setOrigin(0.6,0.5);
                _self.notifText1.depth = 250;
                _self.notifText1.setVisible(true)
        
                answerNotifGroup1.addMultiple([_self.mcPoop1, textBubble1, _self.notifText1])
                answerNotifGroup1.setVisible(true)
             
                // 
        //     // Answer Block
                var answerGroup11 = _self.add.group();
                answerBox11 = _self.add.image(screenW*0.90, 295, 'btn_default');
                answerBox11.setScale(0.28).setInteractive();

                answer11 = _self.add.text(
                    0, 0, _self.reponse[0], {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                ).setOrigin(0.5, 0.5);

                answerGroup11.addMultiple([answerBox11, answer11])
                answerGroup11.setXY(screenW*0.81, screenH*0.36)

            //     // Answer Block
                var answerGroup22 = _self.add.group();
                answerBox22 = _self.add.image(screenW*0.90, 290, 'btn_default');
                answerBox22.setScale(0.28).setInteractive();

                answer22 = _self.add.text(
                    0, 0,_self.reponse[1], {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                ).setOrigin(0.5, 0.5);

                answerGroup22.addMultiple([answerBox22, answer22])
                answerGroup22.setXY(screenW*0.81,  screenH*0.50);

        
        //     },this);

        //     // Answer Block
                var answerGroup33 = _self.add.group();
                answerBox33 = _self.add.image(screenW*0.90, 370, 'btn_default');
                answerBox33.setScale(0.28).setInteractive();

                answer33 = _self.add.text(
                    0, 0,_self.reponse[2], {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                ).setOrigin(0.5, 0.5);

                answerGroup33.addMultiple([answerBox33, answer33])
                answerGroup33.setXY(screenW*0.81, screenH*0.63);
        
                        
            //     // Answer Block
    
                var answerGroup44 = _self.add.group();
                
                answerBox44 = _self.add.image(screenW*0.90, 300, 'btn_default');
                answerBox44.setScale(0.28).setInteractive();

                answer44 = _self.add.text(
                    0, 0, _self.reponse[3], {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                ).setOrigin(0.5, 0.5);

                answerGroup44.addMultiple([answerBox44, answer44])
                answerGroup44.setXY(screenW*0.81,  screenH*0.77);    
                   

                playBox11 = _self.add.image(screenW * 0.78, screenH * 0.89, 'btn_bg' );

                playBox11.setScale(0.72,  0.75).setInteractive();
        
                _self.playText11 = _self.add.text(

                screenW * 0.72, screenH * 0.88, _self.playBtnText , {fontSize: 30, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }

                ).setOrigin(0, 0.5);

           
                let table=  [bg1,top_banner1,title,boxImage1,_self.mcPoop1,answerNotifGroup1,textBubble1,_self.notifText1,
                    answerNotifGroup1,_self.quizImgQuestion1,answerGroup11,answerGroup22,answerGroup33,answerGroup44,
                    answerBox11, answer11,answerBox22, answer22, answerBox33, answer33,answerBox44, answer44,playBox11,_self.playText11
                ]

                let table1=[headerGroupPaper,_self.podiumScore,bg,top_banner,_self.mcPoop,answerBox1,answerBox2,answerBox3,answerBox4,
                 answerNotifGroup, _self.boxImage]

                for (let index = 0; index < table.length; index++) {
                
                    const element = table[index];
            
                    if (element!=textBubble1 && element!=_self.playText11 && element!=_self.mcPoop1 && element!=playBox11 && element!=answerNotifGroup1 && element!=_self.notifText1 ) {

                        element.setAlpha(0.9);
                    }
                         
                }

                for (let index = 0; index < table1.length; index++) {
                    const element = table1[index];
                    element.setVisible(false);
                }

                playBox11.on('pointerdown', ()=>{

                        localStorage.setItem('world_first_time',1)

                        for (let index = 0; index < table.length; index++) {
                            const element = table[index];
                            element.destroy();
                        }

                        for (let index = 0; index < table1.length; index++) {
                            const element = table1[index];
                          
                            element.setVisible(true)
                            
                            answerNotifGroup.setVisible(false);
                            _self.mcPoop.setVisible(false);
                            textBubble.setVisible(false);
                            _self.notifText.setVisible(false);
                        }
                           
        

                    }
                )


            }
        }

        // localStorage.setItem('world_first_time',0)

        var bg = this.add.image(0, 0, 'screen_base');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);

        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));

        // var player_bg = this.add.image(screenW * 0.01, screenH * 0.30, 'player_bg');
        // player_bg.setOrigin(0, 0).setScale(0.65);

        //btn exit
        var closeBtn=this.add.image(screenW*0.95, 40, 'exit_btn');
            closeBtn.setScale(0.5,0.5).setInteractive();
        
        closeBtn.on('pointerdown', ()=>{
            // ...
            if (confirm("Quitter le jeu")) {
                var fiows_ref = JSON.parse(localStorage.getItem("fiows_ref"));
                localStorage.setItem("fiows", JSON.stringify(fiows_ref));
                leave();
            }

        },this); 

        function leave() {
            switchScene('selectionScene');
        }

         
        // var coinHeaderCorrect=this.add.image(screenW*0.3, 40, 'quiz_header_correct');
        //     coinHeaderCorrect.setScale(0.3,0.3)

        // var coinHeaderFalse=this.add.image(screenW*0.5, 40, 'quiz_header_false');
        // coinHeaderFalse.setScale(0.3,0.3)

        var coin_header_bg=this.add.image(screenW*0.80, 40, 'coin_header_bg');
        coin_header_bg.setScale(0.75)

        
        // var quiz_header_paper=this.add.image(screenW*0.1, 52, 'quiz_header_paper');
        // quiz_header_paper.setScale(0.5,0.6)

      

        //set box of image
       this.boxImage=this.add.image(screenW*0.35, screenH*0.58, 'box1');
        this.boxImage.setScale(window.bg_x_scale*0.48,window.bg_y_scale*0.48)

        // Player
        // var selectedPlayerName = localStorage.getItem("player_name");
        // var selectedPlayerAvatar = this.currentPlayers.find(p=>p.name == selectedPlayerName).avatar;

        // var player = this.add.image(screenW * 0.17, screenH *  0.61, selectedPlayerAvatar );
        // player.setScale(0.54);
        
        
        // //Podium
        // var podium = this.add.image(screenW * 0.06 , screenH * 0.75, 'podium' );
        // podium.setScale(1.8).setOrigin(0);

        // // SCORE
        // this.podiumScore2 = this.add.text(
        //     screenW * 0.155, 
        //     screenH *  0.84,
        //     this.score.toString(), 
        //     {
        //         fontSize: 40,
        //         color: "white",
        //         fontStyle: "bold",
        //         fontFamily: "Impact",
        //         textAlign:"center"
        //     }
        // )

        //set poop

        this.mcPoop = this.add.image(screenW*0.9, screenH*0.85, 'Poopguysad');
        this.mcPoop.setScale(-0.15,0.15);
        this.mcPoop.depth = 200;
        
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(screenW*0.85, screenH*0.65, 'text_bubble_oriente');
        textBubble.setScale(0.25, 0.25);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            screenW*0.85,screenH*0.65, "c'est\n faux", {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.6, 0.8);
        this.notifText.depth = 200;

        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        answerNotifGroup.setVisible(false)


        
        //text in the head
         var headerGroupPaper = this.add.group();
         var headerBgPaper = this.add.image(0, 0, 'quiz_header_paper' );
         headerBgPaper.setScale(0.650);
         this.headerTextPaper = this.add.text(
             0, 0, this.currentBonusPq.toString(), {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
         ).setOrigin(0.5);
         headerGroupPaper.addMultiple([headerBgPaper, this.headerTextPaper]) 
         headerGroupPaper.setXY(screenW * 0.08, screenH *  0.095);  
         headerGroupPaper.propertyValueSet("x", screenW * 0.10, 0 ,1 , 1)
         headerGroupPaper.propertyValueSet("y", screenH *  0.087, 0 ,1 , 1)
        //this.hpaper=this.add.text(screenW*0.1, 36, "3", { fontSize: '19px', fill: 'white' });
        // this.hcorrect=this.add.text(screenW*0.3, 36,this.m_corrects.toString(), { fontSize: '19px',fill: 'white' });
        // this.hfalse=this.add.text(screenW*0.5, 36, this.m_errors.toString(), { fontSize: '19px',fill: 'white' });
        
        var PqHint = this.add.image(screenW * 0.21, screenH * 0.08, 'pq');
        PqHint.setScale(0.55).setInteractive();

        if(_self.currentBonusPq == 0)
        {
            PqHint.setVisible(false)
        }

        PqHint.on('pointerdown', ()=>{
            
            if(_self.currentBonusPq > 0)
            {

                applyBonusPqHalf();

                _self.currentBonusPq--;
                localStorage.setItem('bonus_pq' , _self.currentBonusPq)
                _self.headerTextPaper.setText(_self.currentBonusPq)

                if(_self.currentBonusPq == 0)
                {
                    PqHint.setVisible(false)
                }
            }

        },this);
        
        
        function applyBonusPqHalf(){

            getTwoWrongAnswers(shuffledQuizAnswers)

        }


        function cheatRightAnswer(answers)
        {

            var rightAnswerIndex = answers.findIndex(a=>a.isCorrect == true);

            setTimeout(() => {
                
                switch (rightAnswerIndex) {
                    case 0: answerBox1.setTexture('btn_green');
                        break;
                    case 1: answerBox2.setTexture('btn_green');
                        break;
                    case 2: answerBox3.setTexture('btn_green');
                        break;
                    case 3: answerBox4.setTexture('btn_green');
                        break;
                    default:
                        console.log("erreur");
                }

                getAnswer(true);

            }, 1500);
        }


        function getTwoWrongAnswers(answers)
        {

            var rightAnswerIndex = answers.findIndex(a=>a.isCorrect == true);
            var indexes = [];
            for (let i = 0; i < answers.length; i++) {
            
                if(i != rightAnswerIndex && indexes.length < 2)
                {
                    indexes.push(i);
                }
                
            }


            for (let j = 0; j < indexes.length; j++) {
                let switcher = indexes[j];
                switch (switcher) {
                    case 0: answerBox1.setTexture('btn_red').setAlpha(0.6);
                        break;
                    case 1: answerBox2.setTexture('btn_red').setAlpha(0.6);
                        break;
                    case 2: answerBox3.setTexture('btn_red').setAlpha(0.6);
                        break;
                    case 3: answerBox4.setTexture('btn_red').setAlpha(0.6);
                        break;
                    default:
                        // console.log("erreur");
                }

            
            }
        }



        function getQuiz()
        {
            var remoteFiows =[];
            // if (localStorage.getItem("fiows")!=null) {
                remoteFiows = JSON.parse(localStorage.getItem("fiows"));
            // } else {
            //     console.log(remoteFiows);
            // }
            
            //t
            // remoteFiows = JSON.parse(localStorage.getItem("fiows_ref"));
    
            var fetchedFiows = [...remoteFiows];
    
            var fetchedLevelFiows = fetchedFiows.filter((q)=>q.level == _self.currentLevel);
            // var fetchedLevelFiows = fetchedFiows; // No quiz with level 3 for the moment
    
            // console.log(fetchedLevelFiows);
    
            // console.log(remoteFiows)
            // console.log(fetchedLevelFiows)
            var sorted = [];
    
            var r = Math.floor(Math.random() * (1 + (fetchedLevelFiows.length-1)));
            var element = fetchedLevelFiows[r];

            // Add and delete
            sorted.push(element);
            fetchedLevelFiows.splice(r, 1);
               
    
            _self.fiows = sorted;
            localStorage.setItem("fiows", JSON.stringify(fetchedLevelFiows))


        }


       this.playersAvatars = [];

        function shifter(data, key)
        {
            data.forEach(function(item,i){
                if(item.name === key){
                  data.splice(i, 1);
                  data.unshift(item);
                }
              });
        } 

        function createPlayersAvatar(playersArrayPrev, playersArray)
        {

            shifter(playersArrayPrev, _self.currentPlayerName);
            shifter(playersArray, _self.currentPlayerName);

            for (let k = 0; k < playersArray.length - 1; k++) {
            
                if(_self.playersAvatars[k])
                    _self.playersAvatars[k].destroy(true);
            }


            for (let i = 1; i < playersArray.length; i++) { // Current player is skipped
               
                var pad = ((i-1)* 105);

                _self.playersAvatars[i-1] = _self.add.group();
                _self.playersAvatars[i-1].avatar = _self.add.image(0, 0, playersArray[i].avatar);
                _self.playersAvatars[i-1].avatar.setScale(0.18)
                // var sprite = 'quiz_header_false';
                // if(playersArray[i].points > playersArrayPrev[i-1].points)
                    sprite = 'quiz_header_correct';

                    // console.log(playersArray[i].points + " - " + playersArrayPrev[i-1].points)

                _self.playersAvatars[i-1].bg = _self.add.image(0, 0, sprite);
                _self.playersAvatars[i-1].bg.setScale(0.20);
                _self.playersAvatars[i-1].text = _self.add.text(
                    0, 0, playersArray[i].points.toString(), {fontSize: 18, color: "white",fontStyle: "bold", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.30);
                _self.playersAvatars[i-1].addMultiple([_self.playersAvatars[i-1].avatar, _self.playersAvatars[i-1].bg, _self.playersAvatars[i-1].text])
                var x =  screenW * 0.25 + pad ;
                

                _self.playersAvatars[i-1].setXY(x, screenH *  0.07);  
                _self.playersAvatars[i-1].propertyValueSet("x", x , 0 ,1 , 1)
                _self.playersAvatars[i-1].propertyValueSet("y", screenH * 0.13, 0 ,1 , 1)
                 
            
            }
    
        }


        createPlayersAvatar(currentPlayersPrev, _self.currentPlayers);
        


        this.podiumScore =this.add.text(screenW*0.81, 30.9 , this.currentPoints.toString(), { fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" });

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

        //initialize question
        var shuffledQuizAnswers = [];

        function initQuiz() {
         
            // Get QUIZ
            getQuiz();
            // var quiz = _self.quizes[m_currentQuizIndex];
            var quiz = _self.fiows[0];
            var quizAnswers = quiz.answers[_self.lang];
            shuffledQuizAnswers = quizAnswers.sort((a, b) => 0.5 - Math.random());

            // Cheat for right answer
            // cheatRightAnswer(shuffledQuizAnswers);


            // console.log(quiz);
            
            // Empty
            if(answerBox1)
            {
                _self.quizImgQuestion.destroy(true);

                answerBox1.destroy(true);
                answerBox2.destroy(true);
                answerBox3.destroy(true);
                if(answerBox4)
                answerBox4.destroy(true);

                answer1.destroy(true);
                answer2.destroy(true);
                answer3.destroy(true);
                if(answer4)
                answer4.destroy(true);

            }
            
            // image
            _self.quizImgQuestion =_self.add.image(screenW * 0.35,screenH * 0.57, "fiow_");
            _self.quizImgQuestion.setScale(window.bg_x_scale*0.42,window.bg_y_scale*0.4);

            let questionImg = 'fiow_'+quiz.id;
            console.log(questionImg)
             
            setTimeout(() => {
                    
                _self.quizImgQuestion.setTexture(questionImg)

                var imgW = _self.quizImgQuestion.width;
                var imgH = _self.quizImgQuestion.height;
                
                var divider = imgW > imgH ? imgW : imgH;

                var scaler = screenW / divider;
                // console.log(scaler)
                _self.quizImgQuestion.setScale(scaler * 0.45)
            }, 10);

            // console.log('https://drive.google.com/uc?export=view&id='+question);
            
            //console.log(c)
            // quizImgQuestion.setTexture("quiz_img");
            // quizImgQuestion.setScale(1)

        
            // Answer Block
            var answerGroup1 = _self.add.group();
            answerBox1 = _self.add.image(screenW*0.90, 295, 'btn_default');
            answerBox1.setScale(0.35, 0.32).setInteractive();

            answer1 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[0].answer, 14) , {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.5);

            answerGroup1.addMultiple([answerBox1, answer1])
            answerGroup1.setXY(screenW*0.682, screenH*0.34)

            answerBox1.on('pointerdown', ()=>{

                // ..

                if (shuffledQuizAnswers[0].isCorrect) {
                    
                    playSound('buzzer');
                    
                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                    

                    answerBox1.setTexture("btn_green");
                   
                    setTimeout(() => {
                        getAnswer(true);
                    }, 300);
                   // toggleAnserNotif(true, true);

                } else{ 
                    
                    playSound('keyboard2'); 
                     
                    toggleAnserNotif(false, true);

                    getAnswer(false);

                    answerBox1.setTexture("btn_red");
                   
                }

            },this);

            // Answer Block
            var answerGroup2 = _self.add.group();
            answerBox2 = _self.add.image(screenW*0.90, 290, 'btn_default');
            answerBox2.setScale(0.35, 0.32).setInteractive();

            answer2 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[1].answer, 14), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.5);

            answerGroup2.addMultiple([answerBox2, answer2])
            answerGroup2.setXY(screenW*0.682,  screenH*0.50);
            
            answerBox2.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[1].isCorrect) {
                    playSound('buzzer');
                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                    
                    answerBox2.setTexture("btn_green");
                    //toggleAnserNotif(true, true);
                 
                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{       
                    playSound('keyboard2'); 
                    toggleAnserNotif(false, true);
                    getAnswer(false);

                    answerBox2.setTexture("btn_red");
                    
                }

            },this);

            // Answer Block
            var answerGroup3 = _self.add.group();
            answerBox3 = _self.add.image(screenW*0.90, 370, 'btn_default');
            answerBox3.setScale(0.35, 0.32).setInteractive();

            answer3 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[2].answer, 14), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.5);

            answerGroup3.addMultiple([answerBox3, answer3])
            answerGroup3.setXY(screenW*0.682, screenH*0.66);

            answerBox3.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[2].isCorrect) {
                    playSound('buzzer');


                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                    
                    answerBox3.setTexture("btn_green");
                   // toggleAnserNotif(true, true);

                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{        
                    playSound('keyboard2');   
                    toggleAnserNotif(false, true);
                    getAnswer(false);
                    answerBox3.setTexture("btn_red");
                }

            },this);
            // Answer Block

            var answerGroup4 = _self.add.group();
           
                answerBox4 = _self.add.image(screenW*0.90, 300, 'btn_default');
                answerBox4.setScale(0.35, 0.32).setInteractive();

                answer4 = _self.add.text(
                    0, 0, breakString(shuffledQuizAnswers[3].answer, 14), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.5);

                answerGroup4.addMultiple([answerBox4, answer4])
                answerGroup4.setXY(screenW*0.682,  screenH*0.82);

                answerBox4.on('pointerdown', ()=>{
                    // ...

                    if (shuffledQuizAnswers[3].isCorrect) {
                        
                        playSound('buzzer');

                        disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                        
                        answerBox4.setTexture("btn_green");
    
                        setTimeout(() => {
                            getAnswer(true);
                       }, 300);
    
                    } else{
                        playSound('keyboard2');  
                        answerBox4.setTexture("btn_red");
                        getAnswer(false);
                        localStorage.removeItem("")

                        toggleAnserNotif(false, true);
                    }

                },this);                

            // Hide void
            if(shuffledQuizAnswers[0].answer == "")
            {
                answerBox1.setAlpha(0).setInteractive(false);
            }
            if(shuffledQuizAnswers[1].answer == "")
            {
                answerBox2.setAlpha(1).setInteractive(false);
            }
            if(shuffledQuizAnswers[2].answer == "")
            {
                answerBox3.setAlpha(2).setInteractive(false);
            }
            if(shuffledQuizAnswers[3].answer == "")
            {
                answerBox4.setAlpha(3).setInteractive(false);

            }
        }

        function disableAnswersBtns(btns = [])
        {
            for (let i = 0; i < btns.length; i++) {
                const btn = btns[i];
                btn.disableInteractive();
            }
        }


        initQuiz();


        this.playersAvatars = [];
        
        //shifter fonction for key
        function shifter(data, key)
        {
            data.forEach(function(item,i){
                if(item.name === key){
                  data.splice(i, 1);
                  data.unshift(item);
                }
              });
        }
        
        //create players avatar
        function createPlayersAvatar(playersArrayPrev, playersArray)
        {

            shifter(playersArrayPrev, _self.currentPlayerName);
            shifter(playersArray, _self.currentPlayerName);

            for (let k = 0; k < playersArray.length - 1; k++) {
            
                if(_self.playersAvatars[k])
                    _self.playersAvatars[k].destroy(true);
            }


            for (let i = 1; i < playersArray.length; i++) { // Current player is skipped
               
                var pad = ((i-1)* 105);

                _self.playersAvatars[i-1] = _self.add.group();
                _self.playersAvatars[i-1].avatar = _self.add.image(0, 0, playersArray[i].avatar);
                _self.playersAvatars[i-1].avatar.setScale(0.18)
                // var sprite = 'quiz_header_false';
                // if(playersArray[i].points > playersArrayPrev[i-1].points)
                    sprite = 'quiz_header_correct';

                    // console.log(playersArray[i].points + " - " + playersArrayPrev[i-1].points)

                _self.playersAvatars[i-1].bg = _self.add.image(0, 0, sprite);
                _self.playersAvatars[i-1].bg.setScale(0.20);
                _self.playersAvatars[i-1].text = _self.add.text(
                    0, 0, playersArray[i].points.toString(), {fontSize: 18, color: "white",fontStyle: "bold", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.30);
                _self.playersAvatars[i-1].addMultiple([_self.playersAvatars[i-1].avatar, _self.playersAvatars[i-1].bg, _self.playersAvatars[i-1].text])
                var x =  screenW * 0.3 + pad ;
                

                _self.playersAvatars[i-1].setXY(x, screenH *  0.07);  
                _self.playersAvatars[i-1].propertyValueSet("x", x , 0 ,1 , 1)
                _self.playersAvatars[i-1].propertyValueSet("y", screenH * 0.13, 0 ,1 , 1)
                 
            
            }
    
        }
        
        //populate players
        function populatePlayers()
        {
            // Populate currentPlayers // Populate EliminatedPlayers
            //console.log(_self.currentRound)

            switch (_self.currentRound) {
                case 1: // Two players are eliminated
                    initPlayers(2);
                    break;
                
                case 2: // One player is eliminated
                    initPlayers(1);
                    break;

                case 3: // One player is eliminated
                    initPlayers(1);
                    break;

            }

        }
        
        //init players
        function initPlayers(eliminatedCount)
        {
            var sortedByScore = _self.currentPlayers.sort((a, b) => {
                return b.points - a.points;
            });

            var qualifiedPlayers = [];
            var eliminatedPlayers = [];

            // Qualified
            for (let i = 0; i < sortedByScore.length - eliminatedCount; i++) {
                
                let qualified = sortedByScore[i];
                qualifiedPlayers.push(qualified);
            }
            // Eliminated
            for (let i = (sortedByScore.length - eliminatedCount); i < sortedByScore.length; i++) {
                
                let eliminated = sortedByScore[i];
                eliminatedPlayers.push(eliminated);
            }

            localStorage.setItem('current_players', JSON.stringify(qualifiedPlayers));
            localStorage.setItem('eliminated_players', JSON.stringify(eliminatedPlayers));

            //console.log(qualifiedPlayers);
            //console.log(eliminatedPlayers);

        }
        
        //simulated oppen score
        function simulateOpponentsScores(playerScore)
        {

            let modeBaseProba = _self.currentMode.baseProbaRightAnswer;
            let modeMarginProba = _self.currentMode.marginProbaRightAnswer;
            let randomBaseMax = modeMarginProba / 5 + 1; 
            

            _self.currentPlayers.find(p=>p.name == _self.currentPlayerName).points = playerScore;
 
            for (let i = 0; i < _self.currentPlayers.length; i++) {
                
                if(_self.currentPlayers[i].name != _self.currentPlayerName)
                {
                    var signs = [1, -1];
                    var signIndex = Math.floor(Math.random() * (1 + 1));
                    var sign = signs[signIndex];
        
                    let margin = Math.floor(Math.random()*randomBaseMax)*5;
                    margin = margin * sign;
                    let rightAnswerProba = modeBaseProba + margin;
                    let wrongAnswerProba = 100 - rightAnswerProba;
        
                    var points = [{point : 1, power : rightAnswerProba}, {point : 0, power : wrongAnswerProba}];
                    points = points.sort((a, b) => 0.5 - Math.random());

                    var p = getRandomWithWeight(points);
                    _self.currentPlayers[i].points = _self.currentPlayers[i].points +( p * 10);
                }
            }

            localStorage.setItem('current_players', JSON.stringify(_self.currentPlayers));


            //console.log(_self.currentPlayers)

        }
        
        //anather round
        function getRandomWithWeight(items)
        {
            let point = items[0].point;

            let r = Math.floor(Math.random() * (1 + 100));
 
            for (var i = 0; i < items.length; i++)
            {
                let proportion = items[i].power;
                
                if (r > 0 && r <= proportion)
                {
                  
                    point = items[i].point;
                    break;
                }
                else
                {
                    r = r - proportion;
                }

            }

            return point;
        }

        //function for concatenation
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

        //function for concatenation
        function toggleAnserNotif(isCorrect = true, toHide = true)
        {
          
            
           var right_answers = {"en" : ["Bravo", "That's the right answer!", "Right on! ", "Well done!"], "fr" : ["Bravo !","C’est la bonne réponse !","Tout juste !","Bien joué !"]};
            var wrong_answers = {"en" : ["No!", "Not really!" , "No, it's not! ", "Almost, but ... no! "], "fr": ["Nope !" ,"Pas vraiment !" ,"Non, ce n’est pas ça !" ,"Presque, mais… non !"]};

            let answer;

            //add by marius to alter miss poop and mr poop
            let ans=getRandomArbitrary(1,10);

            let poopSprite='miss_poop_happy';

            //end

            if(!isCorrect)
            {
                 answer = breakString(wrong_answers[_self.lang][Math.floor(Math.random() * (1 + (wrong_answers[_self.lang].length-1)))], 8)

                 //add by Marius
                 if (ans%2==0) {
                    poopSprite = 'miss_poop_sad'; 
                 
                 } else {
                    poopSprite = 'Poopguysad'
    
                 }
                //  console.log("ok je suis en 1")
                 
            }else{
                answer = breakString(right_answers[_self.lang][Math.floor(Math.random() * (1 + (right_answers[_self.lang].length-1)))], 8)
     
                if (ans%2==0) {
                    poopSprite = 'poopHappy';
                }
                // console.log("ok je suis en 2")
            }

            localStorage.setItem("poop", poopSprite);
            _self.notifText.setText(answer)
            _self.mcPoop.setTexture(poopSprite)

            answerNotifGroup.setVisible(true);

            if(toHide)
            { 
                answerNotifTO = setTimeout(() => {
                    answerNotifGroup.setVisible(false)
                }, 1000);
            }
        }
    
        //function that get usr answers
        function getAnswer(isCorrect){
            // //console.log("Clicked !!! "+ isCorrect);
            let nbreResp=0;

            if (localStorage.getItem("nbreResp")!=null) {
                nbreResp +=parseInt(localStorage.getItem("nbreResp"))
            
            }

            if(isCorrect)
            {   
                // Simulate score here
                _self.m_corrects +=1;
                // _self.hcorrect.setText(_self.m_corrects.toString());

                localStorage.removeItem("nbreResp");

                switch (nbreResp) {

                    case 0:
                        _self.score += 20;
                        
                        break;

                    case 1:
                        _self.score += 10;
                        
                        break;

                    case 2:
                        _self.score += 5;
                        
                        break;

                    default:
                        _self.score +=0;
                        
                        break;
                }
                // console.log("nbre fois: "+nbreResp);
                // console.log(_self.score);
                

            }else{

                _self.m_errors +=1;
                // _self.hfalse.setText(_self.m_errors.toString())
                nbreResp +=1;
                localStorage.setItem("nbreResp",nbreResp);

            }


            // _self.podiumScore.setText(_self.score.toString());
            //_self.podiumScore2.setText(_self.score.toString());

            // Simulate scores ...
            simulateOpponentsScores(_self.score);

            // Update UI
            createPlayersAvatar(currentPlayersPrev, _self.currentPlayers);

            // Update prev for refs
            // currentPlayersPrev = _self.currentPlayers;
            console.log(m_currentQuizIndex)
            // if(m_currentQuizIndex < 4)
            // {
                
                // Notif
                toggleAnserNotif(isCorrect, true);

                
                if (isCorrect) {
                    m_currentQuizIndex++;
                    localStorage.removeItem("nbreResp");

                    setTimeout(() => {
                        
                        let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];
                        
                        // added 
                        localStorage.setItem("laScene",scene);
 
                        //Update chain
                        _self.currentRoundChainIndex+=1;
                        localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

                        if(_self.currentRoundChainIndex == 5)
                        {
                            if(_self.currentRound < ROUND_MAX )
                            {
                                //Update round
                                localStorage.setItem("current_round", _self.currentRound+1);
                                localStorage.setItem("roundChainIndex", 0);

                                //Goto recap screen for next round / or replay
                                clearLevel();
            
                            }
                            else // MAX ROUND REACHED for CURRENT LEVEL
                            {    
            
                                if(_self.currentLevel < LEVEL_MAX)
                                {
                                    localStorage.setItem("current_round", 1);
                                    localStorage.setItem("current_level", _self.currentLevel+1);
                                    localStorage.setItem("roundChainIndex", 0);
            
                                    // Goto next round
                                    var assignTrophee = true;
                                    clearLevel(assignTrophee);
            
                                }
                                else // MAX LEVEL REACHED
                                {
                                    var assignTrophee = true;
                                    var gotoRecap = false;
                                    clearLevel(assignTrophee, gotoRecap);
                                    // Go to game Over
                                    switchScene('gameoverScene')
                                }
                            }

                            localStorage.setItem("roundChainIndex", 0);
                        }
                        else
                        {

                            if(scene == "wordImageScene")
                            {
                                initQuiz();
                            }
                            else
                            {
                                
                                switchScene(scene);
                                if(answerNotifTO)
                                    clearInterval(answerNotifTO);
                            }

                        }


                    }, 500);   
                    
                }
                //console.log("init")

                

            // }
            // else
            // {
            //     console.log('**********');
            // }
            // else
            // {
            //     localStorage.removeItem("nbreResp");

            //     toggleAnserNotif(isCorrect, false);
                
            //     // //console.log("GAME FINISHED !!!")
            //     // switchScene('gameoverScene');

            //     if(_self.currentRound < ROUND_MAX )
            //     {
            //         //Update round
            //         localStorage.setItem("current_round", _self.currentRound+1);
            //         //Goto recap screen for next round / or replay
            //         clearLevel();

            //     }
            //     else // MAX ROUND REACHED for CURRENT LEVEL
            //     {    

            //         if(_self.currentLevel < LEVEL_MAX)
            //         {
            //             localStorage.setItem("current_round", 1);
            //             localStorage.setItem("current_level", _self.currentLevel+1);

            //             // Goto next round
            //             var assignTrophee = true;
            //             clearLevel(assignTrophee);

            //         }
            //         else // MAX LEVEL REACHED
            //         {
            //             // Go to game Over
            //             switchScene('gameoverScene')
            //         }
            //     }
            // }
        }
        
        // function that store all the correct answers in the array table 
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        //clear level
        function clearLevel(assignTrophee = false, gotoRecap = true)
        {

            updateGlobalPoints(assignTrophee);
            if(gotoRecap)
                setTimeout(() => {
                    window.m_currentQuizIndex = 0;
                    switchScene('recapScene');
                }, 500);
        }
        
        //update point
        function updateGlobalPoints(assignTrophee = false)
        {
            _self.currentPoints = parseInt(localStorage.getItem("points")) + _self.score;
            localStorage.setItem("points", _self.currentPoints)
            populatePlayers();

            // Define progress
            // setTimeout(() => {
                
                localStorage.setItem('gained_trophee', 'none');
                if(assignTrophee && hasPlayerPassedRound()) // If player passed this round
                {
                    for (let i = window.tropheesAccess.length - 1; i >= 0; i--) 
                    {
                        const el = window.tropheesAccess[i];
                        if(_self.currentPoints >= el.value)
                        {
                            updateProgress(el.trophee)
                            break;
                        }
                        
                    }
                }

            // }, 500);

            var fiows_ref = JSON.parse(localStorage.getItem("fiows_ref"));
            localStorage.setItem("fiows", JSON.stringify(fiows_ref));


        }
        
        //switch to a another scene
        function switchScene(newScene)
        {
            // if(countdownInterval)
            //     clearInterval(countdownInterval);


            showLoader()
            _self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }
        
        //player record
        function hasPlayerPassedRound()
        {
            var playerID = sessionStorage.getItem("player_id");
            var qualifiedPlayers = JSON.parse(localStorage.getItem("current_players"));

            var p = qualifiedPlayers.find(q=>q.id == playerID);
            if(p) 
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        
        //player progression
        function updateProgress(trophee)
        {
            //Get current difficulty item
            // console.log(_self.playerProgress)
            var difficultyItemIndex = _self.playerProgress.findIndex(d=>d.name == _self.currentModeName)
            var difficultyItem = _self.playerProgress[difficultyItemIndex];
            
            //Get bestScore 
            var currentBestscore = difficultyItem.bestScore;
            if(_self.currentPoints > currentBestscore)
                difficultyItem.bestScore = _self.currentPoints;

            // Get trophees
            var currentTrophee = difficultyItem.trophee;
            if(currentTrophee == "none") difficultyItem.trophee = trophee;
            if(currentTrophee == "bronze" && trophee == "silver") difficultyItem.trophee = trophee;
            if(currentTrophee == "silver" && trophee == "gold") difficultyItem.trophee = trophee;
        
            // Unlock next if not unlocked
            localStorage.setItem('unlocked', 'false');
            if(_self.playerProgress[difficultyItemIndex+1])
            {
                _self.playerProgress[difficultyItemIndex+1].unlocked = true;
                localStorage.setItem('unlocked', 'true');
            
            }
            //Save 
            localStorage.setItem("player_progress", JSON.stringify(_self.playerProgress))

            localStorage.setItem('gained_trophee', trophee);

        }

        first_time()
       
        // Loader
        hideLoader();

    },

    update:function(){
    }
    

}
)