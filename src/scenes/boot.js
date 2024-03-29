export class BootScene extends Phaser.Scene {
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