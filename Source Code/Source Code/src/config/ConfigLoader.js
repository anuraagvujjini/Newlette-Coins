class ConfigLoader {
	constructor(){
		this.config = require('./config.json');
	}
}
export default (new ConfigLoader()).config;