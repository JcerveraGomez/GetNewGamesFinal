import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  userid
envio=""
Games = [];
titulo
idLibro
editorial
categoria
lugarRecogida
propietario
tituloInput
editorialInput
categoriaInput
lugarRecogidaInput
propietarioInput
idLibroInput
key
cargado=false
visibleInput=false
visibleMenu=true
visibleUpdate=false
useridFilter
categoriaFilter
booksMine=false
contador: number;
Game:any;
  visibleDetails: boolean;
  cantidad: any;
  errorMessage: string
isAdmin1:any;


  constructor(private _toastCtrl: ToastController,private _activateRoute: ActivatedRoute) {
    

   }

  ngOnInit() {
    this.allBooks()
    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    

  }
  
  updateBook(key){ 


    this.Games.forEach(libro =>{
      if(libro.key==key){

     
      this.titulo=libro.titulo
      this.idLibro=libro.idLibro
      this.categoria=libro.categoria
      this.editorial=libro.editorial
      this.propietario=libro.propietario
      this.lugarRecogida=libro.lugar_Recogida
      console.log( this.titulo)
    
      }
    })
    this.visibleMenu=false;
    this.visibleUpdate=true;

 
    console.log("he entrado")
    
  }
  deleteBook(key){   
    console.log(key)
      
  }
  changeVisibilityMenuInput(){   
    
 
    this.visibleInput=true;
    this.visibleMenu=false;
    if(this.visibleMenu==false){
      this.visibleInput=false;
      this.visibleMenu=true;
      location.reload();
    }
    this.contador++


      
  }
  myBooks(){
    this.booksMine =true
    this.Games = []
    console.log(this.userid)
  
  }
  async allBooks(){
    this.booksMine = false;
    this.Games = []
    try {
      const response = await axios.get("https://localhost:44303/api/Game/Get",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.Games.push(element)
      });
     
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
  userIDfilter(){
    this.Games = []
    console.log(this.userid)
   

  }
  categoryFilter(){
    this.Games = []
    console.log(this.userid)
    
   

  }
  async gameDetail(gameID){
    this.visibleDetails = true
    this.visibleMenu = false
    try {
      const response = await axios.get("https://localhost:44303/api/Game/Get/"+gameID,{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      this.Game=response.data
      response.data.forEach(element => {
        this.Game=element
      });
     
    } catch (error) {
      console.error(error);
    }
    console.log(this.Game);
    


  }
  async makePurchaseNacional(){
    this.envio="Nacional"
    if(this.cantidad == null){
      this.errorMessage = "has de introducir una cantidad"
      this.presentToast()

    }else{
    try {
      await axios.post("https://localhost:44303/api/Sale/Post",{
        
          "idsale": 1,
          "iduser": this.userid,
          "idgame": this.Game.idgames,
          "precio": this.Game.precio,
          "envio": this.envio,
          "cantidad": this.cantidad
        

      },{headers: {'Access-Control-Allow-Origin': '*' }});
      this.errorMessage = "Compra Realizada"
      this.presentToast()
      this.visibleDetails=false
      this.visibleMenu=true
     
    } catch (error) {
      console.error(error);
    }
  }
  }

  async makePurchaseInternacional(){
    this.envio="Internacional"
    if(this.cantidad == null){
      this.errorMessage = "has de introducir una cantidad"
      this.presentToast()

    }
    else{
      try {
        
        await axios.post("https://localhost:44303/api/Sale/Post",{
          
            "idsale": 1,
            "iduser": 1,
            "idgame": this.Game.idgames,
            "precio": this.Game.precio,
            "envio": this.envio,
            "cantidad": this.cantidad
  
        },{headers: {'Access-Control-Allow-Origin': '*' }});
        this.errorMessage = "Compra Realizada"
        this.presentToast()
        this.visibleDetails=false
        this.visibleMenu=true
       
        
       
      } catch (error) {
        console.error(error);
      }
    }
   

  }
  

}
