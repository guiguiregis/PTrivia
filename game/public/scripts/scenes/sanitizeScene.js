// Our scene
var sanitizeScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "sanitizeScene" });
    },

    init: function(data) {
   
        this.lang = localStorage.getItem("lang");
        this.setVolume =parseInt(localStorage.getItem("set_volume"))
        
        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        this.investText =window.localization["INVEST"][localStorage.getItem("lang")]; 
        this.title=window.localization["TITRE"][localStorage.getItem("lang")];
        // this.pts=parseInt(localStorage.getItem("points"));
        this.pts= 2000;
        this.textMax=window.localization["SMSINVESTMAX"][localStorage.getItem("lang")];
        this.textesms=window.localization["SMSINVESTLACK"][localStorage.getItem("lang")];
        this.notif1=window.localization["SANITIZE1"][localStorage.getItem("lang")];
        this.notif2=window.localization["MESS"][localStorage.getItem("lang")];
        this.init_rawMaterials=window.localization["MATIERE"][localStorage.getItem("lang")];
        this.sanitize1 = window.localization['SANITIZE1'][localStorage.getItem("lang")];
        this.isNew=parseInt(localStorage.getItem('sanitize_first_time'))
        // localStorage.clear();
        //console.log(this.pts)
        this.dataUI=[0, 0]; 
    
        if (localStorage.getItem("rawMaterials")===null) {
            this.init_rawMaterials=JSON.stringify(this.init_rawMaterials)
            localStorage.setItem("rawMaterials",this.init_rawMaterials);
    
        }

        if (localStorage.getItem("dataUI")===null) {
            this.dataUI=JSON.stringify(this.dataUI)
          localStorage.setItem("dataUI",this.dataUI);
        }
        
        if ( localStorage.getItem("_nberPoopCoins")===null) {
            localStorage.setItem("_nberPoopCoins",parseInt(this.pts)); 
        }

        if ( localStorage.getItem("level_cleanlerness")===null) {
            localStorage.setItem("level_cleanlerness",0)
            
        }

            
        this.text1 , this.text2, this.text3; 

        if (this.lang!="fr") {

            rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"));
            rawMaterials[0][0]="Bioenergy";
            rawMaterials[1][0]="Biofuel";
            rawMaterials[2][0]="Bio agriculture";
            localStorage.setItem("rawMaterials", JSON.stringify(rawMaterials))

            this.text1='Biofuel('+(rawMaterials[0][2]+"/5)")

            this.text2='Bioenergy('+(rawMaterials[1][2]+"/5)")

            this.text3='Bio agriculture('+(rawMaterials[2][2]+"/5)")
           

        }else{

            rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"));
            rawMaterials[0][0]="Bioenergie";
            rawMaterials[1][0]="Biocarburant";
            rawMaterials[2][0]="Agriculture Bio";
            localStorage.setItem("rawMaterials", JSON.stringify(rawMaterials))

            this.text1='Bioenergie('+(0+"/5)");

            this.text2='Biocarburant('+(0+"/5)");

            this.text3='Agriculture('+(0+"/5)")+'\n Bio';
        }

    },

    preload: function() {
 
        // this.load.image('quiz_bg', './assets/quiz_bg.png');
        // this.load.image('top_banner', './assets/top_banner.png');
        // this.load.image('btn_choice', './assets/button.png');
        // this.load.image('red_banner', './assets/red_banner.png');
        // this.load.image('quiz_box', './assets/box1.png');
        // this.load.image('answer_box', './assets/button.png');
        // this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');
        // this.load.image('star_on', './assets/star_on.png');
        // this.load.image('btn_exit', './assets/exit_btn.png');
        // this.load.image('circular_btn', './assets/circular_btn.png');
        // this.load.image('invest_load', './assets/losers_bloc.png');
        // this.load.image('coin_header', './assets/coin_header_bg.png');;
        // this.load.image('Barreblack', './assets/Barreblack.png');
        // this.load.image('Barreblue', './assets/Barreblue.png');
        // this.load.image('Petitsbutton', './assets/CarreGris.png'); 
        // this.load.image('progressblack', './assets/CarreRouge.png');
        // this.load.image('camion', './assets/Poop/Camion_Vidange_Ville_Sale.png');
        // this.load.image('Car', './assets/Poop/Car.png');
        // this.load.image('CielVillePropre', './assets/Poop/Ciel_ville_propre.png');
        // this.load.image('Terrain_ville_propre', './assets/Poop/Terrain_ville_propre.png'); 
        // this.load.image('Terrain_ville_sale', './assets/Poop/Terrain_ville_sale.png');
        // this.load.image('Ville_avant_plan_propre', './assets/Poop/Ville_avant_plan_propre.png'); 
        // this.load.image('Montagnes', './assets/Poop/Montagnes.png');
        // this.load.image('Ville_avant_plan_sale', './assets/Poop/Ville_avant_plan_sale.png');
        // this.load.image('CielVilleSale', './assets/Poop/Ciel_ville_sale.png');
        // this.load.image('DechetsVilleSale', './assets/Poop/Dechets_ville_sale.png');
        // this.load.image('dirty_water', './assets/Poop/Eau_ville_sale.png');
        // this.load.image('flaques', './assets/Poop/Flaques_d_Eau_ville_sale.png');
        // this.load.image('PoubelleVilleSale', './assets/Poop/Poubelle_ville_sale.png');
        // this.load.image('Silhouette_ville', './assets/Poop/Silhouette_ville.png');
        // this.load.image('Route', './assets/Poop/Route.png');
        // this.load.image('monSoleil', './assets/Poop/Soleil.png');
        // this.load.image('Plus', './assets/Poop/Plus.png');
        // this.load.image('Moins', './assets/Poop/Moins.png');

        // //add by Marius 
        // this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        // this.load.image('poop_sad',  './assets/Poop/Poopguysad.png');
        // this.load.image('miss_poop_happy',  './assets/Poop/Poopgirlhappy.png');
        // this.load.image('miss_poop_sad',  './assets/Poop/Poopgirlsad.png');;
        // this.load.image('btn_coin', './assets/btnCoin.png');
        // this.load.image('coin_icon', './assets/coin_icon.png');
        // this.load.image('coin_icon_grey', './assets/coin_icon_grey.png');
        // this.load.image('Bouton_gris', './assets/Bouton_gris.png');

        

    },
        

    create: function() {
        var _self = this;
        
        this.cameras.main.setBackgroundColor('#6effff')

        this.sound.add('keyboard1');
        this.sound.add('keyboard2');

        function playSound(t){
            if (_self.setVolume==1) {
                _self.sound.play(t);  
            }
        }

        //Define globale variable
        let _nberTownClean=0, 
        _dataBtn1=[],
        _dataBtn2= [],
        _dataBtn3=[],
        dataUI=[],
        pts=0,
        level=0;
        _self.varre=0;
        this.quitter=false;
   
        // //console.log("je viens d'avoir: "+ _self.pts)

        _self.dataUI=this.dataUI;
        
        _self.init_rawMaterials=this.init_rawMaterials;

        _self.vraie=false;

        function firstInit(){

            let b=JSON.parse(localStorage.getItem("rawMaterials"));
        
            _dataBtn1=b[0];

            _dataBtn2=b[1];

            _dataBtn3=b[2];

            dataUI=JSON.parse(localStorage.getItem("dataUI"));

            pts =parseInt(_self.pts) + parseInt(localStorage.getItem("_nberPoopCoins"));

            localStorage.setItem("_nberPoopCoins",parseInt(pts))
            
            level= parseInt(localStorage.getItem("level_cleanlerness"));
        }

        firstInit();
        
        //ciele propre
        let cielPropre = this.add.image(-2,0, 'CielVillePropre');
        cielPropre.setScale(window.bg_x_scale*0.25, window.bg_y_scale*0.5).setOrigin(0);
        cielPropre.setOrigin(0)

        //ciel sale
        let cielSale = this.add.image(-2,0, 'CielVilleSale');
        cielSale.setScale(window.bg_x_scale*0.25, window.bg_y_scale*0.5).setOrigin(0);
        cielSale.setOrigin(0)

        //soleil
        let soleil = this.add.image(screenW*0.39,screenH*0.2, 'monSoleil');
        soleil.setScale(window.bg_x_scale*0.05, window.bg_y_scale*0.05).setOrigin(0);
        soleil.setOrigin(0)

        //terrain ville propre
        let terrain=this.add.image(-2,screenH*0.5, 'Terrain_ville_propre');
        terrain.setScale(window.bg_x_scale*0.3, window.bg_y_scale*0.14).setOrigin(0)
        
        //terrain ville sallle
        let terrainSalle=this.add.image(-2,screenH*0.5, 'Terrain_ville_sale');
        terrainSalle.setScale(window.bg_x_scale*0.3, window.bg_y_scale*0.14).setOrigin(0);
        
        //montagne
        let montagne=this.add.image(0.4, screenH*0.3, 'Montagnes');
        montagne.setScale(window.bg_x_scale*0.189, window.bg_y_scale*0.193).setOrigin(0)

       //camion vidange
        let cam = this.add.image(screenW*0.03, screenH*0.52, 'camion');
        cam.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        // eau ville salle 
        let eauSale2 = this.add.image(screenW*0.11, screenH*0.56, 'dirty_water');
        eauSale2.setScale(window.bg_x_scale*0.09, window.bg_y_scale*0.1).setOrigin(0);

        // eau ville salle 
        let eauSale = this.add.image(screenW*0.35, screenH*0.6, 'dirty_water');
        eauSale.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        //camion vidange++
        let camsale = this.add.image(screenW*0.6, screenH*0.52, 'camion');
        camsale.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);
  
        // eau ville salle 
        let eauSale1 = this.add.image(screenW*0.68, screenH*0.556, 'dirty_water');
        eauSale1.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

       // PoubelleVilleSale
       let PoubelleVilleSale = this.add.image(screenW*0.69, screenH*0.62, 'PoubelleVilleSale');
       PoubelleVilleSale.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        // dechet salle
        let dechets= this.add.image(screenW*0.4, screenH*0.54, 'DechetsVilleSale');
        dechets.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        // dechet salle
        let dechets2= this.add.image(screenW*0.05, screenH*0.6, 'DechetsVilleSale');
        dechets2.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        // flaque d'eau salle
        let flaque = this.add.image(screenW*0.05, screenH*0.6, 'flaques');
        flaque .setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        let flaque1 = this.add.image(screenW*0.5, screenH*0.7, 'flaques');
        flaque1 .setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        //silouette ville 
        let sillouette= this.add.image(screenW*0.0001, screenH*0.65, 'Silhouette_ville');
        sillouette.setScale(window.bg_x_scale/6, window.bg_y_scale*0.125).setOrigin(0);

        //Route
        let Route= this.add.image(screenW*0.0001, screenH*0.94, 'Route');
        Route .setScale(window.bg_x_scale/4, window.bg_y_scale/5).setOrigin(0)

        //ville propre
        let villePropre= this.add.image(screenW*0.02, screenH*0.65, 'Ville_avant_plan_propre');
        villePropre.setScale(window.bg_x_scale/4, window.bg_y_scale/6).setOrigin(0);

        //ville plan salle
        let villeSalle= this.add.image(screenW*0.02, screenH*0.65, 'Ville_avant_plan_sale');
        villeSalle .setScale(window.bg_x_scale/4, window.bg_y_scale/6).setOrigin(0);

        // flaque d'eau salle++
        let flaque2 = this.add.image(screenW*0.17, screenH*0.94, 'flaques');
        flaque2.setScale(window.bg_x_scale/6, window.bg_y_scale*0.125).setOrigin(0);

         // PoubelleVilleSale++
       let PoubelleVilleSale2 = this.add.image(screenW*0.1, screenH*0.94, 'PoubelleVilleSale');
       PoubelleVilleSale2.setScale(window.bg_x_scale*0.125, window.bg_y_scale*0.125).setOrigin(0);

        //Car
        let Car= this.add.image(screenW*0.48, screenH*0.92, 'Car');
        Car .setScale(window.bg_x_scale*0.2, window.bg_y_scale/5).setOrigin(0);

 
        var playGroup1 = this.add.group();
        // var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        // top_banner.setScale((window.bg_x_scale), (window.bg_x_scale));

        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale-0.79), (window.bg_x_scale-0.3));


        var home_btn = this.add.image(screenW*0.07, screenH*0.92, 'home_btn');
        home_btn.setScale(0.85).setInteractive();

        home_btn.on('pointerdown', ()=>{
            if (_self.setVolume==1) {
                _self.sound.play('keyboard1');  
            }
            
            // // ...
            switchScene('difficultyScene');
        },this); 



        this.langText = this.add.text(
            0, 
            0, 
            this.title, 
            {
                fontSize: window.bg_y_scale * 25,
                color: "#fff",
                fontStyle: "bold",
                textTransform : "uppercase",
                fontFamily:'Mont'
            }
        ).setOrigin(0.5,0.5).setInteractive();

        playGroup1.addMultiple([top_banner, this.langText]);
        playGroup1.setXY(screenW * 0.5, screenH *0.07); 
     
        // Box choice
        var quizBox = this.add.image(screenW * 0.85, screenH * 0.58, 'quiz_box' );
        quizBox.setScale(0.3,0.73 );
        quizBox.setOrigin(0.5,0.5)

        //barre 
        _self.x=0;
        _self.y= 0.5;

        // Contenu de tous les barre s de progressions

       var GroupeProgress = this.add.group()
        
        //barre progress black
        let Barreblack=this.add.image(screenW * 0.495,screenH * 0.83, 'Barreblack');
        Barreblack.setScale(0.96,1);

        //barre progress blue
        let Barreblue=this.add.image(screenW * 0.5,screenH * 0.83, 'Barreblue')
        
        var perc = 0.0;
        this.barH = Barreblue.height;
        this.barW = Barreblue.width;
        // Barreblue.setScale(perc,1);

        Barreblue.setCrop(0, 0, this.barW * perc, this.barH);
        // Barreblue.setScale(_self.x,_self.y).setOrigin(0,0);

        //the  cleanliness' level number
        this.levelText=this.add.text(screenW * 0.5,screenH * 0.78,Math.round((dataUI[0]*100)/100)+"%",{fontFamily:'Mont',fontSize:24, fontStyle:"bolder", color:'black'}) ;
        this.levelText.setOrigin(0.3,0.35)

        // GroupeProgress.addMultiple([Barreblack,Barreblue]);

        // GroupeProgress.setXY(screenW * 0.41,screenH * 0.89);
 

        // barre progresse blue, black and percent
        // GroupeProgress.setVisible(true);

        //large btns inside the main box

        // /////////////////////////  Buton groupe 1 //////////////////////////////////////
        
        //btn 1 yellow 
        var playGroup1 = this.add.group();

        // playGroup1.addMultiple([btn_box1, this.playText11]);
        // playGroup1.setXY(screenW * 0.85, screenH * 0.44);

        //btn 1 green
        // var playGroupgrey1 = this.add.group();
        var btn_boxgrey1 = this.add.image(screenW * 0.53, screenH * 0.63, 'Bouton_gris');
        btn_boxgrey1.setScale(1,  0.65).setInteractive();

        this.playTextgrey11 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        
        var btn_box1 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_choice');
        btn_box1.setScale(0.5,0.4).setInteractive();
    
        this.playText11 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        //add  Texte
        this.Text1=this.add.text(screenW * 0.70, screenH * 0.309, this.text1, { fontSize: '19px', fill: '#000' });
        this.Text1.setOrigin(0.5,4);

        
        //btn 1 grey 
        var btn_greyrond1 = this.add.image(screenW * 0.85, screenH * 0.44, 'btn_coin');
        btn_greyrond1.setScale(0.6).setAlpha(1).setInteractive()
        btn_greyrond1.setOrigin(-0.6,0.55);

        var coin_icon1_grey=this.add.image(screenW * 0.85, screenH * 0.44, 'coin_icon_grey');
        coin_icon1_grey.setScale(0.03).setAlpha(1).setInteractive()
        coin_icon1_grey.setOrigin(-3.5,0.552);
        
        this.playTextgrey1 = this.add.text(
            0, 0, _dataBtn1[1], {fontSize: 16, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(-1.89, 0.65);

        //btn rond
        var btn_boxrond1 = this.add.image(screenW * 0.85, screenH * 0.44, 'btn_coin');
        btn_boxrond1.setScale(0.6).setAlpha(1).setInteractive();
        btn_boxrond1.setOrigin(-0.6,0.55)

        var coin_icon1=this.add.image(screenW * 0.85, screenH * 0.44, 'coin_icon');
        coin_icon1.setScale(0.03).setAlpha(1).setInteractive();
        coin_icon1.setOrigin(-3.5,0.552);

        this.playText1 = this.add.text(
            0, 0, _dataBtn1[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(-1.5, 0.65);


        playGroup1.addMultiple([btn_box1, this.playText11, btn_boxgrey1, this.playTextgrey11,this.Text1,btn_boxrond1, this.playText1, coin_icon1, btn_greyrond1, coin_icon1_grey,  this.playTextgrey1]);

        playGroup1.setXY(screenW * 0.85, screenH * 0.44);

        btn_box1.on('pointerdown', (_dataBtn1)=>{
            playSound('keyboard1'); 
            if (_self.lang=="fr") {
            _dataBtn1=investTown("Bioenergie",0);
            } else {
            _dataBtn1=investTown( "Bioenergy",0);
            }

        },this);

        btn_boxgrey1.on('pointerdown', (_dataBtn1)=>{
         
            playSound('keyboard2'); 
    
            // answerNotifGroupMax1.setVisible(true);
            // answerNotifGroupMax1.depth=500

            setTimeout(() => {

                answerNotifGroupMax1.setVisible(false);  

            }, 2000);

        },this);

        // playGroupgrey1.setVisible(false)

        playGroup1.setVisible(true);


 //////////////////////////// button 2 //////////////////////////////////////////

        // boutonn btn 2 grey and yellow
        var playGroup2 = this.add.group();

                   //btn 2
        // var playGroupgrey2 = this.add.group();
        var btn_boxgrey2 = this.add.image(screenW *  0.53, screenH * 0.63, 'Bouton_gris');
        btn_boxgrey2.setScale(1,0.65).setInteractive();
        btn_boxgrey2.setVisible(false);

        this.playTextgrey22 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        var btn_box2 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_choice');
        btn_box2.setScale(0.50,0.4).setInteractive();

        this.playText22 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        this.Text2=this.add.text(screenW * 0.75, screenH * 0.52, this.text2, { fontSize: '18px', fill: '#000' });
        this.Text2.setOrigin(0.5,4.5); 
 
        
        //button 2 grey

        var btn_greyrond2 = this.add.image(screenW *0.94, screenH * 0.64, 'btn_coin');
        btn_greyrond2.setScale(0.6).setAlpha(1).setInteractive()
        btn_greyrond2.setOrigin(-0.6,0.56)

        var coin_icon2_grey=this.add.image(screenW *0.75, screenH * 0.64, 'coin_icon_grey');
        coin_icon2_grey.setScale(0.03).setAlpha(1).setInteractive();
        coin_icon2_grey.setOrigin(-3.5,0.552);

        this.playTextgrey2 = this.add.text(
           0, 0, _dataBtn2[1], {fontSize: 16, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(-1.89, 0.5)


        var btn_boxrond2 = this.add.image(screenW *  0.85, screenH * 0.85, 'btn_coin');
        btn_boxrond2.setScale(0.6).setAlpha(1).setInteractive();
        btn_boxrond2.setOrigin(-0.6,0.56);

        var coin_icon2=this.add.image(screenW *  0.75, screenH * 0.64, 'coin_icon');
        coin_icon2.setScale(0.03).setAlpha(1).setInteractive();
        coin_icon2.setOrigin(-3.5,0.552);

        this.playText2 = this.add.text(
            0,0, _dataBtn2[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(-1.5, 0.65)

        // playGroupgrey2.addMultiple([btn_boxgrey2, this.playTextgrey22]);
        // playGroupgrey2.setXY(screenW * 0.85, screenH * 0.65); 

        // playGroupgrey2.setVisible(false)

    
        playGroup2.addMultiple([btn_box2, this.playText22,btn_boxgrey2,this.playTextgrey22, this.Text2, btn_boxrond2, this.playText2, coin_icon2, btn_greyrond2,coin_icon2_grey, this.playTextgrey2  ]);
        playGroup2.setXY(screenW * 0.85, screenH * 0.65);

        btn_boxgrey2.on('pointerdown', (_dataBtn2)=>{
            playSound('keyboard2'); 
            // answerNotifGroupMax1.setVisible(true);
            // answerNotifGroupMax1.depth=500

            setTimeout(() => {

                answerNotifGroupMax1.setVisible(false);  

            }, 2000);

        },this)

        btn_box2.on('pointerdown', (_dataBtn2)=>{
            playSound('keyboard1'); 
            if (_self.lang=="fr") {
            _dataBtn2=investTown("Biocarburant",1);
            } else {
            _dataBtn2=investTown("Biofuel",1);
            }

        },this);

        playGroup2.setVisible(true)



    //////////////////////////////////// Button 3 ///////////////////////////////////////////////////////////////////

       //btn 3

        var playGroup3 = this.add.group();

        // var playGroupgrey3 = this.add.group();
        var btn_boxgrey3 = this.add.image(screenW *  0.85, screenH * 0.86, 'Bouton_gris');
        btn_boxgrey3.setScale(1,  0.65).setInteractive();
        btn_boxgrey3.setVisible(false);

        this.playTextgrey33 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        var btn_box3 = this.add.image(screenW * 0.85, screenH * 0.86, 'btn_choice');
        btn_box3.setScale(0.50,0.4).setInteractive();

        this.playText33 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.65, 0.65);

        //Text in the main box
        if (this.lang!=="fr") {
            this.Text3=this.add.text(screenW * 0.74, screenH * 0.70, this.text3, { fontSize: 16.5, fill: '#000' });
            this.Text3.setOrigin(0.5,4.3);
        } else {
            this.Text3=this.add.text(screenW * 0.74, screenH * 0.70, this.text3, { fontSize: 19, fill: '#000' });
            this.Text3.setOrigin(0.5,2.3);
        }
        

        var btn_greyrond3 = this.add.image(screenW *  0.94, screenH * 0.85, 'btn_coin');
        btn_greyrond3.setScale(0.6).setAlpha(1).setInteractive()
        btn_greyrond3.setOrigin(-0.6,0.55)

        var coin_icon3_grey=this.add.image(screenW *  0.95, screenH * 0.85, 'coin_icon_grey');
        coin_icon3_grey.setScale(0.03).setAlpha(1).setInteractive()
        coin_icon3_grey.setOrigin(-3.5,0.552)

        this.playTextgrey3 = this.add.text(
            0, 0, _dataBtn3[1], {fontSize: 16, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        )//.setOrigin(0.84, 0.65);
        this.playTextgrey3.setOrigin(-1.68, 0.65)


        var btn_boxrond3 = this.add.image(screenW *  0.8, screenH * 0.64, 'btn_coin');
        btn_boxrond3.setScale(0.6).setAlpha(1).setInteractive()
        btn_boxrond3.setOrigin(-0.6,0.55)

         var coin_icon3=this.add.image(screenW *  0.95, screenH * 0.85, 'coin_icon');
         coin_icon3.setScale(0.03).setAlpha(1).setInteractive()
         coin_icon3.setOrigin(-3.5,0.552)

        this.playText3 = this.add.text(
            0, 0, _dataBtn3[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        )//.setOrigin(0.84, 0.65);
        this.playText3.setOrigin(-1.69, 0.65)


        // playGroupgrey3.setVisible(false)
        playGroup3.addMultiple([btn_box3, this.playText33]);
        playGroup3.setXY(screenW * 0.85, screenH * 0.86);

        btn_box3.on('pointerdown', (_dataBtn3)=>{
            playSound('keyboard1'); 
             if (_self.lang=="fr") {
                _dataBtn3=investTown("Agriculture Bio",2);
             } else {
                _dataBtn3=investTown("Bio agriculture",2);
             }
            
        },this);

            
        btn_boxgrey3.on('pointerdown', (_dataBtn3)=>{
            playSound('keyboard2'); 
            // answerNotifGroupMax1.setVisible(true);
            // answerNotifGroupMax1.depth=500

            setTimeout(() => {

                answerNotifGroupMax1.setVisible(false);  

            }, 2000);

        },this)
        playGroup3.addMultiple([btn_box3, this.playText33,btn_boxgrey3,this.playTextgrey33, this.Text3, btn_boxrond3, this.playText3, coin_icon3, btn_greyrond3,coin_icon3_grey, this.playTextgrey3]);
        playGroup3.setXY(screenW *  0.85, screenH * 0.855);
        playGroup3.setVisible(true)

        ///grey 

        
        //      //btn 2
        // var playGroupgrey2 = this.add.group();
        // var btn_boxgrey2 = this.add.image(screenW *  0.85, screenH * 0.65, 'Bouton_gris');
        // btn_boxgrey2.setScale(1.2,  0.84).setInteractive();

        // this.playTextgrey22 = this.add.text(
        //     0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.5, 0.65);

        // playGroupgrey2.addMultiple([btn_boxgrey2, this.playTextgrey22]);
        // playGroupgrey2.setXY(screenW * 0.85, screenH * 0.65); 

        // btn_boxgrey2.on('pointerdown', (_dataBtn2)=>{
                   
        //     answerNotifGroupMax1.setVisible(true);
        //     answerNotifGroupMax1.depth=500

        //     setTimeout(() => {

        //         answerNotifGroupMax1.setVisible(false);  

        //     }, 2000);

        //  },this)

        // playGroupgrey2.setVisible(false)

        //     //btn 3
        // var playGroupgrey3 = this.add.group();
        // var btn_boxgrey3 = this.add.image(screenW *  0.85, screenH * 0.86, 'Bouton_gris');
        // btn_boxgrey3.setScale(1.2,  0.84).setInteractive();
        // this.playTextgrey33 = this.add.text(
        //     0, 0, this.investText, {fontSize: 20, color: "black",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.5, 0.65);

        // playGroupgrey3.addMultiple([btn_boxgrey3, this.playTextgrey33]);
        // playGroupgrey3.setXY(screenW * 0.85, screenH * 0.86); 

        // btn_boxgrey3.on('pointerdown', (_dataBtn3)=>{
                  
        //     answerNotifGroupMax1.setVisible(true);
        //     answerNotifGroupMax1.depth=500

        //     setTimeout(() => {

        //         answerNotifGroupMax1.setVisible(false);  

        //     }, 2000);

        // },this)

        // playGroupgrey3.setVisible(false)

        // btn coins
        var headerGroupPoints = this.add.group();
        var headerBgPoints = this.add.image(0, 0, 'coin_header' );
        headerBgPoints.setScale(0.75);

        this.headerTextPoints = this.add.text(
            0, 0,dataUI[1], {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.3,0.5);
        
        // _self.current_points=_self.current_points+_self.pts;
         _self.headerTextPoints.setText(pts.toString())

        headerGroupPoints.addMultiple([headerBgPoints, this.headerTextPoints])
        headerGroupPoints.setXY(screenW * 0.83, screenH *  0.076);  
        headerGroupPoints.propertyValueSet("x", screenW * 0.85, 0 ,1 , 1)
        headerGroupPoints.propertyValueSet("y", screenH *  0.080, 0 ,1 , 1)

        //add by Marius
        this.mcPoop = this.add.image(screenW * 0.25, screenH *  0.7, 'poop_happy');
        this.mcPoop.setScale( 0.15).setOrigin(0.95, 0.25);
       this.mcPoop.depth = 300;
       this.mcPoop1 = this.add.image(screenW * 0.8, screenH *  0.7, 'poop_happy');
       this.mcPoop1.setScale( 0.15).setOrigin(0.45, 0.5);
       this.mcPoop1.depth = 300;

        
        var answerNotifGroup = this.add.group();
        var answerNotifGroup1 = this.add.group();

        var textBubble = this.add.image(0, 0, 'text_bubble');
        textBubble.setScale(0.9,  0.6).setAlpha(0.6);
        textBubble.setOrigin(0.5)
        textBubble.setAlpha(0.8);

        var textBubble1 = this.add.image(0, 0, 'bubble_intro');
        textBubble1.setScale(-1.9,1.9)
        textBubble1.setOrigin(0.8,0.66)
        textBubble1.setAlpha(0.8);

       
        this.notifText = this.add.text(
            0, 0, this.textesms, {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:5 }
        ).setOrigin(0.5,0.6);      
    
        this.notifText.depth = 200;

        if (this.lang!=="fr") {
            this.notifText1 = this.add.text(
                0, 0,breakString(this.notif1, 35), {fontSize:  17, color: "black",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:15 }
            ).setOrigin(0.09, 1.05);
            
        } else {
            this.notifText1 = this.add.text(
                0, 0,breakString(this.notif1, 35), {fontSize:  17, color: "black",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:15 }
            ).setOrigin(0.05, 1.05);
        }

        //btn exit or replay
        // var groupeBtnre=this.add.group();
        // var closeBtn2 = this.add.image(screenW * 0.46, screenH *  0.35, 'Bouton_replay');
        // closeBtn2.setScale(0.3,0.3).setInteractive();
        // closeBtn2.setOrigin(-0.6,0.9);
        // closeBtn2.setAlpha(1);

        // this.notifTextre = this.add.text(
        //     screenW * 0.46, screenH *  0.35,"REJOUER", {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:15 }
        // ).setOrigin(-0.7,0.96);
        // groupeBtnre.addMultiple([closeBtn2,this.notifTextre]); 
        // groupeBtnre.setXY(screenW * 0.46, screenH *  0.35);
        // groupeBtnre.propertyValueSet("x", screenW * 0.46, 0 ,1 , 1)
        // groupeBtnre.propertyValueSet("y", screenH *  0.35, 0 ,1 , 1)

        // closeBtn2.on('pointerdown', ()=>{
        //     if (confirm("Rejoues la partie!!!.")) {
        //         var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
        //         localStorage.setItem("quizes", JSON.stringify(quizes_ref));
        //         // leave();

        //         switchScene(difficultyScene)
        //     }

        // },this); 

        // closeBtn2.depth = 300;
        answerNotifGroup.addMultiple([this.mcPoop, textBubble,  this.notifText])
        answerNotifGroup.setXY(screenW * 0.25, screenH *  0.7);
        answerNotifGroup.propertyValueSet("x", screenW * 0.3, 0 ,1 , 1)
        answerNotifGroup.propertyValueSet("y", screenH * 0.455, 0 ,1 , 1) 

        ///answerNotifGroup1.setVisible(true)
        answerNotifGroup1.addMultiple([this.mcPoop1, textBubble1,  this.notifText1])
        answerNotifGroup1.setXY(screenW * 0.2, screenH *  0.8);
        answerNotifGroup1.propertyValueSet("x", screenW * 0.3, 0 ,1 , 1)
        answerNotifGroup1.propertyValueSet("y", screenH * 0.5, 0 ,1 , 1)  
 
        answerNotifGroup.setVisible(false)
        answerNotifGroup1.setVisible(false)

        // closeBtn2.setVisible(false)
    
        function smsLackCoin(coins) { 
     
            if (coins<200 && coins<300 && coins< 150 ) {

                // closeBtn2.setVisible(true);
                answerNotifGroup.setVisible(true) 
    
                setTimeout(() => {
                    // closeBtn2.setVisible(false);
                    answerNotifGroup.setAlpha(0) 
                },15000);

            } 
        }


        smsLackCoin(pts);

        //message poop max invest rize
        //add by Marius
         this.mcPoopMax = this.add.image(screenW * 0.25, screenH *  0.7, 'poop_happy');
         this.mcPoopMax.setScale( 0.15);

         this.mcPoopMax1 = this.add.image(screenW * 0.25, screenH *  0.7, 'poop_happy');
         this.mcPoopMax1.setScale( 0.15);
                 
        //message
        var answerNotifGroupMax = this.add.group();
        var textBubbleMax = this.add.image(0, 0, 'text_bubble');
        textBubbleMax.setScale(0.6,  0.4).setAlpha(1);
        textBubbleMax.depth=300

        var answerNotifGroupMax1 = this.add.group();
        var textBubbleMax1 = this.add.image(0, 0, 'text_bubble');
        textBubbleMax1.setScale(0.6,  0.4).setAlpha(1);
        textBubbleMax1.depth=300

        this.notifTextMax = this.add.text(
            0, 0, this.textMax, {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:15 }
        ).setOrigin(0.5, 0.5);
        this.notifTextMax.depth=350;

        this.notifTextMax1 = this.add.text(
            0, 0,_self.notif2, {fontSize:  16, color: "white",fontStyle: "bold", fontFamily: "Helvetica",paddingLeft:15 }
        ).setOrigin(0.5, 0.5);
        this.notifTextMax1.depth=350;

        answerNotifGroupMax.addMultiple([ this.mcPoopMax,textBubbleMax,  this.notifTextMax])
        answerNotifGroupMax.setXY(screenW * 0.25, screenH *  0.7);
        answerNotifGroupMax.propertyValueSet("x", screenW * 0.3, 0 ,1 , 1)
        answerNotifGroupMax.propertyValueSet("y", screenH * 0.455, 0 ,1 , 1)  
   
        answerNotifGroupMax1.addMultiple([this.mcPoopMax1, textBubbleMax1,  this.notifTextMax1])   
        answerNotifGroupMax1.setXY(screenW * 0.25, screenH *  0.7);  
        answerNotifGroupMax1.propertyValueSet("x", screenW * 0.3, 0 ,1 , 1)
        answerNotifGroupMax1.propertyValueSet("y", screenH * 0.455, 0 ,1 , 1)

        answerNotifGroupMax.setVisible(false)
        answerNotifGroupMax1.setVisible(false)
        


         function messageMaxCoin(coins) {

            let m=JSON.parse(localStorage.getItem("rawMaterials")),

                t=m[0][2]===5 && m[1][2]===5 && m[2][2]===5;
                 
             let verify =  coins<200 && coins<300 && coins< 150 ;
             
             if (t && !verify) {
                // answerNotifGroupMax.setVisible(true);
   
                setInterval(() => {
                    answerNotifGroupMax.setVisible(false)
                  
                }, 5000);
             }
         }

        // function invesTMAXSIze(nbCoins,basprise,m) {

        //     let m1=m[0][2], m2=m[1][2], m3=m[2][2];  

        //     if ( nbCoins>=basprise && !(m1==5 && m2==5 && m3==5)) {
                                
        //         answerNotifGroupMax1.setVisible(true);
        //         answerNotifGroupMax1.depth=500

        //         setTimeout(() => {

        //             answerNotifGroupMax1.setVisible(false);  

        //         }, 2000);
        //     }
               
        // }
  

        //btn exit rignt the box
        var btn_exit2 = this.add.image(screenW *  0.95, screenH * 0.25,'Plus');
        btn_exit2.setScale(0.40).setAlpha(1).setInteractive()

        btn_exit2.on('pointerdown', ()=>{
            answerNotifGroup1.setVisible(false)
            playSound('keyboard1'); 
             leaveBox();
            //console.log("Cool je suis");
        },this); 

        var btn_exit = this.add.image(screenW *  0.95, screenH * 0.25,'Moins');
        btn_exit.setScale(0.40).setAlpha(1).setInteractive()

        btn_exit.on('pointerdown', ()=>{
            answerNotifGroup1.setVisible(false)
            playSound('keyboard1'); 
             leaveBox();
            //console.log("Cool je suis");
        },this); 


        // var closeBtn = this.add.image(screenW * 0.95, screenH * 0.087, 'Bouton_replay');
        // closeBtn.setScale(0.5).setInteractive();

        // closeBtn.on('pointerdown', ()=>{
        //     playSound('keyboard1'); 
        //     if (confirm("Rejouez la partie!.")) {
        //         var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
        //         localStorage.setItem("quizes", JSON.stringify(quizes_ref));
        //         leave();
        //         sanitizeScene(difficultyScene);
                
        //       }

        // },this); 
        

        //btns circular right btns inside the box
            //btn 1
        //  var groupeBtn1=this.add.group();
        //  var btn_box1 = this.add.image(screenW *  0.94, screenH * 0.43, 'btn_coin');
        //  btn_box1.setScale(0.6).setAlpha(1).setInteractive()

        //   var coin_icon1=this.add.image(screenW *  0.95, screenH * 0.43, 'coin_icon');
        //     coin_icon1.setScale(0.03).setAlpha(1).setInteractive()

        //  this.playText1 = this.add.text(
        //      0, 0, _dataBtn1[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        //  ).setOrigin(0.86, 0.65);

        //  groupeBtn1.addMultiple([btn_box1, this.playText1]);
        //  groupeBtn1.setXY(screenW *  0.935, screenH * 0.43); 
        //  groupeBtn1.setVisible(true)
             
        //      //btnn 2
        //  var groupeBtn2=this.add.group();
        //  var btn_box2 = this.add.image(screenW *  0.94, screenH * 0.85, 'btn_coin');
        //  btn_box2.setScale(0.6).setAlpha(1).setInteractive()

        //  var coin_icon2=this.add.image(screenW *  0.95, screenH * 0.64, 'coin_icon');
        //  coin_icon2.setScale(0.03).setAlpha(1).setInteractive()

        // this.playText2 = this.add.text(
        //     0, 0, _dataBtn2[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.86, 0.65);

        // groupeBtn2.addMultiple([btn_box2, this.playText2]);
        // groupeBtn2.setXY(screenW *  0.935, screenH * 0.64);
        // groupeBtn2.setVisible(true)

           //btn 3
        // var groupeBtn3=this.add.group();
        // var btn_box3 = this.add.image(screenW *  0.94, screenH * 0.64, 'btn_coin');
        // btn_box3.setScale(0.6).setAlpha(1).setInteractive()

        //  var coin_icon3=this.add.image(screenW *  0.95, screenH * 0.85, 'coin_icon');
        //  coin_icon3.setScale(0.03).setAlpha(1).setInteractive()

        // this.playText3 = this.add.text(
        //     0, 0, _dataBtn3[1], {fontSize: 16, color: "yellow",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.86, 0.65);

        // groupeBtn3.addMultiple([btn_box3, this.playText3]);
        // groupeBtn3.setXY(screenW *  0.935, screenH * 0.85);
        // groupeBtn3.setVisible(true)

        //     //btn 1 grey 
        // var groupeBtnGrey1=this.add.group();
        // var btn_grey1 = this.add.image(screenW *  0.94, screenH * 0.43, 'btn_coin');
        // btn_grey1.setScale(0.6).setAlpha(1).setInteractive()

        // var coin_icon1_grey=this.add.image(screenW *  0.95, screenH * 0.43, 'coin_icon_grey');
        // coin_icon1_grey.setScale(0.03).setAlpha(1).setInteractive()
        

        // this.playTextgrey1 = this.add.text(
        //     0, 0, _dataBtn1[1], {fontSize: 15, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.86, 0.65);

        // groupeBtnGrey1.addMultiple([btn_grey1, this.playTextgrey1]);
        // groupeBtnGrey1.setXY(screenW *  0.935, screenH * 0.43);

        // groupeBtnGrey1.setVisible(false);
        // coin_icon1_grey.setVisible(false);

            //btn 2 grey 
        // var groupeBtnGrey2=this.add.group();
        // var btn_grey2 = this.add.image(screenW *  0.94, screenH * 0.64, 'btn_coin');
        // btn_grey2.setScale(0.6).setAlpha(1).setInteractive()

        // var coin_icon2_grey=this.add.image(screenW *  0.95, screenH * 0.64, 'coin_icon_grey');
        // coin_icon2_grey.setScale(0.03).setAlpha(1).setInteractive()

        // this.playTextgrey2 = this.add.text(
        //     0, 0, _dataBtn2[1], {fontSize: 15, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.86, 0.65);

        // groupeBtnGrey2.addMultiple([btn_grey2, this.playTextgrey2]);
        // groupeBtnGrey2.setXY(screenW *  0.935, screenH * 0.64);

        // groupeBtnGrey2.setVisible(false);
        // coin_icon2_grey.setVisible(false);
    
         //btn 3 grey 
        // var groupeBtnGrey3=this.add.group();
        // var btn_grey3 = this.add.image(screenW *  0.94, screenH * 0.85, 'btn_coin');
        // btn_grey3.setScale(0.6).setAlpha(1).setInteractive()

        // var coin_icon3_grey=this.add.image(screenW *  0.95, screenH * 0.85, 'coin_icon_grey');
        // coin_icon3_grey.setScale(0.03).setAlpha(1).setInteractive()

        // this.playTextgrey3 = this.add.text(
        //     0, 0, _dataBtn3[1], {fontSize: 15, color: "dark",fontStyle: "bolder", fontFamily: "Mont" }
        // ).setOrigin(0.86, 0.65);

        // groupeBtnGrey3.addMultiple([btn_grey3, this.playTextgrey3]);
        // groupeBtnGrey3.setXY(screenW *  0.935, screenH * 0.85);

        // groupeBtnGrey3.setVisible(false);
        // coin_icon3_grey.setVisible(false);

        //btns to fill the invest
        let progres1=[0.88,0.855,0.83,0.805,0.78]

        let prog=['progress1','progress2','progress3','progress4','progress5']
        
        let prog1=['progress1','progress2','progress3','progress4','progress5']
        
        let prog2=['progress1','progress2','progress3','progress4','progress5']

        for (let index = 0; index < progres1.length; index++) {
            prog[index]= this.add.image(screenW * progres1[index], screenH * 0.34, 'Petitsbutton');
            prog[index].setScale(0.2).setOrigin(0)

            prog1[index]= this.add.image(screenW * progres1[index], screenH * 0.55, 'Petitsbutton');
            prog1[index].setScale(0.2).setOrigin(0)

            
            prog2[index]= this.add.image(screenW * progres1[index], screenH * 0.76, 'Petitsbutton');
            prog2[index].setScale(0.2).setOrigin(0)
            
        }

        let prog3=['progress1','progress2','progress3','progress4','progress5']
        
        let prog4=['progress1','progress2','progress3','progress4','progress5']
        
        let prog5=['progress1','progress2','progress3','progress4','progress5']

        for (let index = 0; index < progres1.length; index++) {
            prog3[index]= this.add.image(screenW * progres1[index], screenH * 0.34, 'progressblack');
            prog3[index].setScale(0.2).setOrigin(0).setVisible(false)

            prog4[index]= this.add.image(screenW * progres1[index], screenH * 0.55, 'progressblack');
            prog4[index].setScale(0.2).setOrigin(0).setVisible(false)

            
            prog5[index]= this.add.image(screenW * progres1[index], screenH * 0.76, 'progressblack');
            prog5[index].setScale(0.2).setOrigin(0).setVisible(false)
            
        }

        function newInGame() {

            if (_self.isNew==0) {
                localStorage.setItem('sanitize_first_time',1)
                localStorage.setItem("etat",0)
                answerNotifGroup1.setVisible(true);
                answerNotifGroup.setVisible(false);
                answerNotifGroupMax.setVisible(false);
                answerNotifGroupMax.setVisible(false);
                leaveBox()

                // setTimeout(() => {
                //     answerNotifGroup1.setVisible(false);

                // }, 20000);

            }
        }

        newInGame()

        // function CoinsOK(coins) {
        //     // let table=JSON.parse(localStorage.getItem("rawMaterials"))
        //     // //console.log("voir le contenue");
        //     // //console.log(table)
        //     // let a=table[0][1], b=table[1][1], c=table[2][1]
        //     // if(coins>=a && coins>=b && coins>=c ){
        //         answerNotifGroup1.setVisible(false)
        //     //  }  
        //  }
 
        // //  CoinsOK(pts)

      
        //function too set grey barre
         function barreGrey() {

             let m = [],etat=0;

             if (localStorage.getItem("rawMaterials")!=null && localStorage.getItem("etat")) {

                 m=JSON.parse(localStorage.getItem("rawMaterials"));
                 etat=parseInt(localStorage.getItem("etat"))

                 if (etat==0) {

                    if (m[0][2]==1) {
                        
                        prog3[4].setVisible(true);
                            

                    } else if (m[0][2]==2){

                        prog3[4].setVisible(true) 
                        prog3[3].setVisible(true)  
                             

                    }else if (m[0][2]==3){

                        prog3[4].setVisible(true)
                        prog3[3].setVisible(true) 
                        prog3[2].setVisible(true)
                               


                    }else if (m[0][2]==4){

                        prog3[4].setVisible(true) 
                        prog3[3].setVisible(true)
                        prog3[2].setVisible(true) 
                        prog3[1].setVisible(true) 
                            

                    }else if (m[0][2]==5){

                        prog3[4].setVisible(true)
                        prog3[3].setVisible(true) 
                        prog3[2].setVisible(true)
                        prog3[1].setVisible(true) 
                        prog3[0].setVisible(true)  
                
                        btn_box1.setVisible(false) 
                        _self.playText11.setVisible(false) 
                        btn_boxrond1.setVisible(false) 
                        coin_icon1.setVisible(false)  
                        _self.playText1.setVisible(false) 

                    }else{
                        // //console.log("reprendre")
                    }

                    if (m[1][2]==1) {

                        prog4[4].setVisible(true)
                            

                    } else if (m[1][2]==2){

                        prog4[4].setVisible(true)
                        prog4[3].setVisible(true) 
                            
                        
                    }else if (m[1][2]==3){

                        prog4[4].setVisible(true)
                        prog4[3].setVisible(true) 
                        prog4[2].setVisible(true)
                            

                    }else if (m[1][2]==4){
                        prog4[4].setVisible(true)
                        prog4[3].setVisible(true) 
                        prog4[2].setVisible(true)
                        prog4[1].setVisible(true)
                             
                
                    }else if (m[1][2]==5){

                        prog4[4].setVisible(true)
                        prog4[3].setVisible(true) 
                        prog4[2].setVisible(true)
                        prog4[1].setVisible(true) 
                        prog4[0].setVisible(true)
                            

                        btn_box2.setVisible(false) 
                        _self.playText22.setVisible(false) 
                        btn_boxrond2.setVisible(false) 
                        coin_icon2.setVisible(false)  
                        _self.playText2.setVisible(false)

                    }else{
                        // //console.log("reprendre")
                    }

                    if (m[2][2]==1) {

                        prog5[4].setVisible(true)
                            

                    } else if (m[2][2]==2){
                        
                        prog5[4].setVisible(true)
                        prog5[3].setVisible(true) 
                            
                        
                    }else if (m[2][2]==3){

                        prog5[4].setVisible(true)
                        prog5[3].setVisible(true) 
                        prog5[2].setVisible(true)
                            

                    }else if (m[2][2]==4){
                        prog5[4].setVisible(true)
                        prog5[3].setVisible(true) 
                        prog5[2].setVisible(true)
                        prog5[1].setVisible(true) 
                            

                    }else if (m[2][2]==5){

                        prog5[4].setVisible(true)
                        prog5[3].setVisible(true) 
                        prog5[2].setVisible(true)
                        prog5[1].setVisible(true) 
                        prog5[0].setVisible(true)

                        btn_box3.setVisible(false) 
                        _self.playText33.setVisible(false) 
                        btn_boxrond3.setVisible(false) 
                        coin_icon3.setVisible(false)  
                        _self.playText3.setVisible(false)

                    }else{
                        // //console.log("reprendre")
                    }
                 } else {
                    //  //console.log("vérifies  le code")
                 }
               


             } else {
                //  //console.log("cool")
             }
            
         }
      
        setInterval(() => {
            barreGrey(); 
        },[]);
       
        //btn exit rignt vertical barre
        function leave() {
            
            _self.quitter=true

            let a = JSON.parse(localStorage.getItem("rawMaterials"))
            let b0=a[0], b1=a[1], b2=a[2];

            let verify=b0[2]==5 && b1[2]==5 &&  b2[2]==5

           if (verify) {

                localStorage.removeItem("dataUI");

                localStorage.removeItem("rawMaterials");

                //Barreblue.setScale(0,_self.y)
            }

            switchScene('difficultyScene');

        }

         function leaveBox() {
     

             let tab=[quizBox, Barreblue, Barreblack, _self.levelText, top_banner, _self.langText, playGroup3, playGroup2, playGroup1]
   
             let etat=0;

             if (localStorage.getItem("etat")!==true) {
                 etat=localStorage.getItem("etat");
             }

             if (etat==0) {

                 for (let index = 0; index < tab.length; index++) {
                     tab[index].setVisible(false); 

                 }

                 for (let index = 0; index < 5; index++) {
                     prog[index].setVisible(false);
                     prog1[index].setVisible(false);
                     prog2[index].setVisible(false);
                     prog3[index].setVisible(false);
                     prog4[index].setVisible(false);
                     prog5[index].setVisible(false);
                    
                 }
                // init_barreBtnProgress();
                 btn_exit.setVisible(false);
                 etat=1;

             }else{

                for (let index = 0; index < tab.length; index++) {
                    tab[index].setVisible(true); 
                }

                for (let index = 0; index < 5; index++) { 
            //     prog3[index].setVisible(true);
            //     prog4[index].setVisible(true);
            //     prog5[index].setVisible(true);
                    prog[index].setVisible(true);
                    prog1[index].setVisible(true);
                    prog2[index].setVisible(true); 
                }
                init_barreBtnProgress();
                btn_exit.setVisible(true);
                etat=0  ;

             }

             localStorage.setItem("etat", etat)
         }
          

         function setMe(x) {
             
            let b =x; 

            let a = JSON.parse(localStorage.getItem("rawMaterials"))

            let b0=a[0], b1=a[1], b2=a[2];

            let verify=b0[2]==5 && b1[2]==5 &&  b2[2]==5

           if (verify) {

                //Barreblue.setScale(0,_self.y);

                _self.levelText.setText(0+"%");

                localStorage.setItem("dataUI",JSON.stringify(_self.dataUI));

                localStorage.setItem("rawMaterials",JSON.stringify(_self.init_rawMaterials));

           } else {
              
                switch (b) {

                    case 1:
                        _self.x = 0.04
                        // Barreblue.setScale(_self.x,_self.y);
                        break;

                    case 2:
                        _self.x =_self.x + 0.04*2
                        // Barreblue.setScale(_self.x,_self.y);
                        break;

                    case 3:
                        _self.x =_self.x + 0.04*3
                        // Barreblue.setScale(_self.x,_self.y);
                        break;

                    case 4:
                        _self.x =_self.x + 0.04*4
                        // Barreblue.setScale(_self.x,_self.y);
                        break;

                    case 5:
                        _self.x =_self.x + 0.04*5
                        // Barreblue.setScale(_self.x,_self.y);
                        break;
                
                    default:
                        break;
                }  


                var level= parseInt(localStorage.getItem("level_cleanlerness"));
                console.log(level);
                // Barreblue.setCrop(0, 0, _self.barW * _self.x, _self.barH);
                
           }

        }

        //progression barre
        function init_progressBarre() {
            localStorage.getItem("dataUI")
            let b = JSON.parse(localStorage.getItem("rawMaterials"))
            let b0=b[0], b1=b[1], b2=b[2];
            setMe(b0[2]);
            setMe(b1[2]);
            setMe(b2[2]);

        }

        setTimeout(() => {
            init_progressBarre()    
        }, 1000);
       

        function progressBarre() {
            let p=0
            _self.x =_self.x + 0.04
            var level= parseFloat(localStorage.getItem("level_cleanlerness"))  / 100;
            console.log(level);
            // Barreblue.setScale(_self.x,_self.y); 
            Barreblue.setCrop(0, 0, _self.barW * level, _self.barH); 
           
        }

        //proprety
        function cleanIt(){

            let _myData=[],dat=0,rep=0;

            if (localStorage.getItem("rawMaterials")!=null) {
                _myData=JSON.parse(localStorage.getItem("rawMaterials"))
                dat=localStorage.getItem('level_Cleanlerness') ;
           
            } else {
                _myData=_self.init_rawMaterials
                dat=0;
                resp=0;    
            }

            if (_self.varre===1){

                setInterval(
                    ()=>{             
                        //console.log("Bravo! Vous avez réussi à assainir votre")
                    },
                500 
                )
            }else {
                if (_myData[0][0]=="Bioenergie" || _myData[0][0]=="Bioenergy") {

                    if(_myData[0][2]==1){
                       
                        setTimeout(
                            ()=>{             
                                cam.destroy();
                                
                            },
                        500 
                        )  
                    }
    
                    if(_myData[0][2]==2){
                       
                        setTimeout(
                            ()=>{             
                                eauSale.destroy();
                                
                            },
                        500 
                        )  
                    }
    
                    if(_myData[0][2]==3){
                      
                        setTimeout(
                            ()=>{             
                                flaque.destroy();
                                
                            },
                        500 
                        )
                    
                    
                    }
    
                    if(_myData[0][2]==4){
                       
                        setTimeout(
                            ()=>{             
                                flaque1.destroy(); 
                                
                            },
                        500 
                        )
                    
                        
                    }
                    
                    if(_myData[0][2]==5){
                    
                        setTimeout(
                            ()=>{             
                                eauSale1.destroy(); 
                                
                            },
                        500 
                        )
                        
                    }
    
                }
    
                if (_myData[1][0]==="Biocarburant" || _myData[1][0]==="Biofuel") {
    
                    if(_myData[1][2]==1){
                        eauSale2.destroy(); 
                        
                        
                    }
    
                    if(_myData[1][2]==2){
                     
                        setTimeout(
                            ()=>{             
                                camsale.destroy();
                                    
                            },
                        500 
                        )   
                    }
    
                    if(_myData[1][2]==3){
                       
                        setTimeout(
                            ()=>{             
                                cielSale.destroy();
                                
                            },
                        500 
                        )
                    }
    
                    if(_myData[1][2]==4){
                        
                        setTimeout(
                            ()=>{
                                dechets.destroy();
                                
                            },
                        500 
                        )    
                    }
                    
                    if(_myData[1][2]==5){
                        //console.log("ok cinq")
                        setTimeout(
                            ()=>{
                                dechets2.destroy();
                                
                            },
                        500 
                        )
                    
                    }
    
                }  
    
                if (_myData[2][0]==="Agriculture Bio" || _myData[2][0]==="Bio agriculture") {
    
                    if(_myData[2][2]==1){
                       
                       flaque2.destroy()
                    
                    }
    
                    if(_myData[2][2]==2){
                       
                        setTimeout(
                            ()=>{
                                terrainSalle.destroy();
                                
                            },
                            2000
                        )
                    
                    }
    
                    if(_myData[2][2]==3){
                        
                        setTimeout(
                            ()=>{
                                PoubelleVilleSale.destroy();
                                
                            },
                            2000
                        )
                    
                    }
    
                    if(_myData[2][2]==4){
                     
                        setTimeout(
                            ()=>{
                                villeSalle.destroy();
                                PoubelleVilleSale2.destroy();
                                
                            },
                            2000
                        )    
                    }
                    
                    if(_myData[2][2]==5){
                       
                        PoubelleVilleSale2.destroy()
                    
                    }      
                }
            }
            
        }

        //init clearn if use refresh the page

        function init_clearn() {
            let m = localStorage.getItem("rawMaterials")

            m=JSON.parse(m);

            let verify=m[0][2]==5 && m[1][2]==5 && m[2][2]==5

            if (verify) {

                localStorage.setItem("rawMaterials",JSON.stringify(_self.init_rawMaterials));

                localStorage.setItem("dataUI",JSON.stringify(_self.dataUI));

                localStorage.setItem("level_cleanlerness",0);

                if (_self.lang!="fr") {

                    this.Text1.setText('Biofuel('+(rawMaterials[0][2]+"/5)"))
        
                    this.Text2.setText('Bioenergy('+(rawMaterials[1][2]+"/5)"))
        
                    this.Text3.setText('Bio agriculture('+(rawMaterials[2][2]+"/5)"))
                   
        
                }else{

                    _self.Text1.setText('Bioenergie('+(0+"/5)"));

                    _self.Text2.setText('Biocarburant('+(0+"/5)"));

                    _self.Text3.setText(' Agriculture('+(0+"/5)")+'\n Bio');

                    _self.levelText.setText(0+"%");

                    //Barreblue.setScale(0,_self.y);
                }
            }

            if (m[0][0]=="Bioenergie" || m[0][0]=="Bioenergy") {

                if(m[0][2]==1){ 

                    cam.destroy();
                    
                }

                if(m[0][2]==2){
                                   
                    eauSale.destroy();
                    cam.destroy();          
              
                }

                if(m[0][2]==3){
                          
                    flaque.destroy();
                    eauSale.destroy();
                    cam.destroy();
                            
                }

                if(m[0][2]==4){
                               
                    flaque1.destroy(); 
                    flaque.destroy();
                    eauSale.destroy();
                    cam.destroy();
                                  
                }
                
                if(m[0][2]==5){
                     
                    eauSale1.destroy(); 
                    flaque.destroy();
                    eauSale.destroy();
                    cam.destroy();
               
                }

            }

            if (m[1][0]==="Biocarburant" || m[1][0]==="Biofuel") {

                if(m[1][2]==1){

                    eauSale2.destroy(); 
                       
                }

                if(m[1][2]==2){
                            
                    camsale.destroy();
                    eauSale2.destroy(); 
                        
                }

                if(m[1][2]==3){
                                
                    cielSale.destroy();
                    camsale.destroy();
                    eauSale2.destroy(); 
                                
                }

                if(m[1][2]==4){
                     
                    dechets.destroy();
                    cielSale.destroy();
                    camsale.destroy();
                    eauSale2.destroy(); 
                }
                
                if(m[1][2]==5){
                      
                    dechets2.destroy();
                    dechets.destroy();
                    cielSale.destroy();
                    camsale.destroy();
                    eauSale2.destroy();
                            
                }

            }  

            if (m[2][0]==="Agriculture Bio" || m[2][0]==="Bio agriculture") {

                if(m[2][2]==1){
                   
                   flaque2.destroy()
                
                }

                if(m[2][2]==2){ 
              
                    terrainSalle.destroy();
                    flaque2.destroy()
        
                }

                if(m[2][2]==3){
                    
                    PoubelleVilleSale.destroy();
                    terrainSalle.destroy();
                    flaque2.destroy()
                            
                }

                if(m[2][2]==4){
                 
                    villeSalle.destroy();
                    PoubelleVilleSale2.destroy();
                    PoubelleVilleSale.destroy();
                    terrainSalle.destroy();
                    flaque2.destroy()
   
                }
                
                if(m[2][2]==5){
                   
                    PoubelleVilleSale2.destroy()
                    villeSalle.destroy();
                    PoubelleVilleSale2.destroy();
                    PoubelleVilleSale.destroy();
                    terrainSalle.destroy();
                    flaque2.destroy()
                
                }  
            }    
        }

        init_clearn()
        
        //progress butons

        function init_barreBtnProgress() {

            let etat=0;
            if (localStorage.getItem("etat")!=null) {
                etat =parseInt(localStorage.getItem("etat"))
            }else{
                etat=1;
            }
            
            if (localStorage.getItem("rawMaterials")!=null && etat==0) {

                let m = localStorage.getItem("rawMaterials")

                m=JSON.parse(m);

                // if (m[0][0]=="bioenergie" || m[0][0]=="Bioenergy") {
                    
                    if (m[0][2]==1) {
                        prog3[4].setVisible(true);
                    } else if(m[0][2]==2) {
                        prog3[3].setVisible(true);
                        prog3[4].setVisible(true);
                    }else if(m[0][2]==3) {
                        prog3[2].setVisible(true);
                        prog3[3].setVisible(true);
                        prog3[4].setVisible(true);
                    }else if(m[0][2]==4) {
                        prog3[1].setVisible(true);
                        prog3[2].setVisible(true);
                        prog3[3].setVisible(true);
                        prog3[4].setVisible(true);
                    }else if(m[0][2]==5) {
                        prog3[0].setVisible(true);
                        prog3[1].setVisible(true);
                        prog3[2].setVisible(true);
                        prog3[3].setVisible(true);
                        prog3[4].setVisible(true);

                        btn_box1.setVisible(false) 
                        _self.playText11.setVisible(false) 
                        btn_boxrond1.setVisible(false) 
                        coin_icon1.setVisible(false)  
                        _self.playText1.setVisible(false)

                    }else{
                        //console.log("plein")
                    }
                // }

                // // if (m[1][0]=="biocarburant" || m[1][0]== "Biofuel") {
                    if (m[1][2]==1) {
                        prog4[4].setVisible(true);
                    } else if(m[1][2]==2) {
                        prog4[3].setVisible(true);
                        prog4[4].setVisible(true);
                    }else if(m[1][2]==3) {
                        prog4[2].setVisible(true);
                        prog4[3].setVisible(true);
                        prog4[4].setVisible(true);
                    }else if(m[1][2]==4) {
                        prog4[1].setVisible(true);
                        prog4[2].setVisible(true);
                        prog4[3].setVisible(true);
                        prog4[4].setVisible(true);
                    }else if(m[1][2]==5) {
                        prog4[0].setVisible(true);
                        prog4[1].setVisible(true);
                        prog4[2].setVisible(true);
                        prog4[3].setVisible(true);
                        prog4[4].setVisible(true);
                        
                        btn_box2.setVisible(false) 
                        _self.playText22.setVisible(false) 
                        btn_boxrond2.setVisible(false) 
                        coin_icon2.setVisible(false)  
                        _self.playText2.setVisible(false)

                    }else{
                        
                        //console.log("plein")
                    }
                // }

                // if (m[2][0]=="Agriculture Bio" || m[2][0]=="Organic agriculture") {
                    if (m[2][2]==1) {
                        prog5[4].setVisible(true);
                    } else if(m[2][2]==2) {
                        prog5[3].setVisible(true);
                        prog5[4].setVisible(true);
                    }else if(m[2][2]==3) {
                        prog5[2].setVisible(true);
                        prog5[3].setVisible(true);
                        prog5[4].setVisible(true);
                    }else if(m[2][2]==4) {
                        prog5[1].setVisible(true);
                        prog5[2].setVisible(true);
                        prog5[3].setVisible(true);
                        prog5[4].setVisible(true);
                    }else if(m[2][2]==5) {
                        prog5[0].setVisible(true);
                        prog5[1].setVisible(true);
                        prog5[2].setVisible(true);
                        prog5[3].setVisible(true);
                        prog5[4].setVisible(true);
                        
                        btn_box3.setVisible(false) 
                        _self.playText33.setVisible(false) 
                        btn_boxrond3.setVisible(false) 
                        coin_icon3.setVisible(false)  
                        _self.playText3.setVisible(false)
                    }else{
                        //console.log("plein")
                    }
                // }

            }
        }

        setInterval(() => {
            init_barreBtnProgress()
        },[]);
       
        function barreBtnProgress(choice) {

            if (localStorage.getItem("rawMaterials")!=null) {

                let m = localStorage.getItem("rawMaterials")

                m=JSON.parse(m);

                if (m[0][0]==choice) {
                    
                    if (m[0][2]==1) {
                        prog3[4].setVisible(true);
                    } else if(m[0][2]==2) {
                        prog3[3].setVisible(true);
                    }else if(m[0][2]==3) {
                        prog3[2].setVisible(true);
                    }else if(m[0][2]==4) {
                        prog3[1].setVisible(true);
                    }else if(m[0][2]==5) {
                        prog3[0].setVisible(true);
                        btn_box1.setVisible(false) 
                        _self.playText11.setVisible(false) 
                        btn_boxrond1.setVisible(false) 
                        coin_icon1.setVisible(false)  
                        _self.playText1.setVisible(false)

                    }else{
                        //console.log("plein")
                    }
                }

                if (m[1][0]==choice) {
                    if (m[1][2]==1) {
                        prog4[4].setVisible(true);
                    } else if(m[1][2]==2) {
                        prog4[3].setVisible(true);
                    }else if(m[1][2]==3) {
                        prog4[2].setVisible(true);
                    }else if(m[1][2]==4) {
                        prog4[1].setVisible(true);
                    }else if(m[1][2]==5) {
                        prog4[0].setVisible(true);
                        btn_box2.setVisible(false) 
                        _self.playText22.setVisible(false) 
                        btn_boxrond2.setVisible(false) 
                        coin_icon2.setVisible(false)  
                        _self.playText2.setVisible(false)
                    }else{
                        
                        //console.log("plein")
                    }
                }

                if (m[2][0]==choice) {
                    if (m[2][2]==1) {
                        prog5[4].setVisible(true);
                    } else if(m[2][2]==2) {
                        prog5[3].setVisible(true);
                    }else if(m[2][2]==3) {
                        prog5[2].setVisible(true);
                    }else if(m[2][2]==4) {
                        prog5[1].setVisible(true);
                    }else if(m[2][2]==5) {
                        prog5[0].setVisible(true);
                        btn_box3.setVisible(false) 
                        _self.playText33.setVisible(false) 
                        btn_boxrond3.setVisible(false) 
                        coin_icon3.setVisible(false)  
                        _self.playText3.setVisible(false)
                    }else{
                        //console.log("plein")
                    }
                }

            } else {
                //console.log("null")
            }

            cleanIt()

            localStorage.setItem("p",choice);

        }

        //Clean the storage data if levelCleanlerness is >= 100%
        function cleanLevel(){

            let _myData=JSON.parse(localStorage.getItem("rawMaterials"))

            let bool=_myData[0][2]==5 && _myData[1][2]==5 && _myData[2][2]==5

            if(bool==true){    
                _self.levelText.setText(0+"%");

                _self.varre=1;

                //console.log(_self.varre)

                localStorage.removeItem("rawMaterials")

                localStorage.removeItem("dataUI")

                //console.log("clean"); 
        
            }
        }

        cleanLevel();

        // the function invest (used on lines 87, 104, 121)
        function investTown(choice,index_data){

            //Get all data we need
            const invest_perCent=0.1;

            let _levelUpdate=6.66;

            let _nberPoopCoins=parseInt(localStorage.getItem("_nberPoopCoins"));

            let rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"))

            let dat=JSON.parse(localStorage.getItem("dataUI"))

            let _levelCleanliness=Math.round(dat[0])

            let _nberTimeInvest=rawMaterials[index_data][2];

            let _basePrise=rawMaterials[index_data][1]

            switch(choice){ 

                case rawMaterials[index_data][0]:

                    if (_nberPoopCoins>=_basePrise ){

                        if (_nberTimeInvest<5) {


                            barreGrey();
                            
                            _nberPoopCoins-=_basePrise;

                            _basePrise+=Math.trunc(_basePrise*invest_perCent);

                            _levelCleanliness+=_levelUpdate;

                            _nberTimeInvest+=1;

                            rawMaterials[index_data]=[choice,_basePrise,_nberTimeInvest];

                            dat=[ parseInt(_levelCleanliness),Math.floor(_nberPoopCoins)]

                            // if (_self.lang!="fr") {

                            //     this.Text1.setText('Biofuel('+(rawMaterials[0][2]+"/5)"))
                    
                            //     this.Text2.setText('Bioenergy('+(rawMaterials[1][2]+"/5)"))
                    
                            //     this.Text3.setText(' Organic Agri-('+(rawMaterials[2][2]+"/5)"+"\n culture"))
                    
                            // }else{
                    
                            //     _self.Text1.setText('Bioenergie('+(rawMaterials[0][2]+"/5)"))

                            //     _self.Text2.setText('Biocarburant('+(rawMaterials[1][2]+"/5)"))

                            //     _self.Text3.setText(' Agriculture('+(rawMaterials[2][2]+"/5)")+'\n Bio')
                            // }

                            //update on the UI
                            let v=rawMaterials[0][2]==5 && rawMaterials[1][2]==5 && rawMaterials[2][2]==5
                            if (v) {
                                _self.levelText.setText(100+"%");
                                
                            }else{
                                _self.levelText.setText((Math.floor(_levelCleanliness)).toString()+"%");
                               
                            }
            
                        } else {
                            //console.log("Max")
                            // invesTMAXSIze(_nberPoopCoins,_basePrise,rawMaterials) 

                        }

                    }else  {
                        //console.log("nombre de coins insuffisant");
                     
                        answerNotifGroup.setVisible(true) ;

                        setTimeout(() => {
                            answerNotifGroup.setAlpha(0) ;
                        }, 3000);
                    }
                    // invesTMAXSIze(choice,_nberPoopCoins);
                    break;   

                default:
                    //console.log("Erreur de code");
                    
            }
    
            //stored data change
            rawMaterials=JSON.stringify(rawMaterials);

            localStorage.setItem("rawMaterials",rawMaterials);

            localStorage.setItem("_nberPoopCoins",parseInt(_nberPoopCoins));

            localStorage.setItem("dataUI",JSON.stringify(dat));

            localStorage.setItem("level_cleanlerness",Math.round(_levelCleanliness))

            progressBarre()


            _self.headerTextPoints.setText(_nberPoopCoins.toString());

             if (choice=="Bioenergie" || choice=="Bioenergy") {

                _self.playText1.setText(_basePrise.toString());
                _self.playTextgrey1.setText(_basePrise.toString());

             }

             if(choice==="Biocarburant" || choice==="Biofuel") {

                _self.playText2.setText(_basePrise.toString()); 
                _self.playTextgrey2.setText(_basePrise.toString());    
     

             }

             if (choice==="Agriculture Bio" || choice==="Bio agriculture") {

                _self.playText3.setText(_basePrise.toString())
        
                _self.playTextgrey3.setText(_basePrise.toString())
               

             } 

            //check if the max times of invest is raisid
            messageMaxCoin(_nberPoopCoins)

            //barre progresse
            barreBtnProgress(choice);

            // set level
            cleanIt();
            
            //check if is possible to investe
            smsLackCoin(_nberPoopCoins);

            //return my data
            return dat;
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

 

        //switch to a anothe Scene
        function switchScene(newScene)
        {
            showLoader()
            _self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }

        // Loader
        hideLoader();
    },

    update: function() {

        if (this.lang!="fr") {

            rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"));
            rawMaterials[0][0]="Bioenergy";
            rawMaterials[1][0]="Biofuel";
            rawMaterials[2][0]="Bio agriculture";

            localStorage.setItem("rawMaterials", JSON.stringify(rawMaterials))

            this.text1='Biofuel('+(rawMaterials[0][2]+"/5)")

            this.text2='Bioenergy('+(rawMaterials[1][2]+"/5)")

            this.text3='Bio agriculture('+(rawMaterials[2][2]+"/5)")
           

        }else{

            rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"));
            rawMaterials[0][0]="Bioenergie";
            rawMaterials[1][0]="Biocarburant";
            rawMaterials[2][0]="Agriculture Bio";
            localStorage.setItem("rawMaterials", JSON.stringify(rawMaterials))

            this.text1='Bioenergie('+(0+"/5)");

            this.text2='Biocarburant('+(0+"/5)");

            this.text3='Agriculture('+(0+"/5)")+'\n Bio';
        }
    
    },

    render: function() {

         // Display
      
    }
});





 
 