
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
        window.m_currentQuizIndex = 0;
        // let m=localStorage.getItem("fiows_ref");
        // console.log(m);

        this.currentModeName = window.localStorage.getItem("current_mode")

        this.currentMode = window.modes[this.currentModeName];

        this.currentLevel = parseInt(window.localStorage.getItem("current_level"));
        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentPoints = parseInt(window.localStorage.getItem("points"));
          
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));

        this.lang = localStorage.getItem("lang");
        this.score = 0;
        this.m_papers = 0;
        this.m_corrects = 0;
        this.m_errors = 0; 

        // var fetchedFiows = [...window.fiows];
        var remoteFiows = JSON.parse(localStorage.getItem("fiows"));
        var fetchedFiows = [...remoteFiows];

        // console.log(remoteFiows)
        var sorted = [];
        for (var i = 3; i >= 0; --i) {

            var r = Math.floor(Math.random() * (1 + (fetchedFiows.length-1)));
            var element = fetchedFiows[r];

            // Add and delete
            sorted.push(element);
            var f = fetchedFiows.splice(r, 1);
            // console.log(f);
            
        }

        var shuffledQuizzes = fetchedFiows.sort((a, b) => 0.5 - Math.random());
        this.fiows = sorted;
        localStorage.setItem("fiows", JSON.stringify(fetchedFiows))
        console.log(fetchedFiows)



        this.currentPlayerName = window.localStorage.getItem("player_name");

        // Reset all scores :

       var qualified = JSON.parse(localStorage.getItem('current_players'));

         for (let i = 0; i < qualified.length; i++) {
                
             qualified[i].points = 0;
             localStorage.setItem('current_players', JSON.stringify(qualified));
            //  console.log(qualified)
         }
    
        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        //currentPlayersPrev = [...this.currentPlayers];

        // console.log(this.currentPlayers);

        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
        this.question = localStorage.getItem("lien")
    },

    
    preload:function(){

        this.load.crossOrigin = 'anonymous';

        // this.load.baseURL = 'https://s3-eu-west-1.amazonaws.com/xzyvmgtxseboq/';

        // this.load.image("quiz_img",'adidas_300x250.jpg')

        // console.log(this.load.);
        this.load.image('top_banner', './assets/top_banner.png');
        this.load.image('screen_base', './assets/screen_base.png');
        this.load.image('quiz_header_correct','./assets/quiz_header_correct.png')
        this.load.image('quiz_header_false','./assets/quiz_header_false.png')
        this.load.image('exit_btn','./assets/exit_btn.png')
        this.load.image('coin_header_bg','./assets/coin_header_bg.png')
        this.load.image('quiz_header_paper','./assets/quiz_header_paper.png')
        this.load.image('box2','./assets/box2.png')
        this.load.image('box1','./assets/box1.png')
        this.load.image('Poopguysad','./assets/Poop/Poopguysad.png')
        this.load.image('text_bubble','./assets/text_bubble.png')
        this.load.image('perso_3','./assets/perso_3.png')
        this.load.image('btn_correct','./assets/btn_correct.png')
        this.load.image('btn_wrong','./assets/btn_wrong.png')
        this.load.image('player_bg', './assets/player_bg.png')


        //add by Marius 
        this.load.image('miss_poop_happy',  './assets/Poop/Poopgirlhappy.png');
        this.load.image('miss_poop_sad',  './assets/Poop/Poopgirlsad.png');
        this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        this.load.image('Poopguysad',  './assets/Poop/Poopguysad.png');
        
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


        this.load.image("quiz_img",'http://mango.confiote.com/~julien/poop_trivia/1image4mots/common/Dessin_sante_paysage_bis%203.jpg')


        // Fiows

        // for (let i = 0; i < this.fiows.length; i++) {
            
        //     const f = this.fiows[i];
        //     let imgId = getFileId(f.questions[this.lang])
        //     let id = f.id;
        //     let key = "fiow_"+id;
        //     let url = 'https://drive.google.com/uc?id='+imgId;

        //     toDataUrl(url, function(myBase64) {
        //         console.log(myBase64); // myBase64 is the base64 string
        //     });
        //     // this.load.image(key, url)
        //     // console.log(key)            
        // }
    },

    create:function(){

        _self=this;

        console.log("create");

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
         
        var coinHeaderCorrect=this.add.image(screenW*0.3, 40, 'quiz_header_correct');
            coinHeaderCorrect.setScale(0.3,0.3)

        var coinHeaderFalse=this.add.image(screenW*0.5, 40, 'quiz_header_false');
        coinHeaderFalse.setScale(0.3,0.3)

        var coin_header_bg=this.add.image(screenW*0.85, 40, 'coin_header_bg');
        coin_header_bg.setScale(0.5,0.6)

        
        // var quiz_header_paper=this.add.image(screenW*0.1, 52, 'quiz_header_paper');
        // quiz_header_paper.setScale(0.5,0.6)

      

        //set box of image
        var boxImage=this.add.image(screenW*0.5, 320, 'box1');
        boxImage.setScale(window.bg_x_scale*0.42,window.bg_y_scale*0.4)

        // image
        quizQuestion =_self.add.image(screenW * 0.50,screenH * 0.58, "quiz_img");
        quizQuestion.setScale(1)
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

        this.mcPoop = this.add.image(screenW*0.10, screenH*0.45, 'Poopguysad');
        this.mcPoop.setScale(0.15,0.15);
        this.mcPoop.depth = 200;
        
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(screenW*0.22, screenH*0.36, 'text_bubble');
        textBubble.setScale(window.bg_x_scale*0.42,window.bg_y_scale*0.4);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            screenW*0.22,screenH*0.36, "c'est\n faux", {fontSize:  16, color: "black",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.40, 0.8);
        this.notifText.depth = 200;
        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        answerNotifGroup.setVisible(false)


        
        //text in the head
         var headerGroupPaper = this.add.group();
         var headerBgPaper = this.add.image(0, 0, 'quiz_header_paper' );
         headerBgPaper.setScale(0.650);
         this.headerTextPaper = this.add.text(
             0, 0, this.m_papers, {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
         ).setOrigin(0.5);
         headerGroupPaper.addMultiple([headerBgPaper, this.headerTextPaper])
         headerGroupPaper.setXY(screenW * 0.08, screenH *  0.095);  
         headerGroupPaper.propertyValueSet("x", screenW * 0.10, 0 ,1 , 1)
         headerGroupPaper.propertyValueSet("y", screenH *  0.087, 0 ,1 , 1)
        //this.hpaper=this.add.text(screenW*0.1, 36, "3", { fontSize: '19px', fill: 'white' });
        this.hcorrect=this.add.text(screenW*0.3, 36,this.m_corrects.toString(), { fontSize: '19px',fill: 'white' });
        this.hfalse=this.add.text(screenW*0.5, 36, this.m_errors.toString(), { fontSize: '19px',fill: 'white' });
        this.podiumScore =this.add.text(screenW*0.85, 35, this.score.toString(), { fontSize: '19px',fill: 'white' });

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
        function initQuiz() {
         
            // Get QUIZ
            var quiz = _self.fiows[m_currentQuizIndex];
            var quizAnswers = quiz.answers[_self.lang];
            var shuffledQuizAnswers = quizAnswers.sort((a, b) => 0.5 - Math.random());

            // Cheat for right answer
            // cheatRightAnswer(shuffledQuizAnswers);


            // console.log(quiz);
            
            // Empty
            if(answerBox1)
            {
                quizQuestion.destroy(true);

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
            
            let question = breakString(quiz.questions[_self.lang], 38);
            question= getFileId(question);
            let lien = localStorage.setItem("lien",question);
            
            // console.log(lien)

            // console.log('https://drive.google.com/uc?export=view&id='+question);
            
            //console.log(c)
            // quizQuestion.setTexture("quiz_img");
            // quizQuestion.setScale(1)

        
            // Answer Block
            var answerGroup1 = _self.add.group();
            answerBox1 = _self.add.image(screenW*0.90, 295, 'box2');
            answerBox1.setScale(0.65,0.55).setInteractive();

            answer1 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[0].answer, 10) , {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            answerGroup1.addMultiple([answerBox1, answer1])
            answerGroup1.setXY(screenW*0.80, screenH*0.36)

            answerBox1.on('pointerdown', ()=>{

                // ..

                if (shuffledQuizAnswers[0].isCorrect) {


                    answerBox1.setTexture("btn_correct");
                   
                    setTimeout(() => {
                        getAnswer(true);
                    }, 300);
                   // toggleAnserNotif(true, true);

                } else{
                    toggleAnserNotif(false, true);

                    getAnswer(false);

                    answerBox1.setTexture("btn_wrong");
                   
                }

            },this);

            // Answer Block
            var answerGroup2 = _self.add.group();
            answerBox2 = _self.add.image(screenW*0.90, 290, 'box2');
            answerBox2.setScale(0.65,0.55).setInteractive();

            answer2 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[1].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            answerGroup2.addMultiple([answerBox2, answer2])
            answerGroup2.setXY(screenW*0.80,  screenH*0.50);
            
            answerBox2.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[1].isCorrect) {

                    answerBox2.setTexture("btn_correct");
                    //toggleAnserNotif(true, true);
                 
                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{
                    toggleAnserNotif(false, true);
                    getAnswer(false);

                    answerBox2.setTexture("btn_wrong");
                    
                }

            },this);

            // Answer Block
            var answerGroup3 = _self.add.group();
            answerBox3 = _self.add.image(screenW*0.90, 370, 'box2');
            answerBox3.setScale(0.65,0.55).setInteractive();

            answer3 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[2].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            answerGroup3.addMultiple([answerBox3, answer3])
            answerGroup3.setXY(screenW*0.80, screenH*0.63);

            answerBox3.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[2].isCorrect) {

                    answerBox3.setTexture("btn_correct");
                   // toggleAnserNotif(true, true);

                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{
                    toggleAnserNotif(false, true);
                    getAnswer(false);
                    answerBox3.setTexture("btn_wrong");
                }

            },this);
            // Answer Block

            var answerGroup4 = _self.add.group();
           
                answerBox4 = _self.add.image(screenW*0.90, 300, 'box2');
                answerBox4.setScale(0.65,0.55).setInteractive();

                answer4 = _self.add.text(
                    0, 0, breakString(shuffledQuizAnswers[3].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.65);

                answerGroup4.addMultiple([answerBox4, answer4])
                answerGroup4.setXY(screenW*0.80,  screenH*0.77);

                answerBox4.on('pointerdown', ()=>{
                    // ...

                    if (shuffledQuizAnswers[3].isCorrect) {
    
                        answerBox4.setTexture("btn_correct");
    
                        setTimeout(() => {
                            getAnswer(true);
                       }, 300);
    
                    } else{
                        answerBox4.setTexture("btn_wrong");
                        
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
                var x =  screenW * 0.25 + pad ;
                

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
          
            
            var right_answers = ["Bravo !","C’est la bonne réponse !","Tout juste !","Bien joué !"];
            var wrong_answers = ["Nope !" ,"Pas vraiment !" ,"Non, ce n’est pas ça !" ,"Presque, mais… non !"];

            let answer;

            //add by marius to alter miss poop and mr poop
            let ans=getRandomArbitrary(1,10);

            let poopSprite='miss_poop_happy';

            //end

            if(!isCorrect)
            {
                 answer = breakString(wrong_answers[Math.floor(Math.random() * (1 + (wrong_answers.length-1)))], 8)

                 //add by Marius
                 if (ans%2==0) {
                    poopSprite = 'miss_poop_sad'; 
                 
                 } else {
                    poopSprite = 'Poopguysad'
    
                 }
                 console.log("ok je suis en 1")
                 
            }else{
                answer = breakString(right_answers[Math.floor(Math.random() * (1 + (right_answers.length-1)))], 8)
     
                if (ans%2==0) {
                    poopSprite = 'poop_happy';
                }
                console.log("ok je suis en 2")
            }

            localStorage.setItem("poop", poopSprite);
            _self.notifText.setText(answer)
            _self.mcPoop.setTexture(poopSprite)

            answerNotifGroup.setVisible(true);

            if(toHide)
            { 
                setTimeout(() => {
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
                _self.hcorrect.setText(_self.m_corrects.toString());

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
                console.log("nbre fois: "+nbreResp);
                console.log(_self.score);
                

            }else{

                _self.m_errors +=1;
                _self.hfalse.setText(_self.m_errors.toString())
                nbreResp +=1;
                localStorage.setItem("nbreResp",nbreResp);

            }


            _self.podiumScore.setText(_self.score.toString());
            //_self.podiumScore2.setText(_self.score.toString());

            // Simulate scores ...
            simulateOpponentsScores(_self.score);

            // Update UI
            //createPlayersAvatar(currentPlayersPrev, _self.currentPlayers);

            // Update prev for refs
            // currentPlayersPrev = _self.currentPlayers;

            if(m_currentQuizIndex < (_self.fiows.length-1))
            {
                
                // Notif
                toggleAnserNotif(isCorrect, true);

                
                if (isCorrect) {
                    m_currentQuizIndex++;
                    localStorage.removeItem("nbreResp");

                    setTimeout(() => {
                        
                        let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];
 
                        //Update chain
                        _self.currentRoundChainIndex+=1;
                        localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

                        if(_self.currentRoundChainIndex == 4)
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
                                    // Go to game Over
                                    switchScene('gameoverScene')
                                }
                            }
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
                            }

                        }


                    }, 500);   
                    
                }
                //console.log("init")

                

            }
            else
            {
                localStorage.removeItem("nbreResp");

                toggleAnserNotif(isCorrect, false);
                
                // //console.log("GAME FINISHED !!!")
                // switchScene('gameoverScene');

                if(_self.currentRound < ROUND_MAX )
                {
                    //Update round
                    localStorage.setItem("current_round", _self.currentRound+1);
                    //Goto recap screen for next round / or replay
                    clearLevel();

                }
                else // MAX ROUND REACHED for CURRENT LEVEL
                {    

                    if(_self.currentLevel < LEVEL_MAX)
                    {
                        localStorage.setItem("current_round", 1);
                        localStorage.setItem("current_level", _self.currentLevel+1);

                        // Goto next round
                        var assignTrophee = true;
                        clearLevel(assignTrophee);

                    }
                    else // MAX LEVEL REACHED
                    {
                        // Go to game Over
                        switchScene('gameoverScene')
                    }
                }
            }
        }
        
        // function that store all the correct answers in the array table 
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        //clear level
        function clearLevel(assignTrophee = false)
        {

            updateGlobalPoints(assignTrophee);
            setTimeout(() => {
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
            console.log(_self.playerProgress)
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
            if(_self.playerProgress[difficultyItemIndex+1])
                _self.playerProgress[difficultyItemIndex+1].unlocked = true;

        //Save 
            localStorage.setItem("player_progress", JSON.stringify(_self.playerProgress))

            localStorage.setItem('gained_trophee', trophee);

        }

    },

    update:function(){
    }
    

}
)