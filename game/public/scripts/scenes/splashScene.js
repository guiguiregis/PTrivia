// Our scene

var splashScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "splashScene" });
    },
    init: function() {


        

    },
    preload: function() {
        
        // this.loadscreen_base', './assets/screen_base.png');
        // this.load.image('particles', './assets/red.png');

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xe2872c, 0.8);
        progressBox.fillRect(screenW*0.35, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Chargement...',
            style: {
                font: '20px Mont',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '20px Mont',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '20px Mont',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(screenW*0.35, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();


            
        });
        
        // this.load.image('logo', 'zenvalogo.png');
        // for (var i = 0; i < 5000; i++) {
        //     this.load.image('logo'+i, 'zenvalogo.png');
        // }
        this.load.image('tuto4', './assets/tuto4.png');
        this.load.image('tuto1', './assets/tuto1.png');
        this.load.image('tuto2', './assets/tuto2.png');
        this.load.image('logo', './assets/pt_logo.png');
        this.load.image('logo_poop_trivia_small', './assets/logo_poop_trivia_small.png');
        this.load.image('niyel', './assets/niyel.png');
        this.load.image('logo_niyel_blanc', './assets/logo_niyel_blanc_small.png');
        this.load.image('flag', './assets/flag.png');
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
        this.load.image('text_bubble', './assets/text_bubble.png');
        this.load.image('bubble_intro', './assets/bubble_intro.png');

        this.load.image('quiz_screen_bg', './assets/screen_base.png');
        this.load.image('player_bg', './assets/player_bg.png');
        this.load.image('podium', './assets/podium.png');
        // Later set a spritesheet and definr the suitable player
        this.load.image('selected_player', './assets/perso_1.png');
        this.load.image('answer_box_default', './assets/btn_default.png');
        this.load.image('answer_box_wrong', './assets/btn_wrong.png');
        this.load.image('answer_box_correct', './assets/btn_correct.png');

        // for volum sound
        this.load.image('volume_off_small', './assets/volume_off_small.png');
        this.load.image('volume_on_small', './assets/volume_on_small.png');


        this.load.image('quiz_header_correct', './assets/quiz_header_correct.png');
        this.load.image('quiz_header_false', './assets/quiz_header_false.png');

        this.load.image('coin_header_bg', './assets/coin_header_bg.png');
        this.load.image('exit_btn', './assets/exit_btn.png');
        
        this.load.image('text_bubble', './assets/text_bubble.png');
    
        this.load.image('question_mark',  './assets/question_mark.png');


        this.load.image('timer_bg',  './assets/timer_bg.png');

        
        this.load.image('quiz_bg', './assets/screen_base.png');
        this.load.image('btn_choice', './assets/button.png');
        this.load.image('btn_exit', './assets/exit_btn.png');
        this.load.image('circular_btn', './assets/circular_btn.png');
        this.load.image('invest_load', './assets/losers_bloc.png');
        this.load.image('coin_header', './assets/coin_header_bg.png');;
        this.load.image('Barreblack', './assets/Barreblack.png');
        this.load.image('Barreblue', './assets/Barreblue.png');
        this.load.image('Petitsbutton', './assets/CarreGris.png'); 
        this.load.image('progressblack', './assets/CarreRouge.png');
        this.load.image('Truck','./assets/Truck.png');
        this.load.image('camion', './assets/Poop/camion.png');
        this.load.image('Car', './assets/Poop/Car.png');
        this.load.image('CielVillePropre', './assets/Poop/Ciel_ville_propre.png');
        this.load.image('Terrain_ville_propre', './assets/Poop/Terrain_ville_propre.png'); 
        this.load.image('Terrain_ville_sale', './assets/Poop/Terrain_ville_sale.png');
        this.load.image('Ville_avant_plan_propre', './assets/Poop/Ville_avant_plan_propre.png'); 
        this.load.image('Montagnes', './assets/Poop/Montagnes.png');
        this.load.image('Ville_avant_plan_sale', './assets/Poop/Ville_avant_plan_sale.png');
        this.load.image('CielVilleSale', './assets/Poop/Ciel_ville_sale.png');
        this.load.image('DechetsVilleSale', './assets/Poop/Dechets_ville_sale.png');
        this.load.image('dirty_water', './assets/Poop/dirty_water.png');
        this.load.image('flaques', './assets/Poop/flaques.png');
        this.load.image('PoubelleVilleSale', './assets/Poop/Poubelle_ville_sale.png');
        this.load.image('Silhouette_ville', './assets/Poop/Silhouette_ville.png');
        this.load.image('Route', './assets/Poop/Route.png');
        this.load.image('monSoleil', './assets/Poop/Soleil.png');
        this.load.image('Plus', './assets/Poop/Plus.png');
        this.load.image('Moins', './assets/Poop/Moins.png');

        //add by Marius 
        this.load.image('poop_happy', './assets/Poop/Poopguyhappy.png');
        this.load.image('poopHappy', './assets/Poop/Poopguyhappy.png');
        this.load.image('poop_sad',  './assets/Poop/Poopguysad.png');
        this.load.image('miss_poop_happy',  './assets/Poop/Poopgirlhappy.png');
        this.load.image('miss_poop_sad',  './assets/Poop/Poopgirlsad.png');;
        this.load.image('btn_coin', './assets/btnCoin.png');
        this.load.image('coin_icon_grey', './assets/coin_icon_grey.png');
        this.load.image('Bouton_gris', './assets/Bouton_gris.png');


        //......................... langages

        this.load.image('langage_EN', './assets/langage_EN.png');
        this.load.image('langage_FR', './assets/langage_FR.png');

        // --------------

        this.load.image('quiz_bg_white', './assets/screen_base.png');

        // Later set a spritesheet and definr the suitable player
        this.load.image('winners_bloc', './assets/winners_bloc.png');
        this.load.image('losers_bloc', './assets/losers_bloc.png');


        this.load.image('text_bubble', './assets/text_bubble.png');
  
        //add by Marius 
        this.load.image('miss_poop_happy',  './assets/poop_miss_happy.png');
        this.load.image('miss_poop_sad',  './assets/poop_miss_sad.png');
        
        // ------------------- ::: ----------------- //
        
        this.load.image('podium_rogner', './assets/podium_rogner.png');
        // Later set a spritesheet and definr the suitable player
        this.load.image('selected_player', './assets/perso_1.png');
        
        this.load.image('coin_header_bg', './assets/coin_header_bg.png');
        
        this.load.image('text_bubble_oriente', './assets/text_bubble_oriente.png');
        this.load.image('poop_happy_oriente', './assets/Poop/Poopguyhappy_oriente.png');
        this.load.image('poop_sad_oriente',  './assets/Poop/Poopguysad_oriente.png');

        this.load.image('Bouton_replay',  './assets/Bouton_replay.png');


        this.load.image('pq',  './assets/Pq.png');

        //add by Marius 
        this.load.image('miss_poop_happy_oriente',  './assets/Poop/Poopgirlhappy_oriente.png');
        this.load.image('miss_poop_sad_oriente',  './assets/Poop/Poopgirlsad_oriente.png');

        // --------------------------
        
        this.load.image('screen_bg', './assets/screen_base.png');
        
        this.load.image('btn_bg', './assets/button.png');
        this.load.image('btn_bg1', './assets/button.png');


        // Players
        this.load.image('player1', './assets/perso_1.png');
        this.load.image('player2', './assets/perso_2.png');
        this.load.image('player3', './assets/perso_3.png');
        this.load.image('player4', './assets/perso_4.png');
        this.load.image('player5', './assets/perso_5.png');
        this.load.image('player6', './assets/perso_6.png');
        this.load.image('player7', './assets/perso_7.png');
        this.load.image('player8', './assets/perso_8.png');
        this.load.image('player9', './assets/perso_9.png');
        this.load.image('player10', './assets/perso_10.png');


        /// souns

        this.load.audio('keyboard2','./assets/Sounds/buzzer.ogg');
        this.load.audio('buzzer','./assets/Sounds/keyboard1.ogg');
        this.load.audio('keyboard1','./assets/Sounds/keyboard2.ogg')

        // -----------------------


        // Later set a spritesheet and definr the suitable player
        this.load.image('red_banner', './assets/red_banner.png');
        this.load.image('right_box_red', './assets/right_box_red.png');
        this.load.image('quiz_header_paper', './assets/quiz_header_paper.png');

        this.load.image('yt_icon', './assets/yt_icon.png');
        this.load.image('coin_icon', './assets/coin_icon.png');
        this.load.image('confetis',  './assets/confetis.png');

        this.load.image('gold', './assets/gold_poop.png');
        this.load.image('silver', './assets/silver_poop.png');
        this.load.image('bronze', './assets/bronze_poop.png');
        this.load.image('none', './assets/silver_poop.png');  


        // -----------------------------

        // Later set a spritesheet and definr the suitable player
        this.load.image('right_box_green', './assets/right_box_green.png');
        this.load.image('box1', './assets/box1.png');
        this.load.image('bubble_green', './assets/bubble_green.png');
        this.load.image('bubble_red', './assets/bubble_red.png');
        this.load.image('spinner',  './assets/spinner.png');
        this.load.image('spinner_wc',  './assets/spinner_wc.png');
        this.load.image('spin_point',  './assets/spin_point.png');
        this.load.image('pq_icon', './assets/Pq.png');


        // -------------------
  
        // Later set a spritesheet and definr the suitable player
        this.load.image('winners_bloc', './assets/winners_bloc.png');
        this.load.image('losers_bloc', './assets/losers_bloc.png');
        this.load.image('chain', './assets/Chaine.png');

        // --------------------

     
        this.load.image('screen_base', './assets/screen_base.png');  
        this.load.image('coin_header_bg','./assets/coin_header_bg.png')
        this.load.image('quiz_header_paper','./assets/quiz_header_paper.png')
        this.load.image('btn_default','./assets/box3.png')
        this.load.image('btn_green','./assets/btn_green.png')
        this.load.image('btn_red','./assets/btn_red.png')
        this.load.image('Poopguysad','./assets/Poop/Poopguysad.png')
        this.load.image('text_bubble','./assets/text_bubble.png')
        this.load.image('perso_3','./assets/perso_3.png')
        this.load.image('player_bg', './assets/player_bg.png')
        this.load.image('home_btn', './assets/home_btn.png')


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

        //Players Full

        this.load.spritesheet('player_1_avatar_full', './assets/perso_1.png', { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_2_avatar_full', './assets/perso_2.png', { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_3_avatar_full', './assets/perso_3.png', { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_4_avatar_full', './assets/perso_4.png', { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_5_avatar_full', './assets/perso_5.png', { frameWidth: 374, frameHeight: 801 });

    
        this.load.spritesheet('player_6_avatar_full', './assets/perso_6.png',   { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_7_avatar_full', './assets/perso_7.png',   { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_8_avatar_full', './assets/perso_8.png',   { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_9_avatar_full', './assets/perso_9.png',   { frameWidth: 374, frameHeight: 801 });
        this.load.spritesheet('player_10_avatar_full', './assets/perso_10.png', { frameWidth: 374, frameHeight: 801 });


    },
    create: function() {
        
        this.cameras.main.setBackgroundColor('#6effff')

        // this.stage.backgroundColor = "#4488AA";


        this.cameras.main.fadeIn(500, 0, 0, 0)

        var bg = this.add.image(0, 0, 'screen_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     
    
        // var logo = this.physics.add.image(0, 0, 'logo');
    
        // logo.setScale(0.30, 0.30);
        // logo.setOrigin(0.5, 0.5);
        
        // var particles = this.add.particles('particles');
    
        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });
      
    
    
        
        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);
    
        // emitter.startFollow(logo);

        var _self = this;
    
        function switchScene(newScene)
        {
            showLoader()
            _self.scene.start(newScene);
            _self.scene.bringToTop(newScene);
            _self.scene.stop(m_currentScene);
            window.m_currentScene = newScene;
        }
 

        this.time.addEvent({
            delay: 10,
            loop: false,
            callback: () => {

                    // switchScene("homeScene");

                // Check session
                if(sessionStorage.getItem("player_name"))
                {
                    var redirectionScene = "gameScene";
                    switchScene(redirectionScene);
                }
                else
                {
                    // switchScene('selectionScene');
                    switchScene('homeScene');
                    // this.scene.start("gameScene", {message : "Poop Trivia !"});
                }
              
            }
        })
        
        var loader = document.getElementById("loader");
        loader.style.zIndex = 2;
         

        // Loader
        hideLoader();
    },

    update: function() {}
});



 