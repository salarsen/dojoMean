export class User {
   constructor(
      public id: number = null,
      public firstName : string = "",
      public lastName : string = "",
      public email : string = "",
      public password : string = "",
      public address : string = "",
      public address2nd : string = "",
      public city : string = "",
      public state : string = "",
      public zipCode : string = "",
      public lucky : boolean = null,
      public createdAt : Date = new Date(),
      public updatedAt : Date = new Date(),
   ){}
}
