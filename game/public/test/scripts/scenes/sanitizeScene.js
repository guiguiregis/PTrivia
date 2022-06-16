// Our scene
var sanitizeScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "sanitizeScene" });
    },

    init: function(data) {
   
        //this.lang = localStorage.getItem("lang");
        this.restartBtnText = window.localization["RESTART"][localStorage.getItem("lang")];
        this.investText =window.localization["INVEST"][localStorage.getItem("lang")]; 
        this.title=window.localization["TITRE"][localStorage.getItem("lang")];
        this.possibile;
     
        this.possibile=false;

        //default variables 
         //localStorage.clear()
        this.init_rawMaterials=[ //used on line 307
            ["Biocarburant",200,0], 
            ["Biogaz",300,0],
            ["liant de construction",150,0],
            ["Engrais",200,0],
            ["Cendres",300,0],
            ["Compost",180,0],
            ["Électricité",250,0],
            ["Eau distillée",230,0],
            ["Conditionneur de sol",150,0],
            ["Charbon",150,0]
        ]
       
        this.pts=parseInt(localStorage.getItem("points"));   
   
        console.log(this.pts)

        this.dataUI=[0, 0];

    },

    preload: function() {
 
        this.load.image('quiz_bg', './assets/quiz_bg.png');
        this.load.image('top_banner', './assets/top_banner.png');
        this.load.image('btn_choice', './assets/button.png');
        this.load.image('red_banner', './assets/red_banner.png');
        this.load.image('quiz_box', './assets/box1.png');
        this.load.image('answer_box', './assets/button.png');
        this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');
        this.load.image('star_on', './assets/star_on.png');
        this.load.image('btn_exit', './assets/exit_btn.png');
        this.load.image('circular_btn', './assets/circular_btn.png');
        this.load.image('invest_load', './assets/losers_bloc.png');
        this.load.image('coin_header', './assets/coin_header_bg.png');;
        this.load.image('Barreblack', './assets/Barreblack.png');
        this.load.image('Barreblue', './assets/Barreblue.png');
        this.load.image('Petitsbutton', './assets/Petitsbutton.png'); 
        this.load.image('progressblack', './assets/progressblack.jpg');
        this.load.image('CamionVidangeVilleSale', './assets/Poop/Camion_Vidange_Ville_Sale.png');
        this.load.image('Car', './assets/Poop/Car.png');
        this.load.image('CielVillePropre', './assets/Poop/Ciel_ville_propre.png');
        this.load.image('Terrain_ville_propre', './assets/Poop/Terrain_ville_propre.png'); 
        this.load.image('Terrain_ville_sale', './assets/Poop/Terrain_ville_sale.png');
        this.load.image('Ville_avant_plan_propre', './assets/Poop/Ville_avant_plan_propre.png'); 
        this.load.image('Montagnes', './assets/Poop/Montagnes.png');
        this.load.image('Ville_avant_plan_sale', './assets/Poop/Ville_avant_plan_sale.png');
        this.load.image('CielVilleSale', './assets/Poop/Ciel_ville_sale.png');
        this.load.image('DechetsVilleSale', './assets/Poop/Dechets_ville_sale.png');
        this.load.image('EauVilleSale', './assets/Poop/Eau_ville_sale.png');
        this.load.image('FlaqueEauVilleSale', './assets/Poop/Flaques_d_Eau_ville_sale.png');
        this.load.image('PoubelleVilleSale', './assets/Poop/Poubelle_ville_sale.png');
        this.load.image('Silhouette_ville', './assets/Poop/Silhouette_ville.png');
        this.load.image('Route', './assets/Poop/Route.png');
        this.load.image('monSoleil', './assets/Poop/Soleil.png');
        this.load.image('Plus', './assets/Poop/Plus.png');
        this.load.image('Moins', './assets/Poop/Moins.png');

    },
        

    create: function() {
        var _self = this;
        //Define globale variable
        let _nberTownClean=0;
        let  _dataBtn1=[],_dataBtn2= [],_dataBtn3=[];
        let dataUI=[];
        _self.dataUI=this.dataUI;
        _self.init_rawMaterials=this.init_rawMaterials;

        function firstInit(){
            if (localStorage.getItem("rawMaterials")!=null) {
                let b=JSON.parse(localStorage.getItem("rawMaterials"));
                console.log(b);
                _dataBtn1=b[0];
                _dataBtn2=b[1];
                _dataBtn3=b[2];
            }
            else{
                let tab=_self.init_rawMaterials;
                console.log(tab)
                _dataBtn1=tab[0];
                _dataBtn2=tab[1];
                _dataBtn3=tab[2]; 
            }

            if (localStorage.getItem("dataUI")!==null) {
                let k=JSON.parse(localStorage.getItem("dataUI"));
                    console.log(k);
                    dataUI=k;

            } else {
                    dataUI =_self.dataUI;
                    console.log(dataUI)
            }
        }

        firstInit();
        

        //ciele propre
        let cielPropre = this.add.image(-2,0, 'CielVillePropre');
        cielPropre.setScale(window.bg_x_scale*0.25, window.bg_y_scale*0.5).setOrigin(0);
        cielPropre.setOrigin(0)
       

         //ville salle
       // let ville_salle=this.add.image(0.8, 0.5, 'Villesalle');
        //ville_salle.setScale(window.bg_x_scale+0.2, window.bg_y_scale+0.09).setOrigin(0);

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
        let cam = this.add.image(screenW*0.03, screenH*0.52, 'CamionVidangeVilleSale');
        cam.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        // eau ville salle 
        let eauSale2 = this.add.image(screenW*0.11, screenH*0.56, 'EauVilleSale');
        eauSale2.setScale(window.bg_x_scale*0.09, window.bg_y_scale*0.1).setOrigin(0);

        // eau ville salle 
        let eauSale = this.add.image(screenW*0.35, screenH*0.6, 'EauVilleSale');
        eauSale.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        //camion vidange++
        let camsale = this.add.image(screenW*0.6, screenH*0.5, 'CamionVidangeVilleSale');
        camsale.setScale(window.bg_x_scale/8, window.bg_y_scale/6).setOrigin(0);
  
        // eau ville salle 
        let eauSale1 = this.add.image(screenW*0.68, screenH*0.556, 'EauVilleSale');
        eauSale1.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

       // PoubelleVilleSale
       let PoubelleVilleSale = this.add.image(screenW*0.69, screenH*0.62, 'PoubelleVilleSale');
       PoubelleVilleSale.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        
        // dechet salle
        let dechets= this.add.image(screenW*0.4, screenH*0.54, 'DechetsVilleSale');
        dechets.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        // dechet salle
        let dechets2= this.add.image(screenW*0.05, screenH*0.6, 'DechetsVilleSale');
        dechets2.setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        // flaque d'eau salle
        let flaque = this.add.image(screenW*0.05, screenH*0.6, 'FlaqueEauVilleSale');
        flaque .setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        let flaque1 = this.add.image(screenW*0.5, screenH*0.7, 'FlaqueEauVilleSale');
        flaque1 .setScale(window.bg_x_scale/8, window.bg_y_scale/8).setOrigin(0);

        //silouette ville 
        let sillouette= this.add.image(screenW*0.0001, screenH*0.65, 'Silhouette_ville');
        sillouette.setScale(window.bg_x_scale/6, window.bg_y_scale/8).setOrigin(0);

        //Route
        let Route= this.add.image(screenW*0.0001, screenH*0.94, 'Route');
        Route .setScale(window.bg_x_scale/4, window.bg_y_scale/5).setOrigin(0)

        //ville propre
        let villePropre= this.add.image(screenW*0.02, screenH*0.65, 'Ville_avant_plan_propre');
        villePropre.setScale(window.bg_x_scale/4, window.bg_y_scale/6).setOrigin(0);

        //ville plan salle
        let villeSalle= this.add.image(screenW*0.02, screenH*0.65, 'Ville_avant_plan_sale');
        villeSalle .setScale(window.bg_x_scale/4, window.bg_y_scale/6).setOrigin(0);
;

        //Car
        let Car= this.add.image(screenW*0.5, screenH*0.925, 'Car');
        Car .setScale(window.bg_x_scale/4, window.bg_y_scale/7).setOrigin(0);

        // this.cameras.main.setBackgroundColor('#000000')
        var playGroup1 = this.add.group();
        var top_banner = this.add.image(screenW*0.5, 35, 'top_banner');
        top_banner.setScale((window.bg_x_scale), (window.bg_x_scale));

        this.langText = this.add.text(
            0, 
            0, 
            this.title, 
            {
                fontSize: window.bg_y_scale * 25,
                color: "#fff",
                fontStyle: "bold",
                textTransform : "uppercase"
            }
        ).setOrigin(0.5,0).setInteractive();

        playGroup1.addMultiple([top_banner, this.langText]);
        playGroup1.setXY(screenW * 0.5, screenH *0.07); 
     
        // Box choice
        var quizBox = this.add.image(screenW * 0.85, screenH * 0.59, 'quiz_box' );
        quizBox.setScale(0.35, 0.75);

        //barre 
        _self.x=1;
        _self.y= 0.4;
        
        //barre progress blue
        let Barreblue=this.add.image(screenW * 0.35, screenH * 0.952, 'Barreblue');
            Barreblue.setScale(1,0.4).setOrigin(0,0.5)

        //barre progress black
        let Barreblack=this.add.image(screenW * 0.35,screenH * 0.952, 'Barreblack');
            Barreblack.setScale( _self.x,_self.y).setOrigin(0,0.5)


        //Text in the main box

        this.Text1=this.add.text(screenW * 0.75, screenH * 0.309, 'Biocarburant('+(_dataBtn1[2]+"/5)"), { fontSize: '19px', fill: '#000' });
        this.Text2=this.add.text(screenW * 0.79, screenH * 0.52, 'Biogaz('+(_dataBtn2[2]+"/5)"), { fontSize: '20px', fill: '#000' });
        this.Text3=this.add.text(screenW * 0.74, screenH * 0.70, ' liant de \n construction('+(_dataBtn3[2]+"/5)"), { fontSize: '20px', fill: '#000' });
        
        //the  cleanliness' level number
        this.levelText=this.add.text(screenW * 0.5, screenH * 0.9,Math.round((dataUI[0]*100)/100)+" %",{fontFamily:'Georgia',fontSize:'15px', color:'black'}) 

        //large btns inside the main box

            //btn 1
        var playGroup1 = this.add.group();
        var btn_box1 = this.add.image(screenW * 0.53, screenH * 0.63, 'btn_choice');
        btn_box1.setScale(0.60,  0.50).setInteractive();

        this.playText2 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "green",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);
        playGroup1.addMultiple([btn_box1, this.playText2]);
        playGroup1.setXY(screenW * 0.85, screenH * 0.44);

        btn_box1.on('pointerdown', (_dataBtn1)=>{
            _dataBtn1=investTown("Biocarburant",0,this.init_rawMaterials,_nberTownClean);

        },this);
        
             //btn 2
        var playGroup2 = this.add.group();
        var btn_box2 = this.add.image(screenW *  0.85, screenH * 0.65, 'btn_choice');
        btn_box2.setScale(0.60,  0.50).setInteractive();

        this.playText2 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "green",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        playGroup2.addMultiple([btn_box2, this.playText2]);
        playGroup2.setXY(screenW * 0.85, screenH * 0.65); 

        btn_box2.on('pointerdown', (_dataBtn2)=>{
            _dataBtn2=investTown("Biogaz",1,this.init_rawMaterials,_nberTownClean);

        },this)

            //btn 3
        var playGroup3 = this.add.group();
        var btn_box3 = this.add.image(screenW *  0.85, screenH * 0.86, 'btn_choice');
        btn_box3.setScale(0.60,  0.50).setInteractive();
        this.playText2 = this.add.text(
            0, 0, this.investText, {fontSize: 20, color: "green",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        playGroup3.addMultiple([btn_box3, this.playText2]);
        playGroup3.setXY(screenW * 0.85, screenH * 0.86); 

        btn_box3.on('pointerdown', (_dataBtn3)=>{
            // ...
            _dataBtn3=investTown("liant de construction",2,this.init_rawMaterials,_nberTownClean);

        },this)
           
        // btn coins
        var headerGroupPoints = this.add.group();
        var headerBgPoints = this.add.image(0, 0, 'coin_header' );
        headerBgPoints.setScale(0.75);

        this.headerTextPoints = this.add.text(
            0, 0,dataUI[1], {fontSize: 19, color: "white",fontStyle: "bold", fontFamily: "Mont" }
        ).setOrigin(0.5);

        headerGroupPoints.addMultiple([headerBgPoints, this.headerTextPoints])
        headerGroupPoints.setXY(screenW * 0.80, screenH *  0.084);  
        headerGroupPoints.propertyValueSet("x", screenW * 0.82, 0 ,1 , 1)
        headerGroupPoints.propertyValueSet("y", screenH *  0.088, 0 ,1 , 1)


        //btn exit rignt the box
        
        var btn_exit2 = this.add.image(screenW *  0.97, screenH * 0.22,'Plus');
        btn_exit2.setScale(0.40).setAlpha(1).setInteractive()

        btn_exit2.on('pointerdown', ()=>{
            leaveBox();
        },this); 

        var btn_exit = this.add.image(screenW *  0.97, screenH * 0.22,'Moins');
        btn_exit.setScale(0.40).setAlpha(1).setInteractive()

        btn_exit.on('pointerdown', ()=>{
            leaveBox();
        },this); 
 
        //btn exit rignt vertical barre
        function leave() {
            switchScene('selectionScene');
        }

        function leaveBox() {
            let tab=[quizBox,Barreblue,Barreblack,_self.Text1,_self.Text2,_self.levelText,playGroup3,playGroup1,playGroup2,top_banner,
                _self.Text3,groupeBtn1, groupeBtn2,groupeBtn3,btn_box1,progress1,progress2,progress3,progres1,progres2,progres3,_self.langText ]
            let etat=1;

            if (localStorage.getItem("etat")!==true) {
                etat=localStorage.getItem("etat");
            }

            if (etat==0) {
                for (let index = 0; index < tab.length; index++) {
                    tab[index].setVisible(false); 
                }
                btn_exit.setVisible(false);

                etat=1;
            }else{
                for (let index = 0; index < tab.length; index++) {
                    tab[index].setVisible(true); 
                }
                btn_exit.setVisible(true);
                etat=0  
            }
            localStorage.setItem("etat", etat)

        }

        var closeBtn = this.add.image(screenW * 0.95, screenH * 0.087, 'btn_exit');
        closeBtn.setScale(0.5).setInteractive();

        closeBtn.on('pointerdown', ()=>{
            if (confirm("Allez à la page d'accueil.")) {
                var quizes_ref = JSON.parse(localStorage.getItem("quizes_ref"));
                localStorage.setItem("quizes", JSON.stringify(quizes_ref));
                leave();
              }

        },this); 

        //btns circular right btns inside the box
            //btn 1
        var groupeBtn1=this.add.group();
        var btn_box1 = this.add.image(screenW *  0.94, screenH * 0.43, 'circular_btn');
        btn_box1.setScale(0.50).setAlpha(1).setInteractive()

        this.playText1 = this.add.text(
            0, 0, _dataBtn1[1], {fontSize: 20, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        groupeBtn1.addMultiple([btn_box1, this.playText1]);
        groupeBtn1.setXY(screenW *  0.94, screenH * 0.43); 
             
        //btnn 2
        var groupeBtn2=this.add.group();
        var btn_box3 = this.add.image(screenW *  0.94, screenH * 0.85, 'circular_btn');
        btn_box3.setScale(0.50).setAlpha(1).setInteractive()

        this.playText2 = this.add.text(
            0, 0, _dataBtn2[1], {fontSize: 20, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        groupeBtn2.addMultiple([btn_box3, this.playText2]);
        groupeBtn2.setXY(screenW *  0.94, screenH * 0.85);

        //btn 3
        var groupeBtn3=this.add.group();
        var btn_box2 = this.add.image(screenW *  0.94, screenH * 0.64, 'circular_btn');
        btn_box2.setScale(0.50).setAlpha(1).setInteractive()

        this.playText3 = this.add.text(
            0, 0, _dataBtn3[1], {fontSize: 20, color: "white",fontStyle: "bolder", fontFamily: "Mont" }
        ).setOrigin(0.5, 0.65);

        groupeBtn3.addMultiple([btn_box2, this.playText3]);
        groupeBtn3.setXY(screenW *  0.94, screenH * 0.64);

        //btns to fill the invest

        var progress1= this.add.image(screenW * 0.85, screenH * 0.37, 'Petitsbutton');
        var progres1= this.add.image(screenW * 0.85, screenH * 0.37, 'progressblack');

        var progress2= this.add.image(screenW * 0.85, screenH * 0.58, 'Petitsbutton');
        var progres2= this.add.image(screenW * 0.85, screenH * 0.58, 'progressblack');
      
        var progress3 = this.add.image(screenW * 0.85, screenH * 0.79, 'Petitsbutton');
        var progres3= this.add.image(screenW * 0.85, screenH * 0.79, 'progressblack');
       
        //function that settele the progressive barre

        function progressBarre() {
            _self.x =_self.x - 0.066// Math.floor(1/15);

            let lang=screenW*0.53;
        
            Barreblack.setPosition(_self.x,screenH * 0.952);
            Barreblack.setOrigin(0.5,0.5)
            console.log("évolution: "+_self.x)
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

                    
                if (_myData[0][0]=="Biocarburant") {

                    if(_myData[0][2]==1){
                        console.log("ok bio  un")
                        setTimeout(
                            ()=>{             
                                cam.setVisible(false);
                            },
                        500 
                        )
                    
                        
                    }

                    if(_myData[0][2]==2){
                        console.log("ok bio deux")
                        setTimeout(
                            ()=>{             
                                eauSale.setVisible(false);
                            },
                        500 
                        )
                    
                        
                    }

                    if(_myData[0][2]==3){
                        console.log("ok bio  trois")
                        setTimeout(
                            ()=>{             
                                flaque.setVisible(false);
                            },
                        500 
                        )
                    
                    
                    }

                    if(_myData[0][2]==4){
                        console.log("ok bio quatre")
                        setTimeout(
                            ()=>{             
                                flaque1.setVisible(false); 
                            },
                        500 
                        )
                    
                        
                    }
                    
                    if(_myData[0][2]==5){
                        console.log("ok bio cinq");
                        setTimeout(
                            ()=>{             
                                eauSale1.setVisible(false); 
                            },
                        500 
                        )
                    
                        
                    }

                }

                if (_myData[1][0]==="Biogaz") {

                    if(_myData[1][2]==1){
                        eauSale2.setVisible(false); 
                       
                    }

                    if(_myData[1][2]==2){
                        console.log("ok deux")
                        setTimeout(
                            ()=>{             
                                camsale.setVisible(false); 
                            },
                        500 
                        )
                    
                        
                    }

                    if(_myData[1][2]==3){
                        console.log("ok trois")
                        setTimeout(
                            ()=>{             
                                cielSale.setVisible(false)
                            },
                        500 
                        )
                    

                    }

                    if(_myData[1][2]==4){
                        console.log("ok quatre")
                        setTimeout(
                            ()=>{
                                dechets.setVisible(false)
                            },
                        500 
                        )
                    
                        
                    }
                    
                    if(_myData[1][2]==5){
                        console.log("ok cinq")
                        setTimeout(
                            ()=>{
                                dechets2.setVisible(false);
                            },
                        500 
                        )
                    
                    }

                }  

                if (_myData[2][0]==="liant de construction") {

                    if(_myData[2][2]==1){
                        console.log("ok un")

                    
                    }

                    if(_myData[2][2]==2){
                        console.log("ok deux")
                        setTimeout(
                            ()=>{
                                terrainSalle.setVisible(false);
                            },
                            2000
                        )
                    
                    }

                    if(_myData[2][2]==3){
                        console.log("ok trois")
                        setTimeout(
                            ()=>{
                                PoubelleVilleSale.setVisible(false);
                            },
                            2000
                        )
                    
                    }

                    if(_myData[2][2]==4){
                        console.log("ok quatre")
                        setTimeout(
                            ()=>{
                                villeSalle.setVisible(false);
                            },
                            2000
                        )
                    
                        
                    }
                    
                    if(_myData[2][2]==5){
                        console.log("ok cinq")
                    
                    }      
                }

                if (_myData[2][2]===_myData[1][2] && _myData[0][2]===_myData[1][2] && _myData[0][2]===_myData[2][2] ) {

                   alert("Bravo!! Vous avez réussi à assainir votre ville")

                   setTimeout(() => {

                       _self.possibile=true;
 
                   }, 2000);
                }
           // localStorage.setItem("resp",rep);
            
        }

        //function that describes how the investment works


        //Clean the storage data if levelCleanlerness is >= 100%

        function cleanLevel(level,init_rawMaterials,_nberTownClean){

            let _myData=JSON.parse(localStorage.getItem("rawMaterials"))

            let bool=_myData[0][2]==5 && _myData[1][2]==5 && _myData[2][2]==5 &&  _self.possibile==false

            if(level>=100 || bool==true  ){        

                let data=JSON.parse(localStorage.getItem("dataUI"));
                data[0]=0;
                localStorage.setItem("dataUI",JSON.stringify(data) );

                _nberTownClean+=1;

                localStorage.setItem("rawMaterials",JSON.stringify(init_rawMaterials));
                localStorage.setItem("nberTownClean",_nberTownClean);

                localStorage.removeItem('level_cleanliness');
                localStorage.setItem('level_cleanliness',0);
                _self.levelText.setText(100+" %");

                console.log("clean");
            }
        }


        // the function invest (used on lines 87, 104, 121)

        function investTown(choice,index,init_rawMaterials,_nberTownClean){

            /** Set the data witch we'll use for our function (the function will run with these datas the first time after we'll storage 
             * the new datas, wich will use for the next time; to the localeStorage)
             * 
             * **/

            let rawMaterials=init_rawMaterials;
            /**
             *  Data used for the UI (used, on line 115 and 138, above)
             *  _levelCleanlines=>cleanliness percentage
             *  choice => choice of raw material in which to invest
             *  index=>level corresponding to the table rawMaterials
             *  _nberCoinsPrevious=> the amount of previous coins
             *  _nberPoopCoin=> the actual amount  coins
             * */

            const invest_perCent=0.1;
            let _nberTimeInvest=0;
            let _levelCleanliness=0.0;
            let _levelUpdate=6.66;
            let tmp=parseInt(_self.pts )
            let _nberPoopCoins=0;
            let _basePrise=0;
            let level=_levelCleanliness;

            /**
             * We check into the storage in order to verify if  we have allready  some datas stored there
            *  */  

            if (localStorage.getItem("rawMaterials")!=null) {
                rawMaterials=JSON.parse(localStorage.getItem("rawMaterials"))

                if (rawMaterials[index][0]==choice ) {
                    _nberTimeInvest+=rawMaterials[index][2];
                    _basePrise=rawMaterials[index][3]

                }
   
            }  

            if (localStorage.getItem("_nberPoopCoins")!=null) {
                let varTmp=localStorage.getItem("_nberPoopCoins");
                _nberPoopCoins=parseInt(tmp)+ parseInt(varTmp);
                localStorage.setItem("_nberPoopCoins",_nberPoopCoins)

            }else{
                _nberPoopCoins+=parseInt(tmp);
                localStorage.setItem("_nberPoopCoins",_nberPoopCoins)
            }
           
            switch(choice){ 

                case rawMaterials[index][0]:
                    _basePrise=rawMaterials[index][1];
                    _nberTimeInvest=rawMaterials[index][2];

                    if (_nberPoopCoins>=_basePrise ){ 

                        if (_nberTimeInvest<5) {
                            _nberPoopCoins-=parseInt(rawMaterials[index][1]);
                            _basePrise+=Math.trunc(rawMaterials[index][1]*invest_perCent);
                            
                            if (localStorage.getItem("level_cleanliness")!==null) {
                                let d=localStorage.getItem("level_cleanliness")
                                _levelCleanliness=parseInt(localStorage.getItem("level_cleanliness"));

                            } 
                             level+=_levelCleanliness;
                            _levelCleanliness+=_levelUpdate;


                            localStorage.setItem('level_cleanliness',Math.floor(_levelCleanliness));
                            _nberTimeInvest+=1;
                            
                            rawMaterials[index]=[choice,_basePrise,_nberTimeInvest];
                          
                            _self.Text1.setText('Biocarburant('+(rawMaterials[0][2]+"/5)"))
                            _self.Text2.setText('Biogaz('+(rawMaterials[1][2]+"/5)"))
                            _self.Text3.setText(' liant de \n construction('+(rawMaterials[2][2]+"/5)"))
                            localStorage.setItem("_nberPoopCoins",_nberPoopCoins);
                            

                        } else {
                            console.log("nombre maximum d'investissement atteint");

                        }
                    }else  {
                        console.log("nombre de coins insuffisant");

          
                    }
                    rawMaterials=JSON.stringify(rawMaterials);
                    localStorage.setItem("rawMaterials",rawMaterials);

                    break;   

                default:
                    console.log("Erreur de code");
                    
            }

            //get level_cleanlines stored in line 311
            if (localStorage.getItem('level_cleanliness')==null) {
                _levelCleanliness=Math.floor(_levelCleanliness);
            } else {
                _levelCleanliness=localStorage.getItem('level_cleanliness');
            }

            _nberPoopCoins=parseInt(localStorage.getItem("_nberPoopCoins"));
            localStorage.setItem("_nberPoopCoins",_nberPoopCoins);
             
            //registered all datas we'll use for the UI
            _dataTable=[_levelCleanliness,_nberPoopCoins];

            //Stored the base_prise it can't be lost
            localStorage.setItem("dataUI",JSON.stringify(_dataTable));

            //update on the UI
            _self.levelText.setText(_levelCleanliness+" %");
            _self.headerTextPoints.setText(_nberPoopCoins);

             if (choice=="Biocarburant") {
                _self.playText1.setText(_basePrise);
             } else if(choice=="Biogaz") {
                _self.playText3.setText(_basePrise);   
             }else if (choice=="liant de construction") {
                
                _self.playText2.setText(_basePrise)
             }  

            //clean level if _levelCleanliness>100
             cleanLevel(_levelCleanliness,init_rawMaterials,_nberTownClean);

            // set level
            cleanIt();

            //return my data
            return _dataTable;
        }

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
        
    },

    render: function() {

         // Display
      
    }
});





 
 