import NewletteCoin from '../objects/NewletteCoin';
import Diamond from '../objects/Diamond';
import Silver from '../objects/Silver';
class ItemFactory {
    static get ItemType() {
        return {
            NEWLETTE_COIN: "COIN",
            DIAMOND: "DIAMOND",
            SILVER: "SILVER",
        };
    }

    constructor() {
    	
    }


    create(game,itemType) {
        switch (itemType) {
            case ItemFactory.ItemType.NEWLETTE_COIN:
                return new NewletteCoin(game,0,0);
                break;
            case ItemFactory.ItemType.DIAMOND:
                return new Diamond(game,0,0);
                break;
            case ItemFactory.ItemType.SILVER:
                return new Silver(game,0,0);
                break;
            default:
            	break;

        }
    }
}
export default new ItemFactory();