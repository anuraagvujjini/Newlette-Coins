import ConfigLoader from '../../config/ConfigLoader'
class ConfigService{
	get api(){
		return ConfigLoader.api;
	}
}

export default ConfigService;