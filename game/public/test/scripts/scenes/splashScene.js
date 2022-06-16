// Our scene

var splashScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "splashScene" });
    },
    init: function() {},
    preload: function() {
        
        this.load.image('splash_bg', './assets/screen_base.png');
        this.load.image('logo', './assets/pt_logo.png');
        this.load.image('particles', './assets/red.png');

    },
    create: function() {
        
        // this.cameras.main.setBackgroundColor('#000000')
        this.cameras.main.fadeIn(500, 0, 0, 0)

        var bg = this.add.image(0, 0, 'splash_bg');
        bg.setScale(window.bg_x_scale, window.bg_y_scale).setOrigin(0);
     
    
        var logo = this.physics.add.image(0, 0, 'logo');
    
        logo.setScale(0.30, 0.30);
        logo.setOrigin(0.5, 0.5);
        
        var particles = this.add.particles('particles');
    
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
      
    
    
        
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    
        emitter.startFollow(logo);

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

                // Check session
                if(sessionStorage.getItem("player_name"))
                {
                    var redirectionScene = "gameScene";
                    switchScene(redirectionScene);
                }
                else
                {
                    switchScene('selectionScene');
                    // this.scene.start("gameScene", {message : "Poop Trivia !"});

                }
              
            }
        })
    
        // Loader
        hideLoader();
},

    update: function() {}
});



 