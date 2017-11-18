import UserData from '../../storages/UserData';
class UserDataStorageService {
	get sessionToken(){		
		return UserData.sessionToken;
	}
	set sessionToken(sessionToken){
		UserData.sessionToken = sessionToken;
	}
	get totalPoints(){
		return UserData.totalPoints;
	}
	set totalPoints(totalPoints){
		UserData.totalPoints = totalPoints;
	}
	get firstName(){
		return UserData.firstName;
	}
	set firstName(firstName){
		UserData.firstName = firstName;
	}

	get lastName(){
		return UserData.lastName;
	}
	set lastName(lastName){
		UserData.lastName = lastName;
	}
	get email(){
		return UserData.email;
	}
	set email(email){
		UserData.email = email;
	}

}

export default UserDataStorageService;