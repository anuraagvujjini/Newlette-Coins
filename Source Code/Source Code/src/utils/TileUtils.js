import Config from '../config/ConfigLoader';

class TileUtils {
	constructor(tileType,cols,rows,maxWidth,maxHeight){
		this.tileType = tileType;
		this.cols = cols;
		this.rows = rows;
		this.actualWidth = Config.tile.grass["_"+rows+"x"+cols].actualWidth
		this.spriteWidth = Config.tile.grass["_"+rows+"x"+cols].spriteWidth;
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		this.startWidth = this.maxWidth * Math.pow(this.actualWidth.top/this.actualWidth.bottom,rows-1);
		this.startHeight = this.maxHeight * Math.pow(this.actualWidth.top/this.actualWidth.bottom,rows-1);
	}

	calculateMarginX(yIndex){
        return 2*(this.calculateWidth(this.rows-1)-this.calculateWidth(yIndex))+yIndex;
    }

    calculateWidth(yIndex){
        var width = this.startWidth;
        for(var i=0;i<yIndex;i++){
            width *= (this.actualWidth.bottom/this.actualWidth.top);
        }
        return width;
    }	

    calculateHeight(yIndex){
        var height = this.startHeight;
        for(var i=0;i<yIndex;i++){
            height *= (this.actualWidth.bottom/this.actualWidth.top);
        }
        return height;
    }

    calculatePosX(xIndex,yIndex){
        return this.calculateMarginX(yIndex)+xIndex*(this.calculateWidth(yIndex)*this.actualWidth.bottom/this.spriteWidth);
    }

    calculatePosY(index){
        var posY = 0;
        for(var i=1;i<=index;i++){
            posY += this.calculateHeight(i-1);
        }
        
        return posY;
    }

    getTileTextureName(index){
        return this.tileType+"_"+this.cols+"x"+this.rows+"_"+(index+1);
    }
    getTileHoleTextureName(index){
        return this.tileType+"_"+this.cols+"x"+this.rows+"_"+(index+1)+"_hole";
    } 

    getTileHoverTextureName(index){
        return this.tileType+"_"+this.cols+"x"+this.rows+"_"+(index+1)+"_hover";
    }

    calculateDirtbarX(){
        return this.calculateMarginX(this.cols-1)+(this.spriteWidth-this.actualWidth.bottom)*(this.calculateWidth(this.cols-1)/this.spriteWidth)/2;
    }
    calculateDirtbarY(){
        return this.calculatePosY(this.cols-1) + this.calculateHeight(this.cols-1) - 5;
    }
    calculateDirtbarWidth(){
        return this.calculateWidth(this.cols-1)*this.cols * this.actualWidth.bottom / this.spriteWidth;
    }
    calculateDirtbarHeight(){
        return this.calculateHeight(this.cols-1)/2;
    }
    getDirtbarTextureName(){
        return this.tileType+"_"+this.cols+"x"+this.rows+"_dirtbar";
    }
}

export default TileUtils;