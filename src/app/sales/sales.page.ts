import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  isAdmin1: any;
  userIdInput
  sales=[]
  envioInput: string;

  constructor(private _activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isAdmin1 =this._activateRoute.snapshot.paramMap.get('isAdmin');
    console.log(this.isAdmin1);
    this.allBooks()
    
  }
  async allBooks(){
    try {
      const response = await axios.get("https://localhost:44303/api/Sale/Get",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.sales.push(element)
      });
     
    } catch (error) {
      console.error(error);
    }
  
  }
  async userIdFilter(){
    this.sales=[]
    try {
      const response = await axios.get("https://localhost:44303/api/Sale/Get/User/"+this.userIdInput,{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.sales.push(element)
      });
      console.log(this.sales)
     
    } catch (error) {
      console.error(error);
    }



  }
  async EnvioNacionalFilter(){
    this.sales=[]

    try {
      const response = await axios.get("https://localhost:44303/api/Sale/GetN",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.sales.push(element)
      });
     
    } catch (error) {
      console.error(error);
    }



  }
  async EnvioInternacionalFilter(){
    this.sales=[]

    try {
      const response = await axios.get("https://localhost:44303/api/Sale/GetI",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.sales.push(element)
      });
     
    } catch (error) {
      console.error(error);
    }



  }
  async PriceFilter(){
    this.sales=[]

    try {
      const response = await axios.get("https://localhost:44303/api/Game/Get",{headers: {'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
      response.data.forEach(element => {
        this.sales.push(element)
      });
     
    } catch (error) {
      console.error(error);
    }



  }

}
