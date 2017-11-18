import CustomState from '../core/CustomState';
import LoadingBar from '../objects/LoadingBar';
import Leaderboard from '../objects/Leaderboard';
import UserData from '../storages/UserData';
import UserService from '../services/UserService'
class LoadState extends CustomState {
    init(){
        
    }
    create() {
        super.create();
        this.loader = this.game.load;
        // generate loading bar
        this.loadingBar = new LoadingBar(this.game, 120, 960, 1600, 80);
        this.display.add(this.loadingBar);

        this.loader.onLoadComplete.add(()=> {
            this.game.state.start('BoardState', true, false, 4, 4, {totalPoints: UserData.totalPoints});
        });
        this.loader.onFileComplete.add(()=> {
            this.loadingBar.percentCompleted = this.loader.progress;
        });
        this.loadAssets(this.loader);
        this.loader.start();
        UserService.getLeaderboard().then((response)=>{
            if(response.status === "success"){
                this.generateLeaderboard(response.results)
            }
        });
        this.setResponsiveSetting();

    }

    generateLeaderboard(results){
        this.leaderboard = new Leaderboard(this.game,220,200,1600,600,results);
        this.display.add(this.leaderboard);
    }
    progressLoadingBar(percent) {
        var maxScale = 1600 - 240;
        this.lbRight.position.x = 240 + percent / 100 * maxScale;
        this.add.tween(this.lbMiddle.width).to({width: 20 + percent / 100 * maxScale});
    }

    loadAssets(loader) {
        // tile grass
        loader.image('grass_4x4_dirtbar', '/assets/tile/4x4/grass/dirtbar.png');
        loader.image('grass_4x4_1', '/assets/tile/4x4/grass/grass-1.png');
        loader.image('grass_4x4_2', '/assets/tile/4x4/grass/grass-2.png');
        loader.image('grass_4x4_3', '/assets/tile/4x4/grass/grass-3.png');
        loader.image('grass_4x4_4', '/assets/tile/4x4/grass/grass-4.png');
        loader.image('grass_4x4_1_hole', '/assets/tile/4x4/grass/grass-1-hole.png');
        loader.image('grass_4x4_2_hole', '/assets/tile/4x4/grass/grass-2-hole.png');
        loader.image('grass_4x4_3_hole', '/assets/tile/4x4/grass/grass-3-hole.png');
        loader.image('grass_4x4_4_hole', '/assets/tile/4x4/grass/grass-4-hole.png');
        loader.atlas('grass_4x4_1_hover', '/assets/tile/4x4/grass/grass-1-hover.png', '/assets/tile/4x4/grass/grass-1-hover.json');
        loader.atlas('grass_4x4_2_hover', '/assets/tile/4x4/grass/grass-2-hover.png', '/assets/tile/4x4/grass/grass-2-hover.json');
        loader.atlas('grass_4x4_3_hover', '/assets/tile/4x4/grass/grass-3-hover.png', '/assets/tile/4x4/grass/grass-3-hover.json');
        loader.atlas('grass_4x4_4_hover', '/assets/tile/4x4/grass/grass-4-hover.png', '/assets/tile/4x4/grass/grass-4-hover.json');

        //detonate button
        loader.image('detonate_btn_bg', '/assets/detonate_btn/bg.png');
        loader.image('detonate_btn_bg_hover', '/assets/detonate_btn/bg_hover.png');
        loader.image('detonate_btn_bg_click', '/assets/detonate_btn/bg_click.png');
        loader.image('detonate_btn_text', '/assets/detonate_btn/text_2.png');
        loader.image('detonate_btn_flame_static', '/assets/detonate_btn/flame_static.png');
        loader.atlas('detonate_btn_flame', '/assets/detonate_btn/flame.png', '/assets/detonate_btn/flame.json');

        //win_points_box
        loader.image('win_points_box', '/assets/win_points/box.png');
        loader.image('win_point_box_border', '/assets/win_point_box/border.png');
        loader.image('win_point_box_text', '/assets/win_point_box/wintext3.png');

        //paytable button
        loader.image('paytable_btn', '/assets/paytable_btn/button.png');
        loader.image('paytable_btn_click', '/assets/paytable_btn/button_click.png');
        loader.image('paytable_btn_hover', '/assets/paytable_btn/button_hover.png');
        loader.image('paytable_popup', '/assets/paytable_btn/popup2.png');
        loader.image('paytable_popup_close', '/assets/paytable_btn/popup_close.png');

        //help button
        loader.image('help_btn', '/assets/help_btn/button.png');
        loader.image('help_btn_click', '/assets/help_btn/button_click.png');
        loader.image('help_btn_hover', '/assets/help_btn/button_hover.png');
        loader.image('help_popup', '/assets/help_btn/popup2.png');
        loader.image('help_popup_close', '/assets/help_btn/popup_close.png');

        //multiplier button
        loader.image('multiplier_1x_btn', '/assets/multiplier_btn/1x.png');
        loader.image('multiplier_1x_btn_hover', '/assets/multiplier_btn/1x_hover.png');
        loader.atlas('multiplier_1x_btn_glow', '/assets/multiplier_btn/1x_glow.png', '/assets/multiplier_btn/1x_glow.json');
        loader.image('multiplier_10x_btn', '/assets/multiplier_btn/10x.png');
        loader.image('multiplier_10x_btn_hover', '/assets/multiplier_btn/10x_hover.png');
        loader.atlas('multiplier_10x_btn_glow', '/assets/multiplier_btn/10x_glow.png', '/assets/multiplier_btn/10x_glow.json');
        loader.image('multiplier_100x_btn', '/assets/multiplier_btn/100x.png');
        loader.image('multiplier_100x_btn_hover', '/assets/multiplier_btn/100x_hover.png');
        loader.atlas('multiplier_100x_btn_glow', '/assets/multiplier_btn/100x_glow.png', '/assets/multiplier_btn/100x_glow.json');

        //bomb
        loader.spritesheet('bomb', '/assets/bomb.png', 240, 229.2);
        loader.atlas('bomb_blast', '/assets/bomb/blast.png', '/assets/bomb/blast.json');

        //sound btn
        loader.atlas('sound_mute_btn', '/assets/sound_btn/mute.png', '/assets/sound_btn/mute.json');
        loader.image('sound_mute_btn_hover', '/assets/sound_btn/mute_hover.png');
        loader.atlas('sound_unmute_btn', '/assets/sound_btn/unmute.png', '/assets/sound_btn/unmute.json');
        loader.image('sound_unmute_btn_hover', '/assets/sound_btn/unmute_hover.png');
        loader.atlas('sound_bar', '/assets/sound_btn/soundbar.png', '/assets/sound_btn/soundbar.json');
        

        //item
        loader.atlas('diamond', '/assets/items/diamond6.png', '/assets/items/diamond6.json');
        loader.atlas('silver', '/assets/items/ruby1.png', '/assets/items/ruby1.json');
        loader.atlas('coin', '/assets/items/coin.png', '/assets/items/coin.json');

        // bomb remain box 
        loader.image('bomb_remain_box_border', '/assets/bomb_remain_box/border.png');
        loader.image('bomb_remain_box_bomb', '/assets/bomb_remain_box/bomb.png');
        loader.image('bomb_remain_box_text', '/assets/bomb_remain_box/bombs_left_text.png');


        //spent point box
        loader.image('spent_point_box_border', '/assets/win_point_box/border.png');
        loader.image('spent_point_box_text', '/assets/spent_point_box/text.png');


        //newgame effect
        loader.image('elevator_upper','/assets/newgame_effect/elevator_upper.png');
        loader.image('elevator_lower','/assets/newgame_effect/elevator_lower.png');

        //alert balance message
        loader.image('alert_balance_outer','/assets/alert_message/alert_balance_outer.png');
        loader.image('alert_balance_ok','/assets/alert_message/alert_balance_ok.png');

        loader.audio('explosion_audio', 'audio/explosion.wav');
        loader.audio('crack_audio', 'audio/crack.mp3');
        loader.audio('hurt_audio', 'audio/hurt.mp3');
        loader.audio('select_audio', 'audio/select.mp3');
        loader.audio('game_audio', 'audio/bgm.mp3');
        loader.audio('win_audio', 'audio/applause.mp3');
        loader.audio('lose_audio', 'audio/lose.mp3');
        loader.audio('counter_audio', 'audio/coin_counter.mp3');
    }

}

export default LoadState;