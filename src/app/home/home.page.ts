import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor() { }

  coordinates: any;
  rome: [number, number] = [41.4536, 12.3209];//
  direction: [boolean,boolean,boolean,boolean] = [false, false, false, false] //nord, süd, ost, west
  outputDirection: String = "noch keine Daten bitte warten.";
  alpha: any;
  isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

  trackLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.watchPosition((position) => {
        this.coordinates = position.coords;
        this.startCompass();
        this.calculateDiraction();
      }, (error) => {alert(error.message)})
    } else { 
      this.coordinates = "Geolocation is not supported by this browser.";
    }
  }

  calculateDiraction(){
    if(this.coordinates.latitude < this.rome[0]){
      this.direction[0] = true;
    }else if(this.coordinates.latitude > this.rome[0]){
      this.direction[1] = true;
    }

    if(this.coordinates.longitude < this.rome[1]){
      this.direction[2] = true;
    }else if(this.coordinates.longitude > this.rome[1]){
      this.direction[3] = true;
    }

  }

  startCompass() {

    if(this.isIOS){
      alert("Ios unterstützt keine stable Magentometer version.")
    }
    
    try {
            window.addEventListener("deviceorientationabsolute", (event:any) => {
        this.alpha = event.alpha;
        alert(`${event.alpha}`);
        
      });
    } catch (error) {
      
      alert(error)
    }

  }
}
