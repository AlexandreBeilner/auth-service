export class User {
    private name: string;
    private email: string;
    private password: string;

    constructor(data: {[key: string]: any}) {
        this.name = data['name'];
        this.email = data['email'];
        this.password = data['password'];
    }
}