import Rules from '../logic/rules';
import { generateRandomizedGrid, evolveGrid } from '../logic/mappers';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.scale = 5;
        this.cols = this.game.config.width / this.scale;
        this.rows = this.game.config.height / this.scale;

        this.grid = generateRandomizedGrid(this.cols, this.rows);

        this.rules = new Rules();
        this.rules.addBornAtRule(3);
        this.rules.addSurvivesAtRule(2);
        this.rules.addSurvivesAtRule(3);

        this.timer = 0;
        this.delay = 1000;

        this.cellColor = 0x6fff6f;
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.graphics = this.add.graphics({ fillStyle: { color: this.cellColor } });

        this.displayGrid();
    }

    update (time, delta) {
        this.timer += delta;

        if (this.timer > this.delay) {
            // evolve the cellular automata
            this.grid = evolveGrid(this.rules, this.grid);

            this.displayGrid();

            this.timer = 0;
        }
    }

    displayGrid () {
        this.graphics.clear();

        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const value = this.grid.getCellAtXY(x, y);

                if (value == 1) {
                    let point = new Phaser.Geom.Point(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2);
                    this.graphics.fillPointShape(point, this.scale);
                }
            }
        }
    }
};
