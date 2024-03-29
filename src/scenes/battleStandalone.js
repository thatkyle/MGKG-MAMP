// This is the standalone version of boot/battle/ui/units/message/etc. for the battle sequence for dev/testing, it has not been split into it's component scenes.
// I am keeping this as a working version of the skill/timing check feature in case the modular files breaks (boot, battle, ui, message, units, etc.)

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // map tiles
        this.load.image('tiles', './assets/map/spritesheet.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', './assets/map/map.json');
        
        // enemies
        this.load.image("dragonblue", "./assets/dragonblue.png");
        this.load.image("dragonorrange", "./assets/dragonorrange.png");
        
        // our two characters
        this.load.spritesheet('player', './assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        // start the WorldScene
        // this.scene.start('WorldScene');
        this.scene.start('BattleScene');
    }
};


// class WorldScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'WorldScene' });
//     }

//     preload() {
        
//     }

//     create() {
//         // create the map
//         var map = this.make.tilemap({ key: 'map' });
        
//         // first parameter is the name of the tilemap in tiled
//         var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
//         // creating the layers
//         var grass = map.createStaticLayer('Grass', tiles, 0, 0);
//         var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        
//         // make all tiles in obstacles collidable
//         obstacles.setCollisionByExclusion([-1]);
        
//         //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
//         this.anims.create({
//             key: 'left',
//             frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
//             frameRate: 10,
//             repeat: -1
//         });
        
//         // animation with key 'right'
//         this.anims.create({
//             key: 'right',
//             frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
//             frameRate: 10,
//             repeat: -1
//         });
//         this.anims.create({
//             key: 'up',
//             frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
//             frameRate: 10,
//             repeat: -1
//         });
//         this.anims.create({
//             key: 'down',
//             frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
//             frameRate: 10,
//             repeat: -1
//         });        

//         // our player sprite created through the phycis system
//         this.player = this.physics.add.sprite(50, 100, 'player', 6);
        
//         // don't go out of the map
//         this.physics.world.bounds.width = map.widthInPixels;
//         this.physics.world.bounds.height = map.heightInPixels;
//         this.player.setCollideWorldBounds(true);
        
//         // don't walk on trees
//         this.physics.add.collider(this.player, obstacles);

//         // limit camera to map
//         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
//         this.cameras.main.startFollow(this.player);
//         this.cameras.main.roundPixels = true; // avoid tile bleed
    
//         // user input
//         this.cursors = this.input.keyboard.createCursorKeys();
        
//         // where the enemies will be
//         this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
//         for(var i = 0; i < 30; i++) {
//             var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
//             var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
//             // parameters are x, y, width, height
//             this.spawns.create(x, y, 20, 20);            
//         }        
//         // add collider
//         this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
//         // we listen for 'wake' event
//         this.sys.events.on('wake', this.wake, this);
//     }

//     wake() {
//         this.cursors.left.reset();
//         this.cursors.right.reset();
//         this.cursors.up.reset();
//         this.cursors.down.reset();
//     }

//     onMeetEnemy(player, zone) {        
//         // we move the zone to some other location
//         zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
//         zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
//         // shake the world
//         this.cameras.main.shake(300);
        
//         this.input.stopPropagation();
//         // start battle 
//         this.scene.switch('BattleScene');                
//     }

//     update(time, delta) {             
//         this.player.body.setVelocity(0);
        
//         // Horizontal movement
//         if (this.cursors.left.isDown)
//         {
//             this.player.body.setVelocityX(-80);
//         }
//         else if (this.cursors.right.isDown)
//         {
//             this.player.body.setVelocityX(80);
//         }
//         // Vertical movement
//         if (this.cursors.up.isDown)
//         {
//             this.player.body.setVelocityY(-80);
//         }
//         else if (this.cursors.down.isDown)
//         {
//             this.player.body.setVelocityY(80);
//         }        

//         // Update the animation last and give left/right animations precedence over up/down animations
//         if (this.cursors.left.isDown)
//         {
//             this.player.anims.play('left', true);
//             this.player.flipX = true;
//         }
//         else if (this.cursors.right.isDown)
//         {
//             this.player.anims.play('right', true);
//             this.player.flipX = false;
//         }
//         else if (this.cursors.up.isDown)
//         {
//             this.player.anims.play('up', true);
//         }
//         else if (this.cursors.down.isDown)
//         {
//             this.player.anims.play('down', true);
//         }
//         else
//         {
//             this.player.anims.stop();
//         }
//     }
// }

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }    

    create()
    {    
        // change the background to green
        this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
        this.startBattle();
        // on wake event we call startBattle too
        this.sys.events.on('wake', this.startBattle, this);             
    }
    startBattle() {
        // player character - warrior
        var warrior = new PlayerCharacter(this, 250, 50, "player", 1, "Warrior", 100, 20);        
        this.add.existing(warrior);
        
        // player character - mage
        var mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
        this.add.existing(mage);            
        
        var dragonblue = new Enemy(this, 50, 50, "dragonblue", null, "Dragon", 50, 3);
        this.add.existing(dragonblue);
        
        var dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null,"Dragon2", 50, 3);
        this.add.existing(dragonOrange);
        
        // array with heroes
        this.heroes = [ warrior, mage ];
        // array with enemies
        this.enemies = [ dragonblue, dragonOrange ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        
        this.index = -1; // currently active unit
        
        this.scene.run("UIScene");        
    }
    nextTurn() {  
        // if we have victory or game over
        if(this.checkEndBattle()) {           
            this.endBattle();
            return;
        }
        do {
            // currently active unit
            this.index++;
            // if there are no more units, we start again from the first one
            if(this.index >= this.units.length) {
                this.index = 0;
            }            
        } while(!this.units[this.index].living);
        // if its player hero
        if(this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random living hero to be attacked
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while(!this.heroes[r].living) 
            // call the enemy's attack function 
            this.units[this.index].attack(this.heroes[r]);
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
        }
    }   
    // check for game over or victory
    checkEndBattle() {        
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }
    // when the player have selected the enemy to be attacked
    receivePlayerSelection(action, target) {
        if(action == "attack") {            
            this.units[this.index].attack(this.enemies[target]);              
        }
        // next turn in 1.5 seconds
        this.time.addEvent({ delay: 500, callback: this.nextTurn, callbackScope: this });        
    }   
    endBattle() {       
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();            
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        // this.scene.switch('WorldScene');
    }
};

// base class for heroes and enemies
var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,

    initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage     
        this.living = true;         
        this.menuItem = null;
    },
    // we will use this to notify the menu item when the unit is dead
    setMenuItem: function(item) {
        this.menuItem = item;
    },
    // attack the target unit
    attack: function(target) {
        if(target.living) {
            target.takeDamage(this.damage);
            this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
        }
    },    
    takeDamage: function(damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            this.visible = false;   
            this.menuItem = null;
        }
    }    
});

var Enemy = new Phaser.Class({
    Extends: Unit,

    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
});

var PlayerCharacter = new Phaser.Class({
    Extends: Unit,

    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        // flip the image so I don"t have to edit it manually
        this.flipX = true;
        
        this.setScale(2);
    }
});

var MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,
    
    initialize:
            
    function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15});
    },
    
    select: function() {
        this.setColor("#f8ff38");
    },
    
    deselect: function() {
        this.setColor("#ffffff");
    },
    // when the associated enemy or player unit is killed
    unitKilled: function() {
        this.active = false;
        this.visible = false;
    }
    
});

// base menu class, container for menu items
var Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    
    initialize:
            
    function Menu(x, y, scene, heroes) {
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.x = x;
        this.y = y;        
        this.selected = false;
    },     
    addMenuItem: function(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem); 
        return menuItem;
    },  
    // menu navigation 
    moveSelectionUp: function() {
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemIndex--;
            if(this.menuItemIndex < 0)
                this.menuItemIndex = this.menuItems.length - 1;
        } while(!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function() {
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemIndex++;
            if(this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
        } while(!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and highlight the choosen element
    select: function(index) {
        if(!index)
            index = 0;       
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        while(!this.menuItems[this.menuItemIndex].active) {
            this.menuItemIndex++;
            if(this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
            if(this.menuItemIndex == index)
                return;
        }        
        this.menuItems[this.menuItemIndex].select();
        this.selected = true;
    },
    // deselect this menu
    deselect: function() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
        this.selected = false;
    },
    confirm: function() {
        // when the player confirms his slection, do the action
    },
    // clear menu and remove all menu items
    clear: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    },
    // recreate the menu items
    remap: function(units) {
        this.clear();        
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            unit.setMenuItem(this.addMenuItem(unit.type));            
        }
        this.menuItemIndex = 0;
    }
});

var HeroesMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function HeroesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);                    
    }
});

var ActionsMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function ActionsMenu(x, y, scene) {
        Menu.call(this, x, y, scene);   
        this.addMenuItem("Attack");
    },
    confirm: function() { 
        // we select an action and go to the next menu and choose from the enemies to apply the action
        this.scene.events.emit("SelectedAction");        
    }
    
});

var EnemiesMenu = new Phaser.Class({
    Extends: Menu,
    
    initialize:
            
    function EnemiesMenu(x, y, scene) {
        Menu.call(this, x, y, scene);        
    },       
    confirm: function() {      
        // the player has selected the enemy and we send its id with the event
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
});

// User Interface scene
var UIScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function UIScene ()
    {
        Phaser.Scene.call(this, { key: "UIScene" });
    },

    create: function ()
    {    
        // draw some background for the menu
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(2, 150, 90, 100);
        this.graphics.fillRect(2, 150, 90, 100);
        this.graphics.strokeRect(95, 150, 90, 100);
        this.graphics.fillRect(95, 150, 90, 100);
        this.graphics.strokeRect(188, 150, 130, 100);
        this.graphics.fillRect(188, 150, 130, 100);
        
        // basic container to hold all menus
        this.menus = this.add.container();
                
        this.heroesMenu = new HeroesMenu(195, 153, this);           
        this.actionsMenu = new ActionsMenu(100, 153, this);            
        this.enemiesMenu = new EnemiesMenu(8, 153, this);   
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);
                
        this.battleScene = this.scene.get("BattleScene");                                
        
        // listen for keyboard events
        this.input.keyboard.on("keydown", this.onKeyInput, this);   
        
        // when its player cunit turn to move
        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
        
        // when the action on the menu is selected
        // for now we have only one action so we dont send and action id
        this.events.on("SelectedAction", this.onSelectedAction, this);
        
        // an enemy is selected
        this.events.on("Enemy", this.onEnemy, this);
        
        // when the scene receives wake event
        this.sys.events.on('wake', this.createMenu, this);
        
        // the message describing the current action
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);        
        
        this.createMenu();     
    },
    createMenu: function() {
        // map hero menu items to heroes
        this.remapHeroes();
        // map enemies menu items to enemies
        this.remapEnemies();
        // first move
        this.battleScene.nextTurn(); 
    },
    onEnemy: function(index) {
        // when the enemy is selected, we deselect all menus and send event with the enemy id
        this.heroesMenu.deselect();
        this.actionsMenu.deselect();
        this.enemiesMenu.deselect();
        this.currentMenu = null;
        this.battleScene.receivePlayerSelection("attack", index);   
    },
    onPlayerSelect: function(id) {
        // when its player turn, we select the active hero item and the first action
        // then we make actions menu active
        this.heroesMenu.select(id);
        this.actionsMenu.select(0);
        this.currentMenu = this.actionsMenu;
    },
    // we have action selected and we make the enemies menu active
    // the player needs to choose an enemy to attack
    onSelectedAction: function() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    },
    remapHeroes: function() {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    },
    remapEnemies: function() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    },
    onKeyInput: function(event) {
        if(this.currentMenu && this.currentMenu.selected) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {

            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            } 
        }
    },
});

// the message class extends containter 
var Message = new Phaser.Class({

    Extends: Phaser.GameObjects.Container,

    initialize:
    function Message(scene, events) {
        Phaser.GameObjects.Container.call(this, scene, 160, 30);
        var graphics = this.scene.add.graphics();
        this.add(graphics);
        graphics.lineStyle(1, 0xffffff, 0.8);
        graphics.fillStyle(0x031f4c, 0.3);        
        graphics.strokeRect(-90, -15, 180, 30);
        graphics.fillRect(-90, -15, 180, 30);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: "#ffffff", align: "center", fontSize: 13, wordWrap: { width: 170, useAdvancedWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);        
        events.on("Message", this.showMessage, this);
        this.visible = false;
    },
    showMessage: function(text) {
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);
        this.hideEvent = this.scene.time.addEvent({ delay: 1000, callback: this.hideMessage, callbackScope: this });
    },
    hideMessage: function() {
        this.hideEvent = null;
        this.visible = false;
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootScene,
        // WorldScene,
        BattleScene,
        UIScene
    ]
};

var game = new Phaser.Game(config);


// check against scene tutorial i looked at earlier




