import Service from '../core/Service';
class UserService extends Service{
	login(username,password){
		return this.request({
			uri: this.config.api.url+this.config.api.endpoints.login,
			method: 'POST',
			form: this.makeLoginRequest(username,password),

		}).then(JSON.parse);
	}

	getUserInfo(){
		return this.requestAuth({
			uri: this.config.api.url+this.config.api.endpoints.userInfo,
			method: 'GET'
		}).then(JSON.parse);
	}

	makeLoginRequest(username,password){
		return {
			username: username,
			password: password
		}
	}

	getLeaderboard(){
		return this.requestAuth({
			uri: this.config.api.url+this.config.api.endpoints.leaderboard,
			method: 'GET'
		}).then(JSON.parse);;
	}
}
export default new UserService();