localStorage.removeItem("lang");
var userLanguage = window.navigator.userLanguage || window.navigator.language;
var lang = userLanguage.split("-")[0];
if(lang != "fr" && lang != "en") lang = "en";
// console.log(lang)
if(!localStorage.getItem("lang"))
{
    localStorage.setItem("lang", lang);
}


window.localization = {

    PLAY : {en : "PLAY", fr : "JOUER"},
    
    RESTART : {en : "RESTART", fr : "REJOUER"},
    
    CONTINUE : {en : "CONTINUE", fr : "CONTINUER"},
    
    SANITIZE : {en:"SANITIZE",fr:"ASSAINIR"},
    
    INVEST : {en:"INVEST",fr:"INVESTIR"},
    
    TITRE : {en:"INVEST IN MY CITY",fr:"ASSAINIR MA VILLE"},
    
    WELCOME : {en:"WELCOME TO",fr:"BIENVENUE DANS"},
   
    TUTO : {en:"HOW TO PLAY ?",fr:"COMMENT JOUER ?"},
    
    SELECT_DIFFICULTY : {en:"SELECT THE DIFFICULTY",fr:"CHOISIR LA DIFFICULTE"},
    
    EASY : {en:"EASY",fr:"FACILE"},
    
    MEDIUM : {en:"MEDIUM",fr:"MOYEN"},
    
    HARD : {en:"HARD",fr:"DIFFICILE"},

    
    TUTO1:{en:"Find the correct answer \namong the four \nproposals",fr:"Trouve la bonne réponse \nparmi les quatre \npropositions "},
    
    TUTO2:{en:"How many children die \neach day from diseases \nrelated to lack of sanitation ?",fr:"Combien d'enfants meurent \nchaque jour de maladies \nliées au manque d'assainissement ?"},
    
    QUIZZ:{en:"CLASSIC QUIZZ",fr:" QUIZ CLASSIQUE"},

    TUTO3:{en:["Transport","Collection","Emptying","Processing"],fr:["Transport","Collecte","Vidange","Traitement"]},
    
    TUTO4:{en:"Choose the word that \nbest matches the picture",fr:"Choisis le mot correspondant \nmieux à l'image."},
   
    QUIZZ1:{en:"ONE IMAGE 4 WORDS",fr:"UNE IMAGE 4 MOTS"},

    SMSINVESTLACK:{
        
        en:"You couldn't improve  \nthe sanitation of your city \ndue to lack of coins?"+
        "\nNo worries! \nYou can play again and earn more coins " +
        "\nto complete the sanitizing \nof your city. \nIt's up to you to play, champion",

        fr:"Tu n'as pas pu améliorer \nl'assainissement de ta ville\npar manque de pièces?" +
        "\npas d'inquiétude! \nT'as la possibilité de repartir \njouer et de collecter plus de pièces "+
        "\npour achever le nettoyage de la ville. \nA toi de jouer champion"
    },

    SMSINVESTMAX:{en:"Hmm !!! \nBravo! You succeeded \nto clean up your town",fr:"Humm!!! \nBravo! t'as réussi \à assainir ta ville"},

    SMS:{en:"Hmm ...! you have enough coins to invest",fr:"Humm...! t'as assez de coins pour investir"},

    MESS:{en:"Number of investments reached",fr:"Nombre d'investissement atteint"},

    BEST_SCORE : {en:"BEST SCORE",fr:"MEILLEUR SCORE"},

    NO_TROPHY : {en:"NO TROPHY",fr:"PAS DE TROPHEE"},

    SANITIZE1:{

        en:"Did you know? The poop coins you collected "+ 
        "throughout the game can allow you to invest " + 
        "in improving the sanitation of your city! It’s very " + 
        "simple, invest your gains either in biofuel, organic "+ 
        "griculture or bio energy. You can invest in all 3 " + 
        "sectors only if you have enough poop coins. So do not "+
        "wait any longer. The fate of your city depends on you.",

        fr:"Le savais-tu? Les poop coins que tu as collecté" +
        " tout au long du jeu peuvent te permettre d’investir "+ 
        "pour améliorer l' assainissement de ta ville. "+
        "C’est très simple, Investis tes gains soit dans "+
        "le biocarburant, ou dans l’agriculture bio ou encore "+ 
        "dans le bio énergie. Tu peux investir dans tous les 3 "+ 
        "secteurs si bien sûr tu as assez de poop coins. "+ 
        "Alors n’attends plus, le sort de ta ville ne dépend que de toi."
    },

    BRONZE : {en:"BRONZE",fr:"BRONZE"},

    SILVER : {en:"SILVER",fr:"ARGENT"},

    GOLD : {en:"GOLD",fr:"OR"},

    MATIERE: {

        en:[
            ["Bioenergy",200,0], 
            ["Biofuel",300,0],
            ["Bio agriculture",150,0],
            ["Fertilizer",200,0],
            ["Ashes",300,0],
            ["Compost",180,0],
            ["Electricity",250,0],
            ["Distilled water",230,0],
            ["Soil conditioner",150,0],
            ["Coal",150,0]
        ],

        fr:[ 
            ["Bioenergie",200,0], 
            ["Biocarburant",300,0],
            ["Agriculture Bio",150,0],
            ["Engrais",200,0],
            ["Cendres",300,0],
            ["Compost",180,0],
            ["Électricité",250,0],
            ["Eau distillée",230,0],
            ["Conditionneur de sol",150,0],
            ["Charbon",150,0]
        ]
    }
}
