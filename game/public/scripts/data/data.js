
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
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.send();
}


// window.localStorage.clear();

// if(!localStorage.getItem("reset-data") || localStorage.getItem("reset-data") == "true")
{
    sessionStorage.clear(); localStorage.clear();
}

if(!localStorage.getItem("player_name"))
{
    localStorage.setItem("player_name", "Player1");
}


if(!localStorage.getItem("points"))
{
    localStorage.setItem("points", 0);
    localStorage.setItem("bonus_pq", 1);
    // localStorage.setItem("roundChainIndex", 0);

}

// localStorage.removeItem("current_level");

if(!localStorage.getItem("current_level"))
{
    localStorage.setItem("current_level", 1);
}

if(!localStorage.getItem("roundChainIndex"))
{
    localStorage.setItem("roundChainIndex", 0);
}

// localStorage.removeItem("current_round");

if(!localStorage.getItem("current_round"))
{
    localStorage.setItem("current_round", 1);
}

window.globalPlayers = 
    [
        {id : 0, name:"Player1", points : 0, avatar : "player_1_avatar", gender : "male"}, 
        {id : 1, name:"Player2", points : 0, avatar : "player_2_avatar", gender : "female"},
        {id : 2, name:"Player3", points : 0, avatar : "player_3_avatar", gender : "female"},
        {id : 3, name:"Player4", points : 0, avatar : "player_4_avatar", gender : "female"},
        {id : 4, name:"Player5", points : 0, avatar : "player_5_avatar", gender : "male"},
        {id : 5, name:"Player6", points : 0, avatar : "player_6_avatar", gender : "male"},
        {id : 6, name:"Player7", points : 0, avatar : "player_7_avatar", gender : "female"},
        {id : 7, name:"Player8", points : 0, avatar : "player_8_avatar", gender : "male"},
        {id : 8, name:"Player9", points : 0, avatar : "player_9_avatar", gender : "female"},
        {id : 9, name:"Player10", points : 0, avatar : "player_10_avatar", gender : "male"}
    ];

window.players = 
    [
        {id : 0, name:"Player1", points : 0, avatar : "player_1_avatar", gender : "male"}, 
        {id : 1, name:"Player2", points : 0, avatar : "player_2_avatar", gender : "female"},
        {id : 2, name:"Player3", points : 0, avatar : "player_3_avatar", gender : "female"},
        {id : 3, name:"Player4", points : 0, avatar : "player_4_avatar", gender : "female"},
        {id : 4, name:"Player5", points : 0, avatar : "player_5_avatar", gender : "male"}
    ];


if(!localStorage.getItem("current_players"))
{

    localStorage.setItem("current_players", JSON.stringify(window.players));

    var eliminated = [];
    localStorage.setItem("eliminated_players", JSON.stringify(eliminated));
}


if(!localStorage.getItem("player_progress"))
{
    window.playerProgress = [
        {name : "EASY", trophee : "none", bestScore : 0, unlocked : true},
        {name : "MEDIUM", trophee : "none", bestScore : 0, unlocked : false},
        {name : "HARD", trophee : "none", bestScore : 0, unlocked : false}
    ]

    localStorage.setItem("player_progress", JSON.stringify(window.playerProgress));
    localStorage.setItem("current_mode", "EASY");

}


window.quizes = [];

let baseUrl = 'https://app-99fe77b7-b784-4ec7-ad64-a910b9bd4e05.cleverapps.io';


fetch(baseUrl+'/quizzes')
.then(data => {
    return data.json();
})
.then(quizzes => {
    // console.log(quizzes);

    quizzes.forEach(el => {
        el.questions = JSON.parse(el.questions);
        el.answers = JSON.parse(el.answers);
    });

    var shuffledQuizzes = quizzes.sort((a, b) => 0.5 - Math.random());
    window.quizes = shuffledQuizzes;

    localStorage.setItem("quizes_ref", JSON.stringify(window.quizes));
    localStorage.setItem("quizes", JSON.stringify(window.quizes));
    m=localStorage.getItem("quizes");
    // window.quizes = quizzes;
    
});

// for a picture 4 words
window.fiows=[]

let bdImageUrl='https://app-99fe77b7-b784-4ec7-ad64-a910b9bd4e05.cleverapps.io/fiows';

fetch(bdImageUrl).then(
    data=>{
        return data.json();
    }
).then( 
    fiows=>{
        fiows.forEach(el => {
            el.questions = JSON.parse(el.questions);
            el.answers = JSON.parse(el.answers);
        });
    
        var shuffledFiows = fiows.sort((a, b) => 0.5 - Math.random());
        window.fiows = shuffledFiows;
    
        localStorage.setItem("fiows_ref", JSON.stringify(window.fiows));
        localStorage.setItem("fiows", JSON.stringify(window.fiows));
        m=localStorage.getItem("fiows");
        // console.log(m)


    }

)


window.modes = {

    EASY : {baseProbaRightAnswer : 50, marginProbaRightAnswer : 20},
    MEDIUM : {baseProbaRightAnswer : 60, marginProbaRightAnswer : 20},
    HARD : {baseProbaRightAnswer : 70, marginProbaRightAnswer : 20}
}

window.tropheesAccess = [
   {value : 0   , trophee : "bronze"},
   {value :275  , trophee : "silver"},
   {value :350  , trophee : "gold"}
]


window.randomNames = {
    "male" : ["Lucas" ,"Juma" ,"Cedric" ,"Kevin" ,"Habibe" ,"Lucas" ,"Peter" ,"Caleb" ,"Lamine" ,"Abdou" ,"Amos" ,"Tichona" ,"Tidiane" ,"Musa" ,"Cheikh" ,"Omar" ,"Franck" ,"Thomas" ,"Uche" ,"Eyasu" ,"Sam" ,"Daniel" ,"Malick" ,"Jean" ,"Koffi" ,"Dieudonne" ,"Vicente" ,"Adama" ,"Djamal"],
    "female" : ["Emma","Binta","Pamela","Fatou","Sandra","Aicha","Astou","Yemi","Isabelle","Valerie","Isa","Sofia","Amina","Eva","Kadi","Faty","Nafi","Bané","Njeri","Marie","Rose","Aida","Nancy","Rose","Aya","Aicha","Maria","Hasnaa","Nneka"]
}

window.roundChain = {
    0 : ["quizScene", "quizScene","quizScene", "wordImageScene"],
    1 : ["wordImageScene", "wordImageScene","quizScene", "quizScene"],
    2 : ["quizScene", "quizScene","wordImageScene", "wordImageScene"]
}

window.unlockedLevelTextes = {

    "fr" :[
            // "Bravooooo, tu viens de débloquer le second niveau. Es-tu prêt pour le niveau intermédiaire?",
            "Super, tu as d’excellentes notions en assainissement. Next step",
            "Les questions liées à l’assainissement semblent ne pas avoir de secrets pour toi. Voyons si le niveau moyen nous le confirme",
            "Niveau difficile !!! tu es à quelques pas d’être l’ultra champion de l’assainissement. C’est parti"
        ],
    "en" :[
            // "Bravooooo!!! You just unlocked the second level! Are you ready for the medium level?",
            "Great, you have great skills in sanitation. Proceed to the next step",
            "Sanitation issues seem to have no secrets for you. Let’s see if the medium level confirms it",
            "Difficult level!!! You are a few steps away from being the ultra champion of sanitation. Let’s go!"
        ]
}



if (localStorage.getItem('quiz_first_time')===null) {
    localStorage.setItem('quiz_first_time',0);
} 

if (localStorage.getItem('world_first_time')===null) {
    localStorage.setItem('world_first_time',0);
} 
    
if (localStorage.getItem('sanitize_first_time')===null) {
    localStorage.setItem('sanitize_first_time',0);
} 

if (localStorage.getItem('set_volume')===null) {
    localStorage.setItem('set_volume',0);
} 
  
  
