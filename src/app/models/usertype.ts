export class User{
    
    constructor(public firstname:string,
        public lastname:string,
        public id:string,
        public password:string,
        public confirmpassword:string,
        public email:string,
        public phone:string){}
}