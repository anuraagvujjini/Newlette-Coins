import { Promise } from 'bluebird';
import Tile from '../objects/Tile';
import ItemFactory from '../factories/ItemFactory';
import InteractableObject from '../core/InteractableObject';

class Board extends InteractableObject {
    constructor(state, x,y,width, height, cols, rows, opts) {
        super(state, x, y, width, height);
        this.cols = cols;
        this.rows = rows;
        this.onClickTile = this.onClickTile.bind(this);
        this.tileClickCallback = opts && opts.tileClickCallback;
        this.maxBombsToPlace = (opts && opts.maxBombsToPlace) || 4;
        this.selectAudio = new Phaser.Sound(this.game, 'select_audio');
        this.selectAudio.allowMultiple = true;
        this.acquiredItems = [];
        this.counter = 1;
        this.createBoard();
    }

    createBoard() {
        this.tiles = [];
        this.selectedTiles = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                let tile = new Tile(this.gameState, j, i, this.onClickTile);
                this.add(tile);
                this.tiles.push(tile);
            }
        }

        var bottomLeftTile = this.getTile(this.rows - 1,0);
        var tileUtils = this.gameState.tileUtils;
        var dirtbar = new Phaser.Image(this.game, tileUtils.calculateDirtbarX(), tileUtils.calculateDirtbarY(), tileUtils.getDirtbarTextureName());
        dirtbar.width = tileUtils.calculateDirtbarWidth();
        dirtbar.height = tileUtils.calculateDirtbarHeight();
        this.add(dirtbar);
    }
    getTile(y,x){
        return this.tiles.find((tile)=>tile.xIndex === x && tile.yIndex === y);
    }
    onClickTile(tile, isSelected) {
        this.selectAudio.play();
        let bool = true;
        var selectedTiles = this.tiles.filter((tile)=>tile.isSelected>0);
        if (isSelected) {
            if (selectedTiles.length >= this.maxBombsToPlace) {
                bool = false;
            } else {
                tile.isSelected = this.counter++;
            }
        } else {
            tile.isSelected = false;
        }
        this.gameState.bombs = this.tiles.filter((tile)=>tile.isSelected>0).sort((tile1,tile2)=>tile1.isSelected - tile2.isSelected);
        bool && this.tileClickCallback && this.tileClickCallback();
        return bool;
    }

    detonateBombs() {
        var resolvers = []
        var resolves = [];
        var rejects = [];
        for(var i=0;i<this.gameState.bombs.length;i++){
            resolvers[i] = new Promise((resolve,reject)=>{
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        }
        var i = 0;
        var interval = setInterval(()=> {
            if (i >= this.gameState.bombs.length) {
                clearInterval(interval);
            } else {
                var tile = this.gameState.bombs[i];
                var resolve = resolves[i];
                tile.detonateBomb().then(()=>{
                    resolve();
                });
                i++;
            }
        }, 500);
        return Promise.all(resolvers);
    }

    addItems(items) {
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemObject = ItemFactory.create(this.game, item.type);
            if (itemObject) {
                var tile = this.getTile(item.y,item.x);
                tile.addItem(itemObject);
                this.acquiredItems.push({y:item.y,x:item.x,item:itemObject});
            }
        }
    }

    showAllItems() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var tile = this.getTile(i,j);
                tile.showItem();
            }
        }
    }

    moveItemsTo(target){
        var i=0;
        var interval = setInterval(()=> {
            if (i >= this.acquiredItems.length) {
                clearInterval(interval);
            } else {
                var item = this.acquiredItems[i].item;
                var tile = this.getTile(this.acquiredItems[i].y,this.acquiredItems[i].x);
                

                //remove from tile and put into control view
                // move from relative position to world position
                //item.position = item.world;
                tile.hideItem();
                var new_item = ItemFactory.create(this.game, item.type);
                new_item.position = item.world;
                new_item.scale = item.scale;
                this.gameState.control.add(new_item);
                item=new_item;
                var targetCenterPosition = {
                    x:target.position.x + target.width/2,
                    y:target.position.y + target.height/2

                }
                var newPos = item.toLocal(targetCenterPosition);
                var currentPosition = item.position;
                var newestPosition = {
                    x:  currentPosition.x + newPos.x*item.scale.x,
                    y:  currentPosition.y + newPos.y*item.scale.y,
                }
                var tween = this.gameState.add.tween(currentPosition).to({
                    x: newestPosition.x,
                    y: newestPosition.y
                },1000,Phaser.Linear,true);
                tween.onUpdateCallback(()=>{
                    item.position = currentPosition;
                });
                tween.onComplete.add(()=>{
                    var disappearTween = this.gameState.add.tween(item).to({
                        alpha:0
                    },500,Phaser.Linear,true);
                },this);
                i++;
            }
        }, 200);
    }
    fadeReceivedItems(){
        var disappearTween;
        for(var i=0;i<this.acquiredItems.length;i++){
            var tile = this.getTile(this.acquiredItems[i].y,this.acquiredItems[i].x);
            var item = tile.item;
            disappearTween = this.gameState.add.tween(item).to({
                alpha:0
            },500,Phaser.Linear,true);
        }
        return disappearTween;
    }
    
}
export default Board;