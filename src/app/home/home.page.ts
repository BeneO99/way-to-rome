import { Component } from '@angular/core';

//https://dev.to/orkhanjafarovr/real-compass-on-mobile-browsers-with-javascript-3emi

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor() { }
  compass: any;
  pointDegree: any;

  coordinates: any;
  rome: [number, number] = [41.4536, 12.3209];//
  outputDirection: any;
  alpha: any;
  arrow:any;

  isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

  trackLocation() {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition((position) => {this.locationHandler(position)}, (error) => alert(error.message))
      window.addEventListener("deviceorientationabsolute", (compass) => {this.handler(compass)}, true);
     
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
  }

  handler(compass: any){
    if(compass == null){
      this.outputDirection = "Dein Gerät unterstützt kein Magnetometer";
      return;
    }
    
    var relativeDirection = compass.webkitCompassHeading || Math.abs(compass.alpha - 360);
    this.alpha = relativeDirection;
    relativeDirection = Math.abs(relativeDirection - this.pointDegree);

    if(relativeDirection <= 22.5 || relativeDirection > 337.5){ //0
      this.arrow = 'assets/Arrows/up.png';
      this.outputDirection = "Norden";
    } else if(relativeDirection > 22.5 && relativeDirection <= 67.5){ //45
      this.arrow = 'assets/Arrows/up_right.png';
      this.outputDirection = "Nord-Ost";
    } else if(relativeDirection > 67.5 && relativeDirection <= 112.5){ //90
      this.arrow = 'assets/Arrows/right.png';
      this.outputDirection = "Osten";
    }else if(relativeDirection > 112.5 && relativeDirection <= 157.5){ //135
      this.arrow = 'assets/Arrows/right_down.png';
      this.outputDirection = "Süd-Ost";
    }else if(relativeDirection > 157.5 && relativeDirection <= 202.5){ //180
      this.arrow = 'assets/Arrows/down.png';
      this.outputDirection = "Süden";
    }else if(relativeDirection > 202.5 && relativeDirection <= 250.5){ //225
      this.arrow = 'assets/Arrows/left_down.png';
      this.outputDirection = "Süd-West";
    }else if(relativeDirection > 250.5 && relativeDirection <= 295.5){ //270
      this.arrow = 'assets/Arrows/left.png';
      this.outputDirection = "Westen";
    }else if(relativeDirection > 295.5 && relativeDirection <= 337.5){ //315
      this.arrow = 'assets/Arrows/up_left.png';
      this.outputDirection = "Nord-West";
    }

    
  }

locationHandler(position: any) {
  const { latitude, longitude } = position.coords;
  this.pointDegree = this.calcDegreeToPoint(latitude, longitude);

  if (this.pointDegree < 0) {
    this.pointDegree = this.pointDegree + 360;
  }
}

calcDegreeToPoint(latitude: number, longitude: number) {
  // Rome geolocation
  const point = {
    lat: 41.4536,
    lng: 12.3209,
  };

  const phiK = (point.lat * Math.PI) / 180.0;
  const lambdaK = (point.lng * Math.PI) / 180.0;
  const phi = (latitude * Math.PI) / 180.0;
  const lambda = (longitude * Math.PI) / 180.0;
  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda)
    );
  return Math.round(psi);
}
}
