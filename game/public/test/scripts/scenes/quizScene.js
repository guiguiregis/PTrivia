// Our scene

const ROUND_MAX = 3;
const LEVEL_MAX = 3;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


window.m_currentQuizIndex = 0;
var answerBox1;
var currentPlayersPrev = [];

var countdownInterval;

var quizScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "quizScene" });
    },
    init: function(data) {

        window.m_currentQuizIndex = 0;

        this.currentModeName = window.localStorage.getItem("current_mode")

        this.currentMode = window.modes[this.currentModeName];

        this.currentLevel = parseInt(window.localStorage.getItem("current_level"));
        this.currentRound = parseInt(window.localStorage.getItem("current_round"));
        this.currentPoints = parseInt(window.localStorage.getItem("points"));
        this.currentBonusPq = parseInt(window.localStorage.getItem("bonus_pq"));
        
        this.currentRoundChainIndex = parseInt(window.localStorage.getItem("roundChainIndex"));

        this.lang = localStorage.getItem("lang");
        this.score = 0;
        this.m_papers = 0;
        this.m_corrects = 0;
        this.m_errors = 0; 

        // var fetchedQuizes = [...window.quizes];
        var remoteQuizes = JSON.parse(localStorage.getItem("quizes"));
        var fetchedQuizes = [...remoteQuizes];

        // console.log(remoteQuizes)
        var sorted = [];
        for (var i = 3; i >= 0; --i) {

            var r = Math.floor(Math.random() * (1 + (fetchedQuizes.length-1)));
            var element = fetchedQuizes[r];

            // Add and delete
            sorted.push(element);
            var f = fetchedQuizes.splice(r, 1);
            // console.log(f);
            
        }

        // var shuffledQuizzes = fetchedQuizes.sort((a, b) => 0.5 - Math.random());
        this.quizes = sorted;
        localStorage.setItem("quizes", JSON.stringify(fetchedQuizes))
        // console.log(fetchedQuizes)

        this.currentPlayerName = window.localStorage.getItem("player_name");


        // Reset all scores :

        var qualified = JSON.parse(localStorage.getItem('current_players'));

        for (let i = 0; i < qualified.length; i++) {
                
            qualified[i].points = 0;
            localStorage.setItem('current_players', JSON.stringify(qualified));
            //console.log(qualified)
        }
       

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        currentPlayersPrev = [...this.currentPlayers];


        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
      
        
    },
    preload: function() {
 
        this.load.image('quiz_screen_bg', './assets/screen_base.png');
        this.load.image('top_banner', './assets/top_banner.png');
        this.load.image('player_bg', './assets/player_bg.png');
        this.load.image('podium', './assets/podium.png');
        // Later set a spritesheet and definr the suitable player
        this.load.image('selected_player', './assets/perso_1.png');
        this.load.image('quiz_box', './assets/box1.png');
        this.load.image('answer_box_default', './assets/btn_default.png');
        this.load.image('answer_box_wrong', './assets/btn_wrong.png');
        this.load.image('answer_box_correct', './assets/btn_correct.png');

        this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');
        this.load.image('quiz_header_correct', './assets/quiz_header_correct.png');
        this.load.image('quiz_header_false', './assets/quiz_header_false.png');

        this.load.image('coin_header_bg', './assets/coin_header_bg.png');
        this.load.image('exit_btn', './assets/exit_btn.png');
        
        this.load.image('text_bubble', './assets/text_bubble.png');
        this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        this.load.image('poop_sad',  './assets/Poop/Poopguysad.png');

        this.load.image('question_mark',  './assets/question_mark.png');


        this.load.image('timer_bg',  './assets/timer_bg.png');
        this.load.image('pq',  './assets/Pq.png');

        //add by Marius 
        this.load.image('miss_poop_happy',  './assets/Poop/Poopgirlhappy.png');
        this.load.image('miss_poop_sad',  './assets/Poop/Poopgirlsad.png');

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

        // this.load.plugin('rexcircularprogresscanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogresscanvasplugin.min.js', true);  


    },
        

    create: function() {
        
        this.cameras.main.fadeIn(500, 0, 0, 0)

        // this.scale.lockOrientation("landscape-primary")

        this.input.addPointer(1);

        // this.cameras.main.setBackgroundColor('#000000')
 
        var bg = this.add.image(0, 0, 'quiz_screen_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);


        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));


       
        var player_bg = this.add.image(screenW * 0.01, screenH * 0.30, 'player_bg');
        player_bg.setOrigin(0, 0).setScale(0.65);

        // var timerBg = this.add.image(screenW * 0.01, screenH * 0.30, 'timer_bg');
        // timerBg.setOrigin(0, 0).setScale(0.85);

        // var timerText = this.add.text(
        //     screenW * 0.037, 
        //     screenH *  0.345,
        //     "15", 
        //     {
        //         fontSize: 40,
        //         color: "white",
        //         fontStyle: "bold",
        //         fontFamily: "Impact",
        //         textAlign:"center"
        //     }
        // )

        // startCountdown(15, timerText)

   
        // var graphics = this.add.graphics();
        // graphics.lineStyle(5, 0xff00ff, 1);
        // graphics.beginPath();
        // // arc (x, y, radius, startAngle, endAngle, anticlockwise)
        // graphics.arc(60, 215, 40, Phaser.Math.DegToRad(360), Phaser.Math.DegToRad(180), true);
        // graphics.strokePath();

        // Player
        var selectedPlayerName = localStorage.getItem("player_name");
        var selectedPlayerAvatar = this.currentPlayers.find(p=>p.name == selectedPlayerName).avatar;

        var player = this.add.image(screenW * 0.17, screenH *  0.61, selectedPlayerAvatar );
        player.setScale(0.54);


        // Quiz Box
        var quizBox = this.add.image(screenW * 0.68, screenH * 0.59, 'quiz_box' );
        quizBox.setScale(0.75, 0.7);
        
        var question_mark = this.add.image(screenW *  0.88, screenH * 0.44, 'question_mark');
        question_mark.setScale(0.40).setAlpha(0.25)
        
        // Quiz items

        var quizHeader = this.add.text(
            screenW * 0.67, 
            screenH *  0.31, 
            "QUESTION", 
            {
                fontSize: 32,
                color: "red",
                fontStyle: "bolder",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);
    

        var quizGroup = this.add.group();
        var quizzQuestion, 
            answerBox1, answerBox2, answerBox3, answerBox4, 
            answer1, answer2, answer3, answer4;

        var _self = this;

        function cheatRightAnswer(answers)
        {

            var rightAnswerIndex = answers.findIndex(a=>a.isCorrect == true);

            setTimeout(() => {
                
                switch (rightAnswerIndex) {
                    case 0: answerBox1.setTexture('answer_box_correct');
                        break;
                    case 1: answerBox2.setTexture('answer_box_correct');
                        break;
                    case 2: answerBox3.setTexture('answer_box_correct');
                        break;
                    case 3: answerBox4.setTexture('answer_box_correct');
                        break;
                    default:
                        console.log("erreur");
                }

            //     getAnswer(true);

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
                    case 0: answerBox1.setTexture('answer_box_wrong').setAlpha(0.6);
                        break;
                    case 1: answerBox2.setTexture('answer_box_wrong').setAlpha(0.6);
                        break;
                    case 2: answerBox3.setTexture('answer_box_wrong').setAlpha(0.6);
                        break;
                    case 3: answerBox4.setTexture('answer_box_wrong').setAlpha(0.6);
                        break;
                    default:
                        // console.log("erreur");
                }

            
            }
        }


        var shuffledQuizAnswers = [];
        function initQuiz() {
             
            // Get QUIZ
            var quiz = _self.quizes[m_currentQuizIndex];
            var quizAnswers = quiz.answers[_self.lang];
            shuffledQuizAnswers = quizAnswers.sort((a, b) => 0.5 - Math.random());

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

            quizQuestion = _self.add.text(
                screenW * 0.67, 
                screenH * 0.44 , 
                question, 
                {
                    fontSize:  18,
                    color: "black",
                    fontStyle: "bolder",
                    fontFamily: "Mont",
                    
                }
            ).setOrigin(0.5);

        
            // Answer Block
            var answerGroup1 = _self.add.group();
            answerBox1 = _self.add.image(screenW * 0.53, screenH * 0.63, 'answer_box_default' );
            answerBox1.setScale(0.84, 1.47).setInteractive();;
            answer1 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[0].answer, 10) , {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            answerGroup1.addMultiple([answerBox1, answer1])
            answerGroup1.setXY(screenW *  0.50, screenH * 0.67)

            answerBox1.on('pointerdown', ()=>{

                // ..

                if (shuffledQuizAnswers[0].isCorrect) {


                    answerBox1.setTexture('answer_box_correct');
                   
                   // setTimeout(() => {
                    getAnswer(true);
                   //}, 300);

                } else{
                    toggleAnserNotif(false, true);

                    getAnswer(false);

                    answerBox1.setTexture('answer_box_wrong');
                   
                }

            },this);

            // Answer Block
            var answerGroup2 = _self.add.group();
            answerBox2 = _self.add.image(0, 0, 'answer_box_default' );
            answerBox2.setScale(0.84, 1.47).setInteractive();;
            answer2 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[1].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);
            answerGroup2.addMultiple([answerBox2, answer2])
            answerGroup2.setXY(screenW *  0.85, screenH * 0.67);
            
            answerBox2.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[1].isCorrect) {

                    answerBox2.setTexture('answer_box_correct');
                 
                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{
                    toggleAnserNotif(false, true);
                    getAnswer(false);

                    answerBox2.setTexture('answer_box_wrong');
                    
                }

            },this);

            // Answer Block
            var answerGroup3 = _self.add.group();
            answerBox3 = _self.add.image(0, 0, 'answer_box_default' );
            answerBox3.setScale(0.84, 1.47).setInteractive();
            answer3 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[2].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);
            answerGroup3.addMultiple([answerBox3, answer3])
            answerGroup3.setXY(screenW *  0.5, screenH * 0.84);
            answerBox3.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[2].isCorrect) {

                    answerBox3.setTexture('answer_box_correct');
                  

                    setTimeout(() => {
                    getAnswer(true);
                   }, 300);

                } else{
                    toggleAnserNotif(false, true);
                    getAnswer(false);
                    answerBox3.setTexture('answer_box_wrong');
                }

            },this);
            // Answer Block

            var answerGroup4 = _self.add.group();
           
                answerBox4 = _self.add.image(0, 0, 'answer_box_default' );
                answerBox4.setScale(0.84, 1.47).setInteractive();
                answer4 = _self.add.text(
                    0, 0, breakString(shuffledQuizAnswers[3].answer, 7), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.65);
                answerGroup4.addMultiple([answerBox4, answer4])
                answerGroup4.setXY(screenW *  0.85, screenH * 0.84);

                answerBox4.on('pointerdown', ()=>{
                    // ...

                    if (shuffledQuizAnswers[3].isCorrect) {
    
                        answerBox4.setTexture('answer_box_correct');
    
                        setTimeout(() => {
                            getAnswer(true);
                       }, 300);
    
                    } else{
                        answerBox4.setTexture('answer_box_wrong');
                        
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


        // First Init
        initQuiz();


        // HEADERS

        // Header Block - PAPER
        var headerGroupPaper = this.add.group();
        var headerBgPaper = this.add.image(0, 0, 'quiz_header_paper' );
        headerBgPaper.setScale(0.650);
        this.headerTextPaper = this.add.text(
            0, 0, this.currentBonusPq, {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.5);
        headerGroupPaper.addMultiple([headerBgPaper, this.headerTextPaper])
        headerGroupPaper.setXY(screenW * 0.08, screenH *  0.095);  
        headerGroupPaper.propertyValueSet("x", screenW * 0.10, 0 ,1 , 1)
        headerGroupPaper.propertyValueSet("y", screenH *  0.087, 0 ,1 , 1)
          
        
        var PqHint = this.add.image(screenW * 0.05, screenH * 0.40, 'pq');
        PqHint.setScale(0.4).setInteractive();

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


        // Header Block - Points
        var headerGroupPoints = this.add.group();
        var headerBgPoints = this.add.image(0, 0, 'coin_header_bg' );
        headerBgPoints.setScale(0.75);
        this.headerTextPoints = this.add.text(
            0, 0, this.currentPoints, {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.5);
        headerGroupPoints.addMultiple([headerBgPoints, this.headerTextPoints])
        headerGroupPoints.setXY(screenW * 0.80, screenH *  0.084);  
        headerGroupPoints.propertyValueSet("x", screenW * 0.82, 0 ,1 , 1)
        headerGroupPoints.propertyValueSet("y", screenH *  0.088, 0 ,1 , 1)

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
        
        // CloseBTN
        var closeBtn = this.add.image(screenW * 0.95, screenH * 0.085, 'exit_btn');
        closeBtn.setScale(0.5).setInteractive();

        closeBtn.on('pointerdown', ()=>{
            // ...
            if (confirm("Quiter le jeu")) {
                var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
                localStorage.setItem("quizes", JSON.stringify(quizes_ref));

                var fiows_ref = JSON.parse(localStorage.getItem("fiows_ref"));
                localStorage.setItem("fiows", JSON.stringify(fiows_ref));
                leave();
              }

        },this); 

        function leave() {
            switchScene('selectionScene');
        }
            


        //Podium
        var podium = this.add.image(screenW * 0.06 , screenH * 0.75, 'podium' );
        podium.setScale(1.8).setOrigin(0);

        // SCORE
        this.podiumScore = this.add.text(
            screenW * 0.155, 
            screenH *  0.84,
            this.score.toString(), 
            {
                fontSize: 40,
                color: "white",
                fontStyle: "bold",
                fontFamily: "Impact",
                textAlign:"center"
            }
        )
   


        
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

        function updateProgress(trophee)
        {
            // Get current difficulty item
            console.log(_self.playerProgress)
            var difficultyItemIndex = _self.playerProgress.findIndex(d=>d.name == _self.currentModeName)
            var difficultyItem = _self.playerProgress[difficultyItemIndex];
            // Get bestScore 
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

            // Save 
            localStorage.setItem("player_progress", JSON.stringify(_self.playerProgress))

            localStorage.setItem('gained_trophee', trophee);


        }

        function getAnswer(isCorrect)
        {
            // //console.log("Clicked !!! "+ isCorrect);
            let nbreResp=0;

            if (localStorage.getItem("nbreResp")!=null) {
                nbreResp +=parseInt(localStorage.getItem("nbreResp"))
               
            }

            if(isCorrect)
            {   
                // Simulate score here
                _self.m_corrects +=1;

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
                nbreResp +=1;
                localStorage.setItem("nbreResp",nbreResp);

            }


            _self.podiumScore.setText(_self.score.toString());

            // Simulate scores ...
            simulateOpponentsScores(_self.score);

            // Update UI
            createPlayersAvatar(currentPlayersPrev, _self.currentPlayers);

            // Update prev for refs
            // currentPlayersPrev = _self.currentPlayers;

            if(m_currentQuizIndex < (_self.quizes.length-1))
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

                        console.log(window.roundChain)
                        console.log("SCENING : "+(_self.currentRound-1), _self.currentRoundChainIndex)

                        console.log("NEXT SCENE : "+scene)
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

                            if(scene == "quizScene")
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


        function clearLevel(assignTrophee = false)
        {

            updateGlobalPoints(assignTrophee);
            setTimeout(() => {
                switchScene('recapScene');
            }, 500);
        }

        //add by Marius
        this.mcPoop = this.add.image(0, 0, 'poop_happy');
        this.mcPoop.setScale( 0.15);
        this.mcPoop.depth = 200;
        
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0, 0, 'text_bubble');
        textBubble.setScale( 1,  0.9).setAlpha(0.9);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            0, 0, "BONNE\nREPONSE", {fontSize:  16, color: "black",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.40, 0.8);
        this.notifText.depth = 200;
        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        answerNotifGroup.setVisible(false)


        answerNotifGroup.setXY(screenW * 0.30, screenH * 0.8);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.48, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.68, 0 ,1 , 1)






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
                    poopSprite = 'poop_sad'; 
                 
                 } else {
                    poopSprite = 'miss_poop_sad'
    
                 }
                 
            }else{
                answer = breakString(right_answers[Math.floor(Math.random() * (1 + (right_answers.length-1)))], 8)
     
                if (ans%2==0) {
                    poopSprite = 'poop_happy';
                }

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


        
        // function that store all the correct answers in the array table 

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }



        // Loader
        hideLoader();
},

    update: function() {

        // if(this.podiumScore)
        //     this.podiumScore.setText(this.score.toString());

        // if(this.headerTextPaper)
        //     this.headerTextPaper.setText(this.m_papers.toString());
        // this.headerTextCorrect.setText(this.m_corrects.toString());
        // this.headerTextFalse.setText(this.m_errors.toString());

    },

    render: function() {

       
    }
});





 
 