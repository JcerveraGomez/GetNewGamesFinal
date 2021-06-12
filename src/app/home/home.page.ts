import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  useridInput: string;
  isAdmin: boolean;
  useridPass: string;
  pwdInput: string;
  match=false
  errorMessage: string;
  registro=false
  login=true
  userIdRegistro:string;
  pwdRegistro:string;
  preferenciasRegistro:string;
  nombreRegistro:string;
  tlfRegistro:number;
  apiURL='https://localhost:44303/';
  Users=[];
  userLogin: any;
  constructor(private _toastCtrl: ToastController) { }

  ngOnInit() {
    console.log("https://localhost:44303/api/User/Get")
  this.getUsers()
  }
  async getUsers(){
    try {
      const response = await axios.get("https://localhost:44303/api/User/Get",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      this.Users.push(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  async presentToast() {
    const toast = await this._toastCtrl.create({
        message: this.errorMessage,
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

}
 async CorrectToast() {
    const toast = await this._toastCtrl.create({
        message: 'Login Correcto',
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

}
   async matchLogin() {
    try {
      const response = await axios.get("https://localhost:44303/api/User/log/"+this.useridInput+"/"+this.pwdInput,{headers: {'Access-Control-Allow-Origin': '*' }});
      if(response.data==true){
        const response = await axios.get("https://localhost:44303/api/User/Get/"+this.useridInput,{headers: {'Access-Control-Allow-Origin': '*' }});
        response.data.forEach(element => {
          this.userLogin=element
        });
        this.match=true
        this.useridPass=this.useridInput
        console.log(this.userLogin.admin);
        
       this.isAdmin= this.userLogin.admin
        console.log(this.isAdmin);    
        


      }
    } catch (error) {
      console.error(error);
    }
    
  }
  
  registroVisibility(){

    this.registro=true;
    this.login=false;
    


    this.errorMessage = "Usuario insertado"
    this.presentToast();
    this.registro=false;
    this.login=true;
    this.userIdRegistro="";
    this.pwdRegistro="";
    this.preferenciasRegistro="";
    this.nombreRegistro="";
    this.tlfRegistro=null;     
    location.reload()

    }
   
     
      
  }
  
  
  

