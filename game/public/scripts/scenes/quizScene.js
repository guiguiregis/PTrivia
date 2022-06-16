// Our scene

const ROUND_MAX = 3;
const LEVEL_MAX = 3;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


// window.m_currentQuizIndex = 0;
var answerBox1;
var currentPlayersPrev = [];

var countdownInterval;

var quizScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "quizScene" });
    },
    init: function(data) {

        // window.m_currentQuizIndex = 0;

        this.currentModeName = window.localStorage.getItem("current_mode")
        this.setVolume =parseInt(localStorage.getItem("set_volume"))

        this.currentMode = window.modes[this.currentModeName];
        this.playBtnText = window.localization["PLAY"][localStorage.getItem("lang")];
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
        this.first_time=parseInt(localStorage.getItem('quiz_first_time'))

        // var fetchedQuizes = [...window.quizes];
        // var remoteQuizes =[];
        // if (localStorage.getItem("quizes")!=null) {
        //     remoteQuizes = JSON.parse(localStorage.getItem("quizes"));
        // } else {
        //     console.log(remoteQuizes);
        // }
        

        // var fetchedQuizes = [...remoteQuizes];

        // var fetchedLevelQuizes = fetchedQuizes.filter((q)=>q.level == this.currentLevel);

        // // console.log(fetchedLevelQuizes);

        // // console.log(remoteQuizes)
        // var sorted = [];
        // for (var i = (fetchedLevelQuizes.length-1); i >= 0; --i) {

        //     var r = Math.floor(Math.random() * (1 + (fetchedLevelQuizes.length-1)));
        //     var element = fetchedLevelQuizes[r];

        //     // Add and delete
        //     sorted.push(element);
        //     var f = fetchedLevelQuizes.splice(r, 1);
        //     // console.log(f);
            
        // }

        // // console.log(sorted);

        // // var shuffledQuizzes = fetchedQuizes.sort((a, b) => 0.5 - Math.random());
        // this.quizes = sorted;
        // localStorage.setItem("quizes", JSON.stringify(fetchedLevelQuizes))
        // console.log(fetchedQuizes)
        // console.log(this.quizes);


        this.currentPlayerName = window.localStorage.getItem("player_name");


        // Reset all scores :

        var qualified = JSON.parse(localStorage.getItem('current_players'));


        // for (let i = 0; i < qualified.length; i++) {
                
        //     qualified[i].points = 0;
        //     localStorage.setItem('current_players', JSON.stringify(qualified));
        //     //console.log(qualified)
        // }
       

        this.currentPlayers = JSON.parse(window.localStorage.getItem("current_players"));
        currentPlayersPrev = [...this.currentPlayers];

        this.currentPoints = this.currentPlayers.find(p=>p.name == this.currentPlayerName).points;
        this.score = this.currentPoints;

        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
      
        //for the tutos
        this.playerProgress = JSON.parse(window.localStorage.getItem("player_progress"));
        this.texte=window.localization["TUTO1"][localStorage.getItem("lang")];
        this.question=window.localization["TUTO2"][localStorage.getItem("lang")];
        this.texte_tuto=window.localization["QUIZZ"][localStorage.getItem("lang")];
        this.play=window.localization["PLAY"][localStorage.getItem("lang")];       
    },
    preload: function() {
 
        // this.load.image('quiz_screen_bg', './assets/screen_base.png');
        // this.load.image('top_banner', './assets/top_banner.png');
        // this.load.image('player_bg', './assets/player_bg.png');
        // this.load.image('podium_rogner', './assets/podium_rogner.png');
        // // Later set a spritesheet and definr the suitable player
        // this.load.image('selected_player', './assets/perso_1.png');
        // this.load.image('quiz_box', './assets/box1.png');
        // this.load.image('answer_box_default', './assets/btn_default.png');
        // this.load.image('answer_box_wrong', './assets/btn_wrong.png');
        // this.load.image('answer_box_correct', './assets/btn_correct.png');

        // this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');
        // this.load.image('quiz_header_correct', './assets/quiz_header_correct.png');
        // this.load.image('quiz_header_false', './assets/quiz_header_false.png');

        // this.load.image('coin_header_bg', './assets/coin_header_bg.png');
        // this.load.image('exit_btn', './assets/exit_btn.png');
        
        // this.load.image('text_bubble_oriente', './assets/text_bubble_oriente.png');
        // this.load.image('poop_happy_oriente', './assets/Poop/Poopguyhappy_oriente.png');
        // this.load.image('poop_sad_oriente',  './assets/Poop/Poopguysad_oriente.png');

        // this.load.image('question_mark',  './assets/question_mark.png');


        // this.load.image('timer_bg',  './assets/timer_bg.png');
        // this.load.image('pq',  './assets/Pq.png');

        // //add by Marius 
        // this.load.image('miss_poop_happy_oriente',  './assets/Poop/Poopgirlhappy_oriente.png');
        // this.load.image('miss_poop_sad_oriente',  './assets/Poop/Poopgirlsad_oriente.png');

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

        // this.load.plugin('rexcircularprogresscanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcircularprogresscanvasplugin.min.js', true);  


    },
        

    create: function() {
        
        var answerNotifTO;

        this.cameras.main.fadeIn(500, 0, 0, 0)

        var _self = this

        this.sound.add('buzzer');
        
        this.sound.add('keyboard1');
        
        this.sound.add('keyboard2');

        function isNewPlayer() {

            let isNew=parseInt(localStorage.getItem("quiz_first_time"))
            
 
            if (isNew==0) {
             localStorage.setItem("quiz_first_time",1)
             var bg1 = _self.add.image(0, 0, 'quiz_screen_bg');
             bg1.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
             bg1.setAlpha(0.5)
 
 
             var top_banner1 = _self.add.image(screenW*0.5, 35, 'top_banner');
             top_banner1.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));
             top_banner1.setAlpha(0.96)
          
 
             var titleText1 = _self.add.text(
                 screenW * 0.50, screenH * 0.09, _self.texte_tuto, {fontSize: 40, color: "white",fontStyle: "bolder", fontFamily: "Helvetica" }
             ).setOrigin(0.5, 0.65);  
 
             titleText1.setAlpha(0.9)
         
             var player_bg1 = _self.add.image(screenW * 0.01, screenH * 0.23, 'player_bg');
             player_bg1.setOrigin(0, 0).setScale(0.68,0.75);
 
             player_bg1.setAlpha(0.8) 
 
             // Player
             var selectedPlayerName = localStorage.getItem("player_name");
             var selectedPlayerAvatar = _self.currentPlayers.find(p=>p.name == selectedPlayerName).avatar;
 
             var player1 = _self.add.image(screenW * 0.17, screenH *  0.51, selectedPlayerAvatar );
             player1.setScale(0.6,0.7);
             player1.setAlpha(0.89)
             player1.depth=100 
 
 
             // Quiz Box
             var quizBox1 = _self.add.image(screenW * 0.68, screenH * 0.6, 'quiz_box' );
             quizBox1.setScale(0.75, 0.75);
             quizBox1.setAlpha(0.9) 
     
             
             // Quiz items
 
             var quizHeader1 = _self.add.text(
                 screenW * 0.67, 
                 screenH *  0.33, 
                 "QUESTION", 
                 {
                     fontSize: 32,
                     color: "red",
                     fontStyle: "bolder",
                     fontFamily: "Arial"
                 }
             ).setOrigin(0.5); 
             quizHeader1.setAlpha(0.6)
 
                 
                 let //question = breakString(quiz.questions[_self.lang], 38);
 
                 quizQuestion1 = _self.add.text(
                     screenW * 0.67, 
                     screenH * 0.44 , 
                     _self.question, 
                     {
                         fontSize:  20,
                         color: "black",
                         fontStyle: "bolder",
                         fontFamily: "Helvetica",
                         
                     }
                 ).setOrigin(0.5); 
                 quizQuestion1.setAlpha(0.6)
 
             
                 // Answer Block
                 var answerGroup11 = _self.add.group();
                 answerBox11 = _self.add.image(screenW * 0.54, screenH * 0.63, 'answer_box_wrong' );
                 answerBox11.setScale(1, 1.4).setInteractive();;
                 answer11 = _self.add.text(
                     0, 0, "100" , {fontSize:24, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                 ).setOrigin(0.5, 0.65);
 
                 answerGroup11.addMultiple([answerBox11, answer11])
                 answerGroup11.setXY(screenW *  0.58, screenH * 0.67)
 
             
 
                 var answerGroup22 = _self.add.group();
                 answerBox22 = _self.add.image(0, 0, 'answer_box_default' );
                 answerBox22.setScale(1, 1.4).setInteractive();;
                 answer22 = _self.add.text(
                     0, 0, "200", {fontSize:24, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                 ).setOrigin(0.5, 0.7);
                 answerGroup22.addMultiple([answerBox22, answer22])
                 answerGroup22.setXY(screenW *  0.78, screenH * 0.67);
 
               
                 // Answer Block
                 var answerGroup33 = _self.add.group();
                 answerBox33 = _self.add.image(0, 0, 'answer_box_default' );
                 answerBox33.setScale(1, 1.4).setInteractive();
                 answer33 = _self.add.text(
                     0, 0, "500", {fontSize:24, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                 ).setOrigin(0.5, 0.65);
                 answerGroup33.addMultiple([answerBox33, answer33])
                 answerGroup33.setXY(screenW *  0.58, screenH * 0.84);
 
              
                 // // Answer Block
                 var answerGroup44 = _self.add.group();
                 answerBox44 = _self.add.image(0, 0, 'answer_box_default' );
                 answerBox44.setScale(1, 1.4).setInteractive();
                 answer44 = _self.add.text(
                     0, 0, "700", {fontSize:24, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                 ).setOrigin(0.5, 0.65);
                 answerGroup44.addMultiple([answerBox44, answer44])
                 answerGroup44.setXY(screenW *  0.78, screenH * 0.84);
              
                 answerBox44.setAlpha(0.5);
                 answerBox33.setAlpha(0.5);
                 answerBox22.setAlpha(0.5);
                 answerBox11.setAlpha(0.5);
                 answer11.setAlpha(0.5);
                 answer22.setAlpha(0.5);
                 answer33.setAlpha(0.5);
                 answer44.setAlpha(0.5);
                 
 
 
                 //Podium
                 var podium1 = _self.add.image(screenW * 0.065 , screenH * 0.7, 'podium' );
                 podium1.setScale(1.8).setOrigin(0);
                 podium1.depth=150
                 podium1.setAlpha(0.7)
 
                 // SCORE
                 _self.podiumScore1 = _self.add.text(
                     screenW * 0.12, 
                     screenH *  0.8,
                     "0000", 
                     {
                         fontSize: 40,
                         color: "white",
                         fontStyle: "bold",
                         fontFamily: "Impact",
                         textAlign:"center"
                     }
                 ) 
                 _self.podiumScore1.depth=150
                 _self.podiumScore1.setAlpha(0.7)
         
                 //add by Marius
                 _self.mcPoop1 = _self.add.image(0, 0, 'poop_happy');
                 _self.mcPoop1.setScale( 0.15);
                 _self.mcPoop1.depth = 200;
                 
                 var answerNotifGroup1 = _self.add.group();
                 var textBubble1 = _self.add.image(0, 0, 'bubble_intro');
                 textBubble1.setScale( -1.5,  1.7).setAlpha(1);
                 textBubble1.depth = 200;
 
                 _self.notifText1 = _self.add.text(
                     0, 0, _self.texte, {fontSize:  16, color: "black",fontStyle: "bold", fontFamily: "Helvetica" }
                 ).setOrigin(0.40, 0.8);
                 _self.notifText1.depth = 200;
                
                 answerNotifGroup1.addMultiple([_self.mcPoop1, textBubble1,  _self.notifText1])
                 answerNotifGroup1.setVisible(true)
               
                 answerNotifGroup1.setXY(screenW * 0.12, screenH * 0.8);  
                 answerNotifGroup1.propertyValueSet("x", screenW * 0.3, 0 ,1 , 1)
                 answerNotifGroup1.propertyValueSet("y", screenH * 0.455, 0 ,1 , 1)
 
                 var playBoutton1 = _self.add.group();
             
                 playBtn1 = _self.add.image(0, 0, 'answer_box_default' );
                 playBtn1.setScale(1.3, 1.2).setInteractive();
                 text1 = _self.add.text(
                     0, 0, _self.play, {fontSize:24, color: "black",fontStyle: "bolder", fontFamily: "Helvetica" }
                 ).setOrigin(0.5, 0.65);
                 playBoutton1.addMultiple([playBtn1, text1])
                 playBoutton1.setXY(screenW *  0.8, screenH * 0.9);
 
                let table = [ bg1, top_banner1, titleText1, player_bg1,  player1, quizBox1, quizHeader1,  quizQuestion1,answerBox11,answerBox22,answerBox33,answerBox44, answerGroup11,
                 answer11, answerGroup22, answer22, answerGroup22, answerGroup33, answer33, answerGroup44,  answer44 ,   bg1, top_banner1, titleText1, player_bg1,  player1, quizBox1,
                 quizHeader1,  quizQuestion1, answerGroup11, answer11, answerGroup22, answerGroup22, answerGroup33, answer33, answerGroup44,  answer44 ,_self.podiumScore1,
                 _self.mcPoop1,  answerNotifGroup1, textBubble1, _self.notifText1,  playBoutton1,   playBtn1,  text1, podium1]
 
                let table1=[bg,top_banner,player_bg,player,answer1,answer2,answer3,answer4,
                answerBox1,answerBox2,answerBox3,answerBox4,podium,quizBox,quizHeader,quizQuestion]

                for (let index = 0; index < table1.length; index++) {
                    const element = table1[index];
                        element.setVisible(false)
                }

                playBtn1.on("pointerdown", ()=>{
 
                     for (let index = 0; index < table.length; index++) {
                         const element = table[index];
                         element.destroy()
                        // console.log("élémént: " + JSON.stringify(element) + " détruit")
                         
                     }

                     for (let index = 0; index < table1.length; index++) {
                        const element = table1[index];
                            element.setVisible(true)
                    }
 
                    localStorage.setItem("quiz_first_time",1)
 
                 }, this)
                      
             }
             
         }

        // localStorage.setItem('quiz_first_time',0)

        // this.scale.lockOrientation("landscape-primary")

        this.input.addPointer(1);

        this.cameras.main.setBackgroundColor('#6effff')

        var bg = this.add.image(0, 0, 'quiz_screen_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);


        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));


    
        var player_bg = this.add.image(screenW * 0.019, screenH * 0.25, 'player_bg');
        player_bg.setOrigin(0, 0)
        player_bg.setScale(0.55,0.6);

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

        var player = this.add.image(screenW * 0.168, screenH *  0.43, selectedPlayerAvatar );
        player.setScale(0.6,0.6);


        // Quiz Box
        var quizBox = this.add.image(screenW * 0.59, screenH * 0.58, 'quiz_box' );
        quizBox.setScale(0.70, 0.78);
        quizBox.setInteractive()
        
        //  var question_mark = this.add.image(screenW *  0.814, screenH * 0.44, 'question_mark');
        //  question_mark.setScale(0.3,0.5).setAlpha(0.25)
        
        //Quiz items

        var quizHeader = this.add.text(
            screenW * 0.6, 
            screenH *  0.3, 
            "QUESTION", 
            {
                fontSize: 32,
                color: "red",
                fontStyle: "bolder",
                fontFamily: "Mont"
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



        function getQuiz()
        {
            var remoteQuizes =[];
            // if (localStorage.getItem("quizes")!=null) {
                remoteQuizes = JSON.parse(localStorage.getItem("quizes"));
            // } else {
            //     console.log(remoteQuizes);
            // }
            
    
            
            //t
            // remoteQuizes = JSON.parse(localStorage.getItem("quizes_ref"));

            var fetchedQuizes = [...remoteQuizes];
    
            var fetchedLevelQuizes = fetchedQuizes.filter((q)=>q.level == _self.currentLevel);
    
            console.log(fetchedLevelQuizes);
    
            // console.log(remoteQuizes)
            var sorted = [];
    
            var r = Math.floor(Math.random() * (1 + (fetchedLevelQuizes.length-1)));
            var element = fetchedLevelQuizes[r];

            // Add and delete
            sorted.push(element);
            fetchedLevelQuizes.splice(r, 1);
               
    
            _self.quizes = sorted;
            localStorage.setItem("quizes", JSON.stringify(fetchedLevelQuizes))

            if(fetchedLevelQuizes.length == 0)
            {
                // var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
                // localStorage.setItem("quizes", JSON.stringify(quizes_ref));
            }


        }


        var shuffledQuizAnswers = [];
        function initQuiz() {
            
            // Get QUIZ
            getQuiz();
            // var quiz = _self.quizes[m_currentQuizIndex];
            var quiz = _self.quizes[0];
           
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
                screenW * 0.55, 
                screenH * 0.42 , 
                question, 
                {
                    fontSize:  17,
                    color: "black",
                    fontWeight: "bolder",
                    fontFamily: "Mont",
                    
                }
            ).setOrigin(0.4,0.5);

        
            // Answer Block
            var answerGroup1 = _self.add.group();
            answerBox1 = _self.add.image(screenW * 0.4, screenH * 0.5, 'answer_box_default' );
            answerBox1.setScale(1.2, 1.5).setInteractive();;
            answer1 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[0].answer, 8) , {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);

            answerGroup1.addMultiple([answerBox1, answer1])
            answerGroup1.setXY(screenW * 0.47, screenH * 0.65)

            answerBox1.on('pointerdown', ()=>{

                // ..

                if (shuffledQuizAnswers[0].isCorrect) {
                    if (_self.setVolume) {
                        _self.sound.play('buzzer'); 
                    }
                    
                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);

                    answerBox1.setTexture('answer_box_correct');
                
                // setTimeout(() => {
                    getAnswer(true);
                //}, 300);

                } else{
                    if (_self.setVolume==1) {
                        _self.sound.play('keyboard2');
                    }
                  
                    toggleAnserNotif(false, true);

                    getAnswer(false);

                    answerBox1.setTexture('answer_box_wrong');
                
                }

            },this);

            // Answer Block
            var answerGroup2 = _self.add.group();
            answerBox2 = _self.add.image(0, 0, 'answer_box_default' );
            answerBox2.setScale(1.2, 1.5).setInteractive();;
            answer2 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[1].answer, 8), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);
            answerGroup2.addMultiple([answerBox2, answer2])
            answerGroup2.setXY(screenW * 0.71, screenH * 0.65);
            
            answerBox2.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[1].isCorrect) {
                    if (_self.setVolume) {
                        _self.sound.play('buzzer'); 
                    }
                    
                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                    answerBox2.setTexture('answer_box_correct');
                
                    setTimeout(() => {
                    getAnswer(true);
                }, 300);

                } else{
                    if (_self.setVolume==1) {
                        _self.sound.play('keyboard2');
                    }
                    toggleAnserNotif(false, true);
                    getAnswer(false);

                    answerBox2.setTexture('answer_box_wrong');
                    
                }

            },this);

            // Answer Block
            var answerGroup3 = _self.add.group();
            answerBox3 = _self.add.image(0, 0, 'answer_box_default' );
            answerBox3.setScale(1.2, 1.5).setInteractive();
            answer3 = _self.add.text(
                0, 0, breakString(shuffledQuizAnswers[2].answer, 8), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
            ).setOrigin(0.5, 0.65);
            answerGroup3.addMultiple([answerBox3, answer3])
            answerGroup3.setXY(screenW *  0.47, screenH * 0.82);
            answerBox3.on('pointerdown', ()=>{

                if (shuffledQuizAnswers[2].isCorrect) {
                    if (_self.setVolume) {
                        _self.sound.play('buzzer'); 
                    }
                    
                    disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                    answerBox3.setTexture('answer_box_correct');
                

                    setTimeout(() => {
                    getAnswer(true);
                }, 300);

                } else{
                    if (_self.setVolume==1) {
                        _self.sound.play('keyboard2');
                    }
                    toggleAnserNotif(false, true);
                    getAnswer(false);
                    answerBox3.setTexture('answer_box_wrong');
                }

            },this);
            // Answer Block

            var answerGroup4 = _self.add.group();
        
                answerBox4 = _self.add.image(0, 0, 'answer_box_default' );
                answerBox4.setScale(1.2, 1.5).setInteractive();
                answer4 = _self.add.text(
                    0, 0, breakString(shuffledQuizAnswers[3].answer, 8), {fontSize: 17, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
                ).setOrigin(0.5, 0.65);
                answerGroup4.addMultiple([answerBox4, answer4])
                answerGroup4.setXY(screenW *  0.71, screenH * 0.82);

                answerBox4.on('pointerdown', ()=>{
                    // ...

                    if (shuffledQuizAnswers[3].isCorrect) {
                        if (_self.setVolume) {
                            _self.sound.play('buzzer'); 
                        }
                        
                        disableAnswersBtns([answerBox1, answerBox2, answerBox3, answerBox4]);
                        answerBox4.setTexture('answer_box_correct');
    
                        setTimeout(() => {
                            getAnswer(true);
                    }, 300);
    
                    } else{
                        if (_self.setVolume==1) {
                            _self.sound.play('keyboard2');
                        }
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

        function disableAnswersBtns(btns = [])
        {
            for (let i = 0; i < btns.length; i++) {
                const btn = btns[i];
                btn.disableInteractive();
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


        // Header Block - Points
        var headerGroupPoints = this.add.group();
        var headerBgPoints = this.add.image(0, 0, 'coin_header_bg' );
        headerBgPoints.setScale(0.75);

        this.headerTextPoints = this.add.text(
            0, 0, this.currentPoints, {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.5);
        
        headerGroupPoints.addMultiple([headerBgPoints, this.headerTextPoints])
        headerGroupPoints.setXY(screenW * 0.80, screenH *  0.076);  
        headerGroupPoints.propertyValueSet("x", screenW * 0.82, 0 ,1 , 1)
        headerGroupPoints.propertyValueSet("y", screenH *  0.080, 0 ,1 , 1)

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
                var x =  screenW * 0.3 + pad ;
                

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
        var podium = this.add.image(screenW * 0.076, screenH * 0.6, 'podium_rogner' );
        podium.setScale(1.6,1.4).setOrigin(0,0);

        // SCORE
        this.podiumScore = this.add.text(
            screenW * 0.16, 
            screenH *  0.68,
            this.score.toString(), 
            {
                fontSize: 26,
                color: "white",
                fontStyle: "bolder",
                fontFamily: "Mont",
                textAlign:"center"
            }
        )



        
        function updateGlobalPoints(assignTrophee = false)
        {
            _self.currentPoints = parseInt(localStorage.getItem("points")) + _self.score;
            localStorage.setItem("points", _self.currentPoints)
            localStorage.setItem("goscreen_points", _self.currentPoints)
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
            localStorage.setItem('unlocked', 'false');
            if(_self.playerProgress[difficultyItemIndex+1])
            {
                _self.playerProgress[difficultyItemIndex+1].unlocked = true;
                localStorage.setItem('unlocked', 'true');
                
            }
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

            // if(m_currentQuizIndex < 4)
            // {
                
                // Notif
                toggleAnserNotif(isCorrect, true);

                
                if (isCorrect) {
                    // if(!m_currentQuizIndex)
                    window.m_currentQuizIndex++;
                    localStorage.removeItem("nbreResp");

                    setTimeout(() => {

                        let scene = window.roundChain[_self.currentRound-1][_self.currentRoundChainIndex];

                        //Update chain
                        _self.currentRoundChainIndex+=1;
                        localStorage.setItem('roundChainIndex', _self.currentRoundChainIndex)

                        // console.log(window.roundChain)
                        // console.log("SCENING : "+(_self.currentRound-1), _self.currentRoundChainIndex)

                        // console.log("NEXT SCENE : "+scene)
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

                            // 
                            localStorage.setItem("roundChainIndex", 0);
                        }
                        else
                        {

                            if(scene == "quizScene")
                            {
                                initQuiz();
                            }
                            else
                            {
                                if(answerNotifTO)
                                    clearInterval(answerNotifTO)
                                switchScene(scene);
                            }

                        }
                        
                    }, 500);   
                    
                }
                //console.log("init")

                

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


        function clearLevel(assignTrophee = false, gotoRecap = true)
        {

            updateGlobalPoints(assignTrophee);
            if(gotoRecap)
                setTimeout(() => {
                    window.m_currentQuizIndex = 0;
                    switchScene('recapScene');
                }, 500);
        }

        //add by Marius
        this.mcPoop = this.add.image(0, 0, 'poop_happy_oriente');
        this.mcPoop.setScale( 0.15);
        this.mcPoop.depth = 200;
        
        var answerNotifGroup = this.add.group();
        var textBubble = this.add.image(0.80, 0, 'text_bubble_oriente');
        textBubble.setScale( 0.25,  0.25).setAlpha(0.9);
        textBubble.depth = 200;

        this.notifText = this.add.text(
            0, 0, "BONNE\nREPONSE", {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.40, 0.8);

        this.notifText.depth = 200;
        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        answerNotifGroup.setVisible(false)


        answerNotifGroup.setXY(screenW * 0.93, screenH * 0.80);  
        answerNotifGroup.propertyValueSet("x", screenW * 0.90, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.60, 0 ,1 , 1)






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

            localStorage.setItem('current_players', JSON.stringify(_self.currentPlayers));


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
        
            
            var right_answers = {"en" : ["Bravo", "That's the right answer!", "Right on! ", "Well done!"], "fr" : ["Bravo !","C’est la bonne réponse !","Tout juste !","Bien joué !"]};
            var wrong_answers = {"en" : ["No!", "Not really!" , "No, it's not! ", "Almost, but ... no! "], "fr": ["Nope !" ,"Pas vraiment !" ,"Non, ce n’est pas ça !" ,"Presque, mais… non !"]};

            let answer;

            //add by marius to alter miss poop and mr poop
            let ans=getRandomArbitrary(1,10);

            let poopSprite='miss_poop_happy_oriente';

            //end

            if(!isCorrect)
            {
                answer = breakString(wrong_answers[_self.lang][Math.floor(Math.random() * (1 + (wrong_answers[_self.lang].length-1)))], 8)

                //add by Marius
                if (ans%2==0) {
                    poopSprite = 'poop_sad_oriente'; 
                
                } else {
                    poopSprite = 'miss_poop_sad_oriente'
    
                }
                
            }else{
                answer = breakString(right_answers[_self.lang][Math.floor(Math.random() * (1 + (right_answers[_self.lang].length-1)))], 8)
    
                if (ans%2==0) {
                    poopSprite = 'poop_happy_oriente';
                }

            }

        // localStorage.setItem("poop", poopSprite);
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

    
        // function that store all the correct answers in the array table 

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
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

     
        isNewPlayer()
   
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





 
 