class UserData {
    get sessionToken() {
        return this._token;
    }

    set sessionToken(sessionToken) {
        this._token = sessionToken;
    }

    get totalPoints() {
        return this._totalPoints;
    }

    set totalPoints(points) {
        this._totalPoints = points;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    get lastName() {
        return this._lastName;
    }
}
export default new UserData();