import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import mainMapJson from '../aTilemaps/json/waterLevel.json'
import tilesetImage from '../aTilemaps/tiles/platformPack.png'

export default function Water() {
    const config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 800,
        heigth: 640,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
            preload,
            create,
            update,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: true,
            },
        }
    };

    const game = new Phaser.Game(config);

    function preload() {
        this.load.tilemapTiledJSON('main-map', mainMapJson)
        this.load.image("platformPack", tilesetImage)
    }

    function create() {
        const level = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 222, 293, 294, 222,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113, 113, 114, 0, 113, 137, 0, 0, 0, 0, 349, 350, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 113, 113, 113, 114, 0, 0, 0, 0, 141, 141, 142, 0, 141, 137, 114, 0, 0, 0, 377, 378, 0,
            0, 0, 113, 113, 113, 113, 114, 54, 0, 141, 141, 141, 142, 0, 113, 114, 0, 0, 0, 0, 0, 0, 137, 142, 0, 0, 113, 113, 114, 0,
            316, 0, 141, 141, 141, 141, 142, 54, 0, 0, 0, 0, 0, 0, 141, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141, 141, 142, 0,
            9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10, 9, 10,
            37, 38, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37
        ]

        const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
        const tiles = map.addTileSetImage("platformPack");
        const layer = map.createLayer(0, tiles, 0, 0);
    }

    function update() { }
}