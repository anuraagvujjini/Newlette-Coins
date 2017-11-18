import Config from '../config/ConfigLoader';
import TileUtils from '../utils/TileUtils';
class TileUtilsService {
	static get TileType(){
		return {
			GRASS: "grass",
			ROCK: "rock"
		};
	}
	constructor(){
		var cols = Config.board.cols;
		var rows = Config.board.rows;
		var boardWidth = Config.board.width;
		var boardHeight = Config.board.height;
		this.container = [];
		this.container[TileUtilsService.TileType.GRASS] = new TileUtils(TileUtilsService.TileType.GRASS,cols,rows,boardWidth/cols, boardHeight/rows);
	}

}
export default new TileUtilsService();